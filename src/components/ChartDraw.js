import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);  

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    }); 
	// задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};
		
	// вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

	useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник, 		
		svg
		.append("rect")
		.attr("x", margin.left)
		.attr("y", margin.top)
		.attr("width",  boundsWidth)
		.attr("height",  boundsWidth)
		.style("fill", "lightgrey");
	});
      
    const indexOY = 1; // диаграмма для максимальных значений
	let [min, max] = d3.extent(props.data.map(d => d.values[1]));
		
	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
  const minVal = Math.min(min * 0.85, 300); 
    const scaleY = useMemo(() => {
        
        const maxVal = max * 1.1;
        return d3
            .scaleLinear()
            .domain([minVal, maxVal])
            .range([boundsHeight, 0]);
    }, [boundsHeight, min, max]);

    	
	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        

        const attr_area = {
            width: width,
            height: height,
            marginX: margin.left,
            marginY: margin.top
        };
        //рисуем график
         const r = 5;
    if (props.type === "dot") {
        if (props.oy[1]) { // Максимальная (index 1)
          svg.selectAll(".dot-max")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", "red");
        }

        if (props.oy[0]) { // Минимальная (index 0)
          svg.selectAll(".dot-min")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[0])+4)
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", "blue");
        }
    }
    else if  (props.type === "block") {
        const barWidth = scaleX.bandwidth() * 0.3; // Макс
        if (props.oy[1]) {
          svg.selectAll(".bar-max")
            .data(props.data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() * 0.35)
            .attr("y", d => Math.min(scaleY(d.values[1]), scaleY(0))) 
            .attr("width", barWidth)
            .attr("height", d => scaleY(minVal) - scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "red");
        }

        if (props.oy[0]) {
          svg.selectAll(".bar-min")
            .data(props.data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("y", d => Math.min(scaleY(d.values[0]), scaleY(0)))
            .attr("width", barWidth)
            .attr("height", d => scaleY(minVal) - scaleY(d.values[0]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
        }
    }

}, [scaleX, scaleY, props.data, props.oy]);

    return (
      <svg ref={ chartRef }>  </svg>
	)
}

export default ChartDraw;
