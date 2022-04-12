export default class Magnetic {
	constructor(target, strength) {
		this.target = target;
		this.strength = strength;
		this.active = false;
		this.rect = {
			top: target.getBoundingClientRect().top,
			left: target.getBoundingClientRect().left,
			width: target.getBoundingClientRect().width,
		};
		this.mouse = {
			x: 0,
			y: 0,
		};

		this.enter();
		this.leave();
		this.moveMouse();
		this.moveTarget();
	}

	enter() {
		console.log(this)
		this.target.addEventListener("mouseenter", () => {
			console.log("hello!!!");
			this.active = true;
		});
	}

	leave() {
		this.target.addEventListener("mouseleave", () => {
			this.active = false;
		});
	}

	moveMouse() {
		this.target.addEventListener("mousemove", e => {
			const { left, top, width, height } = this.target.getBoundingClientRect();

			this.mouse.x = e.pageX;
			this.mouse.y = e.pageY;

			this.rect.top = top;
			this.rect.left = left;
			this.rect.width = width;
			this.rect.height = height;

			this.moveTarget();
		});
	}

	moveTarget() {
		const x = this.mouse.x - this.rect.left - this.rect.width / 2;
		const y = this.mouse.y - this.rect.top - this.rect.height / 2;

		this.target.style.transform = `translate(${x}px, ${y}px)`
	}
}
