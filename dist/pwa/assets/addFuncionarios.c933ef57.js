import{Q as y}from"./QSpace.fae20777.js";import{_ as w,U as Q,r as b,L as x,M as V,N as r,f as e,Y as n,q as p,$ as F,aN as v,aO as c,Q as d}from"./index.c57e1df5.js";import{Q as C}from"./QForm.57222d6e.js";import{Q as S}from"./QPage.39b9a795.js";import{Q as k,a as q}from"./QLayout.031ceddd.js";import{n as L}from"./notify.09de74ef.js";import{u as N}from"./use-quasar.ccf7ad9b.js";import{db as g}from"./localbase.0d6b512d.js";import{_ as P}from"./favicon.6b46435c.js";const B={name:"form-login",setup(){const{notifyError:l,notifySuccess:s}=L(),i=N(),a=Q(),t=b({name:"",email:"",password:""});return{form:t,userLogin:async()=>{try{if(i.loading.show(),(await g.collection("users").get().then(m=>m.filter(u=>u.email==t.value.email))).length>0){l("J\xE1 existe um su\xE1rio com estas credenciais...!");return}else{const{name:m,email:u,password:h}=t.value;await g.collection("users").add({name:m,email:u,password:h,acesso:"funcionario",status:0}),s("Conta criada com sucesso"),a.push({name:"listFuncionarios"})}}catch(f){l(f.message)}finally{i.loading.hide()}},listFuncionarios:()=>{a.push({name:"listFuncionarios"})}}}},U={class:"row"},z=n("span",{class:"text-body1"},[n("b",null,"Formul\xE1rio de registro")],-1),E=n("p",{class:"col-12 text-h5 text-center q-mt-lg"},[n("img",{src:P,style:{"max-width":"300px"}})],-1),I={class:"col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm"};function M(l,s,i,a,t,_){return x(),V(k,null,{default:r(()=>[e(q,null,{default:r(()=>[e(S,{padding:""},{default:r(()=>[n("div",U,[z,e(y),e(p,{flat:"",dense:"",size:"sm",icon:"mdi-account-group",label:"Funcionarios",onClick:a.listFuncionarios},null,8,["onClick"])]),e(F),e(C,{class:"row justify-center",onSubmit:v(a.userLogin,["prevent"])},{default:r(()=>[E,n("div",I,[e(c,{dense:"",outlined:"",modelValue:a.form.name,"onUpdate:modelValue":s[0]||(s[0]=o=>a.form.name=o),label:"Nome",class:"col-12","lazy-rules":"",rules:[o=>o&&o.length>0||"Porfavor digite seu nome"]},{prepend:r(()=>[e(d,{name:"mdi-account"})]),_:1},8,["modelValue","rules"]),e(c,{dense:"",outlined:"",modelValue:a.form.email,"onUpdate:modelValue":s[1]||(s[1]=o=>a.form.email=o),label:"E-mail",class:"col-12","lazy-rules":"",rules:[o=>o&&o.length>0||"Porfavor digite seu e-mail"]},{prepend:r(()=>[e(d,{name:"mdi-at"})]),_:1},8,["modelValue","rules"]),e(c,{outlined:"",dense:"",modelValue:a.form.password,"onUpdate:modelValue":s[2]||(s[2]=o=>a.form.password=o),label:"Senha",type:"password",class:"col-12",rules:[o=>o!==null&&o!==""||"Porfavor digite sua senha",o=>o.length>=6||"A sua senha deve ter maior ou igual a 6 caracteres"]},{prepend:r(()=>[e(d,{name:"mdi-lock"})]),_:1},8,["modelValue","rules"]),e(p,{type:"submit",label:"Criar conta do funcionario",class:"full-width q-mt-lg",glossy:"",color:"primary",icon:"mdi-account-tie","no-caps":""})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})}var K=w(B,[["render",M]]);export{K as default};