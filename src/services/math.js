/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
const decimalAdjust = (
  type, // 'floor' | 'round' | 'ceil'
  value, // number
  exp, // number
) => {
  // tslint:disable no-parameter-reassignment prefer-template
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  let valueStr = value.toString().split('e');
  value = Math[type](
    +(valueStr[0] + 'e' + (valueStr[1] ? +valueStr[1] - exp : -exp)),
  );
  // Shift back
  valueStr = value.toString().split('e');
  return +(valueStr[0] + 'e' + (valueStr[1] ? +valueStr[1] + exp : exp));
};

export const round10 = (value, exp) => decimalAdjust('round', value, exp);

export const floor10 = (value, exp) => decimalAdjust('floor', value, exp);

export const ceil10 = (value, exp) => decimalAdjust('ceil', value, exp);
