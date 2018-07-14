<template>
	<div class="login-container">
		<div class="login-left">
			<img src="/assets/img/login/login-bg.png"/>
		</div>
		<div class="login-right">
			<div class="login-content">
				<div class="login-title">
					<div class="login-title-name">登录</div>
					<div class="login-title-line"></div>
				</div>
				<div class="login-user">
					<img src="/assets/img/login/login-user.png"/>
					<input type="text" class="login-user-name" placeholder="请输入图灵机器人的工作邮箱">
				</div>
				<div class="login-password">
					<img src="/assets/img/login/login-password.png"/>
					<input type="text" class="login-password-name" placeholder="请输入登录密码">
				</div>
				<div class="login-forget-password">忘记密码</div>
				<div class="login-btn">登录</div>
			</div>
		</div>
		<div class="login-bottom">
			<img src="/assets/img/login/login-water.png"/>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		login() {
			$router.push("/");
		}
	}
};
</script>
<style lang='less'>
@import "~src/style/variable.less";

.login-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	.login-left{
		width: 60%;
		height: 100%;
		float: left;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.login-right{
		width: 40%;
		height: 100%;
		float: left;
		position: relative;
		.login-content{
			position: absolute;
			top: 15%;
			left: 15%;
			width: 70%;
			height: 60%;
			text-align: center;
			.login-title{
				width: 80%;
				height: 80px;
				margin: 40px auto;
				.login-title-name{
					font-size: 40px;
					font-family: "Microsoft YaHei";
					color: #333333;
				}
				.login-title-line{
					width: 60px;
					height: 4px;
					background-color: #cfdbe7;
					margin: 15px auto;
				}
			}
			.login-user{
				width: 80%;
				height: 80px;
				margin: 40px auto;
				img{
					width: 100px;
					height: 80px;
					float: left;
				}
				.login-user-name{
					width: 390px;
					height: 78px;
					float: left;
					background: #eff2f5;
					border: none;
					outline: none;
					padding-left: 45px;
					font-size: 24px;
				}
			}
			.login-password{
				width: 80%;
				height: 80px;
				margin: 40px auto;
				img{
					width: 100px;
					height: 80px;
					float: left;
				}
				.login-password-name{
					width: 390px;
					height: 78px;
					float: left;
					background: #eff2f5;
					border: none;
					outline: none;
					padding-left: 45px;
					font-size: 24px;
				}
			}
			.login-forget-password{
				width: 80%;
				height: 80px;
				margin: 0 auto;
				font-size: 20px;
				text-align: right;
				color: #999999;
				font-family: "Microsoft YaHei";
			}
			.login-btn{
				width: 80%;
				height: 80px;
				line-height: 80px;
				background: linear-gradient(#2F7CEF, #3298F7);
				margin: 0 auto;
				border-radius: 40px;
				color: #ffffff;
				box-shadow:0 0 20px rgba(50,152,247,0.45);
				font-size: 24px;
			}
		}
	}
	.login-bottom{
		position: absolute;
		width: 55%;
		height: 40%;
		right: 0;
		bottom: 0;
		img{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
