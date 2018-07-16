
<template>
	<div class="app-container">
		<header class="app-header">
			<span>后台管理系统</span>
		</header>
		<div class="app-content">
			<div class="app-sidebar">
				<ul class="app-menu">
					<li :class="{active : activeMenu(item)}" v-for="(item,index) in menus" :key="index" @click="go(item)">{{item.title}}</li>
				</ul>
			</div>
			<div class="app-major">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			menus: [
				{
					title: "课程管理",
					name: "course"
				},
				{
					title: "指令管理",
					name: "directive"
				}
			],
			currentUser: null,
			headerMenus: [
				{
					title: "修改密码",
					operate: () => {}
				},
				{
					title: "安全退出",
					operate() {}
				}
			]
		};
	},
	methods: {
		go(item) {
			$router.push({ name: item.name });
		},
		activeMenu(item) {
			return ~this.$route.path.indexOf(item.name);
		},
		changeSideWidth(leftWidth) {
			this.$refs.container.changeSideWidth(leftWidth);
		}
	},
	ready() {}
};
</script>
<style lang="scss">
//头部高度
$header-height: 45pt;
$sidebar-width: 227px;

.app-container {
	width: 1920px;
	margin: 0px auto;
	height: 100%;
	position: relative;
	.app-header {
		height: $header-height;
		line-height: $header-height;
		color: #333333;
		font-size: 13pt;
		padding: 0px 15px;
		box-shadow: 0px 0px 12pt rgba(#8c8c8c, 0.2);
	}
	.app-content {
		position: absolute;
		top: $header-height;
		right: 0px;
		left: 0px;
		bottom: 0px;
		.app-sidebar {
			position: absolute;
			top: 0px;
			bottom: 0px;
			left: 0px;
			width: $sidebar-width;
			background-image: url("/assets/img/sidebar-bg.png");
		}
		.app-major {
			position: absolute;
			top: 0px;
			bottom: 0px;
			left: $sidebar-width;
			right: 0px;
		}
	}

	.app-menu {
		width: 100%;
		li {
			padding: 15px 20px;
			cursor: pointer;
			color: #fff;
			&:hover,
			&.active {
				background: rgba(#fff, 0.3);
			}
		}
	}
}
</style>