/*
 * nodewebx server配置示例
 * @ermin.zem
 * 2015-01-17
 * */

module.exports = {
    /* 本地服务端口 */
    "port": 3000,

    /* 静态服务配置 */
    "staticServe": [
        {
            // 访问路径
            "path": "/",
            // 对应文件目录
            "dirPath": __dirname + "/src"
        }
    ],

    "webx": {
        /* 后缀别名配置 */
        "extNameRules": {
            // 模板文件后缀
            "template": [
                "NoneType",
                ".vm",
                ".htm",
                ".html"
            ],
            // ajax请求文件后缀
            "ajax": [
                ".json",
                ".jsonp"
            ]
        },

        /*
         * ############################################################
         * 用户一般只需要关注模板配置
         * 参考配置：
         *   {
         *     "prefix": "模块地址",
         *     "name": "模块名",
         *     "viewPath": "模板路径",
         *     "ajaxDataPath": "模拟接口路径"
         *   }
         * ############################################################
         * */
        "components": [
            {
                "prefix": "/demo",
                "name": "demo",
                // 模板路径
                "viewPath": __dirname + "/templates/demo/templates",
                // 页面相关数据
                "dataPath": __dirname + "/mock/sample",
                // ajax路径
                "ajaxDataPath": __dirname + "/mock/ajax-data"
            }
        ],

        /* 变量 */
        "varsPath": __dirname + "/mock/vars.js",

        /* 默认访问路径 */
        "rewriteRoutes": [
            {
                "prefix": "/",
                "pass": "/demo/home"
            }
        ]
    }
}
