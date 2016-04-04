"use strict"

import libxmljs from "libxmljs"

export const NORMAL_WS = "TR_NORMAL_WS"
export const NORMAL_WS_WPM = "TR_NORMAL_WS_WPM"
export const MALL_WS = "TR_MALL_WS"

export let getTransactionResult = {
	tokenInput: ''
}

export let getTransactionResultResponse = {
	return: {
		accountingDate: '',
		buyOrder: '',
		cardDetail: {},
		detailOutput: {},
		sessionId: '',
		transactionDate: '',//dateTime
		urlRedirection: '',
		VCI: ''
	} //transactionResultOutput
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
	wsInitTransactionInput: {
		wSTransactionType: '',
		commerceId: '',
		buyOrder: '',
		sessionId: '',
		returnURL: '',
		finalURL: '',
		transactionDetails: {
			sharesAmount: '',
			sharesNumber: '',
			amount: 0.0,
			commerceCode: '',
			buyOrder: ''
		} //wsTransactionDetail
	} //wsInitTransactionInput
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
	return: {
		token: '',
		url: ''
	}//wsInitTransactionOutput
}

export let wsInitTransactionOutput = {
	token: '',
	url: ''
}

/**
 * Transform an object to string.
 * 
 * @param  [Object]	obj
 * @return [String]
 */
export function toString(obj) {
	return Object.keys(obj).map(x => x + '=' + obj[x]).join(',');
}

export function toObject(xml) {	
	let xmlDoc = libxmljs.parseXmlString(xml);
	return xmlDoc.get('//faultcode');	
}