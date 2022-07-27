/**
 * Set the first 4 bytes of the IV (nonce)
 * @param iv
 * @param secondsSince1970
 * @returns {*}
 * @constructor
 */
function SetFirstFourBytes(iv, secondsSince1970) {

    // a custom  logic
    iv[0] = secondsSince1970 >> 24;
    iv[1] = secondsSince1970 >> 16;
    iv[2] = secondsSince1970 >> 8;

    // Adding an integer with 0xFF leaves only the least significant byte.
    // For example, to get the first byte, we can write "<int value> & 0xFF"
    // This is typically referred to as "masking"
    iv[3] = secondsSince1970 & 0XFF ; //

    return iv;
}

export default SetFirstFourBytes;