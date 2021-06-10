require(['common'], function () {
  require(['jquery', 'api', '../lib/knockout-min', 'echarts', 'jquery-ui', '../lib/gridstack'], function ($, $http, ko, echarts) {

    let chartsStack = []
    let chartsData = []

    ko.components.register('dashboard-grid', {
      viewModel: {
        createViewModel: function (controller, componentInfo) {
          var ViewModel = function (controller, componentInfo) {
            var grid = null

            this.widgets = controller.widgets

            this.afterAddWidget = function (items) {
              if (grid == null) {
                grid = $(componentInfo.element).find('.grid-stack').gridstack({
                  auto: false,
                  onchange: () => {
                    chartsStack.map(it => it.resize())
                  },
                }).data('gridstack')
              }

              var item = _.find(items, function (i) { return i.nodeType == 1 })

              grid.add_widget(item)
              ko.utils.domNodeDisposal.addDisposeCallback(item, function () {
                grid.remove_widget(item)
              })
            }
          }

          return new ViewModel(controller, componentInfo)
        }
      },
      template: { element: 'gridstack-template' }
    })

    var Controller = function (widgets) {
      var self = this

      this.widgets = ko.observableArray(widgets)

      this.add_new_widget = function () {
        this.widgets.push({
          x: chartsData.length % 2 ? 0 : 6,
          y: parseFloat(chartsData.length / 2) * 6,
          width: 6,
          height: 6,
          auto_position: true,
          onchange: () => console.log(123),
        })
      }

      this.delete_widget = function (item) {
        self.widgets.remove(item)
      }

      this.refresh_widget = function (item) {
        console.log(item)
      }
    }

    function getData () {
      $http.dragData({
        success: function ({data}) {
          chartsData = data.charts
          var controller = new Controller(data.charts.map(it => ({id: it.id, ...it.position})))
          ko.applyBindings(controller)

          setTimeout(function () {
            initView()
          })
        },
        error: function (e) { console.log(e) },
      })
    }

    function initView () {
      chartsData.forEach((it, idx)=> {
        const $el = $('#' + it.id)
        $el.find('.title').text(it.options.title)

        initChart($el.find('.draw'), it.id, {data: it.data, type: it.type})

        window.onresize = function() {
          chartsStack.map(it => it.resize())
        }
      })
    }

    function initChart ($el, id, options) {
      const myChart = echarts.init($el[0])
      let option = {}

      switch (options.type) {
        case 'pie':
          option = OPTION.pie({
            data: options.data.map(it => ({value: it.count, name: it.title}))
          })
          break
        case 'line':
          option = OPTION.line({
            data: options.data.map(it => it.count),
            name: options.data.map(it => it.title),
          })
          break
        case 'bar':
          option = OPTION.bar({
            data: options.data.map(it => it.count),
            name: options.data.map(it => it.title),
          })
          break
      }

      myChart.setOption(option)
      chartsStack.push(myChart)
    }

    getData()

    var OPTION = {
      bar: option => ({
        xAxis: {
          type: 'category',
          data: option.name ?? [],
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: option.data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
        }],
      }),
      pie: option => ({
        title: {
          text: '登录状态统计',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
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
            data: option.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          }
        ],
      }),
      line: option => ({
        xAxis: {
          type: 'category',
          data: option.name ?? [],
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: option.data,
          type: 'line',
          smooth: true
        }]
      }),
    }
  })
})
