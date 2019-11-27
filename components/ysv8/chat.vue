<template>
	
    <view>
		<view class="foot">

		<view class="postarea">
			<form @submit="postsub">
		<textarea v-if="postno==false" placeholder-style="color:#F76260" name="content" placeholder="请输入评论内容" auto-height class="posttextarea" :value="text"/>
		<view class="row bj">
			<view class="col">
			<view class="col_4 padding-top" @click="opendiv"><text class="red">输入评论内容</text></view>
			<view class="col_4 padding-top"><uniIcon size="30" type="image" @click="chooseImage" class="blue"></uniIcon></view>
			<view class="col_4"><button type="primary" formType="submit">提交</button></view>
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
		
		</view></view></view></view></view>
		</view>
		</view>  
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uniIcon.vue'
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
			props:['lc'],
  data() {
 return {
                   postno:true,
					text:'',
					imageList: [],
					sourceTypeIndex: 2,
					sourceType: ['拍照', '相册', '拍照或相册'],
					sizeTypeIndex: 2,
					sizeType: ['压缩', '原图', '压缩或原图'],
					countIndex: 2,
					count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
			uniIcon
		},
        methods: {
			
					postsub:function(e){
						var formData = e.detail.value;				
							uni.request({method:'POST',
						url: ysv8set.www+'jy/chatadd.api',
																	data: {
																		content:formData['content'],
																		img:this.imageList.join(','),
																		lc:this.lc,
																		YSV8_HEX: ysv8set.ysv8hex
																	},
																	success: (res) => {
										var data=res.data;
										uni.showModal({
											content:data['info'],
											showCancel:false
										})
										if(data['code']==200){
									uni.showModal({
										content:'评论成功',
										showCancel:false
									})
									
									this.post();
									
									
										}
},
fail: (err) => {
																		uni.showModal({
																			content:err.errMsg,
																			showCancel:false
																		})
																	},
																	complete:()=> {
																	
																	}
																})
						
						
						
						
						
						},
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
			opendiv:function(id){
				this.postno=!this.postno;},
			post:function(){this.text='';this.imageList=[];this.postno=!this.postno;},
			chooseImage: async function() {
					if (this.imageList.length >5) {
						uni.showModal({content:'最多上传5张图片',showCancel:false});
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
							uni.uploadFile({
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
										title: '上传成功',
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
							
							}
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: "已经有3张图片了,是否清空现有图片？",
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
									uni.uploadFile({
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
												title: '上传成功',
												icon: 'success',
												duration: 1000
											})
											this.src = this.imageList.concat(data.name);
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
					
					}
				})
			}
        }
    }
</script>

<style>

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
