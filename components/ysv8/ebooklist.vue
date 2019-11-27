<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick(newitem)">
            <view class="media-list" v-if="newitem.title">
                <view :class="[isImgRight?'media-image-right':'',isImgLeft?'media-image-left':'']">
                    <view :class="['media-title',isImgRight||isImgLeft?'media-title2':'']">{{newitem.title}}</view>
                    <view v-if="showImg" :class="['image-section',isImgRight?'image-section-right':'',isImgLeft?'image-section-left':'']">
                        <image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-if="newitem.img"
                            :src="bucketcdn+newitem['img']+'_180'"></image>
                        <image class="image-list3" v-if="newitem.image_list" :src="source.url" v-for="(source, i) in newitem.image_list"
                            :key="i" />
                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
                        <uni-icon type="user" :str="newitem.user" class="info-text"></uni-icon>
                        <uni-icon type="commenting" :str="newitem.posts" class="info-text"></uni-icon>
                        	<uni-icon type="clock-o" :str="timestr" class="info-text"></uni-icon>
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
                return true
            },
            isImgLeft() {
                return false
            },
            showImg() {
                return this.newitem.avatar
            },
			bucketcdn(){
				return ysv8set.bucketcdn;
			},timestr(){
					 	return ysv8set.timeStamp2String(this.newitem.btime);
					 }
        },
		components: {
			uniIcon
		},
        methods: {
			
			
            bindClick(d) {
              uni.navigateTo({url:'e?id='+d.id});
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
