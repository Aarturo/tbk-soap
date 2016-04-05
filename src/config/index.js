"strict"

import fs from "fs"
import path from "path"

if (fs.existsSync(__dirname + "/../../.env")) {
  require("dotenv").config({path: __dirname + "/../../.env"});
}

const config = {
	crt: process.env.CERTIFICATE  || path.join(__dirname, "..", "test", "keys", "oneclick.crt"),
	key: process.env.KEY || path.join(__dirname, "..", "test", "keys", "oneclick.key"),
	url: process.env.URL || "https://tbk.orangepeople.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
	commerceid: process.env.COMMERCEID || "123456789",
	returnurl: process.env.RETURNURL || "http://localhost:3000/payment/webpaydetails",
	finalurl: process.env.FINALURL || "http://localhost:3000/payment/webpayresult"
}

export default config
