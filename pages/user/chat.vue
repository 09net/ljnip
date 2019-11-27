<template>
    <view>
 <view class="list-view uni-padding-wrap">
<!--  #ifdef  MP-WEIXIN -->
	<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
	<!--  #endif -->
<view v-if="nowdata.length==0" class="c">	
<view class="p10">{{i18n['null']}}</view>
</view>
 <view v-else>
<block v-for="(newsitem,index2) in nowdata"  :key="index2">
<media-list :newitem="newsitem" :uid="uid" :user="user" :ava="ava"></media-list>
</block>
</view>	
		</view>	

 <view class="foot"><view class="row"><view class="col">
        <view class="col_9"><view class="uni-tabbar__bd"><view class="uni-tabbar__label tar_no">
          <input confirm-type="search" @confirm="confirm" v-model="content" class="uni-input" type="text" :placeholder="contentpla" />
        </view><!----></view></view>
		<view class="col_3"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='3'?'tar_active':'tar_no'">
        <button type="primary" @click="send()" size="mini">{{i18n.sub}}</button>
        </view><!----></view></view></view></view></view></view>

			
</view>
</template>
<script>
    import ysv8set from '@/static/ysv8/index.js';
    import mediaList from './chatlist.vue';
	import mask from '@/static/ysv8/chat.js';
	import uniIcon from '@/components/uniIcon.vue'
    export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
        components: {
            mediaList,
			uniIcon
        },onNavigationBarButtonTap(e) {			
			uni.showActionSheet({
			itemList: [ysv8set.str_in_array(this.uid,ysv8set.userfollow)?'取消关注':'关注', '主页'],
			success: (e) => {
				if(e.tapIndex==0){
					uni.request({method:'POST',
					url: ysv8set.www+'friend/friend_state.api?lang='+this._i18n.locale,
					data: {
					uid:this.uid,
					YSV8_HEX: ysv8set.ysv8hex},
					success: (res) => {
					var data=res.data;
					if(data=='200'){
					ysv8set.userfollow=ysv8set.str_in_array(this.uid,ysv8set.userfollow,data['id']);
					ysv8set.localStorage.setItem("userfollow",JSON.stringify(ysv8set.userfollow));
					}
					ysv8set.muialert(data);							
					},
					fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})
					return false;
				}
				if(e.tapIndex==1){
					 uni.navigateTo({
					    url: '/pages/my/index?uid=' + this.uid
					})
					return false;
				}
			}
			});
			 
		},data() {
            return {
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				mode: '',
				contentpla:'',
							deepLength: 1,
				title: ysv8set.title,
				rightDrawerVisible: false,
				showImg: false,
				pagtime:0,
				follow:false,
				ajaxi:true,
				loadingType:0,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                nowdata:[],
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				active:'Friend',
				method:'get_old_chat',
				uid:0,
				user:this.$t('index.sys'),
				ava:'/static/bell.png',
				content:'',
            }
        },
        onLoad: function(e) {
			if(e.uid){
						this.uid=e.uid;
					}
					if(e.user){
						this.user=e.user;
					}
					if(e.ava){
						this.ava=e.ava;
					}
					
					this.showImg = true;
					this.setNaivgationBarTitle(this.user);
					
        },
		onReady() {
			this.getlist();
		},
		onShareAppMessage() {
			if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
			return {
			 title: '零久附近通_真实有效的附近信息发布系统',
			 path: '/pages/chat/index?upuid='+suid
			}
		},
        methods: {
			send:function(){
				if(this.uid==0){
					uni.showToast({
						title: '不能给系统发送信息'
					})
					return false;
					}
				uni.request({
					method:'post',
				url: ysv8set.www+'friend/send_chat.api?lang='+this._i18n.locale,
				data: {
				 uid: this.uid,
				 content:this.content,
				  YSV8_HEX: ysv8set.ysv8hex
				},
											success: (res) => {
												var data=res.data;
												if(data['code']!=200){
													ysv8set.muialert(data)
													return false;
													}
			
								var setdataarray=ysv8set.setdata([
								{atime: ysv8set.timestamp*100,
								content: this.content,
								id: Math.ceil(Math.random()*100000000),
								size: "0",
								time: "刚刚",
								uid1: this.uid,
								uid2: this.uid,
								}], 'down', this.nowdata, this.pagtime);
											if(ysv8set.isArray(setdataarray) ==true){
								this.nowdata=setdataarray[0];
								}
								
										this.content="";			
													
													uni.showToast({
														title: $t('index.success')
													})
													},
         
				fail: (err) => {uni.showModal({content:$t('index.error'),showCancel:false});},complete:()=> {}});
				
				
					
		
				
			},
			
			share() {
				uni.showToast({
					title: '分享'
				})
			},
			
			confirm:function(str){
		this.send()
			},
			
			setNaivgationBarTitle: function (title) {this.title=title;uni.setNavigationBarTitle({title: title});},
			
				getlist:function(){
				if (this.loadingType !== 0) {return;}
				this.loadingType = 1;
				this.ajaxi++;
			
		

uni.request({
	method:'post',
url: ysv8set.www+this.active+'/'+this.method+'/'+this.pagtime+'.api?lang='+this._i18n.locale,
data: {
 uid: this.uid,
  YSV8_HEX: ysv8set.ysv8hex
},
							success: (res) => {
								var data=res.data;
								if(data['code']!=200){
									ysv8set.muialert(data)
									return false;
									}
								
								
								
			
				if('title'  in data){this.setNaivgationBarTitle(data['title']);}
				var setdataarray=ysv8set.setdata(data['data'], 'down', this.nowdata, this.pagtime);
					if(ysv8set.isArray(setdataarray) ==true){
				setdataarray[0].reverse();
		this.nowdata=setdataarray[0];
				this.pagtime=setdataarray[1];

				}

this.loadingType = 2;
},
fail: (err) => {uni.showModal({content:$t('index.error'),showCancel:false});this.loadingType = 0;},complete:()=> {}})
},
}
}
</script>
<style>
.tar_active{
	color: rgb(0, 122, 255); font-size: 10px;
}
.tar_no{
	color: rgb(122, 126, 131); font-size: 10px;
}
.swiper-box{padding-bottom: 80upx;}
.title {
		font-size: 15px;
		line-height: 20px;
		color: #333333;
		padding: 15px;
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left:8px;
	}
.uni-input{
	border: thin solid #000000;
	padding: 5upx;
	text-align: left;}
	.input-view {
		width: 92%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap:nowrap;
		margin:7px 0;
		line-height:30px;
	}
	
	.input-view .uniIcon{
		line-height:30px !important;
	}

	.input-view .input {
		height:30px;
		line-height:30px;
		width:94%;
		padding: 0 3%;
	}
	.foot {
		padding-top: 10upx;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		z-index: 999;
		text-align: center;
	}
</style>