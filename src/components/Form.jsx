import React, { useContext, useRef, useState } from 'react';
// Importando info categorias
import trivia_categories from '../api/categories';
// Importando Link para conectar nuestra aplicación
import {useHistory} from 'react-router-dom';
// Importando context
import {AppContext} from '../context/AppContext';
// Importando componente Error
import Error from './Error';

import "./styles/Form.css";


function Form({requestAPI}) {
    // Destructurando los elementos del elemento AppContext con useContext
    const {addInfoGame}=useContext(AppContext);

    // useState para manejar el error
    const [error, setError]=useState(false);

    // Haciendo referencia a nuestro formulario con useRef
    const form=useRef(null);

    // Instanciando history
    const history=useHistory();

    // Función proceder a jugar
    const handleSubmit=()=>{
        // Capturando la información del formulario utilizando FormData
        const formData=new FormData(form.current);
        const getUsername=formData.get('username');
        const getCategory=formData.get('category');
        const getDificult=formData.get('dificult');


        // Destructurando los datos para luego validar que no estes vacios
        //const {username, category, dificult}=dataGame;

        if(!getUsername || !getCategory || !getDificult){
            setError(true);
            return;
        }else{
            setError(false);
            // Función para agregar la información
            addInfoGame(getUsername, getCategory, getDificult);

            requestAPI(getCategory, getDificult)

            setTimeout(() => {
                // Enviamos al usuario a la siguiente página
                history.push('/questions');
            }, 2000);
        }
    }

    return (
        <div className="container">
            <form ref={form} className="mt-5">
                <div className="row flex-column align-items-center text-center">

                    {
                        error ? <Error>All fields are required</Error> : null
                    }

                    <div className="form-group col-md-4 mt-2">
                        <label htmlFor="username">Username</label>
                        <br /><br />
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username"/>
                    </div>

                    <div className="form-group col-md-4 mt-2">
                        <label htmlFor="category">Category</label>
                        <br /><br />
                        <select className="form-control" id="category" name="category" >
                            {
                                trivia_categories.map(category=>(
                                    <option key={category.name} className="text-dark" value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-4 mt-2">
                        <label htmlFor="dificult">Dificult</label>
                        <br /><br />
                        <select className="form-control" id="dificult" name="dificult">
                            <option className="text-dark" value="easy">Easy</option>
                            <option className="text-dark" value="medium">Medium</option>
                            <option className="text-dark" value="hard">Hard</option>
                        </select>
                    </div>
                    
                    <button type="button" className="btn col-4 col-md-2 mt-4" onClick={handleSubmit}>Next</button>
                </div>
            </form>
        </div>
    )
}

export default Form

