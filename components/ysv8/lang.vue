<template><text class="uniIcon">{{data2}}</text></template>
<script>export default {
props: {
text: [Number, String],
str: [Number, String],
},computed: {
data2() {
if(typeof(this.text) == "undefined" && this.text!=null){
return this.str+' '+ this.text;	
}
return this.str
}}}
</script>
<style></style>