import React, { useState, useContext, useEffect } from 'react';
// Importando History
import {useHistory} from 'react-router-dom';
// Importando AppContext
import { AppContext } from '../context/AppContext';
// Importando componente Timer
import Timer from './Timer';
// Importando estilos
import './styles/Question.css';

function Question(props) {
    const {currQues, setCurreQues, options, questions, correct}=props;

    // Destructurando AppContext
    const {state:{ scoreUser },updateScore, deleteInfoGame}=useContext(AppContext);

    const [selected, setSelected]=useState();

    const history=useHistory();

    // Funcion para agregar comparar respuestas y dar estilos a la opción
    const handleSelect=(option)=>{
        if(selected===option && selected===correct){
            return "select";
        }else if(selected===option && selected!==correct){
            return "wrong";
        }else if(option===correct){
            return "select";
        }
    }

    const handleCheck=(option)=>{
        setSelected(option);
        if(option===correct && currQues<9){
            updateScore(scoreUser);
            setTimeout(() => { 
                setCurreQues(currQues+1);
                setSelected();
            }, 3000);
        }else if(option !== correct && currQues<9){
            setTimeout(() => { 
                setCurreQues(currQues+1);
                setSelected();
            }, 3000);
        }

        if(currQues >= 9){
            if(option===correct){
                //setElegida(true);
                updateScore(scoreUser);
            }
            setTimeout(() => {
                history.push("/result")
            }, 3000);
        }
    }

    
    useEffect(() => {
          setTimeout(() => {
            history.push("/");
          }, 300000);
    })   

    const handleQuit=()=>{
        deleteInfoGame();
        history.push("/");
    }

    return (
      <div className="container text-center questions">
        <h1>
          Question Number <span>{currQues + 1}</span>
        </h1>
        <Timer startCount={300}/>
        <div className="question mb-4 mb-md-0">
          <h3>{questions[currQues].question}</h3>
          <div className="optionsQuestion mb-3 mb-md-0">
            {
              // Iterando sobre las opciones
              options &&
                options.map((option) => (
                  <button
                    onClick={() => handleCheck(option)}
                    className={`mx-0 mx-md-2 mt-2 singleOption ${
                      selected && handleSelect(option)
                    }`}
                    key={option}
                    disabled={selected}
                  >
                    {option}
                  </button>
                ))
            }
          </div>

          <div className="buttonsSettings mb-3 mb-md-0 ">
            <button
              className="button"
              onClick={handleQuit}
            >
              Exit
            </button>

          </div>
        </div>
      </div>
    );
}

export default Question
