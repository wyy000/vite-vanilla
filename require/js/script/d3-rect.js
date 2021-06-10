require(['common'], function () {
  require(['jquery', 'api', '../lib/d3-6.6.0'], function ($, $http, d3) {

    const $dom = $('#d3Container')
    const width = $dom.width()
    const height = $dom.height() ? $dom.height() : 500
    const PADDING = {top: 20, right: 20, bottom: 40, left: 40}

    const Y_INTERVAL = 5
    const RECT_WIDTH = 50
    const FONT_SIZE = 13

    const yScale = d3.scaleLinear().range([0, height - PADDING.top - PADDING.bottom])

    let tooltip

    $('#search').on('click', function () {
      $dom.empty()
      createRect()
    })

    createRect()

    function bindTip (sel) {
      console.log(sel)
      sel
        .on('mouseover', (e, d) => tooltip.text(d.count).style('visibility', 'visible'))
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 10}px`).style('left', `${e.pageX + 10}px`))
        .on('mouseout', () => tooltip.style('visibility', 'hidden'))
    }

    function createTip () {
      tooltip = d3.select('#d3Container')
        .append('div')
        .classed('tooltip', true)
        .text('tip')
    }

    function createRect () {
      createTip()
      d3.json('/d3-data', function (error) {
        if (error) alert('Error!')
      }).then(function (res) {
        const dataset = res.data
        const maxHeight = d3.max(dataset, d => d.count)

        yScale.domain([0, Math.floor(maxHeight / (Y_INTERVAL - 0.6)) * Y_INTERVAL])

        const yArr = Array.from({length: Y_INTERVAL + 1}).map((it, i) => [
          (height - PADDING.top - PADDING.bottom) / Y_INTERVAL * (Y_INTERVAL - i) + PADDING.top,
          Math.ceil(maxHeight / (Y_INTERVAL - 0.6) / 10) * 10 * (i),
        ])

        const svg = d3.select('#d3Container')
          .append('svg')
          .attr('width', width)
          .attr('height', height)

        drawBaseline(svg, yArr)
        drawRectItem(svg, dataset, {yScale})
        drawRectBottom(svg, dataset, {yScale, maxHeight})
      })
    }

    function drawBaseline (c, data) {
      c
        .selectAll('g.group_y')
        .data(data)
        .enter()
        .append('g')
        .call(sel => {
          sel
            .attr('transform', d => `translate(0, ${d[0]})`)
            .classed('group_y', true)
            .append('line')
            .attr('x1', PADDING.left).attr('x2', width - PADDING.left).attr('y1', 0).attr('y2', 0)
            .attr('stroke', '#eee').attr('stroke-width', '1px')

          sel
            .append('text')
            .text(d => d[1])
            .attr('dy', 6).attr('font-size', FONT_SIZE).attr('text-anchor', 'start').attr('fill', 'black')
        })
    }

    function drawRectItem (svg, dataset, {padding = PADDING, yScale}) {
      const sectionWidth = (width - padding.left - padding.right) / dataset.length

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
            .call(bindTip)
            .attr('y', height).attr('width', RECT_WIDTH)
            .transition().duration(400)
            .attr('y', d => height - yScale(d.count))
            .attr('height', d => yScale(d.count)).attr('fill', '#688ff4')

          sel
            .append('rect')
            .attr('width', RECT_WIDTH)
            .attr('y', (d, i) => height - yScale(dataset[i].count))
            .transition().delay(300).duration(300)
            .attr('y', (d, i) => i === 0 ? 0 : height - yScale(dataset[i - 1].count))
            .attr('height', (d, i) => i === 0 ? 0 : yScale(dataset[i - 1].count) - yScale(d.count)).attr('fill', '#e4f2ff')

          sel
            .append('text')
            .attr('y', height + padding.bottom / 2).attr('font-size', FONT_SIZE).attr('fill', '#555')
            .text((d, i) => `${i + 1}. ${d.title}`)
        })
    }

    function drawRectBottom (svg, dataset, {padding = PADDING, yScale, maxHeight}) {
      const sectionWidth = (width - padding.left - padding.right) / dataset.length

      svg
        .selectAll('g.transition_group')
        .data(dataset.map(it => it).splice(0, dataset.length - 1))
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${sectionWidth * (i + 1) - 10}, ${height - padding.bottom - yScale(maxHeight) / 2 - 20})`)
        .call(d => {
          d
            .append('path')
            .attr('opacity', 0)
            .attr('fill', 'rgb(216 225 234)')
            .attr('d', 'M1 37V5C1 2.79086 2.79086 1 5 1H65.3431C66.404 1 67.4214 1.42143 68.1716 2.17157L84.1716 18.1716C85.7337 19.7337 85.7337 22.2663 84.1716 23.8284L68.1716 39.8284C67.4214 40.5786 66.404 41 65.3431 41H5C2.79086 41 1 39.2091 1 37Z')
            .transition().delay(500).duration(300)
            .attr('opacity', 1)

          d
            .append('text').classed('conversion_text', true)
            .attr('dy', 26).attr('dx', 8).attr('fill', '#555').attr('font-weight', 'bold')
            .text((d, i) => `${(dataset[i + 1].count / d.count * 100).toFixed(2)}%`)
            .attr('opacity', 0)
            .transition().delay(400).duration(300)
            .attr('opacity', 1)
        })
    }

    /****************************************/
    createLineView()

    function createLineView () {
      $.ajax({
        url: '/d3-data',
        success: res => {
          res.forEach(it => {
            $('#lineContainer').html($('#lineItem')[0].innerText)
          })
        }
      })
    }
  })
})
