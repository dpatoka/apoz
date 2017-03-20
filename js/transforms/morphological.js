var transformMorphological = (function () {
    'use strict';

    function _morph(picture, shape, fn) {
        var pixels = picture.getPixels();
        var newPixels = new Pixels(pixels.width, pixels.height);

        for (let i = 0; i < pixels.length; i++) {
            newPixels.data[i] = fn(pixels.getPixelNeighborhood(i, shape));
        }

        picture.putPixels(newPixels);
    }

    function erode(picture, shape) {
        _morph(picture, shape, utils.min);
    }

    function dilate(picture, shape) {
        _morph(picture, shape, utils.max);
    }

    function open() {
        this.erode.apply(this, arguments);
        this.dilate.apply(this, arguments);
    }

    function close() {
        this.dilate.apply(this, arguments);
        this.erode.apply(this, arguments);
    }

    return {
        erode: erode,
        dilate: dilate,
        open: open,
        close: close
    };
})();