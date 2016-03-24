"use strict"

import {
	initTransaction,
	getTransactionResult,
	acknowledgeTransaction
} from "./webpayservice"

import * as wsdlformats from "./utils/wsdlformats.js"

export default {
	initTransaction: initTransaction,
	getTransactionResult: getTransactionResult,
	acknowledgeTransaction: acknowledgeTransaction,
	wsdlformats: wsdlformats
}