var Domain='44api';
var upuid='1'
var title='44api.com';
var payval=18;/*默认充值金额*/
// #ifdef MP-ALIPAY
var showposts=false;
// #endif
// #ifndef MP-ALIPAY
 var showposts=true;
// #endif
if(typeof(localStorage) == "undefined"){
var localStorage={
 getItem:function(key){return uni.getStorageSync(key);},
clear:function(){return uni.clearStorageSync();},
removeItem:function(key){uni.removeStorage({key: key});},
setItem:function(key,data){
uni.setStorage({key: key,data: data})
}
}
}
var openId=localStorage.getItem("openId"); 
var optionss=localStorage.getItem("upuid"); 
if(optionss){upuid=optionss;}
var optionss=localStorage.getItem("user"); 
if(optionss){var userdata=JSON.parse(optionss);}else{var userdata=false;}
var optionss=localStorage.getItem("userfollow"); 
if(optionss){var userfollow=JSON.parse(optionss);}else{var userfollow=false;}
var ysv8hex=localStorage.getItem("ysv8hex"); 
var bucketcdn='https://iimg.44api.com/upload/';/*文件*/
var imgcdn='https://09city.44api.com/upload/';/*大图*/
var imgswt='https://09web.44api.com/upload/';/*缩微图*/
var hash='https://09love.44api.com/';/*hash加速*/
var www = 'https://www.'+Domain+'.com/';
var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;
var day = myDate.getDate(); 
var newDay = year + "/" + month + "/" + day;
var timestamp=new Date().getTime();
var ajaxbool = false;
var ajaxi=0;
var str_in_array=function(search, array,mode) {
 mode = typeof mode !== 'undefined' ? mode : 2;
 if(mode==2 && array==false) return false;
 for (var i in array) {
  if (array[i] == search) {
   if(mode==2) return true;
  array.splice(i,1);
  break;
  }
 }
 
 if(mode==1) array.push(search);
 if(mode==2) return false;
 return array
}
function timeStamp2String(time){/*时间格式化*/
var datetime = new Date()
datetime.setTime(time * 1000);
var y = datetime.getFullYear();
var m = datetime.getMonth() + 1;
var d = datetime.getDate();
var h = datetime.getHours();
var n = datetime.getMinutes();
return y + "-" + m + "-" + d+' '+h+':'+n;
}
function isNumber(value) {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value == "") {
    return false;
  } else {
    return true;
  }
}
function Rad(d){
           return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
        }
var in_array_key=function(a,myarr,key){
for (var arr2i = 0;arr2i < myarr.length; arr2i++) {
if(a[key]==myarr[arr2i][key]){
return true;
}
}
return false;
}

var in_array=function(id,myarr,mode){
 mode = typeof mode !== 'undefined' ? mode : false;
for (var arr2i = 0;arr2i < myarr.length; arr2i++) {
if(id==myarr[arr2i]['id']){
 if (mode !== false) return myarr[arr2i][mode];
return true;
}
}
return false;
}
function share_app(TITLE,URL,IMAGE){
 uni.showActionSheet({
 itemList: [ '朋友圈','微信好友','新浪微博', 'QQ好友'],
 success: (e) => {
 if(e.tapIndex=='0'){
 var provider="weixin";
 var scene="WXSenceTimeline";
  var stype=0;
 }
 if(e.tapIndex=='1'){
 var provider="weixin";
 var scene="WXSceneSession";
  var stype=0;
 }
 if(e.tapIndex=='2'){
 var provider="sinaweibo";
 var scene="";
  var stype=1;
  IMAGE='';
 }
 if(e.tapIndex=='3'){
 var provider="qq";
 var scene="";
 var stype=1;
 }
 uni.share({
 provider: provider,scene: scene,type:stype,href: URL,title: TITLE,summary: TITLE,
 imageUrl: IMAGE,success: function (res) {
 },fail: function (err) {
 }
 }); 
  
  
 }, 
 });
}
function GetDistance(lc1,lc2){
		if(typeof(lc1)!='string') return 'N';
		if(typeof(lc2)!='string') return 'N';	
		var lat1a=lc1.split(',');
		var lat2a=lc2.split(',');
		var lat1=lat1a[0];
		var lng1=lat1a[1];
		var lat2=lat2a[0];
		var lng2=lat2a[1];
            var radLat1 = Rad(lat1);
            var radLat2 = Rad(lat2);
            var a = radLat1 - radLat2;
            var  b = Rad(lng1) - Rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
            s = s *6378.137 ;
            s = Math.round(s * 10000) / 10000; //输出为公里
            return s.toFixed(2);
     
	}		
function share(TITLE,URL,IMAGE){
 if(userdata){URL=URL+'?upuid='+userdata['id'];}
uni.showActionSheet({
itemList: ['微博', 'Qzone','二维码', 'facebook','twitter'],
success: (e) => {
if(e.tapIndex=='0'){
var mylink="https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}";
}
if(e.tapIndex=='1'){
var mylink="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{TITLE}}&summary={{TITLE}}&site={{SOURCE}}";
}
if(e.tapIndex=='2'){
uni.navigateTo({
  url: '/pages/index/qrcode?url='+encodeURIComponent(URL)
});
return false;
}
if(e.tapIndex=='3'){
var mylink="https://www.facebook.com/sharer/sharer.php?u={{URL}}";
}
if(e.tapIndex=='4'){
var mylink="https://twitter.com/intent/tweet?text={{TITLE}}_{{URL}}&url={{URL}}&via=09love.44api.com";
}
var reg = new RegExp( '{{TITLE}}' , "g" )
mylink=mylink.replace(reg,encodeURIComponent(TITLE))
var reg = new RegExp( '{{URL}}' , "g" )
mylink=mylink.replace(reg,encodeURIComponent(URL))
var reg = new RegExp( '{{IMAGE}}' , "g" )
mylink=mylink.replace(reg,encodeURIComponent(IMAGE))
var reg = new RegExp( '{{WEIBOKEY}}' , "g" )
mylink=mylink.replace(reg,'1860651155')
window.open(mylink);
},
});
 }



var isArray=function (obj) {/*判断是否是数组*/
return Object.prototype.toString.call(obj) === '[object Array]';
}





var setdata=function(data, smode, content, pagtime,key,lc){/*文章列表处理*/
key=key||'id'; 
 if(isArray(data) !=true) return false
 var ajaxj = data.length;
 var k;
 for (var i = 0; i < ajaxj; i++) {
 
  if (smode == "up") { k = ajaxj - i - 1;}else{k=i;}
if(key && data[k]['lc']){
	data[k]['newds']=GetDistance(lc, data[k]['lc'])
} 
if('btime' in data[k]){
  var pxkey='btime'
  data[k]['timestr']=timeStamp2String(data[k]['btime'])
 }else{
 var pxkey='atime'
  data[k]['timestr']=timeStamp2String(data[k]['atime'])
 }
 if('title' in data[k]){
 data[k]['title']=data[k]['title'].replace(/<b>/g,'[');
 data[k]['title']=data[k]['title'].replace(/<\/b>/g,']');
 }
  data[k][pxkey] = Number(data[k][pxkey]);
 if (pagtime > data[k][pxkey] || pagtime == 0) {pagtime = data[k][pxkey] }
 if(('img' in data[k]) && data[k]['img']!=null){
 data[k]['img'] =data[k]['img'].replace(/\{m\}/g, '')
 data[k]['img'] = data[k]['img'].replace(imgswt, '')
 data[k]['imglist']=data[k]['img'].split(",");
 data[k]['img'] = data[k]['imglist'][0];

  }else{
  data[k]['imglist']=[];
  
 }
  if(('vs' in data[k]) && data[k]['vs']!=null){
  data[k]['vs'] =data[k]['vs'].replace(/\{m\}/g, '')
  data[k]['vs'] = data[k]['vs'].replace(bucketcdn, '')
  }
  
  if (in_array_key(data[k][key], content,key) == false) {
    if (smode == "up") {
    content.unshift(data[k])
    }else{
     content.push(data[k])
    }
   }
 }
 return [content, pagtime,ajaxj];
}


var muialert=function(data,uid){
 if(data['code']=='200'){
  uni.showModal({
  title: "成功",
  content: data['info'],
  showCancel: false,
  confirmText: "确定"
  });
  return false;
  }
if(data['code']=='301'){
ysv8hex='no';
localStorage.setItem("ysv8hex",'no');
uni.showModal({
content:data['info'],
showCancel:false,
success: (e) => {
setTimeout(() => {uni.redirectTo({
url: '/pages/user/index?data=login'
}); 
}, 100);
}
})
}else if(data['code']=='302'){
 uid=uid||userdata;
 // #ifdef MP
 uni.showActionSheet({
 itemList: ['￥10（1000）','￥50（5000）','￥100（10000）','￥200（20000）','￥500（50000）','￥1000（100000）'],
 success: (e) => {
if(e.tapIndex=='0'){payval=10;}
if(e.tapIndex=='1'){payval=50;}
if(e.tapIndex=='2'){payval=100;}
if(e.tapIndex=='3'){payval=200;}
if(e.tapIndex=='4'){payval=500;}
if(e.tapIndex=='5'){payval=1000;}
// #ifdef MP-WEIXIN
wxPaymoney(uid['id'],payval);
// #endif 
// #ifdef MP-ALIPAY
aiPaymoney(uid['id'],payval);
// #endif 
 }
 });
return false;
// #endif 


uni.showModal({
content:data['info'],
showCancel:false,
success: (e) => {
setTimeout(() => {
	//#ifdef APP-PLUS
	plus.runtime.openURL('https://www.44api.com/pay?uid='+uid['id']);
	 //#endif
	 // #ifdef H5
	 window.open('https://www.44api.com/pay?uid='+uid['id']);
	 // #endif
   }, 100);
 }
 })

 
 
}else if('url' in data){
 uni.showModal({
 content:data['info'],
         showCancel:false,
         success: (e) => {
          
setTimeout(() => {uni.navigateTo({
     url: '/pages/user/web?url=https://pay.44api.com'+data['url']
     }); 
     }, 100);
   
   }
  
   })
}else{
 
 uni.showModal({
 title: "错误",
 content: data['info'],
 showCancel: false,
 confirmText: "确定"
 });
}
}
var aiPaymoney =function (uid,true_money){ 
 my.getAuthCode({
    scopes: 'auth_user', 
    success:(res) =>{
 uni.request({
  method: 'POST',
  data: {
   uid:uid, 
   usd: true_money,   //支付金额
 auth_code: res.authCode
  },
  url: 'https://pay.44api.com/pay/appal.php',
  success: function (res) {
  
  if(res['data']['code']!=200){ 
  muialert(res.data); 
  return false;
  }
my.tradePay({
 tradeNO: res['data']['info'],
 success: (res) => {
  my.alert({
  content: '支付成功'+res['data']['resultCode'],
 });
 },
 fail: (res) => {
  my.alert({
  content: '支付失败',
 });
 }
});
},
 fail: (res) => {
  my.alert({
  content: 'ERROR',
 });
 }
});
},
  fail:(res) =>{
 my.alert({
  content: '授权失败',
 });}
});
}
var wxPaymoney=function (uid,true_money){  //out_trade_no 后台统一下单接口需要用
  var that = this
  wx.hideToast()          //隐藏toast
 uni.login({
  provider: 'weixin',
  success: function (loginRes) {
 wx.request({
  method: 'POST',
  data: {
   uid:uid,
  openId:openId,
  code:loginRes.code,
   usd: true_money   //支付金额
  },
  url: 'https://pay.44api.com/pay/appweixin.php',
  success: function (res) {
   if('code' in res.data){ 
   muialert(res.data); 
   return false;
   }
   wx.requestPayment({        //成功之后，调用小程序微信支付
    'timeStamp': res.data['timeStamp'],
    'nonceStr': res.data['nonceStr'],
    'package': res.data['package'],
    'signType': res.data['signType'],
    'paySign': res.data['paySign'],
    success: function (res) {
     wx.showModal({
      title: langfun('支付成功'),
      showCancel: false,
   success() {
    uni.navigateTo({
    url: '/pages/user/index'
    });
   }
     })
    }, 
    fail: function (res) {
     console.log(res);
     wx.showModal({
      title: langfun('提醒'),
      content: langfun('付款失败'),
      showCancel: false
     })
     return
    },
   })
  },
  fail: function (res) {
   console.log(res.data)
  }
 })
 
 },
 });
 
  
 }
var langfun=function(str){
 return str;
}
/*基本函数：时间格式化，翻译，缩微图前缀，大图前缀，API请求前缀*/
module.exports ={
 share_app:share_app,
 setdata:setdata,/*加载数据格式化*/
 timestamp:parseInt(timestamp/100000),
 showposts:showposts,
 userdata:userdata,
 userfollow:userfollow,
 str_in_array:str_in_array,
 title:title,
 www:www,/*API请求前缀*/
 share:share,
 Domain:Domain,
 localStorage:localStorage,
 isNumber:isNumber,
 ysv8hex:ysv8hex,/*用户登录状态维护*/
 upuid:upuid,/*推广uid*/
 votetype:['goods','nos','jubao','fav'],
 bucketcdn:bucketcdn,/*缩微图前缀*/
 imgcdn:imgcdn,/*大图前缀*/
 imgswt:imgswt,
 GetDistance:GetDistance,
 hash:hash,
 isArray:isArray,
 in_array:in_array,
timeStamp2String:timeStamp2String,
muialert:muialert,
get_id:function(myarr,id){
 for (var arr2i = 0;arr2i < myarr.length; arr2i++) {
 if(id==myarr[arr2i]['id']){
 return myarr[arr2i];
 }
 }
 return false;
},
langfun:langfun
 }