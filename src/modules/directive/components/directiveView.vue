<template>
	<div style="transform:translate(0,0)">
		<xui-modal ref="modal" :options="options" @opened="tip('opened')" @closed="tip('closed')">
			<template slot-scope="props" slot="content">
				<div v-if="props.opened" style="width:500px;min-height: 330px;">
					<div class="directive-form">
						<div class="form-item" v-if="type=='edit'">
							<div class="user-lable">指令ID</div>
							<div class="user-operate">
								<span>{{modelDirective.id}}</span>
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
								<xui-select v-model="modelDirective.match1" :options="matchOptions1"></xui-select>
								<xui-select v-model="modelDirective.match2" :options="matchOptions2"></xui-select>
								<xui-select v-model="modelDirective.match3" :options="matchOptions3"></xui-select>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">指令名称</div>
							<div class="user-operate">
								<xui-input v-model="modelDirective.name" :options="inputOnptions"></xui-input>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">触发提示</div>
							<div class="user-operate">
								<xui-input v-model="modelDirective.tips" :options="inputOnptions" style="width:217px;"></xui-input>
								<div class="parameter-seting-btn">参数设置</div>
								<div class="parameter-list">
									<div v-for="(item,index) in parameterData" :key="index">
										<span>{{item.name}}</span>
										<xui-input v-model="item.item1.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item1.placeholder"></xui-input>
										<xui-input v-model="item.item2.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item1.placeholder"></xui-input>
										<xui-input v-model="item.item3.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item1.placeholder" v-if="item.name!='标题'"></xui-input>
										<xui-input v-model="item.item4.value" :options="inputOnptions" class="parameter-input" :placeholder="item.item1.placeholder" v-if="item.name!='标题'"></xui-input>
									</div>
								</div>
							</div>
						</div>
						<div class="form-item">
							<div class="user-lable">触发词</div>
							<div class="user-operate">
								<i class="icon-add-item" @click="addList"></i>
								<div class="triggle-list">
									<xui-scroll style="height:100%;">
										<p v-for="(item,index)  in triggleData" :key="index">
											<xui-input v-model="item.name" :options="inputOnptions" class="triggle-input"></xui-input>
											<i class="icon-delete-item" @click="deletList(index)"></i>
										</p>
									</xui-scroll>
								</div>
								<!-- <xui-input v-model="modelDirective.tips" :options="textareaOnptions"></xui-input> -->
							</div>
						</div>
					</div>
				</div>
			</template>
			<div slot="footer" style="padding:10px;text-align:center;">
				<xui-toolbar :options="toolbarOptions"></xui-toolbar>
			</div>
		</xui-modal>
	</div>
</template>

<script>
export default {
	props: ["type"],
	methods: {
		open: function() {
			this.$refs.modal.open();
		},
		tip: function(msg) {
			console.log(msg);
		},
		addList() {
			var c = { name: "" };
			this.triggleData.push(c);
		},
		deletList(index) {
			this.triggleData.splice(index, 1);
		}
	},
	data() {
		return {
			triggleData: [],
			modelDirective: {
				type: "0",
				match1: "0",
				match2: "0",
				match3: "0",
			},
			parameterData: [
				{
					name: "动作",
					item1: { value: "", placeholder: "" },
					item2: { value: "", placeholder: "" },
					item3: { value: "", placeholder: "" },
					item4: { value: "", placeholder: "" }
				},
				{
					name: "表情",
					item1: { value: "", placeholder: "" },
					item2: { value: "", placeholder: "" },
					item3: { value: "", placeholder: "" },
					item4: { value: "", placeholder: "" }
				},
				{
					name: "镜头",
					item1: { value: "", placeholder: "" },
					item2: { value: "", placeholder: "" },
					item3: { value: "", placeholder: "" },
					item4: { value: "", placeholder: "" }
				},
				{
					name: "动效",
					item1: { value: "", placeholder: "" },
					item2: { value: "", placeholder: "" },
					item3: { value: "", placeholder: "" },
					item4: { value: "", placeholder: "" }
				},
				{
					name: "标题",
					item1: { value: "", placeholder: "" },
					item2: { value: "", placeholder: "" }
				}
			],
			matchOptions1: {
				multiple: false,
				clearable: true,
				filter: false,
				style: "width:80px;",
				data: [
					{
						text: "等级",
						value: "0"
					}
				]
			},
			matchOptions2: {
				multiple: false,
				clearable: true,
				filter: false,
				style: "width:80px;",
				data: [
					{
						text: "课程",
						value: "0"
					}
				]
			},
			matchOptions3: {
				multiple: false,
				clearable: true,
				filter: false,
				style: "width:80px;",
				data: [
					{
						text: "模块",
						value: "0"
					}
				]
			},
			typeOptions: {
				multiple: false,
				clearable: true,
				filter: false,
				data: [
					{
						text: "控制指令",
						value: "0"
					},
					{
						text: "选择指令",
						value: "1"
					}
				]
			},
			options: {
				top: 200,
				title: "",
				maskClose: true
			},
			inputOnptions: {
				type: "text",
				clearable: true
			},
			textareaOnptions: {
				style: "width: 220px;",
				type: "textarea",
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
						operate() {}
					},
					{
						label: "取消",
						style: "background:#CCCCCC;color:#fff;border-radius:20px;padding:15px 30px;line-height:0px",
						operate: () => {
							this.$refs.modal.close();
						}
					}
				]
			}
		};
	}
};
</script>
<style lang="less">
.directive-form {
	overflow: hidden;
	padding: 20px 30px;
	.form-item {
		display: block;
		margin: 20px 0px;
		overflow: hidden;
		min-height: 30px;
	}
	.form-item > div {
		position: relative;
		display: inline-block;
		float: left;
	}
	.form-item .user-lable {
		width: 90px;
		text-align: center;
		line-height: 30px;
	}
	.parameter-list
	{
		left: -38px;
    	position: relative;
	}
	.parameter-seting-btn {
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
		width: 60px;
		border-radius: 0px;
		height: 30px;
		margin: 5px;
	}
	.triggle-list {
		width: 220px;
		height: 80px;
		overflow: hidden;
		float: none;
		clear: both;
		border-radius: 10px;
		border: 1px solid #c0c4cc;
		&:hover {
			border: 1px solid #4081ff;
		}
		.triggle-input {
			width: 150px;
			border-radius: 0px;
			height: 30px;
			margin: 5px;
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
	.icon-delete-item {
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		position: absolute;
		right: 30px;
		top: 0px;
		&:after {
			content: url("/assets/directive/icon/icon-delete16.png");
			position: absolute;
			top: 2px;
			left: 2px;
		}
	}
}
</style>
