import core from 'scalejs.core';
import ko from 'knockout';
import templates from './views/popup.html';
import 'scalejs.mvvm';
    

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
        popupClasses = observable(),
        viewModel;

    function hidePopup() {
        popupVisible(false);
        popupRegion(undefined);
        if (is(onHidePopup(), 'function')) {
            onHidePopup()();
        }
        document.querySelector('body').style['overflow-y'] = 'auto';    
    }

    function renderPopup(template) {
        template.template.data.modal ? modal(true) : modal(false);
        template.template.data.popupClasses ? popupClasses(template.template.data.popupClasses) : popupClasses(undefined);
        popupRegion(template);
        popupVisible(true);
        document.querySelector('body').style['overflow-y'] = 'hidden';
    }

    viewModel = {
        renderPopup: renderPopup,
        hidePopup: hidePopup,
        popupVisible: popupVisible,
        popupRegion: popupRegion,
        popupClasses: popupClasses,
        modal: modal
    }

    popupRegion(template('blank_popup_template'));
    popupRoot(template('popup_template', viewModel));

    export default {
        renderPopup: renderPopup,
        hidePopup: hidePopup,
        popupRoot: popupRoot,
        onHidePopup: onHidePopup,
        popupRegion: popupRegion
    }



