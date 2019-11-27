<template xlang="wxml">
	<view class="container">
		<view class="qrimg">
		
				<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit"  :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />

		</view>
		
			<view class="uni-title">{{i18n.content}}</view>
		<!--  #ifdef  MP-WEIXIN -->
		<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
		<!--  #endif -->
		<view class="uni-list">
<input class="uni-input" v-model="val" style="border: thin solid #333333; text-align: left; padding: 10upx; height: 100upx; overflow-y: scroll;"/>
		</view>
		
			<view class="uni-title">{{i18n.size}}</view>
	
		
	<slider :value="size" @change="sliderchange" min="50" max="500" show-value />
		
			<view class="btns">
				<button type="primary" @tap="myQrcode">{{i18n.generalization}}</button>
				<button type="primary" @tap="selectIcon">{{i18n.pic}}</button>
				<button type="primary" @tap="creatQrcode">{{i18n.sub}}</button>
				<button type="primary" @tap="copy(val)">{{i18n.copy}}</button>
				<button type="primary" @tap="saveQrcode">{{i18n.save}}</button>
				
			
			
		</view>
	</view>
</template>
<script>
	import ysv8set from '@/static/ysv8/index.js';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
export default {
	computed: {
	   i18n () {
	     return this.$t('index')  
	   }  
	 },
	data() {
		return {
			title:'qrcode',
			ifShow: true,
			val: '', // 要生成的二维码值
			size: 400, // 二维码大小
			unit: 'upx', // 单位
			
			icon: '', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '' // 二维码生成后的图片地址或base64
		}
	},
	onShareAppMessage() {
		if(ysv8set.userdata){var suid=ysv8set.userdata['id'];}else{var suid=0;}
		return {
			title: this.title,
			path: '/pages/chat/index?uid='+suid
		}
	},
	methods: {
		myQrcode(){
			this.title=this.$t('drawer.nion');
			uni.setNavigationBarTitle({title: this.title});
			if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{
				ysv8set.muialert({
					code:301,
					info:this.$t('index.login') 
					
				});	
				return false;
			}
			
			
			this.val=ysv8set.www+'user/add?upuid='+suid;
			setTimeout(() => {
				this.creatQrcode();
			}, 500);
			
		},
		copy(e) {
					uni.setClipboardData({
		    data: e,
		    success: function () {
		       
		    }
		});
		},
		sliderchange(e) {
			this.size = e.detail.value
		},
		creatQrcode() {
			this.$refs.qrcode._makeCode()
		},
		saveQrcode() {
			this.$refs.qrcode._saveCode()
		},
		qrR(res) {
			this.src = res
		},
		clearQrcode() {
			this.$refs.qrcode._clearCode()
			this.val = ''
		},
		ifQrcode() {
			this.ifShow = !this.ifShow
		},
		selectIcon() {
			let that = this
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function (res) {
					that.icon = res.tempFilePaths[0]
					setTimeout(() => {
						that.creatQrcode()
					}, 100);
					// console.log(res.tempFilePaths);
				}
			});
		}
	},
	onReady() {
		if(this.val==''){
			this.myQrcode();
			
		}else{
		setTimeout(() => {
			this.creatQrcode();
		}, 500);
		}
	},
	components: {
		tkiQrcode
	},
	onLoad: function (e) {if(e.url) this.val=e.url; },
}
</script>

<style>
/* @import "../../../common/icon.css"; */
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.qrimg {
	display: flex;
	justify-content: center;
}
.qrimg-i{
	margin-right: 10px;
}

slider {
	width: 90%;
}

input {
	width: 94%;
	margin-bottom: 20upx;
}

.btns {
	display: flex;
	flex-direction: column;
	width: 100%;
}

button {
	width: 100%;
	margin-top: 10upx;
}
</style>
