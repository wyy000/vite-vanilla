require(['common'], function () {
  require(['jquery', 'api', '../lib/search-radio'], function ($, $http) {

    let _id = 0
    let conditionId = 0
    let conditions = []
    let topicStack = {}

    $('#createBtn').on('click', function () {
      resetState()
      $('.conditions').html('<div class="conditions_item" data-conditionId="0"><div class="operation_item"><button class="topic">请选择</button><div></div>')
      initTopic($('.operation_item').eq(0).find('button.topic'), {changeFn: addCondition})
    })

    $('div.conditions')
      .on('click', 'button.topic', function (e) {
        const id = $(this).data('id')
        e.stopPropagation()
        radioClose()
        topicStack[id][0].$el.data('show') ? topicStack[id][0].close(topicStack[id][0].$el) : topicStack[id][0].show(topicStack[id][0].$el, topicStack[id][0].options.data || eventList, {changeFn: topicStack[id][0].options.changeFn})
      })
      .on('click', 'button.value', function (e) {
        const id = $(this).siblings('.topic').data('id')
        e.stopPropagation()
        radioClose()
        topicStack[id][1].$el.data('show') ? topicStack[id][1].close(topicStack[id][1].$el) : topicStack[id][1].show(topicStack[id][1].$el, topicStack[id][1].options.data, {changeFn: topicStack[id][1].options.changeFn})
      })
      .on('input', 'input', function (e) {
        const $this = $(this)
        const $operation = $this.parents('.operation_item').eq(0)
        if (!$operation.next('.operation_item').length) {
          syncState($this, {id: 'operation', value: e.target.value})

          $operation.after('<div class="operation_item"><button class="topic">请选择</button></div>')
          const $button = $operation.next('.operation_item').children('button.topic')
          initTopic($button)
          $button.click()
        } else {
          syncState($this, {value: e.target.value})
        }
      })
      .on('click', 'svg.delete', function (e) {
        const $this = $(this)
        const id = $this.parent().siblings('button.topic').data('id')
        $this.parents('.conditions_item').eq(0).next('div.text').remove()
        $this.parents('.conditions_item').eq(0).remove()
        delete topicStack[id]
      })
      .on('click', 'svg.operation', function (e) {
        const $this = $(this)
        $this.before('<div class="operation_item"><input data-type="symbol" /></div>')
        const $input = $this.prev('.operation_item').children('input')
        $input.focus()
      })

    const eventList = {
      event: { name: '事件', data: Array.from({length: 15}).map((it, idx) => ({value: idx, text: idx})) },
      page: { name: '页面', data: Array.from({length: 15}).map((it, idx) => ({value: idx + 20, text: idx + 20})) },
    }

    init()

    /*  fn  */
    function addId () {
      ++_id
    }

    function addCondition ($el) {
      $el
        .parents('.conditions_item').eq(0)
        .append(
          '  <svg class="operation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">' +
          '    <path fill="none" d="M0 0h24v24H0z"/><path d="M14 20v-2.157c1.863-1.192 3.5-3.875 3.5-6.959 0-3.073-2-6.029-5.5-6.029s-5.5 2.956-5.5 6.03c0 3.083 1.637 5.766 3.5 6.958V20H3v-2h4.76C5.666 16.505 4 13.989 4 10.884 4 6.247 7.5 3 12 3s8 3.247 8 7.884c0 3.105-1.666 5.621-3.76 7.116H21v2h-7z"/>' +
          '  </svg>' +
          '  <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">\n' +
          '    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />\n' +
          '  </svg>')

      ++conditionId
      $('.conditions').append('<div class="conditions_item" data-conditionId="' + conditionId + '"><div class="operation_item"><button class="topic">请选择</button></div></div>')
      const $target = $('.conditions .conditions_item').last().find('button')
      initTopic($target, {changeFn: addCondition})
    }

    function init () {
      initTopic($('.conditions .conditions_item').eq(0).find('button.topic'), {changeFn: addCondition})

      document.addEventListener('click', radioClose)
      document.addEventListener('keydown', function (e) {
        const $input = $(document.activeElement).eq(0)
        if (e.key === 'Backspace' && $input.data('type') === 'symbol') {
          if (!$input.val()) {
            const $operation = $input.parents('.operation_item')
            const index = $('.conditions_item').index($input.parents('.conditions_item').eq(0))

            const cIdx = $input.parents('.conditions_item').eq(0).children('.operation_item').index($input.parents('.operation_item').eq(0))
            conditions[index].splice(cIdx, 1)
            $operation.prev().remove()

            const oIdx = $input.parents('.conditions_item').eq(0).children('.operation_item').index($operation)
            conditions[index].splice(oIdx, 1)
            $operation.remove()

            delete topicStack[$operation.prev().find('.topic').data('id')]
          }
        }
      })
      window.onresize = function () {
        Object.values(topicStack).forEach(it => {
          if (it[0]?.$el.data('show')) {
            it[0].show(it[0].$el, it[0].data, it[0].options)
          }
          else if (it[1]?.$el.data('show')) {
            it[1].show(it[1].$el, it[1].data)
          }
        })
      }
    }

    function initTopic ($el, options = {}) {
      const id = _id
      topicStack[id] = [{...$el.initSearchRadio(), options: {data: options.data || eventList, changeFn: function ($topic) {
            syncState($topic, {value1: $topic.data('value')})
            $el.after('<span>的</span><button class="value">请选择</button>')
            topicStack[$topic.data('id')][1] = {...$topic.siblings('button.value').initSearchRadio(), options: {data: eventList, changeFn: function ($value) {
                  syncState($topic, {value2: $value.data('value')})
                }}}
            options.changeFn?.($topic)
          }}}]
      topicStack[id][0].$el.data('id', id)
      syncState($el, {id, name: $el.data('value'), value1: $el.data('value'), value2: ''})
      addId()
    }

    function radioClose () {
      Object.values(topicStack).forEach(it => it.forEach(item => item.close?.(item.$el)))
    }

    function resetState () {
      _id = 0
      conditionId = 0
      conditions = []
      topicStack = {}
    }

    function syncState ($el, state) {
      const $condition = $el.parents('.conditions_item').eq(0)
      const $operation = $el.parents('.operation_item').eq(0)
      const cIdx = $('.conditions_item').index($condition)
      const oIdx = $condition.find('.operation_item').index($operation, $operation)
      if (!conditions[cIdx]) {
        conditions[cIdx] = [state]
      } else {
        conditions[cIdx][oIdx] = conditions[cIdx][oIdx] ? Object.assign(conditions[cIdx][oIdx], state) : state
      }
    }
  })
})