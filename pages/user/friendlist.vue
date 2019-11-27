<template>
<view class="uni-list" @click="bindClick">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-media-list">
				<view class="uni-media-list-logo">
					<image :src="imgswt+newitem['avatar']"></image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{newitem['user']}}<text class="red" v-if="newitem['c']>0">({{newitem['c']}})</text></view>
					<view class="uni-media-list-text-bottom uni-ellipsis">简介:<text class="red" str="未设置" v-if="newitem['ps']==''"></text>
<text class="red" v-else>{{newitem['ps']}}</text></view>
				</view>
			</view>
		</view>
	</view>
				

</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uniIcon.vue';
    export default {
        props:['newitem'],
		data() {
		
			return {
			bucketcdn:ysv8set.bucketcdn,
			imgswt:ysv8set.imgswt,
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

</style>