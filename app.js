const { guardarDB,leerDb } = require('./helpers/guardarArchivo');
const { inquireMenu,
         pausa,
         leerInput,
         listadoTareasBorrar,
         confirmar,
         mostrarListadoChecklist } = require('./helpers/inquire');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');

console.clear();
const main = async()=>{

    let opt = '';
    const tareas = new Tareas();
    const tareasDb= leerDb();

    if (tareasDb) {
        //Establecer tareas
        tareas.cargarTareas(tareasDb);

    } 


     do{
         //imprime el menu con InquireMenu()
         //opt guarda el resultado
        opt = await inquireMenu(); 
        
        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput(' Descripción: ');
                tareas.crearTarea( desc);
                break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //listar tareas completadas
                tareas.listadoCompletadas();
                break;
            case '4':
                //listar tareas pendients
                tareas.listadoPendientes();
                break;
            case '5':
                //Completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toggleCompletadas(ids)                
                break;
            case '6'://borrar
                const id =  await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {                    
                    const sino =  await confirmar('¿Está seguro que desea borrarlo?'.yellow);
                    if (sino) {
                        tareas.borrarTareas(id);
                        console.log('Tarea borrada'.red)
                    }
                }
                break;             
                  
        }

        guardarDB( tareas.listadoArr);

        await pausa();   

     } while( opt !== '0');



    // pausa();
}

main();