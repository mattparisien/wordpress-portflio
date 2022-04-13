export default class MagneticItem {
	constructor(container, target) {
		this.container = container;
		this.target = target;
		this.bounds = this.container.getBoundingClientRect();
		this.strength = parseInt(this.container.dataset.strength);
		this.listenForEnter();
		this.listenForLeave();
		this.listenForMouseMove();
	}

	listenForEnter() {
		console.log(this.strength);

		this.target.addEventListener("mouseenter", () => {
			console.log("entered!");
		});
	}

	listenForLeave() {
		this.target.addEventListener("mouseleave", () => {
			console.log("entered!");
		});
	}

	listenForMouseMove() {
		this.target.addEventListener("mousemove", e => {
			this.callMagnetic(e);
		});
	}

	callMagnetic(e) {
		this.makeMagnetic(e, this.target, this.strength);
	}

	makeMagnetic(e, target, strength) {
		const { left, top, width, height } = this.bounds;

		const relX = e.pageX - left;
		const relY = e.pageY - top;

		gsap.to(target, {
			x: ((relX - width / 2) / width) * strength,
			y: ((relY - height / 2) / height) * strength,
			ease: "power3.out",
		});
	}
}
