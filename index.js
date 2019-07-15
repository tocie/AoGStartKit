'use strict';

const functions = require('firebase-functions');
const {
    dialogflow,
    // BasicCard,
    // BrowseCarousel,
    // BrowseCarouselItem,
    // Button,
    // Carousel,
    // Image,
    // LinkOutSuggestion,
    // List,
    // MediaObject,
    // Suggestions,
    // SimpleResponse,
    // Table,
} = require('actions-on-google');
const app = dialogflow();

// For i18n
const i18n = require('i18n');
i18n.configure({
    locales:['en', 'ja-JP'],
    directory: __dirname + '/locales'
});
const moment = require('moment');
app.middleware((conv) => {
    i18n.setLocale(conv.user.locale);
    moment.locale(conv.user.locale);
});
const getCurrentDate = moment().format('LL');
// For i18n END

app.intent('Default Welcome Intent', (conv) => { // must not be async for i18n
    console.log("getCurrentDate : " + getCurrentDate);      // getCurrentDate : July 15, 2019
    console.log("conv.user.locale : " + conv.user.locale);  // conv.user.locale : en-US
    conv.ask(i18n.__('WELCOME_BASIC', getCurrentDate));
  });
  
app.intent('date', (conv) => { // must not be async for i18n
    conv.ask(i18n.__('DATE', getCurrentDate));
});


//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
exports.dottdiary = functions.https.onRequest(app);
