<template>
	<view class="warp">

<view class="f-body">
			<view class="uni-grid">
				<view  style="width: 235upx;" class="uni-grid-item" v-for="(item, index) in list" :key="index" @click="goDetailPage(item)">
					<view class="uni-grid-item__box">
					<view class="uni-grid-item__box-item">
					<image :src="imgswt+item.url+'.png'" class="image" mode="aspectFill"/>
					<text class="text">{{item.name}}</text>
				</view></view>
				</view>
			</view>
		</view>
	</view>
	<!--  #ifdef  MP-WEIXIN -->
	<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
	<!--  #endif -->
	</view>
</template>



<script>
	import ysv8set from '@/static/ysv8/index.js';
	export default {
			onLoad: function(e) {
			},
		data() {
			return {
				title: ysv8set.title,
				imgswt:ysv8set.imgswt,
				list:[
					{name:'简体',url:'zh',ps:'zh',img:'zh.jpg'},
					{name:'粤语',url:'hk',ps:'hk',img:'hk.jpg'},
					{name:'繁体',url:'cht',ps:'cht',img:'cht.jpg'},
					{name:'ENGLISH',url:'en',ps:'en',img:'en.jpg'},
					// #ifndef MP-BAIDU
					{name:'日本の',url:'ja',ps:'ja',img:'ja.jpg'},
					{name:'한국의',url:'ko',ps:'ko',img:'ko.jpg'},
					{name:'español',url:'es',ps:'es',img:'es.jpg'},
					{name:'العربية',url:'ar',ps:'ar',img:'ar.jpg'},
					{name:'русский',url:'ru',ps:'ru',img:'ru.jpg'},
					{name:'français',url:'fr',ps:'fr',img:'fr.jpg'},
					{name:'ภาษาไทย',url:'th',ps:'th',img:'th.jpg'},
					{name:'ViệtName',url:'vi',ps:'vi',img:'vi.jpg'},
					{name:'português',url:'pt',ps:'pt',img:'pt.jpg'},
					{name:'Deutschês',url:'de',ps:'de',img:'de.jpg'},
					// #endif
					
				]
			}
		},
		onShareAppMessage() {
			if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
			return {
			 title: '零久附近通:您附近开放的朋友圈,无广告推广，公平排序，靠谱又好玩',
			 path: '/pages/chat/index?upuid='+suid
			}
		},
		
		methods: {
goDetailPage(e) {
ysv8set.localStorage.setItem("lang",e.url); 
this._i18n.locale = e.url
uni.reLaunch({
		    url: '/pages/chat/index'
		});
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
</style>
