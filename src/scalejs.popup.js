define([
    'scalejs!core',
    'knockout',
    'scalejs.mvvm.views!views/popup'
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

