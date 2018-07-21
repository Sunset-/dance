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
import XUI from "./netposa_xui";
Vue.use(XUI);

//引入公共服务
import "./services/index";

//引入公共组件
import "./components/index";

//开始
import App from "./App.vue";
import Modules from "./Modules.vue";
import Login from "modules/login/index.vue";
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
					component: Course
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
		}
	]
});
window.$router = router;
//判断用户是否已登录
router.beforeEach((to, from, next) => {
	if (to.path == "/login") {
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
