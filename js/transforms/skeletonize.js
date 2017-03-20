 var transformSkeletonize = (function () {
    'use strict';

    function mapNeighbors(neigh) {
        var newNeigh = [];
        newNeigh.push(neigh[1], neigh[2], neigh[5], neigh[8], neigh[7], neigh[6], neigh[3], neigh[0]);
        return newNeigh;
    }

    function numberOfTransistions(neigh) {
        var n = 0;
        for (var i = 0; i < neigh.length; i++)
            if (neigh[i] && !neigh[(i + 1) % neigh.length])
                n++;
        return n;
    }

    function numberOfActivePixels(neigh) {
        return neigh.reduce(function (count, val) {
            if (val)
                count++;
            return count;
        }, 0)
    }

    function skeletonize(picture) {
        var pixels = picture.getPixels();
        pixels.data = pixels.data.map(val => (val < 128) ? 1 : 0);

        // Algorytm pocieniania
        do {
            var indicesToRemove = [];

            for (let i = 0; i < pixels.data.length; i++) {
                if (pixels.data[i] === 0)
                    continue; /* Skip inactive pixels */

                var neigh = mapNeighbors(pixels.getPixelNeighborhood(i));
                
                var num = numberOfActivePixels(neigh);
                if (num >= 2 && num <= 6 && numberOfTransistions(neigh) === 1) 
                    if (
                        (!(neigh[0] && neigh[2] && neigh[4]) && !(neigh[2] && neigh[4] && neigh[6]))
                        !==
                        (!(neigh[0] && neigh[2] && neigh[6]) && !(neigh[0] && neigh[4] && neigh[6]))
                    )
                        indicesToRemove.push(i);
            }

            indicesToRemove.forEach(val => pixels.data[val] = 0);

        } while (indicesToRemove.length > 0);

        pixels.data = pixels.data.map(val => (val === 1) ? 0 : 255);
        picture.putPixels(pixels);
    }
    
    return skeletonize;
})();