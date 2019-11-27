<template>
	
    <view>
		<view class="foot" v-if="postno">
		<view class="row">
			<view class="col" v-if="showposts">
					<view class="col_6" @click="opendiv(0)">
						评论</view>
			<view class="col_2"><uniIcon size="25" type="map" @click="lcfun"></uniIcon></view>
			<view class="col_2">
				<uniIcon size="25" type="heart" @click="fav" :color="favbool?'red':''"></uniIcon>
	        </view>
			<view class="col_2">
				<uniIcon size="25" type="bars" @click="more"></uniIcon>
			</view>
		  </view>
		  
		  <view class="col" v-else>
		  			<view class="col_4"><uniIcon size="25" type="map" @click="lcfun"></uniIcon></view>
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
			<view class="col_6 padding-top" style="text-align: left;"><uniIcon size="25" type="close" @click="opendiv" class="red"></uniIcon></view>
			<view class="col_6 padding-top" style="text-align:right"><button type="primary" formType="submit" size="mini">提交</button></view>
			</view>
		</view>
		</form>
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
	<view class="uni-uploader__file" v-if="src">
			<video :src="src" class="video"></video>
</view>
		
		</view></view></view></view></view>
		</view>
		</view>
       
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
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
			props:['favbool','id','uid'],
  data() {
 return {
	 pid:0,
postno:true,
showposts:ysv8set.showposts,
mpid:0,
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
					count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
					votetype:['goods','nos','jubao'],
}                   
},components: {
			uniIcon
		},
        methods: {
			lcfun:function(){
				var lca=this.thread['lc'].split(',')
				uni.openLocation({
				            latitude: parseFloat(lca[0]),
				            longitude: parseFloat(lca[1])
				      
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
					},500);
			},
			getop:function(){
				
				var lat1a=this.thread['lc'].split(',');
							        uni.openLocation({
							            latitude: Number(lat1a[0]),
							            longitude: Number(lat1a[1]),
							            success: function () {
							           
							            }
							});
},
			more:function(){
				uni.showActionSheet({
					itemList: ysv8set.showposts?['顶', '踩','举报','赞赏G100','资料','评论']:['顶', '踩', '举报','赞赏G100','资料'],
					success: (e) => {
						if(e.tapIndex=='3'){this.shang();return false;}
						if(e.tapIndex=='4'){uni.navigateTo({url: '/pages/my/index?uid='+this.uid});return false;}
						if(e.tapIndex=='5'){uni.navigateTo({url: '/pages/com/index?mode=com_nip&id='+this.id});return false;}
						uni.request({method:'POST',
						url: ysv8set.www+'t/vote.api?lang='+this._i18n.locale,
						data: {
						id:this.id,
						type:this.votetype[e.tapIndex],
						YSV8_HEX: ysv8set.ysv8hex
						},
						success: (res) => {
						var data=res.data;
						ysv8set.muialert(data);							
						},
						fail: (err) => {uni.showModal({content:ysv8set.langfun('网络故障'),showCancel:false})},complete:()=> {}})
						
						
						
						
						
						
						
						
						
					}
				})
				
			},
					shang:function(){
						if(this.thread['uid']=='0'){return false;}
						uni.request({method:'POST',
												url: ysv8set.www+'com_nip/shang.api?lang='+this._i18n.locale+'&upuid='+ysv8set.upuid,
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
						fail: (err) => {
																								uni.showModal({
																									content:ysv8set.langfun('网络故障'),
																									showCancel:false
																								})
																							},
																							complete:()=> {
																							
																							}
																						})
												
						
						
						
					},
					fav:function(){
					  this.$emit('click');	
					},
					share:function(){
						
					},
					postsub:function(e){
						var formData = e.detail.value;		
								
								if(formData['content'].length<10){ 
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
fail: (err) => {
																		uni.showModal({
																			content:ysv8set.langfun('网络故障'),
																			showCancel:false
																		})
																	},
																	complete:()=> {
																	
																	}
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
				
				
				if(id=='0' && this.mpid){this.pid=this.mpid;
				}else{
						this.pid=id;
				}
			
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
							const uploadTask = uni.uploadFile({
								url: ysv8set.www+'post/upload.api?lang='+this._i18n.locale,
								filePath: imageSrc,
								name: 'photo',
								formData:{
									YSV8_HEX: ysv8set.ysv8hex
								},
								success: (res) => {
									var data=JSON.parse(res.data);
								if(data.code!='200'){ ysv8set.muialert(data);
								return false;
								}
				
									uni.showToast({
										title: ysv8set.langfun('成功'),
										icon: 'success',
										
									})
									this.imageList = this.imageList.concat(data.url+'@'+data.w+'|'+data.h);
									this.imageList2 = this.imageList2.concat(imageSrc);
									},
								fail: (err) => {
									console.log('uploadImage fail', err);
									uni.showModal({
										content:ysv8set.langfun('网络故障'),
										showCancel:false
									});
									uni.hideLoading();
								},
								complete: () => {
							
								}
							});
								 uploadTask.onProgressUpdate((res) => {
							uni.showToast({
																	 	title: "loading："+res.progress,
																	 	icon: 'loading',
																	 	
																	 })
							       
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
				},chooseVideo: function () {
				uni.chooseVideo({
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						
									var imageSrc = res.tempFilePath
									const uploadTask = uni.uploadFile({
										url: ysv8set.www+'post/uploadfile.api?lang='+this._i18n.locale,
										filePath: imageSrc,
										name: 'photo',
										formData:{
											YSV8_HEX: ysv8set.ysv8hex
										},
										success: (res) => {
											var data=JSON.parse(res.data);
										if(data.code!='200'){ ysv8set.muialert(data);
										return false;
										}
						
											uni.showToast({
												title: ysv8set.langfun('成功'),
												icon: 'success',
												
											})
											this.src =data.name;
										},
										fail: (err) => {
											console.log('uploadImage fail', err);
											uni.showModal({
												content:ysv8set.langfun('网络故障'),
												showCancel:false
											});
											uni.hideLoading();
										},
										complete: () => {
								
										}
									});
						 uploadTask.onProgressUpdate((res) => {
					uni.showToast({
															 	title: "loading："+res.progress,
															 	icon: 'loading',
															
															 })
					       
					        });
					}
				})
			}
        }
    }
</script>

<style>
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
.shang{ font-size: 40upx;}
.bj{background-color: #BEBEBE;}
</style>