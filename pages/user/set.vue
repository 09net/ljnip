<template>
	<view class="mpvue-picker">
		<view style="padding: 100upx; text-align: center;" v-show="loading<100">
		<uniIcon size="25" type="spinner"></uniIcon>
		<view class="red">{{loading}}</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt" v-show="loading>99">
			<view class="uni-btn-v">
				<view><uniIcon type="user" size="16">{{i18n.pic}}</uniIcon></view>
			<image v-if="avatar2" :src="avatar2" @click="chooseImage()" class="w300"></image>
			</view>
			<view class="uni-btn-v">
				<view><uniIcon type="phone-square" size="16">{{i18n.tel}}</uniIcon></view>
				<input class="uni-input" @input="bindKey" id="email" :value="email" placeholder="15678912345" />
			</view>
			<view class="uni-btn-v">
			<view><uniIcon type="file-text-o" size="16">{{i18n.select}}</uniIcon></view>
			<view class="row"><view class="col">
				
			
				
<view class="col_4 c">
	<view class="uni-list-cell-db">
		
		<picker @change="bindKey" id="snsmode" :value="snsmode" :range="snsa" range-key="name">
			<view class="uni-input" style="background-color: #1482D1; color: #FFFFFF;">{{snsa[snsmode].name}}</view>
		</picker>
		
		

	</view>	
</view>
<view class="col_8 c"><input class="uni-input" @input="bindKey" id="sns" :value="sns" placeholder="assxxx" /></view>
			</view></view>
			
			</view>
				<view class="uni-btn-v">
					<view><uniIcon type="file-text-o" size="16">{{i18n.content}}</uniIcon></view>
				<input class="uni-input" @input="bindKey" id="ps" :value="ps" placeholder="Introduce oneself to" />
			</view>
			<view class="uni-btn-v">
				<view><uniIcon type="map-o" size="16" @click="chooseLocation"><text style="background-color: #1482D1; color: #FFFFFF;">{{dz}}</text></uniIcon></view>
			
			</view>
			<view class="uni-btn-v">
				<button type="primary" @click="upset">{{i18n.save}}</button>
			</view>
		</view>
		<!--  #ifdef  MP-WEIXIN -->
		<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
		<!--  #endif -->
	
		
	</view>
</template>
<script>
	var util = require('@/common/util.js');
	var formatLocation = util.formatLocation;
	 import ysv8set from '@/static/ysv8/index.js';
	  import uniIcon from '@/components/uniIcon.vue';
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
		components: {
			uniIcon
		},
		onLoad() {
},
		onReady() {
			var __self=this;
			uni.getLocation({
			        success: function (res) {
						__self.lc=formatLocation(res.longitude, res.latitude);
						__self.dz='AUTO';
			        },fail:function(){
						
					}});
				this.getinfo();
		},
		data() {
			return {
				userdata:ysv8set.userdata,
				
				lc: false,
				dz:'点击我获取地址',
				title:ysv8set.langfun('设置'),
				dq:'',
				email:'',
				sns:'',
				snsa:[{vale:0,name:'社交类型'},
				{vale:1,name:'微信'},
				{vale:2,name:'QQ'},
				{vale:3,name:'微博'},
				{vale:4,name:'阿里旺旺'}],
				snsmode:0,
				ps:'',
				loading:0,
				avatar:'user.jpg',
				avatar2:'user.jpg',
				label:ysv8set.langfun('区域设置'),
			};
		},
		
		methods: {
			bindKey: function (e) {
						this[e.target.id] = e.target.value
					},
			
			failfun(str){
					uni.showModal({
					content:str,
					showCancel:false,
					success: function (res) {
						uni.navigateBack();
						}
				})
			},
			getinfo:function(){
				this.loading=50;
				uni.request({method:'POST',
				url: ysv8set.www+'user/getinfo.api?lang='+this._i18n.locale,
				data: {
				YSV8_HEX: ysv8set.ysv8hex
				},
				success: (res) => {
					this.loading=100;
				var data=res.data;
										this.email=data['email'];
										this.ps=data['ps'];
										 this.avatar=ysv8set.imgswt+data['avatar'];
										 this.avatar2=this.avatar;
							            this.snsmode=parseInt(data['snsmode']);
								        this.sns=data['sns'];	
							
				},
				fail: (err) => {
					this.failfun(ysv8set.langfun('网络故障'))
				},
				})
				
			},
			chooseImage: async function() {
					uni.chooseImage({
						sourceType: ['camera', 'album'],
						sizeType: ['original'],
						count: 1,
						success: (res) => {
				for (var i in res.tempFiles){
					
					if (res.tempFiles[i]['size']>3024000){
						uni.showToast({
							title: ysv8set.langfun('图片太大'),
							icon: 'none',
						
						})
						return false;
					}
					
					
					if(i>0) return false;
						var imageSrc = res.tempFiles[i]['path'];
						this.loading=0;
							const uploadTask = uni.uploadFile({
								url: ysv8set.www+'post/upload.api?lang='+this._i18n.locale,
								filePath: imageSrc,
								name: 'photo',
								formData:{
									YSV8_HEX: ysv8set.ysv8hex
								},
								success: (res) => {
									var data=JSON.parse(res.data);
								if(data.code!='200'){ ysv8set.muialert(data);
								return false;
								}
				
									
									data.url=data.url.replace(ysv8set.imgswt,'');
									this.avatar = data.url.replace(ysv8set.imgcdn,'');
									this.avatar2 = imageSrc;
								},
								fail: (err) => {
									this.loading=100;
									uni.showModal({
										content:ysv8set.langfun('网络故障'),
										showCancel:false
									});
									
								},
								complete: () => {
									
								}
							});
							uploadTask.onProgressUpdate((res) => {
this.loading=res.progress;
							       });
														
						}	
						}
					})
				},
			chooseLocation: function () {
				var __self=this;
				uni.chooseLocation({
				 success: (res) => {
				__self.lc=formatLocation(res.longitude, res.latitude);
				__self.dz=res.address;
		
				ysv8set.localStorage.setItem("lc",__self.lc);
				 }
				})
			},
			upset:function(){
			
				if(this.lc==false) {this.chooseLocation();return false}
				if(this.sns && this.snsmode==0){
									
				uni.showModal({content:'请选择社交类型',howCancel:false});
				return false
									}
				uni.request({method:'POST',
				url: ysv8set.www+'user/setinfo.api?lang='+this._i18n.locale,
				data: {
				lc:this.lc,
				sns:this.sns,
				snsmode:this.snsmode,
				email:this.email,
				ps:this.ps,
				avatar:this.avatar,
				YSV8_HEX: ysv8set.ysv8hex
				},
				success: (res) => {
				var data=res.data;
				ysv8set.muialert(data);							
				},
				fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})
				
			},
			onCancel(e) {
				console.log(e)
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.label=e.label
				this.dq=e.cityCode
			}
		},
    onBackPress() {
   /*
      if (this.$refs.mpvueCityPicker.showPicker) {
      	this.$refs.mpvueCityPicker.pickerCancel();
        return true;
      }
	  */
    }
	};
</script>

<style>
	.table{
		background-color: #FFFFFF;
		border-bottom: 2upx solid #D8D8D8;
		padding: 20upx;
	}
	.table .th{
		 margin-right: 20upx;
		 font-weight: bold;
		 display: inline!important;
		
	}
	.table .td{
	
		 font-weight: bold;
		 display: inline!important;
		
	}
	.w300{width: 120px; height: 120px;}
	.uni-input{
	border: thin solid #000000;
	padding: 10upx;}
</style>