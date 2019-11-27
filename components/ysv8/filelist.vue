<template>
<view>
<view class="list-cell" hover-class="uni-list-cell-hover" @click="downfile(newitem)">
<view class="media-list" v-if="newitem.filename">
<view>[<uniIcon class="red" type="download"></uniIcon>]{{newitem.filename}}.{{newitem.ext}}</view> 
</view>
</view>
</view>
</template>
<script>
import ysv8set from '@/static/ysv8/index.js';
import uniIcon from '@/components/uniIcon.vue';
export default {
props:['newitem','tid'],
		components: {
			uniIcon
		},methods: {
			
            downfile(e) {
				// #ifdef MP
				uni.redirectTo({url: '/pages/index/qrcode?url='+ysv8set.www+'t/'+this.tid+'.html'});
				// #endif
				// #ifndef MP
				uni.request({
				method:'POST',
	url: ysv8set.www+'ajax/downfile.api',
							data: {
								YSV8_HEX: ysv8set.ysv8hex,
								id:e.id
							},
							success: (res) => {
								var data=res.data
if (data.code=='200') {

	
	uni.navigateTo({url: '/pages/user/web?url='+data['info']})									  
} else {ysv8set.muialert(data)}
					
							},
							fail: (err) => {
								uni.showModal({
									content:err.errMsg,
									showCancel:false
								})
							},
							complete:()=> {}
						})				
				// #endif
 
            }
        }
    }
</script>

<style>
  
    .list-cell {
        width: 750upx;
        padding: 0 30upx;
    }

    .uni-list-cell-hover {
        background-color: #eeeeee;
    }

    .media-list {
        flex: 1;
        flex-direction: column;
        border-bottom-width: 1upx;
        border-bottom-style: solid;
        border-bottom-color: #c8c7cc;
        padding: 20upx 0;
    }

    .media-image-right {
        flex-direction: row;
    }

    .media-image-left {
        flex-direction: row-reverse;
    }

    .media-title {
        flex: 1;
    }

    .media-title {
        lines: 3;
        text-overflow: ellipsis;
        font-size: 32upx;
        color: #555555;
    }

    .media-title2 {
        flex: 1;
        margin-top: 6upx;
        line-height: 40upx;
    }

    .image-section {
        margin-top: 20upx;
        flex-direction: row;
        justify-content: space-between;
    }

    .image-section-right {
        margin-top: 0upx;
        margin-left: 10upx;
        width: 225upx;
        height: 146upx;
    }

    .image-section-left {
        margin-top: 0upx;
        margin-right: 10upx;
        width: 225upx;
        height: 146upx;
    }

    .image-list1 {
        width: 690upx;
        height: 481upx;
    }

    .image-list2 {
        width: 225upx;
        height: 146upx;
    }

    .image-list3 {
        width: 225upx;
        height: 146upx;
    }

    .media-info {
        flex-direction: row;
    }

    .info-text {
        margin-right: 20upx;
        color: #999999;
        font-size: 24upx;
    }

    .media-foot {
        margin-top: 20upx;
        flex-direction: row;
        justify-content: space-between;
    }

    .max-close-view {
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        height: 40upx;
        width: 80upx;
    }

    .close-view {
        border-style: solid;
        border-width: 1px;
        border-color: #999999;
        border-radius: 10upx;
        justify-content: center;
        height: 30upx;
        width: 40upx;
        line-height: 30upx;
    }

    .close {
        text-align: center;
        color: #999999;
        font-size: 28upx;
    }
</style>
