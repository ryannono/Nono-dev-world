"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function getDate() {
    let dateString = new Date().toLocaleDateString("en-GB");
    dateString = dateString.substring(0, 2) + "_" + dateString.substring(3, 5) + "_" + dateString.substring(6);
    return dateString;
}
function createCSVFile(fileName, fileExtension) {
    let dateString = getDate();
    let fullFileName = fileName + "_" + dateString + "." + fileExtension;
    const writeStream = fs.createWriteStream("./exports/" + fullFileName);
    return writeStream.write("hey", (err) => {
        if (err) {
            console.log(err);
            return false;
        }
        else {
            console.log("Table successfully exported");
            return true;
        }
    });
}
createCSVFile("Active_Licences_Export", "csv");
