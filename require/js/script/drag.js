require(['common'], function () {
  require(['jquery', 'api', '../lib/knockout-min', 'echarts', 'jquery-ui', '../lib/gridstack'], function ($, $http, ko, echarts) {
    console.log(ko)

    let charts = {}
    let chartsData = []

    ko.components.register('dashboard-grid', {
      viewModel: {
        createViewModel: function (controller, componentInfo) {
          var ViewModel = function (controller, componentInfo) {
            var grid = null;

            this.widgets = controller.widgets;

            this.afterAddWidget = function (items) {
              if (grid == null) {
                grid = $(componentInfo.element).find('.grid-stack').gridstack({
                  auto: false,
                  onchange: () => {
                    const id = $(_.find(items, function (i) { return i.nodeType == 1 })).attr('id')
                    charts[id]()
                    console.log(charts[id]())
                  }
                }).data('gridstack');
              }


              var item = _.find(items, function (i) { return i.nodeType == 1 });

              grid.add_widget(item);
              ko.utils.domNodeDisposal.addDisposeCallback(item, function () {
                grid.remove_widget(item);
              });
            };
          };

          return new ViewModel(controller, componentInfo);
        }
      },
      template: { element: 'gridstack-template' }
    });

    var Controller = function (widgets) {
      var self = this;

      this.widgets = ko.observableArray(widgets);

      this.add_new_widget = function () {
        this.widgets.push({
          x: charts.length % 2 ? 0 : 6,
          y: parseFloat(charts.length / 2) * 6,
          width: 6,
          height: 6,
          auto_position: true,
          onchange: () => console.log(123),
        });
      };

      this.delete_widget = function (item) {
        self.widgets.remove(item);
      }
    }

    function getData () {
      $http.dragData({
        success: function ({data}) {
          chartsData = data.charts
          var controller = new Controller(data.charts.map(it => ({id: it.id, ...it.position})));
          var a = ko.applyBindings(controller);
          console.log(a, 1, ko)

          setTimeout(function () {
            initView()
          })
        },
        error: function (e) {console.log(e)},
      })
    }

    function initView () {
      chartsData.forEach((it, idx)=> {
        const $el = $('#' + it.id)
        $el.find('.title').text(it.options.title)

        initChart($el.find('.draw'), it.id, it.data)

        window.onresize = function(){
          // Object.values(charts).forEach(it => it())
        }
      })
    }

    function initChart ($el, id, options) {
      const myChart = echarts.init($el[0])
      const option = {
        title: {
          text: '登录状态统计',
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
            data: options.map(it => ({value: it.count, name: it.title})),
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
      myChart.setOption(option)
      charts[id] = () => {
        console.log('resize', myChart)
        return myChart.resize()
      }
    }

    getData()
  })
})
