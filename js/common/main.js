layui.config({
	base: "../common/"
}).use(['layer'], function() {
	var layer = layui.layer;
	var $ = layui.$;
	/**
	 * 图样
	 */
	var pic_bar = echarts.init(document.getElementById('pic_bar'));

	// 指定图表的配置项和数据
	var option1 = {
		title: {
			text: '行业占比',
			subtext: '纯属虚构',
			x: 'left',
			textStyle: {
				color: "#1AA094",
				fontSize: 14
			}
		},

		tooltip: {},
		legend: {
			data: ['行业']
		},
		xAxis: {
			data: ["冶金", "有色", "织物", "机械", "商贸", "建材"],
			axisLine: {
				lineStyle: {
					color: "#1AA094",
					opacity: 0.5
				}
			},
		},
		yAxis: {
			axisLine: {
				lineStyle: {
					color: "#1AA094",
					opacity: 0.5
				}
			},
			splitLine: {
				lineStyle: {
					color: "#1AA094",
					opacity: 0.2
				}
			}
		},
		series: [{
			name: '行情',
			type: 'bar',
			barWidth:"50%",
			center: ['50%', '50%'],
			data: [5, 20, 36, 10, 10, 20],
			
			 markPoint : {
			     label:{
			         normal:{
			             color:"#ffffff"
			         }
			     },
                data : [
                   {name : '年最高', value : 36, xAxis:0, yAxis: 5},
                //   {name : '年最高', value : 9.0, xAxis: 3, yAxis: 183},
                 //  {name : '年最高', value : 5.9, xAxis: 2, yAxis: 183},
                 //   {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
		}],
		color: ["#1AA094"],
		textStyle: {
			color: "#1AA094"
		}
	};

	// 使用刚指定的配置项和数据显示图表。
	pic_bar.setOption(option1);

	/**
	 *  饼状图 
	 */
	var pic_pie = echarts.init(document.getElementById('pic_pie'));
	option2 = {
		title: {
			text: '分类占比',
			subtext: '纯属虚构',
			x: 'left',
			textStyle: {
				color: "#1AA094",
				fontSize: 14
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		color: ["#1AA094", "#1A679E", "#22D3C4"],
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
		},
		series: [{
			name: '占比',
			type: 'pie',
			radius: '90%',
			center: ['50%', '50%'],
			hoverAnimation: false,
			data: [{
					value: 335,
					name: '仓储'
				},
				{
					value: 310,
					name: '电商'
				},
				{
					value: 1548,
					name: '物流'
				}
			],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
			label: {
				normal: {
					position: 'inner'
				}
			},
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	pic_pie.setOption(option2);

	//////////////

	$(".panel a").on("click", function() {
		window.parent.addTab($(this));
	})

	//动态获取文章总数和待审核文章数量,最新文章
	$.get("../../json/newsList.json",
		function(data) {
			var waitNews = [];
			$(".allNews span").text(data.length); //文章总数
			for(var i = 0; i < data.length; i++) {
				var newsStr = data[i];
				if(newsStr["newsStatus"] == "待审核") {
					waitNews.push(newsStr);
				}
			}
			$(".waitNews span").text(waitNews.length); //待审核文章
			//加载最新文章
			var hotNewsHtml = '';
			for(var i = 0; i < 5; i++) {
				hotNewsHtml += '<tr>' +
					'<td align="left">' + data[i].newsName + '</td>' +
					'<td>' + data[i].newsTime + '</td>' +
					'</tr>';
			}
			$(".hot_news").html(hotNewsHtml);
		}
	)

	//图片总数
	$.get("../../json/images.json",
		function(data) {
			$(".imgAll span").text(data.length);
		}
	)

	//用户数
	$.get("../../json/usersList.json",
		function(data) {
			$(".userAll span").text(data.length);
		}
	)

	//新消息
	$.get("../../json/message.json",
		function(data) {
			$(".newMessage span").text(data.length);
		}
	)

	//数字格式化
	$(".panel span").each(function() {
		$(this).html($(this).text() > 9999 ? ($(this).text() / 10000).toFixed(2) + "<em>万</em>" : $(this).text());
	})

	//系统基本参数
	if(window.sessionStorage.getItem("systemParameter")) {
		var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
		fillParameter(systemParameter);
	} else {
		$.ajax({
			url: "../../json/systemParameter.json",
			type: "get",
			dataType: "json",
			success: function(data) {
				fillParameter(data);
			}
		})
	}

	//填充数据方法
	function fillParameter(data) {
		//判断字段数据是否存在
		function nullData(data) {
			if(data == '' || data == "undefined") {
				return "未定义";
			} else {
				return data;
			}
		}
		$(".version").text(nullData(data.version)); //当前版本
		$(".author").text(nullData(data.author)); //开发作者
		$(".homePage").text(nullData(data.homePage)); //网站首页
		$(".server").text(nullData(data.server)); //服务器环境
		$(".dataBase").text(nullData(data.dataBase)); //数据库版本
		$(".maxUpload").text(nullData(data.maxUpload)); //最大上传限制
		$(".userRights").text(nullData(data.userRights)); //当前用户权限
	}
	
	
	
	

})