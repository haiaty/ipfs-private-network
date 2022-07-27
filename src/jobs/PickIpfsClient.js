import {create} from "ipfs-http-client";


async function PickIpfsClient(node) {

    let nodeurls = {
        "node_1": "http://10.146.96.24:5001/api/v0",
        "node_2": "http://10.146.96.30:5001/api/v0",
        "node_3" : "http://10.146.96.37:5001/api/v0",
    }

    let ipfsNodeApiUrl = nodeurls[node];


    const ipfsClient = create(ipfsNodeApiUrl);

    return ipfsClient;



}

export default PickIpfsClient;