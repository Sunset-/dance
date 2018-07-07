import StaticDict from "./static";
var XuiDictionary = NetPosaXUI.Dictionary;
var inited = false;
XuiDictionary.install(StaticDict);
XuiDictionary.init = function() {
	return $http({
		url: "/gateway/searchservice/dictionary/getAll"
	}).then(res => {
		XuiDictionary.install(res.data, "key", "value");
		inited = true;
	});
};

module.exports = window.$dictionary = XuiDictionary;
