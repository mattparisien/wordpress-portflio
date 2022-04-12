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

		this.init();
	}

	handleMouseMove(e, mousePos) {
		mousePos.x = e.pageX;
		mousePos.y = e.pageY;
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

		return isHover;
	}

	run() {
		window.webkitRequestAnimationFrame(() => this.run());

		this.transform.x = this.isMagnetic
			? ((this.mousePos.x - this.width / 2) / this.width) & this.transform.max
			: 0;
		this.transform.y = this.isMagnetic
			? this.mousePos.y - (this.height / 2 / this.height) * this.transform.max
			: 0;
		this.transform.scale = this.isMagnetic ? this.scale : 1;

		//Lerp
		this.easing.x += (this.transform.x - this.easing.x) * this.easing.value;
		this.easing.y += (this.transform.y - this.easing.y) * this.easing.value;
		this.easing.scale +=
			(this.transform.scale - this.easing.scale) * this.easing.value;

		this.target.style.transform = `translate(${this.easing.x.toFixed(
			2
		)}px, ${this.easing.y.toFixed(
			2
		)}px)translateZ(0)scale(${this.easing.scale.toFixed(2)})`;
	}

	init() {
		document.addEventListener("mousemove", e => {
			this.handleMouseMove(e, this.mousePos);
		});
		window.addEventListener("resize", this.handleResize);
		this.run();
	}
}
