define(function() {
  const nav = function (node, list) {
    let res = ''
    for (it of list) {
      res += `<a href="${it.path}">${it.name}</a>`
    }

    let dom = $('<div class="nav_list" style="display: flex; flex-direction: column;"></div>')[0]
    dom.innerHTML = res

    node.append(dom)

    return node
  }


  return {
    nav: nav
  }
})
