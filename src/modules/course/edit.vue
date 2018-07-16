<!-- 课程编辑 -->
<template>
    <div class="edit-Course">
        <div class="nav">
            <i/>
            <h3>伦巴 > 方法 > 中级</h3>
        </div>
        <div class="content">
            <div class="module">
                <span class="active">动作示范示范</span>
                <span>动作示范</span>
                <span>动作示</span>
                <span>动作示</span>
            </div>
            <!-- 模块操作 -->
            <div class="module-operation">
                <span class="add" @click="addModule"></span>
                <span class="edit" @click="editModule"></span>
                <span class="del" @click="delModule"></span>
            </div>
            <div class="table-header">
                <span style="width:5%">序号</span>
                <span style="width:20%">话术</span>
                <span style="width:8%">动作ID</span>
                <span style="width:8%">表情ID</span>
                <span style="width:8%">镜头ID</span>
                <span style="width:8%">比对ID</span>
                <span style="width:8%">动效ID</span>
                <span style="width:10%">标题</span>
                <span style="width:10%">任务方向</span>
                <span style="width:10%"></span>
            </div>
            <div class="table-content">
                <div>
                    <span style="width:5%">1</span>
                    <span style="width:20%;text-align: left;">欢迎学习说的发生都发生的发的发发多少的风格多少的风格多少的风格</span>
                    <span style="width:8%">100</span>
                    <span style="width:8%">12</span>
                    <span style="width:8%">14</span>
                    <span style="width:8%">6</span>
                    <span style="width:8%">3</span>
                    <span style="width:10%">向前走转弯</span>
                    <span style="width:10%">0</span>
                    <span style="width:10%" class="content-operation">
                        <i class="edit"></i>
                        <i class="del"></i>
                    </span>
                </div>
                <div>
                    <span style="width:5%">1</span>
                    <span style="width:20%;text-align: left;">欢迎学习说的发生都发生的发的发发多少的风格多少的风格多少的风格</span>
                    <span style="width:8%">100</span>
                    <span style="width:8%">12</span>
                    <span style="width:8%">14</span>
                    <span style="width:8%">6</span>
                    <span style="width:8%">3</span>
                    <span style="width:10%">向前走转弯</span>
                    <span style="width:10%">0</span>
                    <span style="width:10%" class="content-operation">
                        <i class="edit"></i>
                        <i class="del"></i>
                    </span>
                </div>
            </div>
            <div class="table-bottom" @click="addStep">
                <span class="submit"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "editCourse",
	components: {},
	mixins: [],
	props: {},
	data() {
		return {};
	},
	computed: {},
	watch: {},
	filters: {},
	methods: {
		addModule() {},
		editModule() {},
		delModule() {},
		addStep() {
			console.log("addStep");
		}
	},
	created() {},
	mounted() {},
	beforeDestory() {}
};
</script>
<style lang='less'>
.edit-Course {
	position: absolute;
	top: 0px;
	bottom: 0px;
	right: 0px;
	left: 0px;
	background-color: #f6f7fb;
	.nav {
		margin: 30px 0px 30px 30px;
		i {
			width: 18px;
			height: 17px;
			display: inline-block;
			background-image: url("/assets/img/course/nav.png");
		}
		h3 {
			display: inline-block;
			font-size: 24px;
			color: #4081ff;
			font-weight: bold;
			margin-left: 14px;
		}
	}
	.content {
		width: 1629px;
		background: #fff;
		border-radius: 4px;
		box-shadow: 0px 0px 40px rgba(180, 182, 214, 0.16);
		margin-left: 30px;
		.module {
			width: 100%;
			height: 132px;
			text-align: center;
			span {
				width: 98px;
				height: 98px;
				background: #c7c7c7;
				border-radius: 10px;
				color: #fff;
				font-size: 14px;
				text-align: center;
				line-height: 98px;
				display: inline-block;
				margin-right: 89px;
				margin-top: 12px;
				font-weight: bold;
				cursor: pointer;
			}
			& > .active {
				background: linear-gradient(#2f7cef, #5baffd);
				&:after {
					content: "";
					width: 111px;
					height: 22px;
					display: block;
					background-image: url(/assets/img/course/module.png);
					background-repeat: no-repeat;
					margin-left: -10px;
					margin-top: -2px;
				}
			}
		}
		.module-operation {
			float: right;
			position: relative;
			top: -55px;
			right: 20px;
			span {
				display: inline-block;
				width: 50px;
				height: 50px;
				cursor: pointer;
			}
			.add {
				background-image: url("/assets/img/course/module-add.png");
			}
			.edit {
				background-image: url("/assets/img/course/module-edit.png");
			}
			.del {
				background-image: url("/assets/img/course/module-del.png");
			}
		}
		.table-header {
			width: 100%;
			height: 58px;
			background: linear-gradient(#ffffff, #eeeeee);
			span {
				line-height: 58px;
				display: inline-block;
				text-align: center;
			}
		}
		.table-content {
			div {
                background: #fff;
                cursor: pointer;
				span {
					line-height: 58px;
					display: inline-block;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					i {
						width: 52px;
						height: 29px;
						display: inline-block;
						border-radius: 14px;
						cursor: pointer;
						&:after {
							content: "";
							color: #fff;
							display: block;
							margin-top: -14px;
						}
					}
					.edit {
						margin-right: 35px;
						background: linear-gradient(#2f7cef, #3298f7);
						&:after {
							content: "编辑";
						}
					}
					.del {
						background: linear-gradient(#ff2156, #ff7539);
						&:after {
							content: "删除";
						}
					}
				}
				.content-operation {
					display: none;
				}
				&:hover {
					& > .content-operation {
						display: inline-block;
					}
				}
			}
			& > :nth-child(even) {
				background: #eff2f6;
			}
		}
		.table-bottom {
			width: 100%;
			height: 114px;
			border-top: 1px solid rgba(241, 241, 241, 1);
			.submit {
				width: 153px;
				height: 36px;
				display: inline-block;
				background: rgba(64, 129, 255, 1);
				border-radius: 20px;
				box-shadow: 0px 0px 24px rgba(64, 129, 255, 1);
				cursor: pointer;
				margin: 39px 45%;
				&:before {
					content: "添加步骤";
					display: block;
					color: #fff;
					margin-top: 10px;
					margin-left: 60px;
				}
				&:after {
					content: "";
					width: 16px;
					height: 16px;
					display: block;
					background-image: url("/assets/img/course/add.png");
					margin-top: -15px;
					margin-left: 35px;
				}
			}
		}
	}
}
</style>