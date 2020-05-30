/*Monsters.templates = [
	[
		'1111111111',
		'22 2222222',
		'3333333333',
		'4343434343',
		'3434343434',
		'2424242424',
		'4242424242',
		'4344343344'
	],
	[
		'1111111111',
		'2222212212',
		'3313333 33',
		'4343434343',
		'3434 43434',
		'1423132424',
		'4212424 42',
		'4344343344'
	]



];
Monsters.elements = {
	'1':{sx:1, sy:3,type:'1'},
	'2':{sx:80, sy:2,type:'2'},
	'3':{sx:50, sy:2,type:'3'},
	'4':{sx:104, sy:2,type:'4'}
};
*/
function Monsters(){
	//this.b = this.parse(Monsters.templates[VAR.rand(0,Monsters.templates.length-1)]);
	this.fW = 16;
	this.fH = 10;
	
	this.frames = [0,1];
	this.frames1 = [0];
	
	this.current_f = 0;
	this.change_f_delay = 0;
	this.f_max_delay = 40;
	

}
Monsters.prototype.draw = function() {
	Game.ctx.drawImage(
				Game.spr,
				this.sx,// Dostaję się do elementu w zagnieżdżonej tablicy
				this.sy,// Dostaję się do elementu w zagnieżdżonej tablicy
				this.fW,
				this.fH,
				this.x,
				this.y,
				this.fW*VAR.scale/3,
				this.fH*VAR.scale/3
);}
	/*	
	// Rysujemy po kolei każdy rząd (czyli każdy łańcuch znaków w tablicy z wzorem planszy)
	for(var i=0; i<this.b.length; i++){
		// druga pętla sprawdza każdy znak aktualnego łańcucha znaków
		for(var j=0; j<this.b[i].length; j++){
			// Rysowanie obrazka
			this.x = j*this.fW*VAR.scale/2+Game.canvas.width/3.5;
			this.y = i*this.fH*VAR.scale/2+Game.canvas.height/8;
			Game.ctx.drawImage(
				Game.spr,
				this.b[i][j].sx,// Dostaję się do elementu w zagnieżdżonej tablicy
				this.b[i][j].sy+this.frames[this.current_f]*this.fH,// Dostaję się do elementu w zagnieżdżonej tablicy
				this.fW,
				this.fH,
				this.x,
				this.y,
				this.fW*VAR.scale/3,
				this.fH*VAR.scale/3
			);			
		}
	}
	if(this.change_f_delay<this.f_max_delay){
		this.change_f_delay++;
		
	}else{
		this.change_f_delay = 0;
		this.current_f = this.current_f+1>=this.frames.length ? 0 : this.current_f+1;
	}
	
};

Monsters.prototype.parse = function(arr){
	var new_arr = [];
	for(var i=0; i<arr.length; i++){
		// dodaję nową tablicę, która reprezentuje nowy rząd
		new_arr.push([]);
		// druga pętla sprawdza każdy znak aktualnego łańcucha znaków
		for(var j=0; j<arr[i].length; j++){
			// Zamiast łańcucha znaków przechowuję obiekty z informacją o danym polu
			new_arr[i].push(Monsters.elements[arr[i].charAt(j)==' ' ? '1' : arr[i].charAt(j)]);
		}
	}
	return new_arr;	
}

function Monster1(){
	Monsters.call(this);
	this.sx = 1;
	this.sx = 3;
	
	this.x = 10;
	this.y = 10;
	
}	

Monster1.prototype = new Monsters();
Monster1.prototype.constructor = Monster1;
Monster1.prototype.draw = function(){
}	
*/
