'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imports = undefined;
exports.closeSever = closeSever;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imports = {};
exports.imports = imports;


var app = (0, _express2.default)();
var port = 3000;

app.get('/', function (req, res) {
    res.status(200).send({ message: 'API  now is running' });
});

var server = app.listen(port, function () {
    console.log('server is running on port', port);
});

function closeSever() {
    server.close();
}