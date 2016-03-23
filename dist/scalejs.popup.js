
define('text!scalejs.popup/popup.html',[],function () { return '<div id="popup_template">\r\n    <div class="popup-container" id="popup-container" data-bind="css: { \'popup-hidden\' : !popupVisible() }">\r\n        <!-- ko if: modal -->\r\n            <div data-bind="css: background "></div>\r\n        <!-- /ko -->\r\n        <!-- ko ifnot: modal -->\r\n            <div data-bind="css: background, click: hidePopup"></div>\r\n        <!-- /ko -->\r\n        <div class="popup-box" data-bind="css: position"> \r\n        <!-- ko render: popupRegion -->\r\n        <!-- /ko -->\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div id="blank_popup_template">\r\n    <div>\r\n    </div>\r\n</div>\r\n';});


define('scalejs.popup',[
    'scalejs!core',
    'knockout',
    'module',
    'scalejs.mvvm.views!scalejs.popup/popup'
], function (
    core,
    ko,
    module
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
        background = observable(),
        position = observable(),
        viewModel,
        config = module.config();

    function hidePopup () {
        popupVisible(false);
        popupRegion(undefined);
        
        if (!config.doNotRender) {
            var parent = document.body;
            var oldRoot = document.getElementById('popupRoot');
            parent.removeChild(oldRoot);
        }
    }

    function renderPopup (template) {
        template.template.data.modal ? modal(true) : modal(false);
        if (template.template.data.background === true || template.template.data.background === undefined) {
            background('popup-background');
        }
        else {
            background('popup-no-background');
        }
        var pos = template.template.data.position;
        if (pos !== undefined) {
            position('popup-box-' + pos);
        }
        else {
            position('popup-box-center');
        }
        popupRegion(template);
        popupVisible(true);
        
        if (!config.doNotRender) {
            if (document.getElementById('popupRoot') === null) {
                var newRoot = document.createElement('span');
                newRoot.setAttribute('id','popupRoot');
                newRoot.setAttribute('data-bind','render: popupRoot');
                if (document.body === undefined || document.body.children === undefined) {
                    return;
                }
                var parent = document.body;
                var node = parent.children[0];
                parent.insertBefore(newRoot, node);
                
                ko.applyBindings(this, document.getElementById('popupRoot'));
            }
        }
    }

    viewModel = {
        renderPopup: renderPopup,
        hidePopup: hidePopup,
        popupVisible: popupVisible,
        popupRegion: popupRegion,
        modal: modal,
        background: background,
        position: position
    }

    popupRegion(template('blank_popup_template'));
    popupRoot(template('popup_template', viewModel));

    return {
        renderPopup: renderPopup,
        hidePopup: hidePopup,
        popupRoot: popupRoot
    }
});


