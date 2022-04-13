import "./main.css";
import listenForMenuActions from "./menu";
import Magnetic from "./magnetic";
import { toggleHeader } from "./header";
import MagneticItem from "./magnetic";
import WebGl from "./cursorContainer";

$(document).ready(() => {
	listenForMenuActions();
	toggleHeader();

	const container = document.querySelector(".work-container");

	const items = document.querySelectorAll(".work-container li");
	const itemsWrapper = document.querySelector(".work-container ul");

	console.log(itemsWrapper)

	const cursorFollow = new WebGl(container, items, itemsWrapper);

	// const btn = new MagneticItem(container, target);
});
