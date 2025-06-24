/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = ({filtering, fullData}) => {
    const handleSubmit= (event) => {        
        event.preventDefault();		

		// создаем словарь со значениями полей формы
		const filterField = {
			"Название": event.target["structure"].value.toLowerCase(),
		    "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [event.target["yearMin"].value, event.target["yearMax"].value],
            "Высота": [event.target["heightMin"].value, event.target["heightMax"].value]
	    };
			
        //фильтруем данные по значениям всех полей формы
        let arr = fullData;
        for(const key in filterField) {
            if (Array.isArray(filterField[key])) {
                // фильтруем по числовым значениям
                let [min, max] = filterField[key].map(val => val);
                min = min === "" ? -Infinity : parseFloat(min);
                max = max === "" ? Infinity : parseFloat(max);

                arr = arr.filter(item => 
                    parseFloat(item[key]) >= min &&
                    parseFloat(item[key]) <= max
                );
            } else {
                // фильтруем по строковому значению
                arr = arr.filter(item => 
                    item[key].toLowerCase().includes(filterField[key])
                );
            }
        }
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        filtering(arr);   
	}

    const handleReset = () => {
        filtering(fullData);
    };

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тип:</label>		
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна:</label>		
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город:</label>		
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год от:</label>
                <input name="yearMin" type="number" />
                
            </p>
            <p>
                <label>Год до:</label>
                <input name="yearMax" type="number" />
            </p>
            <p>
                <label>Высота от:</label>
                <input name="heightMin" type="number" />
            </p>
            <p>
                <label>Высота до:</label>
                <input name="heightMax" type="number" />
            </p>
            <p>         
                <button type="submit">Фильтровать</button>   
                <button type="reset" >Очистить фильтр</button>
            </p>
        </form> 
    )
}

export default Filter;