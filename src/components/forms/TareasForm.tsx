import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { POST } from "../../services/peticiones";
import { ITarea } from "../../../types/ITarea"

interface IFormProps {
    setForm: Dispatch<SetStateAction<boolean>>
}



const TareasForm: FC<IFormProps> = ({ setForm }) => {




    const [values, setValues] = useState<ITarea>({nombre: "", fecha: "", prioridad: "", finalizada: false })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { // En el parentesis podemos agregar que tipos de elementos queremos que reciba

        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,     // Para que no se sobreescriban los valores en el text field
            [name]: value,  
        }));

    };

    console.log(values)

    const handleSubmit = async () => {
        const res = await POST<ITarea>('http://localhost:3000/listaTareas', values);
        console.log(res)
    }

    return (
        <div className="inset-0 w-full min-h-screen bg-black/30 fixed  flex justify-center items-center">
            <div className="flex gap-y-11 pb-6 pt-6 flex-col w-[30%] rounded-[20px] bg-gradient-to-r from-purple-600 to-indigo-600        ">
            <div className="flex justify-center gap-10 items-center">
                <h1 className="text-gray-100 font-bold font-roboto" >Tarea:</h1>
                    <input placeholder="Ingresa la tarea" className="bg-white text-gray-900 border rounded-[10px] p-2 " type="text" onChange={handleChange} name='nombre' />
                </div>
                <div className="flex justify-center gap-10 items-center">
                    <h1 className="text-gray-100 font-bold font-roboto">Fecha limite:</h1>
                    <input className="bg-white text-gray-900 border rounded-[10px] p-2 " type="date" onChange={handleChange} name='fecha' />
                </div>

                <div className="flex justify-center gap-10 items-center">
                    <h1 className="text-gray-100 font-bold font-roboto">Prioridad:</h1>

                    <select className=" p-2 bg-white text-gray-900 border rounded-[10px]" name="prioridad" onChange={handleChange} id="">
                    <option></option>
                        <option value="alta">Alta </option>
                      <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </div>
            

            <div className="flex justify-center gap-x-8">
            <button className="p-2 text-gray-800 font-semibold border-2 border-gray-300 rounded-[10px] hover:bg-gray-200 transition duration-300" onClick={handleSubmit}>AGREGAR TAREA</button>
            <button className="p-2 text-gray-800 font-semibold border-2 rounded-[10px] border-gray-300 hover:bg-gray-200 transition duration-300" onClick={()=>setForm (false)}>CERRAR</button>
            </div>
            </div>
        </div>
    )
}

export default TareasForm