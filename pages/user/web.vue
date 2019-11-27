<template><view><web-view :src="url" v-if="show" @message="handleMessage"></web-view></view></template>
<script>
	import ysv8set from '@/static/ysv8/index.js';
    export default {
		data() {
			return {
				url: '',
				show:false
			}
		},onNavigationBarButtonTap(e) {			
			uni.showActionSheet({
			itemList: [this.$t('index.browser'),this.$t('index.share'),this.$t('index.copy')],
			success: (e) => {			
if(e.tapIndex=='2'){
uni.setClipboardData({
    data: this.url,
    success: function () {
    }
});
}
if(e.tapIndex=='1'){
	
	//#ifdef APP-PLUS	
	ysv8set.share_app(this.$t('index.share')+ysv8set.title,this.url,ysv8set.imgswt+'logo.png');
	//#endif	
	//#ifndef APP-PLUS
	ysv8set.share(this.$t('index.share')+ysv8set.title,this.url,ysv8set.imgswt+'logo.png');
	//#endif
	

}
		if(e.tapIndex=='0'){
	plus.runtime.openURL( this.url);
		}
					
			}
			});
			 
		},
		onLoad(e) {
			
			
			
			if(e.url){
				// #ifdef H5
				window.open(e.url);
				uni.navigateBack({	
				})
				// #endif
				// #ifdef APP-PLUS
				 plus.runtime.openURL(e.url, function(res) {  
				                    console.log(res);  
				                });  
				uni.navigateBack({	
				})
				// #endif
				// #ifdef MP
				if(e.url.indexOf('://www.44api.com')>0){
					this.url = e.url
					this.show=true
				}else{
				uni.redirectTo({url: '/pages/index/qrcode?url='+e.url});
				}
				// #endif
				
			}else{
				uni.showModal({
					title: this.$t('index.error'),
					showCancel: false,
					confirmText: this.$t('index.ok'),
				})
				
			}
			
			
	
		},methods: {
			setClipboard: function () {
				var data = this.zurl;
				if (data.length === 0) {
					uni.showModal({
						title: this.$t('index.error'),
						content:this.$t('index.null'),
						showCancel: false
					})
				} else {
					uni.setClipboardData({
						data: data,
						success: () => {
							uni.showModal({
								content: this.$t('index.success'),
								showCancel: false
							})
						},
						fail: () => {
							uni.showModal({
								content: this.$t('index.error'),
								showCancel: false
							})
						}
					});
				}
			}
		}
		
		
	}
</script>
<style>
</style>
