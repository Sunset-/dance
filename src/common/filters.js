import Vue from "vue";

Vue.filter("dict", (v, enumType, unmatch) => {
	return $dictionary.transcode(enumType, v, unmatch);
});
