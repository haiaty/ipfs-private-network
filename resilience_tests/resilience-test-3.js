// state: node1 online, node2 online, node3 online

import PickIpfsClient from "../src/jobs/PickIpfsClient";
import crypto from "crypto"
import GetDataFromIpfs from "../src/operations/GetDataFromIpfs";
import SaveTextOnIpfs from "../src/operations/SaveTextOnIpfs";

var randomText = crypto.randomBytes(1024).toString('hex');

//=====================
// save data to node1
//=====================

console.log("saving on node 1");
var ipfsClientNode1 = await PickIpfsClient('node_1');
 let cidText = await SaveTextOnIpfs(randomText, ipfsClientNode1);

// keep getting it on node3
console.log("Getting from node3");
setInterval(async () => {
 console.log("taking from node3....\n");
 var ipfsClientNode3 = await PickIpfsClient('node_3');
 let text1FromNode3 = await GetDataFromIpfs(cidText, ipfsClientNode3);
 console.log(text1FromNode3);
 console.log("\n");
}, 2000)

// turn off node1

// turn off node2

//================
// RESULT
//================

// it keeps running with only one node even after node1 and node2 go offline.

// this is because if we were able to take it from node3 wich takes from the node1, then
// the node3 has it in its cache and can serve it.

//lesson: if we want to have availability on all nodes we can:
// 1) once saved the data - take it from all other nodes
// 2) save the data in all nodes - it will search for the hash in all available nodes
// 3) use ipfs cluster