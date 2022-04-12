const toggleHeader = () => {
	window.addEventListener("scroll", () => {
		const scrollbar = $(window).scrollTop();
		const header = $("header");

		if (scrollbar > 80 && !header.hasClass("is-hidden")) {
			header.addClass("is-hidden");
		} else if (scrollbar < 80 && header.hasClass("is-hidden")) {
			header.removeClass("is-hidden");
		}
	});
};

export { toggleHeader };
