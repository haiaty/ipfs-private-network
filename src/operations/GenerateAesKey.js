'use strict'

import fs from 'fs'

import  GenerateRandomBytes from '../jobs/GenerateRandomBytes.js'

async function GenerateAesKey(options) {

    var symmetricAesKey = null;

    // why "key_type" verification? because if we have
    // this property set, it means that we should
    // take the key from either a file or string
    // otherwise we should generate the key as random bytes
    if(options.hasOwnProperty("key_type")) {

        switch (options.key_type) {
            case "file":
                //NOTE: fs.readFileSync returns a buffer
                symmetricAesKey = fs.readFileSync(options.value);
                break;
            case "string":
                symmetricAesKey = Buffer.from(options.value);
                break;
            case "hex":
                symmetricAesKey = Buffer.from(options.value, 'hex');
                break;
            default: throw Error("You should pass a file of string as key");
        }

    } else {


        // Why 32 bytes? because it is
        // the dimension of the AES 256 key --> 256 bits are 32 bytes since 256/8 = 32
        // var someRandomBytes = await GenerateRandomBytes(32);
        var someRandomBytes = await GenerateRandomBytes(16);

        // we can use the bytes generated as it is. there is no need
        // to perform any transformation on it
        symmetricAesKey = someRandomBytes;

    }

    return symmetricAesKey;
}


export default GenerateAesKey;