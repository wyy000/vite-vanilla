require(['common'], function () {
  require(['jquery', '../lib/search-radio'], function ($) {
    const radioStack = []

    const radioOne = $('#radioOne').initSearchRadio()
    radioOne.$el.on('click', function (e) {
      e.stopPropagation()
      radioClose()
      $(this).data('show') ? radioOne.close(radioOne.$el) : radioOne.show(radioOne.$el, Array.from({length: 20}).map((it, idx) => ({value: idx, text: idx})))
    })
    radioStack.push(radioOne)

    const radioTwo = $('#radioTwo').initSearchRadio()
    radioStack.push(radioTwo)
    radioTwo.$el.on('click', function (e) {
      e.stopPropagation()
      radioClose()
      $(this).data('show') ? radioTwo.close(radioTwo.$el) : radioTwo.show(radioTwo.$el, {
        event: { name: '事件', data: Array.from({length: 20}).map((it, idx) => ({value: idx + 10, text: idx + 10})) },
        page: { name: '页面', data: Array.from({length: 20}).map((it, idx) => ({value: idx + 20, text: idx + 20})) },
      })
    })

    document.addEventListener('click', radioClose)

    function radioClose () {
      radioStack.forEach(it => it.close?.(it.$el))
    }
  })
})