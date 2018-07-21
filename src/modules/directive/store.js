var prefix = "dance";
const URLS = {
    commandsUrl: `/${prefix}/dance_web/commands`,
    commandsIdUrl: `/${prefix}/dance_web/command_types`,
    commandsMatch: `/${prefix}/dance_web/command_match`,
}

module.exports = {
    /**
     * 获取指令列表
     */
    getCommandsList() {
        return $http({
            url: URLS.commandsUrl,
            type: "get",
        }).then(res => {
            return res;
        });
    },
    /**
     * 新增指令
     */
    postCommandsSave(type, data) {
        return $http({
            url: URLS.commandsUrl + (type == "add" ? "" : `/${data.id}`),
            type: type,
            data: data
        }).then(res => {
            return res;
        });
    },
    //指令类型列表
    getCommandsTypesList() {
        return $http({
            url: URLS.commandsIdUrl,
            type: "GET",
        }).then(res => {
            return res;
        });
    },
    //删除类型指令
    getCommandsItemDelete(id) {
        return $http({
            url: URLS.commandsIdUrl + '/' + id,
            type: "DELETE",
        }).then(res => {
            return res;
        });
    },
    //查询指令类型
    getCommandsSearch(id) {
        return $http({
            url: URLS.commandsIdUrl + '/' + id,
            type: "get",
        }).then(res => {
            return res;
        });
    },
    //修复指令类型
    getCommandsTypeUpdate(id) {
        return $http({
            url: URLS.commandsIdUrl + '/' + id,
            type: "PATCH",
        }).then(res => {
            return res;
        });
    },
    //获取指令匹配类型
    getCommandsMatch() {
        return $http({
            url: URLS.commandsMatch,
            type: "GET",
        }).then(res => {
            return res;
        });
    },

    //指令详情
    getCommandsDetail(id) {
        return $http({
            url: URLS.commandsUrl + '/' + id,
            type: "GET",
        }).then(res => {
            return res;
        });
    },
    //删除指令
    getCommandsDelete(id) {
        return $http({
            url: URLS.commandsUrl + '/' + id,
            type: "DELETE",
        }).then(res => {
            return res;
        });
    },
    //修复指令类型
    getCommandsUpdate(id) {
        return $http({
            url: URLS.commandsIdUrl + '/' + id,
            type: "PATCH",
        }).then(res => {
            return res;
        });
    }
}