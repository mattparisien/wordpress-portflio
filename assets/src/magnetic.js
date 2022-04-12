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
		};
	}
}
