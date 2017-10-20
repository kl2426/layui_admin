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
		data.lay_operate = 'edit';
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
		//  打开弹窗
		layer.open({
			type: 1,
			title: data.lay_operate == 'edit' ? '修改' : '查看',
			closeBtn: false,
			area: '400px;',
			shade: 0.8,
			id: 'modal_menu_edit',
			btn: data.lay_operate == 'edit' ? ['确定', '取消'] : ['取消'],
			moveType: 1,
			content: $("#modal_menu").html(),
			//   弹窗加载完成
			success: function(layero) {
				//  清空临时dom
				$("#modal_menu").html("");
				//
				form.render();
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


});