function getGridTable() {
    return this.tcmGridTableSelector || (this.tcmGridTableSelector = $("#TCMGridTable"));
}

function HolidaysHelper(year) {
    this.year = year || new Date().getFullYear();
    this.calculatePascua();
    this.parsers = {};
    this.dates = [];
}

HolidaysHelper.DayOfWeek = {};
HolidaysHelper.DaysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
for (var i = 0, lengthD = HolidaysHelper.DaysArray.length; i < lengthD; ++i) {
    HolidaysHelper.DayOfWeek[HolidaysHelper.DaysArray[i]] = i;
}

HolidaysHelper.Months = {};
HolidaysHelper.MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
for (var j = 0, lengthM = HolidaysHelper.MonthNames.length; j < lengthM; ++j) {
    HolidaysHelper.Months[HolidaysHelper.MonthNames[j]] = j;
}

HolidaysHelper.prototype.nextWeekDay = function (weekDay, realDate, daysToAdd, backward) {
    var date = new Date(realDate.getTime()),
        dayAddition = (backward ? -1 : 1);

    if (daysToAdd) {
        date.setDate(date.getDate() + daysToAdd);
    }

    while (date.getDay() !== weekDay) {
        date.setDate(date.getDate() + dayAddition);
    }

    return date;
};

HolidaysHelper.prototype.previousWeekDay = function (weekDay, date, daysToAdd) {
    return this.nextWeekDay(weekDay, date, daysToAdd, true);
};

HolidaysHelper.prototype.addDate = function (date, data) {
    this.dates.push({date: date, data: data});
};

HolidaysHelper.prototype.addParser = function (name, parser) {
    this.parsers[name] = parser;
};

HolidaysHelper.prototype.getHolidays = function (parserName) {
    var parser;

    if (parserName && this.parsers.hasOwnProperty(parserName)) {
        parser = this.parsers[parserName];
    } else {
        parser = function (date) {
            return date;
        };
    }

    return this.dates.sort(function (a, b) {
        return a.date > b.date ? 1 : -1;
    }).map(function (date) {
        return parser(date.date, date.data);
    });
};

HolidaysHelper.prototype.calculatePascua = function () {
    var a, b, c, d, e;
    var year = this.year, m = 24, n = 5;

    switch (true) {
        case (year >= 1583 && year <= 1699):
            m = 22;
            n = 2;
            break;
        case(year >= 1700 && year <= 1799) :
            m = 23;
            n = 3;
            break;
        case (year >= 1800 && year <= 1899) :
            m = 23;
            n = 4;
            break;
        case (year >= 1900 && year <= 2099) :
            m = 24;
            n = 5;
            break;
        case (year >= 2100 && year <= 2199) :
            m = 24;
            n = 6;
            break;
        case (year >= 2200 && year <= 2299) :
            m = 25;
            n = 0;
            break;
    }

    a = year % 19;
    b = year % 4;
    c = year % 7;
    d = ((a * 19) + m) % 30;
    e = ((2 * b) + (4 * c) + (6 * d) + n) % 7;

    var day = d + e;

    if (day < 10)
        return (this.pascua = new Date(year, HolidaysHelper.Months.March, day + 22));
    else {

        if (day == 26)
            day = 19;
        else if (day == 25 && d == 28 && e == 6 && a > 10)
            day = 18;
        else
            day -= 9;

        return (this.pascua = new Date(year, HolidaysHelper.Months.April, day));
    }
};