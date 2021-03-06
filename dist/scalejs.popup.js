'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _popup = require('./views/popup.html');

var _popup2 = _interopRequireDefault(_popup);

require('scalejs.mvvm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scalejs2.default.mvvm.registerTemplates(_popup2.default);

var // imports
template = _scalejs2.default.mvvm.template,
    observable = _knockout2.default.observable,
    is = _scalejs2.default.type.is,

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
};

popupRegion(template('blank_popup_template'));
popupRoot(template('popup_template', viewModel));

exports.default = {
    renderPopup: renderPopup,
    hidePopup: hidePopup,
    popupRoot: popupRoot,
    onHidePopup: onHidePopup,
    popupRegion: popupRegion
};