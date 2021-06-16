require(['common'], function () {
  require(['jquery', 'api', '../lib/search-radio'], function ($, $http) {
    $('#createBtn').on('click', function () {
      resetTopic()
      $('.conditions').html('<div class="conditions_item"><button class="topic">请选择</button></div>')
      initTopic($('.conditions .conditions_item').eq(0).children('button'))
    })

    $('.conditions').on('click', 'svg', function (e) {
      const id = $(this).parent().siblings('button.topic').data('id')
      $(this).parents('.conditions_item').eq(0).remove()
      delete topicStack[id]
    })

    const eventList = {
      event: { name: '事件', data: Array.from({length: 15}).map((it, idx) => ({value: idx, text: idx})) },
      page: { name: '页面', data: Array.from({length: 15}).map((it, idx) => ({value: idx + 20, text: idx + 20})) },
    }

    let topicStack = {}
    let _id = 0

    init()

    /*  fn  */
    function init () {
      initTopic($('.conditions .conditions_item').eq(0).children('button.topic'))

      document.addEventListener('click', radioClose)
      window.onresize = function () {
        Object.values(topicStack).forEach(it => {
          if (it[0]?.$el.data('show')) {
            it[0].show(it[0].$el, it[0].data, {changeFn: addTopic})
          }
          else if (it[1]?.$el.data('show')) {
            it[1].show(it[1].$el, it[1].data)
          }
        })
      }
    }

    function initTopic ($el) {
      const id = _id
      topicStack[id] = [{...$el.initSearchRadio(), data: eventList}]
      topicStack[id][0].$el
        .on('click', function (e) {
          e.stopPropagation()
          radioClose()
          $(this).data('show') ? topicStack[id][0].close(topicStack[id][0].$el) : topicStack[id][0].show(topicStack[id][0].$el, eventList, {changeFn: addTopic})
        })
        .data('id', id)
      addId()
    }

    function addId () {
      ++_id
    }

    function addTopic ($el) {
      if ($el.siblings('div.text').length) {
        $el.siblings('div.text').eq(0).text($el.text())
      } else {
        $el.after('的\n' +
          '          <button class="value">请选择</button>\n' +
          '          <span>' +
          '            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\n' +
          '              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />\n' +
          '            </svg>' +
          '          </span>\n' +
          '          <div class="text">' + $el.text() + '</div>')

        const id = $el.data('id')
        topicStack[id][1] = {...$el.siblings('button.value').initSearchRadio(), data: eventList}
        topicStack[id][1].$el.on('click', function (e) {
          e.stopPropagation()
          radioClose()
          topicStack[id][1].$el.data('show') ? topicStack[id][1].close(topicStack[id][1].$el) : topicStack[id][1].show(topicStack[id][1].$el, topicStack[id][1].data)
        })

        $('.conditions').append('<div class="conditions_item"><button class="topic">请选择</button></div>')
        const $target = $('.conditions .conditions_item').last().children('button')
        initTopic($target)
      }
    }

    function radioClose () {
      Object.values(topicStack).forEach(it => it.forEach(item => item.close?.(item.$el)))
    }

    function resetTopic () {
      topicStack = {}
      _id = 0
    }
  })
})