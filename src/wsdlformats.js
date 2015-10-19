"use strict"

export var initTransaction = {
	wSTransactionType: '',//wsTransactionType
    commerceId: '',//string
    buyOrder: '',//string
    sessionId: '',//string
    returnURL: '',//anyURI
    finalURL: '',//anyURI
    transactionDetails: {
    	sharesAmount: '',//decimal
	    sharesNumber: '',//int
	    amount: '',//decimal
	    commerceCode: '',//string
	    buyOrder: ''//string
    },
    wPMDetail: {
    	serviceId: '',//string
	    cardHolderId: '',//string
	    cardHolderName: '',//string
	    cardHolderLastName1: '',//string
	    cardHolderLastName2: '',//string
	    cardHolderMail: '',//string
	    cellPhoneNumber: '',//string
	    expirationDate: '',//dateTime
	    commerceMail: '',//string
	    ufFlag: ''//boolean
    }
}

export var getTransactionResult = {
	tokenInput: ''//string
}

export var acknowledgeTransaction = {
	tokenInput: ''//string	
}