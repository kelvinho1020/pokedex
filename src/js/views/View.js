import loadingGIF from '../../img/loading.gif'
export default class View {
	_data;

	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderError(message = this._errorMessage) {
		const markup = `
		<div class="error">
            <p>${message}</p>
		</div>;
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderMessage(message = this._message) {
		const markup = `
                <div class="message">
					<p>${message}</p>
				</div>
        `;
	}

	renderLoading() {
		const markup = `
        <div class="loading">
            <img src="${loadingGIF}" alt="this slowpoke moves" alt="loading image"/>
        </div>
    `;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}
}
