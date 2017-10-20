layui.config({
	base: "../../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form','laydate'], function() {
	var ajaxapi = layui.ajaxapi;
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;
	var laydate = layui.laydate;

	//监听工具条
	table.on('tool(demo)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'detail') {
			layer.msg('查看操作');
		} else if(layEvent === 'edit') {
			layer.msg('编辑操作');
		} else if(layEvent === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del(); //删除对应行（tr）的DOM结构
				layer.close(index);
				//向服务端发送删除指令
			});

		} else if(layEvent === 'check') {
			//   
			checkFn();
		}
	});

	//添加
	$(".listAdd_btn").click(function() {
		var index = layui.layer.open({
			title: "添加新闻",
			type: 2,
			content: "newsAdd.html",
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

	//   查询
	//监听提交
	form.on('submit(listSearch)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	//  审核
	var checkFn = function() {
		//多窗口模式，层叠置顶
		layer.open({
			type: 2, //此处以iframe举例
			title: '新闻审核',
			area: ['80%', '600px'],
			shade: 0,
			maxmin: true,
			content: 'newsCheck.html',
			zIndex: layer.zIndex, //重点1
			success: function(layero) {
				layer.setTop(layero); //重点2
			}
		});

	}

	//   时间选择
	laydate.render({
		elem: '#test16',
		type: 'datetime',
		range: '到',
		format: 'yyyy年M月d日H时m分s秒'
	});

});