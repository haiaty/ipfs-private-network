import PickIpfsClient from "../src/jobs/PickIpfsClient.js";
import SaveTextOnIpfs from "../src/operations/SaveTextOnIpfs.js";
import {execSync} from "child_process";
import GetDataFromIpfs from "../src/operations/GetDataFromIpfs.js";

//=====================
// save text1 on node1
//======================

var ipfsClientNode1 = await PickIpfsClient('node_1');
//
// let cidText1 = await SaveTextOnIpfs("text1", ipfsClientNode1);
let cidText1 = "QmcQjZnwezQ96Sjg3Lqcws8L8BkhwxtRpmQRwta2ircCSw";
//
// //=====================
// //save text2 on node3
// //=====================
//
var ipfsClientNode3 = await PickIpfsClient('node_3');
//
// let cidText2 = await SaveTextOnIpfs("text2", ipfsClientNode3);
 let cidText2 = "QmTmhAF6afkfkJkYvMM7i4m1sEtptEqoAFu4NLQaMzXqLp";

//=====================
// turn of the node 3
//=====================

// console.log("waiting for 60 seconds. Go and turn off the ipfs process on node 3");
// execSync('sleep 60');
//
// console.log("going to take the data ");

// cat text1 on node1


//=====================
// take text1 from node1
//=====================
// why? because i want to assure that even if the node3 is
// down, the data saved on node1 is still available from node1, because
// it is pinned automatically on the node that receives the data, in this case
// it is the node1
let text1FromNode1 = await GetDataFromIpfs(cidText1, ipfsClientNode1);
console.log("text1 from node1 is: " + text1FromNode1);


//=====================
// take text2 from node1
//=====================
// why? I want to test if I can get the text saved on the node3
// from the node1 even if the node3 is offline (simulation a service disruption).

let text2FromNode1 = await GetDataFromIpfs(cidText2, ipfsClientNode1);
console.log("text2 from node1 is: " + text2FromNode1);

//RESULT:

// could you get both texts on node1 even if the node3 was offline?
// yes.

// is it only for short strings?