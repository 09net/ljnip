<template>
    <view>
		
		<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="newitem.user">
						<view class="uni-media-list">
							<view class="uni-media-list-logo"  @click="bindClick(newitem)">
								<image :src="bucketcdn+newitem.avatar+'_80'"></image>
							</view>
							<view class="uni-media-list-body">
							
					
					<view :class="['media-title',isImgRight||isImgLeft?'media-title2':'']">{{w_content}}
						
						<view v-if="ok"><uParse :content="content"  /></view>
						<view v-else>loading...</view>
						
						
					</view>
					<image class="image-list3" v-if="source" :src="bucketcdn+source+'_180'" v-for="(source, i) in newitem.imglist"
							:key="i" @tap="previewImage(newitem.imglist)" />
					
					
								<text class="uni-media-list-text-top">{{timestr}}</text>
								<view class="uni-media-list-text-bottom uni-ellipsis"><text>{{newitem.user}}</text>
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
            'newitem','postactive'
        ],
		data() {
			return {
				bucketcdn:ysv8set.bucketcdn,
				imgcdn:ysv8set.imgcdn,
				ok:false,
				content:'',
				}
				},
        computed: {
			 w_content() {
				 var _self=this;
								 if(this.ok){
									 return ;
								 }else{
								 uni.request({
								 					url: 'https://iimg.44api.com/hash/' + _self.newsitem['hashid'] + '.js',
								 				success: (res) => {
								 					var data=res.data;
								 					_self.content=data.content.replace(/data-original/g, 'src');
											 _self.ok=true;
								 					},
								 					});
								}
				return '';
			},
			timestr(){
				return ysv8set.timeStamp2String(this.newsitem.btime);
			},
			isImgRight() {
			   if(this.newitem['img']) return true
			     return false
			},
			isImgLeft() {
				if(this.newitem['vs']) return true
			    return false
			}
			
        },
		components: {
			uniIcon,
				uParse,
		},
        methods: {
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
	.image-list3 {
		width: 120px;
		height: 120px;
	}
</style>
