"strict"

import fs from "fs"

if (fs.existsSync(__dirname + "/../../.env")) {
  require("dotenv").config({path: __dirname + "/../../.env"})
}

const config = {
	crt: process.env.CERTIFICATE  || "./test/keys/certificate_tbk.crt",
	key: process.env.KEY || "./test/keys/llavecomercio.pem",
	url: process.env.URL || "https://tbk.orangepeople.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
	commerceid: process.env.COMMERCEID || "123456789",
	returnurl: process.env.RETURNURL || "http://localhost:3000/payment/webpaydetails",
	finalurl: process.env.FINALURL || "http://localhost:3000/payment/webpayresult"
}

export default config