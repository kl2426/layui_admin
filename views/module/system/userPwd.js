layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;

	//监听提交
	form.on('submit(formDemo)', function(data) {
		var obj_pwd = data.field;
		var arr_pwd = [];
		for(var i in obj_pwd){
			arr_pwd.push(obj_pwd[i]);
		}
		if(arr_pwd[0] !== arr_pwd[1]){
			layer.msg('两次密码不一至');
			return false;
		}
		//
		console.log(data)
		layer.msg(JSON.stringify(data.field));
		return false;
	});
	
	//  关闭弹窗
	$(".layui-layer-close").on('click',function(){
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭   
	});
	
	//自定义验证规则
	form.verify({
		pass: [/(.+){6,12}$/, '密码必须6到12位']
	});
	

});