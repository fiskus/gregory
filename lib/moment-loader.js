// vim: set sw=4 ts=4 expandtab:
// jshint undef: false
moment = typeof moment === 'undefined' ? require('moment') : moment;
require('moment/locale/ru');
moment.locale('ru');
module.exports = moment;
