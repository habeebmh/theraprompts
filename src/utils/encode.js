// encode.js

/**
 * Encodes a string by shifting each character by a fixed number of positions.
 * @param {string} str - The string to encode.
 * @param {number} shift - The number of positions to shift each character.
 * @returns {string} - The encoded string.
 */
export function encode (str, shift = 3) {
  return str.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) + shift)
  }).join('')
}

/**
 * Decodes a string by reversing the shift applied during encoding.
 * @param {string} encodedStr - The encoded string to decode.
 * @param {number} shift - The number of positions to shift each character back.
 * @returns {string} - The decoded string.
 */
export function decode (encodedStr, shift = 3) {
  return encodedStr.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) - shift)
  }).join('')
}
