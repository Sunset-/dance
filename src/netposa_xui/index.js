import NetPosaXUI from "./netposa-xui";
import "!style-loader!css-loader!less-loader!./style/index.less";
import ext from "./ext.js";
import XUICSS from "./netposa-xui.css";

window.NetPosaXUI = NetPosaXUI;
window.Sunset = NetPosaXUI.Sunset;

module.exports = function(Vue) {
	Vue.use(NetPosaXUI, {
		prefix: "xui"
	});
	ext(NetPosaXUI);
};
