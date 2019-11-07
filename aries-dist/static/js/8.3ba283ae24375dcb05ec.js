webpackJsonp([8],{"70GT":function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=n("Dd8w"),a=n.n(e),i=n("NYxO"),o=n("EErm"),r=n.n(o),c={UP:"check",RESTRICTED:"exclamation",OUT_OF_SERVICE:"ban",DOWN:"times-circle",OFFLINE:"minus-circle",UNKNOWN:"question-circle"},l={UP:"正常",RESTRICTED:"限制",OUT_OF_SERVICE:"停止",DOWN:"故障",OFFLINE:"离线",UNKNOWN:"未知"},u={components:{sbaTimeAgo:{props:{date:{type:null,default:null}},data:function(){return{now:r.a.now(),timer:null}},computed:{timeAgo:function(){return r()(this.date).short(!0,this.now)}},created:function(){var t=this;this.timer=window.setInterval(function(){t.now=r.a.now()},1e3)},render:function(){return this._v(this.timeAgo)},beforeDestroy:function(){this.timer&&window.clearInterval(this.timer)}}},props:{status:{type:String,default:"UNKNOWN"},date:{type:null,default:null}},computed:{icon:function(){return c[this.status]},iconText:function(){return l[this.status]}}},p={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"application-status"},[n("i",{staticClass:"application-status__icon fa",class:["application-status__icon--"+t.status,"fa-"+t.icon]},[n("span",{staticClass:"status-text",domProps:{textContent:t._s(t.iconText)}})]),t._v(" "),t.date?n("small",[n("sba-time-ago",{attrs:{date:t.date}})],1):t._e()])},staticRenderFns:[]};var d={data:function(){return{activeNames:0}},components:{sbaStatus:n("VU/8")(u,p,!1,function(t){n("S5yu")},null,null).exports},computed:a()({},Object(i.d)({instanceList:function(t){return t.application.instanceList}}),{applicationsCount:function(){return this.instanceList.length},instancesCount:function(){return this.instanceList.reduce(function(t,s){return t+s.instances.length},0)},downCount:function(){return this.instanceList.reduce(function(t,s){return t+s.instances.filter(function(t){return"UP"!==t.statusInfo.status}).length},0)}}),created:function(){this.getApplication()},methods:a()({},Object(i.b)("application",["getApplication"]),{viewInstance:function(t){this.$router.push({name:"instance",params:{id:t.id}})}})},v={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"application-main"},[n("div",{staticClass:"button-group"},[n("span",{staticClass:"route-name"},[t._v(t._s(t.$route.meta.title))])]),t._v(" "),n("el-row",{attrs:{gutter:20}},[n("el-col",{staticClass:"text-center",attrs:{lg:6,xl:4}},[n("div",{staticClass:"overview"},[n("span",[t._v("应用")]),n("i",{domProps:{textContent:t._s(t.applicationsCount)}},[t._v("1")])])]),t._v(" "),n("el-col",{staticClass:"text-center",attrs:{lg:6,xl:4}},[n("div",{staticClass:"overview instance"},[n("span",[t._v("实例")]),n("i",{domProps:{textContent:t._s(t.instancesCount)}},[t._v("1")])])]),t._v(" "),n("el-col",{attrs:{lg:6,xl:4}},[n("div",{staticClass:"overview config-up"},[n("div",[n("p",{staticClass:"heading"},[t._v("实例正常")]),t._v(" "),n("p",{staticClass:"title has-text-danger",domProps:{textContent:t._s(t.instancesCount-t.downCount)}})])])]),t._v(" "),n("el-col",{staticClass:"text-center",attrs:{lg:6,xl:4}},[n("div",{staticClass:"overview config-down"},[n("div",[n("p",{staticClass:"heading"},[t._v("实例停止/故障")]),t._v(" "),n("p",{staticClass:"title has-text-danger",domProps:{textContent:t._s(t.downCount)}})])])])],1),t._v(" "),n("el-collapse",{staticClass:"mt-20",attrs:{accordion:""},model:{value:t.activeNames,callback:function(s){t.activeNames=s},expression:"activeNames"}},t._l(t.instanceList,function(s,e){return n("el-collapse-item",{key:e,attrs:{name:e}},[n("template",{slot:"title"},[n("el-row",{staticClass:"header-row"},[n("div",{staticClass:"application-header",class:{"application-bg":t.activeNames===e}},[t._v(t._s(s.name))])])],1),t._v(" "),n("ul",{staticClass:"application-list"},t._l(s.instances,function(s,e){return n("li",{key:e,on:{click:function(n){t.viewInstance(s)}}},[n("el-row",{attrs:{gutter:10}},[n("el-col",{staticClass:"list-status",attrs:{span:18}},[n("sba-status",{attrs:{status:s.statusInfo.status,date:s.statusTimestamp}}),t._v(" "),n("a",{staticClass:"instance-link",attrs:{target:"_blank",href:s.registration.serviceUrl||s.registration.healthUrl},domProps:{textContent:t._s(s.registration.serviceUrl||s.registration.healthUrl)},on:{click:function(t){t.stopPropagation()}}}),t._v(" "),n("span",{staticClass:"is-muted",domProps:{textContent:t._s(s.id)}})],1),t._v(" "),n("el-col",{staticClass:"list-version",attrs:{span:6}},[t._v(t._s(s.buildVersion))])],1)],1)}))],2)}))],1)},staticRenderFns:[]};var f=n("VU/8")(d,v,!1,function(t){n("z80F")},null,null);s.default=f.exports},EErm:function(t,s,n){var e,a;(function(){var i;i=function(t){var s;return s=function(s,n){var e,a,i;if(n=n||t(),i=null,null,(e=Math.abs(this.diff(n)))<6e4)i="seconds";else if(e<36e5)i="minutes";else if(e<864e5)i="hours";else{if(!(e<6048e5))return this.year()!=n.year()?this.format("MMM D, YYYY"):this.format("MMM D");i="days"}return a=Math.max(1,t.duration(e)[i]())+i.charAt(0),s||(a=t.localeData().pastFuture(this.diff(n),a)),a},t.fn.short=function(t,n){return s.call(this,t,n)},t},e=[n("PJh5")],void 0===(a=function(t){return this.moment=i(t)}.apply(s,e))||(t.exports=a)}).call(this)},S5yu:function(t,s){},z80F:function(t,s){}});