<!-- 课程管理 -->
<template>
	<div class="course" id="course">
		<div v-show="!isShowEditCourse">
			<!-- 等级列表 -->
			<div class="item">
				<i class="title icon-level"></i>
				<span class="line"></span>
				<div class="content">
					<div v-for="item in levelMenu" :key="item.id">
						<span :class="[{'active': activeLevel.id === item.id }]" v-show="!item.edit" @click="chooseCourse('level',item)">{{item.name}}</span>
						<input :class="['input','edit-input',activeLevel.id === item.id && activeLevel.edit?'editing':'']" v-show="activeLevel.id === item.id && activeLevel.edit" v-model="item.name" @keydown.enter="blurHandle($event)" @blur="saveRecord" autofocus maxlength="6" />
					</div>
				</div>
				<div class="operate">
					<span class="add" @click="add('level')"></span>
					<span class="edit" @click="edit('level')"></span>
					<span class="del" @click="del('level')"></span>
				</div>
			</div>
			<!-- 课程列表-->
			<div class="item">
				<i class="title icon-course"></i>
				<span class="line"></span>
				<div class="content">
					<div v-if="activeLevel.id" v-for="item in courseMenu" :key="item.id">
						<span :class="[{'active': activeCourse.id === item.id}]" v-show="!item.edit" @click="chooseCourse('course',item)">{{item.name}}</span>
						<input :class="['input','edit-input',activeCourse.id === item.id && activeCourse.edit?'editing':'']" v-show="activeCourse.id === item.id && activeCourse.edit" v-model="item.name" @keydown.enter="blurHandle($event)" @blur="saveRecord" autofocus maxlength="6" />
					</div>
				</div>
				<div class="operate">
					<span class="add" :style="activeLevel.id && courseMenu.length==0?'display:inline-block !important;':''" v-show="activeLevel.id" @click="add('course')"></span>
					<span class="edit" v-show="activeLevel.id && activeCourse.id" @click="edit('course')"></span>
					<span class="del" v-show="activeLevel.id && activeCourse.id" @click="del('course')"></span>
				</div>
			</div>
			<div class="btn" :class="{'allow': allowEdit}" @click="enterEdit">
				<i></i>
			</div>
			<!-- 删除组件 -->
			<delCourse ref="delmodal" @ensure="removeItem"></delCourse>
		</div>
		<!-- 课程编辑组件 -->
		<editCourse re="editCourse" v-if="isShowEditCourse" @goback="goback"></editCourse>
	</div>
</template>

<script>
import delCourse from "./del.vue";
import editCourse from "./edit.vue";
import store from "./store.js";
export default {
	name: "course",
	props: {},
	components: {
		delCourse,
		editCourse
	},
	data() {
		return {
			levelMenu: [],
			courseMenu: [],
			activeLevel: {},
			activeCourse: {},
			activeOperation: {
				key: "",
				type: ""
			},
			isShowCourseAdd: false,
			lastActiveRecord: null,
			allowEdit:false
		};
	},
	computed: {
		isShowEditCourse() {
			return !this.$route.path.endsWith("course");
		}
	},
	methods: {
		/**
		 * 初始化加载等级、课程
		 */
		init() {
			store.getLevelList().then(res => {
				if (res && res.length > 0) {
					this.levelMenu = res.map(val => {
						val.edit = false;
						//如果删除的是课程，记录当前等级
						if (JSON.stringify(this.activeLevel) !== "{}" && val.id === this.activeLevel.id) {
							this.activeLevel = val;
						}
						return val;
					});
					if (JSON.stringify(this.activeLevel) === "{}") {
						this.activeLevel = this.levelMenu[0];
					}
					this.getCourseList(this.activeLevel.id);
				} else {
					this.activeLevel = {};
					this.activeCourse = {};
					this.courseMenu = [];
				}
			});
			// this.loadPageEvent();
		},
		/**
		 * 课程选择
		 */
		chooseCourse(key, item) {
			if (key === "level") {
				this.activeLevel = item || {};
				this.activeCourse = {};
				if (this.activeLevel.id) {
					this.getCourseList(this.activeLevel.id);
				}
			} else {
				this.activeCourse = item || {};
			}
		},
		/**
		 * 保存
		 */
		saveRecord() {
			if (this.activeLevel.name === "" || this.activeCourse.name === "") {
				//编辑名称为空的情况，直接删除
				switch (this.activeOperation.type) {
					case "add":
						if (this.activeOperation.key === "level") {
							this.levelMenu.pop();
							this.chooseCourse("level", this.lastActiveRecord);
						} else {
							this.courseMenu.pop();
							this.chooseCourse("cource", this.lastActiveRecord);
						}
						break;
					case "edit":
						if (this.activeOperation.key === "level") {
							store.delLevelById(this.activeLevel.id).then(() => {
								this.init();
							});
						} else {
							store.delCourseById(this.activeCourse.id).then(() => {
								this.init();
							});
						}
						break;
					default:
						break;
				}
			} else {
				this.$set(this.activeLevel, "edit", false);
				this.$set(this.activeCourse, "edit", false);
				switch (this.activeOperation.type) {
					case "add":
						this.activeOperation.key === "level"
							? this.addLevel(this.activeLevel)
							: this.addCourse(this.activeCourse);
						break;
					case "edit":
						this.activeOperation.key === "level"
							? this.updateLevel(this.activeLevel)
							: this.updateCourse(this.activeCourse);
						break;
					default:
						break;
				}
			}
		},
		/**
		 * 删除
		 */
		removeItem(record) {
			var method = null;
			if (record.opType === "level") {
				method = "delLevelById";
			} else if (record.opType === "course") {
				method = "delCourseById";
			} else {
				method = "delSection";
			}
			store[method](record.id).then(res => {
				if (record.opType == "level") {
					var index = this.levelMenu.indexOf(record);
					this.levelMenu.splice(index, 1);
					this.chooseCourse("level", this.levelMenu[index > 0 ? index - 1 : 0]);
				} else if (record.opType == "course") {
					var index = this.courseMenu.indexOf(record);
					this.courseMenu.splice(index, 1);
					this.chooseCourse("course", this.courseMenu[index > 0 ? index - 1 : 0]);
				}
			});
		},
		delAfter(type) {
			store.getLevelList().then(res => {
				if (res && res.length > 0) {
					this.levelMenu = res.map(val => {
						val.edit = false;
						//如果删除的是课程，记录当前等级
						if (JSON.stringify(this.activeLevel) !== "{}" && val.id === this.activeLevel.id) {
							this.activeLevel = val;
						}
						return val;
					});
					if (JSON.stringify(this.activeLevel) === "{}") {
						this.activeLevel = this.levelMenu[this.levelMenu.length - 1];
					}

					this.getCourseList(this.activeLevel.id);
				} else {
					this.activeLevel = {};
					this.activeCourse = {};
					this.courseMenu = [];
				}
			});
		},
		//获取课程
		getCourseList(levelId) {
			store.getCourseList({ level_id: levelId }).then(res => {
				if (res && res.length > 0) {
					this.courseMenu = res.map(val => {
						val.edit = false;
						if (JSON.stringify(this.activeCourse) !== "{}" && val.id === this.activeCourse.id) {
							this.activeCourse = val;
						}
						return val;
					});
					if (JSON.stringify(this.activeCourse) === "{}") {
						this.activeCourse = this.courseMenu[0];
					}
					this.allowEdit = true;
				} else {
					this.courseMenu = [];
					this.activeCourse = {};
					this.allowEdit = false;
				}
			});
		},
		/**
		 * 添加开始
		 */
		add(key) {
			if (key === "level") {
				let flag = true;
				this.levelMenu.forEach(level => {
					if (level.name === "") {
						flag = false;
						return;
					}
				});
				if (flag) {
					let tempLevel = {
						name: "",
						edit: true
					};
					this.levelMenu.push(tempLevel);
					this.lastActiveRecord = this.activeLevel;
					this.activeLevel = tempLevel;
				}
			} else {
				let flag = true;
				this.courseMenu.forEach(course => {
					if (course.name === "") {
						flag = false;
						return;
					}
				});
				if (flag) {
					let tempCourse = {
						level: this.activeLevel.id,
						name: "",
						edit: true
					};
					this.courseMenu.push(tempCourse);
					this.lastActiveRecord = this.activeCourse;
					this.activeCourse = tempCourse;
				}
			}
			this.activeOperation = {
				key: key,
				type: "add"
			};
			this.$nextTick(() => {
				$(".edit-input.editing").focus();
			});
		},
		/**
		 * 编辑开始
		 */
		edit(key) {
			key === "level" ? this.$set(this.activeLevel, "edit", true) : this.$set(this.activeCourse, "edit", true);
			this.activeOperation = {
				key: key,
				type: "edit"
			};
			this.$nextTick(() => {
				$(".edit-input.editing").focus();
			});
		},
		/**
		 * 删除
		 */
		del(key) {
			let param = {};
			if (key === "level") {
				param = this.activeLevel;
				param.message = "等级";
				param.opType = "level";
			} else {
				param = this.activeCourse;
				param.message = "课程";
				param.opType = "course";
			}
			this.$refs.delmodal.open(param);
		},
		enterEdit() {
			if (this.activeLevel.id && this.activeCourse.id) {
				$router.push(`/course/${this.activeCourse.id}/${this.activeLevel.name}/${this.activeCourse.name}`);
			}
		},
		blurHandle(ev) {
			ev.target.blur();
		},
		//回车事件
		loadPageEvent() {
			let self = this;
			document.onkeydown = function(event) {
				let e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 13) {
					self.addEvent();
				}
			};
		},
		/**
		 * 添加等级
		 */
		addLevel(model) {
			store
				.addLevel({
					name: model.name,
					add_time: Sunset.Dates.format(new Date())
				})
				.then(res => {
					this.activeLevel = res;
					this.isShowCourseAdd = true;
					this.init();
				});
		},
		/**
		 * 修改等级
		 */
		updateLevel(model) {
			store.updateLevelById(model.id, {
				name: model.name,
				add_time: Sunset.Dates.format(new Date())
			});
		},
		/**
		 * 添加课程
		 */
		addCourse(model) {
			store
				.addCourse({
					name: model.name,
					level: model.level,
					add_time: Sunset.Dates.format(new Date())
				})
				.then(res => {
					this.activeCourse = res;
					this.init();
				});
		},
		/**
		 * 修改课程
		 */
		updateCourse(model) {
			store.updateCourseById(model.id, {
				name: model.name,
				level: model.level,
				add_time: Sunset.Dates.format(new Date())
			});
		},
		goback() {
			history.back();
		}
	},
	created() {},
	mounted() {
		this.init();
	}
};
</script>
<style lang='less'>
.course {
	position: absolute;
	top: 0px;
	bottom: 0px;
	right: 0px;
	left: 0px;
	background-color: #f6f7fb;
	.item {
		min-height: 123px;
		background: rgba(255, 255, 255, 1);
		border-radius: 6px;
		margin: 23px;
		cursor: pointer;
		position: relative;
		&:hover {
			& > .operate {
				& > span {
					display: inline-block;
				}
			}
		}
		.title {
			display: block;
			float: left;
			margin-left: 20px;
			margin-right: 20px;
			line-height: 123px;
		}
		i {
			width: 72px;
			height: 72px;
			background-repeat: no-repeat;
			&:after {
				margin-left: 18px;
				font-size: 18px;
				font-weight: bold;
				position: relative;
				top: 20px;
				left: 0px;
			}
		}
		.icon-level {
			background-image: url("/assets/img/course/level.png");
			&:after {
				content: "等级";
				color: #318ef4;
			}
		}
		.icon-course {
			background-image: url("/assets/img/course/course.png");
			&:after {
				content: "课程";
				color: #ffa712;
			}
		}
		.line {
			width: 1px;
			height: 50px;
			display: block;
			float: left;
			background: #cccccc;
			position: relative;
			top: 35px;
		}
		.content {
			display: inline-block;
			margin-left: 50px;
			font-size: 16px;
			vertical-align: text-bottom;
			width: calc(100% - 497px);
			margin-top: 30px;
			& > div {
				display: inline-block;
			}
			span {
				width: 120px;
				height: 40px;
				color: #333333;
				border-radius: 20px;
				display: inline-block;
				text-align: center;
				line-height: 40px;
				vertical-align: middle;
				user-select: none;
				cursor: pointer;
				margin-right: 20px;
				margin-bottom: 10px;
				margin-top: 10px;
				&:hover {
					color: #fff;
					background: #84aeff;
					box-shadow: 0px 0px 24px #84aeff;
				}
			}
			& > div > .active {
				color: #fff;
				background: #4081ff;
				box-shadow: 0px 0px 24px #4081ff;
			}
			.input {
				color: #999999;
				border-radius: 20px;
				box-shadow: 0px 0px 0px;
				background: #f6f7fb;
				width: 87px;
				height: 38px;
				line-height: 40px;
				padding-left: 20px;
				border: 0px;
				outline: none;
				margin-right: 20px;
			}
		}
		.operate {
			float: right;
			margin-top: 30px;
			width: 300px;
			span {
				width: 56px;
				height: 56px;
				background: rgba(64, 129, 255, 1);
				box-shadow: 0px 0px 10px rgba(64, 129, 255, 1);
				display: none;
				text-align: center;
				border-radius: 56px;
				margin-right: 34px;
				&:after {
					color: #fff;
					margin-left: 18px;
					font-size: 16px;
					position: relative;
					top: 20px;
					left: -8px;
				}
			}
			.add {
				background: linear-gradient(#74a2fc, #4081ff);
				&:after {
					content: "增加";
				}
			}
			.edit {
				background: linear-gradient(#74a2fc, #4081ff);
				&:after {
					content: "编辑";
				}
			}
			.del {
				background: linear-gradient(#ff7539, #ff2156);
				box-shadow: 0px 0px 15px rgba(255, 69, 73, 1);
				&:after {
					content: "删除";
				}
			}
		}
	}
	.btn {
		width: 216px;
		height: 40px;
		background: #999;
		border-radius: 20px;
		margin: 51px auto;
		cursor: pointer;
		i {
			width: 22px;
			height: 22px;
			background-image: url(/assets/img/course/edit.png);
			background-repeat: no-repeat;
			display: inline-block;
			margin-left: 56px;
			margin-top: 8px;
			line-height: 24px;
			&:after {
				content: "进入编辑";
				width: 150px;
				color: #fff;
				font-size: 18px;
				display: inline-block;
				margin-left: 30px;
			}
		}
	}
	.allow {
		background: rgba(64, 129, 255, 1);
		box-shadow: 0px 0px 24px rgba(64, 129, 255, 1);
	}
}
</style>
