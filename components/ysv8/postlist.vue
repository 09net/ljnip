<template>
    <view>	
		<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="newitem.user">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="imgswt+newitem.avatar"></image>
							</view>
						
							<view class="uni-media-list-body">
								<view><uParse :content="content" /></view>
							<image class="image-list3" v-if="source" :src="imgswt+source.split('@')[0]" v-for="(source, i) in newitem.imglist"
									:key="i" @tap="previewImage(newitem.imglist)" />
							
							
							 <view class="media-foot">
							    <view class="media-info">
									<uniIcon type="user" class="info-text" @click="bindClick(newitem)">@{{newitem.user}}</uniIcon>
									
										<uniIcon type="clock-o" class="info-text">{{newitem.timestr}}</uniIcon>
									
							 <uniIcon type="commenting" class="info-text" @click="bcolse(newitem)">{{newitem.posts}}</uniIcon>
							
							       
							    </view>
							   
	
								                    </view>
							
							</view>
						</view>
					</view>
				</view>		
    </view></view>	
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uniIcon.vue'
	import uParse from '@/components/uParse/src/wxParse.vue'
    export default {
        props: [
            'newitem'
        ],
		data() {
			return {
				imgswt:ysv8set.imgswt,
				ok:false,
				postactive:'Com_nip',
				content:'',
				}
				},
				mounted:function(){
				uni.request({
				url: ysv8set.hash+'hash/' + this.newitem['hashid'] + '.js',
				success: (res) => {
				var data=res.data;
				this.content=data.content.replace(/data-original/g, 'src');
				},
				});	
				},
       
		components: {
			uniIcon,uParse
		},
        methods: {
			videoErrorCallback:function(e){},
			previewImage: function(e,src) {
				var esrc=[];
				for(var index in e){
					esrc[index]=ysv8set.imgcdn+e[index].split('@')[0];
				}
				uni.previewImage({
					current: src,
					urls: esrc
				})
			},
            bindClick(e) {
                this.$emit('click',e);
            },bcolse(e){
				if(Number(e.posts)>0){
					uni.navigateTo({
						url: '/pages/com/index?mode='+this.postactive+'&pid='+e.id+'&uid='+e['uid']
					});
				}
				
			}
        }
    }
</script>

<style>
		@import url("../../components/uParse/src/wxParse.css");
	.uni-comment-list{flex: 1;
	background-color:#F8F8F8;
	flex-direction: column;
	border-bottom-width: 1upx;
	border-bottom-style: solid;
	border-bottom-color: #c8c7cc;
	padding: 20upx 0;
	}
	.image-list3 {
		width: 120px;
		height: 120px;
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
