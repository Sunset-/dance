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
		<div class="login-right" v-if="showStatus=='login'">
			<div class="login-content">
				<div class="login-title">
					<div class="login-title-name">登录</div>
					<div class="login-title-line"></div>
				</div>
				<div class="login-user">
					<div :class="{'login-error': loginError}">
						<img src="/assets/img/login/login-user.png" v-if="!loginError"/>
						<img src="/assets/img/login/login-user-error.png" v-if="loginError"/>
						<input type="text" v-model="unserName" class="login-user-name" placeholder="请输入图灵机器人的工作邮箱">
					</div>
				</div>
				<div class="login-confirm-user-error" v-if="!unserName&&loginValueEmpty&&!loginError">邮箱地址不能为空</div>
				<div class="login-confirm-user-error" v-if="loginError">工作邮箱地址错误</div>
				<div class="login-password">
					<div :class="{'login-error': loginError}">
						<img src="/assets/img/login/login-password.png" v-if="!loginError"/>
						<img src="/assets/img/login/login-password-error.png" v-if="loginError"/>
						<input type="password" v-model="pwd" class="login-password-name" placeholder="请输入登录密码">
					</div>
				</div>
				<div class="login-confirm-password-error" v-if="!pwd&&loginValueEmpty&&!loginError">密码不能为空</div>
				<div class="login-confirm-password-error" v-if="loginError">密码输入错误</div>
				<div class="login-forget-password">
					<span @click="handleStatus('forgetPassword')">忘记密码</span>
				</div>
				<div class="login-btn" @click="loginHandle">登录</div>
			</div>
		</div>
		<!--忘记密码页-->
		<div class="login-right" v-if="showStatus=='forgetPassword'">
			<div class="login-content">
				<div class="login-title">
					<div class="login-title-name">忘记密码</div>
					<div class="login-title-line"></div>
				</div>
				<div class="login-user">
					<img src="/assets/img/login/login-password.png"/>
					<input type="password" v-model="newPwd" class="login-user-name" placeholder="请输入新密码">
				</div>
				<div class="login-password">
					<img src="/assets/img/login/login-confim-password.png"/>
					<input type="password" v-model="confirmNewPwd" class="login-password-name" placeholder="请再次输入新密码">
				</div>
				<div class="login-forget-password"></div>
				<div class="login-btn" @click="confirmHandle">确认</div>
			</div>
		</div>
		<div class="login-bottom">
			<img src="/assets/img/login/login-water.png"/>
		</div>
		<div class="login-success-layer" v-if="loginLoading">
			<div class="login-success-dialog">
				<div>登录成功</div>
				<div>{{loginTime}}秒回后自动跳转</div>
				<img src="/assets/img/login/login-loading.png"/>
			</div>
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
			loginLoading: false,	//登录成功加载
			loginError: false,	//登录验证错误
			loginTime: 2,
            newPwd: '',		//新密码
			confirmNewPwd: '',	//确认新密码
		    showStatus: 'login'		//展示页状态控制
		};
	},
	methods: {
	    //显示忘记密码页
        handleStatus(status){
			this.showStatus = status;

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
                    this.loginLoading = true;
                    var time = window.setInterval(()=>{
                        this.loginTime--;
                        if(this.loginTime==0){
                            window.clearInterval(time);
                            $router.push({path:"/course"});
                        }
                    },1000);
				}
            }).catch(error=>{
                if(error){
                    this.loginError = true;
                    this.unserName = '';
                    this.pwd = '';
				}
			})
		},
		//确认修改密码操作
        confirmHandle(){
            $http({
				url: "dance/forget_pwd",
				type: "GET"
			}).then(res=>{
			    console.log(123);
			}).catch(error=>{
                console.log(456);
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
		.login-content{
			position: absolute;
			top: 10%;
			left: 15%;
			width: 70%;
			height: 60%;
			text-align: center;
			.login-title{
				width: 580px;
				height: 80px;
				margin: 0px auto;
				padding: 40px 0;
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
				width: 580px;
				height: 80px;
				margin: 0px auto;
				padding: 20px 0;
				img{
					width: 100px;
					height: 80px;
					float: left;
				}
				.login-user-name{
					width: 432px;
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
				}
			}
			.login-password{
				width: 580px;
				height: 80px;
				margin: 0px auto;
				padding: 20px 0;
				img{
					width: 100px;
					height: 80px;
					float: left;
				}
				.login-password-name{
					width: 432px;
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
				}
			}
			.login-confirm-user-error{
				font-size: 20px;
				color: #DC3030;
				width: 580px;
			}
			.login-confirm-password-error{
				font-size: 20px;
				color: #DC3030;
				width: 580px;
			}
			.login-forget-password{
				width: 580px;
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
				width: 580px;
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
