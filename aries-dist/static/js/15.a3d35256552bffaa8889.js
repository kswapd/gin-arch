webpackJsonp([15],{JbFo:function(e,t){},"zx/1":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("woOf"),o=n.n(s),i=n("Xxa5"),r=n.n(i),a=n("exGp"),l=n.n(a),c=n("Dd8w"),u=n.n(c),m=n("NYxO"),d=n("0uvK"),f={data:function(){return{columns:[{id:"name",label:"名称"},{id:"timeout_in_milliseconds",label:"超时时间"},{id:"max_concurrent_requests",label:"最大请求数"}],fuseOptions:[],visible:!1,fuseForm:{},btnLoading:!1,modifyForm:{}}},created:function(){this.getFuse()},methods:u()({},Object(m.b)("gateway",["getOptionsKey","addFuse","deleteFuseStrategy"]),{getFuse:function(){var e=this;this.getOptionsKey("hystrix").then(function(t){e.fuseOptions=t.data})},deleteFuse:function(e){var t=this,n=this;n.$confirm("是否确认删除："+e+"？","删除",{confirmButtonText:n.$t("common.ok"),cancelButtonText:n.$t("common.cancel"),type:"warning",center:!0}).then(l()(r.a.mark(function s(){var o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.btnLoading=!0,t.next=3,n.deleteFuseStrategy(e);case 3:(o=t.sent)&&o.code===d.d&&(n.btnLoading=!1,n.close(),n.$message.success("删除熔断策略成功"),n.getFuse());case 5:case"end":return t.stop()}},s,t)}))).catch(function(){})},open:function(e){this.fuseForm=e?u()({},e):{},this.visible=!0},editConfirm:function(){var e,t=this,n=this,s=o()(n.fuseForm,{updateFlag:!0});n.$refs.fuseForm.validate((e=l()(r.a.mark(function e(o){var i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!o){e.next=13;break}return e.prev=1,n.btnLoading=!0,e.next=5,n.addFuse(s);case 5:i=e.sent,n.btnLoading=!1,i&&i.code===d.d&&(n.$message.success("修改熔断策略成功"),n.close(),n.getFuse()),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),n.btnLoading=!1;case 13:case"end":return e.stop()}},e,t,[[1,10]])})),function(t){return e.apply(this,arguments)}))},close:function(){this.visible=!1,this.$refs.fuseForm.clearValidate(),this.fuseForm={}},addConfirm:function(){var e,t=this,n=this;n.$refs.fuseForm.validate((e=l()(r.a.mark(function e(s){var o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=13;break}return n.btnLoading=!0,o="",e.prev=3,e.next=6,n.addFuse(n.fuseForm);case 6:o=e.sent,e.next=11;break;case 9:e.prev=9,e.t0=e.catch(3);case 11:n.btnLoading=!1,o&&o.code===d.d&&(n.$message.success("添加熔断策略成功"),n.close(),n.getFuse());case 13:case"end":return e.stop()}},e,t,[[3,9]])})),function(t){return e.apply(this,arguments)}))},confirm:function(){this.fuseForm.hasOwnProperty("updateFlag")?this.editConfirm():this.addConfirm()}})},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"fuse-list"},[n("div",{staticClass:"button-group"},[n("span",{staticClass:"route-name"},[e._v(e._s(e.$route.meta.title))]),e._v(" "),n("el-button",{attrs:{type:"warning",size:"small",icon:"el-icon-plus"},on:{click:function(t){e.open()}}},[e._v(e._s(e.$t("common.add")))])],1),e._v(" "),n("el-table",{attrs:{data:e.fuseOptions,border:"",stripe:""}},[e._l(e.columns,function(e){return n("el-table-column",{key:e.id,attrs:{prop:e.id,label:e.label}})}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"140",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-edit"},on:{click:function(n){e.open(t.row)}}},[e._v(e._s(e.$t("common.modify"))+"\n        ")]),e._v(" "),n("el-button",{staticClass:"btn-text-red",attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(t){e.deleteHost(e.props.row)}}},[e._v(e._s(e.$t("common.delete"))+"\n        ")])]}}])})],2),e._v(" "),n("el-dialog",{attrs:{title:"添加熔断",visible:e.visible,width:"30%",center:""},on:{"update:visible":function(t){e.visible=t},close:e.close}},[n("el-form",{ref:"fuseForm",attrs:{model:e.fuseForm,size:"small","label-width":"110px"}},[n("el-form-item",{attrs:{label:"名称：",prop:"name",rules:{required:!0,message:"熔断名称不能为空",trigger:"blur"}}},[n("el-input",{attrs:{placeholder:"配置的熔断策略名"},model:{value:e.fuseForm.name,callback:function(t){e.$set(e.fuseForm,"name",t)},expression:"fuseForm.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"超时时间：",prop:"timeout_in_milliseconds",rules:{required:!0,message:"超时时间不能为空",trigger:"blur"}}},[n("el-input",{attrs:{placeholder:"熔断判定的超时时间"},model:{value:e.fuseForm.timeout_in_milliseconds,callback:function(t){e.$set(e.fuseForm,"timeout_in_milliseconds",t)},expression:"fuseForm.timeout_in_milliseconds"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"最大请求数：",prop:"timeout_in_milliseconds",rules:{required:!0,message:"最大请求数不能为空",trigger:"blur"}}},[n("el-input",{attrs:{placeholder:"熔断判定的最大请求数"},model:{value:e.fuseForm.max_concurrent_requests,callback:function(t){e.$set(e.fuseForm,"max_concurrent_requests",t)},expression:"fuseForm.max_concurrent_requests"}})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",loading:e.btnLoading,size:"small"},on:{click:e.confirm}},[e._v("确定")]),e._v(" "),n("el-button",{attrs:{disabled:e.btnLoading,size:"small"},on:{click:e.close}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var b=n("VU/8")(f,p,!1,function(e){n("JbFo")},null,null);t.default=b.exports}});