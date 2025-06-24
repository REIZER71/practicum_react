import './CSS/App.css';
import buildings from './data.js';

import Table from './components/Table.js';
import Chart from './components/chart.js';
import Filter from './components/TempFilter.js'; // переиспользуем

import { useState } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>

      {/* Одна форма фильтрации — выше графика и таблицы */}
      <h4>Фильтры</h4>
      

      <Chart data={filteredData} />
      <Filter filtering={setFilteredData} fullData={buildings} data={filteredData} />
      <Table data={filteredData} amountRows={10} isPagenated={true} />
    
    </div>
  );
}

export default App;
