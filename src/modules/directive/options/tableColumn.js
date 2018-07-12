module.exports = [{
        title: "编号",
        name: "name",
        style: "text-align:center;width:200px",
        format: function() {
            return arguments[4] + 1;
        }
    },
    {
        title: "指令类型",
        name: "type",
        align: "center"
    },
    {
        title: "指令名称",
        name: "name",
        style: "text-align:center;width:200px"
    },
    {
        title: "触发提示",
        name: "trigger",
        align: "center",
        style: "text-align:center;width:200px"
    },
    {
        title: "触发词",
        name: "triggerWord",
        align: "center",
        style: "text-align:center;width:200px"

    }
]