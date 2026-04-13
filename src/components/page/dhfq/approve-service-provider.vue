<template>
    <div>
        <div>
            <div style='display:flex; align-items: center;padding:18px'>
                <div style='color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;'>
                    <img src='../../../../public/img/favicon.png' style='width:17px;height:17px;margin-right:5px'
                        alt />豆沙包
                    /
                </div>
                <span style='color:rgba(0,0,0,.65);font-size:14px;padding-left:5px'>{{ $route.meta.title }}</span>
            </div>
            <div style="display: flex; justify-content: flex-end;margin-bottom: 20px;">
                <el-button type="primary" @click="dowfuPay" v-if="$showBtn('dowfu-pay')">豆服税金付款</el-button>
            </div>
            <tablePage :current='currentPage' :total-size='totalSize' :filter-options='filterOptions' :columns='columns'
                :detailTable='true' :table-data='tableData' @conditional-query='handleColumnsFilter' :createBtn="true"
                @conditional-reset='handleConditionalReset' @page-change='handlePageChange' @openDetail='_openDetail'
                @quote='toDetail' @conditional-create="handleConditionalCreate" />
        </div>
        <tablePage :current='currentPage' :total-size='totalSize' :filter-options='filterOptions' :columns='columns'
            :detailTable='true' :table-data='tableData' @conditional-query='handleColumnsFilter'
            @conditional-reset='handleConditionalReset' @page-change='handlePageChange' @openDetail='_openDetail'
            @quote='toDetail' />

        <el-dialog :show-close="false" :close-on-click-modal="false" title="豆服税金付款" :visible.sync="dialogFormVisible"
            width="600px">
            <el-form ref="ruleForm" :rules="rules" :model="payFrom" style="padding-left: 20px" label-width="200px">
                <el-form-item label="已付款的客户公司名称" prop="merchantName">
                    <el-input v-model="payFrom.merchantName" placeholder="请输入已付款的客户公司名称"></el-input>
                </el-form-item>
                <el-form-item label="豆服已收款流水单凭证上传">
                    <el-upload :action="uploadUrl" :headers="uploadHeaders" :on-remove="handleRemove"
                        :file-list="fileList" :on-success="handleAvatarSuccess">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="付款金额" prop="amt">
                    <el-input @input="handleInput" v-model="payFrom.amt" placeholder="请输入请输入大于 0 小于 20000 的付款金额">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="收款公司户名" prop="payeeName">
                    <el-input v-model="payFrom.payeeName" placeholder="请输入收款公司户名"></el-input>
                </el-form-item>
                <el-form-item label="收款公司开户行" prop="payeeBankBranchName">
                    <el-input v-model="payFrom.payeeBankBranchName" placeholder="请输入收款公司开户行"></el-input>
                </el-form-item>
                <el-form-item label="收款公司账号" prop="payeeAcctNo">
                    <el-input v-model="payFrom.payeeAcctNo" placeholder="请输入收款公司账号"></el-input>
                </el-form-item>
                <el-form-item label="联行号" prop="payeeBankBranchCode">
                    <el-input v-model="payFrom.payeeBankBranchCode" placeholder="请输入联行号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelUpPay('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="ensureUpPay('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
<!--        服务商卡片配置        -->
        <el-dialog :visible.sync="dialogCreateVisible"   width="600px">
            <div >

                <el-tabs v-model="editableTabsValue" type="card" >
                    <el-tab-pane
                        v-for="(item, index) in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                    >
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div  class="more" >
                <el-button v-show="editableTabsValue==='子页面模块3'" style="margin-right: 10px" @click="addCard">添加卡片</el-button>
                <el-dropdown>
                <el-button type="primary">
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-show="this.editableTabsValue!=='子页面模块3'"><span @click="showModal(editableTabsValue)">预览当前模块</span></el-dropdown-item>
                    <el-dropdown-item ><span @click="removeTab(editableTabsValue)">删除所有页面</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown></div>
<!--     卡片       -->
            <div v-show="editableTabsValue==='服务商卡片配置'">
                <el-form ref="createForm" class="create-dialog"  :label-position="labelPosition" :rules="rules1" :model="createForm" label-width="150px" >
                    <el-form-item label="服务商标识" prop="id">
                        <el-input class="id" v-model="createForm.id" placeholder="选填"  maxlength="3"></el-input>
                      <div class="cxbyid"><el-button  @click="getAllCard()">查询</el-button></div>
                    </el-form-item>
                    <el-form-item label="服务商所属模块" prop="serviceProviderMock">
                        <el-select v-model="createForm.serviceProviderMock" placeholder="请选择所属模块" style="width: 250px;">
                            <el-option
                                v-for="item in modalOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务商类型" prop="serviceProviderType">
                        <el-select v-model="createForm.serviceProviderType" placeholder="请选择服务商类型" style="width: 250px;">
                            <el-option
                                v-for="item in srvsList"
                                :key="item.value"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务商名称" prop="serviceProviderName">
                        <el-input v-model="createForm.serviceProviderName" placeholder="请输入服务商名称"  maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item label="服务商logo" prop="serviceProviderLogo">
                        <el-upload
                            ref="upload"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :on-success="handleLogoSuccess"
                            :before-upload="beforeAvatarUpload"
                            :auto-upload="false"
                            :on-change="handleChange">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="服务商描述" prop="serviceProviderDescribe">
                        <el-input v-model="createForm.serviceProviderDescribe" placeholder="请输入服务商描述"  type="textarea"  :rows="3"  maxlength="100"
                        show-word-limit ></el-input>
                    </el-form-item>
                    <el-form-item label="服务商标签" prop="serviceProviderTag">
                        <el-tag
                            v-for="(tag,index) in dynamicTags"
                            :key="index"
                            :disable-transitions="false"
                            @click="handleSelect(tag)"
                            :class="{ selected: selectedTags.includes(tag) }"
                            :style="{ backgroundColor: tag.tagColor ? tag.tagColor : '' ,color:tag.tagColor==='#fff5f5'?'#ee4242':tag.tagColor==='#fef6e2'?'#fd9e31':' ' }"
                            @close="handleClose(tag)"
                        >
                            {{ tag.tagName }}
                            <i v-if="selectedTags.includes(tag)" class="el-icon-check"></i>
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            style="width: 80px"
                            maxlength="5"
                            @keyup.enter.native="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
                        <span v-if="inputVisible"> <el-button  @click="handleInputCancel" class="tiny-button">取消</el-button></span>
                        <span v-if="inputVisible"> <el-button  @click="handleInputConfirm" class="tiny-button">确定</el-button></span>
                        <!-- 提示信息盒子 -->

                    </el-form-item>
                    <el-form-item label="标签颜色选择" prop="serviceProviderTagColor">
                        <div class="choose-tagColor">
                            <div
                                class="tag-color1"
                                @click="changeTagColor(1)"
                                :class="{ active1: tagActive === 1 }"
                            ></div>
                            <div
                                class="tag-color2"
                                @click="changeTagColor(2)"
                                :class="{ active2: tagActive === 2 }"
                            ></div>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" v-show="this.flagId==null||this.flagId===''" class="create-dialog-footer">
                    <el-button @click="editableTabsValue='子页面模块1'">下一步</el-button>
                </div>
                <div slot="footer"  v-show="this.flagId" class="create-dialog-footer">
                    <el-button @click="cancelAdd()">取 消</el-button>
                    <el-button type="primary" @click="updateByType(1)">修改</el-button>
                </div>
            </div>
            <!--      子页面1      -->
            <div v-show="editableTabsValue==='子页面模块1'">
                <el-form ref="createChildForm1" class="create-dialog"  :label-position="labelPosition" :rules="rulesChild1" :model="createChildForm1" label-width="150px" >
                    <el-form-item label="服务商子页面标题" prop="childTitle">
                        <el-input v-model="createChildForm1.childTitle"   maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item label="一句话简介" prop="childIntro">
                        <el-input v-model="createChildForm1.childIntro"  maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="按钮文字" prop="childBtnTxt">
                        <el-input v-model="createChildForm1.childBtnTxt"  maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="按钮跳转链接" prop="childLink">
                        <el-input v-model="createChildForm1.childLink"  maxlength="1000"></el-input>
                    </el-form-item>
                    <el-form-item label="轮播图背景" prop="childCarousel">
                        <el-upload
                            ref="uploadChildCarousel"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :on-success="handleCarouselSuccess"
                            :before-upload="beforeChildCarouselUpload"
                            :auto-upload="false"
                            :on-change="handleChangeChild1">
                            <img v-if="imgCarouselUrl" :src="imgCarouselUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="服务商logo" prop="childLogo">
                        <el-upload
                            ref="serviceUploadLogo"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :on-success="handleChildLogoSuccess"
                            :before-upload="beforeChildLogoUpload"
                            :auto-upload="false"
                            :on-change="handleChangeChild1Logo">
                            <img v-if="imgChildLogoUrl" :src="imgChildLogoUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="服务商企业宗旨" prop="childPurpose">
                        <el-input v-model="createChildForm1.childPurpose"  maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item label="参考图">
                       <div class="provider_example1">
                           <el-image
                               style="width: 400px; height: 130px"
                               :src="exampleUrl1"
                               :preview-src-list="srcList1">
                           </el-image>
                       </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" v-show="this.flagId==null||this.flagId===''" class="create-dialog-footer">
                    <el-button @click="editableTabsValue='服务商卡片配置'">上一步</el-button>
                    <el-button @click="editableTabsValue='子页面模块2'">下一步</el-button>
                    </div>
                <div slot="footer"  v-show="this.flagId" class="create-dialog-footer">
                    <el-button @click="cancelAdd()">取 消</el-button>
                    <el-button type="primary" @click="updateByType(2)">修改</el-button>
                </div>
            </div>
            <!--      子页面2      -->
            <div v-show="editableTabsValue==='子页面模块2'">
                <el-form ref="createChildForm2"  class="create-dialog"  :label-position="labelPosition" :rules="rulesChild2" :model="createChildForm2" label-width="150px" >
                    <el-form-item label="一级标题" prop="h1Title">
                        <el-input v-model="createChildForm2.h1Title"   maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item label="二级标题" prop="h2Title">
                        <el-input v-model="createChildForm2.h2Title"  maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="三级标题" prop="h3Title">
                        <el-input v-model="createChildForm2.h3Title"  maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="详细介绍" prop="detailIntro">
                        <el-input v-model="createChildForm2.detailIntro"  type="textarea"  :rows="5"  maxlength="800"          show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="参考图">
                        <div class="provider_example2">
                            <el-image
                                style="width: 410px; height: 130px"
                                :src="exampleUrl2"
                                :preview-src-list="srcList2">
                            </el-image>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" v-show="this.flagId==null||this.flagId===''" class="create-dialog-footer">
                    <el-button @click="editableTabsValue='子页面模块1'">上一步</el-button>
                    <el-button @click="editableTabsValue='子页面模块3'">下一步</el-button>
                    <el-button type="primary" @click="ensureAdd(3,'createForm','createChildForm1','createChildForm2')">新增</el-button>
                </div>
                <div slot="footer"  v-show="this.flagId" class="create-dialog-footer">
                    <el-button >取 消</el-button>
                    <el-button type="primary" @click="updateByType(3)">修改</el-button>
                </div>
            </div>
            <!--      子页面3      -->
            <div v-show="editableTabsValue==='子页面模块3'">
                <div class="child3">
                <el-collapse  ref="collapseRef" accordion @change="handleChangeCollapse">
                    <el-collapse-item  v-for="(item,index) in  childForms3"  :key="index"  :name="index">
                        <template slot="title">
                            <div>{{ item.productName}}</div>
                        </template>
                        <div>
                            <el-form       :ref="'forms' + index"  class="create-dialog"  :label-position="labelPosition" :rules="rulesChild3"  :model="forms" label-width="150px" >
                            <el-form-item label="产品名称"   prop="name">
                                <el-input v-model="forms.name" placeholder="请输入产品名称"  maxlength="30"></el-input>
                            </el-form-item>
                                <el-form-item label="产品简介"   prop="productIntro">
                                    <el-input v-model="forms.productIntro" placeholder="请输入产品简介"  maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="产品图标" prop="productLogo">
                                    <el-upload
                                        :ref="'productUpload' + index"
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :headers="uploadHeaders"
                                        :show-file-list="false"
                                        :on-success="handleProductLogoSuccess"
                                        :before-upload="beforeChildProductLogoUpload"
                                        :auto-upload="false"
                                        :on-change="handleProductChange">
                                        <img v-if="imgProductUrl" :src="imgProductUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="时效标签" prop="serviceProviderTag">
                                    <el-tag
                                        v-for="(tag,index) in child3Tag"
                                        :key="index"
                                        :disable-transitions="false"
                                        @click="handleChildSelect(tag)"
                                        :class="{ selected: selectedChildTags.includes(tag) }"
                                        :style="{ backgroundColor: tag.tagBackgroundColor,color:tag.tagTextColor }"
                                        @close="handleClose(tag)"
                                    >
                                        {{ tag.tagText }}
                                        <i v-if="selectedChildTags.includes(tag)" class="el-icon-check"></i>
                                    </el-tag>
                                    <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible1"
                                        v-model="inputValue1"
                                        ref="saveTagInput1"
                                        size="small"
                                        style="width: 80px"
                                        maxlength="12"
                                        @keyup.enter.native="handleInputConfirm1"
                                    >
                                    </el-input>
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput1">+</el-button>
                                    <span v-if="inputVisible1"> <el-button  @click="handleInputCancel1" class="tiny-button">取消</el-button></span>
                                    <span v-if="inputVisible1"> <el-button  @click="handleInputConfirm1" class="tiny-button">确定</el-button></span>
                                    <!-- 提示信息盒子 -->
                                </el-form-item>
                                <el-form-item label="标签文本颜色选择" prop="tagTextColor">
                                    <div class="choose-tagColor1">
                                        <div
                                            class="tag-txt-color1"
                                            @click="changeTagColor1('#0566be')"
                                            :class="{ activeTxtColor: tagActive1 === '#0566be' }"
                                        ></div>
                                        <div
                                            class="tag-txt-color2"
                                            @click="changeTagColor1('#ff6e6e')"
                                            :class="{ activeTxtColor: tagActive1 === '#ff6e6e' }"
                                        >
                                        </div>
                                        <div
                                            class="tag-txt-color3"
                                            @click="changeTagColor1('#ffd25d')"
                                            :class="{ activeTxtColor: tagActive1 === '#ffd25d' }"
                                        ></div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="标签背景颜色选择" prop="tagBackgroundColor">
                                    <div class="choose-tagColor1">
                                        <div
                                            class="tag-bg-color1"
                                            @click="changeTagColor2('#f1f5ff')"
                                            :class="{ activeTxtColor: tagActive2 === '#f1f5ff' }"
                                        ></div>
                                        <div
                                            class="tag-bg-color2"
                                            @click="changeTagColor2('#fff5f5')"
                                            :class="{ activeTxtColor: tagActive2 === '#fff5f5' }"
                                        >
                                        </div>
                                        <div
                                            class="tag-bg-color2"
                                            @click="changeTagColor2('#fef6e2')"
                                            :class="{ activeTxtColor: tagActive2 === '#fef6e2' }"
                                        ></div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="按钮文字"   prop="btnTxt">
                                    <el-input v-model="forms.btnTxt" placeholder="请输入按钮文字"  maxlength="10"></el-input>
                                </el-form-item>
                                <el-form-item label="按钮跳转链接"   prop="btnLink">
                                    <el-input v-model="forms.btnLink" placeholder="请输入按钮跳转链接"  maxlength="1000"></el-input>
                                </el-form-item>
                                <el-form-item label="参考图" >
                                    <div class="provider_example3">
                                        <el-image
                                            style="width: 170px; height: 205px"
                                            :src="exampleUrl3"
                                            :preview-src-list="srcList3">
                                        </el-image>
                                    </div>
                                </el-form-item>
                                <div style="display: flex;justify-content: flex-end"><el-button @click="showModal(editableTabsValue)">预览卡片</el-button><el-button  @click="delChild3(index)">删除卡片</el-button><el-button v-show="flagId" @click="updateChild3(index)" type="primary">修改卡片</el-button><el-button v-show="flagId&&!item.serviceCardId" type="primary" @click="addChild3Card(index)">保存卡片</el-button></div>
                            </el-form>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :show-close="false"
            :visible.sync="showPageVisible"
            width="1200px">
            <div class="showBox">
                <div v-show="editableTabsValue==='服务商卡片配置'">
                    <div class="showBox_content">
                        <div class="item-card-top">
                            <img class="card-logo" :src="this.imageUrl"></img>
                            <div class="card-tag">
                                <div class="tag-list" v-for="(tag,index) in selectedTags" :key="index"
                                     :style="{ backgroundColor: tag.tagColor ? tag.tagColor : '' ,color:tag.tagColor==='#fff5f5'?'#ee4242':tag.tagColor==='#fef6e2'?'#fd9e31':' ' }">{{tag.tagName}}
                                </div>
                            </div>
                        </div>
                        <div class="item-card-center">
                            <div class="item-card-center-title">{{createForm.serviceProviderName}}</div>
                            <div class="item-card-center-desc">{{createForm.serviceProviderDescribe}}</div>
                        </div>
                        <div class="item-card-bottom">立即下单</div>
                    </div>
                </div>
                <div v-show="editableTabsValue==='子页面模块1'">
                    <div class="item-card1">
                        <div class="item-card1-left">
                            <div class="item-card1-left-top">
                                <img :src="imgChildLogoUrl" alt="" style="width: 100px;height: 100px">
                                <div class="card1-left-top-txt">
                                    <div class="card1-left-top-title">{{ this.createChildForm1.childTitle }}</div>
                                </div>
                            </div>
                            <div class="card1-left-top-desc">{{ this.createChildForm1.childIntro }}</div>

                            <div class="item-card-left-bottom">{{ this.createChildForm1.childBtnTxt }}</div>
                        </div>
                        <div class="item-card1-right">
                            <img :src="this.imgCarouselUrl" alt="" style="width: 638px;height: 374px">
                            <div class="item-card1-right-about">
                             <img :src="this.imageUrl" style="width: 150px;height: 40px"></img>
                                <div class="item-card1-right-purpose">{{ this.createChildForm1.childPurpose }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="editableTabsValue==='子页面模块2'">
                    <div class="item-card2">
                     <div class="item-card2-top">
                         {{this.createChildForm2.h1Title}}
                     </div>
                        <div class="item-card2-center">
                            {{this.createChildForm2.h2Title}}
                        </div>
                        <div class="item-card2-center">
                            <span class="circle"></span>
                            {{this.createChildForm2.h3Title}}
                        </div>
                        <div class="item-card2-bottom">
                            {{this.createChildForm2.detailIntro}}
                        </div>
                    </div>
                </div>
                <div v-show="editableTabsValue==='子页面模块3'">
                    <div style="display: flex;justify-content: center">
                        <div class="item-card3">
                            <div class="item-card3-top">
                                <img :src="this.forms.productLogo" alt="" style="width: 150px;height: 40px">
                                <div class="item-card3-title">{{ this.forms.name }}</div>
                                <div class="item-card3-intro">{{ this.forms.productIntro }}</div>
                                <div class="item-card3-tagList">
                                    <div class="item-card3-tag" v-for="(item,index) in selectedChildTags" :key="index" :style="{backgroundColor: item.tagBackgroundColor ? item.tagBackgroundColor : '',color:item.tagTextColor?item.tagTextColor:''}">
                                        {{ item.tagText}}
                                    </div>

                                </div>
                                <div class="item-card3-btn">{{this.forms.btnTxt}}<span v-if="forms.btnTxt" class="right-arrow"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="showPageVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import { before } from 'lodash';
import tablePage from '../../common/tablePage.vue';
import { getProviderApprove, getProviderApproveCondition, dowfuUp } from '@/api/dhfq';
import {
    gerAddServiceCard, getAddServiceCardTag,
    getAddTag, getDeleteResidentAgentsAll, getDeleteServiceCard, getInsertServiceCard,
    getSelectAgentsDescAndCard,
    getSelectServiceCardTag,
    getShowParentId,
    getTag, getUpdateResidentAgentDesc, getUpdateResidentAgents, getUpdateServiceCard
} from '@/api/doufu';
import { getAll } from '@/api';
import { updateAccount } from '@/api/crm';

export default {
    name: 'approve-service-provider',
    components: {
        tablePage
    },
    data() {
        return {
            srcList1:[require('@/assets/provider_example1.png')],
            srcList2:[require('@/assets/provider_example2.png')],
            srcList3:[require('@/assets/provider_example3.png')],
            exampleUrl1:require('@/assets/provider_example1.png'),
            exampleUrl2:require('@/assets/provider_example2.png'),
            exampleUrl3:require('@/assets/provider_example3.png'),
            showPageVisible:false,
            flagId:'',
            selectedChild3Index:null,
            selectedChild3bgIndex:null,
            imgProductUrl:null,
            collapseIndex:null,
            // 点对点
            forms:{
            id:null,
             name:"",
                btnLink:'',
            productIntro:'',
            productLogo:'',
            productLogoBase64:'',
            timeTagTxt:'',
            btnTxt:'',
            tagTxtColor:null,
                serviceCardTagId:null,
            },
            childForms3:[
            ],
            imgChildLogoUrl:null,
            imgCarouselUrl:null,
            imgCarouselPath:null,
            imgChildLogoPath:null,
            // 服务商卡片
            editableTabsValue: '服务商卡片配置',
            editableTabs: [
                {
                title: '服务商卡片配置',
                name: '服务商卡片配置',
            }, {
                title: '子页面模块1',
                name: '子页面模块1',
            },
                {
                    title: '子页面模块2',
                    name: '子页面模块2',
                },
                {
                    title: '子页面模块3',
                    name: '子页面模块3',
                }],
            targetTabName: '', // 要删除的标签名
            tabIndex: 2,
            selectedTags: [],
            selectedChildTags:[],
            selectedColor: '', // 默认颜色
            tagColors: {}, // 用于存储每个标签的颜色
            tagActive: null,
            tagActive1: null,
            tagActive2: null,
            dynamicTags: ['热门','SPN','跨境'],
            inputVisible: false,
            inputVisible1: false,
            inputValue: '',
            inputValue1: '',
            createChildForm1:{
              id:null,
              childTitle:null,
              childIntro:null,
              childBtnTxt:'入驻平台',
              childLink:null,
              childCarousel:null,
                childLogo:null,
                childPurpose:null,
                example:null,
            },
            createChildForm2:{
                id:null,
                h1Title:null,
                h2Title:null,
                h3Title:null,
                detailIntro:null,
            },
            createForm: {
                id:null,
                serviceProviderTag:[],
                serviceProviderLogo:'',
                serviceProviderDescribe:'',
                serviceProviderName:'',
                serviceProviderMock:'1',
                serviceProviderType:1
            },
            modalOptions: [
                { label: '豆服官网服务市场', value: '1' },
                { label: '豆服商户中心首页', value: '2' },
                { label: '豆服商户中心服务商列表', value: '3' },
            ],
            typeOptions: [
                { label: '跨境开店', value: 1 },
                { label: '跨境收款', value: 2 },
                { label: '跨境物流', value: 3 },
                { label: '跨境广告', value: 4 },
                { label: '跨境保险', value: 5 },
                { label: '其他服务', value: 6 },
            ],
            imageUrl:'',
            labelPosition: 'left',
            dialogCreateVisible:false,
            rules: {
                merchantName: [
                    { required: true, message: '请输入已付款的客户公司名称', trigger: 'blur' },
                ],
                payeeAcctNo: [
                    { required: true, message: '请输入收款公司账号', trigger: 'blur' },
                ],
                payeeName: [
                    { required: true, message: '请输入收款公司开户行', trigger: 'blur' },
                ],
                payeeBankBranchName: [
                    { required: true, message: '请输入收款公司开户行', trigger: 'blur' },
                ],
                payeeBankBranchCode: [
                    { required: true, message: '请输入联行号', trigger: 'blur' },
                ],
                amt: [
                    { required: true, message: '请输入金额', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入数字'));
                            } else {
                                const num = parseFloat(value);
                                if (isNaN(num) || num <= 0 || num >= 20000) {
                                    callback(new Error('请输入大于 0 小于 20000 的数字'));
                                } else {
                                    callback();
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
            },
            rules1:{
                serviceProviderName: [
                    { required: true, message: '请输入服务商名称', trigger: 'blur' },
                ],
                serviceProviderType: [
                    { required: true, message: '请输入服务商类型', trigger: 'blur' },
                ],
                serviceProviderMock: [
                    { required: true, message: '请输入服务商所属模块', trigger: 'blur' },
                ],
                serviceProviderDescribe: [
                    { required: true, message: '请输入服务商描述', trigger: 'blur' },
                ],
                serviceProviderLogo: [
                    { required: true, message: '请选择服务商logo', trigger: 'change' },
                ],
            },
            rulesChild1:{
                childTitle: [
                    { required: true, message: '请输入服务商子页面标题', trigger: 'blur' },
                ],
                childIntro: [
                    { required: true, message: '请输入服务商子页面简介', trigger: 'blur' },
                ],
                childLogo: [
                    { required: true, message: '请选择服务商子页面logo', trigger: 'change' },
                ],
                childPurpose: [
                    { required: true, message: '请选择服务商企业宗旨', trigger: 'blur' },
                ],
                childCarousel: [
                    { required: true, message: '请选择轮播图', trigger: 'change' },
                ],
            },
            rulesChild2:{
                h1Title: [
                    { required: true, message: '请输入服务商子页面一级标题', trigger: 'blur' },
                ],
                detailIntro: [
                    { required: true, message: '请输入服务商子页面详细介绍', trigger: 'blur' },
                ],
            },
            rulesChild3:{
                name: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                ],
                productIntro:[
                    { required: true, message: '请输入产品简介', trigger: 'blur' },
                ],
                productLogo:[
                    { required: true, message: '请输入产品图标', trigger: 'blur' },
                ],
                btnTxt:[
                    { required: true, message: '请输入按钮文字', trigger: 'blur' },
                ],

            },

            uploadUrl: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-file/file-upload/upload/pf`,
            uploadHeaders: { token: localStorage.getItem('token') },
            fileList: [],
            payFrom: {
                merchantName: '',
                billNo: [],
                amt: '',
                payeeName: "",
                payeeAcctNo: "",
                payeeBankBranchCode: "",
                payeeBankBranchName: "",

            },
            dialogFormVisible: false,
            tableData: [],
            currentPage: 1,
            totalSize: 10,

            columns: [
                {
                    label: '服务商编号',
                    prop: 'id',
                    width: 120
                },
                {
                    label: '服务商类型',
                    prop: 'serviceType',
                    width: 145
                },
                {
                    label: '品牌名称',
                    prop: 'brandName',
                    width: 145
                },
                {
                    label: '企业类型',
                    prop: 'enterpriseType',
                    width: 140
                },
                {
                    label: '企业名称',
                    prop: 'enterpriseName',
                    width: 135,
                    autoTip: true
                },
                {
                    label: '币种',
                    prop: 'currency',
                    width: 110
                },
                {
                    label: '收费方式',
                    prop: 'serviceFeeType',
                    width: 120
                },
                {
                    label: '总费率',
                    prop: 'serviceFeeRate',
                    width: 120
                },
                {
                    label: '客户费率',
                    prop: 'customerRateRate',
                    width: 120
                },
                {
                    label: '服务商补贴费率',
                    prop: 'serviceProviderRate',
                    width: 140
                },
                {
                    label: '平台补贴费率',
                    prop: 'platformRate',
                    width: 140
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'approvedStatus',
                    width: 130
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },
                {
                    label: this.$t('loan_detail_gxsj'),
                    prop: 'updateTime',
                    width: 200
                },
                {
                    label: '操作人',
                    prop: 'bossUserName',
                    width: 120
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('common_see'),
                            type: 'primary',
                            code: 'dhfq-provider-detail'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    placeholder: '服务商类型',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '企业类型',
                    filterable: true,
                    options: [
                        {
                            label: '大陆企业',
                            value: '大陆企业'
                        },
                        {
                            label: '香港企业',
                            value: '香港企业'
                        }
                    ]
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '收费方式',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '状态',
                    filterable: true,
                    options: [
                        {
                            label: '审核中',
                            value: 'CREATED'
                        },
                        {
                            label: '审核通过',
                            value: 'ENABLED'
                        },
                        {
                            label: '审核拒绝',
                            value: 'REJECTED'
                        },
                        {
                            label: '已作废',
                            value: 'CANCELLATION'
                        }
                    ]
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '企业名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '品牌名称',
                    filterable: true,
                    options: []
                }
            ],
            imgPath:null,
            picFlag:false,
            residentAgentsDescId:null,
            residentAgentsId:null,
            srvsList:[

            ],
            child3Id:null,
            child3Tag:[]
        };
    },
    created() {
        this._getList();
        this.getCondition();
        this.showParentId();
        this.getChildTag();

    },
    methods: {
        // 删除模块3卡片
        delChild3(index){
            const id =this.childForms3[index].serviceCardId
            if(id){
                getDeleteServiceCard({serviceCardId:id}).then(res => {
                    console.log(res)
                    if(res.success) {
                        this.$message.success('删除成功!');
                        if(this.$refs.collapseRef){
                            this.$refs.collapseRef.activeNames=[]
                        }
                        this.getAllCard()
                    }
                })

            } else {
                this.childForms3.splice(index,1);
            }
        },
        updateAccount,
        // 修改模块3
        updateChild3(index){
            const ids = this.selectedChildTags.map(tag => tag.serviceCardTagId);
            let result
            if (ids.length > 2) {
                result = ids.join(',');
            } else {
                result = ids.toString();
            }
            if(this.residentAgentsDescId==null){
                alert("查询标识失败！请先添加模块1 / 模块2！")
                return;
            }
            this.$refs[`forms${index}`][0].validate((valid) => {
                if(valid){
                    getUpdateServiceCard({
                        serviceCardId:this.child3Id,
                        serviceCardLogo:  this.forms.productLogo,
                        productName :this.forms.name,
                        productBriefIntroduction:this.forms.productIntro,
                        buttonText:this.forms.btnTxt,
                        buttonLink:this.forms.btnLink,
                        serviceCardTagId:result,
                        residentAgentsDescId:this.residentAgentsDescId
                    }).then(res => {
                        if(res.success){
                            if(this.$refs.collapseRef){
                                this.$refs.collapseRef.activeNames=[]
                            }
                            this.getAllCard()
                            this.$message.success('修改成功！')
                        }
                    })
                }
            })
        },
        // 新增模块3 卡片
        addChild3Card(index){
            const ids = this.selectedChildTags.map(tag => tag.serviceCardTagId);
            let result
            if (ids.length > 2) {
                result = ids.join(',');
            } else {
                result = ids.toString();
            }
            if(this.residentAgentsDescId==null){
                alert("查询标识失败！请先添加模块1 / 模块2！")
                return;
            }
            this.$refs[`forms${index}`][0].validate((valid) => {
                if(valid){
                    gerAddServiceCard({
                        serviceCardLogo:  this.forms.productLogo,
                        productName :this.forms.name,
                        productBriefIntroduction:this.forms.productIntro,
                        buttonText:this.forms.btnTxt,
                        buttonLink:this.forms.btnLink,
                        serviceCardTagId:result,
                        residentAgentsDescId:this.residentAgentsDescId
                    }).then(res => {
                        if(res.success){
                            if(this.$refs.collapseRef){
                                this.$refs.collapseRef.activeNames=[]
                            }
                            this.$message.success('新增成功！')
                            this.getAllCard()
                        }
                    })
                }
              })

        },
        // 针对模块修改 1 服务商卡片 2 子模块1
        updateByType(type) {
  if(type===1){
      const ids = this.selectedTags.map(tag => tag.id);
      let result
      if (ids.length > 2) {
          result = ids.join(',');
      } else {
          result = ids.toString();
      }
      getUpdateResidentAgents({
          id:this.createForm.id,
          title:this.createForm.serviceProviderName,
          dscp:this.createForm.serviceProviderDescribe,
          logo:this.createForm.serviceProviderLogo,
          parentId:  this.createForm.serviceProviderType,
          residentTagId:result,
          displayGroup:this.createForm.serviceProviderMock
      }).then(res => {
          if (res.success) {
              this.$message.success('修改成功！')
              this.getAllCard()
          }
      })
  } else if (type===2){
      getUpdateResidentAgentDesc({
          residentAgentsDescId:this.residentAgentsDescId,
          tAboutCompany:this.createChildForm1.childTitle,
          tBriefCompanyIntroduction:this.createChildForm1.childIntro,
          tButtonText:this.createChildForm1.childBtnTxt,
          tButtonLink:this.createChildForm1.childLink,
          tBackgroundImage: this.createChildForm1.childCarousel,
          tServiceDescLogoUrl:this.createChildForm1.childLogo,
          tCorporateMission:this.createChildForm1.childPurpose
      }).then(res => {
          if (res.success) {
              this.$message.success('修改成功！')
              this.cancelAdd()
              this.dialogCreateVisible = false;
          }
      })
  }
  else if (type===3){
      getUpdateResidentAgentDesc({
          residentAgentsDescId:this.residentAgentsDescId,
          cTitleOne:this.createChildForm2.h1Title,
          cTitleTwo:this.createChildForm2.h2Title,
          cTitleThree:this.createChildForm2.h3Title,
          cContent:this.createChildForm2.detailIntro
      }).then(res => {
          if (res.success) {
              this.$message.success('修改成功！')
              this.cancelAdd()
              this.dialogCreateVisible = false;
          }
      })
  }
        },
        // 根据查询全模块
        getAllCard(){
            getSelectAgentsDescAndCard({ id:this.createForm.id }).then(res=>{
                // 卡片模块
                this.createForm.serviceProviderType = res.data['residentAgents'].parentId
                this.createForm.serviceProviderName = res.data['residentAgents'].title
                this.createForm.serviceProviderLogo = res.data['residentAgents'].logo
                this.imageUrl = res.data['residentAgents'].logo;
                this.createForm.serviceProviderDescribe = res.data['residentAgents'].dscp
                this.createForm.serviceProviderTag = res.data['residentAgents'].residentTagId
                if(res.data['residentAgents'].residentTagId){
                    const idArray =res.data['residentAgents'].residentTagId.split(',').map(Number);
                    const filteredTags = this.dynamicTags.filter(tag => idArray.includes(tag.id));
                    this.selectedTags = filteredTags;
                }
                // 子模块1 + 2
                this.residentAgentsId = res.data['residentAgentsDesc'].residentAgentsId
                this.residentAgentsDescId = res.data['residentAgentsDesc'].residentAgentsDescId
                this.createChildForm1.childTitle = res.data['residentAgentsDesc'].tAboutCompany
                this.createChildForm1.childIntro = res.data['residentAgentsDesc'].tBriefCompanyIntroduction
                this.createChildForm1.childBtnTxt = res.data['residentAgentsDesc'].tButtonText
                this.createChildForm1.childLink =res.data['residentAgentsDesc'].tButtonLink
                this.createChildForm1.childCarousel = res.data['residentAgentsDesc'].tBackgroundImage
                this.imgCarouselUrl = res.data['residentAgentsDesc'].tBackgroundImage
                this.createChildForm1.childPurpose = res.data['residentAgentsDesc'].tCorporateMission
                this.createChildForm1.childLogo = res.data['residentAgentsDesc'].tServiceDescLogoUrl
                this.imgChildLogoUrl = res.data['residentAgentsDesc'].tServiceDescLogoUrl
                this.createChildForm2.h1Title = res.data['residentAgentsDesc'].cTitleOne
                this.createChildForm2.h2Title = res.data['residentAgentsDesc'].cTitleTwo
                this.createChildForm2.h3Title = res.data['residentAgentsDesc'].cTitleThree
                this.createChildForm2.detailIntro = res.data['residentAgentsDesc'].cContent
                //子模块3
                this.childForms3 = res.data['serviceCard']
            })
        },
        addCard(){
            const length = this.childForms3.length+1
            this.childForms3.push(
              {
                  productName:`产品服务卡片${length}`,
                  productIntro:'',
                  productLogo:'',
                  timeTagTxt: '',
                  btnTxt:'',
                  tagTxtColor:null,
              }
          )
        },
        // 获取子模块3 标签
        async getChildTag(){
            await getSelectServiceCardTag().then(res=>{
                this.child3Tag = res.data
            })
        },
        // 切换模块3 选项
        handleChangeCollapse(index){
            this.selectedChildTags=[]
           this.collapseIndex = index;
          this.child3Id = this.childForms3[index].serviceCardId
          setTimeout(()=>{
              const newData = this.childForms3.find(item => item.serviceCardId ===  this.child3Id);
              this.forms.name = newData.productName;
              this.forms.btnTxt = newData.buttonText;
              this.forms.btnLink = newData.buttonLink;
              this.forms.productLogo= newData.serviceCardLogo
              this.imgProductUrl = newData.serviceCardLogo
              this.forms.productIntro  = newData.productBriefIntroduction
              this.forms.serviceCardTagId= newData.serviceCardTagId

              if(newData.serviceCardTagId){
                  const idArray = this.forms.serviceCardTagId.split(',').map(Number);
                  const filteredTags = this.child3Tag.filter(tag => idArray.includes(tag.serviceCardTagId));
                  this.selectedChildTags = filteredTags;
              }
              this.forms.serviceCardId= newData.serviceCardId
              console.log(this.forms)
          },200)
        },
        // 全量删除
        removeTab(targetName) {
            this.$confirm('确定要删除所有页面吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.createForm.id){
                    getDeleteResidentAgentsAll({id:this.createForm.id}).then(res=>{
                        if(res.success){
                            this.$message.success('删除成功！')
                            this.cancelAdd()
                        }
                    })
                } else {
                    alert('请检查服务商标识!')
                }
            }).catch(() => {
                // 用户点击“取消”时不执行任何操作
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 预览模块
        showModal(val){
            console.log(val)
            this.showPageVisible= true
        },
        // 获取模块Id
        showParentId(){
            getShowParentId().then(res => {
                this.srvsList = res.data.map((item, index) => {
                    // 定义一个包含新 title 值的数组
                    const titles = ["跨境开店", "跨境收款", "跨境物流", "跨境广告", "跨境保险", "其他服务"];
                    if (titles.length > 0 && index < titles.length) {
                        return {
                            ...item,
                            title: titles[index]
                        };
                    }
                    return {
                        ...item,
                        title: item.title || ""
                    };
                });
                console.log(this.srvsList)
            })
        },
        // 选中标签颜色
        changeTagColor(color) {
        this.tagActive = color
        },
        // 选中子文本标签颜色
        changeTagColor1(color) {
            this.tagActive1 = color
        },
        // 选中子背景标签颜色
        changeTagColor2(color) {
            this.tagActive2 = color
        },
        // 添加标签
        handleInputConfirm() {
            const inputTag = this.inputValue.trim();
            const color = this.tagActive===1?'#fff5f5': this.tagActive===2?'#fef6e2':''
            if(color===''){
                alert('请选择新增标签颜色！')
                return
            }
            if (inputTag) {
                getAddTag({tagName: inputTag, tagColor: color}).then(res => {
                    if (res.success) {
                        this.$message.success('添加成功！')
                        getTag().then(res => {
                            if (res.success) {
                                this.dynamicTags=res.data
                            }
                        })
                    }
                })
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
        // 关闭弹窗
        handleInputCancel(){
            this.inputVisible = false;
        },
        handleInputCancel1(){
            this.inputVisible1 = false;
        },
        // 选中标签
        handleSelect(tag) {
            if (this.selectedTags.includes(tag)) {
                this.selectedTags = this.selectedTags.filter((t) => t !== tag);
            } else {
                if (this.selectedTags.length >= 2) {
                  alert('最多选中两个标签！')
                } else {
                    this.selectedTags.push(tag);
                }
            }
        },
        // 添加子标签
        handleInputConfirm1() {
            const inputTag = this.inputValue1.trim();
            const colorBg = this.tagActive2
            const color = this.tagActive1
            if(color==null||colorBg==null){
                alert('请选择新增标签相关颜色！')
                return
            }
            if (inputTag) {
                getAddServiceCardTag({tagText: inputTag, tagBackgroundColor: colorBg,tagTextColor:color}).then(res => {
                    if (res.success) {
                        this.$message.success('添加成功！')
                        getSelectServiceCardTag().then(res => {
                            if (res.success) {
                                this.child3Tag=res.data
                            }
                        })
                    }
                })
            }
            this.inputVisible1 = false;
            this.inputValue1 = "";
        },
        // 选中子标签
        handleChildSelect(tag) {
            if (this.selectedChildTags.includes(tag)) {
                this.selectedChildTags = this.selectedChildTags.filter((t) => t !== tag);
            } else {
                if (this.selectedChildTags.length >= 2) {
                    alert('最多选中两个标签！')
                } else {
                    this.selectedChildTags.push(tag);
                }
            }
        },
        // 文件选择
        handleChange(file) {
            console.log(  "231",this.$refs.upload)
            this.$refs.upload.submit();
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file.raw);
        },
        // 产品图标文件选择
        handleProductChange(file) {
           const num =  Number(this.collapseIndex)
            this.$refs[`productUpload${num}`][0].submit();
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imgProductUrl = e.target.result;
            };
            reader.readAsDataURL(file.raw);
        },
        // 背景图选择
        handleChangeChild1(file) {
            this.$refs.uploadChildCarousel.submit();
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imgCarouselUrl = e.target.result;
            };
            reader.readAsDataURL(file.raw);
        },
        // 子页面logo选择
        handleChangeChild1Logo(file) {
            this.$refs.serviceUploadLogo.submit();
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imgChildLogoUrl = e.target.result;
            };
            reader.readAsDataURL(file.raw);
        },
        // 关闭新建tag标签
        handleClose(tag) {
            this.child3Tag.splice(this.child3Tag.indexOf(tag), 1);
        },
        // tag标签
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // tag子标签
        showInput1() {
            this.inputVisible1 = true;
        },
        // 校验服务商卡片图片
        beforeAvatarUpload(file) {
            console.log(file);
            // 检查文件大小是否小于 2MB
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return false; // 直接返回 false，阻止上传
            }
            // 创建一个 Promise 来处理异步校验逻辑
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        // 检查图片尺寸是否至少为 125x125
                        if (width < 100 || height < 20) {
                            this.$message.error('上传logo图片尺寸不能小于 150x40 像素!');
                            reject(); // 拒绝 Promise，阻止上传
                        } else {
                            resolve(); // 解决 Promise，允许上传
                        }
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        },
        // 校验子页面轮播图
        beforeChildCarouselUpload(file) {
            console.log(file);
            // 检查文件大小是否小于 2MB
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
                return false; // 直接返回 false，阻止上传
            }
            // 创建一个 Promise 来处理异步校验逻辑
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        if (width < 150 || height < 40) {
                            this.$message.error('上传logo图片尺寸不能小于 150x40 像素!');
                            reject(); // 拒绝 Promise，阻止上传
                        } else {
                            resolve(); // 解决 Promise，允许上传
                        }
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        },
        // 校验子logo
        beforeChildLogoUpload(file) {
            console.log(file);
            // 检查文件大小是否小于 2MB
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return false; // 直接返回 false，阻止上传
            }
            // 创建一个 Promise 来处理异步校验逻辑
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        // 检查图片尺寸是否至少为 125x125
                        if (width < 150 || height < 40) {
                            this.$message.error('上传logo图片尺寸不能小于 150x40 像素!');
                            reject(); // 拒绝 Promise，阻止上传
                        } else {
                            resolve(); // 解决 Promise，允许上传
                        }
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        },
        // 校验产品logo
        beforeChildProductLogoUpload(file) {
            // 检查文件大小是否小于 2MB
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return false; // 直接返回 false，阻止上传
            }
            // 创建一个 Promise 来处理异步校验逻辑
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        // 检查图片尺寸是否至少为 125x125
                        if (width < 20 || height < 20) {
                            this.$message.error('上传图片尺寸不能小于 20x20 像素!');
                            reject(); // 拒绝 Promise，阻止上传
                        } else {
                            resolve(); // 解决 Promise，允许上传
                        }
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        },
        //  豆服税金
        handleInput(value) {
            // 使用正则表达式过滤非数字和小数点的字符
            let filteredValue = value.replace(/[^\d.]/g, '');
            this.payFrom.amt = filteredValue;
        },
        //取消上传--豆服税金
        cancelUpPay(formName) {
            this.$refs[formName].resetFields();
            this.fileList = []
            this.payFrom.billNo = []
            this.dialogFormVisible = false;
        },
        // 取消添加卡片
        cancelAdd() {
            this.selectedTags = []
            this.$refs['createForm'].resetFields();
            this.$refs['createChildForm1'].resetFields();
            this.$refs['createChildForm2'].resetFields();
            this.dialogCreateVisible = false;
        },
        handleAvatarSuccess(res, file) {
            this.payFrom.billNo.push(res.data.fullFilePath)
        },
        //上传logo成功
        handleLogoSuccess(res, file) {
            this.createForm.serviceProviderLogo = res.data.fullFilePath
        },
        //上传轮播图成功
        handleCarouselSuccess(res, file) {
            this.createChildForm1.childCarousel = res.data.fullFilePath
        },
        // 上传子logo成功
        handleChildLogoSuccess(res, file) {
            this.createChildForm1.childLogo = res.data.fullFilePath
        },
        //上传产品logo成功
        handleProductLogoSuccess(res, file) {
            this.forms.productLogo = res.data.fullFilePath
        },
        ensureUpPay(formName) {
            if (!this.payFrom.billNo.length) {
                return this.$message.warning('请上传凭证')
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$alert('请确认信息填写无误', '打款确认', {
                        confirmButtonText: '确定',
                        callback: action => {
                            dowfuUp(this.payFrom).then(res => {
                                this.$message.success('打款成功');
                                this.cancelUpPay('ruleForm')
                            })
                        }
                    });

                } else {
                    return false;
                }
            });
        },
        // 确定新增
        ensureAdd(type,formName,formName1,formName2){
                const ids = this.selectedTags.map(tag => tag.id);
                let result
                if (ids.length > 2) {
                    result = ids.join(',');
                } else {
                    result = ids.toString();
                }
                let idValue = Number(this.createForm.id) === 0 ? null : Number(this.createForm.id);
            if(type===1){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getInsertServiceCard({residentAgents:{
                            id:idValue,
                            title:this.createForm.serviceProviderName,
                            dscp:this.createForm.serviceProviderDescribe,
                            logo:this.createForm.serviceProviderLogo,
                            parentId:  this.createForm.serviceProviderType,
                            residentTagId:result,
                            displayGroup:this.createForm.serviceProviderMock
                        },
                        }).then(res => {
                            if (res.success) {
                                this.dialogCreateVisible = false;

                                this.$message.success('添加成功！')
                            } else {
                                this.$message.error(res.data)
                            }
                            this.selectedTags=[]
                        })
                    } else {
                        return false;
                    }
                });
            }
           else if(type===2){
                let allValid = true
               this.$refs[formName].validate((valid) => {
                   if(valid) {
                       console.log('校验成功！')
                   }
                   else {
                       allValid = false;
                       return false;
                   }
               })
                if(allValid){
                    this.$refs[formName1].validate((valid) => {
                        if (valid) {
                            getInsertServiceCard({residentAgents:{
                                    title:this.createForm.serviceProviderName,
                                    dscp:this.createForm.serviceProviderDescribe,
                                    logo:this.createForm.serviceProviderLogo,
                                    parentId:  this.createForm.serviceProviderType,
                                    residentTagId:result,
                                    displayGroup:this.createForm.serviceProviderMock
                                },
                                residentAgentsDesc:{
                                    tServiceDescLogoUrl:this.createChildForm1.childLogo,
                                    tAboutCompany:this.createChildForm1.childTitle,
                                    tBriefCompanyIntroduction:this.createChildForm1.childIntro,
                                    tButtonText:this.createChildForm1.childBtnTxt,
                                    tButtonLink:this.createChildForm1.childLink,
                                    tBackgroundImage:this.createChildForm1.childCarousel,
                                    tCorporateMission:this.createChildForm1.childPurpose
                                }
                            }).then(res => {
                                if (res.success) {
                                    this.dialogCreateVisible = false;
                                    this.$message.success('添加成功！')
                                } else {
                                    this.$message.error(res.data)
                                }
                                this.selectedTags=[]
                            })
                        } else {
                            return false;
                        }
                    });

                } else {
                    alert('请检查必填项!')
                }
            }
            else if(type===3){
                let allValid = true
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        console.log('校验成功！')
                    } else {
                         allValid = false
                        return false
                    }
                })
                this.$refs[formName1].validate((valid) => {
                    if(valid) {
                        console.log('校验成功！')
                    } else {
                        allValid = false
                        return false
                    }
                })
                if(allValid){
                    this.$refs[formName2].validate((valid) => {
                        if (valid) {
                            getInsertServiceCard({residentAgents:{
                                    id:idValue,
                                    title:this.createForm.serviceProviderName,
                                    dscp:this.createForm.serviceProviderDescribe,
                                    logo:this.createForm.serviceProviderLogo,
                                    parentId:  this.createForm.serviceProviderType,
                                    residentTagId:result,
                                    displayGroup:this.createForm.serviceProviderMock
                                },
                                residentAgentsDesc:{
                                    tServiceDescLogoUrl:this.createChildForm1.childLogo,
                                    tAboutCompany:this.createChildForm1.childTitle,
                                    tBriefCompanyIntroduction:this.createChildForm1.childIntro,
                                    tButtonText:this.createChildForm1.childBtnTxt,
                                    tButtonLink:this.createChildForm1.childLink,
                                    tBackgroundImage:this.createChildForm1.childCarousel,
                                    tCorporateMission:this.createChildForm1.childPurpose,
                                    cTitleOne:this.createChildForm2.h1Title,
                                    cTitleTwo:this.createChildForm2.h2Title,
                                    cTitleThree:this.createChildForm2.h3Title,
                                    cContent:this.createChildForm2.detailIntro,
                                }
                            }).then(res => {
                                if (res.success) {
                                    this.$message.success('添加成功！')
                                    this.dialogCreateVisible = false;
                                } else {
                                    this.$message.error(res.data)
                                }
                                this.selectedTags=[]
                            })
                        } else {
                            return false;
                        }
                    });
                } else {
                    alert('请检查必填项!')
                }
            }

        },
        handleRemove(row, file) {
            this.payFrom.billNo.splice(this.payFrom.billNo.indexOf(row.response.data.fullFilePath), 1)
        },

        //豆服税金
        dowfuPay() {
            this.dialogFormVisible = true;
        },
        getCondition() {
            getProviderApproveCondition().then(res => {
                this.filterOptions[0].options = res.data.serviceTypeList && res.data.serviceTypeList.length > 0 ? res.data.serviceTypeList.map(x => {
                    return {
                        label: x.typeName,
                        value: x.typeValue
                    };
                }) : [];
                this.filterOptions[2].options = res.data.serviceFeeTypeList && res.data.serviceFeeTypeList.length > 0 ? res.data.serviceFeeTypeList.map(x => {
                    return {
                        label: x.typeName,
                        value: x.typeValue
                    };
                }) : [];
            });
        },
        _getListFirstPage() {
            this.currentPage = 1;

            this._getList();
        },
        //重置
        handleConditionalReset() {

            this.filterOptions.forEach(item => {
                item.value = '';
            });
            this._getListFirstPage();
        },
        //查询
        handleColumnsFilter() {
            this.currentPage = 1;
            this._getList();
        },
        // 新建
        handleConditionalCreate(){
        this.dialogCreateVisible = true;
        getTag().then(res => {
            this.dynamicTags=res.data
        })
        },
        //切页
        handlePageChange(page) {
            console.log(page);
            this.currentPage = page;
            this._getList();
        },
        _openDetail(row) {
        },
        _getList() {
            let data = {
                current: this.currentPage,
                size: 10,
                serviceType: this.filterOptions[0].value,
                enterpriseType: this.filterOptions[1].value,
                serviceFeeType: this.filterOptions[2].value,
                approvedStatus: this.filterOptions[3].value,
                enterpriseName: this.filterOptions[4].value,
                brandName: this.filterOptions[5].value
            };
            getProviderApprove(data).then(res => {
                this.tableData = res.data.records.map(x => {
                    switch (x.approvedStatus) {
                        case 'CREATED':
                            x.approvedStatus = '审核中';
                            break;
                        case 'REJECTED':
                            x.approvedStatus = '审核拒绝';
                            break;
                        case 'CANCELLATION':
                            x.approvedStatus = '已作废';
                            break;
                        case 'ENABLED':
                            x.approvedStatus = '审核通过';
                    }
                    switch (x.serviceType) {
                        case 'LOGISTICS':
                            x.serviceType = '物流服务商';
                            break;
                        case 'ADVERTISING':
                            x.serviceType = '物流服务商';
                            break;
                        case 'ADVERTISING':
                            x.serviceType = '广告';
                            break;
                        case 'PURCHASE':
                            x.serviceType = '获取采购';
                            break;
                        case 'STORAGE':
                            x.serviceType = '仓储';
                            break;
                        case 'AGENCY_OPERATION':
                            x.serviceType = '代运营';
                            break;
                        case 'OTHER':
                            x.serviceType = 'OTHER';
                            break;
                    }
                    return x;
                });
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            console.log(val);
            this.$router.push({
                path: '/dhfq-provider-detail',
                query: {
                    id: val.id
                }
            });
        }
    },
    watch: {
        // 监听 createForm.id 的变化
        'createForm.id': function (newVal, oldVal) {
            this.flagId = newVal
        },
        editableTabsValue(newVal, oldVal) {
            this.$nextTick(()=>{
                if(this.$refs.collapseRef){
                    this.selectedChildTags=[]
                    this.$refs.collapseRef.activeNames=[]
                }
            })


        },
    },
};
</script>

<style scoped lang="scss">
.create-dialog ::v-deep .input-new-tag{
    margin-top: 3px!important;
    vertical-align: top!important;
}
.showBox{
    width: 100%;
    .showBox_content{
        border-radius:8px;
        box-shadow: #f5f5f5 3px 3px 2px 3px;
        position: relative;
        width: 304px;
        height: 260px;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
        .item-card-top{
            display: flex;
            justify-content: space-between;
            height: 60px;
            .card-logo{
               width:  150px;
                height: 40px;
            }
            .card-tag{
                width: 114px;
                height: 40px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .tag-list {
                    margin-left: 5px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    height: 27px;
                    border-radius: 4px;
                    padding: 2px 8px 2px 8px;
                    font-size: 15px;
                    font-weight: 600;
                    text-align: center;
                }
            }
        }
        .item-card-center{
            margin-top: 15px;
            height: 80px;
            .item-card-center-title{
                font-family: "Source Han Sans CN";
                height: 20px;
                font-size: 14px;
                color: #222222;
            }
            .item-card-center-desc{
                margin-top: 5px;
                font-family: "Source Han Sans CN";
                font-size: 12px;
                line-height: 18px;
                color: #999999;
            }
        }
        .item-card-bottom{
            position: relative;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Source Han Sans CN;
            font-weight: 600;
            font-size: 16px;
            color: #1F6DF2;
            margin-top: 20px;
            height: 44px;
            background-color: #f7f9fc;
            border-radius: 8px;
        }
    }
    .showBox_content::before{
        content: "";
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #EEF0F3;
        z-index: 1;
    }

}
.item-card1{
    display: flex;
    column-gap: 150px;
    .item-card1-left{
        margin: 50px 0;
    }
    .item-card1-right{
        position: relative;
        .item-card1-right-about{
            position: absolute;
            top: 0;
            box-sizing: border-box;
            padding: 60px;
            width: 100%;
            height: 100%;
            left: 0;
        }
        .item-card1-right-purpose{
            margin-top: 60px;
            font-family: DingTalk JinBuTi;
            font-weight: 500;
            font-style: italic;
            font-size: 32.08px;
            line-height: 100%;
            letter-spacing: 0;
            text-align: justify;
            color: #000000
        }
    }
    .item-card1-left-top{
        display: flex;
        .card1-left-top-txt{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 20px;
        }
        .card1-left-top-title{
            font-family: Source Han Sans CN;
            font-weight: 700;
            font-size: 22px;
            line-height: 100%;
            text-align: justify;
            color: #222222;
        }

    }
    .card1-left-top-desc{
        max-width: 391px;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0;
        color:#999999;
    }
    .item-card-left-bottom{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        height: 56px;
        width: 379px;
        border-radius: 8px;
        text-align: center;
        background-color: #1F6DF2;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0;
        color: #fff;
    }
}
.item-card2{
    padding-left: 20px;
    height: 239px;
    .item-card2-top{
        font-family: Source Han Sans CN;
        font-weight: 700;
        font-size: 26px;
        line-height: 39px;
        letter-spacing: 0;
        text-align: justify;
        color: #222222;
    }
    .item-card2-center{
        margin-top: 10px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        font-size: 16px;
        line-height: 32px;
        letter-spacing: 0;
        text-align: justify;
        color: #222222;
        .circle{
            margin-right: 5px;
            transform: translateY(5px);
            display: inline-block;
            width: 5px;
            height: 21px;
            border-radius: 13px;
            background: linear-gradient(154.9deg, #8061FE -16.92%, #0062F7 54.06%, #11FFF4 125.04%);
        }
    }
    .item-card2-bottom{
        margin-top: 8px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: justify;
        color: rgba(51, 51, 51, 0.6);


    }
}
.item-card3{
    width: 386px;
    height: 344px;
    border-radius: 24px;
     border: 2px solid #F4F4F5;
.item-card3-top{
    margin-top: 40px;
    margin-left: 25px;
}
    .item-card3-title{
        margin-top: 15px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        font-size: 24px;
        line-height: 150%;
        letter-spacing: 0;
        color: #0A112F;
    }
    .item-card3-intro{
        margin-top: 5px;
        padding-right: 28px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.5);

    }
    .item-card3-tagList{
        margin-top: 20px;
        display: flex;
        column-gap: 10px;
        height: 30px;
    }
    .item-card3-btn{
        display: flex;
        align-items: center;
        margin-top: 70px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #1A5DFF;
        .right-arrow{
            box-sizing: border-box;
            width: 20px;
            height: 20px;
            background: url("../../../assets/right-arrow.svg")  no-repeat;
            background-size: contain;
        }
    }
    .item-card3-tag{
        padding: 5px;
        border-radius: 4px;
    }
}
.selectedChild3Tag{
    border: 1px solid #333333;
}
.child3{
    max-height: 600px ;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
}
.child3Tag{
    display: flex;
    column-gap: 10px;
    div{
        width: 32px;
        height: 32px;
    }
}
::v-deep .el-upload--text {
    width: 100px; ;
    height: auto !important;
    border: none !important;
}
::v-deep .create-btn{
   background-color: #333333;
    color: #FFFFFF;
}

.create-dialog{
    ::v-deep .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9!important;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    ::v-deep .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    ::v-deep .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    ::v-deep .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    ::v-deep .el-tag--small{
        margin-right: 10px;
    }
    ::v-deep  .el-upload--text{
        width: 100px;
        height: 100px;
    }
    .el-tag + .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;
    }
    ::v-deep .el-tag{
        background-color: #FFFFFF;
        color: #999999;
        border: none;
        font-weight:  700;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    ::v-deep .el-tag--small{
        height: 32px;
        line-height: 32px;
    }
    .choose-tagColor1{
        width: 300px;
        height: 35px;
        display: flex;
        align-items: center;
        column-gap: 10px;
        .tag-txt-color1{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color: #0566be;
        }
        .tag-txt-color2{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color: #ff6e6e;
        }
        .tag-txt-color3{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color:   #ffd25d;
        }
        .tag-bg-color1{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color:   #f1f5ff;
        }
        .tag-bg-color2{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color:   #fff5f5;
        }
        .tag-bg-color3{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color:   #fef6e2;
        }

        .activeTxtColor{
            border: 1px solid #666;
        }

    }
    .choose-tagColor{
        width: 300px;
        height: 35px;
        display: flex;
        align-items: center;
        column-gap: 10px;
        .tag-color1{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color: #fff5f5;
        }
        .active1{
            border: 1px solid #faa6a6;
        }
        .active2{
            border: 1px solid #fae09f;
        }
        .tag-color2{
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 32px;
            background-color: #fef6e2;
        }

    }
    .choose-tagColor::after {
        content: '热门/推荐服务商可选红色，其他服务商类型选橙色';
        font-size: 12px;
        width: 300px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 32px;
    }
}
.create-dialog-footer{
    height: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
.el-icon-check {
    margin-left: 5px; /* 添加一些间距 */
}
.input-tip {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #999;
    opacity: 0;
    transition: opacity 0.3s;
}
.input-tip.tip-visible {
    opacity: 1;
}
.tiny-button{
    margin-left: 10px;
   transform: translateY(3px);
}
::v-deep .el-form-item__label{
    line-height: 14px;
}
.more{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
.id{
    position: relative;
    ::v-deep  .el-input__inner{
        width: 250px!important;
    }

}
.cxbyid{
    position: absolute;
    top: 0;
    right: 100px;
    height: 32px;
    width: 32px;
}
.provider_example1{
    width: 410px;
    height: 133px;
}
.provider_example2{
    width: 410px;
    height: 120px;
}
.provider_example3{
    width: 210px;
    height: 210px;
}
</style>