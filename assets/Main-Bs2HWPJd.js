import{r as t,j as n,U as r,V as l,T as o,B as c,e as d,W as g,P as x,N as e}from"./index-CTuUUjIM.js";function m(){const[s,i]=t.useState(!1),a=()=>{navigator.clipboard.writeText("SUMMER").then(()=>{i(!0),setTimeout(()=>i(!1),1500)})};return n.jsx(r,{elevation:24,sx:{my:"3rem"},style:{maxWidth:400,marginLeft:"auto",marginRight:"auto",textAlign:"center",boxShadow:"12px 12px 20px -12px rgba(58, 91, 182, 0.815)"},children:n.jsxs(l,{children:[n.jsx(o,{fontWeight:500,textAlign:"left",fontFamily:"Montserrat, sans-serif",children:"Use Promo Code"}),n.jsx(o,{variant:"h5",component:"h2",fontFamily:"Montserrat, sans-serif",m:"10px 0",fontWeight:800,sx:{background:"#ffffff",borderRadius:"5px",border:"2px solid"},color:"#1569bd",children:"SUMMER"}),n.jsx(o,{fontFamily:"Montserrat, sans-serif",marginBottom:2,fontWeight:500,children:"Only this summer get a 25% discount on all products!"}),n.jsx(c,{variant:"contained",color:"primary",onClick:a,children:s?"Copied!":"Copy Code"})]})})}function h(){const s=d(i=>i.auth.isLoggedIn);return n.jsxs(n.Fragment,{children:[n.jsx(g,{to:"/main"}),n.jsx(o,{className:"page-title",variant:"h2",children:"Main page"}),n.jsx(m,{}),n.jsxs(x,{className:"main-links",elevation:24,children:[n.jsx(e,{color:"second",className:"login-link",to:"/catalog",children:"Catalog"}),s&&n.jsx(e,{className:"login-link",to:"/profile",children:"Profile"}),!s&&n.jsxs(n.Fragment,{children:[n.jsx(e,{className:"login-link",to:"/signup",children:"Sign Up"}),n.jsx(e,{className:"login-link",to:"/signin",children:"Sign In"})]}),n.jsx(e,{className:"login-link",to:"/about-us",children:"About us"}),n.jsx(e,{className:"login-link",to:"/signininin",children:"404"})]})]})}export{h as default};
