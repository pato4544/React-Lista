import { useEffect, useState } from 'react'
import './App.css'
import { ITarea } from '../types/ITarea'
import TareasForm from './components/forms/TareasForm'
import { DELETE, PATCH } from './services/peticiones'
import { FaCheck } from "react-icons/fa";



function App() {

  const [form, setForm] = useState(false)  // EL hook con el que vamos a acceder a la creacion de tareas

  const [tareas, setTareas] = useState<ITarea[]>([])  // El hook con el que vamos a acceder a los datos de tareas para traerlos, modificarlos (aun no lo hago) o borrarlos

  const traerTareas = async () => { /* Funcion asincrona que espera a recibir datos con el await de abajo */
    const res = await fetch('http://localhost:3000/listaTareas'); // La constante res va a pulear los datos del link de la base de datos (con await espera a que se reciban los datos)
    const resJSON = await res.json(); /* El res.json() transforma a la const res en formato JSON */
    setTareas(resJSON)  // Seteamos a tareas 
  }

  useEffect(() => {  /* Este useEffect es para que no se traiga los datos infinitas veces */
    traerTareas();
  }, [])




  const completarTarea = async (id: number) => {
    try {
      const nuevoEstado = !tareas.find((tarea) => tarea.id === id)?.finalizada; // Esto de aca va a permitirnos volver al valor falso de finalizada, ya que si solo le pedimos que la haga true se queda true para siempre
  
      await PATCH(`http://localhost:3000/listaTareas/${id}`, { finalizada: nuevoEstado }); // Hacemos el patch con el nuevo estado
  
  
      setTareas((prevTareas) =>
        prevTareas.map((tarea) =>
          tarea.id === id ? { ...tarea, finalizada: nuevoEstado } : tarea
        )
      );
    } catch (error) {
      console.error("No se pudo cambiar el estado de la tarea.", error); // Si ocurre un error por alguna casualidad de la vida va a tirar este mensajito
    }
  };
  

  const eliminarTarea = async (id: number) => {
    try {
      await DELETE(`http://localhost:3000/listaTareas/${id}`); // Vamos a eliminar cada tarea por su id para no tener problemas en caso de tener dos con nombres iguales
      setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== id)); // Le filtramos las tareas al setTareas
    } catch (error) {
      console.error("No se pudo eliminar la tarea:", error); // Si ocurre un error por alguna casualidad de la vida va a tirar este mensajito
    }
  };
  
  return (
    <>
      <div className='min-h-screen w-[60%] mx-auto flex flex-col '>

        <div className='text-white font-roboto font-semibold flex items-center justify-center h-[60px] text-[36px] rounded-t-[20px] bg-gradient-to-r from-blue-300 to-blue-700'>
          <h1>MI LISTA DE TAREAS</h1>
        </div>


        <div className='flex flex-col text-[20px] bg-gray-100/20 h-auto '>

          {tareas.map((tarea, index) => (  // Lo que hago con el onCLick abajo es que si hacemos click a un elemento Tarea su estado finalizada se vuelve true, y con eso les puedo meter nuevos estilos a cada elemento en casa de que la tarea este finalizada (use las comillas invertidas justamente para poder meter esa condicion junto a las clases normales en classname)

            <div key={index}  onClick={() => completarTarea(tarea.id ?? 0)} className={`font-poppins pl-3 flex gap-4 w-full h-16 items-center border-[1px] justify-between hover:bg-gray-200 border-b-blue-800  border-t-blue-950 ${tarea.finalizada ? 'bg-gray-500/40 hover:bg-gray-500/40 transition duration-300' : ''}`}
            >
             
              <div className={`flex gap-x-8 items-center  h-full w-[45%] ${tarea.finalizada ? 'line-through  text-white transition duration-100' : ''}`}>
                <button className={`text-transparent${tarea.finalizada ? 'text-white transition duration-100' : ''}`}><FaCheck/></button> 
                <p>{tarea.nombre}</p>
              </div>
              <div className={`flex  justify-center items-center h-full w-[20%] ${tarea.finalizada ? 'line-through  text-white transition duration-100' : ''}`}>
                <p>{tarea.fecha}</p>
              </div>
              <div className={`flex  justify-center items-center h-full w-[20%] ${tarea.finalizada ? ' text-white transition duration-100 ' : ''}`}>
                <p
                  className={`uppercase ${tarea.finalizada! || tarea.prioridad === 'alta'
                      ? 'text-red-500'
                      : tarea.finalizada! || tarea.prioridad === 'media'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    } 
                    ${tarea.finalizada ? ' text-white ' : ''}
                    `}
                >
                  {tarea.prioridad}
                </p>
              </div>

              <div className='flex justify-end h-full w-[10%]'>
                <button  onClick={() => eliminarTarea(tarea.id ?? 0)} className={`hover:bg-red-600 text-[17px] font-bold hover:text-white h-full w-[70%]${tarea.finalizada ? ' text-white transition duration-100' : ''}`}>x</button>
              </div>
            </div>

          ))}

        </div>


        <div className='text-white font-roboto font-semibold flex items-center justify-center h-[60px] text-[36px] rounded-b-[20px] bg-gradient-to-r from-blue-300 to-blue-700'>
          <button className='bg-green-500 hover:bg-green-600 text-white rounded-full p-2 w-[45px] text-[20px]' onClick={() => setForm(true)}>+</button>
        </div>


      </div>
      {form && <TareasForm setForm={setForm} />}  {/* Un renderizado condicional. si el valor de form es true con el operador AND renderizamos la componente TareasForm */}


    </>

  )
}

export default App
