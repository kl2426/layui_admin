layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'element', 'upload'], function() {
	var element = layui.element;
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;

	
	//监听提交
	form.on('submit(formDemo)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	
	

});