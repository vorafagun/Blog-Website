import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

var count=0;
var id=[];
var TitleArray=[];
var UsernameArray=[];
var ContentArray=[];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs",{
    frontTitleArray: TitleArray,
    frontUsernameArray: UsernameArray,
    frontContentArray: ContentArray,
    frontID: id,
  });
  });

app.get("/add", (req, res) => {
    res.render("add.ejs");
  });

  app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  app.post("/edit",(req,res)=>{
    for (let i = 0; i < id.length; i++) {
      if(id[i]==req.body.index){
        res.render("editForm.ejs",{
          editTitle: TitleArray[i],
          editUsername: UsernameArray[i],
          editContent: ContentArray[i],
          editID: i,
        })
      }
    }
  })

app.post("/submitEdit",(req,res)=>{
  TitleArray[req.body.index]=req.body.title;
  ContentArray[req.body.index]=req.body.content;
  res.redirect("/")
})

app.post("/delete", (req,res)=>{
  let thisID;
  for (let i = 0; i < id.length; i++) {
    if(req.body.index===id[i]){
      thisID=i;
      break;
    }
  }
  TitleArray.splice(thisID, 1);
  ContentArray.splice(thisID, 1);
  UsernameArray.splice(thisID, 1);
  id.splice(thisID, 1);
  res.redirect("/");
})

app.post("/submit",(req,res)=>{
  if(req.body["title"]!==undefined && req.body["content"]!==undefined && req.body["username"]!==undefined && req.body["title"]!=="" && req.body["content"]!=="" && req.body["username"]!==""){
    TitleArray.push(req.body["title"]);
    UsernameArray.push(req.body["username"]);
    ContentArray.push(req.body["content"]);
    id.push(count);
    count++;
}
  res.redirect("/");
})

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  