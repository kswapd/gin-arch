var retJson = {}
var jobJson
var lineJson
var once
var exportJsons = {}
var zk
var envId
var applicationGroup
var BATCH_CLASS
var BATCH_DESC
var EOD_SOD
var contextPath = '/oms'
// var contextPath = ''
var stria
var JOB_ID
var node = {}

$(document).ready(function () {
	function getQueryVariable(variable) {
		var query = parent.location.hash.substr(parent.location.hash.indexOf('?') + 1)
		var vars = query.split('&')
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=')
			if (pair[0] === variable) { return pair[1] }
		}
		return (false)
	}
	zk = getQueryVariable('zkUrl')
	zk = decodeURIComponent(zk)
	envId = getQueryVariable('envId')
	applicationGroup = getQueryVariable('appGroup')
	BATCH_CLASS = getQueryVariable('batchClass')
	BATCH_DESC = decodeURI(getQueryVariable('batchDesc'))
	EOD_SOD = getQueryVariable('eodSod')
	$('#BATCH_CLASS').val(BATCH_CLASS)
	$('#BATCH_DESC').val(BATCH_DESC)
	$('#EOD_SOD').val(EOD_SOD)
	once = true
	jobJson = {}
	lineJson = {}
	// var data = getFlowData()
	// var opt = 'insert'
	// if (data) {
	// 	opt = 'update'
	// }
	$('#IS_CHANGED').val('N')
	$('#propertyForm').hide()
	// 基础属性隐藏
	$('#basepro_desc').hide()
	showNodesAndLines()
	exportJsons.nodes = {}
	exportJsons.lines = {}
	exportJsons.deleteNodes = {}
	exportJsons.deleteLines = {}

	document.oncontextmenu = function () {
		return false
	}
})
function getFlowData() {
	//	if (parent.$("#flowTab").find(".selected").length==1){
	//		return parent.$('#flowTab').DataTable().rows(".selected").data()[0];
	//	}
	return true
}

// 异步获取JOB信息
function showNodesAndLines() {
	// var rowData = getFlowData()
	$('#BATCH_CLASS').val(BATCH_CLASS)
	var batchClass = $('#BATCH_CLASS').val()
	var url = contextPath + '/batch/showNodesAndLines'
	var params = {
		batchClass: batchClass,
		appGroup: applicationGroup,
		zkUrl: zk
	}
	sendPostRequest(url, params, showNodesAndLines_callBack, 'json')
}
function showNodesAndLines_callBack(json) {
	$(function () {
		if (json.errorMsg != null) {
			showMsg(json.errorMsg, 'info')
		} else {
			retJson = json.data || json.body
			var data = getFlowData()
			var opt = 'insert'
			if (data) {
				opt = 'update'
			}
			deployFlowDiv(opt, data)
		}
	})
}
function deployFlowDiv(type, rowData) {
	// 清空原流程
	$('#stria').html('')
	var property
	// 表格宽度
	var width = document.body.clientWidth
	property = {
		width: width,
		height: 400,
		toolBtns: ['cursor', 'direct', 'stdjob', 'complex'],
		haveHead: true,
		headLabel: true,
		headBtns: ['save'], // 如果haveHead=true，则定义HEAD区的按钮
		haveTool: true,
		haveGroup: false,
		useOperStack: true
	}

	var remark = {
		cursor: '选择指针',
		direct: '依赖关系',
		stdjob: 'JOB',
		complex: 'Job Group'
	}
	stria = $.createGooFlow($('#stria'), property)
	stria.setNodeRemarks(remark)
	stria.setTitle(BATCH_CLASS)

	$('#BATCH_CLASS').val(BATCH_CLASS)
	$('#EOD_SOD').val(EOD_SOD)
	$('#BATCH_DESC').val(BATCH_DESC)

	$('#BATCH_CLASS').attr('disabled', true)
	$('#EOD_SOD').attr('disabled', true)
	$('#BATCH_DESC').attr('disabled', true)

	stria.onBtnSaveClick = function () {
		// showMsg(JSON.stringify(exportJsons),'info');
		if (window.clipboardData) {
			window.clipboardData.setData('Text', JSON.stringify(exportJsons))
			showMsg('复制成功', 'info')
		}
		return true
	}
	stria.onFreshClick = function () {
		deployFlowDiv('update')
		return true
	}
	stria.onBtnCloseClick = function () {
		cleanForm('flowForm')
		cleanForm('propertyForm')
		stria.destrory()
		// 获取窗口索引
		var index = parent.layer.getFrameIndex(window.name)
		parent.layer.close(index)// 关闭窗口
		return true
	}
	stria.onItemDel = function (id, type) {
		if (confirm('确定要删除该单元吗?')) {
			node = stria.$nodeData[id]
			if (node) {
				showJobGroup()
			} else {
				deleteLine(id)
			}
			// this.blurItem();
			return true
		} else {
			return false
		}
	}
	stria.onItemAdd = function (id, model, json) {
		if (json) {
			if (model == 'line') {
				if (json.from == json.to) return true
				this.$lineData[id] = {}
				this.$lineData[id].DEPENDENCY_TYPE = json.DEPENDENCY_TYPE
				if (!once) {
					return saveLineByFromTo(json.from, json.to)
				};
			} else if (model == 'node') {
			}
		}
		return true
	}

	stria.onItemFocus = function (id, model) {
		rightClickBind()
		$('#ele_model').val(model)
		$('#propertyForm').show()
		var obj
		if (model == 'line') {
			obj = this.$lineData[id]
			$('.DEPENDENCY_DIV').show()
			$('.JOB_DIV').hide()
			$('#DEPENDENCY_TYPE').val(obj.DEPENDENCY_TYPE)
		} else if (model == 'node') {
			$('.JOB_DIV').show()
			$('.DEPENDENCY_DIV').hide()
			JOB_ID = this.$nodeData[id].JOB_ID
			var type = this.$nodeData[id].type
			$('#JOB_ID').val(JOB_ID)
			$('#OLD_JOB_ID').val(JOB_ID)
			$('#IS_CHANGED').val('N')
			// var url = contextPath + '/batch/getJob?zk=' + zk + '&envId=' + envId + '&applicationGroup=' + applicationGroup
			// var params = {
			// 	JOB_ID: JOB_ID
			// }
			$.ajax({
				url: contextPath + '/batch/getJob',
				type: 'POST',
				dataType: 'JSON',
				async: false,
				data: {
					JOB_ID: JOB_ID,
					zkUrl: zk,
					appGroup: applicationGroup
				},
				success: function (Data) {
					obj = Data
					if (obj.JOB_TYPE == 'GP' || type == 'complex') {
						$('#tr_1').hide()
						$('#tr_2').hide()
						$('#tr_3').hide()
						$('#tr_4').hide()
						$('#tr_5').hide()
						$('#JOB_DESC').hide()
						$('#MODULE_ID').hide()
						$('#job_desc').hide()
						$('#module_id').hide()
						$('#tr_job_type').hide()
					} else {
						$('#tr_1').show()
						$('#tr_2').show()
						$('#tr_3').show()
						$('#tr_4').show()
						$('#tr_5').show()
						$('#JOB_DESC').show()
						$('#MODULE_ID').show()
						$('#job_desc').show()
						$('#module_id').show()
						$('#tr_job_type').show()
					}
					$('#JOB_NAME').val(obj.JOB_NAME)
					$('#JOB_TYPE').val(obj.JOB_TYPE)
					$('#JOB_DESC').val(obj.JOB_DESC)
					$('#MODULE_ID').val(obj.MODULE_ID)
					$('#SYSTEM_ID').val(obj.SYSTEM_ID)
					$('#DAY_END').val(obj.DAY_END)
					$('#WEEK_END').val(obj.WEEK_END)
					$('#MTH_END').val(obj.MTH_END)
					$('#YR_END').val(obj.YR_END)
					$('#IS_SKIP').val(obj.IS_SKIP)
					$('#GX_CLASS_NAME').val(obj.GX_CLASS_NAME)
					$('#GX_METHOD').val(obj.GX_METHOD)
					$('#STATIC_PARAM').val(obj.STATIC_PARAM)
					$('#IS_SPLIT').val(obj.IS_SPLIT)
					$('#STATUS').val(obj.STATUS)
					$('#SHARD_MANAGER_ID').val(obj.SHARD_MANAGER_ID)
					$('#BY_SCHEMA').val(obj.BY_SCHEMA)
					$('#BATCH_SIZE').val(obj.BATCH_SIZE)
					$('#DTP_FLAG').val(obj.DTP_FLAG)
					if ($('#IS_SPLIT').val() == 'Y') {
						$('.JOB_SPLIT_DIV').show()
						$('#SPLIT_CLASS').val(obj.SPLIT_CLASS)
						$('#SPLIT_TYPE').val(obj.SPLIT_TYPE)
						$('#SPLIT_CNT').val(obj.SPLIT_CNT)
						$('#MAX_PER_SPLIT').val(obj.MAX_PER_SPLIT)
						$('#NAMESPACE').val(obj.NAMESPACE)
						$('#SQL_ID').val(obj.SQL_ID)
						$('#FILE_PATH').val(obj.FILE_PATH)
						$('#FILE_NAME').val(obj.FILE_NAME)
						$('#FILE_FORMAT').val(obj.FILE_FORMAT)
						$('#FILE_ROW_NAME').val(obj.FILE_ROW_NAME)
					} else {
						$('.JOB_SPLIT_DIV').hide()
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					showMsg(this.url + '<br>' + errorThrown, 'error')
				}
			})
		}
		return true
	}

	// 设置是否分段change事件
	$('#IS_SPLIT').change(function () {
		if ($('#IS_SPLIT').val() == 'Y') {
			$('.JOB_SPLIT_DIV').show()
		} else {
			$('.JOB_SPLIT_DIV').hide()
		}
	})
	$('.input-text').change(function () {
		stria.setName(stria.$focus, $('#JOB_ID').val(), 'node')
		Savepreperty(stria.$focus)
	})
	/// /////////////////////////////////job group begin
	function rightClickBind() {
		$('.GooFlow_item').unbind('mousedown')
		$('.GooFlow_item').mousedown(function (e) {
			if (e.which == 3) {
				if (stria.$nodeData[this.id].JOB_TYPE == 'GP' || stria.$nodeData[this.id].type == 'complex') {
					showPreperty(this.id)
				}
			}
		})
	}
	function showPreperty() {
		var batchClass = $('#BATCH_CLASS').val()
		var eod_sod = $('#EOD_SOD').val()
		var batch_desc = $('#BATCH_DESC').val()
		var width = $('#width').val()
		var batchJobGroup = JOB_ID
		if ($('#JOB_ID').val() == '') {
		  showMsg('JOB_ID不能为空', 'info')
		  return false
		}
		var index = layer.open({
			type: 2,
			title: 'JOB Group',
			closeBtn: 1,
			area: ['900px', '400px'],
			shadeClose: true,
			skin: 'background-color: #EEE2C0',
			content: 'batchJobGroup.html?batch_class=' + batchClass + '&JOB_ID=' + JOB_ID + '&jobId=' + batchJobGroup + '&eod_sod=' + eod_sod + '&batch_desc=' + batch_desc + '&width=' + width +
				'&zkUrl=' + zk + '&envId=' + envId + '&appGroup=' + applicationGroup
		})
		layer.full(index)
	}

	/// ////////////////////////////////job group end

	stria.onItemBlur = function (id, model) {
		if (model == 'node') {
			if ($('#JOB_ID').val() == '') {
				showMsg('JOB_ID不能为空', 'info')
				return false
			}
			saveJob(id)
		} else {
			saveLine(id)
		}
		$('#propertyForm').hide()
		return true
	}
	stria.onItemMove = function (id, type, left, top) {
		if (type == 'node') {
			$('#IS_CHANGED').val('Y')
			stria.$nodeData[id].left = left
			stria.$nodeData[id].top = top
			saveJob(id)
		}
		return true
	}
	stria.onItemResize = function (id, type, width, height) {
		if (type == 'node') {
			$('#IS_CHANGED').val('Y')
			stria.$nodeData[id].width = width
			stria.$nodeData[id].height = height
			saveJob(id)
		}
		return true
	}

	stria.onBtnSaveClick = function () {
		var url = contextPath + '/batch/exportSql'
		var params = {
			exportJsons: JSON.stringify(exportJsons)
		}
		if (isNullObject(exportJsons.nodes) || isNullObject(exportJsons.lines) || isNullObject(exportJsons.deleteNodes) || isNullObject(exportJsons.deleteLines)) {
			sendPostRequest(url, params, callback_bhDownLoadSql, 'json')
		} else {
			// alert('未做任何修改，暂无生成SQL ！')
			return false
		}
	}
	function callback_bhDownLoadSql(json) {
		if (json.retStatus == 'F') {
			showMsg(json.retMsg, 'info')
		} else if (json.retStatus == 'S') {
			downLoadSql(json.data)
		}
	}

	if (retJson) { stria.loadData(retJson) }

	/* for(var k1 in stria.$lineData)
	{
		if(stria.$lineData[k1].DEPENDENCY_TYPE == "P")
		{
			stria.markItem(k1,"line",true);
		}
	} */
	if (type == 'view') { $('#flowForm').hide() } else { $('#flowForm').show() }
	once = false
}
// add by qiqingshan 判断一个对象是否为空 var a={}
function isNullObject(obj) {
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			return true // 有自有属性或方法，返回true
		}
	}
	return false // 没有自有属性或方法，返回false，该对象是空对象
}
// add by qiqingshan
function downLoadSql(obj) {
	$('#downFrame').attr('src', contextPath + '/batch/downLoadSql?value=' + obj)
}
function Export() {
	document.getElementById('flowResult').value = JSON.stringify(stria.exportData())
}

function deleteNode() {
	var jobId = node.JOB_ID
	if (jobId) {
		jobJson = {}
		var url = contextPath + '/batch/deleteJob'
		jobJson.OLD_JOB_ID = jobId
		exportJsons.deleteNodes[jobJson.OLD_JOB_ID] = jobJson
		exportJsons.nodes[jobJson.OLD_JOB_ID] = null
		var params = {
			jobJson: JSON.stringify(jobJson),
			envId: envId,
			zkUrl: zk,
			appGroup: applicationGroup
		}
		sendPostRequest(url, params, $(function (data) {
		}), 'json', false)
	}
}
// 异步获取JOB信息
function showJobGroup() {
  var url = contextPath + '/batch/showJobGroup'
  var params = {
    batchClass: BATCH_CLASS,
    jobGroupId: JOB_ID,
    appGroup: applicationGroup,
    zkUrl: zk
    // envId: envId
	}
  sendPostRequest(url, params, showJobGroup_callBack, 'json')
}

function showJobGroup_callBack(json) {
    if (json.errorMsg != null) {
      showMsg(json.errorMsg, 'info')
    } else {
      retJson = json.body || {}
			var nodes = retJson.nodes || {}
			if (JSON.stringify(nodes) !== '{}') {
				showMsg('JOB_Group不为空，不能删除', 'error')
				showNodesAndLines()
				return false
			} else {
				deleteNode()
			}
    }
}
function deleteLine(id) {
	var line = stria.$lineData[id]
	var PREDECESSOR = stria.$nodeData[line.from].JOB_ID
	var DESCENDENT = stria.$nodeData[line.to].JOB_ID
	if (PREDECESSOR && DESCENDENT) {
		lineJson = {}
		lineJson.PREDECESSOR = PREDECESSOR
		lineJson.DESCENDENT = DESCENDENT
		lineJson.DEPENDENCY_TYPE = stria.$lineData[id].DEPENDENCY_TYPE
		exportJsons.deleteLines[PREDECESSOR + ',' + DESCENDENT] = lineJson
		exportJsons.lines[PREDECESSOR + ',' + DESCENDENT] = null
		var url = contextPath + '/batch/deleteLine'
		var params = {
			lineJson: JSON.stringify(lineJson),
			envId: envId,
			zkUrl: zk,
			appGroup: applicationGroup
		}
		sendPostRequest(url, params, $(function (data) {
		}), 'json', false)
	}
}
function saveLineByFromTo(from, to) {
	var PREDECESSOR = stria.$nodeData[from].JOB_ID
	var DESCENDENT = stria.$nodeData[to].JOB_ID
	if (PREDECESSOR && DESCENDENT) {
		lineJson = {}
		lineJson.PREDECESSOR = PREDECESSOR
		lineJson.DESCENDENT = DESCENDENT
		lineJson.LINE_TYPE = 'sl'
		lineJson.DEPENDENCY_TYPE = 'P'
		exportJsons.lines[PREDECESSOR + ',' + DESCENDENT] = lineJson
		exportJsons.deleteLines[lineJson.PREDECESSOR + ',' + lineJson.DESCENDEN] = null
		var url = contextPath + '/batch/saveLine'
		var params = {
			lineJson: JSON.stringify(lineJson),
			zkUrl: zk,
			appGroup: applicationGroup
		}
		sendPostRequest(url, params, $(function (data) {
		}), 'json', false)
	} else {
		if (!PREDECESSOR) {
			showMsg('被依赖JOB ID为空', 'info')
		} else if (!DESCENDENT) {
			showMsg('JOB ID为空', 'info')
		}
		return false
	};
	return true
};
function saveLine(id) {
	var line = stria.$lineData[id]
	var PREDECESSOR = stria.$nodeData[line.from].JOB_ID
	var DESCENDENT = stria.$nodeData[line.to].JOB_ID
	if (PREDECESSOR && DESCENDENT) {
		lineJson = {}
		lineJson.PREDECESSOR = PREDECESSOR
		lineJson.DESCENDENT = DESCENDENT
		lineJson.LINE_TYPE = line.type
		if (line.M) { lineJson.M_VALUE = line.M }
		lineJson.DEPENDENCY_TYPE = line.DEPENDENCY_TYPE
		exportJsons.lines[lineJson.PREDECESSOR + ',' + lineJson.DESCENDEN] = lineJson
		exportJsons.deleteLines[lineJson.PREDECESSOR + ',' + lineJson.DESCENDEN] = null
		var url = contextPath + '/batch/saveLine'
		var params = {
			lineJson: JSON.stringify(lineJson),
			envId: envId,
			appGroup: applicationGroup,
			zkUrl: zk
		}
		sendPostRequest(url, params, $(function (data) {

		}), 'json', false)
	}
}
function saveJob(id) {
	if ($('#IS_CHANGED').val() == 'Y' && $('#JOB_ID').val().trim() != '') {
		Savepreperty(id)
		jobJson.TOP_POS = stria.$nodeData[id].top
		jobJson.LEFT_POS = stria.$nodeData[id].left
		jobJson.WIDTH = stria.$nodeData[id].width
		jobJson.HEIGHT = stria.$nodeData[id].height
		var url = contextPath + '/batch/saveJob'
		var params = {
			jobJson: JSON.stringify(jobJson),
			envId: envId,
			zkUrl: zk,
			appGroup: applicationGroup
		}
		if ($('#OLD_JOB_ID').val() != '' && $('#OLD_JOB_ID').val() != $('#JOB_ID').val()) {
			exportJsons.nodes[jobJson.JOB_ID] = jobJson
			exportJsons.deleteNodes[jobJson.JOB_ID] = null
			exportJsons.nodes[jobJson.OLD_JOB_ID] = null
			exportJsons.deleteNodes[jobJson.OLD_JOB_ID] = jobJson
		} else {
			exportJsons.nodes[jobJson.JOB_ID] = jobJson
			exportJsons.deleteNodes[jobJson.JOB_ID] = null
		}

		sendPostRequest(url, params, $(function (Data) {

		}), 'json', false)
	};
};
function Savepreperty(id) {
	if ($('#ele_model').val() == 'line') {
		stria.$lineData[id].DEPENDENCY_TYPE = $('#DEPENDENCY_TYPE').val()
	} else if ($('#ele_model').val() == 'node') {
		jobJson = {}
		stria.$nodeData[id].JOB_ID = $('#JOB_ID').val()
		$('#IS_CHANGED').val('Y')
		jobJson.OLD_JOB_ID = $('#OLD_JOB_ID').val()
		jobJson.JOB_ID = $('#JOB_ID').val()
		jobJson.JOB_NAME = $('#JOB_NAME').val()
		jobJson.BATCH_CLASS = $('#BATCH_CLASS').val()
		if (stria.$nodeData[id].type == 'complex') {
			jobJson.JOB_TYPE = 'GP'
			jobJson.MODULE_ID = 'GP'
			jobJson.SYSTEM_ID = 'GP'
		} else {
			jobJson.JOB_TYPE = $('#JOB_TYPE').val()
			jobJson.MODULE_ID = $('#MODULE_ID').val()
			jobJson.SYSTEM_ID = $('#SYSTEM_ID').val()
		}
		jobJson.JOB_DESC = $('#JOB_DESC').val()
		// jobJson.MODULE_ID=$("#MODULE_ID").val();
		// jobJson.SYSTEM_ID=$("#SYSTEM_ID").val();
		jobJson.DAY_END = $('#DAY_END').val()
		jobJson.WEEK_END = $('#WEEK_END').val()
		jobJson.MTH_END = $('#MTH_END').val()
		jobJson.YR_END = $('#YR_END').val()
		jobJson.IS_SKIP = $('#IS_SKIP').val()
		jobJson.GX_CLASS_NAME = $('#GX_CLASS_NAME').val()
		jobJson.GX_METHOD = $('#GX_METHOD').val()
		jobJson.STATIC_PARAM = $('#STATIC_PARAM').val()
		jobJson.IS_SPLIT = $('#IS_SPLIT').val()
		jobJson.BY_SCHEMA = $('#BY_SCHEMA').val()
		jobJson.STATUS = $('#STATUS').val()
		jobJson.BATCH_SIZE = $('#BATCH_SIZE').val()
		jobJson.SPLIT_CLASS = $('#SPLIT_CLASS').val()
		jobJson.SPLIT_TYPE = $('#SPLIT_TYPE').val()
		jobJson.SPLIT_CNT = $('#SPLIT_CNT').val()
		jobJson.MAX_PER_SPLIT = $('#MAX_PER_SPLIT').val()
		jobJson.NAMESPACE = $('#NAMESPACE').val()
		jobJson.SQL_ID = $('#SQL_ID').val()
		jobJson.FILE_PATH = $('#FILE_PATH').val()
		jobJson.FILE_NAME = $('#FILE_NAME').val()
		jobJson.FILE_FORMAT = $('#FILE_FORMAT').val()
		jobJson.FILE_ROW_NAME = $('#FILE_ROW_NAME').val()
		jobJson.BATCH_DESC = $('#BATCH_DESC').val()
		jobJson.SHARD_MANAGER_ID = $('#SHARD_MANAGER_ID').val()
		jobJson.DTP_FLAG = $('#DTP_FLAG').val()
	}
}
