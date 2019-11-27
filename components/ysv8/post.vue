<template>
	
    <view>
		<view class="foot">
		<view class="row" v-if="postno">
			<view class="col">
			<view class="col_4"><uni-icon size="40" type="heart" @click="opendiv(0)"></uni-icon></view>
			<view class="col_4">
				<uni-icon size="40" type="heart" @click="fav()" :color="favbool?'red':''"></uni-icon>
	        </view>
			<view class="col_4">
				<uni-icon size="40" type="bars" @click="more"></uni-icon>
			</view>
		  </view>
		</view>
		<view class="postarea" v-else>
			<form @submit="postsub">
		<textarea placeholder-style="color:#F76260" style="text-align: left;" maxlength="600" name="content" :placeholder="content" auto-height class="posttextarea"/>
		
		<view class="row bj">
			<view class="col">
				<view class="col_3 padding-top"><uni-icon size="30" type="close" @click="opendiv" class="red"></uni-icon></view>
				
			
			<view class="col_3 padding-top"><uni-icon size="30" type="image" @click="chooseImage" class="blue"></uni-icon></view>
			<view class="col_3 padding-top"><uni-icon size="30" type="video-camera" @click="chooseVideo" class="blue"></uni-icon></view>
			<view class="col_3"><button type="primary" formType="submit"><lang str="提交"></lang></button></view>
			</view>
		</view>
		</form>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
		<view class="uni-uploader-body">
			<view class="uni-uploader__files">
		<block v-for="(image,index) in imageList" :key="index">
			<view class="uni-uploader__file">
				<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
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
	import uniIcon from '@/components/uni-icon.vue'
	import lang from '@/components/ysv8/lang.vue';
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
			props:['thread','favstart','mask','mpid'],
  data() {
 return {
	 favbool:false,/*收藏操作*/
	 pid:0,
postno:true,
					text:'',
					shangstart:false,
					imageList: [],
					sourceTypeIndex: 2,
					sourceType: ['拍照', '相册', '拍照或相册'],
					sizeTypeIndex: 2,
					sizeType: ['压缩', '原图', '压缩或原图'],
					countIndex: 2,
					src:'',
					count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
					votetype:['goods','nos','jubao'],
					votepost:{/*对照表*/
					'comebook':'ebook',
				    'comblog':'blog',
					'comask':'mask',
					'comthread':'f',
					'comw':'w',
					'comchat':'enchat',
					
					}
}                   
},
        computed: {
			bucketcdn(){
				return ysv8set.bucketcdn;
			}
        },
		onUnload() {
			
			this.imageList = [],
			this.src = '',
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 2;
		},
		components: {
			uniIcon,lang
		},
        methods: {
			bindKey: function (e) {
				
						this[e.target.id] = e.target.value
					},
			more:function(){
				uni.showActionSheet({
					itemList: this.favbool?['顶', '踩', '举报','赞赏(G100)','评论','收藏']:['顶', '踩', '举报','赞赏(G100)','评论'],
					success: (e) => {
						if(e.tapIndex=='3'){this.shang();return false;}
						if(e.tapIndex=='5'){this.fav();return false;}
						if(e.tapIndex=='4'){uni.navigateTo({url: '/pages/com/index?mode='+this.mask.postactive+'&id='+this.thread['id']+'&uid='+this.thread['uid']});return false;}
						uni.request({method:'POST',
						url: 'https://'+ysv8set.website+'.44api.com/'+this.votepost[this.mask.postactive.toLowerCase()]+'/vote.api',
						data: {
						id:this.thread['id'],
						type:this.votetype[e.tapIndex],
						YSV8_HEX: ysv8set.ysv8hex
						},
						success: (res) => {
						var data=res.data;
						ysv8set.muialert(data);							
						},
						fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})
						
						
						
						
						
						
						
						
						
					}
				})
				
			},
					shang:function(){
						if(this.thread['uid']=='0'){return false;}
						uni.request({method:'POST',
												url: ysv8set.www+this.mask.postactive+'/shang.api?upuid='+ysv8set.upuid,
																							data: {
																								uid:this.thread['uid'],
																								tid:this.thread['id'],
																								pid:0,
																								YSV8_HEX: ysv8set.ysv8hex
																							},
																							success: (res) => {
																var data=res.data;
																ysv8set.muialert(data);
																
																this.shangstart=true;
																this.mask.datacom=this.mask.add_array(this.thread,this.mask.datacom,false)[0];
																ysv8set.localStorage.setItem("datacom"+this.mask.apiid,JSON.stringify(this.mask.datacom));
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
						var addstate=this.mask.add_array(this.thread,this.mask.datafav,true);
					
						this.mask.datafav=addstate[0];
						this.favbool=!this.favbool;
						
						
						ysv8set.localStorage.setItem("datafav"+this.mask.apiid,JSON.stringify(this.mask.datafav));
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
							uni.request({method:'POST',
						url: ysv8set.www+this.mask.postactive+'/'+this.thread['id']+'.api',
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
										this.mask.datacom=this.mask.add_array(this.thread,this.mask.datacom,false)[0];
										ysv8set.localStorage.setItem("datacom"+this.mask.apiid,JSON.stringify(this.mask.datacom));
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
						uni.showModal({content:ysv8set.langfun('图片数量已满'),showCancel:false});
					    return false;
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: 3,
						success: (res) => {
				
							
						for (var i in res.tempFilePaths){
							if(i>3) break;
									var imageSrc = res.tempFilePaths[i]
							const uploadTask = uni.uploadFile({
								url: ysv8set.www+"post/upload.api",
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
				
									uni.showToast({
										title: ysv8set.langfun('上传成功'),
										icon: 'success',
										duration: 1000
									})
									this.imageList = this.imageList.concat(data.url);
								},
								fail: (err) => {
									console.log('uploadImage fail', err);
									uni.showModal({
										content:err.errMsg,
										showCancel:false
									});
									uni.hideLoading();
								},
								complete: () => {
									console.log("complate")
								}
							});
								 uploadTask.onProgressUpdate((res) => {
							uni.showToast({
																	 	title: "loading："+res.progress,
																	 	icon: 'loading',
																	 	duration: 1000
																	 })
							       
							        });
							}
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: ysv8set.langfun('图片数量已满'),
							success: (e) => {
								if (e.confirm) {
									this.imageList = [];
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
				},chooseVideo: function () {
				uni.chooseVideo({
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						
									var imageSrc = res.tempFilePath
									const uploadTask = uni.uploadFile({
										url: "https://zh.ysv8.com/post/uploadfile.api",
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
						
											uni.showToast({
												title: ysv8set.langfun('上传成功'),
												icon: 'success',
												duration: 1000
											})
											this.src =data.name;
										},
										fail: (err) => {
											
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
															 	duration: 1000
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
