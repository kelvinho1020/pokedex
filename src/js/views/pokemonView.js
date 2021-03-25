import View from "./View.js";
import { calAllStats, getNatureValue } from "../calculator.js";
import icons from "../../img/icons.svg";

class PokemonView extends View {
	_parentElement = document.querySelector(".pokemon");
	_errorMessage = `We can't find that Pokemon! Please try it again!`;
	_message = ``;
	_IVs = [31, 31, 31, 31, 31, 31];
	_EVs = [0, 0, 0, 0, 0, 0];
	_LV = +50;
	_baseStats = [];
	_nature = [1, 1, 1, 1, 1];
	_allStats = [];
	_natureDefault = "Hardy";
	_quadruple = [];
	_double = [];
	_half = [];
	_quarter = [];

	_resetStats() {
		this._IVs = [31, 31, 31, 31, 31, 31];
		this._EVs = [0, 0, 0, 0, 0, 0];
		this._LV = +50;
		this._nature = [1, 1, 1, 1, 1];
		this._allStats = [];
		this._natureDefault = "Hardy";
		this._quadruple = [];
		this._double = [];
		this._half = [];
		this._quarter = [];
	}

	_styleChange() {
		const background = document.querySelector(".pokemon__fig");
		const typeColor = document.querySelectorAll(".type");

		typeColor.forEach(type => (type.style.backgroundColor = `var(--${type.dataset.type})`));
		background.style.backgroundImage = `linear-gradient(to right bottom, 
		var(--${this._data.pokemon.type1}), 
		var(--${this._data.pokemon.type2 ? this._data.pokemon.type2 : this._data.pokemon.type1}))`;
	}

	_effectivenessCalculate() {
		for (const [key, value] of Object.entries(this._data.pokemon.weakness)) {
			if (value === 4) this._quadruple.push(key);
			if (value === 2) this._double.push(key);
			if (value === 0.5) this._half.push(key);
			if (value === 0.25) this._quarter.push(key);
		}
	}

	_showData() {
		const markup =
			this._generateInfoMarkup() +
			this._generateCalculatorHeader() +
			this._generateCalculatorMain() +
			this._generateCalculatorFooter() +
			this._generateEffectiveness();
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderPokemon(data) {
		this._resetStats();
		this._baseStats = []; // Guard no need to reset this
		this._data = data;
		this._baseStats = this._data.pokemon.stats.map(stat => stat.base_stat);
		this._allStats = calAllStats(this._IVs, this._baseStats, this._EVs, this._LV, this._nature);
		this._effectivenessCalculate();

		this._showData();
		this._styleChange();
	}

	renderCalculateData() {
		const nature = document.querySelector(".nature").value;
		const IV = document.querySelectorAll(".IV");
		const EV = document.querySelectorAll(".EV");

		this._natureDefault = nature;
		this._LV = +document.querySelector(".LV").value;
		this._IVs = [];
		this._EVs = [];
		this._nature = [];
		this._nature = getNatureValue(nature);

		IV.forEach(iv => this._IVs.push(+iv.value));
		EV.forEach(ev => this._EVs.push(+ev.value));

		///// Guard /////
		if (this._IVs.some(iv => iv > 31 || iv < 0)) return this._resetStats();
		if (this._EVs.some(ev => ev > 255 || ev < 0)) return this._resetStats();
		if (this._LV > 100 || this._LV <= 0) return this._resetStats();

		this._allStats = calAllStats(this._IVs, this._baseStats, this._EVs, this._LV, this._nature);
		this._showData();
		this._styleChange();
	}

	addHandlerRender(handler) {
		["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
	}

	addHandlerCalculator(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn-cal");
			if (!btn) return;
			handler();
		});
	}

	addHandlerSwitch(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--inline");
			if (!btn) return;
			handler();
		});
	}

	addHandlerAddBookmark(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".icon--heart");
			if (!btn) return;
			handler();
		});
	}

	_generateButtonMarkup() {
		// prettier-ignore
		if(this._data.pokemon.id === 1) {
		return  `
		<div class="switch__btn">
			<a class="btn--inline switch__btn__next" href="#${this._data.pokemon.id + 1}">
			<svg class="search__icon">
				<use href="${icons}#icon-arrow-right"></use>
			</svg>
			</a>
		</div>`}
		else return `
		<div class="switch__btn">
			<a class="btn--inline switch__btn__prev" href="#${this._data.pokemon.id - 1}">
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-left"></use>
				</svg>
			</a>
			<a class="btn--inline switch__btn__next" href="#${this._data.pokemon.id + 1}">
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
				</svg>
			</a>
		</div>`
	}

	_generateInfoMarkup() {
		// prettier-ignore
		return`
        <figure class="pokemon__fig">
            <svg class='icon--heart'>
                <use href="${icons}#icon-heart${this._data.pokemon.bookmarked ? "" : '-outlined'}"></use>
            </svg>` 
		+ this._generateButtonMarkup() + 
           `<img src="${this._data.pokemon.sprites ? this._data.pokemon.sprites:'./src/img/pokeball_bg.png'}" alt="Pokemon" class="pokemon__img" />
            <h1 class="pokemon__name">
                <span>#${this._data.pokemon.id >= 10000 ? '' : this._data.pokemon.id } ${this._data.pokemon.name}</span>
            </h1>
        </figure>
        <div class="pokemon__details">
            <div class="pokemon__details__types">
                <span class="type" data-type="${this._data.pokemon.type1}">${this._data.pokemon.type1}</span>
                ${ this._data.pokemon.type2 ? 
					`<span class="type" data-type="${this._data.pokemon.type2}">${this._data.pokemon.type2}</span>`: 
					`<div></div>`}</span>
            </div>
        <div class="pokemon__details__info">
            <div class="pokemon__details__info__ability">
                <h3 class="heading--3">Ability</h2>
                <h2 class="heading--2">${this._data.pokemon.ability1}</h3>	
                <h2 class="heading--2">${ this._data.pokemon.ability2? this._data.pokemon.ability2 : `<div class='hidden'></div>`}</h3>	
            </div>

            <div class="pokemon__details__info__ability">
                <h3 class="heading--3">Hidden Ability</h2>
                <h2 class="heading--2">${this._data.pokemon.hiddenAbility}</h3>	
            </div>
        </div>
        `;
	}

	_generateCalculatorHeader() {
		return `<div class="pokemon__stats">
		<table>
		        <tbody>
		            <tr class='pokemon__stats__header'>
		                <th>Base</th>
		                 <th></th>
		                <th></th>
		                <th>IV (31)</th>
		                 <th>EV (255)</th>
		                 <th>Stats</th>
		            </tr>`;
	}

	_generateCalculatorMain() {
		// prettier-ignore
		return this._data.pokemon.stats
			.map(
				(stat, i) => `<tr>
		                 <th>${stat.base}</th>
		                 <td>${stat.base_stat}</td>
		                 <td><div class="pokemon__stats__stat-bar"><div class="pokemon__stats__stat-bar__fill" style='width: ${stat.base_stat / 1.7}px'></div>
		                     </div>
		                 </td>
		                 <td>
		                     <input class='IV pokemon__stats__IV' type="number" min="0" max="31" value="${this._IVs[i]}" size="2"/>
		                 </td>
		                 <td>
		                     <input class='EV pokemon__stats__EV' type="number" min="0" max="252" value="${this._EVs[i]}" step="4"/>
		                 </td>
		                 <td>${this._allStats[i]}</td>
		             </tr>`
			)
			.join("");
	}

	_generateCalculatorFooter() {
		return `<tr>
					<th>OVERALL</th>
					<td>${this._data.pokemon.overall}</td>
					<td>
						<span>LEVEL</span>
						<input class='LV pokemon__stats__LV' type="number" min="1" max="100" value="${this._LV}" size="2"/>
					</td>
					<td colspan="2">
						<select class='nature pokemon__stats__nature'>
							<option value="${this._natureDefault}">${this._natureDefault}</option>
							<option value="Lonely">Lonely</option>
							<option value="Brave">Brave</option>
							<option value="Adamant">Adamant</option>
							<option value="Naughty">Naughty</option>
							<option value="Bold">Bold</option>
							<option value="Docile">Docile</option>
							<option value="Relaxed">Relaxed</option>
							<option value="Impish">Impish</option>
							<option value="Lax">Lax</option>
							<option value="Timid">Timid</option>
							<option value="Hasty">Hasty</option>
							<option value="Serious">Serious</option>
							<option value="Jolly">Jolly</option>
							<option value="Naive">Naive</option>
							<option value="Modest">Modest</option>
							<option value="Mild">Mild</option>
							<option value="Quiet">Quiet</option>
							<option value="Bashful">Bashful</option>
							<option value="Rash">Rash</option>
							<option value="Calm">Calm</option>
							<option value="Gentle">Gentle</option>
							<option value="Sassy">Sassy</option>
							<option value="Careful">Careful</option>
							<option value="Quirky">Quirky</option>
						</select>
						<td><button class='btn-cal btn--inline btn--inline--dark'>Calculate</button></td>
					</td>
				</tr>
			</tbody>
		</table>
	</div>`;
	}

	_generateEffectiveness() {
		const noWeakness = `<span class = "heading--3 type--none">No WEAKNESS</span>`;
		const quadruple = this._quadruple
			.map(type => `<span class="type" data-type="${type}">${type}</span>`)
			.join("");
		const double = this._double
			.map(type => `<span class="type" data-type="${type}">${type}</span>`)
			.join("");
		const half = this._half
			.map(type => `<span class="type" data-type="${type}">${type}</span>`)
			.join("");
		const quarter = this._quarter
			.map(type => `<span class="type" data-type="${type}">${type}</span>`)
			.join("");

		// prettier-ignore
		return `
		<div class="pokemon__effectiveness">
		<h2 class="heading--2">Weakness</h2>
		<div class="pokemon__effectiveness__row">
			<h3 class="heading--3">4X</h3>
			<div class="pokemon__effectiveness__types">` + (this._quadruple.length !==0 ? quadruple : noWeakness)+
			`</div>
			<h3 class="heading--3">2X</h3>
			<div class="pokemon__effectiveness__types">` + (this._double.length !==0 ? double : noWeakness) + 
			`</div>
		</div>
		<div class="pokemon__effectiveness__row">
			<h3 class="heading--3">0.5X</h3>
			<div class="pokemon__effectiveness__types">` + (this._half.length !==0 ? half : noWeakness) +
			`</div>
			<h3 class="heading--3">0.25X</h3>
			<div class="pokemon__effectiveness__types">` + (this._quarter.length !==0 ? quarter : noWeakness) +
			`</div>
		</div>
	</div>`;
	}
}

export default new PokemonView();
