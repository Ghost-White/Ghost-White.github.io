'use strict'
$(function(){

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

	/*复制数组，防止引用更改全局变量*/
	let copy_arr = function(arr){
		let row = arr.length,
			col = arr[0].length;
		let arr_new = array_init(row,col,0);
		for(let i = 0;i<row;i++){
			for(let j = 0;j<col;j++){
				arr_new[i][j] = arr[i][j];
			}
		}
		return arr_new;
	}

	/*7种基本积木*/
	let fall_0,fall_1,fall_2,fall_3,fall_4,fall_5,fall_6;
	let fall_cell_1 = '<div class="board-cell" name="1"></div>';	/*有色单元*/
	let fall_cell_0 = '<div class="board-cell-0" name="0"></div>';	/*无色单元*/

	/*第0种积木*/
	let fall_data_temp = array_init(2,3,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[1][2] = 0;
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
	fall_data_temp[0][2] = 0;
	fall_data_temp[1][0] = 0;
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
	fall_data_temp[1][1] = 0;
	fall_data_temp[1][2] = 0;
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
	fall_data_temp[1][0] = 0;
	fall_data_temp[1][1] = 0;
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
	fall_data_temp =array_init(3,2,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[2][0] = 0;
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

	/*7中下落积木数组*/
	let fall_arr = [fall_0,fall_1,fall_2,fall_3,fall_4,fall_5,fall_6];

	/*初始化第一个下落积木*/
	let fall_active = null;	

	/*初始化下落积木坐标*/
	let fall_coord = null;

	/*初始化当前积木矩阵mat*/
	let mat = null;

	/*初始化棋盘：数据+样式*/
	let board = null;
	let board_init = function(){
		board = array_init(12,10,0);
		let row ='',col='';
		for(let i = 0;i<board[0].length;i++){
			row += '<div class="board-cell-init"></div>';
		}
		for(let i = 0;i<board.length;i++){
			col += `<li>${row}</li>`;
		}
		$(".board ul").html(col);
	}

	/*初始化降落积木，开启下一轮降落*/
	let fall_init = function(){
		fall_coord = [-1,3];					/*重置降落坐标*/
		let n = Math.floor(Math.random()*7);
		let fall_active = fall_arr[n];
		$(".fall").css({
			'left':'120px',
			'top':'-82px',
		});
		$(".fall").html(fall_active.fall_style);	/*样式*/
		mat = fall_active.fall_data;				/*数据*/
	}

	/*积木逐格降落*/
	let fall_step = function(obj){
		let t = $(obj).css('top');
		if(t===null||t===''||t==='none'||t===undefined){
			t = 0;
		}
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		$(obj).animate({
			'top':`${t+40}px`
		},200,function(){
			let [x,y] = fall_coord;
			y += 1;
			fall_coord = [x,y];
		});
	}

	/*积木自动降落*/
	let timer = null;
	let fall_auto = function(obj){
		/*这里在回调函数有参数时要写在function里面*/		
		timer = setInterval(function(){
			let [x,y] = fall_coord;
			/*碰撞预测*/
			let coord = [x+1,y]; 
			// console.log("board"+board);
			if(test_collision(board,mat,coord)===false && x < 11){
				fall_step(obj);
			}else{
				board = update_board(board,mat,fall_coord);
				fall_init();
			}
		},1200);	
	}

	/*重新启动游戏=开始游戏*/
	let game_restart = function(){
		board_init();
		fall_init();
		fall_auto($(".fall"));
	}

	/*碰撞检测*/
	let test_collision = function(board,mat,coord){
		let board_temp = copy_arr(board),
			[x,y] = coord,
			row = mat.length,
			col = mat[0].length;
		for(let i = 0;i<row;i++){
			let x_temp = x-((row-1)-i);
			for(let j = 0;j<col;j++){				
				let y_temp = y+j;
				board_temp[x_temp][y_temp] += mat[i][j];
			}
		}
		for(let i = 0;i<board_temp.length;i++){
			for(let j = 0;j<board_temp[0].length;j++){
				if(board_temp[i][j]>1){
					console.log("collision");
					return true;
				}
			}
		}
		return false;
	}

	/*棋盘矩阵更新*/
	let update_board = function(board,mat,coord){
		 console.log(`mat:${mat},coord:${coord}`);
		let board_old = copy_arr(board),
			board_new = copy_arr(board);
		let x = coord[0],
			y = coord[1],
			row = mat.length,
			col = mat[0].length;
		for(let i = 0;i<row;i++){
			let x_temp = x-((row-1)-i);
			for(let j = 0;j<col;j++){				
				let y_temp = y+j;
				board_new[x_temp][y_temp] += mat[i][j];
				console.log(x_temp+','+y_temp);
			}
		}
		/*棋盘样式更新*/
		let update_board_style = function(){
			for(let i = 0;i<board.length;i++){
				for(let j = 0;j<board[0].length;j++){
					if(board_old[i][j]!==0){
						let rows = $(".fall ul").find("li");
						let cols = $(rows[i]).find("div");
						$(cols[j]).removeClass("board-cell-init").addClass("board-cell");
					}
				}
			}
		}
		update_board_style();
		return board_new;
	}

	/*样式旋转90度*/
	let trans_90 = function(obj){
		let w = $(obj).width(),
			h = $(obj).height(),
			l = $(obj).css('left'),
			t = $(obj).css('top'),
			d = $(obj).css('transform');
		if(t===null||t===''||t==='none'||t===undefined){
			t = 0;
		}
		if(l===null||l===''||l==='none'||l===undefined){
			l = 0;
		}
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		let deg = 0;
		if(d!==undefined&&d!==null&&d!==''&&d!=='none'){
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

	/*数据矩阵顺时针旋转90度*/
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

	

	

	/*积木左右平移*/
	let fall_move = function(obj,direction){
		let l = $(obj).css('left');
		if(l===null||l===''||l==='none'||l===undefined){
			l = 0;
		}
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		let [x,y] = fall_coord;
		if(direction==='left'){
			$(obj).animate({
				'left':`${l-40}px`
			},200);			
			y -= 1;
		}else{
			$(obj).animate({
				'left':`${l+40}px`
			},200);
			y += 1;
		}
		fall_coord = [x,y];
	}

	game_restart();

})
