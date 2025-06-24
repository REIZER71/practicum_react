import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './TempFilter.js';
import { useState } from "react";
/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объе ктов
*/

const Table = (props) => {
  //количество страниц разбиения таблицы
    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);
    
    const updateDataTable = (data) => {
      setDataTable(data);
      const totalPages = Math.ceil(data.length / props.amountRows);
      setActivePage(String(totalPages)); 
    };


    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };
    let pages;
    if(props.isPagenated){
       const n = Math.ceil(dataTable.length / props.amountRows); 
    
    // массив с номерами страниц
        const arr = Array.from({ length: n }, (v, i) => i + 1);
    
     //формируем совокупность span с номерами страниц
        pages = arr.map((item, index) =>  
          <span key={ index } class={(index == parseFloat(activePage) - 1) ? "active" : ""} onClick={ changeActive }> { item } </span>
        );
    }
    else{
        pages = "";
    }

    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
	   
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={ (props.isPagenated) ? props.amountRows : props.data.length} numPage ={(props.isPagenated) ?  activePage :  1} />
        </table>

      <div>
          {pages}
        </div>
    </>   
    )   
}

export default Table;