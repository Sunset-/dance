var prefix = "dance";
const URLS = {
	course: `/${prefix}/dance_web/courses`,
	level: `/${prefix}/dance_web/level`,
	courseHandle: `/${prefix}/dance_web/courses`,
	levelHandle: `/${prefix}/dance_web/level`
};

module.exports = {
	/**
	 * 获取所有课程
	 */
	getCourseList() {
		return $http({
			url: URLS.course,
			type: "get"
		}).then(res => {
			return res;
		});
	},
	/**
	 * 新增课程
	 */
	addCourse(model) {
		return $http({
			url: URLS.course,
			type: "POST",
			data: model
		}).then(res => {
			return res;
		});
	},
	/**
	 * 更新课程
	 * @param {*} id
	 */
	updateCourseById(id, model) {
		return $http({ url: `${URLS.courseHandle}/${id}`, type: "PATCH", data: model }).then(res => {
			return res;
		});
	},
	/**
	 * 删除课程
	 * @param {*} id
	 */
	delCourseById(id) {
		debugger;
		return $http({ url: `${URLS.courseHandle}/${id}`, type: "DELETE" }).then(res => {
			return res;
		});
	},
	/**------------------------------------------------------------------*/
	/**
	 * 获取所有等级
	 */
	getLevelList() {
		return $http({
			url: URLS.level,
			type: "get"
		}).then(res => {
			return res;
		});
	},
	/**
	 * 新增级别
	 */
	addLevel(model) {
		return $http({
			url: URLS.level,
			type: "POST",
			data: model
		}).then(res => {
			return res;
		});
	},
	/**
	 * 更新课程
	 * @param {*} id
	 */
	updateLevelById(id, model) {
		return $http({ url: `${URLS.levelHandle}/${id}`, type: "PATCH", data: model }).then(res => {
			return res;
		});
	},
	/**
	 * 删除课程
	 * @param {*} id
	 */
	delLevelById(id) {
		return $http({ url: `${URLS.levelHandle}/${id}`, type: "DELETE" }).then(res => {
			return res;
		});
	}
};
