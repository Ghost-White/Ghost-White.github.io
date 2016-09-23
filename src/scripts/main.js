$(function(){

	$(".portrait-cover").hover(function(){
		$(".portrait-cover").removeClass("hiden");
	},function(){
		$(".portrait-cover").addClass("hiden");
	});

	$("body").on('click','.portrait-cover',function(){
		scroll();
	});

	var scroll = function(){
		$(".top-half").animate({
			top:"-50%"
		},1500);
		$(".bottom-half").animate({
			top:"120%"
		},1500);
	}
});