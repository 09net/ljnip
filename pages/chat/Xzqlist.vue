<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick" style="background-color: #FFFFFF;">
            <view class="media-list" v-if="newitem.name">
                <view>
                    <view>{{newitem.name}}<text class="red">{{newitem.Pinyin}}</text></view>
					  <view v-if="newitem.CityCode">电话区号：<text class="red">{{newitem.CityCode}}</text></view>
                <view v-if="newitem.ZipCode">邮政编码：<text class="red">{{newitem.ZipCode}}</text></view>
                
				<view>经度：<text class="red">{{newitem['lng']}}</text>&nbsp;纬度：<text class="red">{{newitem['Lat']}}</text></view>
	
				
				
				</view>
            </view>
              
        </view>
            
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
    export default {
	 props: ['newitem'],
		data() {
			return {
				imgswt:ysv8set.imgswt,
				bucketcdn:ysv8set.bucketcdn,
				imgcdn:ysv8set.imgcdn,
				}
				},
        methods: {
            bindClick() {
                this.$emit('click');
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
