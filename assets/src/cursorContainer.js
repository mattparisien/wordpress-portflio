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

const textures = {};

const images = [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix];

images.forEach(
	(image, i) =>
		(textures[`texture${i + 1}`] = new THREE.TextureLoader().load(image))
);

let targetX = 0;
let targetY = 0;

export default class WebGl {
	constructor(container, links, linksContainer) {
		this.container = container;
		this.links = links;
		this.linksContainer = linksContainer;
		this.linksHover = false;
		this.scene = new THREE.Scene();
		this.perspective = 1000; //Cam perspective
		this.sizes = new THREE.Vector2(0, 0); //Mesh size
		this.offset = new THREE.Vector2(0, 0); //Mesh pos
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
		this.onMouseMove();
		this.createMesh();
		this.render();
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
		window.addEventListener("resize", this.onWindowResize.bind(this));

		let fov =
			(180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
			Math.PI;

		this.camera = new THREE.PerspectiveCamera(
			fov,
			this.viewport.aspectRatio,
			0.1,
			1000
		);
		this.camera.position.set(0, 0, this.perspective);

		//Renderer
		this.renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true });
		this.renderer.setSize(this.viewport.width, this.viewport.height);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.container.appendChild(this.renderer.domElement);
	}

	onWindowResize() {
		this.camera.aspect = this.viewport.aspectRatio;
		this.camera.fov =
			(180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
			Math.PI;
		this.renderer.setSize(this.viewport.width, this.viewport.height);
		this.camera.updateProjectionMatrix();
	}

	addEventListeners(el) {
		el.addEventListener("mouseenter", () => {
			this.linksHover = true;
		});
		el.addEventListener("mouseleave", () => {
			this.linksHover = false;
		});
	}

	onMouseMove() {
		window.addEventListener("mousemove", e => {
			targetX = e.clientX;
			targetY = e.clientY;
		});
	}

	createMesh() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: vertex,
			fragmentShader: fragment,
			transparent: true
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.sizes.set(250, 350);
		this.mesh.scale.set(this.sizes.x, this.sizes.y);
		this.mesh.position.set(this.offset.x, this.offset.y);
		this.scene.add(this.mesh);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.render.bind(this));
	}
}
