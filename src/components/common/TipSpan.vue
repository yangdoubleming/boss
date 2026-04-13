<template>
    <div class='parent'>
        <div @mouseenter='whenMouseEnter($event)'>
            <el-tooltip :disabled='showToolTip' :content='contentValue ? contentValue : textValue'
                        :effect='toolTipStyle'
                        :placement='toolTipPlacement'>
                <span v-if='spanType==="text"' class='text' :style="{color:color}">{{ textValue }}</span>
                <el-link v-if='spanType==="link"' @click='hrefTo' :underline='underline' class='text' :type='linkStyle'>
                    {{ textValue }}
                </el-link>
            </el-tooltip>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'TipSpan',
    props: {
        textValue: {
            type: String,
            default: ''
        },
        contentValue: {
            type: String,
            default: ''
        },
        toolTipStyle: {
            type: String,
            default: 'dark'
        },
        toolTipPlacement: {
            type: String,
            default: 'top'
        },
        spanType: {
            type: String,
            default: 'text'
        },
        underline: {
            type: Boolean,
            default: false
        },
        linkStyle: {
            type: String,
            default: 'primary'
        },
        hrefUrl: {
            type: String,
            default: ''
        },
         color: {
            type: String,
            default: ''
        },
        showTip:{
            type: Boolean,
            default: false

        }
    },
    data() {
        return {
            showToolTip: false
        };
    },
    methods: {
        whenMouseEnter(e) {
            const text = e.target.querySelector('.text');
            console.log(this.showTip);
            console.log(this.showTip);
            console.log(this.showTip);
            console.log(this.showTip);
            if(this.showTip)return this.showToolTip = false
            if (text.scrollWidth > text.offsetWidth) {
                this.showToolTip = false;
            } else {
                this.showToolTip = true;
            }
        },
        hrefTo() {
            if (this.spanType === 'link' && this.hrefUrl) {
                window.open(this.hrefUrl);
            }
        }
    }
};
</script>

<style scoped lang='less'>
.parent {
    width: 100%;

    .text {
        width: 100%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>