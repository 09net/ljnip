<template>
	<view class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-right':rightMode}">
		<view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
		<view class="uni-drawer-content">
			<view style="padding:30upx;">
									<view class="uni-common-mt">
<uniIcon type="close" @tap="closeRightDrawer" color="red">{{i18n.close}}</uniIcon>
									</view>
									<view class="uni-common-mt">
										<uniIcon type="map-marker">{{lc}}</uniIcon>
									</view>
									<view class="uni-list uni-common-mt">
								<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
									<view class="uni-list-cell-navigate uni-navigate-right" :class="mess>0?'red':''" @tap="gonav('user/friend')">
										<uniIcon type="comments">{{i18n.mess}}({{mess}})</uniIcon>
									</view>
								</view>		
										
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav('user/index')">
												<uniIcon type="home">{{i18n.my}}</uniIcon>
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
																<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('add')">
							
								<uniIcon type="pencil-square" class="red">{{i18n.add}}</uniIcon>
																</view>
															</view>		
										<view class="uni-list-cell" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('fav?id=1')">
												<uniIcon type="star">{{i18n.fav}}</uniIcon>
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('fav?id=0')">
										<uniIcon type="history">{{i18n.his}}</uniIcon>
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav('index/nips')">
												<uniIcon type="question-circle-o">{{i18n.protocol}}</uniIcon>
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right red" @tap="gonav('index/qrcode')">
												<uniIcon type="money">{{i18n.nion}}</uniIcon>
											</view>
										</view>
										
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav('index/about')">
												<uniIcon type="whatsapp">{{i18n.contact}}</uniIcon>
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav('index/lang')">
												<uniIcon type="language">Language</uniIcon>
											</view>
										</view>
										
						
				
									</view>
								</view>
		</view>
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	 import uniIcon from '@/components/uniIcon.vue'
	export default {
		 components: {uniIcon},
		props: {
			lc:[Boolean, String],
			mess:[Number, String],
			
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			}
		},
		data() {
			return {
				rightMode: false,
				catchtouchmove: false,
			
			}
		},
		computed: {
			   i18n () {
			     return this.$t('drawer')  
			   },  
			showMask() {
				return String(this.mask) === 'true'
			}
		},
		created() {
			this.rightMode = this.mode === 'right'
			//#ifdef MP-WEIXIN
			this.catchtouchmove = true
			//#endif
		},
		methods: {
				closeRightDrawer() {
					this.$emit('close')
				},
				showRightDrawer() {
					this.$emit('close')
				},
				openright(){
				this.rightDrawerVisible = !this.rightDrawerVisible;
				},
				gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
				gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},

			
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.uni-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		visibility: hidden;
		z-index: 998;
		height:100%;
	}

	.uni-drawer>.uni-drawer-mask {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.uni-drawer>.uni-drawer-content {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 61.8%;
		height: 100%;
		background: #FFFFFF;
		transition: all 0.3s ease-out;
		transform: translatex(-100%);
	}

	.uni-drawer.uni-drawer-right>.uni-drawer-content {
		left: auto;
		right: 0;
		transform: translatex(100%);
	}

	.uni-drawer.uni-drawer-visible {
		visibility: visible;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-mask {
		display: block;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-content {
		transform: translatex(0);
	}
</style>
