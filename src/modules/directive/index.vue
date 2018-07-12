<template>
    <div>
        <xui-table :options="directiveOptionsTable" class="xui-style-table" ref="dTableRef">
            <noresult class="org-no-result" slot="empty" :isShow="true" :mainText="'该组织下尚未添加下级组织机构'" :subText="'点击新增组织机构&gt;&gt;'" size="large" @subTextFun="openModal()"></noresult>
        </xui-table>
        <div class="add-directive">
              <xui-button @click="openModal" color="white" icon="el-icon-info" label="123">添加指令</xui-button>
        </div>
        <directive-view ref="moduleRef"></directive-view>
    </div>
</template>
<script>
import DIRECTIVECOLUMN from "./options/tableColumn.js";
import directiveView from "./components/directiveView"
export default {
	data() {
		return {
			directiveOptionsTable: {
                flag:true,
				columns: DIRECTIVECOLUMN.concat([
					{
						title: "操作",
						style: "text-align:center;width:180px",
						toolbar: {
							tools: [
								{
									label: "编辑",
									// icon: "icon-table-edit icon-base-org icon-table-common", //编辑
									// premise: () => {
									// 	return this.flag;
									// },
									operate: record => {
                                        this.open();
										// this.orgEventRecive("edit", record.id);
									}
								},
								{
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
<style lang="less" scoped>
.add-directive{
    text-align: center;
    margin-top: 30px;
}
</style>
