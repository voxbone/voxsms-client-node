# Voxbone VoxSMS NodeJS Client

The Voxbone VoxSMS module enables you to send/receive SMS and delivery reports from Voxbone numbers.

## Install Dependencies

`npm install voxbone-voxsms`

`npm install`

## How to use

### Instantiate the module
1. Add the dependency to your application

  `````
  var Voxbone = require('voxbone');
  `````

2. Add your credentials

  ````
  var api_login = 'login';
  var api_password = 'password';
  ``````

3. Create a new Voxbone object

  `````
  var voxbone = new Voxbone({
    apiLogin: api_login,
    apiPassword: api_password
  });
  ``````

### Send an SMS

/routes/sms.js is where your application resides, you can send/receive an SMS and delivery reports with it.
/node_modules/voxbone-voxsms is the voxbone voxsms module

1. Add your parameters to send a message

  `````
  var from = "+3228080438"; //a Voxbone number enabled for VoxSMS (format: +3200000)
  var to = "3222222222"; //the destination number (format: 3200000)
  var msg = "your message";
  var dr = "all"; //Delivery reports - Accepted values: success, failure, all, none
  `````

2. Generate a fragmentation reference for your sms

  This will be used in case your message is too long.

  `````
  var fragref = voxbone.createFragRef();
  `````

3. Send SMS with the parameters configured in step 1

`````
voxbone.sendSMS(to, from, msg, fragref, dr);
````

4. Launch the application with:

  ````
  npm start
  ````

When the application starts (within the terminal), it will send an sms with the configurations you gave it and listen for incoming messages and delivery reports (until you shutdown the application).

### Receive Messages and Delivery Reports

In order to be able to receive incoming messages and delivery reports  while testing you will have to use a tunnelling service.

An exmaple is [ngrok](https://ngrok.com/). Once you've got your ngrok public URL set up, add it to your configured callback URL in the portal.
## Docs

Available functions:

````
// Sends an SMS with the parameters configured
voxbone.sendSMS(to, from, msg, fragref, dr);
`````

`````
//Generates a random fragmentation reference used for long messages
voxbone.createFragRef();
`````

`````
//Generates a transaction ID to be sent back with your 200OK response when receiving a message.
voxbone.createTransId();
`````

`````
//Sends a delivery report to Voxbone when your application receives a message
voxbone.sendDeliveryReport();
`````

## Resources
* [VoxSMS API Documentation](https://developers.voxbone.com/docs/sms/overview/)
* [Voxbone Github](https://github.com/voxbone/voxsms-node-client)

## License

[MIT](LICENSE)

[npm-url]: https://npmjs.org/package/voxbone-voxsms
[downloads-url]: https://npmjs.org/package/voxbone-voxsms
