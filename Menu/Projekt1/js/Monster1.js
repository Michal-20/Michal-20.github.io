Monster1.count = 0;
Monster1.amount = 0;
Monster1.killed = 0;
Monster1.active = 0;

Monster1.all = {};

var timee = 0;
var shot = VAR.rand(40,180);

function Monster1 (x){
		Monster1.count++;
		Monster1.amount ++;
		this.kind = VAR.rand(0,4);
		this.id = Monster1.count;
		
		Monster1.all[this.id] = this;
		//
		this.fW = 16;
		this.fH = 9;
		this.scale = 4;
		//
		this.start_x =  1;
		this.start_y =  3;
		//
		this.x = x;
		this.y = -20;
		//
		this.x_2 = 0;
		this.y_2 = 0;
		//
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
	
		if(this.kind == 1){
			this.fW = 16;
			this.fH = 9;
			this.scale = 4;
			//
			this.start_x = 1;
			this.start_y = 3;
		}else if(this.kind == 2){
			this.fW = 14;
			this.fH = 9;
			this.scale = 5;
			//
			this.start_x = 51;
			this.start_y = 2;
		}else if(this.kind == 3){
			this.fW = 15;
			this.fH = 9;
			this.scale = 6;
			//
			this.start_x = 106;
			this.start_y = 2;
		}else if(this.kind == 4){
			this.fW = 16;
			this.fH = 9;
			this.scale = 5;
			//
			this.start_x = 81;
			this.start_y = 2;
		}
		
		if(!this.ko){
			Game.ctx.drawImage(
			Game.spr,
			this.start_x,
			this.start_y + this.frames[this.current_f]*this.fH,
			this.fW,
			this.fH,
			this.x,
			this.y,
			this.fW*this.scale,
			this.fH*this.scale
		);}else if(this.ko){
			Game.ctx.drawImage(
			Game.spr,
			this.x_ko,
			this.y_ko + this.frames_ko[this.current_f]*8,
			this.fW,
			this.fH,
			this.x,
			this.y,
			this.fW*4,
			this.fH*4
			
		);}	
				
			
		this.y += 2.5;
		
		
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
						Sounds.volume(0.5);
						Sounds.play('kill');
						delete Monster1.all[this.id];
						Monster1.killed ++;
						Monster1.amount --;
					}else{	
					this.current_f = this.current_f+1>=this.frames_ko.length ? 0 : this.current_f+1;
					}
				}	
			}
			
		if(this.y > VAR.H*0.95){
			Life.all[Life.count].remove();
			delete Monster1.all[this.id];
			Monster1.killed ++;
			Monster1.amount --;
			Game.points -= 200;
		}	
		
};

Monster1.prototype.hitTest = function(x,y){

	if(this.x<x && this.x+this.fW*4>x && this.y<y && this.y+this.fH*4>y){
		
		Game.hit_ctx.clearRect(0, 0, VAR.W, VAR.H);

		Game.hit_ctx.beginPath();
		Game.hit_ctx.fillRect(this.x,this.y, this.fW*4,this.fH*4);	
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
	for(var m in Monster1.all){
		if(Game.Ship.hitTest(Monster1.all[m].x + Monster1.all[m].fW*2, Monster1.all[m].y + Monster1.all[m].fH*2)){
			delete Monster1.all[m];	
			Game.Ship.remove();
			Monster1.killed ++;
			Monster1.amount --;
			break;
		}
	}	
	
		

	Monster1.num = 0;
	for(var r in Monster1.all){
		Monster1.num++;
		Monster1.all[r].draw();
	}	
	if(Monster1.killed===20 && !Game.success && Game.level ==3){
		Game.success = true;
		Sounds.play('win');
	}
	if(Monster1.killed===15 && !Game.success && Game.level ==2){
		Game.success = true;
		Sounds.play('win');
	}
	if(Monster1.killed===25 && !Game.success && Game.level ==4){
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
