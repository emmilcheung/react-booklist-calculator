(this["webpackJsonpexpense-track"]=this["webpackJsonpexpense-track"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),l=n.n(c),u=(n(13),function(){return r.a.createElement("h2",null,"Expense Tracker")}),o=n(2),i=n(7),m=n(4),s=function(e,t){switch(t.type){case"DELETE_TRANSACTION":return Object(m.a)({},e,{transactions:e.transactions.filter((function(e){return e.id!==t.payload}))});case"ADD_TRANSACTION":return Object(m.a)({},e,{transactions:[t.payload].concat(Object(i.a)(e.transactions))});case"CHANGE_DISCOUNT":return Object(m.a)({},e,{discount:t.payload});default:return e}},d={transactions:[{id:1,text:"Flower",amount:-20},{id:2,text:"Salary",amount:300},{id:3,text:"Book",amount:-10},{id:4,text:"Camera",amount:150},{id:5,text:"Camera",amount:150},{id:6,text:"Camera",amount:150},{id:7,text:"Camera",amount:150},{id:8,text:"Camera",amount:150},{id:9,text:"Camera",amount:150},{id:10,text:"Camera",amount:150},{id:11,text:"Camera",amount:150}],discount:0},E=Object(a.createContext)(d),f=function(e){var t=e.children,n=Object(a.useReducer)(s,d),c=Object(o.a)(n,2),l=c[0],u=c[1];return r.a.createElement(E.Provider,{value:{transactions:l.transactions,discount:l.discount,deleteTransaction:function(e){u({type:"DELETE_TRANSACTION",payload:e})},addTransaction:function(e){u({type:"ADD_TRANSACTION",payload:e})},changeDiscount:function(e){u({type:"CHANGE_DISCOUNT",payload:e})}}},t)},p=function(){var e=Object(a.useContext)(E),t=e.transactions,n=e.discount,c=t.map((function(e){return e.amount})).reduce((function(e,t){return e+t}),0).toFixed(2);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,"Your Balance"),r.a.createElement("h1",null,"$",c*(1-n)))},b=function(){var e=Object(a.useContext)(E),t=e.transactions,n=e.discount,c=t.map((function(e){return e.amount})),l=c.filter((function(e){return e>0})).reduce((function(e,t){return e+t*(1-n)}),0).toFixed(2),u=c.filter((function(e){return e<0})).reduce((function(e,t){return e+t*(1-n)}),0).toFixed(2);return r.a.createElement("div",{className:"inc-exp-container"},r.a.createElement("div",null,r.a.createElement("h4",null,"Income"),r.a.createElement("p",{className:"money plus"},"+$",l)),r.a.createElement("div",null,r.a.createElement("h4",null,"Expense"),r.a.createElement("p",{className:"money minus"},"-$",u)))},x=function(e){var t=e.transaction,n=Object(a.useContext)(E),c=n.discount,l=n.deleteTransaction,u=t.amount<0?"-":"+";return r.a.createElement("li",{className:t.amount>0?"plus":"minus"},t.text," ",r.a.createElement("span",null,u,"$",Math.abs(t.amount*(1-c))),r.a.createElement("button",{onClick:function(){return l(t.id)},className:"delete-btn"},"x"))},C=function(){var e=Object(a.useContext)(E),t=e.transactions,n=e.changeDiscount;return r.a.createElement(r.a.Fragment,null,"  ",r.a.createElement("div",null,r.a.createElement("h3",null,"\u66f8\u672c"),r.a.createElement("button",{onClick:function(){return n(0)},className:"discont-btn"},"-0%"),r.a.createElement("button",{onClick:function(){return n(.05)},className:"discont-btn"},"-5%"),r.a.createElement("button",{onClick:function(){return n(.09)},className:"discont-btn"},"-9%")),r.a.createElement("ul",{className:"list"},t.map((function(e){return r.a.createElement(x,{key:e.id,transaction:e})}))))},v=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(0),u=Object(o.a)(l,2),i=u[0],m=u[1],s=Object(a.useContext)(E).addTransaction;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Add new transaction"),r.a.createElement("form",{id:"form",onSubmit:function(e){e.preventDefault();var t={id:Math.floor(1e8*Math.random()),text:n,amount:+i};s(t)}},r.a.createElement("div",{className:"form-control"},r.a.createElement("label",{htmlFor:"text"},"Text"),r.a.createElement("input",{type:"text",value:n,onChange:function(e){return c(e.target.value)},placeholder:"Enter text..."})),r.a.createElement("div",{className:"form-control"},r.a.createElement("label",{htmlFor:"amount"},"Amount ",r.a.createElement("br",null),"(negative - expense, positive - income)"),r.a.createElement("input",{type:"number",value:i,onChange:function(e){return m(e.target.value)},placeholder:"Enter amount..."})),r.a.createElement("button",{className:"btn"},"Add transaction")))};n(14);var N=function(){return r.a.createElement(f,null,r.a.createElement(u,null),r.a.createElement("div",{className:"container"},r.a.createElement(p,null),r.a.createElement(b,null),r.a.createElement(C,null),r.a.createElement(v,null)))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root"))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.a8af4d02.chunk.js.map