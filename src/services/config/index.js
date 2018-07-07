const CONFIG_SAVE_KEY = "FRONT_GLOBAL_MODULES_CONFIGURE";
var configs = {};
var configCache = {};
var inited = false;
var GATEWAY = "/gateway"; //Toolkits.getSysConfig("globalConf", "VIASGateway");

function deepMerge(base, ext, namespace) {
	Object.keys(ext).forEach(key => {
		if (Sunset.isObject(ext[key])) {
			deepMerge(base, ext[key], (namespace ? `${namespace}.` : "") + key);
		} else {
			Sunset.setAttribute(base, (namespace ? `${namespace}.` : "") + key, ext[key]);
		}
	});
}

var Configure = {
	init() {
		return new Promise(resolve => {
			if (inited) {
				resolve();
			} else {
				$http({
					url: `${GATEWAY}/sys/conf_setting`,
					data: {
						key: CONFIG_SAVE_KEY
					}
				})
					.then(res => {
						var remoteConfigs = res && res.conf && res.conf[CONFIG_SAVE_KEY];
						if (remoteConfigs) {
							try {
								remoteConfigs = JSON.parse(remoteConfigs);
							} catch (e) {
								Sunset.warning(e);
							}
						}
						configs = remoteConfigs || {};
						resolve();
						inited = true;
					})
					.catch(e => {
						if (console.warn) {
							console.warn("获取系统配置失败:");
							console.warn(e);
						}
						resolve();
						inited = true;
					});
			}
		});
	},
	getConfig(moduleName, namespace, defaultValue) {
		var config = configCache[moduleName];
		if (moduleName == "global") {
			config = {
				gateway: "/gateway"
			};
		} else if (!config) {
			var remoteConfig = configs[moduleName];
			var module = $module.getModule(moduleName);
			var defaultConfig = module ? module.defaultConfig || {} : defaultValue;
			var baseConfig = Sunset.clone(defaultConfig);
			if (Sunset.isObject(remoteConfig) && Sunset.isObject(defaultConfig)) {
				deepMerge(baseConfig, remoteConfig);
			} else {
				baseConfig = remoteConfig || baseConfig;
			}
			config = configCache[moduleName] = baseConfig;
		}
		if (namespace) {
			config = Sunset.getAttribute(config, namespace, defaultValue);
		}
		return Sunset.isObject(config) || Sunset.isArray(config) ? Sunset.clone(config) : config;
	},
	saveConfig(moduleName, config) {
		configs[moduleName] = configCache[moduleName] = config;
		return $http({
			url: `${GATEWAY}/sys/conf_setting`,
			type: "POST",
			formdata: true,
			data: {
				key: CONFIG_SAVE_KEY,
				value: JSON.stringify(configs)
			}
		});
	}
};

window.$config = Configure;
export default Configure;
