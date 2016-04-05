"use strict"

import config from "../config"
import assert from "assert"
import WebpayService from "../webpayservice"
import soap from "soap"
import fs from "fs"

describe("fill the objects", () => {
	let soapResult = null
	let error = null

	before( (done) => {
		setTimeout(() => {

		}, 10000);
		done();
	})

	it("initransaction object", (done) => {
		const wp = new WebpayService('initTransaction');
		let format = wp.getWsdlFormat();		
		// filling objects
		
		// initTransaction
		format.wsInitTransactionInput.wSTransactionType = wp.getType('NORMAL_WS');
		format.wsInitTransactionInput.sessionId = "1234";
		format.wsInitTransactionInput.returnURL = config.returnurl;
		format.wsInitTransactionInput.returnURL = "http://www.test.cl/return";
		format.wsInitTransactionInput.finalURL = config.finalurl;
		format.wsInitTransactionInput.finalURL = "http://www.test.cl/final";
		format.wsInitTransactionInput.commerceId = config.commerceid;
		format.wsInitTransactionInput.buyOrder = "123456789";				
		// transactionDetails
		format.wsInitTransactionInput.transactionDetails.amount = 5;
		format.wsInitTransactionInput.transactionDetails.commerceCode = config.commerceid;
		format.wsInitTransactionInput.transactionDetails.buyOrder = "100-testing";
				
		wp.initTransaction(format, (err, result) => {
			if (err) {
				console.log(err);
				console.log(result);		
			} else {
				console.log(result);
			}
		})		
	})

	it("getTransactionResult object", (done) => {
		done();
	})

	it("acknowledgeTransaction object", (done) => {
		done();
	})
})
