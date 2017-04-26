App.info({
  id: 'org.sigvarth.smartpay',
  name: 'SmartPay',
  description: 'Easy mobile payment',
  author: 'Sigvart M. Hovland',
  email: 'sigvart.m@gmail.com',
  website: 'https://me.sigvarth.org'
});
// Set up resources such as icons and launch screens.
App.icons({
  'iphone_2x': 'mobile/icon-60x2.png.png',
  'android_mdpi': 'mobile/icon-48.png',
  'android_hdpi': 'mobile/icon-72.png',
  'android_xhdpi': 'mobile/icon-96.png',
  'android_xxhdpi': 'mobile/icon-96.png',
  'android_xxxhdpi': 'mobile/icon-96.png',
  // More screen sizes and platforms...
});
App.launchScreens({
  'iphone_2x': 'mobile/Default2xsplash.png',
  'android_mdpi_portrait': 'mobile/Default2xsplash.png',
  'android_hdpi_portrait': 'mobile/Default2xsplash.png',
  'android_xhdpi_portrait': 'mobile/Default2xsplash.png',
  // More screen sizes and platforms...
});
App.accessRule('https://me.sigvarth.org:8003');
App.accessRule('https://me.sigvarth.org:8003/*');


App.setPreference('BackgroundColor', '0xffffffff');
