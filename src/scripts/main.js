$(function(){
	
	var scroll_1 = function(){
		$(".top-half").animate({
			top:"-50%"
		},1500,function(){
			$(".top-half").addClass("hide");
			$(".entry").addClass("hide");
		});
		$(".bottom-half").animate({
			top:"120%"
		},1500,function(){
			$(".bottom-half").addClass("hide");
		});
	}

	var slide1 = $("#slide1"),
		slide2 = $("#slide2"),
		slide3 = $("#slide3");
	var nav_array = new Array(slide1,slide2,slide3);
	var nav_anchor = 0;
	
	var scroll_2 = function(direction){
		var last_nav_anchor = nav_anchor;

		if(direction = "down"){
			if(nav_anchor < 2){
				nav_anchor = nav_anchor + 1;
			}else{
				nav_anchor = 0;
			}
		}else{
			if(nav_anchor == 0){
				nav_anchor = 2;
			}else{
				nav_anchor = nav_anchor - 1;
			}
		}
		
		$(nav_array[last_nav_anchor]).animate({
			top:"-100%"
		},1500);

		$(nav_array[nav_anchor]).animate({
			top:"0"
		},1500,function(){
			
		});
	}

	var balls = $(".balls li");
	var screenHeight = document.body.offsetHeight;
	var ballHeight = balls[0].offsetHeight;
	var ballsHeight = ballHeight*(balls.length);
	var top_dis_u = Math.ceil((screenHeight-ballsHeight)/2);

	var balls_action = function(){
		var ball_action = function(i,step){
			var top_dis_ = i*ballHeight+'px';
			var bottom_dis_ = (screenHeight-ballsHeight+i*ballHeight)+'px';
			var middle_dis_ = top_dis_u+i*ballHeight;
			var time_;
			if(step==1){
				dis_ = top_dis_;
				time_ = 500+i*100;
			}else if(step==2){
				dis_ = bottom_dis_;
				time_ = 1000-i*100;
			}else if(step==3){
				dis_ = middle_dis_;
				time_ = 500+i*100;
			}
			$(balls[i]).animate({
				top:dis_	
			},time_);
		}
		var step_1 = function(){
			ball_action(0,1);
			ball_action(1,1);
			ball_action(2,1);
			ball_action(3,1);
			ball_action(4,1);
		}

		var step_2 = function(){
			ball_action(0,2);
			ball_action(1,2);
			ball_action(2,2);
			ball_action(3,2);
			ball_action(4,2);
		}

		var step_3 = function(){
			ball_action(0,3);
			ball_action(1,3);
			ball_action(2,3);
			ball_action(3,3);
			ball_action(4,3);
		}

		step_1();
		setTimeout(step_2,1000);
		setTimeout(step_3,2000);

		setTimeout(keydown_event,2900);
		setTimeout(slider_event,2900);
	}
	
	var balls_unit = function(){
		for(var i = 0;i<balls.length;i++){
			top_dis = top_dis_u+i*ballHeight;
			var top_dis_ = top_dis+'px';
			$(balls[i]).css({top:top_dis_});
		}	
	}

	var shaker = $(".slider");
	var shake = function(){

	}

	var keydown_fun = function(){
		$(document).off('keydown');
		$("body").off('click','.slider');
		scroll_2("up");
		balls_action();
	}
	var keydown_event = function(){
		$(document).keydown(keydown_fun);
	}

	var slider_event = function(){
		$("body").on('click','.slider',function(){
		keydown_fun();});
	}


	$(".portrait-cover").hover(function(){
		$(".portrait-cover").removeClass("hiden");
	},function(){
		$(".portrait-cover").addClass("hiden");
	});

	$("body")
	.on('click','.portrait-cover',function(){
		scroll_1();
		balls_unit();
	});
	
	keydown_event();
	slider_event();

});