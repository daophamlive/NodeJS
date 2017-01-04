var Currency = require('./lib');

// console.log('50 Canadian dollars equals this amount of US dollars: ');
// console.log(Currency.USToCanadian(50));

var canadianDollar = 0.91;
var currency1 = new Currency(canadianDollar);
console.log( currency1.USToCanadian(50));