function addHolidays() {
	
	var holidays = getHolidays("ar", new Date().getFullYear());

	for (var i = 0; i < holidays.length; i++) {
		var holiday = holidays[i];
		var day = holiday.day;
		if (holiday.movedToDay){
			day = holiday.movedToDay;
		}

		var holidayImgURL = chrome.extension.getURL("images/holiday.png");

		var dateString = padDayMonth(holiday.month) + '/' + padDayMonth(day) + '/2016';

		var item = $("#TCMGridTable div.W8:contains('"+ dateString +"')");

		if (item.length > 0) {			
			var title = holiday.description;
			if (holiday.movedToDay){
				title += " (feriado trasladado del " + holiday.day + ")";
			}
			var holidayIcon = $("<img src=" + holidayImgURL + " title='"+ title + "' class='icn-holiday'></img>");
			item.append(holidayIcon);
			if (!holiday.optional) {
				item.parent().parent().addClass('holiday');
			}
		}
	}
}

function markNonWorkableDays(){

	$("#TCMGridTable td.L:contains('Sat')").parent().addClass('non-workable');
	$("#TCMGridTable td.L:contains('Sun')").parent().addClass('non-workable');

}

function padDayMonth(value){
	var str = "" + value;
	var pad = "00";
	var ans = pad.substring(0, pad.length - str.length) + str;
	return ans;
}



addHolidays();
markNonWorkableDays();