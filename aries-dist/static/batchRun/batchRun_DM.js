var stria
var load = false
var zk
var applicationGroup
var BATCH_CLASS
var BATCH_DESC
var EOD_SOD
var flag = true

function getBatchStatus() {
	var batchClass = $('#BATCH_CLASS').val()
	$.ajax({
		url: '/oms/governance/batch/getBatchStatus?batchClass=' + BATCH_CLASS + '&zk=' + zk + '&applicationGroup=' + applicationGroup,
		type: 'GET',
		dataType: 'json',
		async: false,
		success: function (DATA) {
			if (DATA.errorMsg && flag) {
				showMsg(DATA.errorMsg, 'error')
				flag = false
			} else if (!flag) {
			} else {
				if (DATA.data) {
					// console.log((body.errorMsg != 'undefined')&&(body.errorMsg!='null')&&(body.errorMsg!='')&&flag);
					var body = JSON.stringify(DATA.data)
					if ($('#OLD_JSON_STRING').val() != body) {
						$('#OLD_JSON_STRING').val(body)
						initFlow()
						load = true
						stria.loadData(DATA.data)
						rightClickBind()
						load = false
						$('#BATCH_STATUS').val(DATA.data.batchStatus.BATCH_STATUS)
						var batchMsg = ' 批处理状态：'
						if ($('#BATCH_STATUS').val() == 'R') {
							batchMsg += '正在运行 '
						} else if ($('#BATCH_STATUS').val() == 'S') {
							batchMsg += '已停止 '
						} else if ($('#BATCH_STATUS').val() == 'C') {
							batchMsg += '已完成 '
						}
						batchMsg += '批处理日期：'
						if (DATA.data.batchStatus.RUN_DATE && DATA.data.batchStatus.RUN_DATE != '') { batchMsg += DATA.data.batchStatus.RUN_DATE}
						batchMsg += ' 批处理开始时间：'
						if (DATA.data.batchStatus.START_TIME && DATA.data.batchStatus.START_TIME != '') { batchMsg += DATA.data.batchStatus.START_TIME}
						batchMsg += ' 批处理完成时间：'
						if (DATA.data.batchStatus.END_TIME && DATA.data.batchStatus.END_TIME != '') { batchMsg += DATA.data.batchStatus.END_TIME}
						stria.setTitle($('#BATCH_CLASS').val() + batchMsg)
					}
					clear(body)
				}
			}
		}
	})
	batchClass = null
}
$(document).ready(function () {
	function getQueryVariable(variable) {
		var query = parent.location.hash.substr(parent.location.hash.indexOf('?') + 1)
		var vars = query.split('&')
		for (var i = 0; i < vars.length; i++) {
						var pair = vars[i].split('=')
						if (pair[0] == variable) { return pair[1] }
		}
		return (false)
	}
	zk = getQueryVariable('zk')
	zk = decodeURIComponent(zk)
	applicationGroup = getQueryVariable('applicationGroup')
	BATCH_CLASS = getQueryVariable('batchClass')
	BATCH_DESC = $('#DESC').val()
	EOD_SOD = $('#SOD').val()
	$('#BATCH_CLASS').val(BATCH_CLASS)
	$('#BATCH_DESC').val(BATCH_DESC)
	$('#EOD_SOD').val(EOD_SOD)
	document.oncontextmenu = function () {
		return false
	}
	//           if (parent.$("#flowTab").find(".selected").length==1){
	//           		$("#BATCH_CLASS").val( parent.$('#flowTab').DataTable().rows(".selected").data()[0].BATCH_CLASS);
	//           	}
	initFlow()
	getBatchStatus()
	$(document).timer({
		duration: '100s',
		callback: function () {
			getBatchStatus()
		},
		repeat: true // repeatedly call the callback
	})
})

function rightClickBind() {
	$('.GooFlow_item').mousedown(function (e) {
		if (e.which == 3) {
			if (stria.$nodeData[this.id].JOB_TYPE == 'GP') {
				$('#JOB_GROUP_ID').val(this.id)
				showJobGroupRun()
			}
		}
	})
}
function showJobGroupRun() {
	var width = $('#width').val()
	var index = layer.open({
		type: 2,
		title: 'JOB Group',
		closeBtn: 1,
		area: ['900px', '400px'],
		shadeClose: true,
		skin: 'background-color: #EEE2C0',
		content: 'batchJobGroupRun.jsp?zk=' + zk + '&applicationGroup=' + applicationGroup + '&width=' + width
	})
	layer.full(index)
}

function callback_onBtnStartClick(json) {
	if ($('#BATCH_STATUS').val() == 'S') {
		showMsg('批处理已重新运行', 'info')
	} else if ($('#BATCH_STATUS').val() == 'C') {
		if (json.data.success) { showMsg('批处理已启动', 'info')} else {
			createTable(json.data)
		}
	}
}

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
		clear(stria);
		delete stria;
	}

	var property
	// 表格宽度
	var width = $('#width').val()
	property = {
		width: width || 1302,
		height: 600,
		toolBtns: [],
		haveHead: true,
		headLabel: true,
		headBtns: ['start', 'end'], // 如果haveHead=true，则定义HEAD区的按钮
		haveTool: true,
		haveGroup: false,
		useOperStack: true
	}

	stria = $.createGooFlow($('#stria'), property)
	stria.setTitle($('#BATCH_CLASS').val())

	stria.onBtnStartClick = function () {
		var url

		// add zhaozbd
		layer.confirm('确认要启动吗？', function (index) {
			if ($('#BATCH_STATUS').val() == 'R') {
				showMsg('重新运行失败的任务', 'info')
				url = '/oms/governance/batch/startBatch'
			} else if ($('#BATCH_STATUS').val() == 'S') {
				url = '/oms/governance/batch/startBatch'
			} else if ($('#BATCH_STATUS').val() == 'C') {
				url = '/oms/governance/batch/startBatch'
			}
			var params = {
				batchClass: $('#BATCH_CLASS').val(),
				zk: zk,
				applicationGroup: applicationGroup
			}
			sendPostRequest(url, params, callback_onBtnStartClick, 'json', false)
			getBatchStatus()
			layer.close(index)
		})
		// add zhaozbd

		//			if($("#BATCH_STATUS").val() == "R")
		//			{
		//				showMsg("重新运行失败的任务",'info');
		//				url = "/batch/startBatch";
		//			}
		//			else if($("#BATCH_STATUS").val() == "S")
		//			{
		//				url = "/batch/startBatch";
		//			}
		//			else if($("#BATCH_STATUS").val() == "C")
		//			{
		//				url = "/batch/startBatch";
		//			}
		//			var params = {
		//				batchClass:$("#BATCH_CLASS").val(),
		//				zk:zk,
		//				applicationGroup:applicationGroup
		//			};
		//			sendPostRequest(url,params,callback_onBtnStartClick,"json",false);
		//			getBatchStatus();
	}
	stria.onBtnEndClick = function () {
		// add zhaozbd
		layer.confirm('确认要停止吗？', function (index) {
			if ($('#BATCH_STATUS').val() == 'S') {
				showMsg('批处理已停止', 'info')
				return
			} else if ($('#BATCH_STATUS').val() == 'C') {
				showMsg('批处理未启动', 'info')
			}
			var url = '/oms/governance/batch/stopBatch'
			var params = {
				batchClass: $('#BATCH_CLASS').val(),
				zk: zk,
				applicationGroup: applicationGroup
			}
			sendPostRequest(url, params, $(function (data) {
				showMsg('批处理已停止', 'info')
			}), 'json', false)
			getBatchStatus()
			layer.close(index)
		})
	}
	// add zhaozbd

	//		if($("#BATCH_STATUS").val() == "S")
	//		{
	//			showMsg("批处理已停止",'info');
	//			return;
	//		}
	//		else if($("#BATCH_STATUS").val() == "C")
	//		{
	//			showMsg("批处理未启动",'info');
	//		}
	//		var url = "/batch/stopBatch";
	//				var params = {
	//					batchClass:$("#BATCH_CLASS").val(),
	//					zk:zk,
	//                    applicationGroup:applicationGroup
	//				};
	//			sendPostRequest(url,params,$(function(data){
	//				showMsg("批处理已停止",'info');
	//			}),"json",false);
	//			getBatchStatus();
	//		};

	/*stria.onItemDel=function(id,type){return false;};
	stria.onItemRename=function(id,name,type){return false}; */
	/*stria.onItemAdd=function(id,model,json)
	{
		if(!load)
			return false;
		if (json)
		{
			if (model=="line")
			{
				if(json.from==json.to)	return true;
				this.$lineData[id]={};
				this.$lineData[id].DEPENDENCY_TYPE=json.DEPENDENCY_TYPE;

			}
			else if(model=="node")
			{
			}
		}
		return true;
	}; */
	/*stria.onItemBlur=function(id,model)
	{
		if(model == "line")
		{
			saveLine(id);
		}
		return true;
	}; */
	stria.onItemFocus = function (id, model) {
		if (model == 'node') {
			var JOB_ID = this.$nodeData[id].JOB_ID
			// var params = {
			// 	JOB_ID: JOB_ID
			// };
			/*				$.ajax({
									url:"/batch/getErrorMsg?JOB_ID=" + JOB_ID+"&zk="+zk+"&applicationGroup="+applicationGroup,
									type : "GET",
									dataType : "text",
									async : false,
									success : function(data)
									{
										if(data != "")
										{
											var OpenWindow=window.open("");
											OpenWindow.document.write(data);
											OpenWindow.document.close();
										}
									}
									}); */
			$.ajax({
				url: '/oms/governance/batch/getErrorStatus?JOB_ID=' + JOB_ID + '&zk=' + zk + '&applicationGroup=' + applicationGroup,
				type: 'GET',
				dataType: 'json',
				async: false,
				success: function (data) {
					var result = data.data
					if (result) {
						layer_chain_index = layer.open({
							type: 2,
							content: 'errorlogView.jsp?JOB_ID=' + JOB_ID + '&zk=' + zk + '&envIp=' + envIp + '&applicationGroup=' + applicationGroup,
							area: ['100%', '100%'],
							title: '批处理错误日志展现',
							closeBtn: 1,
							shade: [0.8, '#393D49']
						})
					}
				}
			})
		}
		return true
	}
	/* stria.onItemMove=function(id,type,left,top)
	{
		if(type=="node")
		{
			stria.$nodeData[id].left=left;
			stria.$nodeData[id].top=top;
			saveNode(id);
		}
		return true;
	}*/
	/*stria.onItemResize=function(id,type,width,height)
	{
		if(type=="node")
		{
			stria.$nodeData[id].width=width;
			stria.$nodeData[id].height=height;
			saveNode(id);
		}
		return true;
	} */
}

/* function saveNode(id)
 {
		 var jobJson = {};
		 jobJson.JOB_ID=stria.$nodeData[id].JOB_ID;
	 jobJson.TOP_POS=stria.$nodeData[id].top;
 jobJson.LEFT_POS=stria.$nodeData[id].left;
 jobJson.WIDTH=stria.$nodeData[id].width;
 jobJson.HEIGHT=stria.$nodeData[id].height;
 var url = "/batch/saveNode";
 var params = {
	 jobJson:JSON.stringify(jobJson)
 };
 sendPostRequest(url,params,$(function(data){}),"json",false);
 } */

/*    function saveLine(id)
    {
    	var line = stria.$lineData[id];
    	var PREDECESSOR=stria.$nodeData[line.from].JOB_ID;
    	var DESCENDENT=stria.$nodeData[line.to].JOB_ID;
    	if(PREDECESSOR&&DESCENDENT)
    	{
    		var lineJson = {};
    		lineJson.PREDECESSOR=PREDECESSOR;
    		lineJson.DESCENDENT=DESCENDENT;
    		lineJson.LINE_TYPE=line.type;
    		if(line.M)
    			lineJson.M_VALUE=line.M;
    		var url = "/batch/saveLine";
    			var params = {
    				lineJson:JSON.stringify(lineJson)
    			};
    			sendPostRequest(url,params,$(function(data){
    			}),"json",false);

    	}
    } */
function clear(obj) {
	for (var p in obj) {
		obj[p] = null
	}
}

function createTable(json) {
	var width = 0
	for (i = 0; i < json.tableHead.length; i++) {
		width += json.tableHead[i][1]
	}
	if (width < 800) { // 设置提示框的默认宽度
		width = 800
	}
	var desc = json.errorMsg
	var contentMsg = '<div style="padding: 10px;"><table border="1" style="color:#A1C796;">'
	contentMsg = contentMsg + '<tr bgcolor=#FFE4C4>'
	for (i = 0; i < json.tableHead.length; i++) {
		//
		contentMsg += '<td style="text-align:center;padding-right:5px;padding-left:5px;color:#3F9F00;width:50px;">' + json.tableHead[i][0] + '</td>' +
			'<td style="text-align:center;padding-right:5px;padding-left:5px;color:#3F9F00;width:400px;">' + json.tableHead[i][1] + '</td>'
	}
	contentMsg += '</tr>'
	for (i = 0; i < json.tableContent.length; i++) {
		contentMsg += '<tr>'
		for (j = 0; j < json.tableContent[i].length; j++) {
			contentMsg += '<td style="text-align:left;padding-right:5px;padding-left:5px;">' + json.tableContent[i][j] + '</td>'
		}
		contentMsg += '</tr>'
	}
	contentMsg += '</table>'
	contentMsg += '</div>'
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: (width - 300) + 'px',
		shadeClose: true,
		skin: 'background-color: #EEE2C0',
		content: '<div style="padding: 10px;background-color: #DEF0D8;font-size: larger;">' + '<font color=red;font-size: larger>' + desc + '</font>' + '</div>' + contentMsg
	})
}
