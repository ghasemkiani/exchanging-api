# exchangingapi
A simple client for querying exchanging.ir cryptocurrency prices

**NB:** I am not affiliated with [exchanging.ir](https://exchanging.ir/). This program is not endorsed or supported by exchanging.ir. Please check their Terms of Service before using this program.

## Install
You can use this command to add this package to your NodeJS project:
```
npm install github:ghasemkiani/exchangingapi
```

## How to use
This is an example usage of this package:
```javascript
(async function () {
  const {ExchangingAPI} = require("@ghasemkiani/exchangingapi");
  
  let api = new ExchangingAPI();
  await api.toUpdate();
  let nf = new Intl.NumberFormat("en-US");
  console.log(`Exchanging.ir BTC     buy:        ${nf.format(api.currencies.bitcoin.buy_price)} tomans`);
  console.log(`Exchanging.ir BTC    sell:        ${nf.format(api.currencies.bitcoin.sell_price)} tomans`);
  console.log(`Exchanging.ir BTC reserve:        ${nf.format(api.currencies.bitcoin.reserve)} BTC`);
})();
```
And this is the output from this program at the time of this writing (2018-03-22 14:36 IRDT):
```
Exchaning.ir BTC     buy:        46,190,000 tomans
Exchaning.ir BTC    sell:        42,896,000 tomans
Exchaning.ir BTC reserve:        0 BTC
```
---
&copy; 2018, Ghasem Kiani, M.D.

License: MIT
