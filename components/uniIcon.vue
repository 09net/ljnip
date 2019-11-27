<template>
    <view class="fa" :class="['fa-'+type]" :style="{color:color,'font-size':fontSize}" @click="onClick()">
		<slot />
	</view>
</template>

<script>
	
    export default {
        props: {
            /**
             * 图标类型
             */
            type: String,
			str: [Number, String],
            /**
             * 图标颜色
             */
            color: String,
            /**
             * 图标大小
             */
            size: [Number, String]
        },
        computed: {
            fontSize() {
                return `${this.size}px`
            },
        },
        methods: {
            onClick() {
                this.$emit('click')
            }
        }
    }
</script>