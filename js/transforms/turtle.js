var transformTurtle = (function () {
    'use strict';

    function turtle(picture) {
        var pixels = picture.getPixels();
        var redPixels = picture.getPixels('red');
        var greenPixels = picture.getPixels('green');
        var bluePixels = picture.getPixels('blue');
        var x, y;

        // http://www.imageprocessingplace.com/downloads_V3/root_downloads/tutorials/contour_tracing_Abeer_George_Ghuneim/square.html

        function isPixelBlack(x, y) {
            return pixels.getPixel(x, y) < 128;
        }

        var found = false;

        for (x = 0; x < pixels.width && !found; x++)
            for (y = pixels.height - 1; y >= 0; y--)
                if (isPixelBlack(x, y)) {
                    found = true;
                    break;
                }

        found = false;
        const startX = x;
        const startY = y;
        var direction = 'UP';
        var isBlack;

        while (!found) {
            isBlack = isPixelBlack(x, y);

            if (isBlack) {
                // Set to yellow
                redPixels.setPixel(x, y, 255);
                greenPixels.setPixel(x, y, 255);
                bluePixels.setPixel(x, y, 0);

                // Turn left
                switch (direction) {
                    case 'UP': 
                        x--;
                        direction = 'LEFT';
                        break;
                    case 'RIGHT': 
                        y--;
                        direction = 'UP';
                        break;
                    case 'DOWN': 
                        x++;
                        direction = 'RIGHT'; 
                        break;
                    case 'LEFT': 
                        y++;
                        direction = 'DOWN'; 
                        break;
                }
            } else {
                // Turn right
                switch (direction) {
                    case 'UP': 
                        x++;
                        direction = 'RIGHT';
                        break;
                    case 'RIGHT': 
                        y++;
                        direction = 'DOWN';
                        break;
                    case 'DOWN': 
                        x--;
                        direction = 'LEFT'; 
                        break;
                    case 'LEFT': 
                        y--;
                        direction = 'UP'; 
                        break;
                }
            }
            
            if (x === startX && y === startY)
                found = true;
            if (x < 0 || x >= pixels.width || y < 0 || y >= pixels.height) {
                alert('Out of bounds :(');
                break;
            }
        }

        picture.putPixels(redPixels, 'red');
        picture.putPixels(greenPixels, 'green');
        picture.putPixels(bluePixels, 'blue');
    }

    return turtle;
})();