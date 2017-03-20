var menu = (function () {
    'use strict';
    const $ = document.getElementById.bind(document); // alias

    const menuItems = [
        {
            id: 'menu-open-primary-file',
            action: function () {
                $('primary-input').click();
            },
            key: 'o'
        },
        {
            id: 'menu-open-secondary-file',
            action: function () {
                $('secondary-input').click();
                $('secondary-picture-box').style.display = 'block';
            }
        },
        {
            id: 'menu-duplicate',
            action: function () {
                secondaryPicture.loadImage(primaryPicture.ctx.canvas);
                $('secondary-picture-box').style.display = 'block';
            },
            key: 'd'
        },
        {
            id: 'menu-reset',
            action: function () {
                outputPicture.loadImage(primaryPicture.ctx.canvas);
                jQuery('#menu-reset').trigger('reset');
            },
            key: 'r'
        },
        {
            id: 'menu-negate',
            action: function () {
                transformOnepoint.negate(outputPicture);
            }
        },
        {
            id: 'menu-threshold',
            action: function () {
                showTool('threshold');
            }
        },
        {
            id: 'menu-posterize',
            action: function () {
                showTool('posterize');
            }
        },
        {
            id: 'menu-stretch',
            action: function () {
                showTool('stretch');
            }
        },
        {
            id: 'menu-arithmetic-add',
            action: arithmeticLogicAction.bind(null, 'add')
        },
        {
            id: 'menu-arithmetic-subtract',
            action: arithmeticLogicAction.bind(null, 'sub')
        },
        {
            id: 'menu-arithmetic-multiply',
            action: arithmeticLogicAction.bind(null, 'mul')
        },
        {
            id: 'menu-logic-and',
            action: arithmeticLogicAction.bind(null, 'and')
        },
        {
            id: 'menu-logic-or',
            action: arithmeticLogicAction.bind(null, 'or')
        },
        {
            id: 'menu-logic-xor',
            action: arithmeticLogicAction.bind(null, 'xor')
        },
        {
            id: 'menu-filter-linear',
            action: function () {
                showTool('filter');          
            }
        },
        {
            id: 'menu-filter-minimum',
            action: function () {
                transformFilter.statistical(outputPicture, 'min');
            }
        },
        {
            id: 'menu-filter-maximum',
            action: function () {
                transformFilter.statistical(outputPicture, 'max');
            }
        },
        {
            id: 'menu-filter-median',
            action: function () {
                transformFilter.statistical(outputPicture, 'med');
            }
        },
        {
            id: 'menu-morphological',
            action: function () {
                showTool('morphological');          
            }
        },
        {
            id: 'menu-histogram-eq-avg',
            action: function () {
                transformHistogram.equalizationMedium(outputPicture);
            }
        },
        {
            id: 'menu-histogram-eq-neigh',
            action: function () {
                transformHistogram.equalizationNeighbourhood(outputPicture);
            }
        },
        {
            id: 'menu-histogram-eq-rand',
            action: function () {
                transformHistogram.equalizationRandom(outputPicture);
            }
        },
        {
            id: 'menu-histogram-eq-custom',
            action: function () {
                transformHistogram.equalizationCustom(outputPicture);
            }
        },
        {
            id: 'menu-tint',
            action: function () {
                jQuery('.tool').hide();
                jQuery('.tint-tool').show();
                chartController.start('tint-button', 'menu-reset');
                colorPicker.start();

            }
        },
        {
            id: 'menu-skeletonize',
            action: function () {
                transformSkeletonize(outputPicture);
            }
        },
        {
            id: 'menu-turtle',
            action: function () {
                transformTurtle(outputPicture);
            }
        },
        {
            id: 'menu-uop',
            action: function () {
                showTool('uop');
            }
        }
    ];

    function showTool(tool) {
        document.querySelectorAll('.tool').forEach(tool => tool.style.display = 'none');
        document.getElementById(tool + '-tool').style.display = 'block';
    }

    function arithmeticLogicAction(op) {
        transformOnepoint.arithmeticLogic(outputPicture, {
            operation: op,
            primary: primaryPicture,
            secondary: secondaryPicture
        });
    }

    function start() {
        /* Buttons */
        for (let item of menuItems)
            $(item.id).addEventListener('click', item.action);

       /* Keyboard shortcuts */ 
        const menuItemsWithKeys = menuItems.filter(function (el) {
            return 'key' in el;
        });
        document.addEventListener('keypress', function (e) {
            for (let item of menuItemsWithKeys)
                if (e.key.toLowerCase() === item.key)
                    item.action();
        });
    }

    return {
        start: start
    };
})();