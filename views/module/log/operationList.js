layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer','form'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;

	
	//   查询
	//监听提交
	form.on('submit(listSearch)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});
	
	
	//  导出日志
	$(".listout_btn").on('click',function(){
		layer.msg('导出日志');
	});

});