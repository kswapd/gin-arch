var stria
var load = false
var envIp
var zk
var applicationGroup
var legalPersonCode = ''
var contextPath = '/oms'
var isBatchStatus = true
function getBatchStatus() {
    var batchClass = $('#BATCH_CLASS').val()
    var jobGroupId = $('#JOB_GROUP_ID').val()
    $.ajax({
        url: contextPath + '/batch/showJobGroupRun',
        type: 'POST',
        // contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        data: {
            zkUrl: zk,
            appGroup: applicationGroup,
            batchClass: batchClass,
            jobGroupId: jobGroupId,
            legalPersonCode: legalPersonCode
        },
        success: function (DATA) {
            if (DATA.body) {
                var body = JSON.stringify(DATA.body)
                if ($('#OLD_JSON_STRING').val() != body) {
                    $('#OLD_JSON_STRING').val(body)
                    initFlow()
                    load = true
                    stria.loadData(DATA.body)
                    load = false
                }
                clear(body)
            }
            isBatchStatus = true
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showMsg(this.url + '<br>' + errorThrown, 'error')
            isBatchStatus = false
        }
    })
    batchClass = null
    jobGroupId = null
}
$(document).ready(function () {
    function getQueryVariable(variable) {
        var query = location.href.substr(location.href.indexOf('?') + 1)
        var vars = query.split('&')
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=')
            if (pair[0] === variable) {
                return pair[1]
            }
        }
        return (false)
    }
    envIp = getQueryVariable('envIp')
    zk = getQueryVariable('zk')
    legalPersonCode = getQueryVariable('legalPersonCode')
    applicationGroup = getQueryVariable('applicationGroup')
    document.oncontextmenu = function () {
        return false
    }
    // var BATCH_CLASS = getQueryVariable('batch_class')
    $('#BATCH_CLASS').val(parent.$('#BATCH_CLASS').val())
    $('#JOB_GROUP_ID').val(parent.$('#JOB_GROUP_ID').val())
    initFlow()
    getBatchStatus()
    $(document).timer({
        duration: '1s',
        callback: function () {
            if (isBatchStatus) {
              getBatchStatus()
            }
        },
        repeat: true // repeatedly call the callback
    })
})

function initFlow() {
    $('#stria').html('')
    if (stria) {
        clear(stria.GooFlow)
        delete stria.GooFlow
        stria.GooFlow = null
        clear(stria.$lineData)
        stria.$lineData = null
        delete stria.$lineData
        clear(stria.$nodeData)
        stria.$nodeData = null
        delete stria.$nodeData
        clear(stria.$lineDom)
        stria.$lineDom = null
        delete stria.$lineDom
        clear(stria.$nodeDom)
        stria.$nodeDom = null
        delete stria.$nodeDom
        clear(stria.$areaDom)
        stria.$areaDom = null
        delete stria.$areaDom
        delete stria.calcStartEnd
        stria.calcStartEnd = null
        clear(stria.addNode)
        delete stria.addNode
        stria.addNode = null
        clear(stria.drawLine)
        delete stria.drawLine
        stria.drawLine = null

        delete stria.$flowid
        delete stria.$title
        delete stria.$dtpFlag
        delete stria.$state
        delete stria.$timeOut
        delete stria.$nowType
        delete stria.$nodeRemark
        stria.destrory()
        // clear(stria);
        // delete stria;
    }

    var property
    // 表格宽度
    var width = $('#width').val()
    property = {
        width: width,
        height: 600,
        toolBtns: [],
        haveHead: false,
        headLabel: true,
        haveTool: true,
        haveGroup: false,
        useOperStack: true
    }

    stria = $.createGooFlow($('#stria'), property)
    stria.setTitle($('#BATCH_CLASS').val())
    stria.onItemFocus = function (id, model) {
        if (model == 'node') {
            var JOB_ID = this.$nodeData[id].JOB_ID
            // var params = {
            //     JOB_ID: JOB_ID
            // };
            $.ajax({
                url: contextPath + '/batch/getErrorMsg',
                type: 'POST',
                dataType: 'text',
                // contentType: "application/json; charset=utf-8",
                async: false,
                data: {
                    zkUrl: zk,
                    appGroup: applicationGroup,
                    JOB_ID: JOB_ID,
                    legalPersonCode: legalPersonCode
                },
                success: function (data) {
                    var result = data || ''
                    if (result) {
                        var OpenWindow = window.open('')
                        OpenWindow.document.write(result)
                        OpenWindow.document.close()
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    showMsg(this.url + '<br>' + errorThrown, 'error')
                }
            })
        }
        return true
    }
}

function clear(obj) {
    for (var p in obj) {
        obj[p] = null
    }
}
