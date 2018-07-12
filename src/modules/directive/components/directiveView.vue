<template>
	<div style="transform:translate(0,0)">
		<xui-modal ref="modal" :options="options" @opened="tip('opened')" @closed="tip('closed')">
			<template slot-scope="props" slot="content">
				<div v-if="props.opened" style="width:500px;height:300px;">
                    <xui-form ref="form"  :options="fieldOptions" @submit="submitHandle"></xui-form>
				</div>
			</template>
			<div slot="footer" style="padding:10px;text-align:center;">
				<xui-toolbar :options="toolbarOptions"></xui-toolbar>
			</div>
		</xui-modal>
	</div>
</template>

<script>
import FORMFIELD from "../options/directFormField.js"
export default {
	methods: {
		open: function() {
			this.$refs.modal.open();
		},
		tip: function(msg) {
			console.log(msg);
		}
	},
	data() {
		return {
            fieldOptions:{
                cols: 2,
				fields: [].concat(FORMFIELD)
            },
			options: {
				top:200,
				title: "",
				maskClose: true
			},
			toolbarOptions: {
				size: "medium",
				tools: [
					{
						label: "保存",
						color: "success",
						operate() {}
					},
					{
						label: "取消",
						color: "info",
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
