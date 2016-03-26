"use strict"

import soap from "soap"
import config from "./config"

/**
 * Start the transaction.
 * 
 * @param  JSON args variables corresponding to this function.
 * @return string XML with the result
 */
export function initTransaction(args, callback){
	soap.createClient(config.url, (err, client) => {				
		if (err) {			
			callback(err, null)
		} else {			
			client.setSecurity(new soap.ClientSSLSecurity(
				config.key,
				config.crt
			))			
			client.initTransaction(args, (erro, result, raw, soapHeader) => {
				if (erro){
					callback(erro, null)
				} else {
					callback(null, result)
				}			    
			})
		}
	})
}

/**
 * Get the transaction result.
 * 
 * @param  JSON args variables corresponding to this function.
 * @return string XML with the result
 */
export function getTransactionResult(args){
	soap.createClient(config.url, function (err, client){
		client.setSecurity(new soap.ClientSSLSecurity(
			config.key,
			config.crt
		))
		client.getTransactionResult(args, function(err, result, raw, soapHeader) {
		    console.log(result)
		})
	})
}

/**
 * [acknowledgeTransaction description]
 * 
 * @param  JSON args variables corresponding to this function.
 * @return string XML with the result
 */
export function acknowledgeTransaction(args){
	soap.createClient(config.url, function (err, client){
		client.setSecurity(new soap.ClientSSLSecurity(
			config.key,
			config.crt
		))
		client.acknowledgeTransaction(args, function(err, result, raw, soapHeader) {
		    console.log(result)
		})
	})
}