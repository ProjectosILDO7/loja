import{_ as x,U as C,r as p,o as b,L as g,M as h,N as r,V as y,aM as q,f as a,aN as v,Y as d,aO as _,Q as w,q as Q,O as A}from"./index.c57e1df5.js";import{Q as P}from"./QForm.57222d6e.js";import{Q as k}from"./QPage.39b9a795.js";import{Q as L,a as N}from"./QLayout.031ceddd.js";import{n as B}from"./notify.09de74ef.js";import{u as E}from"./use-quasar.ccf7ad9b.js";import{db as u}from"./localbase.0d6b512d.js";import{_ as M}from"./favicon.6b46435c.js";const S={name:"form-login",setup(){const{notifyError:n,notifySuccess:t}=B(),f=E(),s=C(),i=p(!1),c=p({email:"",password:"",router:s}),e=()=>{s.push({name:"crietCount"})};return b(async()=>{try{const o=await u.collection("users").get().then(m=>m.filter(l=>l.acesso=="admin"));console.log(o),o.length>0?i.value=!1:i.value=!0}catch(o){console.log(o.message)}}),{form:c,userLogin:async()=>{try{f.loading.show();const o=await u.collection("users").get().then(m=>m.filter(l=>l.email==c.value.email));if(o.length>0&&o[0].status==1)(await u.collection("users").get().then(l=>l.filter(V=>V.password==c.value.password))).length>0?(y.set("loja",o[0].name),y.set("acesso",o[0].acesso),s.push({name:"admin"}),t("Acesso permitido")):n("A senha que digitou est\xE1 errada...!"),console.log(o);else{n("Acesso negado, ou precisas de permiss\xE3o do Administrador...!");return}}catch(o){n(o.message)}finally{q.hide()}},crieteCount:e,isAdmin:i}}},j=d("p",{class:"col-12 text-h5 text-center q-mt-lg"},[d("img",{src:M,style:{"max-width":"300px"}})],-1),U={class:"col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm"};function I(n,t,f,s,i,c){return g(),h(L,null,{default:r(()=>[a(N,null,{default:r(()=>[a(k,{padding:""},{default:r(()=>[a(P,{class:"row justify-center",onSubmit:v(s.userLogin,["prevent"])},{default:r(()=>[j,d("div",U,[a(_,{dense:"",outlined:"",modelValue:s.form.email,"onUpdate:modelValue":t[0]||(t[0]=e=>s.form.email=e),label:"E-mail",class:"col-12","lazy-rules":"",rules:[e=>e&&e.length>0||"Porfavor digite seu e-mail"]},{prepend:r(()=>[a(w,{name:"mdi-at"})]),_:1},8,["modelValue","rules"]),a(_,{outlined:"",dense:"",modelValue:s.form.password,"onUpdate:modelValue":t[1]||(t[1]=e=>s.form.password=e),label:"Senha",type:"password",class:"col-12",rules:[e=>e!==null&&e!==""||"Porfavor digite sua senha",e=>e>0&&e>=6||"A sua senha deve ter maior ou igual a 6 caracteres"]},{prepend:r(()=>[a(w,{name:"mdi-lock"})]),_:1},8,["modelValue","rules"]),a(Q,{type:"submit",label:"Entrar",class:"full-width q-mt-lg",glossy:"",color:"primary",icon:"mdi-login","no-caps":""}),s.isAdmin?(g(),h(Q,{key:0,flat:"",label:"Criar conta na loja",class:"full-width q-mt-lg",color:"secondary",icon:"mdi-account-tie","no-caps":"",onClick:s.crieteCount},null,8,["onClick"])):A("",!0)])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})}var K=x(S,[["render",I]]);export{K as default};
