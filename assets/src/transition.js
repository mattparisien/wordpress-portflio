import MorphSVGPlugin from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

export default class Transition {
	constructor(container, morphPath, innerContent) {
		this.morphPath = morphPath;
		this.container = container;
		console.log("the path", morphPath);

		this.innerContent = innerContent;
		this.body = document.querySelector("body");

		this.config = {
			timeScale: 3,
			duration: 0.8,
		};
	}

	waveEnter = () => {
		gsap.registerPlugin(MorphSVGPlugin);

		gsap
			.timeline()
			.to(this.morphPath, {
				morphSVG:
					"M1915.23,1.56C1260.65,796.32,621.72,807.52,0,1.56V0H1915.23V1.56Z",
				duration: this.config.duration,
				ease: "power3.in",
			})

			.to(this.morphPath, {
				morphSVG:
					"M1915.23,443.18C1131.11,1022.17,727.92,987.01,0,464.28V0H1915.23V443.18Z",
				duration: this.config.duration / 3,
				ease: "linear",
			})
			.to(this.morphPath, {
				morphSVG:
					"M1915.23,806.52C1135.79,1057.8,812.31,1139.38,0,818.24V0H1915.23V806.52Z",
				duration: this.config.duration / 3,
				ease: "linear",
			})
			.to(this.morphPath, {
				morphSVG:
					"M1915.23,1080c-779.43,0-1551.82-3.52-1915.23,0V0H1915.23V1080Z",
				duration: this.config.duration,
				ease: "power3.out",
			})
			.timeScale(this.config.timeScale);
	};

	waveExit = onCompleteCallback => {
		gsap
			.timeline({ onComplete: () => onCompleteCallback() })
			.to(this.morphPath, {
				morphSVG:
					"M1915.23,1080C1199.67,350.36,410.5,538.62,0,1080V0H1915.23V1080Z",
				duration: this.config.duration,
				ease: "power3.in",
			})
			.to(this.morphPath, {
				morphSVG:
					"M1915.23,436.15C1149.86,47.03,732.61,80.63,0,447.87V0H1915.23V436.15Z",
				duration: this.config.duration / 3,
				ease: "linear",
			})
			.to(this.morphPath, {
				morphSVG: "M1915.23,1.56H0V0H1915.23V1.56Z",
				duration: this.config.duration,
				ease: "power3.out",
			})
			.timeScale(this.config.timeScale);
	};

	enterContent = () => {
		gsap.timeline().to(this.innerContent, {
			y: 0,
			opacity: 1,
			duration: 0.4,
			stagger: 0.08,
			ease: "power3.out",
			delay: 0.1,
		});
	};

	leaveContent = () => {
		gsap
			.timeline()
			.to(this.innerContent, {
				opacity: 0,
				duration: 0.6,
				ease: "power3.out",
			})
			.set(this.innerContent, { clearProps: "all" });
	};

	enter(callback) {
		callback();
		this.enterContent();
	}

	leave() {
		this.waveExit(() => $(this.container).toggleClass("hidden"));
		this.leaveContent();
	}
}
