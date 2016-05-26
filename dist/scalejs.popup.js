
define('text!scalejs.popup/popup.html',[],function () { return '<div id="popup_template">\n    <div class="popup-container" id="popup-container" data-bind="css: { \'popup-hidden\' : !popupVisible() }">\n        <!-- ko if: modal -->\n            <div class="popup-background"></div>\n        <!-- /ko -->\n        <!-- ko ifnot: modal -->\n            <div class="popup-background" data-bind="click: hidePopup"></div>\n        <!-- /ko -->\n        <div class="popup-box">\n        <!-- ko render: popupRegion -->\n        <!-- /ko -->\n        </div>\n    </div>\n</div>\n\n<div id="blank_popup_template">\n    <div>\n    </div>\n</div>\n';});

define('scalejs.popup',[
    'scalejs.core',
    'knockout',
    'text!scalejs.popup/popup.html',
    'scalejs.mvvm'
], function (
    core,
    ko,
    templates
) {
    'use strict';

    core.mvvm.registerTemplates(templates);

    var // imports
        template = core.mvvm.template,
        observable = ko.observable,
        is = core.type.is,
        // variables
        popupRoot = observable(),
        popupVisible = observable(false),
        popupRegion = observable(),
        modal = observable(),
        onHidePopup = observable(),
        viewModel;

    function hidePopup () {
        popupVisible(false);
        popupRegion(undefined);
        if(is(onHidePopup(), 'function')) {
            onHidePopup()();
        }
    }

    function renderPopup (template) {
        template.template.data.modal ? modal(true) : modal(false);
        popupRegion(template);
        popupVisible(true);
    }

    viewModel = {
        renderPopup: renderPopup,
        hidePopup: hidePopup,
        popupVisible: popupVisible,
        popupRegion: popupRegion,
        modal: modal
    }

    popupRegion(template('blank_popup_template'));
    popupRoot(template('popup_template', viewModel));

    return {
        renderPopup: renderPopup,
        hidePopup: hidePopup,
        popupRoot: popupRoot,
        onHidePopup: onHidePopup
    }
});



