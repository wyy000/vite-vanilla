define(function () {
  const container = function (node, path) {
    const dom = $(node).children('iframe')[0] || $('<iframe id="nav_iframe" style="width: 100%;height: 100%;border: none;" />')[0]
    dom.src = path

    node.append(dom)

    return node
  }

  return {
    container,
  }
})
