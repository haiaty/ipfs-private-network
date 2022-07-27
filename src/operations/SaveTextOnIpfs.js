

async function SaveTextOnIpfs(text, ipfsClient) {

    console.log("saving to ipfs", text);
    const { cid } = await ipfsClient.add(text)

    console.log(cid);
    return cid;
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

export default SaveTextOnIpfs;
//SaveTextOnIpfs(crypto.randomBytes(4).toString('hex'));