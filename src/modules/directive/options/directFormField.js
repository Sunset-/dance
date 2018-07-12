module.exports = [{
        label: "指令ID：",
        name: "libName",
        widget: "input",
        monopolize: true,
        disabled: true,
        format() {
            return ctx.sourceData.libName;
        },
        validate: {
            required: true
        }

    },
    {
        label: "文本框",
        widget: "input",
        name: "inputname",
        default: "55",

    },
    {
        label: "下拉框",
        cols: false,
        widget: "select",
        name: "selectname",
        default: "1",
        data: [{
                text: "超级管理员",
                value: "0"
            },
            {
                text: "管理员",
                value: "1"
            },
            {
                text: "普通用户",
                value: "3"
            }
        ]
    },
    {
        label: "单选框",
        widget: "radio",
        name: "radioname",
        cols: false,
        defaultIndex: 1,
        data: [{
                text: "男",
                value: "MALE"
            },
            {
                text: "女",
                value: "FEMALE"
            },
            {
                text: "未知",
                value: "UNKNOW"
            }
        ]
    },
    {
        label: "复选框",
        widget: "checkbox",
        name: "checkboxname",
        default: "yy,ps",
        data: [{
                text: "全部",
                value: "all"
            },
            {
                text: "踢球",
                value: "tq"
            },
            {
                text: "游泳",
                value: "yy"
            },
            {
                text: "爬山",
                value: "ps"
            },
            {
                text: "其他",
                value: "other"
            }
        ]
    },
];