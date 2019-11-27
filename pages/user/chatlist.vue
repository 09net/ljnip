<template>
    <view>
		
		
		
		
		<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="newitem.id">
						<view class="uni-media-list" v-if="isImgLeft">
							<view class="uni-media-list-logo" @click="gonav('chat/s?method=uid&q='+uid)">
								<image :src="ava"></image>
							</view>
							<view class="uni-media-list-body">
								<uParse :content="newitem.content" />
                                <view class="media-foot">
							    <view class="media-info">
									  <text class="info-text">{{user}}</text>
							        <text class="info-text">{{newitem.timestr}}</text>
							    </view>
							    </view>    
						    </view>
				        </view>
						<view class="uni-media-list" v-else>
							
							<view class="uni-media-list-body">
								<uParse :content="newitem.content" />
						        <view class="media-foot">
							    <view class="media-info">
									<text class="info-text">自己</text>
							        <text class="info-text">{{newitem.timestr}}</text>
							    </view>
							    </view>    
						    </view>
							<view class="uni-media-list-logo">
								<image :src="ava2"></image>
							</view>
						</view>
						
						
				</view>		
    </view></view>	
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uParse from '@/components/uParse/src/wxParse.vue'
    export default {
        props: [
            'newitem','user','ava','uid'
        ],
		components: {
				uParse,
		},
		  data() {
		    return {
				ava2:ysv8set.imgswt+ysv8set.userdata['avatar']
			}
		},
        computed: {
			
			isImgLeft() {
	       if(this.newitem['uid1']==ysv8set.userdata['id']) return true
			    return false
			},
			
			
        },
        methods: {
			gonav(e){uni.navigateTo({url: '/pages/' + e})},
			openurl:function(e){
				 uni.navigateTo({
				    url: '/pages/user/web?url=' + encodeURIComponent(e)
				})
				
			},
			videoErrorCallback:function(e){},
            bindClick(e) {
                this.$emit('click',e);
            },
			previewImage: function(e,src) {
				var esrc=[];
				for(var index in e){
					esrc[index]=ysv8set.imgcdn+e[index];
				}
				uni.previewImage({
					current: src,
					urls: esrc
				})
			}
        }
    }
</script>

<style>
	.uni-comment-list{flex: 1;
	background-color:#F8F8F8;
	flex-direction: column;
	border-bottom-width: 1upx;
	border-bottom-style: solid;
	border-bottom-color: #c8c7cc;
	padding: 20upx 0;
	}
	.uni-media-list-logo2 {
		margin-right: 0upx;
		margin-left: 20upx;
	}
	.uni-media-list-logo2 {
		height: 84upx;
		width: 84upx;
		margin-right: 20upx;
	}
	.uni-media-list-logo2 image {
		height: 100%;
		width: 100%;
	}
	.image-list3 {
		width: 120px;
		height: 120px;
	}
	.info-text{margin-right: 20upx;}
</style>
