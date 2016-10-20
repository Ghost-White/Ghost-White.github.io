'use strict'
$(function(){

	/*下落积木坐标初始化*/
	let fall_coord = [3,-1];

	/*生成row行，col列的数组*/
	let array_init = function(row,col,value){			
		let arr = new Array(row);
		for(let i = 0;i<row;i++){
			arr[i] = new Array(col);
			for(let j = 0;j<col;j++){
				arr[i][j] = value;			/*新生成的二维数组每个元素均为value*/
			}
		}
		return arr;
	}

	/*当前积木矩阵mat初始化*/
	let mat = [];

	//样式旋转90度
	let trans_90 = function(obj){
		let w = $(obj).width(),
			h = $(obj).height(),
			l = $(obj).css('left'),
			t = $(obj).css('top'),
			d = $(obj).css('transform');
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		let deg = 0;
		console.log(t);
		if(d!=undefined&&d!=null&&d!=''&&d!='none'){
			deg = /rotate\(([0-9]+)deg\)/g.exec(d)[1];
		}
		deg += 90;
		/*注意中心不对称的平衡*/
		if($(obj).find(".fall_2_2").length===0){
			$(obj).css({
				'transform':`rotate(${deg}deg)`,
				'-ms-transform':`rotate(${deg}deg)`,
				'-webkit-transform':`rotate(${deg}deg)`,
				'-o-transform':`rotate(${deg}deg)`,
				'-moz-transform':`rotate(${deg}deg)`,
				'left':`${l+20}px`,
				'top': `${t-20}px`, 
			});
		}else{
			(obj).css({
				'transform':`rotate(${deg}deg)`,
				'-ms-transform':`rotate(${deg}deg)`,
				'-webkit-transform':`rotate(${deg}deg)`,
				'-o-transform':`rotate(${deg}deg)`,
				'-moz-transform':`rotate(${deg}deg)`,
			});
		}
		

	};

	//数据矩阵顺时针旋转90度
	let matrix_90 = function(mat){
		let row = mat.length,
			col = mat[0].length;
		let arr = array_init(col,row);
		for(let i = 0;i<row;i++){
			for(let j = 0;j<col;j++){
				arr[j][row-1-i] = mat[i][j]; 
			}
		}
	};

	/*碰撞检测*/
	let test_collision = function(board,mat,coord){
		let board_temp = board,
			x = coord[0],
			y = coord[1],
			row = mat.length,
			col = mat[0].length;
		for(let i = 0;i<row;i++){
			x_temp = x-((row-1)-i);
			for(let j = 0;j<col;j++){				
				y_temp = y+j;
				board_temp[x_temp][y_temp] += mat[i][j];
			}
		}
		for(let i = 0;i<board_temp.length;i++){
			for(let j = 0;j<board_temp[0].length;j++){
				if(board_temp[i][j]>1){
					return false;
				}
			}
		}
		return true;
	}

	/*棋盘矩阵更新*/
	let update_board = function(board,mat,coord){
		let x = coord[0],
			y = coord[1],
			row = mat.length,
			col = mat[0].length;
		for(let i = 0;i<row;i++){
			x_temp = x-((row-1)-i);
			for(let j = 0;j<col;j++){				
				y_temp = y+j;
				board[x_temp][y_temp] += mat[i][j];
			}
		}
		return board;
	}

	/*棋盘初始化：数据+样式*/
	let board = array_init(12,10,0);
	let board_init = function(){
		let row ='',col='';
		for(let i = 0;i<board[0].length;i++){
			row += '<div class="board-cell-init"></div>';
		}
		for(let i = 0;i<board.length;i++){
			col += `<li>${row}</li>`;
		}
		$(".board ul").html(col);
	}

	/*积木逐格降落*/
	let fall_step = function(obj){
		let t = $(obj).css('top');
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		$(obj).animate({
			'top':`${t+40}px`
		},200);
	}

	/*积木左右平移*/
	let fall_move = function(obj,direction){
		let l = $(obj).css('left');
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		if(direction==='left'){
			$(obj).animate({
				'left':`${l-40}px`
			},200);
		}else{
			$(obj).animate({
				'left':`${l+40}px`
			},200);
		}
	}

	let fall_init = function(){

	}

	/*积木自动降落*/
	let timer = null;
	let fall_auto = function(obj){
		/*这里在回调函数有参数时要写在function里面*/		
		timer = setInterval(function(){
			if(test_collision()===false){
				fall_step(obj);
			}else{
				update_board(board,mat,coord);
			}
		},1200);	
	}

	/*7种基本积木*/
	let fall_0,fall_1,fall_2,fall_3,fall_4,fall_5,fall_6;
	let fall_cell_1 = '<div class="board-cell" name="1"></div>';	/*有色单元*/
	let fall_cell_0 = '<div class="board-cell-0" name="0"></div>';	/*无色单元*/

	/*第0种积木*/
	let fall_data_temp = array_init(2,3,1);
	fall_data_temp[0,0] = 0;
	fall_data_temp[1,2] = 0;
	fall_0 = { fall_style : `<ul class='fall_2_3'>
				<li>
					${fall_cell_0}${fall_cell_1}${fall_cell_1}
				</li>
				<li>
					${fall_cell_1}${fall_cell_1}${fall_cell_0}
				</li>
				</ul>`,
				fall_data : fall_data_temp,
	};
	/*第1种积木*/
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[0,2] = 0;
	fall_data_temp[1,0] = 0;
	fall_1 = {
		fall_style : `<ul class='fall_2_3'>
				<li>
					${fall_cell_1}${fall_cell_1}${fall_cell_0}
				</li>
				<li>
					${fall_cell_0}${fall_cell_1}${fall_cell_1}
				</li>
				</ul>`,
		fall_data : fall_data_temp,
	};
	/*第2种积木*/
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[1,1] = 0;
	fall_data_temp[1,2] = 0;
	fall_2 = {
		fall_style : `<ul class='fall_2_3'>
				<li>
					${fall_cell_1}${fall_cell_1}${fall_cell_1}
				</li>
				<li>
					${fall_cell_1}${fall_cell_0}${fall_cell_0}
				</li>
				</ul>`,
		fall_data : fall_data_temp,
	};
	/*第3种积木*/
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[1,0] = 0;
	fall_data_temp[1,1] = 0;
	fall_3 = {
		fall_style : `<ul class='fall_2_3'>
				<li>
					${fall_cell_1}${fall_cell_1}${fall_cell_1}
				</li>
				<li>
					${fall_cell_0}${fall_cell_0}${fall_cell_1}
				</li>
				</ul>`,
		fall_data : fall_data_temp,
	};
	/*第4种积木*/
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[0,0] = 0;
	fall_data_temp[2,0] = 0;
	fall_4 = {
		fall_style : `<ul class='fall_3_2'>
				<li>
					${fall_cell_0}${fall_cell_1}
				</li>
				<li>
					${fall_cell_1}${fall_cell_1}
				</li>
				<li>
					${fall_cell_0}${fall_cell_1}
				</li>
				</ul>`,
		fall_data : fall_data_temp,
	};
	/*第5种积木*/
	fall_data_temp =array_init(2,2,1);
	fall_5 = {
		fall_style : `<ul class='fall_2_2'>
				<li>
					${fall_cell_1}${fall_cell_1}
				</li>
				<li>
					${fall_cell_1}${fall_cell_1}
				</li>
				</ul>`,
		fall_data : fall_data_temp,
	};
	/*第6种积木*/
	fall_data_temp =array_init(1,4,1);
	fall_6 = {
		fall_style : `<ul class='fall_1_4'>
				<li>
					${fall_cell_1}${fall_cell_1}${fall_cell_1}${fall_cell_1}
				</li>
				</ul>`,
		fall_data : fall_data_temp,
	};


	let fall_arr = [fall_0,fall_1,fall_2,fall_3,fall_4,fall_5,fall_6];
	/*方块下落起始位置[3,-1]*/
	board_init();
	$(".fall").html(fall_6.fall_style);
	/*trans_90($(".fall"));*/
	fall_auto($(".fall"));
})
