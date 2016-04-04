"use strict"

import soap from "soap";
import config from "./config";
import crypto from "crypto";
import moment from "moment";
import * as wsdlformats from "./utils/wsdlformats";
import x509 from "x509";
import fs from "fs";
import urlParser from "url";
import https from "https";
import querystring from "querystring";
import ursa from "ursa";
import utf8 from "utf8";

export default class WebpayService {


	constructor(action){
		this._url = config.url
		this._action = action;
		this._crt = config.crt;
		this._key = config.key;
	}

	getWsdlFormat() {
		return wsdlformats[this._action];
	}

	getType(type) {
		return wsdlformats[type];
	}

	_setParams(params) {
		this._params = params;
	}
	/**
	 * Start the transaction.
	 * 
	 * @param  JSON args variables corresponding to this function.
	 * @return string XML with the result
	 */
	initTransaction(args, callback){		
		this._setParams(args);		
		console.log(this._buildDoc());
		this._request('POST', this._buildDoc(), (error, data) => {
			if (error) {
				console.log(data);
				const d = wsdlformats.toObject(data);
				console.log(d);
				callback(error, d);
			} else {
				callback(null, data);
			}
		});		
	}

	/**
	 * Get the transaction result.
	 * 
	 * @param  JSON args variables corresponding to this function.
	 * @return string XML with the result
	 */
	getTransactionResult(args){
		this._setParams(args);		
		 
		this._request('POST', this._buildDoc(), (error, data) => {
			if (error) {
				callback(error, data);
			} else {
				callback(null, data);
			}
		});
	}

	/**
	 * [acknowledgeTransaction description]
	 * 
	 * @param  JSON args variables corresponding to this function.
	 * @return string XML with the result
	 */
	acknowledgeTransaction(args){
		this._setParams(args);		
		 
		this._request('POST', this._buildDoc(), (error, data) => {
			if (error) {
				callback(error, data);
			} else {
				callback(null, data);
			}
		});
	}

	/**
	 * Create the body
	 * @param  {Object} params
	 * @param  {String} action
	 * @return {String}
	 */
	_getBody(bodyId) {

		const bodyParams = this._getBodyParams(this._params);

		const body = '<soapenv:Body wsu:Id="id-' + bodyId + '" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' + 
					 '<ser:' + this._action+ '>' + 
					 bodyParams +
					 '</ser:' + this._action + '>' + 
					 '</soapenv:Body>';

	 	return body;

	}

	/**
	 * Create the headers
	 * @param  {String} bodyId
	 * @return {String}
	 */
	_getHeaders(bodyId, digestValue) {
		
		const x509info = this._getx509Data();

		let headers = '<soapenv:Header>' +
						'<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
						'<ds:Signature Id="' + this._generateGuid("SIG") + '" xmlns:ds="http://www.w3.org/2000/09/xmldsig#">';

		let forSign	=	'<ds:SignedInfo>' + 
						'<ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">' +
						'<ec:InclusiveNamespaces PrefixList="ser soapenv" xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"/>' +
						'</ds:CanonicalizationMethod>' + 
						'<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>' + 
						'<ds:Reference URI="#id-' + bodyId + '">' + 
						'<ds:Transforms>' + 
						'<ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">' +
						'<ec:InclusiveNamespaces PrefixList="ser" xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"/>' + 
						'</ds:Transform></ds:Transforms>' + 
						'<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>' + 
						'<ds:DigestValue>' + digestValue + '</ds:DigestValue>' + 
						'</ds:Reference>' + 
						'</ds:SignedInfo>';

		const signatureValue = this._rsaSign(forSign);

		headers +=		forSign;	

		headers += 		'<ds:SignatureValue>' + signatureValue + '</ds:SignatureValue>' +
						'<ds:KeyInfo Id="' + this._generateGuid("KI") + '">' + 
						'<wsse:SecurityTokenReference wsu:Id="' + this._generateGuid("STR") + '">' + 
						'<ds:X509Data>' + 
						'<ds:X509IssuerSerial><ds:X509IssuerName>' + x509info.IssuerName + '</ds:X509IssuerName>' + 
						'<ds:X509SerialNumber>' + x509info.SerialNumber + '</ds:X509SerialNumber>' + 
						'</ds:X509IssuerSerial>' + 
						'</ds:X509Data>' + 
						'</wsse:SecurityTokenReference>' + 
						'</ds:KeyInfo>' + 
						'</ds:Signature>' + 
						'</wsse:Security>' + 
						'</soapenv:Header>';

		return headers;
	}

	/**
	 * Get the paramteres as a string to put it into the doc.
	 * @param  {Object} format 
	 * @return {String}        
	 */
	_getBodyParams(format) {
		let params = '';
		let endTag = '';

		Object.keys(format).forEach( (key) => {		
			if (typeof format[key] === 'object') {
				params += '<' + key + '>';
				endTag = key;
				params += this._getBodyParams(format[key]);
			} else {
				if (format[key] !== '') {
					params += '<' + key + '>' + format[key] + '</' + key + '>';			
				}
			}
		});

		params += (endTag !== '') ? '</' + endTag + '>' : '';
		return params;
	}

	/**
	 * Create a doc
	 * @param  {Object} params
	 * @param  {String} action
	 * @return {String}
	 */
	_buildDoc() {	

		const bodyId = this._getBodyId();
		let body = this._getBody(bodyId);		
		const digestValue = this._getDigestValue(body);

		let headers = this._getHeaders(bodyId, digestValue);
		let doc = '<soapenv:Envelope xmlns:ser="http://service.wswebpay.webpay.transbank.com/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
		doc += headers;
		doc += body;
		doc += '</soapenv:Envelope>';
		
		return doc;
	}

	_getBodyId() {

		let data = this._action + this._getBodyParams(this._params) + moment().format("YYYY-MM-DD HH:mm:ss ZZ");
		return crypto.createHash('md5').update(data).digest('hex');
	}

	_getDigestValue(xml) {

		const shasum = crypto.createHash('sha1');
	    shasum.update(xml, 'utf8');
	    return shasum.digest('base64');
	}

	/**
	 * Sign with private key
	 * @param  {[type]} xml
	 * @return {[type]}
	 */
	_rsaSign(xml) {
		
		// const key = fs.readFileSync(this._key, {encoding: 'ascii'});		
		// const key = fs.readFileSync(this._key);		
		const key = ursa.createPrivateKey(fs.readFileSync(this._key), 'dating', 'utf8');
		const signer = crypto.createSign('RSA-SHA1');
		signer.update(xml);
		return signer.sign(key.toPrivatePem(), 'base64');
		// let llave = ursa.createPrivateKey(fs.readFileSync(this._key));
		// let firma = llave.hashAndSign('md5', utf8.encode(xml), 'utf8', 'base64');

		// return firma;
	}

	_getx509Data() {
		let data = {};			
		let _x509 = x509.parseCert(this._crt);

		let issuername = {};
		issuername.CN = _x509.issuer.commonName;
		issuername.L = _x509.issuer.localityName;
		issuername.ST = _x509.issuer.stateOrProvinceName;
		issuername.O = _x509.issuer.organizationName;
		issuername.C = _x509.issuer.countryName;

		data.IssuerName = wsdlformats.toString(issuername);
		data.SerialNumber = parseInt(_x509.serial, 16)

		return data;
	}

	_generateGuid(prefix = 'pfx') {
        // let uuid = md5(uniqid(rand(), true));
        let data = this._action + this._getBodyParams(this._params) + moment().format("YYYY-MM-DD HH:mm:ss ZZ");
        let uuid = crypto.createHash('md5').update(data).digest('hex');
        let guid = prefix + "-" + uuid;
        return guid;
    }

    /**
	 * Special Request function.
	 * @param  {string}   url      [description]
	 * @param  {string}   method   [description]
	 * @param  {object}   data     [description]
	 * @param  {Function} callback [description]
	 * @return {Paypal}            [description]
	 */
	_request(method, data, callback) {
		let self = this;		
		let params = data;

		let uri = urlParser.parse(this._url);	
		let headers = {};

		headers['Content-Type'] = 'text/xml; charset=UTF-8';
		headers['Accept-Encoding'] = 'gzip,deflate';
		headers['SOAPAction'] = '';
		headers['Content-Length'] = params.length;
		headers['Connection'] = 'Keep-Alive';

		let options = { 
			protocol: uri.protocol, 
			auth: uri.auth, 
			method: method, 
			hostname: uri.hostname, 
			port: uri.port, 
			path: uri.path, 
			agent: false, 
			headers: headers 
		};
		
		// Make HTTPS request.
		let req = https.request(options, (res) => {
			let buffer = '';

			res.on('data', (chunk) => {
				buffer += chunk.toString('utf8');
			});

			// Set timeout on request.
			req.setTimeout(10000, () => {
				callback(new Error('timeout'), null);
			});

			res.on('end', () => {
				let error = null;
				let data = '';

				if (res.statusCode > 200) {
					// console.log(res.statusCode);						
					error = new Error(res.statusCode);
					data = buffer;
					// console.log(buffer);	
				} else {
					data = querystring.parse(buffer);
				}

				callback(error, data);
			});
		});

		if (method === 'POST') {			
			req.end(params);
		} else {
			req.end();
		}
	}
}