(function () {
    'use strict';
    var headerRow = document.querySelector('#uop-tool table tr:nth-child(1)');
    var valuesRow = document.querySelector('#uop-tool table tr:nth-child(2)');
    
    var docFragment = document.createDocumentFragment();
    for (let i = 0; i < 256; i++) {
        let th = document.createElement('td');
        th.textContent = i;
        docFragment.appendChild(th);
    }
    headerRow.appendChild(docFragment);

    docFragment = document.createDocumentFragment();
    for (let i = 0; i < 256; i++) {
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.type = 'text';
        input.size = 2;
        input.min = 0;
        input.max = 255;
        input.value = i;
        td.appendChild(input)
        docFragment.appendChild(td);
    }
    valuesRow.appendChild(docFragment);

    var resetButton = document.getElementById('uop-tool-reset');
    var applyButton = document.getElementById('uop-tool-apply');

    applyButton.addEventListener('click', function () {
        var values = [];
        valuesRow.querySelectorAll('td input').forEach(input => values.push(input.value));
        transformOnepoint.universalMap(outputPicture, values);
    });

    resetButton.addEventListener('click', function () {
        valuesRow.querySelectorAll('td input').forEach((input, i) => input.value = i);
    });
})();