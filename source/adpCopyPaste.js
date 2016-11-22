var autoPopulateKeys = ['hours', 'earningsCode', 'client', 'project'];
var hoursSelector = 'a[id*="TOTALHOURS"]';
var earningsCodeSelector = 'a[id*="31_"]';
var customerSelector = 'a[id*="17_"]';
var projectSelector = 'a[id*="18_"]';

function save(hours, earningsCode, client, project) {
    chrome.storage.sync.set({
        'hours': hours,
        'earningsCode': earningsCode,
        'client': client,
        'project': project
    });
}

function addAutoPopulateUI() {

    if ($('a.DoEdit').length == 0 || $('#divStatusText').length > 0)
        return;

    chrome.storage.sync.get(autoPopulateKeys, function (result) {

        if (!result)
            return;

        if (isEmpty(result.hours) && isEmpty(result.earningsCode) && isEmpty(result.client) && isEmpty(result.project))
            return;

        document.copiedHours = result.hours;
        document.copiedEarningsCode = result.earningsCode;
        document.copiedCustomer = result.client;
        document.copiedProject = result.project;

        var imgURL = chrome.extension.getURL("images/icon16.png");

        var imgHtml = '<img src="' + imgURL + '" style="vertical-align:middle"/>';

        var uiHtml = '<div class="auto-populate">';
        uiHtml += '<h3>' + imgHtml + ' ADP Copy &amp; Paste</h3>';
        uiHtml += '<p>Would you like to fill your timecard using the following information?</p>';
        uiHtml += '<table cellspacing="0" cellpadding="0" border="0" class="TBL_D1">';
        uiHtml += '<tr><th>Hours</th><th>Earnings Code</th><th>Customer</th><th>Project</th></tr>';
        uiHtml += '<tr>';
        uiHtml += '<td>' + result.hours + '</td>';
        uiHtml += '<td>' + result.earningsCode + '</td>';
        uiHtml += '<td>' + result.client + '</td>';
        uiHtml += '<td>' + result.project + '</td>';
        uiHtml += '</tr></table>';
        uiHtml += '<button class="yes">Yes, fill the timecard!</button>';
        uiHtml += '<button class="no">No, maybe next time.</button>';
        uiHtml += '</div>';

        $('.TBL_Toolbar').after(uiHtml);

        $('div.auto-populate button.yes').click(function () {
            autoPopulate();
            $('div.auto-populate button.no').click();
            return false;
        });

        $('div.auto-populate button.no').click(function () {
            $('#tcGrid').click();
            $('div.auto-populate').hide();
            $(document).scrollTop(0);
            return false;
        })

    });

}

function autoPopulate() {

    getGridTable().find("tbody tr.workable").each(function (index, element) {
        pasteFromClipboard($(element));
    });

    getGridTable().find("tbody tr.holiday").not('.non-workable').each(function (index, element) {
        pasteToRow($(element), document.copiedHours, 'HOLIDAY', document.copiedCustomer, document.copiedProject);
    });

}

function getValue($row, selector) {

    var $activeInput = $("div#EditLayer input[id*='" + selector + "'");

    if ($activeInput.length === 1) {
        return $activeInput.val();
    }

    var $anchor = $row.find('a[id*="' + selector + '"]');

    var text = $anchor.text();

    if (!text.endsWith('...')) {
        return text;
    }

    return $anchor.attr('title');
}

function pasteFromClipboard($rowToPaste) {

    pasteToRow($rowToPaste, document.copiedHours, document.copiedEarningsCode, document.copiedCustomer, document.copiedProject);

}

function pasteToRow($rowToPaste, hours, earningsCode, customer, project) {
    setInputValue($rowToPaste.find(hoursSelector).get(0), hours);
    setInputValue($rowToPaste.find(earningsCodeSelector).get(0), earningsCode);
    setInputValue($rowToPaste.find(customerSelector).get(0), customer);
    setInputValue($rowToPaste.find(projectSelector).get(0), project);
}

function setInputValue(anchor, value) {

    if (isEmpty(value) || !anchor) return;

    anchor.click();
    $("div#EditLayer input").val(value);
}

function addPasteButtons() {
    $("a.btn-paste").remove();

    var pasteImgURL = chrome.extension.getURL("images/paste.png");

    var pasteButton = $("<a href='javascript:void(0);' class='btn-paste'><img src=" + pasteImgURL + " title='Paste data copied in this row'></img></a>");
    pasteButton.click(function () {
        var pasteRow = $(this).parent().parent();

        pasteFromClipboard(pasteRow);
    });
    getGridTable().find("a.btn-copy").after(pasteButton);
    $('a.btn-paste img[title]').qtip({
        style: {classes: 'qtip-dark'},
        content: {title: 'Paste'},
        position: {my: 'bottom left', at: 'top right'}
    });
}

function copyToClipboard($rowToCopy) {

    $rowToCopy.find('input:checkbox').focus();

    document.copiedHours = getValue($rowToCopy, "TOTALHOURS");
    document.copiedEarningsCode = getValue($rowToCopy, "31_");
    document.copiedCustomer = getValue($rowToCopy, "17_");
    document.copiedProject = getValue($rowToCopy, "18_");

    save(document.copiedHours, document.copiedEarningsCode, document.copiedCustomer, document.copiedProject);
}

function addCopyButtons() {

    $("a.btn-copy").remove();

    var copyImgURL = chrome.extension.getURL("images/copy.png");

    var copyButton = $("<a href='javascript:void(0);' class='btn-copy'><img src=" + copyImgURL + " title='Copy the data of this row'></img></a>");
    copyButton.click(function () {

        var copyRow = $(this).parent().parent();

        copyToClipboard(copyRow);

        addPasteButtons();
    });
    getGridTable().find("input[id*='chkSelect_']").after(copyButton);
    $('a.btn-copy img[title]').qtip({
        style: {classes: 'qtip-dark'},
        content: {title: 'Copy'},
        position: {my: 'bottom left', at: 'top right'}
    });
}

function addCloneButtons() {

    $("a.btn-clone").remove();

    var imgURL = chrome.extension.getURL("images/clone.png");

    var button = $("<a href='javascript:void(0);' class='btn-clone'><img src=" + imgURL + " title='Your servant stormtrooper will copy this row and paste it in all workable days. Long live the empire!'></img></a>");
    button.click(function () {

        var copyRow = $(this).parent().parent();

        copyToClipboard(copyRow);

        autoPopulate();

    });
    getGridTable().find("a[id*='IMGNOTELINK_']").before(button);
    $('a.btn-clone img[title]').qtip({
        style: {classes: 'qtip-dark'},
        content: {title: 'Stormtrooper Copy & Paste'},
        position: {my: 'bottom right', at: 'top left'}
    });
}

function isEmpty(value) {
    return !(value && value.trim() != '');
}

addCloneButtons();
addPasteButtons();
addCopyButtons();
addAutoPopulateUI();