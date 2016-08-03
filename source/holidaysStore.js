var allHolidays = [];

function addHolidays(country, year, holidays){

	if (!allHolidays[country]) {
  	allHolidays[country]=[];
  }
  
	allHolidays[country][year] = holidays;

}

function getHolidays(country, year){

	if (allHolidays[country] && allHolidays[country][year]) {
		return allHolidays[country][year];
	}

	return [0];
}