<template name="flist">
<view>
<view class="lpicbox">
<image lazy-load="true" src="{{itemName['avatar']}}"></image>
</view>
 
<view class='rdetails'>

<view class="details">
<navigator url="/pages/user/index?fid={{itemName['user']}}">
<text class="title" decode="true" space="ensp">{{itemName['user']}}</text></navigator>
<view class="info">
<text class="date">{{itemName['ps']}}</text>

<text class="botten red fa fa-comments" bindtap="comment" data-id="{{itemName['uid']}}">{{itemName['c']}}</text>


</view>
</view>

</view>
</view>
</template> 