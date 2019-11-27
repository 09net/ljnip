<template>
    <view>
<view class="row p10 m10">
	<view class="col">
		<view class="col_3 c" style="background-color: #007aff; color: #fff;line-height:3; text-align: center;"><text @click="showSinglePicker">{{fidtext}}</text></view>
			<view class="col_6">
			<input confirm-type="search" style="text-align: left;" @confirm="confirm" @input="onKeyInput" class="p10 bw w90" type="text" :value="q"  placeholder="keys" />
		</view>
		<view class="col_3 c">
			<button type="primary" @click="so()" size="mini"  class="w90"><uniIcon size="20" type="search"></uniIcon></button>
		</view>
	</view>
</view>	
 <view class="list-view">
	 
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
<block v-for="(Xzq,i2) in Xzqy" :key="Xzq.name" v-if="Xzqy">
<Xzqlist :newitem="Xzq" @click="goXzq(Xzq)"></Xzqlist>
</block>
<block v-for="(aiforum,i2) in aiforuma" :key="aiforum.btime" v-if="aiforuma">
<flist :newitem="aiforum" @click="goaif(aiforum)"></flist>
</block>
<block v-for="(us,i3) in userList" :key="us.name" v-if="userList">
<userList :newitem="us" @click="gouserlist(us)"></userList>
</block>
<block v-for="(newsitem,index2) in newsitems"  :key="index2">
<media-list :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)"></media-list>
</block>
<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
</view>			
<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="list"></mpvue-picker>
						 						 
						 
</view>
</template>
<script>
    import ysv8set from '@/static/ysv8/index.js';
    import mediaList from './list.vue';
	 import Xzqlist from './Xzqlist.vue';
	  import flist from './flist.vue';
	 
	 import userList from '@/pages/user/friendlist.vue';
	import mask from '@/static/ysv8/chat.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniIcon from '@/components/uniIcon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
    export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
        components: {
            mediaList,
			uniLoadMore,
			flist,
			Xzqlist,
			userList,
			uniIcon,mpvuePicker
        },onNavigationBarButtonTap(e) {
			this.share();
		},
		onReachBottom(e) {
		
				this.getlist();
	
		},
        data() {
            return {
              title: '搜索',
				pickerValueDefault: [1],
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				rightDrawerVisible: false,
				showImg: true,
				pagtime:0,
				loadingText: this.$t('loadingText'),
					 showposts:ysv8set.showposts,
				list: mask.fidtxt,
				follow:false,
				ajaxi:true,
				loadingType:0,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                newsitems:[],
				aiforuma:[],
				lc:mask.lc,
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				q:this.$t('index.q'),
				Xzqy:false,
				userList:false,
				fidtext:this.$t('index.select'),
				fid:0,
            }
        },
        onLoad: function(e) {
					
					if(e.q){
						this.q=decodeURIComponent(e.q);
					}
					if(e.fid){
						this.fid=e.fid;
						if(this.fid>0){
						this.fidtext=mask.fidtxt[this.fid-1]['label']
						}
					}
					
        },onShow: function() {
			// #ifdef  MP-BAIDU
			swan.setPageInfo({
			            title: this.q+'_零久附近通',
			            keywords: this.q,
			            description: this.q+'_零久附近通',
			            releaseDate: '2019-09-04 12:01:30',
			            image: [ysv8set.imgcdn+'logo.png']
			        })
					// #endif
			    },onReady(){
			this.getlist();
			},
		onShareAppMessage() {
			if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
			 return {
			 title: this.title,
			 path: '/pages/chat/s?q='+encodeURIComponent(this.q)+'&fid='+this.fid
			}
		},
        methods: {
			gouserlist(e){
			uni.navigateTo({url:'/pages/my/index?uid='+e.id});		
			},
			goaif(e){
				
				uni.navigateTo({
				    url: 'f?id=' + e.id
				})
				
			},
			goXzq(e){
			uni.navigateTo({url:'/pages/user/web?url=https://www.44api.com/a/'+e.id});	
			},
			onCancel(e){
			},
			onKeyInput:function(e){
				this.q = e.target.value;
				
			},
						onConfirm(e) {
							this.fid=e.value[0]
							this.fidtext=e.label
						},
								showSinglePicker() {
									this.mode = 'selector'
								
									this.$refs.mpvuePicker.show()
								},
			share() {
				//#ifdef APP-PLUS
				ysv8set.share_app(this.title,ysv8set.www+'s?q='+encodeURIComponent(this.q)+'&fid='+this.fid,ysv8set.imgcdn+'logo.png');
				//#endif	
				//#ifndef APP-PLUS
				ysv8set.share(this.title,ysv8set.www+'s?q='+encodeURIComponent(this.q)+'&fid='+this.fid,ysv8set.imgcdn+'logo.png');
				//#endif	
			},
			so:function(){
				uni.redirectTo({url:'s?q='+encodeURIComponent(this.q)+'&fid='+this.fid});	
				},
			confirm:function(str){
				this.q=str.detail.value;
				this.so();
			},
			buttonbar:function(e,bool){
				if(bool){
				uni.redirectTo({url: '/pages/' + e});
				}else{
					uni.redirectTo({url:e});
				}
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
					
				if (this.loadingType !== 0) {return;}
				if(this.lc==false){
				 this.chooseLocation();
				 return false;
				 }
				
				this.loadingType = 1;
				this.ajaxi++;	
uni.request({
url: ysv8set.www+'s/'+encodeURIComponent(this.q)+'/0/'+this.pagtime+'.api?lang='+this._i18n.locale+'&fid='+this.fid+'&lc='+this.lc,
data: {
 t: ysv8set.timestamp/*缓存100秒更新一次*/
},
							success: (res) => {
								var data=res.data;
								if(data['code']!=200){
									ysv8set.muialert(data)
									return false;
									}
								
								
			if('Xzqy'  in data){
				this.Xzqy=data['Xzqy'];
			}
			if('aiforuma'  in data){
				this.aiforuma=data['aiforuma'];
			}
			if(data['fidtxt']){
					var j=0; var len=0;
			for(j = 0,len=data['fidtxt'].length; j < len; j++) {
			   data['fidtxt'][j]['label']=data['fidtxt'][j]['title2'];
			   data['fidtxt'][j]['value']=data['fidtxt'][j]['id'];
			}
					
				this.list=data['fidtxt'];
				}
			
			if('user_list'  in data){
				this.userList=data['user_list'];
			}
			
				if('title' in data){
					this.title=data['title'];
				uni.setNavigationBarTitle({title: this.title});
				}
				var setdataarray=ysv8set.setdata(data['data'], 'down', this.newsitems, this.pagtime,'btime',this.lc);
					if(ysv8set.isArray(setdataarray) ==true){
				this.newsitems=setdataarray[0];
				this.pagtime=this.pagtime+1;
				}
			

if (setdataarray[2]<10) {this.loadingType = 2;}else{
this.loadingType = 0;}
},
fail: (err) => {uni.showModal({content:ysv8set.langfun("网络故障"),showCancel:false}); this.loadingType = 0;  },complete:()=> {}})
},
}
}
</script>
<style>
.tar_active{
	color: rgb(0, 122, 255); font-size: 10px;
}
.tar_no{
	color: rgb(122, 126, 131); font-size: 10px;
}
.swiper-box{padding-bottom: 80upx;}
.title {
		font-size: 15px;
		line-height: 20px;
		color: #333333;
		padding: 15px;
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left:8px;
	}

	.input-view {
		width: 92%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap:nowrap;
		margin:7px 0;
		line-height:30px;
	}
	
	.input-view .uniIcon{
		line-height:30px !important;
	}

	.input-view .input {
		height:30px;
		line-height:30px;
		width:94%;
		padding: 0 3%;
	}
	.foot {
		padding-top: 10upx;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		z-index: 999;
		text-align: center;
	}
</style>