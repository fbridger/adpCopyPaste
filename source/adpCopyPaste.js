
function setInputValue(anchor, value) {

	anchor.click();
	$("div#EditLayer input").val(value);
}

function getValue($row, selector) {

	var $activeInput = $("div#EditLayer input[id*='" + selector + "'");

	if ($activeInput.length === 1) {
		return $activeInput.val();
	}

	var $anchor = $row.find('a[id*="' + selector +'"]');

	var text = $anchor.text();

	if (!text.endsWith('...')) {
		return text;
	}

	return $anchor.attr('title');
}

function addPasteButtons() {
	$("a.btn-paste").remove();

	var pasteImgURL = chrome.extension.getURL("images/paste.png");

	var pasteButton = $("<a href='javascript:void(0);' class='btn-paste'><img src=" + pasteImgURL + " title='Paste data copied in entire row'></img></a>");
	pasteButton.click(function (){
		var pasteRow = $(this).parent().parent();
		
		setInputValue(pasteRow.find('a[id*="TOTALHOURS"]').get(0), document.copiedHours);
		setInputValue(pasteRow.find('a[id*="31_"]').get(0), document.copiedEarningsCode);
		setInputValue(pasteRow.find('a[id*="17_"]').get(0), document.copiedCustomer);
		setInputValue(pasteRow.find('a[id*="18_"]').get(0), document.copiedProject);
	});
	$("#TCMGridTable a.btn-copy").after(pasteButton);
}

function addCopyButtons(){

	$("a.btn-copy").remove();

	var copyImgURL = chrome.extension.getURL("images/copy.png");

	var copyButton = $("<a href='javascript:void(0);' class='btn-copy'><img src=" + copyImgURL + " title='Copy entire Row'></img></a>");
	copyButton.click(function (){

		var copyRow = $(this).parent().parent();
		
		copyRow.find('input:checkbox').focus();

		document.copiedHours = getValue(copyRow, "TOTALHOURS");
		document.copiedEarningsCode = getValue(copyRow, "31_");
		document.copiedCustomer = getValue(copyRow, "17_");
		document.copiedProject = getValue(copyRow, "18_");

		addPasteButtons();
	});
	$("#TCMGridTable input[id*='chkSelect_']").after(copyButton);
}

addPasteButtons();
addCopyButtons();