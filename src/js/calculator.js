const data = {
	hardy: [1, 1, 1, 1, 1],
	lonely: [1.1, 0.9, 1, 1, 1],
	adamant: [1.1, 1, 0.9, 1, 1],
	naughty: [1.1, 1, 1, 0.9, 1],
	brave: [1.1, 1, 1, 1, 0.9],
	bold: [0.9, 1.1, 1, 1, 1],
	docile: [1, 1, 1, 1, 1],
	impish: [1, 1.1, 0.9, 1, 1],
	lax: [1, 1.1, 1, 0.9, 1],
	relaxed: [1, 1.1, 1, 1, 0.9],
	modest: [0.9, 1, 1.1, 1, 1],
	mild: [1, 0.9, 1.1, 1, 1],
	bashful: [1, 1, 1, 1, 1],
	rash: [1, 1, 1.1, 0.9, 1],
	quiet: [1, 1, 1.1, 1, 0.9],
	calm: [0.9, 1, 1, 1.1, 1],
	gentle: [1, 0.9, 1, 1.1, 1],
	careful: [1, 1, 0.9, 1.1, 1],
	quirky: [1, 1, 1, 1, 1],
	sassy: [1, 1, 1, 1.1, 0.9],
	timid: [0.9, 1, 1, 1, 1.1],
	hasty: [1, 0.9, 1, 1, 1.1],
	jolly: [1, 1, 0.9, 1, 1.1],
	naive: [1, 1, 1, 0.9, 1.1],
	serious: [1, 1, 1, 1, 1],
};

function getNatureValue(nature) {
	if (typeof nature === "string") {
		nature = nature.toLowerCase();
		if (data[nature]) {
			return data[nature];
		} else {
			throw new Error("The nature is a invalid Pokémon nature.");
		}
	}
}

function calHpStats(iv, baseStats, ev, level) {
	if (baseStats === 1) {
		return 1;
	}

	let result = Math.floor(((iv + baseStats * 2 + ev / 4) * level) / 100 + 10 + level);
	return result;
}

function calUnhpStats(iv, baseStats, ev = 0, level = 1, nature = 1) {
	let baseResult = Math.floor(((iv + baseStats * 2 + ev / 4) * level) / 100 + 5);
	let result = Math.floor(baseResult * nature);
	return result;
}

function calAllStats(ivs, baseStats, evs, level = 1, nature = [1, 1, 1, 1, 1]) {
	let stats = [];

	stats.push(calHpStats(ivs[0], baseStats[0], evs[0], level));

	if (typeof nature === "string") {
		nature = natures.getNatureValue(nature);
	}

	for (let i = 1; i < 6; i++) {
		stats.push(calUnhpStats(ivs[i], baseStats[i], evs[i], level, nature[i - 1]));
	}
	return stats;
}

const getNatureNames = Object.keys(data);
const getNatureDatas = data;

export { calAllStats, calUnhpStats, calHpStats, getNatureDatas, getNatureValue, getNatureNames };

/// Notes ///
// calHpStats (iv, baseStats, ev, level)
// calUnhpStats (iv, baseStats, ev = 0, level = 1, nature = 1)
// calAllStats (ivs, baseStats, evs, level = 1, nature = [1, 1, 1, 1, 1])
