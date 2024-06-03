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

let obj={Nombre:"Alex", Edad:17, correo:"alexig@gmail.com", color:"azul"}

printObj(null,obj,false,null)
printObj("Alumno:",obj,false,0)
printObj("Alumno: ",obj,true,0)
printObj("Alumno: ",obj,true,4)