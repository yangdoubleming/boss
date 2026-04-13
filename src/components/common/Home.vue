<template>
	<div class="wrapper">
		<v-sidebar></v-sidebar>
		<div :class="{ 'content-collapse': collapse, 'bbbg': !colorTwo, 'content-box': colorTwo, }">
			<v-head></v-head>
			<v-tags></v-tags>
			<div class="content">
				<transition name="move" mode="out-in">
					<keep-alive :include="tagsList">
						<router-view></router-view>
					</keep-alive>
				</transition>
				<el-backtop target=".content"></el-backtop>
				<iframe v-show="$route.name === 'amazon-data'" src="https://bossv1.dowsure.com/#/home"
					style="height:1200px;" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0"
					scrolling="yes" allowtransparency="yes"></iframe>
				<iframe v-show="$route.name === 'widgets'" :src="widgetsUrl" style="height:1200px;" width="100%"
					frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes"
					allowtransparency="yes"></iframe>
			</div>
		</div>
	</div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';

import bus from './bus';
import router from '../../router/index';
export default {
	data() {
		return {
			tagsList: ',minecraft,',
			// tagsList: '',
			collapse: false,
			colorTwo: true,
			color: "",
			show: localStorage.getItem('openShow'),
			title: "",
			keepAliveView: '',
			widgetsUrl: process.env.VUE_APP_WIDGETS,
		};
	},
	components: {
		vHead,
		vSidebar,
		vTags,

	},
	methods: {
		changeTitle: function (str) {
			this.title = str

		},
		childEvent(str) {
		},

	},
	mounted() {
		// console.log(this.$children[3].colorTwo)
		if (this.color == 2) {
			this.colorTwo = false
		} else {
			this.colorTwo = true
		}
	},
	watch: {
		'$route'(to, from) {
			if (to.meta.color == 2) {
				this.colorTwo = false
			} else {
				this.colorTwo = true
			}

		},
	},

	created() {
		// this.getKeepAliveView();
		this.changeTitle(),
			this.childEvent(),
			bus.$on('collapse-content', (msg) => {
				this.collapse = msg;
				this.$store.commit('changeCollapse', msg)
			});
		let arr = []
		router.options.routes[1].children.forEach(item => {
			if (item.meta.myKeepAlive) {
				arr.push(item.name)
			}
		})
		this.tagsList = ',' + arr.join(',')
		this.color = this.$route.meta.color

		// console.log(this.tagsList);
		// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
		// bus.$on('tags', (msg) => {
		//     console.log(msg);
		//     let arr = [];
		//     // for (let i = 0, len = msg.length; i < len; i++) {
		//     //     msg[i].name && arr.push(msg[i].name);
		//     // }

		//     // this.tagsList = arr;
		//     // this.tagsList.push('minecraft')
		// });
	}
};
</script>
