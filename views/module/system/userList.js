layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form'], function() {
	var table = layui.table; //表格
	var layer = layui.layer; //弹层
	var $ = layui.$; //jq
	var form = layui.form;

	//监听工具条
	table.on('tool(demo)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'detail') {
			layer.msg('查看操作');
		} else if(layEvent === 'edit') {
			layer.msg('编辑操作');
		} else if(layEvent === 'check') {
			checkFn();
			//layer.msg('审核');
		} else if(layEvent === 'role') {
			//   分配角色
			roleFn();
		} else if(layEvent === 'pwd') {
			pwdFn();
			//layer.msg('密码重置');
		}
	});
	

	//   注册用户详情
	$(".listAdd_btn").click(function() {
		var index = layui.layer.open({
			title: "注册用户详情",
			type: 2,
			content: "userInfo.html",
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

	//  分配角色
	var roleFn = function() {
		//多窗口模式，层叠置顶
		layer.open({
			type: 2, //此处以iframe举例
			title: '分配角色',
			area: ['700px', '500px'],
			shade: 0,
			maxmin: true,
			content: 'memberRole.html',
			zIndex: layer.zIndex, //重点1
			success: function(layero) {
				layer.setTop(layero); //重点2
			}
		});

	}
	
	//  审核
	var checkFn = function() {
		//多窗口模式，层叠置顶
		layer.open({
			type: 2, //此处以iframe举例
			title: '注册用户认证审核',
			area: ['80%','600px'],
			shade: 0,
			maxmin: true,
			content: 'userCheck.html',
			zIndex: layer.zIndex, //重点1
			success: function(layero) {
				layer.setTop(layero); //重点2
			}
		});

	}
	
	
	//  密码重置
	var pwdFn = function() {
		//多窗口模式，层叠置顶
		layer.open({
			type: 2, //此处以iframe举例
			title: '重置密码',
			area: ['500px', '300px'],
			shade: 0,
			maxmin: true,
			content: 'userPwd.html',
			zIndex: layer.zIndex, //重点1
			success: function(layero) {
				layer.setTop(layero); //重点2
			}
		});

	}

});