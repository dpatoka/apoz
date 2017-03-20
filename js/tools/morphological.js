(function () {
    'use strict';

    var operationsElements = document.querySelectorAll('#morphological-tool-operations button');

    operationsElements.forEach(el => el.addEventListener('click', e => {
        var operation = e.target.value;
        var shape = document.querySelector('#morphological-tool-shapes input:checked').value;
        transformMorphological[operation](outputPicture, shape);
    }));
})();