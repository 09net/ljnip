<script>
    export default {
        onLaunch: function() {
            // #ifdef APP-PLUS
            // 锁定屏幕方向
            plus.screen.lockOrientation('portrait-primary'); //锁定
            /*
            uni.request({
                url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
                data: {
                    appid: plus.runtime.appid,
                    version: plus.runtime.version,
                    imei: plus.device.imei
                },
                success: (res) => {
                    if (res.statusCode == 200 && res.data.isUpdate) {
         let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
                        // 提醒用户更新
                        uni.showModal({
                            title: '更新提示',
                            content: res.data.note ? res.data.note : '是否选择更新',
                            success: (showResult) => {
                                if (showResult.confirm) {
                                    plus.runtime.openURL(openUrl);
                                }
                            }
                        })
                    }
                }
            })
			*/

            var domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                'fontFamily': "uniicons",
                'src': "url('./static/uni.ttf')"
            });
            // #endif
			if(typeof(localStorage) == "undefined"){
			var localStorage={
			 getItem:function(key){return uni.getStorageSync(key);},
			clear:function(){return uni.clearStorageSync();},
			removeItem:function(key){uni.removeStorage({key: key});},
			setItem:function(key,data){
			uni.setStorage({key: key,data: data})
			}
			}
			}
			var lan=localStorage.getItem("lang"); 
			if(lan){
				this._i18n.locale = lan
				try {
					const res = uni.getSystemInfoSync();
					if(res.platform !='ios'){
					this._i18n.platform = true;
					}
					
				} catch (e) {
					
				}
				
				}else{
			 try {
				const res = uni.getSystemInfoSync();
				lan = res.language.toLocaleLowerCase();
				if(res.platform !='ios'){
				this._i18n.platform = true;
				}
				
			} catch (e) {
				
			}
			
			var slan=lan.substring(0,2);
			 if(slan == 'zh') {
			 				if(lan.indexOf("hant")>-1 || lan.indexOf("cht")>-1){
							this._i18n.locale = 'cht';
							}else{
								this._i18n.locale = 'zh';
							}
							
			 }
			 var lana=['ja','ko','es','ar','ru','fr','vi','th','pt','de','en']
			  for(var i in lana){
			         if(lana[i]==slan){
			            this._i18n.locale = slan;
			         }
			     }
			 
			 
			 
			 
			 
			}
        },
        onShow: function() {
        },
        onHide: function() {    
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    @import './common/uni.css';
	@import './common/font-awesome.min.css';
    /* 以下样式用于 hello uni-app 演示所需 */
    page {
        background-color: #F4F5F6;
        height: 100%;
        font-size: 28upx;
        line-height: 1.8;
    }
    .uni-header-logo {
        padding: 30upx;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10upx;
    }

    .uni-header-image {
        width: 100px;
        height: 100px;
    }

    .uni-hello-text {
        color: #7A7E83;
    }

    .uni-hello-addfile {
        text-align: center;
        line-height: 300upx;
        background: #FFF;
        padding: 50upx;
        margin-top: 10px;
        font-size: 38upx;
        color: #808080;
    }
    /* #endif*/
</style>
