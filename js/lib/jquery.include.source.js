function include(url){
	//Получаем формат файла
	var parts, ext = ( parts = url.split("/").pop().split(".") ).length > 1 ? parts.pop() : "";
	var head = $("html>head");
	if(ext != ""){
		if(ext == "js" || ext == "css"){
			if(ext == "css"){
				var tag = head.children("link:last");
				if(tag.length != 0){
				$('<link rel="stylesheet" href="'+url+'" type="text/css" media="all">').insertAfter(tag);			
				}else{
				head.append('<link rel="stylesheet" href="'+url+'" type="text/css" media="all" start>');				
				}			
			}
			if(ext == "js"){
				var tag = head.children("script");
				$.getScript(url);
			}
		}
	}
}