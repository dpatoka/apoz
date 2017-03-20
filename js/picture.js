var Picture = (function () {
    'use strict';
    var Picture = function (pictureBoxId) {
        var pictureBox = document.getElementById(pictureBoxId);

        this.ctx = pictureBox.querySelector('canvas.picture').getContext('2d');
        this.histogramCtxs = Array.from(pictureBox.querySelectorAll('canvas.histogram')).map(val => val.getContext('2d'));

        Object.defineProperty(this, 'width', {
            get: function () {
                return this.ctx.canvas.width;
            },
            set: function (val) {
                this.ctx.canvas.width = val;
            }
        });

        Object.defineProperty(this, 'height', {
            get: function () {
                return this.ctx.canvas.height;
            },
            set: function (val) {
                this.ctx.canvas.height = val;
            }
        });
    }

    Picture.prototype.loadImage = function (image) {
        this.width = image.width;
        this.height = image.height;
        this.ctx.drawImage(image, 0, 0);
        this.update();
    }

    Picture.prototype.loadGrayscaleImage = function (image) {
        this.width = image.width;
        this.height = image.height;
        this.ctx.drawImage(image, 0, 0);

        var imageData = this.getImageData();
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
            //let gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
            data[i + 1] = data[i + 2] = data[i];
        }

        this.putImageData(imageData);
    }

    Picture.prototype.getImageData = function () {
        return this.ctx.getImageData(0, 0, this.width, this.height);
    }

    Picture.prototype.putImageData = function (imageData) {
        this.ctx.putImageData(imageData, 0, 0);
        this.update();
    }

    Picture.prototype.getPixels = function (channel) {
        var data = this.getImageData().data;
        var pixels = new Pixels(this.width, this.height);
        var shift;

        switch (channel) {
            case undefined:
            case 'red':
                //return new Pixels(data.filter((val, i) => i % 4 === 0), this.width, this.height);
                shift = 0;
                break;
            case 'green':
                //return new Pixels(data.filter((val, i) => (i - 1) % 4 === 0), this.width, this.height);
                shift = 1;
                break;
            case 'blue':
                //return new Pixels(data.filter((val, i) => (i - 2) % 4 === 0), this.width, this.height);
                shift = 2;
                break;
        }

        for (let i = 0; i < pixels.length; i++) {
            pixels.data[i] = data[i*4 + shift];
        }

        return pixels;
    }

    Picture.prototype.putPixels = function (pixels, channel) {
        var imageData = this.getImageData();
        var data = imageData.data;
        var pixelsData = pixels.data;

        switch (channel) {
            case undefined:
                pixelsData.forEach((val, i) => {
                    i *= 4;
                    data[i] = data[i + 1] = data[i + 2] = val;
                });
                break;
            case 'red':
                pixelsData.forEach((val, i) => {
                    i *= 4;
                    data[i] = val;
                });
                break;
            case 'green':
                pixelsData.forEach((val, i) => {
                    i *= 4;
                    data[i + 1] = val;
                });
                break;
            case 'blue':
                pixelsData.forEach((val, i) => {
                    i *= 4;
                    data[i + 2] = val;
                });
                break;
        }

        this.putImageData(imageData);
    }

    Picture.prototype.getPixelCounts = function (channel) {
        if (channel === undefined)
            channel = 'red';
        var pixelsData = this.getPixels(channel).data;
     
        var counts = new Array(256);
        counts.fill(0);

        // for (let val of pixelsData)
        //     counts[val]++;
        for (let i = 0; i < pixelsData.length; i++)
            counts[pixelsData[i]]++;

        return counts;
    }

    Picture.prototype.update = function () {
        function updateHistogram(ctx, i) {
            var hist = this.getPixelCounts(['red', 'green', 'blue'][i]);
            const max = Math.max(...hist);
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = ['#cc0000', '#00cc00', '#0000cc'][i];

            for (let i = 0; i < 256; i++) {
                let len = Math.round((hist[i] / max) * height);
                ctx.fillRect(i, height, 1, -len);
            }
        }
        this.histogramCtxs.forEach(updateHistogram, this);
    }

    return Picture;
})();