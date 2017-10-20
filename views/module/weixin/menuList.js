layui.config({
	base: "../../../js/common/"
}).use(['ajaxapi', 'table', 'layer', 'form', 'laydate'], function() {
	var form = layui.form;
	var upload = layui.upload;
	var $ = layui.$; //jq
	var laydate = layui.laydate;
	var laytpl = layui.laytpl;
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
	 */
	var inChildFn = function(id, name, key, level, pid, sort, type, value) {
		if(!("tree" in node_json)) return false;
		var node_html = "<tr data-tt-id='" + id + "' data-tt-parent-id='" + node_json.id + "'>" +
			"	<td><span class=''>" + name + "</span></td>" +
			"	<td>" + "" + "</td>" +
			"	<td>" + key + "</td>" +
			"	<td>" + value + "</td>" +
			"	<td>" + sort + "</td>" +
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
	var editTrFn = function(name, key, level, pid, sort, type, value) {
		if(!("tree" in node_json)) return false;
		var dom_tr = node_json.row;
		//  name
		dom_tr.find("td").eq(0).find("span").last().html(name);
		//  
		dom_tr.find("td").eq(2).html(key);
		//  
		dom_tr.find("td").eq(3).html(value);
		dom_tr.find("td").eq(4).html(sort);
	}

	// ========= /tree ==========


	
	
	
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
				layer.close(index);
			}
		});

	}
	
	
	
	// ========== 菜单添加修改删除  ==============
	$("#menu_add,#menu_edit,#menu_del").on("click", function() {
		if(!("tree" in node_json)) {
			layer.msg('未选中');
			return false;
		}
		//  添加，修改，删除
		var operation = $(this).attr("id");
		if(operation == 'menu_add') {
			var data = {
				city:""
			};
			data.lay_operate = 'add';
			detailFn(data);

		} else if(operation == 'menu_edit') {
			//   修改
			//   选中行的dom
			var dom_tr = node_json.row;
			
			//  ajax 取 当前选中记录
			var data = {
				city:'123'
			};
			data.lay_operate = 'edit';
			detailFn(data);

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
	


	
	
	
	

});