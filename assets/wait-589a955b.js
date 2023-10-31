import{d as f,e as l,f as z,g as _,h as g,i as S,j as y,k as u,l as $,m as B,n as a,p as N,T as R,s as T,q as V,t as I,o as b,v as P,x as p,_ as W,c as j,w as d,a as m,u as v,b as O,r as E,y as H,N as L,z as M,A}from"./index-1085d63c.js";const D=f([f("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),l("spin-container",{position:"relative"},[l("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[z()])]),l("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),l("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[_("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),l("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),l("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[_("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),K={small:20,medium:18,large:16},q=Object.assign(Object.assign({},y.props),{description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0}}),X=g({name:"Spin",props:q,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=S(e),n=y("Spin","-spin",D,T,e,o),r=u(()=>{const{size:s}=e,{common:{cubicBezierEaseInOut:c},self:h}=n.value,{opacitySpinning:x,color:w,textColor:k}=h,C=typeof s=="number"?V(s):h[I("size",s)];return{"--n-bezier":c,"--n-opacity-spinning":x,"--n-size":C,"--n-color":w,"--n-text-color":k}}),i=t?$("spin",u(()=>{const{size:s}=e;return typeof s=="number"?String(s):s[0]}),r,e):void 0;return{mergedClsPrefix:o,compitableShow:B(e,["spinning","show"]),mergedStrokeWidth:u(()=>{const{strokeWidth:s}=e;if(s!==void 0)return s;const{size:c}=e;return K[typeof c=="number"?"medium":c]}),cssVars:t?void 0:r,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e,o;const{$slots:t,mergedClsPrefix:n,description:r}=this,i=t.icon&&this.rotate,s=(r||t.description)&&a("div",{class:`${n}-spin-description`},r||((e=t.description)===null||e===void 0?void 0:e.call(t))),c=t.icon?a("div",{class:[`${n}-spin-body`,this.themeClass]},a("div",{class:[`${n}-spin`,i&&`${n}-spin--rotate`],style:t.default?"":this.cssVars},t.icon()),s):a("div",{class:[`${n}-spin-body`,this.themeClass]},a(N,{clsPrefix:n,style:t.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${n}-spin`}),s);return(o=this.onRender)===null||o===void 0||o.call(this),t.default?a("div",{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},a("div",{class:[`${n}-spin-content`,this.compitableShow&&`${n}-spin-content--spinning`]},t),a(R,{name:"fade-in-transition"},{default:()=>this.compitableShow?c:null})):c}}),Y={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},F=p("path",{d:"M400 148l-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),G=p("path",{d:"M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z",fill:"currentColor"},null,-1),J=[F,G],Q=g({name:"Reload",render:function(o,t){return b(),P("svg",Y,J)}});const U=e=>(M("data-v-67b82391"),e=e(),A(),e),Z={class:"spinClass"},ee=U(()=>p("p",null,"登入出現問題",-1)),te={__name:"wait",setup(e){return(o,t)=>{const n=H,r=L,i=X;return b(),j(i,{size:100,class:"resultClass"},{icon:d(()=>[m(n,null,{default:d(()=>[m(v(Q))]),_:1})]),description:d(()=>[p("div",Z,[ee,m(r,{onClick:t[0]||(t[0]=s=>v(E).push("/"))},{default:d(()=>[O("回首頁吧")]),_:1})])]),_:1})}}},se=W(te,[["__scopeId","data-v-67b82391"]]);export{se as default};
