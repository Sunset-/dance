<!-- 课程管理 -->
<template>
	<div class="course" id="course">
		<div v-show="!isShowEditCourse">
			<!-- 等级 -->
			<div class="item">
				<i class="title icon-level"></i>
				<span class="line"></span>
				<div class="content">
					<div v-for="item in levelMenu" :key="item.id">
						<span :class="[{'active': activeLevel.name === item.name }]" v-show="!item.edit" @click="chooseCourse('level',item)">{{item.name}}</span>
						<xui-input v-show="activeLevel.name === item.name && activeLevel.edit" v-model="item.name"></xui-input>
					</div>
				</div>
				<div class="operate">
					<span class="add" @click="add('level')"></span>
					<span class="edit" v-show="activeLevel.name" @click="edit('level')"></span>
					<span class="del" v-show="activeLevel.name" @click="del('level')"></span>
				</div>
			</div>
			<!-- 课程 -->
			<div class="item">
				<i class="title icon-course"></i>
				<span class="line"></span>
				<div class="content">
					<div v-for="item in courseMenu" :key="item.id">
						<span :class="[{'active': activeCourse.name === item.name}]" v-show="!item.edit" @click="chooseCourse('course',item)">{{item.name}}</span>
						<xui-input class="edit" v-show="activeCourse.name === item.name && activeCourse.edit" v-model="item.name"></xui-input>
					</div>
				</div>
				<div class="operate">
					<span class="add" v-show="activeLevel.name " @click="add('course')"></span>
					<span class="edit" v-show="activeLevel.name && activeCourse.name" @click="edit('course')"></span>
					<span class="del" v-show="activeLevel.name && activeCourse.name" @click="del('course')"></span>
				</div>
			</div>
			<div class="btn" @click="enterEdit">
				<i></i>
			</div>
			<delCourse ref="delmodal" @closed="init"></delCourse>
		</div>
		<editCourse re="editCourse" v-if="isShowEditCourse"></editCourse>
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
			isShowEditCourse: false,
			allCourseMenu: [],
			levelMenu: [],
			courseMenu: [],
			activeLevel: {},
			activeCourse: {},
			activeOperation: {
				key: "",
				type: ""
			}
		};
	},
	computed: {},
	methods: {
		init() {
			const proLevel = new Promise((resolve, reject) => {
				store.getLevelList().then(res => {
					resolve(res);
				});
			});
			const proCourse = new Promise((resolve, reject) => {
				store.getCourseList().then(res => {
					resolve(res);
				});
			});
			Promise.all([proCourse, proLevel]).then(posts => {
				this.levelMenu = posts[1].map(val => {
					val.edit = false;
					return val;
				});
				//默认课程全部展示
				this.allCourseMenu = this.courseMenu = posts[0];
			});
			this.LoadPageEvent();
		},
		/**
		 * 课程选择
		 */
		chooseCourse(key, item) {
			if (key === "level") {
				this.activeLevel = item;
				this.activeCourse = {};
				this.filterCourse();
			} else {
				this.activeCourse = item;
			}
		},
		/**
		 * 过滤等级与课程关联
		 */
		filterCourse() {
			this.courseMenu = [];
			this.allCourseMenu.forEach(c => {
				if (this.activeLevel.id === c.level) {
					this.courseMenu.push(c);
				}
			});
		},
		add(key) {
			if (key === "level") {
				let tempLevel = {
					name: "",
					edit: true
				};
				this.levelMenu.push(tempLevel);
				this.activeLevel = tempLevel;
			} else {
				let tempCourse = {
					level: this.activeLevel.id,
					name: "",
					edit: true
				};
				this.courseMenu.push(tempCourse);
				this.activeCourse = tempCourse;
			}
			this.activeOperation = {
				key: key,
				type: "add"
			};
		},
		edit(key) {
			key === "level" ? this.$set(this.activeLevel, "edit", true) : this.$set(this.activeCourse, "edit", true);
			this.activeOperation = {
				key: key,
				type: "edit"
			};
		},
		del(key, item) {
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
			console.log("进入编辑");
			this.isShowEditCourse = true;
		},
		/**
		 * 加载页面事件
		 */
		LoadPageEvent() {
			let self = this;
			document.onkeydown = function(event) {
				let e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 13) {
					self.$set(self.activeLevel, "edit", false);
					self.$set(self.activeCourse, "edit", false);
					switch (self.activeOperation.type) {
						case "add":
							self.activeOperation.key === "level"
								? self.addLevel(self.activeLevel)
								: self.addCourse(self.activeCourse);
							break;
						case "edit":
							self.activeOperation.key === "level"
								? self.updateLevel(self.activeLevel)
								: self.updateCourse(self.activeCourse);
							break;
						default:
							break;
					}
				}
			};
		},
		addLevel(model) {
			store.addLevel({
				name: model.name,
				add_time: Sunset.Dates.format(new Date())
			});
		},
		updateLevel(model) {
			store.updateLevelById(model.id, {
				name: model.name,
				add_time: Sunset.Dates.format(new Date())
			});
		},
		addCourse(model) {
			store.addCourse({
				name: model.name,
				level: model.level,
				add_time: Sunset.Dates.format(new Date())
			});
		},
		updateCourse(model) {
			store.updateCourseById(model.id, {
				name: model.name,
				level: model.level,
				add_time: Sunset.Dates.format(new Date())
			});
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
		width: 1641px;
		height: 123px;
		background: rgba(255, 255, 255, 1);
		border-radius: 6px;
		margin: 23px;
		cursor: pointer;
		&:hover {
			& > .operate {
				display: inline-block;
			}
		}
		.title {
			display: inline-block;
			margin: 10px 20px 20px 44px;
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
			display: inline-block;
			background: rgba(204, 204, 204, 1);
			position: relative;
			top: 10px;
		}
		.content {
			display: inline-block;
			margin-left: 50px;
			font-size: 16px;
			vertical-align: text-bottom;
			& > div {
				display: inline-block;
			}
			span {
				width: 107px;
				height: 40px;
				color: #333333;
				border-radius: 20px;
				display: inline-block;
				text-align: center;
				line-height: 40px;
				vertical-align: middle;
				cursor: pointer;
				&:hover {
					color: #fff;
					background: #4081ff;
					box-shadow: 0px 0px 24px #4081ff;
				}
			}
			& > div > .active {
				color: #fff;
				background: #4081ff;
				box-shadow: 0px 0px 24px #4081ff;
			}
			.el-input .el-input__inner {
				color: #999999;
				border-radius: 20px;
				box-shadow: 0px 0px 0px;
				background: #f6f7fb;
				width: 107px;
				height: 40px;
				line-height: 40px;
				padding-left: 20px;
				border: 0px;
				margin-right: 77px;
			}
		}
		.operate {
			float: right;
			display: none;
			margin-top: 30px;
			span {
				width: 56px;
				height: 56px;
				background: rgba(64, 129, 255, 1);
				box-shadow: 0px 0px 10px rgba(64, 129, 255, 1);
				display: inline-block;
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
		background: rgba(64, 129, 255, 1);
		border-radius: 20px;
		box-shadow: 0px 0px 24px rgba(64, 129, 255, 1);
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
}
</style>
