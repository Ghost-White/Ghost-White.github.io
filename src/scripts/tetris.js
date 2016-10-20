'use strict';

$(function () {

	/*下落积木坐标初始化*/
	var fall_coord = [3, -1];

	/*生成row行，col列的数组*/
	var array_init = function array_init(row, col, value) {
		var arr = new Array(row);
		for (var i = 0; i < row; i++) {
			arr[i] = new Array(col);
			for (var j = 0; j < col; j++) {
				arr[i][j] = value; /*新生成的二维数组每个元素均为value*/
			}
		}
		return arr;
	};

	//样式旋转90度
	var trans_90 = function trans_90(obj) {
		var w = $(obj).width(),
		    h = $(obj).height(),
		    l = $(obj).css('left'),
		    t = $(obj).css('top'),
		    d = $(obj).css('transform');
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		var deg = 0;
		console.log(t);
		if (d != undefined && d != null && d != '' && d != 'none') {
			deg = /rotate\(([0-9]+)deg\)/g.exec(d)[1];
		}
		deg += 90;
		/*注意中心不对称的平衡*/
		if ($(obj).find(".fall_2_2").length === 0) {
			$(obj).css({
				'transform': 'rotate(' + deg + 'deg)',
				'-ms-transform': 'rotate(' + deg + 'deg)',
				'-webkit-transform': 'rotate(' + deg + 'deg)',
				'-o-transform': 'rotate(' + deg + 'deg)',
				'-moz-transform': 'rotate(' + deg + 'deg)',
				'left': l + 20 + 'px',
				'top': t - 20 + 'px'
			});
		} else {
			obj.css({
				'transform': 'rotate(' + deg + 'deg)',
				'-ms-transform': 'rotate(' + deg + 'deg)',
				'-webkit-transform': 'rotate(' + deg + 'deg)',
				'-o-transform': 'rotate(' + deg + 'deg)',
				'-moz-transform': 'rotate(' + deg + 'deg)'
			});
		}
	};

	//数据矩阵顺时针旋转90度
	var matrix_90 = function matrix_90(mat) {
		var row = mat.length,
		    col = mat[0].length;
		var arr = array_init(col, row);
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				arr[j][row - 1 - i] = mat[i][j];
			}
		}
	};

	/*碰撞检测*/
	var test_collision = function test_collision(board, mat, coord) {
		var board_temp = board,
		    x = coord[0],
		    y = coord[1],
		    row = mat.length,
		    col = mat[0].length;
		for (var i = 0; i < row; i++) {
			x_temp = x - (row - 1 - i);
			for (var j = 0; j < col; j++) {
				y_temp = y + j;
				board_temp[x_temp][y_temp] += mat[i][j];
			}
		}
		for (var _i = 0; _i < board_temp.length; _i++) {
			for (var _j = 0; _j < board_temp[0].length; _j++) {
				if (board_temp[_i][_j] > 1) {
					return false;
				}
			}
		}
		return true;
	};

	/*棋盘矩阵更新*/
	var update_board = function update_board(board, mat, coord) {
		var x = coord[0],
		    y = coord[1],
		    row = mat.length,
		    col = mat[0].length;
		for (var i = 0; i < row; i++) {
			x_temp = x - (row - 1 - i);
			for (var j = 0; j < col; j++) {
				y_temp = y + j;
				board[x_temp][y_temp] += mat[i][j];
			}
		}
		return board;
	};

	/*棋盘初始化：数据+样式*/
	var board = array_init(12, 10, 0);
	var board_unit = function board_unit() {
		var row = '',
		    col = '';
		for (var i = 0; i < board[0].length; i++) {
			row += '<div class="board-cell-init"></div>';
		}
		for (var _i2 = 0; _i2 < board.length; _i2++) {
			col += '<li>' + row + '</li>';
		}
		$(".board ul").html(col);
	};

	/*积木逐格降落*/
	var fall_step = function fall_step(obj) {
		var t = $(obj).css('top');
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		$(obj).animate({
			'top': t + 40 + 'px'
		}, 200);
	};

	/*积木左右平移*/
	var fall_move = function fall_move(obj, direction) {
		var l = $(obj).css('left');
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		if (direction === 'left') {
			$(obj).animate({
				'left': l - 40 + 'px'
			}, 200);
		} else {
			$(obj).animate({
				'left': l + 40 + 'px'
			}, 200);
		}
	};

	/*积木自动降落*/
	var timer = null;
	var fall_auto = function fall_auto(obj) {
		/*这里在回调函数有参数时要写在function里面*/
		timer = setInterval(function () {
			fall_step(obj);
		}, 1200);
	};

	/*7种基本积木*/
	var fall_0 = void 0,
	    fall_1 = void 0,
	    fall_2 = void 0,
	    fall_3 = void 0,
	    fall_4 = void 0,
	    fall_5 = void 0,
	    fall_6 = void 0;
	var fall_cell_1 = '<div class="board-cell" name="1"></div>'; /*有色单元*/
	var fall_cell_0 = '<div class="board-cell-0" name="0"></div>'; /*无色单元*/

	/*第0种积木*/
	var fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[(0, 0)] = 0;
	fall_data_temp[(1, 2)] = 0;
	fall_0 = { fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_0 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第1种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[(0, 2)] = 0;
	fall_data_temp[(1, 0)] = 0;
	fall_1 = {
		fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_0 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第2种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[(1, 1)] = 0;
	fall_data_temp[(1, 2)] = 0;
	fall_2 = {
		fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_0 + fall_cell_0 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第3种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[(1, 0)] = 0;
	fall_data_temp[(1, 1)] = 0;
	fall_3 = {
		fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_0 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第4种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[(0, 0)] = 0;
	fall_data_temp[(2, 0)] = 0;
	fall_4 = {
		fall_style: '<ul class=\'fall_3_2\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第5种积木*/
	fall_data_temp = array_init(2, 2, 1);
	fall_5 = {
		fall_style: '<ul class=\'fall_2_2\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第6种积木*/
	fall_data_temp = array_init(1, 4, 1);
	fall_6 = {
		fall_style: '<ul class=\'fall_1_4\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};

	var fall_arr = [fall_0, fall_1, fall_2, fall_3, fall_4, fall_5, fall_6];
	/*方块下落起始位置[3,-1]*/
	board_unit();
	$(".fall").html(fall_6.fall_style);
	/*trans_90($(".fall"));*/
	fall_auto($(".fall"));
});