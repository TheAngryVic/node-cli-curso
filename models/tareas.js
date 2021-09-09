const Tarea = require("./tarea");

class Tareas{

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key=>{
           const tarea= this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }


    constructor(){
        this._listado = {};
    }

    borrarTareas(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }

    }

    cargarTareas( tareas =[]){

        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })


    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){       

       this.listadoArr.forEach((tarea, i) => {           
           

        //ASi lo hice para el ejercicio pero no sabia que el forEach retornaba un indice
            // let indice = this.listadoArr.findIndex((objeto, indice, listadoArr) =>{
            //     return objeto.id === tarea.id
            // }) + 1           
            
            // if (tarea.completadoEn === null) {
            //     console.log(`${indice}`.blue, `${tarea.desc}`.red)
            // }
            // else{
            //     console.log(`${indice}`.blue, `${tarea.desc}`.green)
            // }

            const indice = `${i +1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = ( completadoEn)
                                ? 'Completada'.green
                                :'Pendiente'.red;
            console.log(`${indice} ${desc} ::  ${estado}`);            
               
       });
        
       

    }

    listadoCompletadas(){

        let i = 0 
        this.listadoArr.forEach((tarea)=>{

            
            const {desc, completadoEn} = tarea;
            const estado = ( completadoEn)
            ? 'Completada'.green
            :'Pendiente'.red;


            if (tarea.completadoEn != null) {
                i += 1
                console.log(`${ i}`.green,` ${desc} :: ${completadoEn.green}`)
            }
        })
    }
    listadoPendientes(){

        let i = 0 
        this.listadoArr.forEach((tarea)=>{

            
            const {desc, completadoEn} = tarea;
            const estado = ( completadoEn)
            ? 'Completada'.green
            :'Pendiente'.red;


            if (tarea.completadoEn === null) {
                i += 1
                console.log(`${ i}`.red,` ${desc} :: ${estado}`)
            }
        })
    }

    toggleCompletadas(ids =[]){

        ids.forEach(id=>{

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });
        
        this.listadoArr.forEach(tarea=>{

            if (!ids.includes(tarea.id)) {
               
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }
}

module.exports = Tareas;