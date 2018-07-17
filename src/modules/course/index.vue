<!-- 课程管理 -->
<template>
	<div class="course">
		<div v-show="!isShowEditCourse">
			<div class="item">
				<i class="title icon-level"></i>
				<span class="line"></span>
				<div class="content">
					<span :class="[{'active': activeLevel.name === item.name },{'edit': activeLevel.name === item.name && activeEdit ==='level'}]" v-for="item in levelMenu" :key="item.id" @click="chooseCourse('level',item)">{{item.name}}</span>
				</div>
				<div class="operate">
					<span class="add" @click="add('level')"></span>
					<span class="edit" @click="edit('level')"></span>
					<span class="del" @click="del('level')"></span>
				</div>
			</div>
			<div class="item">
				<i class="title icon-course"></i>
				<span class="line"></span>
				<div class="content">
					<span :class="[{'active': activeCourse.name === item.name},{'edit': activeCourse.name === item.name && activeEdit ==='course'}]" v-for="item in courseMenu" :key="item.id" @click="chooseCourse('course',item)">{{item.name}}</span>
				</div>
				<div class="operate">
					<span class="add" @click="add('course')"></span>
					<span class="edit" @click="edit('course')"></span>
					<span class="del" @click="del('course')"></span>
				</div>
			</div>
			<div class="btn" @click="enterEdit">
				<i></i>
			</div>

			<delCourse ref="delmodal" @closed="closed"></delCourse>
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
			levelMenu: [],
			courseMenu: [],
			activeLevel: {},
			activeCourse: {},
			activeEdit: ""
		};
	},
	computed: {},
	methods: {
		init() {
			const proCourse = new Promise((resolve, reject) => {
				store.getCourseList().then(res => {
					resolve(res);
				});
			});
			const proLevel = new Promise((resolve, reject) => {
				store.getLevelList().then(res => {
					resolve(res);
				});
			});
			Promise.all([proCourse, proLevel]).then(posts => {
				this.courseMenu = posts[0];
				this.levelMenu = posts[1];
			});
		},
		chooseCourse(key, item) {
			key === "level" ? (this.activeLevel = item) : (this.activeCourse = item);
			console.log(this.activeCourse)
		},
		add(key) {
			console.log("添加", key);
		},
		edit(key) {
			console.log("编辑", key);
			this.activeEdit = key;
		},
		del(key, item) {
			let param = {};
			key === "level" ? (param = this.activeLevel ) : (param = this.activeCourse );
			console.log("删除", key,param);
			this.$refs.delmodal.open(key,param);
		},
		enterEdit() {
			console.log("进入编辑");
			this.isShowEditCourse = true;
		},
		closed(){
			this.init();
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
			& > .active {
				color: #fff;
				background: #4081ff;
				box-shadow: 0px 0px 24px #4081ff;
			}
			& > .edit {
				color: #999999;
				border-radius: 20px;
				box-shadow: 0px 0px 0px;
				background: rgba(246, 247, 251, 1);
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
