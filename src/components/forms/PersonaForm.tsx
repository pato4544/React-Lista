import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { POST } from "../../services/peticiones";
import { ITarea } from "../../../types/ITarea"

interface IFormProps {
    setForm: Dispatch<SetStateAction<boolean>>
}



const TareasForm: FC<IFormProps> = ({ setForm }) => {




    const [values, setValues] = useState<ITarea>({ nombre: "", fecha: "", prioridad: "", finalizada: false })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { // En el parentesis podemos agregar que tipos de elementos queremos que reciba

        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: value,  // Para que no se sobreescriban los valores en el text field
        }));

    };

    console.log(values)

    const handleSubmit = async () => {
        const res = await POST<ITarea>('http://localhost:3000/listaTareas', values);
        console.log(res)
    }

    return (
        <div className="inset-0 w-full min-h-screen bg-black/20 fixed">
            <div className="flex flex-col">
                <div>
                    <input className="" type="text" onChange={handleChange} name='nombre' />
                </div>
                <div>
                    <input className="" type="date" onChange={handleChange} name='fecha' />
                </div>
                <div>
                    <select className="" name="prioridad" onChange={handleChange} id="">
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </div>
            </div>
            <button onClick={handleSubmit}>AGREGAR TAREA</button>


            <button onClick={()=>setForm (false)}>Cerrar</button>
        </div>
    )
}

export default TareasForm