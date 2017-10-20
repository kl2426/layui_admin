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


	//监听工具条
	table.on('tool(demo)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'detail') {
			data.lay_operate = 'detail';
			layer.msg('查看操作');
		} else if(layEvent === 'edit') {
			data.lay_operate = 'edit';
			layer.msg('编辑操作');
		} else if(layEvent === 'del') {
			layer.confirm('真的要删除吗？', function(index) {
				layer.close(index);
				//向服务端发送删除指令
			});
		}
	});
	
	
	//添加
	$(".listAdd_btn").click(function() {
		var index = layui.layer.open({
			title: "添加图文信息",
			type: 2,
			content: "commandAdd.html",
			success: function(layero, index) {
				setTimeout(function() {
					layui.layer.tips('点击此处返回友链列表', '.layui-layer-setwin .layui-layer-close', {
						tips: 3
					});
				}, 500)
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function() {
			layui.layer.full(index);
		})
		layui.layer.full(index);
	});



});