import{d as e,s as c,l as f,k as g}from"./index-CTuUUjIM.js";async function l(a,i,s){let t;try{if(t=await e.loginUser(a,i),(t==null?void 0:t.statusCode)===200){const r=t==null?void 0:t.body.customer,n=typeof r.firstName=="string"&&typeof r.lastName=="string";s(c({user:r})),e.getActiveCart().then(o=>{o&&s(f({cart:o.body}))})}}catch(r){r instanceof Error&&g(r.message)}}export{l as s};