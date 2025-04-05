import path from "path";
import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public  ")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title}.txt`, req.body.description, (err) => {
    res.redirect("/");
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, (err, filedata) => {
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  fs.rename(
    `./files/${req.body.previousfilename}`,
    `./files/${req.body.newfilename}`,
    (err) => {res.redirect("/")}
  );

});

app.listen(3000, () => {
  console.log("running");
});
