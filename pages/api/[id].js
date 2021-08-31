import { INFURA_ADDRESS, ADDRESS, ABI } from "../../config.js"
import Web3 from "web3";
import traits from "../../database/traitsfinal.json";


const infuraAddress = INFURA_ADDRESS

const testApi = async (req, res) => {

  // SOME WEB3 STUFF TO CONNECT TO SMART CONTRACT
  const provider = new Web3.providers.HttpProvider(infuraAddress)
  const web3infura = new Web3(provider);
  const testContract = new web3infura.eth.Contract(ABI, ADDRESS)



  // IF YOU ARE USING INSTA REVEAL MODEL, USE THIS TO GET HOW MANY NFTS ARE MINTED
  const totalSupply = await testContract.methods.totalSupply().call();
  console.log(totalSupply)



  // THE ID YOU ASKED IN THE URL
  const query = req.query.id;


  // IF YOU ARE USING INSTA REVEAL MODEL
  if (parseInt(query) < totalSupply) {




    // IF YOU ARE NOT USING CUSTOM NAMES, JUST USE THIS
    let tokenName = `#${query}`



    // const signatures = [137,883,1327,1781,2528,2763,3833,5568,5858,6585,6812,7154,8412]
    const trait = traits[parseInt(query)]
    // const trait = traits[ Math.floor(Math.random() * 8888) ] // for testing on rinkeby 

    // CHECK OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
    let metadata = {}
    
      // GENERAL BANANA METADATA
      metadata = {
        "name": "Wild Lion Society" + " " + tokenName,
        "tokenId": parseInt(query),
        "image": `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
        "attributes": [
          {
            "trait_type": "Background",
            "value": trait["Background"]
          },
          {
            "trait_type": "Face",
            "value": trait["Face"]
          },
          {
            "trait_type": "Mouth",
            "value": trait["Mouth"]
          },
          {
            "trait_type": "Eyes",
            "value": trait["Eyes"]
          },
          {
            "trait_type": "Hair",
            "value": trait["Hair"]
          },

        ]
      }

      // console.log(metadata)

    

    res.statusCode = 200
    res.json(metadata)
  } else {
    res.statuscode = 404
    res.json({ error: "The emoji you requested is out of range" })

  }


  // this is after the reveal


}

export default testApi