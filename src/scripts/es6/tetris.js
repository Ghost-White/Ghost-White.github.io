'use strict'
$(function(){

	const PI = 3.141592657;
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

	/*19种基本积木*/
	let fall_0_0,fall_0_1,fall_0_2,fall_0_3;
	let fall_1_0,fall_1_1;
	let fall_2_0,fall_2_1,fall_2_2,fall_2_3,fall_2_4,fall_2_5,fall_2_6,fall_2_7;
	let fall_3_0;
	let fall_4_0,fall_4_1,fall_4_2,fall_4_3;

	let fall_cell_1 = '<div class="board-cell" name="1"></div>';	/*有色单元*/
	let fall_cell_0 = '<div class="board-cell-0" name="0"></div>';	/*无色单元*/

	let fall_class_find = function(row,col){
		let fall_class = '';
		if(row === 2 && col === 2){
			fall_class = 'fall_2_2';
		}else if(row === 2 && col === 3){
			fall_class = 'fall_2_3';
		}else if(row === 3 && col === 2){
			fall_class = 'fall_3_2';
		}else if(row === 4 && col === 1){
			fall_class = 'fall_4_1';
		}else if(row === 1 && col === 4){
			fall_class = 'fall_1_4';
		}else{
			return;
		}
		return fall_class;
	}

	let fall_create = function(fall_data){
		let row = fall_data.length,
			col = fall_data[0].length;
		let fall_class = fall_class_find(row,col);
		let rows = '';
		for(let i = 0;i<row;i++){
			let row = '<li>';
			for(let j = 0;j<col;j++){
				if(fall_data[i][j]===0){
					row = row.concat(fall_cell_0);
				}else{
					row = row.concat(fall_cell_1);
				}
			}
			rows = rows.concat(row).concat('</li>');
		}	
		let str = `<ul class=${fall_class}>
					${rows}
					</ul>`;
		return str;
	}

	/*第0组积木*/
	let fall_data_temp = array_init(2,3,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[1][2] = 0;
	fall_0_0 = { fall_style : fall_create(fall_data_temp),
				fall_data : fall_data_temp,
	};
	fall_data_temp = array_init(3,2,1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[2][0] = 0;
	fall_0_1 = { fall_style : fall_create(fall_data_temp),
				fall_data : fall_data_temp,
	};
	fall_data_temp = array_init(2,3,1);
	fall_data_temp[0][2] = 0;
	fall_data_temp[1][0] = 0;
	fall_0_2 = { fall_style : fall_create(fall_data_temp),
				fall_data : fall_data_temp,
	};
	fall_data_temp = array_init(3,2,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[2][1] = 0;
	fall_0_3 = { fall_style : fall_create(fall_data_temp),
				fall_data : fall_data_temp,
	};


	/*第1组积木*/
	fall_data_temp =array_init(1,4,1);
	fall_1_0 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(4,1,1);
	fall_1_1 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};

	/*第2组积木*/
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[1][2] = 0;
	fall_2_0 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(3,2,1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[1][1] = 0;
	fall_2_1 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[0][2] = 0;
	fall_2_2 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(3,2,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[1][0] = 0;
	fall_2_3 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[1][0] = 0;
	fall_2_4 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(3,2,1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[2][1] = 0;
	fall_2_5 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(2,3,1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[0][0] = 0;
	fall_2_6 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp =array_init(3,2,1);
	fall_data_temp[1][0] = 0;
	fall_data_temp[2][0] = 0;
	fall_2_7 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};

	/*第3组积木*/
	fall_data_temp = array_init(2,2,1);
	fall_3_0 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	
	/*第4组积木*/
	fall_data_temp = array_init(3,2,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[2][0] = 0;
	fall_4_0 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp = array_init(2,3,1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[0][2] = 0;
	fall_4_1 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp = array_init(3,2,1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[2][1] = 0;
	fall_4_2 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};
	fall_data_temp = array_init(2,3,1);
	fall_data_temp[1][0] = 0;
	fall_data_temp[1][2] = 0;
	fall_4_3 = {
		fall_style : fall_create(fall_data_temp),
		fall_data : fall_data_temp,
	};

	/*5组下落积木*/
	const fall_0 = [fall_0_0,fall_0_1,fall_0_2,fall_0_3];
	const fall_1 = [fall_1_0,fall_1_1];
	const fall_2 = [fall_2_0,fall_2_1,fall_2_2,fall_2_3,fall_2_4,fall_2_5,fall_2_6,fall_2_7];
	const fall_3 = [fall_3_0];
	const fall_4 = [fall_4_0,fall_4_1,fall_4_2,fall_4_3];

	const fall_arr = [fall_0,fall_1,fall_2,fall_3,fall_4];

	/*初始化下落积木坐标*/
	let fall_coord = null;

	/*初始化当前积木矩阵mat*/
	let mat = null;

	/*当前积木所在数组位置*/
	let fall_active = [0,0];

	/*事件监听标志*/
	let event_flag = 0;	/*0表示完全监听，1表示不监听下落*/

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

	/*从某个组中获取随机积木*/
	let fall_random = function(i){
		let j = 0;
		if(i===3){
			j = 0;
		}else if(i===0||i===4){
			j = Math.floor(Math.random()*4);	/*0-3*/
		}else if(i===1){
			j = Math.floor(Math.random()*2);	/*0-1*/
		}else{
			j = Math.floor(Math.random()*8);	/*0-7*/
		}
		return j;
	} 

	/*初始化降落积木 数据+样式*/
	let fall_init = function(){
		if(board[0][3] !== 0 || board[0][4] !== 0 || board[0][5]!==0){
			console.log("off!!");
			clearInterval(timer);
			offEvent();
			return;
		}else{
			fall_coord = [-1,3];					/*重置降落坐标*/
			let i = Math.floor(Math.random()*5);	/*0-4*/
			let j = fall_random(i);		
			fall_active = [i,j];
			$(".fall").css({
				'left':'120px',
				'bottom':'480px',
			});
			let active = fall_arr[i][j];		
			$(".fall").html(active.fall_style);	/*样式*/
			mat = active.fall_data;				/*数据*/
		}		
	}

	/*积木降落一格 样式+数据*/
	let fall_step = function(obj){
		let t = $(obj).css('bottom');
		if(t===null||t===''||t==='none'||t===undefined){
			t = 0;
		}
		t = Number.parseFloat(/\-*[0-9]+/g.exec(t)[0]);
		event_flag = 1;
		$(obj).animate({
			'bottom':`${t-40}px`
		},200,function(){
			let [x,y] = fall_coord;
			fall_coord = [x+1,y];
			t = $(obj).css('bottom');
			event_flag = 0;
		});
			
	}

	/*积木自动降落*/
	let timer = null;
	let over_flag = 0;
	let fall_auto = function(obj){
		/*setInterval在回调函数有参数时要写在function里面*/		
		timer = setInterval(function(){			
			let [x,y] = fall_coord;
			/*碰撞预测*/
			let coord = [x+1,y]; 			
			if(test_collision(board,mat,coord)===false && x < 11){ /*防止x越界*/
				fall_step(obj);				
			}else{
				board = update_board(board,mat,fall_coord);
				fall_init();
			}
		},1200);
	}

	/*碰撞检测*/
	let test_collision = function(board,mat,coord){
		let board_temp = copy_arr(board),
			[x,y] = coord,
			row = mat.length,
			col = mat[0].length;
		if(x<12 && y+col-1<10 && y>-1){				/*边界限制*/
			for(let i = 0;i<row;i++){
				let x_temp = x-((row-1)-i);
				if(x_temp>-1){
					for(let j = 0;j<col;j++){				
						let y_temp = y+j;
						board_temp[x_temp][y_temp] += mat[i][j];
					}
				}				
			}
			for(let i = 0;i<board_temp.length;i++){
				for(let j = 0;j<board_temp[0].length;j++){
					if(board_temp[i][j]>1){
						return true;
					}
				}
			}	
		}else{return true;}		
		return false;
	}

	/*棋盘矩阵更新*/
	let update_board = function(board,mat,coord){	 
		let board_old = copy_arr(board),
			board_new = copy_arr(board);
		let x = coord[0],
			y = coord[1],
			row = mat.length,
			col = mat[0].length;
		for(let i = 0;i<row;i++){
			let x_temp = x-((row-1)-i);
			if(x_temp>-1){
				for(let j = 0;j<col;j++){				
					let y_temp = y+j;
					board_new[x_temp][y_temp] += mat[i][j];
				}
			}
			
		}
		/*棋盘样式更新*/
		let update_board_style = function(){
			for(let i = 0;i<board.length;i++){
				for(let j = 0;j<board[0].length;j++){
					if((board_new[i][j]-board_old[i][j])!==0){
						let rows = $(".board ul").find("li");
						let cols = $(rows[i]).find("div");
						$(cols[j]).removeClass("board-cell-init").addClass("board-cell");
					}
				}
			}
		}
		update_board_style();
		return board_new;
	}

	/*溢出检测*/
	let test_overflow = function(mat,coord){
		let row = mat.length,
			col = mat[0].length;
		let [x,y] = coord;
		if(y+col-1<10 && x<12){
			return false;
		}else{
			return true;
		}
	}

	/*积木转换 数据+样式*/
	let fall_trans = function(fall_active){
		let i = fall_active[0],
			j = fall_active[1];
		let j_new = fall_random(i);
		while(j_new === j && i!==3){
			j_new = fall_random(i);
		}	
		let active = fall_arr[i][j_new];
		let mat_temp = active.fall_data;
		if(test_collision(board,mat_temp,fall_coord) === false){
			mat = active.fall_data;
			$(".fall").html(active.fall_style);
			fall_active[1] = j_new;	
		}else{
			return;
		}	
	}

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
		return arr;
	};


	/*积木左右平移*/
	let fall_move = function(obj,direction,cb){
		$(document).off('keydown','body');
		let [x,y] = fall_coord;		
		let l = $(obj).css('left');
		if(l===null||l===''||l==='none'||l===undefined){
			l = 0;
		}
		l = Number.parseFloat(/.*[0-9]+/g.exec(l)[0]);
		let col = mat[0].length;		/*防止右移越界*/
		if(direction==='left' && y-1>-1){
			let coord = [x,y-1];
			if(test_collision(board,mat,coord)===true){
				cb();
				return;
			}else{
				$(obj).animate({
					'left':`${l-40}px`
				},100,function(){
					cb();
				});			
				fall_coord = [x,y-1];
			}
		}else if(direction==='right' && y+col<10){
			let coord = [x,y+1];
			if(test_collision(board,mat,coord)===true){
				cb();
				return;
			}else{
				$(obj).animate({
					'left':`${l+40}px`
				},100,function(){
					cb();
				});
				fall_coord = [x,y+1];
			}
		}else{
			cb();
			return;
		}			
	}

	/*快速坠落*/
	let fast_down = function(){
		clearInterval(timer);		
		/*如果不清除，在fast_down执行期间触发interval的话，
		interval加入等待队列，因为数据暂留在interval中，会导致错误*/
		let [x,y] = fall_coord;
		let coord = [x+1,y];
		let steps = 0;
		while(test_collision(board,mat,coord)===false && x < 11){
			fall_coord = [x+1,y];
			steps += 1;
			[x,y] = fall_coord;
			coord = [x+1,y];
		}
		board = update_board(board,mat,fall_coord);
		fall_init();
		fall_auto($(".fall"));
	}

	/*事件监听*/
	let addEvent = function(){
		$(document).on('keydown','body',function(event){
			if(event.keyCode === 37){				
				fall_move($(".fall"),'left',addEvent);
			}else if(event.keyCode === 39){
				fall_move($(".fall"),'right',addEvent);
			}else if(event.keyCode === 38){
				console.log('change');
				fall_trans(fall_active);
			}

			if(event_flag === 0){
				if(event.keyCode === 40){
					console.log('down');
					fast_down();
				}else if(event.keyCode === 32){	/*空格暂停*/
					clearInterval(timer);
				}else if(event.keyCode === 13){	/*enter 继续*/
					clearInterval(timer);
					fall_auto($(".fall"));
				}
			}else{
				return;
			}	
		});
	}

	let offEvent = function(){
		$(document).off("keydown","body");
	}

	/*重新启动游戏=开始游戏*/
	let game_restart = function(){
		board_init();
		fall_init();
		fall_auto($(".fall"));
		addEvent();
	}

	game_restart();

})
