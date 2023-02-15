function myCreate(proto) {
  const obj = {};
  obj.__proto__ = proto;
  return obj;
}
