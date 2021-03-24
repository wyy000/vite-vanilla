!function ($) {
  'use strict';

  $.fn.extend({
    initTree: initTree,
    getSelected: getSelected,
  })

  let signName = 'id'

  function initTree (options) {
    let $this = $(this)
    $this.empty()
    signName = options.sign ? options.sign : 'id'
    let res = treeData(options.data)
    let dom = treeDom({arr: res, root: true, sign: signName})
    $this.html(dom)

    $this.on('click', '.item_box', clickHandle)

    $this.find('.collapse_box').each(function () {
      let $this = $(this)
      let height = $this.height()
      if (height) {
        $this.css('height', height - 1 + 'px').css('height', height + 'px')
        $this.siblings('.item_box').children('.icon').children('svg').css('transform', 'rotate(180deg)')
      }
    })
  }

  function getSelected () {
    let $this = $(this)
    let arr = []
    $this.find('li[class="selected"]').each(function () {
      arr.push($(this).data(signName))
    })
    return arr
  }

  function clickHandle (e) {
    e.stopPropagation()

    let $el = $(e.currentTarget)
    let $pli = $el.parent('li')
    let selected = $pli.hasClass('selected')
    let $node = $(e.target)

    if ($node.hasClass('icon') ||
      $node.hasClass('collapse_btn') ||
      $node.parent('.collapse_btn').length > 0 ||
      ($node.hasClass('item_box') && $node.siblings('.collapse_box').children('ul').length > 0)) {
      let $box =  $el.siblings('.collapse_box')
      let $svg = $el.find('.collapse_btn')
      let height = $box.height()
      !height ? $svg.css('transform', 'rotate(180deg)') : $svg.css('transform', 'rotate(0deg)')
      return height ? $box.css('height', 0) : $box.css('height', $box.children('ul').height() + 'px')
    } else if ($node.hasClass('item_box')) {
      return
    }

    if ($el.parents('ul:eq(0)').hasClass('level_one')) {
      $el.siblings('.collapse_box').children('ul').children('li').each(function () {
        let $this = $(this)
        selected ? $this.removeClass('selected').removeClass('checked').addClass('checked') : $this.removeClass('checked').removeClass('selected').addClass('selected')
      })
      !selected && !$el.siblings('.collapse_box').height() && $el.click()
    }

    selected ? $pli.removeClass('selected').removeClass('checked').addClass('checked') : $pli.removeClass('checked').removeClass('selected').addClass('selected')

    if (!$el.parents('ul:eq(0)').hasClass('level_one')) {
      let $li = $el.parents('li:eq(1)')
      let selectedAll = true
      let checkedAll = true
      $li.children('.collapse_box').children('ul').children('li').each(function () {
        let $this = $(this)
        if (!$this.hasClass('selected'))
          selectedAll = false
        if ($this.hasClass('selected'))
          checkedAll = false
      })
      $li.hasClass('selected') ? (checkedAll && $li.removeClass('selected').removeClass('checked').addClass('checked'))
        : ((!checkedAll || selectedAll) && $li.removeClass('checked').removeClass('selected').addClass('selected'))
    }
  }

  function treeDom (options) {
    let arr = options.arr
    let root = options.root
    let sign = options.sign
    const icon = {
      close: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" class="collapse_btn">\n' +
        '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />\n' +
        '</svg>',
      open: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" class="collapse_btn" style="transform: rotate(179deg);">\n' +
        '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />\n' +
        '</svg>',
    }
    const stateIcon = {
      selected: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" class="selected">' +
        '  <path fill="none" d="M0 0h24v24H0z"/>' +
        '  <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>' +
        '</svg>',
      checked: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" class="checked">' +
        '  <path fill="none" d="M0 0h24v24H0z"/>' +
        '  <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/>' +
        '</svg>',
    }

    let str = ''
    for (let i = 0; i < arr.length; i++) {
      str += '<li class="' + (arr[i].state ? arr[i].state : 'checked') + '" data-' + sign + '="' + (arr[i][sign] ? arr[i][sign] : '') + '">\n' +
        '  <div class="item_box">\n' +
        '    <div class="icon">' + (arr[i].nodes && arr[i].nodes.length > 0 ? icon[arr[i].collapse ? 'close' : 'open'] : '') + '</div>\n' +
        '    <div class="state_icon">' + stateIcon['checked'] + stateIcon['selected'] + '</div>\n' +
        '    <div class="context">' + arr[i].num + '</div>\n' +
        '  </div>\n' +
        '  <div class="collapse_box" style="height:' + (arr[i].collapse === false ? 'auto' : 0) + ';">' + ((arr[i].nodes && arr[i].nodes.length > 0) ? treeDom({arr: arr[i].nodes, sign: sign}) : '') + '</div>\n' +
        '</li>\n'
    }

    return '<ul class="' + (root ? 'level_one' : 'level_two') + '">' + str + '</ul>'
  }

  function treeData (arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].pid === 0) {
        arr[i].nodes = []
        arr[i].collapse = true
        res.push(arr[i])
        arr.splice(i, 1)
        i--
      }
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (arr[i].pid === res[j].id) {
          res[j].nodes.push(arr[i])
          if (arr[i].state === 'selected') res[j].collapse = false
        }
      }
    }

    return res
  }

}(window.jQuery)
