module.exports = [{
        title: "指令ID",
        name: "name",
        style: "text-align:center;width:200px",
        format: function() {
            return arguments[4] + 1;
        }
    },
    {
        title: "指令类型",
        name: "type",
        align: "center",
        format(v) {
            if (v == 1) {
                return "控制指令";
            } else {
                return "选择指令";
            }

        }
    },
    {
        title: "指令名称",
        name: "name",
        style: "text-align:center;width:200px"
    },
    {
        title: "触发提示",
        name: "step_item",
        align: "center",
        style: "text-align:center;width:200px",
        format(v) {
            if (v) {
                return v.text;
            }

        }
    },
    {
        title: "触发词",
        name: "trigger_words",
        align: "center",
        style: "text-align:center;width:200px",
        format(v) {
            if (v) {
                return v.map(item => { return item.word || item.name }).toString();
            }

        }

    }
]