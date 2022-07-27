
import { create } from 'ipfs-http-client'

async function main() {



    console.log("saving to ipfs");


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


}
// if (require.main === module) {
//
//     (async function(){
//         await SaveDocumentOnIpfs();
//     })();
//
// } else {
//     module.exports = SaveDocumentOnIpfs;
// }

main();