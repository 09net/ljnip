<template>
	<view class="uni-padding-wrap" style="padding-bottom: 60upx; padding-left: 15upx; padding-right: 15upx;">
		<view style="font-size: 18; font-weight: bold; text-align: center;">零久附近通</view>
		<view style="font-size: 16; font-weight: bold; text-align: center;">从零开始直到天长地久</view>
		<!--  #ifdef  MP-WEIXIN -->
		<ad unit-id="adunit-b8d7f3285e383faf"></ad>	
		<!--  #endif -->
		<wxParse :content="article" />
		<view class="foot"><view class="row"><view class="col"><view class="col_6" @click="agree()">
		<text class="blue p10" style="font-size: 18;">{{i18n.agree}}</text></view>
		<view class="col_6" @click="diagree()">
		<text class="red p10" style="font-size: 18;">{{i18n.disagree}}</text></view>
		</view></view>
		
		</view>
	</view>
</template>

<script>
import marked from '@/components/marked';
import wxParse from '@/components/uParse/src/wxParse.vue';
var htmlString = `
<p>亲爱的用户：零久附近通是由本公司开发并具有自主知识产权的全球首家基于经纬度定位的分类信息发布平台！英文名：9NIP</p>
<p>商业承诺：绝对不搞竞价排行，维护用户之间的平等性！</p>
<p>重点一：零久附近通是本公司的注册商标；</p>
<p>重点二：本应用需要收集您的经纬度信息，不过只在发布主题信息及其它必需的前提下对该信息进行保存；</p>
<p>重点三：此为中国版，根据当地政策的要求会保存更多的信息，且注册时您必须进行手机号码验证。</p>
<p>本软件尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本软件会按照本隐私权政策的规定使用和披露您的个人信息。但本软件将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本软件不会将这些信息对外披露或向第三方提供。本软件会不时更新本隐私权政策。您在同意本软件服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本软件服务使用协议不可分割的一部分。<br/>
        </p>
        <p>1.适用范围</p>
        <p>
            a)在您使用本软件网络服务，本软件自动接收并记录的您的手机上的信息，包括但不限于您的健康数据、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；
        </p>
        <p>
            2.信息的使用
        </p>
        <p>
            a)在获得您的数据之后，本软件会将其上传至服务器，以生成您的排行榜数据，以便您能够更好地使用服务。
        </p>
        <p>
            3.信息披露
        </p>
        <p>
            a)本软件不会将您的信息披露给不受信任的第三方。
        </p>
        <p>
            b)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
        </p>
        <p>
            c)如您出现违反中国有关法律、法规或者相关规则的情况，需要向第三方披露；
        </p>
        <p>
            4.信息存储和交换
        </p>
        <p>
            本软件收集的有关您的信息和资料将保存在本软件及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本软件收集信息和资料所在地的境外并在境外被访问、存储和展示。
        </p>
        <p>
            5.信息安全
        </p>
        <p>
            a)在使用本软件网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您立即联络本软件客服，以便本软件采取相应措施。
        </p><p>娄底零久网络科技有限公司</p>
		<p>2019年10月13日</p>`
		
import ysv8set from '@/static/ysv8/index.js';
	export default {
		computed: {
		   i18n () {
		     return this.$t('index')  
		   }  
		 },
		components: {
			wxParse
		},
		data() {
			return {
				article: htmlString
			}
		},onLoad: function(e) {
			uni.getLocation({
			   success: function (res) {
			   }
			   });
			},
		methods: {
			agree:function(){
					ysv8set.localStorage.setItem("agree",'true'); 
					uni.navigateTo({
						url: '/pages/chat/index'
					});
			},
			diagree:function(){
				uni.showModal({content:ysv8set.langfun('请关闭程序'),showCancel:false});
			}
		}

	}
</script>
<style>
@import url("../../components/uParse/src/wxParse.css");
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
