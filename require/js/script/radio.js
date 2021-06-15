require(['common'], function () {
  require(['jquery', '../lib/search-radio'], function ($) {
    const radioStack = []

    const radioOne = $('#radioOne').initSearchRadio(Array.from({length: 20}).map((it, idx) => ({value: idx, text: idx})))
    radioOne.$el.on('click', function (e) {
      e.stopPropagation()
      radioClose()
      $(this).data('show') ? radioOne.close() : radioOne.show()
    })
    radioStack.push(radioOne)

    const radioTwo = $('#radioTwo').initSearchRadio(Array.from({length: 20}).map((it, idx) => ({value: idx + 20, text: idx + 20})))
    radioStack.push(radioTwo)
    radioTwo.$el.on('click', function (e) {
      e.stopPropagation()
      radioClose()
      $(this).data('show') ? radioTwo.close() : radioTwo.show()
    })

    document.addEventListener('click', radioClose)

    function radioClose () {
      radioStack.forEach(it => it.close?.())
    }
  })
})