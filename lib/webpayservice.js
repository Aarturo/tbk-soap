"use strict"

import soap from 'soap'

const Client = soap.Client;

export function initTransaction(args, client){
	Client.MyFunction(args, function(err, result, raw, soapHeader) {
	    console.log(result);
	});
}

export function getTransactionResult(args, client){
	Client.MyFunction(args, function(err, result, raw, soapHeader) {
	    console.log(result);
	});
}

export function acknowledgeTransaction(args, client){
	Client.MyFunction(args, function(err, result, raw, soapHeader) {
	    console.log(result);
	});
}