layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'laytpl', 'upload'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;
	var laytpl = layui.laytpl;
	var upload = layui.upload;
	
	//监听提交
	form.on('submit(demo1)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	//   微信定制 左边 点击事件
	$("#mobile-nav li").on("click",function(e){
		e.stopPropagation();
		$("#mobile-nav li").removeClass('active');
		$(this).addClass("active");
	});
	
	//  菜单内容 点击
	$(document).on("click","#menu_nav .layui-form-radio",function(){
		var that = $(this);
		console.log(that.prev().index())
		$("#menu_body .one").hide();
		$("#menu_body .one").eq(that.prev().index()/2).show();
	});
	
	//  删除菜单
	$("#del_menu").on("click",function(){
		layer.msg("删除菜单")
	});
	
	
	
	/**
	 * 微信定制 左边 点击处理 
	 */
	
	
	/**
	 * 刷新  微信定制 左边 菜单
	 */
	var refreshLeftNavFn = function(){
		
	}
	

	

});