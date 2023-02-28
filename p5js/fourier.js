const fourier = (p) => {
	class movingCircle{
		constructor(x, y, r, v){
			this.radius = r;
			this.x = x;
			this.y = y;
			this.angle = 0;
			this.velocity = v;
			this.borderX = x+r;
			this.borderY=y;

		}


		update(){
			p.angleMode(p.DEGREES);
			this.angle+= this.velocity;
			if(this.angle === 360) this.angle = 0;
			this.borderY = this.y - p.sin(this.angle)*this.radius;
			this.borderX = p.cos(this.angle)*this.radius + this.x;

		}
		show(){
			p.noFill();
			p.stroke(255);
			p.circle(this.x, this.y, this.radius*2);

			p.stroke(255);
			p.line(this.x, this.y, this.borderX, this.borderY);
		}
	}

	class waveDrawer {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		show(){
			p.fill("red");
			p.noStroke();
			p.circle(this.x, this.y, 7);

			p.stroke("red");
			p.line(this.x, this.y, 410, this.y);


			p.noStroke();
			p.circle(410, this.y, 7);
		}
	}

	let widthCanvas = 600;
	let heightCanvas = widthCanvas/2;
	let axis = widthCanvas * 0.28;
	let circles = [];
	let input;
	p.setup = function() {
		p.createCanvas(widthCanvas, heightCanvas);
		p.strokeWeight(2);

		let container = p.createElement('div');
		container.style('display', 'flex');
		container.style('align-items', 'center');
		let label = p.createElement('label', 'number of circles:');
		label.attribute('for', 'circlesFourier');
		input = p.createInput("1", 'number');
		input.input(changeCircles);
		input.id('circlesFourier');
		label.parent(container);
		input.parent(container);
		p.background(0);
		changeCircles();
	}

	function changeCircles() {
		if(input.value() > 2000) {
			input.value(2000);
		}
		circles = [];
		for(let i = 0;i < input.value(); i++) {
			let n = 1+i*2;
			let angle = (4/(n*p.PI));
			let c = new movingCircle(axis, 150, 60*angle, n);
			let d = new waveDrawer(c.x, c.y);
			circles.push( {c, d} );
		}
	}

	let wave = [];

	p.draw = function() {
		p.background(0);
		p.noFill();
		p.stroke(255);
		for(let i = 0; i < circles.length; i++) {
			circles[i].c.show();

			if(i > 0) {
				circles[i].c.x = circles[i-1].c.borderX;
				circles[i].c.y = circles[i-1].c.borderY;
			}

			if(i === circles.length-1) {
				circles[i].d.x = circles[i].c.borderX;
				circles[i].d.y = circles[i].c.borderY;


				wave.unshift(circles[i].d.y);
				if(wave.length > 390) {
					wave.pop();
				}
				p.beginShape();
				p.noFill();
				for(let i= 0; i < wave.length; i++) {
					p.stroke("red");
					p.vertex(410+i/2, wave[i]);
				}
				p.endShape();

				circles[i].d.show();
			}

			circles[i].c.update();
		}
	}
}
