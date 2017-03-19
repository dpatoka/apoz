var transformFilter = (function () {
    'use strict';

    function linear(picture, mask, scale) {
        var sum = utils.sum(mask) || 1;
        var pixels = picture.getPixels();

        function applyMask(neigh) {
            var result = 0;
            mask.forEach(function (val, i) {
                result += (val * neigh[i] / sum);
            });
            return result;
        }

        var newData = [];
        pixels.data.forEach((val, i) => {
            var neigh = pixels.getPixelNeighborhood(i);
            newData.push(applyMask(neigh));
        });

        const min = Math.min(...newData);
        const max = Math.max(...newData);
        const diff = max - min;

        newData.forEach((val, i) => {
            switch (scale) {
                case 'trim':
                    val = utils.clamp(val, 0, 255);
                    break;

                case 'trivalent':
                    if (val < 0)
                        val = 0;
                    else if (val > 0)
                        val = 255;
                    else
                        val = 127;
                    break;

                case 'proportion':
                    val = ((val - min) / diff) * 255;
                    break;
            }

            pixels.data[i] = val;
        });

        picture.putPixels(pixels);
    }

    function statistical(picture, type) {
        var pixels = picture.getPixels();
        var newPixels = new Pixels(pixels.width, pixels.height);

        for (let i = 0; i < pixels.length; i++) {
            var neigh = pixels.getPixelNeighborhood(i).sort();
            switch (type) {
                case 'med':
                    newPixels.data[i] = neigh[4];
                    break;
                case 'min':
                    newPixels.data[i] = neigh[0];
                    break;
                case 'max':
                    newPixels.data[i] = neigh[8];
                    break;
            }
        }

        picture.putPixels(newPixels);
    }

    return {
        linear: linear,
        statistical: statistical
    };
})();