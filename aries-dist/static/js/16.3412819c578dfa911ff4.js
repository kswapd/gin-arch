webpackJsonp([16],{"+l9N":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),n=a.n(i),s=a("fZjL"),l=a.n(s),r=a("ZlkZ"),o={name:"depandence",data:function(){return{loading:!1,dependenceform:{dateTime:[(new Date).getTime()-864e5,new Date]},dependencyData:[],dialogVisible:!1,services:{},dialogData:{serviceName:"",usedBy:"",uses:""},tableTitle:"",dialogTable:!1,tableData:[]}},computed:{timeHorizon:function(){return this.dependenceform.dateTime&&this.dependenceform.dateTime.length>0?{startTs:new Date(this.dependenceform.dateTime[0]).getTime(),endTs:new Date(this.dependenceform.dateTime[1]).getTime()}:null}},watch:{},mounted:function(){},methods:{analysis:function(){if(this.timeHorizon){var e=this.conmmonMethods.makeDate(this.timeHorizon);0!==e&&void 0!==e&&null!==e||(e=1e3),this.getData(e,this.timeHorizon)}else this.$message({message:"不能为空",type:"warning"})},checkTable:function(e){var t=this,a=e.parent,i=e.child;this.tableTitle=a+" - > "+i,l()(this.dependencyData).forEach(function(e){t.dependencyData[e].parent===a&&t.dependencyData[e].child===i&&(t.tableData=[{key:t.$t("zipkin.NumberOfCalls"),value:t.dependencyData[e].callCount},{key:t.$t("zipkin.NumberOfErrors"),value:t.dependencyData[e].errorCount||0}])}),this.dialogVisible=!1,this.dialogTable=!0},getData:function(e,t){var a=this;this.loading=!0,this.$axios.get(r.a.zipkinDependence,{params:{endTs:t.endTs,lookback:e}}).then(function(e){if(!e.length>0||void 0===e||null===e)return a.loading=!1,a.$message({type:"warning",message:"无数据"}),!1;a.dependencyData=e;var t=e.sort(function(e,t){return e.parent-t.parent||e.child-t.child});a.services={};var i={item:[],link:[]};t.forEach(function(e){var t=e.parent,n=e.child,s=e.callCount;a.services[t]=a.services[t]||{serviceName:t,uses:[],usedBy:[]},a.services[n]=a.services[n]||{serviceName:n,uses:[],usedBy:[]},a.services[t].uses.push(n),a.services[n].usedBy.push(t),i.item.push({name:t,draggable:!0}),i.item.push({name:n,draggable:!0}),i.link.push({source:t,target:n,value:s})}),i.item=a.deleteObject(i.item),a.echartsHandle(a.$refs.zipEcharts,i),a.loading=!1,window.addEventListener("resize",function(){a.echartsHandle(a.$refs.zipEcharts,i)})}).catch(function(e){a.loading=!1,a.$message.error(e&&e.data&&e.data.message||"ERROR")})},echartsHandle:function(e,t){var a=this,i=t.item,n=t.link,s={title:{},backgroundColor:"#f5f5f5",tooltip:{},textStyle:{color:"#000000",fontSize:12},animationDuration:1e3,animationEasingUpdate:"quinticInOut",series:[{type:"graph",layout:"force",roam:!0,draggable:!0,edgeSymbol:["circle","arrow"],edgeSymbolSize:[4,8],cursor:"pointer",edgeLabel:{normal:{textStyle:{fontSize:20}}},force:{repulsion:1e3,edgeLength:130},itemStyle:{normal:{color:"rgba(128, 128, 128, 0.2)",borderWidth:1,borderColor:"#000"}},lineStyle:{normal:{width:1,color:"#000000"}},label:{normal:{show:!0,textStyle:{}}},data:i.map(function(e){return e.symbol="rect",e.symbolSize=[8*e.name.length,25],e}),links:n.map(function(e){return e})}]};this.$echarts.init(e).on("click",function(e){a.dialogData=a.services[e.data.name],a.dialogVisible=!0}),this.$echarts.init(e).setOption(s),this.$echarts.init(e).resize()},deleteObject:function(e){var t=[];return(e=e.map(function(e){return n()(e)})).forEach(function(e){-1===t.indexOf(e)&&t.push(e)}),t=t.map(function(e){return JSON.parse(e)})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"depandence"},[a("div",{staticClass:"button-group"},[a("span",{staticClass:"route-name"},[e._v(e._s(e.$route.meta.title))])]),e._v(" "),a("div",{staticClass:"header"},[a("el-form",{ref:"dependenceform",attrs:{model:e.dependenceform,"label-width":"82px","label-position":"left",size:"small"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{xl:8,lg:12}},[a("el-form-item",{attrs:{label:"时间范围："}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetimerange","range-separator":"-","start-placeholder":e.$t("common.startDate"),"end-placeholder":e.$t("common.endDate")},model:{value:e.dependenceform.dateTime,callback:function(t){e.$set(e.dependenceform,"dateTime",t)},expression:"dependenceform.dateTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{xl:4,lg:6}},[a("el-button",{attrs:{type:"primary",size:"small",loading:e.loading},on:{click:e.analysis}},[e._v(e._s(e.$t("zipkin.analyzeDependency")))])],1)],1)],1)],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"main"},[a("div",{ref:"zipEcharts",staticClass:"zipEcharts"})]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible,width:"60%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.dialogData.serviceName))])]),e._v(" "),a("div",{staticClass:"zipkinDialog"},[a("el-row",[a("el-col",{attrs:{span:12}},[e._v(e._s(e.$t("zipkin.usedBy")))]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v(e._s(e.$t("zipkin.uses")))])],1),e._v(" "),a("el-row",{staticClass:"content"},[a("el-col",{attrs:{span:12}},[0===e.dialogData.usedBy.length?a("el-button",{attrs:{type:"text",disabled:""}},[e._v(e._s(e.$t("zipkin.empty")))]):e._e(),e._v(" "),e._l(e.dialogData.usedBy,function(t){return a("el-button",{key:t.id,attrs:{type:"text"},on:{click:function(a){e.checkTable({parent:t,child:e.dialogData.serviceName})}}},[e._v(e._s(t))])})],2),e._v(" "),a("el-col",{attrs:{span:12}},[0===e.dialogData.uses.length?a("el-button",{attrs:{type:"text",disabled:""}},[e._v(e._s(e.$t("zipkin.empty")))]):e._e(),e._v(" "),e._l(e.dialogData.uses,function(t){return a("el-button",{key:t.id,attrs:{type:"text"},on:{click:function(a){e.checkTable({child:t,parent:e.dialogData.serviceName})}}},[e._v(e._s(t))])})],2)],1)],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogTable,width:"60%"},on:{"update:visible":function(t){e.dialogTable=t}}},[a("span",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.tableTitle))])]),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"24px"},attrs:{stripe:"",data:e.tableData}},[a("el-table-column",{attrs:{align:"center",prop:"key",label:e.$t("zipkin.key")}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"value",label:e.$t("zipkin.value")}})],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,d,!1,function(e){a("J2Pm")},"data-v-e5813b70",null);t.default=c.exports},J2Pm:function(e,t){}});