<template>
	<div class="module-config-container">
		<div class="tree-wrap">
			<div class="tree-toolbar">
				<xui-toolbar :options="toolbarOptions"></xui-toolbar>
			</div>
			<xui-stree ref="menutree" :options="treeOptions" :nodes="treeNodes" @selected="selected"></xui-stree>
		</div>
		<div class="modules-wrap">
			<div class="module-group" v-if="group.group" v-for="(group,index) in moduleGroups" :key="index">
				<h3>{{group.group}}</h3>
				<div>
					<div :class="['module-tag',mountModules[m.name]?'disabled':'']" v-for="(m,mindex) in group.modules" :key="mindex" :data-module="m.name">
						<span>{{m.title}}</span>
						<i v-if="m.config" class="xui-icon xui-icon-setup_fill" @click="openModuleConfig(m)"></i>
					</div>
				</div>
			</div>
		</div>
		<xui-modal ref="menumodal" :options="{title:'新增菜单',width : 700}">
			<xui-form ref="menuform" style="padding:20px;" :options="formOptions" @signal="operateSignal"></xui-form>
		</xui-modal>
		<xui-modal ref="configmodal" :options="configModalOptions">
			<div slot="content">
				<component ref="configtemplate" v-if="configTemplate" :is="configTemplate" @save="saveModuleConfig" @cancel="closeConfigModal"></component>
			</div>
		</xui-modal>
	</div>
</template>
<script>
const COMPONENT_PREFIX = "moduleconfig-";

export default {
	components: $module
		.getModules()
		.filter(m => m.config)
		.reduce((res, m) => {
			res[`${COMPONENT_PREFIX}${m.name}`] = m.config;
			return res;
		}, {}),
	data() {
		return {
			configModule: null,
			moduleGroups: $module.getGroupModules(),
			selectedNode: null,
			selectedParentNode: null,
			mountModules: {},
			toolbarOptions: {
				size: "mini",
				tools: [
					{
						label: "保存",
						color: "success",
						icon: "xui-icon xui-icon-save",
						operate: () => {
							var menus = this.getConfigFromTree();
							$config.saveConfig("$menus", JSON.stringify(menus)).then(res => {
								$tip("保存成功", "success");
							});
						}
					},
					{
						label: "新增菜单",
						color: "primary",
						icon: "xui-icon xui-icon-add",
						operate: () => {
							if (this.selectedNode && !this.selectedNode.module) {
								this.$refs.menuform.reset({
									parentId: this.selectedNode.id,
									parentNode: this.selectedNode
								});
								this.$refs.menumodal.open();
							} else {
								$tip("请选择一个菜单节点");
							}
						}
					},
					{
						label: "修改",
						color: "warning",
						icon: "xui-icon xui-icon-editor",
						operate: () => {
							if (this.selectedNode && this.selectedNode.id != "0") {
								this.$refs.menuform.reset(this.selectedNode);
								this.$refs.menumodal.open();
							} else {
								$tip("请选择一个菜单节点");
							}
						}
					}
				]
			},
			treeOptions: {
				autoExpand: true,
				check: false,
				setting: {
					data: {
						key: {
							name: "name",
							title: "name"
						},
						simpleData: {
							enable: true,
							idKey: "id",
							pIdKey: "parentId",
							rootPId: null
						}
					},
					check: {
						radioType: "all"
					},
					format: {
						nodeToValue(treeNode) {
							return treeNode && treeNode.data;
						}
					},
					edit: {
						enable: true,
						drag: {
							autoExpandTrigger: true,
							isMove: true,
							prev: function(treeId, treeNodes, targetNode) {
								var src = treeNodes[0].data,
									tgt = targetNode.data;
								if (tgt.parentId == null) {
									return false;
								}
								if (tgt.parentId != "0" && !src.module) {
									return false;
								}
								return true;
							},
							next: function(treeId, treeNodes, targetNode) {
								var src = treeNodes[0].data,
									tgt = targetNode.data;
								if (tgt.parentId == null) {
									return false;
								}
								if (tgt.parentId != "0" && !src.module) {
									return false;
								}
								return true;
							},
							inner: function(treeId, treeNodes, targetNode) {
								var src = treeNodes[0].data,
									tgt = targetNode.data;
								if (tgt.module) {
									return false;
								}
								if (tgt.parentId == "0" && !src.module) {
									return false;
								}
								return true;
							}
						},
						showRemoveBtn: function(treeId, treeNode) {
							return treeNode.id != "0";
						},
						showRenameBtn: false
					},
					callback: {
						beforeDrag: function(treeId, treeNodes) {
							return treeNodes[0].data.parentId != null;
						},
						onDrop: (event, treeId, treeNodes, targetNode, moveType, isCopy) => {
							var src = treeNodes[0].data,
								tgt = targetNode.data;
							if (moveType == "next" || moveType == "prev") {
								if (src.parentId == tgt.parentId) {
									var children = targetNode.getParentNode().children;
									var changes = [];
									if (children && children.length) {
										children.forEach((c, index) => {
											if (c.data.orderField != index + 1) {
												changes.push(`${c.data.id}-${index + 1}`);
												c.data.orderField = index + 1;
											}
										});
									}
									if (changes.length) {
										//MenuStore.orderMenu(changes.join(","));
									}
								} else {
									var newSrc = Object.assign({}, src);
									newSrc.parentId = tgt.parentId;
									// MenuStore.save(newSrc).then(res => {
									// 	this.refreshTree();
									// });
								}
							} else if (moveType == "inner") {
								var newSrc = Object.assign({}, src);
								newSrc.parentId = tgt.id || "0";
								// MenuStore.save(newSrc).then(res => {
								// 	this.refreshTree();
								// });
							}
						},
						onMouseUp: (e, treeId, treeNode) => {
							var dragModule = this.dragModule,
								parent = treeNode && treeNode.data;
							if (dragModule && !parent.module) {
								var parentId = parent.id || "0";
								var nodes = this.$refs.menutree.addNodes(treeNode, {
									parentId: parentId,
									id: dragModule.name,
									name: dragModule.title,
									module: dragModule.name,
									isParent: false,
									icon: `/static/images/tree-icons/attribute_item.png`
								});
								this.$set(this.mountModules, dragModule.name, true);
							} else {
								this.dragSrcDom && this.dragSrcDom.removeClass("disabled");
							}
							this.dragModule = null;
							this.dragSrcDom = null;
						},
						onRename: (event, treeId, treeNode, isCancel) => {
							treeNode.data.name = treeNode.name;
						},
						onRemove: (event, treeId, treeNode) => {
							var self = this;
							function unmount(node) {
								if (node.data.module) {
									self.$set(self.mountModules, node.data.module, false);
								}
								node.children && node.children.forEach(c => unmount(c));
							}
							unmount(treeNode);
						}
					}
				}
			},
			treeNodes: (() => {
				return Promise.resolve($config.init()).then(() => {
					var menus = JSON.parse($config.getConfig("$menus") || "[]");
					menus.unshift({
						parentId: null,
						id: "0",
						name: "菜单根节点",
						icon: "/static/images/tree-icons/home.png"
					});
					menus.forEach(item => {
						item.icon =
							item.icon || `/static/images/tree-icons/${item.module ? "attribute_item" : "category"}.png`;
						item.data = {
							parentId: item.parentId,
							id: item.id,
							name: item.name,
							iconClass: item.iconClass,
							module: item.module
						};
						if (item.module) {
							this.$set(this.mountModules, item.module, true);
						}
					});
					return menus;
				});
			})(),
			formOptions: {
				cols: 2,
				fields: [
					{
						label: "菜单名",
						name: "name",
						widget: "input",
						validate: {
							required: true,
							maxlength: 32
						}
					},
					{
						label: "图标class",
						name: "iconClass",
						widget: "input"
					}
				],
				submit: model => {
					if (model.id) {
						this.$refs.menutree.updateNode(model);
						this.selectedNode = model;
					} else {
						this.$refs.menutree.addNodes(model.parentNode, {
							parentId: model.parentId,
							id: Date.now(),
							name: model.name,
							iconClass: model.iconClass,
							isParent: true
						});
					}
					this.$refs.menumodal.close();
				}
			},
			configModalOptions: {
				title: "模块配置",
				maskClose: false
			}
		};
	},
	computed: {
		configTemplate() {
			return this.configModule ? COMPONENT_PREFIX + this.configModule.name : null;
		}
	},
	mounted() {
		this.initDragEvent();
	},
	methods: {
		selected(node, parentNode) {
			this.selectedNode = node;
			this.selectedParentNode = parentNode;
		},
		operateSignal(signal) {
			if (signal == "CANCEL") {
				this.$refs.menumodal.close();
			}
		},
		getConfigFromTree() {
			var nodes = this.$refs.menutree.ztreeObj.getNodes();
			var menus = [];
			function find(nodes, parent) {
				nodes.forEach(node => {
					node.data.parentId = parent.id;
					menus.push(node.data);
					node.children && find(node.children, node.data);
				});
			}
			find(nodes[0].children, nodes[0].data);
			return menus;
		},
		initDragEvent() {
			//拖拽事件
			var self = this,
				$body = $("body"),
				$dragThumbnail = $('<span class="drag-thumbnail"></span>')
					.hide()
					.appendTo($body),
				dragging = false;
			function dragCallback(ev) {
				$dragThumbnail.css({
					display: "block",
					left: ev.pageX + 2,
					top: ev.pageY + 2
				});
				self.dragSrcDom && self.dragSrcDom.addClass("disabled");
			}
			function dropCallback(ev) {
				var $tgt = $(ev.target);
				dragging = false;
				$dragThumbnail.hide();
				self.dragModule = null;
				$body.unbind("mousemove", dragCallback);
				$body.unbind("mouseup", dropCallback);
				$body.unbind("selectstart", docSelect);
				self.dragSrcDom && self.dragSrcDom.removeClass("disabled");
			}
			function docSelect() {
				return false;
			}
			$(".modules-wrap").on("mousedown", ".module-tag", function() {
				var $this = $(this),
					moduleName = $this.attr("data-module");
				if ($this.hasClass("disabled")) {
					return;
				}
				dragging = true;
				$dragThumbnail.html($this.clone()).data("module", moduleName);
				self.dragModule = $module.getModule(moduleName);
				self.dragSrcDom = $this;
				$body.on("mousemove", dragCallback);
				$body.on("mouseup", dropCallback);
				$body.bind("selectstart", docSelect);
			});
		},
		openModuleConfig(md) {
			this.configModalOptions.title = `${md.title} - 模块配置`;
			this.configModule = md;
			this.$refs.configmodal.open();
			this.$nextTick(() => {
				this.$refs.configtemplate.initConfig($config.getConfig(md.name));
			});
		},
		closeConfigModal() {
			this.$refs.configmodal.close();
		},
		saveModuleConfig(config) {
			$config.saveConfig(this.configModule.name, config || {});
			this.$refs.configmodal.close();
		}
	}
};
</script>
<style lang="less">
.drag-thumbnail {
	position: absolute;
	cursor: pointer;
}
.module-config-container {
	position: absolute;
	top: 70px;
	left: 20px;
	right: 20px;
	bottom: 20px;
	.tree-wrap {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		width: 290px;
		border: 1px solid #dedede;
		.tree-toolbar {
			padding: 10px;
			border-bottom: 1px solid #dedede;
		}
	}
	.modules-wrap {
		position: absolute;
		right: 0px;
		top: 0px;
		left: 300px;
		bottom: 0px;
		border: 1px solid #dedede;
	}
	.module-group {
		padding: 10px;
		& > h3 {
			font-size: 20px;
			padding-bottom: 10px;
			border-bottom: 1px solid #dedede;
			margin-bottom: 10px;
		}
		& > div {
			padding: 10px 0px;
		}
		.module-tag {
			display: inline-block;
			min-width: 68px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			padding: 0px 10px;
			color: #fff;
			border-radius: 3px;
			margin-right: 10px;
			margin-bottom: 10px;
			background: #40a4ff;
			cursor: pointer;
			&.disabled {
				background: #c3cbd6;
			}
			& > span {
				display: inline-block;
				vertical-align: middle;
			}
			& > i {
				font-size: 20px;
				display: inline-block;
				vertical-align: middle;
				&:hover {
					color: orange;
				}
			}
			-webkit-touch-callout: none; /* iOS Safari */
			-webkit-user-select: none; /* Chrome/Safari/Opera */
			-khtml-user-select: none; /* Konqueror */
			-moz-user-select: none; /* Firefox */
			-ms-user-select: none; /* Internet Explorer/Edge */
			user-select: none;
		}
	}
}
</style>

