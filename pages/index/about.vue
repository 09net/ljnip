<template>
	<view>						
<view class="table" @tap="getcall('+8615973827429')">
<view class="th"><uniIcon type="phone" size="16">TEL</uniIcon></view>
<view class="td"><text>+8615973827429</text></view>
</view>			
<view class="table">
<view class="th"><uniIcon type="envelope " size="16">E-mail</uniIcon></view>
<view class="td"><text>719048503@qq.com</text></view>
</view>
<view class="table">
<view class="th"><uniIcon type="address-card-o" size="16">address</uniIcon></view>
<view class="td"><text>Lianyuan, Loudi, Hunan, China</text></view>
</view>
<!--  #ifdef  MP-WEIXIN -->
	<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
	<!--  #endif -->
<view class="table">
<view class="c"><text>娄底零久网络科技有限公司</text></view>
</view>

<!--  #ifdef  MP-WEIXIN -->
<view class="table">
<view class="th"><uniIcon type="whatsapp" size="16">weixin</uniIcon></view>
<view class="td"><button open-type="contact" class="red" size="mini">{{i18n.contact}}</button></view>
</view>	
<!--  #endif -->
		
		
		
		</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uniIcon.vue'
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
		components: {
			uniIcon
			},
		data() {
			return {
				title:'contact',
			};
		},methods: {
			getcall:function(e){
				uni.makePhoneCall({
				    phoneNumber: e //仅为示例
				});
				}
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

