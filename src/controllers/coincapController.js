const coinModel= require("../models/coincapModel")
const axios=require('axios');

const getCoin=async function(req,res)
{

try
{

let options=
{
    method:"get",
    url:"http://api.coincap.io/v2/assets",
    header:
          {
            Authorization:"Bearer cfe8f64a-e8e1-449e-997c-67036363796a",
          },
    
}
const coin=await axios(options)

let coinData=coin.data.data
let changeTesting=[]


 for(let i=0;i<coinData.length;i++)

  {
    
  let coinCreate=
 {
   symbol:coinData[i].symbol,
   name: coinData[i].name,
   marketCapUsd:coinData[i].marketCapUsd, 
   priceUsd:coinData[i].priceUsd
 };
 await coinModel.findOneAndUpdate({ symbol:coinData[i].symbol }, coinCreate, { upsert: true, new: true } );
// await coinModel.create(coinCreate);
 changeTesting.push({Coin:coinData[i].name,changePercent24Hr:coinData[i].changePercent24Hr})
}

function compare(a,b)
{
    return a.changePercent24Hr-b.changePercent24Hr
}
const sorted=changeTesting.sort(compare)
res.status(200).send({msg:"Successfully fetched data",SortedData:sorted});
}
catch(err)
  {
    
    res.status(500).send({msg:"Some error occured"});
  }
}



module.exports.getCoin= getCoin
