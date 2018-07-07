var fs = require("fs"),
	stat = fs.stat,
	path = require("path");
var src = "../../dist",
	fileName = "netposa-xui.js",
	endPath = require("../../../copyConfig");
var sourceFile = path.join(__dirname, src, fileName);
var destPath = path.join(endPath, fileName);
var readStream = fs.createReadStream(sourceFile);
var writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);
console.log("******************移动完成********************");
