function WebTrends(){var a=this;a.dcsid="dcs5w0txb10000wocrvqy1nqm_6n1p",a.domain="sdc.pingan.com",a.timezone=8,a.enabled=!0,a.i18n=!0,a.FPCConfig={name:"WT-FPC",domain:location.host.replace(/^[A-z]+\./g,".").replace(/[:0-9]+$/g,""),expires:31536e7},a.DCS={},a.WT={},a.DCSext={},a.images=[],a.index=0,a.exre=function(){return window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):""}(),a.re=function(){return window.RegExp?a.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}:""}(),a.lt={},a.ltv={},a.qry={},a.max=800}function dcsMultiTrack(){return"undefined"!=typeof _tag?_tag.dcsMultiTrack():void 0}function pa_sdcajax(){return"undefined"!=typeof _tag?_tag.pa_sdcajax():void 0}function dcsTrim(a){var b=new String(a);return b.replace(/(^\s*)|(\s*$)|(\#$)/g,"")}function dcsExec(a,b){var c=new RegExp(b);return c.exec(a)}function dcsStr(a,b,c){return a.length<=b?a:c?a.substring(a.length-b):a.substring(0,b)}function dcsSubRef(a){var b,c,d,e,f,g,h;if(a=a.toLowerCase(),a=a.replace("wd=&","wd=null&").replace("word=&","word=null&"),dcsExec(a,"baidu.com|google.com|so.com|haosou.com|sogou.com"))for(;a.length>800&&(b=a.split("?"),f=0,g="",b.length>1)&&(c=b[1],d=c.split("&"),d.length>1);){for(h=0;h<d.length;h++){if(-1==d[h].indexOf("=")){a=-1!=c.indexOf(d[h]+"&")?a.replace(d[h]+"&",""):a.replace(d[h],""),g="";break}e=d[h].split("=")[0],val=d[h].split("=")[1],"undefined"!=typeof val&&d[h].length>f&&(f=d[h].length,g=-1!=a.indexOf("?"+e)?e.toString()+"="+val.toString():"&"+e.toString()+"="+val.toString())}a=a.replace(g,"")}return a}WebTrends.prototype.dcsGetId=function(){-1==document.cookie.indexOf(this.FPCConfig.name+"=")&&"undefined"==typeof gWtId&&"undefined"==typeof gTempWtId&&document.write("<script type='text/javascript' src='http"+(0==window.location.protocol.indexOf("https:")?"s":"")+"://"+this.domain+"/"+this.dcsid+"/wtid.js"+"'></scr"+"ipt>")},WebTrends.prototype.dcsGetIdAsync=function(){var a,b;return-1==document.cookie.indexOf(this.FPCConfig.name+"=")&&"undefined"==typeof gWtId&&"undefined"==typeof gTempWtId?(a=document.createElement("script"),a.type="text/javascript",a.async=!0,a.src="//"+this.domain+"/"+this.dcsid+"/wtid.js",b=document.getElementsByTagName("script")[0],b.parentNode.insertBefore(a,b),a):null},WebTrends.prototype.dcsGetCookie=function(a){var h,i,j,k,l,b=document.cookie.split("; "),c=[],d=0,e=0,f=a.length,g=b.length;for(e=0;g>e;e++)h=b[e],h.substring(0,f+1)==a+"="&&(c[d++]=h);if(i=c.length,i>0){if(d=0,i>1&&a==this.FPCConfig.name)for(j=new Date(0),e=0;i>e;e++)k=parseInt(this.dcsGetCrumb(c[e],"lv")),l=new Date(k),l>j&&(j.setTime(l.getTime()),d=e);return unescape(c[d].substring(f+1))}return null},WebTrends.prototype.dcsGetCrumb=function(a,b,c){var e,f,d=a.split(c||":");for(e=0;e<d.length;e++)if(f=d[e].split("="),b==f[0])return f[1];return null},WebTrends.prototype.dcsGetIdCrumb=function(a,b){var e,c=a.substring(0,a.indexOf(":lv=")),d=c.split("=");for(e=0;e<d.length;e++)if(b==d[0])return d[1];return null},WebTrends.prototype.dcsIsFpcSet=function(a,b,c,d){var e=this.dcsGetCookie(a);return e?b==this.dcsGetIdCrumb(e,"id")&&c==this.dcsGetCrumb(e,"lv")&&d==this.dcsGetCrumb(e,"ss")?0:3:2},WebTrends.prototype.dcsFPC=function(){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a=this.WT,b=this.FPCConfig.name,c=new Date,d=6e4*c.getTimezoneOffset()+36e5*this.timezone;if(c.setTime(c.getTime()+d),e=new Date(c.getTime()),a.co_f=a.vtid=a.vtvs=a.vt_f=a.vt_f_a=a.vt_f_s=a.vt_f_d=a.vt_f_tlh=a.vt_f_tlv="",-1==document.cookie.indexOf(b+"=")){if("undefined"!=typeof gWtId&&""!=gWtId)a.co_f=gWtId;else if("undefined"!=typeof gTempWtId&&""!=gTempWtId)a.co_f=gTempWtId,a.vt_f="1";else{for(a.co_f="2",i=c.getTime().toString(),j=2;j<=32-i.length;j++)a.co_f+=Math.floor(16*Math.random()).toString(16);a.co_f+=i,a.vt_f="1"}"undefined"==typeof gWtAccountRollup&&(a.vt_f_a="1"),a.vt_f_s=a.vt_f_d="1",a.vt_f_tlh=a.vt_f_tlv="0",g=h=1}else{if(k=this.dcsGetCookie(b),l=this.dcsGetIdCrumb(k,"id"),m=parseInt(this.dcsGetCrumb(k,"lv")),n=parseInt(this.dcsGetCrumb(k,"ss")),f=this.dcsGetCrumb(k,"fs"),g=parseInt(this.dcsGetCrumb(k,"pn")),h=parseInt(this.dcsGetCrumb(k,"vn")),g=g?"0"!=a.dl?g:g+1:1,h=h?h:1,null==l||"null"==l||isNaN(m)||isNaN(n))return;a.co_f=l,o=new Date(m),a.vt_f_tlh=Math.floor((o.getTime()-d)/1e3),e.setTime(n),(c.getTime()>o.getTime()+18e5||c.getTime()>e.getTime()+288e5)&&(a.vt_f_tlv=Math.floor((e.getTime()-d)/1e3),e.setTime(c.getTime()),a.vt_f_s="1",h++,g="0"!=a.dl?0:1),(c.getDay()!=o.getDay()||c.getMonth()!=o.getMonth()||c.getYear()!=o.getYear())&&(a.vt_f_d="1")}a.co_f=escape(a.co_f),a.vtid="undefined"==typeof this.vtid?a.co_f:this.vtid||"",a.vtvs=(e.getTime()-d).toString(),p=this.FPCConfig.expires?"; expires="+new Date((new Date).getTime()+this.FPCConfig.expires).toGMTString():"",q=c.getTime().toString(),r=e.getTime().toString(),f=f?f:q,a.pv_num=g,a.vt_num=h,document.cookie=b+"="+"id="+a.co_f+":lv="+q+":ss="+r+":fs="+f+":pn="+g.toString()+":vn="+h.toString()+p+"; path=/"+(""!=this.FPCConfig.domain?"; domain="+this.FPCConfig.domain:""),s=this.dcsIsFpcSet(b,a.co_f,q,r),0!=s&&(a.co_f=a.vtvs=a.vt_f_s=a.vt_f_d=a.vt_f_tlh=a.vt_f_tlv="","undefined"==typeof this.vtid&&(a.vtid=""),a.vt_f=a.vt_f_a=s)},WebTrends.prototype.dcsMultiTrack=function(){var b,a=dcsMultiTrack.arguments?dcsMultiTrack.arguments:arguments;0==a.length%2&&(this.dcsSetProps(a),b=new Date,this.DCS.dcsdat=b.getTime(),this.dcsFPC(),this.dcsTag())},WebTrends.prototype.dcsSetProps=function(a){for(var b=0;b<a.length;b+=2)0==a[b].indexOf("WT.")?this.WT[a[b].substring(3)]=a[b+1]:0==a[b].indexOf("DCS.")?this.DCS[a[b].substring(4)]=a[b+1]:0==a[b].indexOf("DCSext.")&&(this.DCSext[a[b].substring(7)]=a[b+1])},WebTrends.prototype.dcsAdv=function(){this.dcsFPC()},WebTrends.prototype.dcsVar=function(){var d,f,a=new Date,b=this.WT,c=this.DCS;if("object"==typeof screen&&(b.sr=screen.width+"x"+screen.height),document.title&&(window.RegExp?(d=new RegExp("^"+window.location.protocol+"//"+window.location.hostname+"\\s-\\s"),b.ti=document.title.replace(d,"")):b.ti=document.title),document.body&&document.body.addBehavior)try{document.body.addBehavior("#default#homePage"),b.hp=document.body.isHomePage(location.href)?"1":"0"}catch(e){}b.bs=document.all?document.body?document.body.offsetWidth+"x"+document.body.offsetHeight:"unknown":window.innerWidth+"x"+window.innerHeight,b.fv=function(){var a,b;if(window.ActiveXObject)for(a=15;a>0;a--)try{return b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+a),a+".0"}catch(c){}else if(navigator.plugins&&navigator.plugins.length)for(a=0;a<navigator.plugins.length;a++)if(-1!=navigator.plugins[a].name.indexOf("Shockwave Flash"))return navigator.plugins[a].description.split(" ")[2];return"Not enabled"}(),b.dl="0",b.ssl=0==window.location.protocol.indexOf("https:")?"1":"0",c.dcsdat=a.getTime(),c.dcssip=window.location.hostname,c.dcsuri=dcsStr(window.location.pathname,250),b.es=c.dcssip+c.dcsuri,window.location.search&&(c.dcsqry=dcsStr(window.location.search,this.max)),this.qry["referer"]?c.dcsref=dcsTrim(this.qry["referer"].replace("https","http")):""!=window.document.referrer&&"-"!=window.document.referrer&&("Microsoft Internet Explorer"==navigator.appName&&parseInt(navigator.appVersion)<4||(c.dcsref=dcsSubRef(dcsTrim(window.document.referrer.replace("https","http"))))),f=window.performance,f&&f.timing&&(b.dat=a-f.timing.connectStart)},WebTrends.prototype.dcsEscape=function(a,b){var c,d;if(""!=b){a=a.toString();for(c in b)b[c]instanceof RegExp&&(a=a.replace(b[c],c));return a=dcsStr(a,this.max)}return d=dcsStr(escape(a),this.max)},WebTrends.prototype.dcsA=function(a,b){var c,d,e,f,g,h,i;if(this.i18n&&""!=this.exre&&!this.exre.test(a))if("dcsqry"==a){for(c="",d=b.substring(1).split("&"),e=0;e<d.length;e++)f=d[e],g=f.indexOf("="),-1!=g&&(h=f.substring(0,g),i=f.substring(g+1),0!=e&&(c+="&"),c+=h+"="+this.dcsCode(i));b=b.substring(0,1)+c}else b=this.dcsCode(dcsTrim(b));return"&"+a+"="+this.dcsEscape(b,this.re)},WebTrends.prototype.dcsEncode=function(a){return"function"==typeof encodeURIComponent?encodeURIComponent(a):escape(a)},WebTrends.prototype.dcsCode=function(a){return/.*[\u0391-\uFFE5]+.*$/.test(a)?this.dcsEncode(a):a},WebTrends.prototype.dcsCreateImage=function(a){document.images&&(this.images[this.index]=new Image,this.images[this.index].src=a,this.index++)},WebTrends.prototype.dcsMeta=function(){var a,b,c,d,e;if(document.documentElement?a=document.getElementsByTagName("meta"):document.all&&(a=document.all.tags("meta")),"undefined"!=typeof a)for(b=a.length,c=0;b>c;c++)d=a.item(c).name,e=a.item(c).content,a.item(c).httpEquiv,d.length>0&&(0==d.toUpperCase().indexOf("WT.")?this.WT[d.substring(3)]=e:0==d.toUpperCase().indexOf("DCSEXT.")?this.DCSext[d.substring(7)]=e:0==d.toUpperCase().indexOf("DCS.")&&(this.DCS[d.substring(4)]=e))},WebTrends.prototype.dcsJson=function(){if("undefined"!=typeof WTjson)for(var a in WTjson)a.length&&a.length>0&&(0==a.toUpperCase().indexOf("WT.")?this.WT[a.substring(3)]=WTjson[a]:0==a.toUpperCase().indexOf("DCSEXT.")?this.DCSext[a.substring(7)]=WTjson[a]:0==a.toUpperCase().indexOf("DCS.")&&(this.DCS[a.substring(4)]=WTjson[a]))},WebTrends.prototype.dcsTag=function(){var e,a=this.WT,b=this.DCS,c=this.DCSext,d="http"+(0==window.location.protocol.indexOf("https:")?"s":"")+"://"+this.domain+(""==this.dcsid?"":"/"+this.dcsid)+"/dcs.gif?";for(e in b)b[e]&&"function"!=typeof b[e]&&(d+=this.dcsA(e,b[e]));for(e in a)a[e]&&"function"!=typeof a[e]&&(d+=this.dcsA("WT."+e,a[e]));for(e in c)c[e]&&"function"!=typeof c[e]&&(d+=this.dcsA(e,c[e]));return d.length>2048&&navigator.userAgent.indexOf("MSIE")>=0?(this.max=this.max/2,a.tu=1,this.dcsTag(),void 0):(this.dcsCreateImage(d),this.WT.ad="",void 0)},WebTrends.prototype.dcsCollect=function(){this.enabled&&(this.dcsGetqry(),this.dcsVar(),this.dcsMeta(),this.dcsJson(),this.dcsAdv(),this.dcsLoad(),this.dcsTag())},WebTrends.prototype.dcsGetqry=function(){var b,c,d,a=window.location.search;if(a.length>1)for(b=a.substring(1).split("&"),d=0;d<b.length;d++)c=b[d].split("="),this.qry[c[0].toLowerCase()]=c[1]},WebTrends.prototype.dcsv=function(a,b){var c=b.toLowerCase(),d=a.attributes;return d&&d[b]?d[b].nodeValue||d[b].value:d&&d[c]?d[c].nodeValue||d[c].value:null},WebTrends.prototype.pa_sdcajax=function(){var a,b,c;if(this.DCSext.wt_click=null,this.WT={},this.WT.pa_ajax=1,this.dcsGetqry(),this.dcsVar(),this.WT.dl=21,this.dcsMeta(),this.dcsJson(),this.dcsAdv(),this.dcsLoad(),a=2,b=pa_sdcajax.arguments?pa_sdcajax.arguments:arguments,null!=b[2]&&"boolean"==typeof b[2]&&(a=3),0==b.length%2&&2==a||0==b.length%3&&3==a)for(c=0;c<b.length;c+=a)0==b[c].indexOf("WT.")?this.WT[b[c].substring(3)]=b[c+1]:0==b[c].indexOf("DCS.")?this.DCS[b[c].substring(4)]=b[c+1]:0==b[c].indexOf("DCSext.")&&(this.DCSext[b[c].substring(7)]=b[c+1]);if(this.dcsTag(),this.WT.pa_ajax=this.WT.dl=null,3==a)for(c=0;c<b.length;c+=3)0==b[c].indexOf("WT.")?b[c+2]||(this.WT[b[c].substring(3)]=null):0==b[c].indexOf("DCS.")?b[c+2]||(this.DCS[b[c].substring(4)]=null):0==b[c].indexOf("DCSext.")&&(b[c+2]||(this.DCSext[b[c].substring(7)]=null));this.dcsComplete()},WebTrends.prototype.autoclick=function(){var c,a=new Array,b=document;if(b.all){for(a=b.getElementsByTagName("INPUT"),c=0,c=0;c<a.length;c++)("password"==a[c].type||"text"==a[c].type)&&(a[c].detachEvent("onfocus",this.dcse),a[c].attachEvent("onfocus",this.dcse),a[c].detachEvent("onblur",this.dcse),a[c].attachEvent("onblur",this.dcse));for(a=b.getElementsByTagName("TEXTAREA"),c=0;c<a.length;c++)a[c].detachEvent("onfocus",this.dcse),a[c].attachEvent("onfocus",this.dcse),a[c].detachEvent("onblur",this.dcse),a[c].attachEvent("onblur",this.dcse);for(a=b.getElementsByTagName("SELECT"),c=0;c<a.length;c++)a[c].detachEvent("onchange",this.dcse),a[c].attachEvent("onchange",this.dcse);b.body.detachEvent("onclick",this.dcse),b.body.attachEvent("onclick",this.dcse)}else{for(a=b.getElementsByTagName("INPUT"),c=0,c=0;c<a.length;c++)("password"==a[c].type||"text"==a[c].type)&&(a[c].addEventListener("focus",this.dcse,!1),a[c].addEventListener("blur",this.dcse,!1));for(a=b.getElementsByTagName("TEXTAREA"),c=0;c<a.length;c++)a[c].addEventListener("focus",this.dcse,!1),a[c].addEventListener("blur",this.dcse,!1);for(a=b.getElementsByTagName("SELECT"),c=0;c<a.length;c++)a[c].addEventListener("change",this.dcse,!1);b.body.addEventListener("click",this.dcse,!1)}},WebTrends.prototype.dcse=function(a){var b,c,d,e,f,g,h,i;if(b=document.all?window.event.srcElement:a.target,c=_tag.WT,c.tsp=c.ttp=c.ti=c.obj=c.inputval=c.area=c.obj=c.texturl=c.textarea=c.textSerial=c.si_entry=c.pn_entry=null,!_tag.dcsv(b,"otitle"))for(d=b,e=0;4>e&&d.parentNode;e++)if(d=d.parentNode,d&&_tag.dcsv(d,"otitle")){b=d;break}if(f=b.tagName.toLowerCase(),"select"!=f||"change"==a.type){if(b!=_tag.lt)_tag.lt=b;else if(b==_tag.lt&&"focus"==a.type)return;if(_tag.dcsv(b,"otitle")){if(c.ti=_tag.dcsv(b,"otitle"),c.obj=_tag.dcsv(b,"otype"),c.area=_tag.dcsv(b,"oarea"),"entry"==c.obj)c.si_entry=c.ti;else if("nav"==c.obj)c.pn_entry=c.ti;else if("a"==f&&c.obj&&c.obj.indexOf("adtext")>-1){for(c.texturl=b.href,c.textarea=_tag.dcsv(b,"adtextArea"),c.ti=b.innerText||b.textContent||c.ti,g=document.getElementsByTagName("A"),e=0,h=0;e<g.length;e++)if(_tag.dcsv(g[e],"adtextArea")==c.textarea&&(h++,g[e]==b)){c.textSerial=h;break}}else if("text"==b.type||"textarea"==f){if("click"==a.type)return;if("blur"==a.type){if(""==b.value)return _tag.lt=b,_tag.ltv=b.value,void 0;if(b==_tag.lt&&b.value==_tag.ltv)return;c.inputval=b.value,c.obj="input"}}else"radio"==b.type?c.inputval=b.value:"checkbox"==b.type?c.inputval=b.checked?"1":"0":"select"==f&&(c.inputval=b.options[b.selectedIndex].text);i=window.location.pathname+"/"+a.type+".event",c.pageurl="http://"+window.location.hostname+window.location.pathname,c.pagetitle=document.title,_tag.lt=b,_tag.ltv=b.value,_tag.dcsMultiTrack("DCS.dcsuri",i,"WT.dl",25,"DCSext.wt_click","page")}}},WebTrends.prototype.dcsisS=function(){if(null==this.DCS.dcsref)return!1;var a=this.DCS.dcsref.toLowerCase();return dcsExec(a,".baidu.com|.google.|.360.cn|.so.com|.haosou.com|.sm.cn|.yahoo.|.soso.com|.114search.|.aol.com|.bing.com|.sogou.com|.live.com")&&dcsExec(a,".baidu.com/|[?&]keyword=|[?&]key_word=|[?&]word=|[?&]wd=|[?&]q=|[?&]p=|[?&]w=|[?&]query=")?!0:!1},WebTrends.prototype.dcsGetRef=function(){var c,d,e,a=this.WT,b=this.qry["wt.mc_id"]||this.qry["cid"];if(a.pa_dom=this.DCS.dcssip,c=this.DCS.dcsref,c&&(d=c.split("/"),d.length>2&&(c=d[2])),null!=c&&""!=c&&-1==c.indexOf(this.FPCConfig.domain)||null!=b&&""!=b)if(this.dcsisS())a.pa_ref=b&&""!=b?"sem":"seo";else if(b&&""!=b){for(d=new Array("sms","edm"),e=0;e<d.length;e++)if(b.indexOf(d[e])>-1){a.pa_ref=d[e];break}a.pa_ref||(a.pa_ref="other_campaign")}else a.pa_ref="freelink";else a.pa_ref="direct"},WebTrends.prototype.dcspaAutoContent=function(){var a=this.WT,b=this.DCS.dcsref,c=window.location.pathname.split("/");c[2]&&!a.pa_cgn&&(a.pa_cgn=c[1]),c[3]&&!a.pa_cgs&&(a.pa_cgs=c[2]),b&&b.indexOf(this.FPCConfig.domain)>0&&(c=b.split("?")[0].split("/"),c[4]&&(a.re_cgn=c[3]),c[5]&&(a.re_cgs=c[4]))},WebTrends.prototype.dcsLoad=function(){this.dcspaAutoContent(),this.dcsGetRef(),this.WT.hash=window.location.hash.substring(1).split("?")[0]},WebTrends.prototype.dcsComplete=function(){this.autoclick()};var _tag=new WebTrends;try{_tag.autoclick()}catch(e){}document.onreadystatechange=function(){"complete"==document.readyState&&_tag.dcsComplete()};
//11