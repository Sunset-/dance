<template>
	<div class="login-container">
		<div class="login-left">
			<img src="/assets/img/login/login-bg.png"/>
			<div class="login-logo">
				<img src="/assets/img/login/login-logo.png"/>
				<div class="login-logo-title">
					<div>后台管理系统</div>
					<div>Backstage management system</div>
				</div>
			</div>
		</div>
		<!--登录页-->
		<div class="login-right">
			<div class="login-content">
				<div class="login-title">
					<div class="login-title-name">登录</div>
					<div class="login-title-line"></div>
				</div>
				<div class="login-user">
					<div :class="{'login-error': loginError}">
						<img src="/assets/img/login/login-user.png" v-if="!loginError"/>
						<img src="/assets/img/login/login-user-error.png" v-if="loginError"/>
						<input @keydown="hideTip" type="text" v-model="unserName" class="login-user-name" placeholder="请输入图灵机器人的工作邮箱">
					</div>
				</div>
				<div class="login-confirm-user-error" v-if="!unserName&&loginValueEmpty&&!loginError ||!unserName&&forgetValueEmpty">邮箱地址不能为空</div>
				<div class="login-confirm-user-error" v-if="forgetUser">工作邮箱地址错误</div>
				<div class="login-password">
					<div :class="{'login-error': loginError}">
						<img src="/assets/img/login/login-password.png" v-if="!loginError"/>
						<img src="/assets/img/login/login-password-error.png" v-if="loginError"/>
						<input type="password" v-model="pwd" class="login-password-name" placeholder="请输入登录密码" @keyup.13="loginHandle">
					</div>
				</div>
				<div class="login-confirm-password-error" v-if="!pwd&&loginValueEmpty&&!loginError&&!forgetUser">密码不能为空</div>
				<div class="login-confirm-password-error" v-if="loginError">邮箱或密码输入错误</div>
				<div class="login-forget-password">
					<span @click="handleStatus">忘记密码</span>
				</div>
				<div class="login-btn" @click="loginHandle">登录</div>
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
		return {
            unserName:	'',
            pwd: '',
			loginValueEmpty: false,		//点击登录检验是否填值了
			loginError: false,	//登录验证错误
			loginTime: 2,
			forgetUser: false,		//忘记密码时校验用户名
			forgetValueEmpty: false,	//忘记密码时检验用户名是否填了
		};
	},
	mounted(){
	  	this.unserName = window.sessionStorage.getItem("username");
	},
	methods: {
	    //输入内容时不显示错误提示
        hideTip(){
            this.loginError = false;
            this.forgetUser = false;
		},
	    //显示忘记密码页
        handleStatus(status){
            if(!this.unserName){
                this.forgetValueEmpty =  true;
				return;
			}
            $http({
                url: "dance/forget_pwd",
                type: "GET",
				data: {
                    email: this.unserName,
                    reset_url: window.location.href
				}
            }).then(res=>{
                if(res && res.msg && res.msg.email && res.msg.email[0] == '请输入合法的邮件地址。'){
                    this.forgetUser = true;
					return;
				}
				if(res && res.msg == "The email has been sent." || res && res.msg=="ok"){
					$tip(`重置密码验证链接已发送，请前往${this.unserName}邮箱验证`,"warning")
				}
            }).catch(error=>{
                console.log(error);
            });
		},
		//登录操作
        loginHandle(){
            if(!this.unserName || !this.pwd){
                this.loginValueEmpty = true;
                return;
			}
			$http({
                url: "dance/jwt_auth",
                type: "POST",
                data: {
                    username: this.unserName,
                    password: this.pwd
                }
            }).then(userInfo => {
                if(userInfo){
					window.sessionStorage.setItem("user",userInfo.token);
					window.sessionStorage.setItem("username",this.unserName);
					$tools.setCookie("Authorization",`JWT ${userInfo.token}`);
                    $router.push({path:"/course"});
				}
            }).catch(error=>{
                if(error){
                    this.loginError = true;
                    this.pwd = '';
				}
			})
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
		position: relative;
		&>img{
			width: 100%;
			height: 100%;
		}
		.login-logo{
			position: absolute;
			width: 450px;
			height: 100px;
			top: 50px;
			left: 50px;
			img{
				float: left;
				width: 60px;
				height: 60px;
				margin-top: 10px;
			}
			.login-logo-title{
				float: left;
				margin-left: 15px;
				div:nth-child(1){
					font-size: 40px;
					color: #ffffff;
					height: 50px;
					font-family: "FZCQJW--GB1-0";
				}
				div:nth-child(2){
					font-size: 24px;
					color: #ffffff;
				}
			}
		}
	}
	.login-right{
		width: 40%;
		height: 100%;
		float: left;
		position: relative;
		z-index: 10;
		.login-content{
			position: absolute;
			top: 10%;
			left: 15%;
			width: 75%;
			height: 60%;
			text-align: center;
			.login-title{
				width: 100%;
				height: 80px;
				margin: 0px auto;
				padding: 40px 0;
				text-align: center;
				.login-title-name{
					font-size: 40px;
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
				width: 100%;
				height: 80px;
				margin: 0px auto;
				padding: 20px 0;
				img{
					width:16.7%;
					height: 80px;
					float: left;
				}
				.login-user-name{
					width: 65%;
					height: 78px;
					float: left;
					background: #eff2f5;
					border: none;
					outline: none;
					padding-left: 45px;
					font-size: 24px;
				}
				.login-error{
					border: 1px solid #DC3030;
					height: 80px;
					background: #eff2f5;
				}
			}
			.login-password{
				width: 100%;
				height: 80px;
				margin: 0px auto;
				padding: 20px 0;
				img{
					width:	16.7%;
					height: 80px;
					float: left;
				}
				.login-password-name{
					width: 65%;
					height: 78px;
					float: left;
					background: #eff2f5;
					border: none;
					outline: none;
					padding-left: 45px;
					font-size: 24px;
				}
				.login-error{
					border: 1px solid #DC3030;
					height: 80px;
					background: #eff2f5;
				}
			}
			.login-confirm-user-error{
				font-size: 20px;
				color: #DC3030;
				width: 100%;
			}
			.login-confirm-password-error{
				font-size: 20px;
				color: #DC3030;
				width: 100%;
			}
			.login-forget-password{
				width: 90%;
				height: 80px;
				line-height: 40px;
				margin: 0 auto;
				font-size: 20px;
				text-align: right;
				color: #999999;
				span{
					cursor: pointer;
					&:hover{
						color: #3298F7;
					}
				}
			}
			.login-btn{
				width: 100%;
				height: 80px;
				line-height: 80px;
				background: linear-gradient(#2F7CEF, #3298F7);
				margin: 0 auto;
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
	.login-bottom{
		position: absolute;
		width: 55%;
		height: 30%;
		right: 0;
		bottom: 0;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.login-success-layer{
		width: 100%;
		height: 100%;
		background: rgba(170, 170, 170, 0.25);
		position: absolute;
	}
	.login-success-dialog{
		width: 520px;
		height: 300px;
		background: #fff;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 5;
		text-align: center;
		div:nth-child(1){
			font-size: 30px;
			font-weight: bold;
			color: #8B94A6;
			padding-top: 40px;
		}
		div:nth-child(2){
			font-size: 22px;
			color: #B1B9C8;
			padding-top: 30px;
		}
		img{
			width: 100px;
			height: 100px;
			padding-top: 30px;
		}
	}
}
</style>
