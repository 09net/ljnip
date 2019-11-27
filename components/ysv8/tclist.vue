<template>

				
				
					<view class="uni-product"  v-if="newitem.title" @click="bindClick">
						<view class="image-view">
							
							<template v-if="newitem['vs']!=''">
													   <image class="uni-product-image" v-if="newitem['vs'].indexOf('.mp3')>0"
													   	src="/static/mp3.png"></image>
													   <image class="uni-product-image" v-else
													   :src="bucketcdn+newitem['vs']+'?x-oss-process=video/snapshot,t_1000,w_150,h_150,f_jpg,m_fast'"></image>
													  </template> 
													  <template v-else>
							
							
													<image class="uni-product-image" v-if="newitem.img"
							     :src="bucketcdn+newitem['img']+'_180'"></image>
							 <image class="uni-product-image" v-if="newitem.image_list" :src="source.url" v-for="(source, i) in newitem.image_list"
							     :key="i" />
														</template>
							
							
	
						</view>
						<view class="uni-product-title">{{newitem.title}}</view>
						<view class="uni-product-price">
							<text class="uni-product-price-favour2">交易{{newitem.posts}}</text>
							<text class="uni-product-price-original">￥{{newitem.gold/100}}</text>
							<text class="uni-product-tip">{{newitem.user}}</text>
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
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
            bindClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style>

</style>
