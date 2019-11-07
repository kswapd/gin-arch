webpackJsonp([23],{vDlP:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i("INCx"),r=i.n(l),a=i("mvHQ"),o=i.n(a),s=i("woOf"),n=i.n(s),m=i("ZlkZ"),p={name:"serviceLimit",data:function(){return{that:this,currentPage:1,totalPage:0,loading:!1,limitForm:{},inputRules:{url:[{required:!0,message:"请输入ip端口",trigger:"blur"},{pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,message:"输入值必须为IP+端口"}],serverid:[{required:!0,message:"请输入服务名",trigger:"blur"}],type:[{required:!0,message:"请输入限制类型",trigger:"blur"}],value:[{required:!0,message:"请输入限制值",trigger:"blur"}],starttime:[{required:!0,message:"请输入限制开始时间",trigger:"blur"}],endtime:[{required:!0,message:"请输入限制结束时间",trigger:"blur"}],limittime:[{required:!0,message:"请输入限制时间",trigger:"blur"}],limitcount:[{required:!0,message:"请输入限制次数",trigger:"blur"}]},dataBox:[],limitList:[],popBox:!1,popForm:{}}},methods:{handleCurrentChange:function(e){this.currentPage=e,this.limitList=this.dataBox[this.currentPage-1]},search:function(){var e=this,t=n()({},JSON.parse(o()(this.limitForm))),i=t.url;if(!i)return this.$message({message:"值不能为空",type:"waring"}),!1;this.loading=!0,this.$axios({method:"post",url:m.a.serviceLimitFind,data:t}).then(function(t){var l=JSON.parse(o()(t.data)).map(function(e){return e.url=i,e});e.totalPage=l.length,e.dataBox=e.conmmonMethods.arrayHandle(l),e.limitList=e.dataBox[e.currentPage-1],e.loading=!1}).catch(function(t){e.loading=!1,e.totalPage=0,e.dataBox=[],e.currentPage=1,e.limitList=[],e.$message.error(t&&t.data&&t.data.message||"ERROR")})},handleAdd:function(){this.popForm={starttime:new Date,endtime:new Date},this.popBox=!0},popOk:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var i=t.popForm,l=i.serverid,r=i.type,a=i.value,o=i.starttime,s=i.endtime,p=i.limittime,c=i.limitcount,u=i.url;o=o.getTime(),s=s.getTime();var d=n()({},{serverid:l,type:r,value:a,starttime:o,endtime:s,limittime:p,limitcount:c,url:u});t.loading=!0,t.$axios({method:"post",url:m.a.serviceLimitAdd,data:d}).then(function(e){t.$message({message:"新增成功",type:"success"}),t.popBox=!1,t.limitForm.url=d.url,t.search()}).catch(function(e){t.loading=!1,t.$message.error(e&&e.data&&e.data.message||"ERROR")})}else t.$message({showClose:!0,message:"带*不能为空",type:"warning"})})},cancel:function(){this.$refs.popForm.resetFields(),this.popBox=!1},LimitDelete:function(e){var t=this;this.conmmonMethods.makePopBox(this,"删除").then(function(){var i=JSON.parse(o()(e.row)),l=i.serverid,r=i.type,a=i.value,s=i.starttime,p=i.endtime,c=i.limittime,u=i.limitcount,d=i.url,g=n()({},{serverid:l,type:r,value:a,starttime:s,endtime:p,limittime:c,limitcount:u,url:d});t.loading=!0,t.$axios({method:"post",url:m.a.serviceLimitDelete,data:g}).then(function(e){t.$message({message:"删除成功",type:"success"}),t.limitForm.url=g.url,t.search()}).catch(function(e){t.loading=!1,t.$message.error(e&&e.data&&e.data.message||"ERROR")})})}},filters:{timeHandle:function(e,t){return t.$moment(r()(e)).format("YYYY-MM-DD HH:mm:ss")}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"serviceLimit"},[i("div",{staticClass:"button-group"},[i("span",{staticClass:"route-name"},[e._v(e._s(e.$route.meta.title))]),e._v(" "),i("el-button",{attrs:{icon:"el-icon-plus",size:"small",type:"warning"},on:{click:function(t){e.handleAdd()}}},[e._v(e._s(e.$t("common.add")))])],1),e._v(" "),i("el-form",{ref:"limitForm",attrs:{model:e.limitForm,"label-width":"114px","label-position":"left",size:"small",rules:e.inputRules}},[i("el-row",{staticClass:"label-first",attrs:{gutter:20}},[i("el-col",{attrs:{xl:4,lg:6}},[i("el-form-item",{attrs:{label:e.$t("service.limit.url")+"：",prop:"url"}},[i("el-input",{attrs:{type:"text",clearable:"",placeholder:"eg:ip:port",maxlength:"25"},model:{value:e.limitForm.url,callback:function(t){e.$set(e.limitForm,"url","string"==typeof t?t.trim():t)},expression:"limitForm.url"}})],1)],1),e._v(" "),i("el-col",{attrs:{xl:4,lg:6}},[i("el-button",{attrs:{size:"small",type:"primary",loading:e.loading,icon:"el-icon-search"},on:{click:function(t){e.search()}}},[e._v(e._s(e.$t("common.search")))])],1)],1)],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.limitList}},[i("el-table-column",{attrs:{align:"center","min-width":"300",prop:"serverid",label:e.$t("service.serviceList.serviceName")}}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"type",label:e.$t("service.limit.type")}}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"value",label:e.$t("service.limit.value")}}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"starttime",label:e.$t("service.limit.starttime")},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n               "+e._s(e._f("timeHandle")(t.row.starttime,e.that))+"\n           ")]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"endtime",label:e.$t("service.limit.endtime")},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n               "+e._s(e._f("timeHandle")(t.row.endtime,e.that))+"\n           ")]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"limittime",label:e.$t("service.limit.limittime")+"(秒)"}}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"limitcount",label:e.$t("service.limit.limitcount")}}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"url",label:e.$t("service.limit.url")}}),e._v(" "),i("el-table-column",{attrs:{width:"80",label:e.$t("common.operation"),fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",size:"mini",icon:"fa fa-pencil-square-o"},on:{click:function(i){e.LimitDelete(t)}}},[e._v(e._s(e.$t("common.delete")))])]}}])})],1),e._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",background:"",total:e.totalPage},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),i("el-dialog",{attrs:{title:"添加服务限流",visible:e.popBox,width:"35%",center:""},on:{close:function(t){e.cancel()},"update:visible":function(t){e.popBox=t}}},[i("el-form",{ref:"popForm",attrs:{model:e.popForm,"label-width":"120px",size:"small","status-icon":"",rules:e.inputRules}},[i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.serviceList.serviceName")+"：",prop:"serverid"}},[i("el-input",{attrs:{type:"text",placeholder:"eg:MBSD_GA-1400-0101",maxlength:"100",clearable:""},model:{value:e.popForm.serverid,callback:function(t){e.$set(e.popForm,"serverid","string"==typeof t?t.trim():t)},expression:"popForm.serverid"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.type")+"：",prop:"type"}},[i("el-input",{attrs:{type:"text",placeholder:"eg:sourceType",maxlength:"50",clearable:""},model:{value:e.popForm.type,callback:function(t){e.$set(e.popForm,"type","string"==typeof t?t.trim():t)},expression:"popForm.type"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.value")+"：",prop:"value"}},[i("el-input",{attrs:{type:"text",placeholder:"eg:MA",maxlength:"50",clearable:""},model:{value:e.popForm.value,callback:function(t){e.$set(e.popForm,"value","string"==typeof t?t.trim():t)},expression:"popForm.value"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.starttime")+"：",prop:"starttime"}},[i("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.popForm.starttime,callback:function(t){e.$set(e.popForm,"starttime",t)},expression:"popForm.starttime"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.endtime")+"：",prop:"endtime"}},[i("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.popForm.endtime,callback:function(t){e.$set(e.popForm,"endtime",t)},expression:"popForm.endtime"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.limittime")+"：",prop:"limittime"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入1-50位字符",maxlength:"50",clearable:""},model:{value:e.popForm.limittime,callback:function(t){e.$set(e.popForm,"limittime","string"==typeof t?t.trim():t)},expression:"popForm.limittime"}},[i("template",{slot:"append"},[e._v("seconds")])],2)],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.limitcount")+"：",prop:"limitcount"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入1-25位字符",maxlength:"25",clearable:""},model:{value:e.popForm.limitcount,callback:function(t){e.$set(e.popForm,"limitcount","string"==typeof t?t.trim():t)},expression:"popForm.limitcount"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:e.$t("service.limit.url")+"：",prop:"url",placeholder:"for example：10.7.94.147:8012"}},[i("el-input",{attrs:{type:"text",placeholder:"eg:ip:port",maxlength:"25",clearable:""},model:{value:e.popForm.url,callback:function(t){e.$set(e.popForm,"url","string"==typeof t?t.trim():t)},expression:"popForm.url"}})],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",size:"small",loading:e.loading},on:{click:function(t){e.popOk("popForm")}}},[e._v(e._s(e.$t("common.ok")))]),e._v(" "),i("el-button",{attrs:{size:"small",disabled:e.loading},on:{click:function(t){e.cancel()}}},[e._v(e._s(e.$t("common.cancel")))])],1)],1)],1)},staticRenderFns:[]};var u=i("VU/8")(p,c,!1,function(e){i("wn7l")},"data-v-89719afc",null);t.default=u.exports},wn7l:function(e,t){}});