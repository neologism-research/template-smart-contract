import fs from "fs";
import path from "path";

const jsonsInDir = fs.readdirSync("./deployments/localhost").filter((file) => path.extname(file) === ".json");

const res = {};
jsonsInDir.forEach((file) => {
  const fileData = fs.readFileSync(path.join("./deployments/localhost", file));
  const json = JSON.parse(fileData.toString());

  let k = `${file.split(".json")[0]}`;
  let v = json.address;
  res[k] = v;
});

console.log(res);
