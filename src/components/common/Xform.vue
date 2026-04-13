<template>
    <el-form
        :disabled="form.disabled"
        :inline="form.inline"
        :label-position="form.labelPosition"
        :label-width="form.labelWidth"
        class="demo-form-inline"
        ref="form"
    >
        <el-form-item
            v-for="(item, index) in form.options"
            :key="item.label"
            :label="item.label"
            v-show="item.isHide === 1 ? false : true"
            :prop="item.prop||''"
        >
            <el-input
                v-model="item.value"
                :style="{width:item.width||'200px'}"
                :placeholder="item.placeholder"
                :type="item.type"
                :disabled="item.disabled"
                :rows="item.rows ? item.rows : 3"
                autosize
                @change="onInputChange($event, index)"
                v-if="item.type === 'input' || item.type === 'textarea'"
            />
            <el-select
                v-model="item.value"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                v-else-if="item.type === 'select'"
                :style="{width:item.width||'200px'}"
            >
                <el-option
                    v-for="options in item.options"
                    :key="options.label"
                    :label="options.label"
                    :value="options.value"
                />
            </el-select>
            <el-date-picker
                :disabled="item.disabled"
                v-model="item.value"
                type="date"
               
                :value-format="item.format||'yyyy-MM-dd'"
                :placeholder="item.placeholder"
                v-else-if="item.type === 'date'"
            />
            <el-switch
                :disabled="item.disabled"
                v-model="item.value"
                :placeholder="item.placeholder"
                v-else-if="item.type === 'switch'"
            />
            <el-checkbox-group v-model="item.value" v-else-if="item.type === 'checkbox'">
                <el-checkbox
                    v-for="options in item.options"
                    :key="options.label"
                    :label="options.value"
                >{{options.label}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group
                @change="onInputChange($event, index)"
                v-model="item.value"
                v-else-if="item.type === 'radio'"
            >
                <el-radio
                    v-for="options in item.options"
                    :key="options.label"
                    :label="options.value"
                >{{options.label}}</el-radio>
            </el-radio-group>
            <el-upload
                v-else-if="item.type === 'upload'"
                class="avatar-uploader"
                :action="form.uploadUrl||uploadUrl"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
            >
                <img v-if="item.value" :src="item.value" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <slot></slot>
        <el-form-item v-if="form.confirmBtnText || form.cancelBtnText">
            <el-button @click="onCancel">{{form.cancelBtnText ? form.cancelBtnText : '取 消'}}</el-button>
            <el-button
                type="primary"
                @click="onSubmit"
            >{{form.confirmBtnText ? form.confirmBtnText : '确 认'}}</el-button>
            <el-button @click="resetForm" type="Warning">重 置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'x-form',
    data() {
        return {
            uploadUrl: process.env.VUE_APP_UPLOAD_URL
        };
    },
    props: {
        form: {
            type: Object,
            required: true
        },
        rules: {
            tyoe: Object,
            default: function () {
                return {};
            }
        }
    },
    components: {},
    mounted() {},
    methods: {
        resetForm() {
            this.$refs.form.resetFields();
        },
        handleUploadSuccess(res, file) {
            this.$emit('upload', res, file);
        },
        beforeUpload(file) {},
        onInputChange(val, index) {
            this.$emit('change', val, index);
        },
        onSubmit() {
            if (Object.keys(this.rules).length) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('confirm');
                    } else {
                        return false;
                    }
                });
            } else {
                this.$emit('confirm');
            }
        },
        onCancel() {
            this.$emit('cancel');
            // console.log('cancel');
        }
    }
};
</script>

<style lang='less' scoped>
/deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

/deep/.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

/deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

/deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
