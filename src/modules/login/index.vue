<template>
	<div class="login-container">
		<h2>登录</h2>
		<form action="" onsubmit="return false;">
			<div>
				<label for="">用户名</label>
				<input type="text">
			</div>
			<div>
				<label for="">密码</label>
				<input type="password">
			</div>
			<xui-button color="primary" @click="login">登录</xui-button>
		</form>
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
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	text-align: center;
}
</style>
