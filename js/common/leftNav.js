function navBar(strData){
	var data;
	if(typeof(strData) == "string"){
		var data = JSON.parse(strData); //部分用户解析出来的是字符串，转换一下
	}else{
		data = strData;
	}	
	var ulHtml = '<ul class="layui-nav layui-nav-tree">';
	for(var i=0;i<data.length;i++){
		if(data[i].spread){
			ulHtml += '<li class="layui-nav-item layui-nav-itemed">';
		}else{
			ulHtml += '<li class="layui-nav-item">';
		}
		if(data[i].children != undefined && data[i].children.length > 0){
			ulHtml += '<a href="javascript:;">';
			if(data[i].icon != undefined && data[i].icon != ''){
				if(data[i].icon.indexOf("icon-") != -1){
					ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
				}else{
					ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
				}
			}
			ulHtml += '<cite>'+data[i].title+'</cite>';
			ulHtml += '<span class="layui-nav-more"></span>';
			ulHtml += '</a>';
			ulHtml += '<dl class="layui-nav-child">';
			//for(var j=0;j<data[i].children.length;j++){
				//   第三级
				if(data[i].children != undefined && data[i].children.length > 0){
					//   有第三级
					
					ulHtml += '<ul class="layui-nav layui-nav-tree">';
					
					for(var k=0;k<data[i].children.length;k++){
						if(data[i].children[k].spread){
							ulHtml += '<li class="layui-nav-item layui-nav-itemed">';
						}else{
							ulHtml += '<li class="layui-nav-item">';
						}
						if(data[i].children[k].children != undefined && data[i].children[k].children.length > 0){
							ulHtml += '<a href="javascript:;">';
							if(data[i].children[k].icon != undefined && data[i].children[k].icon != ''){
								if(data[i].children[k].icon.indexOf("icon-") != -1){
									ulHtml += '<i class="iconfont '+data[i].children[k].icon+'" data-icon="'+data[i].children[k].icon+'"></i>';
								}else{
									ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[k].icon+'">'+data[i].children[k].icon+'</i>';
								}
							}
							ulHtml += '<cite>'+data[i].children[k].title+'</cite>';
							ulHtml += '<span class="layui-nav-more"></span>';
							ulHtml += '</a>';
							ulHtml += '<dl class="layui-nav-child">';
							for(var h=0;h<data[i].children[k].children.length;h++){
								if(data[i].children[k].children[h].target == "_blank"){
									ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].children[k].children[h].href+'" target="'+data[i].children[k].children[h].target+'">';
								}else{
									ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].children[k].children[h].href+'">';
								}
								if(data[i].children[k].children[h].icon != undefined && data[i].children[k].children[h].icon != ''){
									if(data[i].children[k].children[h].icon.indexOf("icon-") != -1){
										ulHtml += '<i class="iconfont '+data[i].children[k].children[h].icon+'" data-icon="'+data[i].children[k].children[h].icon+'"></i>';
									}else{
										ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[k].children[h].icon+'">'+data[i].children[k].children[h].icon+'</i>';
									}
								}
								ulHtml += '<cite>'+data[i].children[k].children[h].title+'</cite></a></dd>';
							}
							ulHtml += "</dl>";
						}else{
							if(data[i].children[k].target == "_blank"){
								ulHtml += '<a href="javascript:;" data-url="'+data[i].children[k].href+'" target="'+data[i].children[k].target+'">';
							}else{
								ulHtml += '<a href="javascript:;" data-url="'+data[i].children[k].href+'">';
							}
							if(data[i].children[k].icon != undefined && data[i].children[k].icon != ''){
								if(data[i].children[k].icon.indexOf("icon-") != -1){
									ulHtml += '<i class="iconfont '+data[i].children[k].icon+'" data-icon="'+data[i].children[k].icon+'"></i>';
								}else{
									ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[k].icon+'">'+data[i].children[k].icon+'</i>';
								}
							}
							ulHtml += '<cite>'+data[i].children[k].title+'</cite></a>';
						}
						ulHtml += '</li>';
					}
					
					
					
					
					
					
					
					
					
					ulHtml += '</ul>';
					
					
					
					
					
					
					
					
					
				}else{
					//   没有第三级
					if(data[i].target == "_blank"){
					ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].href+'" target="'+data[i].target+'">';
					}else{
						ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].href+'">';
					}
					if(data[i].icon != undefined && data[i].icon != ''){
						if(data[i].icon.indexOf("icon-") != -1){
							ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
						}else{
							ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
						}
					}
					ulHtml += '<cite>'+data[i].title+'</cite></a></dd>';
				}
			//}
			ulHtml += "</dl>";
		}else{
			if(data[i].target == "_blank"){
				ulHtml += '<a href="javascript:;" data-url="'+data[i].href+'" target="'+data[i].target+'">';
			}else{
				ulHtml += '<a href="javascript:;" data-url="'+data[i].href+'">';
			}
			if(data[i].icon != undefined && data[i].icon != ''){
				if(data[i].icon.indexOf("icon-") != -1){
					ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
				}else{
					ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
				}
			}
			ulHtml += '<cite>'+data[i].title+'</cite></a>';
		}
		ulHtml += '</li>';
	}
	ulHtml += '</ul>';
	
	//console.log(ulHtml)
	return ulHtml;
}
