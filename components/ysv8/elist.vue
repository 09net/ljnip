<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
            <view class="media-list" v-if="newitem.title">
                <view :class="[isImgRight?'media-image-right':'',isImgLeft?'media-image-left':'']">
                    <view :class="['media-title',isImgRight||isImgLeft?'media-title2':'']">{{newitem.title}}</view>

										
										
                 
					   
					   
						<image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-if="newitem.img"
                            :src="bucketcdn+data['img']+'_180'"></image>
                        <image class="image-list3" v-if="newitem.image_list" :src="source.url" v-for="(source, i) in newitem.image_list"
                            :key="i" />
			

                    </view>
                </view>
                <view class="media-foot">
                    
                   
					
					                    </view>


                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uni-icon.vue'
    export default {
        props: {
            newitem: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
        computed: {
            isImgRight() {
               if(this.newitem['img']) return true
                 return false
            },
            isImgLeft() {
				if(this.newitem['vs']) return true
                return false
            },
            showImg() {
				if(this.newitem['vs'] || this.newitem['img']) return true;
                return false;
            },
			bucketcdn(){
				return ysv8set.bucketcdn;
			}
        },
		components: {
			uniIcon
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
