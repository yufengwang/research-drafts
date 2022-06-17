function myCreate(proto) {
  const obj = {};
  obj.__proto = proto;
  return obj;
}
