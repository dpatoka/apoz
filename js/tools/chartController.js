var chartController = (function () {
    'use strict';
    var xPadding = 30;
    var yPadding = 30;
    var scaleRatio = 1;
    var data = {values: []};
    var graph0 = document.getElementById("graph_layer_0");
    var graph1 = document.getElementById("graph_layer_1");
    var ctx0 = graph0.getContext('2d');
    var ctx1 = graph1.getContext('2d');

    function start(okButtonId, resetButtonId) {
        var okButton = document.getElementById(okButtonId);
        okButton.removeEventListener('click', makeTint, false);
        okButton.addEventListener('click', makeTint);

        var resetButton = document.getElementById(resetButtonId);
        resetButton.removeEventListener('click', prepareChart, false);
        resetButton.addEventListener('click', prepareChart);

        graph1.addEventListener('mousedown', mousedown);
        graph1.addEventListener('mouseup', function () {
            graph1.removeEventListener('mousemove', draw);
        });

        prepareChart();
    }
    
    function makeTint(){
        transformTint.tint(window.outputPicture, data['values']);
    }

    function prepareChart(){
        ctx0.clearRect(0, 0, graph1.width, graph1.height);
        ctx1.clearRect(0, 0, graph1.width, graph1.height);
        setDataDefaultValues();
        drawChart();
        drawLineGraph();
        drawCaption();
    }

    function setDataDefaultValues() {
        var x, y;
        for (x = 0, y = 0; x <= 128; x++, y++) {
            data['values'][x] = {X: x, Y: y};
        }
    }

    function getMaxY() {
        var max = 0;

        for (var i = 0; i < data.values.length; i++) {
            if (data.values[i].Y > max) {
                max = data.values[i].Y;
            }
        }
        return max;
    }

    function getXPixel(val) {
        return val * scaleRatio + xPadding;
    }

    function getYPixel(val) {
        return graph1.height - val * scaleRatio - yPadding;
    }

    function getYPixelValue(val) {
        return graph1.height - val / scaleRatio - yPadding + 3;
    }

    function drawChart() {
        ctx0.lineWidth = 1;
        ctx0.strokeStyle = '#333';
        ctx0.font = 'italic 10pt sans-serif';
        ctx0.textAlign = "center";

        ctx0.beginPath();
        ctx0.moveTo(xPadding, 10);
        ctx0.lineTo(xPadding, graph0.height - yPadding); // y axis
        ctx0.lineTo(graph0.width, graph0.height - yPadding); // x axis
        ctx0.stroke();
        
        // red square
        ctx0.strokeStyle = '#ffb3b3';
        ctx0.lineWidth = 2;
        ctx0.beginPath();
        ctx0.moveTo(25, 33);
        ctx0.lineTo(150, 33);
        ctx0.stroke();

        ctx0.beginPath();
        ctx0.moveTo(150, 33);
        ctx0.lineTo(150, 155);
        ctx0.stroke();
    }

    function drawLineGraph() {
        ctx1.beginPath();
        ctx1.moveTo(getXPixel(data.values[0].X), getYPixel(data.values[0].Y));
        for (var i = 1; i < data.values.length - 10; i++) {
            ctx1.fillRect(getXPixel(data.values[i].X), getYPixel(data.values[i].Y), 2, 2);
        }
        ctx1.stroke();
    }

    function mousedown(event) {
        var x = event.layerX / scaleRatio - xPadding;
        var y = event.layerY / scaleRatio - yPadding;
        var yVal = getYPixelValue(event.layerY);

        draw(event);
        graph1.addEventListener('mousemove', draw);
    }

    function draw(event) {
        var x = event.layerX / scaleRatio - xPadding;
        var y = event.layerY / scaleRatio - yPadding;
        if (x <= 0 || x > 118 || y <= 0 || y > 118) {
            graph1.removeEventListener('mousemove', draw);
            return false;
        }

        ctx1.beginPath();
        ctx1.clearRect(getXPixel(data['values'][x].X), 20, 4, getMaxY());
        ctx1.fillRect(x + xPadding, y + yPadding, 2, 2);
        data['values'][x].Y = getYPixelValue(event.layerY);

    }

    function drawCaption() {
        ctx0.lineWidth = 1;
        ctx0.strokeStyle = '#333';
        ctx0.font = 'italic 10pt sans-serif';
        ctx0.textAlign = "center";
        ctx0.fillStyle = '#333';
        ctx0.fillText("stare wartości", graph0.width - 45, graph0.height);
        ctx0.save();
        ctx0.translate(25, 0);
        ctx0.rotate(3 * Math.PI / 2);
        ctx0.textAlign = "right";
        ctx0.fillText("nowe wartości", -15, -10);
        ctx0.restore();
        
        ctx0.fillStyle = '#e60000';
        ctx0.fillText("128", 30, 30);
        ctx0.fillText("0", 30, 162);
        ctx0.fillText("128", 150, 162);
    }

    return {
        start: start
    };
})();