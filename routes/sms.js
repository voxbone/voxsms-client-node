var express = require('express');
var router = express.Router();

//Add the Voxbone npm dependency
var Voxbone = require('voxbone-voxsms');

/**
 *  New Voxbone object
**/

//Your VoxSMS API credentials
var api_login = 'your_api_login';
var api_password = 'your_api_password';

//New Voxbone Object
var voxbone = new Voxbone({
  apiLogin: api_login,
  apiPassword: api_password
});

/**********
    Send SMS
***********/

//Parameters
var from = "+447441909916"; //a Voxbone number enabled for VoxSMS (format: +3200000)
var to = "32487542509"; //the destination number (format: 3200000)
var msg = "your message"; //The body of the message sent
var dr = "all"; //Delivery reports - Accepted values: success, failure, all, none

// Generate a fragmentation reference for your sms
// This will be used in case your message is too long
// You can also use var fragref to make your own instead of using voxbone.createFragRef()
var fragref = voxbone.createFragRef();
//Send SMS with parameters
voxbone.sendSMS(to, from, msg, fragref, dr);

/**********
    Receive Incoming Message
    & Send Delivery Report
***********/

//From number is your Voxbone number
//Removing + in the from
from = from.substring(1);
router.post('/'+from, function(req, res) {
    console.log('Received message.');
    console.log(req.body);
    var orig_destination = from.substring(1);
    var orig_from = to;
    var delivery_status = "delivered_to_terminal";
    var status_code = "ok";
    //Generate a transaction ID to place in the 200 OK
    var transid = voxbone.createTransId();
    //200 OK with transaction ID
    res.json({transaction_id:transid});
    //Uncomment to send the Delivery Report to acknowledge receipt of SMS
    //setTimeout(function(){ voxbone.sendDeliveryReport(transid, orig_destination, orig_from, delivery_status, status_code); }, 1000);
});

/**********
    Receive Delivery Reports
***********/

//To is the destination's number
router.put('/'+to+'/report/:transaction_id', function(req, res) {
    console.log('Received delivery report.');
    console.log(req.body);
    res.send("200OK");
});

module.exports = router;