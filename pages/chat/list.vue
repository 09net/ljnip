<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" style="background-color: #FFFFFF;">
            <view class="media-list" v-if="newitem.title">
                <view class="media-image-left" @click="bindClick">
                    <view :class="['media-title',newitem['img']?'media-title2':'']"><text class="blue" v-if="newitem['prc']>0">[¥{{newitem['prc']}}]</text>{{newitem.title}}-<text class="red">{{newitem.newds}}</text>KM</view>										
                    <view v-if="newitem['img']" class="image-section image-section-left">
						  <template>
<image class="image-list1 image-list2" v-if="newitem['img']" :src="imgswt+newitem['img']"></image>
                        
							</template>

                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
						<uniIcon type="user" class="info-text">{{newitem.user}}</uniIcon>
						<uniIcon type="commenting" class="info-text">{{newitem.posts}}</uniIcon>
					    <uniIcon type="clock-o" class="info-text">{{newitem.timestr}}</uniIcon>
                    </view>
<view class="max-close-view"  @click="barsmun"><uniIcon  type="bars"></uniIcon></view>
					                    </view>


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
	 props: ['newitem','lc'],
		data() {
			return {
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
					itemList:(ysv8set.userdata && ysv8set.userdata['id']==this.newitem['uid'])?['顶', '踩','删除','云收藏']:['顶', '踩','举报','云收藏'],
					success: (e) => {
						uni.request({method:'POST',
						url: ysv8set.www+'t/vote.api?lang='+this._i18n.locale,
						data: {
						id:this.newitem['id'],
						type:ysv8set.votetype[e.tapIndex],
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
		display: flex;
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
