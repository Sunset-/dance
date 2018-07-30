import axios from "axios";

const UN_CHECK_URL = {
	"/dance/forget_pwd": true,
	"/dance/modify_pwd": true,
	"/dance/reset_pwd": true,
	"/dance/verify_code_is_valid": true
};

export default (window.$http = function(options) {
	var method = (options.type || options.method || "get").toLowerCase();
	var data = options.data;
	// if (data && (method == 'post' || method == 'put' || method == 'patch')) {
	//     data = JSON.stringify(data);
	// }v
	var config = {
		url: options.url,
		method: method,
		data: data
	};
	//替换路径参数
	if (data) {
		config.url = config.url.replace(/{\w+}/g, function(v) {
			var key = v.substring(1, v.length - 1);
			var value = data[key];
			delete data[key];
			return value;
		});
	}
	var headers = {};
	if (method == "get") {
		config.params = data;
	}
	if (options.formdata) {
		config.transformRequest = [
			function(data) {
				let ret = "";
				for (let it in data) {
					ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
				}
				return ret;
			}
		];
		headers["Content-Type"] = "application/x-www-form-urlencoded";
	} else {
		headers["Content-Type"] = "application/json;charset=UTF-8";
	}
	if (!UN_CHECK_URL[config.url]) {
		headers["Authorization"] = $tools.getCookie("Authorization");
	}
	config.headers = headers;

	return axios(config)
		.then(res => {
			var result = res.data;
			if (result.code) {
				if (result.code == 200 || result.code == "310000" || res.status == 200) {
					return result.data === void 0 ? result : result.data;
				} else if (result.code === 401) {
					$tip("登录超时");
					$router.push("/login");
				} else {
					var err = new Error(result.data && result.data.message);
					err.code = result.code;
					err.message = (result.data && result.data.message) || result.message;
					throw err;
				}
			} else {
				return result;
			}
		})
		.catch(e => {
			if (e.response.status == 401) {
				$tip("登录超时");
				$router.push("/login");
			}
		});
});
