Bullet.all = {};

Bullet.max = 5;

Bullet.count = 0;
Bullet.active_count = 0;

Bullet.life = 45;

function Bullet(){
	if(!Game.b && !Game.success){
		if(Bullet.active_count<Bullet.max){
			Sounds.volume(0.5);
			Sounds.play('laser');
			Bullet.count++;
			Bullet.active_count++;
			
			this.id = Bullet.count.toString();
			Bullet.all [this.id] = this;
			
			this.life = 0;
			this.x = Game.Ship.x+43;
			this.y = Game.Ship.y-10;
			
			
		}	
	}
}	
Bullet.draw = function(){
	for(var b in Bullet.all){
		for(var m in Monster1.all){
			if(Monster1.all[m].hitTest(Bullet.all[b].x, Bullet.all[b].y)){
				Bullet.all[b].life += Bullet.life;
				Monster1.all[m].remove();
				break;
			}	
		}			
		if(Bullet.all[b].life>Bullet.life){
			Bullet.active_count--;
			delete Bullet.all[b];
		}else{
		Bullet.all[b].y -= 15;
		Bullet.all[b].life++;

		Game.ctx.beginPath();
		Game.ctx.fillStyle = '#7fc9fd';
		Game.ctx.fillRect(Bullet.all[b].x,Bullet.all[b].y, 4,17);
		Game.ctx.closePath();
		Game.ctx.fill();
		}
	}
};