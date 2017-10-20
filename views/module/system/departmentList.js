layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form'], function() {
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
	
	
	// ========= tree ==========
	//  树形表格菜单
	//  需引入 jquery.treetable.js

	//  初始化
	var tree_table = $("#example-advanced").treetable({
		expandable: true
	});
	//  默认展开
	tree_table.treetable("reveal", 6);
	//  选中项
	var node_json = {};

	//  点击选中
	$("#example-advanced tbody").on("mousedown", "tr", function() {
		$(".selected").not(this).removeClass("selected");
		$(this).toggleClass("selected");
		//   选中
		if($(this).hasClass("selected")) {
			var id = $(this).attr("data-tt-id");
			node_json = tree_table.treetable("node", id);
		} else {
			node_json = {};
		}
		layer.msg(node_json.id);
	});




	// ========= /tree ==========
	

});