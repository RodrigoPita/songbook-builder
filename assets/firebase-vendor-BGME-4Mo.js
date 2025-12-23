const xl=()=>{};var Mo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Ml=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Xa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,T=(o&3)<<4|l>>4;let A=(l&15)<<2|f>>6,S=f&63;h||(S=64,a||(A=64)),r.push(e[m],e[T],e[A],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Qa(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Ml(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const T=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||T==null)throw new Ll;const A=o<<2|l>>4;if(r.push(A),f!==64){const S=l<<4&240|f>>2;if(r.push(S),T!==64){const D=f<<6&192|T;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ll extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Fl=function(n){const t=Qa(n);return Xa.encodeByteArray(t,!0)},mr=function(n){return Fl(n).replace(/\./g,"")},Ul=function(n){try{return Xa.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jl=()=>Bl().__FIREBASE_DEFAULTS__,ql=()=>{if(typeof process>"u"||typeof Mo>"u")return;const n=Mo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},$l=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Ul(n[1]);return t&&JSON.parse(t)},Pr=()=>{try{return xl()||jl()||ql()||$l()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},zl=n=>Pr()?.emulatorHosts?.[n],Ya=n=>{const t=zl(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ja=()=>Pr()?.config,jg=n=>Pr()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Za(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[mr(JSON.stringify(e)),mr(JSON.stringify(a)),""].join(".")}const In={};function Gl(){const n={prod:[],emulator:[]};for(const t of Object.keys(In))In[t]?n.emulator.push(t):n.prod.push(t);return n}function Kl(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Lo=!1;function eu(n,t){if(typeof window>"u"||typeof document>"u"||!On(window.location.host)||In[n]===t||In[n]||Lo)return;In[n]=t;function e(A){return`__firebase__banner__${A}`}const r="__firebase__banner",o=Gl().prod.length>0;function a(){const A=document.getElementById(r);A&&A.remove()}function l(A){A.style.display="flex",A.style.background="#7faaf0",A.style.position="fixed",A.style.bottom="5px",A.style.left="5px",A.style.padding=".5em",A.style.borderRadius="5px",A.style.alignItems="center"}function h(A,S){A.setAttribute("width","24"),A.setAttribute("id",S),A.setAttribute("height","24"),A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.style.marginLeft="-6px"}function f(){const A=document.createElement("span");return A.style.cursor="pointer",A.style.marginLeft="16px",A.style.fontSize="24px",A.innerHTML=" &times;",A.onclick=()=>{Lo=!0,a()},A}function m(A,S){A.setAttribute("id",S),A.innerText="Learn more",A.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",A.setAttribute("target","__blank"),A.style.paddingLeft="5px",A.style.textDecoration="underline"}function T(){const A=Kl(r),S=e("text"),D=document.getElementById(S)||document.createElement("span"),k=e("learnmore"),P=document.getElementById(k)||document.createElement("a"),q=e("preprendIcon"),j=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(A.created){const U=A.element;l(U),m(P,k);const K=f();h(j,q),U.append(j,D,P,K),document.body.appendChild(U)}o?(D.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",T):T()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function qg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Js())}function Wl(){const n=Pr()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $g(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function zg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Hg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Gg(){const n=Js();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ql(){return!Wl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Xl(){try{return typeof indexedDB=="object"}catch{return!1}}function Yl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{t(s.error?.message||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl="FirebaseError";class Re extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Jl,Object.setPrototypeOf(this,Re.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,nu.prototype.create)}}class nu{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?Zl(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Re(s,l,r)}}function Zl(n,t){return n.replace(th,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const th=/\{\$([^}]+)}/g;function Kg(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Ue(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Fo(o)&&Fo(a)){if(!Ue(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Fo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wg(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Qg(n,t){const e=new eh(n,t);return e.subscribe.bind(e)}class eh{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");nh(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=ys),s.error===void 0&&(s.error=ys),s.complete===void 0&&(s.complete=ys);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function nh(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function ys(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(n){return n&&n._delegate?n._delegate:n}class Be{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Hl;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(ih(t))try{this.getOrInitializeService({instanceIdentifier:Ee})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Ee){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ee){return this.instances.has(t)}getOptions(t=Ee){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:sh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ee){return this.component?this.component.multipleInstances?t:Ee:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sh(n){return n===Ee?void 0:n}function ih(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new rh(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));const ah={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},uh=G.INFO,ch={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},lh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=ch[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ru{constructor(t){this.name=t,this._logLevel=uh,this._logHandler=lh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in G))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ah[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...t),this._logHandler(this,G.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...t),this._logHandler(this,G.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,G.INFO,...t),this._logHandler(this,G.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,G.WARN,...t),this._logHandler(this,G.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...t),this._logHandler(this,G.ERROR,...t)}}const hh=(n,t)=>t.some(e=>n instanceof e);let Uo,Bo;function fh(){return Uo||(Uo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function dh(){return Bo||(Bo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const su=new WeakMap,Vs=new WeakMap,iu=new WeakMap,Es=new WeakMap,Zs=new WeakMap;function ph(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(te(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&su.set(e,n)}).catch(()=>{}),Zs.set(t,n),t}function mh(n){if(Vs.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Vs.set(n,t)}let Ds={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Vs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||iu.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return te(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function gh(n){Ds=n(Ds)}function _h(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Ts(this),t,...e);return iu.set(r,t.sort?t.sort():[t]),te(r)}:dh().includes(n)?function(...t){return n.apply(Ts(this),t),te(su.get(this))}:function(...t){return te(n.apply(Ts(this),t))}}function yh(n){return typeof n=="function"?_h(n):(n instanceof IDBTransaction&&mh(n),hh(n,fh())?new Proxy(n,Ds):n)}function te(n){if(n instanceof IDBRequest)return ph(n);if(Es.has(n))return Es.get(n);const t=yh(n);return t!==n&&(Es.set(n,t),Zs.set(t,n)),t}const Ts=n=>Zs.get(n);function Eh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=te(a);return r&&a.addEventListener("upgradeneeded",h=>{r(te(a.result),h.oldVersion,h.newVersion,te(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const Th=["get","getKey","getAll","getAllKeys","count"],Ih=["put","add","delete","clear"],Is=new Map;function jo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Is.get(t))return Is.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Ih.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Th.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),s&&h.done]))[0]};return Is.set(t,o),o}gh(n=>({...n,get:(t,e,r)=>jo(t,e)||n.get(t,e,r),has:(t,e)=>!!jo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(vh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function vh(n){return n.getComponent()?.type==="VERSION"}const Ns="@firebase/app",qo="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t=new ru("@firebase/app"),Ah="@firebase/app-compat",Rh="@firebase/analytics-compat",bh="@firebase/analytics",Sh="@firebase/app-check-compat",Ch="@firebase/app-check",Ph="@firebase/auth",Vh="@firebase/auth-compat",Dh="@firebase/database",Nh="@firebase/data-connect",kh="@firebase/database-compat",Oh="@firebase/functions",xh="@firebase/functions-compat",Mh="@firebase/installations",Lh="@firebase/installations-compat",Fh="@firebase/messaging",Uh="@firebase/messaging-compat",Bh="@firebase/performance",jh="@firebase/performance-compat",qh="@firebase/remote-config",$h="@firebase/remote-config-compat",zh="@firebase/storage",Hh="@firebase/storage-compat",Gh="@firebase/firestore",Kh="@firebase/ai",Wh="@firebase/firestore-compat",Qh="firebase",Xh="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks="[DEFAULT]",Yh={[Ns]:"fire-core",[Ah]:"fire-core-compat",[bh]:"fire-analytics",[Rh]:"fire-analytics-compat",[Ch]:"fire-app-check",[Sh]:"fire-app-check-compat",[Ph]:"fire-auth",[Vh]:"fire-auth-compat",[Dh]:"fire-rtdb",[Nh]:"fire-data-connect",[kh]:"fire-rtdb-compat",[Oh]:"fire-fn",[xh]:"fire-fn-compat",[Mh]:"fire-iid",[Lh]:"fire-iid-compat",[Fh]:"fire-fcm",[Uh]:"fire-fcm-compat",[Bh]:"fire-perf",[jh]:"fire-perf-compat",[qh]:"fire-rc",[$h]:"fire-rc-compat",[zh]:"fire-gcs",[Hh]:"fire-gcs-compat",[Gh]:"fire-fst",[Wh]:"fire-fst-compat",[Kh]:"fire-vertex","fire-js":"fire-js",[Qh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=new Map,Jh=new Map,Os=new Map;function $o(n,t){try{n.container.addComponent(t)}catch(e){$t.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Sn(n){const t=n.name;if(Os.has(t))return $t.debug(`There were multiple attempts to register component ${t}.`),!1;Os.set(t,n);for(const e of gr.values())$o(e,n);for(const e of Jh.values())$o(e,n);return!0}function ou(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function au(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ee=new nu("app","Firebase",Zh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Be("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ee.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu=Xh;function ef(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:ks,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw ee.create("bad-app-name",{appName:String(s)});if(e||(e=Ja()),!e)throw ee.create("no-options");const o=gr.get(s);if(o){if(Ue(e,o.options)&&Ue(r,o.config))return o;throw ee.create("duplicate-app",{appName:s})}const a=new oh(s);for(const h of Os.values())a.addComponent(h);const l=new tf(e,r,a);return gr.set(s,l),l}function cu(n=ks){const t=gr.get(n);if(!t&&n===ks&&Ja())return ef();if(!t)throw ee.create("no-app",{appName:n});return t}function ne(n,t,e){let r=Yh[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),$t.warn(a.join(" "));return}Sn(new Be(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf="firebase-heartbeat-database",rf=1,Cn="firebase-heartbeat-store";let ws=null;function lu(){return ws||(ws=Eh(nf,rf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Cn)}catch(e){console.warn(e)}}}}).catch(n=>{throw ee.create("idb-open",{originalErrorMessage:n.message})})),ws}async function sf(n){try{const e=(await lu()).transaction(Cn),r=await e.objectStore(Cn).get(hu(n));return await e.done,r}catch(t){if(t instanceof Re)$t.warn(t.message);else{const e=ee.create("idb-get",{originalErrorMessage:t?.message});$t.warn(e.message)}}}async function zo(n,t){try{const r=(await lu()).transaction(Cn,"readwrite");await r.objectStore(Cn).put(t,hu(n)),await r.done}catch(e){if(e instanceof Re)$t.warn(e.message);else{const r=ee.create("idb-set",{originalErrorMessage:e?.message});$t.warn(r.message)}}}function hu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of=1024,af=30;class uf{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new lf(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ho();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:e}),this._heartbeatsCache.heartbeats.length>af){const s=hf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){$t.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ho(),{heartbeatsToSend:e,unsentEntries:r}=cf(this._heartbeatsCache.heartbeats),s=mr(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return $t.warn(t),""}}}function Ho(){return new Date().toISOString().substring(0,10)}function cf(n,t=of){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Go(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Go(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class lf{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xl()?Yl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await sf(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return zo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return zo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Go(n){return mr(JSON.stringify({version:2,heartbeats:n})).length}function hf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ff(n){Sn(new Be("platform-logger",t=>new wh(t),"PRIVATE")),Sn(new Be("heartbeat",t=>new uf(t),"PRIVATE")),ne(Ns,qo,n),ne(Ns,qo,"esm2020"),ne("fire-js","")}ff("");var Ko=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var re,fu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function _(){}_.prototype=p.prototype,E.F=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(I,y,v){for(var g=Array(arguments.length-2),At=2;At<arguments.length;At++)g[At-2]=arguments[At];return p.prototype[y].apply(I,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,_){_||(_=0);const I=Array(16);if(typeof p=="string")for(var y=0;y<16;++y)I[y]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(y=0;y<16;++y)I[y]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],y=E.g[2];let v=E.g[3],g;g=p+(v^_&(y^v))+I[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[1]+3905402710&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[2]+606105819&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[3]+3250441966&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(v^_&(y^v))+I[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[5]+1200080426&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[6]+2821735955&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[7]+4249261313&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(v^_&(y^v))+I[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[9]+2336552879&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[10]+4294925233&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[11]+2304563134&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(v^_&(y^v))+I[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[13]+4254626195&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[14]+2792965006&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[15]+1236535329&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(y^v&(_^y))+I[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[6]+3225465664&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[11]+643717713&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[0]+3921069994&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^v&(_^y))+I[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[10]+38016083&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[15]+3634488961&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[4]+3889429448&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^v&(_^y))+I[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[14]+3275163606&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[3]+4107603335&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[8]+1163531501&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^v&(_^y))+I[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[2]+4243563512&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[7]+1735328473&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[12]+2368359562&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(_^y^v)+I[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[8]+2272392833&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[11]+1839030562&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[14]+4259657740&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^v)+I[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[4]+1272893353&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[7]+4139469664&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[10]+3200236656&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^v)+I[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[0]+3936430074&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[3]+3572445317&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[6]+76029189&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^v)+I[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[12]+3873151461&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[15]+530742520&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[2]+3299628645&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(y^(_|~v))+I[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[7]+1126891415&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[14]+2878612391&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[5]+4237533241&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~v))+I[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[3]+2399980690&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[10]+4293915773&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[1]+2240044497&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~v))+I[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[15]+4264355552&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[6]+2734768916&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[13]+1309151649&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~v))+I[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[11]+3174756917&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[2]+718787259&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+v&4294967295}r.prototype.v=function(E,p){p===void 0&&(p=E.length);const _=p-this.blockSize,I=this.C;let y=this.h,v=0;for(;v<p;){if(y==0)for(;v<=_;)s(this,E,v),v+=this.blockSize;if(typeof E=="string"){for(;v<p;)if(I[y++]=E.charCodeAt(v++),y==this.blockSize){s(this,I),y=0;break}}else for(;v<p;)if(I[y++]=E[v++],y==this.blockSize){s(this,I),y=0;break}}this.h=y,this.o+=p},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)E[p++]=this.g[_]>>>I&255;return E};function o(E,p){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function a(E,p){this.h=p;const _=[];let I=!0;for(let y=E.length-1;y>=0;y--){const v=E[y]|0;I&&v==p||(_[y]=v,I=!1)}this.g=_}var l={};function h(E){return-128<=E&&E<128?o(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return T;if(E<0)return P(f(-E));const p=[];let _=1;for(let I=0;E>=_;I++)p[I]=E/_|0,_*=4294967296;return new a(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return P(m(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=f(Math.pow(p,8));let I=T;for(let v=0;v<E.length;v+=8){var y=Math.min(8,E.length-v);const g=parseInt(E.substring(v,v+y),p);y<8?(y=f(Math.pow(p,y)),I=I.j(y).add(f(g))):(I=I.j(_),I=I.add(f(g)))}return I}var T=h(0),A=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(k(this))return-P(this).m();let E=0,p=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);E+=(I>=0?I:4294967296+I)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(k(this))return"-"+P(this).toString(E);const p=f(Math.pow(E,6));var _=this;let I="";for(;;){const y=K(_,p).g;_=q(_,y.j(p));let v=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=y,D(_))return v+I;for(;v.length<6;)v="0"+v;I=v+I}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function k(E){return E.h==-1}n.l=function(E){return E=q(this,E),k(E)?-1:D(E)?0:1};function P(E){const p=E.g.length,_=[];for(let I=0;I<p;I++)_[I]=~E.g[I];return new a(_,~E.h).add(A)}n.abs=function(){return k(this)?P(this):this},n.add=function(E){const p=Math.max(this.g.length,E.g.length),_=[];let I=0;for(let y=0;y<=p;y++){let v=I+(this.i(y)&65535)+(E.i(y)&65535),g=(v>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);I=g>>>16,v&=65535,g&=65535,_[y]=g<<16|v}return new a(_,_[_.length-1]&-2147483648?-1:0)};function q(E,p){return E.add(P(p))}n.j=function(E){if(D(this)||D(E))return T;if(k(this))return k(E)?P(this).j(P(E)):P(P(this).j(E));if(k(E))return P(this.j(P(E)));if(this.l(S)<0&&E.l(S)<0)return f(this.m()*E.m());const p=this.g.length+E.g.length,_=[];for(var I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let y=0;y<E.g.length;y++){const v=this.i(I)>>>16,g=this.i(I)&65535,At=E.i(y)>>>16,de=E.i(y)&65535;_[2*I+2*y]+=g*de,j(_,2*I+2*y),_[2*I+2*y+1]+=v*de,j(_,2*I+2*y+1),_[2*I+2*y+1]+=g*At,j(_,2*I+2*y+1),_[2*I+2*y+2]+=v*At,j(_,2*I+2*y+2)}for(E=0;E<p;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=p;E<2*p;E++)_[E]=0;return new a(_,0)};function j(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function U(E,p){this.g=E,this.h=p}function K(E,p){if(D(p))throw Error("division by zero");if(D(E))return new U(T,T);if(k(E))return p=K(P(E),p),new U(P(p.g),P(p.h));if(k(p))return p=K(E,P(p)),new U(P(p.g),p.h);if(E.g.length>30){if(k(E)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var _=A,I=p;I.l(E)<=0;)_=at(_),I=at(I);var y=tt(_,1),v=tt(I,1);for(I=tt(I,2),_=tt(_,2);!D(I);){var g=v.add(I);g.l(E)<=0&&(y=y.add(_),v=g),I=tt(I,1),_=tt(_,1)}return p=q(E,y.j(p)),new U(y,p)}for(y=T;E.l(p)>=0;){for(_=Math.max(1,Math.floor(E.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),v=f(_),g=v.j(p);k(g)||g.l(E)>0;)_-=I,v=f(_),g=v.j(p);D(v)&&(v=A),y=y.add(v),E=q(E,g)}return new U(y,E)}n.B=function(E){return K(this,E).h},n.and=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)&E.i(I);return new a(_,this.h&E.h)},n.or=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)|E.i(I);return new a(_,this.h|E.h)},n.xor=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)^E.i(I);return new a(_,this.h^E.h)};function at(E){const p=E.g.length+1,_=[];for(let I=0;I<p;I++)_[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(_,E.h)}function tt(E,p){const _=p>>5;p%=32;const I=E.g.length-_,y=[];for(let v=0;v<I;v++)y[v]=p>0?E.i(v+_)>>>p|E.i(v+_+1)<<32-p:E.i(v+_);return new a(y,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,fu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,re=a}).apply(typeof Ko<"u"?Ko:typeof self<"u"?self:typeof window<"u"?window:{});var er=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var du,yn,pu,cr,xs,mu,gu,_u;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof er=="object"&&er];for(var u=0;u<i.length;++u){var c=i[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,u){if(u)t:{var c=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var w=i[d];if(!(w in c))break t;c=c[w]}i=i[i.length-1],d=c[i],u=u(d),u!=d&&u!=null&&t(c,i,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(u){var c=[],d;for(d in u)Object.prototype.hasOwnProperty.call(u,d)&&c.push([d,u[d]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,c){return i.call.apply(i.bind,arguments)}function f(i,u,c){return f=h,f.apply(null,arguments)}function m(i,u){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function T(i,u){function c(){}c.prototype=u.prototype,i.Z=u.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(d,w,R){for(var V=Array(arguments.length-2),B=2;B<arguments.length;B++)V[B-2]=arguments[B];return u.prototype[w].apply(d,V)}}var A=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function S(i){const u=i.length;if(u>0){const c=Array(u);for(let d=0;d<u;d++)c[d]=i[d];return c}return[]}function D(i,u){for(let d=1;d<arguments.length;d++){const w=arguments[d];var c=typeof w;if(c=c!="object"?c:w?Array.isArray(w)?"array":c:"null",c=="array"||c=="object"&&typeof w.length=="number"){c=i.length||0;const R=w.length||0;i.length=c+R;for(let V=0;V<R;V++)i[c+V]=w[V]}else i.push(w)}}class k{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function P(i){a.setTimeout(()=>{throw i},0)}function q(){var i=E;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class j{constructor(){this.h=this.g=null}add(u,c){const d=U.get();d.set(u,c),this.h?this.h.next=d:this.g=d,this.h=d}}var U=new k(()=>new K,i=>i.reset());class K{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let at,tt=!1,E=new j,p=()=>{const i=Promise.resolve(void 0);at=()=>{i.then(_)}};function _(){for(var i;i=q();){try{i.h.call(i.g)}catch(c){P(c)}var u=U;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}tt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var v=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};a.addEventListener("test",c,u),a.removeEventListener("test",c,u)}catch{}return i})();function g(i){return/^[\s\xa0]*$/.test(i)}function At(i,u){y.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}T(At,y),At.prototype.init=function(i,u){const c=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(c=="mouseover"?u=i.fromElement:c=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&At.Z.h.call(this)},At.prototype.h=function(){At.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var de="closure_listenable_"+(Math.random()*1e6|0),rl=0;function sl(i,u,c,d,w){this.listener=i,this.proxy=null,this.src=u,this.type=c,this.capture=!!d,this.ha=w,this.key=++rl,this.da=this.fa=!1}function Bn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function jn(i,u,c){for(const d in i)u.call(c,i[d],d,i)}function il(i,u){for(const c in i)u.call(void 0,i[c],c,i)}function Oi(i){const u={};for(const c in i)u[c]=i[c];return u}const xi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Mi(i,u){let c,d;for(let w=1;w<arguments.length;w++){d=arguments[w];for(c in d)i[c]=d[c];for(let R=0;R<xi.length;R++)c=xi[R],Object.prototype.hasOwnProperty.call(d,c)&&(i[c]=d[c])}}function qn(i){this.src=i,this.g={},this.h=0}qn.prototype.add=function(i,u,c,d,w){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const V=Qr(i,u,d,w);return V>-1?(u=i[V],c||(u.fa=!1)):(u=new sl(u,this.src,R,!!d,w),u.fa=c,i.push(u)),u};function Wr(i,u){const c=u.type;if(c in i.g){var d=i.g[c],w=Array.prototype.indexOf.call(d,u,void 0),R;(R=w>=0)&&Array.prototype.splice.call(d,w,1),R&&(Bn(u),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Qr(i,u,c,d){for(let w=0;w<i.length;++w){const R=i[w];if(!R.da&&R.listener==u&&R.capture==!!c&&R.ha==d)return w}return-1}var Xr="closure_lm_"+(Math.random()*1e6|0),Yr={};function Li(i,u,c,d,w){if(Array.isArray(u)){for(let R=0;R<u.length;R++)Li(i,u[R],c,d,w);return null}return c=Bi(c),i&&i[de]?i.J(u,c,l(d)?!!d.capture:!1,w):ol(i,u,c,!1,d,w)}function ol(i,u,c,d,w,R){if(!u)throw Error("Invalid event type");const V=l(w)?!!w.capture:!!w;let B=Zr(i);if(B||(i[Xr]=B=new qn(i)),c=B.add(u,c,d,V,R),c.proxy)return c;if(d=al(),c.proxy=d,d.src=i,d.listener=c,i.addEventListener)v||(w=V),w===void 0&&(w=!1),i.addEventListener(u.toString(),d,w);else if(i.attachEvent)i.attachEvent(Ui(u.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function al(){function i(c){return u.call(i.src,i.listener,c)}const u=ul;return i}function Fi(i,u,c,d,w){if(Array.isArray(u))for(var R=0;R<u.length;R++)Fi(i,u[R],c,d,w);else d=l(d)?!!d.capture:!!d,c=Bi(c),i&&i[de]?(i=i.i,R=String(u).toString(),R in i.g&&(u=i.g[R],c=Qr(u,c,d,w),c>-1&&(Bn(u[c]),Array.prototype.splice.call(u,c,1),u.length==0&&(delete i.g[R],i.h--)))):i&&(i=Zr(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Qr(u,c,d,w)),(c=i>-1?u[i]:null)&&Jr(c))}function Jr(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[de])Wr(u.i,i);else{var c=i.type,d=i.proxy;u.removeEventListener?u.removeEventListener(c,d,i.capture):u.detachEvent?u.detachEvent(Ui(c),d):u.addListener&&u.removeListener&&u.removeListener(d),(c=Zr(u))?(Wr(c,i),c.h==0&&(c.src=null,u[Xr]=null)):Bn(i)}}}function Ui(i){return i in Yr?Yr[i]:Yr[i]="on"+i}function ul(i,u){if(i.da)i=!0;else{u=new At(u,this);const c=i.listener,d=i.ha||i.src;i.fa&&Jr(i),i=c.call(d,u)}return i}function Zr(i){return i=i[Xr],i instanceof qn?i:null}var ts="__closure_events_fn_"+(Math.random()*1e9>>>0);function Bi(i){return typeof i=="function"?i:(i[ts]||(i[ts]=function(u){return i.handleEvent(u)}),i[ts])}function _t(){I.call(this),this.i=new qn(this),this.M=this,this.G=null}T(_t,I),_t.prototype[de]=!0,_t.prototype.removeEventListener=function(i,u,c,d){Fi(this,i,u,c,d)};function It(i,u){var c,d=i.G;if(d)for(c=[];d;d=d.G)c.push(d);if(i=i.M,d=u.type||u,typeof u=="string")u=new y(u,i);else if(u instanceof y)u.target=u.target||i;else{var w=u;u=new y(d,i),Mi(u,w)}w=!0;let R,V;if(c)for(V=c.length-1;V>=0;V--)R=u.g=c[V],w=$n(R,d,!0,u)&&w;if(R=u.g=i,w=$n(R,d,!0,u)&&w,w=$n(R,d,!1,u)&&w,c)for(V=0;V<c.length;V++)R=u.g=c[V],w=$n(R,d,!1,u)&&w}_t.prototype.N=function(){if(_t.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const c=i.g[u];for(let d=0;d<c.length;d++)Bn(c[d]);delete i.g[u],i.h--}}this.G=null},_t.prototype.J=function(i,u,c,d){return this.i.add(String(i),u,!1,c,d)},_t.prototype.K=function(i,u,c,d){return this.i.add(String(i),u,!0,c,d)};function $n(i,u,c,d){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let w=!0;for(let R=0;R<u.length;++R){const V=u[R];if(V&&!V.da&&V.capture==c){const B=V.listener,ut=V.ha||V.src;V.fa&&Wr(i.i,V),w=B.call(ut,d)!==!1&&w}}return w&&!d.defaultPrevented}function cl(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function ji(i){i.g=cl(()=>{i.g=null,i.i&&(i.i=!1,ji(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class ll extends I{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ji(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function tn(i){I.call(this),this.h=i,this.g={}}T(tn,I);var qi=[];function $i(i){jn(i.g,function(u,c){this.g.hasOwnProperty(c)&&Jr(u)},i),i.g={}}tn.prototype.N=function(){tn.Z.N.call(this),$i(this)},tn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var es=a.JSON.stringify,hl=a.JSON.parse,fl=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function zi(){}function Hi(){}var en={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ns(){y.call(this,"d")}T(ns,y);function rs(){y.call(this,"c")}T(rs,y);var pe={},Gi=null;function zn(){return Gi=Gi||new _t}pe.Ia="serverreachability";function Ki(i){y.call(this,pe.Ia,i)}T(Ki,y);function nn(i){const u=zn();It(u,new Ki(u))}pe.STAT_EVENT="statevent";function Wi(i,u){y.call(this,pe.STAT_EVENT,i),this.stat=u}T(Wi,y);function wt(i){const u=zn();It(u,new Wi(u,i))}pe.Ja="timingevent";function Qi(i,u){y.call(this,pe.Ja,i),this.size=u}T(Qi,y);function rn(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function sn(){this.g=!0}sn.prototype.ua=function(){this.g=!1};function dl(i,u,c,d,w,R){i.info(function(){if(i.g)if(R){var V="",B=R.split("&");for(let Q=0;Q<B.length;Q++){var ut=B[Q].split("=");if(ut.length>1){const ht=ut[0];ut=ut[1];const kt=ht.split("_");V=kt.length>=2&&kt[1]=="type"?V+(ht+"="+ut+"&"):V+(ht+"=redacted&")}}}else V=null;else V=R;return"XMLHTTP REQ ("+d+") [attempt "+w+"]: "+u+`
`+c+`
`+V})}function pl(i,u,c,d,w,R,V){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+w+"]: "+u+`
`+c+`
`+R+" "+V})}function Pe(i,u,c,d){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+gl(i,c)+(d?" "+d:"")})}function ml(i,u){i.info(function(){return"TIMEOUT: "+u})}sn.prototype.info=function(){};function gl(i,u){if(!i.g)return u;if(!u)return null;try{const R=JSON.parse(u);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var c=R[i];if(!(c.length<2)){var d=c[1];if(Array.isArray(d)&&!(d.length<1)){var w=d[0];if(w!="noop"&&w!="stop"&&w!="close")for(let V=1;V<d.length;V++)d[V]=""}}}}return es(R)}catch{return u}}var Hn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Xi={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Yi;function ss(){}T(ss,zi),ss.prototype.g=function(){return new XMLHttpRequest},Yi=new ss;function on(i){return encodeURIComponent(String(i))}function _l(i){var u=1;i=i.split(":");const c=[];for(;u>0&&i.length;)c.push(i.shift()),u--;return i.length&&c.push(i.join(":")),c}function Gt(i,u,c,d){this.j=i,this.i=u,this.l=c,this.S=d||1,this.V=new tn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ji}function Ji(){this.i=null,this.g="",this.h=!1}var Zi={},is={};function os(i,u,c){i.M=1,i.A=Kn(Nt(u)),i.u=c,i.R=!0,to(i,null)}function to(i,u){i.F=Date.now(),Gn(i),i.B=Nt(i.A);var c=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),po(c.i,"t",d),i.C=0,c=i.j.L,i.h=new Ji,i.g=No(i.j,c?u:null,!i.u),i.P>0&&(i.O=new ll(f(i.Y,i,i.g),i.P)),u=i.V,c=i.g,d=i.ba;var w="readystatechange";Array.isArray(w)||(w&&(qi[0]=w.toString()),w=qi);for(let R=0;R<w.length;R++){const V=Li(c,w[R],d||u.handleEvent,!1,u.h||u);if(!V)break;u.g[V.key]=V}u=i.J?Oi(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),nn(),dl(i.i,i.v,i.B,i.l,i.S,i.u)}Gt.prototype.ba=function(i){i=i.target;const u=this.O;u&&Qt(i)==3?u.j():this.Y(i)},Gt.prototype.Y=function(i){try{if(i==this.g)t:{const B=Qt(this.g),ut=this.g.ya(),Q=this.g.ca();if(!(B<3)&&(B!=3||this.g&&(this.h.h||this.g.la()||Io(this.g)))){this.K||B!=4||ut==7||(ut==8||Q<=0?nn(3):nn(2)),as(this);var u=this.g.ca();this.X=u;var c=yl(this);if(this.o=u==200,pl(this.i,this.v,this.B,this.l,this.S,B,u),this.o){if(this.U&&!this.L){e:{if(this.g){var d,w=this.g;if((d=w.g?w.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var R=d;break e}}R=null}if(i=R)Pe(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,us(this,i);else{this.o=!1,this.m=3,wt(12),me(this),an(this);break t}}if(this.R){i=!0;let ht;for(;!this.K&&this.C<c.length;)if(ht=El(this,c),ht==is){B==4&&(this.m=4,wt(14),i=!1),Pe(this.i,this.l,null,"[Incomplete Response]");break}else if(ht==Zi){this.m=4,wt(15),Pe(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else Pe(this.i,this.l,ht,null),us(this,ht);if(eo(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),B!=4||c.length!=0||this.h.h||(this.m=1,wt(16),i=!1),this.o=this.o&&i,!i)Pe(this.i,this.l,c,"[Invalid Chunked Response]"),me(this),an(this);else if(c.length>0&&!this.W){this.W=!0;var V=this.j;V.g==this&&V.aa&&!V.P&&(V.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),gs(V),V.P=!0,wt(11))}}else Pe(this.i,this.l,c,null),us(this,c);B==4&&me(this),this.o&&!this.K&&(B==4?Co(this.j,this):(this.o=!1,Gn(this)))}else kl(this.g),u==400&&c.indexOf("Unknown SID")>0?(this.m=3,wt(12)):(this.m=0,wt(13)),me(this),an(this)}}}catch{}finally{}};function yl(i){if(!eo(i))return i.g.la();const u=Io(i.g);if(u==="")return"";let c="";const d=u.length,w=Qt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return me(i),an(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<d;R++)i.h.h=!0,c+=i.h.i.decode(u[R],{stream:!(w&&R==d-1)});return u.length=0,i.h.g+=c,i.C=0,i.h.g}function eo(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function El(i,u){var c=i.C,d=u.indexOf(`
`,c);return d==-1?is:(c=Number(u.substring(c,d)),isNaN(c)?Zi:(d+=1,d+c>u.length?is:(u=u.slice(d,d+c),i.C=d+c,u)))}Gt.prototype.cancel=function(){this.K=!0,me(this)};function Gn(i){i.T=Date.now()+i.H,no(i,i.H)}function no(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=rn(f(i.aa,i),u)}function as(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Gt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(ml(this.i,this.B),this.M!=2&&(nn(),wt(17)),me(this),this.m=2,an(this)):no(this,this.T-i)};function an(i){i.j.I==0||i.K||Co(i.j,i)}function me(i){as(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,$i(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function us(i,u){try{var c=i.j;if(c.I!=0&&(c.g==i||cs(c.h,i))){if(!i.L&&cs(c.h,i)&&c.I==3){try{var d=c.Ba.g.parse(u)}catch{d=null}if(Array.isArray(d)&&d.length==3){var w=d;if(w[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)Jn(c),Xn(c);else break t;ms(c),wt(18)}}else c.xa=w[1],0<c.xa-c.K&&w[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=rn(f(c.Va,c),6e3));io(c.h)<=1&&c.ta&&(c.ta=void 0)}else _e(c,11)}else if((i.L||c.g==i)&&Jn(c),!g(u))for(w=c.Ba.g.parse(u),u=0;u<w.length;u++){let Q=w[u];const ht=Q[0];if(!(ht<=c.K))if(c.K=ht,Q=Q[1],c.I==2)if(Q[0]=="c"){c.M=Q[1],c.ba=Q[2];const kt=Q[3];kt!=null&&(c.ka=kt,c.j.info("VER="+c.ka));const ye=Q[4];ye!=null&&(c.za=ye,c.j.info("SVER="+c.za));const Xt=Q[5];Xt!=null&&typeof Xt=="number"&&Xt>0&&(d=1.5*Xt,c.O=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const Yt=i.g;if(Yt){const tr=Yt.g?Yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(tr){var R=d.h;R.g||tr.indexOf("spdy")==-1&&tr.indexOf("quic")==-1&&tr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ls(R,R.h),R.h=null))}if(d.G){const _s=Yt.g?Yt.g.getResponseHeader("X-HTTP-Session-Id"):null;_s&&(d.wa=_s,X(d.J,d.G,_s))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),d=c;var V=i;if(d.na=Do(d,d.L?d.ba:null,d.W),V.L){oo(d.h,V);var B=V,ut=d.O;ut&&(B.H=ut),B.D&&(as(B),Gn(B)),d.g=V}else bo(d);c.i.length>0&&Yn(c)}else Q[0]!="stop"&&Q[0]!="close"||_e(c,7);else c.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?_e(c,7):ps(c):Q[0]!="noop"&&c.l&&c.l.qa(Q),c.A=0)}}nn(4)}catch{}}var Tl=class{constructor(i,u){this.g=i,this.map=u}};function ro(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function so(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function io(i){return i.h?1:i.g?i.g.size:0}function cs(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function ls(i,u){i.g?i.g.add(u):i.h=u}function oo(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}ro.prototype.cancel=function(){if(this.i=ao(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function ao(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const c of i.g.values())u=u.concat(c.G);return u}return S(i.i)}var uo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Il(i,u){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const d=i[c].indexOf("=");let w,R=null;d>=0?(w=i[c].substring(0,d),R=i[c].substring(d+1)):w=i[c],u(w,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Kt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof Kt?(this.l=i.l,un(this,i.j),this.o=i.o,this.g=i.g,cn(this,i.u),this.h=i.h,hs(this,mo(i.i)),this.m=i.m):i&&(u=String(i).match(uo))?(this.l=!1,un(this,u[1]||"",!0),this.o=ln(u[2]||""),this.g=ln(u[3]||"",!0),cn(this,u[4]),this.h=ln(u[5]||"",!0),hs(this,u[6]||"",!0),this.m=ln(u[7]||"")):(this.l=!1,this.i=new fn(null,this.l))}Kt.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(hn(u,co,!0),":");var c=this.g;return(c||u=="file")&&(i.push("//"),(u=this.o)&&i.push(hn(u,co,!0),"@"),i.push(on(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(hn(c,c.charAt(0)=="/"?Al:vl,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",hn(c,bl)),i.join("")},Kt.prototype.resolve=function(i){const u=Nt(this);let c=!!i.j;c?un(u,i.j):c=!!i.o,c?u.o=i.o:c=!!i.g,c?u.g=i.g:c=i.u!=null;var d=i.h;if(c)cn(u,i.u);else if(c=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var w=u.h.lastIndexOf("/");w!=-1&&(d=u.h.slice(0,w+1)+d)}if(w=d,w==".."||w==".")d="";else if(w.indexOf("./")!=-1||w.indexOf("/.")!=-1){d=w.lastIndexOf("/",0)==0,w=w.split("/");const R=[];for(let V=0;V<w.length;){const B=w[V++];B=="."?d&&V==w.length&&R.push(""):B==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),d&&V==w.length&&R.push("")):(R.push(B),d=!0)}d=R.join("/")}else d=w}return c?u.h=d:c=i.i.toString()!=="",c?hs(u,mo(i.i)):c=!!i.m,c&&(u.m=i.m),u};function Nt(i){return new Kt(i)}function un(i,u,c){i.j=c?ln(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function cn(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function hs(i,u,c){u instanceof fn?(i.i=u,Sl(i.i,i.l)):(c||(u=hn(u,Rl)),i.i=new fn(u,i.l))}function X(i,u,c){i.i.set(u,c)}function Kn(i){return X(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function ln(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function hn(i,u,c){return typeof i=="string"?(i=encodeURI(i).replace(u,wl),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function wl(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var co=/[#\/\?@]/g,vl=/[#\?:]/g,Al=/[#\?]/g,Rl=/[#\?@]/g,bl=/#/g;function fn(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function ge(i){i.g||(i.g=new Map,i.h=0,i.i&&Il(i.i,function(u,c){i.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}n=fn.prototype,n.add=function(i,u){ge(this),this.i=null,i=Ve(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(u),this.h+=1,this};function lo(i,u){ge(i),u=Ve(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function ho(i,u){return ge(i),u=Ve(i,u),i.g.has(u)}n.forEach=function(i,u){ge(this),this.g.forEach(function(c,d){c.forEach(function(w){i.call(u,w,d,this)},this)},this)};function fo(i,u){ge(i);let c=[];if(typeof u=="string")ho(i,u)&&(c=c.concat(i.g.get(Ve(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)c=c.concat(i[u]);return c}n.set=function(i,u){return ge(this),this.i=null,i=Ve(this,i),ho(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=fo(this,i),i.length>0?String(i[0]):u):u};function po(i,u,c){lo(i,u),c.length>0&&(i.i=null,i.g.set(Ve(i,u),S(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let d=0;d<u.length;d++){var c=u[d];const w=on(c);c=fo(this,c);for(let R=0;R<c.length;R++){let V=w;c[R]!==""&&(V+="="+on(c[R])),i.push(V)}}return this.i=i.join("&")};function mo(i){const u=new fn;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function Ve(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function Sl(i,u){u&&!i.j&&(ge(i),i.i=null,i.g.forEach(function(c,d){const w=d.toLowerCase();d!=w&&(lo(this,d),po(this,w,c))},i)),i.j=u}function Cl(i,u){const c=new sn;if(a.Image){const d=new Image;d.onload=m(Wt,c,"TestLoadImage: loaded",!0,u,d),d.onerror=m(Wt,c,"TestLoadImage: error",!1,u,d),d.onabort=m(Wt,c,"TestLoadImage: abort",!1,u,d),d.ontimeout=m(Wt,c,"TestLoadImage: timeout",!1,u,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else u(!1)}function Pl(i,u){const c=new sn,d=new AbortController,w=setTimeout(()=>{d.abort(),Wt(c,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(w),R.ok?Wt(c,"TestPingServer: ok",!0,u):Wt(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(w),Wt(c,"TestPingServer: error",!1,u)})}function Wt(i,u,c,d,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),d(c)}catch{}}function Vl(){this.g=new fl}function fs(i){this.i=i.Sb||null,this.h=i.ab||!1}T(fs,zi),fs.prototype.g=function(){return new Wn(this.i,this.h)};function Wn(i,u){_t.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}T(Wn,_t),n=Wn.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,pn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,dn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,pn(this)),this.g&&(this.readyState=3,pn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;go(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function go(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?dn(this):pn(this),this.readyState==3&&go(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,dn(this))},n.Na=function(i){this.g&&(this.response=i,dn(this))},n.ga=function(){this.g&&dn(this)};function dn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,pn(i)}n.setRequestHeader=function(i,u){this.A.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=u.next();return i.join(`\r
`)};function pn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Wn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function _o(i){let u="";return jn(i,function(c,d){u+=d,u+=":",u+=c,u+=`\r
`}),u}function ds(i,u,c){t:{for(d in c){var d=!1;break t}d=!0}d||(c=_o(c),typeof i=="string"?c!=null&&on(c):X(i,u,c))}function et(i){_t.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}T(et,_t);var Dl=/^https?$/i,Nl=["POST","PUT"];n=et.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,u,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Yi.g(),this.g.onreadystatechange=A(f(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(R){yo(this,R);return}if(i=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var w in d)c.set(w,d[w]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())c.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(R=>R.toLowerCase()=="content-type"),w=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Nl,u,void 0)>=0)||d||w||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,V]of c)this.g.setRequestHeader(R,V);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){yo(this,R)}};function yo(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,Eo(i),Qn(i)}function Eo(i){i.A||(i.A=!0,It(i,"complete"),It(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,It(this,"complete"),It(this,"abort"),Qn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qn(this,!0)),et.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?To(this):this.Xa())},n.Xa=function(){To(this)};function To(i){if(i.h&&typeof o<"u"){if(i.v&&Qt(i)==4)setTimeout(i.Ca.bind(i),0);else if(It(i,"readystatechange"),Qt(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var d;if(d=R===0){let V=String(i.D).match(uo)[1]||null;!V&&a.self&&a.self.location&&(V=a.self.location.protocol.slice(0,-1)),d=!Dl.test(V?V.toLowerCase():"")}c=d}if(c)It(i,"complete"),It(i,"success");else{i.o=6;try{var w=Qt(i)>2?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.ca()+"]",Eo(i)}}finally{Qn(i)}}}}function Qn(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,u||It(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Qt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Qt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),hl(u)}};function Io(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function kl(i){const u={};i=(i.g&&Qt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(g(i[d]))continue;var c=_l(i[d]);const w=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const R=u[w]||[];u[w]=R,R.push(c)}il(u,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function mn(i,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||u}function wo(i){this.za=0,this.i=[],this.j=new sn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=mn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=mn("baseRetryDelayMs",5e3,i),this.Za=mn("retryDelaySeedMs",1e4,i),this.Ta=mn("forwardChannelMaxRetries",2,i),this.va=mn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new ro(i&&i.concurrentRequestLimit),this.Ba=new Vl,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=wo.prototype,n.ka=8,n.I=1,n.connect=function(i,u,c,d){wt(0),this.W=i,this.H=u||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.J=Do(this,null,this.W),Yn(this)};function ps(i){if(vo(i),i.I==3){var u=i.V++,c=Nt(i.J);if(X(c,"SID",i.M),X(c,"RID",u),X(c,"TYPE","terminate"),gn(i,c),u=new Gt(i,i.j,u),u.M=2,u.A=Kn(Nt(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=u.A,c=!0),c||(u.g=No(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Gn(u)}Vo(i)}function Xn(i){i.g&&(gs(i),i.g.cancel(),i.g=null)}function vo(i){Xn(i),i.v&&(a.clearTimeout(i.v),i.v=null),Jn(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Yn(i){if(!so(i.h)&&!i.m){i.m=!0;var u=i.Ea;at||p(),tt||(at(),tt=!0),E.add(u,i),i.D=0}}function Ol(i,u){return io(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=rn(f(i.Ea,i,u),Po(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const w=new Gt(this,this.j,i);let R=this.o;if(this.U&&(R?(R=Oi(R),Mi(R,this.U)):R=this.U),this.u!==null||this.R||(w.J=R,R=null),this.S)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(u+=d,u>4096){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=Ro(this,w,u),c=Nt(this.J),X(c,"RID",i),X(c,"CVER",22),this.G&&X(c,"X-HTTP-Session-Id",this.G),gn(this,c),R&&(this.R?u="headers="+on(_o(R))+"&"+u:this.u&&ds(c,this.u,R)),ls(this.h,w),this.Ra&&X(c,"TYPE","init"),this.S?(X(c,"$req",u),X(c,"SID","null"),w.U=!0,os(w,c,null)):os(w,c,u),this.I=2}}else this.I==3&&(i?Ao(this,i):this.i.length==0||so(this.h)||Ao(this))};function Ao(i,u){var c;u?c=u.l:c=i.V++;const d=Nt(i.J);X(d,"SID",i.M),X(d,"RID",c),X(d,"AID",i.K),gn(i,d),i.u&&i.o&&ds(d,i.u,i.o),c=new Gt(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),u&&(i.i=u.G.concat(i.i)),u=Ro(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),ls(i.h,c),os(c,d,u)}function gn(i,u){i.H&&jn(i.H,function(c,d){X(u,d,c)}),i.l&&jn({},function(c,d){X(u,d,c)})}function Ro(i,u,c){c=Math.min(i.i.length,c);const d=i.l?f(i.l.Ka,i.l,i):null;t:{var w=i.i;let B=-1;for(;;){const ut=["count="+c];B==-1?c>0?(B=w[0].g,ut.push("ofs="+B)):B=0:ut.push("ofs="+B);let Q=!0;for(let ht=0;ht<c;ht++){var R=w[ht].g;const kt=w[ht].map;if(R-=B,R<0)B=Math.max(0,w[ht].g-100),Q=!1;else try{R="req"+R+"_"||"";try{var V=kt instanceof Map?kt:Object.entries(kt);for(const[ye,Xt]of V){let Yt=Xt;l(Xt)&&(Yt=es(Xt)),ut.push(R+ye+"="+encodeURIComponent(Yt))}}catch(ye){throw ut.push(R+"type="+encodeURIComponent("_badmap")),ye}}catch{d&&d(kt)}}if(Q){V=ut.join("&");break t}}V=void 0}return i=i.i.splice(0,c),u.G=i,V}function bo(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;at||p(),tt||(at(),tt=!0),E.add(u,i),i.A=0}}function ms(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=rn(f(i.Da,i),Po(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,So(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=rn(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,wt(10),Xn(this),So(this))};function gs(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function So(i){i.g=new Gt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Nt(i.na);X(u,"RID","rpc"),X(u,"SID",i.M),X(u,"AID",i.K),X(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&X(u,"TO",i.ia),X(u,"TYPE","xmlhttp"),gn(i,u),i.u&&i.o&&ds(u,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=Kn(Nt(u)),c.u=null,c.R=!0,to(c,i)}n.Va=function(){this.C!=null&&(this.C=null,Xn(this),ms(this),wt(19))};function Jn(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Co(i,u){var c=null;if(i.g==u){Jn(i),gs(i),i.g=null;var d=2}else if(cs(i.h,u))c=u.G,oo(i.h,u),d=1;else return;if(i.I!=0){if(u.o)if(d==1){c=u.u?u.u.length:0,u=Date.now()-u.F;var w=i.D;d=zn(),It(d,new Qi(d,c)),Yn(i)}else bo(i);else if(w=u.m,w==3||w==0&&u.X>0||!(d==1&&Ol(i,u)||d==2&&ms(i)))switch(c&&c.length>0&&(u=i.h,u.i=u.i.concat(c)),w){case 1:_e(i,5);break;case 4:_e(i,10);break;case 3:_e(i,6);break;default:_e(i,2)}}}function Po(i,u){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*u}function _e(i,u){if(i.j.info("Error code "+u),u==2){var c=f(i.bb,i),d=i.Ua;const w=!d;d=new Kt(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||un(d,"https"),Kn(d),w?Cl(d.toString(),c):Pl(d.toString(),c)}else wt(2);i.I=0,i.l&&i.l.pa(u),Vo(i),vo(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),wt(2)):(this.j.info("Failed to ping google.com"),wt(1))};function Vo(i){if(i.I=0,i.ja=[],i.l){const u=ao(i.h);(u.length!=0||i.i.length!=0)&&(D(i.ja,u),D(i.ja,i.i),i.h.i.length=0,S(i.i),i.i.length=0),i.l.oa()}}function Do(i,u,c){var d=c instanceof Kt?Nt(c):new Kt(c);if(d.g!="")u&&(d.g=u+"."+d.g),cn(d,d.u);else{var w=a.location;d=w.protocol,u=u?u+"."+w.hostname:w.hostname,w=+w.port;const R=new Kt(null);d&&un(R,d),u&&(R.g=u),w&&cn(R,w),c&&(R.h=c),d=R}return c=i.G,u=i.wa,c&&u&&X(d,c,u),X(d,"VER",i.ka),gn(i,d),d}function No(i,u,c){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new et(new fs({ab:c})):new et(i.ma),u.Fa(i.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ko(){}n=ko.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Zn(){}Zn.prototype.g=function(i,u){return new bt(i,u)};function bt(i,u){_t.call(this),this.g=new wo(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!g(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!g(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new De(this)}T(bt,_t),bt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){ps(this.g)},bt.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=es(i),i=c);u.i.push(new Tl(u.Ya++,i)),u.I==3&&Yn(u)},bt.prototype.N=function(){this.g.l=null,delete this.j,ps(this.g),delete this.g,bt.Z.N.call(this)};function Oo(i){ns.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){t:{for(const c in u){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}T(Oo,ns);function xo(){rs.call(this),this.status=1}T(xo,rs);function De(i){this.g=i}T(De,ko),De.prototype.ra=function(){It(this.g,"a")},De.prototype.qa=function(i){It(this.g,new Oo(i))},De.prototype.pa=function(i){It(this.g,new xo)},De.prototype.oa=function(){It(this.g,"b")},Zn.prototype.createWebChannel=Zn.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,_u=function(){return new Zn},gu=function(){return zn()},mu=pe,xs={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Hn.NO_ERROR=0,Hn.TIMEOUT=8,Hn.HTTP_ERROR=6,cr=Hn,Xi.COMPLETE="complete",pu=Xi,Hi.EventType=en,en.OPEN="a",en.CLOSE="b",en.ERROR="c",en.MESSAGE="d",_t.prototype.listen=_t.prototype.J,yn=Hi,et.prototype.listenOnce=et.prototype.K,et.prototype.getLastError=et.prototype.Ha,et.prototype.getLastErrorCode=et.prototype.ya,et.prototype.getStatus=et.prototype.ca,et.prototype.getResponseJson=et.prototype.La,et.prototype.getResponseText=et.prototype.la,et.prototype.send=et.prototype.ea,et.prototype.setWithCredentials=et.prototype.Fa,du=et}).apply(typeof er<"u"?er:typeof self<"u"?self:typeof window<"u"?window:{});const Wo="@firebase/firestore",Qo="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Et.UNAUTHENTICATED=new Et(null),Et.GOOGLE_CREDENTIALS=new Et("google-credentials-uid"),Et.FIRST_PARTY=new Et("first-party-uid"),Et.MOCK_USER=new Et("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qe="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we=new ru("@firebase/firestore");function Ne(){return we.logLevel}function N(n,...t){if(we.logLevel<=G.DEBUG){const e=t.map(ti);we.debug(`Firestore (${Qe}): ${n}`,...e)}}function zt(n,...t){if(we.logLevel<=G.ERROR){const e=t.map(ti);we.error(`Firestore (${Qe}): ${n}`,...e)}}function je(n,...t){if(we.logLevel<=G.WARN){const e=t.map(ti);we.warn(`Firestore (${Qe}): ${n}`,...e)}}function ti(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,yu(n,r,e)}function yu(n,t,e){let r=`FIRESTORE (${Qe}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw zt(r),new Error(r)}function W(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||yu(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends Re{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class df{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Et.UNAUTHENTICATED)))}shutdown(){}}class pf{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class mf{constructor(t){this.t=t,this.currentUser=Et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){W(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new se;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new se,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},l=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>l(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new se)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(W(typeof r.accessToken=="string",31837,{l:r}),new Eu(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return W(t===null||typeof t=="string",2055,{h:t}),new Et(t)}}class gf{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Et.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class _f{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new gf(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Et.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Xo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class yf{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,au(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){W(this.o===void 0,3512);const r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Xo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(W(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Xo(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ef(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function $(n,t){return n<t?-1:n>t?1:0}function Ms(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return vs(s)===vs(o)?$(s,o):vs(s)?1:-1}return $(n.length,t.length)}const Tf=55296,If=57343;function vs(n){const t=n.charCodeAt(0);return t>=Tf&&t<=If}function qe(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="__name__";class Ot{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Ot.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ot?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Ot.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return $(t.length,e.length)}static compareSegments(t,e){const r=Ot.isNumericId(t),s=Ot.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Ot.extractNumericId(t).compare(Ot.extractNumericId(e)):Ms(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return re.fromString(t.substring(4,t.length-2))}}class Y extends Ot{construct(t,e,r){return new Y(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new O(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new Y(e)}static emptyPath(){return new Y([])}}const wf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class mt extends Ot{construct(t,e,r){return new mt(t,e,r)}static isValidIdentifier(t){return wf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),mt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yo}static keyField(){return new mt([Yo])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new O(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new O(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new O(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new O(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new mt(e)}static emptyPath(){return new mt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(Y.fromString(t))}static fromName(t){return new x(Y.fromString(t).popFirst(5))}static empty(){return new x(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new Y(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(n,t,e){if(!e)throw new O(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function vf(n,t,e,r){if(t===!0&&r===!0)throw new O(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Jo(n){if(!x.isDocumentKey(n))throw new O(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Zo(n){if(x.isDocumentKey(n))throw new O(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Iu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ni(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function Pn(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ni(n);throw new O(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(n,t){const e={typeString:n};return t&&(e.value=t),e}function xn(n,t){if(!Iu(n))throw new O(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new O(C.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=-62135596800,ea=1e6;class J{static now(){return J.fromMillis(Date.now())}static fromDate(t){return J.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*ea);return new J(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<ta)throw new O(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ea}_compareTo(t){return this.seconds===t.seconds?$(this.nanoseconds,t.nanoseconds):$(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:J._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(xn(t,J._jsonSchema))return new J(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-ta;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}J._jsonSchemaVersion="firestore/timestamp/1.0",J._jsonSchema={type:ot("string",J._jsonSchemaVersion),seconds:ot("number"),nanoseconds:ot("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new J(0,0))}static max(){return new L(new J(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=-1;function Af(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new J(e+1,0):new J(e,r));return new oe(s,x.empty(),t)}function Rf(n){return new oe(n.readTime,n.key,Vn)}class oe{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new oe(L.min(),x.empty(),Vn)}static max(){return new oe(L.max(),x.empty(),Vn)}}function bf(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:$(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Cf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xe(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==Sf)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new b(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof b?e:b.resolve(e)}catch(e){return b.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):b.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):b.reject(e)}static resolve(t){return new b(((e,r)=>{e(t)}))}static reject(t){return new b(((e,r)=>{r(t)}))}static waitFor(t){return new b(((e,r)=>{let s=0,o=0,a=!1;t.forEach((l=>{++s,l.next((()=>{++o,a&&o===s&&e()}),(h=>r(h)))})),a=!0,o===s&&e()}))}static or(t){let e=b.resolve(!1);for(const r of t)e=e.next((s=>s?b.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new b(((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next((m=>{a[f]=m,++l,l===o&&r(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new b(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function Pf(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Ye(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Vr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=-1;function Dr(n){return n==null}function _r(n){return n===0&&1/n==-1/0}function Vf(n){return typeof n=="number"&&Number.isInteger(n)&&!_r(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="";function Df(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=na(t)),t=Nf(n.get(e),t);return na(t)}function Nf(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case wu:e+="";break;default:e+=o}}return e}function na(n){return n+wu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function fe(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function vu(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(t,e){this.comparator=t,this.root=e||pt.EMPTY}insert(t,e){return new Z(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,pt.BLACK,null,null))}remove(t){return new Z(this.comparator,this.root.remove(t,this.comparator).copy(null,null,pt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new nr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new nr(this.root,t,this.comparator,!1)}getReverseIterator(){return new nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new nr(this.root,t,this.comparator,!0)}}class nr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class pt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??pt.RED,this.left=s??pt.EMPTY,this.right=o??pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new pt(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return pt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return pt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}pt.EMPTY=null,pt.RED=!0,pt.BLACK=!1;pt.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new pt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.comparator=t,this.data=new Z(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new sa(this.data.getIterator())}getIteratorFrom(t){return new sa(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof lt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new lt(this.comparator);return e.data=t,e}}class sa{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(t){this.fields=t,t.sort(mt.comparator)}static empty(){return new Dt([])}unionWith(t){let e=new lt(mt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Dt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return qe(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Au("Invalid base64 string: "+o):o}})(t);return new gt(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(t);return new gt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return $(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}gt.EMPTY_BYTE_STRING=new gt("");const kf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ae(n){if(W(!!n,39018),typeof n=="string"){let t=0;const e=kf.exec(n);if(W(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:st(n.seconds),nanos:st(n.nanos)}}function st(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ue(n){return typeof n=="string"?gt.fromBase64String(n):gt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="server_timestamp",bu="__type__",Su="__previous_value__",Cu="__local_write_time__";function si(n){return(n?.mapValue?.fields||{})[bu]?.stringValue===Ru}function Nr(n){const t=n.mapValue.fields[Su];return si(t)?Nr(t):t}function Dn(n){const t=ae(n.mapValue.fields[Cu].timestampValue);return new J(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(t,e,r,s,o,a,l,h,f,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m}}const yr="(default)";class Nn{constructor(t,e){this.projectId=t,this.database=e||yr}static empty(){return new Nn("","")}get isDefaultDatabase(){return this.database===yr}isEqual(t){return t instanceof Nn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu="__type__",xf="__max__",rr={mapValue:{}},Vu="__vector__",Er="value";function ce(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?si(n)?4:Lf(n)?9007199254740991:Mf(n)?10:11:M(28295,{value:n})}function Bt(n,t){if(n===t)return!0;const e=ce(n);if(e!==ce(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Dn(n).isEqual(Dn(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=ae(s.timestampValue),l=ae(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return ue(s.bytesValue).isEqual(ue(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return st(s.geoPointValue.latitude)===st(o.geoPointValue.latitude)&&st(s.geoPointValue.longitude)===st(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return st(s.integerValue)===st(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=st(s.doubleValue),l=st(o.doubleValue);return a===l?_r(a)===_r(l):isNaN(a)&&isNaN(l)}return!1})(n,t);case 9:return qe(n.arrayValue.values||[],t.arrayValue.values||[],Bt);case 10:case 11:return(function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(ra(a)!==ra(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Bt(a[h],l[h])))return!1;return!0})(n,t);default:return M(52216,{left:n})}}function kn(n,t){return(n.values||[]).find((e=>Bt(e,t)))!==void 0}function $e(n,t){if(n===t)return 0;const e=ce(n),r=ce(t);if(e!==r)return $(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,t.booleanValue);case 2:return(function(o,a){const l=st(o.integerValue||o.doubleValue),h=st(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1})(n,t);case 3:return ia(n.timestampValue,t.timestampValue);case 4:return ia(Dn(n),Dn(t));case 5:return Ms(n.stringValue,t.stringValue);case 6:return(function(o,a){const l=ue(o),h=ue(a);return l.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const m=$(l[f],h[f]);if(m!==0)return m}return $(l.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,a){const l=$(st(o.latitude),st(a.latitude));return l!==0?l:$(st(o.longitude),st(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return oa(n.arrayValue,t.arrayValue);case 10:return(function(o,a){const l=o.fields||{},h=a.fields||{},f=l[Er]?.arrayValue,m=h[Er]?.arrayValue,T=$(f?.values?.length||0,m?.values?.length||0);return T!==0?T:oa(f,m)})(n.mapValue,t.mapValue);case 11:return(function(o,a){if(o===rr.mapValue&&a===rr.mapValue)return 0;if(o===rr.mapValue)return 1;if(a===rr.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let T=0;T<h.length&&T<m.length;++T){const A=Ms(h[T],m[T]);if(A!==0)return A;const S=$e(l[h[T]],f[m[T]]);if(S!==0)return S}return $(h.length,m.length)})(n.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function ia(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return $(n,t);const e=ae(n),r=ae(t),s=$(e.seconds,r.seconds);return s!==0?s:$(e.nanos,r.nanos)}function oa(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=$e(e[s],r[s]);if(o)return o}return $(e.length,r.length)}function ze(n){return Ls(n)}function Ls(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=ae(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return ue(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return x.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Ls(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Ls(e.fields[a])}`;return s+"}"})(n.mapValue):M(61005,{value:n})}function lr(n){switch(ce(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Nr(n);return t?16+lr(t):16;case 5:return 2*n.stringValue.length;case 6:return ue(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+lr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return fe(r.fields,((o,a)=>{s+=o.length+lr(a)})),s})(n.mapValue);default:throw M(13486,{value:n})}}function Fs(n){return!!n&&"integerValue"in n}function ii(n){return!!n&&"arrayValue"in n}function aa(n){return!!n&&"nullValue"in n}function ua(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function hr(n){return!!n&&"mapValue"in n}function Mf(n){return(n?.mapValue?.fields||{})[Pu]?.stringValue===Vu}function wn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return fe(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=wn(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=wn(n.arrayValue.values[e]);return t}return{...n}}function Lf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===xf}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.value=t}static empty(){return new St({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!hr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=wn(e)}setAll(t){let e=mt.emptyPath(),r={},s=[];t.forEach(((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=wn(a):s.push(l.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());hr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Bt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];hr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){fe(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new St(wn(this.value))}}function Du(n){const t=[];return fe(n.fields,((e,r)=>{const s=new mt([e]);if(hr(r)){const o=Du(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)})),new Dt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new Tt(t,0,L.min(),L.min(),L.min(),St.empty(),0)}static newFoundDocument(t,e,r,s){return new Tt(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new Tt(t,2,e,L.min(),L.min(),St.empty(),0)}static newUnknownDocument(t,e){return new Tt(t,3,e,L.min(),L.min(),St.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=St.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=St.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Tt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Tt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(t,e){this.position=t,this.inclusive=e}}function ca(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),e.key):r=$e(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function la(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Bt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e="asc"){this.field=t,this.dir=e}}function Ff(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{}class ct extends Nu{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Bf(t,e,r):e==="array-contains"?new $f(t,r):e==="in"?new zf(t,r):e==="not-in"?new Hf(t,r):e==="array-contains-any"?new Gf(t,r):new ct(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new jf(t,r):new qf(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison($e(e,this.value)):e!==null&&ce(this.value)===ce(e)&&this.matchesComparison($e(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class jt extends Nu{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new jt(t,e)}matches(t){return ku(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ku(n){return n.op==="and"}function Ou(n){return Uf(n)&&ku(n)}function Uf(n){for(const t of n.filters)if(t instanceof jt)return!1;return!0}function Us(n){if(n instanceof ct)return n.field.canonicalString()+n.op.toString()+ze(n.value);if(Ou(n))return n.filters.map((t=>Us(t))).join(",");{const t=n.filters.map((e=>Us(e))).join(",");return`${n.op}(${t})`}}function xu(n,t){return n instanceof ct?(function(r,s){return s instanceof ct&&r.op===s.op&&r.field.isEqual(s.field)&&Bt(r.value,s.value)})(n,t):n instanceof jt?(function(r,s){return s instanceof jt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,l)=>o&&xu(a,s.filters[l])),!0):!1})(n,t):void M(19439)}function Mu(n){return n instanceof ct?(function(e){return`${e.field.canonicalString()} ${e.op} ${ze(e.value)}`})(n):n instanceof jt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Mu).join(" ,")+"}"})(n):"Filter"}class Bf extends ct{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class jf extends ct{constructor(t,e){super(t,"in",e),this.keys=Lu("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class qf extends ct{constructor(t,e){super(t,"not-in",e),this.keys=Lu("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Lu(n,t){return(t.arrayValue?.values||[]).map((e=>x.fromName(e.referenceValue)))}class $f extends ct{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ii(e)&&kn(e.arrayValue,this.value)}}class zf extends ct{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&kn(this.value.arrayValue,e)}}class Hf extends ct{constructor(t,e){super(t,"not-in",e)}matches(t){if(kn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!kn(this.value.arrayValue,e)}}class Gf extends ct{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ii(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>kn(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function ha(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Kf(n,t,e,r,s,o,a)}function oi(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Us(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Dr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>ze(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>ze(r))).join(",")),t.Te=e}return t.Te}function ai(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Ff(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!xu(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!la(n.startAt,t.startAt)&&la(n.endAt,t.endAt)}function Bs(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Wf(n,t,e,r,s,o,a,l){return new kr(n,t,e,r,s,o,a,l)}function Fu(n){return new kr(n)}function fa(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Qf(n){return n.collectionGroup!==null}function vn(n){const t=F(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new lt(mt.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(l=l.add(f.field))}))})),l})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Ir(o,r))})),e.has(mt.keyField().canonicalString())||t.Ie.push(new Ir(mt.keyField(),r))}return t.Ie}function Mt(n){const t=F(n);return t.Ee||(t.Ee=Xf(t,vn(n))),t.Ee}function Xf(n,t){if(n.limitType==="F")return ha(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Ir(s.field,o)}));const e=n.endAt?new Tr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Tr(n.startAt.position,n.startAt.inclusive):null;return ha(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function js(n,t,e){return new kr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Or(n,t){return ai(Mt(n),Mt(t))&&n.limitType===t.limitType}function Uu(n){return`${oi(Mt(n))}|lt:${n.limitType}`}function ke(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>Mu(s))).join(", ")}]`),Dr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>ze(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>ze(s))).join(",")),`Target(${r})`})(Mt(n))}; limitType=${n.limitType})`}function xr(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of vn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,l,h){const f=ca(a,l,h);return a.inclusive?f<=0:f<0})(r.startAt,vn(r),s)||r.endAt&&!(function(a,l,h){const f=ca(a,l,h);return a.inclusive?f>=0:f>0})(r.endAt,vn(r),s))})(n,t)}function Yf(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bu(n){return(t,e)=>{let r=!1;for(const s of vn(n)){const o=Jf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Jf(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):(function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?$e(h,f):M(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){fe(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return vu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=new Z(x.comparator);function Ht(){return Zf}const ju=new Z(x.comparator);function En(...n){let t=ju;for(const e of n)t=t.insert(e.key,e);return t}function qu(n){let t=ju;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function Te(){return An()}function $u(){return An()}function An(){return new be((n=>n.toString()),((n,t)=>n.isEqual(t)))}const td=new Z(x.comparator),ed=new lt(x.comparator);function z(...n){let t=ed;for(const e of n)t=t.add(e);return t}const nd=new lt($);function rd(){return nd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_r(t)?"-0":t}}function zu(n){return{integerValue:""+n}}function sd(n,t){return Vf(t)?zu(t):ui(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(){this._=void 0}}function id(n,t,e){return n instanceof wr?(function(s,o){const a={fields:{[bu]:{stringValue:Ru},[Cu]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&si(o)&&(o=Nr(o)),o&&(a.fields[Su]=o),{mapValue:a}})(e,t):n instanceof He?Gu(n,t):n instanceof Ge?Ku(n,t):(function(s,o){const a=Hu(s,o),l=da(a)+da(s.Ae);return Fs(a)&&Fs(s.Ae)?zu(l):ui(s.serializer,l)})(n,t)}function od(n,t,e){return n instanceof He?Gu(n,t):n instanceof Ge?Ku(n,t):e}function Hu(n,t){return n instanceof vr?(function(r){return Fs(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class wr extends Mr{}class He extends Mr{constructor(t){super(),this.elements=t}}function Gu(n,t){const e=Wu(t);for(const r of n.elements)e.some((s=>Bt(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Ge extends Mr{constructor(t){super(),this.elements=t}}function Ku(n,t){let e=Wu(t);for(const r of n.elements)e=e.filter((s=>!Bt(s,r)));return{arrayValue:{values:e}}}class vr extends Mr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function da(n){return st(n.integerValue||n.doubleValue)}function Wu(n){return ii(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(t,e){this.field=t,this.transform=e}}function ad(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof He&&s instanceof He||r instanceof Ge&&s instanceof Ge?qe(r.elements,s.elements,Bt):r instanceof vr&&s instanceof vr?Bt(r.Ae,s.Ae):r instanceof wr&&s instanceof wr})(n.transform,t.transform)}class ud{constructor(t,e){this.version=t,this.transformResults=e}}class qt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new qt}static exists(t){return new qt(void 0,t)}static updateTime(t){return new qt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function fr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Lr{}function Xu(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Ju(n.key,qt.none()):new Fr(n.key,n.data,qt.none());{const e=n.data,r=St.empty();let s=new lt(mt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Se(n.key,r,new Dt(s.toArray()),qt.none())}}function cd(n,t,e){n instanceof Fr?(function(s,o,a){const l=s.value.clone(),h=ma(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,t,e):n instanceof Se?(function(s,o,a){if(!fr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=ma(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Yu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Rn(n,t,e,r){return n instanceof Fr?(function(o,a,l,h){if(!fr(o.precondition,a))return l;const f=o.value.clone(),m=ga(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null})(n,t,e,r):n instanceof Se?(function(o,a,l,h){if(!fr(o.precondition,a))return l;const f=ga(o.fieldTransforms,h,a),m=a.data;return m.setAll(Yu(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((T=>T.field)))})(n,t,e,r):(function(o,a,l){return fr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,t,e)}function ld(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=Hu(r.transform,s||null);o!=null&&(e===null&&(e=St.empty()),e.set(r.field,o))}return e||null}function pa(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&qe(r,s,((o,a)=>ad(o,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Fr extends Lr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Se extends Lr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Yu(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function ma(n,t,e){const r=new Map;W(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,od(a,l,e[s]))}return r}function ga(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,id(o,a,t))}return r}class Ju extends Lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hd extends Lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&cd(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Rn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Rn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=$u();return this.mutations.forEach((s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Xu(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),z())}isEqual(t){return this.batchId===t.batchId&&qe(this.mutations,t.mutations,((e,r)=>pa(e,r)))&&qe(this.baseMutations,t.baseMutations,((e,r)=>pa(e,r)))}}class ci{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){W(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return td})();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new ci(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var it,H;function md(n){switch(n){case C.OK:return M(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Zu(n){if(n===void 0)return zt("GRPC error has no .code"),C.UNKNOWN;switch(n){case it.OK:return C.OK;case it.CANCELLED:return C.CANCELLED;case it.UNKNOWN:return C.UNKNOWN;case it.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case it.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case it.INTERNAL:return C.INTERNAL;case it.UNAVAILABLE:return C.UNAVAILABLE;case it.UNAUTHENTICATED:return C.UNAUTHENTICATED;case it.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case it.NOT_FOUND:return C.NOT_FOUND;case it.ALREADY_EXISTS:return C.ALREADY_EXISTS;case it.PERMISSION_DENIED:return C.PERMISSION_DENIED;case it.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case it.ABORTED:return C.ABORTED;case it.OUT_OF_RANGE:return C.OUT_OF_RANGE;case it.UNIMPLEMENTED:return C.UNIMPLEMENTED;case it.DATA_LOSS:return C.DATA_LOSS;default:return M(39323,{code:n})}}(H=it||(it={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _d=new re([4294967295,4294967295],0);function _a(n){const t=gd().encode(n),e=new fu;return e.update(t),new Uint8Array(e.digest())}function ya(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new re([e,r],0),new re([s,o],0)]}class li{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Tn(`Invalid padding: ${e}`);if(r<0)throw new Tn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Tn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Tn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=re.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(re.fromNumber(r)));return s.compare(_d)===1&&(s=new re([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=_a(t),[r,s]=ya(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new li(o,s,e);return r.forEach((l=>a.insert(l))),a}insert(t){if(this.ge===0)return;const e=_a(t),[r,s]=ya(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Tn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Mn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ur(L.min(),s,new Z($),Ht(),z())}}class Mn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Mn(r,e,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class tc{constructor(t,e){this.targetId=t,this.Ce=e}}class ec{constructor(t,e,r=gt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Ea{constructor(){this.ve=0,this.Fe=Ta(),this.Me=gt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=z(),e=z(),r=z();return this.Fe.forEach(((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:o})}})),new Mn(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=Ta()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,W(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class yd{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ht(),this.Je=sr(),this.He=sr(),this.Ye=new Z($)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:M(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(Bs(o))if(r===0){const a=new x(o.path);this.et(e,a,Tt.newNoDocument(a,L.min()))}else W(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,f)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=ue(r).toUint8Array()}catch(h){if(h instanceof Au)return je("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new li(a,s,o)}catch(h){return je(h instanceof Tn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((o,a)=>{const l=this.ot(a);if(l){if(o.current&&Bs(l.target)){const h=new x(l.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,Tt.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}}));let r=z();this.He.forEach(((o,a)=>{let l=!0;a.forEachWhile((h=>{const f=this.ot(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(o))})),this.je.forEach(((o,a)=>a.setReadTime(t)));const s=new Ur(t,e,this.Ye,this.je,r);return this.je=Ht(),this.Je=sr(),this.He=sr(),this.Ye=new Z($),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Ea,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new lt($),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new lt($),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Ea),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function sr(){return new Z(x.comparator)}function Ta(){return new Z(x.comparator)}const Ed={asc:"ASCENDING",desc:"DESCENDING"},Td={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Id={and:"AND",or:"OR"};class wd{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function qs(n,t){return n.useProto3Json||Dr(t)?t:{value:t}}function Ar(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function nc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function vd(n,t){return Ar(n,t.toTimestamp())}function Lt(n){return W(!!n,49232),L.fromTimestamp((function(e){const r=ae(e);return new J(r.seconds,r.nanos)})(n))}function hi(n,t){return $s(n,t).canonicalString()}function $s(n,t){const e=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function rc(n){const t=Y.fromString(n);return W(uc(t),10190,{key:t.toString()}),t}function zs(n,t){return hi(n.databaseId,t.path)}function As(n,t){const e=rc(t);if(e.get(1)!==n.databaseId.projectId)throw new O(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(ic(e))}function sc(n,t){return hi(n.databaseId,t)}function Ad(n){const t=rc(n);return t.length===4?Y.emptyPath():ic(t)}function Hs(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ic(n){return W(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ia(n,t,e){return{name:zs(n,t),fields:e.value.mapValue.fields}}function Rd(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=(function(f,m){return f.useProto3Json?(W(m===void 0||typeof m=="string",58123),gt.fromBase64String(m||"")):(W(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),gt.fromUint8Array(m||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(f){const m=f.code===void 0?C.UNKNOWN:Zu(f.code);return new O(m,f.message||"")})(a);e=new ec(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=As(n,r.document.name),o=Lt(r.document.updateTime),a=r.document.createTime?Lt(r.document.createTime):L.min(),l=new St({mapValue:{fields:r.document.fields}}),h=Tt.newFoundDocument(s,o,a,l),f=r.targetIds||[],m=r.removedTargetIds||[];e=new dr(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=As(n,r.document),o=r.readTime?Lt(r.readTime):L.min(),a=Tt.newNoDocument(s,o),l=r.removedTargetIds||[];e=new dr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=As(n,r.document),o=r.removedTargetIds||[];e=new dr([],o,s,null)}else{if(!("filter"in t))return M(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new pd(s,o),l=r.targetId;e=new tc(l,a)}}return e}function bd(n,t){let e;if(t instanceof Fr)e={update:Ia(n,t.key,t.value)};else if(t instanceof Ju)e={delete:zs(n,t.key)};else if(t instanceof Se)e={update:Ia(n,t.key,t.data),updateMask:xd(t.fieldMask)};else{if(!(t instanceof hd))return M(16599,{Vt:t.type});e={verify:zs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,a){const l=a.transform;if(l instanceof wr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof He)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ge)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof vr)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw M(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:vd(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)})(n,t.precondition)),e}function Sd(n,t){return n&&n.length>0?(W(t!==void 0,14353),n.map((e=>(function(s,o){let a=s.updateTime?Lt(s.updateTime):Lt(o);return a.isEqual(L.min())&&(a=Lt(o)),new ud(a,s.transformResults||[])})(e,t)))):[]}function Cd(n,t){return{documents:[sc(n,t.path)]}}function Pd(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=sc(n,s);const o=(function(f){if(f.length!==0)return ac(jt.create(f,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(f){if(f.length!==0)return f.map((m=>(function(A){return{field:Oe(A.field),direction:Nd(A.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=qs(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=(function(f){return{before:f.inclusive,values:f.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(f){return{before:!f.inclusive,values:f.position}})(t.endAt)),{ft:e,parent:s}}function Vd(n){let t=Ad(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){W(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=(function(T){const A=oc(T);return A instanceof jt&&Ou(A)?A.getFilters():[A]})(e.where));let a=[];e.orderBy&&(a=(function(T){return T.map((A=>(function(D){return new Ir(xe(D.field),(function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(A)))})(e.orderBy));let l=null;e.limit&&(l=(function(T){let A;return A=typeof T=="object"?T.value:T,Dr(A)?null:A})(e.limit));let h=null;e.startAt&&(h=(function(T){const A=!!T.before,S=T.values||[];return new Tr(S,A)})(e.startAt));let f=null;return e.endAt&&(f=(function(T){const A=!T.before,S=T.values||[];return new Tr(S,A)})(e.endAt)),Wf(t,s,a,o,l,"F",h,f)}function Dd(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function oc(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=xe(e.unaryFilter.field);return ct.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=xe(e.unaryFilter.field);return ct.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=xe(e.unaryFilter.field);return ct.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=xe(e.unaryFilter.field);return ct.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(n):n.fieldFilter!==void 0?(function(e){return ct.create(xe(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return jt.create(e.compositeFilter.filters.map((r=>oc(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(e.compositeFilter.op))})(n):M(30097,{filter:n})}function Nd(n){return Ed[n]}function kd(n){return Td[n]}function Od(n){return Id[n]}function Oe(n){return{fieldPath:n.canonicalString()}}function xe(n){return mt.fromServerFormat(n.fieldPath)}function ac(n){return n instanceof ct?(function(e){if(e.op==="=="){if(ua(e.value))return{unaryFilter:{field:Oe(e.field),op:"IS_NAN"}};if(aa(e.value))return{unaryFilter:{field:Oe(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ua(e.value))return{unaryFilter:{field:Oe(e.field),op:"IS_NOT_NAN"}};if(aa(e.value))return{unaryFilter:{field:Oe(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Oe(e.field),op:kd(e.op),value:e.value}}})(n):n instanceof jt?(function(e){const r=e.getFilters().map((s=>ac(s)));return r.length===1?r[0]:{compositeFilter:{op:Od(e.op),filters:r}}})(n):M(54877,{filter:n})}function xd(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function uc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(t,e,r,s,o=L.min(),a=L.min(),l=gt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new Zt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(t){this.yt=t}}function Ld(n){const t=Vd({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?js(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(){this.Cn=new Ud}addToCollectionParentIndex(t,e){return this.Cn.add(e),b.resolve()}getCollectionParents(t,e){return b.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return b.resolve()}deleteFieldIndex(t,e){return b.resolve()}deleteAllFieldIndexes(t){return b.resolve()}createTargetIndexes(t,e){return b.resolve()}getDocumentsMatchingTarget(t,e){return b.resolve(null)}getIndexType(t,e){return b.resolve(0)}getFieldIndexes(t,e){return b.resolve([])}getNextCollectionGroupToUpdate(t){return b.resolve(null)}getMinOffset(t,e){return b.resolve(oe.min())}getMinOffsetFromCollectionGroup(t,e){return b.resolve(oe.min())}updateCollectionGroup(t,e,r){return b.resolve()}updateIndexEntries(t,e){return b.resolve()}}class Ud{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new lt(Y.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new lt(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},cc=41943040;class Rt{static withCacheSize(t){return new Rt(t,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Rt.DEFAULT_COLLECTION_PERCENTILE=10,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Rt.DEFAULT=new Rt(cc,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Rt.DISABLED=new Rt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Ke(0)}static cr(){return new Ke(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="LruGarbageCollector",Bd=1048576;function Aa([n,t],[e,r]){const s=$(n,e);return s===0?$(t,r):s}class jd{constructor(t){this.Ir=t,this.buffer=new lt(Aa),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Aa(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class qd{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){N(va,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ye(e)?N(va,"Ignoring IndexedDB error during garbage collection: ",e):await Xe(e)}await this.Vr(3e5)}))}}class $d{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return b.resolve(Vr.ce);const r=new jd(e);return this.mr.forEachTarget(t,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(wa)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),wa):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,o,a,l,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((T=>(T>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${T}`),s=this.params.maximumSequenceNumbersToCollect):s=T,a=Date.now(),this.nthSequenceNumber(t,s)))).next((T=>(r=T,l=Date.now(),this.removeTargets(t,r,e)))).next((T=>(o=T,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((T=>(f=Date.now(),Ne()<=G.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${T} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:T}))))}}function zd(n,t){return new $d(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.changes=new be((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Tt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?b.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Rn(r.mutation,s,Dt.empty(),J.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,z()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=z()){const s=Te();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let a=En();return o.forEach(((l,h)=>{a=a.insert(l,h.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=Te();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,z())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((a,l)=>{e.set(a,l)}))}))}computeViews(t,e,r,s){let o=Ht();const a=An(),l=(function(){return An()})();return e.forEach(((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof Se)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),Rn(m.mutation,f,m.mutation.getFieldMask(),J.now())):a.set(f.key,Dt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((f,m)=>a.set(f,m))),e.forEach(((f,m)=>l.set(f,new Gd(m,a.get(f)??null)))),l)))}recalculateAndSaveOverlays(t,e){const r=An();let s=new Z(((a,l)=>a-l)),o=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const l of a)l.keys().forEach((h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||Dt.empty();m=l.applyToLocalView(f,m),r.set(h,m);const T=(s.get(l.batchId)||z()).add(h);s=s.insert(l.batchId,T)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,m=h.value,T=$u();m.forEach((A=>{if(!o.has(A)){const S=Xu(e.get(A),r.get(A));S!==null&&T.set(A,S),o=o.add(A)}})),a.push(this.documentOverlayCache.saveOverlays(t,f,T))}return b.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Qf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):b.resolve(Te());let l=Vn,h=o;return a.next((f=>b.forEach(f,((m,T)=>(l<T.largestBatchId&&(l=T.largestBatchId),o.get(m)?b.resolve():this.remoteDocumentCache.getEntry(t,m).next((A=>{h=h.insert(m,A)}))))).next((()=>this.populateOverlays(t,f,o))).next((()=>this.computeViews(t,h,f,z()))).next((m=>({batchId:l,changes:qu(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next((r=>{let s=En();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=En();return this.indexManager.getCollectionParents(t,o).next((l=>b.forEach(l,(h=>{const f=(function(T,A){return new kr(A,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next((m=>{m.forEach(((T,A)=>{a=a.insert(T,A)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((a=>{o.forEach(((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,Tt.newInvalidDocument(m)))}));let l=En();return a.forEach(((h,f)=>{const m=o.get(h);m!==void 0&&Rn(m.mutation,f,Dt.empty(),J.now()),xr(e,f)&&(l=l.insert(h,f))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return b.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Lt(s.createTime)}})(e)),b.resolve()}getNamedQuery(t,e){return b.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:Ld(s.bundledQuery),readTime:Lt(s.readTime)}})(e)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(){this.overlays=new Z(x.comparator),this.qr=new Map}getOverlay(t,e){return b.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Te();return b.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.St(t,e,o)})),b.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.qr.delete(r)),b.resolve()}getOverlaysForCollection(t,e,r){const s=Te(),o=e.length+1,a=new x(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Z(((f,m)=>f-m));const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=Te(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const l=Te(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,m)=>l.set(f,m))),!(l.size()>=s)););return b.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new dd(e,r));let o=this.qr.get(e);o===void 0&&(o=z(),this.qr.set(e,o)),this.qr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(){this.sessionToken=gt.EMPTY_BYTE_STRING}getSessionToken(t){return b.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(){this.Qr=new lt(ft.$r),this.Ur=new lt(ft.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new ft(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Gr(new ft(t,e))}zr(t,e){t.forEach((r=>this.removeReference(r,e)))}jr(t){const e=new x(new Y([])),r=new ft(e,t),s=new ft(e,t+1),o=[];return this.Ur.forEachInRange([r,s],(a=>{this.Gr(a),o.push(a.key)})),o}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new x(new Y([])),r=new ft(e,t),s=new ft(e,t+1);let o=z();return this.Ur.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new ft(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ft{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return x.comparator(t.key,e.key)||$(t.Yr,e.Yr)}static Kr(t,e){return $(t.Yr,e.Yr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new lt(ft.$r)}checkEmpty(t){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new fd(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new ft(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return b.resolve(a)}lookupMutationBatch(t,e){return b.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),o=s<0?0:s;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?ri:this.tr-1)}getAllMutationBatches(t){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ft(e,0),s=new ft(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([r,s],(a=>{const l=this.Xr(a.Yr);o.push(l)})),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new lt($);return e.forEach((s=>{const o=new ft(s,0),a=new ft(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,a],(l=>{r=r.add(l.Yr)}))})),b.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const a=new ft(new x(o),0);let l=new lt($);return this.Zr.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.Yr)),!0)}),a),b.resolve(this.ti(l))}ti(t){const e=[];return t.forEach((r=>{const s=this.Xr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){W(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return b.forEach(e.mutations,(s=>{const o=new ft(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=r}))}ir(t){}containsKey(t,e){const r=new ft(e,0),s=this.Zr.firstAfterOrEqual(r);return b.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,b.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(t){this.ri=t,this.docs=(function(){return new Z(x.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return b.resolve(r?r.document.mutableCopy():Tt.newInvalidDocument(e))}getEntries(t,e){let r=Ht();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Tt.newInvalidDocument(s))})),b.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Ht();const a=e.path,l=new x(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||bf(Rf(m),r)<=0||(s.has(m.key)||xr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M(9500)}ii(t,e){return b.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Zd(this)}getSize(t){return b.resolve(this.size)}}class Zd extends Hd{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)})),b.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(t){this.persistence=t,this.si=new be((e=>oi(e)),ai),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.oi=0,this._i=new fi,this.targetCount=0,this.ai=Ke.ur()}forEachTarget(t,e){return this.si.forEach(((r,s)=>e(s))),b.resolve()}getLastRemoteSnapshotVersion(t){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return b.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),b.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Ke(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,b.resolve()}updateTargetData(t,e){return this.Pr(e),b.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,b.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.si.forEach(((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.si.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)})),b.waitFor(o).next((()=>s))}getTargetCount(t){return b.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return b.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),b.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((a=>{o.push(s.markPotentiallyOrphaned(t,a))})),b.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),b.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return b.resolve(r)}containsKey(t,e){return b.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e){this.ui={},this.overlays={},this.ci=new Vr(0),this.li=!1,this.li=!0,this.hi=new Xd,this.referenceDelegate=t(this),this.Pi=new tp(this),this.indexManager=new Fd,this.remoteDocumentCache=(function(s){return new Jd(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new Md(e),this.Ii=new Wd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Qd,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new Yd(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new ep(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((o=>this.referenceDelegate.di(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ai(t,e){return b.or(Object.values(this.ui).map((r=>()=>r.containsKey(t,e))))}}class ep extends Cf{constructor(t){super(),this.currentSequenceNumber=t}}class di{constructor(t){this.persistence=t,this.Ri=new fi,this.Vi=null}static mi(t){return new di(t)}get fi(){if(this.Vi)return this.Vi;throw M(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),b.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),b.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),b.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.fi.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.fi,(r=>{const s=x.fromPath(r);return this.gi(t,s).next((o=>{o||e.removeEntry(s,L.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return b.or([()=>b.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Rr{constructor(t,e){this.persistence=t,this.pi=new be((r=>Df(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=zd(this,e)}static mi(t,e){return new Rr(t,e)}Ei(){}di(t){return b.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}wr(t){let e=0;return this.pr(t,(r=>{e++})).next((()=>e))}pr(t,e){return b.forEach(this.pi,((r,s)=>this.br(t,r,s).next((o=>o?b.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ii(t,(a=>this.br(t,a,e).next((l=>{l||(r++,o.removeEntry(a,L.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),b.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),b.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),b.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),b.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=lr(t.data.value)),e}br(t,e,r){return b.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return b.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=z(),s=z();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new pi(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Ql()?8:Pf(Js())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ys(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ws(t,e,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new np;return this.Ss(t,e,a).next((l=>{if(o.result=l,this.Vs)return this.bs(t,e,a,l.size)}))})).next((()=>o.result))}bs(t,e,r,s){return r.documentReadCount<this.fs?(Ne()<=G.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",ke(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),b.resolve()):(Ne()<=G.DEBUG&&N("QueryEngine","Query:",ke(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Ne()<=G.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",ke(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Mt(e))):b.resolve())}ys(t,e){if(fa(e))return b.resolve(null);let r=Mt(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=js(e,null,"F"),r=Mt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const a=z(...o);return this.ps.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,r).next((h=>{const f=this.Ds(e,l);return this.Cs(e,f,a,h.readTime)?this.ys(t,js(e,null,"F")):this.vs(t,f,e,h)}))))})))))}ws(t,e,r,s){return fa(e)||s.isEqual(L.min())?b.resolve(null):this.ps.getDocuments(t,r).next((o=>{const a=this.Ds(e,o);return this.Cs(e,a,r,s)?b.resolve(null):(Ne()<=G.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ke(e)),this.vs(t,a,e,Af(s,Vn)).next((l=>l)))}))}Ds(t,e){let r=new lt(Bu(t));return e.forEach(((s,o)=>{xr(t,o)&&(r=r.add(o))})),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Ss(t,e,r){return Ne()<=G.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",ke(e)),this.ps.getDocumentsMatchingQuery(t,e,oe.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi="LocalStore",sp=3e8;class ip{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new Z($),this.xs=new be((o=>oi(o)),ai),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Kd(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function op(n,t,e,r){return new ip(n,t,e,r)}async function hc(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],l=[];let h=z();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){l.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next((f=>({Ls:f,removedBatchIds:a,addedBatchIds:l})))}))}))}function ap(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(l,h,f,m){const T=f.batch,A=T.keys();let S=b.resolve();return A.forEach((D=>{S=S.next((()=>m.getEntry(h,D))).next((k=>{const P=f.docVersions.get(D);W(P!==null,48541),k.version.compareTo(P)<0&&(T.applyToRemoteDocument(k,f),k.isValidDocument()&&(k.setReadTime(f.commitVersion),m.addEntry(k)))}))})),S.next((()=>l.mutationQueue.removeMutationBatch(h,T)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let h=z();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function fc(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function up(n,t){const e=F(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const l=[];t.targetChanges.forEach(((m,T)=>{const A=s.get(T);if(!A)return;l.push(e.Pi.removeMatchingKeys(o,m.removedDocuments,T).next((()=>e.Pi.addMatchingKeys(o,m.addedDocuments,T))));let S=A.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(T)!==null?S=S.withResumeToken(gt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,r)),s=s.insert(T,S),(function(k,P,q){return k.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=sp?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0})(A,S,m)&&l.push(e.Pi.updateTargetData(o,S))}));let h=Ht(),f=z();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))})),l.push(cp(o,a,t.documentUpdates).next((m=>{h=m.ks,f=m.qs}))),!r.isEqual(L.min())){const m=e.Pi.getLastRemoteSnapshotVersion(o).next((T=>e.Pi.setTargetsMetadata(o,o.currentSequenceNumber,r)));l.push(m)}return b.waitFor(l).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,f))).next((()=>h))})).then((o=>(e.Ms=s,o)))}function cp(n,t,e){let r=z(),s=z();return e.forEach((o=>r=r.add(o))),t.getEntries(n,r).next((o=>{let a=Ht();return e.forEach(((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):N(mi,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)})),{ks:a,qs:s}}))}function lp(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=ri),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function hp(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.Pi.getTargetData(r,t).next((o=>o?(s=o,b.resolve(s)):e.Pi.allocateTargetId(r).next((a=>(s=new Zt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r}))}async function Gs(n,t,e){const r=F(n),s=r.Ms.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Ye(a))throw a;N(mi,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function Ra(n,t,e){const r=F(n);let s=L.min(),o=z();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,f,m){const T=F(h),A=T.xs.get(m);return A!==void 0?b.resolve(T.Ms.get(A)):T.Pi.getTargetData(f,m)})(r,a,Mt(t)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next((h=>{o=h}))})).next((()=>r.Fs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:z()))).next((l=>(fp(r,Yf(t),l),{documents:l,Qs:o})))))}function fp(n,t,e){let r=n.Os.get(t)||L.min();e.forEach(((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)})),n.Os.set(t,r)}class ba{constructor(){this.activeTargetIds=rd()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class dp{constructor(){this.Mo=new ba,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new ba,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa="ConnectivityMonitor";class Ca{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(Sa,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){N(Sa,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ir=null;function Ks(){return ir===null?ir=(function(){return 268435456+Math.round(2147483648*Math.random())})():ir++,"0x"+ir.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs="RestConnection",mp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class gp{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===yr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,o){const a=Ks(),l=this.zo(t,e.toUriEncodedString());N(Rs,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,s,o);const{host:f}=new URL(l),m=On(f);return this.Jo(t,l,h,r,m).then((T=>(N(Rs,`Received RPC '${t}' ${a}: `,T),T)),(T=>{throw je(Rs,`RPC '${t}' ${a} failed with error: `,T,"url: ",l,"request:",r),T}))}Ho(t,e,r,s,o,a){return this.Go(t,e,r,s,o)}jo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Qe})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}zo(t,e){const r=mp[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="WebChannelConnection";class yp extends gp{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,o){const a=Ks();return new Promise(((l,h)=>{const f=new du;f.setWithCredentials(!0),f.listenOnce(pu.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case cr.NO_ERROR:const T=f.getResponseJson();N(yt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(T)),l(T);break;case cr.TIMEOUT:N(yt,`RPC '${t}' ${a} timed out`),h(new O(C.DEADLINE_EXCEEDED,"Request time out"));break;case cr.HTTP_ERROR:const A=f.getStatus();if(N(yt,`RPC '${t}' ${a} failed with status:`,A,"response text:",f.getResponseText()),A>0){let S=f.getResponseJson();Array.isArray(S)&&(S=S[0]);const D=S?.error;if(D&&D.status&&D.message){const k=(function(q){const j=q.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(j)>=0?j:C.UNKNOWN})(D.status);h(new O(k,D.message))}else h(new O(C.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new O(C.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:t,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{N(yt,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);N(yt,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)}))}T_(t,e,r){const s=Ks(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=_u(),l=gu(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");N(yt,`Creating RPC '${t}' stream ${s}: ${m}`,h);const T=a.createWebChannel(m,h);this.I_(T);let A=!1,S=!1;const D=new _p({Yo:P=>{S?N(yt,`Not sending because RPC '${t}' stream ${s} is closed:`,P):(A||(N(yt,`Opening RPC '${t}' stream ${s} transport.`),T.open(),A=!0),N(yt,`RPC '${t}' stream ${s} sending:`,P),T.send(P))},Zo:()=>T.close()}),k=(P,q,j)=>{P.listen(q,(U=>{try{j(U)}catch(K){setTimeout((()=>{throw K}),0)}}))};return k(T,yn.EventType.OPEN,(()=>{S||(N(yt,`RPC '${t}' stream ${s} transport opened.`),D.o_())})),k(T,yn.EventType.CLOSE,(()=>{S||(S=!0,N(yt,`RPC '${t}' stream ${s} transport closed`),D.a_(),this.E_(T))})),k(T,yn.EventType.ERROR,(P=>{S||(S=!0,je(yt,`RPC '${t}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),D.a_(new O(C.UNAVAILABLE,"The operation could not be completed")))})),k(T,yn.EventType.MESSAGE,(P=>{if(!S){const q=P.data[0];W(!!q,16349);const j=q,U=j?.error||j[0]?.error;if(U){N(yt,`RPC '${t}' stream ${s} received error:`,U);const K=U.status;let at=(function(p){const _=it[p];if(_!==void 0)return Zu(_)})(K),tt=U.message;at===void 0&&(at=C.INTERNAL,tt="Unknown error status: "+K+" with message "+U.message),S=!0,D.a_(new O(at,tt)),T.close()}else N(yt,`RPC '${t}' stream ${s} received:`,q),D.u_(q)}})),k(l,mu.STAT_EVENT,(P=>{P.stat===xs.PROXY?N(yt,`RPC '${t}' stream ${s} detected buffering proxy`):P.stat===xs.NOPROXY&&N(yt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{D.__()}),0),D}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function bs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(n){return new wd(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa="PersistentStream";class pc{constructor(t,e,r,s,o,a,l,h){this.Mi=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new dc(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(zt(e.toString()),zt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new O(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return N(Pa,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(N(Pa,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Ep extends pc{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Rd(this.serializer,t),r=(function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Lt(a.readTime):L.min()})(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=Hs(this.serializer),e.addTarget=(function(o,a){let l;const h=a.target;if(l=Bs(h)?{documents:Cd(o,h)}:{query:Pd(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=nc(o,a.resumeToken);const f=qs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=Ar(o,a.snapshotVersion.toTimestamp());const f=qs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l})(this.serializer,t);const r=Dd(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=Hs(this.serializer),e.removeTarget=t,this.q_(e)}}class Tp extends pc{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return W(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,W(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){W(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Sd(t.writeResults,t.commitTime),r=Lt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=Hs(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>bd(this.serializer,r)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{}class wp extends Ip{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new O(C.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Go(t,$s(e,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(C.UNKNOWN,o.toString())}))}Ho(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Ho(t,$s(e,r),s,a,l,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(C.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class vp{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(zt(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve="RemoteStore";class Ap{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo((a=>{r.enqueueAndForget((async()=>{Ce(this)&&(N(ve,"Restarting streams for network reachability change."),await(async function(h){const f=F(h);f.Ea.add(4),await Ln(f),f.Ra.set("Unknown"),f.Ea.delete(4),await jr(f)})(this))}))})),this.Ra=new vp(r,s)}}async function jr(n){if(Ce(n))for(const t of n.da)await t(!0)}async function Ln(n){for(const t of n.da)await t(!1)}function mc(n,t){const e=F(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Ei(e)?yi(e):Je(e).O_()&&_i(e,t))}function gi(n,t){const e=F(n),r=Je(e);e.Ia.delete(t),r.O_()&&gc(e,t),e.Ia.size===0&&(r.O_()?r.L_():Ce(e)&&e.Ra.set("Unknown"))}function _i(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Je(n).Y_(t)}function gc(n,t){n.Va.Ue(t),Je(n).Z_(t)}function yi(n){n.Va=new yd({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),Je(n).start(),n.Ra.ua()}function Ei(n){return Ce(n)&&!Je(n).x_()&&n.Ia.size>0}function Ce(n){return F(n).Ea.size===0}function _c(n){n.Va=void 0}async function Rp(n){n.Ra.set("Online")}async function bp(n){n.Ia.forEach(((t,e)=>{_i(n,t)}))}async function Sp(n,t){_c(n),Ei(n)?(n.Ra.ha(t),yi(n)):n.Ra.set("Unknown")}async function Cp(n,t,e){if(n.Ra.set("Online"),t instanceof ec&&t.state===2&&t.cause)try{await(async function(s,o){const a=o.cause;for(const l of o.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))})(n,t)}catch(r){N(ve,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await br(n,r)}else if(t instanceof dr?n.Va.Ze(t):t instanceof tc?n.Va.st(t):n.Va.tt(t),!e.isEqual(L.min()))try{const r=await fc(n.localStore);e.compareTo(r)>=0&&await(function(o,a){const l=o.Va.Tt(a);return l.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ia.get(f);m&&o.Ia.set(f,m.withResumeToken(h.resumeToken,a))}})),l.targetMismatches.forEach(((h,f)=>{const m=o.Ia.get(h);if(!m)return;o.Ia.set(h,m.withResumeToken(gt.EMPTY_BYTE_STRING,m.snapshotVersion)),gc(o,h);const T=new Zt(m.target,h,f,m.sequenceNumber);_i(o,T)})),o.remoteSyncer.applyRemoteEvent(l)})(n,e)}catch(r){N(ve,"Failed to raise snapshot:",r),await br(n,r)}}async function br(n,t,e){if(!Ye(t))throw t;n.Ea.add(1),await Ln(n),n.Ra.set("Offline"),e||(e=()=>fc(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(ve,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await jr(n)}))}function yc(n,t){return t().catch((e=>br(n,e,t)))}async function qr(n){const t=F(n),e=le(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:ri;for(;Pp(t);)try{const s=await lp(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Vp(t,s)}catch(s){await br(t,s)}Ec(t)&&Tc(t)}function Pp(n){return Ce(n)&&n.Ta.length<10}function Vp(n,t){n.Ta.push(t);const e=le(n);e.O_()&&e.X_&&e.ea(t.mutations)}function Ec(n){return Ce(n)&&!le(n).x_()&&n.Ta.length>0}function Tc(n){le(n).start()}async function Dp(n){le(n).ra()}async function Np(n){const t=le(n);for(const e of n.Ta)t.ea(e.mutations)}async function kp(n,t,e){const r=n.Ta.shift(),s=ci.from(r,t,e);await yc(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await qr(n)}async function Op(n,t){t&&le(n).X_&&await(async function(r,s){if((function(a){return md(a)&&a!==C.ABORTED})(s.code)){const o=r.Ta.shift();le(r).B_(),await yc(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await qr(r)}})(n,t),Ec(n)&&Tc(n)}async function Va(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),N(ve,"RemoteStore received new credentials");const r=Ce(e);e.Ea.add(3),await Ln(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await jr(e)}async function xp(n,t){const e=F(n);t?(e.Ea.delete(2),await jr(e)):t||(e.Ea.add(2),await Ln(e),e.Ra.set("Unknown"))}function Je(n){return n.ma||(n.ma=(function(e,r,s){const o=F(e);return o.sa(),new Ep(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Xo:Rp.bind(null,n),t_:bp.bind(null,n),r_:Sp.bind(null,n),H_:Cp.bind(null,n)}),n.da.push((async t=>{t?(n.ma.B_(),Ei(n)?yi(n):n.Ra.set("Unknown")):(await n.ma.stop(),_c(n))}))),n.ma}function le(n){return n.fa||(n.fa=(function(e,r,s){const o=F(e);return o.sa(),new Tp(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Dp.bind(null,n),r_:Op.bind(null,n),ta:Np.bind(null,n),na:kp.bind(null,n)}),n.da.push((async t=>{t?(n.fa.B_(),await qr(n)):(await n.fa.stop(),n.Ta.length>0&&(N(ve,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new se,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new Ti(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ii(n,t){if(zt("AsyncQueue",`${t}: ${n}`),Ye(n))return new O(C.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{static emptySet(t){return new Me(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=En(),this.sortedSet=new Z(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Me)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Me;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(){this.ga=new Z(x.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):M(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class We{constructor(t,e,r,s,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach((l=>{a.push({type:0,doc:l})})),new We(t,e,Me.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Or(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class Lp{constructor(){this.queries=Na(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=Na(),o.forEach(((a,l)=>{for(const h of l.Sa)h.onError(r)}))})(this,new O(C.ABORTED,"Firestore shutting down"))}}function Na(){return new be((n=>Uu(n)),Or)}async function Fp(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.ba()&&t.Da()&&(r=2):(o=new Mp,r=t.Da()?0:1);try{switch(r){case 0:o.wa=await e.onListen(s,!0);break;case 1:o.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=Ii(a,`Initialization of query '${ke(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&wi(e)}async function Up(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.Da()?0:1:!o.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Bp(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&wi(e)}function jp(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function wi(n){n.Ca.forEach((t=>{t.next()}))}var Ws,ka;(ka=Ws||(Ws={})).Ma="default",ka.Cache="cache";class qp{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new We(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=We.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Ws.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(t){this.key=t}}class wc{constructor(t){this.key=t}}class $p{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=z(),this.mutatedKeys=z(),this.eu=Bu(t),this.tu=new Me(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new Da,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((m,T)=>{const A=s.get(m),S=xr(this.query,T)?T:null,D=!!A&&this.mutatedKeys.has(A.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let P=!1;A&&S?A.data.isEqual(S.data)?D!==k&&(r.track({type:3,doc:S}),P=!0):this.su(A,S)||(r.track({type:2,doc:S}),P=!0,(h&&this.eu(S,h)>0||f&&this.eu(S,f)<0)&&(l=!0)):!A&&S?(r.track({type:0,doc:S}),P=!0):A&&!S&&(r.track({type:1,doc:A}),P=!0,(h||f)&&(l=!0)),P&&(S?(a=a.add(S),o=k?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,Cs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((m,T)=>(function(S,D){const k=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Rt:P})}};return k(S)-k(D)})(m.type,T.type)||this.eu(m.doc,T.doc))),this.ou(r),s=s??!1;const l=e&&!s?this._u():[],h=this.Xa.size===0&&this.current&&!s?1:0,f=h!==this.Za;return this.Za=h,a.length!==0||f?{snapshot:new We(this.query,t.tu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Da,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=z(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const e=[];return t.forEach((r=>{this.Xa.has(r)||e.push(new wc(r))})),this.Xa.forEach((r=>{t.has(r)||e.push(new Ic(r))})),e}cu(t){this.Ya=t.Qs,this.Xa=z();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return We.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const vi="SyncEngine";class zp{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Hp{constructor(t){this.key=t,this.hu=!1}}class Gp{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new be((l=>Uu(l)),Or),this.Iu=new Map,this.Eu=new Set,this.du=new Z(x.comparator),this.Au=new Map,this.Ru=new fi,this.Vu={},this.mu=new Map,this.fu=Ke.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Kp(n,t,e=!0){const r=Cc(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await vc(r,t,e,!0),s}async function Wp(n,t){const e=Cc(n);await vc(e,t,!0,!1)}async function vc(n,t,e,r){const s=await hp(n.localStore,Mt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await Qp(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&mc(n.remoteStore,s),l}async function Qp(n,t,e,r,s){n.pu=(T,A,S)=>(async function(k,P,q,j){let U=P.view.ru(q);U.Cs&&(U=await Ra(k.localStore,P.query,!1).then((({documents:E})=>P.view.ru(E,U))));const K=j&&j.targetChanges.get(P.targetId),at=j&&j.targetMismatches.get(P.targetId)!=null,tt=P.view.applyChanges(U,k.isPrimaryClient,K,at);return xa(k,P.targetId,tt.au),tt.snapshot})(n,T,A,S);const o=await Ra(n.localStore,t,!0),a=new $p(t,o.Qs),l=a.ru(o.documents),h=Mn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(l,n.isPrimaryClient,h);xa(n,e,f.au);const m=new zp(t,e,a);return n.Tu.set(t,m),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),f.snapshot}async function Xp(n,t,e){const r=F(n),s=r.Tu.get(t),o=r.Iu.get(s.targetId);if(o.length>1)return r.Iu.set(s.targetId,o.filter((a=>!Or(a,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Gs(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&gi(r.remoteStore,s.targetId),Qs(r,s.targetId)})).catch(Xe)):(Qs(r,s.targetId),await Gs(r.localStore,s.targetId,!0))}async function Yp(n,t){const e=F(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),gi(e.remoteStore,r.targetId))}async function Jp(n,t,e){const r=im(n);try{const s=await(function(a,l){const h=F(a),f=J.now(),m=l.reduce(((S,D)=>S.add(D.key)),z());let T,A;return h.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let D=Ht(),k=z();return h.Ns.getEntries(S,m).next((P=>{D=P,D.forEach(((q,j)=>{j.isValidDocument()||(k=k.add(q))}))})).next((()=>h.localDocuments.getOverlayedDocuments(S,D))).next((P=>{T=P;const q=[];for(const j of l){const U=ld(j,T.get(j.key).overlayedDocument);U!=null&&q.push(new Se(j.key,U,Du(U.value.mapValue),qt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,q,l)})).next((P=>{A=P;const q=P.applyToLocalDocumentSet(T,k);return h.documentOverlayCache.saveOverlays(S,P.batchId,q)}))})).then((()=>({batchId:A.batchId,changes:qu(T)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,h){let f=a.Vu[a.currentUser.toKey()];f||(f=new Z($)),f=f.insert(l,h),a.Vu[a.currentUser.toKey()]=f})(r,s.batchId,e),await Fn(r,s.changes),await qr(r.remoteStore)}catch(s){const o=Ii(s,"Failed to persist write");e.reject(o)}}async function Ac(n,t){const e=F(n);try{const r=await up(e.localStore,t);t.targetChanges.forEach(((s,o)=>{const a=e.Au.get(o);a&&(W(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?W(a.hu,14607):s.removedDocuments.size>0&&(W(a.hu,42227),a.hu=!1))})),await Fn(e,r,t)}catch(r){await Xe(r)}}function Oa(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const h=F(a);h.onlineState=l;let f=!1;h.queries.forEach(((m,T)=>{for(const A of T.Sa)A.va(l)&&(f=!0)})),f&&wi(h)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Zp(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new Z(x.comparator);a=a.insert(o,Tt.newNoDocument(o,L.min()));const l=z().add(o),h=new Ur(L.min(),new Map,new Z($),a,l);await Ac(r,h),r.du=r.du.remove(o),r.Au.delete(t),Ai(r)}else await Gs(r.localStore,t,!1).then((()=>Qs(r,t,e))).catch(Xe)}async function tm(n,t){const e=F(n),r=t.batch.batchId;try{const s=await ap(e.localStore,t);bc(e,r,null),Rc(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Fn(e,s)}catch(s){await Xe(s)}}async function em(n,t,e){const r=F(n);try{const s=await(function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let m;return h.mutationQueue.lookupMutationBatch(f,l).next((T=>(W(T!==null,37113),m=T.keys(),h.mutationQueue.removeMutationBatch(f,T)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,l))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m))).next((()=>h.localDocuments.getDocuments(f,m)))}))})(r.localStore,t);bc(r,t,e),Rc(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Fn(r,s)}catch(s){await Xe(s)}}function Rc(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function bc(n,t,e){const r=F(n);let s=r.Vu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Qs(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach((r=>{n.Ru.containsKey(r)||Sc(n,r)}))}function Sc(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(gi(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),Ai(n))}function xa(n,t,e){for(const r of e)r instanceof Ic?(n.Ru.addReference(r.key,t),nm(n,r)):r instanceof wc?(N(vi,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||Sc(n,r.key)):M(19791,{wu:r})}function nm(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(N(vi,"New document in limbo: "+e),n.Eu.add(r),Ai(n))}function Ai(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new x(Y.fromString(t)),r=n.fu.next();n.Au.set(r,new Hp(e)),n.du=n.du.insert(e,r),mc(n.remoteStore,new Zt(Mt(Fu(e.path)),r,"TargetPurposeLimboResolution",Vr.ce))}}async function Fn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,h)=>{a.push(r.pu(h,t,e).then((f=>{if((f||e)&&r.isPrimaryClient){const m=f?!f.fromCache:e?.targetChanges.get(h.targetId)?.current;r.sharedClientState.updateQueryState(h.targetId,m?"current":"not-current")}if(f){s.push(f);const m=pi.As(h.targetId,f);o.push(m)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(T=>b.forEach(f,(A=>b.forEach(A.Es,(S=>m.persistence.referenceDelegate.addReference(T,A.targetId,S))).next((()=>b.forEach(A.ds,(S=>m.persistence.referenceDelegate.removeReference(T,A.targetId,S)))))))))}catch(T){if(!Ye(T))throw T;N(mi,"Failed to update sequence numbers: "+T)}for(const T of f){const A=T.targetId;if(!T.fromCache){const S=m.Ms.get(A),D=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(D);m.Ms=m.Ms.insert(A,k)}}})(r.localStore,o))}async function rm(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){N(vi,"User change. New user:",t.toKey());const r=await hc(e.localStore,t);e.currentUser=t,(function(o,a){o.mu.forEach((l=>{l.forEach((h=>{h.reject(new O(C.CANCELLED,a))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Fn(e,r.Ls)}}function sm(n,t){const e=F(n),r=e.Au.get(t);if(r&&r.hu)return z().add(r.key);{let s=z();const o=e.Iu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function Cc(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ac.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=sm.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Zp.bind(null,t),t.Pu.H_=Bp.bind(null,t.eventManager),t.Pu.yu=jp.bind(null,t.eventManager),t}function im(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=tm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=em.bind(null,t),t}class Sr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Br(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return op(this.persistence,new rp,t.initialUser,this.serializer)}Cu(t){return new lc(di.mi,this.serializer)}Du(t){return new dp}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Sr.provider={build:()=>new Sr};class om extends Sr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){W(this.persistence.referenceDelegate instanceof Rr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new qd(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Rt.withCacheSize(this.cacheSizeBytes):Rt.DEFAULT;return new lc((r=>Rr.mi(r,e)),this.serializer)}}class Xs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Oa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=rm.bind(null,this.syncEngine),await xp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Lp})()}createDatastore(t){const e=Br(t.databaseInfo.databaseId),r=(function(o){return new yp(o)})(t.databaseInfo);return(function(o,a,l,h){return new wp(o,a,l,h)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,a,l){return new Ap(r,s,o,a,l)})(this.localStore,this.datastore,t.asyncQueue,(e=>Oa(this.syncEngine,e,0)),(function(){return Ca.v()?new Ca:new pp})())}createSyncEngine(t,e){return(function(s,o,a,l,h,f,m){const T=new Gp(s,o,a,l,h,f);return m&&(T.gu=!0),T})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const r=F(e);N(ve,"RemoteStore shutting down."),r.Ea.add(5),await Ln(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Xs.provider={build:()=>new Xs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):zt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he="FirestoreClient";class um{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Et.UNAUTHENTICATED,this.clientId=ei.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{N(he,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(N(he,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new se;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ii(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Ss(n,t){n.asyncQueue.verifyOperationInProgress(),N(he,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await hc(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Ma(n,t){n.asyncQueue.verifyOperationInProgress();const e=await cm(n);N(he,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Va(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Va(t.remoteStore,s))),n._onlineComponents=t}async function cm(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(he,"Using user provided OfflineComponentProvider");try{await Ss(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;je("Error using user provided cache. Falling back to memory cache: "+e),await Ss(n,new Sr)}}else N(he,"Using default OfflineComponentProvider"),await Ss(n,new om(void 0));return n._offlineComponents}async function Pc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(he,"Using user provided OnlineComponentProvider"),await Ma(n,n._uninitializedComponentsProvider._online)):(N(he,"Using default OnlineComponentProvider"),await Ma(n,new Xs))),n._onlineComponents}function lm(n){return Pc(n).then((t=>t.syncEngine))}async function hm(n){const t=await Pc(n),e=t.eventManager;return e.onListen=Kp.bind(null,t.syncEngine),e.onUnlisten=Xp.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Wp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Yp.bind(null,t.syncEngine),e}function fm(n,t,e={}){const r=new se;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,l,h,f){const m=new am({next:A=>{m.Nu(),a.enqueueAndForget((()=>Up(o,T))),A.fromCache&&h.source==="server"?f.reject(new O(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(A)},error:A=>f.reject(A)}),T=new qp(l,m,{includeMetadataChanges:!0,qa:!0});return Fp(o,T)})(await hm(n),n.asyncQueue,t,e,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc="firestore.googleapis.com",Fa=!0;class Ua{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new O(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Dc,this.ssl=Fa}else this.host=t.host,this.ssl=t.ssl??Fa;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=cc;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Bd)throw new O(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}vf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Vc(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new O(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new O(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new O(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class $r{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ua({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ua(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new df;switch(r.type){case"firstParty":return new _f(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=La.get(e);r&&(N("ComponentProvider","Removing Datastore"),La.delete(e),r.terminate())})(this),Promise.resolve()}}function dm(n,t,e,r={}){n=Pn(n,$r);const s=On(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&(Za(`https://${l}`),eu("Firestore",!0)),o.host!==Dc&&o.host!==l&&je("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!Ue(h,a)&&(n._setSettings(h),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=Et.MOCK_USER;else{f=tu(r.mockUserToken,n._app?.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new O(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Et(T)}n._authCredentials=new pf(new Eu(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new zr(this.firestore,t,this._query)}}class dt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ie(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new dt(this.firestore,t,this._key)}toJSON(){return{type:dt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(xn(e,dt._jsonSchema))return new dt(t,r||null,new x(Y.fromString(e.referencePath)))}}dt._jsonSchemaVersion="firestore/documentReference/1.0",dt._jsonSchema={type:ot("string",dt._jsonSchemaVersion),referencePath:ot("string")};class ie extends zr{constructor(t,e,r){super(t,e,Fu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new dt(this.firestore,null,new x(t))}withConverter(t){return new ie(this.firestore,t,this._path)}}function Yg(n,t,...e){if(n=Vt(n),Tu("collection","path",t),n instanceof $r){const r=Y.fromString(t,...e);return Zo(r),new ie(n,null,r)}{if(!(n instanceof dt||n instanceof ie))throw new O(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return Zo(r),new ie(n.firestore,null,r)}}function Jg(n,t,...e){if(n=Vt(n),arguments.length===1&&(t=ei.newId()),Tu("doc","path",t),n instanceof $r){const r=Y.fromString(t,...e);return Jo(r),new dt(n,null,new x(r))}{if(!(n instanceof dt||n instanceof ie))throw new O(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return Jo(r),new dt(n.firestore,n instanceof ie?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="AsyncQueue";class ja{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new dc(this,"async_queue_retry"),this._c=()=>{const r=bs();r&&N(Ba,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=bs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=bs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new se;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Ye(t))throw t;N(Ba,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,zt("INTERNAL UNHANDLED ERROR: ",qa(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=Ti.createAndSchedule(this,t,e,r,(o=>this.hc(o)));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:qa(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function qa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Ri extends $r{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new ja,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ja(t),this._firestoreClient=void 0,await t}}}function Zg(n,t){const e=typeof n=="object"?n:cu(),r=typeof n=="string"?n:yr,s=ou(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Ya("firestore");o&&dm(s,...o)}return s}function Nc(n){if(n._terminated)throw new O(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||pm(n),n._firestoreClient}function pm(n){const t=n._freezeSettings(),e=(function(s,o,a,l){return new Of(s,o,a,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,Vc(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator)})(n._databaseId,n._app?.options.appId||"",n._persistenceKey,t);n._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new um(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(s){const o=s?._online.build();return{_offline:s?._offline.build(o),_online:o}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Pt(gt.fromBase64String(t))}catch(e){throw new O(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Pt(gt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Pt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(xn(t,Pt._jsonSchema))return Pt.fromBase64String(t.bytes)}}Pt._jsonSchemaVersion="firestore/bytes/1.0",Pt._jsonSchema={type:ot("string",Pt._jsonSchemaVersion),bytes:ot("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new mt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return $(this._lat,t._lat)||$(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ft._jsonSchemaVersion}}static fromJSON(t){if(xn(t,Ft._jsonSchema))return new Ft(t.latitude,t.longitude)}}Ft._jsonSchemaVersion="firestore/geoPoint/1.0",Ft._jsonSchema={type:ot("string",Ft._jsonSchemaVersion),latitude:ot("number"),longitude:ot("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(xn(t,Ut._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Ut(t.vectorValues);throw new O(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ut._jsonSchemaVersion="firestore/vectorValue/1.0",Ut._jsonSchema={type:ot("string",Ut._jsonSchemaVersion),vectorValues:ot("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mm=/^__.*__$/;class kc{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Se(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Oc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ac:n})}}class Gr{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Gr({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){const e=this.path?.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){const e=this.path?.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Cr(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Oc(this.Ac)&&mm.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class gm{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Br(t)}Cc(t,e,r,s=!1){return new Gr({Ac:t,methodName:e,Dc:r,path:mt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _m(n){const t=n._freezeSettings(),e=Br(n._databaseId);return new gm(n._databaseId,!!t.ignoreUndefinedProperties,e)}class Kr extends Un{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Kr}}function xc(n,t,e){return new Gr({Ac:3,Dc:t.settings.Dc,methodName:n._methodName,fc:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class bi extends Un{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=xc(this,t,!0),r=this.vc.map((o=>Ze(o,e))),s=new He(r);return new Qu(t.path,s)}isEqual(t){return t instanceof bi&&Ue(this.vc,t.vc)}}class Si extends Un{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=xc(this,t,!0),r=this.vc.map((o=>Ze(o,e))),s=new Ge(r);return new Qu(t.path,s)}isEqual(t){return t instanceof Si&&Ue(this.vc,t.vc)}}function ym(n,t,e,r){const s=n.Cc(1,t,e);Lc("Data must be an object, but it was:",s,r);const o=[],a=St.empty();fe(r,((h,f)=>{const m=Ci(t,h,e);f=Vt(f);const T=s.yc(m);if(f instanceof Kr)o.push(m);else{const A=Ze(f,T);A!=null&&(o.push(m),a.set(m,A))}}));const l=new Dt(o);return new kc(a,l,s.fieldTransforms)}function Em(n,t,e,r,s,o){const a=n.Cc(1,t,e),l=[$a(t,r,e)],h=[s];if(o.length%2!=0)throw new O(C.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let A=0;A<o.length;A+=2)l.push($a(t,o[A])),h.push(o[A+1]);const f=[],m=St.empty();for(let A=l.length-1;A>=0;--A)if(!wm(f,l[A])){const S=l[A];let D=h[A];D=Vt(D);const k=a.yc(S);if(D instanceof Kr)f.push(S);else{const P=Ze(D,k);P!=null&&(f.push(S),m.set(S,P))}}const T=new Dt(f);return new kc(m,T,a.fieldTransforms)}function Ze(n,t){if(Mc(n=Vt(n)))return Lc("Unsupported field value:",t,n),Tm(n,t);if(n instanceof Un)return(function(r,s){if(!Oc(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(r,s){const o=[];let a=0;for(const l of r){let h=Ze(l,s.wc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,t)}return(function(r,s){if((r=Vt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return sd(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=J.fromDate(r);return{timestampValue:Ar(s.serializer,o)}}if(r instanceof J){const o=new J(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ar(s.serializer,o)}}if(r instanceof Ft)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Pt)return{bytesValue:nc(s.serializer,r._byteString)};if(r instanceof dt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:hi(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ut)return(function(a,l){return{mapValue:{fields:{[Pu]:{stringValue:Vu},[Er]:{arrayValue:{values:a.toArray().map((f=>{if(typeof f!="number")throw l.Sc("VectorValues must only contain numeric values.");return ui(l.serializer,f)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${ni(r)}`)})(n,t)}function Tm(n,t){const e={};return vu(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fe(n,((r,s)=>{const o=Ze(s,t.mc(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function Mc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof J||n instanceof Ft||n instanceof Pt||n instanceof dt||n instanceof Un||n instanceof Ut)}function Lc(n,t,e){if(!Mc(e)||!Iu(e)){const r=ni(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function $a(n,t,e){if((t=Vt(t))instanceof Hr)return t._internalPath;if(typeof t=="string")return Ci(n,t);throw Cr("Field path arguments must be of type string or ",n,!1,void 0,e)}const Im=new RegExp("[~\\*/\\[\\]]");function Ci(n,t,e){if(t.search(Im)>=0)throw Cr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Hr(...t.split("."))._internalPath}catch{throw Cr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Cr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new O(C.INVALID_ARGUMENT,l+n+h)}function wm(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new vm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Uc("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class vm extends Fc{data(){return super.data()}}function Uc(n,t){return typeof t=="string"?Ci(n,t):t instanceof Hr?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Am(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Rm{convertValue(t,e="none"){switch(ce(t)){case 0:return null;case 1:return t.booleanValue;case 2:return st(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ue(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return fe(t,((s,o)=>{r[s]=this.convertValue(o,e)})),r}convertVectorValue(t){const e=t.fields?.[Er].arrayValue?.values?.map((r=>st(r.doubleValue)));return new Ut(e)}convertGeoPoint(t){return new Ft(st(t.latitude),st(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Nr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Dn(t));default:return null}}convertTimestamp(t){const e=ae(t);return new J(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Y.fromString(t);W(uc(r),9688,{name:t});const s=new Nn(r.get(1),r.get(3)),o=new x(r.popFirst(5));return s.isEqual(e)||zt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}class or{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Le extends Fc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new pr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Uc("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Le._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Le._jsonSchemaVersion="firestore/documentSnapshot/1.0",Le._jsonSchema={type:ot("string",Le._jsonSchemaVersion),bundleSource:ot("string","DocumentSnapshot"),bundleName:ot("string"),bundle:ot("string")};class pr extends Le{data(t={}){return super.data(t)}}class Fe{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new or(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new pr(this._firestore,this._userDataWriter,r.key,r,new or(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const h=new pr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new or(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>o||l.type!==3)).map((l=>{const h=new pr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new or(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:bm(l.type),doc:h,oldIndex:f,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Fe._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ei.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function bm(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}Fe._jsonSchemaVersion="firestore/querySnapshot/1.0",Fe._jsonSchema={type:ot("string",Fe._jsonSchemaVersion),bundleSource:ot("string","QuerySnapshot"),bundleName:ot("string"),bundle:ot("string")};class Sm extends Rm{constructor(t){super(),this.firestore=t}convertBytes(t){return new Pt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new dt(this.firestore,null,e)}}function t_(n){n=Pn(n,zr);const t=Pn(n.firestore,Ri),e=Nc(t),r=new Sm(t);return Am(n._query),fm(e,n._query).then((s=>new Fe(t,r,n,s)))}function e_(n,t,e,...r){n=Pn(n,dt);const s=Pn(n.firestore,Ri),o=_m(s);let a;return a=typeof(t=Vt(t))=="string"||t instanceof Hr?Em(o,"updateDoc",n._key,t,e,r):ym(o,"updateDoc",n._key,t),Cm(s,[a.toMutation(n._key,qt.exists(!0))])}function Cm(n,t){return(function(r,s){const o=new se;return r.asyncQueue.enqueueAndForget((async()=>Jp(await lm(r),s,o))),o.promise})(Nc(n),t)}function n_(...n){return new bi("arrayUnion",n)}function r_(...n){return new Si("arrayRemove",n)}(function(t,e=!0){(function(s){Qe=s})(uu),Sn(new Be("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new Ri(new mf(r.getProvider("auth-internal")),new yf(a,r.getProvider("app-check-internal")),(function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new O(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Nn(f.options.projectId,m)})(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l}),"PUBLIC").setMultipleInstances(!0)),ne(Wo,Qo,t),ne(Wo,Qo,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc="firebasestorage.googleapis.com",jc="storageBucket",Pm=120*1e3,Vm=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt extends Re{constructor(t,e,r=0){super(Cs(t),`Firebase Storage: ${e} (${Cs(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,rt.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Cs(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var nt;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(nt||(nt={}));function Cs(n){return"storage/"+n}function Pi(){const n="An unknown error occurred, please check the error payload for server response.";return new rt(nt.UNKNOWN,n)}function Dm(n){return new rt(nt.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Nm(n){return new rt(nt.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function km(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new rt(nt.UNAUTHENTICATED,n)}function Om(){return new rt(nt.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function xm(n){return new rt(nt.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Mm(){return new rt(nt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Lm(){return new rt(nt.CANCELED,"User canceled the upload/download.")}function Fm(n){return new rt(nt.INVALID_URL,"Invalid URL '"+n+"'.")}function Um(n){return new rt(nt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Bm(){return new rt(nt.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+jc+"' property when initializing the app?")}function jm(){return new rt(nt.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function qm(){return new rt(nt.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function $m(n){return new rt(nt.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Ys(n){return new rt(nt.INVALID_ARGUMENT,n)}function qc(){return new rt(nt.APP_DELETED,"The Firebase app was deleted.")}function zm(n){return new rt(nt.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function bn(n,t){return new rt(nt.INVALID_FORMAT,"String does not match format '"+n+"': "+t)}function _n(n){throw new rt(nt.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let r;try{r=Ct.makeFromUrl(t,e)}catch{return new Ct(t,"")}if(r.path==="")return r;throw Um(t)}static makeFromUrl(t,e){let r=null;const s="([A-Za-z0-9.\\-_]+)";function o(K){K.path.charAt(K.path.length-1)==="/"&&(K.path_=K.path_.slice(0,-1))}const a="(/(.*))?$",l=new RegExp("^gs://"+s+a,"i"),h={bucket:1,path:3};function f(K){K.path_=decodeURIComponent(K.path)}const m="v[A-Za-z0-9_]+",T=e.replace(/[.]/g,"\\."),A="(/([^?#]*).*)?$",S=new RegExp(`^https?://${T}/${m}/b/${s}/o${A}`,"i"),D={bucket:1,path:3},k=e===Bc?"(?:storage.googleapis.com|storage.cloud.google.com)":e,P="([^?#]*)",q=new RegExp(`^https?://${k}/${s}/${P}`,"i"),U=[{regex:l,indices:h,postModify:o},{regex:S,indices:D,postModify:f},{regex:q,indices:{bucket:1,path:2},postModify:f}];for(let K=0;K<U.length;K++){const at=U[K],tt=at.regex.exec(t);if(tt){const E=tt[at.indices.bucket];let p=tt[at.indices.path];p||(p=""),r=new Ct(E,p),at.postModify(r);break}}if(r==null)throw Fm(t);return r}}class Hm{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(n,t,e){let r=1,s=null,o=null,a=!1,l=0;function h(){return l===2}let f=!1;function m(...P){f||(f=!0,t.apply(null,P))}function T(P){s=setTimeout(()=>{s=null,n(S,h())},P)}function A(){o&&clearTimeout(o)}function S(P,...q){if(f){A();return}if(P){A(),m.call(null,P,...q);return}if(h()||a){A(),m.call(null,P,...q);return}r<64&&(r*=2);let U;l===1?(l=2,U=0):U=(r+Math.random())*1e3,T(U)}let D=!1;function k(P){D||(D=!0,A(),!f&&(s!==null?(P||(l=2),clearTimeout(s),T(0)):P||(l=1)))}return T(0),o=setTimeout(()=>{a=!0,k(!0)},e),k}function Km(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(n){return n!==void 0}function Qm(n){return typeof n=="object"&&!Array.isArray(n)}function Vi(n){return typeof n=="string"||n instanceof String}function za(n){return Di()&&n instanceof Blob}function Di(){return typeof Blob<"u"}function Ha(n,t,e,r){if(r<t)throw Ys(`Invalid value for '${n}'. Expected ${t} or greater.`);if(r>e)throw Ys(`Invalid value for '${n}'. Expected ${e} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(n,t,e){let r=t;return e==null&&(r=`https://${t}`),`${e}://${r}/v0${n}`}function $c(n){const t=encodeURIComponent;let e="?";for(const r in n)if(n.hasOwnProperty(r)){const s=t(r)+"="+t(n[r]);e=e+s+"&"}return e=e.slice(0,-1),e}var Ie;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Ie||(Ie={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xm(n,t){const e=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,o=t.indexOf(n)!==-1;return e||s||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(t,e,r,s,o,a,l,h,f,m,T,A=!0,S=!1){this.url_=t,this.method_=e,this.headers_=r,this.body_=s,this.successCodes_=o,this.additionalRetryCodes_=a,this.callback_=l,this.errorCallback_=h,this.timeout_=f,this.progressCallback_=m,this.connectionFactory_=T,this.retry=A,this.isUsingEmulator=S,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((D,k)=>{this.resolve_=D,this.reject_=k,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new ar(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const a=l=>{const h=l.loaded,f=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(h,f)};this.progressCallback_!==null&&o.addUploadProgressListener(a),o.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(a),this.pendingConnection_=null;const l=o.getErrorCode()===Ie.NO_ERROR,h=o.getStatus();if(!l||Xm(h,this.additionalRetryCodes_)&&this.retry){const m=o.getErrorCode()===Ie.ABORT;r(!1,new ar(!1,null,m));return}const f=this.successCodes_.indexOf(h)!==-1;r(!0,new ar(f,o))})},e=(r,s)=>{const o=this.resolve_,a=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const h=this.callback_(l,l.getResponse());Wm(h)?o(h):o()}catch(h){a(h)}else if(l!==null){const h=Pi();h.serverResponse=l.getErrorText(),this.errorCallback_?a(this.errorCallback_(l,h)):a(h)}else if(s.canceled){const h=this.appDelete_?qc():Lm();a(h)}else{const h=Mm();a(h)}};this.canceled_?e(!1,new ar(!1,null,!0)):this.backoffId_=Gm(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&Km(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ar{constructor(t,e,r){this.wasSuccessCode=t,this.connection=e,this.canceled=!!r}}function Jm(n,t){t!==null&&t.length>0&&(n.Authorization="Firebase "+t)}function Zm(n,t){n["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function tg(n,t){t&&(n["X-Firebase-GMPID"]=t)}function eg(n,t){t!==null&&(n["X-Firebase-AppCheck"]=t)}function ng(n,t,e,r,s,o,a=!0,l=!1){const h=$c(n.urlParams),f=n.url+h,m=Object.assign({},n.headers);return tg(m,t),Jm(m,e),Zm(m,o),eg(m,r),new Ym(f,n.method,m,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rg(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function sg(...n){const t=rg();if(t!==void 0){const e=new t;for(let r=0;r<n.length;r++)e.append(n[r]);return e.getBlob()}else{if(Di())return new Blob(n);throw new rt(nt.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function ig(n,t,e){return n.webkitSlice?n.webkitSlice(t,e):n.mozSlice?n.mozSlice(t,e):n.slice?n.slice(t,e):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(n){if(typeof atob>"u")throw $m("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ps{constructor(t,e){this.data=t,this.contentType=e||null}}function ag(n,t){switch(n){case xt.RAW:return new Ps(zc(t));case xt.BASE64:case xt.BASE64URL:return new Ps(Hc(n,t));case xt.DATA_URL:return new Ps(cg(t),lg(t))}throw Pi()}function zc(n){const t=[];for(let e=0;e<n.length;e++){let r=n.charCodeAt(e);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(e<n.length-1&&(n.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const o=r,a=n.charCodeAt(++e);r=65536|(o&1023)<<10|a&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function ug(n){let t;try{t=decodeURIComponent(n)}catch{throw bn(xt.DATA_URL,"Malformed data URL.")}return zc(t)}function Hc(n,t){switch(n){case xt.BASE64:{const s=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(s||o)throw bn(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case xt.BASE64URL:{const s=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(s||o)throw bn(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=og(t)}catch(s){throw s.message.includes("polyfill")?s:bn(n,"Invalid character found")}const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}class Gc{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw bn(xt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=e[1]||null;r!=null&&(this.base64=hg(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function cg(n){const t=new Gc(n);return t.base64?Hc(xt.BASE64,t.rest):ug(t.rest)}function lg(n){return new Gc(n).contentType}function hg(n,t){return n.length>=t.length?n.substring(n.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(t,e){let r=0,s="";za(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if(za(this.data_)){const r=this.data_,s=ig(r,t,e);return s===null?null:new Jt(s)}else{const r=new Uint8Array(this.data_.buffer,t,e-t);return new Jt(r,!0)}}static getBlob(...t){if(Di()){const e=t.map(r=>r instanceof Jt?r.data_:r);return new Jt(sg.apply(null,e))}else{const e=t.map(a=>Vi(a)?ag(xt.RAW,a).data:a.data_);let r=0;e.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let o=0;return e.forEach(a=>{for(let l=0;l<a.length;l++)s[o++]=a[l]}),new Jt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(n){let t;try{t=JSON.parse(n)}catch{return null}return Qm(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fg(n){if(n.length===0)return null;const t=n.lastIndexOf("/");return t===-1?"":n.slice(0,t)}function dg(n,t){const e=t.split("/").filter(r=>r.length>0).join("/");return n.length===0?e:n+"/"+e}function Wc(n){const t=n.lastIndexOf("/",n.length-2);return t===-1?n:n.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(n,t){return t}class vt{constructor(t,e,r,s){this.server=t,this.local=e||t,this.writable=!!r,this.xform=s||pg}}let ur=null;function mg(n){return!Vi(n)||n.length<2?n:Wc(n)}function Qc(){if(ur)return ur;const n=[];n.push(new vt("bucket")),n.push(new vt("generation")),n.push(new vt("metageneration")),n.push(new vt("name","fullPath",!0));function t(o,a){return mg(a)}const e=new vt("name");e.xform=t,n.push(e);function r(o,a){return a!==void 0?Number(a):a}const s=new vt("size");return s.xform=r,n.push(s),n.push(new vt("timeCreated")),n.push(new vt("updated")),n.push(new vt("md5Hash",null,!0)),n.push(new vt("cacheControl",null,!0)),n.push(new vt("contentDisposition",null,!0)),n.push(new vt("contentEncoding",null,!0)),n.push(new vt("contentLanguage",null,!0)),n.push(new vt("contentType",null,!0)),n.push(new vt("metadata","customMetadata",!0)),ur=n,ur}function gg(n,t){function e(){const r=n.bucket,s=n.fullPath,o=new Ct(r,s);return t._makeStorageReference(o)}Object.defineProperty(n,"ref",{get:e})}function _g(n,t,e){const r={};r.type="file";const s=e.length;for(let o=0;o<s;o++){const a=e[o];r[a.local]=a.xform(r,t[a.server])}return gg(r,n),r}function Xc(n,t,e){const r=Kc(t);return r===null?null:_g(n,r,e)}function yg(n,t,e,r){const s=Kc(t);if(s===null||!Vi(s.downloadTokens))return null;const o=s.downloadTokens;if(o.length===0)return null;const a=encodeURIComponent;return o.split(",").map(f=>{const m=n.bucket,T=n.fullPath,A="/b/"+a(m)+"/o/"+a(T),S=Ni(A,e,r),D=$c({alt:"media",token:f});return S+D})[0]}function Eg(n,t){const e={},r=t.length;for(let s=0;s<r;s++){const o=t[s];o.writable&&(e[o.server]=n[o.local])}return JSON.stringify(e)}class Yc{constructor(t,e,r,s){this.url=t,this.method=e,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(n){if(!n)throw Pi()}function Tg(n,t){function e(r,s){const o=Xc(n,s,t);return Jc(o!==null),o}return e}function Ig(n,t){function e(r,s){const o=Xc(n,s,t);return Jc(o!==null),yg(o,s,n.host,n._protocol)}return e}function Zc(n){function t(e,r){let s;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?s=Om():s=km():e.getStatus()===402?s=Nm(n.bucket):e.getStatus()===403?s=xm(n.path):s=r,s.status=e.getStatus(),s.serverResponse=r.serverResponse,s}return t}function wg(n){const t=Zc(n);function e(r,s){let o=t(r,s);return r.getStatus()===404&&(o=Dm(n.path)),o.serverResponse=s.serverResponse,o}return e}function vg(n,t,e){const r=t.fullServerUrl(),s=Ni(r,n.host,n._protocol),o="GET",a=n.maxOperationRetryTime,l=new Yc(s,o,Ig(n,e),a);return l.errorHandler=wg(t),l}function Ag(n,t){return n&&n.contentType||t&&t.type()||"application/octet-stream"}function Rg(n,t,e){const r=Object.assign({},e);return r.fullPath=n.path,r.size=t.size(),r.contentType||(r.contentType=Ag(null,t)),r}function bg(n,t,e,r,s){const o=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function l(){let U="";for(let K=0;K<2;K++)U=U+Math.random().toString().slice(2);return U}const h=l();a["Content-Type"]="multipart/related; boundary="+h;const f=Rg(t,r,s),m=Eg(f,e),T="--"+h+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+m+`\r
--`+h+`\r
Content-Type: `+f.contentType+`\r
\r
`,A=`\r
--`+h+"--",S=Jt.getBlob(T,r,A);if(S===null)throw jm();const D={name:f.fullPath},k=Ni(o,n.host,n._protocol),P="POST",q=n.maxUploadRetryTime,j=new Yc(k,P,Tg(n,e),q);return j.urlParams=D,j.headers=a,j.body=S.uploadData(),j.errorHandler=Zc(t),j}class Sg{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Ie.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Ie.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Ie.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,r,s,o){if(this.sent_)throw _n("cannot .send() more than once");if(On(t)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(e,t,!0),o!==void 0)for(const a in o)o.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,o[a].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw _n("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw _n("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw _n("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw _n("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Cg extends Sg{initXhr(){this.xhr_.responseType="text"}}function tl(){return new Cg}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(t,e){this._service=t,e instanceof Ct?this._location=e:this._location=Ct.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new Ae(t,e)}get root(){const t=new Ct(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Wc(this._location.path)}get storage(){return this._service}get parent(){const t=fg(this._location.path);if(t===null)return null;const e=new Ct(this._location.bucket,t);return new Ae(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw zm(t)}}function Pg(n,t,e){n._throwIfRoot("uploadBytes");const r=bg(n.storage,n._location,Qc(),new Jt(t,!0),e);return n.storage.makeRequestWithTokens(r,tl).then(s=>({metadata:s,ref:n}))}function Vg(n){n._throwIfRoot("getDownloadURL");const t=vg(n.storage,n._location,Qc());return n.storage.makeRequestWithTokens(t,tl).then(e=>{if(e===null)throw qm();return e})}function Dg(n,t){const e=dg(n._location.path,t),r=new Ct(n._location.bucket,e);return new Ae(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(n){return/^[A-Za-z]+:\/\//.test(n)}function kg(n,t){return new Ae(n,t)}function el(n,t){if(n instanceof ki){const e=n;if(e._bucket==null)throw Bm();const r=new Ae(e,e._bucket);return t!=null?el(r,t):r}else return t!==void 0?Dg(n,t):n}function Og(n,t){if(t&&Ng(t)){if(n instanceof ki)return kg(n,t);throw Ys("To use ref(service, url), the first argument must be a Storage instance.")}else return el(n,t)}function Ga(n,t){const e=t?.[jc];return e==null?null:Ct.makeFromBucketSpec(e,n)}function xg(n,t,e,r={}){n.host=`${t}:${e}`;const s=On(t);s&&(Za(`https://${n.host}/b`),eu("Storage",!0)),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:o}=r;o&&(n._overrideAuthToken=typeof o=="string"?o:tu(o,n.app.options.projectId))}class ki{constructor(t,e,r,s,o,a=!1){this.app=t,this._authProvider=e,this._appCheckProvider=r,this._url=s,this._firebaseVersion=o,this._isUsingEmulator=a,this._bucket=null,this._host=Bc,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Pm,this._maxUploadRetryTime=Vm,this._requests=new Set,s!=null?this._bucket=Ct.makeFromBucketSpec(s,this._host):this._bucket=Ga(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=Ct.makeFromBucketSpec(this._url,t):this._bucket=Ga(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Ha("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Ha("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){if(au(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new Ae(this,t)}_makeRequest(t,e,r,s,o=!0){if(this._deleted)return new Hm(qc());{const a=ng(t,this._appId,r,s,e,this._firebaseVersion,o,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,e){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,r,s).getPromise()}}const Ka="@firebase/storage",Wa="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="storage";function s_(n,t,e){return n=Vt(n),Pg(n,t,e)}function i_(n){return n=Vt(n),Vg(n)}function o_(n,t){return n=Vt(n),Og(n,t)}function a_(n=cu(),t){n=Vt(n);const r=ou(n,nl).getImmediate({identifier:t}),s=Ya("storage");return s&&Mg(r,...s),r}function Mg(n,t,e,r={}){xg(n,t,e,r)}function Lg(n,{instanceIdentifier:t}){const e=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new ki(e,r,s,t,uu)}function Fg(){Sn(new Be(nl,Lg,"PUBLIC").setMultipleInstances(!0)),ne(Ka,Wa,""),ne(Ka,Wa,"esm2020")}Fg();var Ug="firebase",Bg="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ne(Ug,Bg,"app");export{Yg as A,o_ as B,Be as C,i_ as D,nu as E,Re as F,s_ as G,Jg as H,e_ as I,r_ as J,n_ as K,ru as L,uu as S,Sn as _,Hg as a,zg as b,au as c,Vt as d,Js as e,Qg as f,jg as g,G as h,qg as i,Ul as j,On as k,cu as l,ou as m,zl as n,Ue as o,Za as p,Wg as q,ne as r,Gg as s,Kg as t,eu as u,$g as v,ef as w,Zg as x,a_ as y,t_ as z};
