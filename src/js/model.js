import { API_URL, DATA_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
	pokemon: {},
	allPokemon: [],
	searchPokemon: [],
	currentPage: 1,
	bookmarks: [],
};

export const loadPokemon = async function (id) {
	try {
		const data = await getJSON(`${API_URL}/${id}`);

		//////////////// Pokemon ////////////////
		state.pokemon = {
			name: data.name,
			id: data.id,
			type1: data.types[0].type.name,
			type2: data.types[1] ? data.types[1].type.name : null,
			ability1: data.abilities[0].ability.name,
			ability2:
				data.abilities[1] && data.abilities[1].is_hidden === false
					? data.abilities[1].ability.name
					: null,
			stats: data.stats,
			sprites: data.sprites.other["official-artwork"].front_default,
			icon: data.sprites.versions["generation-viii"].icons.front_default,
		};

		///// Hidden Ability /////
		if (data.abilities[1] && data.abilities[1].is_hidden === true)
			state.pokemon.hiddenAbility = data.abilities[1].ability.name;
		else if (data.abilities[2]) state.pokemon.hiddenAbility = data.abilities[2].ability.name;
		else state.pokemon.hiddenAbility = null;

		///// OverAll Status Calculate /////
		state.pokemon.overall = state.pokemon.stats.reduce((acc, cur) => {
			return acc + cur.base_stat;
		}, 0);

		///// Stats bases /////
		const bases = ["HP", "ATK", "DEf", "SPA", "SPD", "SPE"];
		state.pokemon.stats.forEach((stat, i) => {
			stat.base = bases[i];
		});

		///// Bookmark /////
		if (state.bookmarks.some(bookmark => bookmark.id === id)) state.pokemon.bookmarked = true;
		else state.pokemon.bookmarked = false;

		// console.log(state.pokemon);
		console.log(data);
	} catch (err) {
		throw err;
	}
};

export const loadAllPokemon = async function () {
	try {
		const data = await getJSON(`${API_URL}?limit=${10000}&offset=${0}`);

		data.results.forEach(pokemon => {
			const eachPokemonData = {};
			eachPokemonData.name = pokemon.name;

			///// Take the id from url /////
			eachPokemonData.id = pokemon.url.replace(/\D/g, "").substr(1);
			state.allPokemon.push(eachPokemonData);
		});
	} catch (err) {
		throw err;
	}
};

export const searchPokemon = async function (query) {
	state.searchPokemon = state.allPokemon.filter(pokemon => {
		const regex = new RegExp(query, "gi");
		return pokemon.name.match(regex) || pokemon.id.match(regex);
	});

	///// Update icon and types in allpokemon /////
	const data = await Promise.allSettled(
		state.searchPokemon.map(async pokemon => {
			try {
				const data = await getJSON(`${API_URL}/${pokemon.id}`);
				pokemon.icon = data.sprites.versions["generation-viii"].icons.front_default;
				pokemon.type1 = data.types[0].type.name;
				pokemon.type2 = data.types[1] ? data.types[1].type.name : null;
			} catch (err) {
				throw err;
			}
		})
	);
};

export const getSearchResultsPage = function (page = state.currentPage) {
	state.currentPage = page;
	const start = (page - 1) * DATA_PER_PAGE;
	const end = page * DATA_PER_PAGE;

	return state.searchPokemon.slice(start, end);
};

export const addBookmark = function (pokemon) {
	state.bookmarks.push(pokemon);
	if (pokemon.id === state.pokemon.id) state.pokemon.bookmarked = true;
};

export const deleteBookmark = function (id) {
	const index = state.bookmarks.findIndex(el => el.id === id);
	state.bookmarks.splice(index, 1);
	if (id === state.pokemon.id) state.pokemon.bookmarked = false;

	return state.bookmarks;
};
