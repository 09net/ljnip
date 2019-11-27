<template>
<view class="warp">
<view id="sreach">
<view class="row bw p10">
<view class="col">
<view class="col_9">
<input confirm-type="search" style="text-align: left;" @confirm="confirm" @input="onKeyInput" class="myinput" type="text" :value="q" />
</view>
<view class="col_3 c">
					<button type="primary" @click="so()" size="mini"><uniIcon size="20" type="search"></uniIcon></button>	
				</view>
			</view>
			
		</view>
		</view>
		<view class="f-body">
			<view class="uni-grid">
				<view  style="width: 141upx;" class="uni-grid-item" v-for="(item2, index) in flist" :key="item2.value" @click="change(item2,'more')">
						<view class="uni-grid-item__box">
						<view class="uni-grid-item__box-item">
						<image :src="imgswt+item2.value+'.png'" class="image" mode="aspectFill"/>
						<text class="text">{{item2.label}}</text>
					</view></view>
					</view>
			
				
				<view  style="width: 141upx;" class="uni-grid-item" v-for="(item, index) in list" :key="item.label" @click="change(item,'f')">
					<view class="uni-grid-item__box">
					<view class="uni-grid-item__box-item">
					<image :src="imgswt+item['img']" class="image" mode="aspectFill"/>
					<text class="text">{{item.label}}</text>
				</view></view>
				</view>
			</view>
		</view>
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
	<view class="list-view">
		 

	<block v-for="(newsitem,index2) in newsitems"  :key="index2">
	<media-list :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)"></media-list>
	</block>
	<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
	</view>		
	
	<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer" :lc="lc" :mess="mess"></uni-drawer>
	
<view class="foot bw"><view class="row"><view class="col">
 
<view class="col_20 c" @tap="chooseLocation()"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
           <uniIcon size="20" type="map-marker"></uniIcon>
        </view><!----></view></view>
 <view class="col_20 c" @tap="mysetdc()"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
   <uniIcon size="20">{{dc}}K</uniIcon>
  </view><!----></view></view>
<view v-if="showposts" class="col_20 c" @tap="buttonbar('add',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
		 <uniIcon size="20" type="pencil-square"></uniIcon>
        </view><!----></view></view>
	<view v-else class="col_20 c" @tap="buttonbar('user/index',true)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
			 <uniIcon size="20" type="pencil-square"></uniIcon>
	        </view><!----></view></view>	
		<view class="col_20 c" @tap="buttonbar('more',false)"><view class="uni-tabbar__bd "><view class="uni-tabbar__label tar_no">
		<uniIcon size="20" type="list-ol"></uniIcon>
		</view><!----></view></view>
		<view class="col_20 c" @tap="openright()"><view class="uni-tabbar__bd "><view class="uni-tabbar__label tar_no">
        <uniIcon size="20" type="bars" :color="mess>0?'#FF0000':''"></uniIcon>
        </view><!----></view></view>
		
		</view></view></view></view>

 		
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import mediaList from './list.vue';
    import mask from '@/static/ysv8/chat.js';
	 import uniDrawer from './uni-drawer.vue';
	  import uniLoadMore from '@/components/uni-load-more.vue';
	import uniIcon from '@/components/uniIcon.vue'
	var util = require('@/common/util.js');
	var formatLocation = util.formatLocation;
	export default {
		 computed: {  
		    i18n () {
		      return this.$t('index')  
		    }  
		  },
		
		components: {
			mediaList,uniDrawer,uniLoadMore,uniIcon
		},
		onReachBottom(e) {
			
				this.getlist();
		
		},
		data() {
			return {
				title:this.$t('index.home'),
				list: mask.fidtxt,
				flist:this.$t('index.flist'),
				newsitems: [],
				imgswt:ysv8set.imgswt,
				lc:false,
				dz:mask.dz,
				dc:mask.dc,
				rightDrawerVisible: false,
				showImg: true,
				pagtime:0,
				id:0,
				loadingType:0,
				mess:0,
				q:this.$t('index.q'),
				 showposts:ysv8set.showposts,
				loadingText:this.$t('loadingText'),
			}
		},onShareAppMessage() {
if(ysv8set.userdata){var suid=ysv8set.userdata['id']}
   return {
    title: this.title,
    path: '/pages/chat/index?upuid='+suid
   }
  }, onLoad: function(e) {	
if(e.upuid){ysv8set.upuid=e.upuid;ysv8set.localStorage.setItem("upuid",e.upuid); }
// #ifdef  APP-PLUS
if(!localStorage.getItem("agree")){
	uni.redirectTo({
	    url: '/pages/index/nips'
	});
	
	return false;
}
// #endif
  if(e.lc){
	  this.lc=e.lc;
	  this.dz="SEL";
	  mask.lc=e.lc;
	  mask.dz="SEL";
  }else{
	  var __self=this;
     uni.getLocation({
        success: function (res) {
			__self.lc=formatLocation(res.longitude, res.latitude);
			mask.lc=__self.lc;
			__self.dz='AUTO';
			mask.dz='AUTO';
			ysv8set.localStorage.setItem("lc",mask.lc);
			//ysv8set.localStorage.setItem("dz",mask.dz);		
        },fail:function(){
		
		uni.authorize({
		    scope: 'scope.userLocation',
		    success() {
		        uni.getLocation({
					success: function (res) {
						__self.lc=formatLocation(res.longitude, res.latitude);
						mask.lc=__self.lc;
						__self.dz='AUTO';
						mask.dz='AUTO';
						ysv8set.localStorage.setItem("lc",mask.lc);
						//ysv8set.localStorage.setItem("dz",mask.dz);		
					}
					
				});
		    }
		})
		
		}});
    
}
   
  
   			
  
        },onNavigationBarButtonTap(e) {
	this.share();
  },
  onPullDownRefresh:function(){/*下拉刷新*/
          setTimeout(function () {
              uni.stopPullDownRefresh();
          }, 1000);
	  
  },
		onShow: function() {
			// #ifdef  MP-BAIDU
			swan.setPageInfo({
         title: '零久附近通_免费同城信息发布_基于LBS更精准',
         keywords: '零久附近通,同城,免费同城信息发布,附近通',
         description: '零久附近通，免费同城信息发布，基于经纬度定位更科学',
         releaseDate: '2019-09-04 12:01:30',
         image: [ysv8set.imgcdn+'logo.png']
     })
					// #endif
 },
		onReady: function() {
			
				
				this.getlist()
		},
		methods: {
			change:function(e,mode){
				uni.navigateTo({
	 url: mode+'?id=' + e.value
				})
				},
			restart:function(e){
				this.pagtime=0;
				this.loadingType=0;
				this.newsitems = [];
				this.getlist();
				},
			//搜索支持
						onKeyInput:function(e){
							this.q = e.target.value;
						},
						so:function(){
							uni.navigateTo({url:'s?q='+encodeURIComponent(this.q)+'&fid=0'});	
							},
						confirm:function(str){
							this.q=str.detail.value;
							this.so();
						},//搜索支持完毕		
  mysetdc:function(){
   uni.showActionSheet({
    itemList: ['5KM','10KM', '50KM', '100KM','400KM','800KM'],
    success: (e) => {
					if(e.tapIndex=='0'){this.dc=5;}
     if(e.tapIndex=='1'){this.dc=10;}
    if(e.tapIndex=='2'){this.dc=50;}
    if(e.tapIndex=='3'){this.dc=100;}
    if(e.tapIndex=='4'){this.dc=400;}
    if(e.tapIndex=='5'){this.dc=800;}
     mask.dc=this.dc;
	 ysv8set.localStorage.setItem("dc",mask.dc);
  this.restart();
    }
   })
   
  },
  
  
			   closeRightDrawer() {
 this.rightDrawerVisible = false;
			   },
			   showRightDrawer() {
 this.rightDrawerVisible = true;
			   },share() {
			//#ifdef APP-PLUS	
			ysv8set.share_app(this.title,ysv8set.www,ysv8set.imgcdn+'logo.png');
			//#endif	
			//#ifndef APP-PLUS
			ysv8set.share(this.title,ysv8set.www,ysv8set.imgcdn+'logo.png');
			//#endif	
						},
			   buttonbar:function(e,bool){
 if(bool){
 uni.navigateTo({url: '/pages/' + e});
 }else{
  uni.navigateTo({url:e});
 }
			   },
			   openright(){
			   this.rightDrawerVisible = !this.rightDrawerVisible;
			   },
			   gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
			   gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
			   
         goDetail(e) {
             uni.navigateTo({
                 url: 't?id=' + e.id
             })
         },
			   chooseLocation: function () {
				 var __self=this; 
 uni.chooseLocation({
  success: (res) => {
				mask.dz=res.address;
				mask.lc=formatLocation(res.longitude, res.latitude);
				__self.lc=mask.lc;
				__self.dz=mask.dz;
				//ysv8set.localStorage.setItem("dz",mask.dz);
				ysv8set.localStorage.setItem("lc",mask.lc);
				__self.getlist();
  }
 })
			   },
			   
 getlist:function(){
		if (this.loadingType !== 0) {return false;}    
			if(this.lc==false){
			 this.chooseLocation();
			 return false;
			 }
			this.loadingType = 1;
			   if(this.pagtime==0 && ysv8set.userdata){
				var md="POST";
				var mddata={
					YSV8_HEX: ysv8set.ysv8hex
				}
					
				}else{
					var md="GET";
					var mddata={
						t: ysv8set.timestamp
					}
					
				}
				
 uni.request({
				   method:md,
    url: ysv8set.www+'index/'+this.id+'/'+this.pagtime+'.api?lang='+this._i18n.locale+'&lc='+this.lc+'&dc='+this.dc,
    data: mddata,
    success: (res) => {
     var data=res.data;
			 var setdataarray=ysv8set.setdata(data['data'], 'down', this.newsitems, this.pagtime,'btime',this.lc);
			if(ysv8set.isArray(setdataarray) ==true){
			  this.newsitems=setdataarray[0];
			 this.pagtime=setdataarray[1];
			}
			if(data['fidtxt']){
				var j=0; var len=0;
		for(j = 0,len=data['fidtxt'].length; j < len; j++) {
		   data['fidtxt'][j]['label']=data['fidtxt'][j]['title2'];
		   data['fidtxt'][j]['value']=data['fidtxt'][j]['id'];
		}
				
			this.list=data['fidtxt'];
			}
			
			
			if('title' in data){
				this.title=data['title'];
			uni.setNavigationBarTitle({title: this.title});
			}
			
			
			if(data['mess']){
			   this.showRightDrawer();
			   this.mess=data['mess'];
			   }
			   
			   setTimeout(() => {
			if (setdataarray[2]<10) {
   this.loadingType = 2;
   }else{
    this.loadingType = 0;
					}
			
   }, 100);  
    },
    fail: (err) => {
     uni.showModal({content:this.$t('index.error'),showCancel:false})
      setTimeout(() => {this.loadingType = 0;}, 100);  
    }
   })
 }
		}
	}
</script>

<style>
	
	.f-body {
		border-top: 1px #f5f5f5 solid;
		padding: 20upx;
		background: #fff
	}

	.f-info {
		padding: 20upx;
		color: #3b4144;
		background: #fff
	}

	.image {
		width: 50upx;
		height: 50upx;
	}

	.text {
		font-size: 26upx;
		margin-top: 10upx;
	}
	.uni-grid-item {
		box-sizing: border-box
	}
	
	.uni-grid-item__box {
		position: relative;
		width: 100%;
		border-bottom: 1px #d0dee5 solid;
		border-right: 1px #d0dee5 solid
	}
	
	.uni-grid-item__box-item {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		font-size: 32upx;
		color: #666;
		padding: 20upx 0;
		box-sizing: border-box
	}
	
	.uni-grid-item__box-item .image {
		width: 50upx;
		height: 50upx
	}
	
	.uni-grid-item__box-item .text {
		font-size: 26upx;
		margin-top: 10upx
	}
	
	.uni-grid-item__box.uni-grid-item__box-square {
		height: 0;
		padding-top: 100%
	}
	
	.uni-grid-item__box.uni-grid-item__box-square .uni-grid-item__box-item {
		position: absolute;
		top: 0
	}
	
	.uni-grid-item__box.border {
		position: relative;
		box-sizing: border-box;
		border-bottom: 1px #d0dee5 solid;
		border-right: 1px #d0dee5 solid
	}
	
	.uni-grid-item__box.border-top {
		border-top: 1px #d0dee5 solid
	}
	
	.uni-grid-item__box.uni-highlight:active {
		background-color: #eee
	}
	
	.uni-grid-item__box-badge,
	.uni-grid-item__box-dot,
	.uni-grid-item__box-image {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		z-index: 10
	}
	
	.uni-grid-item__box-dot {
		width: 20upx;
		height: 20upx;
		background: #ff5a5f;
		border-radius: 50%
	}
	
	.uni-grid-item__box-badge {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 0;
		height: 0
	}
	
	.uni-grid-item__box-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100upx;
		height: 100upx;
		overflow: hidden
	}
	
	.uni-grid-item__box-image .box-image {
		width: 90upx
	}
	.uni-grid {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		border: 1px #d0dee5 solid
	}
	.list-view{padding-bottom: 100upx;}
	.foot{z-index:999; 
	position:fixed; 
	bottom:0; 
	left:0; 
	width:100%; }
</style>