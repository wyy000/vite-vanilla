require(['common'], function () {
  require(['jquery'],function($) {
    require(['echarts'], function (echarts) {
      // 基于准备好的dom，初始化echarts实例
      const chart = $('#chart_main')
      const $child = $('<div id="child"></div>')
      const $parent = $('<div id="parent"></div>')

      chart.append($child, $parent)

      $child
        .css('width', '600px')
        .css('height', '400px')
      $parent
        .css('width', '600px')
        .css('height', '400px')

      const myChart1 = echarts.init($child[0])
      const option1 = {
        title: {
          text: '儿童自我状态',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 50, name: '自然型儿童'},
              {value: 50, name: '适应型儿童'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option1 && myChart1.setOption(option1)

      const myChart2 = echarts.init($parent[0])
      const option2 = {
        title: {
          text: '父母自我状态',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              {value: 50, name: '抚育型父母'},
              {value: 50, name: '挑剔型父母'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option2 && myChart2.setOption(option2)
    })
  })
})
