import fs from "fs";
import os from "os";

// Sync create file
fs.writeFileSync("./text-file.txt", "Hello Nodejs");

// Sync read file
const result = fs.readFileSync("./text-file.txt", "utf-8");
console.log("Result", result);

// Sync delete file
// fs.unlinkSync("./text.txt");

// For checking cpu core
console.log(os.cpus().length);
