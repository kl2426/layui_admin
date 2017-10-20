layui.config({
	base: "../../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;

	//监听提交
	form.on('submit(formDemo)', function(data) {
		var dom = $(data.elem);
		var operate = dom.data('operate');
		//  on  同意  ，  off 不同意
		if(operate == 'on'){
			layer.msg("同意" + JSON.stringify(data.field));
		}
		if(operate == 'off'){
			layer.msg("不同意" + JSON.stringify(data.field));
		}
		
		return false;
	});
	
	
	//  关闭弹窗
	var modalClose = function(){
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭   
	}
	

});