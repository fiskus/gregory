// vim: set softtabstop=4 shiftwidth=4:

'use strict';

exports.getClassName = function (props, name) {
    var rootClassName = props.rootClassName || 'clndr';
    var postfix = name ? '-' + name : '';
    return rootClassName + postfix;
};
