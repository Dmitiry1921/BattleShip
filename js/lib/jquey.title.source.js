function Title(){
var padding = 10,
	tooltip = $('body>.tooltip'),
	top = 25,
	left = 15;
	  $('[title]').hover(function(event){
		// Hover over code
		var titleText = $(this).attr('title'),
			count = $(".tooltip").length;
		$(this)
		  .data('tipText', titleText)
		  .removeAttr('title');
		if(count == 0){ 
			$('<p class="tooltip" style="z-index: 9999;margin: 0px;position: absolute;display: none;top:0px;left:0px;background-color: rgba(0, 0, 0, 0.75);padding: 5px '+padding+'px 5px 10px;color: rgba(255, 255, 255, 0.9);border-radius: 5px;font-family: Verdana;font-size: 12px;	max-width: 550px;font-style: normal;"></p>')
			  .text(titleText)
			  .appendTo('body')
			  .css('top', (event.pageY + top) + 'px')
			  .css('left', (event.pageX + left) + 'px')
			  .fadeIn('slow');
		}
	  }, function() {
		// Hover out code
		$(this).attr('title', $(this).data('tipText'));
		$('body>.tooltip').remove();
	  }).mousemove(function(event){
		var widthEvent =  $("body>.tooltip").width() + (padding * 2) + event.pageX  + left;
		var heightEvent = $("body>.tooltip").height() + (padding * 2) + event.pageY + top;
		//console.log(widthEvent+" = "+$('html').width()+" || "+heightEvent+" = "+$('html').height());
		if(widthEvent > $('html').width() || heightEvent > $('html').height()){
			$('body>.tooltip')
				.css('top', (event.pageY - ($("body>.tooltip").height() + (padding * 2))) + 'px')
				.css('left', (event.pageX - ($("body>.tooltip").width() + (padding * 2)) - left + 10) + 'px');
		}else{
			$('body>.tooltip')
			  .css('top', (event.pageY + top) + 'px')
			  .css('left', (event.pageX + left) + 'px');
		}
	  });
}
$(document).ready(function(){
	Title();
});