Life.count = 0;

Life.all = {};

function Life (x){
	Life.count++;
	
	this.id = Life.count;
	
	Life.all[this.id] = this;
	//
	this.fW = 9;
	this.fH = 7;
	//
	this.start_x = 18;
	this.start_y = 43;
	//
	this.x = x;
	this.y = 63;
}	

Life.prototype.draw = function(){
	
	Game.ctx.drawImage(
		Game.spr,
		this.start_x,
		this.start_y,
		this.fW,
		this.fH,
		this.x,
		this.y,
		this.fW*3,
		this.fH*3
	);
	
}	

Life.draw = function(){
	Life.num = 0;
	for(var l in Life.all){
		Life.num++;
		Life.all[l].draw();
	}	
	if(Life.num===0 && !Game.success){
		Game.success = true;
		console.log('Game Over');
	}
}	

Life.prototype.remove = function(){
	Life.num--;	
	Life.count--;
	delete Life.all[this.id];
	console.log('tracisz jedno serce!!!');
}	
