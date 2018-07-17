
<template>
	<div class="app-container">
		<header class="app-header">
			<div class="header-logo">
				<img src="/assets/img/login/mark-logo.png"/>
				<div class="header-logo-title">后台管理系统</div>
			</div>
			<div class="login-user-info">
				<img src="/assets/img/login/head-img.png" alt="">
				<span>张三</span>
				<span @mouseover="handlePanel"></span>
			</div>
			<div class="edit-user" v-if="showPanel">
				<div class="handle-change-password">
					<img src="/assets/img/login/edit-password.png"/>
					<div @click="changePassword">修改密码</div>
				</div>
				<div class="handle-quit">
					<img src="/assets/img/login/quit.png"/>
					<div>退出</div>
				</div>
			</div>
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
		<div class="pwd-dialog-layer" v-if="showDialog">
			<div class="pwd-dialog">
				<img class="close-password-dialog" src="/assets/img/login/click-close.png" alt="" @click="close">
				<div class="edit-password-title">
					<div class="edit-password-title-name">修改密码</div>
					<div class="edit-password-title-line"></div>
				</div>
				<div>
					<img src="/assets/img/login/login-password.png" alt="">
					<input type="password" class="edit-password" placeholder="请输入当前密码" v-model="currentPwd">
					<div class="empty-pwd" v-if="!currentPwd&&passwordEmpty">输入不能为空</div>
				</div>
				<div>
					<img src="/assets/img/login/login-password.png" alt="">
					<input type="password" class="edit-password" placeholder="请输入当新密码" v-model="newPwd">
					<div class="empty-pwd" v-if="!newPwd&&passwordEmpty">新密码不能为空</div>
				</div>
				<div>
					<img src="/assets/img/login/login-confim-password.png" alt="">
					<input type="password" class="edit-password" placeholder="请再次输入新密码" v-model="confirmNewPwd">
					<div class="empty-pwd" v-if="!confirmNewPwd&&passwordEmpty">确认密码不能为空</div>
					<div class="empty-pwd" v-if="passwordSome">两次输入密码不一致</div>
				</div>
				<div class="edit-confirm-password" @click="confirm">确认</div>
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
			showPanel: false,	//显示修改、退出操作板
			showDialog: false,	//显示修改密码弹框
            currentPwd: '',	//当前密码
            newPwd: '',	//当前新密码
            confirmNewPwd: '',	//确认新密码
            passwordEmpty: false,		//点击确认检验密码是否填值了
			passwordSome: false,	//校验新密码是否一致

			// headerMenus: [
			// 	{
			// 		title: "修改密码",
			// 		operate: () => {}
			// 	},
			// 	{
			// 		title: "安全退出",
			// 		operate() {}
			// 	}
			// ]
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
		},
        handlePanel(){
            this.showPanel = !this.showPanel;
		},
		//修改密码
        changePassword(){
			this.showDialog = true;
		},
		//关闭弹窗
        close(){
            this.showDialog = false;
		},
		//确认修改密码
        confirm(){
			if(!this.currentPwd || !this.newPwd || !this.confirmNewPwd){
                this.passwordEmpty = true;
			    return
			}
			if(this.newPwd != this.confirmNewPwd){
                this.passwordSome = true;
			    return
			}
            $http({
                url: "dance/modify_pwd",
                type: "POST",
                data: {
                    old_password: this.currentPwd,
                    password1: this.newPwd,
                    password2: this.confirmNewPwd
                }
            }).then(data=>{
                console.log(data);
			});

		}
	},
};
</script>
<style lang="scss">
//头部高度
$header-height: 89px;
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
		background: #fff;
		font-size: 13pt;
		padding: 0px 15px;
		box-shadow: 0px 0px 480px rgba(#8c8c8c, 0.15);
		position: relative;
		.header-logo{
			position: absolute;
			width: 240px;
			height: 80px;
			top: 20px;
			left: 50px;
			img{
				float: left;
				width: 40px;
				height: 40px;
			}
			.header-logo-title{
				float: left;
				margin-left: 15px;
				font-size: 26px;
				color: #333;
				height: 40px;
				line-height: 40px;
				width: 160px;
				font-family: "FZCQJW--GB1-0";
			}
		}
		.login-user-info{
			position: absolute;
			right: 0;
			top: 20px;
			width: 150px;
			height: 80px;
			img{
				width: 40px;
				height: 40px;
				float: left;
			}
			span:nth-child(2){
				display: inline-block;
				width: 40px;
				height: 40px;
				line-height: 40px;
				float: left;
				color: #333;
				margin-left: 10px;
			}
			span:nth-child(3){
				border-top: 10px solid #000;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-bottom: 10px solid transparent;
				display: inline-block;
				cursor: pointer;
				float: left;
				margin-top: 12px;
			}
		}
		.edit-user{
			width: 120px;
			height: 100px;
			background: #fff;
			position: absolute;
			display: inline-block;
			top: 90px;
			right: 30px;
			z-index: 10;
			.handle-change-password, .handle-quit{
				color: #333;
				font-size: 14px;
				float: left;
				width: 100%;
				height: 40px;
				padding: 10px;
				cursor: pointer;
				&:hover{
					color: #3298F7;
				}
				img{
					width: 20px;
					height: 20px;
					float: left;
				}
				div{
					float: left;
					height: 20px;
					line-height: 20px;
					width: 60px;
					margin-left: 10px;
				}
			}
		}
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
	.pwd-dialog-layer{
		width: 100%;
		height: 100%;
		background: rgba(170, 170, 170, 0.25);
		position: absolute;
		top: 0;
		.pwd-dialog{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background: #fff;
			width: 460px;
			height: 580px;
			padding: 20px 50px;
			text-align: center;
			.close-password-dialog{
				float: right;
				width: 15px;
				height: 15px;
				cursor: pointer;
			}
			&>div{
				width: 460px;
				height: 80px;
				padding: 20px 0px;
				img{
					width: 80px;
					height: 80px;
					float: left;
				}
				.edit-password{
					width: 330px;
					height: 78px;
					float: left;
					background: #eff2f5;
					border: none;
					outline: none;
					padding-left: 45px;
					font-size: 20px;
				}
				.empty-pwd{
					color: red;
					text-align: left;
					margin-left: 130px;
					padding-top: 5px;
					clear: both;
				}
			}
			.edit-password-title{
				padding-top: 20px;
				padding-bottom: 0;
				.edit-password-title-name{
					font-size: 30px;
					color: #333333;
				}
				.edit-password-title-line{
					width: 60px;
					height: 3px;
					background-color: #cfdbe7;
					margin: 15px auto;
				}
			}
			.edit-confirm-password{
				height: 20px;
				line-height: 20px;
				background: linear-gradient(#2F7CEF, #3298F7);
				margin-top: 20px;
				border-radius: 40px;
				color: #ffffff;
				box-shadow:0 0 20px rgba(50,152,247,0.45);
				font-size: 24px;
				cursor: pointer;
				&:hover{
					background: #3298F7
				}
			}
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