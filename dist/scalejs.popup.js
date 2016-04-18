
define('text!scalejs.popup/popup.html',[],function () { return '<div id="popup_template">\r\n    <div class="popup-container" id="popup-container" data-bind="css: { \'popup-hidden\' : !popupVisible() }">\r\n        <!-- ko if: modal -->\r\n            <div class="popup-background"></div>\r\n        <!-- /ko -->\r\n        <!-- ko ifnot: modal -->\r\n            <div class="popup-background" data-bind="click: hidePopup"></div>\r\n        <!-- /ko -->\r\n        <div class="popup-box">\r\n        <!-- ko render: popupRegion -->\r\n        <!-- /ko -->\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div id="blank_popup_template">\r\n    <div>\r\n    </div>\r\n</div>\r\n';});


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



