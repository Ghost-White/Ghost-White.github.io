$(function(){
	var scroll_1 = function(){
		$(".top-half").animate({
			top:"-50%"
		},1500,function(){
			$(".top-half").addClass("hide");
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
		},1500);
	}

/*	var setMouseWheelScrolling = function (value){
        if(value){
            addMouseWheelHandler();
        }else{
            removeMouseWheelHandler();
        }
    }

    function removeMouseWheelHandler(){
        if (document.addEventListener) {
            document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
            document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
            document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
        } else {
            document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
        }
    }

	function addMouseWheelHandler(){
        var prefix = '';
        var _addEventListener;

        if (window.addEventListener){
            _addEventListener = "addEventListener";
        }else{
            _addEventListener = "attachEvent";
            prefix = 'on';
        }

         // detect available wheel event
        var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
                  document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                  'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


        if(support == 'DOMMouseScroll'){
            document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
        }

        //handle MozMousePixelScroll in older Firefox
        else{
            document[ _addEventListener ](prefix + support, MouseWheelHandler, false);
        }
    }

    function MouseWheelHandler(e) {
        var curTime = new Date().getTime();
        var isNormalScroll = true;

        //autoscrolling and not zooming?
        if(options.autoScrolling && !controlPressed && !isNormalScroll){
            // cross-browser wheel delta
            e = e || window.event;
            var value = e.wheelDelta || -e.deltaY || -e.detail;
            var delta = Math.max(-1, Math.min(1, value));

            var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
            var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

            //Limiting the array to 150 (lets not waste memory!)
            if(scrollings.length > 149){
                scrollings.shift();
            }

            //keeping record of the previous scrollings
            scrollings.push(Math.abs(value));

            //preventing to scroll the site on mouse wheel when scrollbar is present
            if(options.scrollBar){
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }

            var activeSection = $(SECTION_ACTIVE_SEL);
            var scrollable = options.scrollOverflowHandler.scrollable(activeSection);

            //time difference between the last scroll and the current one
            var timeDiff = curTime-prevTime;
            prevTime = curTime;

            //haven't they scrolled in a while?
            //(enough to be consider a different scrolling action to scroll another section)
            if(timeDiff > 200){
                //emptying the array, we dont care about old scrollings for our averages
                scrollings = [];
            }

            if(canScroll){
                var averageEnd = getAverage(scrollings, 10);
                var averageMiddle = getAverage(scrollings, 70);
                var isAccelerating = averageEnd >= averageMiddle;

                //to avoid double swipes...
                if(isAccelerating && isScrollingVertically){
                    //scrolling down?
                    if (delta < 0) {
                        scrolling('down', scrollable);

                    //scrolling up?
                    }else {
                        scrolling('up', scrollable);
                    }
                }
            }

            return false;
        }
    }*/

	$(".portrait-cover").hover(function(){
		$(".portrait-cover").removeClass("hiden");
	},function(){
		$(".portrait-cover").addClass("hiden");
	});

	$("body")
	.on('click','.portrait-cover',function(){
		scroll_1();
		});

	$(document)
	    .keydown(function(){
			scroll_2("up");
		});

	/*$(document).on('mouseenter', true, function () {
            setMouseWheelScrolling(false);
        });

        $document.on('mouseleave', true, function(){
            setMouseWheelScrolling(true);
        });
    }*/
});