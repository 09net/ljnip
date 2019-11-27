<template>
	<view>
		<view v-if="data==false" class="c">{{w_con}}</view>
		<view v-else  class="c">
<image :src="bucketcdn+data.img+'_64060'" style="height: 60px; width: 460px;" @click="openads()"></image>
</view>
			
			
		</view>
	</view>
</template>

<script>
import ysv8set from '@/static/ysv8/index.js';
function isNum(n){return /^\d+$/.test(n);}
var random=function(t1,t2,t3){
if(!t1 || (! isNum(t1)) ){t1=0;} 
if(!t2 || (! isNum(t2)) ){t2=1;} 
if(!t3 || (! isNum(t3)) ){t3=0;} 
t3 = t3>15?15:t3;
var ra = Math.random() * (t2-t1)+t1,du=Math.pow(10,t3); 
ra = Math.round(ra * du)/du; 
return ra; 
} 
function ysv8rnd(proArr){
var l=proArr.length;
var randNum=0;
var proSum=0;
var result=0;
for (let i = 0;i < l; i++) {proSum+=Number(proArr[i]['v']);}
for (let i = l-1;i >-1; i--) {randNum = random(1, proSum,0);result=0;
if (randNum <= proArr[i]['v']) {result = i;break;} else {proSum -= proArr[i]['v'];}
}
return result;
}
export default {
      props: [
         'title'
     ],
	  data() {
	     return {
			 data:false,
			 bucketcdn:ysv8set.bucketcdn
			 }
			 },
			 methods: {
			 	openads:function(){
uni.navigateTo({url: '/pages/user/web?url='+encodeURIComponent('https://'+ysv8set.lang+'.ysv8.com/ads?id='+this.data['id']+'&si=46060&upuid='+ysv8set.upuid)});
			 		},
					},
    computed: {
       	w_con(){
				 uni.request({
									url: 'https://iimg.44api.com/ads/json2/'+ysv8set.lang+'/'+encodeURIComponent(this.title)+'/46060.js',
								success: (res) => {
									var data=res.data;
									var adsdata=data['content'][ysv8rnd(data['content'])];
									adsdata['img']=adsdata['img'].replace(/\{m\}/g, '');
									this.data=adsdata;
								
									},
									});
										return 'loading';
				}
			
				}
		}
</script>

<style>
</style>
