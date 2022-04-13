//Intro animation

import { set } from "animejs";
import Transition from "./transition";

const container = $(".intro-card");
const words = ["Bonjour", "你好", "привет", "ආයුබෝවන්", "xin chào", "Tere"];
const wordWrapper = $(".intro-card .word");
const morphPath = container.find(".transition-morph");

export const animateIntro = () => {
	const transition = new Transition(container, morphPath, wordWrapper);

	wordWrapper.css({ display: "block" });

	let counter = 0;
	const initialPause = 900;
	const interval = 200;

	setTimeout(() => {
		setTimer().then(() => transition.leave());
	}, initialPause);

	const setTimer = () => {
		return new Promise((resolve, reject) => {
			const timer = setInterval(() => {
				changeWord(counter);
				counter === words.length - 1 && endTimer();

				counter++;
			}, interval);

			const changeWord = count => {
				let currentWord = wordWrapper.text();
				let nextWord;

				if (count === 0) {
					nextWord = words[0];
					console.log;
				} else {
					nextWord = words[words.indexOf(currentWord) + 1];
				}

				wordWrapper.html(nextWord);
			};

			const endTimer = () => {
				clearInterval(timer);
				resolve("done!");
			};
		});
	};
};
