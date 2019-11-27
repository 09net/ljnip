<template>
	<view>
		<view style="padding: 100upx; text-align: center;" v-show="loading<100">
				<uniIcon size="25" type="spinner"></uniIcon>
				<view class="red">{{loading}}</view>
			
				</view>
		<view class="uni-padding-wrap" v-show="loading>99">
			<form @submit="formSubmit">
				<view>
					<view class="uni-title">{{i18n.account}}</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="user"  />
						</view>
					</view>
				</view>
				<view>
					<view class="uni-title">{{i18n.password}}</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="pass" password  />
						</view>
					</view>
				</view>
				
				
				<view class="uni-btn-v uni-common-mt">
					
					<button class="btn-submit" type="primary" formType="submit">{{btext}}</button>
					
					<view class="row c">
					<view class="col" style="flex-direction: row;">
					<view class="col_6">
						<view class="uni-btn-v" style="line-height:3; text-align: center;">
							<uniIcon size='16' @click="safepw" >{{i18n.retrieve}}</uniIcon>
						</view>
				</view>
					<view class="col_6">
						
						<view class="uni-btn-v" style="line-height:3; text-align: center;">
							<uniIcon size='16' @click="setadd" >{{stext}}</uniIcon>
						</view>
						
						</view>
					</view>
				</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import ysv8set from '@/static/ysv8/index.js';
import uniIcon from '@/components/uniIcon.vue'
	export default {
		name:'login',
		props:['islogin','wxbool','aibool'],
		data() {
			return {
				add:false,
				btext:this.$t('index.login'),
				stext:this.$t('index.register'),
				encryptedData:'',
				loading:100,
				tel:'',
				nickName:'',
				timei:0,
				avatarUrl:'',
				yzmvalue:this.$t('index.verification'),
				iv:'',
				code:'',
				regid:'login'
			}
		},components: {
			uniIcon
		},
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 }
		,methods: {
			ailogin:function () {
				 var __self=this;
				my.getAuthCode({
				        scopes: 'auth_user', 
				        success:(res) =>{
							
							 my.getAuthUserInfo({
      success: (userInfo) => {
		  	__self.iv='ali';
		   __self.code=res.authCode;
		   __self.nickName=userInfo.nickName;
		   __self.avatarUrl=userInfo.avatar;
		  __self.getdata();
      },fail: (res) => {
					  my.alert({
					   content: 'info-ERROR',
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
			bindGetUserInfo: function () {
					  var __self=this;
					  this.scope=true;
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    __self.code=loginRes.code;
			    uni.getUserInfo({
			      provider: 'weixin',
			      success: function (infoRes) {
					 
					  __self.iv=infoRes.iv;
			        __self.encryptedData=infoRes.encryptedData;
			       __self.nickName=infoRes.userInfo.nickName;
			       __self.avatarUrl=infoRes.userInfo.avatarUrl;
				   __self.getdata();
			      }
			    });
			  }
			});
			},
			
			formSubmit:function(e){
				this.loading=50;
				var formData = e.detail.value;
				uni.request({method:'POST',
url: ysv8set.www+'user/'+this.regid+'.api?lang='+this._i18n.locale,
data: formData,
success: (res) => {
				var data=res.data;
				if(data['code']==200){
				if(typeof(data['hex'])!="undefined"){ 
				ysv8set.ysv8hex=data['hex'];
				 ysv8set.localStorage.setItem("ysv8hex",data['hex']);
				 }
				this.getdata();
				}else{
					
					uni.showModal({
						content:data['info'],
						showCancel:false
					})
					
				}
									
									
									
									
											},
											fail: (err) => {
												uni.showModal({
													content:err.errMsg,
													showCancel:false
												})
											},
											complete:()=> {
											this.loading=100;
											}
										})
				
				
			},
			getyzm:function(){
				if(this.timei==0){
					this.timei=1;
					var _self=this;
					uni.request({method:'POST',
					url: ysv8set.www+'mb/send.api?lang='+this._i18n.locale,
					data: {"phone" : this.tel},
					success: (res) => {
						ysv8set.muialert(res.data);
						if(res.data['code']!=200){
							_self.timei=0;}else{
							_self.timei=60;
							var interval = setInterval(function () {
							_self.yzmvalue=(_self.timei - 1) + 'S'
							_self.timei--;
							if (_self.timei <= 0) {
							clearInterval(interval)
							_self.yzmvalue=this.$t('index.obtain');
							}
							}, 1000);	
							}
							
},fail: (err) => {
this.timei=0;
uni.showModal({content:err.errMsg,showCancel:false})}
});					
return true;
}
},getdata:function(){
				var __self=this;
				this.loading=50;
				
				if(!ysv8set.ysv8hex && this.code==''){
			this.$emit("Changed",{
				code:301
			});
			this.loading=100;
				return false;
					}
					this.loading=70;
				uni.request({
				method:'POST',
								url: ysv8set.www+'user/get.api?lang='+this._i18n.locale,
							data: {
								YSV8_HEX: ysv8set.ysv8hex,
								encryptedData:__self.encryptedData,
								nickName:__self.nickName,
								avatarUrl:__self.avatarUrl,
								iv:__self.iv,
								code:__self.code,
							},
							success: (res) => {
this.$emit("Changed",res.data);
					
					
					
					
							},
							fail: (err) => {
								uni.showModal({
									content:err.errMsg,
									showCancel:false
								})
							},
							complete:()=> {
						this.loading=100;
							}
						})
				
				
			},
			
			setadd:function(){
				uni.navigateTo({
									url: '/pages/user/web?url='+ysv8set.www+'user/add'
								})
				
			},
			safepw:function(){
				
				uni.navigateTo({
									url: '/pages/user/web?url='+ysv8set.www+'user/repass'
								})
			}
		}
	}
</script>

<style>
	
</style>