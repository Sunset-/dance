/**
 * 全局业务工具类
 */

var currentUser = null;
var waitUser = [];

var cacheuser = localStorage.getItem("session_user");
if (cacheuser) {
	currentUser = JSON.parse(cacheuser);
}

module.exports = window.$business = {
	/**
	 * 获取当前登录用户
	 */
	getCurrentUser() {
		if (!currentUser) {
			var cacheuser = localStorage.getItem("session_user");
			if (cacheuser) {
				currentUser = JSON.parse(cacheuser);
			}
		}
		return currentUser;
	},
	getCurrentUserPromise() {
		return new Promise(resolve => {
			var user = this.getCurrentUser();
			if (user) {
				resolve(user);
			} else {
				waitUser.push(resolve);
			}
		});
	},
	setCurrentUser(user) {
		currentUser = user;
		localStorage.setItem("session_user", JSON.stringify(user));
		while (waitUser.length) {
			waitUser.shift()(user);
		}
	}
};
