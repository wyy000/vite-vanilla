define(['api'], function () {
  const menuList = function (config) {
    $.ajax({
      url: '/menu-list',
      ...config,
    })
  }

  return {
    menuList,
  }
})
