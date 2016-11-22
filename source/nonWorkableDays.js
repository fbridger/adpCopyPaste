function markNonWorkableDays(){

	getGridTable().find("td.L:contains('Sat')").parent().addClass('non-workable');
	getGridTable().find("td.L:contains('Sun')").parent().addClass('non-workable');

}

function markWorkableDays(){

	getGridTable().find("td.L:contains('Mon')").parent().addClass('workable');
	getGridTable().find("td.L:contains('Tue')").parent().addClass('workable');
	getGridTable().find("td.L:contains('Wed')").parent().addClass('workable');
	getGridTable().find("td.L:contains('Thu')").parent().addClass('workable');
	getGridTable().find("td.L:contains('Fri')").parent().addClass('workable');
	
}


markNonWorkableDays();
markWorkableDays();