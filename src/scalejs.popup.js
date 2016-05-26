define([
    'scalejs.core',
    'knockout',
    'html!scalejs.popup/popup.html'
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


