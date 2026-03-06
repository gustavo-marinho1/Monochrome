function currency(val: number) {
  if (!val) return 0;
  return val.toLocaleString('en-us',{style: 'currency', currency: 'USD'});
}

export { currency }