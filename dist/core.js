function change_color(title){var rtrn="#000";
if(title=="game_background_color") rtrn=window.json_setting.game_background_color;
else if(title=="snake_color") rtrn=window.json_setting.snake_color;
else if(title=="food_color") rtrn=window.json_setting.food_color;
else if(title=="scoreboard_color") rtrn=window.json_setting.scoreboard_color;
return rtrn;
}
$(document).keydown(function(e) {
	var key = e.which;
	if (key == "37" && d != "right") d = "left";
	else if (key == "38" && d != "down") d = "up";
	else if (key == "39" && d != "left") d = "right";
	else if (key == "40" && d != "up") d = "down";});
	window.keys = [];	
	window.addEventListener("keydown", function(e) {
		window.keys[e.keyCode] = true;
		switch(e.keyCode) {
			case 37:
			case 39:
			case 38: 
			case 40: 
			case 32:
				e.preventDefault();
				break;
			default: break;
		}
	}, false);
	window.addEventListener('keyup',
	function(e){
	window.keys[e.keyCode] = false;},
	false);
function createCanvas(){
	window.canvas=$("#canvas")[0];
	window.ctx=canvas.getContext("2d");
	window.w=$("#canvas").width();
	window.h=$("#canvas").height();
	window.cw = 10;
	window.d;
	window.food;
	window.score;
	window.snake_array;
}
function game_start(){
window.createCanvas();
	window.d = "right";
	window.create_snake();
	window.create_food();
	window.score = 0;
	if (typeof game_loop != "undefined") clearInterval(game_loop);
	window.game_loop = setInterval(window.paint, 60);
}
function create_snake(){
var length = 5;
	window.snake_array = [];
	for (var i = length - 1; i >= 0; i--) {
	window.snake_array.push({
	x: i,y: 0});}
}
function paint(){
window.ctx.fillStyle = window.change_color("game_background_color");
	window.ctx.fillRect(0, 0, w, h);
	window.ctx.strokeStyle = "black";
	window.ctx.strokeRect(0, 0, w, h);
	var nx = window.snake_array[0].x;
	var ny = window.snake_array[0].y;
	if (window.d == "right") nx++;
	else if (window.d == "left") nx--;
	else if (window.d == "up") ny--;
	else if (window.d == "down") ny++;
	if (nx == -1 || nx == window.w / window.cw || ny == -1 || ny == window.h / window.cw || window.check_collision(nx, ny,window.snake_array)) {
	window.game_start();
	return;}
	if (nx == window.food.x && ny == window.food.y) {
	var tail={
	x: nx,
	y: ny};
	window.score++;
	window.create_food();}
	else {
	var tail=window.snake_array.pop();
	tail.x=nx;
	tail.y=ny;}
	window.snake_array.unshift(tail);
	for (var i = 0; i < window.snake_array.length; i++) {
	var c = window.snake_array[i];
	window.ctx.fillStyle =window.change_color("snake_color");
	window.paint_cell(c.x, c.y);}
	window.ctx.fillStyle = window.change_color("food_color");
	window.paint_cell(window.food.x,window.food.y);
	window.ctx.fillStyle = window.change_color("scoreboard_color");
	var score_text = "Score: " + window.score;
	window.ctx.fillText(score_text, 5, h - 5);
}
function create_food(){
window.food={
	x: Math.round(Math.random() * (window.w - window.cw) / window.cw),
	y: Math.round(Math.random() * (window.h - window.cw) / window.cw),};
}
function paint_cell(x, y) {
	window.ctx.fillRect(x * window.cw, y * window.cw, window.cw, window.cw);
	window.ctx.fillStyle = "blue";
	window.ctx.strokeStyle = "transparent";
	window.ctx.strokeRect(x * cw, y * cw, cw, cw);}
function check_collision(x, y, array) {
	for (var i = 0; i < array.length; i++) {
	if (array[i].x == x && array[i].y == y) return true;
	}return false;}
$(document).ready(function() {
	$("body").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {d=direction;
        },
         threshold:0
      });
	game_start();
	});