"use strict"

export var getTransactionResult = {
	tokenInput: ''
}

export var acknowledgeTransaction = {
	tokenInput: ''
}

export var getTransactionResult = {
	tokenInput: ''
}

export var getTransactionResultResponse = {
	return: {}//transactionResultOutput
}

export var transactionResultOutput = {
	accountingDate: '',
	buyOrder: ''
	cardDetail: {},
	detailOutput: {},
	sessionId: '',
	transactionDate: '',//dateTime
	urlRedirection: '',
	VCI: ''
}

export var cardDetail = {
	cardNumber: '',
	cardExpirationDate: ''
}

export var wsTransactionDetailOutput = {
	authorizationCode: '',
	paymentTypeCode: '',
	responseCode: 0
}
export var wsTransactionDetail = {
	sharesAmount: 0.0,
	sharesNumber: 0,
	amount: 0.0,
	commerceCode: '',
	buyOrder: ''
}

export var acknowledgeTransaction = {
	tokenInput: ''
}

export var acknowledgeTransactionResponse = {

}

export var initTransaction = {
	wsInitTransactionInput: {}
}

export var wsInitTransactionInput = {
	wSTransactionType: {},//wsTransactionType
	commerceId: '',
	buyOrder: '',
	sessionId: '',
	returnURL: '',
	finalURL: '',
	transactionDetails: {},//wsTransactionDetail
	wPMDetail: {}//wpmDetailInput
}

export var wpmDetailInput = {
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

export var initTransactionResponse = {
	return: {}//wsInitTransactionOutput
}

export var wsInitTransactionOutput = {
	token: '',
	url: ''
}