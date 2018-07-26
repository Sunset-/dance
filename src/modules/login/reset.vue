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
		<!--忘记密码页-->
		<div class="login-right">
			<div class="login-content">
				<div class="login-title">
					<div class="login-title-name">忘记密码</div>
					<div class="login-title-line"></div>
				</div>
				<div class="login-user">
					<img src="/assets/img/login/login-password.png"/>
					<input type="password" v-model="newPwd" @keydown="hideTip" class="login-user-name" placeholder="请输入新密码">
				</div>
				<div class="login-confirm-password-error" v-if="!newPwd&&passwordEmpty">新密码不能为空</div>
				<div class="login-password">
					<img src="/assets/img/login/login-confim-password.png"/>
					<input type="password" v-model="confirmNewPwd" @keydown="hideTip" class="login-password-name" placeholder="请再次输入新密码">
				</div>
				<div class="login-confirm-password-error" v-if="!confirmNewPwd&&passwordEmpty">确认密码不能为空</div>
				<div class="login-confirm-password-error" v-if="passwordSome">两次输入密码不一致</div>
				<div class="login-confirm-password-error" v-if="passwordRule">密码可最少8个字符，最多20个字符</div>
				<div class="login-forget-password"></div>
				<div class="login-btn" @click="confirmHandle">确认</div>
			</div>
		</div>
		<div class="login-bottom">
			<img src="/assets/img/login/login-water.png"/>
		</div>
		<div class="login-success-layer" v-if="loginLoading">
			<div class="login-success-dialog">
				<div>修改成功</div>
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
            newPwd: '',		//新密码
			confirmNewPwd: '',	//确认新密码
            passwordEmpty: false,	//检验密码是否为空
            passwordSome: false, //校验新密码是否一致
            passwordRule: false, //密码规则校验
            loginLoading: false,	//重置密码成功加载
            loginTime: 2,
		};
	},
	methods: {
	    //输入内容时不显示错误提示
        hideTip(){
            this.passwordSome = false;
            this.passwordRule = false;
		},
		//确认修改密码操作
        confirmHandle(){
			//不能为空
			if (!this.newPwd || !this.confirmNewPwd) {
				this.passwordEmpty = true;
				return;
			}
            //新密码和确认密码要一致
            if (this.newPwd != this.confirmNewPwd) {
                this.passwordSome = true;
                return;
            }
			//规则要符合，最少8个字符，最多20个字符；数字、字母、符号;
			var passwordPatten = new RegExp(/^[a-zA-Z0-9\W_]{8,20}$/);
			if (!passwordPatten.test(this.newPwd)) {
				this.passwordRule = true;
				return;
			}
			$http({
				url: "dance/reset_pwd/"+window.localStorage.getItem("verify_code"),
				type: "POST",
				data: {
					password1: this.newPwd,
					password2: this.confirmNewPwd
				}
			}).then(res => {
				if(res){
                    this.loginLoading = true;
                    var time = window.setInterval(()=>{
                        this.loginTime--;
                        if(this.loginTime==0){
                            window.clearInterval(time);
                            $router.push({path:"/login"});
                        }
                    },1000);
				}
			});
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
				width: 100%;
				height: 80px;
				margin: 0px auto;
				padding: 20px 0;
				img{
					width: 18.6%;
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
					width: 18.6%;
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
