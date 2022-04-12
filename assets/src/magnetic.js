export default class MagneticItem {
	constructor(target) {
		this.target = target;
		this.bounds = this.target.getBoundingClientRect();
		this.threshold = parseInt(this.target.getAttribute("data-threshold"));
		this.ratio = parseInt(this.target.getAttribute("data-ratio"));
		this.isMagnetic = false;
		this.mousePos = {
			x: 0,
			y: 0,
		};
		this.easing = {
			x: 0,
			y: 0,
			scale: 1,
			value: this.target.getAttribute("data-easing"),
		};
		this.transform = {
			x: 0,
			y: 0,
			scale: 1,
			max: this.target.getAttribute("data-max"),
		};
		this.window = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		(this.history = false),
			(this.scale = this.target.getAttribute("data-scale"));
	}

	handleMouseMove(e) {
		(this.mousePos.x = e.pageX), (this.mousePos.y = e.pageY);
	}

	handleResize(e) {
		this.bounds = this.target.getBoundingClientRect();
		this.window.width = window.innerWidth;
		this.window.height = window.innerHeight;
	}

	makeMagnetic(x, y) {
		const centerX = this.bounds.left + this.bounds.width / 2;
		const centerY = this.bounds.top + this.bounds.height / 2;

		const a = Math.abs(centerX - x);
		const b = Math.abs(centerY - y);
		const c = Math.sqrt(a * a + b * b);

		const isHover = c < this.bounds.width / 2 + this.threshold;

		if (!this.history && isHover) {
			this.target.classList.add("is-hover");
			this.threshold = this.threshold * this.ratio;
			this.history = true;
		} else if (this.history && !isHover) {
			this.target.classList.remove("is-hover");
			this.threshold = this.threshold / this.ratio;
			this.history = false;
		}
	}
}
