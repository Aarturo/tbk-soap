"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initTransaction = initTransaction;
exports.getTransactionResult = getTransactionResult;
exports.acknowledgeTransaction = acknowledgeTransaction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _soap = require('soap');

var _soap2 = _interopRequireDefault(_soap);

var Client = _soap2["default"].Client;

_soap2["default"].createClient('http://www.webservicex.com/globalweather.asmx?WSDL', function (err, client){
	if (err) 
		console.log(err);
	else		
		client.setSecurity(new _soap2["default"].ClientSSLSecurity(
		    './src/test/llavecomercio.pem'
		    , './src/test/cumbregroup.crt'
		  ))
		// console.log(client);
		// client.initTransaction(args, function(err, result, raw, soapHeader) {
		//     console.log(result)
		// })
})

function initTransaction(args) {
	soap.createClient(url, function (err, client){
		client.setSecurity(new soap.ClientSSLSecurity(
		    './src/test/llavecomercio.pem'
		    , './src/test/cumbregroup.crt'
		  ))
		client.initTransaction(args, function(err, result, raw, soapHeader) {
		    console.log(result)
		})
	})
}

function getTransactionResult(args) {
	Client.MyFunction(args, function (err, result, raw, soapHeader) {
		console.log(result);
	});
}

function acknowledgeTransaction(args) {
	Client.MyFunction(args, function (err, result, raw, soapHeader) {
		console.log(result);
	});
}