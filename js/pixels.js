// HOWTO
// function someArbitraryTransform(picture) {
//     var pixels = picture.getPixels(); // get object representing one channel of pixels
//     // use Pixels methods or manipulate pixels.data array directly
//     picture.putPixels(pixels); // put pixels back, update the picture
// } 

var Pixels = (function () { 
    function Pixels(width, height) {
        Object.defineProperty(this, 'width', {
            value: width,
            writable: false
        });
        Object.defineProperty(this, 'height', {
            value: height,
            writable: false
        });
        Object.defineProperty(this, 'length', {
            value: width * height,
            writable: false
        });
        this.data = new Uint8ClampedArray(this.length);
    }

    // getPixelNeighborhood(index)
    // getPixelNeighborhood(index, type)
    // getPixelNeighborhood(x, y)
    // getPixelNeighborhood(x, y, type)
    Pixels.prototype.getPixelNeighborhood = function () {  
        var index, x, y, type

        if (arguments.length >= 2 && typeof arguments[1] === 'number') {
            x = arguments[0];
            y = arguments[1];
            index = x + y * this.width;
            if (arguments.length >= 3)
                type = arguments[2];
        } else {
            index = arguments[0];
            x = arguments[0] % this.width;
            y = Math.floor(arguments[0] / this.width);
            if (arguments.length >= 2)
                type = arguments[1];
        }

        var isCross, neigh;

        if (type === 'cross') {
            isCross = true;
            neigh = new Uint8ClampedArray(5);
        } else {
            isCross = false;
            neigh = new Uint8ClampedArray(9);
        }

        var i = 0;
        const xMax = this.width - 1;
        const yMax = this.height - 1;

        // 0 1 2
        // 3 4 5
        // 6 7 8

        /* 0 */
        if (!isCross) {
            if (x > 0 && y > 0)
                neigh[i++] = this.data[index - this.width - 1];
            else if (x > 0)
                neigh[i++] = this.data[index - 1];
            else if (y > 0)
                neigh[i++] = this.data[index - this.width];
            else
                neigh[i++] = this.data[index];
        }

        /* 1 */
        if (y > 0)
            neigh[i++] = this.data[index - this.width];
        else
            neigh[i++] = this.data[index];

        /* 2 */
        if (!isCross) {
            if (x < xMax && y > 0)
                neigh[i++] = this.data[index - this.width + 1];
            else if (x < xMax)
                neigh[i++] = this.data[index + 1];
            else if (y > 0)
                neigh[i++] = this.data[index - this.width];
            else
                neigh[i++] = this.data[index];
        }

        /* 3 */
        if (x > 0)
            neigh[i++] = this.data[index - 1];
        else
            neigh[i++] = this.data[index];
        
        /* 4 */
        neigh[i++] = this.data[index];

        /* 5 */
        if (x < xMax)
            neigh[i++] = this.data[index + 1];
        else
            neigh[i++] = this.data[index];
        
        /* 6 */
        if (!isCross) {
            if (x > 0 && y < yMax)
                neigh[i++] = this.data[index + this.width - 1];
            else if (x > 0)
                neigh[i++] = this.data[index - 1];
            else if (y < yMax)
                neigh[i++] = this.data[index + this.width];
            else
                neigh[i++] = this.data[index];
        }
        
        /* 7 */
        if (y < yMax)
            neigh[i++] = this.data[index + this.width];
        else
            neigh[i++] = this.data[index];
        
        /* 8 */
        if (!isCross) {
            if (x < xMax && y < yMax)
                neigh[i++] = this.data[index + this.width + 1];
            else if (x < xMax)
                neigh[i++] = this.data[index + 1];
            else if (y < yMax)
                neigh[i++] = this.data[index + this.width];
            else
                neigh[i++] = this.data[index];
        }

        return neigh;
    }

    // getPixel(index)
    // getPixel(x, y)
    Pixels.prototype.getPixel = function () {
        var index;
        if (arguments.length === 2)
            index = arguments[0] + arguments[1] * this.width;
        else
            index = arguments[0];
        return this.data[index];
    }

    // setPixel(index, value)
    // setPixel(x, y, value)
    Pixels.prototype.setPixel = function () {
        var index, value;
        if (arguments.length === 3) {
            index = arguments[0] + arguments[1] * this.width;
            value = arguments[2];
        } else {
            index = arguments[0];
            value = arguments[1];
        }
        this.data[index] = value;
    }

    return Pixels;
})();