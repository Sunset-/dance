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
    setCookie(name, value, myDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + myDay);
        document.cookie = name + "=" + value + ";expires=" + oDate;
    },
    setLocalValue(itemName, itemValue) {
        //存储，IE6~7 cookie 其他浏览器HTML5本地存储
        if (window.localStorage) {
            window.localStorage.setItem(itemName, JSON.stringify(itemValue));
        } else {
            window.Cookie.write(itemName, JSON.stringify(itemValue));
        }
    },
    /**
     * [removeLocalValue 移除本地存储]
     * @param {string} [itemName] [存储名称]
     * @return null
     */
    removeLocalValue(itemName) {
        //存储，IE6~7 cookie 其他浏览器HTML5本地存储
        if (window.localStorage) {
            window.localStorage.removeItem(itemName);
        } else {
            /* -1 天后过期即删除 */
            Toolkits.setCookie(name, 1, -1);
        }
    },
    //获取cookie
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    /**
     * [getLocalValue 获取本地存储【JSON转换后的数据】]
     * @param  {[String]} item [存储名称]   必填
     * @param  {[String]} key [数据键值]   非必填
     * @return null
     */
    getLocalValue(item, key) {
        if (key == undefined) {
            return JSON.parse(window.localStorage ? localStorage.getItem(item) : Cookie.read(item));
        } else {
            return JSON.parse(window.localStorage ? localStorage.getItem(item) : Cookie.read(item))[key];
        }
    },
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