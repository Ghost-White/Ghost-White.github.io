'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

$(function () {

	var PI = 3.141592657;
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

	/*19种基本积木*/
	var fall_0_0 = void 0,
	    fall_0_1 = void 0,
	    fall_0_2 = void 0,
	    fall_0_3 = void 0;
	var fall_1_0 = void 0,
	    fall_1_1 = void 0;
	var fall_2_0 = void 0,
	    fall_2_1 = void 0,
	    fall_2_2 = void 0,
	    fall_2_3 = void 0,
	    fall_2_4 = void 0,
	    fall_2_5 = void 0,
	    fall_2_6 = void 0,
	    fall_2_7 = void 0;
	var fall_3_0 = void 0;
	var fall_4_0 = void 0,
	    fall_4_1 = void 0,
	    fall_4_2 = void 0,
	    fall_4_3 = void 0;

	var fall_cell_1 = '<div class="board-cell" name="1"></div>'; /*有色单元*/
	var fall_cell_0 = '<div class="board-cell-0" name="0"></div>'; /*无色单元*/

	var fall_class_find = function fall_class_find(row, col) {
		var fall_class = '';
		if (row === 2 && col === 2) {
			fall_class = 'fall_2_2';
		} else if (row === 2 && col === 3) {
			fall_class = 'fall_2_3';
		} else if (row === 3 && col === 2) {
			fall_class = 'fall_3_2';
		} else if (row === 4 && col === 1) {
			fall_class = 'fall_4_1';
		} else if (row === 1 && col === 4) {
			fall_class = 'fall_1_4';
		} else {
			return;
		}
		return fall_class;
	};

	var fall_create = function fall_create(fall_data) {
		var row = fall_data.length,
		    col = fall_data[0].length;
		var fall_class = fall_class_find(row, col);
		var rows = '';
		for (var i = 0; i < row; i++) {
			var _row = '<li>';
			for (var j = 0; j < col; j++) {
				if (fall_data[i][j] === 0) {
					_row = _row.concat(fall_cell_0);
				} else {
					_row = _row.concat(fall_cell_1);
				}
			}
			rows = rows.concat(_row).concat('</li>');
		}
		var str = '<ul class=' + fall_class + '>\n\t\t\t\t\t' + rows + '\n\t\t\t\t\t</ul>';
		return str;
	};

	/*第0组积木*/
	var fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[1][2] = 0;
	fall_0_0 = { fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[2][0] = 0;
	fall_0_1 = { fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[0][2] = 0;
	fall_data_temp[1][0] = 0;
	fall_0_2 = { fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[2][1] = 0;
	fall_0_3 = { fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};

	/*第1组积木*/
	fall_data_temp = array_init(1, 4, 1);
	fall_1_0 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(4, 1, 1);
	fall_1_1 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};

	/*第2组积木*/
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[1][2] = 0;
	fall_2_0 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[1][1] = 0;
	fall_2_1 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[0][2] = 0;
	fall_2_2 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[1][0] = 0;
	fall_2_3 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[1][0] = 0;
	fall_2_4 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[1][1] = 0;
	fall_data_temp[2][1] = 0;
	fall_2_5 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[0][0] = 0;
	fall_2_6 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[1][0] = 0;
	fall_data_temp[2][0] = 0;
	fall_2_7 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};

	/*第3组积木*/
	fall_data_temp = array_init(2, 2, 1);
	fall_3_0 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};

	/*第4组积木*/
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[2][0] = 0;
	fall_4_0 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[0][0] = 0;
	fall_data_temp[0][2] = 0;
	fall_4_1 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(3, 2, 1);
	fall_data_temp[0][1] = 0;
	fall_data_temp[2][1] = 0;
	fall_4_2 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};
	fall_data_temp = array_init(2, 3, 1);
	fall_data_temp[1][0] = 0;
	fall_data_temp[1][2] = 0;
	fall_4_3 = {
		fall_style: fall_create(fall_data_temp),
		fall_data: fall_data_temp
	};

	/*5组下落积木*/
	var fall_0 = [fall_0_0, fall_0_1, fall_0_2, fall_0_3];
	var fall_1 = [fall_1_0, fall_1_1];
	var fall_2 = [fall_2_0, fall_2_1, fall_2_2, fall_2_3, fall_2_4, fall_2_5, fall_2_6, fall_2_7];
	var fall_3 = [fall_3_0];
	var fall_4 = [fall_4_0, fall_4_1, fall_4_2, fall_4_3];

	var fall_arr = [fall_0, fall_1, fall_2, fall_3, fall_4];

	/*初始化下落积木坐标*/
	var fall_coord = null;

	/*初始化当前积木矩阵mat*/
	var mat = null;

	/*当前积木所在数组位置*/
	var fall_active = [0, 0];

	/*事件监听标志*/
	var event_flag = 0; /*0表示完全监听，1表示不监听下落*/

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

	/*从某个组中获取随机积木*/
	var fall_random = function fall_random(i) {
		var j = 0;
		if (i === 3) {
			j = 0;
		} else if (i === 0 || i === 4) {
			j = Math.floor(Math.random() * 4); /*0-3*/
		} else if (i === 1) {
			j = Math.floor(Math.random() * 2); /*0-1*/
		} else {
			j = Math.floor(Math.random() * 8); /*0-7*/
		}
		return j;
	};

	/*初始化降落积木 数据+样式*/
	var fall_init = function fall_init() {
		if (board[0][3] !== 0 || board[0][4] !== 0 || board[0][5] !== 0) {
			clearInterval(timer);
			offEvent();
			return;
		} else {
			fall_coord = [-1, 3]; /*重置降落坐标*/
			var i = Math.floor(Math.random() * 5); /*0-4*/
			var j = fall_random(i);
			fall_active = [i, j];
			$(".fall").css({
				'left': '120px',
				'bottom': '480px'
			});
			var active = fall_arr[i][j];
			$(".fall").html(active.fall_style); /*样式*/
			mat = active.fall_data; /*数据*/
		}
	};

	/*积木降落一格 样式+数据*/
	var fall_step = function fall_step(obj) {
		var t = $(obj).css('bottom');
		if (t === null || t === '' || t === 'none' || t === undefined) {
			t = 0;
		}
		t = Number.parseFloat(/\-*[0-9]+/g.exec(t)[0]);
		var _fall_coord = fall_coord;

		var _fall_coord2 = _slicedToArray(_fall_coord, 2);

		var x = _fall_coord2[0];
		var y = _fall_coord2[1]; /*动画前先改变数据，使得动画过程中触发其他时间时能获取到正确数据*/

		fall_coord = [x + 1, y];
		$(obj).animate({
			'bottom': t - 40 + 'px'
		}, 200, function () {});
	};

	/*积木自动降落*/
	var timer = null;
	var over_flag = 0;
	var fall_auto = function fall_auto(obj) {
		/*setInterval在回调函数有参数时要写在function里面*/
		timer = setInterval(function () {
			var _fall_coord3 = fall_coord;

			var _fall_coord4 = _slicedToArray(_fall_coord3, 2);

			var x = _fall_coord4[0];
			var y = _fall_coord4[1];
			/*碰撞预测*/

			var coord = [x + 1, y];
			if (test_collision(board, mat, coord) === false && x < 11) {
				/*防止x越界*/
				fall_step(obj);
			} else {
				board = update_board(board, mat, fall_coord);
				fall_init();
			}
		}, 1200);
	};

	/*碰撞检测*/
	var test_collision = function test_collision(board, mat, coord) {
		var board_temp = copy_arr(board);

		var _coord = _slicedToArray(coord, 2);

		var x = _coord[0];
		var y = _coord[1];
		var row = mat.length;
		var col = mat[0].length;
		if (x < 12 && y + col - 1 < 10 && y > -1) {
			/*边界限制*/
			for (var i = 0; i < row; i++) {
				var x_temp = x - (row - 1 - i);
				if (x_temp > -1) {
					for (var j = 0; j < col; j++) {
						var y_temp = y + j;
						board_temp[x_temp][y_temp] += mat[i][j];
					}
				}
			}
			for (var _i2 = 0; _i2 < board_temp.length; _i2++) {
				for (var _j = 0; _j < board_temp[0].length; _j++) {
					if (board_temp[_i2][_j] > 1) {
						return true;
					}
				}
			}
		} else {
			return true;
		}
		return false;
	};

	/*棋盘矩阵更新*/
	var update_board = function update_board(board, mat, coord) {
		var board_old = copy_arr(board),
		    board_new = copy_arr(board);
		var x = coord[0],
		    y = coord[1],
		    row = mat.length,
		    col = mat[0].length;
		for (var i = 0; i < row; i++) {
			var x_temp = x - (row - 1 - i);
			if (x_temp > -1) {
				for (var j = 0; j < col; j++) {
					var y_temp = y + j;
					board_new[x_temp][y_temp] += mat[i][j];
				}
			}
		}
		/*棋盘样式更新*/
		var update_board_style = function update_board_style() {
			for (var _i3 = 0; _i3 < board.length; _i3++) {
				for (var _j2 = 0; _j2 < board[0].length; _j2++) {
					if (board_new[_i3][_j2] - board_old[_i3][_j2] !== 0) {
						var rows = $(".board ul").find("li");
						var cols = $(rows[_i3]).find("div");
						$(cols[_j2]).removeClass("board-cell-init").addClass("board-cell");
					}
				}
			}
		};

		update_board_style();

		/*去除最后一行，新增第一行*/
		var fresh_board_style = function fresh_board_style() {
			$(".board ul li").eq(11).remove();
			var row = '<li>';
			for (var _i4 = 0; _i4 < board[0].length; _i4++) {
				row += '<div class="board-cell-init"></div>';
			}
			row += '</li>';
			$(".board ul").prepend(row);
		};

		var check_update = function check_update() {
			var update_flag = 0;
			var b_row = board_new.length,
			    b_col = board_new[0].length;
			for (var _i5 = 0; _i5 < b_col; _i5++) {
				if (board_new[b_row - 1][_i5] !== 0) {
					update_flag = 1;
				} else {
					update_flag = 0;
					return false;
				}
			}
			if (update_flag === 1) {
				for (var _i6 = b_row - 1; _i6 > 0; _i6--) {
					board_new[_i6] = board_new[_i6 - 1];
				}
				board_new[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				fresh_board_style();
			}
			return true;
		};

		while (check_update() === true) {}

		return board_new;
	};

	/*溢出检测*/
	var test_overflow = function test_overflow(mat, coord) {
		var row = mat.length,
		    col = mat[0].length;

		var _coord2 = _slicedToArray(coord, 2);

		var x = _coord2[0];
		var y = _coord2[1];

		if (y + col - 1 < 10 && x < 12) {
			return false;
		} else {
			return true;
		}
	};

	/*积木转换 数据+样式*/
	var fall_trans = function fall_trans(fall_active) {
		var i = fall_active[0],
		    j = fall_active[1];
		var j_new = fall_random(i);
		while (j_new === j && i !== 3) {
			j_new = fall_random(i);
		}
		var active = fall_arr[i][j_new];
		var mat_temp = active.fall_data;
		if (test_collision(board, mat_temp, fall_coord) === false) {
			mat = active.fall_data;
			$(".fall").html(active.fall_style);
			fall_active[1] = j_new;
		} else {
			return;
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
		return arr;
	};

	/*积木左右平移*/
	var fall_move = function fall_move(obj, direction) {
		var _fall_coord5 = fall_coord;

		var _fall_coord6 = _slicedToArray(_fall_coord5, 2);

		var x = _fall_coord6[0];
		var y = _fall_coord6[1];

		var l = $(obj).css('left');
		if (l === null || l === '' || l === 'none' || l === undefined) {
			l = 0;
		}
		l = Number.parseFloat(/.*[0-9]+/g.exec(l)[0]);
		var col = mat[0].length; /*防止右移越界*/
		if (direction === 'left' && y - 1 > -1) {
			var coord = [x, y - 1];
			if (test_collision(board, mat, coord) === true) {
				return;
			} else {
				fall_coord = [x, y - 1];
				$(obj).animate({
					'left': l - 40 + 'px'
				}, 100, function () {});
			}
		} else if (direction === 'right' && y + col < 10) {
			var _coord3 = [x, y + 1];
			if (test_collision(board, mat, _coord3) === true) {
				return;
			} else {
				fall_coord = [x, y + 1];
				$(obj).animate({
					'left': l + 40 + 'px'
				}, 100, function () {});
			}
		} else {
			return;
		}
	};

	/*快速坠落*/
	var fast_down = function fast_down() {
		$(".fall").stop();
		/*这一步很重要！！否则会出现在下落短暂时间内点击快速下落，会出现样式初始化后被改变的情况*/
		var _fall_coord7 = fall_coord;

		var _fall_coord8 = _slicedToArray(_fall_coord7, 2);

		var x = _fall_coord8[0];
		var y = _fall_coord8[1];

		var coord = [x + 1, y];
		var steps = 0;
		while (test_collision(board, mat, coord) === false && x < 11) {
			fall_coord = [x + 1, y];
			steps += 1;
			var _fall_coord9 = fall_coord;

			var _fall_coord10 = _slicedToArray(_fall_coord9, 2);

			x = _fall_coord10[0];
			y = _fall_coord10[1];

			coord = [x + 1, y];
		}
		board = update_board(board, mat, fall_coord);
		fall_init();
	};

	/*事件监听*/
	var addEvent = function addEvent() {
		$(document).on('keydown', 'body', function (event) {
			if (event.keyCode === 37) {
				fall_move($(".fall"), 'left'); /*左*/
			} else if (event.keyCode === 39) {
				fall_move($(".fall"), 'right'); /*右*/
			} else if (event.keyCode === 38) {
				fall_trans(fall_active); /*换*/
			} else if (event.keyCode === 40) {
				fast_down(); /*下*/
			} else if (event.keyCode === 32) {
				clearInterval(timer); /*空格暂停*/
			} else if (event.keyCode === 13) {
				clearInterval(timer); /*enter 继续*/
				fall_auto($(".fall"));
			}
		});

		$(document).on('click', '.move_left', function () {
			fall_move($(".fall"), 'left', addEvent); /*左*/
		}).on('click', '.move_right', function () {
			fall_move($(".fall"), 'right', addEvent); /*右*/
		}).on('click', '.move_change', function () {
			fall_trans(fall_active); /*换*/
		}).on('click', '.move_down', function () {
			if (event_flag === 0) {
				/*下*/
				fast_down();
			}
		}).on('click', '.pause_start', function () {
			if ($(".stop_restart span").html() === '0') {
				/*停止状态--点击无效*/
				$(this).find("img").eq(0).css({
					"display": "none"
				});
				$(this).find("img").eq(1).css({
					"display": "none"
				});
				$(this).find("img").eq(2).css({
					"display": "block"
				});
			} else {
				/*运行中*/
				$(this).find("img").eq(2).css({
					"display": "none"
				});
				if ($(this).find("span").html() === '0') {
					/*暂停状态--运行*/
					$(this).find("img").eq(0).css({
						"display": "none"
					});
					$(this).find("img").eq(1).css({
						"display": "block"
					});
					clearInterval(timer);
					fall_auto($(".fall"));
					$(this).find("span").html('1');
				} else {
					$(this).find("img").eq(0).css({
						"display": "block"
					}); /*运行中--暂停*/
					$(this).find("img").eq(1).css({
						"display": "none"
					});
					$(this).find("span").html('0');
					clearInterval(timer);
				}
			}
		});
	};

	/*关闭具体操作监听*/
	var offEvent = function offEvent() {
		$(document).off("keydown", "body");
		$(document).off('click', '.move_left');
		$(document).off('click', '.move_right');
		$(document).off('click', '.move_change');
		$(document).off('click', '.move_down');
		$(document).off('click', '.pause_start');
	};

	/*重新启动游戏=开始游戏*/
	var game_restart = function game_restart() {
		board_init();
		fall_init();
		fall_auto($(".fall"));
	};

	var game_stop = function game_stop() {
		board_init();
		fall_init();
		clearInterval(timer);
	};

	var game_init = function game_init() {
		$(document).on("click", ".stop_restart", function () {
			if ($(this).find("span").html() === '0') {
				/*停止状态--运行*/
				$(this).find("img").eq(0).css({
					"display": "none"
				});
				$(this).find("img").eq(1).css({
					"display": "block"
				});
				$(this).find("span").html('1');

				/*改变暂停显示*/
				$(".pause_start img").eq(0).css({
					"display": "none"
				});
				$(".pause_start img").eq(1).css({
					"display": "block"
				});
				$(".pause_start img").eq(2).css({
					"display": "none"
				});
				$(".pause_start span").html("1"); /*暂停--运行*/

				game_restart();
				/*添加游戏具体操作监听*/
				addEvent();
			} else {
				$(this).find("img").eq(0).css({
					"display": "block"
				});
				$(this).find("img").eq(1).css({
					"display": "none"
				});
				$(this).find("span").html('0');

				/*改变暂停显示*/
				$(".pause_start img").eq(0).css({
					"display": "none"
				});
				$(".pause_start img").eq(1).css({
					"display": "none"
				});
				$(".pause_start img").eq(2).css({
					"display": "block"
				});

				/*关闭游戏具体操作监听*/
				offEvent();
				game_stop();
			}
		});
	};

	game_init();
});