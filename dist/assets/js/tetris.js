'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

$(function () {

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

	/*复制数组，防止引用更改全局变量*/
	var copy_arr = function copy_arr(arr) {
		var row = arr.length,
		    col = arr[0].length;
		var arr_new = array_init(row, col, 0);
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				arr_new[i][j] = arr[i][j];
			}
		}
		return arr_new;
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
	fall_data_temp[0][0] = 0;
	fall_data_temp[1][2] = 0;
	fall_0 = { fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_0 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第1种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[0][2] = 0;
	fall_data_temp[1][0] = 0;
	fall_1 = {
		fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_0 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第2种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[1][2] = 0;
	fall_2 = {
		fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_0 + fall_cell_0 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第3种积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[1][0] = 0;
	fall_data_temp[1][1] = 0;
	fall_3 = {
		fall_style: '<ul class=\'fall_2_3\'>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_1 + fall_cell_1 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t' + fall_cell_0 + fall_cell_0 + fall_cell_1 + '\n\t\t\t\t</li>\n\t\t\t\t</ul>',
		fall_data: fall_data_temp
	};
	/*第4种积木*/
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[2][0] = 0;
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

	/*7中下落积木数组*/
	var fall_arr = [fall_0, fall_1, fall_2, fall_3, fall_4, fall_5, fall_6];

	/*初始化第一个下落积木*/
	var fall_active = null;

	/*初始化下落积木坐标*/
	var fall_coord = null;

	/*初始化当前积木矩阵mat*/
	var mat = null;

	/*初始化棋盘：数据+样式*/
	var board = null;
	var board_init = function board_init() {
		board = array_init(12, 10, 0);
		var row = '',
		    col = '';
		for (var i = 0; i < board[0].length; i++) {
			row += '<div class="board-cell-init"></div>';
		}
		for (var _i = 0; _i < board.length; _i++) {
			col += '<li>' + row + '</li>';
		}
		$(".board ul").html(col);
	};

	/*初始化降落积木，开启下一轮降落*/
	var fall_init = function fall_init() {
		fall_coord = [-1, 3]; /*重置降落坐标*/
		var n = Math.floor(Math.random() * 7);
		var fall_active = fall_arr[n];
		$(".fall").css({
			'left': '120px',
			'top': '-82px'
		});
		$(".fall").html(fall_active.fall_style); /*样式*/
		mat = fall_active.fall_data; /*数据*/
	};

	/*积木逐格降落*/
	var fall_step = function fall_step(obj) {
		var t = $(obj).css('top');
		if (t === null || t === '' || t === 'none' || t === undefined) {
			t = 0;
		}
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		$(obj).animate({
			'top': t + 40 + 'px'
		}, 200, function () {
			var _fall_coord = fall_coord;

			var _fall_coord2 = _slicedToArray(_fall_coord, 2);

			var x = _fall_coord2[0];
			var y = _fall_coord2[1];

			y += 1;
			fall_coord = [x, y];
		});
	};

	/*积木自动降落*/
	var timer = null;
	var fall_auto = function fall_auto(obj) {
		/*这里在回调函数有参数时要写在function里面*/
		timer = setInterval(function () {
			var _fall_coord3 = fall_coord;

			var _fall_coord4 = _slicedToArray(_fall_coord3, 2);

			var x = _fall_coord4[0];
			var y = _fall_coord4[1];
			/*碰撞预测*/

			var coord = [x + 1, y];
			// console.log("board"+board);
			if (test_collision(board, mat, coord) === false && x < 11) {
				fall_step(obj);
			} else {
				board = update_board(board, mat, fall_coord);
				fall_init();
			}
		}, 1200);
	};

	/*重新启动游戏=开始游戏*/
	var game_restart = function game_restart() {
		board_init();
		fall_init();
		fall_auto($(".fall"));
	};

	/*碰撞检测*/
	var test_collision = function test_collision(board, mat, coord) {
		var board_temp = copy_arr(board);

		var _coord = _slicedToArray(coord, 2);

		var x = _coord[0];
		var y = _coord[1];
		var row = mat.length;
		var col = mat[0].length;
		for (var i = 0; i < row; i++) {
			var x_temp = x - (row - 1 - i);
			for (var j = 0; j < col; j++) {
				var y_temp = y + j;
				board_temp[x_temp][y_temp] += mat[i][j];
			}
		}
		for (var _i2 = 0; _i2 < board_temp.length; _i2++) {
			for (var _j = 0; _j < board_temp[0].length; _j++) {
				if (board_temp[_i2][_j] > 1) {
					console.log("collision");
					return true;
				}
			}
		}
		return false;
	};

	/*棋盘矩阵更新*/
	var update_board = function update_board(board, mat, coord) {
		console.log('mat:' + mat + ',coord:' + coord);
		var board_old = copy_arr(board),
		    board_new = copy_arr(board);
		var x = coord[0],
		    y = coord[1],
		    row = mat.length,
		    col = mat[0].length;
		for (var i = 0; i < row; i++) {
			var x_temp = x - (row - 1 - i);
			for (var j = 0; j < col; j++) {
				var y_temp = y + j;
				board_new[x_temp][y_temp] += mat[i][j];
				console.log(x_temp + ',' + y_temp);
			}
		}
		/*棋盘样式更新*/
		var update_board_style = function update_board_style() {
			for (var _i3 = 0; _i3 < board.length; _i3++) {
				for (var _j2 = 0; _j2 < board[0].length; _j2++) {
					if (board_old[_i3][_j2] !== 0) {
						var rows = $(".fall ul").find("li");
						var cols = $(rows[_i3]).find("div");
						$(cols[_j2]).removeClass("board-cell-init").addClass("board-cell");
					}
				}
			}
		};
		update_board_style();
		return board_new;
	};

	/*样式旋转90度*/
	var trans_90 = function trans_90(obj) {
		var w = $(obj).width(),
		    h = $(obj).height(),
		    l = $(obj).css('left'),
		    t = $(obj).css('top'),
		    d = $(obj).css('transform');
		if (t === null || t === '' || t === 'none' || t === undefined) {
			t = 0;
		}
		if (l === null || l === '' || l === 'none' || l === undefined) {
			l = 0;
		}
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		t = Number.parseFloat(/.[0-9]+/g.exec(t)[0]);
		var deg = 0;
		if (d !== undefined && d !== null && d !== '' && d !== 'none') {
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

	/*数据矩阵顺时针旋转90度*/
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

	/*积木左右平移*/
	var fall_move = function fall_move(obj, direction) {
		var l = $(obj).css('left');
		if (l === null || l === '' || l === 'none' || l === undefined) {
			l = 0;
		}
		l = Number.parseFloat(/.[0-9]+/g.exec(l)[0]);
		var _fall_coord5 = fall_coord;

		var _fall_coord6 = _slicedToArray(_fall_coord5, 2);

		var x = _fall_coord6[0];
		var y = _fall_coord6[1];

		if (direction === 'left') {
			$(obj).animate({
				'left': l - 40 + 'px'
			}, 200);
			y -= 1;
		} else {
			$(obj).animate({
				'left': l + 40 + 'px'
			}, 200);
			y += 1;
		}
		fall_coord = [x, y];
	};

	game_restart();
});