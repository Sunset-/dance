import SunsetUI from "./sunset-ui";
import "!style-loader!css-loader!less-loader!./style/index.less";
import ext from "./ext.js";
import "./sunset-ui.css";

window.SunsetUI = SunsetUI;
window.Sunset = SunsetUI.Sunset;

module.exports = function(Vue) {
	Vue.use(SunsetUI, {
		prefix: "xui"
	});
	ext(SunsetUI);
};
