require(['common'], function () {
  require(['jquery', 'api', '../lib/d3-6.6.0'], function ($, $http, d3) {

    const $dom = $('#d3Container')
    const padding = {top: 20, right: 20, bottom: 40, left: 40}
    const width = $dom.width()
    const height = $dom.height() ? $dom.height() : 500
    const Y_INTERVAL = 5
    const FONT_SIZE = 13

    const xScale = d3.scaleBand().range([0, width - padding.left - padding.right])
    const yScale = d3.scaleLinear().range([0, height - padding.top - padding.bottom])

    const tooltip = d3.select("#d3Container")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .text("a simple tooltip")

    d3.json('/d3-data', function (error) {
      if (error) alert('Error!')
    }).then(function (res) {
      const dataset = res.data
      const maxHeight = d3.max(dataset, d => d.count)
      const sectionWidth = (width - padding.left - padding.right) / dataset.length
      const lineHeight = Math.floor(maxHeight / (Y_INTERVAL - 0.6))
      const RECT_WIDTH = 50

      console.log(dataset)

      xScale.domain(dataset.map(d => d.title))
      yScale.domain([0, lineHeight * Y_INTERVAL])
      const xAxis = d3.axisTop(xScale)
      const yAxis = d3.axisLeft(yScale)

      const svg = d3.select('#d3Container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      svg
        .selectAll('g.group_y')
        .data(Array.from({length: Y_INTERVAL + 1}))
        .enter()
        .append('g')
        .call(sel => {
          sel
            .attr('transform', (d, i) => `translate(0, ${(height - padding.top - padding.bottom) / Y_INTERVAL * (Y_INTERVAL - i) + padding.top})`)
            .classed('group_y', true)
            .append('line')
            .attr('x1', (d, i) => padding.left).attr('x2', (d, i) => width - padding.left - padding.right).attr('y1', 0).attr('y2', 0)
            .attr('stroke', '#eee').attr('stroke-width', '1px')

          sel
            .append('text')
            .text((d, i) => lineHeight * i)
            .attr('dy', 6).attr('font-size', FONT_SIZE).attr('text-anchor', 'start').attr('fill', 'black')
        })

      svg
        .selectAll('g.item_group')
        .data(dataset)
        .enter()
        .append('g')
        .call(sel => {
          sel
            .classed('item_group', true)
            .attr('transform', (d, i) => `translate(${padding.left + (sectionWidth - 60) / 2 + sectionWidth * i}, ${-padding.bottom})`)
            .append('rect')
            .attr('y', d => height - yScale(d.count))
            .attr('width', RECT_WIDTH).attr('height', d => yScale(d.count)).attr('fill', '#688ff4')
            .on("mouseover", function(e, d){tooltip.text(d.count); return tooltip.style("visibility", "visible")})
            .on("mousemove", function(d){return tooltip.style("top", (d.pageY-10)+"px").style("left",(d.pageX+10)+"px")})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden")})

          sel
            .append('rect')
            .attr('y', (d, i) => i === 0 ? 0 : height - yScale(dataset[i - 1].count))
            .attr('width', RECT_WIDTH).attr('height', (d, i) => i === 0 ? 0 : yScale(dataset[i - 1].count) - yScale(d.count)).attr('fill', '#e4f2ff')

          sel
            .append('text')
            .attr('y', height + padding.bottom / 2).attr('font-size', FONT_SIZE).attr('fill', '#555')
            .text((d, i) => `${i + 1}. ${d.title}`)
        })

      const SIGN_WIDTH = 80
      const SIGN_HEIGHT = 40

      svg
        .selectAll('g.transition_group')
        .data(dataset.map(it => it).splice(0, dataset.length - 1))
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${sectionWidth * (i + 1)}, ${height - padding.bottom - yScale(maxHeight) / 2 - 20})`)
        .call(d => {
          d
            .append('path')
            .attr('d', `M0, 0 h${SIGN_WIDTH / 4 * 3} l${SIGN_WIDTH / 4}, ${SIGN_HEIGHT / 2} l-${SIGN_WIDTH / 4}, ${SIGN_HEIGHT / 2} h-${SIGN_WIDTH / 4 * 3}`).attr('fill', '#ccc')

          d
            .append('text').classed('conversion_text', true)
            .attr('dy', 26).attr('dx', 5).attr('fill', '#555').attr('font-weight', 'bold')
            .text((d, i) => `${(dataset[i + 1].count / d.count * 100).toFixed(2)}%`)
        })

    })
  })
})
