<!-- 课程编辑 -->
<template>
	<div>
		<div class="course-table-header fixed" style="display: none;" ref="fixedtableheader">
			<span style="width:5%">序号</span>
			<span style="width:20%">话术</span>
			<span style="width:8%">动作ID</span>
			<span style="width:8%">表情ID</span>
			<span style="width:8%">镜头ID</span>
			<span style="width:8%">比对ID</span>
			<span style="width:8%">动效ID</span>
			<span style="width:10%">标题</span>
			<span style="width:10%">人物方向</span>
			<span style="width:10%"></span>
		</div>
		<div class="edit-Course" ref="container">
			<div class="nav">
				<i/>
				<h3 @click="goback">{{currentData.levelname}} > {{currentData.soursename}}</h3>
			</div>
			<div class="content" ref="content">
				<div class="module" :class="{'module-left':sectionList.length > 6}">
					<div v-for="item in sectionList" :key="item.id">
						<span :class="{'active': activeSection.id === item.id}" v-show="!item.edit" @click="chooseSection(item)">
							<i>{{item.name}}</i>
						</span>
						<span class="sectionEditspan" v-show="activeSection.id === item.id && activeSection.edit ">
							<input :class="['sectionInput','edit-input',activeSection.id === item.id && activeSection.edit?'editing':'']" v-model="item.name" @keydown.enter="triggerBlurHandle($event)" @blur="saveRecord($event,item)" autofocus maxlength="6" />
						</span>

					</div>
				</div>
				<!-- 模块操作 -->
				<div class="module-operation">
					<span class="add" @click="addSection"></span>
					<span class="edit" @click="editSection"></span>
					<span class="del" @click="delSection"></span>
				</div>
				<div class="course-table-header" ref="tableheader">
					<span style="width:10%">序号</span>
					<span style="width:15%">话术</span>
					<span style="width:8%">动作ID</span>
					<span style="width:8%">表情ID</span>
					<span style="width:8%">镜头ID</span>
					<span style="width:8%">比对ID</span>
					<span style="width:8%">动效ID</span>
					<span style="width:10%">标题</span>
					<span style="width:10%">人物方向</span>
					<span style="width:10%"></span>
				</div>
				<!-- 步骤内容 -->
				<!-- <xui-scroll style="height:600px"> -->
				<div v-show="activeSection.id" class="table-content" ref="tablecontent">
					<div class="step" v-for="(item,index) in stepList" :key="index">
						<span style="width:10%">{{item.index}}</span>
						<span class="xui-pop" style="width:15%;text-align: center;" :data-content="`<div class='pop-content text'>${item.text}</div>`">{{item.text}}</span>
						<span class="xui-pop" style="width:8%" :data-content="item.motion && `<div class='pop-content'><span class='title'></span><span>触发时机 <em>${item.motion.begin}</em></span><span>偏移时间 <em>${item.motion.offset}</em></span></div>`">{{item.motion && item.motion.action}}</span>
						<span class="xui-pop" style="width:8%" :data-content="item.expression && `<div class='pop-content'><span class='title'></span><span>触发时机 <em>${item.expression.begin}</em></span><span>偏移时间 <em>${item.expression.offset}</em></span></div>`">{{item.expression && item.expression.action}}</span>
						<span class="xui-pop" style="width:8%" :data-content="item.camera && `<div class='pop-content'><span class='title'></span><span>触发时机 <em>${item.camera.begin}</em></span><span>偏移时间 <em>${item.camera.offset}</em></span></div>`">{{item.camera && item.camera.action}}</span>
						<span class="xui-pop" style="width:8%" :data-content="item.compare && `<div class='pop-content'><span class='title'></span><span>触发时机 <em>${item.compare.begin}</em></span><span>偏移时间 <em>${item.compare.offset}</em></span></div>`">{{item.compare && item.compare.action}}</span>
						<span class="xui-pop" style="width:8%" :data-content="item.effect && `<div class='pop-content'><span class='title'></span><span>触发时机 <em>${item.effect.begin}</em></span><span>偏移时间 <em>${item.effect.offset}</em></span></div>`">{{item.effect && item.effect.action}}</span>
						<span class="xui-pop" style="width:10%" :data-content="item.hint && `<div class='pop-content'><span class='title'></span><span>触发时机 <em>${item.hint.begin}</em></span><span>偏移时间 <em>${item.hint.offset}</em></span></div>`">{{item.hint && item.hint.text}}</span>
						<span class="xui-pop" style="width:10%" :data-content="item.person_dir && `<div class='pop-content text'>${item.person_dir}</div>`">{{item.person_dir && item.person_dir}}</span>
						<span style="width:10%" class="content-operation">
							<i class="edit" @click="editStep(index,item)"></i>
							<i class="del" @click="delStep(item)"></i>
						</span>
						<div class="module-edit" v-show="activeStepEdit === index">
							<div class="edit-content">
								<ul v-for="(val,key) in editSteps">
									<div v-if="key === 'special'" v-for="(s,k) in val" style="display: inline-block;" :class="{'offsetDiv':k === 'person_dir'}">
										<li>
											<label style="top:0px;">{{s.name}}</label>
										</li>
										<li v-for="i in s.item">
											<xui-input :class="i.class" v-model="i.value" :placeholder="i.placeholder" :style="i.style" @change="changeHandle(i)"></xui-input>
											<p class="error-tips">{{i.error}}</p>
										</li>
									</div>
									<div v-if="key !== 'special'">
										<li>
											<label>{{val.name}}</label>
										</li>
										<li v-for="step in val.item">
											<xui-input :class="step.class" v-model="step.value" :placeholder="step.placeholder" :style="step.style" @change="changeHandle(step)"></xui-input>
											<p class="error-tips">{{step.error}}</p>
										</li>
									</div>
								</ul>
								<ul>
									<li style="margin-right: 35px;">
										<span class="step-btn confirm" @click="confirmStep()"></span>
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
									<div v-if="key === 'special'" v-for="(s,k) in val" style="display: inline-block;" :class="{'offsetDiv':k === 'person_dir'}">
										<li>
											<label>{{s.name}}</label>
										</li>
										<li v-for="i in s.item">
											<xui-input :class="i.class" v-model="i.value" :placeholder="i.placeholder" :style="i.style" @change="changeHandle(i)"></xui-input>
											<p class="error-tips">{{i.error}}</p>
										</li>
									</div>
									<div v-if="key !== 'special'">
										<li>
											<label>{{val.name}}</label>
										</li>
										<li v-for="step in val.item">
											<xui-input :class="step.class" v-model="step.value" :placeholder="step.placeholder" :style="step.style" @change="changeHandle(step)"></xui-input>
											<p class="error-tips">{{step.error}}</p>
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
				<div class="table-bottom" v-show="activeSection.id">
					<span class="submit" :class="{'submit-none':sectionList.length === 0 }" @click="addStep"></span>
				</div>
				<!-- </xui-scroll> -->
			</div>
			<!-- 删除组件 -->
			<delSection ref="delsection" @ensure="removeSection"></delSection>
		</div>
	</div>
</template>

<script>
function specilWorldTest(a) {
	if (a === "") {
		return false;
	}
	var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
		regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

	if (regEn.test(a) || regCn.test(a)) {
		return true;
	}
	return false;
}
function number(a) {
	var pattern = new RegExp("^[-+]?[0-9]*$");
	if (pattern.test(a)) {
		return true;
	}
	return false;
}
function numberMinus(a) {
	if (a === "") {
		return true;
	}
	var pattern = new RegExp("^[-+]?[0-9]+$");
	if (pattern.test(a)) {
		return true;
	}
	return false;
}
function timeOffset(a) {
	var pattern = new RegExp("^[0-9]*$"),
		pattern2 = new RegExp("^[-|0-9][0-9]* ");
	if ((pattern.test(a) || pattern2.test(a)) && a <= 10) {
		return true;
	}
	return false;
}
import delSection from "./del.vue";
import store from "./store.js";
export default {
	name: "editCourse",
	components: {
		delSection
	},
	mixins: [],
	props: {},
	data() {
		return {
			currentData: {},
			sectionList: [],
			activeSection: {},
			lastActiveRecord: null,
			stepList: [],
			activeStepEdit: "",
			editSteps: {
				special: {
					index: {
						name: "序号",
						id: 0,
						item: [{ value: "", placeholder: "序号", class: "default-input", error: "" }]
					},
					person_dir: {
						name: "人物方向",
						id: 0,
						item: [{ value: "", placeholder: "人物方向", style: "width:300px", error: "" }]
					}
				},
				text: {
					name: "话术",
					key: "text",
					id: 0,
					item: [{ value: "", placeholder: "话术", class: "", style: "width:675px", error: "" }]
				},
				motion: {
					name: "动作",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				expression: {
					name: "表情",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				camera: {
					name: "镜头",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				compare: {
					name: "比对",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				effect: {
					name: "动效",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				hint: {
					name: "标题",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", style: "width:382px", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				}
			},
			isShowfirstSteps: false,
			activeOperation: "",
			statusSetpEdit: false,
			tempEdit: false
		};
	},
	computed: {},
	watch: {},
	filters: {},
	methods: {
		chooseSection(item) {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}
			this.activeSection = item || {};
			var params = this.$route.params;
			$router.push(`/course/${params.couserid}/${params.levelname}/${params.soursename}/${item.id}`);
			if (item) {
				this.getStepBySectionId();
			}
		},
		//获取小节
		getSection() {
			store
				.getSectionsByCourseId({
					name: "",
					curriculum_id: this.currentData.couserid,
					curriculum_name: ""
				})
				.then(res => {
					if (res && res.length > 0) {
						this.sectionList = res.map(val => {
							val.edit = false;
							if (JSON.stringify(this.activeSection) !== "{}" && val.id === this.activeSection.id) {
								this.activeSection = val;
							}
							return val;
						});
						if (JSON.stringify(this.activeSection) === "{}") {
							var sectionId = this.$route.params.section;
							if (sectionId) {
								this.activeSection = this.sectionList.filter(item => item.id == sectionId)[0];
							}
							if (!this.activeSection) {
								this.activeSection = this.sectionList[0];
							}
						}
						this.getStepBySectionId();
					}
				});
		},
		//新增小节
		addSection() {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}
			let flag = true;
			this.sectionList.forEach(section => {
				if (section.name === "") {
					flag = false;
					return;
				}
			});
			if (flag) {
				let tempSection = {
					name: "",
					curriculum: this.currentData.couserid,
					edit: true
				};
				this.lastActiveRecord = this.activeSection;
				this.sectionList.push(tempSection);
				this.activeSection = tempSection;
				this.activeOperation = "add";
			}
			this.$nextTick(() => {
				$(".edit-input.editing").focus();
			});
		},
		//编辑小节
		editSection() {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}
			this.activeSection.edit = true;
			this.activeOperation = "edit";
			this.$nextTick(() => {
				$(".edit-input.editing").focus();
			});
		},
		//删除小节
		delSection() {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}
			this.$refs.delsection.open(this.activeSection);
		},
		removeSection(record) {
			store.delSection(record.id).then(() => {
				var index = this.sectionList.indexOf(record);
				this.sectionList.splice(index, 1);
				this.chooseSection(this.sectionList[index > 0 ? index - 1 : 0]);
			});
		},
		triggerBlurHandle(ev) {
			ev.target.blur();
		},
		saveRecord(ev, item) {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}

			var v = ev.target.value + "";
			if (v.length > 6) {
				$tip("不能多于6个字");
				this.$nextTick(() => {
					item.name = v.substring(0, 6);
					ev.target.focus();
				});
				return;
			}

			if (this.activeSection.name === "") {
				switch (this.activeOperation) {
					case "add":
						this.sectionList.pop();
						this.chooseSection(this.lastActiveRecord);
						break;
					case "edit":
						store.delSection(this.activeSection.id).then(() => {
							this.activeSection = {};
							this.getSection();
						});
						break;
					default:
						break;
				}
			} else {
				this.$set(this.activeSection, "edit", false);
				switch (this.activeOperation) {
					case "add":
						this.addSections(this.activeSection);
						break;
					case "edit":
						this.updateSection(this.activeSection.id, this.activeSection);
						break;
					default:
						break;
				}
			}
		},
		/**
		 * 添加小节
		 */
		addSections(model) {
			store
				.addSections({
					curriculum: model.curriculum,
					name: model.name,
					add_time: Sunset.Dates.format(new Date())
				})
				.then(res => {
					this.activeSection = res;
					this.getSection();
				});
		},
		/**
		 * 修改小节
		 */
		updateSection(sectionId, model) {
			store.updateSection(model.id, {
				curriculum: model.curriculum,
				name: model.name,
				add_time: Sunset.Dates.format(new Date())
			});
		},
		//获取步骤数据
		getStepBySectionId() {
			var requestSectionId = this.activeSection.id;
			store
				.getStepBySectionId({
					section_id: requestSectionId
				})
				.then(res => {
					if (this.activeSection && this.activeSection.id == requestSectionId) {
						this.stepList = res;
					}
				});
		},
		resetStep() {
			this.editSteps = {
				special: {
					index: {
						name: "序号",
						id: 0,
						item: [{ value: "", placeholder: "序号", class: "default-input", error: "" }]
					},
					person_dir: {
						name: "人物方向",
						id: 0,
						item: [{ value: "", placeholder: "人物方向", style: "width:300px", error: "" }]
					}
				},
				text: {
					name: "话术",
					key: "text",
					id: 0,
					item: [{ value: "", placeholder: "话术", class: "", style: "width:675px", error: "" }]
				},
				motion: {
					name: "动作",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				expression: {
					name: "表情",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				camera: {
					name: "镜头",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				compare: {
					name: "比对",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				effect: {
					name: "动效",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", error: "" },
						{ value: "", placeholder: "ID", class: "id-input", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				},
				hint: {
					name: "标题",
					id: 0,
					item: [
						{ value: "", placeholder: "名称", class: "default-input", style: "width:382px", error: "" },
						{ value: "", placeholder: "触发时机", class: "timing-input", error: "" },
						{ value: "", placeholder: "偏移时间", class: "offset-input", error: "" }
					]
				}
			};
		},
		//添加步骤
		addStep() {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}
			let newStep = {};
			if (this.sectionList.length === 0) {
				return;
			}
			newStep.section_id = this.activeSection.id;
			if (this.stepList.length > 0) {
				newStep = Object.assign(newStep, this.stepList[this.stepList.length - 1]);
				newStep.section_id = this.activeSection.id;
				newStep.id = "";
				newStep.index = "";
				this.stepList.push(newStep);
				this.editStep(this.stepList.length - 1, this.stepList[this.stepList.length - 1]);
				this.tempEdit = true;
				this.isShowfirstSteps = false;
			} else {
				this.resetStep();
				this.isShowfirstSteps = true;
			}
			this.statusSetpEdit = true;
		},
		//步骤编辑开始
		editStep(index, item) {
			this.activeStepEdit = index;
			this.statusSetpEdit = true;
			this.resetStep();
			this.filterEditSteps(item);
		},
		//步骤删除
		delStep(item) {
			if (this.statusSetpEdit) {
				$tip("当前正在编辑中", "warning");
				return;
			}
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
								this.editSteps[key].id = element.id;
								this.editSteps[key].item[0].value = element.name;
								this.editSteps[key].item[1].value = element.action;
								this.editSteps[key].item[2].value = element.begin;
								this.editSteps[key].item[3].value = element.offset;
							}
							break;
						case "hint":
							if (element !== null) {
								this.editSteps[key].id = element.id;
								this.editSteps[key].item[0].value = element.text;
								this.editSteps[key].item[1].value = element.begin;
								this.editSteps[key].item[2].value = element.offset;
							}
							break;
						case "person_dir":
							if (element !== null) {
								this.editSteps["special"][key].item[0].value = element;
							}
							break;
						case "index":
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
		//校验
		changeHandle(item) {
			switch (item.placeholder) {
				case "话术":
					if (item.value === "") {
						item.error = "内容不能为空";
					} else if (item.value.length > 200) {
						item.error = "最长200个汉字";
					} else {
						item.error = "";
					}
					break;
				case "名称":
					item.value.length > 10 ? (item.error = "最长10个汉字") : (item.error = "");
					break;
				case "标题":
					item.value.length > 6 ? (item.error = "最长6个汉字") : (item.error = "");
					break;
				case "人物方向":
					if (!number(item.value)) {
						item.error = "仅可填入数字";
					} else if (item.value > 180) {
						item.error = "角度大小不超过180";
					} else {
						item.error = "";
					}
					break;
				case "序号":
					if (!number(item.value)) {
						item.error = "仅可填入数字";
					} else {
						item.error = "";
					}
					break;
				case "ID":
					number(item.value) ? (item.error = "") : (item.error = "仅可填入数字");
					break;
				case "触发时机":
					if (!number(item.value)) {
						item.error = "仅可填入数字";
					} else if (item.value > 100) {
						item.error = "超出话术时长,不超过100";
					} else {
						item.error = "";
					}
					break;
				case "偏移时间":
					if (isNaN(item.value)) {
						item.error = "仅可填入数字";
					} else {
						//  else if (item.value > 10) {
						// 	item.error = "超出话术时长,不超过10";
						// }
						item.error = "";
					}
					break;
				default:
					break;
			}
		},

		//编辑步骤
		confirmStep() {
			let isCheck = true;
			let newStep = {
				id: this.editSteps.id ? this.editSteps.id : 0,
				section_id: this.activeSection.id
			};
			for (const key in this.editSteps) {
				if (this.editSteps.hasOwnProperty(key)) {
					const element = this.editSteps[key];
					switch (key) {
						case "motion":
						case "expression":
						case "compare":
						case "camera":
						case "effect":
							if (
								element.item[0].value !== "" ||
								element.item[1].value !== "" ||
								element.item[2].value !== "" ||
								element.item[3].value !== ""
							) {
								element.item.forEach(i => {
									if (i.error !== "") {
										isCheck = false;
										return;
									}
								});
								let obj = {
									id: element.id,
									name: element.item[0].value,
									action: parseInt(element.item[1].value === "" ? 0 : element.item[1].value),
									begin: parseInt(element.item[2].value === "" ? 0 : element.item[2].value),
									offset: element.item[3].value === "" ? 0 : element.item[3].value,
									end: 0
								};
								newStep[key] = obj;
							} else {
								newStep[key] = null;
							}
							break;
						case "hint":
							if (
								element.item[0].value !== "" ||
								element.item[1].value !== "" ||
								element.item[2].value !== ""
							) {
								element.item.forEach(i => {
									if (i.error !== "") {
										isCheck = false;
										return;
									}
								});
								let obj = {
									id: element.id,
									text: element.item[0].value,
									begin: parseInt(element.item[1].value === "" ? 0 : element.item[1].value),
									offset: element.item[2].value === "" ? 0 : element.item[2].value,
									end: 0
								};
								newStep[key] = obj;
							} else {
								newStep[key] = null;
							}
							break;
						case "special":
							if (element.person_dir.item[0].value !== "") {
								if (element.person_dir.item[0].error !== "") {
									isCheck = false;
									break;
								}
								newStep["person_dir"] = parseInt(element.person_dir.item[0].value);
							} else {
								newStep["person_dir"] = 0;
							}
							if (element.index.item[0].value !== "") {
								newStep["index"] = parseInt(element.index.item[0].value);
							} else {
								newStep["index"] = 0;
							}
							break;
						case "text":
							if (element.item[0].value === "" || element.item[0].error !== "") {
								isCheck = false;
								if (element.item[0].value === "") {
									element.item[0].error = "内容不能为空";
								} else if (element.item[0].value.length > 40) {
									element.item[0].error = "最长40个汉字";
								}
								break;
							}
							newStep["text"] = element.item[0].value;
							break;
						default:
							break;
					}
				}
			}
			//校验步骤序号是否重复
			var isSameIndex = false;
			if (this.stepList && this.stepList.length > 0) {
				this.stepList.forEach(s => {
					if (s.index === newStep.index && s.id != newStep.id) {
						isSameIndex = true;
					}
				});
				if (isSameIndex) {
					$tip("该序号已存在", "warning");
					return;
				}
			}
			//如果存在校验错误，不执行任何操作
			if (!isCheck) {
				return;
			}

			if (this.editSteps.id) {
				store.updateSteps(this.editSteps.id, newStep).then(res => {
					this.isShowfirstSteps = false;
					this.activeStepEdit = "";
					this.getSection();
					this.statusSetpEdit = false;
				});
			} else {
				store.addSteps(newStep).then(res => {
					this.activeStepEdit = "";
					this.isShowfirstSteps = false;
					this.getSection();
					this.statusSetpEdit = false;
					this.tempEdit = false;
				});
			}
		},
		//取消步骤
		cancelStep(item) {
			this.activeStepEdit = "";
			this.statusSetpEdit = false;
			this.isShowfirstSteps = false;
			if (this.tempEdit) {
				this.stepList.pop();
			}
			this.tempEdit = false;
			this.resetStep();
		},
		goback() {
			this.$emit("goback", true);
		},
		initScroll() {
			var $container = $(this.$refs.container);
			var $tableheader = $(this.$refs.tableheader);
			var $fixedtableheader = $(this.$refs.fixedtableheader);
			this.$refs.container.addEventListener("scroll", () => {
				if ($tableheader.offset().top - $container.offset().top <= 0) {
					$fixedtableheader.show();
				} else {
					$fixedtableheader.hide();
				}
			});
		}
	},
	created() {},
	mounted() {
		this.currentData = this.$route.params;
		this.getSection();
		this.initScroll();
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
	overflow-y: auto;
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
			font-size: 22px;
			color: #4081ff;
			font-weight: bold;
			margin-left: 14px;
			cursor: pointer;
		}
	}
	.content {
		background: #fff;
		border-radius: 4px;
		box-shadow: 0px 0px 40px rgba(180, 182, 214, 0.16);
		margin-left: 30px;
		margin-right: 30px;
		.module {
			width: calc(~"100% - 325px");
			min-height: 132px;
			text-align: center;
			margin-left: 180px;
			& > div {
				display: inline-block;
				vertical-align: text-top;
				margin-bottom: 22px;
			}

			.sectionInput {
				position: relative;
				width: 96px;
				height: 100%;
				color: #999999;
				box-shadow: 0px 0px 0px;
				background: #f6f7fb;
				border: 0px;
				font-size: 14px;
				font-weight: bold;
				text-align: center;
				outline: none;
			}
			span {
				width: 98px;
				height: 98px;
				background: #c7c7c7;
				border-radius: 10px;
				color: #fff;
				font-size: 14px;
				text-align: center;
				display: inline-block;
				margin-right: 89px;
				margin-top: 12px;
				font-weight: bold;
				cursor: pointer;
				user-select: none;
				position: relative;
				&:hover {
					color: #fff;
					background: #84aeff;
					box-shadow: 0px 0px 24px #84aeff;
				}
				i {
					position: absolute;
					top: 50%;
					left: 5px;
					right: 5px;
					transform: translate(0, -50%);
				}
			}
			.sectionEditspan {
				background: #f6f7fb;
			}
			& > div > .active {
				background: linear-gradient(#2f7cef, #5baffd);
				&:after {
					position: absolute;
					content: "";
					width: 111px;
					height: 22px;
					display: block;
					background-image: url(/assets/img/course/module.png);
					background-repeat: no-repeat;
					top: 100%;
					margin-top: -2px;
					left: 50%;
					margin-left: -55px;
				}
			}
		}
		.module-left {
			text-align: left;
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
					color: #666;
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
					background: #eff2f6;
					& > .content-operation {
						display: inline-block;
					}
				}
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
				.offsetDiv {
					margin-left: 52px;
				}
				ul {
					margin: 20px 120px 0px 120px;
					li {
						display: inline-block;
						label {
							font-size: 14px;
							color: #333333;
							font-weight: 500;
							display: inline-block;
							margin-right: 30px;
							position: relative;
						}

						.el-input .el-input__inner {
							height: 36px;
							line-height: 36px;
							outline: none;
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
				.error-tips {
					color: #e22929;
					font-size: 12px;
					text-align: left;
					float: left;
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
			.submit-none {
				background: #999;
				box-shadow: 0px 0px 24px #999;
			}
		}
	}
}

.course-table-header {
	width: 100%;
	height: 58px;
	background: linear-gradient(#ffffff, #eeeeee);
	border-top: 1px solid #e9e9e9;
	&.fixed {
		position: absolute;
		top: 0px;
		z-index: 10;
		left: 30px;
		right: 45px;
		width: auto;
	}
	span {
		line-height: 58px;
		display: inline-block;
		text-align: center;
	}
}
.xui-pop-wrap {
	.pop-content {
		width: 183px;
		line-height: 10px;
		.title {
			font-size: 16px;
			text-align: center;
			padding-left: 0px;
			padding-bottom: 15px;
		}
		span {
			display: block;
			padding-left: 24px;
			padding-bottom: 12px;
			font-size: 14px;
			em {
				color: #4081ff;
				margin-left: 50px;
			}
		}
	}
	.text {
		width: 100%;
	}
}
</style>