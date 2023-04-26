//express
var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");
var helpers = require("./helpers");

app.listen(3001, startup);
function startup() {
  console.log("Server started at port 3001");
}
app.use(cors());
app.use(express.static(__dirname));

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

jsonfile = __dirname + "/projects.json";

//GET /nft/retrieveAllNFTs
app.get("/nft/retrieveAllNFTs", function (req, res) {
  console.log(req.method, req.url);
  nft = JSON.parse(fs.readFileSync(jsonfile, "utf8")).nft;
  console.log("Response: ", nft);
  res.send(nft);
});

//POST/nft/issueNFT
app.post("/nft/issueNFT", function (req, res) {
  console.log(req.method, req.url);
  nft = JSON.parse(fs.readFileSync(jsonfile)).nft;
  nft.push(req.body);
  console.log("Response: ", nft);
  fs.writeFileSync(
    jsonfile,
    JSON.stringify({
      ...JSON.parse(fs.readFileSync(jsonfile)),
      nft: nft,
    }),
    "utf8"
  );
  res.send(helpers.toCamel({result:req.body}));
});

//GET nft/retrieveAllNFTSForUser/:nftOwner
app.get("/nft/getNftsByUser/:nftOwner",function (req,res){
  console.log(req.method, req.url);
  console.log(req.params);
  nft = JSON.parse(fs.readFileSync(jsonfile, "utf8")).nft;
  console.log("Response: ", nft);
  res.send(nft);
})

app.get("/nft/history/:nftId",function (req,res){
  console.log(req.method, req.url);
  console.log(req.params);
  nft = JSON.parse(fs.readFileSync(jsonfile, "utf8")).history;
  console.log("Response: ", nft);
  res.send(nft);
})




app.post("/nft/validateNFT", function (req, res) {
  console.log(req.method, req.url);
  nft = JSON.parse(fs.readFileSync(jsonfile)).nft;
  nft.push(req.body);
  console.log("Response: ", nft);
  fs.writeFileSync(
    jsonfile,
    JSON.stringify({
      ...JSON.parse(fs.readFileSync(jsonfile)),
      nft: nft,
    }),
    "utf8"
  );
  res.send(helpers.toCamel({"result": "Invalid"}));
});

app.post("/nft/expireNft", function (req, res) {
  console.log(req.method, req.url, req.body);
  nft = JSON.parse(fs.readFileSync(jsonfile)).nft;
  nft = nft.map((nft) =>{
    if(nft.nftId === req.body.nftId){
      console.log(nft.nftStatus)
      nft.nftStatus= "EXPIRED"
      console.log(nft.nftStatus)
    }
    return nft
  })
  console.log("Response: ",nft );
  fs.writeFileSync(
    jsonfile,
    JSON.stringify({
      ...JSON.parse(fs.readFileSync(jsonfile)),
      nft: nft,
    }),
    "utf8"
  );
  res.send(helpers.toCamel({
    "result": "success"}));
  
});



app.post("/api/signin", function (req, res) {
  console.log(req.method, req.url ,req.body);
  users = JSON.parse(fs.readFileSync(jsonfile)).users;
  users = users.map((users) => {
    console.log(users.userName, req.body.userName, users.password, req.body.password)
    if (users.userName == req.body.userName && users.password == req.body.password) {  
      res.send(["admin", "External", "Successfully LoggedIn"]);
    } else {
      res.send("Incorrect username or password.");
    }
  })
  
}
)

app.post("/api/signup", function (req, res) {
  console.log(req.method, req.url);
  signUp = JSON.parse(fs.readFileSync(jsonfile)).signUp;
  signUp.push(req.body);
  console.log("Response: ",{

    "_id": "63103b3b45dc29062633b2f0",

    "userName": "user3",

    "email": "user3@gmail.com",

    "role": "User"

});
  fs.writeFileSync(
    jsonfile,
    JSON.stringify({
      ...JSON.parse(fs.readFileSync(jsonfile)),
      signUp: signUp,
    }),
    "utf8"
  );
  res.send(helpers.toCamel({

    "_id": "63103b3b45dc29062633b2f0",

    "userName": "user3",

    "email": "user3@gmail.com",

    "role": "User"

}));
});

app.post("/api/update", function (req, res){
  console.log(req.method, req.url);
  update = JSON.parse(fs.readFileSync(jsonfile)).update;
  update = update.map((update) => {
    if (update.userName == req.body.userName) {
      
      return req.body;  
    } else {
      return update;
    }
  })
  console.log("Response: ", update);
  fs.writeFileSync(
    jsonfile,
    JSON.stringify({
      ...JSON.parse(fs.readFileSync(jsonfile)),
      update: update,
    }),
    "utf8"
  );
  res.send("password successfully updated!");
}
)



app.get("/api/empsData", function (req, res) {
  console.log(req.method, req.url);
  empData = JSON.parse(fs.readFileSync(jsonfile, "utf8")).empData;
  console.log("Response: ", empData);
  res.send(empData);
});



app.get("/api/Skillbadge", function (req, res) {
  console.log(req.method, req.url);
  skillBadges = JSON.parse(fs.readFileSync(jsonfile, "utf8")).skillBadges;
  console.log("Response: ", skillBadges);
  res.send(skillBadges);
});