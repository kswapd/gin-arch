webpackJsonp([46],{cPXL:function(t,e){},fTof:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("mvHQ"),r=o.n(a),s=o("woOf"),l=o.n(s),i=o("Dd8w"),n=o.n(i),c=o("ZlkZ"),u=o("NYxO"),p={name:"wholeRouter",data:function(){return{currentPage:1,totalPage:0,loading:!1,inputRules:{zkClusterId:[{required:!0,message:"请输入集群名称",trigger:"blur"}],type:[{required:!0,message:"请输入类型",trigger:"blur"}],condition:[{required:!0,message:"请输入条件",trigger:"blur"}]},serviceForm:{},dataBox:[],routintList:[],popBox:!1,popForm:{}}},computed:n()({},Object(u.d)({clusterOption:function(t){return t.service.clusterOption}})),mounted:function(){if(this.clusterOption.length<=0){this.initializeData({vm:this})}},methods:n()({},Object(u.b)("service",["initializeData"]),{handleCurrentChange:function(t){this.currentPage=t,this.routintList=this.dataBox[t-1]},search:function(){var t=this,e=l()({},this.serviceForm).zkClusterId;if(!e)return this.$message({message:"值不能为空",type:"warning"}),!1;this.loading=!0,this.$axios({method:"get",url:c.a.serviceSFRouter,params:{zkClusterId:e}}).then(function(e){e.data.forEach(function(e){e.zkClusterId||(e.zkClusterIdBackup=t.serviceForm.zkClusterId)});var o=JSON.parse(r()(e.data));t.totalPage=o.length,t.dataBox=t.conmmonMethods.arrayHandle(o),t.routintList=t.dataBox[t.currentPage-1],t.loading=!1}).catch(function(e){t.loading=!1,t.totalPage=0,t.dataBox=[],t.currentPage=1,t.routintList=[],t.$message.error(e&&e.data&&e.data.message||"ERROR")})},routingAdd:function(){this.popForm={},this.popBox=!0},popOk:function(){var t=this,e=l()({},this.popForm),o=e.zkClusterId,a=e.type,r=e.condition;o&&a&&r?(this.loading=!0,this.$axios({method:"post",url:c.a.serviceSFAdd,params:{zkClusterId:o},data:{type:a,condition:r}}).then(function(o){t.popBox=!1,t.$message({message:"新增成功",type:"success"}),t.serviceForm.zkClusterId=e.zkClusterId,t.search()}).catch(function(e){t.loading=!1,t.$message.error(e&&e.data&&e.data.message||"ERROR")})):this.$message({showClose:!0,message:"带*不能为空",type:"warning"})},cancel:function(){this.$refs.popForm.resetFields(),this.popBox=!1},routingDelete:function(t){var e=this,o=l()({},t.row);o.zkClusterId||(o.zkClusterId=t.row.zkClusterIdBackup);var a={type:o.type,condition:o.condition};this.conmmonMethods.makePopBox(this,"删除").then(function(){e.loading=!0,e.$axios({method:"post",url:c.a.serviceSFDelete,params:{zkClusterId:o.zkClusterId},data:a}).then(function(t){e.$message({message:"删除成功",type:"success"}),e.search()}).catch(function(t){e.loading=!1,e.$message.error(t&&t.data&&t.data.message||"ERROR")})})}})},d={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"wholeRouter"},[o("div",{staticClass:"button-group"},[o("span",{staticClass:"route-name"},[t._v(t._s(t.$route.meta.title))]),t._v(" "),o("el-button",{attrs:{icon:"el-icon-plus",size:"small",type:"warning"},on:{click:function(e){t.routingAdd()}}},[t._v(t._s(t.$t("common.add")))])],1),t._v(" "),o("el-form",{ref:"serviceForm",attrs:{model:t.serviceForm,"label-width":"94px","label-position":"right",size:"small",rules:t.inputRules}},[o("el-row",{staticClass:"label-first",attrs:{gutter:20}},[o("el-col",{attrs:{xl:4,lg:6}},[o("el-form-item",{attrs:{label:t.$t("redis.redisCluster.clusterName")+"：",prop:"zkClusterId"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:t.$t("common.pleaseChoose")},model:{value:t.serviceForm.zkClusterId,callback:function(e){t.$set(t.serviceForm,"zkClusterId",e)},expression:"serviceForm.zkClusterId"}},t._l(t.clusterOption,function(t){return o("el-option",{key:t.id,attrs:{label:t.pkDesc,value:t.pkValue}})}))],1)],1),t._v(" "),o("el-col",{attrs:{xl:4,lg:6}},[o("el-button",{attrs:{size:"small",type:"primary",loading:t.loading,icon:"el-icon-search"},on:{click:function(e){t.search()}}},[t._v(t._s(t.$t("common.search")))])],1)],1)],1),t._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.routintList}},[o("el-table-column",{attrs:{align:"center",prop:"type",label:t.$t("common.type")}}),t._v(" "),o("el-table-column",{attrs:{align:"center",prop:"condition",label:t.$t("common.condition")}}),t._v(" "),o("el-table-column",{attrs:{width:"80",label:t.$t("common.operation"),fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-pencil-square-o"},on:{click:function(o){t.routingDelete(e)}}},[t._v("删除")])]}}])})],1),t._v(" "),o("div",{staticClass:"block"},[o("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",background:"",total:t.totalPage},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),o("el-dialog",{attrs:{title:"添加全局路由",visible:t.popBox,width:"40%",center:""},on:{close:function(e){t.cancel()},"update:visible":function(e){t.popBox=e}}},[o("el-form",{ref:"popForm",attrs:{model:t.popForm,"label-width":"120px",size:"small","status-icon":"",rules:t.inputRules}},[o("el-row",[o("el-col",{attrs:{span:24}},[o("el-form-item",{attrs:{label:t.$t("redis.redisCluster.clusterName")+"：",prop:"zkClusterId"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:t.$t("common.pleaseChoose")},model:{value:t.popForm.zkClusterId,callback:function(e){t.$set(t.popForm,"zkClusterId",e)},expression:"popForm.zkClusterId"}},t._l(t.clusterOption,function(t){return o("el-option",{key:t.id,attrs:{label:t.pkDesc,value:t.pkValue}})}))],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:24}},[o("el-form-item",{attrs:{label:t.$t("common.type")+"：",prop:"type"}},[o("el-input",{attrs:{type:"text",placeholder:"请输入1-50位字符",maxlength:"50",clearable:""},model:{value:t.popForm.type,callback:function(e){t.$set(t.popForm,"type","string"==typeof e?e.trim():e)},expression:"popForm.type"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:24}},[o("el-form-item",{attrs:{label:t.$t("common.condition")+"：",prop:"condition"}},[o("el-input",{attrs:{type:"text",placeholder:"请输入1-50位字符",maxlength:"50",clearable:""},model:{value:t.popForm.condition,callback:function(e){t.$set(t.popForm,"condition","string"==typeof e?e.trim():e)},expression:"popForm.condition"}})],1)],1)],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{loading:t.loading,type:"primary",size:"small"},on:{click:function(e){t.popOk()}}},[t._v(t._s(t.$t("common.ok")))]),t._v(" "),o("el-button",{attrs:{disabled:t.loading,size:"small"},on:{click:function(e){t.cancel()}}},[t._v(t._s(t.$t("common.cancel")))])],1)],1)],1)},staticRenderFns:[]};var m=o("VU/8")(p,d,!1,function(t){o("cPXL")},"data-v-3483f1f6",null);e.default=m.exports}});