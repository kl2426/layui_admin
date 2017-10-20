layui.config({
	base: "../../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'upload', 'layedit', 'form', 'laydate'], function() {
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

	//普通图片上传
	var uploadInst = upload.render({
		elem: '#test1',
		url: '/upload/',
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#demo1').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if(res.code > 0) {
				return layer.msg('上传失败');
			}
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#demoText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				uploadInst.upload();
			});
		}
	});
	
	

});