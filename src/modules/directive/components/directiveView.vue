<template>
	<div style="transform:translate(0,0)">
		<xui-modal ref="modal" :options="options">
			<template slot-scope="props" slot="content">
				<div v-if="props.opened" style="width:580px;min-height: 330px;">
					<div class="directive-form">
						<div class="form-item" v-if="type=='edit'">
							<div class="user-lable">指令ID</div>
							<div class="user-operate">
								<span class="user-id">{{modelDirective.id}}</span>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">指令类型</div>
							<div class="user-operate">
								<xui-select v-model="modelDirective.type" :options="typeOptions"></xui-select>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">指令匹配</div>
							<div class="user-operate">
								<xui-select v-model="modelDirective.curriculum_id" :options="matchOptions1"></xui-select>
								<xui-select v-model="modelDirective.level_id" :options="matchOptions2"></xui-select>
								<xui-select v-model="modelDirective.section_id" :options="matchOptions3"></xui-select>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">指令名称</div>
							<div class="user-operate cp" :class="{'error':modelDirectiveError.error}">
								<xui-input v-model="modelDirective.name" :options="inputOnptions"></xui-input>
								<p class="error-tips" v-show="modelDirectiveError.error">{{modelDirectiveError.tips}}</p>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">触发提示</div>
							<div class="user-operate">
								<xui-input v-model="modelDirective.tips" :options="inputOnptions" style="width:217px;"></xui-input>
								<div class="parameter-seting-btn" @click="showParams=!showParams">参数设置</div>
							</div>
							<div class="parameter-list" v-show="showParams">
								<div class="arrow"></div>
								<div v-for="(item,index) in parameterData" :key="index">
									<span>{{item.name}}</span>
									<div class="step-item" :class="{'error-class':item.item1.error}">
										<xui-input v-model="item.item1.value" :options="inputOnptions" class="parameter-input parameter-input1" :placeholder="item.item1.placeholder" :class="{'direct-class':(item.name=='人物方向')||(item.name=='标题')}" @change="input1Change(item.item1)"></xui-input>
										<span class="err-tips">{{item.item1.error}}</span>
									</div>
									<div class="step-item" :class="{'error-class':item.item2.error}" v-if="(item.name!='人物方向')&&(item.name!='标题')">
										<xui-input v-model="item.item2.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item2.placeholder" @change="input2Change(item.item2)"></xui-input>
										<span class="err-tips">{{item.item2.error}}</span>
									</div>
									<div class="step-item" :class="{'error-class':item.item3.error}" v-if="item.name!='人物方向'">
										<xui-input v-model="item.item3.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item3.placeholder" @change="input3Change(item.item3),$event"></xui-input>
										<span class="err-tips">{{item.item3.error}}</span>
									</div>
									<div class="step-item" :class="{'error-class':item.item4.error}" v-if="item.name!='人物方向'">
										<xui-input v-model="item.item4.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item4.placeholder" @change="input4Change(item.item4,$event)"></xui-input>
										<span class="err-tips">{{item.item4.error}}</span>
									</div>
									<!-- <div class="step-item" v-if="item.name=='人物方向'">
										<xui-toolbar :options="toolbarParamsOptions"></xui-toolbar>
									</div> -->
								</div>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">触发词</div>
							<div class="user-operate">
								<i class="icon-add-item" @click="addList"></i>
								<div class="triggle-list" :class="{'error-parameter':modelDirectiveContextError.error}">
									<xui-scroll style="height:100%;">
										<p v-for="(item,index)  in triggleData" :key="index" class="triggle-item">
											<xui-input v-model="item.word" :options="inputOnptions" class="triggle-input" @change="triggleTest" :class="{'triggle-has-class':item.word}"></xui-input>
											<i class="icon-delete-item" @click="deletList(index)"></i>
										</p>
									</xui-scroll>

								</div>
								<p class="error-tips" v-show="modelDirectiveContextError.error">{{modelDirectiveContextError.tips}}</p>
								<!-- <xui-input v-model="modelDirective.tips" :options="textareaOnptions"></xui-input> -->
							</div>
						</div>
					</div>
				</div>
			</template>
			<div slot="footer" style="padding:10px;text-align:center;padding-bottom:44px;">
				<xui-toolbar :options="toolbarOptions"></xui-toolbar>
			</div>
		</xui-modal>
	</div>
</template>

<script>
function specilWorldTest(a) {
	if (a == "") {
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
	var pattern = new RegExp("^[0-9]*$");
	if (pattern.test(a)) {
		return true;
	}
	return false;
}
function timeOffset(a) {
	var pattern = new RegExp("^[0-9]*$"),
		pattern2 = new RegExp("^[-|0-9][0-9]*");
	if ((pattern.test(a) || pattern2.test(a))) {
		return true;
	}
	return false;
}

import STORE from "../store.js";
export default {
	created() {
		this.initDirectiveMatch();
	},
	methods: {
		open: function(type, parmas) {
			this.type = type;
			this.reset();
			if (type != "add") {
				this.initDirective(JSON.parse(JSON.stringify(parmas)));
			}
			this.$refs.modal.open();
		},
		//编辑时赋值
		initDirective(parmas) {
			this.modelDirective = {
				id: parmas.id,
				name: parmas.name,
				type: parmas.cmd_type_id,
				level_id: parmas.level_id || "",
				curriculum_id: parmas.curriculum_id || "",
				section_id: parmas.section_id || ""
			};
			this.showParams = false;
			this.parmasSet = false;
			console.log("课程Id", parmas.curriculum_id);
			console.log("等级Id", parmas.level_id);
			console.log("模块Id", parmas.section_id);
			this.modelDirective.tips = parmas.step_item.text;
			this.triggleData = parmas.trigger_words;
			this.parmasStepItem = parmas.step_item;
			//触发提示设置参数复制--运动
			if (parmas.step_item.motion) {
				this.parameterData[0].item2.value = parmas.step_item.motion.action;
				this.parameterData[0].item1.value = parmas.step_item.motion.name;
				this.parameterData[0].item3.value = parmas.step_item.motion.begin;
				this.parameterData[0].item4.value = parmas.step_item.motion.offset;
			} else {
				this.parameterData[0].item1.value = "";
				this.parameterData[0].item2.value = "";
				this.parameterData[0].item3.value = "";
				this.parameterData[0].item4.value = "";
			}

			//表情
			if (parmas.step_item.expression) {
				this.parameterData[1].item2.value = parmas.step_item.expression.action;
				this.parameterData[1].item1.value = parmas.step_item.expression.name;
				this.parameterData[1].item3.value = parmas.step_item.expression.begin;
				this.parameterData[1].item4.value = parmas.step_item.expression.offset;
			} else {
				this.parameterData[1].item1.value = "";
				this.parameterData[1].item2.value = "";
				this.parameterData[1].item3.value = "";
				this.parameterData[1].item4.value = "";
			}

			//镜头
			if (parmas.step_item.camera) {
				this.parameterData[2].item2.value = parmas.step_item.camera.action;
				this.parameterData[2].item1.value = parmas.step_item.camera.name;
				this.parameterData[2].item3.value = parmas.step_item.camera.begin;
				this.parameterData[2].item4.value = parmas.step_item.camera.offset;
			} else {
				this.parameterData[2].item1.value = "";
				this.parameterData[2].item2.value = "";
				this.parameterData[2].item3.value = "";
				this.parameterData[2].item4.value = "";
			}

			//特效
			if (parmas.step_item.effect) {
				this.parameterData[3].item2.value = parmas.step_item.effect.action;
				this.parameterData[3].item1.value = parmas.step_item.effect.name;
				this.parameterData[3].item3.value = parmas.step_item.effect.begin;
				this.parameterData[3].item4.value = parmas.step_item.effect.offset;
			} else {
				this.parameterData[3].item1.value = "";
				this.parameterData[3].item2.value = "";
				this.parameterData[3].item3.value = "";
				this.parameterData[3].item4.value = "";
			}
			//标题
			if (parmas.step_item.hint) {
				this.parameterData[4].item1.value = parmas.step_item.hint.text || parmas.step_item.hint.name;
				this.parameterData[4].item3.value = parmas.step_item.hint.begin;
				this.parameterData[4].item4.value = parmas.step_item.hint.offset;
			} else {
				this.parameterData[4].item1.value = "";
				this.parameterData[4].item3.value = "";
				this.parameterData[4].item4.value = "";
			}

			//人物方向
			this.parameterData[5].item1.value = parmas.step_item.person_dir;
		},
		//获取指令匹配
		initDirectiveMatch() {
			STORE.getCommandsMatch().then(res => {
				if (res.length == 0) {
					return;
				}
				this.commandMatchLevel = {};
				this.matchOptions1.data = [];
				this.matchOptions1.data.push(
					...res.map(item => {
						var cc = {};
						this.commandMatchLevel[item.id] = item.courses;
						console.log("课程接口============s==");
						console.log("等级Id", item.id);
						console.log("课程接口=============e=");
						cc.text = item.name;
						cc.value = item.id;
						return cc;
					})
				);
			});
		},
		addList() {
			if (this.triggleData.length > 0) {
				var cc = this.triggleData.filter(item => {
					return item.word != "";
				});
				if (cc.length == 0) {
				}
			}
			var c = { word: "" };
			this.triggleData.push(c);
		},
		deletList(index) {
			this.triggleData.splice(index, 1);
		},
		//触发词校验
		triggleTest(val) {
			if (val) {
				if (specilWorldTest(val) || $.trim(val) == "") {
					this.modelDirectiveContextError.error = true;
				} else {
					this.modelDirectiveContextError.error = false;
				}
			} else {
				this.modelDirectiveContextError.error = false;
			}
		},
		//保存指令
		saveDirctive() {
			var step_item = this.formatStepItem();
			var params = {
				id: this.modelDirective.id || 0,
				name: this.modelDirective.name,
				cmd_type_id: this.modelDirective.type,
				curriculum_id: this.modelDirective.curriculum_id || 0,
				level_id: this.modelDirective.level_id || 0,
				section_id: this.modelDirective.section_id || 0,
				step_item: step_item,
				trigger_words: this.triggleData
			};
			if (this.modelDirective.name == "") {
				this.modelDirectiveError.error = true;
				this.modelDirectiveError.tips = "指令名称不能为空";
				return;
			} else {
				this.modelDirectiveError.error = false;
			}
			if (
				this.modelDirectiveError.error ||
				this.modelDirectiveContextError.error ||
				this.modelDirectiveTipsError.error ||
				$(".parameter-list").find(".error-class").length>0
			) {
				return false;
			}

			STORE.postCommandsSave(this.modelDirective.id ? "put" : "post", params).then(res => {
				if (res.cmd_type_id) {
					var tips = "新增成功";
					if (this.type == "edit") {
						tips = "编辑成功";
					}
					$tip(tips, "success");
					this.$emit("refresh", true);
					this.$refs.modal.close();
				} else {
					$tip(res, "success");
				}
			});
		},
		//校验
		input1Change(record) {
			if (record.placeholder === "0/180") {
				if (number(record.value) && record.value*1 <= 180) {
					record.error = "";
				} else {
					record.error = "数字不能大于180";
				}
			} else if (record.value.length >= record.maxLength) {
				record.error = "内容超过长度";
			} else {
				record.error = "";
			}
		},
		input2Change(record) {
			if (number(record.value)) {
				record.error = "";
			} else {
				record.error = "数字且不能含特殊字符";
			}
		},
		input3Change(record) {
			if (number(record.value) && record.value*1 <= 100) {
				record.error = "";
			} else if (parseInt(record.value) > 100) {
				record.error = "数字不能大于100";
			} else {
				record.error = "不能含特殊字符";
			}
		},
		input4Change(record) {
			if (timeOffset(record.value)) {
				if (number(record.value.replace("-","")) && record.value.replace("-","")*1> 10) {
					record.error = "数字不能大于10";
				}else{
					record.error = "";
				} 
			}else {
				record.error = "不能含特殊字符";
			}
		},
		//格式化指令触发提示
		formatStepItem() {
			var step = {};
			var motion, expression, camera, effect, hint;
			motion = {
				id: this.parmasStepItem.motion ? this.parmasStepItem.motion.id : 0,
				action: parseInt(this.parameterData[0].item2.value) || 0,
				name: this.parameterData[0].item1.value,
				begin: parseInt(this.parameterData[0].item3.value) || 0,
				offset: parseInt(this.parameterData[0].item4.value) || 0
			};
			expression = {
				id: this.parmasStepItem.expression ? this.parmasStepItem.expression.id : 0,
				action: parseInt(this.parameterData[1].item2.value) || 0,
				name: this.parameterData[1].item1.value,
				begin: parseInt(this.parameterData[1].item3.value) || 0,
				offset: parseInt(this.parameterData[1].item4.value) || 0
			};
			camera = {
				id: this.parmasStepItem.camera ? this.parmasStepItem.camera.id : 0,
				action: parseInt(this.parameterData[2].item2.value) || 0,
				name: this.parameterData[2].item1.value,
				begin: parseInt(this.parameterData[2].item3.value) || 0,
				offset: parseInt(this.parameterData[2].item4.value) || 0
			};
			effect = {
				id: this.parmasStepItem.effect ? this.parmasStepItem.effect.id : 0,
				action: parseInt(this.parameterData[3].item2.value) || 0,
				name: this.parameterData[3].item1.value,
				begin: parseInt(this.parameterData[3].item3.value) || 0,
				offset: parseInt(this.parameterData[3].item4.value) || 0
			};
			hint = {
				id: this.parmasStepItem.hint ? this.parmasStepItem.hint.id : 0,
				text: this.parameterData[4].item1.value,
				begin: parseInt(this.parameterData[4].item3.value) || 0,
				offset: parseInt(this.parameterData[4].item4.value) || 0
			};
			if (!motion.action && !motion.name && !motion.begin && !motion.offset) {
				motion = null;
			}
			if (!expression.action && !expression.name && !expression.begin && !expression.offset) {
				expression = null;
			}
			if (!camera.action && !camera.name && !camera.begin && !camera.offset) {
				camera = null;
			}
			if (!effect.action && !effect.name && !effect.begin && !effect.offset) {
				effect = null;
			}
			if (!hint.text && !hint.begin && !hint.offset) {
				hint = null;
			}
			step = {
				id: this.parmasStepItem.id || 0,
				section_id: this.modelDirective.section_id || 0,
				text: this.modelDirective.tips,
				motion: motion,
				expression: expression,
				camera: camera,
				effect: effect,
				hint: hint,
				compare: null,
				person_dir: parseInt(this.parameterData[5].item1.value) || 0
			};
			return step;
		},
		//新增时重置弹框
		reset() {
			this.showParams = false;
			this.parmasSet = false;
			this.triggleData = [];
			this.modelDirective = {
				id: "",
				name: "",
				type: 1,
				level_id: "",
				curriculum_id: "",
				section_id: "",
				tips: ""
			};
			this.parmasStepItem = {};
			this.modelDirectiveError = {
				error: false,
				tips: "指令出现特殊字符"
			};
			this.modelDirectiveContextError = {
				error: false,
				tips: "指令出现特殊字符"
			};
			this.modelDirectiveTipsError = {
				error: false,
				tips: "指令出现特殊字符"
			};
			this.parameterData = [
				{
					name: "动作",
					item1: { value: "", placeholder: "初级示范", error: "", maxLength: 10 },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "表情",
					item1: { value: "", placeholder: "名称", maxLength: 10, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "镜头",
					item1: { value: "", placeholder: "名称", maxLength: 10, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "动效",
					item1: { value: "", placeholder: "名称", maxLength: 10, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "标题",
					item1: { value: "", placeholder: "向右走步特", maxLength: 6, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "人物方向",
					item1: { value: "", placeholder: "0/180", error: "" }
				}
			];
		}
	},
	watch: {
		"modelDirective.name": function(val) {
			if (val) {
				if (specilWorldTest(val)) {
					this.modelDirectiveError.tips = "指令出现特殊字符";
					this.modelDirectiveError.error = true;
				} else {
					this.modelDirectiveError.error = false;
				}
			} else {
				this.modelDirectiveError.error = false;
			}
		},
		"modelDirective.type": function(val) {
			if (val == 2) {
				this.matchOptions1.disabled = false;
				this.matchOptions2.disabled = false;
				this.matchOptions3.disabled = false;
			} else {
				this.matchOptions1.disabled = true;
				this.matchOptions2.disabled = true;
				this.matchOptions3.disabled = true;
			}
		},
		//监听课程
		"modelDirective.curriculum_id": function(val) {
			if (!this.commandMatchLevel || (this.commandMatchLevel[val] && this.commandMatchLevel[val].length == 0)) {
				this.modelDirective.level_id = "";
				return;
			}
			this.commandMatchSection = {};
			this.matchOptions2.data = [];
			this.matchOptions2.data.push(
				...this.commandMatchLevel[val].map(item => {
					var cc = {};
					this.commandMatchSection[item.id] = item.section;
					cc.text = item.name;
					cc.value = item.id;
					console.log("等级接口============s==");
					console.log("等级Id", item.id);
					console.log("等级接口=============e=");
					return cc;
				})
			);
		},
		//监听等级
		"modelDirective.level_id": function(val) {
			if (!val) {
				return;
			}

			if (
				!this.commandMatchSection ||
				(this.commandMatchSection[val] && this.commandMatchSection[val].length == 0)
			) {
				this.modelDirective.level_id = "";
				return;
			}
			this.matchOptions3.data = [];
			this.matchOptions3.data.push(
				...this.commandMatchSection[val].map(item => {
					var cc = {};
					cc.text = item.name;
					cc.value = item.id;
					console.log("模型接口============s==");
					console.log("等级Id", item.id);
					console.log("模型接口=============e");
					return cc;
				})
			);
		}
	},
	data() {
		return {
			type: "",
			triggleData: [],
			showParams: false,
			parmasSet: false, //判断是不是设置参数,
			parmasStepItem: {}, //
			commandMatchLevel: null,
			commandMatchSection: null,
			modelDirectiveError: {
				error: false,
				tips: "指令出现特殊字符"
			},
			modelDirectiveContextError: {
				error: false,
				tips: "指令出现特殊字符"
			},
			modelDirectiveTipsError: {
				error: false,
				tips: "指令出现特殊字符"
			},
			modelDirective: {
				id: "",
				name: "",
				type: 1,
				level_id: "",
				curriculum_id: "",
				section_id: "",
				tips: ""
			},
			parameterData: [
				{
					name: "动作",
					item1: { value: "", placeholder: "初级示范", error: "", maxLength: 6 },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "表情",
					item1: { value: "", placeholder: "名称", maxLength: 10, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "镜头",
					item1: { value: "", placeholder: "名称", maxLength: 10, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "动效",
					item1: { value: "", placeholder: "名称", maxLength: 10, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "标题",
					item1: { value: "", placeholder: "向右走步特", maxLength: 6, error: "" },
					item2: { value: "", placeholder: "ID", error: "" },
					item3: { value: "", placeholder: "触发时机", error: "" },
					item4: { value: "", placeholder: "偏移时间", error: "" }
				},
				{
					name: "人物方向",
					item1: { value: "", placeholder: "0/180", error: "" }
				}
			],
			matchOptions2: {
				multiple: false,
				clearable: false,
				filter: false,
				disabled: true,
				placeholder: "等级",
				enumUnmatch: "等级",
				style: "width:90px;",
				data: []
			},
			matchOptions1: {
				multiple: false,
				clearable: false,
				filter: false,
				disabled: true,
				placeholder: "课程",
				enumUnmatch: "课程",
				style: "width:90px;",
				data: []
			},
			matchOptions3: {
				multiple: false,
				clearable: false,
				filter: false,
				disabled: true,
				placeholder: "模块",
				style: "width:90px;",
				enumUnmatch: "模块",
				data: []
			},
			typeOptions: {
				multiple: false,
				clearable: true,
				filter: false,
				data: [
					{
						text: "控制指令",
						value: 1
					},
					{
						text: "选择指令",
						value: 2
					}
				]
			},
			options: {
				top: "50%",
				title: "",
				maskClose: false
			},
			inputOnptions: {
				type: "text",
				clearable: true
			},
			toolbarOptions: {
				size: "medium",
				tools: [
					{
						label: "保存",
						style:
							"background:#4081FF;color:#fff;border-radius:20px;margin-right:20px;padding:15px 30px;line-height:0px",
						// color: "success",
						operate: () => {
							this.saveDirctive();
						}
					},
					{
						label: "取消",
						style: "background:#CCCCCC;color:#fff;border-radius:20px;padding:15px 30px;line-height:0px",
						operate: () => {
							this.$refs.modal.close();
						}
					}
				]
			},
			toolbarParamsOptions: {
				size: "medium",
				tools: [
					{
						label: "保存",
						style:
							"background:#4081FF;color:#fff;border-radius:20px;text-align:center;margin-right:10px;padding:5px 10px;line-height:0px",
						operate: () => {
							this.parmasSet = true;
							this.showParams = false;
						}
					},
					{
						label: "取消",
						style:
							"background:#CCCCCC;color:#fff;border-radius:20px;text-align:center;padding:5px 10px;line-height:0px",
						operate: () => {
							this.showParams = false;
							this.parmasSet = false;
						}
					}
				]
			}
		};
	}
};
</script>
<style lang="less">
.error .xui-input-style .el-input--suffix .el-input__inner,
.directive-form .error-parameter.triggle-list:hover,
.directive-form .error-parameter.triggle-list {
	border: 1px solid #e22929;
}
.cp.error .el-input__inner {
	border: 1px solid #e22929;
}
.directive-form {
	overflow: hidden;
	padding: 20px 30px 10px 30px;
	padding-left: 55px;
	.form-item {
		display: block;
		margin: 20px 0px;
		min-height: 30px;
	}
	.el-input__inner {
		color: #333;
	}
	.form-item > div {
		position: relative;
		display: inline-block;
		float: left;
	}
	.user-id {
		background: #ededed;
		color: #999999;
		padding: 5px;
		min-width: 40px;
		display: inline-block;
		border-radius: 4px;
	}
	.form-item .user-lable {
		width: 90px;
		text-align: center;
		line-height: 30px;
		color: #333;
	}
	.parameter-list {
		position: relative;
		text-align: left;
		margin: 10px 0px 10px 0px;
		padding-left: 15px;
		// border-left: 1px solid #ccc;
		border: 1px solid #bbd2ff;
		background: #f2f6fa;
		border-radius: 4px;
		padding: 10px;
		.step-item {
			margin: 2px 0px;
			display: inline-block;
			position: relative;
		}
		div > span {
			width: 60px;
			text-align: right;
			display: inline-block;
			color: #333;
		}
		.err-tips {
			position: absolute;
			left: 0px;
			color: #e22929;
			display: none;
			width: 200px;
			bottom: -9px;
			text-align: left;
		}
		.error-class .err-tips {
			display: inline;
		}
		.error-class .el-input__inner:hover,
		.error-class .el-input__inner {
			border-color: #e22929 !important;
		}
		.arrow {
			position: absolute;
			right: 93px;
			width: 0px;
			height: 0px;
			border-top: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 10px solid #f2f6fa;
			border-left: 10px solid transparent;
			top: -20px;
		}
	}
	.parameter-seting-btn {
		cursor: pointer;
		width: 84px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: #4081ff;
		display: inline-block;
		margin-left: 120px;
		border-radius: 4px;
		color: #fff;
		position: absolute;
		left: 113px;
		top: 0px;
	}
	.parameter-input {
		display: inline-block;
		width: 70px;
		border-radius: 0px;
		height: 30px;
		margin: 5px;
	}
	.parameter-input1 {
		width: 100px;
	}
	.parameter-input.direct-class {
		width: 185px;
	}
	.triggle-list {
		width: 286px;
		height: 160px;
		overflow: hidden;
		float: none;
		clear: both;
		border-radius: 5px;
		border: 1px solid #c0c4cc;
		&:hover {
			border: 1px solid #4081ff;
		}
		.triggle-input {
			width: 220px;
			border-radius: 0px;
			height: 30px;
			margin: 5px;
		}
		.triggle-has-class {
			.el-input__inner {
				border-width: 0px;
			}
			.el-input__inner:focus,
			.el-input__inner:hover {
				border-width: 1px;
			}
		}
		p {
			position: relative;
		}
	}
	.icon-add-item {
		background: #4081ff;
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		position: absolute;
		top: 10px;
		right: -30px;
		border-radius: 100%;
		&:after {
			content: url("/assets/directive/icon/icon-add16.png");
			position: absolute;
			top: 2px;
			left: 2px;
		}
	}
	.triggle-item:hover .icon-delete-item {
		display: inline-block;
	}
	.icon-delete-item {
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		position: absolute;
		right: 30px;
		top: 0px;
		display: none;
		&:after {
			content: url("/assets/directive/icon/icon-delete16.png");
			position: absolute;
			top: 2px;
			left: 2px;
		}
	}
	.error-tips {
		color: #e22929;
		font-size: 12px;
		text-align: left;
		/* margin-top: 10px; */
		position: absolute;
		left: 10px;
		bottom: -14px;
	}
}
</style>
