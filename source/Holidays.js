function addHolidays() {
	
	var holidays = getHolidays("ar", new Date().getFullYear());

	for (var i = 0; i < holidays.length; i++) {
		var holiday = holidays[i];
		var day = holiday.dia;
		if (holiday.traslado){
			day = holiday.traslado;
		}

		var holidayImgURL = chrome.extension.getURL("images/holiday.png");

		var dateString = padDayMonth(holiday.mes) + '/' + padDayMonth(day) + '/2016';

		var item = $("#TCMGridTable div.W8:contains('"+ dateString +"')");

		if (item.length > 0) {
			var title = '';
			title += holiday.motivo;
			if (holiday.traslado){
				title += " (feriado trasladado del " + holiday.dia + ")";
			}

			if (holiday.opcional && holiday.opcional.religion) {
				title += ' (' + holiday.opcional.religion + ')';
			}
			var holidayIcon = $("<img src=" + holidayImgURL + " title='"+ title + "' class='icn-holiday'></img>");
			item.append(holidayIcon);
			if (!holiday.opcional) {
				item.parent().parent().removeClass('workable').addClass('holiday');
			}
		}
	}

	$('.holiday img.icn-holiday[title]').qtip({style: {classes:'qtip-dark'}, content:{title:'Feriado'}, position: {my: 'bottom left', at: 'top right'}});
	$('.workable img.icn-holiday[title]').qtip({style: {classes:'qtip-dark'}, content:{title:'Festivo'}, position: {my: 'bottom left', at: 'top right'}});
}

function padDayMonth(value){
	var str = "" + value;
	var pad = "00";
	var ans = pad.substring(0, pad.length - str.length) + str;
	return ans;
}



addHolidays();