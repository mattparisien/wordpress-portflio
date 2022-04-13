import { lerp } from "./utils/lerp";
import * as THREE from "three";
import imageOne from "../images/1.jpg";
import imageTwo from "../images/2.jpeg";
import imageThree from "../images/3.jpeg";
import imageFour from "../images/4.jpeg";
import imageFive from "../images/5.jpeg";
import imageSix from "../images/6.jpeg";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import gsapCore from "gsap/gsap-core";
import loadImages from "./utils/loadImages";
import { ShapeGeometry } from "three";

// const textures = {};

const images = [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix];

let targetX = 0;
let targetY = 0;

//Preload images
// const loadedImages = loadImages(images);

// export default class WebGl {
// 	constructor(container, links, linksContainer) {
// 		this.container = container;
// 		this.links = links;
// 		this.linksContainer = linksContainer;
// 		this.linksHover = false;
// 		this.scene = new THREE.Scene();
// 		this.perspective = 1000; //Cam perspective
// 		this.sizes = new THREE.Vector2(0, 0); //Mesh size
// 		this.offset = new THREE.Vector2(0, 0); //Mesh pos
// 		this.uniforms = {
// 			uTexture: { value: new THREE.TextureLoader().load(imageOne) },
// 			uAlpha: { value: 0.0 },
// 			uOffset: { value: new THREE.Vector2(0.0, 0.0) },
// 		};
// 		this.links.forEach((link, i) => {
// 			link.addEventListener("mouseenter", () => {
// 				switch (i) {
// 					case 0:
// 						this.uniforms.uTexture.value = textures.texture1;
// 						break;
// 					case 2:
// 						this.uniforms.uTexture.value = textures.texture2;
// 						break;
// 					case 3:
// 						this.uniforms.uTexture.value = textures.texture3;
// 						break;
// 					case 4:
// 						this.uniforms.uTexture.value = textures.texture4;
// 						break;
// 					case 5:
// 						this.uniforms.uTexture.value = textures.texture5;
// 						break;
// 					case 6:
// 						this.uniforms.uTexture.value = textures.texture6;
// 						break;
// 				}
// 			});
// 		});
// 		this.addEventListeners(this.linksContainer);
// 		this.setupCamera();
// 		this.onMouseMove();
// 		this.createMesh();
// 		this.render();
// 	}

// 	get viewport() {
// 		let width = window.innerWidth;
// 		let height = window.innerHeight;
// 		let aspectRatio = width / height;

// 		return {
// 			width,
// 			height,
// 			aspectRatio,
// 		};
// 	}

// 	setupCamera() {
// 		window.addEventListener("resize", this.onWindowResize.bind(this));

// 		let fov =
// 			(180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
// 			Math.PI;

// 		this.camera = new THREE.PerspectiveCamera(
// 			fov,
// 			this.viewport.aspectRatio,
// 			0.1,
// 			1000
// 		);
// 		this.camera.position.set(0, 0, this.perspective);

// 		//Renderer
// 		this.renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true });
// 		this.renderer.setSize(this.viewport.width, this.viewport.height);
// 		this.renderer.setPixelRatio(window.devicePixelRatio);
// 		this.container.appendChild(this.renderer.domElement);
// 	}

// 	onWindowResize() {
// 		this.camera.aspect = this.viewport.aspectRatio;
// 		this.camera.fov =
// 			(180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
// 			Math.PI;
// 		this.renderer.setSize(this.viewport.width, this.viewport.height);
// 		this.camera.updateProjectionMatrix();
// 	}

// 	addEventListeners(el) {
// 		el.addEventListener("mouseenter", () => {
// 			this.linksHover = true;
// 		});
// 		el.addEventListener("mouseleave", () => {
// 			this.linksHover = false;
// 		});
// 	}

// 	onMouseMove() {
// 		window.addEventListener("mousemove", e => {
// 			targetX = e.clientX - this.container.getBoundingClientRect().width / 2;
// 			targetY = e.clientY - this.container.getBoundingClientRect().height / 2;
// 		});
// 	}

// 	createMesh() {
// 		this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
// 		this.material = new THREE.ShaderMaterial({
// 			uniforms: this.uniforms,
// 			vertexShader: vertex,
// 			fragmentShader: fragment,
// 			transparent: true,
// 		});
// 		this.mesh = new THREE.Mesh(this.geometry, this.material);
// 		this.sizes.set(250, 350, 1);
// 		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
// 		this.mesh.position.set(this.offset.x, this.offset.y, 0);
// 		this.scene.add(this.mesh);
// 	}

// 	render() {
// 		this.offset.X = lerp(this.offset.x, targetX, 0.1);
// 		this.offset.Y = lerp(this.offset.y, targetY, 0.1);

// 		this.uniforms.uOffset.value.set(
// 			(targetX - this.offset.x) * 0.0005,
// 			-(targetY - this.offset.y) * 0.0005
// 		);

// 		// this.mesh.position.set(this.offset.x - (this.container.getBoundingClientRect().width / 2), - this.offset.y + (this.container.getBoundingClientRect().height / 2), 0);

// 		this.renderer.render(this.scene, this.camera);
// 		requestAnimationFrame(this.render.bind(this));
// 	}
// }

//Preload cursor images
// const images = [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix];

export default class Cursor {
	constructor(element, inner, triggerContainer, links) {
		this.triggerContainer = triggerContainer;
		this.inner = inner;
		this.element = element;
		this.links = links;
		this.elWidth = this.cursorBounds.width;
		this.elHeight = this.cursorBounds.height;
		this.currentHovered = this.links[0];
		this.appendListItems();
		this.moveMouse();
		this.moveCursor();
		this.addEventListeners(this.triggerContainer, this.links);
	}

	moveMouse() {
		window.addEventListener("mousemove", e => {
			targetX = e.clientX - this.elWidth / 2;
			targetY = e.clientY - this.elHeight / 2;
		});
	}

	moveCursor() {
		const x = lerp(this.element.getBoundingClientRect().left, targetX, 0.1);
		const y = lerp(this.element.getBoundingClientRect().top, targetY, 0.1);

		this.element.style.transform = `translate(${x}px, ${y}px)`;
		requestAnimationFrame(this.moveCursor.bind(this));
	}

	addEventListeners(container, links) {
		container.addEventListener("mouseenter", () => {
			this.changeCursor();
		});

		container.addEventListener("mouseleave", () => {
			this.revertCursor();
		});

		links.forEach((link, idx) => {
			link.addEventListener("mouseenter", e => {
				console.log("current hovered", this.currentHovered);

				if (this.currentHovered !== e.target) {
					// const index = this.links.indexOf(this.currentLink);
					const currentIndex = this.links.indexOf(e.target);
					const prevIndex = this.links.indexOf(this.currentHovered);

					const nextItem = this.projectItems[currentIndex];
					const prevItem = this.projectItems[prevIndex];
					this.switchProjectItems(prevItem, nextItem);

					this.currentHovered = e.target;
				}
			});

			link.addEventListener("mouseleave", () => {
				$(this.projectItems[idx]).addClass("-translate-y-full");
			});
		});
	}

	changeCursor() {
		gsap.set(this.element, { borderRadius: 0 });
		this.inner.classList.remove("opacity-0");

		gsap.to(this.element, {
			width: 600,
			height: 450,
			ease: "power3.out",
			duration: 0.5,
			onUpdate: () => {
				this.elWidth = this.cursorBounds.width;
				this.elHeight = this.cursorBounds.height;
			},
		});
	}

	revertCursor() {
		gsap.to(this.element, {
			width: "1.25rem",
			height: "1.25rem",
			ease: "power3.out",
			duration: 0.5,
			onUpdate: () => {
				this.elWidth = this.cursorBounds.width;
				this.elHeight = this.cursorBounds.height;
			},
		});
		gsap.set(this.element, { borderRadius: "50%" });
		this.inner.classList.add("opacity-0");
	}

	appendListItems() {
		const ul = $(this.element).find("ul");

		images.forEach((image, idx) => {
			const imageItem = document.createElement("li");
			imageItem.style.backgroundImage = `url(${image})`;

			imageItem.classList.add(
				"bg-cover",
				"bg-center",
				"w-full",
				"h-full",
				"absolute",
				"top-0",
				"left-0",
				"will-change-transform"
			);

			idx !== 0 && imageItem.classList.add("-translate-y-full");
			console.log(ul);
			$(ul).append(imageItem);
		});

		this.projectItems = $(ul).find("li");
	}

	switchProjectItems(prev, next) {
		gsap
			.timeline()
			.to(prev, {
				y: "100%",
				duration: 0.5,
				ease: "power3.out",
			})
			.to(
				next,
				{
					y: 0,
					duration: 0.5,
					ease: "power3.out",
				},
				0
			)
			.set(prev, {
				y: "-100%",
			});
	}

	get cursorBounds() {
		const { top, left, width, height } = this.element.getBoundingClientRect();

		return {
			top,
			left,
			width,
			height,
		};
	}
}

const cursor = document.querySelector(".cursor");
const cursorInner = document.querySelector(".cursor .cursor_inner");
const container = document.querySelector(".work-container ul");
const links = Array.from(document.querySelectorAll(".work-container li"));
new Cursor(cursor, cursorInner, container, links);
