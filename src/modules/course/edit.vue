<!-- 课程编辑 -->
<template>
    <div class="edit-Course">
        <div class="nav">
            <i/>
            <h3>伦巴 > 方法 > 中级</h3>
        </div>
        <div class="content">
            <div class="module">
                <span :class="{'active': activeModule === item}" v-for="item in moduleList" :key="item" @click="chooseModule(item)">{{item}}</span>
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
            <!--  -->
            <div class="table-content">
                <div class="step" v-for="(item,index) in moduleData" :key="index">
                    <span style="width:5%">{{index+1}}</span>
                    <span style="width:20%;text-align: left;">{{item.des}}</span>
                    <span style="width:8%">{{item.actionID}}</span>
                    <span style="width:8%">{{item.facdID}}</span>
                    <span style="width:8%">{{item.sceneID}}</span>
                    <span style="width:8%">{{item.comparisonID}}</span>
                    <span style="width:8%">{{item.dynamicID}}</span>
                    <span style="width:10%">{{item.title}}</span>
                    <span style="width:10%">{{item.direction}}</span>
                    <span style="width:10%" class="content-operation">
                        <i class="edit" @click="editStep(index,item)"></i>
                        <i class="del"></i>
                    </span>
                    <div class="module-edit" v-show="activeStepEdit === index">
                        <div class="edit-content">
                            <ul>
                                <li>
                                    <label>话术</label>
                                </li>
                                <li role="3">
                                    <xui-input style="width:688px" placeholder="话术"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>动作</label>
                                </li>
                                <li>
                                    <xui-input class="default-input" placeholder="初级示范"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="id-input" placeholder="ID"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="timing-input" placeholder="触发时机"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="offset-input" placeholder="偏移时间"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>表情</label>
                                </li>
                                <li>
                                    <xui-input class="default-input" placeholder="初级示范"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="id-input" placeholder="ID"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="timing-input" placeholder="触发时机"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="offset-input" placeholder="偏移时间"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>镜头</label>
                                </li>
                                <li>
                                    <xui-input class="default-input" placeholder="初级示范"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="id-input" placeholder="ID"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="timing-input" placeholder="触发时机"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="offset-input" placeholder="偏移时间"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>比对</label>
                                </li>
                                <li>
                                    <xui-input class="default-input" placeholder="初级示范"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="id-input" placeholder="ID"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="timing-input" placeholder="触发时机"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="offset-input" placeholder="偏移时间"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>动效</label>
                                </li>
                                <li>
                                    <xui-input class="default-input" placeholder="初级示范"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="id-input" placeholder="ID"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="timing-input" placeholder="触发时机"></xui-input>
                                </li>
                                <li>
                                    <xui-input class="offset-input" placeholder="偏移时间"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>标题</label>
                                </li>
                                <li>
                                    <xui-input placeholder="标题" style="width:212px;margin-right: 106px;"></xui-input>
                                </li>
                                <li>
                                    <label>人物方向</label>
                                </li>
                                <li>
                                    <xui-input placeholder="0/180" style="width:270px"></xui-input>
                                </li>
                            </ul>
                            <ul>
                                <li style="margin-right: 35px;">
                                    <span class="step-btn confirm" @click="confirmStep"></span>
                                </li>
                                <li>
                                    <span class="step-btn cancel" @click="cancelStep"></span>
                                </li>
                            </ul>
                            <!-- <xui-filter ref="filter" :options="filterOptions" @filter="onFilter"></xui-filter> -->
                        </div>
                    </div>
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
		return {
			moduleList: ["动作示范示范", "动作示范", "动作示"],
			activeModule: "动作示范示范",
			moduleData: [
				{
					des: "欢迎学习说的发生都发生的发的发发多少的风格多少的风格多少的风格",
					actionID: "100",
					facdID: "13",
					sceneID: "9",
					comparisonID: "11",
					dynamicID: "15",
					title: "向前走转弯",
					direction: "1"
				},
				{
					des: "欢迎学习说的发生都发生的发的发发",
					actionID: "100",
					facdID: "13",
					sceneID: "9",
					comparisonID: "11",
					dynamicID: "15",
					title: "向前走转弯",
					direction: "1"
				}
			],
			activeStepEdit: ""
		};
	},
	computed: {},
	watch: {},
	filters: {},
	methods: {
		chooseModule(item) {
			this.activeModule = item;
		},
		addModule() {},
		editModule() {},
		delModule() {},
		addStep() {
			console.log("addStep");
		},
		editStep(index, item) {
			this.activeStepEdit = index;
		},
		delStep() {},
		onFilter() {},
		confirmStep() {},
		cancelStep() {
			this.activeStepEdit = "";
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
			.step {
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
						background: linear-gradient(#3298f7, #2f7cef);
						&:after {
							content: "编辑";
						}
					}
					.del {
						background: linear-gradient(#ff7539, #ff2156);
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
		.module-edit {
			width: 100%;
			height: 606px;
			background: rgba(230, 237, 247, 1);
			text-align: center;
			.edit-content {
				width: 1001px;
				height: 606px;
				background: rgba(242, 246, 250, 1);
				box-shadow: 0px 0px 84px rgba(139, 149, 163, 0.2);
				display: inline-block;
				ul {
					margin: 33px 120px 0px 120px;
					li {
						display: inline-block;
						label {
							font-size: 16px;
							color: #333333;
							font-weight: 500;
							display: block;
							margin-right: 30px;
						}
						.el-input .el-input__inner {
							height: 36px;
							line-height: 36px;
						}
						.step-btn {
							width: 98px;
							height: 36px;
							display: inline-block;
							border-radius: 18px;
							&:after {
								content: "";
								color: #fff;
								display: block;
								margin-top: -10px;
							}
						}
						.default-input {
							width: 212px;
							margin-right: 20px;
						}
						.id-input {
							width: 150px;
							margin-right: 20px;
						}
						.timing-input {
							width: 127px;
							margin-right: 20px;
						}
						.offset-input {
							width: 127px;
						}
						.confirm {
							background: rgba(64, 129, 255, 1);
							&:after {
								content: "确定";
							}
						}
						.cancel {
							background: rgba(204, 204, 204, 1);
							&:after {
								content: "取消";
							}
						}
					}
				}
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