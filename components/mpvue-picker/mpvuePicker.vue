<template>
    <view class="mpvue-picker">
        <view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
        <view class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
            <view class="mpvue-picker__hd" catchtouchmove="true">
                <view class="mpvue-picker__action" @click="pickerCancel">取消</view>
                <view class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</view>
            </view>
<!-- 单列 -->
<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange" v-if="mode==='selector' && pickerValueSingleArray.length > 0">
<block>
<picker-view-column>
<view class="picker-item" v-for="(item,index) in pickerValueSingleArray" :key="index" @click="pickerChangepc(index)">{{item.label}}</view>
</picker-view-column>
</block>
</picker-view>
</view>
</view>
</template>
<script>
import ysv8set from '@/static/ysv8/index.js';
export default {
data() {
            return {
                pickerChangeValue: [],
                pickerValue: [],
                pickerValueArrayChange: true,
                modeChange: false,
                pickerValueSingleArray: [],
				/* 是否显示控件 */
				showPicker: false,
            };
        },
        props: {
            /* mode */
            mode: {
                type: String,
                default: 'selector'
            },
            /* picker 数值 */
            pickerValueArray: {
                type: Array,
                default(){
					return []
				}
            },
            /* 默认值 */
            pickerValueDefault: {
                type: Array,
                default(){
                	return []
                }
            },
            /* 几级联动 */
            deepLength: {
                type: Number,
                default: 2
            },
            /* 主题色 */
            themeColor: String
        },
        watch: {
            pickerValueArray(oldVal, newVal) {
                this.pickerValueArrayChange = true;
            },
            mode(oldVal, newVal) {
                this.modeChange = true;
            },
			pickerValueArray(val){
				this.initPicker(val);
			}
        },
        methods: {
            initPicker(valueArray) {
                let pickerValueArray = valueArray;
                this.pickerValue = this.pickerValueDefault;
                this.pickerValueSingleArray = valueArray;  
            },
            show() {
                setTimeout(() => {
                    if (this.pickerValueArrayChange || this.modeChange) {
                        this.initPicker(this.pickerValueArray);
                        this.showPicker = true;
                        this.pickerValueArrayChange = false;
                        this.modeChange = false;
                    } else {
                        this.showPicker = true;
                    }
                }, 0);
            },
            maskClick() {
                this.pickerCancel();
            },
            pickerCancel() {
                this.showPicker = false;
                this._initPickerVale();
                let pickObj = {
                    index: this.pickerValue,
                    value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
                    label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
                };
                this.$emit('onCancel', pickObj);
            },
            pickerConfirm(e) {
                this.showPicker = false;
                this._initPickerVale();
                let pickObj = {
                    index: this.pickerValue,
                    value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
                    label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
                };
                this.$emit('onConfirm', pickObj);
            },
            showPickerView() {
                this.showPicker = true;
            },
			pickerChangepc(value){
				this.pickerValue = [value];
				let pickObj = {
				    index: this.pickerValue,
				    value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
				    label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
				};
				this.$emit('onChange', pickObj);
			},
            pickerChange(e) {
                this.pickerValue = e.mp.detail.value;
                let pickObj = {
                    index: this.pickerValue,
                    value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
                    label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
                };
                this.$emit('onChange', pickObj);
            },
            pickerChangeMul(e) {
                if (this.deepLength === 2) {
                    let pickerValueArray = this.pickerValueArray;
                    let changeValue = e.mp.detail.value;
                    // 处理第一列滚动
                    if (changeValue[0] !== this.pickerValue[0]) {
                        let pickerValueMulTwoTwo = [];
                        // 第一列滚动第二列数据更新
                        for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
                            pickerValueMulTwoTwo.push(pickerValueArray[changeValue[0]].children[i]);
                        }
                        this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
                        // 第二列初始化为 0
                        changeValue[1] = 0;
                    }
                    this.pickerValue = changeValue;
                } else if (this.deepLength === 3) {
                    let pickerValueArray = this.pickerValueArray;
                    let changeValue = e.mp.detail.value;
                    let pickerValueMulThreeTwo = [];
                    let pickerValueMulThreeThree = [];
                    // 重新渲染第二列
                    // 如果是第一列滚动
                    if (changeValue[0] !== this.pickerValue[0]) {
                        this.pickerValueMulThreeTwo = [];
                        for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
                            pickerValueMulThreeTwo.push(pickerValueArray[changeValue[0]].children[i]);
                        }
                        // 重新渲染第三列
                        for (let i = 0, length = pickerValueArray[changeValue[0]].children[0].children.length; i <
                            length; i++) {
                            pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[0].children[i]);
                        }
                        changeValue[1] = 0;
                        changeValue[2] = 0;
                        this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
                        this.pickerValueMulThreeThree = pickerValueMulThreeThree;
                    } else if (changeValue[1] !== this.pickerValue[1]) {
                        // 第二列滚动
                        // 重新渲染第三列
                        this.pickerValueMulThreeThree = [];
                        pickerValueMulThreeTwo = this.pickerValueMulThreeTwo;
                        for (let i = 0, length = pickerValueArray[changeValue[0]].children[changeValue[1]].children.length; i <
                            length; i++) {
                            pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[changeValue[1]].children[
                                i]);
                        }
                        changeValue[2] = 0;
                        this.pickerValueMulThreeThree = pickerValueMulThreeThree;
                    }
                    this.pickerValue = changeValue;
                }
                let pickObj = {
                    index: this.pickerValue,
                    value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
                    label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
                };
                this.$emit('onChange', pickObj);
            },
            // 获取 pxikerLabel
            _getPickerLabelAndValue(value, mode) {
                let pickerLable;
                let pickerGetValue = [];
                    pickerLable = this.pickerValueSingleArray[value].label;
                    pickerGetValue.push(this.pickerValueSingleArray[value].value); 
                return {
                    label: pickerLable,
                    value: pickerGetValue
                };
            },
            // 初始化 pickerValue 默认值
            _initPickerVale() {
                if (this.pickerValue.length === 0) {
               
                        this.pickerValue = [0];
                  
                }
            }
        }
    };
</script>

<style>
    .pickerMask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .mpvue-picker-content {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
    }

    .mpvue-picker-view-show {
        transform: translateY(0);
    }

    .mpvue-picker__hd {
        display: flex;
        padding: 9px 15px;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 17px;
    }

    .mpvue-picker__hd:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #e5e5e5;
        color: #e5e5e5;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }

    .mpvue-picker__action {
        display: block;
        flex: 1;
        color: #1aad19;
    }

    .mpvue-picker__action:first-child {
        text-align: left;
        color: #888;
    }

    .mpvue-picker__action:last-child {
        text-align: right;
    }

    .picker-item {
        text-align: center;
        line-height: 40px;
        font-size: 16px;
    }

    .mpvue-picker-view {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 238px;
        background-color: rgba(255, 255, 255, 1);
    }
</style>