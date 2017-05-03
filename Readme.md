# SmartPay Proof-of-concept Application

## Installation guide
Install [meteor](https://www.meteor.com/install)

```git clone https://github.com/sigvartmh/SmartPay```
```meteor npm install```

### Running the server and website
Run it as a website on a server you will have to modifie the `dev.env.template` to add your twilio API key and number after this is done you can copy the template `cp dev.env.template dev.env`.

```
source dev.env
meteor
```

It will now be available on [localhost:3000](https://localhost:3000) port can be
specified with the `-p` option

To run the  application on an Android emulator or phone requires that you have the android SDK and emulator installed more information on it can be found [here](https://www.meteor.com/tutorials/blaze/running-on-mobile) or try

```meteor install-sdk android```

### Running on Android

Run android emulator

```meteor run android```

Connect an andorid phone and run

```meteor run android-device```

to launch it on the connected phone. Additional command `--mobile-server=<server ip or url>` can be passed to make the application connect to an already running meteor server. If not it will connect to the local running meteor server available through `localhost:3000`. For more information see [here](https://www.meteor.com/tutorials/blaze/running-on-mobile)

To modify and add graphical resources such as splash screens and application icons modify the `mobile-config.js` and add the resources in the mobile folder. More information on this can be found [here](https://docs.meteor.com/api/mobile-config.html)


## Building and running the application and server
If you want to build the application for production you can do

```meteor build --directory <output directory> --server <server url or ip>```

the `--server` option is used to give the mobile applications which will be built a target server to connect to. Which would be where you run the server part of the application. When the build is complete the unsigned `.apk` can be found in the android folder of the output directory. More information about how to sign the application for release can be found [here](https://developer.android.com/studio/publish/app-signing.html). An Xcode project is created for the iOS and requires you to have an app store lisence for publishing, but if you just want to run it on your iPhone you can connect your iPhone and sign it with your iCloud account. Remember you have to allow the application to run on your iPhone also but instructions for this will pop-up.

You will also be required to run your own mongodb service when you have built the server application as a standalone package depending only on [node.js](https://nodejs.org/en/). Have a look in the output directory for a readme explaning the setup.

## TODOs
* Clean up the routes found in `lib/router.js` and create [routing groups](https://github.com/kadirahq/flow-router#group-routes)
* Do more client-side verification using [simple-schema](https://github.com/aldeed/meteor-simple-schema#validating-data) all database schemas can be found in common.js
* Clean up and add regEx for validation in more of the schemas found in `common.js`
