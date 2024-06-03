'use strict'

const hr=require("./herramientas");
const readlineSync = require('readline-sync');
const { DateTime } = require("luxon");

class Caja{
    constructor(marca,capacidad,contenido,color,fabricacion){
        this.marca=marca,
        this.capacidad=capacidad,
        this.contenido=contenido,
        this.color=color
        this.fabricacion = DateTime.fromISO(fabricacion)
    }
}

function contarPorColor(almacen) {
    let nBolisPorColor={}

    for (const caja of almacen) {
       if(nBolisPorColor[caja.color]==null){
        nBolisPorColor[caja.color]=caja.contenido;
       } 
       else{
        nBolisPorColor[caja.color]+=caja.contenido;
       }
    }

    return nBolisPorColor;
}

function cajasPorColor(almacen){
    let cajasPorColor={}

    for (const caja of almacen) {
       if(cajasPorColor[caja.color]==null){
        cajasPorColor[caja.color]=[caja];
       } 
       else{
        cajasPorColor[caja.color].push(caja);
       }
    }

    return cajasPorColor;
}

function antesDespuesFecha(almacen,fecha){
    fecha=DateTime.fromISO(fecha);
    let antesDespuesFecha={
        antes:[],
        despues:[]
    }

    for (const caja of almacen) {
       if(caja.fabricacion>fecha){
        antesDespuesFecha.despues.push(caja)
       } 
       else{
        antesDespuesFecha.antes.push(caja)
       }
    }
    return antesDespuesFecha;
}

function cajasPorMesAnio(almacen){
    let cajasAnioMes={}
    let anioMes;
    for (const caja of almacen) {
        anioMes=caja.fabricacion.substring(0,7);

        if(cajasAnioMes[anioMes]==null){
            cajasAnioMes[anioMes]=[caja];
        } 
        else{
            cajasAnioMes[anioMes].push(caja);
        }
    }

    return cajasAnioMes
}

function unoParaTodosYTodosParaUno(almacen){
    let totalBolis=0;
    let totalCajas=0;

    for (const caja of almacen) {
        totalBolis+= caja.contenido;
        totalCajas++;
    }

    console.log("totalBolis:" ,totalBolis)
    console.log("totalCajas:" ,totalCajas)

    if (totalBolis%totalCajas==0) {
        for (const caja of almacen) {
            caja.contenido=totalBolis/totalCajas;
        }

        return almacen
    }
    else{
        let media=Math.floor(totalBolis/totalCajas);
        totalBolis=totalBolis-(media*totalCajas);

        for (const caja of almacen) {
            caja.contenido=media;
        }

        
        for (const caja of almacen) {
            if (totalBolis<1) {
                break
            }
            else{
                caja.contenido+=1;
                totalBolis--;
            }
            
        }
        
        return almacen
    }

}
//====================================================
let almacen=hr.abrirParsedJSON("almacen");
let arayCajas = almacen.map(obj => new Caja(obj.marca, obj.capacidad, obj.contenido, obj.color, obj.fabricacion));


//hr.printObj("Bolis por color: ",contarPorColor(arayCajas),true)

//hr.printObjArrObj("Cajas por colores: ",cajasPorColor(arayCajas),"Caja",true)

//hr.printObjArrObj("Cajas por con respecto a 2022-05-12T12:00:00.000Z: ", antesDespuesFecha(arayCajas,"2022-05-12T12:00:00.000Z"),"Caja",true)

//hr.printObjArrObj("Cajas por mes y año: ",cajasPorMesAnio(almacen),"Caja",true)

let almacenmedia=unoParaTodosYTodosParaUno(almacen)
console.log(almacenmedia)