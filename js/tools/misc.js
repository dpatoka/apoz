 (function () {
    'use strict';

    var rangeElement = document.getElementById('threshold-tool-range');
    var valueElement = document.getElementById('threshold-tool-value');

    rangeElement.addEventListener('change', function () {
        outputPicture.loadImage(primaryPicture.ctx.canvas);
        valueElement.value = this.value;
        transformOnepoint.threshold(outputPicture, this.value);
    });
})();

(function () {
    'use strict';

    var rangeElement = document.getElementById('posterize-tool-range');
    var valueElement = document.getElementById('posterize-tool-value');

    rangeElement.addEventListener('change', function () {
        outputPicture.loadImage(primaryPicture.ctx.canvas);
        valueElement.value = this.value;
        transformOnepoint.posterize(outputPicture, this.value);
    });
})();

(function () {
    'use strict';
    
    function stretching(){
        outputPicture.loadImage(primaryPicture.ctx.canvas);
        transformOnepoint.contrastStretching(outputPicture, {
            minValue: controls[0].valueElement.value,
            maxValue: controls[1].valueElement.value
        });
    }
    
    var controls = [
        {
            rangeElement : document.getElementById('stretch-tool-range-min'),
            valueElement : document.getElementById('stretch-tool-value-min')
        },
        {
            rangeElement : document.getElementById('stretch-tool-range-max'),
            valueElement : document.getElementById('stretch-tool-value-max')
        }
    ];

    for(let c of controls){
        c.rangeElement.addEventListener('change', function () {
            c.valueElement.value = this.value;
            stretching();
        });
    }

})();