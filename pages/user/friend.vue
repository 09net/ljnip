<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></uni-segmented-control>
<!--  #ifdef  MP-WEIXIN -->
	<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
	<!--  #endif -->
 <view class="p10">
	 
	 	<view class="uni-list" v-if="nowdata.length==0" >
	 	<view class="uni-list-cell" hover-class="uni-list-cell-hover">
	 		<view class="uni-media-list">
	 			<view class="uni-media-list-logo">
	 				<image src="/static/end.png"></image>
	 			</view>
	 			<view class="uni-media-list-body">
	 				<view class="uni-media-list-text-top">{{i18n['null']}}</view>
	 				<view class="uni-media-list-text-bottom uni-ellipsis">{{i18n['null']}}</view>
	 			</view>
	 		</view>
	 	</view>
	 </view>
	 
				<block v-for="(newsitem,index2) in nowdata" :key="index2">
						<media-list :newitem="newsitem" @click="goDetail(newsitem)"></media-list>
				</block>
		</view>
			</view>	
		
		
	
		
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
import mask from '@/static/ysv8/chat.js';
	import mediaList from './friendlist.vue';
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
components: {mediaList,uniSegmentedControl},
		data() {
			return {
			nowdata:[],
			items: [
				this.$t('index.chat'),
				this.$t('index.friend'),
				this.$t('index.follow'),
				this.$t('index.fans') 
			],
			current: 0,
			activeColor: '#007aff',
			styleType: 'button',
			loadingType:0,
			pagtime:0
			};
			
		},onNavigationBarButtonTap(e) {			
			uni.showActionSheet({
			itemList: [this.$t('drawer.my')],
			success: (e) => {
				
					 uni.navigateTo({
					    url: '/pages/user/index'
					})
					
			}
			});
			 
		},
		methods: {
			setNaivgationBarTitle: function (title) {this.title=title;uni.setNavigationBarTitle({title: title});},
			getlist:function(){
							if (this.loadingType !== 0) {return;}
							this.loadingType = 1;
							this.ajaxi++;
						
			uni.request({
				method:'post',
			url: ysv8set.www+'friend/friend_list/'+this.current+'/'+this.pagtime+'.api?lang='+this._i18n.locale,
			data: {
			  YSV8_HEX: ysv8set.ysv8hex
			},
										success: (res) => {
											var data=res.data;
											if(data['code']!=200){
												ysv8set.muialert(data)
												return false;
												}
							var setdataarray=ysv8set.setdata(data['data'], 'down', this.nowdata, this.pagtime,'uid');
								if(ysv8set.isArray(setdataarray) ==true){
							setdataarray[0].reverse();
					this.nowdata=setdataarray[0];
							this.pagtime=setdataarray[1];
			
							}
						
		
			this.loadingType = 2;},
			fail: (err) => {uni.showModal({content:this.$t('index.error'),showCancel:false});this.loadingType = 0;},complete:()=> {}})
			},
			goDetail(e) {
					uni.navigateTo({
						  url: 'chat?uid='+e['uid']+'&user='+e['user']+'&ava='+ysv8set.imgswt+e['avatar']
					})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current=Number(index);
					this.nowdata=[];
					this.pagtime=0;
					this.loadingType=0;
					
this.getlist();
				}
			}
			},
		onLoad(e) {
		    
			if(e.id){
				this.current=Number(e.id);
			}
			this.setNaivgationBarTitle(this.items[this.current]);	
		},onReady() {
			this.getlist();
		}
		
		,onShareAppMessage() {
		if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
		return {
		 title: ysv8set.title,
		 path: '/pages/chat/index?upuid='+suid
		}
		}
	}
</script>

<style>

</style>
