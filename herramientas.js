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

function printObj(cabecero, obj, list,indent){

    let str=JSON.stringify(obj);
    //str=str.replace(/[}"]/g, '').replace(/[{,]/g, '\n\t- ').replace(/:/g, ': ');
    if (cabecero){
        console.log(cabecero);
    }

    if(list){
        str=str.replace(/[}"]/g, '').replace(/{/g, (' '.repeat(indent)+'- ')).replace(/,/g, ('\n'+' '.repeat(indent)+'- ')).replace(/:/g, ': ');
    }
    else{
        str=str.replace(/[{}"]/g, '').replace(/,/g, ', ').replace(/:/g, ': ');
    }
    console.log(str)
}

function printObjArrObj(encabezado,objarrobj,elemento, list){
    let i;
    if (encabezado) {
        console.log(encabezado)
    }
    if (list) {
        //Entramos en el ojeto y utilizaos las keys como titulo de cada parte
        for (const key in objarrobj) {
            console.log("\n   "+ key + ": ")
            i=0
            //Recorremos cada objeto dentro del array
            for (const caja of objarrobj[key]) {
                i++
                printObj(`\n\t${elemento} ${i}: `, caja, true)
            } 
        }
    }
    else{
        //Entramos en el ojeto y utilizaos las keys como titulo de cada parte
        for (const key in objarrobj) {
            console.log("\n"+ key + ": ")
            i=0
            //Recorremos cada objeto dentro del array
            for (const caja of objarrobj[key]) {
                i++
                printObj(`\n${elemento} ${i}: `, caja, null)
            } 
        }
    }
    

}
module.exports={abrirParsedJSON, guardarJSON, ordenarmM, printObj, printObjArrObj}