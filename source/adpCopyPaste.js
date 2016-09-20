
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

function pasteFromClipboard($rowToPaste) {

	setInputValue($rowToPaste.find('a[id*="TOTALHOURS"]').get(0), document.copiedHours);
	setInputValue($rowToPaste.find('a[id*="31_"]').get(0), document.copiedEarningsCode);
	setInputValue($rowToPaste.find('a[id*="17_"]').get(0), document.copiedCustomer);
	setInputValue($rowToPaste.find('a[id*="18_"]').get(0), document.copiedProject);
}

function addPasteButtons() {
	$("a.btn-paste").remove();

	var pasteImgURL = chrome.extension.getURL("images/paste.png");

	var pasteButton = $("<a href='javascript:void(0);' class='btn-paste'><img src=" + pasteImgURL + " title='Paste data copied in this row'></img></a>");
	pasteButton.click(function (){
		var pasteRow = $(this).parent().parent();
		
		pasteFromClipboard(pasteRow);
	});
	$("#TCMGridTable a.btn-copy").after(pasteButton);
	$('a.btn-paste img[title]').qtip({style: {classes:'qtip-dark'},content:{title:'Paste'}, position: {my: 'bottom left', at: 'top right'}});
}

function copyToClipboard($rowToCopy) {

	$rowToCopy.find('input:checkbox').focus();

	document.copiedHours = getValue($rowToCopy, "TOTALHOURS");
	document.copiedEarningsCode = getValue($rowToCopy, "31_");
	document.copiedCustomer = getValue($rowToCopy, "17_");
	document.copiedProject = getValue($rowToCopy, "18_");
}

function addCopyButtons() {

	$("a.btn-copy").remove();

	var copyImgURL = chrome.extension.getURL("images/copy.png");

	var copyButton = $("<a href='javascript:void(0);' class='btn-copy'><img src=" + copyImgURL + " title='Copy the data of this row'></img></a>");
	copyButton.click(function (){

		var copyRow = $(this).parent().parent();
		
		copyToClipboard(copyRow);

		addPasteButtons();
	});
	$("#TCMGridTable input[id*='chkSelect_']").after(copyButton);
	$('a.btn-copy img[title]').qtip({style: {classes:'qtip-dark'},content:{title:'Copy'}, position: {my: 'bottom left', at: 'top right'}});
}

function addCloneButtons() {

	$("a.btn-clone").remove();

	var imgURL = chrome.extension.getURL("images/clone.png");

	var button = $("<a href='javascript:void(0);' class='btn-clone'><img src=" + imgURL + " title='Your servant stormtrooper will copy this row and paste it in all workable days. Long live the empire!'></img></a>");
	button.click(function (){

		var copyRow = $(this).parent().parent();
		
		copyToClipboard(copyRow);

		$("#TCMGridTable tbody tr.workable").each(function(index, element) {

			pasteFromClipboard($(element));

		});
	});
	$("#TCMGridTable a[id*='IMGNOTELINK_']").before(button);
	$('a.btn-clone img[title]').qtip({style: {classes:'qtip-dark'},content:{title:'Stormtrooper Copy & Paste'}, position: {my: 'bottom right', at: 'top left'}});
}

addCloneButtons();
addPasteButtons();
addCopyButtons();
