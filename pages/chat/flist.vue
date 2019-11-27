<template>
		 	 
		 <view class="uni-list">
		 	<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
		 		<view class="uni-media-list">
		 			<view class="uni-media-list-logo" @click="bindClick">
		 				<image :src="imgswt+newitem['img']"></image>
		 			</view>
		 			<view class="uni-media-list-body">
		 				<view class="uni-media-list-text-top" @click="bindClick"><text>{{newitem['title2']}}</text>[<text class="red">{{modetxt[newitem['mode']]}}</text>]</view>
		 				<view class="uni-media-list-text-bottom uni-ellipsis">
						<uniIcon type="clock-o" class="info-text" @click="bindClick">{{newitem.timestr}}</uniIcon>
						
						<view style="float: right;" @click="barsmun"><uniIcon  type="bars"></uniIcon></view>
							</view>					                    
							
							
		 			</view>
					</view>
					
					
					
		 		</view>
		 	
		 </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uniIcon.vue';
    export default {
	 props: ['newitem'],
		data() {
			return {
				modetxt:['讨论','宣传','商品','附件','视频'],
				imgswt:ysv8set.imgswt,
				}
				},
        
		components: {
			uniIcon
		},
        methods: {
            bindClick() {
                this.$emit('click');
            },barsmun(){
				uni.showActionSheet({
					itemList:['关注','删除'],
					success: (e) => {
						uni.request({method:'POST',
						url: ysv8set.www+'index/friend_state.api?lang='+this._i18n.locale,
						data: {
						fid:this.newitem['id'],
						type:e.tapIndex,
						YSV8_HEX: ysv8set.ysv8hex
						},
						success: (res) => {
						var data=res.data;
						ysv8set.muialert(data);							
						},
						fail: (err) => {uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})},
						})	
					}
				})
				
			}
        }
    }
</script>

<style>
.media-foot {
        margin-top: 20upx;
        flex-direction: row;
        justify-content: space-between;
		display: flex;
    }
 .max-close-view {
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        height: 40upx;
        width: 80upx;
    }
  
</style>
