<template>
	<view class="uni-padding-wrap">
		<view class="uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view class="uni-list p10" v-if="showposts">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="gonav2('add')">
									<view class="uni-media-list">
										<view class="uni-media-list-logo">
											<image src="/static/end.png"></image>
										</view>
										<view class="uni-media-list-body">
											<view class="uni-media-list-text-top"><text class="red">{{i18n.add}}</text></view>
														<view class="uni-media-list-text-bottom uni-ellipsis">{{i18n.addmore}}</view></view>
											</view>
									</view>
								</view>
								</view>
			<view v-show="current === 0">
				
				<block v-for="(newsitem,index2) in datalook" :key="index2">
						<media-list :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)"></media-list>
				</block>
			</view>
			<view v-show="current === 1">
					
				<block v-for="(newsitem,index2) in datafav" :key="index2">
						<media-list :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)"></media-list>
				</block>
			</view>
			<view v-show="current === 2">
					
				<block v-for="(newsitem,index2) in datacom" :key="index2">
						<media-list :newitem="newsitem" :lc="lc" @click="goDetail(newsitem)"></media-list>
				</block>
			</view>
		</view>
		
		
		
	
		
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
import mask from '@/static/ysv8/chat.js';
	import mediaList from './list.vue';
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
		components: {
				mediaList,
				uniSegmentedControl
				},
		data() {
			return {
  title: '收藏夹'+'零久附近通',
			datalook:[],
			datafav:[],
			datacom:[],
			 showposts:ysv8set.showposts,
			lc:mask.lc,
			items: this.$t('index.favitems') ,
			current: 0,
			activeColor: '#007aff',
			styleType: 'button'
			};
		},onShow: function() {
			// #ifdef  MP-BAIDU
			swan.setPageInfo({
			            title: '收藏夹_零久附近通',
			            keywords: '收藏夹',
			            description: '收藏夹_零久附近通',
			            releaseDate: '2019-09-04 12:01:30',
			            image: [ysv8set.imgcdn+'logo.png']
			        })
					// #endif
			    },
		methods: {
			   gonav2(e){uni.navigateTo({url: e})},
			share(){
			//#ifdef APP-PLUS
			ysv8set.share_app(ysv8set.title,ysv8set.www,ysv8set.imgcdn+'logo.png');
			//#endif	
			//#ifndef APP-PLUS
			ysv8set.share(ysv8set.title,ysv8set.www,ysv8set.imgcdn+'logo.png');
			//#endif	
			},
			setNaivgationBarTitle: function (title) {this.title=title;uni.setNavigationBarTitle({title: title});},
			goDetail(e) {
					uni.navigateTo({
						  url: 't?id=' + e.id
					})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
			},
		onLoad(e) {
		    mask.datalook.reverse();
			var setdataarray=ysv8set.setdata(mask.datalook, 'down',[], 0,'btime',this.lc);
				if(ysv8set.isArray(setdataarray) ==true){
			this.datalook=setdataarray[0];
			}
			
			mask.datafav.reverse();
			var setdataarray=ysv8set.setdata(mask.datafav, 'down',[], 0);
				if(ysv8set.isArray(setdataarray) ==true){
			this.datafav=setdataarray[0];
			}
			
			
			
			mask.datacom.reverse();
			
				var setdataarray=ysv8set.setdata(mask.datacom, 'down',[], 0);
				if(ysv8set.isArray(setdataarray) ==true){
			this.datacom=setdataarray[0];
			}

			if(e.id){
				this.current=Number(e.id);
			}
			this.setNaivgationBarTitle(this.items[this.current]);
		},onShareAppMessage() {
		if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
		 return {
		 title: ysv8set.title,
		 path: '/pages/chat/index?upuid='+suid
		}
		}
	}
</script>

<style></style>
