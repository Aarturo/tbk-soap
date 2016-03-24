"use strict"

import config from "../config"
import assert from "assert"
import * as wp from "../index"

describe("fill the objects", () => {
	it("initransaction object", (done) => {		
		let init = wp.wsdlformats.wsInitTransactionInput
		let details = wp.wsdlformats.wsTransactionDetail
		let pmdetails = wp.wsdlformats.wpmDetailInput
		// filling objects
		// transactionDetails
		details.amount = 14990
		details.commerceCode = config.commerceid
		details.buyOrder = "123456789"
		// initTransaction
		init.wSTransactionType = wp.wsdlformats.NORMAL_WS
		init.commerceId = config.commerceid
		init.buyOrder = "123456789"
		init.sessionId = "AwsdFGHijk"
		init.returnURL = config.returnurl
		init.finalURL = config.finalurl
		init.transactionDetails = details
						
		wp.initTransaction(init, (err, result) => {
			if (err) {
				console.log("error: " + err)
				assert.ok(false)
			} else {
				console.log("resultado" + result)
				assert.ok(true)
			}
		})

		done()
	})

	it("getTransactionResult object", (done) => {
		done()
	})

	it("acknowledgeTransaction object", (done) => {
		done()
	})
})