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

new Vue({ el: "#app", router, render: h => h(App) });
