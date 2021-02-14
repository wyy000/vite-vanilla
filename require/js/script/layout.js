define(function () {
  const navList = [
    {name: 'table', path: 'table.html'},
    {name: 'input', path: 'input.html'},
  ]

  const layout = function (node) {
    // menu
    let res = ''
    for (it of navList) {
      res += `<button data-path="${it.path}">${it.name}</button>`
    }
    let nav = $($('<div class="nav_list" style="display: flex; flex-direction: column;"></div>')[0]).html(res)
    node.append(nav)

    // page
    const iframe = $('.container').children('iframe')[0]
    if (iframe) {
      iframe.src = navList[0].path
    } else {
      const container = $(`<div class="container"><iframe id="nav_iframe" src="${navList[0].path}" style="width: 100%;height: 100%;border: none;" /></div>`)[0]
      node.append(container)
    }

    // event
    $('.nav_list').on('click', 'button', function (e) {
      $('.container').children('iframe')[0].src = $(e.target).data('path')
    })

    return node
  }

  return {
    layout,
  }
})
