layui.config({
	base: "../../../../js/common/"
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

	//监听工具条
	table.on('tool(demo)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		
		//   加入 上级编号数组 这里为模拟数据
		data.select_id = 2;
		data.list = [
			{"id":1,"name":"编号1"},
			{"id":2,"name":"编号2"},
			{"id":3,"name":"编号3"},
		];
		
		var layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'edit') {
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
	
	
	//   添加
	$(".listAdd_btn").on('click',function(){
		//   对象模型，必填
		var data = {
			"city":"",
			"select_id":"",
			"list":[
				{"id":1,"name":"编号1"},
				{"id":2,"name":"编号2"},
				{"id":3,"name":"编号3"},
			],
			"lay_operate":"add"
		}
		//   打开弹窗
		detailFn(data);
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
		var title = "修改";
		if(data.lay_operate == 'edit')title = "修改";
		if(data.lay_operate == 'add')title = "添加";
		//
		layer.open({
			type: 1,
			title: title,
			closeBtn: false,
			area: '400px;',
			shade: 0.8,
			id: 'modal_menu_edit',
			btn: ['确定', '取消'],
			moveType: 1,
			content: $("#modal_menu").html(),
			//   弹窗加载完成
			success: function(layero) {
				//  清空临时dom
				$("#modal_menu").html("");
				//  刷新表单
				form.render();

			},
			//  点击确定
			yes: function(index, layero) {
				//   确定
				//   提交ajax
				var data_form = $("#modal_menu_edit form").serialize();
				layer.msg(data_form);
				//  提交成功
			}
		});

	}

	

});