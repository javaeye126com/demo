/**
 * User: {{{user}}}
 * Date: {{{date}}}
 * Time: {{{time}}}
 *
 */

(function() {
    var root = this;

    var config = {

        alias: {
            $: 'jquery/jquery/1.11.1/jquery',
            "$-debug": 'jquery/jquery/1.11.1/jquery-debug',
            jquery: 'jquery/jquery/1.11.1/jquery',
            "jquery-debug": 'jquery/jquery/1.11.1/jquery-debug',
            handlebars: typeof process === "undefined" ? "alinw/handlebars/1.3.0/handlebars": "alinw/handlebars/1.3.0/runtime",
            base: "arale/base/1.1.1/base",
            widget: "arale/widget/1.1.1/widget",
            cookie: "arale/cookie/1.0.2/cookie",
            detector: "arale/detector/1.3.0/detector",
            validator: 'arale/validator/0.9.7/validator',
            dnd: "arale/dnd/1.0.0/dnd",
            easing: "arale/easing/1.0.0/easing",
            autocomplete: "arale/autocomplete/1.3.0/autocomplete",
            switchable: "arale/switchable/1.0.2/switchable",
            backbone: "gallery/backbone/1.1.2/backbone",
            d3: "gallery/d3/3.4.3/d3",
            "es5-safe": "gallery/es5-safe/0.9.2/es5-safe",
            html5shiv: "gallery/html5shiv/3.7.0/html5shiv",
            json: "gallery/json/1.0.3/json",
            moment: "gallery/moment/2.6.0/moment",
            morris: "gallery/morris/0.5.0/morris",
            modernizr: "gallery/modernizr/2.7.1/modernizr",
            raphael: "gallery/raphael/2.1.2/raphael",
            respond: "gallery/respond/1.4.2/respond",
            store: "gallery/store/1.3.14/store",
            swfobject: "gallery/swfobject/2.2.0/swfobject",
            _: "gallery/underscore/1.6.0/underscore",
            zepto: "gallery/zepto/1.1.3/zepto",
            ztree: "gallery/ztree/3.5.14/ztree",
            spin: "gallery/spin/2.0.0/spin",
            scrollmonitor: "gallery/scrollmonitor/1.0.7/scrollmonitor",
            selection: "gallery/selection/0.9.0/selection",
            mathjs: "gallery/mathjs/0.9.0/mathjs",
            bootstrap: "gallery/bootstrap/3.0.0/bootstrap",
            codemirror: "gallery/codemirror/3.1.0/codemirror",
            formatter: "gallery/formatter/0.0.9/formatter",
            selectperson: "alinw/selectperson/1.0.5/selectperson",
            calendar: "alinw/calendar/1.1.1/calendar",
            cascadecity: "alinw/cascadecity/1.1.0/cascadecity",
            uploadx: "alinw/uploadx/1.0.0/uploadx",
            "handlebars-helpers": "alinw/handlebars-helpers/1.0.3/handlebars-helpers",
            network: "alinw/network/1.0.0/network",
            tip: "alinw/tip/2.1.1/tip",
            pagination: "alinw/pagination/2.0.3/pagination",
            dialog: "alinw/dialog/2.0.2/dialog",
            confirmbox: "alinw/dialog/2.0.2/confirmbox",
            console: "alinw/console/2.0.0/console",
            "underscore-string": "alinw/underscore-string/2.3.3/underscore-string",
            jsuri: "alinw/jsuri/1.3.1/jsuri",
            uuid: "alinw/uuid/0.1.0/uuid",
            "jquery-autosize": "alinw/jquery-autosize/1.18.1/jquery-autosize",
            autosearchtext: "alinw/autosearchtext/1.0.3/autosearchtext",
            "jquery-scrollto": "alinw/jquery-scrollto/1.4.6/jquery-scrollto",
            ganttplan: "alinw/ganttplan/1.0.3/ganttplan",
            autosearch: "alinw/autosearch/1.1.0/autosearch",
            flotcharts: "alinw/flotcharts/1.0.1/flotcharts",
            pickable: "alinw/pickable/2.0.1/pickable",
            powerfloat: "alinw/powerfloat/1.0.8/powerfloat",
            select: "alinw/select/2.0.5/select",
            upload: "alinw/upload/2.0.5/upload",
            pagebus: "alinw/pagebus/1.0.2/pagebus",
            crystal: "alinw/crystal/1.0.2/crystal",
            imgzoom: "alinw/imgzoom/1.0.5/imgzoom",
            "image-gallery": "alinw/image-gallery/1.0.4/image-gallery",
            placeholder: "alinw/placeholder/3.0.2/placeholder",
            "detect-zoom": "alinw/detect-zoom/1.0.6/detect-zoom",
            glassball: "alinw/glassball/1.0.1/glassball",
            "jquery-tree": "alinw/jquery-tree/2.0.1/jquery-tree",
            hovercard: "alinw/hovercard/2.1.0/hovercard",
            hovercard2: "alinw/hovercard2/2.0.4/hovercard2",
            orgchart: "alinw/orgchart/1.0.1/orgchart",
            scroller: "alinw/scroller/1.0.0/scroller",
            buclogindlg: "alinw/buclogindlg/1.0.4/buclogindlg"
        },
        paths: {},
        comboSyntax: ["??", ","],
        comboMaxLength: 1000,
        preload: [],
        charset: 'utf-8',
        timeout: 1000,
        debug: true
    };

    // 仅限浏览器时使用
    if (typeof process === "undefined") {
        config.paths.jquery = "https://a.alipayobjects.com/jquery";
        config.paths.gallery = "https://a.alipayobjects.com/gallery";
        config.paths.arale = "https://a.alipayobjects.com/arale";
        config.paths.alipay = "https://a.alipayobjects.com/alipay";
        config.paths.platform = 'https://s.tbcdn.cn/g/platform';
        config.paths.alinw = 'https://s.tbcdn.cn/g/alinw';
    }

    if (root.seajs) {
        root.seajs.config(config);
    }

    if (typeof define === "function") {
        define(function(require, exports, module) {
            module.exports = config;
        });
    }

    return config;
}).call(this);
