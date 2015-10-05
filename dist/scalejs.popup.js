
define('text!scalejs.popup/popup.html',[],function () { return '<div id="popup_template">\n    <div class="popup-container" id="popup-container" data-bind="css: { \'popup-hidden\' : !popupVisible() }">\n        <!-- ko if: modal -->\n            <div class="popup-background"></div>\n        <!-- /ko -->\n        <!-- ko ifnot: modal -->\n            <div class="popup-background" data-bind="click: hidePopup"></div>\n        <!-- /ko -->\n        <div class="popup-box">\n        <!-- ko render: popupRegion -->\n        <!-- /ko -->\n        </div>\n    </div>\n</div>\n\n<div id="blank_popup_template">\n    <div>\n    </div>\n</div>\n\n\n<div id="main_popup_wrapper">\n    <header>\n        <h1 data-bind="text: title"></h1>\n        <!-- ko ifnot: modal -->\n        <h1 data-bind="click: hidePopup" class="x">X</h1>\n        <!-- /ko -->\n    </header>\n    <section data-bind="template: popupContent">\n    </section>\n</div>\n\n<div id="generic_popup">\n    <pre style="text-align:left" data-bind="text: data"></pre>\n</div>\n\n<div id="message_popup_template">\n    <span data-bind="text: message"></span>\n</div>';});


define('scalejs.popup',[
    'scalejs!core',
    'knockout',
    'scalejs.mvvm.views!scalejs.popup/popup'
], function (
    core,
    ko
) {
    'use strict';

    var // imports
        template = core.mvvm.template,
        observable = ko.observable,
        // variables
        popupRoot = observable(),
        popupVisible = observable(false),
        popupRegion = observable(),
        modal = observable(),
        viewModel;

    function hidePopup () {
        popupVisible(false);
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
        popupRoot: popupRoot
    }
});


