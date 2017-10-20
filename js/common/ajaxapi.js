/**
   api
**/

layui.define(function(exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
	var $ = layui.$;
	//
	var PROTOCOL = "http://";
    var HOSTNAME = "127.0.0.1";
    var PORT = "80";
    var HOST = HOSTNAME + PORT;
    var ORIGIN = PROTOCOL + HOST + ":" + PORT;
    //
	var ajaxapi = {
        getData: function (url, params, callback) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: params
            }).always(function (data) {
                callback && typeof callback === 'function' && callback.apply(this, arguments);
            });
        },
        postData: function (url, params, callback) {
            $.ajax({
                contentType: 'application/json;charset=utf-8',
                type: "POST",
                url: url,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (response) {
                    callback && typeof callback === 'function' && callback.apply(this, arguments);
                }
            });
        },
        PROTOCOL:PROTOCOL,
        HOSTNAME:HOSTNAME,
        PORT:PORT,
        HOST:HOST,
        ORIGIN:ORIGIN
    };

	//输出接口
	exports('ajaxapi', ajaxapi);
});