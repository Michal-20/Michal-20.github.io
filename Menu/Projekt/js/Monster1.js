Monster1.count = 0;
Monster1.all = {};

var timee = 0;
var shot = VAR.rand(40,180);

function Monster1 (x, y){
		Monster1.count++;
		
		this.id = Monster1.count;
		
		Monster1.all[this.id] = this;
		//
		this.fW = 16;
		this.fH = 10;
		//
		this.start_x = 1;
		this.start_y = 3;
		//
		this.x = x;
		this.y = y;		
		this.forward = true;
		//
		this.frames = [0,1];
		this.frames_ko = [0,1,2];
		//
		this.x_ko = 0;
		this.y_ko = 24;
		//
		this.current_f = 0;
		this.change_f_delay = 0;
		this.f_max_delay = 40;
		this.f_max_delay_ko = 6;
		
		this.ko = false;
}	

Monster1.prototype.draw = function(){
		
		if(!this.ko){
			Game.ctx.drawImage(
			Game.spr,
			this.start_x,
			this.start_y + this.frames[this.current_f]*this.fH,
			this.fW,
			this.fH,
			this.x,
			this.y,
			this.fW*3,
			this.fH*3
		);}else if(this.ko){
			Game.ctx.drawImage(
			Game.spr,
			this.x_ko,
			this.y_ko + this.frames_ko[this.current_f]*8,
			this.fW,
			this.fH,
			this.x,
			this.y,
			this.fW*3,
			this.fH*3
			
		);}	
				
		if(this.forward  && this.x > 1800){
			this.forward = false;
		}else if(!this.forward  && this.x < 50){
			this.forward = true;
		}
			
		this.x += this.forward ? 3 : -3;
		
		if(!Game.Ship.ko){
			if(timee<shot){
				timee++;
			}else{
				timee = 0;	
				shot = VAR.rand(40,180);			
				new LaserMonster(this.x, this.y);
			}
		}
		
		
			if(!this.ko){
				if(this.change_f_delay<this.f_max_delay){
					this.change_f_delay++;		
				}else{
					this.change_f_delay = 0;
					this.current_f = this.current_f+1>=this.frames.length ? 0 : this.current_f+1;
				}	
			}else if(this.ko){
				if(this.change_f_delay<this.f_max_delay_ko){
					this.change_f_delay++;		
				}else{
					this.change_f_delay = 0;
					if(this.current_f == this.frames_ko.length-1 ){
						Game.points += 100;
						Sounds.play('kill');
						delete Monster1.all[this.id];
					}else{	
					this.current_f = this.current_f+1>=this.frames_ko.length ? 0 : this.current_f+1;
					}
				}	
			}
		
};

Monster1.prototype.hitTest = function(x,y){

	if(this.x<x && this.x+this.fW*4>x && this.y<y && this.y+this.fH*4>y){
		
		Game.hit_ctx.clearRect(0, 0, VAR.W, VAR.H);

		Game.hit_ctx.beginPath();
		Game.hit_ctx.fillRect(this.x+1,this.y, this.fW*2.8,this.fH*2.9);	
		Game.hit_ctx.closePath();		
		Game.hit_ctx.fill();
	
		if(Game.hit_ctx.getImageData(x,y,1,1).data[0]==255){
			return true;
		}
	}
	return false;
};

Monster1.prototype.remove = function(){	

	this.ko = true;	
}

	
Monster1.draw = function(){

	Monster1.num = 0;
	for(var r in Monster1.all){
		Monster1.num++;
		Monster1.all[r].draw();
	}	
	if(Monster1.num===0 && !Game.success){
		Game.success = true;
		Sounds.play('win');
	}
	
}		

LaserMonster.all = {};

LaserMonster.max = 6;

LaserMonster.count = 0;
LaserMonster.active_count = 0;

LaserMonster.life = 70;


function LaserMonster(x, y){
	if(LaserMonster.active_count<LaserMonster.max){
		LaserMonster.count++;
		LaserMonster.active_count++;
		
		this.id = LaserMonster.count.toString();
		LaserMonster.all [this.id] = this;
		
		this.life = 0;
		
		this.x = x+22;
		this.y = y+4;	
	}	
}	
LaserMonster.draw = function(){
	for(var b in LaserMonster.all){
		if(Game.Ship.hitTest(LaserMonster.all[b].x, LaserMonster.all[b].y)){
			LaserMonster.all[b].life += LaserMonster.life;
			Game.Ship.remove();
			break;
		}
		
		if(Game.Ship.ko){
			LaserMonster.all[b].life += LaserMonster.life;
		}
		
		if(LaserMonster.all[b].life>LaserMonster.life){
			LaserMonster.active_count--;
			delete LaserMonster.all[b];
		}else{	
		LaserMonster.all[b].life++;
		LaserMonster.all[b].y += 10;

		Game.ctx.beginPath();
		Game.ctx.fillStyle = 'red';
		Game.ctx.fillRect(LaserMonster.all[b].x,LaserMonster.all[b].y, 4,17);
		Game.ctx.closePath();
		Game.ctx.fill();
		
		}
	}
};
