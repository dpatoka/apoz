var utils = (function () {
    'use strict';

    function sum(array) {
        return array.reduce((a, b) => a + b, 0);
    }

    function min(array){
        return Math.min(...array)
    }

    function max(array){
        return Math.max(...array)
    }

    function clamp(number, a, b) {
        return Math.max(a, Math.min(number, b));
    }
    
    function average(array){
        return Math.floor(array.reduce((a, b) => (a + b)) / array.length);
    }

    return {
        sum: sum,
        min: min,
        max: max,
        clamp: clamp,
        average: average,
    };
})();