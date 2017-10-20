layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'laytpl', 'upload'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;
	var laytpl = layui.laytpl;
	var upload = layui.upload;

	//   查询
	//监听提交
	form.on('submit(listSearch)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	
	//   添加
	$(".listAdd_btn").click(function() {
		var data = {
			city:""
		};
		data.lay_operate = 'add';
		detailFn(data);
	});

	//监听工具条
	table.on('tool(demo)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'detail') {
			data.lay_operate = 'detail';
			detailFn(data);
			//layer.msg('查看操作');
		} else if(layEvent === 'edit') {
			data.lay_operate = 'edit';
			detailFn(data);
			//layer.msg('编辑操作');
		} else if(layEvent === 'del') {
			layer.confirm('真的要删除吗？', function(index) {
				layer.close(index);
				//向服务端发送删除指令
			});
			//layer.msg('注销');
		}
	});
	

	//   模板
	var getTpl = modal_view.innerHTML;
	//   临时dom
	var view = document.getElementById('modal_menu');

	//   查看
	var detailFn = function(data) {
		//   渲染 模板
		laytpl(getTpl).render(data, function(html) {
			view.innerHTML = html;

		});
		//  title
		var title = '添加';
		var btn = ['确定', '取消'];
		if(data.lay_operate == 'edit'){
			title = '修改';
		}else if(data.lay_operate == 'detail'){
			title = '查看';
			btn = ['取消'];
		}
		//  btn
		
		//  打开弹窗
		layer.open({
			type: 1,
			title: title,
			closeBtn: false,
			area: '700px;',
			shade: 0.8,
			id: 'modal_menu_edit',
			btn: btn,
			moveType: 1,
			content: $("#modal_menu").html(),
			//   弹窗加载完成
			success: function(layero) {
				//  清空临时dom
				$("#modal_menu").html("");
				//
				form.render();
				
				// 初始化普通图片上传
				upfileFn();
			},
			//  点击确定
			yes: function(index, layero) {
				//   只有一个按钮 取消
				if(data.lay_operate == 'detail') {
					layer.close(index);
					return false;
				}

				//   确定
				//   提交ajax
				var data_form = $("#modal_menu_edit form").serialize();
				layer.msg(data_form);
				//  提交成功
			}
		});

	}
	
	
	
	//   上传图片
	//   图片obj
	var uploadInst = null;

	var upfileFn = function() {
		uploadInst = upload.render({
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
	}


});