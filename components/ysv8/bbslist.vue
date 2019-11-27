<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick" style="background-color: #FFFFFF;">
            <view class="media-list" v-if="newitem.title">
                <view :class="[isImgRight?'media-image-right':'',isImgLeft?'media-image-left':'']">
                    <view :class="['media-title',isImgRight||isImgLeft?'media-title2':'']">{{title}}</view>

										
										
                    <view v-if="showImg" :class="['image-section',isImgRight?'image-section-right':'',isImgLeft?'image-section-left':'']">
                       
					   <template v-if="newitem['vs']!=''">
						   <image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-if="newitem['vs'].indexOf('.mp3')>0"
						   	src="/static/mp3.png"></image>
						   <image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-else
						   src="/static/mp4.jpg"></image>
						  </template> 
						  <template v-else>
					   
					   
						<image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-if="newitem.img"
                            :src="imgswt+newitem['img']"></image>
                        <image class="image-list3" v-if="newitem.image_list" :src="source.url" v-for="(source, i) in newitem.image_list"
                            :key="i" />
							</template>

                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
						<uniIcon type="user" :str="newitem.user" class="info-text"></uniIcon>
						<uniIcon type="commenting" :str="newitem.posts" class="info-text" v-if="showposts"></uniIcon>
							<uniIcon type="clock-o" :str="timestr" class="info-text"></uniIcon>
                    </view>
                   
					<view class="max-close-view">
					<uniIcon v-if="newitem['mode']=='2'" size="30" type="download" style="color:#FF0000"></uniIcon>
					<template v-else>
					<uniIcon v-if="newitem['mode']=='3'" size="30" type="videocam" style="color:#FF0000"></uniIcon>
					</template>
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
				imgswt:ysv8set.imgswt,
				bucketcdn:ysv8set.bucketcdn,
				imgcdn:ysv8set.imgcdn,
				}
				},
        computed: {
			showposts(){
				// #ifdef MP-ALIPAY
				return false;
				// #endif
				return true;
			},
			title() {
				
				var reg = new RegExp( '<b>' , "g" )
				this.newitem['title']=this.newitem['title'].replace(reg,'[')
				var reg = new RegExp( '</b>' , "g" )
				return  this.newitem['title'].replace(reg,']')
			
			
			},
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
			
			timestr(){
				return ysv8set.timeStamp2String(this.newitem.btime);
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
