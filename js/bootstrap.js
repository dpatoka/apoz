var bootstrap = (function () {
    'use strict';

    function start() {
        window.primaryPicture = new Picture('primary-picture-box');
        window.secondaryPicture = new Picture('secondary-picture-box');
        window.outputPicture = new Picture('output-picture-box');
        
        menu.start();
    }

    window.onload = function () {
        bootstrap.start();
    };

    return {
        start: start
    };
})();