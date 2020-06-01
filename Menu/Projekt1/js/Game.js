window.onload = function(){
	Game.spr = new Image();
	Game.spr.onload = Game.init();
	Game.spr.src = 'Game.png';
}	

VAR = {
	fps:60,
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	scale:1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}	

Game = {
	init:function(){
		Sounds.init();
		Game.canvas = document.createElement('canvas');
		Game.hit_canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');
		this.hit_ctx = Game.hit_canvas.getContext('2d');
		
		this.points = 0;
		Game.layout();		
		Game.toDraw = {};
		this.positionMon = VAR.rand(VAR.W*0.2, VAR.W * 0.9);
		
		//<--------------------zmień potem aby było menu--------->>
		Game.b = true;
		//
		Game.choose = 0;
		window.addEventListener('resize', Game.layout, false);
		
		document.body.appendChild(Game.canvas);
	
		Game.level = 0;
		Game.level_max = 0;
		
		var life_x = 40;
		
		for(var i=0; i<3; i++){
			life_x += 40;
			new Life(life_x);
		}
		
		this.min = 0;
		this.max = 70;
		
		Game.Ship = new Ship();
		Game.Fire = new Fire();
		
				
		
		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);
		
		Game.animationLoop();
	},
	
	stop:function(event){
		if(!Game.success && (Game.key_37 || Game.key_39)){
			return false;
		}	
		window.removeEventListener('keydown', Game.onKey, false);
		window.removeEventListener('keyup', Game.onKey, false);

	},	
	
	start:function(){
		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);
	},	
	
	onKey:function(event){
		console.log(event.keyCode);
		if(event.keyCode == 32 || event.keyCode == 37 || event.keyCode == 38 ||
		event.keyCode == 39 || event.keyCode == 13 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51
		  || event.keyCode == 97 || event.keyCode == 98 || event.keyCode == 99)
		{
			event.preventDefault();
			//
			if(event.type == 'keydown' && !Game['key_' + event.keyCode])
			{
				Game['key_' + event.keyCode] = true;
				if(event.keyCode == 37) {
					Game.key_39 = false;
				}
				else if(event.keyCode == 39) {
					Game.key_37 = false;
				}else if(event.keyCode == 32 ){
					new Bullet();
				}
			} else if(event.type=='keyup'){
				Game['key_' + event.keyCode] = false;
			}	
		}
	},

	layout:function(ev){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		//
		VAR.d = Math.min(VAR.W, VAR.H);
		//
		
		//
		VAR.scale = Math.max(1, Math.min(
			//Math.floor(VAR.W/(Game.Monsters.fW*Game.Monsters.b[0].length)),
			//Math.floor(VAR.H/(Game.Monsters.fH*Game.Monsters.b.length))
		))	
		//	
		Game.canvas.width = VAR.W;/*Math.round(VAR.scale*Game.Monsters.fW*Game.Monsters.b[0].length*1.5)*/;
		Game.canvas.height = VAR.H;/*Math.round(VAR.scale*Game.Monsters.fH*Game.Monsters.b.length*1.5)*/;
		//
		//Game.canvas.style[Modernizr.prefixed('transform')] = 'translate('+Math.round((VAR.W-Game.canvas.width)/2)+'px,'+Math.round((VAR.H-Game.canvas.height)/2)+'px)'
		//
		Game.ctx.strokeStyle = 'white';
		Game.ctx.lineWidth = 3;
		Game.ctx.lineJoin = 'round';
		
		
		Game.hit_canvas.width = VAR.W;
		Game.hit_canvas.height = VAR.H;
		Game.hit_ctx.fillStyle = 'red';
		
		Game.ctx.font = '30px Bebas Neue';
		
		Game.ctx.imageSmoothingEnabled = false;
		Game.ctx.mozImageSmoothingEnabled = false;
		Game.ctx.oImageSmoothingEnabled = false;
		Game.ctx.webkitImageSmoothingEnabled = false;
	},
	animationLoop:function(time){
		requestAnimationFrame (Game.animationLoop);
		if(time-VAR.lastTime >= 1000/VAR.fps){
			VAR.lastTime = time;
			
					
			if(Game.min<Game.max){
				Game.min++;
			}else if(Monster1.amount < Game.level && Monster1.killed < Game.level_max){
				Game.min = 0;	
				this.positionMon = VAR.rand(VAR.W*0.2, VAR.W * 0.9);
				new Monster1(this.positionMon);		
			}
			
			
					
			Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
			Game.hit_ctx.clearRect(0, 0, VAR.W, VAR.H);
			
			
			//		
			if(Game.b){
				Game.ctx.font = '40px Bebas Neue';
				Game.ctx.fillStyle = '#33ff00';
				Game.ctx.fillText("Select the game difficulty:",VAR.W*0.4,VAR.H*0.3);
				Game.ctx.font = '30px Bebas Neue';
				Game.ctx.fillText("Press '1' to choose  - easy",VAR.W*0.23,VAR.H*0.37);
				Game.ctx.fillText("Press '2' to choose - normal",VAR.W*0.4,VAR.H*0.37);
				Game.ctx.fillText("Press '3' to choose - hard",VAR.W*0.57,VAR.H*0.37);
				Game.ctx.fillText("Left arrow - move left",VAR.W*0.42,VAR.H*0.48);
				Game.ctx.fillText("Right arrow - move right",VAR.W*0.42,VAR.H*0.55);
				Game.ctx.fillText("Spacebar - shot",VAR.W*0.42,VAR.H*0.62);
				
				if((Game.key_49 || Game.key_97) && Game.b){
					Game.b = false;
					Game.level = 2;
					Game.level_max = 14;
				}
				if((Game.key_50|| Game.key_98) && Game.b){
					Game.b = false;
					Game.level = 3;
					Game.level_max = 19;
				}	
				if((Game.key_51|| Game.key_99) && Game.b){
					Game.b = false;
					Game.level = 4;
					Game.level_max = 24;
				}				
					
			}else{
			
			if(!Game.success){
				Game.ctx.fillStyle = '#33ff00';
				Game.ctx.fillText("Score :",15,50);
				Game.ctx.fillText(Game.points,90,50);
				Game.ctx.fillText("Lifes :",15,80);
			}	
			
			//
			if(!Game.success){
			for(var o in Game.toDraw){
				Game.toDraw[o].draw();
			};	}
			
			//
			if(!Game.success){
			Monster1.draw();
			Life.draw();
			Bullet.draw();		
			LaserMonster.draw();
			}
			//
			
			if(Game.success){
				Game.ctx.font = '50px Bebas Neue';
				Game.ctx.fillStyle = '#33ff00';
				Game.ctx.fillText("Your score:",VAR.W*0.45,VAR.H*0.2);
				Game.ctx.fillText(Game.points,VAR.W*0.47,VAR.H*0.27);
				Game.ctx.font = '35px Bebas Neue';
				Game.ctx.fillText("Press F5 to restart",VAR.W*0.43,VAR.H*0.4);
			}	
			}			
		}	
	}	
};	
