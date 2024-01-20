import{k as he,c as u,h as p,l as ge,u as $e,m as Ge,r as w,n as Ke,p as Xe,w as h,o as Y,Q as De,q as K,g as Le,t as Je,v as Ye,x as Ze,y as ea,z as aa,A as ta,i as na,B as re,C as oa,D as la,E as ia,G as Ce,H as ra,I as X,J as _e,K as ua,d as Me,_ as be,L as k,M as $,N as f,f as d,O as ve,P as I,R as me,S as sa,U as da,V as F,W as ue,X as se,Y as Ae,Z as de,$ as ca,a0 as fa,F as va,a1 as ma}from"./index.c57e1df5.js";import{Q as ha,a as ga,b as ba}from"./QHeader.18eaaf96.js";import{Q as wa,a as z,b as x,c as J,d as qe}from"./QMenu.12cb183b.js";import{T as ce,u as ya}from"./useBrand.fee1d003.js";import{b as G}from"./format.609662aa.js";import{Q as ka,a as Ba}from"./QLayout.031ceddd.js";import{C as fe}from"./ClosePopup.28eb8411.js";import{db as pa}from"./localbase.0d6b512d.js";import{u as we}from"./use-quasar.ccf7ad9b.js";var Ca=he({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:i}){const o=u(()=>{const c=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(s=>e[s]===!0).map(s=>`q-btn-group--${s}`).join(" ");return`q-btn-group row no-wrap${c.length!==0?" "+c:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>p("div",{class:o.value},ge(i.default))}});const _a=Object.keys($e),qa=e=>_a.reduce((i,o)=>{const c=e[o];return c!==void 0&&(i[o]=c),i},{});var Sa=he({name:"QBtnDropdown",props:{...$e,...Ge,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:i,emit:o}){const{proxy:c}=Le(),s=w(e.modelValue),r=w(null),C=Ke(),B=u(()=>{const l={"aria-expanded":s.value===!0?"true":"false","aria-haspopup":"true","aria-controls":C,"aria-label":e.toggleAriaLabel||c.$q.lang.label[s.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(l["aria-disabled"]="true"),l}),M=u(()=>"q-btn-dropdown__arrow"+(s.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),_=u(()=>Xe(e)),t=u(()=>qa(e));h(()=>e.modelValue,l=>{r.value!==null&&r.value[l?"show":"hide"]()}),h(()=>e.split,P);function T(l){s.value=!0,o("beforeShow",l)}function q(l){o("show",l),o("update:modelValue",!0)}function A(l){s.value=!1,o("beforeHide",l)}function m(l){o("hide",l),o("update:modelValue",!1)}function Q(l){o("click",l)}function g(l){Je(l),P(),o("click",l)}function v(l){r.value!==null&&r.value.toggle(l)}function N(l){r.value!==null&&r.value.show(l)}function P(l){r.value!==null&&r.value.hide(l)}return Object.assign(c,{show:N,hide:P,toggle:v}),Y(()=>{e.modelValue===!0&&N()}),()=>{const l=[p(De,{class:M.value,name:e.dropdownIcon||c.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&l.push(p(wa,{ref:r,id:C,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:T,onShow:q,onBeforeHide:A,onHide:m},i.default)),e.split===!1?p(K,{class:"q-btn-dropdown q-btn-dropdown--simple",...t.value,...B.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:Q},{default:()=>ge(i.label,[]).concat(l),loading:i.loading}):p(Ca,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,..._.value,glossy:e.glossy,stretch:e.stretch},()=>[p(K,{class:"q-btn-dropdown--current",...t.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:g},{default:i.label,loading:i.loading}),p(K,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...B.value,..._.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>l)])}}});const Se=150;var $a=he({name:"QDrawer",inheritAttrs:!1,props:{...Ye,...Ze,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...ea,"onLayout","miniState"],setup(e,{slots:i,emit:o,attrs:c}){const s=Le(),{proxy:{$q:r}}=s,C=aa(e,r),{preventBodyScroll:B}=ua(),{registerTimeout:M,removeTimeout:_}=ta(),t=na(oa,re);if(t===re)return console.error("QDrawer needs to be child of QLayout"),re;let T,q=null,A;const m=w(e.behavior==="mobile"||e.behavior!=="desktop"&&t.totalWidth.value<=e.breakpoint),Q=u(()=>e.mini===!0&&m.value!==!0),g=u(()=>Q.value===!0?e.miniWidth:e.width),v=w(e.showIfAbove===!0&&m.value===!1?!0:e.modelValue===!0),N=u(()=>e.persistent!==!0&&(m.value===!0||Pe.value===!0));function P(a,n){if(Qe(),a!==!1&&t.animate(),y(0),m.value===!0){const b=t.instances[E.value];b!==void 0&&b.belowBreakpoint===!0&&b.hide(!1),D(1),t.isContainer.value!==!0&&B(!0)}else D(0),a!==!1&&oe(!1);M(()=>{a!==!1&&oe(!0),n!==!0&&o("show",a)},Se)}function l(a,n){Te(),a!==!1&&t.animate(),D(0),y(V.value*g.value),le(),n!==!0?M(()=>{o("hide",a)},Se):_()}const{show:Z,hide:W}=la({showing:v,hideOnRouteChange:N,handleShow:P,handleHide:l}),{addToHistory:Qe,removeFromHistory:Te}=ia(v,W,N),R={belowBreakpoint:m,hide:W},S=u(()=>e.side==="right"),V=u(()=>(r.lang.rtl===!0?-1:1)*(S.value===!0?1:-1)),ye=w(0),O=w(!1),ee=w(!1),ke=w(g.value*V.value),E=u(()=>S.value===!0?"left":"right"),ae=u(()=>v.value===!0&&m.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:g.value:0),te=u(()=>e.overlay===!0||e.miniToOverlay===!0||t.view.value.indexOf(S.value?"R":"L")>-1||r.platform.is.ios===!0&&t.isContainer.value===!0),H=u(()=>e.overlay===!1&&v.value===!0&&m.value===!1),Pe=u(()=>e.overlay===!0&&v.value===!0&&m.value===!1),Ve=u(()=>"fullscreen q-drawer__backdrop"+(v.value===!1&&O.value===!1?" hidden":"")),Oe=u(()=>({backgroundColor:`rgba(0,0,0,${ye.value*.4})`})),Be=u(()=>S.value===!0?t.rows.value.top[2]==="r":t.rows.value.top[0]==="l"),Ie=u(()=>S.value===!0?t.rows.value.bottom[2]==="r":t.rows.value.bottom[0]==="l"),xe=u(()=>{const a={};return t.header.space===!0&&Be.value===!1&&(te.value===!0?a.top=`${t.header.offset}px`:t.header.space===!0&&(a.top=`${t.header.size}px`)),t.footer.space===!0&&Ie.value===!1&&(te.value===!0?a.bottom=`${t.footer.offset}px`:t.footer.space===!0&&(a.bottom=`${t.footer.size}px`)),a}),Ne=u(()=>{const a={width:`${g.value}px`,transform:`translateX(${ke.value}px)`};return m.value===!0?a:Object.assign(a,xe.value)}),We=u(()=>"q-drawer__content fit "+(t.isContainer.value!==!0?"scroll":"overflow-auto")),He=u(()=>`q-drawer q-drawer--${e.side}`+(ee.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(C.value===!0?" q-drawer--dark q-dark":"")+(O.value===!0?" no-transition":v.value===!0?"":" q-layout--prevent-focus")+(m.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${Q.value===!0?"mini":"standard"}`+(te.value===!0||H.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(Be.value===!0?" q-drawer--top-padding":""))),Fe=u(()=>{const a=r.lang.rtl===!0?e.side:E.value;return[[ce,Ee,void 0,{[a]:!0,mouse:!0}]]}),je=u(()=>{const a=r.lang.rtl===!0?E.value:e.side;return[[ce,pe,void 0,{[a]:!0,mouse:!0}]]}),ze=u(()=>{const a=r.lang.rtl===!0?E.value:e.side;return[[ce,pe,void 0,{[a]:!0,mouse:!0,mouseAllDir:!0}]]});function ne(){Ue(m,e.behavior==="mobile"||e.behavior!=="desktop"&&t.totalWidth.value<=e.breakpoint)}h(m,a=>{a===!0?(T=v.value,v.value===!0&&W(!1)):e.overlay===!1&&e.behavior!=="mobile"&&T!==!1&&(v.value===!0?(y(0),D(0),le()):Z(!1))}),h(()=>e.side,(a,n)=>{t.instances[n]===R&&(t.instances[n]=void 0,t[n].space=!1,t[n].offset=0),t.instances[a]=R,t[a].size=g.value,t[a].space=H.value,t[a].offset=ae.value}),h(t.totalWidth,()=>{(t.isContainer.value===!0||document.qScrollPrevented!==!0)&&ne()}),h(()=>e.behavior+e.breakpoint,ne),h(t.isContainer,a=>{v.value===!0&&B(a!==!0),a===!0&&ne()}),h(t.scrollbarWidth,()=>{y(v.value===!0?0:void 0)}),h(ae,a=>{L("offset",a)}),h(H,a=>{o("onLayout",a),L("space",a)}),h(S,()=>{y()}),h(g,a=>{y(),ie(e.miniToOverlay,a)}),h(()=>e.miniToOverlay,a=>{ie(a,g.value)}),h(()=>r.lang.rtl,()=>{y()}),h(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(Re(),t.animate())}),h(Q,a=>{o("miniState",a)});function y(a){a===void 0?Ce(()=>{a=v.value===!0?0:g.value,y(V.value*a)}):(t.isContainer.value===!0&&S.value===!0&&(m.value===!0||Math.abs(a)===g.value)&&(a+=V.value*t.scrollbarWidth.value),ke.value=a)}function D(a){ye.value=a}function oe(a){const n=a===!0?"remove":t.isContainer.value!==!0?"add":"";n!==""&&document.body.classList[n]("q-body--drawer-toggle")}function Re(){q!==null&&clearTimeout(q),s.proxy&&s.proxy.$el&&s.proxy.$el.classList.add("q-drawer--mini-animate"),ee.value=!0,q=setTimeout(()=>{q=null,ee.value=!1,s&&s.proxy&&s.proxy.$el&&s.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Ee(a){if(v.value!==!1)return;const n=g.value,b=G(a.distance.x,0,n);if(a.isFinal===!0){b>=Math.min(75,n)===!0?Z():(t.animate(),D(0),y(V.value*n)),O.value=!1;return}y((r.lang.rtl===!0?S.value!==!0:S.value)?Math.max(n-b,0):Math.min(0,b-n)),D(G(b/n,0,1)),a.isFirst===!0&&(O.value=!0)}function pe(a){if(v.value!==!0)return;const n=g.value,b=a.direction===e.side,U=(r.lang.rtl===!0?b!==!0:b)?G(a.distance.x,0,n):0;if(a.isFinal===!0){Math.abs(U)<Math.min(75,n)===!0?(t.animate(),D(1),y(0)):W(),O.value=!1;return}y(V.value*U),D(G(1-U/n,0,1)),a.isFirst===!0&&(O.value=!0)}function le(){B(!1),oe(!0)}function L(a,n){t.update(e.side,a,n)}function Ue(a,n){a.value!==n&&(a.value=n)}function ie(a,n){L("size",a===!0?e.miniWidth:n)}return t.instances[e.side]=R,ie(e.miniToOverlay,g.value),L("space",H.value),L("offset",ae.value),e.showIfAbove===!0&&e.modelValue!==!0&&v.value===!0&&e["onUpdate:modelValue"]!==void 0&&o("update:modelValue",!0),Y(()=>{o("onLayout",H.value),o("miniState",Q.value),T=e.showIfAbove===!0;const a=()=>{(v.value===!0?P:l)(!1,!0)};if(t.totalWidth.value!==0){Ce(a);return}A=h(t.totalWidth,()=>{A(),A=void 0,v.value===!1&&e.showIfAbove===!0&&m.value===!1?Z(!1):a()})}),ra(()=>{A!==void 0&&A(),q!==null&&(clearTimeout(q),q=null),v.value===!0&&le(),t.instances[e.side]===R&&(t.instances[e.side]=void 0,L("size",0),L("offset",0),L("space",!1))}),()=>{const a=[];m.value===!0&&(e.noSwipeOpen===!1&&a.push(X(p("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Fe.value)),a.push(_e("div",{ref:"backdrop",class:Ve.value,style:Oe.value,"aria-hidden":"true",onClick:W},void 0,"backdrop",e.noSwipeBackdrop!==!0&&v.value===!0,()=>ze.value)));const n=Q.value===!0&&i.mini!==void 0,b=[p("div",{...c,key:""+n,class:[We.value,c.class]},n===!0?i.mini():ge(i.default))];return e.elevated===!0&&v.value===!0&&b.push(p("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),a.push(_e("aside",{ref:"content",class:He.value,style:Ne.value},b,"contentclose",e.noSwipeClose!==!0&&m.value===!0,()=>je.value)),p("div",{class:"q-drawer-container"},a)}}});const Da=Me({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},routeName:{type:String,default:""},icon:{type:String,default:""}}});function La(e,i,o,c,s,r){return k(),$(J,{clickable:"",to:{name:e.routeName},exact:""},{default:f(()=>[e.icon?(k(),$(z,{key:0,avatar:""},{default:f(()=>[d(De,{name:e.icon},null,8,["name"])]),_:1})):ve("",!0),d(z,null,{default:f(()=>[d(x,null,{default:f(()=>[I(me(e.title),1)]),_:1}),d(x,{caption:""},{default:f(()=>[I(me(e.caption),1)]),_:1})]),_:1})]),_:1},8,["to"])}var Ma=be(Da,[["render",La]]);const j=w({name:"",phone:"",primary:"",secondary:""});function Aa(){const e=we(),{setBrand:i}=ya();return{getBrand:async()=>{e.loading.show();const c=await pa.collection("config").get();return c.length>0&&(j.value=c[0],i(j.value.primary,j.value.secondary)),e.loading.hide(),j},brand:j}}const Qa={setup(){const e=w(!1),i=we();return h(e,o=>{i.dark.set(o),i.localStorage.set("darkMode",o)}),Y(()=>{i.localStorage.getItem("darkMode")&&(e.value=!0)}),{darkmode:e}}};function Ta(e,i,o,c,s,r){return k(),$(sa,{modelValue:c.darkmode,"onUpdate:modelValue":i[0]||(i[0]=C=>c.darkmode=C),"checked-icon":"mdi-moon-waxing-crescent",color:"black","unchecked-icon":"mdi-white-balance-sunning"},null,8,["modelValue"])}var Pa=be(Qa,[["render",Ta]]);const Va=[{title:"Home",caption:"Painel inicial",icon:"mdi-home",routeName:"admin"},{title:"Categorias",caption:"Cadastro de categorias de produtos",icon:"mdi-shape-plus",routeName:"categorias"},{title:"Produtos",caption:"Cadastro de produtos",icon:"mdi-basket-plus",routeName:"produtos"},{title:"Vendas",caption:"Realiza vendas",icon:"mdi-cart-arrow-up",routeName:"vendas"},{title:"Vendas realizadas",caption:"Detalhes de todas as vendas",icon:"mdi-cart",routeName:"listarVendas"},{title:"Relat\xF3rios",caption:"Gerar relat\xF3rios de vendas",icon:"mdi-file-table",routeName:"relatorios"},{title:"Configura\xE7\xE3o",caption:"Configura\xE7\xF5es da loja",icon:"mdi-cog",routeName:"configs"}],Oa=Me({name:"MainLayout",components:{EssentialLink:Ma,darkmodeChange:Pa},setup(){const e=w(!1),{brand:i,getBrand:o}=Aa(),c=w(""),s=da(),r=w(!1),C=w(""),B=we();return Y(()=>{o(),F.getItem("acesso")!="admin"?(r.value=!1,c.value=F.getItem("loja")):(r.value=!0,c.value=F.getItem("loja"))}),{essentialLinks:Va,leftDrawerOpen:e,brand:i,user:c,toggleLeftDrawer(){e.value=!e.value},formConfig:()=>{s.push({name:"configs"})},addFuncionarios:()=>{s.push({name:"addFuncionarios"})},idUser:C,logoutPage:async()=>{F.getItem("loja")!=null&&(B.loading.show(),await F.clear("loja"),s.push({name:""}),location.reload(),B.loading.hide(),window.close())},acesso:r}}}),Ia={key:0},xa={class:"q-ml-sm"},Na={key:1},Wa=Ae("span",{class:"q-ml-sm"},"Loja && Stock",-1),Ha=[Wa];function Fa(e,i,o,c,s,r){const C=ue("darkmode-change"),B=ue("EssentialLink"),M=ue("router-view");return k(),$(ka,{view:"lHh Lpr lFf"},{default:f(()=>[d(ba,{elevated:""},{default:f(()=>[d(ha,null,{default:f(()=>[d(K,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),d(ga,null,{default:f(()=>[e.brand.name?(k(),se("span",Ia,[Ae("span",xa,me(e.brand.name),1)])):(k(),se("span",Na,Ha))]),_:1}),d(C),e.user&&e.$q.platform.is.desktop?(k(),$(Sa,{key:0,flat:"",icon:"person",label:e.user},{default:f(()=>[d(qe,null,{default:f(()=>[e.acesso?X((k(),$(J,{key:0,clickable:"",onClick:e.addFuncionarios},{default:f(()=>[d(z,null,{default:f(()=>[d(x,null,{default:f(()=>[d(de,{icon:"mdi-account-tie"}),I(" Funcion\xE1rios ")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[fe]]):ve("",!0),X((k(),$(J,{clickable:"",onClick:e.formConfig},{default:f(()=>[d(z,null,{default:f(()=>[d(x,null,{default:f(()=>[d(de,{icon:"mdi-cog"}),I(" Configura\xE7\xF5es")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[fe]]),d(ca),X((k(),$(J,{clickable:"",onClick:e.logoutPage},{default:f(()=>[d(z,null,{default:f(()=>[d(x,null,{default:f(()=>[d(de,{icon:"mdi-logout"}),I("Sair")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[fe]])]),_:1})]),_:1},8,["label"])):ve("",!0)]),_:1})]),_:1}),d($a,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":i[0]||(i[0]=_=>e.leftDrawerOpen=_),"show-if-above":"",bordered:""},{default:f(()=>[d(qe,null,{default:f(()=>[d(x,{header:""},{default:f(()=>[I(" Menu ")]),_:1}),(k(!0),se(va,null,fa(e.essentialLinks,_=>(k(),$(B,ma({key:_.title},_),null,16))),128))]),_:1})]),_:1},8,["modelValue"]),d(Ba,null,{default:f(()=>[d(M)]),_:1})]),_:1})}var Za=be(Oa,[["render",Fa]]);export{Za as default};
