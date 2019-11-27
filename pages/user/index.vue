<template>
	<view>
		<template v-if="islogin">		
			<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="gonav('my/index?uid='+userdata['id'])">
							<view class="uni-media-list">
								<view class="uni-media-list-logo">
									<image v-if="userdata['avatar']" :src="imgswt+userdata['avatar']"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">
									<uniIcon type="home" size="16">{{userdata.user}}</uniIcon>
									
								</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{userdata.ps}}</view>
								</view>
							</view>
						</view>
					</view>
					<!--  #ifdef  MP-WEIXIN -->
					<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
					<!--  #endif -->
			
						
						
<view class="table" @tap="gonav('user/friend')">
						<view class="th"><uniIcon type="commenting" size="16" :class="mess>0?'red':''">{{i18n.mess}}</uniIcon></view>
						<view class="td"><text :class="mess>0?'red':''">{{mess}}</text></view>
						</view>			
							
<view class="table" @tap="gonav('user/set')">
						<view class="th"><uniIcon type="cogs" size="16">{{i18n.setting}}</uniIcon></view>
						
						</view>								
<view class="table" @click="pay()">
						<view class="th"><uniIcon type="diamond" size="16">{{i18n.gold}}</uniIcon></view>
						<view class="td"><text class="red">{{userdata['gold']}}</text></view>
						</view>						
<view class="table">
						<view class="th"><uniIcon type="id-badge" size="16">ID</uniIcon></view>
						<view class="td"><text>{{userdata['id']}}</text></view>
						</view>
<view class="table">
						<view class="th"><uniIcon type="credit-card" size="16">{{i18n.credits}}</uniIcon></view>
						<view class="td"><text class="red">{{userdata['credits']}}</text></view>
						</view>
				
					<view class="table">
						<view class="th"><uniIcon type="graduation-cap" size="16">{{i18n.group}}</uniIcon></view>
						<view class="td"><text>{{userdata['group']}}</text></view>
						</view>
				
					<view class="table">
						<view class="th"><uniIcon type="envelope" size="16">E-MAIL</uniIcon></view>
						<view class="td"><text>{{userdata['email']}}</text></view>
						
				</view>	
					
	<view class="uni-btn-v" style="background-color: #007aff; color: #fff;line-height:3; text-align: center;">
		<uniIcon type="sign-out" size='20' @click="out" >{{i18n.out}}</uniIcon>
	</view>
		</template>
		<login v-else v-bind:islogin="islogin" v-bind:aibool="aibool" v-bind:wxbool="wxbool" v-on:Changed = "setislogin($event)" ref="login"></login>
		
		<view class="uni-btn-v" style="background-color: #007aff; color: #fff;line-height:3; text-align: center;">
			<uniIcon type="refresh" size='20' @click="clear()" >{{i18n.clear}}</uniIcon>
		</view>
		
		</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import login from '@/components/ysv8/login.vue';
		/*import ads from '@/components/ysv8/ads.vue';*/
			import uniIcon from '@/components/uniIcon.vue'
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
		components: {
			login,
			/*ads,*/
			uniIcon
			},
		data() {
			return {
				title:'user',
				mess:0,
				 showposts:ysv8set.showposts,
				islogin:false,
				wxbool:false,
				aibool:false,
				userdata:ysv8set.userdata,
				bucketcdn:ysv8set.bucketcdn,
				imgswt:ysv8set.imgswt,
			};
		},methods: {
			gonav(e){
				uni.navigateTo({url: '/pages/' +e})},
			clear:function(){
			ysv8set.localStorage.clear();
			//#ifdef H5
			location.reload()
			//#endif
			// #ifdef APP-PLUS
			plus.runtime.restart();
			//#endif
			//#ifdef MP
			uni.showModal({
			    title: 'restart',
			    content: 'Please restart',
			    success: function (res) {
					uni.reLaunch({
					    url: '/pages/chat/index'
					});
					},
					});
					//#endif
			
			
			},
			pay:function(){
				
				
				
								uni.showActionSheet({
							itemList: [this.$t('index.pay'),this.$t('index.tx'),this.$t('index.mx'),'taobao'],
							success: (e) => {
								if(e.tapIndex=='0'){
									ysv8set.muialert({
										code:302,
										info:this.$t('index.pay')
										
									},ysv8set.userdata);
									
									
								}
								if(e.tapIndex=='2'){
									uni.navigateTo({url: '/pages/my/index?id=gold'});
									
									}
									if(e.tapIndex=='3'){
										uni.navigateTo({url: '/pages/user/web?url=https://44api.taobao.com'});
										}
									
								if(e.tapIndex=='1'){
									
									ysv8set.muialert({
										code:307,
										url:'/pay/tx',
										info:this.$t('index.tx')
										
									},ysv8set.userdata);
									
									
								}
								},
								});
							
							
							
							
							},
			setislogin:function(data) {
				if(data['code']==200){
					this.islogin=true;
					if('hex' in data){
						ysv8set.ysv8hex=data['hex'];
						 ysv8set.localStorage.setItem("ysv8hex",data['hex']);
						}
						if('my' in data){
					   ysv8set.userdata=data['my'];
						ysv8set.localStorage.setItem("user",JSON.stringify(data['my']));
						}
						
						if('openId' in data){
							ysv8set.openId=data['openId'];
							 ysv8set.localStorage.setItem("openId",data['openId']);
							}
					if('mess' in data){
						this.mess=data['mess'];
								if(data['mess']>0){
									uni.showToast({
					    title: this.$t('index.mess'),
					});
								}
							}
					this.userdata=data['my'];
				
					ysv8set.userdata=this.userdata;
				 ysv8set.localStorage.setItem("user",JSON.stringify(data['my']));
				
				}else{
					this.islogin=false;
					
				}
				
				
				
				
			},out:function(){
				this.islogin=false;
				ysv8set.ysv8hex='no'
				ysv8set.userdata=false;
				ysv8set.localStorage.removeItem('user');
				ysv8set.localStorage.removeItem('ysv8hex');
				
			}
			
			},
			onReady() {
			this.$refs.login.getdata();	
			},
			onLoad:function(e){
				
			}
			
	}
</script>

<style>
	.table{
		background-color: #FFFFFF;
		border-bottom: 2upx solid #D8D8D8;
		padding: 20upx;
	    flex-direction: row;
	}
	.table .th{
		 margin-right: 20upx;
		 display: inline!important;
		
	}
	.table .td{
		float: right;font-weight: bold;
	}
	
	.uni-media-list-logo2 {padding-right: 40upx;}
</style>
