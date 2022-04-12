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
			this.isMenuActive = this.menu.hasClass("is-active");
			this.isButtonVisible = false;
			this.scrollPos = $(window).scrollTop();

			this.config = {
				timeScale: 3,
				duration: 0.8,
			};

			this.listenForClick();
			this.listenForScroll();
		}

		listenForScroll = () => {
			window.addEventListener("scroll", () => {
				this.scrollPos = $(window).scrollTop();

				if (!this.isMenuActive) {
					if (this.scrollPos > 190 && !this.isButtonVisible) {
						console.log("this should get called!");
						gsap.to(this.circ, {
							scale: 1,
							duration: 0.5,
							ease: "power3.out",
						});
						gsap.to(burger, {
							opacity: 1,
							duration: 0.2,
						});
						this.isButtonVisible = true;
					} else if (this.scrollPos < 190 && this.isButtonVisible) {
						gsap.to(this.circ, {
							scale: 0,
							duration: 0.5,
							ease: "power3.out",
						});
						gsap.to(this.burger, {
							opacity: 0,
							duration: 0.2,
						});
						this.isButtonVisible = false;
					}
				}
			});
		};

		listenForClick = () => {
			button.on("click", () => {
				this.menu
					.toggleClass("translate-x-full")
					.toggleClass("shadow-2xl is-active");
				this.lines.toggleClass("bg-white").toggleClass("bg-black");
				this.circ.toggleClass("bg-black").toggleClass("bg-white");

				//Rotate lines
				$(this.lines[0]).css({
					transform: "rotate(45deg)",
				});
				$(this.lines[1]).css({
					transform: "rotate(-45deg)",
				});

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

		enterContent = () => {
			gsap.timeline().to(this.navItems, {
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
				.to(this.navItems, {
					opacity: 0,
					duration: 0.6,
					ease: "power3.out",
				})
				.set(this.navItems, { clearProps: "all" });
		};

		enter(callback) {
			this.menu.removeClass("hidden");

			callback();
			this.enterContent();
		}

		leave(callback) {
			callback(() => menu.addClass("hidden"));
			this.leaveContent();
		}
	}

	new Menu();
};

export default listenForMenuActions;
