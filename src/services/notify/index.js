// 去依赖化 声明全局的$tip/$notify $confirm

//tip
window.$tip = (function() {
	var $el = $('<div class="global-tip"><i></i><span></span></div>');
	$el.appendTo("body");
	var $span = $("span", $el);
	var queue = [];
	var showing = null;
	function show(obj) {
		$el.attr("class", `global-tip tip-${obj.type || "info"}`);
		$span.html(obj.msg);
		showing = obj;
		setTimeout(() => {
			$el.addClass("tip-show");
			setTimeout(() => {
				$el.removeClass("tip-show");
				showing = null;
				setTimeout(() => {
					if (queue.length) {
						show(queue.shift());
					}
				}, 300);
			}, 3000);
		}, 0);
	}
	return function(msg, type) {
		if (showing) {
			if (showing.type != type || showing.msg != msg) {
				queue.push({
					msg,
					type
				});
			}
		} else {
			show({
				msg,
				type
			});
		}
	};
})();
