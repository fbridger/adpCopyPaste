function markNonWorkableDays(){

	$("#TCMGridTable td.L:contains('Sat')").parent().addClass('non-workable');
	$("#TCMGridTable td.L:contains('Sun')").parent().addClass('non-workable');

}

function markWorkableDays(){

	$("#TCMGridTable td.L:contains('Mon')").parent().addClass('workable');
	$("#TCMGridTable td.L:contains('Tue')").parent().addClass('workable');
	$("#TCMGridTable td.L:contains('Wed')").parent().addClass('workable');
	$("#TCMGridTable td.L:contains('Thu')").parent().addClass('workable');
	$("#TCMGridTable td.L:contains('Fri')").parent().addClass('workable');
	
}


markNonWorkableDays();
markWorkableDays();