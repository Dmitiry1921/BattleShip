window.data = {
	info: "",
	create: ""
}; //Переменная содержащая всю инфрмацию
window.info = 
{
	"help()" 			: "Выводит информацию о своих командах и примерах использования их",
	"help.start()" 		: 'Запускает работу функции help() и собирает данные о Ядре "Nori"',
	"help.class()" 		: 'Выводит информацию о классах находящихся в Ядре системы "Nori"',
	"help.create()" 	: 'Позволяет создать help() для нового созданого класса',
};
window.i = 0;
window.attr = {
	"info" 		: "Информация",
	"vars" 		: "Переменные",
	"example" 	: "Пример",
	"return" 	: "Результат",
}
window.help = function(){ //Будет использоваться как help.list
	console.clear();
	if(window.data.info != ""){
		console.group('Доступные команды плагина Help системы Nori: '+name);
		for( var comm  in window.info ){
			console.info(comm+' --> '+window.info[comm]);
		}
		console.groupEnd();
	}else{
		if(window.i < 5){
			console.warn('Для получения информации дня начало воспользуйтесь --> help.start()');
			window.i++;
		}else{
			console.error('ЭЭЭЭЭ !!! Не прекратишь я прейду к тебе домой и съем еду в твоем холодильнике ! ВУхахахахахаха )))');
			window.i=0;
		}
	}
}
window.help.start = function(){
	console.clear();
//после выполнения этой функции станет доступна информация о Методах и Классах "Ядра системы"
	if(window.data.info == ""){
		$.ajax({
			url: 'http://'+location.hostname+'/Plugins/ChatID/Core/Ajax/Help.Ajax.php',
			dataType: "json",
			success: function(data){
				window.data.info = data;
			}
		}).done(function(){
			console.info("Данные получены для просмотра --> help.class()");
		});
	}else{
		if(window.i < 5){
			console.warn("Эта функция вызываеться единожды");
			window.i++;
		}else{
			console.error("ДА ХАРОШ УЖЕ!!! ВСЕ РОВНО НЕ ЧЕГО НЕ ИЗМЕНИТЬСЯ !!");
			window.i=0;
		}
	}
};
window.help.class = function(name){
	console.clear();
	if(window.data.info != ""){
		if(typeof name != "undefined"){
			if(typeof window.data.info[name] != "undefined"){
			/*------------------------------------------------*/
				console.group('Класс: "%c'+name+'%c"','color:blue;','color:#000;');
				for(var method in window.data.info[name]){
					if(typeof window.data.info[name][method].info != "undefined"){
						var msg = "Obj -> %c"+method+"()%c - "+window.data.info[name][method].info,
							clr = '';
					}else{
						var msg = "Obj -> %c"+method+"()%c - %cИнформация не обнаружена",
							clr = 'color:red;';
					}
					console.groupCollapsed(msg,'color:blue;','color:#000;',clr);
					for(var obj in window.data.info[name][method]){
						console.info(window.attr[obj]+' - '+window.data.info[name][method][obj]);
					}console.groupEnd();					
				}console.groupEnd();
			/*------------------------------------------------*/
			}else{
				if(window.i < 5){
					console.warn("Класс: "+name+" не обнаружен, список доступных классов --> help.class()");
					window.i++;
				}else{
					console.error('ГЛУПЫЙ ЮЗВЕРЬ !!! Ты читать то хоть умеешь? :,(');	
					window.i=0;
				}
			}
		}else{
		//Имя не обнаружено, выводим всю информацию о всех классах.
			console.group('Список классов, для подробной информации о классе --> help.class("%cКласс%c")','color:blue;','color:#000;');
			for( var cls  in window.data.info ) {
				/*------------------------------------------------*/
				console.groupCollapsed('Класс: "%c'+cls+'%c"','color:blue;','color:#000;');
				for(var method in window.data.info[cls]){
					if(typeof window.data.info[cls][method].info != "undefined"){
						var msg = "Объект -> %c"+method+"()%c - "+window.data.info[cls][method].info,
							clr = '';
					}else{
						var msg = "Объект -> %c"+method+"()%c - %cИнформация не обнаружена",
							clr = 'color:red;';
					}
					console.groupCollapsed(msg,'color:blue;','color:#000;',clr);
					for(var obj in window.data.info[cls][method]){
						if(typeof window.data.info[cls][method][obj] == "object"){
							console.groupCollapsed(window.attr[obj]);
							for(var itm in window.data.info[cls][method][obj]){
								console.info(itm+' - '+window.data.info[cls][method][obj][itm]);
							}console.groupEnd();
						}else{						
							console.info(window.attr[obj]+' - '+window.data.info[cls][method][obj]);
						}
						//console.info(window.attr[obj]+' - '+window.data.info[cls][method][obj]);
					}console.groupEnd();					
				}console.groupEnd();
				/*----------------------------------------------------*/
			}console.groupEnd();			
		}
	}else{
		if(window.i < 5){
			console.warn("Функиця не может быть использована пока не запущен плагин help(), Запустить --> help.start()");
			window.i++
		}else{
			console.error("А НУ ПРИКРАТИ СЕЙЧАС ЖЕ !!!");
			window.i=0;
		}
		
	}
};
/*
написать функции 
help.list() 	- выводит информацию о всех функция
help.class()	- выводи информацию о классах и всю ифнормацию о классе если класс указан.
*/
$(document).ready(function(){
	console.info('Плагин "%chelp()%c" установлен, для запуска воспользуйтесь %chelp.start()','color:blue;','color:black;','color:blue;');
});

























// window.core = {
	// help : (function(id){
		// $.ajax({
			// url: 'http://'+location.hostname+'/Plugins/ChatID/Core/Ajax/Help.Ajax.php',
			// dataType: "json",
			// type: "POST",
			// success: function(data){
				// window.help = data;
				// console.log();
			// }
		// });
	// })
// }