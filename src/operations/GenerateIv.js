'use strict'

import  GenerateRandomBytes from '../jobs/GenerateRandomBytes.js'

import SetFirstFourBytes from '../jobs/SetFirstFourBytes.js'

/**
 * The logic to generate the IV (nonce)
 * described in the document for the AES GCM
 * @returns {Promise<*>}
 * @constructor
 */
async function GenerateIv() {

    const GCM_IV_LENGTH  =  12; // in bytes

    // first we generate the iv
    // filling it with random bytes
    var iv = await GenerateRandomBytes(GCM_IV_LENGTH);

    // then we must take the number of
    // seconds elapsed since 01 Jan 1970 00:00:00 UTC
    const millis = Date.now();
    var secondsSince1970 = Math.floor(millis / 1000);

    // then we set the first 4 bytes
    // to the seconds elapsed since 01 Jan 1970 00:00:00 UTC
    iv = SetFirstFourBytes(iv, secondsSince1970);

    return iv;

}

export default GenerateIv;