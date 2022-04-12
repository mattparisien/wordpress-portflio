import anime from "animejs";
import MorphSVGPlugin from "gsap/src/MorphSVGPlugin";

const body = $("html");
const menu = $(".site-menu");
const button = $(".menu-button");
const circ = button.find(".circle");
const burger = button.find(".burger");
const lines = $(burger).find("span");
const menuActive = menu.hasClass("is-active");
const morphPath = menu.find(".morph-path");

const listenForMenuActions = () => {
	let hasScaled = false;

	//Listen for scroll to reveal menu button
	window.addEventListener("scroll", () => {
		const scrollbar = $(window).scrollTop();

		if (!menuActive) {
			if (scrollbar > 190 && !hasScaled) {
				gsap.to(circ, {
					scale: 1,
					duration: 0.5,
					ease: "power3.out",
				});
				gsap.to(burger, {
					opacity: 1,
					duration: 0.2,
				});
				hasScaled = true;
			} else if (scrollbar < 190 && hasScaled) {
				gsap.to(circ, {
					scale: 0,
					duration: 0.5,
					ease: "power3.out",
				});
				gsap.to(burger, {
					opacity: 0,
					duration: 0.2,
				});
				hasScaled = false;
			}
		}
	});

	class Menu {
		constructor() {
			this.menu = menu;
			this.button = button;
			this.navItems = menu.find("ul li");
			this.burger = burger;
			this.lines = lines;
			this.circ = circ;
			this.morphPath = document.querySelector(".morph-path");
			this.body = document.querySelector("body");

			this.config = {
				timeScale: 2,
				duration: 0.8,
			};

			this.listenForClick();
		}

		listenForClick = () => {
			button.on("click", () => {
				this.menu
					.toggleClass("translate-x-full")
					.toggleClass("shadow-2xl is-active");
				this.lines.toggleClass("bg-white").toggleClass("bg-black");
				this.circ.toggleClass("bg-black").toggleClass("bg-white");

				if (this.menu.hasClass("is-active")) {
					this.enter(this.waveEnter);
				} else {
					this.leave(this.waveExit);
				}
			});
		};

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

		enter(callback) {
			this.menu.removeClass("hidden");

			callback();
		}

		leave(callback) {
			callback(() => menu.addClass("hidden"));
		}
	}

	new Menu();

	// 	button.on("click", () => {
	// 		menu.toggleClass("translate-x-full").toggleClass("shadow-2xl is-active");
	// 		lines.toggleClass("bg-white").toggleClass("bg-black");
	// 		circ.toggleClass("bg-black").toggleClass("bg-white");
	// 		body.toggleClass("overflow-hidden");

	// 		if (menu.hasClass("is-active")) {
	// 			menuActions.enter();
	// 		} else {
	// 			menuActions.leave();
	// 		}
	// 	});

	// 	//
	// };

	// const waveEnter = () => {
	// 	gsap.registerPlugin(MorphSVGPlugin);

	// 	gsap
	// 		.timeline()
	// 		.to(morphPath, {
	// 			morphSVG:
	// 				"M1915.23,1.56C1260.65,796.32,621.72,807.52,0,1.56V0H1915.23V1.56Z",
	// 			duration: 0.8,
	// 			ease: "power3.in",
	// 		})

	// 		.to(morphPath, {
	// 			morphSVG:
	// 				"M1915.23,443.18C1131.11,1022.17,727.92,987.01,0,464.28V0H1915.23V443.18Z",
	// 			duration: 0.1,
	// 			ease: "linear",
	// 		})
	// 		.to(morphPath, {
	// 			morphSVG:
	// 				"M1915.23,806.52C1135.79,1057.8,812.31,1139.38,0,818.24V0H1915.23V806.52Z",
	// 			duration: 0.1,
	// 			ease: "linear",
	// 		})
	// 		.to(morphPath, {
	// 			morphSVG:
	// 				"M1915.23,1080c-779.43,0-1551.82-3.52-1915.23,0V0H1915.23V1080Z",
	// 			duration: 0.8,
	// 			ease: "power3.out",
	// 		})
	// 		.timeScale(2);
	// };

	// const waveExit = object => {
	// 	gsap
	// 		.timeline({ onComplete: () => object.onComplete() })
	// 		.to(morphPath, {
	// 			morphSVG:
	// 				"M1915.23,1080C1199.67,350.36,410.5,538.62,0,1080V0H1915.23V1080Z",
	// 			duration: 0.8,
	// 			ease: "power3.in",
	// 		})
	// 		.to(morphPath, {
	// 			morphSVG:
	// 				"M1915.23,436.15C1149.86,47.03,732.61,80.63,0,447.87V0H1915.23V436.15Z",
	// 			duration: 0.2,
	// 			ease: "linear",
	// 		})
	// 		.to(morphPath, {
	// 			morphSVG: "M1915.23,1.56H0V0H1915.23V1.56Z",
	// 			duration: 0.8,
	// 			ease: "power3.out",
	// 		})
	// 		.timeScale(2);
	// };

	// const waveAnimations = {
	// 	enter: waveEnter,
	// 	exit: waveExit,
	// };

	// const enter = callback => {
	// 	menu.removeClass("hidden");
	// 	callback();
	// };

	// const leave = callback => {
	// 	callback({ onComplete: () => menu.addClass("hidden") });
	// };

	// const menuActions = {
	// 	enter: () => enter(waveAnimations.enter),
	// 	leave: () => leave(waveAnimations.exit),
};

export default listenForMenuActions;
