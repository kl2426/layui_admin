layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'laydate'], function() {
	var form = layui.form;
	var upload = layui.upload;
	var $ = layui.$; //jq
	var laydate = layui.laydate;

	//日期
	//  入职时间
	laydate.render({
		elem: '#date'
	});
	//  离职时间
	laydate.render({
		elem: '#date1'
	});

	//监听提交
	form.on('submit(formDemo)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	//自定义验证规则
	form.verify({
		//   企业名称
		title: function(value) {
			if(value.length < 2) {
				return '企业名称至少得2个字符';
			}
		},
		//   法人
		person: function(value) {
			if(value.length < 2) {
				return '法人名称至少得2个字符';
			}
		},
		pass: [/(.+){6,12}$/, '密码必须6到12位']
	});

});