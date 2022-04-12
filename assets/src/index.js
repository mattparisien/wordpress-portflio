import "./main.css";
import listenForMenuActions from "./menu";
import Magnetic from "./magnetic";
import { toggleHeader } from "./header";
import MagneticItem from "./magnetic";

$(document).ready(() => {
	listenForMenuActions();
	toggleHeader();

	const button = document.querySelector(".menu-button");

	const btn = new MagneticItem(button);
});
