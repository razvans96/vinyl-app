"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9761],{7423:(K,k,v)=>{v.d(k,{Uw:()=>I,dV:()=>j,fo:()=>D,xz:()=>u});var l=v(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var a=(()=>((a=a||{}).Unimplemented="UNIMPLEMENTED",a.Unavailable="UNAVAILABLE",a))();class u extends Error{constructor(e,t,o){super(e),this.message=e,this.code=t,this.data=o}}const F=n=>{var e,t,o,i,r;const c=n.CapacitorCustomPlatform||null,s=n.Capacitor||{},h=s.Plugins=s.Plugins||{},d=n.CapacitorPlatforms,O=(null===(e=null==d?void 0:d.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==c?c.name:(n=>{var e,t;return null!=n&&n.androidBridge?"android":null!==(t=null===(e=null==n?void 0:n.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(n)),oe=(null===(t=null==d?void 0:d.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==O()),ie=(null===(o=null==d?void 0:d.currentPlatform)||void 0===o?void 0:o.isPluginAvailable)||(f=>{const p=G.get(f);return!!(null!=p&&p.platforms.has(O())||Y(f))}),Y=(null===(i=null==d?void 0:d.currentPlatform)||void 0===i?void 0:i.getPluginHeader)||(f=>{var p;return null===(p=s.PluginHeaders)||void 0===p?void 0:p.find(U=>U.name===f)}),G=new Map,ue=(null===(r=null==d?void 0:d.currentPlatform)||void 0===r?void 0:r.registerPlugin)||((f,p={})=>{const U=G.get(f);if(U)return console.warn(`Capacitor plugin "${f}" already registered. Cannot register plugins twice.`),U.proxy;const L=O(),T=Y(f);let _;const fe=function(){var g=(0,l.Z)(function*(){return!_&&L in p?_=_="function"==typeof p[L]?yield p[L]():p[L]:null!==c&&!_&&"web"in p&&(_=_="function"==typeof p.web?yield p.web():p.web),_});return function(){return g.apply(this,arguments)}}(),R=g=>{let m;const b=(...w)=>{const C=fe().then(P=>{const $=((g,m)=>{var b,w;if(!T){if(g)return null===(w=g[m])||void 0===w?void 0:w.bind(g);throw new u(`"${f}" plugin is not implemented on ${L}`,a.Unimplemented)}{const C=null==T?void 0:T.methods.find(P=>m===P.name);if(C)return"promise"===C.rtype?P=>s.nativePromise(f,m.toString(),P):(P,$)=>s.nativeCallback(f,m.toString(),P,$);if(g)return null===(b=g[m])||void 0===b?void 0:b.bind(g)}})(P,g);if($){const W=$(...w);return m=null==W?void 0:W.remove,W}throw new u(`"${f}.${g}()" is not implemented on ${L}`,a.Unimplemented)});return"addListener"===g&&(C.remove=(0,l.Z)(function*(){return m()})),C};return b.toString=()=>`${g.toString()}() { [capacitor code] }`,Object.defineProperty(b,"name",{value:g,writable:!1,configurable:!1}),b},N=R("addListener"),Q=R("removeListener"),he=(g,m)=>{const b=N({eventName:g},m),w=function(){var P=(0,l.Z)(function*(){const $=yield b;Q({eventName:g,callbackId:$},m)});return function(){return P.apply(this,arguments)}}(),C=new Promise(P=>b.then(()=>P({remove:w})));return C.remove=(0,l.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield w()}),C},H=new Proxy({},{get(g,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return T?he:N;case"removeListener":return Q;default:return R(m)}}});return h[f]=H,G.set(f,{name:f,proxy:H,platforms:new Set([...Object.keys(p),...T?[L]:[]])}),H});return s.convertFileSrc||(s.convertFileSrc=f=>f),s.getPlatform=O,s.handleError=f=>n.console.error(f),s.isNativePlatform=oe,s.isPluginAvailable=ie,s.pluginMethodNoop=(f,p,U)=>Promise.reject(`${U} does not have an implementation of "${p}".`),s.registerPlugin=ue,s.Exception=u,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},j=(n=>n.Capacitor=F(n))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),D=j.registerPlugin;class I{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var o=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r);const c=function(){var h=(0,l.Z)(function*(){return o.removeListener(e,t)});return function(){return h.apply(this,arguments)}}(),s=Promise.resolve({remove:c});return Object.defineProperty(s,"remove",{value:(h=(0,l.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield c()}),function(){return h.apply(this,arguments)})}),s;var h}removeAllListeners(){var e=this;return(0,l.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const o=this.listeners[e];o&&o.forEach(i=>i(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:o=>{this.notifyListeners(t,o)}}}unimplemented(e="not implemented"){return new j.Exception(e,a.Unimplemented)}unavailable(e="not available"){return new j.Exception(e,a.Unavailable)}removeListener(e,t){var o=this;return(0,l.Z)(function*(){const i=o.listeners[e];if(!i)return;const r=i.indexOf(t);o.listeners[e].splice(r,1),o.listeners[e].length||o.removeWindowListener(o.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const V=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),J=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class X extends I{getCookies(){return(0,l.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(o=>{if(o.length<=0)return;let[i,r]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=J(i).trim(),r=J(r).trim(),t[i]=r}),t})()}setCookie(e){return(0,l.Z)(function*(){try{const t=V(e.key),o=V(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,r=(e.path||"/").replace("path=",""),c=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${o||""}${i}; path=${r}; ${c};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,l.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,l.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,l.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}D("CapacitorCookies",{web:()=>new X});const q=function(){var n=(0,l.Z)(function*(e){return new Promise((t,o)=>{const i=new FileReader;i.onload=()=>{const r=i.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},i.onerror=r=>o(r),i.readAsDataURL(e)})});return function(t){return n.apply(this,arguments)}}();class re extends I{request(e){return(0,l.Z)(function*(){const t=((n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),i=((n={})=>{const e=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,r,c)=>(i[r]=n[e[c]],i),{})})(n.headers)["content-type"]||"";if("string"==typeof n.data)t.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[c,s]of Object.entries(n.data||{}))r.set(c,s);t.body=r.toString()}else if(i.includes("multipart/form-data")){const r=new FormData;if(n.data instanceof FormData)n.data.forEach((s,h)=>{r.append(h,s)});else for(const s of Object.keys(n.data))r.append(s,n.data[s]);t.body=r;const c=new Headers(t.headers);c.delete("content-type"),t.headers=c}else(i.includes("application/json")||"object"==typeof n.data)&&(t.body=JSON.stringify(n.data));return t})(e,e.webFetchExtra),o=((n,e=!0)=>n?Object.entries(n).reduce((o,i)=>{const[r,c]=i;let s,h;return Array.isArray(c)?(h="",c.forEach(d=>{s=e?encodeURIComponent(d):d,h+=`${r}=${s}&`}),h.slice(0,-1)):(s=e?encodeURIComponent(c):c,h=`${r}=${s}`),`${o}&${h}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),i=o?`${e.url}?${o}`:e.url,r=yield fetch(i,t),c=r.headers.get("content-type")||"";let h,d,{responseType:s="text"}=r.ok?e:{};switch(c.includes("application/json")&&(s="json"),s){case"arraybuffer":case"blob":d=yield r.blob(),h=yield q(d);break;case"json":h=yield r.json();break;default:h=yield r.text()}const x={};return r.headers.forEach((O,B)=>{x[B]=O}),{data:h,headers:x,status:r.status,url:r.url}})()}get(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}D("CapacitorHttp",{web:()=>new re})},6090:(K,k,v)=>{v.d(k,{b:()=>S});const S=(0,v(7423).fo)("Geolocation",{web:()=>v.e(4561).then(v.bind(v,4561)).then(A=>new A.GeolocationWeb)})},5830:(K,k,v)=>{v.d(k,{s:()=>z});var l=v(5861),S=v(2340),A=v(3020),Z=v(3144);let z=(()=>{class E{constructor(a){this.http=a,this.apiUrl=S.N.apiUrl}getSongs(){var a=this;return(0,l.Z)(function*(){return yield(yield fetch(`${a.apiUrl}/song`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()})()}searchSongs(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/song${a}`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()})()}searchSpotifySongs(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/spotifySearch${a}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}})).json()})()}getSong(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/song/${a}`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()})()}postSong(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/song`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},body:JSON.stringify(a)})).json()})()}deleteSong(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/song/${a}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}})).json()})()}getComments(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/song/${a}/comment`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()})()}postComment(a){var u=this;return(0,l.Z)(function*(){const y=a.song;return yield(yield fetch(`${u.apiUrl}/song/${y}/comment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json()})()}deleteComment(a){var u=this;return(0,l.Z)(function*(){return yield(yield fetch(`${u.apiUrl}/song/${a.song}/comment/${a._id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}})).json()})()}}return E.\u0275fac=function(a){return new(a||E)(A.LFG(Z.eN))},E.\u0275prov=A.Yz7({token:E,factory:E.\u0275fac,providedIn:"root"}),E})()}}]);