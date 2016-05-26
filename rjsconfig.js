'use strict';
/*jshint ignore:start*/
var require = {
  scalejs: {
    extensions: [
      '<%=ext_name%>'
    ]
  },
  map: {
    '*': {
      'scalejs.core': 'empty:',
      html: 'text'
    }
  },
  paths: {
    requirejs: '../bower_components/requirejs/require',
    scalejs: '../bower_components/scalejs/dist/scalejs',
    knockout: '../bower_components/knockout/dist/knockout',
    'scalejs.mvvm': '../bower_components/scalejs.mvvm/dist/scalejs.mvvm',
    'knockout.mapping': '../bower_components/knockout.mapping/knockout.mapping',
    'scalejs.functional': '../bower_components/scalejs.functional/dist/scalejs.functional.min',
    text: '../bower_components/text/text',
    'scalejs.mvvm.views': '../bower_components/scalejs.mvvm/dist/scalejs.mvvm',
    'scalejs.application': '../bower_components/scalejs/src/scalejs.application',
    'scalejs.core': '../bower_components/scalejs/src/scalejs.core',
    'scalejs.sandbox': '../bower_components/scalejs/src/scalejs.sandbox'
  },
  packages: [

  ],
  shim: {

  }
};
/*jshint ignore:end*/

