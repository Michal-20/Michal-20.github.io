Fire.count = 0;
function Fire (){
	Fire.count++;
	this.id = 'f_' + Fire.count;
	Game.toDraw[this.id] = this;
	this.fW = 9;
	this.fH = 3;
	//
	this.start_x = 27;
	this.start_y = 25;
	//
	this.draw_thrust = true;
}
Fire.prototype.draw = function(){
	if(!Game.Ship.ko && !Game.success){
		if((Game.key_37 || Game.key_39) && this.draw_thrust){
		this.draw_thrust = false;
		Game.ctx.drawImage(
			Game.spr,
			this.start_x,
			this.start_y,
			this.fW,
			this.fH,
			Game.Ship.x +23,
			Game.Ship.y+80,
			this.fW*5,
			this.fH*5
		)

		}else if((Game.key_37 || Game.key_39) && !this.draw_thrust){
			this.draw_thrust=true;
		}	
		
		if((Game.key_37 || Game.key_39) && (!Game.thrust_sound || Game.thrust_sound <=0)){
				Game.thrust_sound = 60;
				Sounds.volume(0.7);
				Sounds.play('thrust');
			}else if(Game.key_38 && Game.thrust_sound){
				Game.thrust_sound -= 1000/VAR.fps;
			}else if(!Game.key_38){
				Game.thrust_sound = false;
			}
		
	}		
}	
