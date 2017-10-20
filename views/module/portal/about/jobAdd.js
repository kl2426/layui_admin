layui.config({
	base: "../../../../js/common/"
}).use(['ajaxapi', 'table', 'layer','upload', 'layedit', 'form', 'laydate'], function() {
	var form = layui.form;
	var upload = layui.upload;
	var $ = layui.$; //jq
	var laydate = layui.laydate;
	var layedit = layui.layedit;

	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');

	//监听提交
	form.on('submit(formDemo)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	//选完文件后不自动上传
	upload.render({
		elem: '#test8',
		url: '/upload/',
		auto: false,
		accept: 'file', //允许上传的文件类型 指定允许上传的文件类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）
		//size: 50, //最大允许上传的文件大小
		bindAction: '#test9',
		done: function(res) {
			console.log(res)
		}
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