<template>
	<div style="transform:translate(0,0)">
		<xui-modal ref="modal" :options="options" @opened="tip('opened')" @closed="tip('closed')">
			<template slot-scope="props" slot="content">
				<div v-if="props.opened" style="width:500px;height:330px;">
					<div class="directive-form">
						<div class="form-item" v-if="type=='edit'"><div class="user-lable">指令ID</div><div class="user-operate"><span>{{modelDirective.id}}</span></div></div>
						<div class="form-item"><div class="user-lable">指令类型</div>
							<div class="user-operate">
								<xui-select v-model="modelDirective.type" :options="typeOptions"></xui-select>
							</div>
						</div>
						<div class="form-item"><div class="user-lable">指令匹配</div>
							<div class="user-operate">
								<xui-select v-model="modelDirective.match1" :options="matchOptions1"></xui-select>
								<xui-select v-model="modelDirective.match2" :options="matchOptions2"></xui-select>
								<xui-select v-model="modelDirective.match3" :options="matchOptions3"></xui-select>
								<xui-select v-model="modelDirective.match4" :options="matchOptions4"></xui-select>
							</div>
						</div>
						<div class="form-item"><div class="user-lable">指令名称</div>
							<div class="user-operate">
							   <xui-input v-model="modelDirective.name"  :options="inputOnptions"></xui-input>
							</div>
						</div>
						<div class="form-item"><div class="user-lable">触发提示</div><div class="user-operate">
						 <xui-input v-model="modelDirective.tips" :options="inputOnptions"></xui-input>
						</div></div>
						<div class="form-item"><div class="user-lable">触发词</div><div class="user-operate">
						 <xui-input v-model="modelDirective.tips" :options="textareaOnptions"></xui-input></div>
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
	props:['type'],
	methods: {
		open: function() {
			this.$refs.modal.open();
		},
		tip: function(msg) {
			console.log(msg);
		},
		submitHandle(){
			
		}
	},
	data() {
		return {
			
			modelDirective:{
				type:"0",
				match1:"0",
				match2:"0",
				match3:"0",
				match4:"0"
			},
			matchOptions1:{
				 multiple: false,
                clearable: true,
                filter: false,
				style:"width:80px;",
                data: [
                   {
                        text: "舞蹈",
                        value: "0"
                    }
                ]
			},
			matchOptions2:{
				 multiple: false,
                clearable: true,
                filter: false,
				style:"width:80px;",
                data: [
                   {
                        text: "舞步",
                        value: "0"
                    }
                ]
			},
			matchOptions3:{
				 multiple: false,
                clearable: true,
                filter: false,
				style:"width:80px;",
                data: [
                   {
                        text: "课程",
                        value: "0"
                    }
                ]
			},
			matchOptions4:{
				 multiple: false,
                clearable: true,
                filter: false,
				style:"width:80px;",
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
				top:200,
				title: "",
				maskClose: true
			},
			inputOnptions:{
				 type: "text",
				  clearable: true,
			},
			textareaOnptions:{
				style:"width: 220px;",
				 type: "textarea",
				clearable: true,
			},
			toolbarOptions: {
				size: "medium",
				tools: [
					{
						label: "保存",
						style:"background:#4081FF;color:#fff;border-radius:20px;margin-right:20px;padding:15px 30px;line-height:0px",
						// color: "success",
						operate() {}
					},
					{
						label: "取消",
						style:"background:#CCCCCC;color:#fff;border-radius:20px;padding:15px 30px;line-height:0px",
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
	.directive-form{
		overflow:hidden;
		padding:20px 30px;
		.form-item{
			display:block;
			    margin: 20px 0px;
    			overflow: hidden;
    			min-height: 30px;
		}
		.form-item div{
			display:inline-block;
			float:left;
		}
		.form-item .user-lable{
			width:90px;
			text-align:center;
			line-height: 30px;
		}
	}
</style>
