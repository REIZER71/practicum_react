import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";

const Table = (props) => {
  const totalPages = Math.ceil(props.data.length / props.amountRows);
  const [activePage, setActivePage] = useState(totalPages);

  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  };

  let pages;
  if (props.isPagenated) {
    const n = Math.ceil(props.data.length / props.amountRows);
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    pages = arr.map((item, index) =>  
      <span key={index} className={(index == parseFloat(activePage) - 1) ? "active" : ""} onClick={changeActive}> {item} </span>
    );
  } else {
    pages = "";
  }

  return (
    <>
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody body={props.data} amountRows={props.isPagenated ? props.amountRows : props.data.length} numPage={props.isPagenated ? activePage : 1} />
      </table>

      <div>
        {pages}
      </div>
    </>
  );
};

export default Table;
