import "./main.css";
import listenForMenuActions from "./menu";
import Magnetic from "./magnetic";
import {toggleHeader} from "./header";

$(document).ready(() => {
	listenForMenuActions();
	toggleHeader();

	const button = document.querySelector(".menu-button");

	
});
