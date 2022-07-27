// https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsgetipfspath-options
//http://10.146.96.24:8080/ipfs/QmRmgGMXDNwiA2ETNQmo9BEJPDHzyjSpodWqXhJswi2xLo


async function GetDataFromIpfs(cid, ipfsClient) {

    console.log("taking it from ipfs");

    const resp = await ipfsClient.cat(cid);
    let content = [];
    for await (const chunk of resp) {
        content = [...content, ...chunk];
    }

    let data = Buffer.from(content).toString('utf8');
    //console.log(data)
    return data;

}


export default GetDataFromIpfs;