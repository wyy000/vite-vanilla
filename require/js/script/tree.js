require(['common'], function () {
  require(['jquery', 'api', ],function($, $http) {

    $http.treeData({
      url: '/tree-data',
      success: function (data) {
        let res = treeData(data.data)
        let dom = treeDom(res, true)
        $('#tree').html(dom)
      },
      error: function () {},
    })

    $('#tree').on('click', '.item_box', function (e) {
      e.stopPropagation()

      if ($(e.target).hasClass('collapse_btn')) {
        let $box = $(e.target).parents('li:eq(0)').children('.collapse_box')
        let $ul = $box.children('ul')
        let height = $box.height()
        !height ? $(e.target).css('transform', 'rotate(180deg)') : $(e.target).css('transform', 'rotate(0)')
        return height ? $box.css('height', 0) : $box.css('height', $ul.height() + 'px')
      }

      let $el = $(e.currentTarget)
      let $pli = $el.parent('li')
      let selected = $pli.hasClass('selected')

      if ($el.parents('ul:eq(0)').hasClass('level_one')) {
        $el.siblings('.collapse_box').children('ul').children('li').each(function () {
          let $this = $(this)
          selected ? $this.removeClass('selected') : ($this.hasClass('selected') || $this.addClass('selected'))
        })
      }

      selected ? $pli.removeClass('selected') : $pli.addClass('selected')

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
        $li.hasClass('selected') ? (checkedAll && $li.removeClass('selected')) : ((!checkedAll || selectedAll) && $li.addClass('selected'))
      }
    })

    function treeDom (arr, root) {
      const icon = {
        close: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" class="collapse_btn">\n' +
          '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />\n' +
          '</svg>',
        open: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" class="collapse_btn">\n' +
          '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />\n' +
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
        str += '<li class="' + (arr[i].state ? arr[i].state : 'checked') + ' collapse">\n' +
          '  <div class="item_box">\n' +
          '    <div class="icon">' + (arr[i].nodes ? icon[arr[i].nodes.length > 0 ? 'close' : 'open'] : '') + '</div>\n' +
          '    <div class="state_icon">' + stateIcon['checked'] + stateIcon['selected'] + '</div>\n' +
          '    <div class="context">' + arr[i].num + '</div>\n' +
          '  </div>\n' +
          '  <div class="collapse_box">' +
          ((arr[i].nodes && arr[i].nodes.length > 0) ? treeDom(arr[i].nodes) : '') +
          '  </div>' +
          '</li>\n'
      }

      return '<ul class="' + (root ? 'level_one' : 'level_two') + '">' + str + '</ul>'
    }

    function treeData (arr) {
      let res = arr.filter(it => it.pid === 0).map(it => {
        it.nodes = []
        return it
      })
      arr.forEach(it => it.pid && res.find(t => it.pid === t.id).nodes.push(it))
      return res
    }
  })
})
