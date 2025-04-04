import path from 'path';
import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public  ')))
app.set("view engine","ejs")

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/profile/:name",(req,res)=>{
    req.params.name
    res.send(req.params.name)

})

app.listen(3000,() => {
    console.log("running")
})
    
