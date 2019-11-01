import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3'

const formatNum = num => {
    let numTemp = num.toString()
    numTemp = numTemp.split('').reverse()
    numTemp = numTemp.map((n,i)=> i > 0 && i % 3 === 0 ? `,${n}`: n)
    numTemp = numTemp.join('').split('').reverse().join('')
    return numTemp
}

const renderBarChart = dataset => {
    
    const svg = select('svg')
        .attr('width',900)
        .attr('height',800)
    
    const width = Number(svg.attr('width'))
    const height = Number(svg.attr('height'))
    const margin = {top:50, rigth:10, bottom: 50, left: 80}
    const innerWidth = width - margin.left - margin.rigth
    const innerHeight = height - margin.top - margin.bottom

    const xScale = scaleLinear()
        .domain([0,max(dataset,d => d.population)])
        .range([0,innerWidth])

    const yScale = scaleBand()
        .domain(dataset.map(d => d.year))
        .range([0,innerHeight])
        .padding(0.1)

    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`)

    g.append('g').call(axisLeft(yScale).tickSize(-innerWidth))
        .selectAll('.tick line')
        .remove()

    g.append('g').call(axisBottom(xScale).ticks(10,'s').tickSize(-innerHeight))
        .attr('transform',`translate(0,${innerHeight})`)
        .selectAll('.tick line')
        .attr('stroke','grey')

    g.append('text')
        .text('Población de Venezuela desde 1960.')
        .attr('y',-10)
        .attr('x',0)
        .attr('fill','#8E8883')
        .style('font-size','2em')

    g.append('text')
        .text('Población')
        .attr('y',innerHeight+40)
        .attr('x',innerWidth/2)
        .attr('fill','#8E8883')
        .style('font-size','2em')

    g.append('text')
        .text('Año')
        .attr('y',-30)
        .attr('x',-innerHeight/2)
        .attr('fill','#8E8883')
        .style('font-size','2em')
        .attr('transform',`rotate(-90)`)
        

    const bars = g.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('y',d => yScale(d.year))
        .attr('height',yScale.bandwidth())
        .attr('width',d => xScale(d.population))
        .attr('fill','steelblue')
        .on('mouseover',function(d,i){
            select(this).attr('fill','#BD2D28')
        })
        .on('mouseout',function(d,i){
            select(this).attr('fill','steelblue')
        })
        .on('click',function(d,i){
            alert(`La población de Venezuela en ${d.year} fue de ${formatNum(d.population)} habitantes.`)
        })

        
        
}

export const requestData = async () => {
    try {
        let data = await csv('/world_population.csv')
        data.forEach((country)=>{
            if(country['Country Code'] === 'VEN'){
                let countryKeys = Object.keys(country)
                let dataset = []
                for (let countryKey of countryKeys){
                    if(!isNaN(Number(country[countryKey]))){
                        dataset.push({year: countryKey, population: Number(country[countryKey])})
                    }
                }
                
                dataset.pop()
                renderBarChart(dataset)
            }
        })
    } catch (error) {
        console.log(error)
    }
}