import{_ as y,U as w,r as Q,L as V,M as x,N as l,aM as b,f as a,aN as L,Y as d,aO as u,Q as c,q as g}from"./index.c57e1df5.js";import{Q as C}from"./QForm.57222d6e.js";import{Q as q}from"./QPage.39b9a795.js";import{Q as v,a as P}from"./QLayout.031ceddd.js";import{n as k}from"./notify.09de74ef.js";import{u as N}from"./use-quasar.ccf7ad9b.js";import{db as p}from"./localbase.0d6b512d.js";import{_ as B}from"./favicon.6b46435c.js";const S={name:"form-login",setup(){const{notifyError:n,notifySuccess:s}=k(),f=N(),o=w(),r=Q({name:"",email:"",password:""});return{form:r,userLogin:async()=>{try{if(f.loading.show(),(await p.collection("users").get().then(i=>i.filter(m=>m.email==r.value.email))).length>0){n("J\xE1 existe um su\xE1rio com estas credenciais...!");return}else{const{name:i,email:m,password:h}=r.value;await p.collection("users").add({name:i,email:m,password:h,acesso:"admin",status:1}),s("Conta criada com sucesso"),o.push({name:"login"})}}catch(t){console.log(t.message),n(t.message)}finally{b.hide()}},goToLogin:()=>{o.push({name:"login"})}}}},U=d("p",{class:"col-12 text-h5 text-center q-mt-lg"},[d("img",{src:B,style:{"max-width":"300px"}})],-1),I={class:"col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm"};function M(n,s,f,o,r,_){return V(),x(v,null,{default:l(()=>[a(P,null,{default:l(()=>[a(q,{padding:""},{default:l(()=>[a(C,{class:"row justify-center",onSubmit:L(o.userLogin,["prevent"])},{default:l(()=>[U,d("div",I,[a(u,{dense:"",outlined:"",modelValue:o.form.name,"onUpdate:modelValue":s[0]||(s[0]=e=>o.form.name=e),label:"Nome",class:"col-12","lazy-rules":"",rules:[e=>e&&e.length>0||"Porfavor digite seu nome"]},{prepend:l(()=>[a(c,{name:"mdi-account"})]),_:1},8,["modelValue","rules"]),a(u,{dense:"",outlined:"",modelValue:o.form.email,"onUpdate:modelValue":s[1]||(s[1]=e=>o.form.email=e),label:"E-mail",class:"col-12","lazy-rules":"",rules:[e=>e&&e.length>0||"Porfavor digite seu e-mail"]},{prepend:l(()=>[a(c,{name:"mdi-at"})]),_:1},8,["modelValue","rules"]),a(u,{outlined:"",dense:"",modelValue:o.form.password,"onUpdate:modelValue":s[2]||(s[2]=e=>o.form.password=e),label:"Senha",type:"password",class:"col-12",rules:[e=>e!==null&&e!==""||"Porfavor digite sua senha",e=>e.length>=6||"A sua senha deve ter maior ou igual a 6 caracteres"]},{prepend:l(()=>[a(c,{name:"mdi-lock"})]),_:1},8,["modelValue","rules"]),a(g,{type:"submit",label:"Criar conta",class:"full-width q-mt-lg",glossy:"",color:"primary",icon:"mdi-account-tie","no-caps":""}),a(g,{flat:"",label:"Ir para o login",class:"full-width q-mt-lg",color:"secondary",icon:"mdi-login","no-caps":"",onClick:o.goToLogin},null,8,["onClick"])])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})}var R=y(S,[["render",M]]);export{R as default};
