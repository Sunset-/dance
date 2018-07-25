import "promise-polyfill/src/polyfill";
import "babel-polyfill";
import Vue from "vue";
import "./common/index";

import jquery from "./jquery-vendor";

//引入公共样式
import "./style/index.less";

//路由
import Router from "vue-router";
Vue.use(Router);

//引入组件库
import SunsetUI from "./sunset-ui";
Vue.use(SunsetUI);

//引入公共服务
import "./services/index";

//引入公共组件
import "./components/index";

//开始
import App from "./App.vue";
import Modules from "./Modules.vue";
import Login from "modules/login/index.vue";
import Reset from "modules/login/reset.vue";
import Course from "modules/course/index.vue";
import Directive from "modules/directive/index.vue";

var router = new Router({
	routes: [
		{
			path: "/",
			component: Modules,
			redirect: "/course",
			children: [
				{
					name: "course",
					path: "/course",
					component: Course,
					children: [
						{
							path: ":couserid/:levelname/:soursename",
							component: Course
						}
					]
				},
				{
					name: "directive",
					path: "/directive",
					component: Directive
				}
			]
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/reset",
			component: Reset
		}
	]
});
window.$router = router;
//判断用户是否已登录
router.beforeEach((to, from, next) => {
	if (to.query && to.query.verify_code) {
		//判断验证链接是否有效，有效则调到修改密码页，无效跳转到登录页。
		$http({
			url: "dance/reset_pwd/" + to.query.verify_code,
			type: "GET"
		}).then(res => {
			if (res && res.msg == "Ok") {
				window.localStorage.setItem("verify_code", to.query.verify_code);
				next({ path: "/reset" });
			}
			if (res && res.msg == "This account not exist.") {
				$tip(`密码验证链接已失效，请重新点击忘记密码获取密码验证链接`, "warning");
				window.localStorage.removeItem("verify_code");
				next({ path: "/login" });
			}
		});
	}
	if (to.path == "/login" || (to.path == "/reset" && window.localStorage.getItem("verify_code"))) {
		next();
	} else {
		if (!window.sessionStorage.getItem("user")) {
			next({ path: "/login" });
		} else {
			next();
		}
	}
});
new Vue({ el: "#app", router, render: h => h(App) });
