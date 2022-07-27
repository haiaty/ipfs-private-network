'use strict'

import crypto from 'crypto';

/**
 * Generate a typed array filled with random bytes
 * some notes:JavaScript typed arrays  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
 * @returns {Promise<unknown>}
 * @constructor
 */
async function GenerateRandomBytes(length) {

    // first we create the memory buffer
    // with the lenght that we want.
    // The array buffer is how much space, IN BYTES,
    // we want to allocate in memory. So if you pass lenght = 2
    // it means that it will have 2 bytes (16 bits) of contiguos memory space
    let buffer = new ArrayBuffer(length);

    // the typed array is the uint8 since we want to handle
    // byte per byte. The type array is a kind of "eyeglasses" on how to work
    // with the buffer. In this case we want to be able to manipulate byte per byte
    // read: https://javascript.info/arraybuffer-binary-arrays
    var typedArray = new Uint8Array(buffer);

    // then we fill the typed array
    // with random bytes
    return new Promise(function(resolve, reject) {

        crypto.randomFill(typedArray, function(err, typedArray) {

            if (err) {
                reject(err)
            } else {
                resolve(typedArray);
            };
        });

    });
}

export default GenerateRandomBytes;