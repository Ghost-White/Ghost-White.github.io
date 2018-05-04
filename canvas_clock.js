var dom = document.getElementById('clock');
var ctx  = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var PI = Math.PI;
var rem = width / 200;		//比例，以200px的画布为准，等比例变换尺寸

function drawBackground(){
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;								//自适应边框宽度
	ctx.arc(0, 0, r - 5 * rem, 0, 2 * PI, false);	//自适应半径
	ctx.stroke();

	var hourNumbers =  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = 18 * rem +'px Arial';		//自适应字体
	ctx.textAlign = 'center';	//左右对齐
	ctx.textBaseline = 'middle';	//上下对齐
	hourNumbers.forEach(function(number,i){			
		var rad = 2 * PI / 12 * i;
		var x = Math.cos(rad) * (r - 30 * rem);			//自适应圆
		var y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number, x, y);				//绘制数字
 	});

 	for(var i = 0; i < 60; i++){
 		var rad = 2 * PI / 60 * i;
 		var x = Math.cos(rad) * (r - 18 * rem);		//自适应
 		var y = Math.sin(rad) * (r - 18 * rem);
 		ctx.beginPath();
 		if(i % 5 == 0){
 			ctx.fillStyle = '#000';
 		}else{
 			ctx.fillStyle = '#ccc';
 		}
 		ctx.arc(x, y, 2 * rem, 2 * PI, false);
 		ctx.fill();
 	}
}
//时针
function drawHour(hour,minute){
	ctx.save();						//保存当前画布状态
	ctx.beginPath();
	var rad = 2 * PI / 12 * hour;
	var mrad = 2 * PI / 12 / 60 * minute; 
	ctx.rotate(rad + mrad);				//旋转画布
	ctx.lineWidth = 6 * rem;	
	ctx.lineCap = 'round';			//线条样式
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r / 2);
	ctx.stroke();
	ctx.restore();					//返回之前保存的画布状态（防止旋转画布操作影响后面的）
}
//分针
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r + 30 * rem);
	ctx.stroke();
	ctx.restore();
}
//秒针
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543';
	var rad = 2 * PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 20 * rem);				//绘制秒针小梯形
	ctx.lineTo(2 * rem, 20 * rem);
	ctx.lineTo(1 * rem,-r + 18 * rem); 
	ctx.lineTo(-1 * rem, -r + 18 * rem);
	ctx.fill();
	ctx.restore();
}
//中心钉子
function drawDot() {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3 * rem, 2 * PI, false);
	ctx.fill();
}

function drawTime(){
	var time = new Date();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	ctx.clearRect(0, 0, width, height);	//清空一个区域
	ctx.save();							//保存当前状态，每秒重绘一次
	ctx.translate(r,r);					//移动原点坐标到中心
	drawBackground();
	drawHour(h, m);
	drawMinute(m);
	drawSecond(s);
	drawDot();
	ctx.restore();
}

drawTime();
setInterval(drawTime,1000);