layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'laydate'], function() {
	var form = layui.form;
	var upload = layui.upload;
	var $ = layui.$; //jq
	var laydate = layui.laydate;
	var table = layui.table; //表格

	//监听提交
	form.on('submit(formDemo)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	// ========= tree ==========
	//  树形表格菜单
	//  需引入 jquery.treetable.js

	//  初始化
	var tree_table = $("#example-advanced").treetable({
		expandable: true
	});
	//  默认展开
	tree_table.treetable("reveal", 6);
	//  选中项
	var node_json = {};

	//  点击选中
	$("#example-advanced tbody").on("mousedown", "tr", function() {
		$(".selected").not(this).removeClass("selected");
		$(this).toggleClass("selected");
		//   选中
		if($(this).hasClass("selected")) {
			var id = $(this).attr("data-tt-id");
			node_json = tree_table.treetable("node", id);
		} else {
			node_json = {};
		}
	});

	/**
	 * 添加孩子级
	 * @param {int} id
	 * @param {String} name  菜单名称 
	 * @param {String} code  编码
	 * @param {String} url   url
	 */
	var inChildFn = function(id, name, code, url) {
		if(!("tree" in node_json)) return false;
		var node_html = "<tr data-tt-id='" + id + "' data-tt-parent-id='" + node_json.id + "'>" +
			"	<td><span class=''>" + name + "</span></td>" +
			"	<td>" + code + "</td>" +
			"	<td>" + url + "</td>" +
			"</tr>";
		tree_table.treetable("loadBranch", node_json, node_html);
	}

	/**
	 * 删除选中行
	 */
	var removeTrFn = function() {
		if(!("tree" in node_json)) return false;
		//
		tree_table.treetable("removeNode", node_json.id);
	}

	/**
	 * 修改选中行
	 * @param {String} name  菜单名称 
	 * @param {String} code  编码
	 * @param {String} url   url
	 */
	var editTrFn = function(name, code, url) {
		if(!("tree" in node_json)) return false;
		var dom_tr = node_json.row;
		//  name
		dom_tr.find("td").eq(0).find("span").last().html(name);
		//  code
		dom_tr.find("td").eq(1).html(code);
		//  url
		dom_tr.find("td").eq(2).html(url);
	}

	// ========= /tree ==========





	// ========== 菜单添加修改删除  ==============
	$("#menu_add,#menu_edit,#menu_del").on("click", function() {
		if(!("tree" in node_json)) {
			layer.msg('未选中');
			return false;
		}
		//  添加，修改，删除
		var operation = $(this).attr("id");
		if(operation == 'menu_add') {
			//   添加
			//   打开弹窗
			layer.open({
				type: 1,
				title: "菜单添加",
				closeBtn: false,
				area: '400px;',
				shade: 0.8,
				id: 'modal_menu_add',
				btn: ['确定', '取消'],
				moveType: 1,
				content: $("#modal_menu").html(),
				//   弹窗加载完成
				success: function(layero) {
				},
				//  点击确定
				yes:function(index, layero){
					//   提交ajax
					//  随机
					var sj = parseInt(10 + (900 - 10) * (Math.random()));
					//  提交成功
					if(1){
						//
						var name = $("#modal_menu_add").find("input[name=name]").val();
						var code = $("#modal_menu_add").find("input[name=code]").val();
						var url = $("#modal_menu_add").find("input[name=url]").val();
						//   添加
						inChildFn(sj, name + sj, code + sj, url + sj);
						//
						layer.close(index);
					}
				}
			});

		} else if(operation == 'menu_edit') {
			//   修改
			//   选中行的dom
			var dom_tr = node_json.row;
			//   打开弹窗
			layer.open({
				type: 1,
				title: "菜单修改",
				closeBtn: false,
				area: '400px;',
				shade: 0.8,
				id: 'modal_menu_edit',
				btn: ['确定', '取消'],
				moveType: 1,
				content: $("#modal_menu").html(),
				//   弹窗加载完成
				success: function(layero) {
					var name = $("#modal_menu_edit").find("input[name=name]");
					var code = $("#modal_menu_edit").find("input[name=code]");
					var url = $("#modal_menu_edit").find("input[name=url]");
					name.val( dom_tr.find("td").eq(0).find("span").last().html() );
					code.val( dom_tr.find("td").eq(1).html() );
					url.val( dom_tr.find("td").eq(2).html() );
				},
				//  点击确定
				yes:function(index, layero){
					//   提交ajax
					
					//  提交成功
					if(1){
						//
						var name = $("#modal_menu_edit").find("input[name=name]").val();
						var code = $("#modal_menu_edit").find("input[name=code]").val();
						var url = $("#modal_menu_edit").find("input[name=url]").val();
						//   修改
						editTrFn(name,code,url);
						//
						layer.close(index);
					}
				}
			});

		} else if(operation == 'menu_del') {
			//   删除
			layer.confirm('真的删除行么', function(index) {
				//  ajax 删除行
				
				//  删除页面上行
				removeTrFn();
				//
				layer.close(index);
			});
		}
	});
	
	
	
	
	
	// ========== 操作权限     添加修改删除  ==============
	$("#operate_add,#operate_edit,#operate_del").on("click", function() {
		//
		var checkStatus = table.checkStatus('table_operate'); //test即为基础参数id对应的值
		if(checkStatus.data.length !== 1){
			layer.msg('请选中一行');
			return false;
		}
		//  添加，修改，删除
		var operation = $(this).attr("id");
		if(operation == 'operate_add') {
			//   添加
			//   打开弹窗
			layer.open({
				type: 1,
				title: "操作添加",
				closeBtn: false,
				area: '400px;',
				shade: 0.8,
				id: 'modal_operate_add',
				btn: ['确定', '取消'],
				moveType: 1,
				content: $("#modal_menu").html(),
				//   弹窗加载完成
				success: function(layero) {
				},
				//  点击确定
				yes:function(index, layero){
					//   提交ajax
					
					//
					layer.close(index);
				}
			});

		} else if(operation == 'operate_edit') {
			//   修改
			//   选中行的dom
			var dom_tr = node_json.row;
			//   打开弹窗
			layer.open({
				type: 1,
				title: "操作修改",
				closeBtn: false,
				area: '400px;',
				shade: 0.8,
				id: 'modal_operate_edit',
				btn: ['确定', '取消'],
				moveType: 1,
				content: $("#modal_menu").html(),
				//   弹窗加载完成
				success: function(layero) {
					//
				},
				//  点击确定
				yes:function(index, layero){
					//   提交ajax
					
					//
					layer.close(index);
				}
			});

		} else if(operation == 'operate_del') {
			//   删除
			layer.confirm('真的删除行么', function(index) {
				//  ajax 删除行
				
				layer.close(index);
			});
		}
	});

});