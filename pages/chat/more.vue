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
		

	<view class="list-view">
		 
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
		 	
	<block v-for="(newsitem,index2) in newsitems"  :key="index2">
	<media-list :newitem="newsitem" @click="goDetail(newsitem)"></media-list>
	</block>
	
	<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
</view>
	
	
<view class="foot bw"><view class="row"><view class="col">
 
<view class="col_20 c" :class="[id==1?'red':'']" @tap="restart(1)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
           <uniIcon size="20" type="car"></uniIcon>
        </view><!----></view></view>
 <view class="col_20 c" :class="[id==2?'red':'']" @tap="restart(2)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
   <uniIcon size="20" type="cutlery"></uniIcon>
  </view><!----></view></view>
<view class="col_20 c" :class="[id==3?'red':'']" @tap="restart(3)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
		 <uniIcon size="20" type="institution"></uniIcon>
        </view><!----></view></view>
	<view class="col_20 c" :class="[id==4?'red':'']" @tap="restart(4)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
			 <uniIcon size="20" type="shopping-cart"></uniIcon>
	        </view><!----></view></view>	
		
		<view class="col_20 c" :class="[id==5?'red':'']" @tap="restart(5)"><view class="uni-tabbar__bd "><view class="uni-tabbar__label tar_no">
        <uniIcon size="20" type="group"></uniIcon>
        </view><!----></view></view></view></view></view></view>

 		
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import mediaList from './flist.vue';
    import mask from '@/static/ysv8/chat.js';
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
			mediaList,uniLoadMore,uniIcon
		},
		onReachBottom(e) {
		
				this.getlist();
			
		},
		data() {
			return {
				title:this.$t('index.more'),
				newsitems: [],
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				showImg: true,
				pagtime:0,
				id:0,
				loadingType:0,
				q:this.$t('index.q'),
				showposts:ysv8set.showposts,
				loadingText:this.$t('loadingText'),
			}
		},onShareAppMessage() {
if(ysv8set.userdata){var suid=ysv8set.userdata['id']}
   return {
    title: this.title,
    path: '/pages/chat/more?upuid='+suid
   }
  }, onLoad: function(e) {	
if(e.upuid){ysv8set.upuid=e.upuid;ysv8set.localStorage.setItem("upuid",e.upuid); }
if(e.id){
	this.id=e.id;
	}
        },onNavigationBarButtonTap(e) {
	this.share();
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
			restart:function(id){
				this.pagtime=0;
				this.loadingType=0;
				this.newsitems = [];
				this.id =id;
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
			     share() {
			//#ifdef APP-PLUS	
			ysv8set.share_app(this.title,ysv8set.www+'f.html',ysv8set.imgcdn+'logo.png');
			//#endif	
			//#ifndef APP-PLUS
			ysv8set.share(this.title,ysv8set.www+'f.html',ysv8set.imgcdn+'logo.png');
			//#endif	
						},
			 
			   gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
			   gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
			            goDetail(e) {
			                uni.navigateTo({
			                    url: 'f?id=' + e.id
			                })
			            },
			  
			   
			    getlist:function(){
		if (this.loadingType !== 0) {return false;}    
			this.loadingType = 1;
			    uni.request({
				   method:"GET",
			       url: ysv8set.www+'f/'+this.id+'/'+this.pagtime+'.api?lang='+this._i18n.locale,
			       data: {
						t: ysv8set.timestamp
					},
			       success: (res) => {
			        var data=res.data;
			 var setdataarray=ysv8set.setdata(data['data'], 'down', this.newsitems, this.pagtime);
			if(ysv8set.isArray(setdataarray) ==true){
			  this.newsitems=setdataarray[0];
			 this.pagtime=setdataarray[1];
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
			        uni.showModal({content:this.$t('index.error'),showCancel:false})
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