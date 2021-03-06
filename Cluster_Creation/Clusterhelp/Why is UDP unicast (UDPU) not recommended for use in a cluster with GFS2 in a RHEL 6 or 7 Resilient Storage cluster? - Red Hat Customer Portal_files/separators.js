/*global define*/
/*jslint browser: true*/

/**
 * Omniture-specific string separators.
 *
 * @module analytics/separators
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(function () { "use strict";

    /**
     * The string value seaprators.
     *
     * @memberof module:analytics/separators
     * @member {Object}
     */
    return {
        pipe      : " | ",
        dash      : "-",
        comma     : ', ',
        comma_nsp : ',',
        semicolon : ';',
        join      : function (ch) {
            return function(list) {
                return list.join(ch);
            };
        }
    };

});

