require(['common'], function () {
  require(['jquery', 'api'],function($, $http) {

    $('#btn_upload').on('click', function () {
      Promise.all(upload(getData()))
        .then(res => {
          console.log(res)
            $http.mergeChunk({
            headers: {
              "content-type": "application/json"
            },
            data: JSON.stringify({
              filename: 'test.txt',
            }),
          })
        },
        error => {
          console.log(error)
        })
    })

    function getData () {
      const file = $('#file_upload')[0].files[0]
      if (!file) return
      var size = 10 * 1024 * 1024
      // let data = new FormData()
      // data.append('file', file, file.name)
      var chunkFile = chunkFiles(file, size)
      var dataList = []
      for (var i = 0; i< chunkFile.length; i++) {
        console.log(chunkFile[i])
        dataList.push({
          chunk: chunkFile[i].file,
          hash: file.name + '_' + i,
        })
      }
      return dataList
    }

    function chunkFiles (file, size) {
      var fileChunkList = []
      var cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size)})
        cur += size
      }
      return fileChunkList
    }

    function upload (dataList) {
      var arr = []
      for (var i = 0; i < dataList.length; i++) {
        var formData = new FormData()
        formData.append('chunk', dataList[i].chunk)
        formData.append('hash', dataList[i].hash)
        formData.append('filename', dataList[i].hash.split('_')[0])
        console.log(formData, dataList)

        arr.push($http.uploadFile({
          data: formData,
          type: 'POST',
          dataType: 'JSON',
          processData: false,
          contentType: false,
          success: function (res) {},
          error: function (err) {},
          progress,
        }))
      }

      return arr
    }

    function progress (e) {
      console.log(e, (e.loaded / e.total) * 100 + '%')
      // console.log(config)
    }
  })
})
