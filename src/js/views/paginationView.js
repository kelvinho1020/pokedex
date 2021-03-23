import View from "./View.js";
import { DATA_PER_PAGE } from "../config.js";

class PaginationView extends View {
	_parentElement = document.querySelector(".pagination");

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--inline");
			if (!btn) return;
			const goToPage = +btn.dataset.goto;
			handler(goToPage);
		});
	}

	_generateMarkup() {
		const numPages = Math.ceil(this._data.searchPokemon.length / DATA_PER_PAGE);

		// prettier-ignore
		if (this._data.currentPage === 1 && numPages > 1)
		return `<button data-goto="${this._data.currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
                 <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
         </button>`;

		// prettier-ignore
		if (this._data.currentPage === numPages && numPages > 1)
		return `<button data-goto="${this._data.currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
             </svg>
            <span>Page ${this._data.currentPage - 1}</span>
         </button>`;
         
		// prettier-ignore
		if (this._data.currentPage < numPages)
		return `<button data-goto="${this._data.currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
        </button>
        <button data-goto="${this._data.currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
                 <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
         </button>`;

		return "";
	}
}

export default new PaginationView();
