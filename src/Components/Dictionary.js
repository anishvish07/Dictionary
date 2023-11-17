import React, { useState , useEffect } from 'react';
import './Dictionary.css';
import {GiBurningDot } from 'react-icons/gi'
import 'animate.css';
import { Link ,BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import {FaPlay } from 'react-icons/fa6'
const Dictionary = (props) => {
    const {dict ,data} = props;
    const [synthesis , setSynthesis] = useState(null);
    useEffect(()=>{
        const synth = window.speechSynthesis;
        if(synth){
            setSynthesis(synth);
        }
    },[]);
    const speak = (text) =>{
        if(synthesis && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            synthesis.speak(utterance);
        }
    };
    const speakCancel = () =>{
        if(synthesis){
            synthesis.cancel();
            
        }
    }

    if (!data || !data[0] || !data[0].meanings || !data[0].meanings[0] || !data[0].meanings[0].definitions) {
  
    return (
      <div>
        <div className='search-bar'>
          <input type='search' name='search' id='searchInput' className='search side input' placeholder='Type Word' />
          <button className='btn another-side' onClick={props.dict}> search </button>
        </div>
        
      <div class="containeres">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
        </div>
      
    );
  }
    return (
        <div>
                <div className='search-bar'>
                <input type='search' name='search' id='searchInput' className='search side input' placeholder='Type Word'/>
                <button className='btn another-side' onClick={props.dict} > search </button>
                </div>
                <div className="card body-design">
                <div className="card-body">
                <div className="card-title">
                <h3> Keywords :- </h3> 
             <button className="speak" onDoubleClick={speakCancel} onClick={() => {
              data[0].meanings[0].definitions.forEach((def) => {
                speak(def.definition);
              });
            }}><h2><FaPlay /></h2></button>
                <div className="card-text" >
               { data[0].meanings.slice(0,5).map((meaning , index) => (
                
                <div key={index}>
                <h4 className='Title animate__animated animate__slideInLeft'>{meaning.partOfSpeech} :- </h4>
                <div  className='boundary'>
                <p className="m-2">Meaning:</p>
                {meaning.definitions.slice(0,5).map((definition , idx)=> (
                  
                    <div key={idx}>
                     <h5 className='def animate__animated animate__slideInLeft'> <GiBurningDot /> {definition.definition}
                     </h5>
                   
                    {
                        ( meaning.synonyms.length > 0) && idx===0 && (<p className='def fs-5 text-info'>Synonyms : {meaning.synonyms.join(', ')}</p>)
                    }

                  { (meaning.partOfSpeech === "interjection") && (

                     <div>  
                          <p>Examples : {definition.example}
                          
                          </p>
                     </div>
                  )

}

  
                    </div>
                ))}
               {
                        ( meaning.antonyms.length > 0) && (<p className='def text-warning fs-5'>Antonyms : {meaning.antonyms.join(', ')}</p>)
                    }</div>
                </div>

               ))}
               <div className='boundry m-2 Title'>
              <p> SourceUrl :- {data[0].sourceUrls ? <Link to={data[0].sourceUrls}>{data[0].sourceUrls}</Link>:" "}</p>
              </div>
                </div>
                </div>
                </div>
                </div>
        </div>
    );
}

export default Dictionary;
