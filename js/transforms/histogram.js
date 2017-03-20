var transformHistogram = (function (root) {
    'use strict';

    var mode = {
        MEDIUM: 1,
        RANDOM: 2,
        NEIGHBOURHOOD: 3,
        CUSTOM: 4
    };
    
    function equalizationMedium(can) {
        _equalization(can, mode.MEDIUM);
    }

    function equalizationRandom(can) {
        _equalization(can, mode.RANDOM);
    }

    function equalizationNeighbourhood(can) {
        _equalization(can, mode.NEIGHBOURHOOD);
    }

    function equalizationCustom(can) {
        _equalization(can, mode.CUSTOM);
    }

    /**
     * Uzyty algorytm APOZ Wykl. 1 s. 3
     */
    function _equalization(picture, method) {
        /* Krok 0 i 1 */
        var histogram = picture.getPixelCounts();
        var histogramAvg = utils.average(histogram);
        var histogramIntegral = 0;

        /* 2 */
        var newValues = new Array();
        var leftValues = new Array();
        var rightValues = new Array();
        for (let oldLevel = 0, newLevel = 0; oldLevel < histogram.length; ++oldLevel) {
            leftValues[oldLevel] = rightValues[oldLevel] = newValues[oldLevel] = 0;

            /* 3 */
            leftValues[oldLevel] = newLevel;
            if (histogram[oldLevel] !== 'undefined') {
                histogramIntegral += histogram[oldLevel];
            }

            /* 4 i 5 */
            while (histogramIntegral > histogramAvg) {
                histogramIntegral -= histogramAvg;
                newLevel++;
            }

            /* 6 */
            rightValues[oldLevel] = newLevel;
            if (method === mode.MEDIUM) {
                newValues[oldLevel] = (leftValues[oldLevel] + rightValues[oldLevel]) / 2;
            } else if (method === mode.RANDOM) {
                newValues[oldLevel] = rightValues[oldLevel] - leftValues[oldLevel];
            } else if (method === mode.NEIGHBOURHOOD) {
                newValues[oldLevel] = null;
            } else if (method === mode.CUSTOM) {
                if(leftValues[oldLevel] > rightValues[oldLevel]){
                    newValues[oldLevel] = leftValues[oldLevel];
                }else{
                    newValues[oldLevel] = rightValues[oldLevel];
                }
            }
        }

        var pixelSetBeforeChange = picture.getPixels();
        var pixelSetAfterChange = new Pixels(picture.width, picture.height);

        /* 7 */
        for (let i = 0; i < pixelSetBeforeChange.length; i++) {
            let pixelBeforeChange = pixelSetBeforeChange.getPixel(i);
            let pixelAfterChange;
            let pixelNeighbours;
            let avgPixelValue;
            let maxPixelValue;

            let x = (i % picture.height) + 1;
            let y = Math.floor(i / picture.width) + 1;
            pixelAfterChange = 0;


            /* 8 */
            if (leftValues[pixelBeforeChange] === rightValues[pixelBeforeChange]) {
                pixelAfterChange = leftValues[pixelBeforeChange];

            /* 9 */
            } else {
                if (method === mode.MEDIUM) {
                    pixelAfterChange = newValues[pixelBeforeChange];
                } else if (method === mode.RANDOM) {
                    pixelAfterChange = _.random(0, newValues[pixelBeforeChange]) + leftValues[pixelBeforeChange];
                } else if (method === mode.NEIGHBOURHOOD) {
                    pixelNeighbours = pixelSetBeforeChange.getPixelNeighborhood(x, y);
                    avgPixelValue = utils.average(pixelNeighbours);

                    if (avgPixelValue > rightValues[pixelBeforeChange]) {
                        pixelAfterChange = rightValues[pixelBeforeChange];
                    } else if (avgPixelValue < leftValues[pixelBeforeChange]) {
                        pixelAfterChange = leftValues[pixelBeforeChange];
                    } else {
                        pixelAfterChange = avgPixelValue;
                    }
                } else if (method === mode.CUSTOM) {
                    pixelNeighbours = pixelSetBeforeChange.getPixelNeighborhood(x, y);
                    maxPixelValue = utils.max(pixelNeighbours);

                    if (maxPixelValue > rightValues[pixelBeforeChange]) {
                        pixelAfterChange = rightValues[pixelBeforeChange];
                    } else if (maxPixelValue < leftValues[pixelBeforeChange]) {
                        pixelAfterChange = leftValues[pixelBeforeChange];
                    } else {
                        pixelAfterChange = maxPixelValue;
                    }
                }  
            }
            pixelSetAfterChange.setPixel(i, pixelAfterChange);
        }
        picture.putPixels(pixelSetAfterChange);
    }
    
    return {
        equalizationMedium: equalizationMedium,
        equalizationRandom: equalizationRandom,
        equalizationNeighbourhood: equalizationNeighbourhood,
        equalizationCustom: equalizationCustom
    };

}(this));