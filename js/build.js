({
    map: {
        "*": { jquery: "jquery-private" },
        "jquery-private": { jquery: "jquery" },
    },
    name: "main",
    out: "main_build.js",
    //optimize: "none",
    packages: [
        {
            name: "codemirror",
            location: "vendor/components/codemirror",
            main: "lib/codemirror",
        },
    ],
    paths: {
        "es6-promise": "vendor/components/es6-promise/promise",
        jquery: "vendor/components/jquery/jquery.min",
        "jquery-ui": "vendor/components/jquery-ui/jquery-ui.min",
        moment: "vendor/components/moment/min/moment.min",
        requireLib: "vendor/components/requirejs/require",
        underscore: "vendor/components/underscore/underscore-min",
        sockjs: "vendor/sockjs",
        "base/js/utils": "vendor/base/js/utils",
        "base/js/namespace": "vendor/base/js/namespace",
        "base/js/events": "vendor/base/js/events",
        "services/kernels/kernel": "vendor/services/kernels/kernel",
        "services/kernels/comm": "vendor/services/kernels/comm",
        "services/kernels/serialize": "vendor/services/kernels/serialize",
        "mpl": "vendor/mpl",
        "text": "vendor/text",
        "domReady": "vendor/domReady",
        "colorpicker": "vendor/colorpicker",
        "JSmol": "vendor/JSmol",
        "all.min": "vendor/all.min",
    },
    waitSeconds: 70,
    wrap: true,
    include: ["requireLib"],
});
