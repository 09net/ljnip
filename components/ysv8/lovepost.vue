<template>
	
    <view>
		<view class="foot">
		<view class="row">
			<view class="col">
			<view class="col_3"><text class="red">{{sum[0]}}/{{sum[1]}}</text></view>
			<view class="col_3"><text class="red">{{dc}}KM</text></view>
			<view class="col_3" @click="yuding()">
				<text v-if="tel==false" @click="yuding()">获取资料</text><text v-else @click="sendtel(tel)" class="red">{{tel}}</text>
		</view>
			<view class="col_3"><uni-icon size="40" type="bars" @click="more"></uni-icon></view>
				
</view></view></view>
		
       
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uni-icon.vue'
export default {
			props:['dc','sum','user','mask','btime'],
			components: {
				uniIcon
				},
  data() {
	return {
		favbool:false,
		yudingbool:false,
		tel:false,
		bucketcdn:ysv8set.bucketcdn
}                   
},
        computed: {
			
        },
		
        methods: {
			more:function(){
				uni.showActionSheet({
					itemList: ['顶', '踩','举报',ysv8set.str_in_array(this.user['id'],ysv8set.userfollow)?'取消关注':'关注','私信'],
					success: (e) => {
						if(e.tapIndex=='4'){
							uni.navigateTo({
    url: '/pages/user/chat?uid='+this.user['id']+'&user='+this.user['user']+'&ava='+this.bucketcdn+this.user['avatar']+'_80'
});
							return false;
							}
							
							if(e.tapIndex=='3'){
													
													uni.request({method:'POST',
													url: ysv8set.www+'friend/friend_state.api',
													data: {
													uid:this.user['id'],
													YSV8_HEX: ysv8set.ysv8hex},
													success: (res) => {
													var data=res.data;
													if(data=='200'){
													ysv8set.userfollow=ysv8set.str_in_array(this.user['id'],ysv8set.userfollow,data['id']);
													ysv8set.localStorage.setItem("userfollow",JSON.stringify(ysv8set.userfollow));
													}
													
													ysv8set.muialert(data);							
													},
													fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})		
														return false;
														}
							
							
						if(e.tapIndex=='0'){var type='goods';}else if(e.tapIndex=='1'){var type='nos';}else{var type='jubao';}
						uni.request({method:'POST',
						url: ysv8set.www+'jy/vote.api',
						data: {
						uid:this.user['id'],
						type:type,
						YSV8_HEX: ysv8set.ysv8hex},
						success: (res) => {
						var data=res.data;
						ysv8set.muialert(data);							
						},
						fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})	
					}
				})
				
			},
			
			
			sendtel(mob){
				uni.makePhoneCall({phoneNumber: mob});	
			},
			yuding:function(){
				var dataf=this.mask.get_fav(this.user['id'],this.mask.datafav);
				if(dataf!=false){
				uni.showModal({content:'她的联系方式为: TEL：'+dataf['tel']+' QQ：'+dataf['qq']+' weixin：'+dataf['weixin']+' 地址：'+dataf['dz']});	
					
				}
				
				
				if(this.yudingbool) return false;
uni.showModal({content:'每天只可以获取一个人的联系方式！您确定要获取吗？',showCancel:true,
success: (e) => {
	if('cancel' in e) return false;
uni.request({method:'POST',
					url: ysv8set.www+'jy/getinfo.api',
data: {uid:this.user['id'],YSV8_HEX: ysv8set.ysv8hex
},
success: (res) => {
var data=res.data;
if(data['code']=='200'){this.yudingbool=true;this.tel=data['data']['tel'];
uni.showModal({content:'她的联系方式为: TEL：'+data['data']['tel']+' QQ：'+data['data']['qq']+' weixin：'+data['data']['weixin']+' 地址：'+data['data']['dz']});

this.mask.datafav=this.mask.add_fav({
	uid:this.user['id'],
	btime:this.btime,
	tel:data['data']['tel'],
	weixin:data['data']['weixin'],
	qq:data['data']['qq'],
	dz:data['data']['dz']
},this.mask.datafav);
ysv8set.localStorage.setItem("datafav"+this.mask.apiid,JSON.stringify(this.mask.datafav));


}else{ysv8set.muialert(data);	}
},fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}});


	
	
	}})
				
				
				
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
