require(['common'], function () {
  require(['jquery'],function($) {
    require(['echarts'], function (echarts) {
      // 基于准备好的dom，初始化echarts实例
      const chart = $('#chart_main')
      chart
        .css('width', '600px')
        .css('height', '400px')

      const myChart = echarts.init(chart[0]);

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }],
        animationDuration: function () {
          // 越往后的数据时长越大
          return 100
        }
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })
  })
})
