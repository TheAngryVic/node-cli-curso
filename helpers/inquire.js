const inquirer = require('inquirer');
const inquire = require('inquirer');
const { prototype } = require('inquirer/lib/prompts/input');
require('colors');

const preguntas =[
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1'.random} Crear tarea`
            },
            {
                value: '2',
                name:`${'2'.random} Listar tareas`
            },
            {
                value: '3',
                name:`${'3'.random} Listar tareas completadas`
            },
            {
                value: '4',
                name:`${'4'.random} Listar tareas pendientes`
            },
            {
                value: '5',
                name:`${'5'.random} Completar tarea(s)`
            },
            {
                value: '6',
                name:`${'6'.random} Borrar tarea(s)`
            },
            {
                value: '0',
                name:`${'0'.random} Salir`
            },
        ]
    }
]



const inquireMenu = async()=>{

    console.clear();
    console.log("=====================".green)
    console.log("Seleccione una opción".green)
    console.log("=====================\n".green)

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async()=>{

    const pausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presiona ${'[Enter]'.green} para continuar ${'...'.random}`
        }
    ] 
    console.log('\n');
    await inquire.prompt(pausa)
        .then((res)=>{
            console.log(res)
        })

}

const leerInput = async(message)=>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return `${'Por favor ingrese un valor'.red}`;
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas= [])=>{

    const choices = tareas.map( (tarea, i)=>{
        const idx =  `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc} `
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green+ ' Cancelar'
    })
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices 
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    

    return id;
}

const confirmar = async (message) =>{

    const pregunta = [
         {
            type: 'confirm',
            name: 'ok',
            message
         }
    ];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async(tareas= [])=>{

    const choices = tareas.map( (tarea, i)=>{
        const idx =  `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc} `,
            checked: (tarea.completadoEn) ? true : false
        }
    });

  
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices 
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    

    return ids;
}

module.exports={
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}