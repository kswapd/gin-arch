webpackJsonp([14],{"J/Kb":function(t,e){},"Z/Nq":function(t,e){},cOdY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Xxa5"),o=n.n(a),s=n("exGp"),l=n.n(s),i=n("Dd8w"),r=n.n(i),c=n("NYxO"),d=n("ZlkZ"),u=n("0uvK"),m={data:function(){return{}},props:{logParams:Object},computed:r()({},Object(c.d)({serverLog:function(t){return t.zookeeper.serverLog}})),created:function(){this.getZkServerLog({moId:this.logParams.moId,lines:50})},methods:r()({},Object(c.b)("zookeeper",["getZkServerLog"]),{closeLog:function(){this.$parent.logVisible=!1}})},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"log-modal"},[n("el-dialog",{attrs:{title:t.logParams.name+"日志",visible:t.$parent.logVisible,width:"60%",center:""},on:{"update:visible":function(e){t.$set(t.$parent,"logVisible",e)},close:t.closeLog}},[n("div",{staticClass:"log-box"},t._l(t.serverLog,function(e,a){return n("p",{key:a,domProps:{textContent:t._s(e)}})}))])],1)},staticRenderFns:[]},p=n("VU/8")(m,f,!1,null,null,null).exports,g={data:function(){return{form:{},defaultProps:{children:"children",label:"name"}}},props:{params:Object},computed:r()({},Object(c.d)({zookeeperNodes:function(t){return t.zookeeper.zookeeperNodes}})),created:function(){this.getZkListNode({ipPort:this.params.ip+":"+this.params.clientPort})},methods:r()({},Object(c.b)("zookeeper",["getZkListNode"]),{filterNode:function(t,e){return!t||-1!==e.name.indexOf(t)},filterText:function(t){this.$refs.zkTree.filter(t)},closeNode:function(){this.$parent.nodeVisible=!1},searchNode:function(t){this.$refs.zkTree.filter(t)}})},b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"zk-node"},[n("el-dialog",{attrs:{title:t.params.name+"："+t.params.ip+"节点数据",visible:t.$parent.nodeVisible,width:"50%",center:""},on:{"update:visible":function(e){t.$set(t.$parent,"nodeVisible",e)},close:t.closeNode}},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"small"}},[n("el-row",{attrs:{gutter:15}},[n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{disabled:""},model:{value:t.params.ip,callback:function(e){t.$set(t.params,"ip","string"==typeof e?e.trim():e)},expression:"params.ip"}})],1),t._v(" "),n("el-col",{attrs:{span:9}},[n("el-form-item",{attrs:{label:"节点："}},[n("el-input",{attrs:{placeholder:"请输入节点名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&13!==e.keyCode)return null;t.searchNode(t.form.nodeName)}},model:{value:t.form.nodeName,callback:function(e){t.$set(t.form,"nodeName","string"==typeof e?e.trim():e)},expression:"form.nodeName"}})],1)],1),t._v(" "),n("el-col",{staticClass:"text-left",attrs:{span:2}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:function(e){t.searchNode(t.form.nodeName)}}},[t._v(t._s(t.$t("common.search"))+"\n          ")])],1)],1)],1),t._v(" "),n("div",{staticClass:"node-content"},[n("el-tree",{ref:"zkTree",attrs:{data:t.zookeeperNodes,"node-key":"id",props:t.defaultProps,"filter-node-method":t.filterNode}})],1)],1)],1)},staticRenderFns:[]};var k={components:{zkLog:p,zkNode:n("VU/8")(g,b,!1,function(t){n("J/Kb")},null,null).exports},data:function(){return{currentPage:1,pageSize:10,instanceVisible:!1,instanceTitle:"",selectTableList:[],zkListForm:{clusterId:"",instanceName:"",installPath:""},addInstanceForm:{},addInstanceRules:{ip:[{required:!0,message:"请选择IP地址",trigger:"blur"}],name:[{required:!0,message:"请输入实例名称",trigger:"blur"}],installPath:[{required:!0,message:"请输入安装路径",trigger:"blur"}],installName:[{required:!0,message:"请输入安装名",trigger:"blur"}],versionNo:[{required:!0,message:"请选择版本号",trigger:"blur"}]},configVisible:!1,configTitle:"",configForm:{},logParams:{},logVisible:!1,nodeVisible:!1,nodeParams:{},loading:!1,loadingText:"",configDisabled:!1}},mounted:function(){var t=this;t.getClusterOption(),t.getIpOption(),t.getVersionOption(),t.$route.params.id&&"[object Number]"===Object.prototype.toString.call(t.$route.params.id)&&(t.zkListForm.clusterId=t.$route.params.id.toString()||""),this.searchZkList()},computed:r()({},Object(c.d)({clusterOption:function(t){return t.zookeeper.clusterOption},zkInfo:function(t){return t.zookeeper.zkInfo},selectIp:function(t){return t.zookeeper.selectIp},selectVersion:function(t){return t.zookeeper.selectVersion}}),{batchBtns:function(){return this.selectTableList.length}}),methods:r()({},Object(c.b)("zookeeper",["getClusterOption","getIpOption","getVersionOption","getZkList","operationTable","getZkListConfig","updateZkListConf","updateZkStatus","updateZkRole"]),{handleSelectionChange:function(t){this.selectTableList=t},handleCurrentChange:function(t){this.currentPage=t,this.searchZkList()},searchZkList:function(){var t=this,e={start:t.currentPage,length:t.pageSize,name:t.zkListForm.instanceName,installPath:t.zkListForm.installPath,clusterId:t.zkListForm.clusterId};t.getZkList({params:e,vm:t})},addInstance:function(t){var e=this;t&&t.moId?(e.instanceTitle="修改zk实例",e.addInstanceForm=r()({},t),e.addInstanceForm.clusterId&&(e.addInstanceForm.clusterId=e.addInstanceForm.clusterId.toString()),e.instanceVisible=!0):(e.instanceTitle="添加zk实例",e.addInstanceForm={status:"UNINSTALL",groupName:"",clusterName:""},e.instanceVisible=!0)},instanceCancel:function(t){this.instanceVisible=!1,this.$refs[t].clearValidate()},deleteInstance:function(t){this.handleZookeeperInstance(t,d.a.zkListDelete,"删除")},instanceOk:function(t){var e=this;e.$refs[t].validate(function(t){t&&(e.loading=!0,e.addInstanceForm.moId?e.operationTable({url:d.a.zkListUpdate,data:e.addInstanceForm,callback:function(){e.$message({type:"success",message:"修改成功"}),e.instanceCancel("addInstanceForm"),e.searchZkList()},callbackError:function(t){e.$message({type:"error",message:t.data&&t.data.message||"修改失败"})}}):e.operationTable({url:d.a.zkListAdd,data:e.addInstanceForm,callback:function(){e.$message({type:"success",message:"添加成功"}),e.loading=!1,e.instanceCancel("addInstanceForm"),e.searchZkList()},callbackError:function(t){e.$message({type:"error",message:t.data&&t.data.message||"添加失败"}),e.loading=!1}}))})},openConfig:function(t){var e=this;return l()(o.a.mark(function n(){var a,s,l;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return"UNINSTALL"!==t.status?e.configDisabled=!0:e.configDisabled=!1,a={moId:t.moId},n.next=4,e.getZkListConfig(a);case 4:(s=n.sent)&&s.code===u.d&&(l=JSON.parse(s.data),e.configForm=l),e.configTitle=t.name+"的配置信息",e.configVisible=!0;case 8:case"end":return n.stop()}},n,e)}))()},closeConfig:function(){this.configVisible=!1},configConfirm:function(){var t=this;this.updateZkListConf({data:this.configForm,callback:function(){t.$message.success("配置更新成功"),t.closeConfig()},callbackError:function(e){t.$message.error(e&&e.data&&e.data.message||"配置更新失败")}})},openNode:function(t){this.nodeParams=t,this.nodeVisible=!0},viewLog:function(t){this.logParams=t,this.logVisible=!0},zkInstall:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.handleZookeeperInstance(t,d.a.zkListinstall,"部署")},zkUninstall:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.handleZookeeperInstance(t,d.a.zkListUninstall,"卸载")},startZk:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.handleZookeeperInstance(t,d.a.zkListStart,"启动")},stopZk:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.handleZookeeperInstance(t,d.a.zkListStop,"停止")},handleZookeeperInstance:function(t,e,n){var a=this;t&&t.moId?a.$confirm("确认"+n+t.name+"？",n,{confirmButtonText:a.$t("common.ok"),cancelButtonText:a.$t("common.cancel"),type:"warning",center:!0}).then(function(){var o={zkIds:t.moId};a.loading=!0,a.loadingText=n+"中...",a.operationTable({url:e,data:o,callback:function(){a.searchZkList(),a.$message.success(n+"成功")},callbackError:function(t){a.loading=!1,a.$message.error(t&&t.data&&t.data.message||n+"失败")}})}).catch(function(){}):a.$confirm("确认"+n+"所选中实例？",n,{confirmButtonText:a.$t("common.ok"),cancelButtonText:a.$t("common.cancel"),type:"warning",center:!0}).then(function(){var t=[],o=[];if(a.selectTableList.forEach(function(e){t.push(e.moId),"删除"===n&&"UNINSTALL"!==e.status&&o.push(e.name),"部署"===n&&"UNINSTALL"!==e.status&&o.push(e.name),"启动"!==n||"RUNNING"!==e.status&&"UNINSTALL"!==e.status||o.push(e.name),"停止"!==n||"STOPPED"!==e.status&&"UNINSTALL"!==e.status||o.push(e.name),"卸载"!==n||"UNINSTALL"!==e.status&&"RUNNING"!==e.status||o.push(e.name)}),o.length>0){var s=o.join("、");a.$message({type:"warning",message:"实例名称："+s+"不符合该操作，请重新选择",duration:5e3})}else a.loading=!0,a.loadingText=n+"中...",a.operationTable({url:e,data:{zkIds:t.toString()},callback:function(){a.searchZkList(),a.$message.success(n+"成功")},callbackError:function(t){a.loading=!1,a.$message.error(t&&t.data&&t.data.message||n+"失败")}})}).catch(function(){})},refresh:function(t,e){var n=this;return l()(o.a.mark(function a(){var s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={moId:t.moId},n.loading=!0,a.next=4,n.updateZkStatus({data:s,index:e});case 4:n.loading=!1;case 5:case"end":return a.stop()}},a,n)}))()},refreshRole:function(t,e){var n=this;return l()(o.a.mark(function a(){var s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={moId:t.moId},n.loading=!0,a.next=4,n.updateZkRole({data:s,index:e});case 4:n.loading=!1;case 5:case"end":return a.stop()}},a,n)}))()},moniter:function(t){var e={ip:t.row.ip,path:t.row.installPath+"/"+t.row.installName};this.$router.push({name:"zkEcharts",query:e,params:{id:t.row.ip}})},ipSearch:function(t,e){var n=this.selectIp;e(t?n.filter(function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}):n)}}),filters:{filterRole:function(t){var e="";switch(t){case"0":e="领导者";break;case"1":e="跟随者";break;case"2":e="观察者";break;case"-1":e="未知";break;default:e=""}return e}}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"zk-main",attrs:{"element-loading-text":t.loadingText}},[n("div",{staticClass:"button-group"},[n("span",{staticClass:"route-name"},[t._v(t._s(t.$route.meta.title))]),t._v(" "),n("el-button",{attrs:{icon:"el-icon-plus",type:"warning",size:"small"},on:{click:function(e){t.addInstance()}}},[t._v(t._s(t.$t("common.add")))]),t._v(" "),t.batchBtns?n("div",{staticClass:"inline-block ml-10"},[n("el-button",{attrs:{icon:"fa fa-plane",type:"info",loading:t.loading,size:"small"},on:{click:function(e){t.zkInstall()}}},[t._v("部署")]),t._v(" "),n("el-button",{attrs:{icon:"fa fa-play",type:"info",loading:t.loading,size:"small"},on:{click:function(e){t.startZk()}}},[t._v("启动")]),t._v(" "),n("el-button",{attrs:{icon:"fa fa-link",type:"warning",loading:t.loading,size:"small"},on:{click:function(e){t.zkUninstall()}}},[t._v("卸载")]),t._v(" "),n("el-button",{attrs:{icon:"fa fa-stop",type:"warning",loading:t.loading,size:"small"},on:{click:function(e){t.stopZk()}}},[t._v("停止")]),t._v(" "),n("el-button",{attrs:{icon:"fa fa-trash",type:"danger",loading:t.loading,size:"small"},on:{click:function(e){t.deleteInstance()}}},[t._v(t._s(t.$t("common.delete")))])],1):t._e()],1),t._v(" "),n("el-form",{attrs:{"label-width":"85px","label-position":"right",size:"small"}},[n("el-row",{staticClass:"label-first",attrs:{gutter:20}},[n("el-col",{attrs:{lg:6,xl:4}},[n("el-form-item",{attrs:{label:"集群名称："}},[n("el-select",{model:{value:t.zkListForm.clusterId,callback:function(e){t.$set(t.zkListForm,"clusterId",e)},expression:"zkListForm.clusterId"}},[n("el-option",{attrs:{label:"请选择",value:""}}),t._v(" "),t._l(t.clusterOption,function(t){return n("el-option",{key:t.pkValue,attrs:{label:t.pkDesc,value:t.pkValue}})})],2)],1)],1),t._v(" "),n("el-col",{attrs:{lg:6,xl:4}},[n("el-form-item",{attrs:{label:"实例名称："}},[n("el-input",{model:{value:t.zkListForm.instanceName,callback:function(e){t.$set(t.zkListForm,"instanceName","string"==typeof e?e.trim():e)},expression:"zkListForm.instanceName"}})],1)],1),t._v(" "),n("el-col",{attrs:{lg:6,xl:4}},[n("el-form-item",{attrs:{label:"安装路径："}},[n("el-input",{model:{value:t.zkListForm.installPath,callback:function(e){t.$set(t.zkListForm,"installPath","string"==typeof e?e.trim():e)},expression:"zkListForm.installPath"}})],1)],1),t._v(" "),n("el-col",{attrs:{lg:6,xl:4}},[n("el-button",{attrs:{type:"primary",loading:t.loading,icon:"el-icon-search",size:"small"},on:{click:t.searchZkList}},[t._v(t._s(t.$t("common.search"))+"\n        ")])],1)],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.zkInfo.list,stripe:""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",align:"center",label:"实例名称",width:"150"}}),t._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{style:t._f("filterAppStatusColor")(e.row.status)},["UNINSTALL"!==e.row.status?n("i",{staticClass:"fa fa-lightbulb-o name-state"}):t._e(),t._v("\n          "+t._s(t._f("filterAppStatus")(e.row.status))+"\n        ")]),t._v(" "),n("el-tooltip",{attrs:{content:"刷新状态",placement:"top"}},[n("el-button",{attrs:{type:"text",size:"small",icon:"fa fa-refresh"},on:{click:function(n){t.refresh(e.row,e.$index)}}})],1)]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"clusterName",align:"center",label:"集群名称",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"ip",align:"center",label:"IP",width:"150"}}),t._v(" "),n("el-table-column",{attrs:{label:"配置信息",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small",icon:"fa fa-cog"},on:{click:function(n){t.openConfig(e.row)}}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"节点数据",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small",icon:"fa fa-database"},on:{click:function(n){t.openNode(e.row)}}})]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:t.$t("common.monitor"),width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small",icon:"fa fa-bar-chart"},on:{click:function(n){t.moniter(e)}}})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"installPath",align:"center",label:"安装路径","show-overflow-tooltip":"",width:"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"installName",label:"安装名",width:"100",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"角色",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[""!==e.row.type?n("div",[n("span",[t._v(t._s(t._f("filterRole")(e.row.type)))]),t._v(" "),n("el-tooltip",{attrs:{content:"刷新状态",placement:"top"}},[n("el-button",{attrs:{type:"text",size:"small",icon:"fa fa-refresh"},on:{click:function(n){t.refreshRole(e.row,e.$index)}}})],1)],1):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"服务器日志",width:"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small",icon:"fa fa-file-text-o"},on:{click:function(n){t.viewLog(e.row)}}})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"versionNo",label:"版本号",width:"100",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"remark",label:"描述",align:"center","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{width:"120",align:"center",label:t.$t("common.operation"),fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-dropdown",{attrs:{trigger:"click"}},[n("el-button",{attrs:{type:"text",size:"mini"}},[t._v("\n            操作"),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",["UNINSTALL"===e.row.status?n("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-pencil-square-o"},on:{click:function(n){t.addInstance(e.row)}}},[t._v("修改")]):t._e()],1),t._v(" "),n("el-dropdown-item",["UNINSTALL"===e.row.status?n("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-plane"},on:{click:function(n){t.zkInstall(e.row)}}},[t._v("部署")]):t._e()],1),t._v(" "),n("el-dropdown-item",["INSTALL"===e.row.status||"STOPPED"===e.row.status?n("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-link"},on:{click:function(n){t.zkUninstall(e.row)}}},[t._v("卸载")]):t._e()],1),t._v(" "),n("el-dropdown-item",["INSTALL"===e.row.status||"STOPPED"===e.row.status?n("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-play"},on:{click:function(n){t.startZk(e.row)}}},[t._v("启动")]):t._e()],1),t._v(" "),n("el-dropdown-item",["RUNNING"===e.row.status||"INSTALL"===e.row.status?n("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-stop"},on:{click:function(n){t.stopZk(e.row)}}},[t._v("停止")]):t._e()],1),t._v(" "),"UNINSTALL"===e.row.status?n("el-dropdown-item",{attrs:{divided:""}},[n("el-button",{staticClass:"btn-text-red",attrs:{type:"text",size:"mini",icon:"fa fa-trash"},on:{click:function(n){t.deleteInstance(e.row)}}},[t._v("删除")])],1):t._e()],1)],1)]}}])})],1),t._v(" "),n("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.pageSize,disabled:t.loading,layout:"total, prev, pager, next, jumper",total:t.zkInfo.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}}),t._v(" "),n("el-dialog",{attrs:{title:t.instanceTitle,visible:t.instanceVisible,width:"35%",center:""},on:{"update:visible":function(e){t.instanceVisible=e},close:function(e){t.instanceCancel("addInstanceForm")}}},[n("el-form",{ref:"addInstanceForm",attrs:{model:t.addInstanceForm,rules:t.addInstanceRules,"label-width":"80px",size:"small"}},[n("el-form-item",{attrs:{label:"",prop:"status"}},[n("el-radio",{attrs:{label:"UNINSTALL"},model:{value:t.addInstanceForm.status,callback:function(e){t.$set(t.addInstanceForm,"status",e)},expression:"addInstanceForm.status"}},[t._v("未部署")]),t._v(" "),n("el-radio",{attrs:{label:"INSTALL"},model:{value:t.addInstanceForm.status,callback:function(e){t.$set(t.addInstanceForm,"status",e)},expression:"addInstanceForm.status"}},[t._v("已部署")])],1),t._v(" "),n("el-form-item",{attrs:{label:"集群名称",prop:"clusterId"}},[n("el-select",{staticClass:"block",model:{value:t.addInstanceForm.clusterId,callback:function(e){t.$set(t.addInstanceForm,"clusterId",e)},expression:"addInstanceForm.clusterId"}},[n("el-option",{attrs:{label:"请选择",value:""}}),t._v(" "),t._l(t.clusterOption,function(t,e){return n("el-option",{key:e,attrs:{label:t.pkDesc,value:t.pkValue}})})],2)],1),t._v(" "),n("el-form-item",{attrs:{label:"IP地址",prop:"ip"}},[n("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"100%"},attrs:{placeholder:"请输入1-15位字符",maxlength:"15","fetch-suggestions":t.ipSearch},model:{value:t.addInstanceForm.ip,callback:function(e){t.$set(t.addInstanceForm,"ip","string"==typeof e?e.trim():e)},expression:"addInstanceForm.ip"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"实例名称",prop:"name"}},[n("el-input",{attrs:{maxlength:"50"},model:{value:t.addInstanceForm.name,callback:function(e){t.$set(t.addInstanceForm,"name","string"==typeof e?e.trim():e)},expression:"addInstanceForm.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"安装路径",prop:"installPath"}},[n("el-input",{attrs:{maxlength:"200"},model:{value:t.addInstanceForm.installPath,callback:function(e){t.$set(t.addInstanceForm,"installPath","string"==typeof e?e.trim():e)},expression:"addInstanceForm.installPath"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"安装名",prop:"installName"}},[n("el-input",{attrs:{maxlength:"50"},model:{value:t.addInstanceForm.installName,callback:function(e){t.$set(t.addInstanceForm,"installName","string"==typeof e?e.trim():e)},expression:"addInstanceForm.installName"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"版本号",prop:"versionNo"}},[n("el-select",{staticClass:"block",model:{value:t.addInstanceForm.versionNo,callback:function(e){t.$set(t.addInstanceForm,"versionNo",e)},expression:"addInstanceForm.versionNo"}},t._l(t.selectVersion,function(t,e){return n("el-option",{key:e,attrs:{label:t.pkDesc,value:t.pkValue}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"描述"}},[n("el-input",{attrs:{type:"textarea",maxlength:"100"},model:{value:t.addInstanceForm.remark,callback:function(e){t.$set(t.addInstanceForm,"remark","string"==typeof e?e.trim():e)},expression:"addInstanceForm.remark"}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",loading:t.loading,size:"small"},on:{click:function(e){t.instanceOk("addInstanceForm")}}},[t._v(t._s(t.$t("common.ok")))]),t._v(" "),n("el-button",{attrs:{disabled:t.loading,size:"small"},on:{click:function(e){t.instanceCancel("addInstanceForm")}}},[t._v(t._s(t.$t("common.cancel")))])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:t.configTitle,visible:t.configVisible,width:"30%",center:""},on:{"update:visible":function(e){t.configVisible=e},close:t.closeConfig}},[n("el-form",{ref:"configForm",attrs:{model:t.configForm,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"客户端端口："}},[n("el-input",{attrs:{disabled:t.configDisabled},model:{value:t.configForm.clientPort,callback:function(e){t.$set(t.configForm,"clientPort","string"==typeof e?e.trim():e)},expression:"configForm.clientPort"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"通信端端口："}},[n("el-input",{attrs:{disabled:t.configDisabled},model:{value:t.configForm.commPort,callback:function(e){t.$set(t.configForm,"commPort","string"==typeof e?e.trim():e)},expression:"configForm.commPort"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"选举端端口："}},[n("el-input",{attrs:{disabled:t.configDisabled},model:{value:t.configForm.electPort,callback:function(e){t.$set(t.configForm,"electPort","string"==typeof e?e.trim():e)},expression:"configForm.electPort"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"myId："}},[n("el-input",{attrs:{disabled:t.configDisabled},model:{value:t.configForm.myid,callback:function(e){t.$set(t.configForm,"myid","string"==typeof e?e.trim():e)},expression:"configForm.myid"}})],1)],1),t._v(" "),n("span",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{size:"small"},on:{click:t.closeConfig}},[t._v(t._s(t.$t("common.cancel")))]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"small",disabled:t.configDisabled},on:{click:t.configConfirm}},[t._v(t._s(t.$t("common.ok")))])],1)],1),t._v(" "),t.logVisible?n("zk-log",{attrs:{logParams:t.logParams}}):t._e(),t._v(" "),t.nodeVisible?n("zk-node",{attrs:{params:t.nodeParams}}):t._e()],1)},staticRenderFns:[]};var h=n("VU/8")(k,v,!1,function(t){n("Z/Nq")},null,null);e.default=h.exports}});