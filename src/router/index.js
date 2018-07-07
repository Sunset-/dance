var routes = [];
//云空间
routes.push(
    {
        path: "/screen",
        name: "screen",
        alias: "/",
        component: () =>
            import (`src/modules/screen/index.vue`)
    },
    {
        path: "/personfile",
        name: "personfile",
        component: () =>
            import (`src/modules/personfiles/index.vue`)
    },
    {
        path: "/vehiclefile",
        name: "vehiclefile",
        component: () =>
            import (`src/modules/vehiclefiles/index.vue`)
    }
);

module.exports = routes;