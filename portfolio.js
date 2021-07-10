(function () {
	/* "use strict"; */
	/* idk what this does but removing didn't break anything */

	/**
	 * Easy selector helper function ***IMPORTANT
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function ***IMPORTANT
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Porfolio isotope and filter ***IMPORTANT
	 */
	window.addEventListener("load", () => {
		let portfolioContainer = select("#portfolio-grid");
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: ".item",
			});

			let portfolioFilters = select("#filters a", true);

			on(
				"click",
				"#filters a",
				function (e) {
					e.preventDefault();
					portfolioFilters.forEach(function (el) {
						el.classList.remove("active");
					});
					this.classList.add("active");

					portfolioIsotope.arrange({
						filter: this.getAttribute("data-filter"),
					});
					portfolioIsotope.on("arrangeComplete", function () {
						AOS.refresh();
					});
				},
				true
			);
		}
	});
})();