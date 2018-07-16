<!-- 课程管理 -->
<template>
	<div class="course">
		<div v-show="!isShowEditCourse">
			<div class="item">
				<i class=" title dance-type icon-type"></i>
				<span class="line"></span>
				<div class="content">
					<span class="active">伦巴</span>
					<span>恰恰</span>
					<span>斗牛</span>
					<span>桑巴</span>
				</div>
				<div class="operate">
					<span class="add" @click="add"></span>
					<span class="edit" @click="edit"></span>
					<span class="del" @click="del"></span>
				</div>
			</div>
			<div class="item">
				<i class="title dance-step icon-step"></i>
				<span class="line"></span>
				<div class="content">
					<span class="active">方步</span>
					<span>左右移动</span>
					<span>原地蹦哒</span>
				</div>
				<div class="operate">
					<span class="add" @click="add"></span>
					<span class="edit" @click="edit"></span>
					<span class="del" @click="del"></span>
				</div>
			</div>
			<div class="item">
				<i class=" title dance-course icon-course"></i>
				<span class="line"></span>
				<div class="content">
					<span class="active">初级</span>
					<span>中级</span>
					<span>高级</span>
				</div>
				<div class="operate">
					<span class="add" @click="add"></span>
					<span class="edit" @click="edit"></span>
					<span class="del" @click="del"></span>
				</div>
			</div>
			<div class="btn" @click="enterEdit">
				<i></i>
			</div>

			<delCourse ref="delmodal"></delCourse>
		</div>
		<editCourse re="editCourse" v-if="isShowEditCourse"></editCourse>
	</div>
</template>

<script>
import delCourse from "./del.vue";
import editCourse from "./edit.vue";
export default {
	name: "course",
	props: {},
	components: {
		delCourse,
		editCourse
	},
	data() {
		return {
			isShowEditCourse: false
		};
	},
	computed: {},
	methods: {
		add() {
			console.log("添加");
		},
		edit() {
			console.log("编辑");
		},
		del() {
			console.log("删除");
			this.$refs.delmodal.open();
		},
		enterEdit() {
			console.log("进入编辑");
			this.isShowEditCourse = true;
		}
	},
	created() {},
	mounted() {}
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
			margin: 0px 20px 20px 44px;
			line-height: 123px;
		}
		i {
			width: 71px;
			height: 71px;
			background-repeat: no-repeat;
			&:after {
				margin-left: 18px;
				font-size: 18px;
				font-weight: bold;
				position: relative;
				top: 20px;
				left: -5px;
			}
		}
		.icon-type {
			background-image: url("/assets/img/course/type.png");
			&:after {
				content: "舞种";
				color: #318ef4;
			}
		}
		.icon-step {
			background-image: url("/assets/img/course/step.png");
			&:after {
				content: "舞步";
				color: #b149cf;
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
			top: 22px;
		}
		.content {
			display: inline-block;
			margin-left: 50px;
			font-size: 16px;
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
