var colorPicker = (function () {
    'use strict';

    function start() {
        var outputPicture = document.querySelector('#output-picture-box .picture');
        var colorPicker = document.getElementById('colorPicker');
        outputPicture.addEventListener('mousemove', function (ev) {
            pickColor(ev, colorPicker, outputPicture.getContext('2d'));
        });
    }

    function pickColor(event, htmlElement, context) {
        var x = event.layerX;
        var y = event.layerY;
        var pixel = context.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ',' + data[1] +
                ',' + data[2] + ',' + (data[3] / 255) + ')';

        var hsv = rgbToHsv(data[0], data[1], data[2]);  
        htmlElement.style.background = rgba;
//        htmlElement.innerHTML = 'R: ' + data[0] + ', ';
//        htmlElement.innerHTML += 'G: ' + data[1] + ', ';
//        htmlElement.innerHTML += 'B: ' + data[2] + ', ';
        htmlElement.innerHTML = 'H: ' + hsv[0] + ', ';
        htmlElement.innerHTML += 'S: ' + hsv[1] + ', ';
        htmlElement.innerHTML += 'V: ' + hsv[2] + ', ';
        htmlElement.innerHTML += 'x: ' + x + ', ';
        htmlElement.innerHTML += 'y: ' + y + '';
    }

    // http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
    function rgbToHsv(r, g, b) {
        r = r / 255, g = g / 255, b = b / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, v];
    }


    return {
        start: start
    };
})();