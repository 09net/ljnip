<template>
	<view class="warp">
	
	<view id="sreach">
	<view class="row bw p10">
		<view class="col">
				<view class="col_9">
				<input confirm-type="search" @confirm="confirm" @input="onKeyInput" class="myinput" type="text" :value="q" />
			</view>
			<view class="col_3 c">
				<button type="primary" @click="so()" size="mini"><uniIcon size="20" type="search"></uniIcon></button>	
			</view>
		</view>
		
	</view>
	</view>
	<view class="list-view">
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
	<block v-for="(newsitem,index2) in newsitems"  :key="index2">
	<media-list :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)"></media-list>
	</block>
	<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
	</view>		
	
	<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer" :lc="lc" :mess="mess"></uni-drawer>
	
<view class="foot bw"><view class="row"><view class="col">
 
<view class="col_20 c" @tap="chooseLocation()"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
           <uniIcon size="25" type="map-marker"></uniIcon>
        </view><!----></view></view>
 <view class="col_20 c" @tap="mysetdc()"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
   <view class="fa">{{dc}}KM</view>
  </view><!----></view></view>
<view v-if="showposts" class="col_20 c" @tap="buttonbar('add',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
		 <uniIcon size="25" type="pencil-square" :color="follow?'':'red'"></uniIcon>
        </view><!----></view></view>
	<view v-else class="col_20 c" @tap="buttonbar('user/index',true)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
			 <uniIcon size="25" type="pencil-square"></uniIcon>
	        </view><!----></view></view>
		<view class="col_20 c" @tap="fav"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
				 <uniIcon size="25" type="heart" :color="follow?'red':''"></uniIcon>
		        </view><!----></view></view>
		<view class="col_20 c" @tap="openright()"><view class="uni-tabbar__bd "><view class="uni-tabbar__label tar_no">
        <uniIcon size="25" type="bars" :color="mess>0?'#FF0000':''"></uniIcon>
        </view><!----></view></view></view></view></view></view>

 		
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
		onPullDownRefresh:function(){/*下拉刷新*/
		console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
			  
		},
		onReachBottom(e) {
			
				this.getlist();
			
		},
		data() {
			return {
				title:'零久附近通',
				list: mask.fidtxt,
				newsitems: [],
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				lc:mask.lc,
				dz:mask.dz,
				dc:mask.dc,
				follow:false,
				rightDrawerVisible: false,
				showImg: true,
				pagtime:0,
				id:0,
				loadingType:0,
				mess:0,
				q:this.$t('index.q'),
				 showposts:ysv8set.showposts,
				loadingText: this.$t('loadingText'),
			}
		},onShareAppMessage() {
   return {
    title: this.title,
    path: '/pages/chat/f?id='+this.id
   }
  }, onLoad: function(e) {
var __self=this;	
if(e.upuid){ysv8set.upuid=e.upuid;ysv8set.localStorage.setItem("upuid",e.upuid); }
 if(e.id){
	this.id=e.id;
	 }
 

 
  if(e.lc){
	  this.lc=e.lc;
	  this.dz="SEL";
	  mask.lc=e.lc;
	  mask.dz="SEL";
  }else{
     uni.getLocation({
        success: function (res) {
			__self.lc=formatLocation(res.longitude, res.latitude);
			mask.lc=__self.lc;
			__self.dz='AUTO';
			mask.dz='AUTO';
			ysv8set.localStorage.setItem("lc",mask.lc);
			//ysv8set.localStorage.setItem("dz",mask.dz);		
        }});
    
}
   
  
   			
  
        },onNavigationBarButtonTap(e) {
	this.share();
  },
		onShow: function() {
			// #ifdef  MP-BAIDU
			swan.setPageInfo({
			            title: this.title+'_零久附近通',
			            keywords: this.title+',零久附近通',
			            description: this.title+',零久附近通',
			            releaseDate: '2019-09-04 12:01:30',
			            image: [ysv8set.imgcdn+'logo.png']
			        })
					// #endif
			    },
		onReady: function() {
			this.getlist()
		},
		methods: {
			
			restart:function(e){
				this.pagtime=0;
				this.loadingType=0;
				this.newsitems = [];
				setTimeout(() => {this.getlist();},50);
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
			ysv8set.share_app(this.title,ysv8set.www+'index/'+this.id,ysv8set.imgcdn+'logo.png');
			//#endif	
			//#ifndef APP-PLUS
			ysv8set.share(this.title,ysv8set.www+'index/'+this.id,ysv8set.imgcdn+'logo.png');
			//#endif	
						},
			   buttonbar:function(e,bool){
				   if(e=='add'){
					   if(!this.follow){this.fav();
					   return false;
					   }
				   }
				   
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
				__self.restart();
			      
			     }
			    })
			   },
			   fav(){
			   
			 uni.request({method:'POST',
			 url: ysv8set.www+'index/friend_state.api?lang='+this._i18n.locale,
			 data: {
			 fid:this.id,
			 type:this.follow,
			 YSV8_HEX: ysv8set.ysv8hex
			 },
			 success: (res) => {
			 var data=res.data;
			 
										 if(data['code']==200){
											 this.follow=data['id']
										 }else{
											 
											 ysv8set.muialert(data);
										 }
			 },
			 fail: (err) => {uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})},
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
				if(data['follow']>0){
				this.follow=true;
				}
				
				if('title' in data){
					this.title=data['title'];
				uni.setNavigationBarTitle({title: this.title});
				}
				
			   
			 
			        if (setdataarray[2]<10) {
			       
			         this.loadingType = 2;
			    
			
			        }else{
			        this.loadingType = 0;
					}
			
			       
			       },
			       fail: (err) => {
			        uni.showModal({content:ysv8set.langfun("网络故障"),showCancel:false})
			         this.loadingType = 0;
			       }
			 
			      })
			    }
		}
	}
</script>

<style>

	.list-view{padding-bottom: 100upx;}
	.foot{z-index:999; 
	position:fixed; 
	bottom:0; 
	left:0; 
	width:100%; }
</style>