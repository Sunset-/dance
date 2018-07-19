<!-- 课程编辑 -->
<template>
	<div class="edit-Course">
		<div class="nav">
			<i/>
			<h3>{{currentData.level.name}} > {{currentData.course.name}}</h3>
		</div>
		<div class="content">
			<div class="module">
				<span :class="{'active': activeSection.name === item.name}" v-for="item in sectionList" :key="item.id" @click="chooseSection(item)">{{item.name}}</span>
			</div>
			<!-- 模块操作 -->
			<div class="module-operation">
				<span class="add" @click="addSection"></span>
				<span class="edit" @click="editSection"></span>
				<span class="del" @click="delSection"></span>
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
				<div class="step" v-for="(item,index) in stepList" :key="index">
					<span style="width:5%">{{index+1}}</span>
					<span style="width:20%;text-align: center;">{{item.text}}</span>
					<span style="width:8%">{{item.motion && item.motion.name}}</span>
					<span style="width:8%">{{item.expression && item.expression.name}}</span>
					<span style="width:8%">{{item.camera && item.camera.name}}</span>
					<span style="width:8%">{{item.compare && item.compare.name}}</span>
					<span style="width:8%">{{item.effect && item.effect.name}}</span>
					<span style="width:10%">{{item.hint && item.hint.text}}</span>
					<span style="width:10%">{{item.person_dir && item.person_dir}}</span>
					<span style="width:10%" class="content-operation">
						<i class="edit" @click="editStep(index,item)"></i>
						<i class="del" @click="delStep(item)"></i>
					</span>
					<div class="module-edit" v-show="activeStepEdit === index">
						<div class="edit-content">
							<ul v-for="(val,key) in editSteps">
								<div v-if="key !== 'special'">
									<li>
										<label>{{val.name}}</label>
									</li>
									<li v-for="step in val.item">
										<xui-input :class="step.class" v-model="step.value" :placeholder="step.placeholder" :style="step.style"></xui-input>
									</li>
								</div>
								<div v-if="key === 'special'" v-for="s in val" style="display: inline-block;">
									<li>
										<label>{{s.name}}</label>
									</li>
									<li v-for="i in s.item">
										<xui-input :class="i.class" v-model="i.value" :placeholder="i.placeholder" :style="i.style"></xui-input>
									</li>
								</div>

							</ul>
							<ul>
								<li style="margin-right: 35px;">
									<span class="step-btn confirm" @click="confirmStep"></span>
								</li>
								<li>
									<span class="step-btn cancel" @click="cancelStep(item)"></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 当小节为空时,添加第一条步骤 -->
				<div class="step">
					<div class="module-edit" v-show="isShowfirstSteps">
						<div class="edit-content">
							<ul v-for="(val,key) in editSteps">
								<div v-if="key !== 'special'">
									<li>
										<label>{{val.name}}</label>
									</li>
									<li v-for="step in val.item">
										<xui-input :class="step.class" v-model="step.value" :placeholder="step.placeholder" :style="step.style"></xui-input>
									</li>
								</div>
								<div v-if="key === 'special'" v-for="s in val" style="display: inline-block;">
									<li>
										<label>{{s.name}}</label>
									</li>
									<li v-for="i in s.item">
										<xui-input :class="i.class" v-model="i.value" :placeholder="i.placeholder" :style="i.style"></xui-input>
									</li>
								</div>
							</ul>
							<ul>
								<li style="margin-right: 35px;">
									<span class="step-btn confirm" @click="confirmStep()"></span>
								</li>
								<li>
									<span class="step-btn cancel" @click="cancelStep()"></span>
								</li>
							</ul>
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
import store from "./store.js";
export default {
	name: "editCourse",
	components: {},
	mixins: [],
	props: {
		currentData: {
			type: Object,
			default(params) {
				return {};
			}
		}
	},
	data() {
		return {
			sectionList: [],
			activeSection: {},
			stepList: [],
			activeStepEdit: "",
			editSteps: {
				text: {
					name: "话术",
					key: "text",
					item: [{ value: "", placeholder: "话术", class: "", style: "width:675px" }]
				},
				motion: {
					name: "动作",
					item: [
						{ value: "", placeholder: "初级示范", class: "default-input" },
						{ value: "", placeholder: "ID", class: "id-input" },
						{ value: "", placeholder: "触发时机", class: "timing-input" },
						{ value: "", placeholder: "偏移时间", class: "offset-input" }
					]
				},
				expression: {
					name: "表情",
					item: [
						{ value: "", placeholder: "初级示范", class: "default-input" },
						{ value: "", placeholder: "ID", class: "id-input" },
						{ value: "", placeholder: "触发时机", class: "timing-input" },
						{ value: "", placeholder: "偏移时间", class: "offset-input" }
					]
				},
				camera: {
					name: "镜头",
					item: [
						{ value: "", placeholder: "初级示范", class: "default-input" },
						{ value: "", placeholder: "ID", class: "id-input" },
						{ value: "", placeholder: "触发时机", class: "timing-input" },
						{ value: "", placeholder: "偏移时间", class: "offset-input" }
					]
				},
				compare: {
					name: "比对",
					item: [
						{ value: "", placeholder: "初级示范", class: "default-input" },
						{ value: "", placeholder: "ID", class: "id-input" },
						{ value: "", placeholder: "触发时机", class: "timing-input" },
						{ value: "", placeholder: "偏移时间", class: "offset-input" }
					]
				},
				effect: {
					name: "动效",
					item: [
						{ value: "", placeholder: "初级示范", class: "default-input" },
						{ value: "", placeholder: "ID", class: "id-input" },
						{ value: "", placeholder: "触发时机", class: "timing-input" },
						{ value: "", placeholder: "偏移时间", class: "offset-input" }
					]
				},
				special: {
					hint: {
						name: "标题",
						item: [{ value: "", placeholder: "向右走步特", style: "width:212px;margin-right: 93px;" }]
					},
					person_dir: {
						name: "人物方向",
						item: [{ value: "", placeholder: "0/180", style: "width:270px" }]
					}
				}
			},
			isShowfirstSteps: false
		};
	},
	computed: {},
	watch: {},
	filters: {},
	methods: {
		chooseSection(item) {
			this.activeSection = item;
			this.getStepBySectionId();
		},
		//获取小节
		getSection() {
			let course = this.currentData.course;
			store
				.getSectionsByCourseId({
					name: "",
					curriculum_id: "",
					curriculum_name: ""
				})
				.then(res => {
					this.sectionList = res;
					this.activeSection = this.sectionList[0];
					this.getStepBySectionId();
				});
		},
		//新增小节
		addSection() {},
		//编辑小节
		editSection() {},
		//删除小节
		delSection() {
			store.delSection(this.activeSection.id).then(() => {
				this.getSection();
			});
		},
		//获取步骤数据
		getStepBySectionId() {
			store
				.getStepBySectionId({
					section_id: this.activeSection.id
				})
				.then(res => {
					this.stepList = res;
				});
		},
		//添加步骤
		addStep() {
			let newStep = {};
			newStep.section_id = this.activeSection.id;
			if (this.stepList.length > 0) {
				newStep = this.stepList[this.stepList.length - 1];
				newStep.section_id = this.activeSection.id;
				store.addSteps(newStep).then(res => {
					this.getSection();
				});
				this.isShowfirstSteps = false;
			} else {
				this.isShowfirstSteps = true;
			}
		},
		//步骤编辑
		editStep(index, item) {
			this.activeStepEdit = index;
			this.filterEditSteps(item);
		},
		//步骤删除
		delStep(item) {
			store.delSteps(item.id).then(res => {
				this.getSection();
			});
		},
		filterEditSteps(currentStep) {
			for (const key in currentStep) {
				if (currentStep.hasOwnProperty(key)) {
					const element = currentStep[key];
					switch (key) {
						case "motion":
						case "expression":
						case "camera":
						case "compare":
						case "effect":
							if (element !== null) {
								this.editSteps[key].item[0].value = element.name;
								this.editSteps[key].item[1].value = element.action;
								this.editSteps[key].item[2].value = element.begin;
								this.editSteps[key].item[3].value = element.offset;
							}
							break;
						case "hint":
							if (element !== null) {
								this.editSteps["special"][key].item[0].value = element.text;
							}
							break;
						case "person_dir":
							if (element !== null) {
								this.editSteps["special"][key].item[0].value = element;
							}
							break;
						case "text":
							this.editSteps[key].item[0].value = element;
							break;
						default:
							break;
					}
				}
			}
			this.editSteps.id = currentStep.id;
		},
		//编辑小节
		confirmStep() {
			console.log(this.editSteps);
			let newStep = {
				id: 0,
				section_id: this.activeSection.id
			};
			for (const key in this.editSteps) {
				if (this.editSteps.hasOwnProperty(key)) {
					const element = this.editSteps[key];
					console.log(element);
					switch (key) {
						case "motion":
						case "expression":
						case "camera":
						case "compare":
						case "effect":
							if (element !== null) {
								let obj = {
									id: 0,
									name: element.item[0].value,
									action: parseInt(element.item[1].value === "" ? 0 : element.item[1].value),
									begin: parseInt(element.item[2].value === "" ? 0 : element.item[2].value),
									offset: parseInt(element.item[3].value === "" ? 0 : element.item[3].value),
									end: 0,
									wait: false
								};
								newStep[key] = obj;
							} else {
								newStep[key] = null;
							}
							break;
						case "special":
							if (element.hint !== null) {
								let obj = {
									id: 0,
									name: element.hint.item[0].value,
									action: 0,
									begin: 0,
									offset: 0,
									end: 0,
									wait: false
								};
								newStep["hint"] = obj;
							} else {
								newStep["hint"] = null;
							}
							if (element.person_dir !== null) {
								newStep["person_dir"] = parseInt(
									element.person_dir.item[0].value === "" ? 0 : element.person_dir.item[0].value
								);
							} else {
								newStep["person_dir"] = 0;
							}
							break;
						case "text":
							newStep["text"] = element.item[0].value;
							break;
						default:
							break;
					}
				}
			}
			if (this.editSteps.id) {
				store.updateSteps(this.editSteps.id, newStep).then(res => {
					this.isShowfirstSteps = false;
					this.activeStepEdit = "";
					this.getSection();
				});
			} else {
				store.addSteps(newStep).then(res => {
					this.isShowfirstSteps = false;
					this.getSection();
				});
			}
		},
		cancelStep(item) {
			this.activeStepEdit = "";
			this.isShowfirstSteps = false;
		}
	},
	created() {},
	mounted() {
		this.getSection();
	},
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