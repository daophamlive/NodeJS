//simple module -begin
// var canadianDollar = 0.91;
// function roundTwoDecimal(amount)
// {
// 	return Math.round(amount * 100)/100;
// }

// exports.canadianToUS = function(canadian){ return roundTwoDecimal(canadian * canadianDollar);}

// exports.USToCanadian = function(us) { return roundTwoDecimal(us/canadianDollar);}
//simple module -end

//extra module
var Currency = function(canadianDollar){ 
	this.canadianDollar = canadianDollar;
}

Currency.prototype.roundTwoDecimal = function (amount) {
	return Math.round(amount * 100)/100;
}

Currency.prototype.canadianToUS = function(canadian) {
	return this.roundTwoDecimal(canadian * this.canadianDollar);
};

Currency.prototype.USToCanadian = function(us) {
	return this.roundTwoDecimal(us / this.canadianDollar);
};

module.exports = Currency;