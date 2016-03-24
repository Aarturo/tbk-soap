"use strict"

export const NORMAL_WS = "TR_NORMAL_WS"
export const NORMAL_WS_WPM = "TR_NORMAL_WS_WPM"
export const MALL_WS = "TR_MALL_WS"

export let getTransactionResult = {
	tokenInput: ''
}

export let getTransactionResultResponse = {
	return: {}//transactionResultOutput
}

export let transactionResultOutput = {
	accountingDate: '',
	buyOrder: '',
	cardDetail: {},
	detailOutput: {},
	sessionId: '',
	transactionDate: '',//dateTime
	urlRedirection: '',
	VCI: ''
}

export let cardDetail = {
	cardNumber: '',
	cardExpirationDate: ''
}

export let wsTransactionDetailOutput = {
	authorizationCode: '',
	paymentTypeCode: '',
	responseCode: 0
}
export let wsTransactionDetail = {
	sharesAmount: 0.0,
	sharesNumber: 0,
	amount: 0.0,
	commerceCode: '',
	buyOrder: ''
}

export let acknowledgeTransaction = {
	tokenInput: ''
}

export let acknowledgeTransactionResponse = {

}

export let initTransaction = {
	wsInitTransactionInput: {}
}

export let wsInitTransactionInput = {
	wSTransactionType: '',
	commerceId: '',
	buyOrder: '',
	sessionId: '',
	returnURL: '',
	finalURL: '',
	transactionDetails: {},//wsTransactionDetail
	// wPMDetail: {}//wpmDetailInput
}

export let wpmDetailInput = {
	serviceId: '',
	cardHolderId: '',
	cardHolderName: '',
	cardHolderLastName1: '',
	cardHolderLastName2: '',
	cardHolderMail: '',
	cellPhoneNumber: '',
	expirationDate: '',
	commerceMail: '',
	ufFlag: 0//boolean
}

export let initTransactionResponse = {
	return: {}//wsInitTransactionOutput
}

export let wsInitTransactionOutput = {
	token: '',
	url: ''
}

/**
 * Fill the data.
 * 
 * @param  [String]	docname		name of the formats to send
 * @param  [Json]	args 		document with the data to fill
 * @return [Json]
 */
export function fillArgs(docname, args){
	for (const attr in _formats[docname]) {
		// console.log(attr + ': ' + _formats[docname][attr])
		if (_formats[docname].hasOwnProperty(attr)) {
			if (args.hasOwnProperty(attr)) {
				_formats[docname][attr] = args[attr]
			}
		}
	}

	return _formats[docname]
}