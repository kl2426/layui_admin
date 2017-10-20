layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'upload'], function() {
	var form = layui.form;
	var upload = layui.upload;
	var $ = layui.$; //jq

	//监听提交
	form.on('submit(formDemo)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	//普通图片上传
	var uploadInst = upload.render({
		elem: '#upfile_logo1',
		url: '/upload/',
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#upfile_bc_img1').attr('src', result); //图片链接（base64）
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
			var demoText = $('#upfile_bc_txt1');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				uploadInst.upload();
			});
		}
	});

	//普通图片上传
	var uploadInst = upload.render({
		elem: '#upfile_logo2',
		url: '/upload/',
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#upfile_bc_img2').attr('src', result); //图片链接（base64）
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
			var demoText = $('#upfile_bc_txt2');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				uploadInst.upload();
			});
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