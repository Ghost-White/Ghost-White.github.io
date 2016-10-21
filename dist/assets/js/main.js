'use strict';
$(function(){
		
	//入口滑窗
	var scroll_1 = function(){
		$(".container").removeClass("hide");

		$(".top-half").animate({
			top:"-50%"
		},1500,function(){
			$(".entry").addClass("hide");
		});

		$(".bottom-half").animate({
			top:"120%"
		},1500,function(){
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
	var ball_array ;
	var balls_0 ;
	var balls_1 ;
	var balls_2 ;
	var screenHeight ;
	var ballHeight ;
	var ballsHeight ;
	var top_dis_u ;

	//初始化小球
	var balls_unit = function(){
		$(".balls").clone(true).appendTo($(".nav"));
		$(".balls").clone(true).appendTo($(".nav"));
		$(".balls").eq(3).css({display:"none"});

		ball_array = $(".balls");
		balls_0 = $(ball_array[0]).find("li");
		balls_1 = $(ball_array[1]).find("li");
		balls_2 = $(ball_array[2]).find("li");
		screenHeight = document.body.offsetHeight;
		ballHeight = balls_0[0].offsetHeight;
		ballsHeight = ballHeight*(balls_0.length);
		top_dis_u = Math.ceil((screenHeight-ballsHeight)/2);

		var left_dis_1 = '90px',
			left_dis_2 = '30px';

		for(var i = 0;i<balls_0.length;i++){
			var top_dis_0 = (top_dis_u+(i-1)*ballHeight)+'px',
				top_dis_1 = (top_dis_u+i*ballHeight)+'px',
				top_dis_2 = (top_dis_u+(i+1)*ballHeight)+'px';

			$(balls_0[i]).css({top:top_dis_0});
			$(balls_1[i]).css({top:top_dis_1,left:left_dis_1});
			$(balls_2[i]).css({top:top_dis_2,left:left_dis_2});
		}	
	};

	//小球运动
	var balls_action = function(obj,k){
		var ball_action = function(i,step){ 			
			var top_dis_ = i*ballHeight+'px';
			var bottom_dis_ = (screenHeight-ballsHeight+i*ballHeight)+'px';
			var middle_dis_0 = (top_dis_u+(i-1)*ballHeight)+'px',
				middle_dis_1 = (top_dis_u+i*ballHeight)+'px',
				middle_dis_2 = (top_dis_u+(i+1)*ballHeight)+'px';
			var time_,dis_,middle_dis__;
			if(k===0){
				middle_dis__ = middle_dis_0;
			}else if(k===1){
				middle_dis__ = middle_dis_1;
			}else{
				middle_dis__ = middle_dis_2;
			}

			if(step===1){
				dis_ = top_dis_;
				time_ = 500+(i+k)*100;
			}else if(step===2){
				dis_ = bottom_dis_;
				time_ = 1000-(i-k)*100;
			}else if(step===3){
				dis_ = middle_dis__;
				time_ = 500+(i+k)*100;
			}
			
			$(obj[i]).animate({
				top:dis_	
			},time_);
		};
		var step_1 = function(){
			for(var i=0 ;i<5;i++){
				ball_action(i,1);
			}
		};
		var step_2 = function(){
			for(var i=0 ;i<5;i++){
				ball_action(i,2);
			}
		};
		var step_3 = function(){
			for(var i=0 ;i<5;i++){
				ball_action(i,3);
			}
		};
		step_1();
		setTimeout(step_2,1200);
		setTimeout(step_3,2400);
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

	var slider_fun = function(){
		$(document).off('keydown');
		$("body").off('click','.slider');
		scroll_2("down");
		balls_action(balls_0,0);
		balls_action(balls_1,1);
		balls_action(balls_2,2);
		setTimeout(keydown_event,3200);		//防止多次按键
		setTimeout(slider_event,3400);		//防止多次点击螃蟹
	};
	var keydown_event = function(){
		$(document).keydown(slider_fun);
	};

	var slider_event = function(){
		$("body").on('click','.slider',function(){
		slider_fun();});
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