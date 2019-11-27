<template>
 <view>
<view class="table" v-if="data.op">
<view class="th">{{data.op}}</view>
	<view class="td">{{data.v}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
        methods: {
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);}
        }
    }
</script>

<style>
  
.table{
		background-color: #FFFFFF;
		border-bottom: 2upx solid #D8D8D8;
		padding: 20upx;
	}
	.table .th{
		 margin-right: 20upx;
		 font-weight: bold;
		 display: inline!important;
		
	}

</style>
