webpackJsonp([47],{FVuA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),l=a.n(r),s=a("woOf"),i=a.n(s),o=a("ZlkZ"),n={data:function(){return{pageNo:1,limit:10,total:0,loading:!1,idx:-1,stragetyForm:{},inputRules:{name:[{type:"string",required:!0,message:"请输入名称",trigger:"blur"}],argsName:[{required:!0,message:"请输入参数名称",trigger:"blur"}],serverName:[{required:!0,message:"请输入服务名",trigger:"blur"}],argsOper:[{required:!0,message:"请输入操作类型",trigger:"blur"}],decision:[{required:!0,message:"请输入规则",trigger:"blur"}]},tableData:[],addVisible:!1,argsOperOptions:[{value:"==",label:"=="},{value:"!=",label:"!="},{value:">=",label:">="},{value:"<=",label:"<="}],chooseType:"userDefined",listFrom:{},listFromTitle:"添加灰度策略"}},computed:{},methods:{handleCurrentChange:function(e){this.pageNo=e,this.search()},search:function(e){var t=this;this.loading=!0;var a=this.stragetyForm.name,r=i()({},{pageNo:this.pageNo,limit:this.limit,baseParam:{name:a}});this.$axios.post(o.a.coreStragetyFind,r).then(function(a){"search"===e&&t.$message.success("查询成功");var r=JSON.parse(l()(a.data));t.tableData=r.data,t.total=r.recordsTotal,t.loading=!1}).catch(function(e){t.loading=!1,t.$message.error(e&&e.data&&e.data.message||"ERROR")})},stragetyDelete:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.conmmonMethods.makePopBox(this,"删除").then(function(){t&&(e.loading=!0,e.$axios.delete("/deploy/deleteGray").then(function(t){e.$message.success("删除成功"),e.search()}).catch(function(t){e.loading=!1,e.$message.error(t&&t.data&&t.data.message||"ERROR")}))})},stragetyAddEdit:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(this.listFromTitle="修改灰度策略",this.listFrom=JSON.parse(l()(e))):(this.listFromTitle="添加灰度策略",this.chooseType="userDefined",this.listFrom={}),this.addVisible=!0},stragetySaveAddEdit:function(){var e=this,t=void 0,a=this.listFrom,r=a.name,l=a.argsName,s=a.serverName,n=a.argsOper,c=a.decision;if("添加灰度策略"===this.listFromTitle?(t=o.a.coreStragetyAdd,"regularExpression"===this.chooseType&&(n="matches")):t=o.a.coreStragetyUpdate,r&&l&&s&&n&&c){this.loading=!0;var d=i()({createUser:window.localStorage.getItem("userName")},{name:r,argsName:l,serverName:s,argsOper:n,decision:c});this.$axios.post(t,d).then(function(t){e.addVisible=!1,e.search()}).catch(function(t){e.loading=!1,e.$message.error(t&&t.data&&t.data.message||"ERROR")})}else this.$message({type:"warning",message:"带*不能为空"})},cancel:function(){this.$refs.listFrom.resetFields(),this.addVisible=!1}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"button-group"},[a("span",{staticClass:"route-name"},[e._v(e._s(e.$route.meta.title))]),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",size:"small",type:"warning"},on:{click:function(t){e.stragetyAddEdit()}}},[e._v(e._s(e.$t("common.add")))])],1),e._v(" "),a("el-form",{ref:"stragetyForm",attrs:{model:e.stragetyForm,rules:e.inputRules,"label-position":"right","status-icon":"","label-width":"54px",size:"small"}},[a("el-row",{staticClass:"label-first",attrs:{gutter:20}},[a("el-col",{attrs:{xl:4,lg:6}},[a("el-form-item",{attrs:{label:"名称："}},[a("el-input",{attrs:{type:"text",maxlength:"100",clearable:""},model:{value:e.stragetyForm.name,callback:function(t){e.$set(e.stragetyForm,"name","string"==typeof t?t.trim():t)},expression:"stragetyForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{xl:4,lg:6}},[a("el-button",{attrs:{size:"small",type:"primary",loading:e.loading,icon:"el-icon-search"},on:{click:function(t){e.search("search")}}},[e._v(e._s(e.$t("common.search")))])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData}},[a("el-table-column",{attrs:{align:"center",prop:"name",label:"名称",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"argsName",label:"参数名称",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"serverName",label:"服务名称",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"argsOper",label:"操作类型",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"decision",label:"规则"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("common.operation"),fixed:"right",width:"90",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-dropdown",{attrs:{trigger:"click"}},[a("el-button",{attrs:{type:"text",size:"mini"}},[e._v("\n              操作"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-edit"},on:{click:function(a){e.stragetyAddEdit(t.row)}}},[e._v(e._s(e.$t("common.edit")))])],1),e._v(" "),a("el-dropdown-item",[a("el-button",{staticClass:"btn-text-red",attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(a){e.stragetyDelete(t.row)}}},[e._v(e._s(e.$t("common.delete")))])],1)],1)],1)]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.upgradePageNo,"page-size":10,disabled:e.loading,layout:"total, prev, pager, next, jumper",background:"",total:e.upgradeTotal},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.upgradePageNo=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.listFromTitle,visible:e.addVisible,width:"40%",center:""},on:{close:e.cancel,"update:visible":function(t){e.addVisible=t}}},[a("el-form",{ref:"listFrom",attrs:{model:e.listFrom,rules:e.inputRules,"status-icon":"","label-width":"100px",size:"mini"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入1-50位字符",maxlength:"100",clearable:""},model:{value:e.listFrom.name,callback:function(t){e.$set(e.listFrom,"name","string"==typeof t?t.trim():t)},expression:"listFrom.name"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"服务名称",prop:"serverName"}},[a("el-input",{attrs:{type:"text",placeholder:"eg:com.dcits.MBSD_GA14000101",maxlength:"100",clearable:""},model:{value:e.listFrom.serverName,callback:function(t){e.$set(e.listFrom,"serverName","string"==typeof t?t.trim():t)},expression:"listFrom.serverName"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"参数名称",prop:"argsName"}},[a("el-input",{attrs:{type:"text",placeholder:"eg:acctNo",maxlength:"100",clearable:""},model:{value:e.listFrom.argsName,callback:function(t){e.$set(e.listFrom,"argsName","string"==typeof t?t.trim():t)},expression:"listFrom.argsName"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"",prop:"radio"}},[a("el-radio-group",{model:{value:e.chooseType,callback:function(t){e.chooseType=t},expression:"chooseType"}},[a("el-radio",{attrs:{label:"userDefined"}},[e._v("自定义")]),e._v(" "),a("el-radio",{attrs:{label:"regularExpression"}},[e._v("正则表达式")])],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:10}},["userDefined"===e.chooseType?a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"规则",prop:"argsOper"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:""},model:{value:e.listFrom.argsOper,callback:function(t){e.$set(e.listFrom,"argsOper",t)},expression:"listFrom.argsOper"}},e._l(e.argsOperOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1):e._e(),e._v(" "),a("el-col",{attrs:{span:"userDefined"===e.chooseType?12:24}},[a("el-form-item",{attrs:{label:"userDefined"===e.chooseType?"":"规则",prop:"decision","label-width":"userDefined"===e.chooseType?"0px":"100px"}},[a("el-input",{attrs:{type:"text",placeholder:"userDefined"===e.chooseType?"请输入":"eg:A-Z|a-z|0-9",maxlength:"100",clearable:""},model:{value:e.listFrom.decision,callback:function(t){e.$set(e.listFrom,"decision","string"==typeof t?t.trim():t)},expression:"listFrom.decision"}})],1)],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.stragetySaveAddEdit}},[e._v("确 定")]),e._v(" "),a("el-button",{attrs:{disabled:e.loading},on:{click:function(t){e.cancel()}}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(n,c,!1,function(e){a("nUly")},"data-v-32c9c110",null);t.default=d.exports},nUly:function(e,t){}});