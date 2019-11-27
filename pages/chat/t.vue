<template><view>
	<view style="padding: 100upx; text-align: center;" v-show="loading<100">
		<uniIcon size="25" type="spinner"></uniIcon>
		<view class="red">{{loading}}</view>
	
		</view>
<view class="uni-padding-wrap" v-show="loading>99">
	
	<view class="uni-list" v-if="thread!=false">
			<view class="h1" @click="copytxt(thread.title)">{{thread.title}}</view>
			
			</view>	
<view class="uni-list" v-if="thread!=false">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo"  @tap="gonav('my/index?uid='+uid)">
						<image v-if="thread['avatar']" :src="imgswt+thread['avatar']"></image>
					</view>
					<view class="uni-media-list-body"  @tap="gonav('my/index?uid='+uid)">
						<view class="uni-media-list-text-top">
						<uniIcon type="address-book" size="16">{{thread.user}}</uniIcon>
						
						</view>
						<view class="uni-media-list-text-bottom uni-ellipsis uni-row">
						
							<uniIcon type="credit-card" class="info-text red">{{thread.c}}</uniIcon>
							<uniIcon type="clock-o" class="info-text">{{timestr}}</uniIcon>
																
							
							
							
							</view>
					</view>
				</view>
			</view>
		</view>			
<view class="article-content">
<wxParse v-if="htmlString" :content="htmlString"/></view>
<view class="article-files" v-if="platform && files">
			<block v-for="(file,index2) in files" :key="index2">
			<filelist :newitem="file" :tid="id"></filelist>
			</block>
				</view>
<view class="uni-common-mt" style="background-color: #FFFFFF;">
<view class="uni-btn-v" v-if="prc>0">
<view class="row"><view class="col">				
<view class="col_4 c"><view class="uni-list-cell-db">
<view class="uni-input">{{i18n.prc}}（元)</view>
</view></view>
<view class="col_8 c">{{prc}}</view></view></view>
</view>
<view class="uni-btn-v" v-if="tel" style="background-color: #007aff; color: #fff;line-height:3; text-align: center;">
	<uniIcon type="phone-square" size='20' @click="getcall(tel)" >{{tel}}</uniIcon>
	

</view>
<view class="uni-btn-v" v-if="sns">
<view class="row"><view class="col">				
<view class="col_4 c"><view class="uni-list-cell-db">
<view class="uni-input">{{snsa[snsmode].name}}</view>
</view></view>
<view class="col_8 c">{{sns}}</view></view></view>
</view>
<view class="uni-btn-v" v-if="shop">
<view class="row"><view class="col">				
<view class="col_4 c"><view class="uni-list-cell-db">
<view class="uni-input">{{i18n.link}}</view>
</view></view>
<view class="col_8 c" @click="geturl(shop)" style="background-color: #007aff; color: #fff;line-height:3">{{shop}}</view></view></view>
</view>		
	<view class="shangv"><view>
	<uniIcon size="25" type="diamond" @click="shang()" :class="shangbool?'red':''">赏（100）</uniIcon>
	</view></view>
	</view>
		
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
<view class="uni-list">
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
<view class="uni-btn-v" style="background-color: #007aff; color: #fff;line-height:3; text-align: center;">
	<uniIcon type="clipboard" size='20' @click="copytxt()">{{i18n.copy}}</uniIcon>
</view>				
						
						
<block v-for="(newsitem,index2) in moredata" :key="newsitem.id" v-if="moredata">
	<bbslist :newitem="newsitem" @click="goDetail2(newsitem)" :lc="lc" v-if="newsitem"></bbslist>
	</block>

	<!-- 评论区 start -->
			<view class="uni-comment" v-if="showposts">
				<view >
					<view class="list-view">
						
						<block v-for="(newsitem,index2) in postlist" :key="newsitem.btime">
								<mediaList :newitem="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></mediaList>
						</block>
						
					</view>
					<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
				</view>
				
			</view>
			<!-- 评论区 end -->
			</view>

<view class="foot" v-if="postno">
	
	
		<view class="row">
			<view class="col" v-if="showposts">
					<view class="col_4" @click="opendiv(0)">
						{{i18n.comment}}</view>
			<view class="col_4 red"><uniIcon size="18" @click="lcfun">{{newds}}</uniIcon></view>
			<view class="col_2">
				<uniIcon size="25" type="heart" @click="fav" :color="favbool?'red':''"></uniIcon>
	        </view>
			<view class="col_2">
				<uniIcon size="25" type="bars" @click="more"></uniIcon>
			</view>
		  </view>
		  
		  <view class="col" v-else>
		  			<view class="col_4 red"><uniIcon size="18" @click="lcfun">{{newds}}</uniIcon></view>
		  			<view class="col_4">
		  				<uniIcon size="25" type="heart" @click="fav()" :color="favbool?'red':''"></uniIcon>
		    </view>
		  			<view class="col_4">
		  				<uniIcon size="25" type="bars" @click="more"></uniIcon>
		  			</view>
		  </view>
		  
		  
		  
		</view>
		</view>
		<view class="top" v-else>
		<view class="postarea" style=" padding-bottom: 500upx;">
			<form @submit="postsub">
		<textarea name="content" style="border: thin solid #333333; width:98%; text-align: left; padding: 10upx; height: 100upx; overflow-y: scroll;"/>
		
		<view style="text-align: left;"><uniIcon size="25" type="image" @click="chooseImage" class="blue"></uniIcon>@{{pid}}</view>
		<view class="row bj">
			<view class="col">
			<view class="col_6 padding-top" style="text-align: left;"><uniIcon size="25" type="close" @click="opendiv(0)" class="red"></uniIcon></view>
			<view class="col_6 padding-top" style="text-align:right"><button type="primary" formType="submit" size="mini">提交</button></view>
			</view>
		</view>
		</form>
		<view v-if="loading<100">
		<uniIcon size="25" type="spinner"></uniIcon>
		<view class="red">{{loading}}</view>
		</view>
		
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
		<view class="uni-uploader-body">
			<view class="uni-uploader__files">
		<block v-for="(image,index) in imageList2" :key="index">
			<view class="uni-uploader__file">
				<image class="uni-uploader__img" :src="image.split('@')[0]" :data-src="image.split('@')[0]" @click="previewImage"></image>
				</view>
		</block>
		
		</view></view></view></view></view>
		</view>
		</view>


	</view>

</template>

<script>
import ysv8set from '@/static/ysv8/index.js';
import mask from '@/static/ysv8/chat.js';
import bbslist from './list.vue';
import filelist from '@/components/ysv8/filelist.vue';
import mediaList from '@/components/ysv8/postlist.vue';
import uniLoadMore from '@/components/uni-load-more.vue'
import marked from '@/components/marked'
import uniIcon from '@/components/uniIcon.vue'
import wxParse from '@/components/uParse/src/wxParse.vue'
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   },
		   newds(){
		    return ysv8set.GetDistance(this.lc,this.thread['lc'])+'KM';	
		   },
		   timestr:function(){
		   	return ysv8set.timeStamp2String(this.thread['btime']);
		   }
		 },
		onNavigationBarButtonTap(e){
			this.share();
		},
	components: {
		mediaList,
	uniLoadMore,
	bbslist,
	filelist,
	wxParse,uniIcon
		},
		data() {
			return {
			title: ysv8set.title,
				
				banner: {},
				id:0,
				pid:0,
				uid:0,
				lc:mask.lc,
				favbool:false,
				vs:'',
				img:ysv8set.imgcdn+'logo.png',
				url:false,
				moredata:false,
				loading:0,
				imglist:false,
				showImg:true,
			thread:[{
				posts:0
			}
			],
			  showposts:ysv8set.showposts,
				
				imgswt:ysv8set.imgswt,
				
				bannerShow:false,
				htmlString: "",
				postlist:[],
				pagtime:0,
				loadingType:0,
				shangbool:false,
				contentText: this.$t('loadingText'),
				platform:this._i18n.platform,
				sns:'',
				snsa:[{vale:0,name:'未知'},
				{vale:1,name:'微信'},
				{vale:2,name:'QQ'},
				{vale:3,name:'微博'},
				{vale:4,name:'阿里旺旺'}],
				snsmode:0,
				shop:'',
				shopmode:0,
				tel:'',
				prc:'',
				
				
				postno:true,
				mpid:0,
				files:false,
				contentpla:ysv8set.langfun('评论'),
									text:'',
									textRiskIdentification:'',
									shangstart:false,
									imageList: [],
									imageList2: [],
									sourceTypeIndex: 2,
									sourceType: ['拍照', '相册', '拍照或相册'],
									sizeTypeIndex: 1,
									sizeType: ['压缩', '原图', '压缩或原图'],
									countIndex: 2,
									src:'',
									count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		onReachBottom() {
			if (this.loadingType !== 0) {return;}
			this.loadingType = 1;
			this.ajaxi++;
			uni.request({
							url: ysv8set.www+'com_nip/'+this.id+'/'+this.pagtime+'.api?lang='+this._i18n.locale,
						data: {
							t: ysv8set.timestamp/*缓存100秒更新一次*/
						},
						success: (res) => {
							var data=res.data;
			var setdataarray=ysv8set.setdata(data['PostList'], 'down', this.postlist, this.pagtime);
				if(ysv8set.isArray(setdataarray) ==true){
			this.postlist=setdataarray[0];
			this.pagtime=setdataarray[1];
			}
if (setdataarray[2]<10) {this.loadingType = 2;}else{this.loadingType = 0;}
},fail: (err) => {uni.showModal({content:ysv8set.langfun("网络故障"),showCancel:false});},complete:()=> {}});
			},
		onLoad(e) {
if(e.id){this.id = e.id;}else{
uni.showModal({
					title: this.$t('index.error'),
					content: ysv8set.langfun('参数不齐'),
					showCancel: false,
					confirmText: this.$t('index.ok')})
			}
			
		},onReady(){
				this.getDetail();
				
		},onShareAppMessage() {
			if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
			return {
			 title: this.title,
			 path: '/pages/chat/t?id='+this.id+'&upuid='+suid
			}
		},
		methods: {
			geturl:function(e){
			uni.navigateTo({url: '/pages/user/web?url=' +encodeURIComponent(e)});
			},
		getcall:function(e){
			uni.makePhoneCall({
			    phoneNumber: e //仅为示例
			});
			},
			comfun:function(){
				if(this.funin) return false;
				this.funin=true;
					uni.createSelectorQuery().select(".uni-padding-wrap").boundingClientRect(data=>{
					    uni.createSelectorQuery().select(".uni-comment").boundingClientRect((res)=>{
					        uni.pageScrollTo({
					            duration:0,
					            scrollTop:res.top - data.top
					        })
					    }).exec()
					}).exec();
					setTimeout(() => {
						this.funin=false;
					},50);
			},
			lcfun:function(){
				var lca=this.thread['lc'].split(',')
				uni.openLocation({
				            latitude: parseFloat(lca[0]),
				            longitude: parseFloat(lca[1])
				      
				        });
				},
			fav(){
			
			var addstate=mask.add_array(this.thread,mask.datafav,true);				
			mask.datafav=addstate[0];
			this.favbool=!this.favbool;
			ysv8set.localStorage.setItem("datafav"+mask.apiid,JSON.stringify(mask.datafav));
				
			},
			more:function(){
				uni.showActionSheet({
					itemList: ysv8set.showposts?['顶', '踩','举报','云收藏','资料','评论']:['顶', '踩', '举报','云收藏','资料'],
					success: (e) => {
						if(e.tapIndex=='4'){uni.navigateTo({url: '/pages/my/index?uid='+this.uid});return false;}
						if(e.tapIndex=='5'){uni.navigateTo({url: '/pages/com/index?mode=com_nip&id='+this.id});return false;}
						uni.request({method:'POST',
						url: ysv8set.www+'t/vote.api?lang='+this._i18n.locale,
						data: {
						id:this.id,
						type:ysv8set.votetype[e.tapIndex],
						YSV8_HEX: ysv8set.ysv8hex
						},
						success: (res) => {
						var data=res.data;
						ysv8set.muialert(data);							
						},
						fail: (err) => {uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})},
						})	
					}
				})
				
			},postsub:function(e){
						var formData = e.detail.value;		
								
								if(formData['content'].length<5){ 
								uni.showModal({
									content:ysv8set.langfun('内容长度不够'),
									showCancel:false,
									
								})
								return false;
								}	
								
								
								// #ifdef  MP-ALIPAY
															if(this.textRiskIdentification!=formData['content']){
																my.textRiskIdentification({
																		      content: formData['content'],
																		      type: ['keyword', '1', '2', '3'],
																		      success: (res) => {
																				  console.log(res)
																			   if("hitKeywords" in res.result[0]){ 
																			   uni.showModal({
																			   	content:'包含敏感字：'+res.result[0]['hitKeywords'].join(','),
																			   	showCancel:false,
																			   })
															
																			   return false;
																			   }
								if(res.result[0]['score']>50 || res.result[1]['score']>50  || res.result[2]['score']>50){
													uni.showModal({
														content:'内容被云检测出敏感信息',
														showCancel:false,
													})
													return false;
													
												
												}
													this.postsub(e)
													this.textRiskIdentification=formData['content'];
																		      },
																		      fail: (res) => {
																		 uni.showModal({
																		 	content:'关键字检测错误',
																		 	showCancel:false,
																		 })
																		      },
																		    });
																			
												return false;
											}
																			
																// #endif
								
							uni.request({method:'POST',
						url: ysv8set.www+'com_nip/'+this.id+'.api?lang='+this._i18n.locale,
																	data: {
																		content:formData['content'],
																		pid:this.pid,
																		imgv:this.imageList.join(','),
																		vidv:this.src,
																		YSV8_HEX: ysv8set.ysv8hex
																	},
success: (res) => {
										var data=res.data;
										if(data['code']==200){
									uni.showModal({
										content:ysv8set.langfun('成功'),
										showCancel:false
									})
									this.post();
										}else{
											ysv8set.muialert(data);
										}
										
},
fail: (err) => {uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false
})
},
})
},
opendiv:function(id){
				if(ysv8set.userdata==false){
					ysv8set.muialert({
						code:301,
						info:ysv8set.langfun('请登录')
					});
					return false;
				}
				
				
				
						this.pid=id;
				
			
				this.postno=!this.postno;},
			post:function(){this.text='';this.postno=!this.postno;},
			chooseImage: async function() {
					if (this.imageList.length >5) {
						uni.showModal({content:ysv8set.langfun('图片已满'),showCancel:false});
					    return false;
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: 1,
						success: (res) => {
						for (var i in res.tempFiles){
							if (res.tempFiles[i]['size']>3024000){
								uni.showToast({
									title: ysv8set.langfun('图片太大'),
									icon: 'none',
									
								})
								return false;
							}
							if(i>3) break;
									var imageSrc = res.tempFiles[i]['path'];
									this.loading=0;
							const uploadTask = uni.uploadFile({
								url: ysv8set.www+'post/upload.api?lang='+this._i18n.locale,
								filePath: imageSrc,
								name: 'photo',
								formData:{
									YSV8_HEX: ysv8set.ysv8hex
								},
								success: (res) => {
									var data=eval('(' + res.data + ')');
								if(data.code!='200'){ ysv8set.muialert(data);
								return false;
								}
				
									
									this.imageList = this.imageList.concat(data.url+'@'+data.w+'|'+data.h);
									this.imageList2 = this.imageList2.concat(imageSrc);
									
									},
								fail: (err) => {
									this.loading=100;
									uni.showModal({
										content:ysv8set.langfun('网络故障'),
										showCancel:false
									});
									
								},
								complete: () => {
							
								}
							});
								 uploadTask.onProgressUpdate((res) => {
							this.loading=res.progress;
							       
							        });
							}
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: ysv8set.langfun('图片已满，是否清空'),
							success: (e) => {
								if (e.confirm) {
									this.imageList = [];
									this.imageList2 = [];
									res(true);
								} else {
									res(false)
								}
							},
							fail: () => {
								res(false)
							}
						})
					})
				},
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList2
					})
				},
					shang:function(){
						if(this.thread['uid']=='0'){return false;}
						uni.request({method:'POST',
												url: ysv8set.www+'com_nip/shang.api?upuid='+ysv8set.upuid,
																							data: {
																								uid:this.uid,
																								tid:this.id,
																								pid:0,
																								YSV8_HEX: ysv8set.ysv8hex
																							},
																							success: (res) => {
																var data=res.data;
																ysv8set.muialert(data);
																
																this.shangstart=true;
															
						},
						fail: (err) => {uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})
						}
						})	
					},
			copytxt(){
				var msg=this.thread.title+"\r\n"+this.htmlString
				msg = msg.replace(/[|]*\n/, '');
				msg = msg.replace(/<\/?[^>]*>/g, ""); 
				msg = msg.replace(/&npsp;/ig, ''); 
				msg = msg+"\n"+ ysv8set.www+'t/'+this.id+'.html'
				uni.setClipboardData({
				    data: msg,
				    success: function () {
				    }
				});
			},
			goDetail2(e) {
				this.tiddata=false;
				this.moredata=false;
				this.favbool=false;
				this.loading=0;
				this.vs='',
				this.pagtime=0;
				this.htmlString= "",
				this.postlist=[],
				this.img=ysv8set.imgcdn+'logo.png',
				this.id = e.id;
				this.website=e.fid
				this.sns='';
				this.snsmode=0;
				this.shop='';
				this.shopmode=0;
				this.tel='';
				this.prc='';
				this.files=false;
				this.getDetail();
				
			},
			share() {
				//#ifdef APP-PLUS	
				ysv8set.share_app(this.title,'https://www.44api.com/t/'+this.id+'.html',this.img)
				//#endif	
				//#ifndef APP-PLUS
				ysv8set.share(this.title,'https://www.44api.com/t/'+this.id+'.html',this.img)
				//#endif
			
			},
			 goDetail(e) {
				 this.opendiv(e.id);
			},
			gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
			gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/'+e})},
videoErrorCallback: function(e) {uni.showModal({content: e.target.errMsg,showCancel: false})},
failfun(str){
					uni.showModal({
					content:str,
					showCancel:false,
					success: function (res) {
						uni.navigateBack();
						}
				})
			},
getDetail() {
	this.loading=25;
	uni.request({
								url: ysv8set.www+'t/'+this.id+'.api',
							data: {
						t: ysv8set.timestamp/*缓存100秒更新一次*/
							},
							success: (res) => {
								this.loading=50;
								var data=res.data;

if(data['code']!='200'){
this.failfun(data['info']);				
return false;
}
if('vs' in data['thread'] && data['thread']['vs']){this.vs=data['thread']['vs']}
this.thread=data['thread'];
this.uid=data['thread']['uid'];
if('img' in data['thread'] && data['thread']['img']){
this.img=ysv8set.imgcdn+data['thread']['img'].split(',')[0];
}
this.title=data['title'];
this.files=data['files'];
this.sns=data['thread']['sns'];
this.snsmode=data['thread']['snsmode'];
this.shop=data['thread']['shop'];
this.shopmode=data['thread']['shopmode'];
this.tel=data['thread']['tel'];
this.prc=data['thread']['prc'];
var setdataarray=ysv8set.setdata(data['data'], 'down', [], 0,'btime',this.lc);
if(ysv8set.isArray(setdataarray) ==true){
this.moredata=setdataarray[0];
}
uni.setNavigationBarTitle({title: this.title});
uni.request({
url: ysv8set.hash+'hash/' + data['thread']['hashid'] + '.js',
success: (res) => {
this.loading=100;
var data=res.data;
this.htmlString=marked(data.content.replace(/data-original/g, 'src'));
},fail: (err) => {this.failfun(ysv8set.langfun('网络故障'));}});
mask.datalook =mask.add_array(data['thread'],mask.datalook,false)[0]
ysv8set.localStorage.setItem("datalook"+mask.apiid,JSON.stringify(mask.datalook));
this.favbool=ysv8set.in_array(data['thread']['id'],mask.datafav);/*是否收藏*/
var setdataarray=ysv8set.setdata(data['PostList'], 'down', [], this.pagtime);
				if(ysv8set.isArray(setdataarray) ==true){
				this.postlist=setdataarray[0];
				this.pagtime=setdataarray[1];
				}
				
								if (setdataarray[2]<10) {
									this.loadingType = 2;
								}else{
								this.loadingType = 0;
								}
						
// #ifdef  MP-BAIDU
swan.setPageInfo({
title: this.title,
keywords:data['thread']['summary'].replace(" ",","),
description: this.title,
releaseDate: ysv8set.timeStamp2String(data['thread']['btime']),
image: [this.img]
})
// #endif
},
fail: (err) => {this.failfun(ysv8set.langfun('网络故障'));},
});
			}
		}
	}
</script>
<style>@import url("../../components/uParse/src/wxParse.css");
	.h1 {
		font-size: 40upx;
		padding: 20upx;
		font-weight: bold;
	}
	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 30upx;
		background-color: #FFFFFF;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
    /* 遮罩层 */
    .uni-mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
    }

    /* 弹出层形式的广告 */
    .uni-banner {
        width: 70%;
        position: fixed;
        left: 50%;
        top: 50%;
        background: #FFF;
        border-radius: 10upx;
        z-index: 99;
        transform: translate(-50%, -50%);
    }
		.uni-padding-wrap{ padding-bottom: 80upx;}
		.shangv{text-align: center;}
		.shang{font-size: 100upx;}
		.video{ width: 120px; height: 120px;}
		.postarea{padding: 20upx;}
		.posttextarea{background-color: #FFFFFF; width: 100%;min-height: 150upx; padding-bottom: 100upx;}
		.padding-top{padding-top: 20upx;}
		.top{
		padding-top: 10upx;
			width: 100%;
			position: fixed;
			top: 100upx;
			background-color: #FFFFFF;
			z-index: 999;
			text-align: center;	
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
		.bj{background-color: #BEBEBE;}
</style>
