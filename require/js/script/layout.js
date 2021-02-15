define(function () {
  const layout = function (node, navList) {
    // menu
    let res = ''
    for (it of navList) {
      res += `<button data-path="${it.path}">${it.name}</button>`
    }
    let $nav = $($('<div class="nav_list""></div>')[0]).html(res)
    node.append($nav)

    $nav
      .css('height', '100%')
      .css('display', 'flex')
      .css('flex-direction', 'column')
      .css('border-right', '1px solid #ddd')
    .children('button')
      .css('border', 'none')
      .css('border-radius', '0')
      .css('border-bottom', '1px solid #ddd')

    // page
    const iframe = $('.container').children('iframe')[0]
    if (iframe) {
      iframe.src = navList[0].path
    } else {
      const container = $(`<div class="container"><iframe id="nav_iframe" src="${(navList.find(it => it.active === true) || navList[0]).path}" style="width: 100%;height: 100%;border: none;" /></div>`)[0]
      node.append(container)
    }

    // event
    $nav.on('click', 'button', function (e) {
      $('.container').children('iframe')[0].src = $(e.target).data('path')
    })

    return node
  }

  return {
    layout,
  }
})
