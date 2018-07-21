import "./pop.scss";

var timer = null;

$("body").on("mouseenter", ".xui-pop", function(ev) {
    var $target = $(ev.target),
        $this = $(this),
		popData = $this.attr("data-content") || "POP";
	var $pop = $(".xui-pop-wrap");
	if (!$pop.length) {
		$pop = $('<div class="xui-pop-wrap"><div class="xui-pop-wrap-inner">' + popData + "</div></div>");
	} else {
		$('.xui-pop-wrap-inner').html(popData);
	}
	$pop.appendTo($("body")).show();
	var offset = $this.offset();
	$pop.css({
		left: offset.left + $target.width() / 2,
		top: offset.top - 10
	});
});
$("body").on("mouseenter", ".xui-pop-wrap", function() {
	clearTimeout(timer);
});
$("body").on("mouseleave", ".xui-pop", function() {
	timer = setTimeout(() => {
		$(".xui-pop-wrap").hide();
	}, 50);
});
$("body").on("mouseleave", ".xui-wrap", function() {
	timer = setTimeout(() => {
		$(".xui-pop-wrap").hide();
	}, 50);
});
