<template>
    <div>
        <xui-table :options="directiveOptionsTable" class="xui-style-table" ref="dTableRef">
           
        </xui-table>
        <div class="add-directive">
              <xui-button @click="openModal" color="white" icon="el-icon-add" label="123" class="directive-addbtn">添加指令</xui-button>
        </div>
        <directive-view ref="moduleRef" :type="currentType"></directive-view>
    </div>
</template>
<script>
import DIRECTIVECOLUMN from "./options/tableColumn.js";
import directiveView from "./components/directiveView"
export default {
	data() {
		return {
			currentType:"add",
			directiveOptionsTable: {
                flag:true,
				columns: DIRECTIVECOLUMN.concat([
					{
						title: "",
						style: "text-align:center;width:180px",
						toolbar: {
							tools: [
								{
									label: "编辑",
									style:"opacity:0;background:#2F7CEF;color:#fff;border-radius:10px",
									// icon: "icon-table-edit icon-base-org icon-table-common", //编辑
									// premise: () => {
									// 	return this.flag;
									// },
									operate: record => {
                                        this.openModal();
										// this.orgEventRecive("edit", record.id);
									}
								},
								{
									style:"opacity:0;background:#FC9167;color:#fff;border-radius:10px",
									label: "删除",
									align: "center",
									// icon: "icon-table-delete icon-table-common", //删除
									// premise: () => {
									// 	return this.flag;
									// },
									operate: record => {
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
                    var data=[
                        {
                            type:"选择指令",
                            name:"暂停",
                            trigger:"灵儿停下来等你奥",
                            triggerWord:"暂停、等等、等下"
                        },
                        {
                            type:"选择指令",
                            name:"暂停",
                            trigger:"灵儿停下来等你奥",
                            triggerWord:"暂停、等等、等下"
                        },
                        {
                            type:"选择指令",
                            name:"暂停",
                            trigger:"灵儿停下来等你奥",
                            triggerWord:"暂停、等等、等下"
                        }
                    ]
                    return {
                        data:data
                    }
					// return RoleStore.loadRolesByType(this.currentType).then(res => {
					// 	this.roleCount = res.list.length;
					// 	return res;
					// });
				}
			}
		};
    },
    components:{
        directiveView
    },
	methods:{
        openModal(){
            this.$refs.moduleRef.open();
        }
    },
	mounted() {}
};
</script>
<style lang="less">
.xui-style-table .xui-datatable-table tr td,.xui-style-table .xui-datatable-table tr th{
	border:0px solid #000;
}
.xui-style-table .xui-datatable-table tr:hover button{
	opacity:1!important;
}
.el-icon-add{
	background:url("/assets/directive/icon/icon-add.png");
	width:16px;
	height:16px;
	background-repeat:no-repeat;
	vertical-align: middle;
}
.add-directive{
    text-align: center;
    margin-top: 30px;
}
.hidden{
	opacity:0;
}
.directive-addbtn{
	background:#4081FF;
	color:#fff;
	width:160px;
	height:30px;
	border-radius:10px;
	text-align:center;
}

</style>
