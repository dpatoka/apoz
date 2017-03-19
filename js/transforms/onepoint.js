var transformOnepoint = (function () {
    'use strict';

    function negate(picture) {
        var pixels = picture.getPixels();

        for (var i = 0; i < pixels.length; i++)
            pixels.setPixel(i, 255 - pixels.getPixel(i));

        picture.putPixels(pixels);
    }

    function threshold(picture, value) {
        var pixels = picture.getPixels();

        for (let i = 0; i < pixels.length; i++)
            pixels.setPixel(i, (pixels.getPixel(i) > value) ? 255 : 0);
        
        picture.putPixels(pixels);
    }

    function posterize(picture, levels) {
        var pixels = picture.getPixels();
        var boxSize = 256 / levels;
        var colorInterval = 256 / (levels - 1);
        var boxNumber;

        for (let i = 0; i < pixels.length; i++) {
            boxNumber = Math.floor(pixels.data[i] / boxSize);
            pixels.data[i] = Math.floor(boxNumber * colorInterval);
        }
        
        picture.putPixels(pixels);
    }

    function arithmeticLogic(picture, params) {
        var outputImageData = picture.getImageData();
        var outputImageDataData = outputImageData.data;
        var primaryImageDataData = params.primary.getImageData().data;
        var secondaryImageDataData = params.secondary.getImageData().data;

        if (primaryImageDataData.length !== secondaryImageDataData.length) {
            alert('Wczytane obrazy muszą być tego samego rozmiaru.');
            return;
        }

        for (let i = 0; i < outputImageDataData.length; i++) {
            if (i % 4 === 3)
                continue; // Skip transparency values
            switch (params.operation) {
                case 'add':
                    outputImageDataData[i] = (primaryImageDataData[i] + secondaryImageDataData[i]) / 2;
                    break;
                case 'sub':
                    outputImageDataData[i] = Math.abs(primaryImageDataData[i] - secondaryImageDataData[i]);
                    break;
                case 'mul':
                    outputImageDataData[i] = (primaryImageDataData[i] * secondaryImageDataData[i]) + primaryImageDataData[i];
                    break;
                case 'and':
                    outputImageDataData[i] = primaryImageDataData[i] & secondaryImageDataData[i];
                    break;
                case 'or':
                    outputImageDataData[i] = primaryImageDataData[i] | secondaryImageDataData[i];
                    break;
                case 'xor':
                    outputImageDataData[i] = primaryImageDataData[i] ^ secondaryImageDataData[i];
                    break;
            }
        }

        picture.putImageData(outputImageData);
    }

    function universalMap(picture, map) {
        var pixels = picture.getPixels();

        for (let i = 0; i < pixels.length; i++)
            pixels.data[i] = map[pixels.data[i]];
        
        picture.putPixels(pixels);
    }
    
    function contrastStretching(picture, params){
        var pixelSetBeforeChange = picture.getPixels();
        var pixelSetAfterChange = new Pixels(picture.width, picture.height);
        
        var minValue = parseInt(params.minValue, 10);
        var maxValue = parseInt(params.maxValue, 10);

        for (let i = 0; i < pixelSetBeforeChange.length; i++) {
            let pixelBeforeChange = pixelSetBeforeChange.getPixel(i);
            let pixelAfterChange = 0;

            if (pixelBeforeChange > minValue && pixelBeforeChange <= maxValue) {
                pixelAfterChange = Math.round((pixelBeforeChange - minValue) * (255 / (maxValue - minValue)));
            }
            pixelSetAfterChange.setPixel(i, pixelAfterChange);
        }
        picture.putPixels(pixelSetAfterChange);
    }

    return {
        negate: negate,
        threshold: threshold,
        posterize: posterize,
        arithmeticLogic: arithmeticLogic,
        universalMap: universalMap,
        contrastStretching: contrastStretching
    }
})();