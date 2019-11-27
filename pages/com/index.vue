<template>
<view>			
<view class="list-view">
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
<block v-for="(newsitem,index2) in postdata"  :key="index2">
<media-list :newitem="newsitem" @close="follow(newsitem)" :postactive="mask.postactive" @click="goDetail(newsitem)"></media-list>
</block>
<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
</view>
				
			
	
	
<view class="foot" v-if="postno">
		<view class="row">
			<view class="col" v-if="showposts">
					<view class="col_12" @click="opendiv(0)">
						评论</view>
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
import mediaList from '@/components/ysv8/postlist.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniIcon from '@/components/uniIcon.vue'
	import mask from '@/static/ysv8/chat.js';
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
        components: {
            mediaList,		
			uniLoadMore,
			uniIcon
        },onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
		onReachBottom(e) {
			
				this.getlist();
		
		},
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/chat/index'
			}
		},
        data() {
            return {
				title: ysv8set.title,
				rightDrawerVisible: false,
				showImg: true,
				pagtime:0,
				pid:0,
				postno:true,
				thread:[],
				favstart:false,
				mask:mask,
				loadingText: {
					 contentdown: ysv8set.langfun("刷新"),
					contentrefresh: ysv8set.langfun("加载中"),
					contentnomore: ysv8set.langfun("完毕")
				},
				ajaxi:true,
				loading:100,
				loadingType:0,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                postdata:[],
				imgcdn:ysv8set.imgcdn,
				imgswt:ysv8set.imgswt,
				bucketcdn:ysv8set.bucketcdn,
			    mode:'com_nip',
				imageList: [],
				imageList2: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 1,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 2,
				src:'',
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				votetype:['goods','nos','jubao'],	
				showposts:ysv8set.showposts,
				mpid:0,
            }
        },
        onLoad: function(e) {
					if(e.mode){
					this.mode=e.mode;
						
					}
					if(e.pid){
						this.mpid=e.pid;
					}
					if(e.id){
						this.id=e.id;
						this.thread['id']=e.id;
					}
		
			
        },
		onReady() {
			this.getlist();
		},
        methods: {
			share() {
				//#ifdef APP-PLUS
				ysv8set.share_app(this.title,ysv8set.www,ysv8set.imgcdn+'logo.png');
				//#endif	
				//#ifndef APP-PLUS
				ysv8set.share(this.title,ysv8set.www,ysv8set.imgcdn+'logo.png');
				//#endif	
			},
			
			follow:function(e){
				var addstate=mask.add_array(newsitem,ysv8set.userdata['forum'],true);
				ysv8set.userdata['forum']=addstate[0];
				ysv8set.localStorage.setItem("user",JSON.stringify(ysv8set.userdata));  
				
			},
			

			buttonbar:function(e,bool){
				if(bool){
				uni.redirectTo({url: '/pages/' + e});
				}else{
					uni.redirectTo({url:e});
				}
			},
			
			
			gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
			gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
            goDetail(e) {
				 this.opendiv(e.id);
            },
			postsub:function(e){
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
																					pid:this.pid?this.pid:this.mpid,
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
												var imageSrc = res.tempFiles[i]['path']
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
									urls: this.imageList
								})
							},
            
				getlist:function(){
				if (this.loadingType !== 0) {return;}
				this.loadingType = 1;
				this.ajaxi++;
			
		
		if(this.pid>0){
var ajaxurl=ysv8set.www+this.mode+'/more/'+this.pid+'.api?lang='+this._i18n.locale+'&pageid='+this.pagtime;
		}else{
var ajaxurl=ysv8set.www+this.mode+'/'+this.id+'.api?lang='+this._i18n.locale+'&pageid='+this.pagtime;
		}
				
				uni.request({
								url: ajaxurl,
							data: {
								YSV8_HEX: ysv8set.ysv8hex
							},
							success: (res) => {
								var data=res.data;
				
				
				var setdataarray=ysv8set.setdata(data['PostList'], 'down', this.postdata, this.pagtime);
					if(ysv8set.isArray(setdataarray) ==true){
				this.postdata=setdataarray[0];
				this.pagtime=setdataarray[1];
				}
				if('title' in data){
					this.title=data['title'];
				uni.setNavigationBarTitle({title: this.title});
				}
			
				setTimeout(() => {
								if (setdataarray[2]<10) {
								this.loadingType = 2;
								}else{
								 this.loadingType = 0;
													}

							}, 500);		
							},
							fail: (err) => {
								uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})
								 setTimeout(() => {this.loadingType = 0;}, 100);
							}
						})
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