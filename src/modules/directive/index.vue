<template>
	<div style="margin: 35px;padding-bottom: 35px;background: #fff">
		<xui-table :options="directiveOptionsTable" class="xui-style-table" ref="dTableRef"></xui-table>
		<div class="add-directive">
			<xui-button @click="openModal('add','')" color="white" icon="el-icon-add" label="123" class="directive-addbtn">添加指令</xui-button>
		</div>
		<directive-view ref="moduleRef" @refresh="refresh"></directive-view>
		<del-view ref="delRef" @confirm="deleConfirm" ></del-view>
	</div>
</template>
<script>
import DIRECTIVECOLUMN from "./options/tableColumn.js";
import directiveView from "./components/directiveView";
import delView from "./components/del.vue";
import STORE from "./store.js"
export default {
	data() {
		return {
			currentType: "add",
			directiveOptionsTable: {
				flag: true,
				columns: DIRECTIVECOLUMN.concat([
					{
						title: "",
						style: "text-align:center;width:180px",
						toolbar: {
							tools: [
								{
									label: "编辑",
									style: "opacity:0;background: linear-gradient(#2F7CEF,#3298F7);color:#fff;border-radius:10px",
									// icon: "icon-table-edit icon-base-org icon-table-common", //编辑
									// premise: () => {
									// 	return this.flag;
									// },
									operate: record => {
										this.openModal('edit',record);
										// this.orgEventRecive("edit", record.id);
									}
								},
								{
									style: "opacity:0;background: linear-gradient(#FF2156,#FF7539);color:#fff;border-radius:10px",
									label: "删除",
									align: "center",
									// icon: "icon-table-delete icon-table-common", //删除
									// premise: () => {
									// 	return this.flag;
									// },
									operate: record => {
										this.$refs.delRef.open(record.id);
										// this.deleteOrgEvent(record);
									}
								}
							]
						}
					}
				]),
				pageNumberStart: 0,
				pageSize: 1000,
				format: {
					list: "data",
					count: "length",
					currentPage: "currentPage",
					pageSize: "pageSize"
				},
				datasource: filter => {
					var data = [
						{
							type: "选择指令",
							name: "暂停",
							trigger: "灵儿停下来等你奥",
							triggerWord: "暂停、等等、等下"
						},
						{
							type: "选择指令",
							name: "暂停",
							trigger: "灵儿停下来等你奥",
							triggerWord: "暂停、等等、等下"
						},
						{
							type: "选择指令",
							name: "暂停",
							trigger: "灵儿停下来等你奥",
							triggerWord: "暂停、等等、等下"
						}
					];
					// return {
					// 	data: data
					// };
					return STORE.getCommandsList().then(res => {
						if(!res || res.length==0){
							return {
								data:"",
							    length:0
							}
						}
						// this.roleCount = res.list.length;
						return {
							data:res,
							length:res.length
						};
					});
				}
			}
		};
	},
	components: {
		directiveView,
		delView
	},
	methods: {
		openModal(type,record) {
			this.$refs.moduleRef.open(type,record);
		},
		refresh(flag){
			if(flag){
				debugger
				this.$refs.dTableRef.refresh();
			}
		},
		deleConfirm(id){
			if(id){
				STORE.getCommandsDelete(id).then(res=>{
					if(res.msg=="ok"){
						$tip(res.msg,"success");
						this.$refs.delRef.cancel();
						this.refresh(true);
						return
					}
					$tip(res.msg,"warning");
					
				})
			}
		}
	},
	mounted() {}
};
</script>
<style lang="less">
.xui-style-table{
	border-bottom: 1px solid #f1f1f1;
}
.xui-style-table .xui-datatable-table tr td,
.xui-style-table .xui-datatable-table tr th {
	border: 0px solid #000;
}
.xui-style-table .xui-datatable-table thead tr{
	background: linear-gradient(#FFFFFF,#EEEEEE);
	height: 48px;
	line-height: 48px;
	font-size: 16px;
}
.xui-datatable .xui-datatable-table tbody tr{
	color: #666666;
	font-size: 14px;
	height: 45px;
}
.xui-datatable .xui-datatable-table tbody tr:nth-child(odd){
	background: #fff;
}
.xui-style-table .xui-datatable-table tr:hover button {
	opacity: 1 !important;
}
.xui-style-table .xui-datatable-table tbody tr:hover{
	background: #EFF2F6;
}
.el-icon-add {
	background: url("/assets/directive/icon/icon-add.png");
	width: 16px;
	height: 16px;
	background-repeat: no-repeat;
	vertical-align: middle;
}
.add-directive {
	text-align: center;
	margin-top: 30px;
}
.hidden {
	opacity: 0;
}
.add-directive .directive-addbtn {
	background: #4081ff;
	color: #fff;
	width: 160px;
	height: 36px;
	border-radius: 20px;
	text-align: center;
	font-size: 14px;
}
</style>
