"use strict"

import soap from 'soap'

export function initTransaction(args){
	soap.createClient(url, function (err, client){
		Client.initTransaction(args, function(err, result, raw, soapHeader) {
		    console.log(result)
		})
	})
}

export function getTransactionResult(args){
	soap.createClient(url, function (err, client){
		Client.getTransactionResult(args, function(err, result, raw, soapHeader) {
		    console.log(result)
		})
	})
}

export function acknowledgeTransaction(args){
	soap.createClient(url, function (err, client){
		Client.acknowledgeTransaction(args, function(err, result, raw, soapHeader) {
		    console.log(result)
		})
	})
}