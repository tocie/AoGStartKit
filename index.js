'use strict';

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const app = dialogflow();


// For i18n
const i18n = require('i18n');
i18n.configure({
    locales:['en', 'ja'],
    directory: __dirname + '/locales'
  });

const moment = require('moment');
app.middleware((conv) => {
    i18n.setLocale(conv.user.locale);
    moment.locale(conv.user.locale);
});
// For i18n END

app.intent('Default Welcome Intent', (conv) => { // must not be async for i18n
    conv.ask(i18n.__('WELCOME_BASIC'));
  });
  
app.intent('date', (conv) => { // must not be async for i18n
    conv.ask(i18n.__('DATE', moment().format('LL')));
});


//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
////exports.<<YOUR_PROJECT>> = functions.https.onRequest(app);
//exports.test = functions.https.onRequest(app);