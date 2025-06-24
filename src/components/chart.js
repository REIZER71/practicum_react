import { useState } from "react";
import * as d3 from "d3";
import ChartDraw from './ChartDraw.js';

  const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false])
  const [type, setType] = useState("dot");
  const [oyError, setOyError] = useState(false);

  const handleSubmit = (event) => {        
        event.preventDefault();
        setOx(event.target["ox"].value);
        const OyArr = [
            event.target["oy"][0].checked,
            event.target["oy"][1].checked
        ]; 
	    

        if (!OyArr[0] && !OyArr[1]) {
            setOyError(true);
            return; // не продолжаем
        }
        setOyError(false);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);		
        setType(event.target["type"].value);
	}
  const createArrGraph =(data, key)=>{   
          const groupObj = d3.group(data, d => d[key]);
          let arrGraph =[];
          for(let entry of groupObj) {
              let minMax = d3.extent(entry[1].map(d => d['Высота']));
              arrGraph.push({labelX: entry[0], values: minMax});
          }
          if (key === "Год") {
            arrGraph.sort((a, b) => parseInt(a.labelX) - parseInt(b.labelX));
            }
          return arrGraph;
      }
   return (
    <>
       <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p> Значение по оси OX: </p>
		<div>
        <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" }/>
        Страна
		  <br/>		
          <input type="radio" name="ox" value="Год" />
		  Год
		</div>

        <p> Значение по оси OY </p>
		<div>
          <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />
		  Минимальная высота <br/>
          <input  type="checkbox" name="oy" />
          Максимальная высота
		</div>
        {oyError && <span style={{ color: "red" }}>Выберите хотя бы одно значение по OY!</span>}
        <p>
            <select name="type" defaultValue="dot">
                <option value="dot">Точечная диаграмма</option>
                <option value="block">Гистограмма</option>
            </select>
        </p>
        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>
     <ChartDraw data={ createArrGraph(props.data, ox) } oy={oy} type={type} />
	</>
    )
}

export default Chart;