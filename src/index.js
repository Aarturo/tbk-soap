"use strict"

import {
	initTransaction,
	getTransactionResult,
	acknowledgeTransaction
} from "./webpayservice"

export default {
	initTransaction: initTransaction,
	getTransactionResult: getTransactionResult,
	acknowledgeTransaction: acknowledgeTransaction
}