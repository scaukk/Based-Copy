$(function() {
    'use strict';

    var productData = window.tool.getSessionStorage('productData');
    var urlParameters = window.tool.getSessionStorage('urlParameters');
    var windowHeight = $(window).height();
    var dates = {};
    var planInfo = {};

    var app = {

        //获取偿付能力数据
        getSolvency: function() {
            var solvency = window.sessionStorage.getItem('solvency');
            if (solvency) {
                $('.notice-detail').append('<div class="solvency"><h2>重要信息告知</h2>' + solvency + '</div>');
                return;
            }

            $.ajax({
                url: '/icp/getSolvency.do',
                type: 'POST',
                dataType: 'json',
                success: function(res) {
                    if (res && res.resultCode === '00' && res.solvency) {
                        window.sessionStorage.setItem('solvency', res.solvency);
                        $('.notice-detail').append('<div class="solvency"><h2>重要信息告知</h2>' + res.solvency + '</div>');
                    }
                },
                error: function(res) {}
            });
        },

        //责任信息结构
        liabilityStruc: function(data) {
            return '<li class="item">' + '<p class="item-title">' + '<span>' + (data.liabilityName || '') + '</span>' + '<span>' + (data.insuranceCoverage || '') + '</span>' + '</p>' + '<p class="item-desc">' + (data.liabilityDesc || '暂无描述') + '</p>' + '</li>';
        },

        //提交的数据
        setSubmitData: function() {
            var packageData = app.getSelectedPackage($('.package-item.active').data('packagecode') || planInfo.packageList[0].packageCode, planInfo.packageList);
            var submit = {
                insuranceBeginTime: $('#beginDateTime').val().trim(),
                insuranceEndTime: $('#endDateTime').val().trim(),
                applyNum: $('#applyNum').text().trim(),
                packageAmount: $('#packageAmount').text(),
                productCode: productData.PRODUCTCODE,
                keyCode: urlParameters.keyCode,
                secondMediaSource: urlParameters.userId || urlParameters.secondMediaSource,
                remark: urlParameters.remark
            };

            //优先取icpProductInfo的法律告知
            if (productData.icpProductInfo && productData.icpProductInfo.lawPolicy) {
                submit.lawPolicy = productData.icpProductInfo.lawPolicy;
            }

            submit = $.extend({}, planInfo.localProMap, packageData, submit);
            window.tool.setSessionStorage('submit', submit);
        },

        getSelectedPackage: function(packageCode, packageList) {
            var result = {};
            for (var i = 0; i < packageList.length; i++) {
                if (packageList[i].packageCode === packageCode) {
                    result = {
                        packageCode: packageCode,
                        packageName: packageList[i].packageName,
                        insuredMaxAge: packageList[i].insuredMaxAge,
                        insuredMiniAge: packageList[i].insuredMiniAge,
                        packageAmount: packageList[i].packageAmount,
                        minInsuredNumber: packageList[i].minInsuredNumber,
                        maxInsuredNumber: packageList[i].maxInsuredNumber
                    };
                    //先取套餐里面的性别限制值
                    packageList[i].insuredLimitedSex && (result.insuredLimitedSex = packageList[i].insuredLimitedSex);
                    break;
                }
            }
            return result;
        },

        //获取承保期限和保险期限
        getDatesFromPlanInfo: function(planInfo) {

            var today = new Date();
            var tomorrow = new Date(today.setDate(today.getDate() + 1));

            var leastBeginTime = planInfo.localProMap.leastBeginTime;
            leastBeginTime = leastBeginTime ? (new Date(leastBeginTime)) : tomorrow;

            //保险期
            var maxInsuranceMonth = planInfo.localProMap.maxInsuranceMonth;
            var maxInsuranceDay = planInfo.localProMap.maxInsuranceDay;

            //起保期
            var maxUnderWriteMonth = planInfo.localProMap.maxUnderWriteMonth;
            var maxUnderWriteDay = planInfo.localProMap.maxUnderWriteDay;

            //日期非空判断
            maxInsuranceMonth = maxInsuranceMonth ? maxInsuranceMonth - 0 : 0;
            maxInsuranceDay = maxInsuranceDay ? maxInsuranceDay - 0 : 0;
            maxUnderWriteMonth = maxUnderWriteMonth ? maxUnderWriteMonth - 0 : 0;
            maxUnderWriteDay = maxUnderWriteDay ? maxUnderWriteDay - 0 : 0;

            //最小起期和最小止期
            var minStartDate = tool.getFutureDate(leastBeginTime, 0, 0, 0);
            var minEndDate = tool.getFutureDate(new Date(minStartDate), 0, maxInsuranceMonth, maxInsuranceDay - 1);

            //最大起期和最大止期
            var maxStartDate = tool.getFutureDate(new Date(), 0, maxUnderWriteMonth, maxUnderWriteDay);
            var maxEndDate = tool.getFutureDate(new Date(maxStartDate), 0, maxInsuranceMonth, maxInsuranceDay - 1);

            return {
                leastBeginTime: leastBeginTime,
                maxInsuranceMonth: maxInsuranceMonth,
                maxInsuranceDay: maxInsuranceDay,
                maxUnderWriteMonth: maxUnderWriteMonth,
                maxUnderWriteDay: maxUnderWriteDay,
                minStartDate: minStartDate, //最小起期
                minEndDate: minEndDate, //最小止期
                maxStartDate: maxStartDate, //最大起期
                maxEndDate: maxEndDate //最大止期
            }
        },

        setIframe: function(src) {
            var headerTitle = $('.title').text();

            var parentDom = document.createElement('div');
            parentDom.className = 'iframe-container';
            var iframe = document.createElement('iframe');
            iframe.src = src || '';
            parentDom.appendChild(iframe);

            $('.content').hide().after(parentDom);
            $('.title').text('保险条款');

            window.history.pushState({
                title: '#insuranceClause'
            }, '#insuranceClause', window.location.href + '#insuranceClause');
            window.onpopstate = function(e) {
                $('.content').show();
                $('.iframe-container').remove();
                $('.title').text(headerTitle);
            };
        },

        //specifiedDate是否在指定的时间范围(日期入参格式：yyyy-mm-dd，yyyy/mm/dd)，title可选
        isDateInRange: function(specifiedDate, startDate, endDate, title) {
            specifiedDate = specifiedDate.trim();
            startDate = startDate.trim();
            endDate = endDate.trim();
            var spDate = new Date(specifiedDate);
            var stDate = new Date(startDate);
            var enDate = new Date(endDate);
            var result = {
                isDateInRange: true,
                msg: 'ok'
            };
            title = title || '日期';

            if (spDate < stDate) {
                result.isDateInRange = false;
                result.msg = title + '不能早于' + startDate;
            } else if (spDate > enDate) {
                result.isDateInRange = false;
                result.msg = title + '不能晚于' + endDate;
            }
            return result;
        },

        //比较两个日期先后,入参格式（yyyy-mm-dd,yyyy-mm-dd）
        compareTwoDate: function(date01, date02) {
            return new Date(date01) > new Date(date02);
        },

        initBeginDateTime: function(DateString, callback) {
            var input = DateString;
            if (Object.prototype.toString.call(DateString) === "[object Date]") {
                input = window.tool.getFutureDate(DateString, 0, 0, 0);
            } else if (!DateString || (typeof DateString !== 'string')) {
                input = window.tool.getFutureDate(new Date(), 0, 0, 0);
            }

            $("#beginDateTime").val(input + ' ').datetimePicker({
                title: "选择日期",
                yearSplit: "-",
                monthSplit: "-",
                datetimeSplit: " ",
                times: function() {
                    return [];
                },
                onChange: callback
            });
        },

        renderAllTime: function(planInfo) {
            var dates = app.getDatesFromPlanInfo(planInfo);
            // $('#insuranceTime').text(dates.maxInsuranceMonth ? dates.maxInsuranceMonth + '月' : dates.maxInsuranceDay + '天');
            // $('#endDateTime').val(dates.minEndDate + ' ');
            // app.initBeginDateTime(dates.minStartDate, function(e) {
            // var endDateTime = window.tool.getFutureDate(new Date(e.value.join('-')), 0, dates.maxInsuranceMonth, dates.maxInsuranceDay - 1);
            // $('#endDateTime').val(endDateTime + ' ');
            // });

            $("#beginDateTime").val(dates.minStartDate + ' ').datetimePicker({
                title: "选择日期",
                yearSplit: "-",
                monthSplit: "-",
                datetimeSplit: " ",
                times: function() {
                    return [];
                },
                onChange: function() {}
            });


            $("#endDateTime").val(dates.minEndDate + ' ').datetimePicker({
                title: "选择日期",
                yearSplit: "-",
                monthSplit: "-",
                datetimeSplit: " ",
                times: function() {
                    return [];
                },
                onChange: function() {}
            });
        },

        changePackage: function(packageCode, packageList) {
            var liabilityList = [];
            var packageAmount = ''; //套餐价格
            for (var i = 0; i < packageList.length; i++) {
                if (packageList[i].packageCode === packageCode) {
                    liabilityList = packageList[i].liabilityList || [];
                    $('#packageAmount').text(packageList[i].packageAmount || '');
                    break;
                }
            }

            //兼容共享保额
            var resultObj = {};
            for (var i = 0; i < liabilityList.length; i++) {
                if (!liabilityList[i].insuranceTypeMergeFlag) {
                    resultObj[i + 'notShare'] = {
                        liabilityName: liabilityList[i].liabilityName || '',
                        liabilityDesc: liabilityList[i].liabilityDesc || '',
                        insuranceCoverage: liabilityList[i].insuranceCoverage || ''
                    };
                } else if (resultObj['share' + (liabilityList[i].insuranceTypeMergeFlag)]) {
                    resultObj['share' + (liabilityList[i].insuranceTypeMergeFlag)].liabilityName += '、' + (liabilityList[i].liabilityName || '');
                    resultObj['share' + (liabilityList[i].insuranceTypeMergeFlag)].liabilityDesc += liabilityList[i].liabilityDesc ? ('、' + liabilityList[i].liabilityDesc) : '';
                } else {
                    resultObj['share' + liabilityList[i].insuranceTypeMergeFlag] = {
                        liabilityName: liabilityList[i].liabilityName || '',
                        liabilityDesc: liabilityList[i].liabilityDesc || '',
                        insuranceCoverage: liabilityList[i].insuranceCoverage || ''
                    };
                }
            }
            var liabilityStr = '';
            if (!$.isEmptyObject(resultObj)) {
                for (var key in resultObj) {
                    liabilityStr += app.liabilityStruc(resultObj[key]);
                }
            }

            var productDetailHtml = '<div class="product-detail"><h2><span>保障内容</span><span>保障金额(元)</span></h2> <ul class="product-detail-list">' + liabilityStr + '</ul> <p class="more-detail"><span id="moreDetail" data-plancode="' + planInfo.localProMap.planCode + '">更多详情请查看《保险条款》</span></p></div>';
            $('.product-detail').remove();
            $('.product').append(productDetailHtml);

            //套餐联动
            var selector = '.package-tab-item.className' + packageCode + ',.package-item.className' + packageCode;
            $(selector).addClass('active').siblings().removeClass('active');


        },

        changeProduct: function(planCode, planInfoList) {
            var packageList = [];
            var productOptionHtml = ''; //产品下拉列表

            for (var i = 0; i < planInfoList.length; i++) {
                if (planInfoList[i].localProMap.planCode === planCode) {
                    planInfo = planInfoList[i]; //外部全局
                    packageList = planInfo.packageList;
                }
                productOptionHtml += '<option value="' + planInfoList[i].localProMap.planCode + '">' + planInfoList[i].localProMap.planName + '</option> ';
            }

            $('.title').text(planInfo.localProMap.productName || '');

            var bannerHtml = '<section class="banner"> <img class="banner-img" src="' + '/icp/downloadFile.do?fileName=' + (planInfo.localProMap.productImageTopUrl || '').split('=')[1] + '=0' + '"><p class="banner-desc">' + (productData.icpProductInfo.productDesc || '') + '</p> </section>';
            var productDescHtml = '<div class="product-desc"> <img src="' + '/icp/downloadFile.do?fileName=' + (planInfo.localProMap.productImageIntroduceUrl || '').split('=')[1] + '=0' + '"></div>';
            var productSchemeHtml = planInfoList.length < 2 ? '' : '<div class="product-scheme"><div class="form-group form-group-select"> <label> 产品方案：</label> <form><select class="form-control form-control-select" id="productScheme">' + productOptionHtml + '</select> </form> </div> </div>';

            var packageSchemeHtml = '';
            var slideUpPackageListHtml = '';
            if (packageList && packageList.length > 1) {
                var packageListHtml = '';
                var slideUpListHtml = '';
                for (var i = 0; i < packageList.length; i++) {
                    if (i > 0) {
                        packageListHtml += '<li class="package-tab-item ' + 'className' + packageList[i].packageCode + '" data-packagecode="' + packageList[i].packageCode + '">' + packageList[i].packageName + '</li>';
                        slideUpListHtml += '<li class="package-item ' + 'className' + packageList[i].packageCode + '" data-packagecode="' + packageList[i].packageCode + '">' + packageList[i].packageName + '</li>';
                    } else {
                        packageListHtml += '<li class="package-tab-item active ' + 'className' + packageList[i].packageCode + '"  data-packagecode="' + packageList[i].packageCode + '">' + packageList[i].packageName + '</li>';
                        slideUpListHtml += '<li class="package-item active ' + 'className' + packageList[i].packageCode + '" data-packagecode="' + packageList[i].packageCode + '">' + packageList[i].packageName + '</li>';
                    }
                }
                packageSchemeHtml = '<div class="package-scheme"><ul class="package-tab">' + packageListHtml + '</ul></div>';
                slideUpPackageListHtml = '<li class="wrap-item wrap-item-package"> <label>保障方案</label> <div class="wrap-item-right"> <ul class="package-list">' + slideUpListHtml + '</ul> </div> </li>';
            }

            var noticeHtml = '<section class="notice" id="notice"> <h2 class="wrap-title">投保须知</h2> <div class="wrap-body notice-detail"> <img src="' + '/icp/downloadFile.do?fileName=' + (planInfo.localProMap.productImageNoticeUrl || '').split('=')[1] + '=0' + '"> </div> </section>';
            var claimHtml = '<section class="claim" id="claim"> <h2 class="wrap-title">理赔指南</h2> <div class="wrap-body claim-detail"> <img src="' + '/icp/downloadFile.do?fileName=' + (planInfo.localProMap.productImageClaimUrl || '').split('=')[1] + '=0' + '"> </div> </section>';
            var quesionHtml = '<section class="quesion" id="quesion"> <h2 class="wrap-title">常见问题</h2> <div class="wrap-body quesion-detail"> <img src="' + '/icp/downloadFile.do?fileName=' + (planInfo.localProMap.productImageIproblemUrl || '').split('=')[1] + '=0' + '"> </div> </section>';

            $('.banner,.notice,.claim,.quesion,.wrap-item-package').remove();
            $('.nav').before(bannerHtml);
            $('.product').empty().prepend(productDescHtml + productSchemeHtml + packageSchemeHtml).after(noticeHtml + claimHtml + quesionHtml);
            $('#productScheme').val(planCode); //切换时，产品方案跟着变
            app.changePackage(packageList[0].packageCode, packageList);

            // var beginDateTimeHtml = '<li class="wrap-item icon-active begin-date-time"> <label>保险起期</label> <div class="wrap-item-right"> <input class="date" id="beginDateTime" type="text"> <span class="time">00时</span> </div> </li>';

            $('.wrap').prepend(slideUpPackageListHtml);

            //获取偿付能力
            app.getSolvency();

            //时间处理
            //(动态报价，两个日期DOM不重新渲染，移至初始化)
            // app.renderAllTime(planInfo);   
            dates = app.getDatesFromPlanInfo(planInfo); //外部全局
            //切换保险期限(非动态报价模板中，此逻辑是放在renderAllTime函数中的)
            $('#insuranceTime').text(dates.maxInsuranceMonth ? dates.maxInsuranceMonth + '月' : dates.maxInsuranceDay + '天');
        },

        //获取两个日期之间的天数
        getDateDiff: function(startDate, endDate) {
            var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
            var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
            var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
            return Math.ceil(dates);
        },

        //从产品中获取第一个套餐的套餐代码
        getPackageCode: function(planCode) {
            var productData = window.tool.getSessionStorage('productData');
            var planInfoList = productData.planInfoList;

            for (var i = 0; i < planInfoList.length; i++) {
                if (planCode === planInfoList[i].localProMap.planCode) {
                    return planInfoList[i].packageList[0].packageCode;
                }
            }
            return '';
        },

        //动态报价
        getDynamicPrice: function() {
            var productData = window.tool.getSessionStorage('productData');
            var planInfo = productData.planInfoList[0];
            var planCode = $('#productScheme').val() || planInfo.localProMap.planCode;
            var packageCode = $('.package-tab-item.active').data('packagecode') || app.getPackageCode(planCode);
            var insuranceBeginTime = $('#beginDateTime').val().trim() + ' 00:00:00';
            var insuranceEndTime = $('#endDateTime').val().trim() + ' 23:59:59';

            var sendData = {
                mediaSource: productData.ACCOUNT,
                productInfoList: [{
                    typeCode: productData.planInfoList[0].localProMap.typeCode,
                    baseInfo: {
                        insuranceBeginDate: insuranceBeginTime,
                        insuranceEndDate: insuranceEndTime,
                        productCode: planCode
                    },
                    extendInfo: {
                        isGoUmsDiscount: 'Y'
                    },
                    riskGroupInfoList: [{
                        applyNum: 1,
                        productPackageType: packageCode,
                        combinedProductCode: planCode
                    }]
                }]
            };

            var insuranceTime = app.getDateDiff(insuranceBeginTime, insuranceEndTime);
            $('#insuranceTime').text(insuranceTime + '天');
            $('.btn-dynamic-price').addClass('price-loading').removeClass('price-fail');
            $.ajax({
                url: '/icp/mobile_single_insurance/ptsCalInsuranceAmount.do',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(sendData),
                success: function(res) {
                    typeof res === 'string' && (res = JSON.parse(res));
                    if (res && res.resultCode === '00') {
                        $('.btn-dynamic-price').removeClass('price-loading price-fail');
                        $('#packageAmount').text(res.productList[0].totalActualPremium || '0');
                    } else {
                        $('.btn-dynamic-price').addClass('price-fail').removeClass('price-loading');
                    }
                },
                error: function(res) {
                    $('.btn-dynamic-price').addClass('price-fail').removeClass('price-loading');
                }
            });
        },

        binding: function() {
            $('.page')
                .on('click', '.nav-tab-item', function() { //导航tab
                    var $this = $(this);
                    var scrollTop = $('#' + $this.data('scroll-to')).offset().top - $('.nav').offset().height;

                    $this.addClass('active').siblings().removeClass('active');
                    $('html,body').scrollTop(scrollTop);
                })
                .on('click', '.package-tab-item', function() { //套餐tab
                    $(this).addClass('active').siblings().removeClass('active');
                })
                .on('click', '.package-item', function() { //套餐btn
                    $(this).addClass('active').siblings().removeClass('active');
                })
                .on('click', '.item', function() { //保障内容
                    $(this).toggleClass('active');
                })
                .on('click', '.ui-mask', function() { //弹窗消退
                    $('body').removeClass('stop-scrolling');
                    $('.slide-up-wrap').removeClass('active');
                })
                .on('change', '#productScheme', function() { //产品方案
                    app.changeProduct($(this).val(), productData.planInfoList);
                    app.getDynamicPrice(); //切换产品时报价
                })
                .on('click', '.package-tab-item , .package-item', function() { //套餐方案
                    app.changePackage($(this).data('packagecode'), planInfo.packageList);
                    app.getDynamicPrice(); //切换套餐时报价
                })
                .on('click', '#moreDetail', function() { //查看保险条款
                    var planCode = $(this).data('plancode');
                    var src = window.location.origin + '/icp_core_dmz/web/' + planCode + '.html';
                    app.setIframe(src);
                })
                .on('click', '#buy', function() { //立即投保

                    var $btnDynamicPrice = $('.btn-dynamic-price');
                    if ($btnDynamicPrice.hasClass('price-loading')) {
                        window.wAlert('正在计算保费');
                        return false;
                    }
                    if ($btnDynamicPrice.hasClass('price-fail')) {
                        window.wAlert('保费计算失败');
                        return false;
                    }

                    var slideUpWrapDom = $('.slide-up-wrap');
                    if (slideUpWrapDom.hasClass('active')) {

                        if (app.compareTwoDate($('#beginDateTime').val().trim(), $('#endDateTime').val().trim())) {
                            window.wAlert('保险起期不能晚于保险止期');
                            return false;
                        }

                        var checkResult = app.isDateInRange($('#beginDateTime').val(), dates.minStartDate, dates.maxStartDate, '保险起期');
                        if (!checkResult.isDateInRange) {
                            window.wAlert(checkResult.msg);
                            return false;
                        }


                        var dynamicEndDate = window.tool.getFutureDate(new Date($('#beginDateTime').val().trim()), 0, dates.maxInsuranceMonth, dates.maxInsuranceDay);
                        checkResult = app.isDateInRange($('#endDateTime').val(), $('#beginDateTime').val().trim(), dynamicEndDate, '保险止期');
                        if (!checkResult.isDateInRange) {
                            window.wAlert(checkResult.msg);
                            return false;
                        }


                        app.setSubmitData();
                        //埋点统计
                        window.tool.buyBtnTJ && window.tool.buyBtnTJ();
                        window.location.href = 'applicant.html';
                    } else {
                        $('body').addClass('stop-scrolling');
                        slideUpWrapDom.addClass('active');
                    }
                });

            $(document).on('click', '.close-picker', function() {
                if (app.compareTwoDate($('#beginDateTime').val().trim(), $('#endDateTime').val().trim())) {
                    window.wAlert('保险起期不能晚于保险止期');
                    return false;
                }

                var checkResult = app.isDateInRange($('#beginDateTime').val().trim(), dates.minStartDate, dates.maxStartDate, '保险起期');
                if (!checkResult.isDateInRange) {
                    window.wAlert(checkResult.msg);
                    return false;
                }

                var dynamicEndDate = window.tool.getFutureDate(new Date($('#beginDateTime').val().trim()), 0, dates.maxInsuranceMonth, dates.maxInsuranceDay - 1);
                checkResult = app.isDateInRange($('#endDateTime').val(), $('#beginDateTime').val().trim(), dynamicEndDate, '保险止期');
                if (!checkResult.isDateInRange) {
                    window.wAlert(checkResult.msg);
                    return false;
                }

                app.getDynamicPrice();
            });

            $(window).on('scroll', function(e) {
                //nav浮动
                var $this = $(this);
                var navDom = $('.nav');
                var productDom = $('.product');
                var navHeight = navDom.offset().height;
                var navTop = productDom.offset().top - navHeight;
                var scrollTop = $this.scrollTop();

                if (scrollTop >= navTop) {
                    navDom.addClass('active');
                    productDom.addClass('active');
                } else {
                    navDom.removeClass('active');
                    productDom.removeClass('active');
                }

                //nav切换
                var noticeTop = $('#notice').offset().top - navHeight;
                var claimTop = $('#claim').offset().top - navHeight;
                var quesionTop = $('#quesion').offset().top - navHeight;
                var itemDomList = navDom.find('.nav-tab-item');

                if (scrollTop >= quesionTop || scrollTop === $(document).height() - $this.height()) {
                    itemDomList.removeClass('active').eq(3).addClass('active');
                } else if (scrollTop >= claimTop) {
                    itemDomList.removeClass('active').eq(2).addClass('active');
                } else if (scrollTop >= noticeTop) {
                    itemDomList.removeClass('active').eq(1).addClass('active');
                } else {
                    itemDomList.removeClass('active').eq(0).addClass('active');
                }
            });

        },

        render: function() {
            if (!productData) {
                window.wAlert('云产品数据有误');
                $('.page').remove();
                return false;
            }

            var planInfoList = productData.planInfoList;
            if (!planInfoList || planInfoList.length < 0) {
                window.wAlert('套餐数据有误');
                $('.page').remove();
                return false;
            }

            var planCode = $.trim(planInfoList[0].localProMap.planCode);
            if (!planCode) {
                window.wAlert('产品代码有误');
                $('.page').remove();
                return false;
            }

            app.changeProduct(planCode, planInfoList);
            //初始化两个日期，切换产品时就不再重新渲染
            app.renderAllTime(planInfoList[0]);
            //进入首页后第一次报价
            app.getDynamicPrice();
        },

        init: function() {
            app.render();
            app.binding();
            $('.loading').hide();
        }
    };

    app && app.init();
});
