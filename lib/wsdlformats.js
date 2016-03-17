"use strict";

Object.defineProperty(exports, '__esModule', {
			value: true
});
var initTransaction = {
			wSTransactionType: '', //wsTransactionType
			commerceId: '', //string
			buyOrder: '', //string
			sessionId: '', //string
			returnURL: '', //anyURI
			finalURL: '', //anyURI
			transactionDetails: {
						sharesAmount: '', //decimal
						sharesNumber: '', //int
						amount: '', //decimal
						commerceCode: '', //string
						buyOrder: '' //string
			},
			wPMDetail: {
						serviceId: '', //string
						cardHolderId: '', //string
						cardHolderName: '', //string
						cardHolderLastName1: '', //string
						cardHolderLastName2: '', //string
						cardHolderMail: '', //string
						cellPhoneNumber: '', //string
						expirationDate: '', //dateTime
						commerceMail: '', //string
						ufFlag: '' //boolean
			}
};

exports.initTransaction = initTransaction;
var getTransactionResult = {
			tokenInput: '' //string
};

exports.getTransactionResult = getTransactionResult;
var acknowledgeTransaction = {
			tokenInput: '' //string	
};
exports.acknowledgeTransaction = acknowledgeTransaction;