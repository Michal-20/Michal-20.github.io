Ship.count = 0;
var ev;
function Ship (){
	Ship.count++;
	this.id = 'ch_' + Ship.count;
	Game.toDraw[this.id] = this;
	//
	this.fW = 15;
	this.fH = 13;
	//
	this.start_x = 24;
	this.start_y = 11;
	//
	this.x = VAR.W*0.5;
	this.y = VAR.H*0.85;
	this.ko = false;

	this.frames_ko = [0,1,2];
	//
	this.x_ko = 80;
	this.y_ko = 37;
	//
	this.current_f = 0;
	this.change_f_delay = 0;
	this.f_max_delay_ko = 6;	
	//
	this.f = 0;
	this.f_max = 20;
}	

Ship.prototype.draw = function(){
	
	if((Game.key_37 || Game.key_39) && !this.ko){
		this.x += 12*(Game.key_37 ? -1 :1 );
	}

	
	if(this.x <= window.innerWidth*0.03){
		this.x = VAR.W*0.03;
	}	
	if(this.x >= window.innerWidth*0.92){
		this.x = VAR.W*0.92;
	}
	
	
	
	if(!this.ko){
			Game.ctx.drawImage(
			Game.spr,
			this.start_x,
			this.start_y,
			this.fW,
			this.fH,
			this.x,
			this.y,
			this.fW*6,
			this.fH*6
		);}else if(this.ko){
			Game.ctx.drawImage(
			Game.spr,
			this.x_ko + this.frames_ko[this.current_f]*this.fW,
			this.y_ko,
			this.fW,
			this.fH,
			this.x,
			this.y,
			this.fW*6,
			this.fH*6
			
		);}
		
		if(this.ko){
			if(this.change_f_delay<this.f_max_delay_ko){
				this.change_f_delay++;		
			}else{
				this.change_f_delay = 0;
				if(this.current_f == this.frames_ko.length-1 ){
					
						this.ko = false;
						Life.all[Life.count].remove();
					if(Life.count != 0){
						Game.Ship.respawn();					
					}else if(Life.count == 0){
						delete Game.toDraw[this.id];
					}
				}else{	
				this.current_f = this.current_f+1>=this.frames_ko.length ? 0 : this.current_f+1;
				}
			}	
		}
}	

Ship.prototype.hitTest = function(x,y){

	if(this.ko){
		return;
	}else{	
		if(this.x<x && this.x+this.fW*6>x && this.y<y && this.y+this.fH*6>y){
			
			Game.hit_ctx.clearRect(0, 0, VAR.W, VAR.H);

			Game.hit_ctx.beginPath();
			Game.hit_ctx.fillRect(this.x,this.y, this.fW*10, this.fH*10);	
			Game.hit_ctx.closePath();		
			Game.hit_ctx.fill();
		
			if(Game.hit_ctx.getImageData(x,y,1,1).data[0]==255){
				return true;
			}
		}
	}
	return false;
};

Ship.prototype.remove = function(){	
	this.ko = true;		
	Sounds.play('bum2');
	Game.stop(Game.Ship);
}

Ship.prototype.respawn = function(){
	this.x = VAR.W*0.5;
	this.y = VAR.H*0.85;
	this.ko = false;
	Game.start();
}	


