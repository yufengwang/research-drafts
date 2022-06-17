// 保留三位小数
formatNumber(1234.56); // return '1,234.56'
formatNumber(123456789); // return '123,456,789'
formatNumber(1087654.321); // return '1,087,654.321'

function formatNumber(number) {
  let [interger, decimal] = number.toString().split(".");
  interger = interger.replace(/\d(?=(\d{3})+$)/g, "$&,");
  const res = decimal ? `${interger}.${decimal}` : interger;
  console.log(res);
  return res;
}

module.exports = formatNumber;
