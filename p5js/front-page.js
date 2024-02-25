const frontPage = (p) => {
	let canvasWidth;
	let canvasHeight;
	let TAU;
	let arrows = [];
	let currentColor;
	let isOverButton = false;
	let imaginaryRadius; //For a smooth change in the color of the arrows

	class Arrow {
		constructor(x, y, color, initRotation, rotationDirection) {
			this.x = x;
			this.y = y;
			this.color = color;
			this.rotation = initRotation;
			this.scale = 18;
			this.rotationDirection = 0.006 * rotationDirection;
		}

		update() {
			p.fill(p.color(this.color));

			if(isOverButton) {
				let xDiff = this.x - p.mouseX;
				let yDiff = this.y - p.mouseY;

				if(imaginaryRadius > p.abs(xDiff) + p.abs(yDiff)) {
					p.fill(p.lerpColor(p.color(this.color), p.color(currentColor), p.map(imaginaryRadius - (p.abs(xDiff) + p.abs(yDiff)), 0, 800, 0, 1)));
				}

				this.rotation = TAU/2 - p.atan2(yDiff, xDiff);
			}
			else {
				this.rotation += this.rotationDirection;
			}

			if(this.rotation > TAU){
				this.rotation = this.rotation%TAU;
			}
		}

		show() {
			p.push();

			p.translate(this.x, this.y);

			let p1 = TAU/4 + this.rotation;
			let p2 = TAU*7/8 + this.rotation;
			let p3 = TAU*3/4 + this.rotation;
			let p4 = TAU*5/8 + this.rotation;
			p.beginShape();
			p.vertex(p.sin(p1)*this.scale, p.cos(p1)*this.scale);
			p.vertex(p.sin(p2)*this.scale, p.cos(p2)*this.scale);
			p.vertex(p.sin(p3)*this.scale*0.5, p.cos(p3)*this.scale*0.5);
			p.vertex(p.sin(p4)*this.scale, p.cos(p4)*this.scale);
			p.endShape(p.CLOSE);

			p.pop();
		}
	}

	function setButtonFunctions(buttonId, color) {
		let buttonElement = p.select(buttonId);

		buttonElement.mouseOver(() => {
			isOverButton = true;
			currentColor = color;
			imaginaryRadius = 0;
		});
		buttonElement.mouseOut(() => {
			isOverButton = false;
		});
	}

	function isForbiddenArea(x, y) {
		const MARGIN = 60;

		let titleElement = p.select('h1').elt;
		let siteTitleHeight = titleElement.offsetHeight + MARGIN*2;
		let siteTitleWidth = titleElement.offsetWidth + MARGIN*2;
		let siteTitleX = -MARGIN;
		let siteTitleY = -MARGIN;

		while(titleElement !== null) {
			siteTitleX += titleElement.offsetLeft;
			siteTitleY += titleElement.offsetTop;
			titleElement = titleElement.offsetParent;
		}

		if(x >= siteTitleX && x <= (siteTitleX + siteTitleWidth)) {
			if(y >= siteTitleY && y <= (siteTitleY + siteTitleHeight)){
				return true;
			}
		}

		let aboutButtonElement = p.select('#aboutHomeButton').elt;
		let buttonsHeight = aboutButtonElement.offsetHeight + MARGIN*2;
		let buttonsWidth = aboutButtonElement.offsetWidth + MARGIN*2;
		let buttonsX = -MARGIN;
		let buttonsY = -MARGIN;

		while(aboutButtonElement !== null) {
			buttonsX += aboutButtonElement.offsetLeft;
			buttonsY += aboutButtonElement.offsetTop;
			aboutButtonElement = aboutButtonElement.offsetParent;
		}

		let lastButtonElement = p.select('#othersHomeButton').elt;

		let lastButtonX = -MARGIN;
		let lastButtonY = -MARGIN;
		while(lastButtonElement !== null) {
			lastButtonX += lastButtonElement.offsetLeft;
			lastButtonY += lastButtonElement.offsetTop;
			lastButtonElement = lastButtonElement.offsetParent;
		}

		if(x >= buttonsX && x <= (lastButtonX + buttonsWidth)) {
			if(y >= buttonsY && y <= (lastButtonY + buttonsHeight)) {
				return true;
			}
		}

		return false;
	}

	p.setup = function() {
		TAU = 2*p.PI;
		isForbiddenArea();

		let frontPageCanvas = p.select('#frontPageCanvas');
		canvasWidth = frontPageCanvas.width;
		canvasHeight = frontPageCanvas.height;
		let canvas = p.createCanvas(canvasWidth, canvasHeight);
		canvas.parent('frontPageCanvas');

		let red = '#d42a20';
		let yellow = '#fac22b';
		let blue = '#0e638e';
		let colors = [red, yellow, blue];
		for(let i = 0; i < 15; ++i) {
			let x = p.random(canvasWidth/20, canvasWidth - canvasWidth/20);
			let y = p.random(canvasHeight/10, canvasHeight - canvasHeight/10);

			while(isForbiddenArea(x, y)) {
				x = p.random(canvasWidth/20, canvasWidth - canvasWidth/20);
				y = p.random(canvasHeight/10, canvasHeight - canvasHeight/10);
			}

			let color = colors[i % 3];
			let rotationDirection = (i%2 === 0)? 1 : -1;

			let arrow = new Arrow(x, y, color, x, rotationDirection);
			arrows.push(arrow);
		}


		setButtonFunctions('#aboutHomeButton', red);
		setButtonFunctions('#projectsHomeButton', yellow);
		setButtonFunctions('#othersHomeButton', blue);

		p.noStroke();
	}

	p.draw = function () {
		p.clear();

		for(let arrow of arrows) {
			arrow.update();
			arrow.show();
		}
		if(isOverButton) {
			imaginaryRadius += 40;
		}
	}
}










