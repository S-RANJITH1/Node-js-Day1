import express, { application } from "express";
import fs from 'fs';
import {format} from 'date-fns';
//importing space


//declaration/initialization
const app = express();
const PORT = 5000;

//Middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
   //res.status(200).json({message:"Hi all welcome to our first node app"})
  let today = format(new Date(),'dd-mm-yyyy-HH-mm-ss')
  //console.log(today);
  const filepath = `Timestamp/${today}.txt`
  fs.writeFileSync(filepath,`${today}`,'utf-8')
  let data = fs.readFileSync(filepath,'utf-8')
  try {
  res.status(200).send(data)
} catch (error) {
  req.res(500).send('Internal Server Error')
}
})


//New endpoint to retrieve all text files in a folder

app.get("/getTextFiles",(req,res) => {
  const folderpath = "Timestamp";
  fs.readdir(folderpath, (err,files) => {
  if (err) {
    console.log(err);
    res.status(500).send("An error occured while listing the files from directory");
  } else {
    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json(textFiles);
  }
});
});

//running port
app.listen(PORT,()=>{
  console.log(`App is listening on the port ${PORT}`);
})