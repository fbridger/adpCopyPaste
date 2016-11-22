
function addHolidaysSelectionUI(){

	var htmlCountrySelect = "<select id='country'>"
		+ "<option value='ar'>Argentina</option>"
		+ "<option value='co'>Colombia</option>"
		+ "<option value='uy'>Uruguay</option>"
		+ "<option value='ve'>Venezuela</option>"
		+ "</select>";

	var htmlCountryDiv = "<div class='country'>"
		+ "<span>Show holidays of </span>" 
		+ htmlCountrySelect 
		+ "</div>"

	$('.BTN_Row').first().append(htmlCountryDiv);

	$('#country').val(document._country).change(function(){
		var country = $(this).val();
		document._country = country;
		chrome.storage.sync.set({'country': country}, addHolidays);
	})
}

function removeHolidays() {

	$('.holiday').removeClass('holiday').addClass('workable');
	$('.icn-holiday').remove();
}

function addHolidays() {

	removeHolidays();

    var yearToUse;
    var beginDateVal = $('#BeginDate').val();

    if (beginDateVal.trim() !== '')
        yearToUse = new Date(beginDateVal).getFullYear();
    else
        yearToUse = new Date().getFullYear();

    var holidays = getHolidays(document._country, yearToUse);

    for (var i = 0; i < holidays.length; i++) {
        var holiday = holidays[i];
        var day = holiday.dia;
        if (holiday.traslado) {
            day = holiday.traslado;
        }

        var holidayImgURL = chrome.extension.getURL("images/holiday.png");

        var dateString = padDayMonth(holiday.mes) + '/' + padDayMonth(day) + '/' + yearToUse;

        var item = getGridTable().find("div.W8:contains('" + dateString + "')");

        if (item.length > 0) {
            var title = '';
            title += holiday.motivo;
            if (holiday.traslado) {
                title += " (feriado trasladado del " + holiday.dia + ")";
            }

            if (holiday.opcional && holiday.opcional.religion) {
                title += ' (' + holiday.opcional.religion + ')';
            }
            var holidayIcon = $("<img src=" + holidayImgURL + " title='" + title + "' class='icn-holiday'></img>");
            item.append(holidayIcon);
            if (!holiday.opcional) {
                item.parent().parent().removeClass('workable').addClass('holiday');
            }
        }
    }

    $('.holiday img.icn-holiday[title]').qtip({
        style: {classes: 'qtip-dark'},
        content: {title: 'Feriado'},
        position: {my: 'bottom left', at: 'top right'}
    });
    $('.workable img.icn-holiday[title]').qtip({
        style: {classes: 'qtip-dark'},
        content: {title: 'Festivo'},
        position: {my: 'bottom left', at: 'top right'}
    });

    
}

function padDayMonth(value) {
    var str = "" + value;
    var pad = "00";
    return pad.substring(0, pad.length - str.length) + str;
}

function initCountry(cb) {
    
    if(document._country){
        return document._country;
    }
    if (!cb) {
        cb = function () {
        };
    }
    chrome.storage.sync.get('country', function (items) {
        document._country = items.country || 'ar';
        cb();
    });
}

function getCountryName(country) {
	if (country === "ar")
		return "Argentina";

	if (country === "co")
		return "Colombia";

	if (country === "ve")
		return "Venezuela";

	if (country === "uy")
		return "Uruguay";

	if (country === "us")
		return "United States";
}

initCountry(function () {
    addHolidaysSelectionUI();
    addHolidays();
});
