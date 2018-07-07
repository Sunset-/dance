function base64Img2Blob(code) {
	var parts = code.split(";base64,");
	var contentType = parts[0].split(":")[1];
	var raw = window.atob(parts[1]);
	var rawLength = raw.length;
	var uInt8Array = new Uint8Array(rawLength);
	for (var i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}
	return new Blob([uInt8Array], { type: contentType });
}
function downloadFile(fileName, content) {
	var aLink = document.createElement("a");
	var blob = base64Img2Blob(content);
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", false, false);
	aLink.download = fileName;
	aLink.href = URL.createObjectURL(blob);
	aLink.dispatchEvent(evt);
}

export default (window.$tools = {
	/**
	 * 将日期设置为当天开始
	 */
	adjustDateToStart(time) {
		var date = new Date(time);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	/**
	 * 将日期设置为当天结束
	 */
	adjustDateToEnd(time) {
		var date = new Date(time);
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		date.setMilliseconds(999);
		return date.getTime();
	},
	/**
	 * 下载图片到本地
	 * @param {*} filename
	 * @param {*} src
	 */
	downloadImg(filename, src) {
		var img = new Image();
		img.src = src;
		img.onload = function() {
			img.onload = null;
			var cvs = document.createElement("canvas");
			cvs.width = img.width;
			cvs.height = img.height;
			var ctx = cvs.getContext("2d");
			ctx.drawImage(img, 0, 0);
			downloadFile(filename || "img.png", cvs.toDataURL());
		};
	},
	/**
	 * 裁剪图片
	 */
	cuteImage(src, locations) {
		return new Promise(resolve => {
			var img = new Image();
			img.src = src;
			var featureImgs = [];
			img.onload = function() {
				img.onload = null;
				var cvs = document.createElement("canvas");
				cvs.width = img.width;
				cvs.height = img.height;
				var ctx = cvs.getContext("2d");
				locations.forEach(lc => {
					var lcs = lc.split(","),
						sx = +lcs[0],
						sy = +lcs[1],
						w = +lcs[2] - sx,
						h = +lcs[3] - sy;
					if (cvs.width != w) {
						cvs.width = w;
					}
					if (cvs.height != h) {
						cvs.height = h;
					}
					ctx.drawImage(img, sx, sy, w, h, 0, 0, w, h);
					featureImgs.push(cvs.toDataURL());
				});
				resolve(featureImgs);
			};
		});
	},
	/**
	 * 标注图片
	 */
	markImage(src, markerSrc, locations) {
		return new Promise(resolve => {
			var count = 0;
			var img = new Image();
			img.src = src;
			var markerImg = new Image();
			markerImg.src = markerSrc;

			img.onload = function() {
				count++;
				if (count == 2) {
					mark();
				}
			};
			markerImg.onload = function() {
				count++;
				if (count == 2) {
					mark();
				}
			};
			function mark() {
				img.onload = null;
				var cvs = document.createElement("canvas");
				cvs.width = img.width;
				cvs.height = img.height;
				var ctx = cvs.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height);
				var points = [];
				locations.forEach(lc => {
					var lcs = lc.split(","),
						sx = +lcs[0],
						sy = +lcs[1],
						w = +lcs[2] - sx,
						h = +lcs[3] - sy;
					var markerHalf = markerImg.width / 2;
					var half = w / 2;
					ctx.drawImage(markerImg, 0, 0, markerImg.width, markerImg.height, sx, sy, w, w);
				});
				resolve(cvs.toDataURL());
			}
		});
	}
});
