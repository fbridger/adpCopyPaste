var allHolidays = [];
var fixedHolidays = [];

function addHoliday(country, year, month, day, description, holidayType, traslado, opcional){
	var tipo ="inamovible";

	if (holidayType)
		tipo = holidayType;

	var holiday = { "mes": month, "dia": day, "motivo": description, "tipo": tipo, "traslado": traslado, "opcional": opcional};

	if (!allHolidays[country]) {
		allHolidays[country] = [];
	}

	if (!allHolidays[country][year]) {
		allHolidays[country][year] = [];		
	}

	allHolidays[country][year].push(holiday);
}

function addFixedHoliday(country, month, day, description, holidayType, opcional){

	var tipo ="inamovible";

	if (holidayType)
		tipo = holidayType;

	var fixedHoliday = { "mes": month, "dia": day, "motivo": description, "tipo": tipo, "opcional": opcional};

	if (!fixedHolidays[country]) {
		fixedHolidays[country] = [];
	}
	fixedHolidays[country].push(fixedHoliday);

}

function getHolidays(country, year){

	var countryHolidays = [];

	if (fixedHolidays[country]) {
		countryHolidays = countryHolidays.concat(fixedHolidays[country]);
	}

	if (allHolidays[country] && allHolidays[country][year]) {
		countryHolidays = countryHolidays.concat(allHolidays[country][year]);
	}

	return countryHolidays;
}