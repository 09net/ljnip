<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick(newitem)">
            <view class="media-list" v-if="newitem.title2">
                <view class="media-image-left">
                    <rich-text class="media-title media-title2" :nodes="newitem.title2"></rich-text>
<view class="image-section image-section-left">
<image class="image-list1 image-list2" v-if="newitem.img" :src="imgswt+newitem['img']"></image>
                       
		
                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
						<uniIcon type="edit" :str="newitem.domain" class="info-text"></uniIcon>
							<uniIcon type="clock-o" class="info-text">{{newitem['timestr']}}</uniIcon>
						
                        
                    </view>
                   
					
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
        props: {
            newitem: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
		data() {
			return {
				imgswt:ysv8set.imgswt
				}
				},
		components: {
			uniIcon
		},
        methods: {
            bindClick(e) {
                this.$emit('click',e);
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
</style>
