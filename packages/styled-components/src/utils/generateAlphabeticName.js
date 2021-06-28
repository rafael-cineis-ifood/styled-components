// @flow
/* eslint-disable no-bitwise */

import { SC_CLASS_PREFIX } from "../constants";

const AD_REPLACER_R = /(a)(d)/gi;

/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
const charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
const getAlphabeticChar = (code: number): string =>
  String.fromCharCode(code + (code > 25 ? 39 : 97));

/* input a number, usually a hash and convert it to base-52 */
export default function generateAlphabeticName(code: number): string {
  let name = '';
  let x;

  /* get a char and divide by alphabet-length */
  for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  const prefix = SC_CLASS_PREFIX ? `${SC_CLASS_PREFIX}_` : '';

  return prefix + ((getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2'));
}
