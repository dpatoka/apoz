(function () {
    'use strict';
    
    const applyButtonElement = document.querySelector('#filter-tool-apply');
    const maskElements = document.querySelectorAll('#filter-tool-mask table input[type=text]');
    const selectPresetElement = document.querySelector('#filter-tool-preset select');
    
    applyButtonElement.addEventListener('click', () => {
        var mask = [];
        maskElements.forEach(el => el.value = el.value || 0);
        maskElements.forEach(el => mask.push(parseInt(el.value, 10)));

        var scale = document.querySelector('#filter-tool-scale input[type=radio]:checked').value;

        transformFilter.linear(outputPicture, mask, scale);
    });

    selectPresetElement.addEventListener('change', e => {
        var optionValue = e.target[e.target.selectedIndex].value;

        if (optionValue === 'custom') {
            maskElements.forEach(el => el.readOnly = false);
        } else {
            var temp = optionValue.split('_');
            var type = temp[0];
            var n = temp[1];
            var mask = presetMasks[type][n];

            maskElements.forEach((el, i) => {
                el.value = mask[i];
                el.readOnly = true;
            });
        }
    });

    const presetMasks = {
        'smooth': [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 4, 1, 1, 1, 1],
            [1, 1, 1, 1, 16, 1, 1, 1, 1]
        ],
        'sharpen': [
            [-1, -1, -1, -1,  9, -1, -1, -1, -1],
            [ 0, -1,  0, -1,  5, -1,  0, -1,  0],
            [ 1, -2,  1, -2,  5, -2,  1, -2,  1],
            [ 0, -1,  0, -1, 20, -1,  0, -1,  0]
        ],
        'edge-detect': [
            [  0,  0,  0, -1,  1,  0,  0,  0,  0],
            [  0, -1,  0,  0,  1,  0,  0,  0,  0],
            [ -1,  0,  0,  0,  1,  0,  0,  0,  0]
        ]
    }

})();