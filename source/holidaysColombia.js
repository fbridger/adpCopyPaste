[2016, 2017, 2018].forEach(function(year){
    var holidaysHelper = new HolidaysHelper(year);

// Fixed
    [
        {month: HolidaysHelper.Months.January, day: 1, description: "Año Nuevo"},
        {month: HolidaysHelper.Months.May, day: 1, description: "Día del Trabajo"},
        {month: HolidaysHelper.Months.July, day: 20, description: "Grito de Independencia"},
        {month: HolidaysHelper.Months.August, day: 7, description: "Batalla de Boyacá"},
        {month: HolidaysHelper.Months.December, day: 8, description: "Día de la Inmaculada Concepción"},
        {month: HolidaysHelper.Months.December, day: 25, description: "Navidad"}
    ].forEach(function (data) {
        var date = new Date(holidaysHelper.year, data.month, data.day);
        holidaysHelper.addDate(date, data.description);
    });

// Moved to Monday
    [
        {month: HolidaysHelper.Months.January, day: 6, description: "Reyes Magos"},
        {month: HolidaysHelper.Months.March, day: 19, description: "San José"},
        {month: HolidaysHelper.Months.June, day: 29, description: "San Pedro y San Pablo"},
        {month: HolidaysHelper.Months.August, day: 15, description: "Asunción de la Virgen"},
        {month: HolidaysHelper.Months.October, day: 12, description: "Día de la Raza"},
        {month: HolidaysHelper.Months.November, day: 1, description: "Todos los Santos"},
        {month: HolidaysHelper.Months.November, day: 11, description: "Independencia de Cartagena"},

    ].forEach(function (data) {
        var date = holidaysHelper.nextWeekDay(HolidaysHelper.DayOfWeek.Monday,new Date(holidaysHelper.year, data.month, data.day));
        holidaysHelper.addDate(date, data.description);
    });

// Pascua Related
    holidaysHelper.addDate(holidaysHelper.pascua, "Pascua");
    holidaysHelper.addDate(
        holidaysHelper.previousWeekDay(
            HolidaysHelper.DayOfWeek.Sunday,
            holidaysHelper.pascua,
            -1), "Domingo de Ramos");
    holidaysHelper.addDate(
        holidaysHelper.previousWeekDay(
            HolidaysHelper.DayOfWeek.Thursday,
            holidaysHelper.pascua), "Jueves Santo");
    holidaysHelper.addDate(
        holidaysHelper.previousWeekDay(
            HolidaysHelper.DayOfWeek.Friday,
            holidaysHelper.pascua), "Viernes Santo");
    holidaysHelper.addDate(
        holidaysHelper.nextWeekDay(
            HolidaysHelper.DayOfWeek.Monday,
            holidaysHelper.pascua,
            42), "Ascensión de Jesús");
    holidaysHelper.addDate(
        holidaysHelper.nextWeekDay(
            HolidaysHelper.DayOfWeek.Monday,
            holidaysHelper.pascua,
            63), "Corpus Christi");
    holidaysHelper.addDate(
        holidaysHelper.nextWeekDay(
            HolidaysHelper.DayOfWeek.Monday,
            holidaysHelper.pascua,
            70), "Sagrado Corazón");


    holidaysHelper.addParser('adpCopyPasteCo', function (date, data) {
        addHoliday("co", date.getFullYear(), date.getMonth() + 1, date.getDate(), data);
        return date + ' ' + data;
    });

    holidaysHelper.getHolidays('adpCopyPasteCo');
});
