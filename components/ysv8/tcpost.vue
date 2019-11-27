<template>
	
    <view>
		<view class="foot">
		<view class="row">
			<view class="col">
			<view class="col_3"><text v-if="mob==false" @click="yuding()">预订</text><text v-else @click="mob()">{{mob}}</text></view>
			<view class="col_3">地图</view>
			<view class="col_3">聊天</view>
			<view class="col_3" @click="fav()">
				<template v-if="favbool">
				<text :class="favstart?'':'red'">收藏</text>
				</template>
				<text v-else :class="favstart?'red':''">收藏</text>
				</view>
				
</view></view></view>
		
       
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
export default {
			props:['thread','favstart','mask','mpid'],
  data() {
	return {
		favbool:false,
		yudingbool:false,
		mob:false,
}                   
},
        computed: {
			bucketcdn(){
				return ysv8set.bucketcdn;
			}
        },
		
		components: {
		},
        methods: {
			yuding:function(){
				if(this.yudingbool) return false;
				uni.request({method:'POST',
					url: ysv8set.www+'mobile/yuding_tc.api',
																					data: {
																						id:this.thread['id'],
																						YSV8_HEX: ysv8set.ysv8hex
																					},
																					success: (res) => {
														var data=res.data;
														if('mob' in data){
															this.mob=data['mob'];
														}
														if(data['code']=='200'){
															this.yudingbool=true;
											
														}else{
														ysv8set.muialert(data);	
														}
														
														
				},
				fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})
				
				
			},
		
					
					fav:function(){
						var addstate=this.mask.add_array(this.thread,this.mask.datafav,true);
						this.mask.datafav=addstate[0];
						this.favbool=!this.favbool;
						ysv8set.localStorage.setItem("datafav"+this.mask.apiid,JSON.stringify(this.mask.datafav));
					},
					share:function(){
						
						},
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);}
		
        }
    }
</script>

<style>
.padding-top{padding-top: 20upx;}
.foot {
	padding-top: 20upx;
	padding-bottom: 20upx;
	font-weight: bold;
	width: 100%;
	position: fixed;
	bottom: 0px;
	background-color: #FFFFFF;
	z-index: 999;
	text-align: center;
	font-size: 35upx;
}
</style>
