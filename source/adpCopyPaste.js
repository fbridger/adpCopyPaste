
function setInputValue(anchor, value) {

	anchor.click();
	$("div#EditLayer input").val(value);
}

function getValue($anchor) {
	if ($anchor.attr('title') && $anchor.attr('title') !== ''){
		return $anchor.attr('title');
	}

	return $anchor.text();
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
		
		document.copiedHours = getValue(copyRow.find('a[id*="TOTALHOURS"]'));
		document.copiedEarningsCode = getValue(copyRow.find('a[id*="31_"]'));
		document.copiedCustomer = getValue(copyRow.find('a[id*="17_"]'));
		document.copiedProject = getValue(copyRow.find('a[id*="18_"]'));

		addPasteButtons();
	});
	$("#TCMGridTable input[id*='chkSelect_']").after(copyButton);
}

addPasteButtons();
addCopyButtons();