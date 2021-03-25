import View from "./View.js";
import pokeball from "../../img/pokeball_bg.png";

class ResultsView extends View {
	_parentElement = document.querySelector(".results");
	_errorMessage = `We can't find that Pokemon! Please try other's name or ID!`;

	_generateMarkup() {
        console.log(this._data)
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
            </li>`
			).join("");
	}
}
export default new ResultsView();
