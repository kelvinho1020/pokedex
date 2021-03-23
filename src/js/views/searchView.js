import View from "./View.js";
class SearchView extends View {
	_data;
	_parentElement = document.querySelector(".search");

	getQuery() {
		return document.querySelector(".search__field").value;
	}

	clearSearch(){
		document.querySelector(".search__field").value = "";
		this._data.currentPage = 1;
	}

	renderSearch(data) {
		this._data = data;
	}

	addHandlerSeach(handler) {
		// document.querySelector(".search__field").addEventListener("keyup", handler);
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
