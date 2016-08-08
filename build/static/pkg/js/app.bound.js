/**
 * file: moudles.js
 * ver: 1.0.0
 * auth: 471665225@qq.com
 * update: 21:12 2016/8/2
 */

(function(self, modules) {
    var head = document.getElementsByTagName('head')[0];

    if (!self.__web__bound) {
        self.__web__bound = {
            modules: {},
            // 模块缓存
            modulesCache: {},
            // 用来处理require.async的回调
            loadingMap: {}
        };
    }

    var __modulesCache = self.__web__bound.modulesCache;
    var __modules = self.__web__bound.modules;
    var __loadingMap = self.__web__bound.loadingMap;

    if (!self.require) {
        var require = self.require = function(id) {
            id = require.alias(id);
            var mod = __modulesCache[id];
            if (mod) {
                return mod.exports;
            }
            mod = __modulesCache[id] = {
                'exports': {}
            };

            var factory = __modules[id];
            if (typeof factory === 'undefined') {
                throw Error('Cannot find module `' + id + '`');
            }
            var ret = factory.apply(mod, [require, mod.exports, mod]);
            if (ret) {
                mod.exports = ret;
            }
            return mod.exports;
        };

        require.async = function(ids, callback) {
            if (typeof ids === 'string') {
                ids = [ids];
            }

            var loadingNum = 0;

            for (var i = ids.length - 1; i >= 0; --i) {
                var id = require.alias(ids[i]);
                __loadingMap[id] = function() {
                    loadingNum--;
                    if (0 == loadingNum) {
                        var i, n, args = [];
                        for(i = 0, n = ids.length; i < n; ++i) {
                            args[i] = require(ids[i]);
                        }
                        var test = args[0].test;
                        callback && callback.apply(self, args);
                    }
                };
                loadingNum++;
                loadScript(id);
            }
        }

        require.alias = function(id) {return id};
    }

    var require = self.require;

    var loadScript = function(id) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = id;
        head.appendChild(script);
    }

    for (var m in modules) {
        __modules[m] = modules[m];
    }

    var absoluteuri = '/build/static/pkg/js/app.bound.js';
    if (window.__web__bound.loadingMap[absoluteuri]) {
        window.__web__bound.loadingMap[absoluteuri]();
        delete window.__web__bound.loadingMap[absoluteuri];
    }
    
    return require(absoluteuri);
})(this, {
    '/build/static/pkg/js/app.bound.js': function(require, exports, module) {
        require('app_7a0b2c14');
    },
    'app_7a0b2c14': function(require, exports, module) {
        // less demo
        // css demo
        // js demo
        var modA = require('modA_88f33483');
        var modB = require('modB_e9b8ffe1');
        // json demo
        var commonMap = require('common_f225f4cd');
        console.log(commonMap);
        // html demo
        var index = require('index_d49626fd');
        console.log(index);
        // jade demo 暂不支持
        /*var o = {
            user: {
                description: '我喜欢猫'
            }
        };
        var md = require('md_92a41990');
        console.log(md(o));*/
        modA.bar();
        modB.bar();
        exports.app = function() {
            console.log('test app');
        }
    },
    'common_f225f4cd': function(require, exports, module) {
        module.exports = {"chunks":{},"moduleids":{"./modules/a.less":"a_4d4519c3","./modules/b.css":"b_bb76453f","./modules/modA.js":"modA_ba79b660","./modB.js":"modB_74293644","components/modC":"modC_a7dae6ae","../src/modules/modA":"modA_ba79b660","./modules/modB":"modB_74293644"},"deps":{"D:\\github\\demo\\src\\modules\\modA.js":"modA_ba79b660","D:\\github\\demo\\src\\modules\\modB.js":"modB_74293644"},"depsCss":{"D:\\github\\demo\\src\\modules\\a.less":"a_4d4519c3","D:\\github\\demo\\src\\modules\\b.css":"b_bb76453f"},"allCss":{"D:\\github\\demo\\src\\modules\\a.less":"a_4d4519c3","D:\\github\\demo\\src\\modules\\b.css":"b_bb76453f"},"uri":"/build/static/pkg/js/common.js"}
    },
    'index_d49626fd': function(require, exports, module) {
        module.exports = "<!DOCTYPE html>\r\n<html>\r\n\t<head>\r\n\t\t<title>Hello, World</title>\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/pkg/css/all.css\">\r\n\t</head>\r\n\t<body>\r\n    <div class=\"less-div\">\r\n      FIS3 面向前端的工程构建工具\r\n      <ul>\r\n        <li class=\"list-1\">构建</li>\r\n        <li class=\"list-2\">调试</li>\r\n      </ul>\r\n    </div>\r\n\t\t<!--<script type=\"text/javascript\" src=\"./lib/mod.js\"></script>-->\r\n    <script type=\"text/javascript\" src=\"/static/pkg/js/common.js\"></script>\r\n    <script type=\"text/javascript\" src=\"/static/pkg/js/app.bound.js\"></script>\r\n    <script type=\"text/javascript\" src=\"/static/pkg/js/home.bound.js\"></script>\r\n\t</body>\r\n</html>"
    }
})