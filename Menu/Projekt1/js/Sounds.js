Sounds = {
	active:false,
	init:function(){
		Sounds.fx = new Howl({
			urls:['audio1/Gamesok.'+(Modernizr.audio.wav ? 'wav' : 'ogg')],
			sprite: {
				bum1:[0,1100],
				bum2:[1125,1000],
				kill:[2150,290],
				win:[2475,575],
				thrust:[3100,290],
				laser:[3500,250],
			},
			onload:Sounds.loaded
		});
		

	},
	
	loaded:function(){
		Sounds.active = true;
	},
	
	play:function(s){
		if(Sounds.active){
			Sounds.fx.play(s);
		}
	},
	volume:function(s){
		Sounds.fx.volume(s);
	},	
};
