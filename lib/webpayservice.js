"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initTransaction = initTransaction;
exports.getTransactionResult = getTransactionResult;
exports.acknowledgeTransaction = acknowledgeTransaction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _soap = require("soap");

var _soap2 = _interopRequireDefault(_soap);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

/**
 * Start the transaction.
 * 
 * @param  JSON args variables corresponding to this function.
 * @return string XML with the result
 */

function initTransaction(args, callback) {
	_soap2["default"].createClient(_config2["default"].url, function (err, client) {
		if (err) {
			callback(err, null);
		} else {
			client.setSecurity(new _soap2["default"].ClientSSLSecurity(_config2["default"].key, _config2["default"].crt));
			client.initTransaction(args, function (err, result, raw, soapHeader) {
				callback(null, result);
			});
		}
	});
}

/**
 * Get the transaction result.
 * 
 * @param  JSON args variables corresponding to this function.
 * @return string XML with the result
 */

function getTransactionResult(args) {
	_soap2["default"].createClient(_config2["default"].url, function (err, client) {
		client.setSecurity(new _soap2["default"].ClientSSLSecurity(_config2["default"].key, _config2["default"].crt));
		client.getTransactionResult(args, function (err, result, raw, soapHeader) {
			console.log(result);
		});
	});
}

/**
 * [acknowledgeTransaction description]
 * 
 * @param  JSON args variables corresponding to this function.
 * @return string XML with the result
 */

function acknowledgeTransaction(args) {
	_soap2["default"].createClient(_config2["default"].url, function (err, client) {
		client.setSecurity(new _soap2["default"].ClientSSLSecurity(_config2["default"].key, _config2["default"].crt));
		client.acknowledgeTransaction(args, function (err, result, raw, soapHeader) {
			console.log(result);
		});
	});
}