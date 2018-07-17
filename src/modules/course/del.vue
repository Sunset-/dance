<!-- 删除 -->
<template>
	<div>
		<xui-modal ref="modal" title="" @closed="closed">
			<template slot-scope="props">
				<div class="modal-content">
					<h3>是否确认删除该{{currentData.message}}</h3>
					<h6 v-show="currentData.opType === 'level'">删除后该{{currentData.message}}内所有数据也会删除</h6>
					<i></i>
				</div>
			</template>
			<div slot="footer" class="footer">
				<span class="item cancel" @click="cancel"></span>
				<span class="item confirm" @click="confirm"></span>
			</div>
		</xui-modal>
	</div>
</template>

<script>
import store from "./store.js";

export default {
	name: "delcourse",
	components: {},
	mixins: [],
	props: {},
	data() {
		return {
			currentData: {}
		};
	},
	computed: {},
	watch: {},
	filters: {},
	methods: {
		open(data) {
			this.currentData = data;
			this.$refs.modal.open();
		},
		cancel() {
			this.$refs.modal.close();
		},
		confirm() {
			this.currentData.opType === "level" ? store.delLevelById(this.currentData.id) : store.delCourseById(this.currentData.id);
			this.$refs.modal.close();
			this.$emit("closed", true);
		},
		closed() {}
	},
	created() {},
	mounted() {}
};
</script>
<style lang='less'>
.modal-content {
	width: 417px;
	height: 240px;
	h3 {
		font-size: 20px;
		color: #8b94a6;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		position: absolute;
		top: 35px;
		left: 118px;
		right: 119px;
	}
	h6 {
		font-size: 16px;
		color: #b1b9c8;
		font-family: MicrosoftYaHei-Bold;
		position: absolute;
		top: 76px;
		left: 87px;
		right: 90px;
	}
	i {
		display: block;
		width: 133px;
		height: 114px;
		background-image: url(/assets/img/course/modal-del.png);
		background-repeat: no-repeat;
		position: absolute;
		top: 110px;
		left: 145px;
		right: 139px;
	}
}
.footer {
	height: 58px;
	background: rgba(231, 234, 240, 1);
	.item {
		width: 50%;
		height: 100%;
		display: inline-block;
		float: left;
		font-size: 16px;
		line-height: 58px;
		cursor: pointer;
	}
	.cancel {
		&:after {
			content: "取消";
			color: #b3bfd7;
		}
		&:before {
			content: "";
			color: #fff;
			border: 1px solid;
			position: relative;
			left: 119px;
		}
	}
	.confirm {
		&:after {
			content: "确定";
			color: #8b94a6;
		}
	}
}
.xui-modal .xui-modal-title {
	padding: 0px;
}
.xui-modal-header > .xui-modal-close-icon > .xui-icon-close {
	&:before {
		content: "";
	}
}
.xui-modal-style > .xui-modal-box {
	text-align: center;
	box-shadow: 0px 0px 43px rgba(0, 0, 0, 0.25);
	background: rgba(255, 255, 255, 1);
	border-radius: 6px;
}
</style>