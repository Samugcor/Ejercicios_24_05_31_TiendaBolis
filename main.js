const hr=require("./herramientas");
const readlineSync = require('readline-sync');
const { DateTime } = require("luxon");

function contarPorColor(almacen) {
    bolisPorColor={}

    for (const caja of almacen) {
       if(bolisPorColor[caja.color]==null){
        bolisPorColor[caja.color]=caja.contenido;
       } 
       else{
        bolisPorColor[caja.color]+=caja.contenido;
       }
    }

    return bolisPorColor;
}

almacen=hr.abrirParsedJSON("almacen");
str=JSON.stringify(contarPorColor(almacen));
console.log(str)
str=str.replace(/[{}"]/g, '').replace(/,/g, '\n').replace(/:/g, ': ').trim()
console.log(str)

