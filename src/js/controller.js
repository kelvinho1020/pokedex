import * as model from "./model.js";
import pokemonView from "./views/pokemonView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";

const controlPokemon = async function () {
	try {
		const id = +window.location.hash.slice(1);
		if (!id) return;
		pokemonView.renderLoading();
		await model.loadPokemon(id);

		pokemonView.renderPokemon(model.state);
		bookmarksView.render(model.state.bookmarks);
	} catch (err) {
		pokemonView.renderError();
	}
};

const controlCalculator = function () {
	pokemonView.renderCalculateData();
};

const controlSearchPokemon = async function () {
	try {
		resultsView.renderLoading();
		const query = searchView.getQuery();
		if (query === "") throw error; // remove this if want search all pokemon;

		searchView.renderSearch(model.state);
		await model.searchPokemon(query);

		searchView.clearSearch();

		// resultsView.render(model.state.searchPokemon) // all Pokemon;
		resultsView.render(model.getSearchResultsPage());
		paginationView.render(model.state);
	} catch (err) {
		resultsView.renderError();
	}
};

const controlPagination = function (page) {
	resultsView.render(model.getSearchResultsPage(page));
	paginationView.render(model.state);
};

const controlToggleBookmark = function () {
	if (!model.state.pokemon.bookmarked) model.addBookmark(model.state.pokemon);
	else model.deleteBookmark(model.state.pokemon.id);
	pokemonView.renderPokemon(model.state);

	bookmarksView.render(model.state.bookmarks);
};

const controlPreviewDeleteBookMark = function (id) {
	bookmarksView.render(model.deleteBookmark(id));
	pokemonView.renderPokemon(model.state);
};

const init = function () {
	window.addEventListener("load", model.loadAllPokemon);
	window.addEventListener("load", bookmarksView.render(model.state.bookmarks));
	pokemonView.addHandlerRender(controlPokemon);
	pokemonView.addHandlerCalculator(controlCalculator);
	pokemonView.addHandlerAddBookmark(controlToggleBookmark);
	bookmarksView.addHandlerDeleteBookmark(controlPreviewDeleteBookMark);
	searchView.addHandlerSeach(controlSearchPokemon);
	paginationView.addHandlerClick(controlPagination);
};

init();
