'use strict'


import GenerateAesKey from './GenerateAesKey.js';
import { create } from 'ipfs-http-client'
import * as fs from "fs";
import GenerateIv from "./GenerateIv.js";
import * as crypto from 'crypto'
import * as utils from 'util'
import * as stream from 'stream'


// we promisify the stream pipeline function
// in order to use await
var pipelineStreams = utils.promisify(stream.pipeline);
const GCM_TAG_LENGTH =  16; //in bytes

// http://10.146.96.24:8080/ipfs/Qmah3UPytXiSxE4FZ1Qhvb7qfuZrBAocbuCJDvfxwsEujB

async function main () {


    const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b";
    const iv = "5183666c72eec9e4";

    // seed 20 words ---> generate asymetric keys (public + ptivate)  + generate AES 256 key
    // the AES key is sent together with the file, the serve extracts encrypt file and store to ipfs
    // when user get, we take the file from ipfs with its CID, decrypt it with the AES 256 key and return
    // it back to the user

    let ipfsNodeApiUrl = "http://10.146.96.24:5001/api/v0";

    // connect to the default API address http://localhost:5001
    const ipfsClient = create(ipfsNodeApiUrl);

    //
    //let encryptedFile = ipfsClient.get("QmRmgGMXDNwiA2ETNQmo9BEJPDHzyjSpodWqXhJswi2xLo");

    // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsgetipfspath-options

    //http://10.146.96.24:8080/ipfs/QmRmgGMXDNwiA2ETNQmo9BEJPDHzyjSpodWqXhJswi2xLo
    const resp = await ipfsClient.cat("QmTYHRfm1Ru84q5pLz7Uj1RBEarUMX5uwowVZY1cWRmacH");
    let content = [];
    for await (const chunk of resp) {
        content = [...content, ...chunk];
    }

     console.log(Buffer.from(content).toString('utf8'))
    // process.exit();

    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, iv);
    let decrypted = decipher.update(Buffer.from(content), 'binary', 'utf8');
    console.log(decrypted + decipher.final('utf8'));

    process.exit();

    //========================
    // encrypt file with AES
    //========================
    //================
    // AES KEY GENERATION
    //==================

   // var symmetricAesKey = await GenerateAesKey({key_type: "string", value: "my-secret"});

    //console.log(Buffer.from(symmetricAesKey).toString("base64"));
    //process.exit();

    //console.log(symmetricAesKey);


    //======
    // Encryption part
    //=========
    var filepath = "./test.txt";
    const fileStream = fs.createReadStream(filepath);

    //var iv  = await GenerateIv();

    //console.log(Buffer.from(iv).toString("base64"));


    // initialize the cypher with configs.
    // the result will be a streamable object that you can pipe
    var cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY , iv)


    //put encrypted data to the file
    var timestamp = Date.now();
    var outputFile = "./tmp_file_holding_encrypted_data_"+ timestamp +".enc";

    const outputStream = fs.createWriteStream(outputFile, {
        flags: "w"
    });

    await pipelineStreams(fileStream, cipher, outputStream);


    //console.log("encrypted");
    //process.exit();


    //=========================
    // push the file to IPFS
    //========================


    // QmRmgGMXDNwiA2ETNQmo9BEJPDHzyjSpodWqXhJswi2xLo

    //var result = await ipfsClient.add("Gioele");

    //console.log(result);
    //process.exit();
    // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options

    const file = {
        path: '/tmp/test.enc',
        content: fs.createReadStream(outputFile)
    }

    var options = {
        'pin': true
    }


    const result = await ipfsClient.add(file, options)

    console.info(result)
    process.exit();

    // const node = await IPFS.create()
    // const version = await node.version()

    // console.log('Version:', version.version)
    //
    // const file = await node.add({
    //     path: 'hello.txt',
    //     content: uint8ArrayFromString('Hello World 101')
    // })
    //
    // console.log('Added file:', file.path, file.cid.toString())
    //
    // const data = uint8ArrayConcat(await all(node.cat(file.cid)))
    //
    // console.log('Added file contents:', uint8ArrayToString(data))
}

main()