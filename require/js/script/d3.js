require(['common'], function () {
  require(['jquery', 'api', '../lib/d3-6.6.0'], function ($, $http, d3) {

    const $dom = $('#d3Container')
    const width = $dom.width()
    const height = $dom.height() ? $dom.height() : 500
    const padding = {top: 0, right: 0, bottom: 40, left: 40}

    const xScale = d3.scaleBand().range([0, width - padding.left])
    const yScale = d3.scaleLinear().range([0, height - 100])
    const hScale = d3.scaleLinear().range([0, height - padding.bottom])

    d3.json('/d3-data', function (error) {
      if (error) alert('Error!')
    }).then(function (res) {
      const dataset = res.data
      const maxHeight = d3.max(dataset, d => d.count)
      const sectionWidth = (width - padding.left) / dataset.length
      const RECT_WIDTH = 50

      xScale.domain(dataset.map(d => d.title))
      yScale.domain([0, maxHeight])
      const xAxis = d3.axisTop(xScale)
      const yAxis = d3.axisLeft(hScale)

      const svg = d3.select('#d3Container')
        .append('svg')
        .attr('width', width)
        .attr('height', height + 40)

      svg
        .selectAll('line')
        .data([...dataset, {}])
        .enter()
        .append("line")
        .attr('x1', (d, i) => padding.left)
        .attr('x2', (d, i) => width - padding.left)
        .attr('y1', (d, i) => yScale(i * (maxHeight / 4)))
        .attr('y2', (d, i) => yScale(i * (maxHeight / 4)))
        .attr("stroke", '#eee')
        .attr("stroke-width", "1px")

      svg
        .selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${padding.left + (sectionWidth - RECT_WIDTH) / 2 + sectionWidth * i})`)
        .append('rect')
        .attr('y', d => height - yScale(d.count))
        .attr('width', RECT_WIDTH).attr('height', d => yScale(d.count)).attr('fill', '#4cacff')

      svg
        .selectAll('g')
        .data(dataset)
        .append('rect')
        .attr('y', (d, i) => i === 0 ? 0 : height - yScale(dataset[i - 1].count))
        .attr('width', RECT_WIDTH).attr('height', (d, i) => i === 0 ? 0 : yScale(dataset[i - 1].count) - yScale(d.count)).attr('fill', '#e4f2ff')

      svg
        .selectAll('g')
        .data(dataset.map(it => it).splice(0, dataset.length - 1))
        .append('text')
        .attr("y", height - yScale(maxHeight) / 2).attr("x", (sectionWidth - RECT_WIDTH) / 2).attr('fill', 'green')
        .text((d, i) => `${(dataset[i + 1].count / d.count * 100).toFixed(2)}%`)

      svg
        .selectAll('g')
        .data(dataset)
        .append('text')
        .attr("y", height + padding.bottom / 2).attr("x", 0).attr('fill', 'green')
        // .attr('text-anchor', 'middle')
        .text((d, i) => `${i}. ${d.title}`)

    })
  })
})
