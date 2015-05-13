// vim: set sw=4 ts=4 expandtab:

// jshint strict: false

var Gregory = require('./calendar.js');

(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    // jshint undef: false
    if (typeof define === 'function' && define.amd) {
        define( 'gregory', [], function() {
            return Gregory;
        });
    }

    window.Gregory = Gregory;

    return Gregory;
}));
