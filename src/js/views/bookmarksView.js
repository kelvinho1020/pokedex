import View from "./View.js";
import icons from "../../img/icons.svg";
import pokeball from "../../img/pokeball_bg.png";

class BookmarksView extends View {
	_parentElement = document.querySelector(".bookmarks__list");
	_errorMessage = `No bookmarks yet! Go and bookmark your first pokemon :)`;

	addHandlerDeleteBookmark(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".preview__user-delete");
			if (!btn) return;
			const deleteID = +btn.dataset.id;
			handler(deleteID);
		});
	}

	_generateMarkup() {
		// prettier-ignore
		return this._data
			.map( data => `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${data.id}">
                    <figure class="preview__fig">
                        <img src="${data.icon ? data.icon : pokeball}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__name">${data.name}</h4>
                        <div class="preview__type">
                            <p class="preview__type--1 ${data.type1}">${data.type1}</p>
                            <p class="preview__type--2  ${data.type2 ? data.type2 : "hidden"}">${data.type2}</p>
                        </div>
                    </div>
                </a>
                <div class="preview__user-delete" data-ID="${data.id}">
                    <svg>
                        <use href="${icons}#icon-trash"></use>
                    </svg>
                </div>
            </li>`
			).join("");
	}
}
export default new BookmarksView();
