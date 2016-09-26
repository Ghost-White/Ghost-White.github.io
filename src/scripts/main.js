'use strict';
$(function(){
		
	//入口滑窗
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
	};

	var slide1 = $("#slide1"),
		slide2 = $("#slide2"),
		slide3 = $("#slide3");
	var nav_array = new Array(slide1,slide2,slide3);
	var nav_anchor = 0;
	
	//屏幕滚动
	var scroll_2 = function(direction){
		var last_nav_anchor = nav_anchor;

		if(direction === "down"){
			if(nav_anchor < 2){
				nav_anchor = nav_anchor + 1;
			}else{
				nav_anchor = 0;
			}
		}else{
			if(nav_anchor === 0){
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
	};

	//小球参数
	var balls = $(".balls li");
	var screenHeight = document.body.offsetHeight;
	var ballHeight = balls[0].offsetHeight;
	var ballsHeight = ballHeight*(balls.length);
	var top_dis_u = Math.ceil((screenHeight-ballsHeight)/2);

	//初始化小球
	var balls_unit = function(){
		/*$(".balls").clone(true).appendTo($(".nav"));
		$(".balls").clone(true).appendTo($(".nav"));*/
		for(var i = 0;i<balls.length;i++){
			var top_dis_ = top_dis_u+i*ballHeight+'px';
			$(balls[i]).css({top:top_dis_});
		}	
	};

	//小球运动
	var balls_action = function(obj){
		var ball_action = function(i,step){
			var top_dis_ = i*ballHeight+'px';
			var bottom_dis_ = (screenHeight-ballsHeight+i*ballHeight)+'px';
			var middle_dis_ = top_dis_u+i*ballHeight;
			var time_,dis_;
			if(step===1){
				dis_ = top_dis_;
				time_ = 500+i*100;
			}else if(step===2){
				dis_ = bottom_dis_;
				time_ = 1000-i*100;
			}else if(step===3){
				dis_ = middle_dis_;
				time_ = 500+i*100;
			}
			$(obj[i]).animate({
				top:dis_	
			},time_);
		};
		var step_1 = function(){
			ball_action(0,1);
			ball_action(1,1);
			ball_action(2,1);
			ball_action(3,1);
			ball_action(4,1);
		};
		var step_2 = function(){
			ball_action(0,2);
			ball_action(1,2);
			ball_action(2,2);
			ball_action(3,2);
			ball_action(4,2);
		};
		var step_3 = function(){
			ball_action(0,3);
			ball_action(1,3);
			ball_action(2,3);
			ball_action(3,3);
			ball_action(4,3);
		};
		step_1();
		setTimeout(step_2,1000);
		setTimeout(step_3,2000);
		setTimeout(keydown_event,2900);		//防止多次按键
		setTimeout(slider_event,2900);		//防止多次点击螃蟹
	};
	
	

	//螃蟹摆动
	var timer;
	var shake = function(obj){
		var deg = 0;
		var direction_flag = 0;
		var limit_flag = 0;
		timer = setInterval(function(){

			if(limit_flag<3){
				if(direction_flag === 0){
					if(deg<30){
						deg += 4;
					}else{
						direction_flag = 1;
					}
					if(deg === 0 && limit_flag === 2){
						clearInterval(timer);
					}
				}else if(direction_flag===1){
					if(deg>-30){
						deg -= 4;
					}else{
						direction_flag = 0;
						limit_flag += 1;
					}
				}
			}else{
				clearInterval(timer);
			}
			setCss(obj,deg);
		},10);
	};

	//初始化螃蟹
	var setCss = function(obj,deg){
		var deg_ = "rotate("+deg+"deg)";
		$(obj).css({
			"transform": deg_,
            "-ms-transform": deg_,		/* IE 9 */
			"-webkit-transform": deg_,	/* Safari and Chrome */
			"-o-transform": deg_, 		/* Opera */
			"-moz-transform": deg_		/* Firefox */
		});
	};

	var keydown_fun = function(){
		$(document).off('keydown');
		$("body").off('click','.slider');
		scroll_2("down");
		balls_action(balls);
	};
	var keydown_event = function(){
		$(document).keydown(keydown_fun);
	};

	var slider_event = function(){
		$("body").on('click','.slider',function(){
		keydown_fun();});
	};

	//入口头像
	$(".portrait-cover").hover(function(){
		$(".portrait-cover").removeClass("hiden");
	},function(){
		$(".portrait-cover").addClass("hiden");
	});

	$("body")
	.on('click','.portrait-cover',function(){
		scroll_1();
		balls_unit();	//小球
	});
	
	//滑动
	keydown_event();
	slider_event();

	//螃蟹
	$(".slider").on('mouseover',function(){
		shake(this);
	}).on('mouseout',function(){
		clearInterval(timer);
		setCss(this,0);
	});

});