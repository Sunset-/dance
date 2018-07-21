var prefix = "dance";
const URLS = {
	course: `/${prefix}/dance_web/courses`,
	level: `/${prefix}/dance_web/level`,
	courseHandle: `/${prefix}/dance_web/courses`,
	levelHandle: `/${prefix}/dance_web/level`,
	sections: `/${prefix}/dance_web/sections`,
	sectionsHandle: `/${prefix}/dance_web/sections`,
	steps: `/${prefix}/dance_web/step_items`,
	stepsHandle: `/${prefix}/dance_web/step_items`
};

module.exports = {
	/**
	 * 获取所有课程
	 */
	getCourseList(model) {
		return $http({
			url: URLS.course,
			type: "get",
			data: model
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
		return $http({ url: `${URLS.courseHandle}/${id}`, type: "DELETE" }).then(res => {
			return res;
		});
	},
	/**------------------------------等级接口开始------------------------------------*/
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
	},
	/**------------------------------------小节接口开始--------------------------------------------- */
	/**
	 *根据课程ID获取小节
	 *
	 * @param {*} model
	 * @returns
	 */
	getSectionsByCourseId(model) {
		return $http({ url: URLS.sections, type: "get", data: model }).then(res => {
			return res;
		});
	},
	/**
	 *新增小节
	 *
	 * @param {*} model
	 * @returns
	 */
	addSections(model) {
		return $http({ url: URLS.sections, type: "POST", data: model }).then(res => {
			return res;
		});
	},
	/**
	 *根据交接ID更新当前小节
	 *
	 * @param {*} sectionId
	 * @param {*} model
	 * @returns
	 */
	updateSection(sectionId, model) {
		return $http({ url: `${URLS.sectionsHandle}/${sectionId}`, type: "PATCH", data: model }).then(res => {
			return res;
		});
	},
	/**
	 *根据小节ID删除当前小节
	 *
	 * @param {*} sectionId
	 * @returns
	 */
	delSection(sectionId) {
		return $http({ url: `${URLS.sectionsHandle}/${sectionId}`, type: "DELETE" }).then(res => {
			return res;
		});
	},
	/**------------------------------------步骤接口开始--------------------------------------------- */
	/**
	 *根据小节ID获取步骤
	 *
	 * @param {*} sectionId
	 * @returns
	 */
	getStepBySectionId(model) {
		return $http({ url: `${URLS.steps}`, type: "get", data: model }).then(res => {
			return res;
		});
	},
	/**
	 *新增步骤
	 *
	 * @param {*} model
	 * @returns
	 */
	addSteps(model) {
		return $http({ url: `${URLS.steps}`, type: "POST", data: model }).then(res => {
			return res;
		});
	},
	/**
	 *根据步骤ID修改当前步骤
	 *
	 * @param {*} stepId
	 * @param {*} model
	 * @returns
	 */
	updateSteps(stepId, model) {
		return $http({ url: `${URLS.stepsHandle}/${stepId}`, type: "PATCH", data: model }).then(res => {
			return res;
		});
	},
	/**
	 *根据步骤ID删除当前步骤
	 *
	 * @param {*} stepId
	 * @returns
	 */
	delSteps(stepId, model) {
		return $http({ url: `${URLS.stepsHandle}/${stepId}`, type: "DELETE" }).then(res => {
			return res;
		});
	}
};
