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

    const tooltip = d3.select('#d3Container')
      .append('div')
      .classed('tooltip', true)
      .text('tip')

    $('#search').on('click', function () {
      $dom.empty()
      createCurves()
    })

    function createCurves () {
      d3.json('/d3-curves-data', function (error) {
        if (error) alert('Error!')
      }).then(function (res) {
        const dataset = res.data
        const maxHeight = d3.max(dataset, d => d.count)
        const minHeight = d3.min(dataset, d => d.count)
        const sectionWidth = (width - padding.left - padding.right) / dataset.length
        const lineHeight = Math.floor(maxHeight / (Y_INTERVAL - 0.6))

        xScale.domain(dataset)
        yScale.domain([0, lineHeight * Y_INTERVAL])

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
              .attr('x1', padding.left).attr('x2', width - padding.right).attr('y1', 0).attr('y2', 0)
              .attr('stroke', '#eee').attr('stroke-width', '1')

            sel
              .append('text')
              .text((d, i) => String((parseInt(Math.ceil(maxHeight / 25) * 25 / 5)) * i).substr(0, 4) + '%')
              .attr('dy', 6).attr('font-size', FONT_SIZE).attr('text-anchor', 'start').attr('fill', 'black')
          })

        const line = d3
          .line()
          .x((d, i) => padding.left + (width - padding.left - padding.right) / dataset.length * (i + 0.5))
          .y((d, i) => yScale(d.count))
          .curve(d3.curveCatmullRom)
        // .curve(d3.curveNatural)
        // .curve(d3.curveBasis)

        svg
          .append('path')
          .attr('d', line(dataset))
          .attr('stroke', '#688ff4')
          .attr('stroke-width', '2')
          .attr('fill', 'none')
          .attr('class', 'svg_line')

        svg
          .selectAll('g.item_group')
          .data(dataset)
          .enter()
          .append('g')
          .attr('transform', (d, i) => `translate(${padding.left + sectionWidth * (i + 0.5)})`)
          .call(g => {
            g.append('circle')
              .attr('cy', (d, i) => yScale(d.count))
              .attr('r', 4).attr('stroke-width', '2').attr('fill', '#fff').attr('stroke', '#688ff4')

            g.append('text')
              .text((d, i) => `${i + 1}. ${d.title}`)
              .attr('dy', height - padding.bottom / 2).attr('dx', -30)
          })

      })
    }
  })
})
