require(['common'], function () {
  require(['jquery', 'api', '/require/js/lib/spark-md5.3.0.0.js'],function($, $http, SparkMD5) {
    let hash = ''
    let requestQueue = []

    $('#fileUpload').on('change', function (e) {
      let file = this.files[0]
      if (!file) return

      $('#progressBox').css('display', 'flex').siblings('div').hide()

      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      let chunks = file.size > 10 * 1024 * 1024 ? Math.min(Math.ceil(file.size / 10 * 1024 * 1024), 10) : 1
      let chunkSize = Math.ceil(Math.ceil(file.size / chunks) / 1024 / 1024) * 1024 * 1024
      let currentChunk = 0
      let spark = new SparkMD5.ArrayBuffer()
      let fileReader = new FileReader()
      let fileChunkList = []

      fileReader.onload = function (e) {
        spark.append(e.target.result)                   // Append array buffer
        currentChunk++

        if (currentChunk < chunks) {
          loadNext()
        } else {
          hash = spark.end()
          addRequestQueue(getDataList(fileChunkList))
          uploadChunks(requestQueue, file.name)
        }
      }

      fileReader.onerror = function () {
        console.warn('oops, something went wrong.')
        $('#fileUpload').val('')
        $('#uploadBox').css('display', 'flex').siblings('div').hide()
      }

      function loadNext() {
        let start = currentChunk * chunkSize
        let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        let chunk = blobSlice.call(file, start, end)
        fileChunkList.push(chunk)
        fileReader.readAsArrayBuffer(chunk)
      }

      loadNext()
    })

    $('#pauseBtn').click(function () {
      for (let i = 0; i < requestQueue.length; i++) {
        requestQueue[i].readyState !== 4 && requestQueue[i].abort()
      }
      $('#failBox').css('display', 'flex')
      $('#pauseBox').hide()
    })

    $('#failBox').click(function () {
      let arr = []
      for (let i = 0; i < requestQueue.length; i++) {
        requestQueue[i].readyState !== 4 && arr.push(getRequestItem(requestQueue[i], i))
      }
      let fileName = $('#fileUpload')[0].files[0].name
      arr.length > 0 ? uploadChunks(arr, fileName) : margeChunks(fileName)
    })

    $('#closeBtn').on('click', function (e) {
      e.stopPropagation()
      resetUpload()
    })

    function addRequestQueue (list) {
      for (let i = 0; i < list.length; i++) {
        requestQueue.push(getRequestItem(list[i], i))
      }
    }

    function getDataList (list) {
      let dataList = []
      for (let i = 0; i< list.length; i++) {
        dataList.push({
          chunk: list[i],
          hash: hash,
          idx: i,
        })
      }
      return dataList
    }

    function getRequestItem (data, idx) {
      let formData = new FormData()
      formData.append('chunk', data.chunk)
      formData.append('hash', data.hash)
      formData.append('index', idx)
      return $.ajax({
        url: 'http://localhost:8080/upload-file',
        // url: '/upload-file',
        type: 'POST',
        dataType: 'JSON',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {},
        error:  function () {},
      })
    }

    function margeChunks (fileName) {
      $http.mergeChunk({
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          fileName: fileName,
          hash: hash,
        }),
        success: function (res) {
          if (res.code === 0) {
            hash = ''
            $('#successBox').css('display', 'flex').siblings('div').hide()
          }
        },
        error: function (e) {
          console.log(e)
          $('#failBox').css('display', 'flex').siblings('div').hide()
        },
      })
    }

    function resetUpload () {
      for (let i = 0; i < requestQueue.length; i++) {
        requestQueue[i].readyState !== 4 && requestQueue[i].abort()
      }
      hash = ''
      requestQueue = []
      $('#fileUpload').val('')
      $('#uploadBox').css('display', 'flex').siblings('div').hide()
    }

    function uploadChunks (arr, fileName) {
      setTimeout(() => {
        requestQueue = []
        margeChunks(fileName)
      }, 5000)
      // Promise.all(arr)
      //   .then(() => {
      //     console.log(999)
      //     requestQueue = []
      //     margeChunks(fileName)
      //   })
      //   .catch(e => {
      //     console.log(e)
      //     $('#failBox').css('display', 'flex').siblings('div').hide()
      //   })
    }
  })
})
