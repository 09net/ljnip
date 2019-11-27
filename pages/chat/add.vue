<template>
<view style="padding-left: 20upx; padding-right: 20upx;">
<view style="padding: 100upx; text-align: center;" v-show="loading<100">
<uniIcon size="25" type="spinner"></uniIcon>
<view class="red">{{loading}}</view>
		
		</view>
		<view class="uni-common-mt" v-show="loading>99">
			<form @submit="postsub">	
<view class="uni-btn-v">
				<view class="b">{{i18n.title}}</view>
			<input class="uni-input" name="title" />
		</view>
		<view class="b">{{i18n.content}}</view>
<textarea placeholder-style="color:#F76260" name="content" maxlength="6000" class="posttextarea bl"/>
		
<view class="uni-btn-v">
		<view class="row"><view class="col">				
			<view class="col_6 c">
				<view class="uni-list-cell-db">
<view class="uni-input" @click="chooseLocation" style="background-color: #1482D1; color: #FFFFFF;"><uniIcon size="20" type="map-marker"></uniIcon></view>
				</view>	
			</view>
			<view class="col_6 c"><view class="uni-input">{{dz}}</view></view>
						</view></view>
			</view>	
		<view class="uni-btn-v">
					
					<view class="row"><view class="col">				
		<view class="col_6 c">
			<view class="uni-list-cell-db">
				
				
				<view class="uni-input" @click="showSinglePicker" style="background-color: #1482D1; color: #FFFFFF;">{{fidtext}}</view>
			
			</view>	
		</view>
		<view class="col_6 c"><view class="uni-input" style="background-color: #1482D1; color: #FFFFFF;"><uniIcon size="18" type="image" @click="chooseImage">{{i18n.pic}}</uniIcon></view>
					</view></view></view>
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
		<view class="uni-uploader__file" v-if="src"><video :src="src" class="video"></video></view>
		</view>
		</view>
		</view>
		</view>
		</view>	
		
<view class="uni-btn-v">
				<view class="row"><view class="col">				
	<view class="col_4 c">
		<view class="uni-list-cell-db">
				<view class="uni-input">{{i18n.tel}}</view>
		</view>	
	</view>
	<view class="col_8"><input class="uni-input" type="number" id="tel" @input="bindKey" :value="tel" placeholder="1231111111" /></view>
				</view></view>
	</view>	
	<view class="uni-btn-v">
				<view class="row"><view class="col">				
	<view class="col_4 c">
		<view class="uni-list-cell-db">
				<view class="uni-input">{{i18n.prc}}</view>
		</view>	
	</view>
	<view class="col_8"><input type="digit" class="uni-input" id="prc" @input="bindKey" :value="prc" placeholder="123.11" /></view>
				</view></view>
	</view>	
<view class="uni-btn-v">
			<view class="row"><view class="col">				
<view class="col_4 c">
	<view class="uni-list-cell-db">
		<picker @change="bindKey" id="snsmode"  :value="snsmode" :range="snsa" range-key="name">
			<view class="uni-input" style="background-color: #1482D1; color: #FFFFFF;">{{snsa[snsmode].name}}</view>
		</picker>
	</view>	
</view>
<view class="col_8"><input class="uni-input" id="sns" @input="bindKey" :value="sns" placeholder="assxxx" /></view>
			</view></view>
</view>	
	
	<view class="uni-btn-v">
				<view class="row"><view class="col">				
	<view class="col_4 c">
		<view class="uni-list-cell-db">
			<view class="uni-input" @click="https()" style="background-color: #1482D1; color: #FFFFFF;">{{i18n.link}}</view>
			
		</view>	
	</view>
	<view class="col_8"><input class="uni-input" id="shop" @input="bindKey" :value="shop" placeholder="https://" /></view>
				</view></view>
	</view>	
	
	
		
		
<view><button type="primary" formType="submit">{{i18n.sub}}</button></view>
							
		
		</form>
		</view>
<!--  #ifdef  MP-WEIXIN -->	
<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
<!--  #endif -->
		<view class="red">{{i18n.tips}}</view>
		<view>1. 信息的所有权属于作者和网站。</view>
		<view>2. 用户投票可以删除您发布的信息。</view>
		<view>3. 对于恶意发布信息的用户，本网站将受到惩罚。包括金币和积分。</view>
		<view>4. 由于不可控力导致数据丢失的本站不予赔偿。</view>
		<view>5. 由于数据系网友自行发布：对于内容的真实性，本站不负责任。</view>
	<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="forum"></mpvue-picker>
</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uniIcon.vue';
	import mask from '@/static/ysv8/chat.js';
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	var util = require('@/common/util.js');
	var formatLocation = util.formatLocation;
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
		   }  
		 },
		components: {
			uniIcon,
			mpvuePicker
		},
		onShareAppMessage() {
					if(ysv8set.userdata){var suid=ysv8set.userdata['id']}else{var suid=ysv8set.upuid}
		 return {
  title: ysv8set.title,
		  path: '/pages/chat/index?upuid='+suid
		 }
		},
		data() {
			return {
				loading:0,
	            title: 'add',
				shangstart:false,
				showlink:false,
				showhide:false,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				mode: '',
				lc:mask.lc,
				dz:mask.dz,
				sellc:false,
				contentpla:ysv8set.langfun('内容'),
				dz:'loading',
				textRiskIdentification:'',
				deepLength: 1,
                pickerValueArray:[],
				forum: mask.fidtxt,
				fid:0,
				imageList: [],
				imageList2: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 1,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 2,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				src:'',
				hide:'',
				text:'',
				fidtext:this.$t('index.select'),
				sns:'',
				snsa:[{vale:0,name:'社交类型'},
				{vale:1,name:'微信'},
				{vale:2,name:'QQ'},
				{vale:3,name:'微博'},
				{vale:4,name:'阿里旺旺'}],
				snsmode:0,
				shop:'',
				shopmode:0,
				tel:'',
				prc:'',
				modetxt:this.$t('index.modetxt'),
			};
		},onShow: function() {
			// #ifdef  MP-BAIDU
			swan.setPageInfo({
			            title: '免费同城信息发布_零久附近通',
			            keywords: '零久附近通,信息发布,免费同城信息发布,附近通',
			            description: '免费同城信息发布',
			            releaseDate: '2019-09-04 12:01:30',
			            image: [ysv8set.imgcdn+'logo.png']
			        })
					// #endif
			    },
		onReady() {	
			var __self=this;
			uni.getLocation({
			        success: function (res) {
						__self.lc=formatLocation(res.longitude, res.latitude);
						mask.lc=__self.lc;
						__self.dz=__self.lc;
						mask.dz=__self.lc;
			        },fail:function(){
							
					}});
					if(ysv8set.userdata==false){
						ysv8set.muialert({
							code:301,
							info:ysv8set.langfun('登陆')
							
						});			
					return false;
					}
					
					
					if(ysv8set.userdata['credits']<500){
						
						uni.showModal({
							content:ysv8set.langfun('积分不够'),
							showCancel:false,
							success () {
								uni.navigateBack({
								    delta: 1
								});
							}
						});
						
						
						return false;
					
					}
					setTimeout(() => {this.getinfo()},500);	
		},
		onLoad(e) {
}, methods: {
	https:function(){
		uni.navigateTo({
		     url: '/pages/user/web?url='+ysv8set.www+'post/https.html'
		     }); 
		},
	gonav(e){uni.navigateTo({url: '/pages/' + e})},
	
	getinfo:function(){
		this.loading=50;
		uni.request({method:'POST',
		url: ysv8set.www+'user/getinfo.api?lang='+this._i18n.locale,
		data: {
		YSV8_HEX: ysv8set.ysv8hex
		},
		success: (res) => {
			this.loading=100;
		var data=res.data;
					
					            this.snsmode=parseInt(data['snsmode']);
						        this.sns=data['sns'];	
								this.tel=data['tel'];
			if(data['fidtxt']){
					var j=0; var len=0;
			for(j = 0,len=data['fidtxt'].length; j < len; j++) {
				
			
				
data['fidtxt'][j]['label']=data['fidtxt'][j]['title2']+'['+this.modetxt[data['fidtxt'][j]['mode']]+']';
data['fidtxt'][j]['value']=data['fidtxt'][j]['id'];
			}
					
				this.forum=data['fidtxt'];
				}
			
					
		},
		fail: (err) => {
			this.failfun(ysv8set.langfun('网络故障'))
		},
		})
		
	},
	bindKey: function (e) {
				this[e.target.id] = e.target.value
			},
	chooseLocation: function () {
		var __self=this;
		uni.chooseLocation({
		 success: (res) => {
		mask.dz=res.address;
		mask.lc=formatLocation(res.longitude, res.latitude);
		__self.lc=mask.lc;
		__self.dz=mask.dz;
		ysv8set.localStorage.setItem("lc",mask.lc);
		 }
		})	
	},
onCancel(e){
},
			onConfirm(e) {
				this.fid=e.value[0]
				this.fidtext=e.label
			},
					showSinglePicker() {
						this.pickerValueArray = this.pickerSingleArray
						this.mode = 'selector'
						this.pickerValueDefault = [0]
						this.$refs.mpvuePicker.show()
					},
					postsub:function(e){
						var __self=this;
	
						if(this.lc==false || this.lc=='0,0'){
							uni.showModal({
								content:ysv8set.langfun('错误'),
								showCancel:false,
								success () {
									uni.navigateBack();
								}
							})
							return false;
						}
						var formData = e.detail.value;	
									if(this.fid<1){ 
										uni.showModal({
											content:'栏目为空',
											showCancel:false,
											success () {
												__self.showSinglePicker()
											}
										})
										
										return false;
										}
										
										
										if(formData['content'].length<10){ 
											uni.showModal({
												content:ysv8set.langfun('内容太少'),
												showCancel:false,
												
											})
											return false;
											}
											if(formData['title'].length<3){
												uni.showModal({
													content:ysv8set.langfun('标题太短'),
													showCancel:false,
													
												})
												return false;
												}
											if(this.sns && this.snsmode==0){
												
							uni.showModal({content:'请选择社交类型',howCancel:false});
							return false;
												}
											
											
								// #ifdef  MP-ALIPAY
							if(this.textRiskIdentification!=(formData['title']+formData['content'])){
								my.textRiskIdentification({
										      content: formData['title']+formData['content'],
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
					this.textRiskIdentification=formData['title']+formData['content'];
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
														url: ysv8set.www+'post.api?lang='+this._i18n.locale+'&upuid='+ysv8set.upuid,
																									data: {
							
																										content:formData['content'],
																										fid:this.fid,
																										imgv:this.imageList.join(','),
																										vs:this.src,
																										lc:this.lc,
																										title:formData['title'],
		                                                                                                 text:1,
																										 snsmode:this.snsmode,
																										 sns:this.sns,
																										 
																										 shop:this.shop,
																										 tel:this.tel,
																										 prc:this.prc,
																										YSV8_HEX: ysv8set.ysv8hex
																									},
																									success: (res) => {
																		var data=res.data;
																	
																		if(data['code']==200){
																	uni.showModal({
																		content:data['info'],
																		showCancel:false,
																		success: (res) => {
																	setTimeout(() => {uni.redirectTo({url: 't?id='+data.id});},100);
																			}
																	})
																	
																	
																	
																		}else{
																			ysv8set.muialert(data,ysv8set.userdata);
																			
																		}
																		
								},
								fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})
								
								
								
								
			
									
										
							
},
			chooseImage: async function() {
					if (this.imageList.length === 8) {
						let isContinue = await this.isFullImg();
						if (!isContinue) {
							return;
						}
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
					
					
					if(i>3 || this.imageList.length>8) return false;
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
									var data=JSON.parse(res.data);
								if(data.code!='200'){ ysv8set.muialert(data,ysv8set.userdata);
								return false;
								}
					this.imageList = this.imageList.concat(data.url+'@'+data.w+'|'+data.h);
					this.imageList2 = this.imageList2.concat(imageSrc);
									
								
									},
								fail: (err) => {
	                             this.loading=100;
									uni.showModal({
										content:err.errMsg,
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
				},chooseVideo: function () {
				uni.chooseVideo({
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						
									var imageSrc = res.tempFilePath
									this.loading=0;
									  const uploadTask = uni.uploadFile({
										url: ysv8set.www+'post/uploadfile.api?lang='+this._i18n.locale,
										filePath: imageSrc,
										name: 'photo',
										formData:{
											YSV8_HEX: ysv8set.ysv8hex
										},
										success: (res) => {
											var data=JSON.parse(res.data);
										if(data.code!='200'){ ysv8set.muialert(data,ysv8set.userdata);
										return false;
										}
						
											uni.showToast({
												title: ysv8set.langfun('成功'),
												icon: 'success',
											
											})
											this.src =data.name;
										
										},
										fail: (err) => {
											this.loading=100;
											uni.showModal({
												content:err.errMsg,
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
				})
			}
        }
    }
</script>

<style>
.video{width: 120px; height: 120px;}
.padding-top{padding-top: 10upx;text-align: center;}
.uni-list{}
.uni-input{border: thin solid #000000;width:90%;padding: 10upx;}
.posttextarea{background-color: #FFFFFF; width: 95%;min-height: 150upx; padding: 10upx;}
.postarea{min-height:200upx;background-color: #FFFFFF; padding: 10upx;margin: 10upx;}
</style>