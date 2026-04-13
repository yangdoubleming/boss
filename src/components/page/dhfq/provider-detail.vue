<template>
    <div>
        <div style='display:flex; align-items: center;padding:18px'>
            <div style='color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;'>
                <img
                    src='../../../../public/img/favicon.png'
                    style='width:17px;height:17px;margin-right:5px'
                    alt
                />豆沙包 /
            </div>
            <span style='color:rgba(0,0,0,.65);font-size:14px;padding-left:5px'>{{ $route.meta.title }}</span>
        </div>
        <el-card shadow='hover' :body-style="{ padding: '0px' }" style='margin-bottom: 20px'>
            <div class='title_box' style='align-items: center'>
                <div class='left'>
                    <span class='service_provider_id'>{{ providerInfoData.id }}</span>
                    <el-tag size='medium' effect='light' :type='tag[providerInfoData.approvedStatus].status'
                            style='font-size: small'>
                        {{ tag[providerInfoData.approvedStatus].label }}
                    </el-tag>
                </div>
                <div class='right' v-if='providerInfoData.approvedStatus !== "CANCELLATION"'>
                    <el-button-group v-if='providerInfoData.approvedStatus === "CREATED"'>
                        <el-button size='mini' type='primary' style='margin-right: 10px;' class='operation_button'
                                   @click='openDialog("ENABLED")'>通过
                        </el-button>
                        <el-button size='mini' class='operation_button' @click='openDialog("REJECTED")'>拒绝</el-button>
                    </el-button-group>
                    <el-button v-else type='primary' class='operation_button' @click='openDialog("CANCELLATION")'>作废
                    </el-button>
                </div>
            </div>
        </el-card>
        <el-dialog
            title='提示'
            :visible.sync='dialogNoUploadVisible'
            width='30%'>
            <span>合作协议尚未上传，确定通过审核吗</span>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='dialogNoUploadVisible = false'>取 消</el-button>
                <el-button type='primary'
                           @click='approve(); dialogNoUploadVisible = false'>确 定</el-button>
              </span>
        </el-dialog>
        <el-dialog
            title='提示'
            :visible.sync='dialogApproveVisible'
            width='30%'>
            <span>{{ '确定' + (operationSelect === 'ENABLED' ? '通过' : operationSelect === 'REJECTED' ? '拒绝' : '作废') + '审核吗？'}}</span>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='dialogApproveVisible = false'>取 消</el-button>
                <el-button type='primary' @click='confirm'>确 定</el-button>
              </span>
        </el-dialog>
        <el-card shadow='hover' :body-style="{ padding: '0px' }">
            <div class='serviceProviderCooperationAgreementBox'>
                <div style='display: inline-block'>
                    <span class='text'>合作协议</span>
                    <el-link
                        class='text'
                        v-if='providerInfoData.serviceProviderCooperationAgreementName && providerInfoData.serviceProviderCooperationAgreementUrl'
                        type='primary' @click='hrefTo(providerInfoData.serviceProviderCooperationAgreementUrl)'>
                        {{ providerInfoData.serviceProviderCooperationAgreementName }}
                    </el-link>
                    <span v-else class='text'>未上传</span>
                </div>
                <div style='display: inline-block;
    height: 32px;
    overflow: hidden;
    vertical-align: middle;'>
                    <el-upload
                        :action='uploadUrl' :file-list='fileList' :show-file-list='false' :multiple='false'
                        accept='.jpg,.png,.pdf'
                        :on-change='change'
                        :on-success='handleAvatarSuccess'
                        :on-preview='handlePreview'
                        :before-upload='beforeAvatarUpload'
                        :before-remove='beforeRemove'
                    >
                        <el-button
                            v-if='!(providerInfoData.serviceProviderCooperationAgreementName && providerInfoData.serviceProviderCooperationAgreementUrl) || chooseFile'
                            size='small' type='primary' style='width: 80px;float: left'>选择文件
                        </el-button>
                        <el-button
                            v-if='providerInfoData.serviceProviderCooperationAgreementName && providerInfoData.serviceProviderCooperationAgreementUrl && !chooseFile'
                            size='small' type='primary' style='width: 80px;float: left'>更新文件
                        </el-button>

                    </el-upload>
                </div>
            </div>
        </el-card>
        <el-card shadow='hover' style='margin-top: 24px' :body-style="{ padding: '0px', height: '60px' }">
            <div>
                <el-menu :default-active='activeIndex' mode='horizontal' @select='handleSelect'
                         active-text-color='#fe1964'>
                    <el-menu-item index='1' style='font-size: 16px'>服务商信息</el-menu-item>
                    <el-menu-item index='2' style='font-size: 16px' v-if='false'>收费信息</el-menu-item>
                </el-menu>
            </div>
        </el-card>
        <div v-loading='checkTabLoading'>
            <providerInfo :providerInfoData='providerInfoData' v-if='activeIndex === "1"'></providerInfo>
            <chargeInfo v-if='activeIndex === "2"'></chargeInfo>
        </div>
    </div>
</template>

<script>
import providerInfo from '@/components/common/provider-detail-components/providerInfo';
import chargeInfo from '@/components/common/provider-detail-components/chargeInfo';
import { approve, cancel, getProviderApproveDetail, uploadCooperationAgreement } from '@/api/dhfq';

export default {
    name: 'provider-detail',
    components: {
        providerInfo,
        chargeInfo
    },
    data() {
        return {
            title: {
                application_code: 'DSA1618933232255',
                approve_status: '审核中'
            },
            tag_status: {
                '审核通过': 'success',
                '审核拒绝': 'danger',
                '审核中': 'warning',
                '已作废': 'info'
            },
            tag: {
                'CREATED': {
                    label: '审核中',
                    status: 'warning'
                },
                'ENABLED': {
                    label: '审核通过',
                    status: 'success'
                },
                'REJECTED': {
                    label: '审核拒绝',
                    status: 'danger'
                },
                'CANCELLATION': {
                    label: '已作废',
                    status: 'info'
                }
            },
            activeIndex: '1',
            checkTabLoading: false,
            providerInfoData: {},
            dialogApproveVisible: false,
            dialogNoUploadVisible: false,
            operationSelect: '',
            chooseFile: false,
            fileList: [],
            fileInfo: {},
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            fileBaseUrl: process.env.VUE_APP_IMGS_BASE_URL
        };
    },
    created() {
        this.getDetail();
    },
    watch: {
        fileInfo() {
            if (this.fileInfo.fileName && this.fileInfo.filePath) {
                this.chooseFile = true;
            } else {
                this.chooseFile = false;
            }
        }


    },
    methods: {
        getDetail() {
            getProviderApproveDetail(this.$route.query.id).then(res => {
                switch (res.data.serviceType) {
                    case 'LOGISTICS':
                        res.data.serviceType = '物流服务商';
                        break;
                    case 'ADVERTISING':
                        res.data.serviceType = '物流服务商';
                        break;
                    case 'ADVERTISING':
                        res.data.serviceType = '广告';
                        break;
                    case 'PURCHASE':
                        res.data.serviceType = '获取采购';
                        break;
                    case 'STORAGE':
                        res.data.serviceType = '仓储';
                        break;
                    case 'AGENCY_OPERATION':
                        res.data.serviceType = '代运营';
                        break;
                    case 'OTHER':
                        res.data.serviceType = 'OTHER';
                        break;
                }
                this.providerInfoData = res.data;
            });
        },
        handleSelect(key) {
            this.checkTabLoading = true;
            this.activeIndex = String(key);

            this.checkTabLoading = false;
        },
        hrefTo(url) {
            window.open(this.fileBaseUrl + url);
        },
        openDialog(status) {
            this.operationSelect = status;
            if (status === 'ENABLED' && !(this.providerInfoData.serviceProviderCooperationAgreementName && this.providerInfoData.serviceProviderCooperationAgreementUrl)) {
                this.dialogNoUploadVisible = true;
            } else {
                this.dialogApproveVisible = true;
            }
        },
        confirm() {
            if (this.operationSelect === 'CANCELLATION') {
                this.cancel();
            } else {
                this.approve();
            }
        },
        approve() {
            let data = {
                bossUserId: localStorage.getItem('userId'),
                bossUserName: localStorage.getItem('userName'),
                id: this.providerInfoData.id,
                approvedStatus: this.operationSelect
            };
            approve(data).then(res => {
                if (this.operationSelect === 'ENABLED') {
                    this.$message.success('审核通过成功');
                } else if (this.operationSelect === 'REJECTED') {
                    this.$message.success('审核拒绝成功');
                }
                this.getDetail();
                this.dialogApproveVisible = false;
            });
        },
        cancel() {
            let data = {
                bossUserId: localStorage.getItem('userId'),
                bossUserName: localStorage.getItem('userName'),
                id: this.providerInfoData.id
            };
            cancel(data).then(res => {
                this.$message.success('作废成功');
                this.getDetail();
                this.dialogApproveVisible = false;
            });
        },
        change(file, fileList) {
            this.fileList = fileList;
            if (this.fileList.length > 1) {
                this.fileList.shift();
            }
            // this.fileLength = fileList.length
            // console.log(this.fileLength);
        },
        handlePreview(res, file) {
            window.open(this.fileInfo.fullFilePath);
            // let data = {
            //     serviceProviderId: this.providerInfoData.id,
            //     serviceProviderCooperationAgreementName: res.fileName,
            //     serviceProviderCooperationAgreementUrl: res.filePath
            // };
            // uploadCooperationAgreement(data).then(resp => {
            //     this.providerInfoData.serviceProviderCooperationAgreementName = res.fileName
            //     this.providerInfoData.serviceProviderCooperationAgreementUrl = res.fileUrl
            // });
        },
        handleAvatarSuccess(res, file) {
            this.fileInfo = res.data;
            this.upload();
        },
        beforeAvatarUpload(file) {
            if (file.status === 'ready') {
                if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf')) {
                    this.$message.error('只能上传jpg,png,pdf文件');
                    return false;
                }
            }
        },
        beforeRemove(file, fileList) {
            this.fileList = fileList;
            this.chooseFile = false;
            console.log(this.chooseFile);
        },
        upload() {
            let data = {
                serviceProviderId: this.providerInfoData.id,
                serviceProviderCooperationAgreementName: this.fileInfo.fileName,
                serviceProviderCooperationAgreementUrl: this.fileInfo.filePath
            };
            uploadCooperationAgreement(data).then(() => {
                this.$message.success('上传成功');
                this.providerInfoData.serviceProviderCooperationAgreementName = this.fileInfo.fileName;
                this.providerInfoData.serviceProviderCooperationAgreementUrl = this.fileInfo.filePath;
                this.fileList = [];
                this.fileInfo = {};
            });
        }
    }
};
</script>

<style scoped lang='less'>

.title_box {
    display: flex;
    align-items: center;
    padding: 15px 24px;
    justify-content: space-between;

    .left {

        display: flex;
        align-items: center;

        .service_provider_id {
            font-size: 28px;
            line-height: 35px;
            vertical-align: middle;
            margin-right: 35px;
        }
    }

    .right {
        .operation_button {
            vertical-align: middle;
            width: 90px;
            border-radius: 10px;
            font-size: small;
        }
    }
}

.serviceProviderCooperationAgreementBox {
    align-items: center;
    padding: 10px 24px;

    .text {
        margin-right: 20px;
        font-size: 16px;
    }

    /deep/ .el-upload-list {
        height: 32px;
        overflow: hidden;
        display: inline-block;
        margin-left: 15px;
    }

    /deep/ .el-upload--text {
        border: 0px;
        border-radius: 0px;
        width: auto;
        height: auto;
    }

    /deep/ .el-upload-list__item {
        margin-top: 0px;
        height: 32px;
        line-height: 32px;
    }
}
</style>