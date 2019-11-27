<template>
    <view class="uni-padding-wrap">
			
<view class="uni-common-mt">
	<view class="row"><view class="col">
	<block v-for="(item,index2) in top_items"  :key="item.id">
	<view @tap="topbar(item)" style="padding-left: 16upx;" :class="id==item['id']?'tar_active c':'tar_no c'">{{item.name}}</view>
		    </block></view></view>
		</view>
<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
<view class="uni-media-list" @click="gonav('user/chat?uid='+user['id']+'&user='+user['user']+'&ava='+imgswt+user['avatar'])">
						<view class="uni-media-list-logo">
							<image v-if="user['avatar']" :src="imgswt+user['avatar']"></image>
						</view>
						<view class="uni-media-list-body">
							
							<view class="uni-media-list-text-top">
							<uniIcon type="commenting-o" :str="user.user" size="18" ></uniIcon>
							
							</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{user.ps}}</view>
						</view>
					</view>
				</view>
			</view>
<view  v-if="id=='index'">	
		<view class="table" v-if="user['email']">
		<view class="td"><uniIcon type="envelope" size="16"></uniIcon><text  style="margin-left: 10px;">{{user['email']}}</text></view>
		</view>	
		<view class="table" v-if="user['ps']">
		<view class="td"><uniIcon type="file-text-o" size="16"></uniIcon><text style="margin-left: 10px;">{{user['ps']}}</text></view>
		</view>				
			
</view>
<!--  #ifdef  MP-WEIXIN -->
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
 <view class="list-view bw">
	<block v-if="id=='gold'"> 	 
	  <goldList :newitem="newsitem" v-for="(newsitem,index2) in items"  :key="newsitem.id"></goldList>
	 </block>
	<block v-else> 
 <chatList :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)" v-for="(newsitem,index2) in items"  :key="newsitem.btime"></chatList>
</block>
</view>
<uni-load-more :loadingType="loadingType" :contentText="loadingText" class="c bw"></uni-load-more>

				
				
	
	
			
			
    </view>
	
</template>
<script>
	
    import ysv8set from '@/static/ysv8/index.js';
	import mask from '@/static/ysv8/chat.js';
	    import chatList  from '@/pages/chat/list.vue';
		import goldList  from '@/pages/chat/goldlist.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	import uniIcon from '@/components/uniIcon.vue';
	import uParse from '@/components/uParse/src/wxParse.vue'
    export default {
        components: {
			uParse,
chatList ,
goldList,
uniLoadMore,uniSegmentedControl,
uniIcon
        },onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
		onReachBottom(e) {
			
				this.getlist();
			
		},
        data() {
            return {
				title: '用户浏览',
				rightDrawerVisible: false,
				showImg: false,
				pagtime:0,
				lc:mask.lc,
				top_items: this.$t('index.top_items'),
				user:[],
				id: 'index',
				loadingText: this.$t('loadingText'),
				follow:false,
				ajaxi:true,
				loadingType:0,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                items:[],
				imgswt:ysv8set.imgswt,
				active:'u',
				method:'69',
				type:'',
				content:'',
				ok:false,
				link:'',
				website:ysv8set.website,/*默认简单网站*/
				www:ysv8set.www,
				morebool:false
            }
        },
        onLoad: function(e) {	
			if(e.id){
				this.id=e.id;
			}
			
					if(e.uid){
						this.method=e.uid;
					}else{
						if(ysv8set.userdata){
							this.method=ysv8set.userdata['id'];
						}else{
							uni.showModal({
							content:this.$t('index.login'),
showCancel:false,
success: (e) => {
								uni.redirectTo({
													url: '/pages/user/index'
												});
									}
								})
						}
						
					}
					
					this.showImg = true;
        },onReady() {
			this.getlist();
		},onNavigationBarButtonTap(e) {
	this.share();
  },
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/my/index?uid='+this.method
			}
		},
        methods: {
			share() {
			//#ifdef APP-PLUS	
			ysv8set.share_app(this.title,ysv8set.www+'u/'+this.method+'.html',ysv8set.imgcdn+'logo.png');
			//#endif	
			//#ifndef APP-PLUS
			ysv8set.share(this.title,ysv8set.www+'u/'+this.method+'.html',ysv8set.imgcdn+'logo.png');
			//#endif	
						},
			showmore(){
				this.morebool=!this.morebool;
			},
			topbar:function(e){
				this.id=e.id;
				this.items=[];
				this.loadingType=0;
				this.pagtime=0;
				this.showImg = true;
				this.getlist();
			},
			phoneCall:function(e){
			uni.makePhoneCall({
              phoneNumber: e['tel']
                });
          },
	geLocation:function(e){
	var lat1a=e['lc'].split(',');
				        uni.openLocation({
				            latitude: Number(lat1a[0]),
				            longitude: Number(lat1a[1]),
				            success: function () {
				           
				            }
				});
								
							},		
			
			gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
			gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
            goDetail(e) {
                uni.navigateTo({
                     url: '/pages/chat/t?id=' + e.id
                })
            },
            close(index1, index2) {
                
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
			 } })
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
				method:'POST',
								url: ysv8set.www+this.active+'/'+this.method+'/'+this.id+'/'+this.pagtime+'.api?lang='+this._i18n.locale,
							data: {
								YSV8_HEX: ysv8set.ysv8hex
							},
							success: (res) => {
								var data=res.data;
								if(data['code']!=200){
									ysv8set.muialert(data)
									return false;
									}
								
								
								
			  this.user=data['user'];
				
				var setdataarray=ysv8set.setdata(data['data'], 'down', this.items, this.pagtime,'btime',this.lc);
                if(ysv8set.isArray(setdataarray)){
				this.items=setdataarray[0];
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
								uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})
								this.loadingType = 0;
							},
							complete:()=> {
							
							}
						})
				},

            
        }
    }
</script>

<style>
.table{
		background-color: #FFFFFF;
		border-bottom: 2upx solid #D8D8D8;
		padding: 10upx;
	}
	.table .th{
		 margin-right: 20upx;
		 font-weight: bold;
		 display: inline!important;
		
	}
.tar_active{
	color: rgb(0, 122, 255); font-size: 30upx;
	
}
.tar_no{
	color: rgb(122, 126, 131); font-size: 30upx;
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
	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}
	
	.bottom-content {
		display: flex;
		text-align: left;
		flex-wrap: wrap;
		padding: 0 35upx;
	}
	
	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}
	
	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		background: #007aff;
		border-radius: 10upx;
	}
	
	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}
	
	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
	}
</style>