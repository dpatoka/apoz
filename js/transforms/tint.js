var transformTint = (function (root) {
    'use strict';

    var tint = function (transformedPicture, params) {
        if(!isDefaultValueChanged(params)){
            return false;
        }
        
        var pixels = transformedPicture.getPixels();
        var newPixelsR = new Pixels(pixels.width, pixels.height);
        var newPixelsG = new Pixels(pixels.width, pixels.height);
        var newPixelsB = new Pixels(pixels.width, pixels.height);

        for (let i = 0; i < pixels.length; i++) {
            let prevousColor = pixels.data[i];

            // switching from 256 to 128
            let newColorIndex = Math.floor(prevousColor / 2) + prevousColor % 2;
            let newColorObj = params[newColorIndex];
            let newColor = newColorObj.Y;

            if (newColor < 22) {
                newPixelsR.data[i] =  255;
                newPixelsG.data[i] =  12 + 12 * newColor;
                newPixelsB.data[i] =  0;
            } else if (newColor < 44) {
                newPixelsR.data[i] =  255 - (12 + 12 * newColor);
                newPixelsG.data[i] =  255;
                newPixelsB.data[i] =  0;
            } else if (newColor < 66) {
                newPixelsR.data[i] =  0;
                newPixelsG.data[i] =  255;
                newPixelsB.data[i] =  12 + 12 * newColor;
            } else if (newColor < 88) {
                newPixelsR.data[i] =  0;
                newPixelsG.data[i] =  225 - (12 + 12 * newColor);
                newPixelsB.data[i] =  255;
            } else if (newColor < 110) {
                newPixelsR.data[i] =  12 + 12 * newColor;
                newPixelsG.data[i] =  0;
                newPixelsB.data[i] =  255;
            } else {
                newPixelsR.data[i] =  255;
                newPixelsG.data[i] =  0;
                newPixelsB.data[i] =  255 - (12 + 12 * newColor);
            }
        }

        transformedPicture.putPixels(newPixelsR, 'red');
        transformedPicture.putPixels(newPixelsG, 'green');
        transformedPicture.putPixels(newPixelsB, 'blue');
    };
    
    var isDefaultValueChanged = function(params){
        var res = params.filter(val => val.X !== val.Y);
        return res.length > 0;
    }
    
    return {tint: tint};

}(this));
