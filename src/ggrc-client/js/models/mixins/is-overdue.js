/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Mixin from './mixin';

/**
 * Specific Model mixin to check overdue status
 */
export default Mixin('isOverdue', {
}, {
  'after:init': function () {
    this.attr('isOverdue', this._isOverdue());
    this.bind('change', function () {
      this.attr('isOverdue', this._isOverdue());
    }.bind(this));
  },
  _isOverdue: function () {
    let doneState = this.attr('is_verification_needed') ?
      'Verified' : 'Finished';
    let endDate = moment(
      this.attr('next_due_date') || this.attr('end_date'));
    let today = moment().startOf('day');
    let startOfDate = moment(endDate).startOf('day');
    let isOverdue = endDate && today.diff(startOfDate, 'days') > 0;

    if (this.attr('status') === doneState) {
      return false;
    }
    return isOverdue;
  },
});
