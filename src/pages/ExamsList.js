import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';
import axios from 'axios';

import { ShadowContainer, Li} from '../styles/TeacherListStyle'

export default function ExamsList(){
    const id = useParams();
    const [exams, setExams] = useState([]);
    const history = useHistory();
    const [semester, setSemester] = useState([]);

    function goBack(){
        history.push("/list-by-teacher")
    }

    useEffect(()=>{
        axios.get(`https://repoprovasapi.herokuapp.com/api/get-exams/${id.id}`)
        .then(response=>{
            setExams(response.data);
            let semesters = response.data.map(r => r.type);
            setSemester(semesters);
        })
        .catch(error=>{
            alert("Houve um erro inesperado ao tentar acessar este arquivo, por favor recarregue a página");
        })
    },[])

    function openLink(exam){
        window.open(exam.link,'_blank');
    }

    return(
        <ShadowContainer>
            <div className="Topo">
               <h1>Listagem de provas</h1>
                <RiArrowGoBackLine onClick={goBack}/> 
            </div>
            
            <ul className="Op">
                { semester.map(s=>
                    <ul className="Op" key={s.id}>
                      <h1>{s}</h1>  
                      {exams.length === 0 ? ""
                        : exams.map(l=>
                        l.type === s ? 
                        <Li key={l.id} onClick={()=>openLink(l)}>
                            <p>{l.name}</p>
                            <p>{l.subject}</p>
                        </Li> : ""
                        )}
                    </ul>
                    
                )}
            </ul>
        </ShadowContainer>
    );
}