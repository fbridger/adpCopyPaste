function getGridTable() {
    return this.tcmGridTableSelector || (this.tcmGridTableSelector = $("#TCMGridTable"));
}

function HolidaysHelper(year) {
    this.pascua = this.calcularPascua(year)
}

HolidaysHelper.DayOfWeek = {};
var daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
for (var i = 0, length = daysArray.length; i < length; ++i) HolidaysHelper.DayOfWeek[daysArray[i]] = i;

HolidaysHelper.prototype.siguienteDiaSemana = function (diaSemana, fechaInicial, haciaAtras, daysToAdd) {
    var fecha = new Date(fechaInicial.getTime()),
        dayAddition = (haciaAtras ? -1 : 1);

    while (fecha.getDay() != diaSemana)
        fecha.setDate(fecha.getDate() + dayAddition);

    if (daysToAdd) {
        fecha.setDate(fecha.getDate() + daysToAdd)
    }
    return fecha;
};

HolidaysHelper.prototype.anteriorDiaSemana = function (diaSemana, fecha, daysToAdd) {
    return this.siguienteDiaSemana(diaSemana, fecha, true, daysToAdd)
};

HolidaysHelper.prototype.calcularPascua = function (year) {
    var a, b, c, d, e;
    var m = 24, n = 5;

    if (year >= 1583 && year <= 1699) {
        m = 22;
        n = 2;
    }
    else if (year >= 1700 && year <= 1799) {
        m = 23;
        n = 3;
    }
    else if (year >= 1800 && year <= 1899) {
        m = 23;
        n = 4;
    }
    else if (year >= 1900 && year <= 2099) {
        m = 24;
        n = 5;
    }
    else if (year >= 2100 && year <= 2199) {
        m = 24;
        n = 6;
    }
    else if (year >= 2200 && year <= 2299) {
        m = 25;
        n = 0;
    }

    a = year % 19;
    b = year % 4;
    c = year % 7;
    d = ((a * 19) + m) % 30;
    e = ((2 * b) + (4 * c) + (6 * d) + n) % 7;

    var dia = d + e;

    if (dia < 10) //Marzo
        return new Date(year, 2, dia + 22);
    else { //Abril

        if (dia == 26)
            dia = 19;
        else if (dia == 25 && d == 28 && e == 6 && a > 10)
            dia = 18;
        else
            dia -= 9;

        return new Date(year, 3, dia);
    }
};

HolidaysHelper.prototype.adicionarFeriado = function(){};
