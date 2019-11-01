import {select,arc} from 'd3'

const face = () => {
    const spacing = 50
    const eyesHeight = -30
    const eyesRadius = 15
    const browWidth = 50
    const browHeight = 10
    const browXoffset = 25
    const browYoffset = -30
    const svg = select('svg')
    svg.selectAll('circle').remove()
    svg.selectAll('g').remove()
    svg.attr('width',360)
        .attr('height',400)
        .style('background-color','white')
    const width = parseFloat(svg.attr('width'))
    const height = parseFloat(svg.attr('height'))
    const circle = svg.append('circle')
    circle.attr('r',100)
        .attr('cx',width/2)
        .attr('cy',height/2)
        .attr('fill','yellow')
        .attr('stroke','black')
    const eyesGroup = svg.append('g')
    eyesGroup.attr('transform',`translate(${circle.attr('cx')},${parseFloat(circle.attr('cy'))+eyesHeight})`)
    const leftEye = eyesGroup.append('circle')
    const rightEye = eyesGroup.append('circle')
    
    leftEye.attr('r',eyesRadius)
        .attr('cx',-spacing)
    rightEye.attr('r',eyesRadius)
        .attr('cx',spacing)
    const mouth = eyesGroup.append('path')
    mouth.attr('d',arc()({
        innerRadius: 40,
        outerRadius: 50,
        startAngle: Math.PI/2,
        endAngle: Math.PI * 1.5
    }))
        .attr('transform',`translate(0,50)`)

    const leftBrow = eyesGroup.append('rect')
    const rightBrow = eyesGroup.append('rect')

    leftBrow.attr('width',browWidth)
        .attr('height',browHeight)
        .attr('x',spacing -browXoffset)
        .attr('y',browYoffset)
    
    rightBrow.attr('width',browWidth)
        .attr('height',browHeight)
        .attr('x',-spacing - browXoffset)
        .attr('y',browYoffset)

    setInterval(()=>{
        eyesGroup.transition('eyesup')
        .duration(1000)
        .selectAll('rect')
        .attr('y',browYoffset-30)
        .delay(1000)
        .transition('eyesdown')
        .duration(1000)
        .attr('y',browYoffset)
    },2100)

    eyesGroup.transition('eyesup')
        .duration(1000)
        .selectAll('rect')
        .attr('y',browYoffset-30)
        .delay(1000)
        .transition('eyesdown')
        .duration(1000)
        .attr('y',browYoffset)
}

export default face