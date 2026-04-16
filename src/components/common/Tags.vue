<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item, index) in tagsList" :class="{ 'active': isActive(item.path) }" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{ item.title }}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" style="border:none;background:#282829;color: rgba(255, 255, 255, 0.9);">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import bus from './bus';
export default {
    data() {
        return {
            tagsList: []
        }
    },
    methods: {
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path);
            } else {
                this.$router.push('/');
            }
        },
        // 关闭全部标签
        closeAll() {
            this.tagsList = [];
            this.$router.push('/');
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            })
            this.tagsList = curItem;
        },
        // 设置标签
        setTags(route) {
            const isExist = this.tagsList.some(item => {
                return item.path === route.fullPath;
            })
            if (!isExist) {
                if (this.tagsList.length >= 13) {
                    this.tagsList.shift();
                }
                this.tagsList.forEach((item, index) => {
                    if (item.path.includes(route.matched[1].path)) {
                        // isOk=0
                        this.tagsList.splice(index, 1)
                    }
                })
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                })
            }
            bus.$emit('tags', this.tagsList);

        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        }
    },
    computed: {
        showTags() {
            return this.tagsList.length > 0 && this.tagsList[0].path !== '/customer-owner';
        }
    },
    watch: {
        $route(newValue, oldValue) {
            let isOk = 1
            // console.log(newValue);


            this.setTags(newValue);


        }
    },
    created() {
        this.setTags(this.$route);
        // 监听关闭当前页面的标签页
        bus.$on('close_current_tags', () => {
            for (let i = 0, len = this.tagsList.length; i < len; i++) {
                const item = this.tagsList[i];
                if (item.path === this.$route.fullPath) {
                    if (i < len - 1) {
                        this.$router.push(this.tagsList[i + 1].path);
                    } else if (i > 0) {
                        this.$router.push(this.tagsList[i - 1].path);
                    } else {
                        this.$router.push('/');
                    }
                    this.tagsList.splice(i, 1);
                    break;
                }
            }
        })
    }
}

</script>


<style>
.tags {
    position: relative;
    height: 32px;
    overflow: hidden;
    background: #282829;
    padding-right: 120px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border-top: 2px solid black;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    /* margin: 12px 5px 2px 3px; */
    margin-left: 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #111111;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: rgba(255, 255, 255, 0.6);
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
    /* width: 90px; */
    height: 28px;
    border-radius: 10px;
    text-align: center;
    border: none;
}

.tags-li:not(.active):hover {
    background: #74686B;
    color: #409EFF
}

.tags-li:hover>.tags-li-title {
    color: #ffffff;
}


.tags-li.active .tags-li-title {
    color: #fff;
}

.el-icon-close {
    line-height: 2.5;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0px;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #282829;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
}
</style>
