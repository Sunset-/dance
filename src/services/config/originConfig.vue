<template>
	<div class="module-configure-container">
		<h1>模块配置中心</h1>
		<div class="modules">
			<span v-for="(m,index) in modules" :key="index" @click="openModuleConfig(m)">{{m.title}}</span>
		</div>
		<xui-modal ref="configmodal" :options="moduleOptions">
			<div slot="content">
				<component ref="configtemplate" v-if="configTemplate" :is="configTemplate" @save="saveModuleConfig" @cancel="closeModal"></component>
			</div>
		</xui-modal>
	</div>
</template>
<script>
import configModules from "./modules";
import GlobalConfigure from "./index.js";
const COMPONENT_PREFIX = "moduleconfig-";

var components = {};
configModules.modules.forEach(cm => {
	components[COMPONENT_PREFIX + cm.name] = cm.template;
});

export default {
	components: components,
	data() {
		return {
			modules: configModules.modules,
			currentModule: null,
			moduleOptions: {
				title: "模块配置",
				maskClose: false
			}
		};
	},
	computed: {
		configTemplate() {
			return this.currentModule ? COMPONENT_PREFIX + this.currentModule.name : null;
		}
	},
	created() {
		GlobalConfigure.init();
	},
	methods: {
		openModuleConfig(module) {
			this.currentModule = module;
			this.$refs.configmodal.open();
			this.$nextTick(() => {
				this.$refs.configtemplate.initConfig(GlobalConfigure.getConfig(module.name));
			});
		},
		closeModal() {
			this.$refs.configmodal.close();
		},
		saveModuleConfig(config) {
			GlobalConfigure.saveConfig(this.currentModule.name, config || {});
			this.$refs.configmodal.close();
		}
	}
};
</script>
<style lang="less">
.module-configure-container {
	padding: 10px;
	& > h1 {
		font-size: 20px;
		padding: 10px 0px;
	}
	.modules {
		& > span {
			display: inline-block;
			min-width: 80px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background: rgb(99, 216, 255);
			color: white;
			border-radius: 3px;
			cursor: pointer;
			&:hover {
				background: lighten(rgb(99, 216, 255), 10%);
			}
		}
	}
}
</style>

