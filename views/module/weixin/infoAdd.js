layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'laytpl', 'upload'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;
	var laytpl = layui.laytpl;
	var upload = layui.upload;
	var layedit = layui.layedit;

	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');
	
	//监听提交
	form.on('submit(demo1)', function(data) {
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
				$('.upfile_bc_img1').attr('src', result); //图片链接（base64）
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
	
	
	//   标题修改
	$('#info_title').on('change',function(){
		$('#info_titl_body').text($(this).val());
	});

	

});