export const getJSON = async function (url) {
	try {
		const res = await fetch(url);
		const data = await res.json();

		if (!res) throw new Error(`${data.message} ${res.status}`);
		return data;
	} catch (err) {
		throw err;  
	}
};
