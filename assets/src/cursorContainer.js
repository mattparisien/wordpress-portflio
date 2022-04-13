import { lerp } from "./utils/lerp";
import * as THREE from "three";
import imageOne from "../images/1.jpg";
import imageTwo from "../images/2.jpeg";
import imageThree from "../images/3.jpeg";
import imageFour from "../images/4.jpeg";
import imageFive from "../images/5.jpeg";
import imageSix from "../images/6.jpeg";

const textures = {};

const images = [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix];

images.forEach(
	(image, i) =>
		(textures[`texture${i + 1}`] = new THREE.TextureLoader().load(image))
);

export default class WebGl {
	constructor(container, links, linksContainer) {
		this.container = container;
		this.links = links;
		this.linksContainer = linksContainer;
		this.linksHover = false;
		this.target = target;
		this.scene = new THREE.Scene();
		this.perspective = 1000; //Cam perspective
		this.sizes = new THREE.Vector2(0, 0); //Mesh size
		this.offset = new Vector2(0, 0); //Mesh pos
		this.uniforms = {
			uTexture: { value: textures.texture1 },
			uAlpha: { value: 0.0 },
			uOffset: { value: new THREE.Vector2(0.0, 0.0) },
		};
		this.links.forEach((link, i) => {
			link.addEventListener("mouseenter", () => {
				switch (i) {
					case 0:
						this.uniforms.uTexture.value = textures.texture1;
						break;
					case 2:
						this.uniforms.uTexture.value = textures.texture2;
						break;
					case 3:
						this.uniforms.uTexture.value = textures.texture3;
						break;
					case 4:
						this.uniforms.uTexture.value = textures.texture4;
						break;
					case 5:
						this.uniforms.uTexture.value = textures.texture5;
						break;
					case 6:
						this.uniforms.uTexture.value = textures.texture6;
						break;
				}
			});
		});
		this.addEventListeners(this.linksContainer);
		this.setupCamera();
	}

	get viewport() {
		let width = window.innerWidth;
		let height = window.innerHeight;
		let aspectRatio = width / height;

		return {
			width,
			height,
			aspectRatio,
		};
	}

	setupCamera() {
		let fov =
			(180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
			Math.PI;
	}

	addEventListeners(el) {
		el.addEventListener("mouseenter", () => {
			this.linksHover = true;
		});
		el.addEventListener("mouseleave", () => {
			this.linksHover = false;
		});
	}
}
