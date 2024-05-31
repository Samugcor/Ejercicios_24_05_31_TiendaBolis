const fs=require("node:fs");

function abrirParsedJSON(nombreArchivo){
    try {
        //console.log("Abriendo el archivo " + nombreArchivo);
        return JSON.parse(fs.readFileSync('./'+nombreArchivo+'.json', 'utf8'));
        
    } catch (err) {
        console.error("no se pudo abrir el archivo");
    }
}

function guardarJSON(datos,nombreArchivo){
    try {
        console.log("Intentando guardar en el archivo "+nombreArchivo+"...");
        fs.writeFileSync('./'+nombreArchivo+'.json', JSON.stringify(datos));
        console.log("Guardado exitoso en el archivo "+nombreArchivo);
    } catch (err) {
        console.error("no se pudo guardar");
    }
}

function ordenarmM(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    let pivot = arr[0];
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }

    return [...ordenarmM(leftArr), arr[0], ...ordenarmM(rightArr)];
}
module.exports={abrirParsedJSON, guardarJSON, ordenarmM}