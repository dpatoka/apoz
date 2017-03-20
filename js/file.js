(function () {
    'use strict';

    const $ = document.getElementById.bind(document); // alias

    function loadFile(file, picture) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () { 
                picture.loadGrayscaleImage(this);
                $('menu-reset').click();
            };
            img.onerror = function () {
                alert('Wystąpił błąd podczas wczytywania pliku ' + file.name + '.');
            };
            img.src = e.target.result;
        };     
        reader.readAsDataURL(file);
    }

    $('primary-input').addEventListener('change', function () {
        loadFile(this.files[0], primaryPicture);
    });

    $('secondary-input').addEventListener('change', function () {
        loadFile(this.files[0], secondaryPicture);
    });
})();