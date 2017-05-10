/**
 * Created by SPOSMEN on 5/9/17.
 */
function DateSelectorHelper() {
  this.beginDateContainer = $('#BeginDate');
  this.endDateContainer = $('#EndDate');
  this.periodSelectorValue = $('#ctrlDtRangeSelector_SelectionItem').val();
  this.addButtons();
}


DateSelectorHelper.prototype.addButtons = function () {
  // TODO add 17 option for Custom Range
  if (["3", "4", "7", "9", "10"].indexOf(this.periodSelectorValue) === -1) {
    return null;
  }
  this.btnGo = $('button#btnGo');
  this.container = this.btnGo.parent();
  this.backBtn = $('<button style="border: none; background: none;"><table border="0" padding="0" spacing="0" class="TBLb_none TBLr_none" style="border-collapse:collapse;"><tbody><tr><td style="padding:0" class="P_LeftButtonCell_1">&nbsp;</td><td style="padding:0; padding-bottom:2px" class="P_MiddleButtonCell_1">&lt;&lt;</td><td style="padding:0" class="P_RightButtonCell_1">&nbsp;</td></tr></tbody></table></button>').on('click', this.backPressed.bind(this));
  this.nextBtn = $('<button style="border: none; background: none;"><table border="0" padding="0" spacing="0" class="TBLb_none TBLr_none" style="border-collapse:collapse;"><tbody><tr><td style="padding:0" class="P_LeftButtonCell_1">&nbsp;</td><td style="padding:0; padding-bottom:2px" class="P_MiddleButtonCell_1">&gt;&gt;</td><td style="padding:0" class="P_RightButtonCell_1">&nbsp;</td></tr></tbody></table></button>').on('click', this.nextPressed.bind(this));
  this.container.append(this.backBtn).append(this.nextBtn);
};

DateSelectorHelper.prototype.backPressed = function (e) {
  e.preventDefault();
  this.updateDates();
  this.go(-1);

};

DateSelectorHelper.prototype.nextPressed = function (e) {
  e.preventDefault();
  this.updateDates();
  this.go(1);
};

DateSelectorHelper.prototype.go = function (sign) {
  this.beginDateContainer.val(this.getFormattedDate(this.setDateChange(this.beginDate, sign)));
  this.endDateContainer.val(this.getFormattedDate(this.setDateChange(this.endDate, sign)));
};

DateSelectorHelper.prototype.setDateChange = function (date, sign) {
  switch (this.periodSelectorValue) {
    case "3":
    case "4":
    case "7":
      date.setDate(date.getDate() + (7 * sign));
      return date;
    case "9":
    case "10":
      var reversedLastDay = 1;
      if (date.getDate() !== 1) {
        reversedLastDay = 0;
      }
      return new Date(date.getFullYear(), date.getMonth() + sign + (!reversedLastDay ? 1 : 0 ), reversedLastDay);
    // TODO Implement this for Custom Range
    case "17":
      return new Date((+date) + (this.getDateDifference() * sign));
    default:
      return date;
  }
};
// TODO Implement this for Custom Range
DateSelectorHelper.prototype.getDateDifference = function () {
  return (+this.endDate) - (+this.beginDate);
};

DateSelectorHelper.prototype.getFormattedDate = function (date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
};

DateSelectorHelper.prototype.updateDates = function () {
  this.beginDate = new Date(this.beginDateContainer.val());
  this.endDate = new Date(this.endDateContainer.val());
};


new DateSelectorHelper();