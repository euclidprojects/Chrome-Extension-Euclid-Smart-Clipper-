var ed=Object.defineProperty;var nd=(n,t,e)=>t in n?ed(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var _=(n,t,e)=>nd(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
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
 */const rd=()=>{};var pc={};/**
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
 */const dh=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},sd=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],o=n[e++],u=n[e++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[e++],o=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},ph={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,u=o?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,p=i>>2,g=(i&3)<<4|u>>4;let T=(u&15)<<2|h>>6,S=h&63;c||(S=64,o||(T=64)),r.push(e[p],e[g],e[T],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(dh(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):sd(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],u=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const g=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||u==null||h==null||g==null)throw new id;const T=i<<2|u>>4;if(r.push(T),h!==64){const S=u<<4&240|h>>2;if(r.push(S),g!==64){const N=h<<6&192|g;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class id extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const od=function(n){const t=dh(n);return ph.encodeByteArray(t,!0)},Hi=function(n){return od(n).replace(/\./g,"")},gh=function(n){try{return ph.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function ad(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ud=()=>ad().__FIREBASE_DEFAULTS__,cd=()=>{if(typeof process>"u"||typeof pc>"u")return;const n=pc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ld=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&gh(n[1]);return t&&JSON.parse(t)},go=()=>{try{return rd()||ud()||cd()||ld()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},mh=n=>{var t,e;return(e=(t=go())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},_h=n=>{const t=mh(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Eh=()=>{var n;return(n=go())==null?void 0:n.config},yh=n=>{var t;return(t=go())==null?void 0:t[`_${n}`]};/**
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
 */class Th{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function wh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Hi(JSON.stringify(e)),Hi(JSON.stringify(o)),""].join(".")}/**
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
 */function Kt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function hd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Kt())}function fd(){var t;const n=(t=go())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function pd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function gd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function md(){const n=Kt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function _d(){return!fd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ed(){try{return typeof indexedDB=="object"}catch{return!1}}function yd(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const Td="FirebaseError";class Ue extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Td,Object.setPrototypeOf(this,Ue.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,js.prototype.create)}}class js{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?wd(i,r):"Error",u=`${this.serviceName}: ${o} (${s}).`;return new Ue(s,u,r)}}function wd(n,t){return n.replace(Id,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Id=/\{\$([^}]+)}/g;function Ad(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Qn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],o=t[s];if(gc(i)&&gc(o)){if(!Qn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function gc(n){return n!==null&&typeof n=="object"}/**
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
 */function Gs(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function as(n){const t={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");t[decodeURIComponent(s)]=decodeURIComponent(i)}}),t}function us(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function vd(n,t){const e=new Rd(n,t);return e.subscribe.bind(e)}class Rd{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");Cd(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=pa),s.error===void 0&&(s.error=pa),s.complete===void 0&&(s.complete=pa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Cd(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function pa(){}/**
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
 */function wt(n){return n&&n._delegate?n._delegate:n}/**
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
 */function sr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function r1(n){return(await fetch(n,{credentials:"include"})).ok}class vn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const $n="[DEFAULT]";/**
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
 */class Sd{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Th;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(bd(t))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=$n){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=$n){return this.instances.has(t)}getOptions(t=$n){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);r===u&&o.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Pd(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=$n){return this.component?this.component.multipleInstances?t:$n:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Pd(n){return n===$n?void 0:n}function bd(n){return n.instantiationMode==="EAGER"}/**
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
 */class Nd{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Sd(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ot;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ot||(ot={}));const Od={debug:ot.DEBUG,verbose:ot.VERBOSE,info:ot.INFO,warn:ot.WARN,error:ot.ERROR,silent:ot.SILENT},Dd=ot.INFO,kd={[ot.DEBUG]:"log",[ot.VERBOSE]:"log",[ot.INFO]:"info",[ot.WARN]:"warn",[ot.ERROR]:"error"},Vd=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=kd[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class s1{constructor(t){this.name=t,this._logLevel=Dd,this._logHandler=Vd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in ot))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Od[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,ot.DEBUG,...t),this._logHandler(this,ot.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,ot.VERBOSE,...t),this._logHandler(this,ot.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,ot.INFO,...t),this._logHandler(this,ot.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,ot.WARN,...t),this._logHandler(this,ot.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,ot.ERROR,...t),this._logHandler(this,ot.ERROR,...t)}}const xd=(n,t)=>t.some(e=>n instanceof e);let mc,_c;function Ld(){return mc||(mc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Md(){return _c||(_c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ih=new WeakMap,Na=new WeakMap,Ah=new WeakMap,ga=new WeakMap,i1=new WeakMap;function Ud(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e(En(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&Ih.set(e,n)}).catch(()=>{}),i1.set(t,n),t}function Fd(n){if(Na.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Na.set(n,t)}let Oa={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Na.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Ah.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return En(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Bd(n){Oa=n(Oa)}function $d(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(ma(this),t,...e);return Ah.set(r,t.sort?t.sort():[t]),En(r)}:Md().includes(n)?function(...t){return n.apply(ma(this),t),En(Ih.get(this))}:function(...t){return En(n.apply(ma(this),t))}}function qd(n){return typeof n=="function"?$d(n):(n instanceof IDBTransaction&&Fd(n),xd(n,Ld())?new Proxy(n,Oa):n)}function En(n){if(n instanceof IDBRequest)return Ud(n);if(ga.has(n))return ga.get(n);const t=qd(n);return t!==n&&(ga.set(n,t),i1.set(t,n)),t}const ma=n=>i1.get(n);function Hd(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,t),u=En(o);return r&&o.addEventListener("upgradeneeded",c=>{r(En(o.result),c.oldVersion,c.newVersion,En(o.transaction),c)}),e&&o.addEventListener("blocked",c=>e(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),u}const jd=["get","getKey","getAll","getAllKeys","count"],Gd=["put","add","delete","clear"],_a=new Map;function Ec(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(_a.get(t))return _a.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Gd.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||jd.includes(e)))return;const i=async function(o,...u){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(u.shift())),(await Promise.all([h[e](...u),s&&c.done]))[0]};return _a.set(t,i),i}Bd(n=>({...n,get:(t,e,r)=>Ec(t,e)||n.get(t,e,r),has:(t,e)=>!!Ec(t,e)||n.has(t,e)}));/**
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
 */class zd{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Wd(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Wd(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Da="@firebase/app",yc="0.15.1";/**
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
 */const Ye=new s1("@firebase/app"),Kd="@firebase/app-compat",Yd="@firebase/analytics-compat",Qd="@firebase/analytics",Xd="@firebase/app-check-compat",Jd="@firebase/app-check",Zd="@firebase/auth",t0="@firebase/auth-compat",e0="@firebase/database",n0="@firebase/data-connect",r0="@firebase/database-compat",s0="@firebase/functions",i0="@firebase/functions-compat",o0="@firebase/installations",a0="@firebase/installations-compat",u0="@firebase/messaging",c0="@firebase/messaging-compat",l0="@firebase/performance",h0="@firebase/performance-compat",f0="@firebase/remote-config",d0="@firebase/remote-config-compat",p0="@firebase/storage",g0="@firebase/storage-compat",m0="@firebase/firestore",_0="@firebase/ai",E0="@firebase/firestore-compat",y0="firebase",T0="12.16.0";/**
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
 */const ka="[DEFAULT]",w0={[Da]:"fire-core",[Kd]:"fire-core-compat",[Qd]:"fire-analytics",[Yd]:"fire-analytics-compat",[Jd]:"fire-app-check",[Xd]:"fire-app-check-compat",[Zd]:"fire-auth",[t0]:"fire-auth-compat",[e0]:"fire-rtdb",[n0]:"fire-data-connect",[r0]:"fire-rtdb-compat",[s0]:"fire-fn",[i0]:"fire-fn-compat",[o0]:"fire-iid",[a0]:"fire-iid-compat",[u0]:"fire-fcm",[c0]:"fire-fcm-compat",[l0]:"fire-perf",[h0]:"fire-perf-compat",[f0]:"fire-rc",[d0]:"fire-rc-compat",[p0]:"fire-gcs",[g0]:"fire-gcs-compat",[m0]:"fire-fst",[E0]:"fire-fst-compat",[_0]:"fire-vertex","fire-js":"fire-js",[y0]:"fire-js-all"};/**
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
 */const Rs=new Map,I0=new Map,Va=new Map;function Tc(n,t){try{n.container.addComponent(t)}catch(e){Ye.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Xn(n){const t=n.name;if(Va.has(t))return Ye.debug(`There were multiple attempts to register component ${t}.`),!1;Va.set(t,n);for(const e of Rs.values())Tc(e,n);for(const e of I0.values())Tc(e,n);return!0}function mo(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function re(n){return n==null?!1:n.settings!==void 0}/**
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
 */const A0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yn=new js("app","Firebase",A0);/**
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
 */class v0{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw yn.create("app-deleted",{appName:this._name})}}/**
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
 */const ir=T0;function vh(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:ka,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw yn.create("bad-app-name",{appName:String(s)});if(e||(e=Eh()),!e)throw yn.create("no-options");const i=Rs.get(s);if(i){if(Qn(e,i.options)&&Qn(r,i.config))return i;throw yn.create("duplicate-app",{appName:s})}const o=new Nd(s);for(const c of Va.values())o.addComponent(c);const u=new v0(e,r,o);return Rs.set(s,u),u}function _o(n=ka){const t=Rs.get(n);if(!t&&n===ka&&Eh())return vh();if(!t)throw yn.create("no-app",{appName:n});return t}function R0(){return Array.from(Rs.values())}function Ne(n,t,e){let r=w0[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ye.warn(o.join(" "));return}Xn(new vn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const C0="firebase-heartbeat-database",S0=1,Cs="firebase-heartbeat-store";let Ea=null;function Rh(){return Ea||(Ea=Hd(C0,S0,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Cs)}catch(e){console.warn(e)}}}}).catch(n=>{throw yn.create("idb-open",{originalErrorMessage:n.message})})),Ea}async function P0(n){try{const e=(await Rh()).transaction(Cs),r=await e.objectStore(Cs).get(Ch(n));return await e.done,r}catch(t){if(t instanceof Ue)Ye.warn(t.message);else{const e=yn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ye.warn(e.message)}}}async function wc(n,t){try{const r=(await Rh()).transaction(Cs,"readwrite");await r.objectStore(Cs).put(t,Ch(n)),await r.done}catch(e){if(e instanceof Ue)Ye.warn(e.message);else{const r=yn.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ye.warn(r.message)}}}function Ch(n){return`${n.name}!${n.options.appId}`}/**
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
 */const b0=1024,N0=30;class O0{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new k0(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ic();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>N0){const o=V0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ye.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ic(),{heartbeatsToSend:r,unsentEntries:s}=D0(this._heartbeatsCache.heartbeats),i=Hi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Ye.warn(e),""}}}function Ic(){return new Date().toISOString().substring(0,10)}function D0(n,t=b0){const e=[];let r=n.slice();for(const s of n){const i=e.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Ac(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Ac(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class k0{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ed()?yd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await P0(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return wc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return wc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Ac(n){return Hi(JSON.stringify({version:2,heartbeats:n})).length}function V0(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function x0(n){Xn(new vn("platform-logger",t=>new zd(t),"PRIVATE")),Xn(new vn("heartbeat",t=>new O0(t),"PRIVATE")),Ne(Da,yc,n),Ne(Da,yc,"esm2020"),Ne("fire-js","")}x0("");var L0="firebase",M0="12.16.0";/**
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
 */Ne(L0,M0,"app");function Sh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const U0=Sh,Ph=new js("auth","Firebase",Sh());/**
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
 */const ji=new s1("@firebase/auth");function F0(n,...t){ji.logLevel<=ot.WARN&&ji.warn(`Auth (${ir}): ${n}`,...t)}function Di(n,...t){ji.logLevel<=ot.ERROR&&ji.error(`Auth (${ir}): ${n}`,...t)}/**
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
 */function me(n,...t){throw a1(n,...t)}function we(n,...t){return a1(n,...t)}function o1(n,t,e){const r={...U0(),[t]:e};return new js("auth","Firebase",r).create(t,{appName:n.name})}function Ge(n){return o1(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function B0(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&me(n,"argument-error"),o1(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function a1(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return Ph.create(n,...t)}function Q(n,t,...e){if(!n)throw a1(t,...e)}function $e(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Di(t),new Error(t)}function Qe(n,t){n||$e(t)}/**
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
 */function xa(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function $0(){return vc()==="http:"||vc()==="https:"}function vc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function q0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($0()||pd()||"connection"in navigator)?navigator.onLine:!0}function H0(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class zs{constructor(t,e){this.shortDelay=t,this.longDelay=e,Qe(e>t,"Short delay should be less than long delay!"),this.isMobile=hd()||gd()}get(){return q0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function u1(n,t){Qe(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
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
 */class bh{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$e("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$e("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$e("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const j0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const G0=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],z0=new zs(3e4,6e4);function Ze(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function Fe(n,t,e,r,s={}){return Nh(n,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const u=Gs({...o,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:c,...i};return dd()||(h.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&sr(n.emulatorConfig.host)&&(h.credentials="include"),bh.fetch()(await Oh(n,n.config.apiHost,e,u),h)})}async function Nh(n,t,e){n._canInitEmulator=!1;const r={...j0,...t};try{const s=new K0(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ii(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const u=i.ok?o.errorMessage:o.error.message,[c,h]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ii(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ii(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ii(n,"user-disabled",o);const p=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw o1(n,p,h);me(n,p)}}catch(s){if(s instanceof Ue)throw s;me(n,"network-request-failed",{message:String(s)})}}async function Ws(n,t,e,r,s={}){const i=await Fe(n,t,e,r,s);return"mfaPendingCredential"in i&&me(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Oh(n,t,e,r){const s=`${t}${e}?${r}`,i=n,o=i.config.emulator?u1(n.config,s):`${n.config.apiScheme}://${s}`;return G0.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function W0(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class K0{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(we(this.auth,"network-request-failed")),z0.get())})}}function Ii(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=we(n,t,r);return s.customData._tokenResponse=e,s}function Rc(n){return n!==void 0&&n.enterprise!==void 0}class Y0{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return W0(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Q0(n,t){return Fe(n,"GET","/v2/recaptchaConfig",Ze(n,t))}/**
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
 */async function X0(n,t){return Fe(n,"POST","/v1/accounts:delete",t)}async function Gi(n,t){return Fe(n,"POST","/v1/accounts:lookup",t)}/**
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
 */function ds(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function J0(n,t=!1){const e=wt(n),r=await e.getIdToken(t),s=c1(r);Q(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ds(ya(s.auth_time)),issuedAtTime:ds(ya(s.iat)),expirationTime:ds(ya(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ya(n){return Number(n)*1e3}function c1(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Di("JWT malformed, contained fewer than 3 sections"),null;try{const s=gh(e);return s?JSON.parse(s):(Di("Failed to decode base64 JWT payload"),null)}catch(s){return Di("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Cc(n){const t=c1(n);return Q(t,"internal-error"),Q(typeof t.exp<"u","internal-error"),Q(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function vr(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof Ue&&Z0(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Z0({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class tp{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class La{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=ds(this.lastLoginAt),this.creationTime=ds(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function zi(n){var g;const t=n.auth,e=await n.getIdToken(),r=await vr(n,Gi(t,{idToken:e}));Q(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(g=s.providerUserInfo)!=null&&g.length?Dh(s.providerUserInfo):[],o=np(n.providerData,i),u=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),h=u?c:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new La(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,p)}async function ep(n){const t=wt(n);await zi(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function np(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function Dh(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
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
 */async function rp(n,t){const e=await Nh(n,{},async()=>{const r=Gs({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Oh(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:u,body:r};return n.emulatorConfig&&sr(n.emulatorConfig.host)&&(c.credentials="include"),bh.fetch()(o,c)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function sp(n,t){return Fe(n,"POST","/v2/accounts:revokeToken",Ze(n,t))}/**
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
 */class yr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Q(t.idToken,"internal-error"),Q(typeof t.idToken<"u","internal-error"),Q(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Cc(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){Q(t.length!==0,"internal-error");const e=Cc(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await rp(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,o=new yr;return r&&(Q(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(Q(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new yr,this.toJSON())}_performRefresh(){return $e("not implemented")}}/**
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
 */function un(n,t){Q(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class ye{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new tp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new La(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await vr(this,this.stsTokenManager.getToken(this.auth,t));return Q(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return J0(this,t)}reload(){return ep(this)}_assign(t){this!==t&&(Q(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new ye({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await zi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(re(this.auth.app))return Promise.reject(Ge(this.auth));const t=await this.getIdToken();return await vr(this,X0(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,u=e.tenantId??void 0,c=e._redirectEventId??void 0,h=e.createdAt??void 0,p=e.lastLoginAt??void 0,{uid:g,emailVerified:T,isAnonymous:S,providerData:N,stsTokenManager:L}=e;Q(g&&L,t,"internal-error");const U=yr.fromJSON(this.name,L);Q(typeof g=="string",t,"internal-error"),un(r,t.name),un(s,t.name),Q(typeof T=="boolean",t,"internal-error"),Q(typeof S=="boolean",t,"internal-error"),un(i,t.name),un(o,t.name),un(u,t.name),un(c,t.name),un(h,t.name),un(p,t.name);const W=new ye({uid:g,auth:t,email:s,emailVerified:T,displayName:r,isAnonymous:S,photoURL:o,phoneNumber:i,tenantId:u,stsTokenManager:U,createdAt:h,lastLoginAt:p});return N&&Array.isArray(N)&&(W.providerData=N.map(rt=>({...rt}))),c&&(W._redirectEventId=c),W}static async _fromIdTokenResponse(t,e,r=!1){const s=new yr;s.updateFromServerResponse(e);const i=new ye({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await zi(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Dh(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),u=new yr;u.updateFromIdToken(r);const c=new ye({uid:s.localId,auth:t,stsTokenManager:u,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new La(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
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
 */const Sc=new Map;function qe(n){Qe(n instanceof Function,"Expected a class definition");let t=Sc.get(n);return t?(Qe(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,Sc.set(n,t),t)}/**
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
 */class kh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}kh.type="NONE";const Pc=kh;/**
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
 */function ki(n,t,e){return`firebase:${n}:${t}:${e}`}class Tr{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ki(this.userKey,s.apiKey,i),this.fullPersistenceKey=ki("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await Gi(this.auth,{idToken:t}).catch(()=>{});return e?ye._fromGetAccountInfoResponse(this.auth,e,t):null}return ye._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Tr(qe(Pc),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||qe(Pc);const o=ki(r,t.config.apiKey,t.name);let u=null;for(const h of e)try{const p=await h._get(o);if(p){let g;if(typeof p=="string"){const T=await Gi(t,{idToken:p}).catch(()=>{});if(!T)break;g=await ye._fromGetAccountInfoResponse(t,T,p)}else g=ye._fromJSON(t,p);h!==i&&(u=g),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Tr(i,t,r):(i=c[0],u&&await i._set(o,u.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Tr(i,t,r))}}/**
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
 */function bc(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Mh(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Vh(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Fh(t))return"Blackberry";if(Bh(t))return"Webos";if(xh(t))return"Safari";if((t.includes("chrome/")||Lh(t))&&!t.includes("edge/"))return"Chrome";if(Uh(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Vh(n=Kt()){return/firefox\//i.test(n)}function xh(n=Kt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Lh(n=Kt()){return/crios\//i.test(n)}function Mh(n=Kt()){return/iemobile/i.test(n)}function Uh(n=Kt()){return/android/i.test(n)}function Fh(n=Kt()){return/blackberry/i.test(n)}function Bh(n=Kt()){return/webos/i.test(n)}function l1(n=Kt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ip(n=Kt()){var t;return l1(n)&&!!((t=window.navigator)!=null&&t.standalone)}function op(){return md()&&document.documentMode===10}function $h(n=Kt()){return l1(n)||Uh(n)||Bh(n)||Fh(n)||/windows phone/i.test(n)||Mh(n)}/**
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
 */function qh(n,t=[]){let e;switch(n){case"Browser":e=bc(Kt());break;case"Worker":e=`${bc(Kt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${ir}/${r}`}/**
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
 */class ap{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((o,u)=>{try{const c=t(i);o(c)}catch(c){u(c)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function up(n,t={}){return Fe(n,"GET","/v2/passwordPolicy",Ze(n,t))}/**
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
 */const cp=6;class lp{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??cp,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
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
 */class hp{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nc(this),this.idTokenSubscription=new Nc(this),this.beforeStateQueue=new ap(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ph,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=qe(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Tr.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await Gi(this,{idToken:t}),r=await ye._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(re(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,u=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(t);(!o||o===u)&&(c!=null&&c.user)&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await zi(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=H0()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(re(this.app))return Promise.reject(Ge(this));const e=t?wt(t):null;return e&&Q(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&Q(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return re(this.app)?Promise.reject(Ge(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return re(this.app)?Promise.reject(Ge(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(qe(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await up(this),e=new lp(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new js("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await sp(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&qe(t)||this._popupRedirectResolver;Q(e,this,"argument-error"),this.redirectPersistenceManager=await Tr.create(this,[qe(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(u,this,"internal-error"),u.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const c=t.addObserver(e,r,s);return()=>{o=!0,c()}}else{const c=t.addObserver(e);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=qh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(re(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&F0(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function tn(n){return wt(n)}class Nc{constructor(t){this.auth=t,this.observer=null,this.addObserver=vd(e=>this.observer=e)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Eo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function fp(n){Eo=n}function Hh(n){return Eo.loadJS(n)}function dp(){return Eo.recaptchaEnterpriseScript}function pp(){return Eo.gapiScript}function gp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class mp{constructor(){this.enterprise=new _p}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}class _p{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}const Ep="recaptcha-enterprise",jh="NO_RECAPTCHA",Oc="onFirebaseAuthREInstanceReady";class ln{constructor(t){this.type=Ep,this.auth=tn(t)}async verify(t="verify",e=!1){async function r(i){if(!e){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,u)=>{Q0(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const h=new Y0(c);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(c=>{u(c)})})}function s(i,o,u){const c=window.grecaptcha;Rc(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:t}).then(h=>{o(h)}).catch(()=>{o(jh)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new mp().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async u=>{if(!e&&Rc(window.grecaptcha)&&ln.scriptInjectionDeferred)await ln.scriptInjectionDeferred.promise,s(u,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=dp();c.length!==0&&(c+=u+`&onload=${Oc}`),ln.scriptInjectionDeferred=new Th,window[Oc]=()=>{var h;(h=ln.scriptInjectionDeferred)==null||h.resolve()},Hh(c).then(()=>{var h;return(h=ln.scriptInjectionDeferred)==null?void 0:h.promise}).then(()=>{s(u,i,o)}).catch(h=>{o(h)})}}).catch(u=>{o(u)})})}}ln.scriptInjectionDeferred=null;async function Dc(n,t,e,r=!1,s=!1){const i=new ln(n);let o;if(s)o=jh;else try{o=await i.verify(e)}catch{o=await i.verify(e,!0)}const u={...t};if(e==="mfaSmsEnrollment"||e==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const c=u.phoneEnrollmentInfo.phoneNumber,h=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const c=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:o}):Object.assign(u,{captchaResponse:o}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Wi(n,t,e,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Dc(n,t,e,e==="getOobCode");return r(n,o)}else return r(n,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Dc(n,t,e,e==="getOobCode");return r(n,u)}else return Promise.reject(o)})}/**
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
 */function yp(n,t){const e=mo(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(Qn(i,t??{}))return s;me(s,"already-initialized")}return e.initialize({options:t})}function Tp(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(qe);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function wp(n,t,e){const r=tn(n);Q(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=Gh(t),{host:o,port:u}=Ip(t),c=u===null?"":`:${u}`,h={url:`${i}//${o}${c}/`},p=Object.freeze({host:o,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(Qn(h,r.config.emulator)&&Qn(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,sr(o)?r1(`${i}//${o}${c}`):Ap()}function Gh(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function Ip(n){const t=Gh(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:kc(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:kc(o)}}}function kc(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function Ap(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class h1{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return $e("not implemented")}_getIdTokenResponse(t){return $e("not implemented")}_linkToIdToken(t,e){return $e("not implemented")}_getReauthenticationResolver(t){return $e("not implemented")}}async function vp(n,t){return Fe(n,"POST","/v1/accounts:signUp",t)}/**
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
 */async function Rp(n,t){return Ws(n,"POST","/v1/accounts:signInWithPassword",Ze(n,t))}async function zh(n,t){return Fe(n,"POST","/v1/accounts:sendOobCode",Ze(n,t))}async function Cp(n,t){return zh(n,t)}async function Sp(n,t){return zh(n,t)}/**
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
 */async function Pp(n,t){return Ws(n,"POST","/v1/accounts:signInWithEmailLink",Ze(n,t))}async function bp(n,t){return Ws(n,"POST","/v1/accounts:signInWithEmailLink",Ze(n,t))}/**
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
 */class Ss extends h1{constructor(t,e,r,s=null){super("password",r),this._email=t,this._password=e,this._tenantId=s}static _fromEmailAndPassword(t,e){return new Ss(t,e,"password")}static _fromEmailAndCode(t,e,r=null){return new Ss(t,e,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e!=null&&e.email&&(e!=null&&e.password)){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Wi(t,e,"signInWithPassword",Rp);case"emailLink":return Pp(t,{email:this._email,oobCode:this._password});default:me(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const r={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Wi(t,r,"signUpPassword",vp);case"emailLink":return bp(t,{idToken:e,email:this._email,oobCode:this._password});default:me(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
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
 */async function wr(n,t){return Ws(n,"POST","/v1/accounts:signInWithIdp",Ze(n,t))}/**
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
 */const Np="http://localhost";class Jn extends h1{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new Jn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):me("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const o=new Jn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return wr(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,wr(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,wr(t,e)}buildRequest(){const t={requestUri:Np,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=Gs(e)}return t}}/**
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
 */function Op(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Dp(n){const t=as(us(n)).link,e=t?as(us(t)).deep_link_id:null,r=as(us(n)).deep_link_id;return(r?as(us(r)).link:null)||r||e||t||n}class f1{constructor(t){const e=as(us(t)),r=e.apiKey??null,s=e.oobCode??null,i=Op(e.mode??null);Q(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=e.continueUrl??null,this.languageCode=e.lang??null,this.tenantId=e.tenantId??null}static parseLink(t){const e=Dp(t);try{return new f1(e)}catch{return null}}}/**
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
 */class kr{constructor(){this.providerId=kr.PROVIDER_ID}static credential(t,e){return Ss._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const r=f1.parseLink(e);return Q(r,"argument-error"),Ss._fromEmailAndCode(t,r.code,r.tenantId)}}kr.PROVIDER_ID="password";kr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";kr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class d1{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ks extends d1{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class hn extends Ks{constructor(){super("facebook.com")}static credential(t){return Jn._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return hn.credentialFromTaggedObject(t)}static credentialFromError(t){return hn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return hn.credential(t.oauthAccessToken)}catch{return null}}}hn.FACEBOOK_SIGN_IN_METHOD="facebook.com";hn.PROVIDER_ID="facebook.com";/**
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
 */class fn extends Ks{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return Jn._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return fn.credentialFromTaggedObject(t)}static credentialFromError(t){return fn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return fn.credential(e,r)}catch{return null}}}fn.GOOGLE_SIGN_IN_METHOD="google.com";fn.PROVIDER_ID="google.com";/**
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
 */class dn extends Ks{constructor(){super("github.com")}static credential(t){return Jn._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return dn.credentialFromTaggedObject(t)}static credentialFromError(t){return dn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return dn.credential(t.oauthAccessToken)}catch{return null}}}dn.GITHUB_SIGN_IN_METHOD="github.com";dn.PROVIDER_ID="github.com";/**
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
 */class pn extends Ks{constructor(){super("twitter.com")}static credential(t,e){return Jn._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return pn.credentialFromTaggedObject(t)}static credentialFromError(t){return pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return pn.credential(e,r)}catch{return null}}}pn.TWITTER_SIGN_IN_METHOD="twitter.com";pn.PROVIDER_ID="twitter.com";/**
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
 */async function kp(n,t){return Ws(n,"POST","/v1/accounts:signUp",Ze(n,t))}/**
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
 */class Zn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await ye._fromIdTokenResponse(t,r,s),o=Vc(r);return new Zn({user:i,providerId:o,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=Vc(r);return new Zn({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function Vc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Ki extends Ue{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ki.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new Ki(t,e,r,s)}}function Wh(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ki._fromErrorAndOperation(n,i,t,r):i})}async function Vp(n,t,e=!1){const r=await vr(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return Zn._forOperation(n,"link",r)}/**
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
 */async function xp(n,t,e=!1){const{auth:r}=n;if(re(r.app))return Promise.reject(Ge(r));const s="reauthenticate";try{const i=await vr(n,Wh(r,s,t,n),e);Q(i.idToken,r,"internal-error");const o=c1(i.idToken);Q(o,r,"internal-error");const{sub:u}=o;return Q(n.uid===u,r,"user-mismatch"),Zn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&me(r,"user-mismatch"),i}}/**
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
 */async function Kh(n,t,e=!1){if(re(n.app))return Promise.reject(Ge(n));const r="signIn",s=await Wh(n,r,t),i=await Zn._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}async function Lp(n,t){return Kh(tn(n),t)}/**
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
 */async function Yh(n){const t=tn(n);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function E5(n,t,e){const r=tn(n);await Wi(r,{requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"},"getOobCode",Sp)}async function y5(n,t,e){if(re(n.app))return Promise.reject(Ge(n));const r=tn(n),o=await Wi(r,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",kp).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Yh(n),c}),u=await Zn._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(u.user),u}function T5(n,t,e){return re(n.app)?Promise.reject(Ge(n)):Lp(wt(n),kr.credential(t,e)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Yh(n),r})}async function w5(n,t){const e=wt(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:i}=await Cp(e.auth,s);i!==n.email&&await n.reload()}/**
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
 */async function Mp(n,t){return Fe(n,"POST","/v1/accounts:update",t)}/**
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
 */async function I5(n,{displayName:t,photoURL:e}){if(t===void 0&&e===void 0)return;const r=wt(n),i={idToken:await r.getIdToken(),displayName:t,photoUrl:e,returnSecureToken:!0},o=await vr(r,Mp(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const u=r.providerData.find(({providerId:c})=>c==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function Up(n,t,e,r){return wt(n).onIdTokenChanged(t,e,r)}function Fp(n,t,e){return wt(n).beforeAuthStateChanged(t,e)}function A5(n,t,e,r){return wt(n).onAuthStateChanged(t,e,r)}function v5(n){return wt(n).signOut()}const Yi="__sak";/**
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
 */class Qh{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(Yi,"1"),this.storage.removeItem(Yi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Bp=1e3,$p=10;class Xh extends Qh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$h(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,u,c)=>{this.notifyListeners(o,c)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!e&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);op()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,$p):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},Bp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Xh.type="LOCAL";const qp=Xh;/**
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
 */class Jh extends Qh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}Jh.type="SESSION";const Zh=Jh;/**
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
 */function Hp(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
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
 */class yo{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new yo(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(o).map(async h=>h(e.origin,i)),c=await Hp(u);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}yo.receivers=[];/**
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
 */function p1(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
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
 */class jp{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((u,c)=>{const h=p1("",20);s.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(g){const T=g;if(T.data.eventId===h)switch(T.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(T.data.response);break;default:clearTimeout(p),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Oe(){return window}function Gp(n){Oe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function t2(){return typeof Oe().WorkerGlobalScope<"u"&&typeof Oe().importScripts=="function"}async function zp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Wp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Kp(){return t2()?self:null}/**
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
 */const e2="firebaseLocalStorageDb",Yp=1,Qi="firebaseLocalStorage",n2="fbase_key";class Ys{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function To(n,t){return n.transaction([Qi],t?"readwrite":"readonly").objectStore(Qi)}function Qp(){const n=indexedDB.deleteDatabase(e2);return new Ys(n).toPromise()}function r2(){const n=indexedDB.open(e2,Yp);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Qi,{keyPath:n2})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Qi)?t(r):(r.close(),await Qp(),t(await r2()))})})}async function xc(n,t,e){const r=To(n,!0).put({[n2]:t,value:e});return new Ys(r).toPromise()}async function Xp(n,t){const e=To(n,!1).get(t),r=await new Ys(e).toPromise();return r===void 0?null:r.value}function Lc(n,t){const e=To(n,!0).delete(t);return new Ys(e).toPromise()}const Jp=800,Zp=3;class s2{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=r2(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>Zp)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return t2()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yo._getInstance(Kp()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await zp(),!this.activeServiceWorker)return;this.sender=new jp(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||Wp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async t=>{await xc(t,Yi,"1"),await Lc(t,Yi)}),!0):!1}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>xc(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>Xp(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>Lc(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=To(s,!1).getAll();return new Ys(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Jp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}s2.type="LOCAL";const t7=s2;new zs(3e4,6e4);/**
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
 */function i2(n,t){return t?qe(t):(Q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class g1 extends h1{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return wr(t,this._buildIdpRequest())}_linkToIdToken(t,e){return wr(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return wr(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function e7(n){return Kh(n.auth,new g1(n),n.bypassAuthState)}function n7(n){const{auth:t,user:e}=n;return Q(e,t,"internal-error"),xp(e,new g1(n),n.bypassAuthState)}async function r7(n){const{auth:t,user:e}=n;return Q(e,t,"internal-error"),Vp(e,new g1(n),n.bypassAuthState)}/**
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
 */class o2{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:o,type:u}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return e7;case"linkViaPopup":case"linkViaRedirect":return r7;case"reauthViaPopup":case"reauthViaRedirect":return n7;default:me(this.auth,"internal-error")}}resolve(t){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const s7=new zs(2e3,1e4);async function R5(n,t,e){if(re(n.app))return Promise.reject(we(n,"operation-not-supported-in-this-environment"));const r=tn(n);B0(n,t,d1);const s=i2(r,e);return new Hn(r,"signInViaPopup",t,s).executeNotNull()}class Hn extends o2{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Hn.currentPopupAction&&Hn.currentPopupAction.cancel(),Hn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Q(t,this.auth,"internal-error"),t}async onExecution(){Qe(this.filter.length===1,"Popup operations only handle one event");const t=p1();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(we(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(we(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Hn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(we(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,s7.get())};t()}}Hn.currentPopupAction=null;/**
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
 */const i7="pendingRedirect",Vi=new Map;class o7 extends o2{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=Vi.get(this.auth._key());if(!t){try{const r=await a7(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}Vi.set(this.auth._key(),t)}return this.bypassAuthState||Vi.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function a7(n,t){const e=l7(t),r=c7(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}function u7(n,t){Vi.set(n._key(),t)}function c7(n){return qe(n._redirectPersistence)}function l7(n){return ki(i7,n.config.apiKey,n.name)}async function h7(n,t,e=!1){if(re(n.app))return Promise.reject(Ge(n));const r=tn(n),s=i2(r,t),o=await new o7(r,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
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
 */const f7=600*1e3;class d7{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!p7(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!a2(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(we(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=f7&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mc(t))}saveEventToCache(t){this.cachedEventUids.add(Mc(t)),this.lastProcessedEventTime=Date.now()}}function Mc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function a2({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function p7(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return a2(n);default:return!1}}/**
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
 */async function g7(n,t={}){return Fe(n,"GET","/v1/projects",t)}/**
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
 */const m7=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_7=/^https?/;async function E7(n){if(n.config.emulator)return;const{authorizedDomains:t}=await g7(n);for(const e of t)try{if(y7(e))return}catch{}me(n,"unauthorized-domain")}function y7(n){const t=xa(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===r}if(!_7.test(e))return!1;if(m7.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const T7=new zs(3e4,6e4);function Uc(){const n=Oe().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function w7(n){return new Promise((t,e)=>{var s,i,o;function r(){Uc(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Uc(),e(we(n,"network-request-failed"))},timeout:T7.get()})}if((i=(s=Oe().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=Oe().gapi)!=null&&o.load)r();else{const u=gp("iframefcb");return Oe()[u]=()=>{gapi.load?r():e(we(n,"network-request-failed"))},Hh(`${pp()}?onload=${u}`).catch(c=>e(c))}}).catch(t=>{throw xi=null,t})}let xi=null;function I7(n){return xi=xi||w7(n),xi}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const A7=new zs(5e3,15e3),v7="__/auth/iframe",R7="emulator/auth/iframe",C7={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},S7=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function P7(n){const t=n.config;Q(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?u1(t,R7):`https://${n.config.authDomain}/${v7}`,r={apiKey:t.apiKey,appName:n.name,v:ir},s=S7.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${Gs(r).slice(1)}`}async function b7(n){const t=await I7(n),e=Oe().gapi;return Q(e,n,"internal-error"),t.open({where:document.body,url:P7(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:C7,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=we(n,"network-request-failed"),u=Oe().setTimeout(()=>{i(o)},A7.get());function c(){Oe().clearTimeout(u),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const N7={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},O7=500,D7=600,k7="_blank",V7="http://localhost";class Fc{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function x7(n,t,e,r=O7,s=D7){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const c={...N7,width:r.toString(),height:s.toString(),top:i,left:o},h=Kt().toLowerCase();e&&(u=Lh(h)?k7:e),Vh(h)&&(t=t||V7,c.scrollbars="yes");const p=Object.entries(c).reduce((T,[S,N])=>`${T}${S}=${N},`,"");if(ip(h)&&u!=="_self")return L7(t||"",u),new Fc(null);const g=window.open(t||"",u,p);Q(g,n,"popup-blocked");try{g.focus()}catch{}return new Fc(g)}function L7(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
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
 */const M7="__/auth/handler",U7="emulator/auth/handler",F7=encodeURIComponent("fac");async function Bc(n,t,e,r,s,i){Q(n.config.authDomain,n,"auth-domain-config-required"),Q(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:ir,eventId:s};if(t instanceof d1){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",Ad(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[p,g]of Object.entries({}))o[p]=g}if(t instanceof Ks){const p=t.getScopes().filter(g=>g!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const u=o;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const c=await n._getAppCheckToken(),h=c?`#${F7}=${encodeURIComponent(c)}`:"";return`${B7(n)}?${Gs(u).slice(1)}${h}`}function B7({config:n}){return n.emulator?u1(n,U7):`https://${n.authDomain}/${M7}`}/**
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
 */const Ta="webStorageSupport";class $7{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zh,this._completeRedirectFn=h7,this._overrideRedirectResult=u7}async _openPopup(t,e,r,s){var o;Qe((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Bc(t,e,r,xa(),s);return x7(t,i,p1())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await Bc(t,e,r,xa(),s);return Gp(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(Qe(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await b7(t),r=new d7(t);return e.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Ta,{type:Ta},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Ta];i!==void 0&&e(!!i),me(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=E7(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return $h()||xh()||l1()}}const q7=$7;var $c="@firebase/auth",qc="1.13.3";/**
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
 */class H7{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function j7(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function G7(n){Xn(new vn("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qh(n)},h=new hp(r,s,i,c);return Tp(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),Xn(new vn("auth-internal",t=>{const e=tn(t.getProvider("auth").getImmediate());return(r=>new H7(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ne($c,qc,j7(n)),Ne($c,qc,"esm2020")}/**
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
 */const z7=300,W7=yh("authIdTokenMaxAge")||z7;let Hc=null;const K7=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>W7)return;const s=e==null?void 0:e.token;Hc!==s&&(Hc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Y7(n=_o()){const t=mo(n,"auth");if(t.isInitialized())return t.getImmediate();const e=yp(n,{popupRedirectResolver:q7,persistence:[t7,qp,Zh]}),r=yh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=K7(i.toString());Fp(e,o,()=>o(e.currentUser)),Up(e,u=>o(u))}}const s=mh("auth");return s&&wp(e,`http://${s}`),e}function Q7(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}fp({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=we("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",Q7().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});G7("Browser");var jc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Tn,u2;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,E){function w(){}w.prototype=E.prototype,v.F=E.prototype,v.prototype=new w,v.prototype.constructor=v,v.D=function(R,A,P){for(var y=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)y[ee-2]=arguments[ee];return E.prototype[A].apply(R,y)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,E,w){w||(w=0);const R=Array(16);if(typeof E=="string")for(var A=0;A<16;++A)R[A]=E.charCodeAt(w++)|E.charCodeAt(w++)<<8|E.charCodeAt(w++)<<16|E.charCodeAt(w++)<<24;else for(A=0;A<16;++A)R[A]=E[w++]|E[w++]<<8|E[w++]<<16|E[w++]<<24;E=v.g[0],w=v.g[1],A=v.g[2];let P=v.g[3],y;y=E+(P^w&(A^P))+R[0]+3614090360&4294967295,E=w+(y<<7&4294967295|y>>>25),y=P+(A^E&(w^A))+R[1]+3905402710&4294967295,P=E+(y<<12&4294967295|y>>>20),y=A+(w^P&(E^w))+R[2]+606105819&4294967295,A=P+(y<<17&4294967295|y>>>15),y=w+(E^A&(P^E))+R[3]+3250441966&4294967295,w=A+(y<<22&4294967295|y>>>10),y=E+(P^w&(A^P))+R[4]+4118548399&4294967295,E=w+(y<<7&4294967295|y>>>25),y=P+(A^E&(w^A))+R[5]+1200080426&4294967295,P=E+(y<<12&4294967295|y>>>20),y=A+(w^P&(E^w))+R[6]+2821735955&4294967295,A=P+(y<<17&4294967295|y>>>15),y=w+(E^A&(P^E))+R[7]+4249261313&4294967295,w=A+(y<<22&4294967295|y>>>10),y=E+(P^w&(A^P))+R[8]+1770035416&4294967295,E=w+(y<<7&4294967295|y>>>25),y=P+(A^E&(w^A))+R[9]+2336552879&4294967295,P=E+(y<<12&4294967295|y>>>20),y=A+(w^P&(E^w))+R[10]+4294925233&4294967295,A=P+(y<<17&4294967295|y>>>15),y=w+(E^A&(P^E))+R[11]+2304563134&4294967295,w=A+(y<<22&4294967295|y>>>10),y=E+(P^w&(A^P))+R[12]+1804603682&4294967295,E=w+(y<<7&4294967295|y>>>25),y=P+(A^E&(w^A))+R[13]+4254626195&4294967295,P=E+(y<<12&4294967295|y>>>20),y=A+(w^P&(E^w))+R[14]+2792965006&4294967295,A=P+(y<<17&4294967295|y>>>15),y=w+(E^A&(P^E))+R[15]+1236535329&4294967295,w=A+(y<<22&4294967295|y>>>10),y=E+(A^P&(w^A))+R[1]+4129170786&4294967295,E=w+(y<<5&4294967295|y>>>27),y=P+(w^A&(E^w))+R[6]+3225465664&4294967295,P=E+(y<<9&4294967295|y>>>23),y=A+(E^w&(P^E))+R[11]+643717713&4294967295,A=P+(y<<14&4294967295|y>>>18),y=w+(P^E&(A^P))+R[0]+3921069994&4294967295,w=A+(y<<20&4294967295|y>>>12),y=E+(A^P&(w^A))+R[5]+3593408605&4294967295,E=w+(y<<5&4294967295|y>>>27),y=P+(w^A&(E^w))+R[10]+38016083&4294967295,P=E+(y<<9&4294967295|y>>>23),y=A+(E^w&(P^E))+R[15]+3634488961&4294967295,A=P+(y<<14&4294967295|y>>>18),y=w+(P^E&(A^P))+R[4]+3889429448&4294967295,w=A+(y<<20&4294967295|y>>>12),y=E+(A^P&(w^A))+R[9]+568446438&4294967295,E=w+(y<<5&4294967295|y>>>27),y=P+(w^A&(E^w))+R[14]+3275163606&4294967295,P=E+(y<<9&4294967295|y>>>23),y=A+(E^w&(P^E))+R[3]+4107603335&4294967295,A=P+(y<<14&4294967295|y>>>18),y=w+(P^E&(A^P))+R[8]+1163531501&4294967295,w=A+(y<<20&4294967295|y>>>12),y=E+(A^P&(w^A))+R[13]+2850285829&4294967295,E=w+(y<<5&4294967295|y>>>27),y=P+(w^A&(E^w))+R[2]+4243563512&4294967295,P=E+(y<<9&4294967295|y>>>23),y=A+(E^w&(P^E))+R[7]+1735328473&4294967295,A=P+(y<<14&4294967295|y>>>18),y=w+(P^E&(A^P))+R[12]+2368359562&4294967295,w=A+(y<<20&4294967295|y>>>12),y=E+(w^A^P)+R[5]+4294588738&4294967295,E=w+(y<<4&4294967295|y>>>28),y=P+(E^w^A)+R[8]+2272392833&4294967295,P=E+(y<<11&4294967295|y>>>21),y=A+(P^E^w)+R[11]+1839030562&4294967295,A=P+(y<<16&4294967295|y>>>16),y=w+(A^P^E)+R[14]+4259657740&4294967295,w=A+(y<<23&4294967295|y>>>9),y=E+(w^A^P)+R[1]+2763975236&4294967295,E=w+(y<<4&4294967295|y>>>28),y=P+(E^w^A)+R[4]+1272893353&4294967295,P=E+(y<<11&4294967295|y>>>21),y=A+(P^E^w)+R[7]+4139469664&4294967295,A=P+(y<<16&4294967295|y>>>16),y=w+(A^P^E)+R[10]+3200236656&4294967295,w=A+(y<<23&4294967295|y>>>9),y=E+(w^A^P)+R[13]+681279174&4294967295,E=w+(y<<4&4294967295|y>>>28),y=P+(E^w^A)+R[0]+3936430074&4294967295,P=E+(y<<11&4294967295|y>>>21),y=A+(P^E^w)+R[3]+3572445317&4294967295,A=P+(y<<16&4294967295|y>>>16),y=w+(A^P^E)+R[6]+76029189&4294967295,w=A+(y<<23&4294967295|y>>>9),y=E+(w^A^P)+R[9]+3654602809&4294967295,E=w+(y<<4&4294967295|y>>>28),y=P+(E^w^A)+R[12]+3873151461&4294967295,P=E+(y<<11&4294967295|y>>>21),y=A+(P^E^w)+R[15]+530742520&4294967295,A=P+(y<<16&4294967295|y>>>16),y=w+(A^P^E)+R[2]+3299628645&4294967295,w=A+(y<<23&4294967295|y>>>9),y=E+(A^(w|~P))+R[0]+4096336452&4294967295,E=w+(y<<6&4294967295|y>>>26),y=P+(w^(E|~A))+R[7]+1126891415&4294967295,P=E+(y<<10&4294967295|y>>>22),y=A+(E^(P|~w))+R[14]+2878612391&4294967295,A=P+(y<<15&4294967295|y>>>17),y=w+(P^(A|~E))+R[5]+4237533241&4294967295,w=A+(y<<21&4294967295|y>>>11),y=E+(A^(w|~P))+R[12]+1700485571&4294967295,E=w+(y<<6&4294967295|y>>>26),y=P+(w^(E|~A))+R[3]+2399980690&4294967295,P=E+(y<<10&4294967295|y>>>22),y=A+(E^(P|~w))+R[10]+4293915773&4294967295,A=P+(y<<15&4294967295|y>>>17),y=w+(P^(A|~E))+R[1]+2240044497&4294967295,w=A+(y<<21&4294967295|y>>>11),y=E+(A^(w|~P))+R[8]+1873313359&4294967295,E=w+(y<<6&4294967295|y>>>26),y=P+(w^(E|~A))+R[15]+4264355552&4294967295,P=E+(y<<10&4294967295|y>>>22),y=A+(E^(P|~w))+R[6]+2734768916&4294967295,A=P+(y<<15&4294967295|y>>>17),y=w+(P^(A|~E))+R[13]+1309151649&4294967295,w=A+(y<<21&4294967295|y>>>11),y=E+(A^(w|~P))+R[4]+4149444226&4294967295,E=w+(y<<6&4294967295|y>>>26),y=P+(w^(E|~A))+R[11]+3174756917&4294967295,P=E+(y<<10&4294967295|y>>>22),y=A+(E^(P|~w))+R[2]+718787259&4294967295,A=P+(y<<15&4294967295|y>>>17),y=w+(P^(A|~E))+R[9]+3951481745&4294967295,v.g[0]=v.g[0]+E&4294967295,v.g[1]=v.g[1]+(A+(y<<21&4294967295|y>>>11))&4294967295,v.g[2]=v.g[2]+A&4294967295,v.g[3]=v.g[3]+P&4294967295}r.prototype.v=function(v,E){E===void 0&&(E=v.length);const w=E-this.blockSize,R=this.C;let A=this.h,P=0;for(;P<E;){if(A==0)for(;P<=w;)s(this,v,P),P+=this.blockSize;if(typeof v=="string"){for(;P<E;)if(R[A++]=v.charCodeAt(P++),A==this.blockSize){s(this,R),A=0;break}}else for(;P<E;)if(R[A++]=v[P++],A==this.blockSize){s(this,R),A=0;break}}this.h=A,this.o+=E},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var E=1;E<v.length-8;++E)v[E]=0;E=this.o*8;for(var w=v.length-8;w<v.length;++w)v[w]=E&255,E/=256;for(this.v(v),v=Array(16),E=0,w=0;w<4;++w)for(let R=0;R<32;R+=8)v[E++]=this.g[w]>>>R&255;return v};function i(v,E){var w=u;return Object.prototype.hasOwnProperty.call(w,v)?w[v]:w[v]=E(v)}function o(v,E){this.h=E;const w=[];let R=!0;for(let A=v.length-1;A>=0;A--){const P=v[A]|0;R&&P==E||(w[A]=P,R=!1)}this.g=w}var u={};function c(v){return-128<=v&&v<128?i(v,function(E){return new o([E|0],E<0?-1:0)}):new o([v|0],v<0?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return g;if(v<0)return U(h(-v));const E=[];let w=1;for(let R=0;v>=w;R++)E[R]=v/w|0,w*=4294967296;return new o(E,0)}function p(v,E){if(v.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(v.charAt(0)=="-")return U(p(v.substring(1),E));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=h(Math.pow(E,8));let R=g;for(let P=0;P<v.length;P+=8){var A=Math.min(8,v.length-P);const y=parseInt(v.substring(P,P+A),E);A<8?(A=h(Math.pow(E,A)),R=R.j(A).add(h(y))):(R=R.j(w),R=R.add(h(y)))}return R}var g=c(0),T=c(1),S=c(16777216);n=o.prototype,n.m=function(){if(L(this))return-U(this).m();let v=0,E=1;for(let w=0;w<this.g.length;w++){const R=this.i(w);v+=(R>=0?R:4294967296+R)*E,E*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(N(this))return"0";if(L(this))return"-"+U(this).toString(v);const E=h(Math.pow(v,6));var w=this;let R="";for(;;){const A=ft(w,E).g;w=W(w,A.j(E));let P=((w.g.length>0?w.g[0]:w.h)>>>0).toString(v);if(w=A,N(w))return P+R;for(;P.length<6;)P="0"+P;R=P+R}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function N(v){if(v.h!=0)return!1;for(let E=0;E<v.g.length;E++)if(v.g[E]!=0)return!1;return!0}function L(v){return v.h==-1}n.l=function(v){return v=W(this,v),L(v)?-1:N(v)?0:1};function U(v){const E=v.g.length,w=[];for(let R=0;R<E;R++)w[R]=~v.g[R];return new o(w,~v.h).add(T)}n.abs=function(){return L(this)?U(this):this},n.add=function(v){const E=Math.max(this.g.length,v.g.length),w=[];let R=0;for(let A=0;A<=E;A++){let P=R+(this.i(A)&65535)+(v.i(A)&65535),y=(P>>>16)+(this.i(A)>>>16)+(v.i(A)>>>16);R=y>>>16,P&=65535,y&=65535,w[A]=y<<16|P}return new o(w,w[w.length-1]&-2147483648?-1:0)};function W(v,E){return v.add(U(E))}n.j=function(v){if(N(this)||N(v))return g;if(L(this))return L(v)?U(this).j(U(v)):U(U(this).j(v));if(L(v))return U(this.j(U(v)));if(this.l(S)<0&&v.l(S)<0)return h(this.m()*v.m());const E=this.g.length+v.g.length,w=[];for(var R=0;R<2*E;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(let A=0;A<v.g.length;A++){const P=this.i(R)>>>16,y=this.i(R)&65535,ee=v.i(A)>>>16,xn=v.i(A)&65535;w[2*R+2*A]+=y*xn,rt(w,2*R+2*A),w[2*R+2*A+1]+=P*xn,rt(w,2*R+2*A+1),w[2*R+2*A+1]+=y*ee,rt(w,2*R+2*A+1),w[2*R+2*A+2]+=P*ee,rt(w,2*R+2*A+2)}for(v=0;v<E;v++)w[v]=w[2*v+1]<<16|w[2*v];for(v=E;v<2*E;v++)w[v]=0;return new o(w,0)};function rt(v,E){for(;(v[E]&65535)!=v[E];)v[E+1]+=v[E]>>>16,v[E]&=65535,E++}function ct(v,E){this.g=v,this.h=E}function ft(v,E){if(N(E))throw Error("division by zero");if(N(v))return new ct(g,g);if(L(v))return E=ft(U(v),E),new ct(U(E.g),U(E.h));if(L(E))return E=ft(v,U(E)),new ct(U(E.g),E.h);if(v.g.length>30){if(L(v)||L(E))throw Error("slowDivide_ only works with positive integers.");for(var w=T,R=E;R.l(v)<=0;)w=vt(w),R=vt(R);var A=St(w,1),P=St(R,1);for(R=St(R,2),w=St(w,2);!N(R);){var y=P.add(R);y.l(v)<=0&&(A=A.add(w),P=y),R=St(R,1),w=St(w,1)}return E=W(v,A.j(E)),new ct(A,E)}for(A=g;v.l(E)>=0;){for(w=Math.max(1,Math.floor(v.m()/E.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=R<=48?1:Math.pow(2,R-48),P=h(w),y=P.j(E);L(y)||y.l(v)>0;)w-=R,P=h(w),y=P.j(E);N(P)&&(P=T),A=A.add(P),v=W(v,y)}return new ct(A,v)}n.B=function(v){return ft(this,v).h},n.and=function(v){const E=Math.max(this.g.length,v.g.length),w=[];for(let R=0;R<E;R++)w[R]=this.i(R)&v.i(R);return new o(w,this.h&v.h)},n.or=function(v){const E=Math.max(this.g.length,v.g.length),w=[];for(let R=0;R<E;R++)w[R]=this.i(R)|v.i(R);return new o(w,this.h|v.h)},n.xor=function(v){const E=Math.max(this.g.length,v.g.length),w=[];for(let R=0;R<E;R++)w[R]=this.i(R)^v.i(R);return new o(w,this.h^v.h)};function vt(v){const E=v.g.length+1,w=[];for(let R=0;R<E;R++)w[R]=v.i(R)<<1|v.i(R-1)>>>31;return new o(w,v.h)}function St(v,E){const w=E>>5;E%=32;const R=v.g.length-w,A=[];for(let P=0;P<R;P++)A[P]=E>0?v.i(P+w)>>>E|v.i(P+w+1)<<32-E:v.i(P+w);return new o(A,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,u2=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,Tn=o}).apply(typeof jc<"u"?jc:typeof self<"u"?self:typeof window<"u"?window:{});var Ai=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var c2,cs,l2,Li,Ma,h2,f2,d2;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ai=="object"&&Ai];for(var l=0;l<a.length;++l){var f=a[l];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=e(this);function s(a,l){if(l)t:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var C=a[m];if(!(C in f))break t;f=f[C]}a=a[a.length-1],m=f[a],l=l(m),l!=m&&l!=null&&t(f,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var f=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&f.push([m,l[m]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function u(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function c(a,l,f){return a.call.apply(a.bind,arguments)}function h(a,l,f){return h=c,h.apply(null,arguments)}function p(a,l){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function g(a,l){function f(){}f.prototype=l.prototype,a.Z=l.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(m,C,O){for(var F=Array(arguments.length-2),nt=2;nt<arguments.length;nt++)F[nt-2]=arguments[nt];return l.prototype[C].apply(m,F)}}var T=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function S(a){const l=a.length;if(l>0){const f=Array(l);for(let m=0;m<l;m++)f[m]=a[m];return f}return[]}function N(a,l){for(let m=1;m<arguments.length;m++){const C=arguments[m];var f=typeof C;if(f=f!="object"?f:C?Array.isArray(C)?"array":f:"null",f=="array"||f=="object"&&typeof C.length=="number"){f=a.length||0;const O=C.length||0;a.length=f+O;for(let F=0;F<O;F++)a[f+F]=C[F]}else a.push(C)}}class L{constructor(l,f){this.i=l,this.j=f,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function U(a){o.setTimeout(()=>{throw a},0)}function W(){var a=v;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class rt{constructor(){this.h=this.g=null}add(l,f){const m=ct.get();m.set(l,f),this.h?this.h.next=m:this.g=m,this.h=m}}var ct=new L(()=>new ft,a=>a.reset());class ft{constructor(){this.next=this.g=this.h=null}set(l,f){this.h=l,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let vt,St=!1,v=new rt,E=()=>{const a=Promise.resolve(void 0);vt=()=>{a.then(w)}};function w(){for(var a;a=W();){try{a.h.call(a.g)}catch(f){U(f)}var l=ct;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}St=!1}function R(){this.u=this.u,this.C=this.C}R.prototype.u=!1,R.prototype.dispose=function(){this.u||(this.u=!0,this.N())},R.prototype[Symbol.dispose]=function(){this.dispose()},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var P=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,l),o.removeEventListener("test",f,l)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function ee(a,l){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}g(ee,A),ee.prototype.init=function(a,l){const f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(f=="mouseover"?l=a.fromElement:f=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&ee.Z.h.call(this)},ee.prototype.h=function(){ee.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var xn="closure_listenable_"+(Math.random()*1e6|0),Af=0;function vf(a,l,f,m,C){this.listener=a,this.proxy=null,this.src=l,this.type=f,this.capture=!!m,this.ha=C,this.key=++Af,this.da=this.fa=!1}function ai(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ui(a,l,f){for(const m in a)l.call(f,a[m],m,a)}function Rf(a,l){for(const f in a)l.call(void 0,a[f],f,a)}function du(a){const l={};for(const f in a)l[f]=a[f];return l}const pu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gu(a,l){let f,m;for(let C=1;C<arguments.length;C++){m=arguments[C];for(f in m)a[f]=m[f];for(let O=0;O<pu.length;O++)f=pu[O],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function ci(a){this.src=a,this.g={},this.h=0}ci.prototype.add=function(a,l,f,m,C){const O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);const F=Go(a,l,m,C);return F>-1?(l=a[F],f||(l.fa=!1)):(l=new vf(l,this.src,O,!!m,C),l.fa=f,a.push(l)),l};function jo(a,l){const f=l.type;if(f in a.g){var m=a.g[f],C=Array.prototype.indexOf.call(m,l,void 0),O;(O=C>=0)&&Array.prototype.splice.call(m,C,1),O&&(ai(l),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Go(a,l,f,m){for(let C=0;C<a.length;++C){const O=a[C];if(!O.da&&O.listener==l&&O.capture==!!f&&O.ha==m)return C}return-1}var zo="closure_lm_"+(Math.random()*1e6|0),Wo={};function mu(a,l,f,m,C){if(Array.isArray(l)){for(let O=0;O<l.length;O++)mu(a,l[O],f,m,C);return null}return f=yu(f),a&&a[xn]?a.J(l,f,u(m)?!!m.capture:!1,C):Cf(a,l,f,!1,m,C)}function Cf(a,l,f,m,C,O){if(!l)throw Error("Invalid event type");const F=u(C)?!!C.capture:!!C;let nt=Yo(a);if(nt||(a[zo]=nt=new ci(a)),f=nt.add(l,f,m,F,O),f.proxy)return f;if(m=Sf(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)P||(C=F),C===void 0&&(C=!1),a.addEventListener(l.toString(),m,C);else if(a.attachEvent)a.attachEvent(Eu(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Sf(){function a(f){return l.call(a.src,a.listener,f)}const l=Pf;return a}function _u(a,l,f,m,C){if(Array.isArray(l))for(var O=0;O<l.length;O++)_u(a,l[O],f,m,C);else m=u(m)?!!m.capture:!!m,f=yu(f),a&&a[xn]?(a=a.i,O=String(l).toString(),O in a.g&&(l=a.g[O],f=Go(l,f,m,C),f>-1&&(ai(l[f]),Array.prototype.splice.call(l,f,1),l.length==0&&(delete a.g[O],a.h--)))):a&&(a=Yo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Go(l,f,m,C)),(f=a>-1?l[a]:null)&&Ko(f))}function Ko(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[xn])jo(l.i,a);else{var f=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(f,m,a.capture):l.detachEvent?l.detachEvent(Eu(f),m):l.addListener&&l.removeListener&&l.removeListener(m),(f=Yo(l))?(jo(f,a),f.h==0&&(f.src=null,l[zo]=null)):ai(a)}}}function Eu(a){return a in Wo?Wo[a]:Wo[a]="on"+a}function Pf(a,l){if(a.da)a=!0;else{l=new ee(l,this);const f=a.listener,m=a.ha||a.src;a.fa&&Ko(a),a=f.call(m,l)}return a}function Yo(a){return a=a[zo],a instanceof ci?a:null}var Qo="__closure_events_fn_"+(Math.random()*1e9>>>0);function yu(a){return typeof a=="function"?a:(a[Qo]||(a[Qo]=function(l){return a.handleEvent(l)}),a[Qo])}function qt(){R.call(this),this.i=new ci(this),this.M=this,this.G=null}g(qt,R),qt.prototype[xn]=!0,qt.prototype.removeEventListener=function(a,l,f,m){_u(this,a,l,f,m)};function Qt(a,l){var f,m=a.G;if(m)for(f=[];m;m=m.G)f.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new A(l,a);else if(l instanceof A)l.target=l.target||a;else{var C=l;l=new A(m,a),gu(l,C)}C=!0;let O,F;if(f)for(F=f.length-1;F>=0;F--)O=l.g=f[F],C=li(O,m,!0,l)&&C;if(O=l.g=a,C=li(O,m,!0,l)&&C,C=li(O,m,!1,l)&&C,f)for(F=0;F<f.length;F++)O=l.g=f[F],C=li(O,m,!1,l)&&C}qt.prototype.N=function(){if(qt.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const f=a.g[l];for(let m=0;m<f.length;m++)ai(f[m]);delete a.g[l],a.h--}}this.G=null},qt.prototype.J=function(a,l,f,m){return this.i.add(String(a),l,!1,f,m)},qt.prototype.K=function(a,l,f,m){return this.i.add(String(a),l,!0,f,m)};function li(a,l,f,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let C=!0;for(let O=0;O<l.length;++O){const F=l[O];if(F&&!F.da&&F.capture==f){const nt=F.listener,Vt=F.ha||F.src;F.fa&&jo(a.i,F),C=nt.call(Vt,m)!==!1&&C}}return C&&!m.defaultPrevented}function bf(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Tu(a){a.g=bf(()=>{a.g=null,a.i&&(a.i=!1,Tu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Nf extends R{constructor(l,f){super(),this.m=l,this.l=f,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Tu(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qr(a){R.call(this),this.h=a,this.g={}}g(qr,R);var wu=[];function Iu(a){ui(a.g,function(l,f){this.g.hasOwnProperty(f)&&Ko(l)},a),a.g={}}qr.prototype.N=function(){qr.Z.N.call(this),Iu(this)},qr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xo=o.JSON.stringify,Of=o.JSON.parse,Df=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Au(){}function vu(){}var Hr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Jo(){A.call(this,"d")}g(Jo,A);function Zo(){A.call(this,"c")}g(Zo,A);var Ln={},Ru=null;function hi(){return Ru=Ru||new qt}Ln.Ia="serverreachability";function Cu(a){A.call(this,Ln.Ia,a)}g(Cu,A);function jr(a){const l=hi();Qt(l,new Cu(l))}Ln.STAT_EVENT="statevent";function Su(a,l){A.call(this,Ln.STAT_EVENT,a),this.stat=l}g(Su,A);function Xt(a){const l=hi();Qt(l,new Su(l,a))}Ln.Ja="timingevent";function Pu(a,l){A.call(this,Ln.Ja,a),this.size=l}g(Pu,A);function Gr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function zr(){this.g=!0}zr.prototype.ua=function(){this.g=!1};function kf(a,l,f,m,C,O){a.info(function(){if(a.g)if(O){var F="",nt=O.split("&");for(let dt=0;dt<nt.length;dt++){var Vt=nt[dt].split("=");if(Vt.length>1){const Mt=Vt[0];Vt=Vt[1];const Re=Mt.split("_");F=Re.length>=2&&Re[1]=="type"?F+(Mt+"="+Vt+"&"):F+(Mt+"=redacted&")}}}else F=null;else F=O;return"XMLHTTP REQ ("+m+") [attempt "+C+"]: "+l+`
`+f+`
`+F})}function Vf(a,l,f,m,C,O,F){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+C+"]: "+l+`
`+f+`
`+O+" "+F})}function fr(a,l,f,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Lf(a,f)+(m?" "+m:"")})}function xf(a,l){a.info(function(){return"TIMEOUT: "+l})}zr.prototype.info=function(){};function Lf(a,l){if(!a.g)return l;if(!l)return null;try{const O=JSON.parse(l);if(O){for(a=0;a<O.length;a++)if(Array.isArray(O[a])){var f=O[a];if(!(f.length<2)){var m=f[1];if(Array.isArray(m)&&!(m.length<1)){var C=m[0];if(C!="noop"&&C!="stop"&&C!="close")for(let F=1;F<m.length;F++)m[F]=""}}}}return Xo(O)}catch{return l}}var fi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},bu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Nu;function ta(){}g(ta,Au),ta.prototype.g=function(){return new XMLHttpRequest},Nu=new ta;function Wr(a){return encodeURIComponent(String(a))}function Mf(a){var l=1;a=a.split(":");const f=[];for(;l>0&&a.length;)f.push(a.shift()),l--;return a.length&&f.push(a.join(":")),f}function en(a,l,f,m){this.j=a,this.i=l,this.l=f,this.S=m||1,this.V=new qr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ou}function Ou(){this.i=null,this.g="",this.h=!1}var Du={},ea={};function na(a,l,f){a.M=1,a.A=pi(ve(l)),a.u=f,a.R=!0,ku(a,null)}function ku(a,l){a.F=Date.now(),di(a),a.B=ve(a.A);var f=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),zu(f.i,"t",m),a.C=0,f=a.j.L,a.h=new Ou,a.g=lc(a.j,f?l:null,!a.u),a.P>0&&(a.O=new Nf(h(a.Y,a,a.g),a.P)),l=a.V,f=a.g,m=a.ba;var C="readystatechange";Array.isArray(C)||(C&&(wu[0]=C.toString()),C=wu);for(let O=0;O<C.length;O++){const F=mu(f,C[O],m||l.handleEvent,!1,l.h||l);if(!F)break;l.g[F.key]=F}l=a.J?du(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),jr(),kf(a.i,a.v,a.B,a.l,a.S,a.u)}en.prototype.ba=function(a){a=a.target;const l=this.O;l&&sn(a)==3?l.j():this.Y(a)},en.prototype.Y=function(a){try{if(a==this.g)t:{const nt=sn(this.g),Vt=this.g.ya(),dt=this.g.ca();if(!(nt<3)&&(nt!=3||this.g&&(this.h.h||this.g.la()||Zu(this.g)))){this.K||nt!=4||Vt==7||(Vt==8||dt<=0?jr(3):jr(2)),ra(this);var l=this.g.ca();this.X=l;var f=Uf(this);if(this.o=l==200,Vf(this.i,this.v,this.B,this.l,this.S,nt,l),this.o){if(this.U&&!this.L){e:{if(this.g){var m,C=this.g;if((m=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var O=m;break e}}O=null}if(a=O)fr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,sa(this,a);else{this.o=!1,this.m=3,Xt(12),Mn(this),Kr(this);break t}}if(this.R){a=!0;let Mt;for(;!this.K&&this.C<f.length;)if(Mt=Ff(this,f),Mt==ea){nt==4&&(this.m=4,Xt(14),a=!1),fr(this.i,this.l,null,"[Incomplete Response]");break}else if(Mt==Du){this.m=4,Xt(15),fr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else fr(this.i,this.l,Mt,null),sa(this,Mt);if(Vu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),nt!=4||f.length!=0||this.h.h||(this.m=1,Xt(16),a=!1),this.o=this.o&&a,!a)fr(this.i,this.l,f,"[Invalid Chunked Response]"),Mn(this),Kr(this);else if(f.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),fa(F),F.P=!0,Xt(11))}}else fr(this.i,this.l,f,null),sa(this,f);nt==4&&Mn(this),this.o&&!this.K&&(nt==4?oc(this.j,this):(this.o=!1,di(this)))}else Zf(this.g),l==400&&f.indexOf("Unknown SID")>0?(this.m=3,Xt(12)):(this.m=0,Xt(13)),Mn(this),Kr(this)}}}catch{}finally{}};function Uf(a){if(!Vu(a))return a.g.la();const l=Zu(a.g);if(l==="")return"";let f="";const m=l.length,C=sn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Mn(a),Kr(a),"";a.h.i=new o.TextDecoder}for(let O=0;O<m;O++)a.h.h=!0,f+=a.h.i.decode(l[O],{stream:!(C&&O==m-1)});return l.length=0,a.h.g+=f,a.C=0,a.h.g}function Vu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Ff(a,l){var f=a.C,m=l.indexOf(`
`,f);return m==-1?ea:(f=Number(l.substring(f,m)),isNaN(f)?Du:(m+=1,m+f>l.length?ea:(l=l.slice(m,m+f),a.C=m+f,l)))}en.prototype.cancel=function(){this.K=!0,Mn(this)};function di(a){a.T=Date.now()+a.H,xu(a,a.H)}function xu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Gr(h(a.aa,a),l)}function ra(a){a.D&&(o.clearTimeout(a.D),a.D=null)}en.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(xf(this.i,this.B),this.M!=2&&(jr(),Xt(17)),Mn(this),this.m=2,Kr(this)):xu(this,this.T-a)};function Kr(a){a.j.I==0||a.K||oc(a.j,a)}function Mn(a){ra(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Iu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function sa(a,l){try{var f=a.j;if(f.I!=0&&(f.g==a||ia(f.h,a))){if(!a.L&&ia(f.h,a)&&f.I==3){try{var m=f.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var C=m;if(C[0]==0){t:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)yi(f),_i(f);else break t;ha(f),Xt(18)}}else f.xa=C[1],0<f.xa-f.K&&C[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Gr(h(f.Va,f),6e3));Uu(f.h)<=1&&f.ta&&(f.ta=void 0)}else Fn(f,11)}else if((a.L||f.g==a)&&yi(f),!y(l))for(C=f.Ba.g.parse(l),l=0;l<C.length;l++){let dt=C[l];const Mt=dt[0];if(!(Mt<=f.K))if(f.K=Mt,dt=dt[1],f.I==2)if(dt[0]=="c"){f.M=dt[1],f.ba=dt[2];const Re=dt[3];Re!=null&&(f.ka=Re,f.j.info("VER="+f.ka));const Bn=dt[4];Bn!=null&&(f.za=Bn,f.j.info("SVER="+f.za));const on=dt[5];on!=null&&typeof on=="number"&&on>0&&(m=1.5*on,f.O=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const an=a.g;if(an){const wi=an.g?an.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(wi){var O=m.h;O.g||wi.indexOf("spdy")==-1&&wi.indexOf("quic")==-1&&wi.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(oa(O,O.h),O.h=null))}if(m.G){const da=an.g?an.g.getResponseHeader("X-HTTP-Session-Id"):null;da&&(m.wa=da,pt(m.J,m.G,da))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),m=f;var F=a;if(m.na=cc(m,m.L?m.ba:null,m.W),F.L){Fu(m.h,F);var nt=F,Vt=m.O;Vt&&(nt.H=Vt),nt.D&&(ra(nt),di(nt)),m.g=F}else sc(m);f.i.length>0&&Ei(f)}else dt[0]!="stop"&&dt[0]!="close"||Fn(f,7);else f.I==3&&(dt[0]=="stop"||dt[0]=="close"?dt[0]=="stop"?Fn(f,7):la(f):dt[0]!="noop"&&f.l&&f.l.qa(dt),f.A=0)}}jr(4)}catch{}}var Bf=class{constructor(a,l){this.g=a,this.map=l}};function Lu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Mu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Uu(a){return a.h?1:a.g?a.g.size:0}function ia(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function oa(a,l){a.g?a.g.add(l):a.h=l}function Fu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Lu.prototype.cancel=function(){if(this.i=Bu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Bu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const f of a.g.values())l=l.concat(f.G);return l}return S(a.i)}var $u=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $f(a,l){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const m=a[f].indexOf("=");let C,O=null;m>=0?(C=a[f].substring(0,m),O=a[f].substring(m+1)):C=a[f],l(C,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function nn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof nn?(this.l=a.l,Yr(this,a.j),this.o=a.o,this.g=a.g,Qr(this,a.u),this.h=a.h,aa(this,Wu(a.i)),this.m=a.m):a&&(l=String(a).match($u))?(this.l=!1,Yr(this,l[1]||"",!0),this.o=Xr(l[2]||""),this.g=Xr(l[3]||"",!0),Qr(this,l[4]),this.h=Xr(l[5]||"",!0),aa(this,l[6]||"",!0),this.m=Xr(l[7]||"")):(this.l=!1,this.i=new Zr(null,this.l))}nn.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Jr(l,qu,!0),":");var f=this.g;return(f||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Jr(l,qu,!0),"@"),a.push(Wr(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Jr(f,f.charAt(0)=="/"?jf:Hf,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Jr(f,zf)),a.join("")},nn.prototype.resolve=function(a){const l=ve(this);let f=!!a.j;f?Yr(l,a.j):f=!!a.o,f?l.o=a.o:f=!!a.g,f?l.g=a.g:f=a.u!=null;var m=a.h;if(f)Qr(l,a.u);else if(f=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var C=l.h.lastIndexOf("/");C!=-1&&(m=l.h.slice(0,C+1)+m)}if(C=m,C==".."||C==".")m="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){m=C.lastIndexOf("/",0)==0,C=C.split("/");const O=[];for(let F=0;F<C.length;){const nt=C[F++];nt=="."?m&&F==C.length&&O.push(""):nt==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),m&&F==C.length&&O.push("")):(O.push(nt),m=!0)}m=O.join("/")}else m=C}return f?l.h=m:f=a.i.toString()!=="",f?aa(l,Wu(a.i)):f=!!a.m,f&&(l.m=a.m),l};function ve(a){return new nn(a)}function Yr(a,l,f){a.j=f?Xr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Qr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function aa(a,l,f){l instanceof Zr?(a.i=l,Wf(a.i,a.l)):(f||(l=Jr(l,Gf)),a.i=new Zr(l,a.l))}function pt(a,l,f){a.i.set(l,f)}function pi(a){return pt(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Xr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Jr(a,l,f){return typeof a=="string"?(a=encodeURI(a).replace(l,qf),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function qf(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var qu=/[#\/\?@]/g,Hf=/[#\?:]/g,jf=/[#\?]/g,Gf=/[#\?@]/g,zf=/#/g;function Zr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Un(a){a.g||(a.g=new Map,a.h=0,a.i&&$f(a.i,function(l,f){a.add(decodeURIComponent(l.replace(/\+/g," ")),f)}))}n=Zr.prototype,n.add=function(a,l){Un(this),this.i=null,a=dr(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(l),this.h+=1,this};function Hu(a,l){Un(a),l=dr(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function ju(a,l){return Un(a),l=dr(a,l),a.g.has(l)}n.forEach=function(a,l){Un(this),this.g.forEach(function(f,m){f.forEach(function(C){a.call(l,C,m,this)},this)},this)};function Gu(a,l){Un(a);let f=[];if(typeof l=="string")ju(a,l)&&(f=f.concat(a.g.get(dr(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)f=f.concat(a[l]);return f}n.set=function(a,l){return Un(this),this.i=null,a=dr(this,a),ju(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=Gu(this,a),a.length>0?String(a[0]):l):l};function zu(a,l,f){Hu(a,l),f.length>0&&(a.i=null,a.g.set(dr(a,l),S(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var f=l[m];const C=Wr(f);f=Gu(this,f);for(let O=0;O<f.length;O++){let F=C;f[O]!==""&&(F+="="+Wr(f[O])),a.push(F)}}return this.i=a.join("&")};function Wu(a){const l=new Zr;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function dr(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Wf(a,l){l&&!a.j&&(Un(a),a.i=null,a.g.forEach(function(f,m){const C=m.toLowerCase();m!=C&&(Hu(this,m),zu(this,C,f))},a)),a.j=l}function Kf(a,l){const f=new zr;if(o.Image){const m=new Image;m.onload=p(rn,f,"TestLoadImage: loaded",!0,l,m),m.onerror=p(rn,f,"TestLoadImage: error",!1,l,m),m.onabort=p(rn,f,"TestLoadImage: abort",!1,l,m),m.ontimeout=p(rn,f,"TestLoadImage: timeout",!1,l,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function Yf(a,l){const f=new zr,m=new AbortController,C=setTimeout(()=>{m.abort(),rn(f,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(O=>{clearTimeout(C),O.ok?rn(f,"TestPingServer: ok",!0,l):rn(f,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(C),rn(f,"TestPingServer: error",!1,l)})}function rn(a,l,f,m,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),m(f)}catch{}}function Qf(){this.g=new Df}function ua(a){this.i=a.Sb||null,this.h=a.ab||!1}g(ua,Au),ua.prototype.g=function(){return new gi(this.i,this.h)};function gi(a,l){qt.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(gi,qt),n=gi.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,es(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ts(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,es(this)),this.g&&(this.readyState=3,es(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ku(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ku(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?ts(this):es(this),this.readyState==3&&Ku(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,ts(this))},n.Na=function(a){this.g&&(this.response=a,ts(this))},n.ga=function(){this.g&&ts(this)};function ts(a){a.readyState=4,a.l=null,a.j=null,a.B=null,es(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var f=l.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=l.next();return a.join(`\r
`)};function es(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(gi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Yu(a){let l="";return ui(a,function(f,m){l+=m,l+=":",l+=f,l+=`\r
`}),l}function ca(a,l,f){t:{for(m in f){var m=!1;break t}m=!0}m||(f=Yu(f),typeof a=="string"?f!=null&&Wr(f):pt(a,l,f))}function yt(a){qt.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(yt,qt);var Xf=/^https?$/i,Jf=["POST","PUT"];n=yt.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Nu.g(),this.g.onreadystatechange=T(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(O){Qu(this,O);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var C in m)f.set(C,m[C]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const O of m.keys())f.set(O,m.get(O));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(O=>O.toLowerCase()=="content-type"),C=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Jf,l,void 0)>=0)||m||C||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,F]of f)this.g.setRequestHeader(O,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(O){Qu(this,O)}};function Qu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Xu(a),mi(a)}function Xu(a){a.A||(a.A=!0,Qt(a,"complete"),Qt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Qt(this,"complete"),Qt(this,"abort"),mi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),mi(this,!0)),yt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ju(this):this.Xa())},n.Xa=function(){Ju(this)};function Ju(a){if(a.h&&typeof i<"u"){if(a.v&&sn(a)==4)setTimeout(a.Ca.bind(a),0);else if(Qt(a,"readystatechange"),sn(a)==4){a.h=!1;try{const O=a.ca();t:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var f;if(!(f=l)){var m;if(m=O===0){let F=String(a.D).match($u)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),m=!Xf.test(F?F.toLowerCase():"")}f=m}if(f)Qt(a,"complete"),Qt(a,"success");else{a.o=6;try{var C=sn(a)>2?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.ca()+"]",Xu(a)}}finally{mi(a)}}}}function mi(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,l||Qt(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function sn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return sn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Of(l)}};function Zu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Zf(a){const l={};a=(a.g&&sn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var f=Mf(a[m]);const C=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const O=l[C]||[];l[C]=O,O.push(f)}Rf(l,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ns(a,l,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||l}function tc(a){this.za=0,this.i=[],this.j=new zr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ns("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ns("baseRetryDelayMs",5e3,a),this.Za=ns("retryDelaySeedMs",1e4,a),this.Ta=ns("forwardChannelMaxRetries",2,a),this.va=ns("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Lu(a&&a.concurrentRequestLimit),this.Ba=new Qf,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=tc.prototype,n.ka=8,n.I=1,n.connect=function(a,l,f,m){Xt(0),this.W=a,this.H=l||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.J=cc(this,null,this.W),Ei(this)};function la(a){if(ec(a),a.I==3){var l=a.V++,f=ve(a.J);if(pt(f,"SID",a.M),pt(f,"RID",l),pt(f,"TYPE","terminate"),rs(a,f),l=new en(a,a.j,l),l.M=2,l.A=pi(ve(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=l.A,f=!0),f||(l.g=lc(l.j,null),l.g.ea(l.A)),l.F=Date.now(),di(l)}uc(a)}function _i(a){a.g&&(fa(a),a.g.cancel(),a.g=null)}function ec(a){_i(a),a.v&&(o.clearTimeout(a.v),a.v=null),yi(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ei(a){if(!Mu(a.h)&&!a.m){a.m=!0;var l=a.Ea;vt||E(),St||(vt(),St=!0),v.add(l,a),a.D=0}}function td(a,l){return Uu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Gr(h(a.Ea,a,l),ac(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const C=new en(this,this.j,a);let O=this.o;if(this.U&&(O?(O=du(O),gu(O,this.U)):O=this.U),this.u!==null||this.R||(C.J=O,O=null),this.S)t:{for(var l=0,f=0;f<this.i.length;f++){e:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=f;break t}if(l===4096||f===this.i.length-1){l=f+1;break t}}l=1e3}else l=1e3;l=rc(this,C,l),f=ve(this.J),pt(f,"RID",a),pt(f,"CVER",22),this.G&&pt(f,"X-HTTP-Session-Id",this.G),rs(this,f),O&&(this.R?l="headers="+Wr(Yu(O))+"&"+l:this.u&&ca(f,this.u,O)),oa(this.h,C),this.Ra&&pt(f,"TYPE","init"),this.S?(pt(f,"$req",l),pt(f,"SID","null"),C.U=!0,na(C,f,null)):na(C,f,l),this.I=2}}else this.I==3&&(a?nc(this,a):this.i.length==0||Mu(this.h)||nc(this))};function nc(a,l){var f;l?f=l.l:f=a.V++;const m=ve(a.J);pt(m,"SID",a.M),pt(m,"RID",f),pt(m,"AID",a.K),rs(a,m),a.u&&a.o&&ca(m,a.u,a.o),f=new en(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),l&&(a.i=l.G.concat(a.i)),l=rc(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),oa(a.h,f),na(f,m,l)}function rs(a,l){a.H&&ui(a.H,function(f,m){pt(l,m,f)}),a.l&&ui({},function(f,m){pt(l,m,f)})}function rc(a,l,f){f=Math.min(a.i.length,f);const m=a.l?h(a.l.Ka,a.l,a):null;t:{var C=a.i;let nt=-1;for(;;){const Vt=["count="+f];nt==-1?f>0?(nt=C[0].g,Vt.push("ofs="+nt)):nt=0:Vt.push("ofs="+nt);let dt=!0;for(let Mt=0;Mt<f;Mt++){var O=C[Mt].g;const Re=C[Mt].map;if(O-=nt,O<0)nt=Math.max(0,C[Mt].g-100),dt=!1;else try{O="req"+O+"_"||"";try{var F=Re instanceof Map?Re:Object.entries(Re);for(const[Bn,on]of F){let an=on;u(on)&&(an=Xo(on)),Vt.push(O+Bn+"="+encodeURIComponent(an))}}catch(Bn){throw Vt.push(O+"type="+encodeURIComponent("_badmap")),Bn}}catch{m&&m(Re)}}if(dt){F=Vt.join("&");break t}}F=void 0}return a=a.i.splice(0,f),l.G=a,F}function sc(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;vt||E(),St||(vt(),St=!0),v.add(l,a),a.A=0}}function ha(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Gr(h(a.Da,a),ac(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,ic(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Gr(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Xt(10),_i(this),ic(this))};function fa(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function ic(a){a.g=new en(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=ve(a.na);pt(l,"RID","rpc"),pt(l,"SID",a.M),pt(l,"AID",a.K),pt(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&pt(l,"TO",a.ia),pt(l,"TYPE","xmlhttp"),rs(a,l),a.u&&a.o&&ca(l,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=pi(ve(l)),f.u=null,f.R=!0,ku(f,a)}n.Va=function(){this.C!=null&&(this.C=null,_i(this),ha(this),Xt(19))};function yi(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function oc(a,l){var f=null;if(a.g==l){yi(a),fa(a),a.g=null;var m=2}else if(ia(a.h,l))f=l.G,Fu(a.h,l),m=1;else return;if(a.I!=0){if(l.o)if(m==1){f=l.u?l.u.length:0,l=Date.now()-l.F;var C=a.D;m=hi(),Qt(m,new Pu(m,f)),Ei(a)}else sc(a);else if(C=l.m,C==3||C==0&&l.X>0||!(m==1&&td(a,l)||m==2&&ha(a)))switch(f&&f.length>0&&(l=a.h,l.i=l.i.concat(f)),C){case 1:Fn(a,5);break;case 4:Fn(a,10);break;case 3:Fn(a,6);break;default:Fn(a,2)}}}function ac(a,l){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*l}function Fn(a,l){if(a.j.info("Error code "+l),l==2){var f=h(a.bb,a),m=a.Ua;const C=!m;m=new nn(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Yr(m,"https"),pi(m),C?Kf(m.toString(),f):Yf(m.toString(),f)}else Xt(2);a.I=0,a.l&&a.l.pa(l),uc(a),ec(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Xt(2)):(this.j.info("Failed to ping google.com"),Xt(1))};function uc(a){if(a.I=0,a.ja=[],a.l){const l=Bu(a.h);(l.length!=0||a.i.length!=0)&&(N(a.ja,l),N(a.ja,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.oa()}}function cc(a,l,f){var m=f instanceof nn?ve(f):new nn(f);if(m.g!="")l&&(m.g=l+"."+m.g),Qr(m,m.u);else{var C=o.location;m=C.protocol,l=l?l+"."+C.hostname:C.hostname,C=+C.port;const O=new nn(null);m&&Yr(O,m),l&&(O.g=l),C&&Qr(O,C),f&&(O.h=f),m=O}return f=a.G,l=a.wa,f&&l&&pt(m,f,l),pt(m,"VER",a.ka),rs(a,m),m}function lc(a,l,f){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new yt(new ua({ab:f})):new yt(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function hc(){}n=hc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ti(){}Ti.prototype.g=function(a,l){return new ce(a,l)};function ce(a,l){qt.call(this),this.g=new tc(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new pr(this)}g(ce,qt),ce.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ce.prototype.close=function(){la(this.g)},ce.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=Xo(a),a=f);l.i.push(new Bf(l.Ya++,a)),l.I==3&&Ei(l)},ce.prototype.N=function(){this.g.l=null,delete this.j,la(this.g),delete this.g,ce.Z.N.call(this)};function fc(a){Jo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){t:{for(const f in l){a=f;break t}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}g(fc,Jo);function dc(){Zo.call(this),this.status=1}g(dc,Zo);function pr(a){this.g=a}g(pr,hc),pr.prototype.ra=function(){Qt(this.g,"a")},pr.prototype.qa=function(a){Qt(this.g,new fc(a))},pr.prototype.pa=function(a){Qt(this.g,new dc)},pr.prototype.oa=function(){Qt(this.g,"b")},Ti.prototype.createWebChannel=Ti.prototype.g,ce.prototype.send=ce.prototype.o,ce.prototype.open=ce.prototype.m,ce.prototype.close=ce.prototype.close,d2=function(){return new Ti},f2=function(){return hi()},h2=Ln,Ma={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},fi.NO_ERROR=0,fi.TIMEOUT=8,fi.HTTP_ERROR=6,Li=fi,bu.COMPLETE="complete",l2=bu,vu.EventType=Hr,Hr.OPEN="a",Hr.CLOSE="b",Hr.ERROR="c",Hr.MESSAGE="d",qt.prototype.listen=qt.prototype.J,cs=vu,yt.prototype.listenOnce=yt.prototype.K,yt.prototype.getLastError=yt.prototype.Ha,yt.prototype.getLastErrorCode=yt.prototype.ya,yt.prototype.getStatus=yt.prototype.ca,yt.prototype.getResponseJson=yt.prototype.La,yt.prototype.getResponseText=yt.prototype.la,yt.prototype.send=yt.prototype.ea,yt.prototype.setWithCredentials=yt.prototype.Fa,c2=yt}).apply(typeof Ai<"u"?Ai:typeof self<"u"?self:typeof window<"u"?window:{});/*!
 * re2js
 * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
 *
 * @version v0.4.3
 * @author Alexey Vasiliev
 * @homepage https://github.com/le0pard/re2js#readme
 * @repository github:le0pard/re2js
 * @license MIT
 */const _t=class _t{};_(_t,"FOLD_CASE",1),_(_t,"LITERAL",2),_(_t,"CLASS_NL",4),_(_t,"DOT_NL",8),_(_t,"ONE_LINE",16),_(_t,"NON_GREEDY",32),_(_t,"PERL_X",64),_(_t,"UNICODE_GROUPS",128),_(_t,"WAS_DOLLAR",256),_(_t,"MATCH_NL",_t.CLASS_NL|_t.DOT_NL),_(_t,"PERL",_t.CLASS_NL|_t.ONE_LINE|_t.PERL_X|_t.UNICODE_GROUPS),_(_t,"POSIX",0),_(_t,"UNANCHORED",0),_(_t,"ANCHOR_START",1),_(_t,"ANCHOR_BOTH",2);let q=_t;class b{static toUpperCase(t){const e=String.fromCodePoint(t).toUpperCase();if(e.length>1)return t;const r=String.fromCodePoint(e.codePointAt(0)).toLowerCase();return r.length>1||r.codePointAt(0)!==t?t:e.codePointAt(0)}static toLowerCase(t){const e=String.fromCodePoint(t).toLowerCase();if(e.length>1)return t;const r=String.fromCodePoint(e.codePointAt(0)).toUpperCase();return r.length>1||r.codePointAt(0)!==t?t:e.codePointAt(0)}}_(b,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]]));const d=class d{};_(d,"CASE_ORBIT",new Map([[75,107],[107,8490],[8490,75],[83,115],[115,383],[383,83],[181,924],[924,956],[956,181],[197,229],[229,8491],[8491,197],[452,453],[453,454],[454,452],[455,456],[456,457],[457,455],[458,459],[459,460],[460,458],[497,498],[498,499],[499,497],[837,921],[921,953],[953,8126],[8126,837],[914,946],[946,976],[976,914],[917,949],[949,1013],[1013,917],[920,952],[952,977],[977,1012],[1012,920],[922,954],[954,1008],[1008,922],[928,960],[960,982],[982,928],[929,961],[961,1009],[1009,929],[931,962],[962,963],[963,931],[934,966],[966,981],[981,934],[937,969],[969,8486],[8486,937],[1042,1074],[1074,7296],[7296,1042],[1044,1076],[1076,7297],[7297,1044],[1054,1086],[1086,7298],[7298,1054],[1057,1089],[1089,7299],[7299,1057],[1058,1090],[1090,7300],[7300,7301],[7301,1058],[1066,1098],[1098,7302],[7302,1066],[1122,1123],[1123,7303],[7303,1122],[7304,42570],[42570,42571],[42571,7304],[7776,7777],[7777,7835],[7835,7776],[223,7838],[7838,223],[8064,8072],[8072,8064],[8065,8073],[8073,8065],[8066,8074],[8074,8066],[8067,8075],[8075,8067],[8068,8076],[8076,8068],[8069,8077],[8077,8069],[8070,8078],[8078,8070],[8071,8079],[8079,8071],[8080,8088],[8088,8080],[8081,8089],[8089,8081],[8082,8090],[8090,8082],[8083,8091],[8091,8083],[8084,8092],[8092,8084],[8085,8093],[8093,8085],[8086,8094],[8094,8086],[8087,8095],[8095,8087],[8096,8104],[8104,8096],[8097,8105],[8105,8097],[8098,8106],[8106,8098],[8099,8107],[8107,8099],[8100,8108],[8108,8100],[8101,8109],[8109,8101],[8102,8110],[8110,8102],[8103,8111],[8111,8103],[8115,8124],[8124,8115],[8131,8140],[8140,8131],[912,8147],[8147,912],[944,8163],[8163,944],[8179,8188],[8188,8179],[64261,64262],[64262,64261],[66560,66600],[66600,66560],[66561,66601],[66601,66561],[66562,66602],[66602,66562],[66563,66603],[66603,66563],[66564,66604],[66604,66564],[66565,66605],[66605,66565],[66566,66606],[66606,66566],[66567,66607],[66607,66567],[66568,66608],[66608,66568],[66569,66609],[66609,66569],[66570,66610],[66610,66570],[66571,66611],[66611,66571],[66572,66612],[66612,66572],[66573,66613],[66613,66573],[66574,66614],[66614,66574],[66575,66615],[66615,66575],[66576,66616],[66616,66576],[66577,66617],[66617,66577],[66578,66618],[66618,66578],[66579,66619],[66619,66579],[66580,66620],[66620,66580],[66581,66621],[66621,66581],[66582,66622],[66622,66582],[66583,66623],[66623,66583],[66584,66624],[66624,66584],[66585,66625],[66625,66585],[66586,66626],[66626,66586],[66587,66627],[66627,66587],[66588,66628],[66628,66588],[66589,66629],[66629,66589],[66590,66630],[66630,66590],[66591,66631],[66631,66591],[66592,66632],[66632,66592],[66593,66633],[66633,66593],[66594,66634],[66634,66594],[66595,66635],[66635,66595],[66596,66636],[66636,66596],[66597,66637],[66637,66597],[66598,66638],[66638,66598],[66599,66639],[66639,66599],[66736,66776],[66776,66736],[66737,66777],[66777,66737],[66738,66778],[66778,66738],[66739,66779],[66779,66739],[66740,66780],[66780,66740],[66741,66781],[66781,66741],[66742,66782],[66782,66742],[66743,66783],[66783,66743],[66744,66784],[66784,66744],[66745,66785],[66785,66745],[66746,66786],[66786,66746],[66747,66787],[66787,66747],[66748,66788],[66788,66748],[66749,66789],[66789,66749],[66750,66790],[66790,66750],[66751,66791],[66791,66751],[66752,66792],[66792,66752],[66753,66793],[66793,66753],[66754,66794],[66794,66754],[66755,66795],[66795,66755],[66756,66796],[66796,66756],[66757,66797],[66797,66757],[66758,66798],[66798,66758],[66759,66799],[66799,66759],[66760,66800],[66800,66760],[66761,66801],[66801,66761],[66762,66802],[66802,66762],[66763,66803],[66803,66763],[66764,66804],[66804,66764],[66765,66805],[66805,66765],[66766,66806],[66806,66766],[66767,66807],[66807,66767],[66768,66808],[66808,66768],[66769,66809],[66809,66769],[66770,66810],[66810,66770],[66771,66811],[66811,66771],[66928,66967],[66967,66928],[66929,66968],[66968,66929],[66930,66969],[66969,66930],[66931,66970],[66970,66931],[66932,66971],[66971,66932],[66933,66972],[66972,66933],[66934,66973],[66973,66934],[66935,66974],[66974,66935],[66936,66975],[66975,66936],[66937,66976],[66976,66937],[66938,66977],[66977,66938],[66940,66979],[66979,66940],[66941,66980],[66980,66941],[66942,66981],[66981,66942],[66943,66982],[66982,66943],[66944,66983],[66983,66944],[66945,66984],[66984,66945],[66946,66985],[66985,66946],[66947,66986],[66986,66947],[66948,66987],[66987,66948],[66949,66988],[66988,66949],[66950,66989],[66989,66950],[66951,66990],[66990,66951],[66952,66991],[66991,66952],[66953,66992],[66992,66953],[66954,66993],[66993,66954],[66956,66995],[66995,66956],[66957,66996],[66996,66957],[66958,66997],[66997,66958],[66959,66998],[66998,66959],[66960,66999],[66999,66960],[66961,67e3],[67e3,66961],[66962,67001],[67001,66962],[66964,67003],[67003,66964],[66965,67004],[67004,66965],[68736,68800],[68800,68736],[68737,68801],[68801,68737],[68738,68802],[68802,68738],[68739,68803],[68803,68739],[68740,68804],[68804,68740],[68741,68805],[68805,68741],[68742,68806],[68806,68742],[68743,68807],[68807,68743],[68744,68808],[68808,68744],[68745,68809],[68809,68745],[68746,68810],[68810,68746],[68747,68811],[68811,68747],[68748,68812],[68812,68748],[68749,68813],[68813,68749],[68750,68814],[68814,68750],[68751,68815],[68815,68751],[68752,68816],[68816,68752],[68753,68817],[68817,68753],[68754,68818],[68818,68754],[68755,68819],[68819,68755],[68756,68820],[68820,68756],[68757,68821],[68821,68757],[68758,68822],[68822,68758],[68759,68823],[68823,68759],[68760,68824],[68824,68760],[68761,68825],[68825,68761],[68762,68826],[68826,68762],[68763,68827],[68827,68763],[68764,68828],[68828,68764],[68765,68829],[68829,68765],[68766,68830],[68830,68766],[68767,68831],[68831,68767],[68768,68832],[68832,68768],[68769,68833],[68833,68769],[68770,68834],[68834,68770],[68771,68835],[68835,68771],[68772,68836],[68836,68772],[68773,68837],[68837,68773],[68774,68838],[68838,68774],[68775,68839],[68839,68775],[68776,68840],[68840,68776],[68777,68841],[68841,68777],[68778,68842],[68842,68778],[68779,68843],[68843,68779],[68780,68844],[68844,68780],[68781,68845],[68845,68781],[68782,68846],[68846,68782],[68783,68847],[68847,68783],[68784,68848],[68848,68784],[68785,68849],[68849,68785],[68786,68850],[68850,68786],[71840,71872],[71872,71840],[71841,71873],[71873,71841],[71842,71874],[71874,71842],[71843,71875],[71875,71843],[71844,71876],[71876,71844],[71845,71877],[71877,71845],[71846,71878],[71878,71846],[71847,71879],[71879,71847],[71848,71880],[71880,71848],[71849,71881],[71881,71849],[71850,71882],[71882,71850],[71851,71883],[71883,71851],[71852,71884],[71884,71852],[71853,71885],[71885,71853],[71854,71886],[71886,71854],[71855,71887],[71887,71855],[71856,71888],[71888,71856],[71857,71889],[71889,71857],[71858,71890],[71890,71858],[71859,71891],[71891,71859],[71860,71892],[71892,71860],[71861,71893],[71893,71861],[71862,71894],[71894,71862],[71863,71895],[71895,71863],[71864,71896],[71896,71864],[71865,71897],[71897,71865],[71866,71898],[71898,71866],[71867,71899],[71899,71867],[71868,71900],[71900,71868],[71869,71901],[71901,71869],[71870,71902],[71902,71870],[71871,71903],[71903,71871],[93760,93792],[93792,93760],[93761,93793],[93793,93761],[93762,93794],[93794,93762],[93763,93795],[93795,93763],[93764,93796],[93796,93764],[93765,93797],[93797,93765],[93766,93798],[93798,93766],[93767,93799],[93799,93767],[93768,93800],[93800,93768],[93769,93801],[93801,93769],[93770,93802],[93802,93770],[93771,93803],[93803,93771],[93772,93804],[93804,93772],[93773,93805],[93805,93773],[93774,93806],[93806,93774],[93775,93807],[93807,93775],[93776,93808],[93808,93776],[93777,93809],[93809,93777],[93778,93810],[93810,93778],[93779,93811],[93811,93779],[93780,93812],[93812,93780],[93781,93813],[93813,93781],[93782,93814],[93814,93782],[93783,93815],[93815,93783],[93784,93816],[93816,93784],[93785,93817],[93817,93785],[93786,93818],[93818,93786],[93787,93819],[93819,93787],[93788,93820],[93820,93788],[93789,93821],[93821,93789],[93790,93822],[93822,93790],[93791,93823],[93823,93791],[125184,125218],[125218,125184],[125185,125219],[125219,125185],[125186,125220],[125220,125186],[125187,125221],[125221,125187],[125188,125222],[125222,125188],[125189,125223],[125223,125189],[125190,125224],[125224,125190],[125191,125225],[125225,125191],[125192,125226],[125226,125192],[125193,125227],[125227,125193],[125194,125228],[125228,125194],[125195,125229],[125229,125195],[125196,125230],[125230,125196],[125197,125231],[125231,125197],[125198,125232],[125232,125198],[125199,125233],[125233,125199],[125200,125234],[125234,125200],[125201,125235],[125235,125201],[125202,125236],[125236,125202],[125203,125237],[125237,125203],[125204,125238],[125238,125204],[125205,125239],[125239,125205],[125206,125240],[125240,125206],[125207,125241],[125241,125207],[125208,125242],[125242,125208],[125209,125243],[125243,125209],[125210,125244],[125244,125210],[125211,125245],[125245,125211],[125212,125246],[125246,125212],[125213,125247],[125247,125213],[125214,125248],[125248,125214],[125215,125249],[125249,125215],[125216,125250],[125250,125216],[125217,125251],[125251,125217]])),_(d,"C",[[0,31,1],[127,159,1],[173,888,715],[889,896,7],[897,899,1],[907,909,2],[930,1328,398],[1367,1368,1],[1419,1420,1],[1424,1480,56],[1481,1487,1],[1515,1518,1],[1525,1541,1],[1564,1757,193],[1806,1807,1],[1867,1868,1],[1970,1983,1],[2043,2044,1],[2094,2095,1],[2111,2140,29],[2141,2143,2],[2155,2159,1],[2191,2199,1],[2274,2436,162],[2445,2446,1],[2449,2450,1],[2473,2481,8],[2483,2485,1],[2490,2491,1],[2501,2502,1],[2505,2506,1],[2511,2518,1],[2520,2523,1],[2526,2532,6],[2533,2559,26],[2560,2564,4],[2571,2574,1],[2577,2578,1],[2601,2609,8],[2612,2618,3],[2619,2621,2],[2627,2630,1],[2633,2634,1],[2638,2640,1],[2642,2648,1],[2653,2655,2],[2656,2661,1],[2679,2688,1],[2692,2702,10],[2706,2729,23],[2737,2740,3],[2746,2747,1],[2758,2766,4],[2767,2769,2],[2770,2783,1],[2788,2789,1],[2802,2808,1],[2816,2820,4],[2829,2830,1],[2833,2834,1],[2857,2865,8],[2868,2874,6],[2875,2885,10],[2886,2889,3],[2890,2894,4],[2895,2900,1],[2904,2907,1],[2910,2916,6],[2917,2936,19],[2937,2945,1],[2948,2955,7],[2956,2957,1],[2961,2966,5],[2967,2968,1],[2971,2973,2],[2976,2978,1],[2981,2983,1],[2987,2989,1],[3002,3005,1],[3011,3013,1],[3017,3022,5],[3023,3025,2],[3026,3030,1],[3032,3045,1],[3067,3071,1],[3085,3089,4],[3113,3130,17],[3131,3141,10],[3145,3150,5],[3151,3156,1],[3159,3163,4],[3164,3166,2],[3167,3172,5],[3173,3184,11],[3185,3190,1],[3213,3217,4],[3241,3252,11],[3258,3259,1],[3269,3273,4],[3278,3284,1],[3287,3292,1],[3295,3300,5],[3301,3312,11],[3316,3327,1],[3341,3345,4],[3397,3401,4],[3408,3411,1],[3428,3429,1],[3456,3460,4],[3479,3481,1],[3506,3516,10],[3518,3519,1],[3527,3529,1],[3531,3534,1],[3541,3543,2],[3552,3557,1],[3568,3569,1],[3573,3584,1],[3643,3646,1],[3676,3712,1],[3715,3717,2],[3723,3748,25],[3750,3774,24],[3775,3781,6],[3783,3791,8],[3802,3803,1],[3808,3839,1],[3912,3949,37],[3950,3952,1],[3992,4029,37],[4045,4059,14],[4060,4095,1],[4294,4296,2],[4297,4300,1],[4302,4303,1],[4681,4686,5],[4687,4695,8],[4697,4702,5],[4703,4745,42],[4750,4751,1],[4785,4790,5],[4791,4799,8],[4801,4806,5],[4807,4823,16],[4881,4886,5],[4887,4955,68],[4956,4989,33],[4990,4991,1],[5018,5023,1],[5110,5111,1],[5118,5119,1],[5789,5791,1],[5881,5887,1],[5910,5918,1],[5943,5951,1],[5972,5983,1],[5997,6001,4],[6004,6015,1],[6110,6111,1],[6122,6127,1],[6138,6143,1],[6158,6170,12],[6171,6175,1],[6265,6271,1],[6315,6319,1],[6390,6399,1],[6431,6444,13],[6445,6447,1],[6460,6463,1],[6465,6467,1],[6510,6511,1],[6517,6527,1],[6572,6575,1],[6602,6607,1],[6619,6621,1],[6684,6685,1],[6751,6781,30],[6782,6794,12],[6795,6799,1],[6810,6815,1],[6830,6831,1],[6863,6911,1],[6989,6991,1],[7039,7156,117],[7157,7163,1],[7224,7226,1],[7242,7244,1],[7305,7311,1],[7355,7356,1],[7368,7375,1],[7419,7423,1],[7958,7959,1],[7966,7967,1],[8006,8007,1],[8014,8015,1],[8024,8030,2],[8062,8063,1],[8117,8133,16],[8148,8149,1],[8156,8176,20],[8177,8181,4],[8191,8203,12],[8204,8207,1],[8234,8238,1],[8288,8303,1],[8306,8307,1],[8335,8349,14],[8350,8351,1],[8385,8399,1],[8433,8447,1],[8588,8591,1],[9255,9279,1],[9291,9311,1],[11124,11125,1],[11158,11508,350],[11509,11512,1],[11558,11560,2],[11561,11564,1],[11566,11567,1],[11624,11630,1],[11633,11646,1],[11671,11679,1],[11687,11743,8],[11870,11903,1],[11930,12020,90],[12021,12031,1],[12246,12271,1],[12352,12439,87],[12440,12544,104],[12545,12548,1],[12592,12687,95],[12772,12782,1],[12831,42125,29294],[42126,42127,1],[42183,42191,1],[42540,42559,1],[42744,42751,1],[42955,42959,1],[42962,42964,2],[42970,42993,1],[43053,43055,1],[43066,43071,1],[43128,43135,1],[43206,43213,1],[43226,43231,1],[43348,43358,1],[43389,43391,1],[43470,43482,12],[43483,43485,1],[43519,43575,56],[43576,43583,1],[43598,43599,1],[43610,43611,1],[43715,43738,1],[43767,43776,1],[43783,43784,1],[43791,43792,1],[43799,43807,1],[43815,43823,8],[43884,43887,1],[44014,44015,1],[44026,44031,1],[55204,55215,1],[55239,55242,1],[55292,63743,1],[64110,64111,1],[64218,64255,1],[64263,64274,1],[64280,64284,1],[64311,64317,6],[64319,64325,3],[64451,64466,1],[64912,64913,1],[64968,64974,1],[64976,65007,1],[65050,65055,1],[65107,65127,20],[65132,65135,1],[65141,65277,136],[65278,65280,1],[65471,65473,1],[65480,65481,1],[65488,65489,1],[65496,65497,1],[65501,65503,1],[65511,65519,8],[65520,65531,1],[65534,65535,1],[65548,65575,27],[65595,65598,3],[65614,65615,1],[65630,65663,1],[65787,65791,1],[65795,65798,1],[65844,65846,1],[65935,65949,14],[65950,65951,1],[65953,65999,1],[66046,66175,1],[66205,66207,1],[66257,66271,1],[66300,66303,1],[66340,66348,1],[66379,66383,1],[66427,66431,1],[66462,66500,38],[66501,66503,1],[66518,66559,1],[66718,66719,1],[66730,66735,1],[66772,66775,1],[66812,66815,1],[66856,66863,1],[66916,66926,1],[66939,66955,16],[66963,66966,3],[66978,66994,16],[67002,67005,3],[67006,67071,1],[67383,67391,1],[67414,67423,1],[67432,67455,1],[67462,67505,43],[67515,67583,1],[67590,67591,1],[67593,67638,45],[67641,67643,1],[67645,67646,1],[67670,67743,73],[67744,67750,1],[67760,67807,1],[67827,67830,3],[67831,67834,1],[67868,67870,1],[67898,67902,1],[67904,67967,1],[68024,68027,1],[68048,68049,1],[68100,68103,3],[68104,68107,1],[68116,68120,4],[68150,68151,1],[68155,68158,1],[68169,68175,1],[68185,68191,1],[68256,68287,1],[68327,68330,1],[68343,68351,1],[68406,68408,1],[68438,68439,1],[68467,68471,1],[68498,68504,1],[68509,68520,1],[68528,68607,1],[68681,68735,1],[68787,68799,1],[68851,68857,1],[68904,68911,1],[68922,69215,1],[69247,69290,43],[69294,69295,1],[69298,69372,1],[69416,69423,1],[69466,69487,1],[69514,69551,1],[69580,69599,1],[69623,69631,1],[69710,69713,1],[69750,69758,1],[69821,69827,6],[69828,69839,1],[69865,69871,1],[69882,69887,1],[69941,69960,19],[69961,69967,1],[70007,70015,1],[70112,70133,21],[70134,70143,1],[70162,70210,48],[70211,70271,1],[70279,70281,2],[70286,70302,16],[70314,70319,1],[70379,70383,1],[70394,70399,1],[70404,70413,9],[70414,70417,3],[70418,70441,23],[70449,70452,3],[70458,70469,11],[70470,70473,3],[70474,70478,4],[70479,70481,2],[70482,70486,1],[70488,70492,1],[70500,70501,1],[70509,70511,1],[70517,70655,1],[70748,70754,6],[70755,70783,1],[70856,70863,1],[70874,71039,1],[71094,71095,1],[71134,71167,1],[71237,71247,1],[71258,71263,1],[71277,71295,1],[71354,71359,1],[71370,71423,1],[71451,71452,1],[71468,71471,1],[71495,71679,1],[71740,71839,1],[71923,71934,1],[71943,71944,1],[71946,71947,1],[71956,71959,3],[71990,71993,3],[71994,72007,13],[72008,72015,1],[72026,72095,1],[72104,72105,1],[72152,72153,1],[72165,72191,1],[72264,72271,1],[72355,72367,1],[72441,72447,1],[72458,72703,1],[72713,72759,46],[72774,72783,1],[72813,72815,1],[72848,72849,1],[72872,72887,15],[72888,72959,1],[72967,72970,3],[73015,73017,1],[73019,73022,3],[73032,73039,1],[73050,73055,1],[73062,73065,3],[73103,73106,3],[73113,73119,1],[73130,73439,1],[73465,73471,1],[73489,73531,42],[73532,73533,1],[73562,73647,1],[73649,73663,1],[73714,73726,1],[74650,74751,1],[74863,74869,6],[74870,74879,1],[75076,77711,1],[77811,77823,1],[78896,78911,1],[78934,82943,1],[83527,92159,1],[92729,92735,1],[92767,92778,11],[92779,92781,1],[92863,92874,11],[92875,92879,1],[92910,92911,1],[92918,92927,1],[92998,93007,1],[93018,93026,8],[93048,93052,1],[93072,93759,1],[93851,93951,1],[94027,94030,1],[94088,94094,1],[94112,94175,1],[94181,94191,1],[94194,94207,1],[100344,100351,1],[101590,101631,1],[101641,110575,1],[110580,110588,8],[110591,110883,292],[110884,110897,1],[110899,110927,1],[110931,110932,1],[110934,110947,1],[110952,110959,1],[111356,113663,1],[113771,113775,1],[113789,113791,1],[113801,113807,1],[113818,113819,1],[113824,118527,1],[118574,118575,1],[118599,118607,1],[118724,118783,1],[119030,119039,1],[119079,119080,1],[119155,119162,1],[119275,119295,1],[119366,119487,1],[119508,119519,1],[119540,119551,1],[119639,119647,1],[119673,119807,1],[119893,119965,72],[119968,119969,1],[119971,119972,1],[119975,119976,1],[119981,119994,13],[119996,120004,8],[120070,120075,5],[120076,120085,9],[120093,120122,29],[120127,120133,6],[120135,120137,1],[120145,120486,341],[120487,120780,293],[120781,121484,703],[121485,121498,1],[121504,121520,16],[121521,122623,1],[122655,122660,1],[122667,122879,1],[122887,122905,18],[122906,122914,8],[122917,122923,6],[122924,122927,1],[122990,123022,1],[123024,123135,1],[123181,123183,1],[123198,123199,1],[123210,123213,1],[123216,123535,1],[123567,123583,1],[123642,123646,1],[123648,124111,1],[124154,124895,1],[124903,124908,5],[124911,124927,16],[125125,125126,1],[125143,125183,1],[125260,125263,1],[125274,125277,1],[125280,126064,1],[126133,126208,1],[126270,126463,1],[126468,126496,28],[126499,126501,2],[126502,126504,2],[126515,126520,5],[126522,126524,2],[126525,126529,1],[126531,126534,1],[126536,126540,2],[126544,126547,3],[126549,126550,1],[126552,126560,2],[126563,126565,2],[126566,126571,5],[126579,126589,5],[126591,126602,11],[126620,126624,1],[126628,126634,6],[126652,126703,1],[126706,126975,1],[127020,127023,1],[127124,127135,1],[127151,127152,1],[127168,127184,16],[127222,127231,1],[127406,127461,1],[127491,127503,1],[127548,127551,1],[127561,127567,1],[127570,127583,1],[127590,127743,1],[128728,128731,1],[128749,128751,1],[128765,128767,1],[128887,128890,1],[128986,128991,1],[129004,129007,1],[129009,129023,1],[129036,129039,1],[129096,129103,1],[129114,129119,1],[129160,129167,1],[129198,129199,1],[129202,129279,1],[129620,129631,1],[129646,129647,1],[129661,129663,1],[129673,129679,1],[129726,129734,8],[129735,129741,1],[129756,129759,1],[129769,129775,1],[129785,129791,1],[129939,129995,56],[129996,130031,1],[130042,131071,1],[173792,173823,1],[177978,177983,1],[178206,178207,1],[183970,183983,1],[191457,191471,1],[192094,194559,1],[195102,196607,1],[201547,201551,1],[205744,917759,1],[918e3,1114111,1]]),_(d,"Cc",[[0,31,1],[127,159,1]]),_(d,"Cf",[[173,1536,1363],[1537,1541,1],[1564,1757,193],[1807,2192,385],[2193,2274,81],[6158,8203,2045],[8204,8207,1],[8234,8238,1],[8288,8292,1],[8294,8303,1],[65279,65529,250],[65530,65531,1],[69821,69837,16],[78896,78911,1],[113824,113827,1],[119155,119162,1],[917505,917536,31],[917537,917631,1]]),_(d,"Co",[[57344,63743,1],[983040,1048573,1],[1048576,1114109,1]]),_(d,"Cs",[[55296,57343,1]]),_(d,"L",[[65,90,1],[97,122,1],[170,181,11],[186,192,6],[193,214,1],[216,246,1],[248,705,1],[710,721,1],[736,740,1],[748,750,2],[880,884,1],[886,887,1],[890,893,1],[895,902,7],[904,906,1],[908,910,2],[911,929,1],[931,1013,1],[1015,1153,1],[1162,1327,1],[1329,1366,1],[1369,1376,7],[1377,1416,1],[1488,1514,1],[1519,1522,1],[1568,1610,1],[1646,1647,1],[1649,1747,1],[1749,1765,16],[1766,1774,8],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2036,2037,1],[2042,2048,6],[2049,2069,1],[2074,2084,10],[2088,2112,24],[2113,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2249,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2417,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3654,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3782,3804,22],[3805,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4256,18],[4257,4293,1],[4295,4301,6],[4304,4346,1],[4348,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5024,5109,1],[5112,5117,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6103,6108,5],[6176,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6823,6917,94],[6918,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7293,1],[7296,7304,1],[7312,7354,1],[7357,7359,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,7424,6],[7425,7615,1],[7680,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8124,1],[8126,8130,4],[8131,8132,1],[8134,8140,1],[8144,8147,1],[8150,8155,1],[8160,8172,1],[8178,8180,1],[8182,8188,1],[8305,8319,14],[8336,8348,1],[8450,8455,5],[8458,8467,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8495,8505,1],[8508,8511,1],[8517,8521,1],[8526,8579,53],[8580,11264,2684],[11265,11492,1],[11499,11502,1],[11506,11507,1],[11520,11557,1],[11559,11565,6],[11568,11623,1],[11631,11648,17],[11649,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[11823,12293,470],[12294,12337,43],[12338,12341,1],[12347,12348,1],[12353,12438,1],[12445,12447,1],[12449,12538,1],[12540,12543,1],[12549,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,42124,1],[42192,42237,1],[42240,42508,1],[42512,42527,1],[42538,42539,1],[42560,42606,1],[42623,42653,1],[42656,42725,1],[42775,42783,1],[42786,42888,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43471,43488,17],[43489,43492,1],[43494,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43741,1],[43744,43754,1],[43762,43764,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43824,43866,1],[43868,43881,1],[43888,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64256,64262,1],[64275,64279,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65313,65338,1],[65345,65370,1],[65382,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66560,66717,1],[66736,66771,1],[66776,66811,1],[66816,66855,1],[66864,66915,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68736,68786,1],[68800,68850,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71840,71903,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[92992,92995,1],[93027,93047,1],[93053,93071,1],[93760,93823,1],[93952,94026,1],[94032,94099,67],[94100,94111,1],[94176,94177,1],[94179,94208,29],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120512,1],[120514,120538,1],[120540,120570,1],[120572,120596,1],[120598,120628,1],[120630,120654,1],[120656,120686,1],[120688,120712,1],[120714,120744,1],[120746,120770,1],[120772,120779,1],[122624,122654,1],[122661,122666,1],[122928,122989,1],[123136,123180,1],[123191,123197,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124139,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[125184,125251,1],[125259,126464,1205],[126465,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"foldL",[[837,837,1]]),_(d,"Ll",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,311,2],[312,328,2],[329,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[397,402,5],[405,409,4],[410,411,1],[414,417,3],[419,421,2],[424,426,2],[427,429,2],[432,436,4],[438,441,3],[442,445,3],[446,447,1],[454,460,3],[462,476,2],[477,495,2],[496,499,3],[501,505,4],[507,563,2],[564,569,1],[572,575,3],[576,578,2],[583,591,2],[592,659,1],[661,687,1],[881,883,2],[887,891,4],[892,893,1],[912,940,28],[941,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1020,1072,52],[1073,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1376,1416,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7424,7467,1],[7531,7543,1],[7545,7578,1],[7681,7829,2],[7830,7837,1],[7839,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8016,8023,1],[8032,8039,1],[8048,8061,1],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8112,8116,1],[8118,8119,1],[8126,8130,4],[8131,8132,1],[8134,8135,1],[8144,8147,1],[8150,8151,1],[8160,8167,1],[8178,8180,1],[8182,8183,1],[8458,8462,4],[8463,8467,4],[8495,8505,5],[8508,8509,1],[8518,8521,1],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11377,11379,2],[11380,11382,2],[11383,11387,1],[11393,11491,2],[11492,11500,8],[11502,11507,5],[11520,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42800,42801,1],[42803,42865,2],[42866,42872,1],[42874,42876,2],[42879,42887,2],[42892,42894,2],[42897,42899,2],[42900,42901,1],[42903,42921,2],[42927,42933,6],[42935,42947,2],[42952,42954,2],[42961,42969,2],[42998,43002,4],[43824,43866,1],[43872,43880,1],[43888,43967,1],[64256,64262,1],[64275,64279,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[119834,119859,1],[119886,119892,1],[119894,119911,1],[119938,119963,1],[119990,119993,1],[119995,119997,2],[119998,120003,1],[120005,120015,1],[120042,120067,1],[120094,120119,1],[120146,120171,1],[120198,120223,1],[120250,120275,1],[120302,120327,1],[120354,120379,1],[120406,120431,1],[120458,120485,1],[120514,120538,1],[120540,120545,1],[120572,120596,1],[120598,120603,1],[120630,120654,1],[120656,120661,1],[120688,120712,1],[120714,120719,1],[120746,120770,1],[120772,120777,1],[120779,122624,1845],[122625,122633,1],[122635,122654,1],[122661,122666,1],[125218,125251,1]]),_(d,"foldLl",[[65,90,1],[192,214,1],[216,222,1],[256,302,2],[306,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,453,1],[455,456,1],[458,459,1],[461,475,2],[478,494,2],[497,498,1],[500,502,2],[503,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[837,880,43],[882,886,4],[895,902,7],[904,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,984,9],[986,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8072,8079,1],[8088,8095,1],[8104,8111,1],[8120,8124,1],[8136,8140,1],[8152,8155,1],[8168,8172,1],[8184,8188,1],[8486,8490,4],[8491,8498,7],[8579,11264,2685],[11265,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[125184,125217,1]]),_(d,"Lm",[[688,705,1],[710,721,1],[736,740,1],[748,750,2],[884,890,6],[1369,1600,231],[1765,1766,1],[2036,2037,1],[2042,2074,32],[2084,2088,4],[2249,2417,168],[3654,3782,128],[4348,6103,1755],[6211,6823,612],[7288,7293,1],[7468,7530,1],[7544,7579,35],[7580,7615,1],[8305,8319,14],[8336,8348,1],[11388,11389,1],[11631,11823,192],[12293,12337,44],[12338,12341,1],[12347,12445,98],[12446,12540,94],[12541,12542,1],[40981,42232,1251],[42233,42237,1],[42508,42623,115],[42652,42653,1],[42775,42783,1],[42864,42888,24],[42994,42996,1],[43e3,43001,1],[43471,43494,23],[43632,43741,109],[43763,43764,1],[43868,43871,1],[43881,65392,21511],[65438,65439,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[92992,92995,1],[94099,94111,1],[94176,94177,1],[94179,110576,16397],[110577,110579,1],[110581,110587,1],[110589,110590,1],[122928,122989,1],[123191,123197,1],[124139,125259,1120]]),_(d,"Lo",[[170,186,16],[443,448,5],[449,451,1],[660,1488,828],[1489,1514,1],[1519,1522,1],[1568,1599,1],[1601,1610,1],[1646,1647,1],[1649,1747,1],[1749,1774,25],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2048,2069,1],[2112,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2248,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2418,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3653,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3804,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4352,114],[4353,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6108,6176,68],[6177,6210,1],[6212,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6917,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7287,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,8501,1083],[8502,8504,1],[11568,11623,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[12294,12348,54],[12353,12438,1],[12447,12449,2],[12450,12538,1],[12543,12549,6],[12550,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,40980,1],[40982,42124,1],[42192,42231,1],[42240,42507,1],[42512,42527,1],[42538,42539,1],[42606,42656,50],[42657,42725,1],[42895,42999,104],[43003,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43488,43492,1],[43495,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43631,1],[43633,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43740,1],[43744,43754,1],[43762,43777,15],[43778,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43968,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65382,65391,1],[65393,65437,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66640,66717,1],[66816,66855,1],[66864,66915,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[93027,93047,1],[93053,93071,1],[93952,94026,1],[94032,94208,176],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[122634,123136,502],[123137,123180,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124138,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"Lt",[[453,459,3],[498,8072,7574],[8073,8079,1],[8088,8095,1],[8104,8111,1],[8124,8140,16],[8188,8188,1]]),_(d,"foldLt",[[452,454,2],[455,457,2],[458,460,2],[497,499,2],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8115,8131,16],[8179,8179,1]]),_(d,"Lu",[[65,90,1],[192,214,1],[216,222,1],[256,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,461,3],[463,475,2],[478,494,2],[497,500,3],[502,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[880,882,2],[886,895,9],[902,904,2],[905,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,978,3],[979,980,1],[984,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8120,8123,1],[8136,8139,1],[8152,8155,1],[8168,8172,1],[8184,8187,1],[8450,8455,5],[8459,8461,1],[8464,8466,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8496,8499,1],[8510,8511,1],[8517,8579,62],[11264,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[119808,119833,1],[119860,119885,1],[119912,119937,1],[119964,119966,2],[119967,119973,3],[119974,119977,3],[119978,119980,1],[119982,119989,1],[120016,120041,1],[120068,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120120,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120172,120197,1],[120224,120249,1],[120276,120301,1],[120328,120353,1],[120380,120405,1],[120432,120457,1],[120488,120512,1],[120546,120570,1],[120604,120628,1],[120662,120686,1],[120720,120744,1],[120778,125184,4406],[125185,125217,1]]),_(d,"Upper",d.Lu),_(d,"foldLu",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,303,2],[307,311,2],[314,328,2],[331,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[402,405,3],[409,410,1],[414,417,3],[419,421,2],[424,429,5],[432,436,4],[438,441,3],[445,447,2],[453,454,1],[456,457,1],[459,460,1],[462,476,2],[477,495,2],[498,499,1],[501,505,4],[507,543,2],[547,563,2],[572,575,3],[576,578,2],[583,591,2],[592,596,1],[598,599,1],[601,603,2],[604,608,4],[609,613,2],[614,616,2],[617,620,1],[623,625,2],[626,629,3],[637,640,3],[642,643,1],[647,652,1],[658,669,11],[670,837,167],[881,883,2],[887,891,4],[892,893,1],[940,943,1],[945,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1072,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1377,1414,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7545,7549,4],[7566,7681,115],[7683,7829,2],[7835,7841,6],[7843,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8017,8023,2],[8032,8039,1],[8048,8061,1],[8112,8113,1],[8126,8144,18],[8145,8160,15],[8161,8165,4],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11379,11382,3],[11393,11491,2],[11500,11502,2],[11507,11520,13],[11521,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42803,42863,2],[42874,42876,2],[42879,42887,2],[42892,42897,5],[42899,42900,1],[42903,42921,2],[42933,42947,2],[42952,42954,2],[42961,42967,6],[42969,42998,29],[43859,43888,29],[43889,43967,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[125218,125251,1]]),_(d,"M",[[768,879,1],[1155,1161,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2307,1],[2362,2364,1],[2366,2383,1],[2385,2391,1],[2402,2403,1],[2433,2435,1],[2492,2494,2],[2495,2500,1],[2503,2504,1],[2507,2509,1],[2519,2530,11],[2531,2558,27],[2561,2563,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2672,31],[2673,2677,4],[2689,2691,1],[2748,2750,2],[2751,2757,1],[2759,2761,1],[2763,2765,1],[2786,2787,1],[2810,2815,1],[2817,2819,1],[2876,2878,2],[2879,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2914,2915,1],[2946,3006,60],[3007,3010,1],[3014,3016,1],[3018,3021,1],[3031,3072,41],[3073,3076,1],[3132,3134,2],[3135,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3203,1],[3260,3262,2],[3263,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3298,3299,1],[3315,3328,13],[3329,3331,1],[3387,3388,1],[3390,3396,1],[3398,3400,1],[3402,3405,1],[3415,3426,11],[3427,3457,30],[3458,3459,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3570,3571,1],[3633,3636,3],[3637,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3902,3903,1],[3953,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4139,101],[4140,4158,1],[4182,4185,1],[4190,4192,1],[4194,4196,1],[4199,4205,1],[4209,4212,1],[4226,4237,1],[4239,4250,11],[4251,4253,1],[4957,4959,1],[5906,5909,1],[5938,5940,1],[5970,5971,1],[6002,6003,1],[6068,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6443,1],[6448,6459,1],[6679,6683,1],[6741,6750,1],[6752,6780,1],[6783,6832,49],[6833,6862,1],[6912,6916,1],[6964,6980,1],[7019,7027,1],[7040,7042,1],[7073,7085,1],[7142,7155,1],[7204,7223,1],[7376,7378,1],[7380,7400,1],[7405,7412,7],[7415,7417,1],[7616,7679,1],[8400,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12335,1],[12441,12442,1],[42607,42610,1],[42612,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43043,24],[43044,43047,1],[43052,43136,84],[43137,43188,51],[43189,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43347,1],[43392,43395,1],[43443,43456,1],[43493,43561,68],[43562,43574,1],[43587,43596,9],[43597,43643,46],[43644,43645,1],[43696,43698,2],[43699,43700,1],[43703,43704,1],[43710,43711,1],[43713,43755,42],[43756,43759,1],[43765,43766,1],[44003,44010,1],[44012,44013,1],[64286,65024,738],[65025,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69632,69634,1],[69688,69702,1],[69744,69747,3],[69748,69759,11],[69760,69762,1],[69808,69818,1],[69826,69888,62],[69889,69890,1],[69927,69940,1],[69957,69958,1],[70003,70016,13],[70017,70018,1],[70067,70080,1],[70089,70092,1],[70094,70095,1],[70188,70199,1],[70206,70209,3],[70367,70378,1],[70400,70403,1],[70459,70460,1],[70462,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70502,3],[70503,70508,1],[70512,70516,1],[70709,70726,1],[70750,70832,82],[70833,70851,1],[71087,71093,1],[71096,71104,1],[71132,71133,1],[71216,71232,1],[71339,71351,1],[71453,71467,1],[71724,71738,1],[71984,71989,1],[71991,71992,1],[71995,71998,1],[72e3,72002,2],[72003,72145,142],[72146,72151,1],[72154,72160,1],[72164,72193,29],[72194,72202,1],[72243,72249,1],[72251,72254,1],[72263,72273,10],[72274,72283,1],[72330,72345,1],[72751,72758,1],[72760,72767,1],[72850,72871,1],[72873,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73098,67],[73099,73102,1],[73104,73105,1],[73107,73111,1],[73459,73462,1],[73472,73473,1],[73475,73524,49],[73525,73530,1],[73534,73538,1],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94033,2],[94034,94087,1],[94095,94098,1],[94180,94192,12],[94193,113821,19628],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119141,119145,1],[119149,119154,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),_(d,"foldM",[[921,953,32],[8126,8126,1]]),_(d,"Mc",[[2307,2363,56],[2366,2368,1],[2377,2380,1],[2382,2383,1],[2434,2435,1],[2494,2496,1],[2503,2504,1],[2507,2508,1],[2519,2563,44],[2622,2624,1],[2691,2750,59],[2751,2752,1],[2761,2763,2],[2764,2818,54],[2819,2878,59],[2880,2887,7],[2888,2891,3],[2892,2903,11],[3006,3007,1],[3009,3010,1],[3014,3016,1],[3018,3020,1],[3031,3073,42],[3074,3075,1],[3137,3140,1],[3202,3203,1],[3262,3264,2],[3265,3268,1],[3271,3272,1],[3274,3275,1],[3285,3286,1],[3315,3330,15],[3331,3390,59],[3391,3392,1],[3398,3400,1],[3402,3404,1],[3415,3458,43],[3459,3535,76],[3536,3537,1],[3544,3551,1],[3570,3571,1],[3902,3903,1],[3967,4139,172],[4140,4145,5],[4152,4155,3],[4156,4182,26],[4183,4194,11],[4195,4196,1],[4199,4205,1],[4227,4228,1],[4231,4236,1],[4239,4250,11],[4251,4252,1],[5909,5940,31],[6070,6078,8],[6079,6085,1],[6087,6088,1],[6435,6438,1],[6441,6443,1],[6448,6449,1],[6451,6456,1],[6681,6682,1],[6741,6743,2],[6753,6755,2],[6756,6765,9],[6766,6770,1],[6916,6965,49],[6971,6973,2],[6974,6977,1],[6979,6980,1],[7042,7073,31],[7078,7079,1],[7082,7143,61],[7146,7148,1],[7150,7154,4],[7155,7204,49],[7205,7211,1],[7220,7221,1],[7393,7415,22],[12334,12335,1],[43043,43044,1],[43047,43136,89],[43137,43188,51],[43189,43203,1],[43346,43347,1],[43395,43444,49],[43445,43450,5],[43451,43454,3],[43455,43456,1],[43567,43568,1],[43571,43572,1],[43597,43643,46],[43645,43755,110],[43758,43759,1],[43765,44003,238],[44004,44006,2],[44007,44009,2],[44010,44012,2],[69632,69634,2],[69762,69808,46],[69809,69810,1],[69815,69816,1],[69932,69957,25],[69958,70018,60],[70067,70069,1],[70079,70080,1],[70094,70188,94],[70189,70190,1],[70194,70195,1],[70197,70368,171],[70369,70370,1],[70402,70403,1],[70462,70463,1],[70465,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70709,210],[70710,70711,1],[70720,70721,1],[70725,70832,107],[70833,70834,1],[70841,70843,2],[70844,70846,1],[70849,71087,238],[71088,71089,1],[71096,71099,1],[71102,71216,114],[71217,71218,1],[71227,71228,1],[71230,71340,110],[71342,71343,1],[71350,71456,106],[71457,71462,5],[71724,71726,1],[71736,71984,248],[71985,71989,1],[71991,71992,1],[71997,72e3,3],[72002,72145,143],[72146,72147,1],[72156,72159,1],[72164,72249,85],[72279,72280,1],[72343,72751,408],[72766,72873,107],[72881,72884,3],[73098,73102,1],[73107,73108,1],[73110,73461,351],[73462,73475,13],[73524,73525,1],[73534,73535,1],[73537,94033,20496],[94034,94087,1],[94192,94193,1],[119141,119142,1],[119149,119154,1]]),_(d,"Me",[[1160,1161,1],[6846,8413,1567],[8414,8416,1],[8418,8420,1],[42608,42610,1]]),_(d,"Mn",[[768,879,1],[1155,1159,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2306,1],[2362,2364,2],[2369,2376,1],[2381,2385,4],[2386,2391,1],[2402,2403,1],[2433,2492,59],[2497,2500,1],[2509,2530,21],[2531,2558,27],[2561,2562,1],[2620,2625,5],[2626,2631,5],[2632,2635,3],[2636,2637,1],[2641,2672,31],[2673,2677,4],[2689,2690,1],[2748,2753,5],[2754,2757,1],[2759,2760,1],[2765,2786,21],[2787,2810,23],[2811,2815,1],[2817,2876,59],[2879,2881,2],[2882,2884,1],[2893,2901,8],[2902,2914,12],[2915,2946,31],[3008,3021,13],[3072,3076,4],[3132,3134,2],[3135,3136,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3260,59],[3263,3270,7],[3276,3277,1],[3298,3299,1],[3328,3329,1],[3387,3388,1],[3393,3396,1],[3405,3426,21],[3427,3457,30],[3530,3538,8],[3539,3540,1],[3542,3633,91],[3636,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3953,3966,1],[3968,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4141,103],[4142,4144,1],[4146,4151,1],[4153,4154,1],[4157,4158,1],[4184,4185,1],[4190,4192,1],[4209,4212,1],[4226,4229,3],[4230,4237,7],[4253,4957,704],[4958,4959,1],[5906,5908,1],[5938,5939,1],[5970,5971,1],[6002,6003,1],[6068,6069,1],[6071,6077,1],[6086,6089,3],[6090,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6434,1],[6439,6440,1],[6450,6457,7],[6458,6459,1],[6679,6680,1],[6683,6742,59],[6744,6750,1],[6752,6754,2],[6757,6764,1],[6771,6780,1],[6783,6832,49],[6833,6845,1],[6847,6862,1],[6912,6915,1],[6964,6966,2],[6967,6970,1],[6972,6978,6],[7019,7027,1],[7040,7041,1],[7074,7077,1],[7080,7081,1],[7083,7085,1],[7142,7144,2],[7145,7149,4],[7151,7153,1],[7212,7219,1],[7222,7223,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8400,8412,1],[8417,8421,4],[8422,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12333,1],[12441,12442,1],[42607,42612,5],[42613,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43045,26],[43046,43052,6],[43204,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43345,1],[43392,43394,1],[43443,43446,3],[43447,43449,1],[43452,43453,1],[43493,43561,68],[43562,43566,1],[43569,43570,1],[43573,43574,1],[43587,43596,9],[43644,43696,52],[43698,43700,1],[43703,43704,1],[43710,43711,1],[43713,43756,43],[43757,43766,9],[44005,44008,3],[44013,64286,20273],[65024,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69633,69688,55],[69689,69702,1],[69744,69747,3],[69748,69759,11],[69760,69761,1],[69811,69814,1],[69817,69818,1],[69826,69888,62],[69889,69890,1],[69927,69931,1],[69933,69940,1],[70003,70016,13],[70017,70070,53],[70071,70078,1],[70089,70092,1],[70095,70191,96],[70192,70193,1],[70196,70198,2],[70199,70206,7],[70209,70367,158],[70371,70378,1],[70400,70401,1],[70459,70460,1],[70464,70502,38],[70503,70508,1],[70512,70516,1],[70712,70719,1],[70722,70724,1],[70726,70750,24],[70835,70840,1],[70842,70847,5],[70848,70850,2],[70851,71090,239],[71091,71093,1],[71100,71101,1],[71103,71104,1],[71132,71133,1],[71219,71226,1],[71229,71231,2],[71232,71339,107],[71341,71344,3],[71345,71349,1],[71351,71453,102],[71454,71455,1],[71458,71461,1],[71463,71467,1],[71727,71735,1],[71737,71738,1],[71995,71996,1],[71998,72003,5],[72148,72151,1],[72154,72155,1],[72160,72193,33],[72194,72202,1],[72243,72248,1],[72251,72254,1],[72263,72273,10],[72274,72278,1],[72281,72283,1],[72330,72342,1],[72344,72345,1],[72752,72758,1],[72760,72765,1],[72767,72850,83],[72851,72871,1],[72874,72880,1],[72882,72883,1],[72885,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73104,73],[73105,73109,4],[73111,73459,348],[73460,73472,12],[73473,73526,53],[73527,73530,1],[73536,73538,2],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94095,64],[94096,94098,1],[94180,113821,19641],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),_(d,"foldMn",[[921,953,32],[8126,8126,1]]),_(d,"N",[[48,57,1],[178,179,1],[185,188,3],[189,190,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2548,2553,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[2930,2935,1],[3046,3058,1],[3174,3183,1],[3192,3198,1],[3302,3311,1],[3416,3422,1],[3430,3448,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3891,1],[4160,4169,1],[4240,4249,1],[4969,4988,1],[5870,5872,1],[6112,6121,1],[6128,6137,1],[6160,6169,1],[6470,6479,1],[6608,6618,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[8304,8308,4],[8309,8313,1],[8320,8329,1],[8528,8578,1],[8581,8585,1],[9312,9371,1],[9450,9471,1],[10102,10131,1],[11517,12295,778],[12321,12329,1],[12344,12346,1],[12690,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[42528,42537,1],[42726,42735,1],[43056,43061,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[65799,65843,1],[65856,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[66369,66378,9],[66513,66517,1],[66720,66729,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[68912,68921,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70113,70132,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71483,1],[71904,71922,1],[72016,72025,1],[72784,72812,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[73664,73684,1],[74752,74862,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125127,125135,1],[125264,125273,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1],[130032,130041,1]]),_(d,"Nd",[[48,57,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[3046,3055,1],[3174,3183,1],[3302,3311,1],[3430,3439,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3881,1],[4160,4169,1],[4240,4249,1],[6112,6121,1],[6160,6169,1],[6470,6479,1],[6608,6617,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[42528,42537,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[66720,66729,1],[68912,68921,1],[69734,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71481,1],[71904,71913,1],[72016,72025,1],[72784,72793,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125264,125273,1],[130032,130041,1]]),_(d,"Nl",[[5870,5872,1],[8544,8578,1],[8581,8584,1],[12295,12321,26],[12322,12329,1],[12344,12346,1],[42726,42735,1],[65856,65908,1],[66369,66378,9],[66513,66517,1],[74752,74862,1]]),_(d,"No",[[178,179,1],[185,188,3],[189,190,1],[2548,2553,1],[2930,2935,1],[3056,3058,1],[3192,3198,1],[3416,3422,1],[3440,3448,1],[3882,3891,1],[4969,4988,1],[6128,6137,1],[6618,8304,1686],[8308,8313,1],[8320,8329,1],[8528,8543,1],[8585,9312,727],[9313,9371,1],[9450,9471,1],[10102,10131,1],[11517,12690,1173],[12691,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[43056,43061,1],[65799,65843,1],[65909,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69733,1],[70113,70132,1],[71482,71483,1],[71914,71922,1],[72794,72812,1],[73664,73684,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[125127,125135,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1]]),_(d,"P",[[33,35,1],[37,42,1],[44,47,1],[58,59,1],[63,64,1],[91,93,1],[95,123,28],[125,161,36],[167,171,4],[182,183,1],[187,191,4],[894,903,9],[1370,1375,1],[1417,1418,1],[1470,1472,2],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3898,38],[3899,3901,1],[3973,4048,75],[4049,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5120,5742,622],[5787,5788,1],[5867,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8208,829],[8209,8231,1],[8240,8259,1],[8261,8273,1],[8275,8286,1],[8317,8318,1],[8333,8334,1],[8968,8971,1],[9001,9002,1],[10088,10101,1],[10181,10182,1],[10214,10223,1],[10627,10648,1],[10712,10715,1],[10748,10749,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11822,1],[11824,11855,1],[11858,11869,1],[12289,12291,1],[12296,12305,1],[12308,12319,1],[12336,12349,13],[12448,12539,91],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,64830,20819],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65121,1],[65123,65128,5],[65130,65131,1],[65281,65283,1],[65285,65290,1],[65292,65295,1],[65306,65307,1],[65311,65312,1],[65339,65341,1],[65343,65371,28],[65373,65375,2],[65376,65381,1],[65792,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69293,69461,168],[69462,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),_(d,"Pc",[[95,8255,8160],[8256,8276,20],[65075,65076,1],[65101,65103,1],[65343,65343,1]]),_(d,"Pd",[[45,1418,1373],[1470,5120,3650],[6150,8208,2058],[8209,8213,1],[11799,11802,3],[11834,11835,1],[11840,11869,29],[12316,12336,20],[12448,65073,52625],[65074,65112,38],[65123,65293,170],[69293,69293,1]]),_(d,"Pe",[[41,93,52],[125,3899,3774],[3901,5788,1887],[8262,8318,56],[8334,8969,635],[8971,9002,31],[10089,10101,2],[10182,10215,33],[10217,10223,2],[10628,10648,2],[10713,10715,2],[10749,11811,1062],[11813,11817,2],[11862,11868,2],[12297,12305,2],[12309,12315,2],[12318,12319,1],[64830,65048,218],[65078,65092,2],[65096,65114,18],[65116,65118,2],[65289,65341,52],[65373,65379,3]]),_(d,"Pf",[[187,8217,8030],[8221,8250,29],[11779,11781,2],[11786,11789,3],[11805,11809,4]]),_(d,"Pi",[[171,8216,8045],[8219,8220,1],[8223,8249,26],[11778,11780,2],[11785,11788,3],[11804,11808,4]]),_(d,"Po",[[33,35,1],[37,39,1],[42,46,2],[47,58,11],[59,63,4],[64,92,28],[161,167,6],[182,183,1],[191,894,703],[903,1370,467],[1371,1375,1],[1417,1472,55],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3973,113],[4048,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5742,5867,125],[5868,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6149,1],[6151,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8214,835],[8215,8224,9],[8225,8231,1],[8240,8248,1],[8251,8254,1],[8257,8259,1],[8263,8273,1],[8275,8277,2],[8278,8286,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11782,5],[11783,11784,1],[11787,11790,3],[11791,11798,1],[11800,11801,1],[11803,11806,3],[11807,11818,11],[11819,11822,1],[11824,11833,1],[11836,11839,1],[11841,11843,2],[11844,11855,1],[11858,11860,1],[12289,12291,1],[12349,12539,190],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,65040,21029],[65041,65046,1],[65049,65072,23],[65093,65094,1],[65097,65100,1],[65104,65106,1],[65108,65111,1],[65119,65121,1],[65128,65130,2],[65131,65281,150],[65282,65283,1],[65285,65287,1],[65290,65294,2],[65295,65306,11],[65307,65311,4],[65312,65340,28],[65377,65380,3],[65381,65792,411],[65793,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69461,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),_(d,"Ps",[[40,91,51],[123,3898,3775],[3900,5787,1887],[8218,8222,4],[8261,8317,56],[8333,8968,635],[8970,9001,31],[10088,10100,2],[10181,10214,33],[10216,10222,2],[10627,10647,2],[10712,10714,2],[10748,11810,1062],[11812,11816,2],[11842,11861,19],[11863,11867,2],[12296,12304,2],[12308,12314,2],[12317,64831,52514],[65047,65077,30],[65079,65091,2],[65095,65113,18],[65115,65117,2],[65288,65339,51],[65371,65375,4],[65378,65378,1]]),_(d,"S",[[36,43,7],[60,62,1],[94,96,2],[124,126,2],[162,166,1],[168,169,1],[172,174,2],[175,177,1],[180,184,4],[215,247,32],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,1014,113],[1154,1421,267],[1422,1423,1],[1542,1544,1],[1547,1550,3],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2046,2047,1],[2184,2546,362],[2547,2554,7],[2555,2801,246],[2928,3059,131],[3060,3066,1],[3199,3407,208],[3449,3647,198],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6107,366],[6464,6622,158],[6623,6655,1],[7009,7018,1],[7028,7036,1],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8352,8384,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8472,1],[8478,8483,1],[8485,8489,2],[8494,8506,12],[8507,8512,5],[8513,8516,1],[8522,8525,1],[8527,8586,59],[8587,8592,5],[8593,8967,1],[8972,9e3,1],[9003,9254,1],[9280,9290,1],[9372,9449,1],[9472,10087,1],[10132,10180,1],[10183,10213,1],[10224,10626,1],[10649,10711,1],[10716,10747,1],[10750,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12443,12444,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43048,43051,1],[43062,43065,1],[43639,43641,1],[43867,43882,15],[43883,64297,20414],[64434,64450,1],[64832,64847,1],[64975,65020,45],[65021,65023,1],[65122,65124,2],[65125,65126,1],[65129,65284,155],[65291,65308,17],[65309,65310,1],[65342,65344,2],[65372,65374,2],[65504,65510,1],[65512,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,123647,432],[126124,126128,4],[126254,126704,450],[126705,126976,271],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),_(d,"Sc",[[36,162,126],[163,165,1],[1423,1547,124],[2046,2047,1],[2546,2547,1],[2555,2801,246],[3065,3647,582],[6107,8352,2245],[8353,8384,1],[43064,65020,21956],[65129,65284,155],[65504,65505,1],[65509,65510,1],[73693,73696,1],[123647,126128,2481]]),_(d,"Sk",[[94,96,2],[168,175,7],[180,184,4],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,2184,1283],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[12443,12444,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43867,43882,15],[43883,64434,20551],[64435,64450,1],[65342,65344,2],[65507,127995,62488],[127996,127999,1]]),_(d,"Sm",[[43,60,17],[61,62,1],[124,126,2],[172,177,5],[215,247,32],[1014,1542,528],[1543,1544,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8472,8512,40],[8513,8516,1],[8523,8592,69],[8593,8596,1],[8602,8603,1],[8608,8614,3],[8622,8654,32],[8655,8658,3],[8660,8692,32],[8693,8959,1],[8992,8993,1],[9084,9115,31],[9116,9139,1],[9180,9185,1],[9655,9665,10],[9720,9727,1],[9839,10176,337],[10177,10180,1],[10183,10213,1],[10224,10239,1],[10496,10626,1],[10649,10711,1],[10716,10747,1],[10750,11007,1],[11056,11076,1],[11079,11084,1],[64297,65122,825],[65124,65126,1],[65291,65308,17],[65309,65310,1],[65372,65374,2],[65506,65513,7],[65514,65516,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[126704,126705,1]]),_(d,"So",[[166,169,3],[174,176,2],[1154,1421,267],[1422,1550,128],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2554,2928,374],[3059,3064,1],[3066,3199,133],[3407,3449,42],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6464,723],[6622,6655,1],[7009,7018,1],[7028,7036,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8478,7],[8479,8483,1],[8485,8489,2],[8494,8506,12],[8507,8522,15],[8524,8525,1],[8527,8586,59],[8587,8597,10],[8598,8601,1],[8604,8607,1],[8609,8610,1],[8612,8613,1],[8615,8621,1],[8623,8653,1],[8656,8657,1],[8659,8661,2],[8662,8691,1],[8960,8967,1],[8972,8991,1],[8994,9e3,1],[9003,9083,1],[9085,9114,1],[9140,9179,1],[9186,9254,1],[9280,9290,1],[9372,9449,1],[9472,9654,1],[9656,9664,1],[9666,9719,1],[9728,9838,1],[9840,10087,1],[10132,10175,1],[10240,10495,1],[11008,11055,1],[11077,11078,1],[11085,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[43048,43051,1],[43062,43063,1],[43065,43639,574],[43640,43641,1],[64832,64847,1],[64975,65021,46],[65022,65023,1],[65508,65512,4],[65517,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73692,1],[73697,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,126124,2909],[126254,126976,722],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,127994,1],[128e3,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),_(d,"Z",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8232,8233,1],[8239,8287,48],[12288,12288,1]]),_(d,"Zl",[[8232,8232,1]]),_(d,"Zp",[[8233,8233,1]]),_(d,"Zs",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8239,8287,48],[12288,12288,1]]),_(d,"Adlam",[[125184,125259,1],[125264,125273,1],[125278,125279,1]]),_(d,"Ahom",[[71424,71450,1],[71453,71467,1],[71472,71494,1]]),_(d,"Anatolian_Hieroglyphs",[[82944,83526,1]]),_(d,"Arabic",[[1536,1540,1],[1542,1547,1],[1549,1562,1],[1564,1566,1],[1568,1599,1],[1601,1610,1],[1622,1647,1],[1649,1756,1],[1758,1791,1],[1872,1919,1],[2160,2190,1],[2192,2193,1],[2200,2273,1],[2275,2303,1],[64336,64450,1],[64467,64829,1],[64832,64911,1],[64914,64967,1],[64975,65008,33],[65009,65023,1],[65136,65140,1],[65142,65276,1],[69216,69246,1],[69373,69375,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[126704,126705,1]]),_(d,"Armenian",[[1329,1366,1],[1369,1418,1],[1421,1423,1],[64275,64279,1]]),_(d,"Avestan",[[68352,68405,1],[68409,68415,1]]),_(d,"Balinese",[[6912,6988,1],[6992,7038,1]]),_(d,"Bamum",[[42656,42743,1],[92160,92728,1]]),_(d,"Bassa_Vah",[[92880,92909,1],[92912,92917,1]]),_(d,"Batak",[[7104,7155,1],[7164,7167,1]]),_(d,"Bengali",[[2432,2435,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2492,2500,1],[2503,2504,1],[2507,2510,1],[2519,2524,5],[2525,2527,2],[2528,2531,1],[2534,2558,1]]),_(d,"Bhaiksuki",[[72704,72712,1],[72714,72758,1],[72760,72773,1],[72784,72812,1]]),_(d,"Bopomofo",[[746,747,1],[12549,12591,1],[12704,12735,1]]),_(d,"Brahmi",[[69632,69709,1],[69714,69749,1],[69759,69759,1]]),_(d,"Braille",[[10240,10495,1]]),_(d,"Buginese",[[6656,6683,1],[6686,6687,1]]),_(d,"Buhid",[[5952,5971,1]]),_(d,"Canadian_Aboriginal",[[5120,5759,1],[6320,6389,1],[72368,72383,1]]),_(d,"Carian",[[66208,66256,1]]),_(d,"Caucasian_Albanian",[[66864,66915,1],[66927,66927,1]]),_(d,"Chakma",[[69888,69940,1],[69942,69959,1]]),_(d,"Cham",[[43520,43574,1],[43584,43597,1],[43600,43609,1],[43612,43615,1]]),_(d,"Cherokee",[[5024,5109,1],[5112,5117,1],[43888,43967,1]]),_(d,"Chorasmian",[[69552,69579,1]]),_(d,"Common",[[0,64,1],[91,96,1],[123,169,1],[171,185,1],[187,191,1],[215,247,32],[697,735,1],[741,745,1],[748,767,1],[884,894,10],[901,903,2],[1541,1548,7],[1563,1567,4],[1600,1757,157],[2274,2404,130],[2405,3647,1242],[4053,4056,1],[4347,5867,1520],[5868,5869,1],[5941,5942,1],[6146,6147,1],[6149,7379,1230],[7393,7401,8],[7402,7404,1],[7406,7411,1],[7413,7415,1],[7418,8192,774],[8193,8203,1],[8206,8292,1],[8294,8304,1],[8308,8318,1],[8320,8334,1],[8352,8384,1],[8448,8485,1],[8487,8489,1],[8492,8497,1],[8499,8525,1],[8527,8543,1],[8585,8587,1],[8592,9254,1],[9280,9290,1],[9312,10239,1],[10496,11123,1],[11126,11157,1],[11159,11263,1],[11776,11869,1],[12272,12292,1],[12294,12296,2],[12297,12320,1],[12336,12343,1],[12348,12351,1],[12443,12444,1],[12448,12539,91],[12540,12688,148],[12689,12703,1],[12736,12771,1],[12783,12832,49],[12833,12895,1],[12927,13007,1],[13055,13144,89],[13145,13311,1],[19904,19967,1],[42752,42785,1],[42888,42890,1],[43056,43065,1],[43310,43471,161],[43867,43882,15],[43883,64830,20947],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65126,1],[65128,65131,1],[65279,65281,2],[65282,65312,1],[65339,65344,1],[65371,65381,1],[65392,65438,46],[65439,65504,65],[65505,65510,1],[65512,65518,1],[65529,65533,1],[65792,65794,1],[65799,65843,1],[65847,65855,1],[65936,65948,1],[66e3,66044,1],[66273,66299,1],[113824,113827,1],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119142,1],[119146,119162,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119488,119507,1],[119520,119539,1],[119552,119638,1],[119648,119672,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120779,1],[120782,120831,1],[126065,126132,1],[126209,126269,1],[126976,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127232,127405,1],[127462,127487,1],[127489,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1],[130032,130041,1],[917505,917536,31],[917537,917631,1]]),_(d,"foldCommon",[[924,956,32]]),_(d,"Coptic",[[994,1007,1],[11392,11507,1],[11513,11519,1]]),_(d,"Cuneiform",[[73728,74649,1],[74752,74862,1],[74864,74868,1],[74880,75075,1]]),_(d,"Cypriot",[[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3]]),_(d,"Cypro_Minoan",[[77712,77810,1]]),_(d,"Cyrillic",[[1024,1156,1],[1159,1327,1],[7296,7304,1],[7467,7544,77],[11744,11775,1],[42560,42655,1],[65070,65071,1],[122928,122989,1],[123023,123023,1]]),_(d,"Deseret",[[66560,66639,1]]),_(d,"Devanagari",[[2304,2384,1],[2389,2403,1],[2406,2431,1],[43232,43263,1],[72448,72457,1]]),_(d,"Dives_Akuru",[[71936,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71989,1],[71991,71992,1],[71995,72006,1],[72016,72025,1]]),_(d,"Dogra",[[71680,71739,1]]),_(d,"Duployan",[[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[113820,113823,1]]),_(d,"Egyptian_Hieroglyphs",[[77824,78933,1]]),_(d,"Elbasan",[[66816,66855,1]]),_(d,"Elymaic",[[69600,69622,1]]),_(d,"Ethiopic",[[4608,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4957,4988,1],[4992,5017,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1]]),_(d,"Georgian",[[4256,4293,1],[4295,4301,6],[4304,4346,1],[4348,4351,1],[7312,7354,1],[7357,7359,1],[11520,11557,1],[11559,11565,6]]),_(d,"Glagolitic",[[11264,11359,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1]]),_(d,"Gothic",[[66352,66378,1]]),_(d,"Grantha",[[70400,70403,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70460,70468,1],[70471,70472,1],[70475,70477,1],[70480,70487,7],[70493,70499,1],[70502,70508,1],[70512,70516,1]]),_(d,"Greek",[[880,883,1],[885,887,1],[890,893,1],[895,900,5],[902,904,2],[905,906,1],[908,910,2],[911,929,1],[931,993,1],[1008,1023,1],[7462,7466,1],[7517,7521,1],[7526,7530,1],[7615,7936,321],[7937,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8132,1],[8134,8147,1],[8150,8155,1],[8157,8175,1],[8178,8180,1],[8182,8190,1],[8486,43877,35391],[65856,65934,1],[65952,119296,53344],[119297,119365,1]]),_(d,"foldGreek",[[181,837,656]]),_(d,"Gujarati",[[2689,2691,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2748,2757,1],[2759,2761,1],[2763,2765,1],[2768,2784,16],[2785,2787,1],[2790,2801,1],[2809,2815,1]]),_(d,"Gunjala_Gondi",[[73056,73061,1],[73063,73064,1],[73066,73102,1],[73104,73105,1],[73107,73112,1],[73120,73129,1]]),_(d,"Gurmukhi",[[2561,2563,1],[2565,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2649,8],[2650,2652,1],[2654,2662,8],[2663,2678,1]]),_(d,"Han",[[11904,11929,1],[11931,12019,1],[12032,12245,1],[12293,12295,2],[12321,12329,1],[12344,12347,1],[13312,19903,1],[19968,40959,1],[63744,64109,1],[64112,64217,1],[94178,94179,1],[94192,94193,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"Hangul",[[4352,4607,1],[12334,12335,1],[12593,12686,1],[12800,12830,1],[12896,12926,1],[43360,43388,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1]]),_(d,"Hanifi_Rohingya",[[68864,68903,1],[68912,68921,1]]),_(d,"Hanunoo",[[5920,5940,1]]),_(d,"Hatran",[[67808,67826,1],[67828,67829,1],[67835,67839,1]]),_(d,"Hebrew",[[1425,1479,1],[1488,1514,1],[1519,1524,1],[64285,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64335,1]]),_(d,"Hiragana",[[12353,12438,1],[12445,12447,1],[110593,110879,1],[110898,110928,30],[110929,110930,1],[127488,127488,1]]),_(d,"Imperial_Aramaic",[[67648,67669,1],[67671,67679,1]]),_(d,"Inherited",[[768,879,1],[1157,1158,1],[1611,1621,1],[1648,2385,737],[2386,2388,1],[6832,6862,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8204,8205,1],[8400,8432,1],[12330,12333,1],[12441,12442,1],[65024,65039,1],[65056,65069,1],[66045,66272,227],[70459,118528,48069],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[917760,917999,1]]),_(d,"foldInherited",[[921,953,32],[8126,8126,1]]),_(d,"Inscriptional_Pahlavi",[[68448,68466,1],[68472,68479,1]]),_(d,"Inscriptional_Parthian",[[68416,68437,1],[68440,68447,1]]),_(d,"Javanese",[[43392,43469,1],[43472,43481,1],[43486,43487,1]]),_(d,"Kaithi",[[69760,69826,1],[69837,69837,1]]),_(d,"Kannada",[[3200,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3260,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3293,3294,1],[3296,3299,1],[3302,3311,1],[3313,3315,1]]),_(d,"Katakana",[[12449,12538,1],[12541,12543,1],[12784,12799,1],[13008,13054,1],[13056,13143,1],[65382,65391,1],[65393,65437,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110880,288],[110881,110882,1],[110933,110948,15],[110949,110951,1]]),_(d,"Kawi",[[73472,73488,1],[73490,73530,1],[73534,73561,1]]),_(d,"Kayah_Li",[[43264,43309,1],[43311,43311,1]]),_(d,"Kharoshthi",[[68096,68099,1],[68101,68102,1],[68108,68115,1],[68117,68119,1],[68121,68149,1],[68152,68154,1],[68159,68168,1],[68176,68184,1]]),_(d,"Khitan_Small_Script",[[94180,101120,6940],[101121,101589,1]]),_(d,"Khmer",[[6016,6109,1],[6112,6121,1],[6128,6137,1],[6624,6655,1]]),_(d,"Khojki",[[70144,70161,1],[70163,70209,1]]),_(d,"Khudawadi",[[70320,70378,1],[70384,70393,1]]),_(d,"Lao",[[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3773,1],[3776,3780,1],[3782,3784,2],[3785,3790,1],[3792,3801,1],[3804,3807,1]]),_(d,"Latin",[[65,90,1],[97,122,1],[170,186,16],[192,214,1],[216,246,1],[248,696,1],[736,740,1],[7424,7461,1],[7468,7516,1],[7522,7525,1],[7531,7543,1],[7545,7614,1],[7680,7935,1],[8305,8319,14],[8336,8348,1],[8490,8491,1],[8498,8526,28],[8544,8584,1],[11360,11391,1],[42786,42887,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43007,1],[43824,43866,1],[43868,43876,1],[43878,43881,1],[64256,64262,1],[65313,65338,1],[65345,65370,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[122624,122654,1],[122661,122666,1]]),_(d,"Lepcha",[[7168,7223,1],[7227,7241,1],[7245,7247,1]]),_(d,"Limbu",[[6400,6430,1],[6432,6443,1],[6448,6459,1],[6464,6468,4],[6469,6479,1]]),_(d,"Linear_A",[[67072,67382,1],[67392,67413,1],[67424,67431,1]]),_(d,"Linear_B",[[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1]]),_(d,"Lisu",[[42192,42239,1],[73648,73648,1]]),_(d,"Lycian",[[66176,66204,1]]),_(d,"Lydian",[[67872,67897,1],[67903,67903,1]]),_(d,"Mahajani",[[69968,70006,1]]),_(d,"Makasar",[[73440,73464,1]]),_(d,"Malayalam",[[3328,3340,1],[3342,3344,1],[3346,3396,1],[3398,3400,1],[3402,3407,1],[3412,3427,1],[3430,3455,1]]),_(d,"Mandaic",[[2112,2139,1],[2142,2142,1]]),_(d,"Manichaean",[[68288,68326,1],[68331,68342,1]]),_(d,"Marchen",[[72816,72847,1],[72850,72871,1],[72873,72886,1]]),_(d,"Masaram_Gondi",[[72960,72966,1],[72968,72969,1],[72971,73014,1],[73018,73020,2],[73021,73023,2],[73024,73031,1],[73040,73049,1]]),_(d,"Medefaidrin",[[93760,93850,1]]),_(d,"Meetei_Mayek",[[43744,43766,1],[43968,44013,1],[44016,44025,1]]),_(d,"Mende_Kikakui",[[124928,125124,1],[125127,125142,1]]),_(d,"Meroitic_Cursive",[[68e3,68023,1],[68028,68047,1],[68050,68095,1]]),_(d,"Meroitic_Hieroglyphs",[[67968,67999,1]]),_(d,"Miao",[[93952,94026,1],[94031,94087,1],[94095,94111,1]]),_(d,"Modi",[[71168,71236,1],[71248,71257,1]]),_(d,"Mongolian",[[6144,6145,1],[6148,6150,2],[6151,6169,1],[6176,6264,1],[6272,6314,1],[71264,71276,1]]),_(d,"Mro",[[92736,92766,1],[92768,92777,1],[92782,92783,1]]),_(d,"Multani",[[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70313,1]]),_(d,"Myanmar",[[4096,4255,1],[43488,43518,1],[43616,43647,1]]),_(d,"Nabataean",[[67712,67742,1],[67751,67759,1]]),_(d,"Nag_Mundari",[[124112,124153,1]]),_(d,"Nandinagari",[[72096,72103,1],[72106,72151,1],[72154,72164,1]]),_(d,"New_Tai_Lue",[[6528,6571,1],[6576,6601,1],[6608,6618,1],[6622,6623,1]]),_(d,"Newa",[[70656,70747,1],[70749,70753,1]]),_(d,"Nko",[[1984,2042,1],[2045,2047,1]]),_(d,"Nushu",[[94177,110960,16783],[110961,111355,1]]),_(d,"Nyiakeng_Puachue_Hmong",[[123136,123180,1],[123184,123197,1],[123200,123209,1],[123214,123215,1]]),_(d,"Ogham",[[5760,5788,1]]),_(d,"Ol_Chiki",[[7248,7295,1]]),_(d,"Old_Hungarian",[[68736,68786,1],[68800,68850,1],[68858,68863,1]]),_(d,"Old_Italic",[[66304,66339,1],[66349,66351,1]]),_(d,"Old_North_Arabian",[[68224,68255,1]]),_(d,"Old_Permic",[[66384,66426,1]]),_(d,"Old_Persian",[[66464,66499,1],[66504,66517,1]]),_(d,"Old_Sogdian",[[69376,69415,1]]),_(d,"Old_South_Arabian",[[68192,68223,1]]),_(d,"Old_Turkic",[[68608,68680,1]]),_(d,"Old_Uyghur",[[69488,69513,1]]),_(d,"Oriya",[[2817,2819,1],[2821,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2876,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2908,2909,1],[2911,2915,1],[2918,2935,1]]),_(d,"Osage",[[66736,66771,1],[66776,66811,1]]),_(d,"Osmanya",[[66688,66717,1],[66720,66729,1]]),_(d,"Pahawh_Hmong",[[92928,92997,1],[93008,93017,1],[93019,93025,1],[93027,93047,1],[93053,93071,1]]),_(d,"Palmyrene",[[67680,67711,1]]),_(d,"Pau_Cin_Hau",[[72384,72440,1]]),_(d,"Phags_Pa",[[43072,43127,1]]),_(d,"Phoenician",[[67840,67867,1],[67871,67871,1]]),_(d,"Psalter_Pahlavi",[[68480,68497,1],[68505,68508,1],[68521,68527,1]]),_(d,"Rejang",[[43312,43347,1],[43359,43359,1]]),_(d,"Runic",[[5792,5866,1],[5870,5880,1]]),_(d,"Samaritan",[[2048,2093,1],[2096,2110,1]]),_(d,"Saurashtra",[[43136,43205,1],[43214,43225,1]]),_(d,"Sharada",[[70016,70111,1]]),_(d,"Shavian",[[66640,66687,1]]),_(d,"Siddham",[[71040,71093,1],[71096,71133,1]]),_(d,"SignWriting",[[120832,121483,1],[121499,121503,1],[121505,121519,1]]),_(d,"Sinhala",[[3457,3459,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3558,3567,1],[3570,3572,1],[70113,70132,1]]),_(d,"Sogdian",[[69424,69465,1]]),_(d,"Sora_Sompeng",[[69840,69864,1],[69872,69881,1]]),_(d,"Soyombo",[[72272,72354,1]]),_(d,"Sundanese",[[7040,7103,1],[7360,7367,1]]),_(d,"Syloti_Nagri",[[43008,43052,1]]),_(d,"Syriac",[[1792,1805,1],[1807,1866,1],[1869,1871,1],[2144,2154,1]]),_(d,"Tagalog",[[5888,5909,1],[5919,5919,1]]),_(d,"Tagbanwa",[[5984,5996,1],[5998,6e3,1],[6002,6003,1]]),_(d,"Tai_Le",[[6480,6509,1],[6512,6516,1]]),_(d,"Tai_Tham",[[6688,6750,1],[6752,6780,1],[6783,6793,1],[6800,6809,1],[6816,6829,1]]),_(d,"Tai_Viet",[[43648,43714,1],[43739,43743,1]]),_(d,"Takri",[[71296,71353,1],[71360,71369,1]]),_(d,"Tamil",[[2946,2947,1],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3006,3010,1],[3014,3016,1],[3018,3021,1],[3024,3031,7],[3046,3066,1],[73664,73713,1],[73727,73727,1]]),_(d,"Tangsa",[[92784,92862,1],[92864,92873,1]]),_(d,"Tangut",[[94176,94208,32],[94209,100343,1],[100352,101119,1],[101632,101640,1]]),_(d,"Telugu",[[3072,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3132,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3160,3162,1],[3165,3168,3],[3169,3171,1],[3174,3183,1],[3191,3199,1]]),_(d,"Thaana",[[1920,1969,1]]),_(d,"Thai",[[3585,3642,1],[3648,3675,1]]),_(d,"Tibetan",[[3840,3911,1],[3913,3948,1],[3953,3991,1],[3993,4028,1],[4030,4044,1],[4046,4052,1],[4057,4058,1]]),_(d,"Tifinagh",[[11568,11623,1],[11631,11632,1],[11647,11647,1]]),_(d,"Tirhuta",[[70784,70855,1],[70864,70873,1]]),_(d,"Toto",[[123536,123566,1]]),_(d,"Ugaritic",[[66432,66461,1],[66463,66463,1]]),_(d,"Vai",[[42240,42539,1]]),_(d,"Vithkuqi",[[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1]]),_(d,"Wancho",[[123584,123641,1],[123647,123647,1]]),_(d,"Warang_Citi",[[71840,71922,1],[71935,71935,1]]),_(d,"Yezidi",[[69248,69289,1],[69291,69293,1],[69296,69297,1]]),_(d,"Yi",[[40960,42124,1],[42128,42182,1]]),_(d,"Zanabazar_Square",[[72192,72263,1]]),_(d,"CATEGORIES",new Map([["C",d.C],["Cc",d.Cc],["Cf",d.Cf],["Co",d.Co],["Cs",d.Cs],["L",d.L],["Ll",d.Ll],["Lm",d.Lm],["Lo",d.Lo],["Lt",d.Lt],["Lu",d.Lu],["M",d.M],["Mc",d.Mc],["Me",d.Me],["Mn",d.Mn],["N",d.N],["Nd",d.Nd],["Nl",d.Nl],["No",d.No],["P",d.P],["Pc",d.Pc],["Pd",d.Pd],["Pe",d.Pe],["Pf",d.Pf],["Pi",d.Pi],["Po",d.Po],["Ps",d.Ps],["S",d.S],["Sc",d.Sc],["Sk",d.Sk],["Sm",d.Sm],["So",d.So],["Z",d.Z],["Zl",d.Zl],["Zp",d.Zp],["Zs",d.Zs]])),_(d,"SCRIPTS",new Map([["Adlam",d.Adlam],["Ahom",d.Ahom],["Anatolian_Hieroglyphs",d.Anatolian_Hieroglyphs],["Arabic",d.Arabic],["Armenian",d.Armenian],["Avestan",d.Avestan],["Balinese",d.Balinese],["Bamum",d.Bamum],["Bassa_Vah",d.Bassa_Vah],["Batak",d.Batak],["Bengali",d.Bengali],["Bhaiksuki",d.Bhaiksuki],["Bopomofo",d.Bopomofo],["Brahmi",d.Brahmi],["Braille",d.Braille],["Buginese",d.Buginese],["Buhid",d.Buhid],["Canadian_Aboriginal",d.Canadian_Aboriginal],["Carian",d.Carian],["Caucasian_Albanian",d.Caucasian_Albanian],["Chakma",d.Chakma],["Cham",d.Cham],["Cherokee",d.Cherokee],["Chorasmian",d.Chorasmian],["Common",d.Common],["Coptic",d.Coptic],["Cuneiform",d.Cuneiform],["Cypriot",d.Cypriot],["Cypro_Minoan",d.Cypro_Minoan],["Cyrillic",d.Cyrillic],["Deseret",d.Deseret],["Devanagari",d.Devanagari],["Dives_Akuru",d.Dives_Akuru],["Dogra",d.Dogra],["Duployan",d.Duployan],["Egyptian_Hieroglyphs",d.Egyptian_Hieroglyphs],["Elbasan",d.Elbasan],["Elymaic",d.Elymaic],["Ethiopic",d.Ethiopic],["Georgian",d.Georgian],["Glagolitic",d.Glagolitic],["Gothic",d.Gothic],["Grantha",d.Grantha],["Greek",d.Greek],["Gujarati",d.Gujarati],["Gunjala_Gondi",d.Gunjala_Gondi],["Gurmukhi",d.Gurmukhi],["Han",d.Han],["Hangul",d.Hangul],["Hanifi_Rohingya",d.Hanifi_Rohingya],["Hanunoo",d.Hanunoo],["Hatran",d.Hatran],["Hebrew",d.Hebrew],["Hiragana",d.Hiragana],["Imperial_Aramaic",d.Imperial_Aramaic],["Inherited",d.Inherited],["Inscriptional_Pahlavi",d.Inscriptional_Pahlavi],["Inscriptional_Parthian",d.Inscriptional_Parthian],["Javanese",d.Javanese],["Kaithi",d.Kaithi],["Kannada",d.Kannada],["Katakana",d.Katakana],["Kawi",d.Kawi],["Kayah_Li",d.Kayah_Li],["Kharoshthi",d.Kharoshthi],["Khitan_Small_Script",d.Khitan_Small_Script],["Khmer",d.Khmer],["Khojki",d.Khojki],["Khudawadi",d.Khudawadi],["Lao",d.Lao],["Latin",d.Latin],["Lepcha",d.Lepcha],["Limbu",d.Limbu],["Linear_A",d.Linear_A],["Linear_B",d.Linear_B],["Lisu",d.Lisu],["Lycian",d.Lycian],["Lydian",d.Lydian],["Mahajani",d.Mahajani],["Makasar",d.Makasar],["Malayalam",d.Malayalam],["Mandaic",d.Mandaic],["Manichaean",d.Manichaean],["Marchen",d.Marchen],["Masaram_Gondi",d.Masaram_Gondi],["Medefaidrin",d.Medefaidrin],["Meetei_Mayek",d.Meetei_Mayek],["Mende_Kikakui",d.Mende_Kikakui],["Meroitic_Cursive",d.Meroitic_Cursive],["Meroitic_Hieroglyphs",d.Meroitic_Hieroglyphs],["Miao",d.Miao],["Modi",d.Modi],["Mongolian",d.Mongolian],["Mro",d.Mro],["Multani",d.Multani],["Myanmar",d.Myanmar],["Nabataean",d.Nabataean],["Nag_Mundari",d.Nag_Mundari],["Nandinagari",d.Nandinagari],["New_Tai_Lue",d.New_Tai_Lue],["Newa",d.Newa],["Nko",d.Nko],["Nushu",d.Nushu],["Nyiakeng_Puachue_Hmong",d.Nyiakeng_Puachue_Hmong],["Ogham",d.Ogham],["Ol_Chiki",d.Ol_Chiki],["Old_Hungarian",d.Old_Hungarian],["Old_Italic",d.Old_Italic],["Old_North_Arabian",d.Old_North_Arabian],["Old_Permic",d.Old_Permic],["Old_Persian",d.Old_Persian],["Old_Sogdian",d.Old_Sogdian],["Old_South_Arabian",d.Old_South_Arabian],["Old_Turkic",d.Old_Turkic],["Old_Uyghur",d.Old_Uyghur],["Oriya",d.Oriya],["Osage",d.Osage],["Osmanya",d.Osmanya],["Pahawh_Hmong",d.Pahawh_Hmong],["Palmyrene",d.Palmyrene],["Pau_Cin_Hau",d.Pau_Cin_Hau],["Phags_Pa",d.Phags_Pa],["Phoenician",d.Phoenician],["Psalter_Pahlavi",d.Psalter_Pahlavi],["Rejang",d.Rejang],["Runic",d.Runic],["Samaritan",d.Samaritan],["Saurashtra",d.Saurashtra],["Sharada",d.Sharada],["Shavian",d.Shavian],["Siddham",d.Siddham],["SignWriting",d.SignWriting],["Sinhala",d.Sinhala],["Sogdian",d.Sogdian],["Sora_Sompeng",d.Sora_Sompeng],["Soyombo",d.Soyombo],["Sundanese",d.Sundanese],["Syloti_Nagri",d.Syloti_Nagri],["Syriac",d.Syriac],["Tagalog",d.Tagalog],["Tagbanwa",d.Tagbanwa],["Tai_Le",d.Tai_Le],["Tai_Tham",d.Tai_Tham],["Tai_Viet",d.Tai_Viet],["Takri",d.Takri],["Tamil",d.Tamil],["Tangsa",d.Tangsa],["Tangut",d.Tangut],["Telugu",d.Telugu],["Thaana",d.Thaana],["Thai",d.Thai],["Tibetan",d.Tibetan],["Tifinagh",d.Tifinagh],["Tirhuta",d.Tirhuta],["Toto",d.Toto],["Ugaritic",d.Ugaritic],["Vai",d.Vai],["Vithkuqi",d.Vithkuqi],["Wancho",d.Wancho],["Warang_Citi",d.Warang_Citi],["Yezidi",d.Yezidi],["Yi",d.Yi],["Zanabazar_Square",d.Zanabazar_Square]])),_(d,"FOLD_CATEGORIES",new Map([["L",d.foldL],["Ll",d.foldLl],["Lt",d.foldLt],["Lu",d.foldLu],["M",d.foldM],["Mn",d.foldMn]])),_(d,"FOLD_SCRIPT",new Map([["Common",d.foldCommon],["Greek",d.foldGreek],["Inherited",d.foldInherited]]));let jt=d;class X{static is32(t,e){let r=0,s=t.length;for(;r<s;){let i=r+Math.floor((s-r)/2),o=t[i];if(o[0]<=e&&e<=o[1])return(e-o[0])%o[2]===0;e<o[0]?s=i:r=i+1}return!1}static is(t,e){if(e<=this.MAX_LATIN1){for(let r of t)if(!(e>r[1]))return e<r[0]?!1:(e-r[0])%r[2]===0;return!1}return t.length>0&&e>=t[0][0]&&this.is32(t,e)}static isUpper(t){if(t<=this.MAX_LATIN1){const e=String.fromCodePoint(t);return e.toUpperCase()===e&&e.toLowerCase()!==e}return this.is(jt.Upper,t)}static isPrint(t){return t<=this.MAX_LATIN1?t>=32&&t<127||t>=161&&t!==173:this.is(jt.L,t)||this.is(jt.M,t)||this.is(jt.N,t)||this.is(jt.P,t)||this.is(jt.S,t)}static simpleFold(t){if(jt.CASE_ORBIT.has(t))return jt.CASE_ORBIT.get(t);const e=b.toLowerCase(t);return e!==t?e:b.toUpperCase(t)}static equalsIgnoreCase(t,e){if(t<0||e<0||t===e)return!0;if(t<=this.MAX_ASCII&&e<=this.MAX_ASCII)return b.CODES.get("A")<=t&&t<=b.CODES.get("Z")&&(t|=32),b.CODES.get("A")<=e&&e<=b.CODES.get("Z")&&(e|=32),t===e;for(let r=this.simpleFold(t);r!==t;r=this.simpleFold(r))if(r===e)return!0;return!1}}_(X,"MAX_RUNE",1114111),_(X,"MAX_ASCII",127),_(X,"MAX_LATIN1",255),_(X,"MAX_BMP",65535),_(X,"MIN_FOLD",65),_(X,"MAX_FOLD",125251);class tt{static emptyInts(){return[]}static isalnum(t){return b.CODES.get("0")<=t&&t<=b.CODES.get("9")||b.CODES.get("a")<=t&&t<=b.CODES.get("z")||b.CODES.get("A")<=t&&t<=b.CODES.get("Z")}static unhex(t){return b.CODES.get("0")<=t&&t<=b.CODES.get("9")?t-b.CODES.get("0"):b.CODES.get("a")<=t&&t<=b.CODES.get("f")?t-b.CODES.get("a")+10:b.CODES.get("A")<=t&&t<=b.CODES.get("F")?t-b.CODES.get("A")+10:-1}static escapeRune(t){let e="";if(X.isPrint(t))this.METACHARACTERS.indexOf(String.fromCodePoint(t))>=0&&(e+="\\"),e+=String.fromCodePoint(t);else switch(t){case b.CODES.get('"'):e+='\\"';break;case b.CODES.get("\\"):e+="\\\\";break;case b.CODES.get("	"):e+="\\t";break;case b.CODES.get(`
`):e+="\\n";break;case b.CODES.get("\r"):e+="\\r";break;case b.CODES.get("\b"):e+="\\b";break;case b.CODES.get("\f"):e+="\\f";break;default:{let r=t.toString(16);t<256?(e+="\\x",r.length===1&&(e+="0"),e+=r):e+=`\\x{${r}}`;break}}return e}static stringToRunes(t){return String(t).split("").map(e=>e.codePointAt(0))}static runeToString(t){return String.fromCodePoint(t)}static isWordRune(t){return b.CODES.get("a")<=t&&t<=b.CODES.get("z")||b.CODES.get("A")<=t&&t<=b.CODES.get("Z")||b.CODES.get("0")<=t&&t<=b.CODES.get("9")||t===b.CODES.get("_")}static emptyOpContext(t,e){let r=0;return t<0&&(r|=this.EMPTY_BEGIN_TEXT|this.EMPTY_BEGIN_LINE),t===b.CODES.get(`
`)&&(r|=this.EMPTY_BEGIN_LINE),e<0&&(r|=this.EMPTY_END_TEXT|this.EMPTY_END_LINE),e===b.CODES.get(`
`)&&(r|=this.EMPTY_END_LINE),this.isWordRune(t)!==this.isWordRune(e)?r|=this.EMPTY_WORD_BOUNDARY:r|=this.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(t){return t.split("").map(e=>this.METACHARACTERS.indexOf(e)>=0?`\\${e}`:e).join("")}static charCount(t){return t>X.MAX_BMP?2:1}static stringToUtf8ByteArray(t){if(globalThis.TextEncoder)return Array.from(new TextEncoder().encode(t));{let e=[],r=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e}}static utf8ByteArrayToString(t){if(globalThis.TextDecoder)return new TextDecoder("utf-8").decode(new Uint8Array(t));{let e=[],r=0,s=0;for(;r<t.length;){let i=t[r++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=t[r++];e[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=t[r++],u=t[r++],c=t[r++],h=((i&7)<<18|(o&63)<<12|(u&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(h>>10)),e[s++]=String.fromCharCode(56320+(h&1023))}else{let o=t[r++],u=t[r++];e[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|u&63)}}return e.join("")}}}_(tt,"METACHARACTERS","\\.+*?()|[]{}^$"),_(tt,"EMPTY_BEGIN_LINE",1),_(tt,"EMPTY_END_LINE",2),_(tt,"EMPTY_BEGIN_TEXT",4),_(tt,"EMPTY_END_TEXT",8),_(tt,"EMPTY_WORD_BOUNDARY",16),_(tt,"EMPTY_NO_WORD_BOUNDARY",32),_(tt,"EMPTY_ALL",-1);const p2=(n=[],t=0)=>{const e={};for(let r=0;r<n.length;r++){const s=n[r],i=t+r;e[s]=i,e[i]=s}return Object.freeze(e)},vs=class vs{getEncoding(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===vs.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===vs.Encoding.UTF_16}};_(vs,"Encoding",p2(["UTF_16","UTF_8"]));let Rn=vs;class Gc extends Rn{constructor(t=null){super(),this.bytes=t}getEncoding(){return Rn.Encoding.UTF_8}asCharSequence(){return tt.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}}class X7 extends Rn{constructor(t=null){super(),this.charSequence=t}getEncoding(){return Rn.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return this.charSequence.toString().split("").map(t=>t.codePointAt(0))}length(){return this.charSequence.length}}class Xi{static utf16(t){return new X7(t)}static utf8(t){return Array.isArray(t)?new Gc(t):new Gc(tt.stringToUtf8ByteArray(t))}}class wo extends Error{constructor(t){super(t),this.name="RE2JSException"}}class Rt extends wo{constructor(t,e=null){let r=`error parsing regexp: ${t}`;e&&(r+=`: \`${e}\``),super(r),this.name="RE2JSSyntaxException",this.message=r,this.error=t,this.input=e}getDescription(){return this.error}getPattern(){return this.input}}class J7 extends wo{constructor(t){super(t),this.name="RE2JSCompileException"}}class Be extends wo{constructor(t){super(t),this.name="RE2JSGroupException"}}class Z7 extends wo{constructor(t){super(t),this.name="RE2JSFlagsException"}}class t4{static quoteReplacement(t){return t.indexOf("\\")<0&&t.indexOf("$")<0?t:t.split("").map(e=>{const r=e.codePointAt(0);return r===b.CODES["\\"]||r===b.CODES.$?`\\${e}`:e}).join("")}constructor(t,e){if(t===null)throw new Error("pattern is null");this.patternInput=t;const r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,e instanceof Rn?this.resetMatcherInput(e):Array.isArray(e)?this.resetMatcherInput(Xi.utf8(e)):this.resetMatcherInput(Xi.utf16(e))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(t){if(t===null)throw new Error("input is null");return this.matcherInput=t,this.reset(),this}start(t=0){if(typeof t=="string"){const e=this.namedGroups[t];if(!Number.isFinite(e))throw new Be(`group '${t}' not found`);t=e}return this.loadGroup(t),this.groups[2*t]}end(t=0){if(typeof t=="string"){const e=this.namedGroups[t];if(!Number.isFinite(e))throw new Be(`group '${t}' not found`);t=e}return this.loadGroup(t),this.groups[2*t+1]}group(t=0){if(typeof t=="string"){const s=this.namedGroups[t];if(!Number.isFinite(s))throw new Be(`group '${t}' not found`);t=s}const e=this.start(t),r=this.end(t);return e<0&&r<0?null:this.substring(e,r)}groupCount(){return this.patternGroupCount}loadGroup(t){if(t<0||t>this.patternGroupCount)throw new Be(`Group index out of bounds: ${t}`);if(!this.hasMatch)throw new Be("perhaps no match attempted");if(t===0||this.hasGroups)return;let e=this.groups[1]+1;e>this.matcherInputLength&&(e=this.matcherInputLength);const r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],e,this.anchorFlag,1+this.patternGroupCount);if(!r[0])throw new Be("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,q.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,q.ANCHOR_START)}find(t=null){if(t!==null){if(t<0||t>this.matcherInputLength)throw new Be(`start index out of bounds: ${t}`);return this.reset(),this.genMatch(t,0)}return t=0,this.hasMatch&&(t=this.groups[1],this.groups[0]===this.groups[1]&&t++),this.genMatch(t,q.UNANCHORED)}genMatch(t,e){const r=this.patternInput.re2().matchMachineInput(this.matcherInput,t,this.matcherInputLength,e,1);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=!1,this.anchorFlag=e,!0):!1}substring(t,e){return this.matcherInput.isUTF8Encoding()?tt.utf8ByteArrayToString(this.matcherInput.asBytes().slice(t,e)):this.matcherInput.asCharSequence().substring(t,e).toString()}inputLength(){return this.matcherInputLength}appendReplacement(t,e=!1){let r="";const s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=e?this.appendReplacementInternalPerl(t):this.appendReplacementInternal(t),r}appendReplacementInternal(t){let e="",r=0;const s=t.length;for(let i=0;i<s-1;i++){if(t.codePointAt(i)===b.CODES.get("\\")){r<i&&(e+=t.substring(r,i)),i++,r=i;continue}if(t.codePointAt(i)===b.CODES.get("$")){let o=t.codePointAt(i+1);if(b.CODES.get("0")<=o&&o<=b.CODES.get("9")){let u=o-b.CODES.get("0");for(r<i&&(e+=t.substring(r,i)),i+=2;i<s&&(o=t.codePointAt(i),!(o<b.CODES.get("0")||o>b.CODES.get("9")||u*10+o-b.CODES.get("0")>this.patternGroupCount));i++)u=u*10+o-b.CODES.get("0");if(u>this.patternGroupCount)throw new Be(`n > number of groups: ${u}`);const c=this.group(u);c!==null&&(e+=c),r=i,i--;continue}else if(o===b.CODES.get("{")){r<i&&(e+=t.substring(r,i)),i++;let u=i+1;for(;u<t.length&&t.codePointAt(u)!==b.CODES.get("}")&&t.codePointAt(u)!==b.CODES.get(" ");)u++;if(u===t.length||t.codePointAt(u)!==b.CODES.get("}"))throw new Be("named capture group is missing trailing '}'");const c=t.substring(i+1,u);e+=this.group(c),r=u+1}}}return r<s&&(e+=t.substring(r,s)),e}appendReplacementInternalPerl(t){let e="",r=0;const s=t.length;for(let i=0;i<s-1;i++)if(t.codePointAt(i)===b.CODES.get("$")){let o=t.codePointAt(i+1);if(b.CODES.get("$")===o){r<i&&(e+=t.substring(r,i)),e+="$",i++,r=i+1;continue}else if(b.CODES.get("&")===o){r<i&&(e+=t.substring(r,i));const u=this.group(0);u!==null?e+=u:e+="$&",i++,r=i+1;continue}else if(b.CODES.get("1")<=o&&o<=b.CODES.get("9")){let u=o-b.CODES.get("0");for(r<i&&(e+=t.substring(r,i)),i+=2;i<s&&(o=t.codePointAt(i),!(o<b.CODES.get("0")||o>b.CODES.get("9")||u*10+o-b.CODES.get("0")>this.patternGroupCount));i++)u=u*10+o-b.CODES.get("0");if(u>this.patternGroupCount){e+=`$${u}`,r=i,i--;continue}const c=this.group(u);c!==null&&(e+=c),r=i,i--;continue}else if(o===b.CODES.get("<")){r<i&&(e+=t.substring(r,i)),i++;let u=i+1;for(;u<t.length&&t.codePointAt(u)!==b.CODES.get(">")&&t.codePointAt(u)!==b.CODES.get(" ");)u++;if(u===t.length||t.codePointAt(u)!==b.CODES.get(">")){e+=t.substring(i-1,u+1),r=u+1;continue}const c=t.substring(i+1,u);Object.prototype.hasOwnProperty.call(this.namedGroups,c)?e+=this.group(c):e+=`$<${c}>`,r=u+1}}return r<s&&(e+=t.substring(r,s)),e}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(t,e=!1){return this.replace(t,!0,e)}replaceFirst(t,e=!1){return this.replace(t,!1,e)}replace(t,e=!0,r=!1){let s="";for(this.reset();this.find()&&(s+=this.appendReplacement(t,r),!!e););return s+=this.appendTail(),s}}class gn{static EOF(){return-8}canCheckPrefix(){return!0}endPos(){return this.end}}class e4 extends gn{constructor(t,e=0,r=t.length){super(),this.bytes=t,this.start=e,this.end=r}step(t){if(t+=this.start,t>=this.end)return gn.EOF();let e=this.bytes[t++]&255;return(e&128)===0?e<<3|1:(e&224)===192?(e=e&31,t>=this.end?gn.EOF():(e=e<<6|this.bytes[t++]&63,e<<3|2)):(e&240)===224?(e=e&15,t+1>=this.end?gn.EOF():(e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e<<3|3)):(e=e&7,t+2>=this.end?gn.EOF():(e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e<<3|4))}index(t,e){e+=this.start;const r=this.indexOf(this.bytes,t.prefixUTF8,e);return r<0?r:r-e}context(t){t+=this.start;let e=-1;if(t>this.start&&t<=this.end){let s=t-1;if(e=this.bytes[s--],e>=128){let i=t-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start),e=this.step(s)>>3}}const r=t<this.end?this.step(t)>>3:-1;return tt.emptyOpContext(e,r)}indexOf(t,e,r=0){let s=e.length;if(s===0)return-1;let i=t.length;for(let o=r;o<=i-s;o++)for(let u=0;u<s&&t[o+u]===e[u];u++)if(u===s-1)return o;return-1}}class n4 extends gn{constructor(t,e=0,r=t.length){super(),this.charSequence=t,this.start=e,this.end=r}step(t){if(t+=this.start,t<this.end){const e=this.charSequence.codePointAt(t);return e<<3|tt.charCount(e)}else return gn.EOF()}index(t,e){e+=this.start;const r=this.charSequence.indexOf(t.prefix,e);return r<0?r:r-e}context(t){t+=this.start;const e=t>0&&t<=this.charSequence.length?this.charSequence.codePointAt(t-1):-1,r=t<this.charSequence.length?this.charSequence.codePointAt(t):-1;return tt.emptyOpContext(e,r)}}class Ct{static fromUTF8(t,e=0,r=t.length){return new e4(t,e,r)}static fromUTF16(t,e=0,r=t.length){return new n4(t,e,r)}}const Y=class Y{static isPseudoOp(t){return t>=Y.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(t){return t===b.CODES.get("-")?"\\":""}static fromRegexp(t){const e=new Y(t.op);return e.flags=t.flags,e.subs=t.subs,e.runes=t.runes,e.cap=t.cap,e.min=t.min,e.max=t.max,e.name=t.name,e.namedGroups=t.namedGroups,e}constructor(t){this.op=t,this.flags=0,this.subs=Y.emptySubs(),this.runes=null,this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups={}}reinit(){this.flags=0,this.subs=Y.emptySubs(),this.runes=null,this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups={}}toString(){return this.appendTo()}appendTo(){let t="";switch(this.op){case Y.Op.NO_MATCH:t+="[^\\x00-\\x{10FFFF}]";break;case Y.Op.EMPTY_MATCH:t+="(?:)";break;case Y.Op.STAR:case Y.Op.PLUS:case Y.Op.QUEST:case Y.Op.REPEAT:{const e=this.subs[0];switch(e.op>Y.Op.CAPTURE||e.op===Y.Op.LITERAL&&e.runes.length>1?t+=`(?:${e.appendTo()})`:t+=e.appendTo(),this.op){case Y.Op.STAR:t+="*";break;case Y.Op.PLUS:t+="+";break;case Y.Op.QUEST:t+="?";break;case Y.Op.REPEAT:t+=`{${this.min}`,this.min!==this.max&&(t+=",",this.max>=0&&(t+=this.max)),t+="}";break}(this.flags&q.NON_GREEDY)!==0&&(t+="?");break}case Y.Op.CONCAT:{for(let e of this.subs)e.op===Y.Op.ALTERNATE?t+=`(?:${e.appendTo()})`:t+=e.appendTo();break}case Y.Op.ALTERNATE:{let e="";for(let r of this.subs)t+=e,e="|",t+=r.appendTo();break}case Y.Op.LITERAL:(this.flags&q.FOLD_CASE)!==0&&(t+="(?i:");for(let e of this.runes)t+=tt.escapeRune(e);(this.flags&q.FOLD_CASE)!==0&&(t+=")");break;case Y.Op.ANY_CHAR_NOT_NL:t+="(?-s:.)";break;case Y.Op.ANY_CHAR:t+="(?s:.)";break;case Y.Op.CAPTURE:this.name===null||this.name.length===0?t+="(":t+=`(?P<${this.name}>`,this.subs[0].op!==Y.Op.EMPTY_MATCH&&(t+=this.subs[0].appendTo()),t+=")";break;case Y.Op.BEGIN_TEXT:t+="\\A";break;case Y.Op.END_TEXT:(this.flags&q.WAS_DOLLAR)!==0?t+="(?-m:$)":t+="\\z";break;case Y.Op.BEGIN_LINE:t+="^";break;case Y.Op.END_LINE:t+="$";break;case Y.Op.WORD_BOUNDARY:t+="\\b";break;case Y.Op.NO_WORD_BOUNDARY:t+="\\B";break;case Y.Op.CHAR_CLASS:if(this.runes.length%2!==0){t+="[invalid char class]";break}if(t+="[",this.runes.length===0)t+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===X.MAX_RUNE){t+="^";for(let e=1;e<this.runes.length-1;e+=2){const r=this.runes[e]+1,s=this.runes[e+1]-1;t+=Y.quoteIfHyphen(r),t+=tt.escapeRune(r),r!==s&&(t+="-",t+=Y.quoteIfHyphen(s),t+=tt.escapeRune(s))}}else for(let e=0;e<this.runes.length;e+=2){const r=this.runes[e],s=this.runes[e+1];t+=Y.quoteIfHyphen(r),t+=tt.escapeRune(r),r!==s&&(t+="-",t+=Y.quoteIfHyphen(s),t+=tt.escapeRune(s))}t+="]";break;default:t+=this.op;break}return t}maxCap(){let t=0;if(this.op===Y.Op.CAPTURE&&(t=this.cap),this.subs!==null)for(let e of this.subs){const r=e.maxCap();t<r&&(t=r)}return t}equals(t){if(!(t!==null&&t instanceof Y)||this.op!==t.op)return!1;switch(this.op){case Y.Op.END_TEXT:{if((this.flags&q.WAS_DOLLAR)!==(t.flags&q.WAS_DOLLAR))return!1;break}case Y.Op.LITERAL:case Y.Op.CHAR_CLASS:{if(this.runes===null&&t.runes===null)break;if(this.runes===null||t.runes===null||this.runes.length!==t.runes.length)return!1;for(let e=0;e<this.runes.length;e++)if(this.runes[e]!==t.runes[e])return!1;break}case Y.Op.ALTERNATE:case Y.Op.CONCAT:{if(this.subs.length!==t.subs.length)return!1;for(let e=0;e<this.subs.length;++e)if(!this.subs[e].equals(t.subs[e]))return!1;break}case Y.Op.STAR:case Y.Op.PLUS:case Y.Op.QUEST:{if((this.flags&q.NON_GREEDY)!==(t.flags&q.NON_GREEDY)||!this.subs[0].equals(t.subs[0]))return!1;break}case Y.Op.REPEAT:{if((this.flags&q.NON_GREEDY)!==(t.flags&q.NON_GREEDY)||this.min!==t.min||this.max!==t.max||!this.subs[0].equals(t.subs[0]))return!1;break}case Y.Op.CAPTURE:{if(this.cap!==t.cap||(this.name===null?t.name!==null:this.name!==t.name)||!this.subs[0].equals(t.subs[0]))return!1;break}}return!0}};_(Y,"Op",p2(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","LEFT_PAREN","VERTICAL_BAR"]));let k=Y;const ht=class ht{static isRuneOp(t){return ht.RUNE<=t&&t<=ht.RUNE_ANY_NOT_NL}static escapeRunes(t){let e='"';for(let r of t)e+=tt.escapeRune(r);return e+='"',e}constructor(t){this.op=t,this.out=0,this.arg=0,this.runes=null}matchRune(t){if(this.runes.length===1){const s=this.runes[0];return(this.arg&q.FOLD_CASE)!==0?X.equalsIgnoreCase(s,t):t===s}for(let s=0;s<this.runes.length&&s<=8;s+=2){if(t<this.runes[s])return!1;if(t<=this.runes[s+1])return!0}let e=0,r=this.runes.length/2|0;for(;e<r;){const s=e+((r-e)/2|0);if(this.runes[2*s]<=t){if(t<=this.runes[2*s+1])return!0;e=s+1}else r=s}return!1}toString(){switch(this.op){case ht.ALT:return`alt -> ${this.out}, ${this.arg}`;case ht.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case ht.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case ht.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case ht.MATCH:return"match";case ht.FAIL:return"fail";case ht.NOP:return`nop -> ${this.out}`;case ht.RUNE:return this.runes===null?"rune <null>":["rune ",ht.escapeRunes(this.runes),(this.arg&q.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case ht.RUNE1:return`rune1 ${ht.escapeRunes(this.runes)} -> ${this.out}`;case ht.RUNE_ANY:return`any -> ${this.out}`;case ht.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}};_(ht,"ALT",1),_(ht,"ALT_MATCH",2),_(ht,"CAPTURE",3),_(ht,"EMPTY_WIDTH",4),_(ht,"FAIL",5),_(ht,"MATCH",6),_(ht,"NOP",7),_(ht,"RUNE",8),_(ht,"RUNE1",9),_(ht,"RUNE_ANY",10),_(ht,"RUNE_ANY_NOT_NL",11);let et=ht;class r4{constructor(){this.inst=[],this.start=0,this.numCap=2}getInst(t){return this.inst[t]}numInst(){return this.inst.length}addInst(t){this.inst.push(new et(t))}skipNop(t){let e=this.inst[t];for(;e.op===et.NOP||e.op===et.CAPTURE;)e=this.inst[t],t=e.out;return e}prefix(){let t="",e=this.skipNop(this.start);if(!et.isRuneOp(e.op)||e.runes.length!==1)return[e.op===et.MATCH,t];for(;et.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&q.FOLD_CASE)===0;)t+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===et.MATCH,t]}startCond(){let t=0,e=this.start;t:for(;;){const r=this.inst[e];switch(r.op){case et.EMPTY_WIDTH:t|=r.arg;break;case et.FAIL:return-1;case et.CAPTURE:case et.NOP:break;default:break t}e=r.out}return t}next(t){const e=this.inst[t>>1];return(t&1)===0?e.out:e.arg}patch(t,e){for(;t!==0;){const r=this.inst[t>>1];(t&1)===0?(t=r.out,r.out=e):(t=r.arg,r.arg=e)}}append(t,e){if(t===0)return e;if(e===0)return t;let r=t;for(;;){const i=this.next(r);if(i===0)break;r=i}const s=this.inst[r>>1];return(r&1)===0?s.out=e:s.arg=e,t}toString(){let t="";for(let e=0;e<this.inst.length;e++){const r=t.length;t+=e,e===this.start&&(t+="*"),t+="        ".substring(t.length-r),t+=this.inst[e],t+=`
`}return t}}class vi{constructor(t=0,e=0,r=!1){this.i=t,this.out=e,this.nullable=r}}class ps{static ANY_RUNE_NOT_NL(){return[0,b.CODES.get(`
`)-1,b.CODES.get(`
`)+1,X.MAX_RUNE]}static ANY_RUNE(){return[0,X.MAX_RUNE]}static compileRegexp(t){const e=new ps,r=e.compile(t);return e.prog.patch(r.out,e.newInst(et.MATCH).i),e.prog.start=r.i,e.prog}constructor(){this.prog=new r4,this.newInst(et.FAIL)}newInst(t){return this.prog.addInst(t),new vi(this.prog.numInst()-1,0,!0)}nop(){const t=this.newInst(et.NOP);return t.out=t.i<<1,t}fail(){return new vi}cap(t){const e=this.newInst(et.CAPTURE);return e.out=e.i<<1,this.prog.getInst(e.i).arg=t,this.prog.numCap<t+1&&(this.prog.numCap=t+1),e}cat(t,e){return t.i===0||e.i===0?this.fail():(this.prog.patch(t.out,e.i),new vi(t.i,e.out,t.nullable&&e.nullable))}alt(t,e){if(t.i===0)return e;if(e.i===0)return t;const r=this.newInst(et.ALT),s=this.prog.getInst(r.i);return s.out=t.i,s.arg=e.i,r.out=this.prog.append(t.out,e.out),r.nullable=t.nullable||e.nullable,r}loop(t,e){const r=this.newInst(et.ALT),s=this.prog.getInst(r.i);return e?(s.arg=t.i,r.out=r.i<<1):(s.out=t.i,r.out=r.i<<1|1),this.prog.patch(t.out,r.i),r}quest(t,e){const r=this.newInst(et.ALT),s=this.prog.getInst(r.i);return e?(s.arg=t.i,r.out=r.i<<1):(s.out=t.i,r.out=r.i<<1|1),r.out=this.prog.append(r.out,t.out),r}star(t,e){return t.nullable?this.quest(this.plus(t,e),e):this.loop(t,e)}plus(t,e){return new vi(t.i,this.loop(t,e).out,t.nullable)}empty(t){const e=this.newInst(et.EMPTY_WIDTH);return this.prog.getInst(e.i).arg=t,e.out=e.i<<1,e}rune(t,e){const r=this.newInst(et.RUNE);r.nullable=!1;const s=this.prog.getInst(r.i);return s.runes=t,e&=q.FOLD_CASE,(t.length!==1||X.simpleFold(t[0])===t[0])&&(e&=-2),s.arg=e,r.out=r.i<<1,(e&q.FOLD_CASE)===0&&t.length===1||t.length===2&&t[0]===t[1]?s.op=et.RUNE1:t.length===2&&t[0]===0&&t[1]===X.MAX_RUNE?s.op=et.RUNE_ANY:t.length===4&&t[0]===0&&t[1]===b.CODES.get(`
`)-1&&t[2]===b.CODES.get(`
`)+1&&t[3]===X.MAX_RUNE&&(s.op=et.RUNE_ANY_NOT_NL),r}compile(t){switch(t.op){case k.Op.NO_MATCH:return this.fail();case k.Op.EMPTY_MATCH:return this.nop();case k.Op.LITERAL:if(t.runes.length===0)return this.nop();{let e=null;for(let r of t.runes){const s=this.rune([r],t.flags);e=e===null?s:this.cat(e,s)}return e}case k.Op.CHAR_CLASS:return this.rune(t.runes,t.flags);case k.Op.ANY_CHAR_NOT_NL:return this.rune(ps.ANY_RUNE_NOT_NL(),0);case k.Op.ANY_CHAR:return this.rune(ps.ANY_RUNE(),0);case k.Op.BEGIN_LINE:return this.empty(tt.EMPTY_BEGIN_LINE);case k.Op.END_LINE:return this.empty(tt.EMPTY_END_LINE);case k.Op.BEGIN_TEXT:return this.empty(tt.EMPTY_BEGIN_TEXT);case k.Op.END_TEXT:return this.empty(tt.EMPTY_END_TEXT);case k.Op.WORD_BOUNDARY:return this.empty(tt.EMPTY_WORD_BOUNDARY);case k.Op.NO_WORD_BOUNDARY:return this.empty(tt.EMPTY_NO_WORD_BOUNDARY);case k.Op.CAPTURE:{const e=this.cap(t.cap<<1),r=this.compile(t.subs[0]),s=this.cap(t.cap<<1|1);return this.cat(this.cat(e,r),s)}case k.Op.STAR:return this.star(this.compile(t.subs[0]),(t.flags&q.NON_GREEDY)!==0);case k.Op.PLUS:return this.plus(this.compile(t.subs[0]),(t.flags&q.NON_GREEDY)!==0);case k.Op.QUEST:return this.quest(this.compile(t.subs[0]),(t.flags&q.NON_GREEDY)!==0);case k.Op.CONCAT:{if(t.subs.length===0)return this.nop();{let e=null;for(let r of t.subs){const s=this.compile(r);e=e===null?s:this.cat(e,s)}return e}}case k.Op.ALTERNATE:{if(t.subs.length===0)return this.nop();{let e=null;for(let r of t.subs){const s=this.compile(r);e=e===null?s:this.alt(e,s)}return e}}default:throw new J7("regexp: unhandled case in compile")}}}class Ee{static simplify(t){if(t===null)return null;switch(t.op){case k.Op.CAPTURE:case k.Op.CONCAT:case k.Op.ALTERNATE:{let e=t;for(let r=0;r<t.subs.length;r++){const s=t.subs[r],i=Ee.simplify(s);e===t&&i!==s&&(e=k.fromRegexp(t),e.runes=null,e.subs=t.subs.slice(0,t.subs.length)),e!==t&&(e.subs[r]=i)}return e}case k.Op.STAR:case k.Op.PLUS:case k.Op.QUEST:{const e=Ee.simplify(t.subs[0]);return Ee.simplify1(t.op,t.flags,e,t)}case k.Op.REPEAT:{if(t.min===0&&t.max===0)return new k(k.Op.EMPTY_MATCH);const e=Ee.simplify(t.subs[0]);if(t.max===-1){if(t.min===0)return Ee.simplify1(k.Op.STAR,t.flags,e,null);if(t.min===1)return Ee.simplify1(k.Op.PLUS,t.flags,e,null);const s=new k(k.Op.CONCAT),i=[];for(let o=0;o<t.min-1;o++)i.push(e);return i.push(Ee.simplify1(k.Op.PLUS,t.flags,e,null)),s.subs=i.slice(0),s}if(t.min===1&&t.max===1)return e;let r=null;if(t.min>0){r=[];for(let s=0;s<t.min;s++)r.push(e)}if(t.max>t.min){let s=Ee.simplify1(k.Op.QUEST,t.flags,e,null);for(let i=t.min+1;i<t.max;i++){const o=new k(k.Op.CONCAT);o.subs=[e,s],s=Ee.simplify1(k.Op.QUEST,t.flags,o,null)}if(r===null)return s;r.push(s)}if(r!==null){const s=new k(k.Op.CONCAT);return s.subs=r.slice(0),s}return new k(k.Op.NO_MATCH)}}return t}static simplify1(t,e,r,s){return r.op===k.Op.EMPTY_MATCH||t===r.op&&(e&q.NON_GREEDY)===(r.flags&q.NON_GREEDY)?r:(s!==null&&s.op===t&&(s.flags&q.NON_GREEDY)===(e&q.NON_GREEDY)&&r===s.subs[0]||(s=new k(t),s.flags=e,s.subs=[r]),s)}}class ut{constructor(t,e){this.sign=t,this.cls=e}}const zc=[48,57],Wc=[9,10,12,13,32,32],Kc=[48,57,65,90,95,95,97,122],Yc=new Map([["\\d",new ut(1,zc)],["\\D",new ut(-1,zc)],["\\s",new ut(1,Wc)],["\\S",new ut(-1,Wc)],["\\w",new ut(1,Kc)],["\\W",new ut(-1,Kc)]]),Qc=[48,57,65,90,97,122],Xc=[65,90,97,122],Jc=[0,127],Zc=[9,9,32,32],tl=[0,31,127,127],el=[48,57],nl=[33,126],rl=[97,122],sl=[32,126],il=[33,47,58,64,91,96,123,126],ol=[9,13,32,32],al=[65,90],ul=[48,57,65,90,95,95,97,122],cl=[48,57,65,70,97,102],ll=new Map([["[:alnum:]",new ut(1,Qc)],["[:^alnum:]",new ut(-1,Qc)],["[:alpha:]",new ut(1,Xc)],["[:^alpha:]",new ut(-1,Xc)],["[:ascii:]",new ut(1,Jc)],["[:^ascii:]",new ut(-1,Jc)],["[:blank:]",new ut(1,Zc)],["[:^blank:]",new ut(-1,Zc)],["[:cntrl:]",new ut(1,tl)],["[:^cntrl:]",new ut(-1,tl)],["[:digit:]",new ut(1,el)],["[:^digit:]",new ut(-1,el)],["[:graph:]",new ut(1,nl)],["[:^graph:]",new ut(-1,nl)],["[:lower:]",new ut(1,rl)],["[:^lower:]",new ut(-1,rl)],["[:print:]",new ut(1,sl)],["[:^print:]",new ut(-1,sl)],["[:punct:]",new ut(1,il)],["[:^punct:]",new ut(-1,il)],["[:space:]",new ut(1,ol)],["[:^space:]",new ut(-1,ol)],["[:upper:]",new ut(1,al)],["[:^upper:]",new ut(-1,al)],["[:word:]",new ut(1,ul)],["[:^word:]",new ut(-1,ul)],["[:xdigit:]",new ut(1,cl)],["[:^xdigit:]",new ut(-1,cl)]]);class Gt{static charClassToString(t,e){let r="[";for(let s=0;s<e;s+=2){s>0&&(r+=" ");const i=t[s],o=t[s+1];i===o?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${o.toString(16)}`}return r+="]",r}static cmp(t,e,r,s){const i=t[e]-r;return i!==0?i:s-t[e+1]}static qsortIntPair(t,e,r){const s=((e+r)/2|0)&-2,i=t[s],o=t[s+1];let u=e,c=r;for(;u<=c;){for(;u<r&&Gt.cmp(t,u,i,o)<0;)u+=2;for(;c>e&&Gt.cmp(t,c,i,o)>0;)c-=2;if(u<=c){if(u!==c){let h=t[u];t[u]=t[c],t[c]=h,h=t[u+1],t[u+1]=t[c+1],t[c+1]=h}u+=2,c-=2}}e<c&&Gt.qsortIntPair(t,e,c),u<r&&Gt.qsortIntPair(t,u,r)}constructor(t=tt.emptyInts()){this.r=t,this.len=t.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;Gt.qsortIntPair(this.r,0,this.len-2);let t=2;for(let e=2;e<this.len;e+=2){const r=this.r[e],s=this.r[e+1];if(r<=this.r[t-1]+1){s>this.r[t-1]&&(this.r[t-1]=s);continue}this.r[t]=r,this.r[t+1]=s,t+=2}return this.len=t,this}appendLiteral(t,e){return(e&q.FOLD_CASE)!==0?this.appendFoldedRange(t,t):this.appendRange(t,t)}appendRange(t,e){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){const s=this.r[this.len-r],i=this.r[this.len-r+1];if(t<=i+1&&s<=e+1)return t<s&&(this.r[this.len-r]=t),e>i&&(this.r[this.len-r+1]=e),this}}return this.r[this.len++]=t,this.r[this.len++]=e,this}appendFoldedRange(t,e){if(t<=X.MIN_FOLD&&e>=X.MAX_FOLD)return this.appendRange(t,e);if(e<X.MIN_FOLD||t>X.MAX_FOLD)return this.appendRange(t,e);t<X.MIN_FOLD&&(this.appendRange(t,X.MIN_FOLD-1),t=X.MIN_FOLD),e>X.MAX_FOLD&&(this.appendRange(X.MAX_FOLD+1,e),e=X.MAX_FOLD);for(let r=t;r<=e;r++){this.appendRange(r,r);for(let s=X.simpleFold(r);s!==r;s=X.simpleFold(s))this.appendRange(s,s)}return this}appendClass(t){for(let e=0;e<t.length;e+=2)this.appendRange(t[e],t[e+1]);return this}appendFoldedClass(t){for(let e=0;e<t.length;e+=2)this.appendFoldedRange(t[e],t[e+1]);return this}appendNegatedClass(t){let e=0;for(let r=0;r<t.length;r+=2){const s=t[r],i=t[r+1];e<=s-1&&this.appendRange(e,s-1),e=i+1}return e<=X.MAX_RUNE&&this.appendRange(e,X.MAX_RUNE),this}appendTable(t){for(let e of t){const r=e[0],s=e[1],i=e[2];if(i===1){this.appendRange(r,s);continue}for(let o=r;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(t){let e=0;for(let r of t){const s=r[0],i=r[1],o=r[2];if(o===1){e<=s-1&&this.appendRange(e,s-1),e=i+1;continue}for(let u=s;u<=i;u+=o)e<=u-1&&this.appendRange(e,u-1),e=u+1}return e<=X.MAX_RUNE&&this.appendRange(e,X.MAX_RUNE),this}appendTableWithSign(t,e){return e<0?this.appendNegatedTable(t):this.appendTable(t)}negateClass(){let t=0,e=0;for(let r=0;r<this.len;r+=2){const s=this.r[r],i=this.r[r+1];t<=s-1&&(this.r[e]=t,this.r[e+1]=s-1,e+=2),t=i+1}return this.len=e,t<=X.MAX_RUNE&&(this.r[this.len++]=t,this.r[this.len++]=X.MAX_RUNE),this}appendClassWithSign(t,e){return e<0?this.appendNegatedClass(t):this.appendClass(t)}appendGroup(t,e){let r=t.cls;return e&&(r=new Gt().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,t.sign)}toString(){return Gt.charClassToString(this.r,this.len)}}class gs{static of(t,e){return new gs(t,e)}constructor(t,e){this.first=t,this.second=e}}class s4{constructor(t){this.str=t,this.position=0}pos(){return this.position}rewindTo(t){this.position=t}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(t){this.position+=t}skipString(t){this.position+=t.length}pop(){const t=this.str.codePointAt(this.position);return this.position+=tt.charCount(t),t}lookingAt(t){return this.rest().startsWith(t)}rest(){return this.str.substring(this.position)}from(t){return this.str.substring(t,this.position)}toString(){return this.rest()}}const j=class j{static ANY_TABLE(){return[[0,X.MAX_RUNE,1]]}static unicodeTable(t){return t==="Any"?gs.of(j.ANY_TABLE(),j.ANY_TABLE()):jt.CATEGORIES.has(t)?gs.of(jt.CATEGORIES.get(t),jt.FOLD_CATEGORIES.get(t)):jt.SCRIPTS.has(t)?gs.of(jt.SCRIPTS.get(t),jt.FOLD_SCRIPT.get(t)):null}static minFoldRune(t){if(t<X.MIN_FOLD||t>X.MAX_FOLD)return t;let e=t;const r=t;for(t=X.simpleFold(t);t!==r;t=X.simpleFold(t))e>t&&(e=t);return e}static leadingRegexp(t){if(t.op===k.Op.EMPTY_MATCH)return null;if(t.op===k.Op.CONCAT&&t.subs.length>0){const e=t.subs[0];return e.op===k.Op.EMPTY_MATCH?null:e}return t}static literalRegexp(t,e){const r=new k(k.Op.LITERAL);return r.flags=e,r.runes=tt.stringToRunes(t),r}static parse(t,e){return new j(t,e).parseInternal()}static parseRepeat(t){const e=t.pos();if(!t.more()||!t.lookingAt("{"))return-1;t.skip(1);const r=j.parseInt(t);if(r===-1||!t.more())return-1;let s;if(!t.lookingAt(","))s=r;else{if(t.skip(1),!t.more())return-1;if(t.lookingAt("}"))s=-1;else if((s=j.parseInt(t))===-1)return-1}if(!t.more()||!t.lookingAt("}"))return-1;if(t.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new Rt(j.ERR_INVALID_REPEAT_SIZE,t.from(e));return r<<16|s&X.MAX_BMP}static isValidCaptureName(t){if(t.length===0)return!1;for(let e=0;e<t.length;e++){const r=t.codePointAt(e);if(r!==b.CODES.get("_")&&!tt.isalnum(r))return!1}return!0}static parseInt(t){const e=t.pos();for(;t.more()&&t.peek()>=b.CODES.get("0")&&t.peek()<=b.CODES.get("9");)t.skip(1);const r=t.from(e);return r.length===0||r.length>1&&r.codePointAt(0)===b.CODES.get("0")?-1:r.length>8?-2:parseFloat(r,10)}static isCharClass(t){return t.op===k.Op.LITERAL&&t.runes.length===1||t.op===k.Op.CHAR_CLASS||t.op===k.Op.ANY_CHAR_NOT_NL||t.op===k.Op.ANY_CHAR}static matchRune(t,e){switch(t.op){case k.Op.LITERAL:return t.runes.length===1&&t.runes[0]===e;case k.Op.CHAR_CLASS:for(let r=0;r<t.runes.length;r+=2)if(t.runes[r]<=e&&e<=t.runes[r+1])return!0;return!1;case k.Op.ANY_CHAR_NOT_NL:return e!==b.CODES.get(`
`);case k.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(t,e){switch(t.op){case k.Op.ANY_CHAR:break;case k.Op.ANY_CHAR_NOT_NL:j.matchRune(e,b.CODES.get(`
`))&&(t.op=k.Op.ANY_CHAR);break;case k.Op.CHAR_CLASS:e.op===k.Op.LITERAL?t.runes=new Gt(t.runes).appendLiteral(e.runes[0],e.flags).toArray():t.runes=new Gt(t.runes).appendClass(e.runes).toArray();break;case k.Op.LITERAL:if(e.runes[0]===t.runes[0]&&e.flags===t.flags)break;t.op=k.Op.CHAR_CLASS,t.runes=new Gt().appendLiteral(t.runes[0],t.flags).appendLiteral(e.runes[0],e.flags).toArray();break}}static parseEscape(t){const e=t.pos();if(t.skip(1),!t.more())throw new Rt(j.ERR_TRAILING_BACKSLASH);let r=t.pop();t:switch(r){case b.CODES.get("1"):case b.CODES.get("2"):case b.CODES.get("3"):case b.CODES.get("4"):case b.CODES.get("5"):case b.CODES.get("6"):case b.CODES.get("7"):if(!t.more()||t.peek()<b.CODES.get("0")||t.peek()>b.CODES.get("7"))break;case b.CODES.get("0"):{let s=r-b.CODES.get("0");for(let i=1;i<3&&!(!t.more()||t.peek()<b.CODES.get("0")||t.peek()>b.CODES.get("7"));i++)s=s*8+t.peek()-b.CODES.get("0"),t.skip(1);return s}case b.CODES.get("x"):{if(!t.more())break;if(r=t.pop(),r===b.CODES.get("{")){let o=0,u=0;for(;;){if(!t.more())break t;if(r=t.pop(),r===b.CODES.get("}"))break;const c=tt.unhex(r);if(c<0||(u=u*16+c,u>X.MAX_RUNE))break t;o++}if(o===0)break t;return u}const s=tt.unhex(r);if(!t.more())break;r=t.pop();const i=tt.unhex(r);if(s<0||i<0)break;return s*16+i}case b.CODES.get("a"):return b.CODES.get("\x07");case b.CODES.get("f"):return b.CODES.get("\f");case b.CODES.get("n"):return b.CODES.get(`
`);case b.CODES.get("r"):return b.CODES.get("\r");case b.CODES.get("t"):return b.CODES.get("	");case b.CODES.get("v"):return b.CODES.get("\v");default:if(!tt.isalnum(r))return r;break}throw new Rt(j.ERR_INVALID_ESCAPE,t.from(e))}static parseClassChar(t,e){if(!t.more())throw new Rt(j.ERR_MISSING_BRACKET,t.from(e));return t.lookingAt("\\")?j.parseEscape(t):t.pop()}static concatRunes(t,e){return[...t,...e]}constructor(t,e=0){this.wholeRegexp=t,this.flags=e,this.numCap=0,this.namedGroups={},this.stack=[],this.free=null}newRegexp(t){let e=this.free;return e!==null&&e.subs!==null&&e.subs.length>0?(this.free=e.subs[0],e.reinit(),e.op=t):e=new k(t),e}reuse(t){t.subs!==null&&t.subs.length>0&&(t.subs[0]=this.free),this.free=t}pop(){return this.stack.pop()}popToPseudo(){const t=this.stack.length;let e=t;for(;e>0&&!k.isPseudoOp(this.stack[e-1].op);)e--;const r=this.stack.slice(e,t);return this.stack=this.stack.slice(0,e),r}push(t){if(t.op===k.Op.CHAR_CLASS&&t.runes.length===2&&t.runes[0]===t.runes[1]){if(this.maybeConcat(t.runes[0],this.flags&-2))return null;t.op=k.Op.LITERAL,t.runes=[t.runes[0]],t.flags=this.flags&-2}else if(t.op===k.Op.CHAR_CLASS&&t.runes.length===4&&t.runes[0]===t.runes[1]&&t.runes[2]===t.runes[3]&&X.simpleFold(t.runes[0])===t.runes[2]&&X.simpleFold(t.runes[2])===t.runes[0]||t.op===k.Op.CHAR_CLASS&&t.runes.length===2&&t.runes[0]+1===t.runes[1]&&X.simpleFold(t.runes[0])===t.runes[1]&&X.simpleFold(t.runes[1])===t.runes[0]){if(this.maybeConcat(t.runes[0],this.flags|q.FOLD_CASE))return null;t.op=k.Op.LITERAL,t.runes=[t.runes[0]],t.flags=this.flags|q.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(t),t}maybeConcat(t,e){const r=this.stack.length;if(r<2)return!1;const s=this.stack[r-1],i=this.stack[r-2];return s.op!==k.Op.LITERAL||i.op!==k.Op.LITERAL||(s.flags&q.FOLD_CASE)!==(i.flags&q.FOLD_CASE)?!1:(i.runes=j.concatRunes(i.runes,s.runes),t>=0?(s.runes=[t],s.flags=e,!0):(this.pop(),this.reuse(s),!1))}newLiteral(t,e){const r=this.newRegexp(k.Op.LITERAL);return r.flags=e,(e&q.FOLD_CASE)!==0&&(t=j.minFoldRune(t)),r.runes=[t],r}literal(t){this.push(this.newLiteral(t,this.flags))}op(t){const e=this.newRegexp(t);return e.flags=this.flags,this.push(e)}repeat(t,e,r,s,i,o){let u=this.flags;if((u&q.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),u^=q.NON_GREEDY),o!==-1))throw new Rt(j.ERR_INVALID_REPEAT_OP,i.from(o));const c=this.stack.length;if(c===0)throw new Rt(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.stack[c-1];if(k.isPseudoOp(h.op))throw new Rt(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const p=this.newRegexp(t);p.min=e,p.max=r,p.flags=u,p.subs=[h],this.stack[c-1]=p}concat(){this.maybeConcat(-1,0);const t=this.popToPseudo();return t.length===0?this.push(this.newRegexp(k.Op.EMPTY_MATCH)):this.push(this.collapse(t,k.Op.CONCAT))}alternate(){const t=this.popToPseudo();return t.length>0&&this.cleanAlt(t[t.length-1]),t.length===0?this.push(this.newRegexp(k.Op.NO_MATCH)):this.push(this.collapse(t,k.Op.ALTERNATE))}cleanAlt(t){t.op===k.Op.CHAR_CLASS&&(t.runes=new Gt(t.runes).cleanClass().toArray(),t.runes.length===2&&t.runes[0]===0&&t.runes[1]===X.MAX_RUNE?(t.runes=null,t.op=k.Op.ANY_CHAR):t.runes.length===4&&t.runes[0]===0&&t.runes[1]===b.CODES.get(`
`)-1&&t.runes[2]===b.CODES.get(`
`)+1&&t.runes[3]===X.MAX_RUNE&&(t.runes=null,t.op=k.Op.ANY_CHAR_NOT_NL))}collapse(t,e){if(t.length===1)return t[0];let r=0;for(let u of t)r+=u.op===e?u.subs.length:1;let s=new Array(r).fill(null),i=0;for(let u of t)u.op===e?(s.splice(i,u.subs.length,...u.subs),i+=u.subs.length,this.reuse(u)):s[i++]=u;let o=this.newRegexp(e);if(o.subs=s,e===k.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const u=o;o=o.subs[0],this.reuse(u)}return o}factor(t){if(t.length<2)return t;let e=0,r=t.length,s=0,i=null,o=0,u=0,c=0;for(let p=0;p<=r;p++){let g=null,T=0,S=0;if(p<r){let N=t[e+p];if(N.op===k.Op.CONCAT&&N.subs.length>0&&(N=N.subs[0]),N.op===k.Op.LITERAL&&(g=N.runes,T=N.runes.length,S=N.flags&q.FOLD_CASE),S===u){let L=0;for(;L<o&&L<T&&i[L]===g[L];)L++;if(L>0){o=L;continue}}}if(p!==c)if(p===c+1)t[s++]=t[e+c];else{const N=this.newRegexp(k.Op.LITERAL);N.flags=u,N.runes=i.slice(0,o);for(let W=c;W<p;W++)t[e+W]=this.removeLeadingString(t[e+W],o);const L=this.collapse(t.slice(e+c,e+p),k.Op.ALTERNATE),U=this.newRegexp(k.Op.CONCAT);U.subs=[N,L],t[s++]=U}c=p,i=g,o=T,u=S}r=s,e=0,c=0,s=0;let h=null;for(let p=0;p<=r;p++){let g=null;if(!(p<r&&(g=j.leadingRegexp(t[e+p]),h!==null&&h.equals(g)&&(j.isCharClass(h)||h.op===k.Op.REPEAT&&h.min===h.max&&j.isCharClass(h.subs[0]))))){if(p!==c)if(p===c+1)t[s++]=t[e+c];else{const T=h;for(let L=c;L<p;L++){const U=L!==c;t[e+L]=this.removeLeadingRegexp(t[e+L],U)}const S=this.collapse(t.slice(e+c,e+p),k.Op.ALTERNATE),N=this.newRegexp(k.Op.CONCAT);N.subs=[T,S],t[s++]=N}c=p,h=g}}r=s,e=0,c=0,s=0;for(let p=0;p<=r;p++)if(!(p<r&&j.isCharClass(t[e+p]))){if(p!==c)if(p===c+1)t[s++]=t[e+c];else{let g=c;for(let S=c+1;S<p;S++){const N=t[e+g],L=t[e+S];(N.op<L.op||N.op===L.op&&(N.runes!==null?N.runes.length:0)<(L.runes!==null?L.runes.length:0))&&(g=S)}const T=t[e+c];t[e+c]=t[e+g],t[e+g]=T;for(let S=c+1;S<p;S++)j.mergeCharClass(t[e+c],t[e+S]),this.reuse(t[e+S]);this.cleanAlt(t[e+c]),t[s++]=t[e+c]}p<r&&(t[s++]=t[e+p]),c=p+1}r=s,e=0,c=0,s=0;for(let p=0;p<r;++p)p+1<r&&t[e+p].op===k.Op.EMPTY_MATCH&&t[e+p+1].op===k.Op.EMPTY_MATCH||(t[s++]=t[e+p]);return r=s,e=0,t.slice(e,r)}removeLeadingString(t,e){if(t.op===k.Op.CONCAT&&t.subs.length>0){const r=this.removeLeadingString(t.subs[0],e);if(t.subs[0]=r,r.op===k.Op.EMPTY_MATCH)switch(this.reuse(r),t.subs.length){case 0:case 1:t.op=k.Op.EMPTY_MATCH,t.subs=null;break;case 2:{const s=t;t=t.subs[1],this.reuse(s);break}default:t.subs=t.subs.slice(1,t.subs.length);break}return t}return t.op===k.Op.LITERAL&&(t.runes=t.runes.slice(e,t.runes.length),t.runes.length===0&&(t.op=k.Op.EMPTY_MATCH)),t}removeLeadingRegexp(t,e){if(t.op===k.Op.CONCAT&&t.subs.length>0){switch(e&&this.reuse(t.subs[0]),t.subs=t.subs.slice(1,t.subs.length),t.subs.length){case 0:{t.op=k.Op.EMPTY_MATCH,t.subs=k.emptySubs();break}case 1:{const r=t;t=t.subs[0],this.reuse(r);break}}return t}return e&&this.reuse(t),this.newRegexp(k.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&q.LITERAL)!==0)return j.literalRegexp(this.wholeRegexp,this.flags);let t=-1,e=-1,r=-1;const s=new s4(this.wholeRegexp);for(;s.more();){let o=-1;t:switch(s.peek()){case b.CODES.get("("):if((this.flags&q.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(k.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case b.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case b.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case b.CODES.get("^"):(this.flags&q.ONE_LINE)!==0?this.op(k.Op.BEGIN_TEXT):this.op(k.Op.BEGIN_LINE),s.skip(1);break;case b.CODES.get("$"):(this.flags&q.ONE_LINE)!==0?this.op(k.Op.END_TEXT).flags|=q.WAS_DOLLAR:this.op(k.Op.END_LINE),s.skip(1);break;case b.CODES.get("."):(this.flags&q.DOT_NL)!==0?this.op(k.Op.ANY_CHAR):this.op(k.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case b.CODES.get("["):this.parseClass(s);break;case b.CODES.get("*"):case b.CODES.get("+"):case b.CODES.get("?"):{o=s.pos();let u=null;switch(s.pop()){case b.CODES.get("*"):u=k.Op.STAR;break;case b.CODES.get("+"):u=k.Op.PLUS;break;case b.CODES.get("?"):u=k.Op.QUEST;break}this.repeat(u,e,r,o,s,t);break}case b.CODES.get("{"):{o=s.pos();const u=j.parseRepeat(s);if(u<0){s.rewindTo(o),this.literal(s.pop());break}e=u>>16,r=(u&X.MAX_BMP)<<16>>16,this.repeat(k.Op.REPEAT,e,r,o,s,t);break}case b.CODES.get("\\"):{const u=s.pos();if(s.skip(1),(this.flags&q.PERL_X)!==0&&s.more())switch(s.pop()){case b.CODES.get("A"):this.op(k.Op.BEGIN_TEXT);break t;case b.CODES.get("b"):this.op(k.Op.WORD_BOUNDARY);break t;case b.CODES.get("B"):this.op(k.Op.NO_WORD_BOUNDARY);break t;case b.CODES.get("C"):throw new Rt(j.ERR_INVALID_ESCAPE,"\\C");case b.CODES.get("Q"):{let g=s.rest();const T=g.indexOf("\\E");T>=0&&(g=g.substring(0,T)),s.skipString(g),s.skipString("\\E");let S=0;for(;S<g.length;){const N=g.codePointAt(S);this.literal(N),S+=tt.charCount(N)}break t}case b.CODES.get("z"):this.op(k.Op.END_TEXT);break t;default:s.rewindTo(u);break}const c=this.newRegexp(k.Op.CHAR_CLASS);if(c.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const p=new Gt;if(this.parseUnicodeClass(s,p)){c.runes=p.toArray(),this.push(c);break t}}const h=new Gt;if(this.parsePerlClassEscape(s,h)){c.runes=h.toArray(),this.push(c);break t}s.rewindTo(u),this.reuse(c),this.literal(j.parseEscape(s));break}default:this.literal(s.pop());break}t=o}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new Rt(j.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(t){const e=t.pos(),r=t.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){const u=r.charAt(2)==="P"?4:3,c=r.indexOf(">");if(c<0)throw new Rt(j.ERR_INVALID_NAMED_CAPTURE,r);const h=r.substring(u,c);if(t.skipString(h),t.skip(u+1),!j.isValidCaptureName(h))throw new Rt(j.ERR_INVALID_NAMED_CAPTURE,r.substring(0,c+1));const p=this.op(k.Op.LEFT_PAREN);if(p.cap=++this.numCap,this.namedGroups[h])throw new Rt(j.ERR_DUPLICATE_NAMED_CAPTURE,h);this.namedGroups[h]=this.numCap,p.name=h;return}t.skip(2);let s=this.flags,i=1,o=!1;t:for(;t.more();){const u=t.pop();switch(u){case b.CODES.get("i"):s|=q.FOLD_CASE,o=!0;break;case b.CODES.get("m"):s&=-17,o=!0;break;case b.CODES.get("s"):s|=q.DOT_NL,o=!0;break;case b.CODES.get("U"):s|=q.NON_GREEDY,o=!0;break;case b.CODES.get("-"):if(i<0)break t;i=-1,s=~s,o=!1;break;case b.CODES.get(":"):case b.CODES.get(")"):if(i<0){if(!o)break t;s=~s}u===b.CODES.get(":")&&this.op(k.Op.LEFT_PAREN),this.flags=s;return;default:break t}}throw new Rt(j.ERR_INVALID_PERL_OP,t.from(e))}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(k.Op.VERTICAL_BAR)}swapVerticalBar(){const t=this.stack.length;if(t>=3&&this.stack[t-2].op===k.Op.VERTICAL_BAR&&j.isCharClass(this.stack[t-1])&&j.isCharClass(this.stack[t-3])){let e=this.stack[t-1],r=this.stack[t-3];if(e.op>r.op){const s=r;r=e,e=s,this.stack[t-3]=r}return j.mergeCharClass(r,e),this.reuse(e),this.pop(),!0}if(t>=2){const e=this.stack[t-1],r=this.stack[t-2];if(r.op===k.Op.VERTICAL_BAR)return t>=3&&this.cleanAlt(this.stack[t-3]),this.stack[t-2]=e,this.stack[t-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new Rt(j.ERR_INTERNAL_ERROR,"stack underflow");const e=this.pop(),r=this.pop();if(r.op!==k.Op.LEFT_PAREN)throw new Rt(j.ERR_MISSING_PAREN,this.wholeRegexp);this.flags=r.flags,r.cap===0?this.push(e):(r.op=k.Op.CAPTURE,r.subs=[e],this.push(r))}parsePerlClassEscape(t,e){const r=t.pos();if((this.flags&q.PERL_X)===0||!t.more()||t.pop()!==b.CODES.get("\\")||!t.more())return!1;t.pop();const s=t.from(r),i=Yc.has(s)?Yc.get(s):null;return i===null?!1:(e.appendGroup(i,(this.flags&q.FOLD_CASE)!==0),!0)}parseNamedClass(t,e){const r=t.rest(),s=r.indexOf(":]");if(s<0)return!1;const i=r.substring(0,s+2);t.skipString(i);const o=ll.has(i)?ll.get(i):null;if(o===null)throw new Rt(j.ERR_INVALID_CHAR_RANGE,i);return e.appendGroup(o,(this.flags&q.FOLD_CASE)!==0),!0}parseUnicodeClass(t,e){const r=t.pos();if((this.flags&q.UNICODE_GROUPS)===0||!t.lookingAt("\\p")&&!t.lookingAt("\\P"))return!1;t.skip(1);let s=1,i=t.pop();if(i===b.CODES.get("P")&&(s=-1),!t.more())throw t.rewindTo(r),new Rt(j.ERR_INVALID_CHAR_RANGE,t.rest());i=t.pop();let o;if(i!==b.CODES.get("{"))o=tt.runeToString(i);else{const p=t.rest(),g=p.indexOf("}");if(g<0)throw t.rewindTo(r),new Rt(j.ERR_INVALID_CHAR_RANGE,t.rest());o=p.substring(0,g),t.skipString(o),t.skip(1)}o.length!==0&&o.codePointAt(0)===b.CODES.get("^")&&(s=0-s,o=o.substring(1));const u=j.unicodeTable(o);if(u===null)throw new Rt(j.ERR_INVALID_CHAR_RANGE,t.from(r));const c=u.first,h=u.second;if((this.flags&q.FOLD_CASE)===0||h===null)e.appendTableWithSign(c,s);else{const p=new Gt().appendTable(c).appendTable(h).cleanClass().toArray();e.appendClassWithSign(p,s)}return!0}parseClass(t){const e=t.pos();t.skip(1);const r=this.newRegexp(k.Op.CHAR_CLASS);r.flags=this.flags;const s=new Gt;let i=1;t.more()&&t.lookingAt("^")&&(i=-1,t.skip(1),(this.flags&q.CLASS_NL)===0&&s.appendRange(b.CODES.get(`
`),b.CODES.get(`
`)));let o=!0;for(;!t.more()||t.peek()!==b.CODES.get("]")||o;){if(t.more()&&t.lookingAt("-")&&(this.flags&q.PERL_X)===0&&!o){const p=t.rest();if(p==="-"||!p.startsWith("-]"))throw t.rewindTo(e),new Rt(j.ERR_INVALID_CHAR_RANGE,t.rest())}o=!1;const u=t.pos();if(t.lookingAt("[:")){if(this.parseNamedClass(t,s))continue;t.rewindTo(u)}if(this.parseUnicodeClass(t,s)||this.parsePerlClassEscape(t,s))continue;t.rewindTo(u);const c=j.parseClassChar(t,e);let h=c;if(t.more()&&t.lookingAt("-")){if(t.skip(1),t.more()&&t.lookingAt("]"))t.skip(-1);else if(h=j.parseClassChar(t,e),h<c)throw new Rt(j.ERR_INVALID_CHAR_RANGE,t.from(u))}(this.flags&q.FOLD_CASE)===0?s.appendRange(c,h):s.appendFoldedRange(c,h)}t.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}};_(j,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),_(j,"ERR_INVALID_CHAR_RANGE","invalid character class range"),_(j,"ERR_INVALID_ESCAPE","invalid escape sequence"),_(j,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),_(j,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),_(j,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),_(j,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),_(j,"ERR_MISSING_BRACKET","missing closing ]"),_(j,"ERR_MISSING_PAREN","missing closing )"),_(j,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),_(j,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),_(j,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name");let Ua=j;class i4{constructor(){this.inst=null,this.cap=[]}}class hl{constructor(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}contains(t){const e=this.sparse[t];return e<this.size&&this.densePcs[e]===t}isEmpty(){return this.size===0}add(t){const e=this.size++;return this.sparse[t]=e,this.denseThreads[e]=null,this.densePcs[e]=t,e}clear(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}toString(){let t="{";for(let e=0;e<this.size;e++)e!==0&&(t+=", "),t+=this.densePcs[e];return t+="}",t}}class Ir{static fromRE2(t){const e=new Ir;return e.prog=t.prog,e.re2=t,e.q0=new hl(e.prog.numInst()),e.q1=new hl(e.prog.numInst()),e.pool=[],e.poolSize=0,e.matched=!1,e.matchcap=Array(e.prog.numCap<2?2:e.prog.numCap).fill(0),e.ncap=0,e}static fromMachine(t){const e=new Ir;return e.re2=t.re2,e.prog=t.prog,e.q0=t.q0,e.q1=t.q1,e.pool=t.pool,e.poolSize=t.poolSize,e.matched=t.matched,e.matchcap=t.matchcap,e.ncap=t.ncap,e}init(t){this.ncap=t,t>this.matchcap.length?this.initNewCap(t):this.resetCap(t)}resetCap(t){for(let e=0;e<this.poolSize;e++){const r=this.pool[e];r.cap=Array(t).fill(0)}}initNewCap(t){for(let e=0;e<this.poolSize;e++){const r=this.pool[e];r.cap=Array(t).fill(0)}this.matchcap=Array(t).fill(0)}submatches(){return this.ncap===0?tt.emptyInts():this.matchcap.slice(0,this.ncap)}alloc(t){let e;return this.poolSize>0?(this.poolSize--,e=this.pool[this.poolSize]):e=new i4,e.inst=t,e}freeQueue(t,e=0){const r=t.size-e,s=this.poolSize+r;this.pool.length<s&&(this.pool=this.pool.slice(0,Math.max(this.pool.length*2,s)));for(let i=e;i<t.size;i++){const o=t.denseThreads[i];o!==null&&(this.pool[this.poolSize]=o,this.poolSize++)}t.clear()}freeThread(t){this.pool.length<=this.poolSize&&(this.pool=this.pool.slice(0,this.pool.length*2)),this.pool[this.poolSize]=t,this.poolSize++}match(t,e,r){const s=this.re2.cond;if(s===tt.EMPTY_ALL||(r===q.ANCHOR_START||r===q.ANCHOR_BOTH)&&e!==0)return!1;this.matched=!1,this.matchcap=Array(this.prog.numCap).fill(-1);let i=this.q0,o=this.q1,u=t.step(e),c=u>>3,h=u&7,p=-1,g=0;u!==gn.EOF()&&(u=t.step(e+h),p=u>>3,g=u&7);let T;for(e===0?T=tt.emptyOpContext(-1,c):T=t.context(e);;){if(i.isEmpty()){if((s&tt.EMPTY_BEGIN_TEXT)!==0&&e!==0||this.matched)break;if(this.re2.prefix.length!==0&&p!==this.re2.prefixRune&&t.canCheckPrefix()){const L=t.index(this.re2,e);if(L<0)break;e+=L,u=t.step(e),c=u>>3,h=u&7,u=t.step(e+h),p=u>>3,g=u&7}}!this.matched&&(e===0||r===q.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=e),this.add(i,this.prog.start,e,this.matchcap,T,null));const S=e+h;if(T=t.context(S),this.step(i,o,e,S,c,T,r,e===t.endPos()),h===0||this.ncap===0&&this.matched)break;e+=h,c=p,h=g,c!==-1&&(u=t.step(e+h),p=u>>3,g=u&7);const N=i;i=o,o=N}return this.freeQueue(o),this.matched}step(t,e,r,s,i,o,u,c){const h=this.re2.longest;for(let p=0;p<t.size;p++){let g=t.denseThreads[p];if(g===null)continue;if(h&&this.matched&&this.ncap>0&&this.matchcap[0]<g.cap[0]){this.freeThread(g);continue}const T=g.inst;let S=!1;switch(T.op){case et.MATCH:if(u===q.ANCHOR_BOTH&&!c)break;this.ncap>0&&(!h||!this.matched||this.matchcap[1]<r)&&(g.cap[1]=r,this.matchcap=g.cap.slice(0,this.ncap)),h||this.freeQueue(t,p+1),this.matched=!0;break;case et.RUNE:S=T.matchRune(i);break;case et.RUNE1:S=i===T.runes[0];break;case et.RUNE_ANY:S=!0;break;case et.RUNE_ANY_NOT_NL:S=i!==b.CODES.get(`
`);break;default:throw new Error("bad inst")}S&&(g=this.add(e,T.out,s,g.cap,o,g)),g!==null&&(this.freeThread(g),t.denseThreads[p]=null)}t.clear()}add(t,e,r,s,i,o){if(e===0||t.contains(e))return o;const u=t.add(e),c=this.prog.inst[e];switch(c.op){case et.FAIL:break;case et.ALT:case et.ALT_MATCH:o=this.add(t,c.out,r,s,i,o),o=this.add(t,c.arg,r,s,i,o);break;case et.EMPTY_WIDTH:(c.arg&~i)===0&&(o=this.add(t,c.out,r,s,i,o));break;case et.NOP:o=this.add(t,c.out,r,s,i,o);break;case et.CAPTURE:if(c.arg<this.ncap){const h=s[c.arg];s[c.arg]=r,this.add(t,c.out,r,s,i,null),s[c.arg]=h}else o=this.add(t,c.out,r,s,i,o);break;case et.MATCH:case et.RUNE:case et.RUNE1:case et.RUNE_ANY:case et.RUNE_ANY_NOT_NL:o===null?o=this.alloc(c):o.inst=c,this.ncap>0&&o.cap!==s&&(o.cap=s.slice(0,this.ncap)),t.denseThreads[u]=o,o=null;break;default:throw new Error("unhandled")}return o}}class o4{constructor(t){this.value=t}get(){return this.value}set(t){this.value=t}compareAndSet(t,e){return this.value===t?(this.value=e,!0):!1}}class cn{static initTest(t){const e=cn.compile(t),r=new cn(e.expr,e.prog,e.numSubexp,e.longest);return r.cond=e.cond,r.prefix=e.prefix,r.prefixUTF8=e.prefixUTF8,r.prefixComplete=e.prefixComplete,r.prefixRune=e.prefixRune,r}static compile(t){return cn.compileImpl(t,q.PERL,!1)}static compilePOSIX(t){return cn.compileImpl(t,q.POSIX,!0)}static compileImpl(t,e,r){let s=Ua.parse(t,e);const i=s.maxCap();s=Ee.simplify(s);const o=ps.compileRegexp(s),u=new cn(t,o,i,r),[c,h]=o.prefix();return u.prefixComplete=c,u.prefix=h,u.prefixUTF8=tt.stringToUtf8ByteArray(u.prefix),u.prefix.length>0&&(u.prefixRune=u.prefix.codePointAt(0)),u.namedGroups=s.namedGroups,u}static match(t,e){return cn.compile(t).match(e)}constructor(t,e,r=0,s=0){this.expr=t,this.prog=e,this.numSubexp=r,this.longest=s,this.cond=e.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.pooled=new o4}numberOfCapturingGroups(){return this.numSubexp}get(){let t;do t=this.pooled.get();while(t&&!this.pooled.compareAndSet(t,t.next));return t}reset(){this.pooled.set(null)}put(t,e){let r=this.pooled.get();do r=this.pooled.get(),!e&&r&&(t=Ir.fromMachine(t),e=!0),t.next!==r&&(t.next=r);while(!this.pooled.compareAndSet(r,t))}toString(){return this.expr}doExecute(t,e,r,s){let i=this.get(),o=!1;i?i.next!==null&&(i=Ir.fromMachine(i),o=!0):(i=Ir.fromRE2(this),o=!0),i.init(s);const u=i.match(t,e,r)?i.submatches():null;return this.put(i,o),u}match(t){return this.doExecute(Ct.fromUTF16(t),0,q.UNANCHORED,0)!==null}matchWithGroup(t,e,r,s,i){return t instanceof Rn||(t=Xi.utf16(t)),this.matchMachineInput(t,e,r,s,i)}matchMachineInput(t,e,r,s,i){if(e>r)return[!1,null];const o=t.isUTF16Encoding()?Ct.fromUTF16(t.asCharSequence(),0,r):Ct.fromUTF8(t.asBytes(),0,r),u=this.doExecute(o,e,s,2*i);return u===null?[!1,null]:[!0,u]}matchUTF8(t){return this.doExecute(Ct.fromUTF8(t),0,q.UNANCHORED,0)!==null}replaceAll(t,e){return this.replaceAllFunc(t,()=>e,2*t.length+1)}replaceFirst(t,e){return this.replaceAllFunc(t,()=>e,1)}replaceAllFunc(t,e,r){let s=0,i=0,o="";const u=Ct.fromUTF16(t);let c=0;for(;i<=t.length;){const h=this.doExecute(u,i,q.UNANCHORED,2);if(h===null||h.length===0)break;o+=t.substring(s,h[0]),(h[1]>s||h[0]===0)&&(o+=e(t.substring(h[0],h[1])),c++),s=h[1];const p=u.step(i)&7;if(i+p>h[1]?i+=p:i+1>h[1]?i++:i=h[1],c>=r)break}return o+=t.substring(s),o}pad(t){if(t===null)return null;let e=(1+this.numSubexp)*2;if(t.length<e){let r=new Array(e).fill(-1);for(let s=0;s<t.length;s++)r[s]=t[s];t=r}return t}allMatches(t,e,r=s=>s){let s=[];const i=t.endPos();e<0&&(e=i+1);let o=0,u=0,c=-1;for(;u<e&&o<=i;){const h=this.doExecute(t,o,q.UNANCHORED,this.prog.numCap);if(h===null||h.length===0)break;let p=!0;if(h[1]===o){h[0]===c&&(p=!1);const g=t.step(o);g<0?o=i+1:o+=g&7}else o=h[1];c=h[1],p&&(s.push(r(this.pad(h))),u++)}return s}findUTF8(t){const e=this.doExecute(Ct.fromUTF8(t),0,q.UNANCHORED,2);return e===null?null:t.slice(e[0],e[1])}findUTF8Index(t){const e=this.doExecute(Ct.fromUTF8(t),0,q.UNANCHORED,2);return e===null?null:e.slice(0,2)}find(t){const e=this.doExecute(Ct.fromUTF16(t),0,q.UNANCHORED,2);return e===null?"":t.substring(e[0],e[1])}findIndex(t){return this.doExecute(Ct.fromUTF16(t),0,q.UNANCHORED,2)}findUTF8Submatch(t){const e=this.doExecute(Ct.fromUTF8(t),0,q.UNANCHORED,this.prog.numCap);if(e===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<e.length&&e[2*s]>=0&&(r[s]=t.slice(e[2*s],e[2*s+1]));return r}findUTF8SubmatchIndex(t){return this.pad(this.doExecute(Ct.fromUTF8(t),0,q.UNANCHORED,this.prog.numCap))}findSubmatch(t){const e=this.doExecute(Ct.fromUTF16(t),0,q.UNANCHORED,this.prog.numCap);if(e===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<e.length&&e[2*s]>=0&&(r[s]=t.substring(e[2*s],e[2*s+1]));return r}findSubmatchIndex(t){return this.pad(this.doExecute(Ct.fromUTF16(t),0,q.UNANCHORED,this.prog.numCap))}findAllUTF8(t,e){const r=this.allMatches(Ct.fromUTF8(t),e,s=>t.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(t,e){const r=this.allMatches(Ct.fromUTF8(t),e,s=>s.slice(0,2));return r.length===0?null:r}findAll(t,e){const r=this.allMatches(Ct.fromUTF16(t),e,s=>t.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(t,e){const r=this.allMatches(Ct.fromUTF16(t),e,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(t,e){const r=this.allMatches(Ct.fromUTF8(t),e,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=t.slice(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(t,e){const r=this.allMatches(Ct.fromUTF8(t),e);return r.length===0?null:r}findAllSubmatch(t,e){const r=this.allMatches(Ct.fromUTF16(t),e,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=t.substring(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(t,e){const r=this.allMatches(Ct.fromUTF16(t),e);return r.length===0?null:r}}const Zt=class Zt{static quote(t){return tt.quoteMeta(t)}static compile(t,e=0){let r=t;if((e&Zt.CASE_INSENSITIVE)!==0&&(r=`(?i)${r}`),(e&Zt.DOTALL)!==0&&(r=`(?s)${r}`),(e&Zt.MULTILINE)!==0&&(r=`(?m)${r}`),(e&-32)!==0)throw new Z7("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH");let s=q.PERL;(e&Zt.DISABLE_UNICODE_GROUPS)!==0&&(s&=-129);const i=new Zt(t,e);return i.re2Input=cn.compileImpl(r,s,(e&Zt.LONGEST_MATCH)!==0),i}static matches(t,e){return Zt.compile(t).matcher(e).matches()}static initTest(t,e,r){if(t==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");const s=new Zt(t,e);return s.re2Input=r,s}constructor(t,e){this.patternInput=t,this.flagsInput=e}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(t){return this.matcher(t).matches()}matcher(t){return Array.isArray(t)&&(t=Xi.utf8(t)),new t4(this,t)}split(t,e=0){const r=this.matcher(t),s=[];let i=0,o=0;for(;r.find();){if(o===0&&r.end()===0){o=r.end();continue}if(e>0&&s.length===e-1)break;if(o===r.start()){if(e===0){i+=1,o=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.start())),o=r.end()}if(e===0&&o!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.inputLength()))}return(e!==0||s.length===0)&&s.push(r.substring(o,r.inputLength())),s}toString(){return this.patternInput}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(t){return this===t?!0:t===null||this.constructor!==t.constructor?!1:this.flagsInput===t.flagsInput&&this.patternInput===t.patternInput}};_(Zt,"CASE_INSENSITIVE",1),_(Zt,"DOTALL",2),_(Zt,"MULTILINE",4),_(Zt,"DISABLE_UNICODE_GROUPS",8),_(Zt,"LONGEST_MATCH",16);let Ps=Zt;/**
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
 */class zt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}zt.UNAUTHENTICATED=new zt(null),zt.GOOGLE_CREDENTIALS=new zt("google-credentials-uid"),zt.FIRST_PARTY=new zt("first-party-uid"),zt.MOCK_USER=new zt("mock-user");/**
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
 */let Vr="12.15.0";function a4(n){Vr=n}/**
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
 */const tr=new s1("@firebase/firestore");function gr(){return tr.logLevel}function $(n,...t){if(tr.logLevel<=ot.DEBUG){const e=t.map(m1);tr.debug(`Firestore (${Vr}): ${n}`,...e)}}function Xe(n,...t){if(tr.logLevel<=ot.ERROR){const e=t.map(m1);tr.error(`Firestore (${Vr}): ${n}`,...e)}}function Ie(n,...t){if(tr.logLevel<=ot.WARN){const e=t.map(m1);tr.warn(`Firestore (${Vr}): ${n}`,...e)}}function m1(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
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
 */function z(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,g2(n,r,e)}function g2(n,t,e){let r=`FIRESTORE (${Vr}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Xe(r),new Error(r)}function H(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||g2(t,s,r)}function Z(n,t){return n}/**
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
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends Ue{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ze{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class m2{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class u4{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(zt.UNAUTHENTICATED)))}shutdown(){}}class c4{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class l4{constructor(t){this.t=t,this.currentUser=zt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,e(c)):Promise.resolve();let i=new ze;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ze,t.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ze)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new m2(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new zt(t)}}class h4{constructor(t,e,r){this.T=t,this.P=e,this.R=r,this.type="FirstParty",this.user=zt.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const t=this.A();return t&&this.I.set("Authorization",t),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class f4{constructor(t,e,r){this.T=t,this.P=e,this.R=r}getToken(){return Promise.resolve(new h4(this.T,this.P,this.R))}start(t,e){t.enqueueRetryable((()=>e(zt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class fl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class d4{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,re(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new fl(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new fl(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function p4(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class _1{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=p4(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function it(n,t){return n<t?-1:n>t?1:0}function Fa(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return wa(s)===wa(i)?it(s,i):wa(s)?1:-1}return it(n.length,t.length)}const g4=55296,m4=57343;function wa(n){const t=n.charCodeAt(0);return t>=g4&&t<=m4}function Rr(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
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
 */const Se="__name__";class Ce{constructor(t,e,r){e===void 0?e=0:e>t.length&&z(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&z(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Ce.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ce?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=Ce.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return it(t.length,e.length)}static compareSegments(t,e){const r=Ce.isNumericId(t),s=Ce.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Ce.extractNumericId(t).compare(Ce.extractNumericId(e)):Fa(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Tn.fromString(t.substring(4,t.length-2))}}class lt extends Ce{construct(t,e,r){return new lt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new B(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new lt(e)}static emptyPath(){return new lt([])}}const _4=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class xt extends Ce{construct(t,e,r){return new xt(t,e,r)}static isValidIdentifier(t){return _4.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),xt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Se}static keyField(){return new xt([Se])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new B(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new B(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=c,s+=2}else u==="`"?(o=!o,s++):u!=="."||o?(r+=u,s++):(i(),s++)}if(i(),o)throw new B(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new xt(e)}static emptyPath(){return new xt([])}}/**
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
 */class G{constructor(t){this.path=t}static fromPath(t){return new G(lt.fromString(t))}static fromName(t){return new G(lt.fromString(t).popFirst(5))}static empty(){return new G(lt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&lt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return lt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new G(new lt(t.slice()))}}/**
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
 */function _2(n,t,e){if(!e)throw new B(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function E4(n,t,e,r){if(t===!0&&r===!0)throw new B(V.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function dl(n){if(!G.isDocumentKey(n))throw new B(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function pl(n){if(G.isDocumentKey(n))throw new B(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Qs(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Io(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function De(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new B(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Io(n);throw new B(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */function Nt(n,t){const e={typeString:n};return t&&(e.value=t),e}function Xs(n,t){if(!Qs(n))throw new B(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new B(V.INVALID_ARGUMENT,e);return!0}/**
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
 */const gl=-62135596800,ml=1e6;class gt{static now(){return gt.fromMillis(Date.now())}static fromDate(t){return gt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*ml);return new gt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<gl)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ml}_compareTo(t){return this.seconds===t.seconds?it(this.nanoseconds,t.nanoseconds):it(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:gt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Xs(t,gt._jsonSchema))return new gt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-gl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}gt._jsonSchemaVersion="firestore/timestamp/1.0",gt._jsonSchema={type:Nt("string",gt._jsonSchemaVersion),seconds:Nt("number"),nanoseconds:Nt("number")};/**
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
 */class J{static fromTimestamp(t){return new J(t)}static min(){return new J(new gt(0,0))}static max(){return new J(new gt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const bs=-1;function y4(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=J.fromTimestamp(r===1e9?new gt(e+1,0):new gt(e,r));return new Cn(s,G.empty(),t)}function T4(n){return new Cn(n.readTime,n.key,bs)}class Cn{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Cn(J.min(),G.empty(),bs)}static max(){return new Cn(J.max(),G.empty(),bs)}}function w4(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=G.comparator(n.documentKey,t.documentKey),e!==0?e:it(n.largestBatchId,t.largestBatchId))}/**
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
 */const I4="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class A4{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function xr(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==I4)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class x{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new x(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof x?e:x.resolve(e)}catch(e){return x.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):x.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):x.reject(e)}static resolve(t){return new x(((e,r)=>{e(t)}))}static reject(t){return new x(((e,r)=>{r(t)}))}static waitFor(t){return new x(((e,r)=>{let s=0,i=0,o=!1;t.forEach((u=>{++s,u.next((()=>{++i,o&&i===s&&e()}),(c=>r(c)))})),o=!0,i===s&&e()}))}static or(t){let e=x.resolve(!1);for(const r of t)e=e.next((s=>s?x.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new x(((r,s)=>{const i=t.length,o=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;e(t[h]).next((p=>{o[h]=p,++u,u===i&&r(o)}),(p=>s(p)))}}))}static doWhile(t,e){return new x(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function v4(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Lr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Ao{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ao.ce=-1;/**
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
 */const E1=-1;function vo(n){return n==null}function Ns(n){return n===0&&1/n==-1/0}function R4(n){return typeof n=="number"&&Number.isInteger(n)&&!Ns(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function C4(n){return typeof n=="string"}/**
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
 */const E2="";function S4(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=_l(t)),t=P4(n.get(e),t);return _l(t)}function P4(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case E2:e+="";break;default:e+=i}}return e}function _l(n){return n+E2+""}/**
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
 */class mt{constructor(t,e){this.comparator=t,this.root=e||Bt.EMPTY}insert(t,e){return new mt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Bt.BLACK,null,null))}remove(t){return new mt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Bt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ri(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ri(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ri(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ri(this.root,t,this.comparator,!0)}}class Ri{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Bt{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??Bt.RED,this.left=s??Bt.EMPTY,this.right=i??Bt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new Bt(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Bt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Bt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Bt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Bt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw z(27949);return t+(this.isRed()?0:1)}}Bt.EMPTY=null,Bt.RED=!0,Bt.BLACK=!1;Bt.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new Bt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ot{constructor(t){this.comparator=t,this.data=new mt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new El(this.data.getIterator())}getIteratorFrom(t){return new El(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof Ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Ot(this.comparator);return e.data=t,e}}class El{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Te{constructor(t){this.fields=t,t.sort(xt.comparator)}static empty(){return new Te([])}unionWith(t){let e=new Ot(xt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Te(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Rr(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
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
 */function Ji(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function or(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function b4(n,t){const e=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.push(t(n[r],r,n));return e}function y2(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class T2 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new T2("Invalid base64 string: "+i):i}})(t);return new Dt(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(t);return new Dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return it(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Dt.EMPTY_BYTE_STRING=new Dt("");const N4=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Sn(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=N4.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Et(n.seconds),nanos:Et(n.nanos)}}function Et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Pn(n){return typeof n=="string"?Dt.fromBase64String(n):Dt.fromUint8Array(n)}/**
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
 */const w2="server_timestamp",I2="__type__",A2="__previous_value__",v2="__local_write_time__";function Ro(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[I2])==null?void 0:r.stringValue)===w2}function Js(n){const t=n.mapValue.fields[A2];return Ro(t)?Js(t):t}function Cr(n){const t=Sn(n.mapValue.fields[v2].timestampValue);return new gt(t.seconds,t.nanos)}/**
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
 */class O4{constructor(t,e,r,s,i,o,u,c,h,p,g){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=p,this.apiKey=g}}const Zi="(default)";class Os{constructor(t,e){this.projectId=t,this.database=e||Zi}static empty(){return new Os("","")}get isDefaultDatabase(){return this.database===Zi}isEqual(t){return t instanceof Os&&t.projectId===this.projectId&&t.database===this.database}}function D4(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new B(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Os(n.options.projectId,t)}/**
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
 */const R2="__type__",k4="__max__",Ci={mapValue:{}},C2="__vector__",Ds="value",Sr={nullValue:"NULL_VALUE"},oe={booleanValue:!0},Ft={booleanValue:!1};function kt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ro(n)?4:V4(n)?9007199254740991:to(n)?10:11:z(28295,{value:n})}function _e(n,t,e){if(n===t)return!0;const r=kt(n);if(r!==kt(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Cr(n).isEqual(Cr(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Sn(i.timestampValue),c=Sn(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,o){return Pn(i.bytesValue).isEqual(Pn(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,o){return Et(i.geoPointValue.latitude)===Et(o.geoPointValue.latitude)&&Et(i.geoPointValue.longitude)===Et(o.geoPointValue.longitude)})(n,t);case 2:return(function(i,o,u){if("integerValue"in i&&"integerValue"in o)return Et(i.integerValue)===Et(o.integerValue);let c,h;if("doubleValue"in i&&"doubleValue"in o)c=Et(i.doubleValue),h=Et(o.doubleValue);else{if(!(u!=null&&u.Ee))return!1;c=Et(i.integerValue??i.doubleValue),h=Et(o.integerValue??o.doubleValue)}return c===h?!!(u!=null&&u.he)||Ns(c)===Ns(h):!!(u===void 0||u.Te)&&isNaN(c)&&isNaN(h)})(n,t,e);case 9:return Rr(n.arrayValue.values||[],t.arrayValue.values||[],((s,i)=>_e(s,i,e)));case 10:case 11:return(function(i,o,u){const c=i.mapValue.fields||{},h=o.mapValue.fields||{};if(Ji(c)!==Ji(h))return!1;for(const p in c)if(c.hasOwnProperty(p)&&(h[p]===void 0||!_e(c[p],h[p],u)))return!1;return!0})(n,t,e);default:return z(52216,{left:n})}}function ks(n,t){return(n.values||[]).find((e=>_e(e,t)))!==void 0}function ae(n,t){if(n===t)return 0;const e=kt(n),r=kt(t);if(e!==r)return it(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return it(n.booleanValue,t.booleanValue);case 2:return(function(i,o){const u=Et(i.integerValue||i.doubleValue),c=Et(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(n,t);case 3:return yl(n.timestampValue,t.timestampValue);case 4:return yl(Cr(n),Cr(t));case 5:return Fa(n.stringValue,t.stringValue);case 6:return(function(i,o){const u=Pn(i),c=Pn(o);return u.compareTo(c)})(n.bytesValue,t.bytesValue);case 7:return(function(i,o){const u=i.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const p=it(u[h],c[h]);if(p!==0)return p}return it(u.length,c.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,o){const u=it(Et(i.latitude),Et(o.latitude));return u!==0?u:it(Et(i.longitude),Et(o.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Tl(n.arrayValue,t.arrayValue);case 10:return(function(i,o){var T,S,N,L;const u=i.fields||{},c=o.fields||{},h=(T=u[Ds])==null?void 0:T.arrayValue,p=(S=c[Ds])==null?void 0:S.arrayValue,g=it(((N=h==null?void 0:h.values)==null?void 0:N.length)||0,((L=p==null?void 0:p.values)==null?void 0:L.length)||0);return g!==0?g:Tl(h,p)})(n.mapValue,t.mapValue);case 11:return(function(i,o){if(i===Ci.mapValue&&o===Ci.mapValue)return 0;if(i===Ci.mapValue)return 1;if(o===Ci.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=o.fields||{},p=Object.keys(h);c.sort(),p.sort();for(let g=0;g<c.length&&g<p.length;++g){const T=Fa(c[g],p[g]);if(T!==0)return T;const S=ae(u[c[g]],h[p[g]]);if(S!==0)return S}return it(c.length,p.length)})(n.mapValue,t.mapValue);default:throw z(23264,{Pe:e})}}function yl(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return it(n,t);const e=Sn(n),r=Sn(t),s=it(e.seconds,r.seconds);return s!==0?s:it(e.nanos,r.nanos)}function Tl(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=ae(e[s],r[s]);if(i!==void 0&&i!==0)return i}return it(e.length,r.length)}function Pr(n){return Ba(n)}function Ba(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Sn(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Pn(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return G.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=Ba(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Ba(e.fields[o])}`;return s+"}"})(n.mapValue):z(61005,{value:n})}function Mi(n){switch(kt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Js(n);return t?16+Mi(t):16;case 5:return 2*n.stringValue.length;case 6:return Pn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Mi(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return or(r.fields,((i,o)=>{s+=i.length+Mi(o)})),s})(n.mapValue);default:throw z(13486,{value:n})}}function wl(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Pe(n){return!!n&&"integerValue"in n}function jn(n){return!!n&&"doubleValue"in n}function bn(n){return Pe(n)||jn(n)}function br(n){return!!n&&"arrayValue"in n}function fe(n){return!!n&&"nullValue"in n}function ue(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Gn(n){return!!n&&"mapValue"in n}function to(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[R2])==null?void 0:r.stringValue)===C2}function $a(n){var t,e;return(e=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Ds])==null?void 0:e.arrayValue}function ms(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return or(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=ms(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ms(n.arrayValue.values[e]);return t}return{...n}}function V4(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===k4}/**
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
 */class he{constructor(t){this.value=t}static empty(){return new he({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Gn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ms(e)}setAll(t){let e=xt.emptyPath(),r={},s=[];t.forEach(((o,u)=>{if(!e.isImmediateParentOf(u)){const c=this.getFieldsMap(e);this.applyChanges(c,r,s),r={},s=[],e=u.popLast()}o?r[u.lastSegment()]=ms(o):s.push(u.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Gn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return _e(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Gn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){or(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new he(ms(this.value))}}function S2(n){const t=[];return or(n.fields,((e,r)=>{const s=new xt([e]);if(Gn(r)){const i=S2(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)})),new Te(t)}/**
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
 */function Co(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ns(t)?"-0":t}}function y1(n){return{integerValue:""+n}}function T1(n,t,e){return Number.isInteger(t)&&(e!=null&&e.preferIntegers)||R4(t)?y1(t):Co(n,t)}/**
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
 */class So{constructor(){this._=void 0}}function x4(n,t,e){return n instanceof Vs?(function(s,i){const o={fields:{[I2]:{stringValue:w2},[v2]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ro(i)&&(i=Js(i)),i&&(o.fields[A2]=i),{mapValue:o}})(e,t):n instanceof xs?b2(n,t):n instanceof Ls?N2(n,t):n instanceof Ms?(function(s,i){const o=P2(s,i),u=ro(o)+ro(s.Re);return Pe(o)&&Pe(s.Re)?y1(u):Co(s.serializer,u)})(n,t):n instanceof eo?(function(s,i){return Il(s,i,Math.min)})(n,t):n instanceof no?(function(s,i){return Il(s,i,Math.max)})(n,t):void 0}function L4(n,t,e){return n instanceof xs?b2(n,t):n instanceof Ls?N2(n,t):e}function P2(n,t){return n instanceof Ms?bn(t)?t:{integerValue:0}:null}class Vs extends So{}class xs extends So{constructor(t){super(),this.elements=t}}function b2(n,t){const e=O2(t);for(const r of n.elements)e.some((s=>_e(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Ls extends So{constructor(t){super(),this.elements=t}}function N2(n,t){let e=O2(t);for(const r of n.elements)e=e.filter((s=>!_e(s,r)));return{arrayValue:{values:e}}}class w1 extends So{constructor(t,e){super(),this.serializer=t,this.Re=e}}class Ms extends w1{}class eo extends w1{}class no extends w1{}function Il(n,t,e){if(!bn(t))return n.Re;const r=e(ro(t),ro(n.Re));return Pe(t)&&Pe(n.Re)?y1(r):Co(n.serializer,r)}function ro(n){return Et(n.integerValue||n.doubleValue)}function O2(n){return br(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class M4{constructor(t,e){this.field=t,this.transform=e}}function U4(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof xs&&s instanceof xs||r instanceof Ls&&s instanceof Ls?Rr(r.elements,s.elements,_e):r instanceof Ms&&s instanceof Ms||r instanceof eo&&s instanceof eo||r instanceof no&&s instanceof no?_e(r.Re,s.Re):r instanceof Vs&&s instanceof Vs})(n.transform,t.transform)}class F4{constructor(t,e){this.version=t,this.transformResults=e}}class We{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new We}static exists(t){return new We(void 0,t)}static updateTime(t){return new We(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ui(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Po{}function D2(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new V2(n.key,We.none()):new Zs(n.key,n.data,We.none());{const e=n.data,r=he.empty();let s=new Ot(xt.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new ar(n.key,r,new Te(s.toArray()),We.none())}}function B4(n,t,e){n instanceof Zs?(function(s,i,o){const u=s.value.clone(),c=vl(s.fieldTransforms,i,o.transformResults);u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,t,e):n instanceof ar?(function(s,i,o){if(!Ui(s.precondition,i))return void i.convertToUnknownDocument(o.version);const u=vl(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(k2(s)),c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,t,e):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,t,e)}function _s(n,t,e,r){return n instanceof Zs?(function(i,o,u,c){if(!Ui(i.precondition,o))return u;const h=i.value.clone(),p=Rl(i.fieldTransforms,c,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof ar?(function(i,o,u,c){if(!Ui(i.precondition,o))return u;const h=Rl(i.fieldTransforms,c,o),p=o.data;return p.setAll(k2(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((g=>g.field)))})(n,t,e,r):(function(i,o,u){return Ui(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u})(n,t,e)}function $4(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=P2(r.transform,s||null);i!=null&&(e===null&&(e=he.empty()),e.set(r.field,i))}return e||null}function Al(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Rr(r,s,((i,o)=>U4(i,o)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Zs extends Po{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ar extends Po{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function k2(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function vl(n,t,e){const r=new Map;H(n.length===e.length,32656,{Ie:e.length,Ae:n.length});for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,u=t.data.field(i.field);r.set(i.field,L4(o,u,e[s]))}return r}function Rl(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,x4(i,o,t))}return r}class V2 extends Po{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class q4 extends Po{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class so{constructor(t,e){this.position=t,this.inclusive=e}}function Cl(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),e.key):r=ae(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sl(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!_e(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class x2{}class bt extends x2{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new j4(t,e,r):e==="array-contains"?new W4(t,r):e==="in"?new K4(t,r):e==="not-in"?new Y4(t,r):e==="array-contains-any"?new Q4(t,r):new bt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new G4(t,r):new z4(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(ae(e,this.value)):e!==null&&kt(this.value)===kt(e)&&this.matchesComparison(ae(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ae extends x2{constructor(t,e){super(),this.filters=t,this.op=e,this.Ve=null}static create(t,e){return new Ae(t,e)}matches(t){return L2(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function L2(n){return n.op==="and"}function M2(n){return H4(n)&&L2(n)}function H4(n){for(const t of n.filters)if(t instanceof Ae)return!1;return!0}function qa(n){if(n instanceof bt)return n.field.canonicalString()+n.op.toString()+Pr(n.value);if(M2(n))return n.filters.map((t=>qa(t))).join(",");{const t=n.filters.map((e=>qa(e))).join(",");return`${n.op}(${t})`}}function U2(n,t){return n instanceof bt?(function(r,s){return s instanceof bt&&r.op===s.op&&r.field.isEqual(s.field)&&_e(r.value,s.value)})(n,t):n instanceof Ae?(function(r,s){return s instanceof Ae&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,u)=>i&&U2(o,s.filters[u])),!0):!1})(n,t):void z(19439)}function F2(n){return n instanceof bt?(function(e){return`${e.field.canonicalString()} ${e.op} ${Pr(e.value)}`})(n):n instanceof Ae?(function(e){return e.op.toString()+" {"+e.getFilters().map(F2).join(" ,")+"}"})(n):"Filter"}class j4 extends bt{constructor(t,e,r){super(t,e,r),this.key=G.fromName(r.referenceValue)}matches(t){const e=G.comparator(t.key,this.key);return this.matchesComparison(e)}}class G4 extends bt{constructor(t,e){super(t,"in",e),this.keys=B2("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class z4 extends bt{constructor(t,e){super(t,"not-in",e),this.keys=B2("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function B2(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>G.fromName(r.referenceValue)))}class W4 extends bt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return br(e)&&ks(e.arrayValue,this.value)}}class K4 extends bt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&ks(this.value.arrayValue,e)}}class Y4 extends bt{constructor(t,e){super(t,"not-in",e)}matches(t){if(ks(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!ks(this.value.arrayValue,e)}}class Q4 extends bt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!br(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>ks(this.value.arrayValue,r)))}}/**
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
 */class io{constructor(t,e="asc"){this.field=t,this.dir=e}}function X4(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class Wt{constructor(t,e,r,s,i,o,u){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=u}static newInvalidDocument(t){return new Wt(t,0,J.min(),J.min(),J.min(),he.empty(),0)}static newFoundDocument(t,e,r,s){return new Wt(t,1,e,J.min(),r,s,0)}static newNoDocument(t,e){return new Wt(t,2,e,J.min(),J.min(),he.empty(),0)}static newUnknownDocument(t,e){return new Wt(t,3,e,J.min(),J.min(),he.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=he.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=he.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Wt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Wt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class J4{constructor(t,e=null,r=[],s=[],i=null,o=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=u,this.de=null}}function Pl(n,t=null,e=[],r=[],s=null,i=null,o=null){return new J4(n,t,e,r,s,i,o)}function $2(n){const t=Z(n);if(t.de===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>qa(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),vo(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>Pr(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>Pr(r))).join(",")),t.de=e}return t.de}function q2(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!X4(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!U2(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Sl(n.startAt,t.startAt)&&Sl(n.endAt,t.endAt)}function qn(n){return!!n.isCorePipeline}function H2(n){return!!n.path&&G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class ti{constructor(t,e=null,r=[],s=[],i=null,o="F",u=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=u,this.endAt=c,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function Z4(n,t,e,r,s,i,o,u){return new ti(n,t,e,r,s,i,o,u)}function bo(n){return new ti(n)}function bl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function t3(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function j2(n){return n.collectionGroup!==null}function Es(n){const t=Z(n);if(t.fe===null){t.fe=[];const e=new Set;for(const i of t.explicitOrderBy)t.fe.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new Ot(xt.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.fe.push(new io(i,r))})),e.has(xt.keyField().canonicalString())||t.fe.push(new io(xt.keyField(),r))}return t.fe}function ke(n){const t=Z(n);return t.me||(t.me=e3(t,Es(n))),t.me}function e3(n,t){if(n.limitType==="F")return Pl(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new io(s.field,i)}));const e=n.endAt?new so(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new so(n.startAt.position,n.startAt.inclusive):null;return Pl(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ha(n,t){const e=n.filters.concat([t]);return new ti(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function ja(n,t,e){return new ti(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function n3(n,t){return q2(ke(n),ke(t))&&n.limitType===t.limitType}function ys(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>F2(s))).join(", ")}]`),vo(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>Pr(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>Pr(s))).join(",")),`Target(${r})`})(ke(n))}; limitType=${n.limitType})`}function No(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):G.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Es(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(o,u,c){const h=Cl(o,u,c);return o.inclusive?h<=0:h<0})(r.startAt,Es(r),s)||r.endAt&&!(function(o,u,c){const h=Cl(o,u,c);return o.inclusive?h>=0:h>0})(r.endAt,Es(r),s))})(n,t)}function I1(n){return(t,e)=>{let r=!1;for(const s of Es(n)){const i=r3(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function r3(n,t,e){const r=n.field.isKeyField()?G.comparator(t.key,e.key):(function(i,o,u){const c=o.data.field(i),h=u.data.field(i);return c!==null&&h!==null?ae(c,h):z(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
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
 */class s3{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var Pt,at;function i3(n){switch(n){case V.OK:return z(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function G2(n){if(n===void 0)return Xe("GRPC error has no .code"),V.UNKNOWN;switch(n){case Pt.OK:return V.OK;case Pt.CANCELLED:return V.CANCELLED;case Pt.UNKNOWN:return V.UNKNOWN;case Pt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Pt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Pt.INTERNAL:return V.INTERNAL;case Pt.UNAVAILABLE:return V.UNAVAILABLE;case Pt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Pt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Pt.NOT_FOUND:return V.NOT_FOUND;case Pt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Pt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Pt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Pt.ABORTED:return V.ABORTED;case Pt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Pt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Pt.DATA_LOSS:return V.DATA_LOSS;default:return z(39323,{code:n})}}(at=Pt||(Pt={}))[at.OK=0]="OK",at[at.CANCELLED=1]="CANCELLED",at[at.UNKNOWN=2]="UNKNOWN",at[at.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",at[at.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",at[at.NOT_FOUND=5]="NOT_FOUND",at[at.ALREADY_EXISTS=6]="ALREADY_EXISTS",at[at.PERMISSION_DENIED=7]="PERMISSION_DENIED",at[at.UNAUTHENTICATED=16]="UNAUTHENTICATED",at[at.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",at[at.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",at[at.ABORTED=10]="ABORTED",at[at.OUT_OF_RANGE=11]="OUT_OF_RANGE",at[at.UNIMPLEMENTED=12]="UNIMPLEMENTED",at[at.INTERNAL=13]="INTERNAL",at[at.UNAVAILABLE=14]="UNAVAILABLE",at[at.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class ur{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){or(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return y2(this.inner)}size(){return this.innerSize}}/**
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
 */const o3=new mt(G.comparator);function se(){return o3}const z2=new mt(G.comparator);function mr(...n){let t=z2;for(const e of n)t=t.insert(e.key,e);return t}function W2(n){let t=z2;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function mn(){return Ts()}function K2(){return Ts()}function Ts(){return new ur((n=>n.toString()),((n,t)=>n.isEqual(t)))}const a3=new mt(G.comparator),u3=new Ot(G.comparator);function st(...n){let t=u3;for(const e of n)t=t.add(e);return t}const c3=new Ot(it);function l3(){return c3}/**
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
 */function h3(){return new TextEncoder}/**
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
 */const f3=new Tn([4294967295,4294967295],0);function Nl(n){const t=h3().encode(n),e=new u2;return e.update(t),new Uint8Array(e.digest())}function Ol(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Tn([e,r],0),new Tn([s,i],0)]}class A1{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new ls(`Invalid padding: ${e}`);if(r<0)throw new ls(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new ls(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new ls(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.ye=Tn.fromNumber(this.ge)}we(t,e,r){let s=t.add(e.multiply(Tn.fromNumber(r)));return s.compare(f3)===1&&(s=new Tn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Nl(t),[r,s]=Ol(e);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);if(!this.be(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new A1(i,s,e);return r.forEach((u=>o.insert(u))),o}insert(t){if(this.ge===0)return;const e=Nl(t),[r,s]=Ol(e);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);this.ve(o)}}ve(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class ls extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ei{constructor(t,e,r,s,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,ni.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new ei(J.min(),s,new mt(it),se(),se(),st())}}class ni{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new ni(r,e,st(),st(),st())}}/**
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
 */class Fi{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Y2{constructor(t,e){this.targetId=t,this.xe=e}}class Q2{constructor(t,e,r=Dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Dl{constructor(t){this.targetId=t,this.Ce=0,this.Fe=kl(),this.Oe=Dt.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(t){t.approximateByteSize()>0&&(this.Ne=!0,this.Oe=t)}ke(){let t=st(),e=st(),r=st();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:z(38017,{changeType:i})}})),new ni(this.Oe,this.Me,t,e,r)}qe(){this.Ne=!1,this.Fe=kl()}$e(t,e){this.Ne=!0,this.Fe=this.Fe.insert(t,e)}Ke(t){this.Ne=!0,this.Fe=this.Fe.remove(t)}We(){this.Ce+=1}Qe(){this.Ce-=1,H(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const ss="WatchChangeAggregator";class d3{constructor(t){this.ze=t,this.je=new Map,this.He=se(),this.Je=Si(),this.Ye=se(),this.Ze=Si(),this.Xe=new mt(it)}et(t){for(const e of t.Se)t.De&&t.De.isFoundDocument()?this.tt(e,t.De):this.nt(e,t.key,t.De);for(const e of t.removedTargetIds)this.nt(e,t.key,t.De)}rt(t){this.forEachTarget(t,(e=>{const r=this.je.get(e);if(r)switch(t.state){case 0:this.it(e)&&r.Ue(t.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(t.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.Ue(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.Ue(t.resumeToken));break;default:z(56790,{state:t.state})}else $(ss,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach(((r,s)=>{this.it(s)&&e(s)}))}_t(t){var e;return qn(t)?t.getPipelineSourceType()==="documents"&&((e=t.getPipelineDocuments())==null?void 0:e.length)===1:H2(t)}ot(t){const e=t.targetId,r=t.xe.count,s=this.ut(e);if(s){const i=s.target;if(this._t(i))if(r===0){const o=new G(qn(i)?lt.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(e,o,Wt.newNoDocument(o,J.min()))}else H(r===1,20013,"Single document existence filter with count: "+r);else{const o=this.ct(e);if(o!==r){const u=this.lt(t),c=u?this.Et(u,t,o):1;if(c!==0){this.st(e);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(e,h)}}}}}lt(t){const e=t.xe.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,u;try{o=Pn(r).toUint8Array()}catch(c){if(c instanceof T2)return Ie("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new A1(o,s,i)}catch(c){return Ie(c instanceof ls?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}Et(t,e,r){return e.xe.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const o=this.ze.Tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.nt(e,i,null),s++)})),s}Rt(t){const e=new Map;this.je.forEach(((i,o)=>{const u=this.ut(o);if(u){if(i.current&&this._t(u.target)){const c=qn(u.target)?lt.fromString(u.target.getPipelineDocuments()[0]):u.target.path,h=new G(c);this.It(h).has(o)||this.At(o,h)||this.nt(o,h,Wt.newNoDocument(h,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let r=st();this.Ze.forEach(((i,o)=>{let u=!0;o.forEachWhile((c=>{const h=this.ut(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(r=r.add(i))})),this.He.forEach(((i,o)=>o.setReadTime(t))),this.Ye.forEach(((i,o)=>o.setReadTime(t)));const s=new ei(t,e,this.Xe,this.He,this.Ye,r);return this.He=se(),this.Je=Si(),this.Ye=se(),this.Ze=Si(),this.Xe=new mt(it),s}tt(t,e){const r=this.je.get(t);if(!r||!this.it(t))return void $(ss,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.At(t,e.key)?2:0;r.$e(e.key,s),qn(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e.key,e):this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.Ze=this.Ze.insert(e.key,this.Vt(e.key).add(t))}nt(t,e,r){const s=this.je.get(t);s&&this.it(t)?(this.At(t,e)?s.$e(e,1):s.Ke(e),this.Ze=this.Ze.insert(e,this.Vt(e).delete(t)),this.Ze=this.Ze.insert(e,this.Vt(e).add(t)),r&&(qn(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e,r):this.He=this.He.insert(e,r))):$(ss,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.je.delete(t)}ct(t){const e=this.je.get(t);if(!e)return 0;const r=e.ke();return this.ze.getRemoteKeysForTarget(t).size+r.addedDocuments.size-r.removedDocuments.size}We(t){let e=this.je.get(t);e||($(ss,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new Dl(t),this.je.set(t,e)),e.We()}Vt(t){let e=this.Ze.get(t);return e||(e=new Ot(it),this.Ze=this.Ze.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new Ot(it),this.Je=this.Je.insert(t,e)),e}it(t){const e=this.ut(t)!==null;return e||$(ss,"Detected inactive target",t),e}ut(t){const e=this.je.get(t);return e===void 0||e.Le?null:this.ze.dt(t)}st(t){this.je.set(t,new Dl(t)),this.ze.getRemoteKeysForTarget(t).forEach((e=>{this.nt(t,e,null)}))}At(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Si(){return new mt(G.comparator)}function kl(){return new mt(G.comparator)}const p3={asc:"ASCENDING",desc:"DESCENDING"},g3={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},m3={and:"AND",or:"OR"};class _3{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ga(n,t){return n.useProto3Json||vo(t)?t:{value:t}}function oo(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function v1(n){const t=Sn(n);return new gt(t.seconds,t.nanos)}function X2(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Bi(n,t){return oo(n,t.toTimestamp())}function Ve(n){return H(!!n,49232),J.fromTimestamp(v1(n))}function R1(n,t){return za(n,t).canonicalString()}function za(n,t){const e=(function(s){return new lt(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function J2(n){const t=lt.fromString(n);return H(r6(t),10190,{key:t.toString()}),t}function ao(n,t){return R1(n.databaseId,t.path)}function Ia(n,t){const e=J2(t);if(e.get(1)!==n.databaseId.projectId)throw new B(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new B(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new G(t6(e))}function Z2(n,t){return R1(n.databaseId,t)}function E3(n){const t=J2(n);return t.length===4?lt.emptyPath():t6(t)}function Wa(n){return new lt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function t6(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Vl(n,t,e){return{name:ao(n,t),fields:e.value.mapValue.fields}}function y3(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:z(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,p){return h.useProto3Json?(H(p===void 0||typeof p=="string",58123),Dt.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Dt.fromUint8Array(p||new Uint8Array))})(n,t.targetChange.resumeToken),o=t.targetChange.cause,u=o&&(function(h){const p=h.code===void 0?V.UNKNOWN:G2(h.code);return new B(p,h.message||"")})(o);e=new Q2(r,s,i,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ia(n,r.document.name),i=Ve(r.document.updateTime),o=r.document.createTime?Ve(r.document.createTime):J.min(),u=new he({mapValue:{fields:r.document.fields}}),c=Wt.newFoundDocument(s,i,o,u),h=r.targetIds||[],p=r.removedTargetIds||[];e=new Fi(h,p,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Ia(n,r.document),i=r.readTime?Ve(r.readTime):J.min(),o=Wt.newNoDocument(s,i),u=r.removedTargetIds||[];e=new Fi([],u,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Ia(n,r.document),i=r.removedTargetIds||[];e=new Fi([],i,s,null)}else{if(!("filter"in t))return z(11601,{ft:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new s3(s,i),u=r.targetId;e=new Y2(u,o)}}return e}function T3(n,t){let e;if(t instanceof Zs)e={update:Vl(n,t.key,t.value)};else if(t instanceof V2)e={delete:ao(n,t.key)};else if(t instanceof ar)e={update:Vl(n,t.key,t.data),updateMask:N3(t.fieldMask)};else{if(!(t instanceof q4))return z(16599,{gt:t.type});e={verify:ao(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,o){const u=o.transform;if(u instanceof Vs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof xs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Ls)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ms)return{fieldPath:o.field.canonicalString(),increment:u.Re};if(u instanceof eo)return{fieldPath:o.field.canonicalString(),minimum:u.Re};if(u instanceof no)return{fieldPath:o.field.canonicalString(),maximum:u.Re};throw z(20930,{transform:o.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Bi(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:z(27497)})(n,t.precondition)),e}function w3(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map((e=>(function(s,i){let o=s.updateTime?Ve(s.updateTime):Ve(i);return o.isEqual(J.min())&&(o=Ve(i)),new F4(o,s.transformResults||[])})(e,t)))):[]}function I3(n,t){return{documents:[Z2(n,t.path)]}}function A3(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Z2(n,s);const i=(function(h){if(h.length!==0)return n6(Ae.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((p=>(function(T){return{field:_r(T.field),direction:S3(T.dir)}})(p)))})(t.orderBy);o&&(e.structuredQuery.orderBy=o);const u=Ga(n,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{yt:e,parent:s}}function v3(n){let t=E3(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){H(r===1,65062);const p=e.from[0];p.allDescendants?s=p.collectionId:t=t.child(p.collectionId)}let i=[];e.where&&(i=(function(g){const T=e6(g);return T instanceof Ae&&M2(T)?T.getFilters():[T]})(e.where));let o=[];e.orderBy&&(o=(function(g){return g.map((T=>(function(N){return new io(Er(N.field),(function(U){switch(U){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(T)))})(e.orderBy));let u=null;e.limit&&(u=(function(g){let T;return T=typeof g=="object"?g.value:g,vo(T)?null:T})(e.limit));let c=null;e.startAt&&(c=(function(g){const T=!!g.before,S=g.values||[];return new so(S,T)})(e.startAt));let h=null;return e.endAt&&(h=(function(g){const T=!g.before,S=g.values||[];return new so(S,T)})(e.endAt)),Z4(t,s,o,i,u,"F",c,h)}function R3(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function C3(n,t){return{structuredPipeline:{pipeline:{stages:t.stages.map((e=>e._toProto(n)))}}}}function e6(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Er(e.unaryFilter.field);return bt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Er(e.unaryFilter.field);return bt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Er(e.unaryFilter.field);return bt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Er(e.unaryFilter.field);return bt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}})(n):n.fieldFilter!==void 0?(function(e){return bt.create(Er(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Ae.create(e.compositeFilter.filters.map((r=>e6(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return z(1026)}})(e.compositeFilter.op))})(n):z(30097,{filter:n})}function S3(n){return p3[n]}function P3(n){return g3[n]}function b3(n){return m3[n]}function _r(n){return{fieldPath:n.canonicalString()}}function Er(n){return xt.fromServerFormat(n.fieldPath)}function n6(n){return n instanceof bt?(function(e){if(e.op==="=="){if(ue(e.value))return{unaryFilter:{field:_r(e.field),op:"IS_NAN"}};if(fe(e.value))return{unaryFilter:{field:_r(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ue(e.value))return{unaryFilter:{field:_r(e.field),op:"IS_NOT_NAN"}};if(fe(e.value))return{unaryFilter:{field:_r(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_r(e.field),op:P3(e.op),value:e.value}}})(n):n instanceof Ae?(function(e){const r=e.getFilters().map((s=>n6(s)));return r.length===1?r[0]:{compositeFilter:{op:b3(e.op),filters:r}}})(n):z(54877,{filter:n})}function N3(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function r6(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function s6(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Us(n,t){const e={fields:{}};return t.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);e.fields[s]=r._toProto(n)})),{mapValue:e}}function i6(n){return{stringValue:n}}/**
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
 */function Oo(n){return new _3(n,!0)}/**
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
 */class ge{constructor(t){this._byteString=t}static fromBase64String(t){try{return new ge(Dt.fromBase64String(t))}catch(e){throw new B(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new ge(Dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Xs(t,ge._jsonSchema))return ge.fromBase64String(t.bytes)}}ge._jsonSchemaVersion="firestore/bytes/1.0",ge._jsonSchema={type:Nt("string",ge._jsonSchemaVersion),bytes:Nt("string")};/**
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
 */class C1{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new B(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new xt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function O3(){return new C1(Se)}/**
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
 */class S1{constructor(t){this._methodName=t}}/**
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
 */class xe{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new B(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new B(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return it(this._lat,t._lat)||it(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:xe._jsonSchemaVersion}}static fromJSON(t){if(Xs(t,xe._jsonSchema))return new xe(t.latitude,t.longitude)}}function o6(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */xe._jsonSchemaVersion="firestore/geoPoint/1.0",xe._jsonSchema={type:Nt("string",xe._jsonSchemaVersion),latitude:Nt("number"),longitude:Nt("number")};class D3{bt(t){}shutdown(){}}/**
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
 */const xl="ConnectivityMonitor";class Ll{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(t){this.Ct.push(t)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){$(xl,"Network connectivity changed: AVAILABLE");for(const t of this.Ct)t(0)}xt(){$(xl,"Network connectivity changed: UNAVAILABLE");for(const t of this.Ct)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Pi=null;function Ka(){return Pi===null?Pi=(function(){return 268435456+Math.round(2147483648*Math.random())})():Pi++,"0x"+Pi.toString(16)}/**
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
 */const Aa="RestConnection",k3={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class V3{get Ot(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=e+"://"+t.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===Zi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(t,e,r,s,i){const o=Ka(),u=this.Ut(t,e.toUriEncodedString());$(Aa,`Sending RPC '${t}' ${o}:`,u,r);const c={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(c,s,i);const{host:h}=new URL(u),p=sr(h);return this.qt(t,u,c,r,p).then((g=>($(Aa,`Received RPC '${t}' ${o}: `,g),g)),(g=>{throw Ie(Aa,`RPC '${t}' ${o} failed with error: `,g,"url: ",u,"request:",r),g}))}$t(t,e,r,s,i,o){return this.Bt(t,e,r,s,i)}kt(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Vr})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}Ut(t,e){const r=k3[t];let s=`${this.Mt}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class x3{constructor(t){this.Kt=t.Kt,this.Wt=t.Wt}Qt(t){this.Gt=t}zt(t){this.jt=t}Ht(t){this.Jt=t}onMessage(t){this.Yt=t}close(){this.Wt()}send(t){this.Kt(t)}Zt(){this.Gt()}Xt(){this.jt()}en(t){this.Jt(t)}tn(t){this.Yt(t)}}/**
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
 */const Ht="WebChannelConnection",is=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Ar extends V3{constructor(t){super(t),this.nn=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static rn(){if(!Ar.sn){const t=f2();is(t,h2.STAT_EVENT,(e=>{e.stat===Ma.PROXY?$(Ht,"STAT_EVENT: detected buffering proxy"):e.stat===Ma.NOPROXY&&$(Ht,"STAT_EVENT: detected no buffering proxy")})),Ar.sn=!0}}qt(t,e,r,s,i){const o=Ka();return new Promise(((u,c)=>{const h=new c2;h.setWithCredentials(!0),h.listenOnce(l2.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Li.NO_ERROR:const g=h.getResponseJson();$(Ht,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(g)),u(g);break;case Li.TIMEOUT:$(Ht,`RPC '${t}' ${o} timed out`),c(new B(V.DEADLINE_EXCEEDED,"Request time out"));break;case Li.HTTP_ERROR:const T=h.getStatus();if($(Ht,`RPC '${t}' ${o} failed with status:`,T,"response text:",h.getResponseText()),T>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const N=S==null?void 0:S.error;if(N&&N.status&&N.message){const L=(function(W){const rt=W.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(rt)>=0?rt:V.UNKNOWN})(N.status);c(new B(L,N.message))}else c(new B(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new B(V.UNAVAILABLE,"Connection failed."));break;default:z(9055,{_n:t,streamId:o,an:h.getLastErrorCode(),un:h.getLastError()})}}finally{$(Ht,`RPC '${t}' ${o} completed.`)}}));const p=JSON.stringify(s);$(Ht,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",p,r,15)}))}cn(t,e,r){const s=Ka(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.kt(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const h=i.join("");$(Ht,`Creating RPC '${t}' stream ${s}: ${h}`,u);const p=o.createWebChannel(h,u);this.En(p);let g=!1,T=!1;const S=new x3({Kt:N=>{T?$(Ht,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(g||($(Ht,`Opening RPC '${t}' stream ${s} transport.`),p.open(),g=!0),$(Ht,`RPC '${t}' stream ${s} sending:`,N),p.send(N))},Wt:()=>p.close()});return is(p,cs.EventType.OPEN,(()=>{T||($(Ht,`RPC '${t}' stream ${s} transport opened.`),S.Zt())})),is(p,cs.EventType.CLOSE,(()=>{T||(T=!0,$(Ht,`RPC '${t}' stream ${s} transport closed`),S.en(),this.hn(p))})),is(p,cs.EventType.ERROR,(N=>{T||(T=!0,Ie(Ht,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),S.en(new B(V.UNAVAILABLE,"The operation could not be completed")))})),is(p,cs.EventType.MESSAGE,(N=>{var L;if(!T){const U=N.data[0];H(!!U,16349);const W=U,rt=(W==null?void 0:W.error)||((L=W[0])==null?void 0:L.error);if(rt){$(Ht,`RPC '${t}' stream ${s} received error:`,rt);const ct=rt.status;let ft=(function(v){const E=Pt[v];if(E!==void 0)return G2(E)})(ct),vt=rt.message;ct==="NOT_FOUND"&&vt.includes("database")&&vt.includes("does not exist")&&vt.includes(this.databaseId.database)&&Ie(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ft===void 0&&(ft=V.INTERNAL,vt="Unknown error status: "+ct+" with message "+rt.message),T=!0,S.en(new B(ft,vt)),p.close()}else $(Ht,`RPC '${t}' stream ${s} received:`,U),S.tn(U)}})),Ar.rn(),setTimeout((()=>{S.Xt()}),0),S}terminate(){this.nn.forEach((t=>t.close())),this.nn=[]}En(t){this.nn.push(t)}hn(t){this.nn=this.nn.filter((e=>e===t))}kt(t,e,r){super.kt(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return d2()}}/**
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
 */function L3(n){return new Ar(n)}Ar.sn=!1;class a6{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Tn=t,this.timerId=e,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(t){this.cancel();const e=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,e-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),t()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
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
 */const Ml="PersistentStream";class u6{constructor(t,e,r,s,i,o,u,c){this.Tn=t,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new a6(t,e)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(t){this.Un(),this.stream.send(t)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(t,e){this.Un(),this.kn(),this.xn.cancel(),this.bn++,t!==4?this.xn.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(Xe(e.toString()),Xe("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ht(e)}qn(){}auth(){this.state=1;const t=this.$n(this.bn),e=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===e&&this.Kn(r,s)}),(r=>{t((()=>{const s=new B(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(t,e){const r=this.$n(this.bn);this.stream=this.Qn(t,e),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(t){return $(Ml,`close with error: ${t}`),this.stream=null,this.close(4,t)}$n(t){return e=>{this.Tn.enqueueAndForget((()=>this.bn===t?e():($(Ml,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class M3 extends u6{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}Qn(t,e){return this.connection.cn("Listen",t,e)}Gn(t){return this.onNext(t)}onNext(t){this.xn.reset();const e=y3(this.serializer,t),r=(function(i){if(!("targetChange"in i))return J.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?Ve(o.readTime):J.min()})(t);return this.listener.zn(e,r)}jn(t){const e={};e.database=Wa(this.serializer),e.addTarget=(function(i,o){let u;const c=o.target;if(u=qn(c)?{pipelineQuery:C3(i,c)}:H2(c)?{documents:I3(i,c)}:{query:A3(i,c).yt},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=X2(i,o.resumeToken);const h=Ga(i,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(J.min())>0){u.readTime=oo(i,o.snapshotVersion.toTimestamp());const h=Ga(i,o.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,t);const r=R3(this.serializer,t);r&&(e.labels=r),this.Bn(e)}Hn(t){const e={};e.database=Wa(this.serializer),e.removeTarget=t,this.Bn(e)}}class U3 extends u6{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(t,e){return this.connection.cn("Write",t,e)}Gn(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.Zn()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.xn.reset();const e=w3(t.writeResults,t.commitTime),r=Ve(t.commitTime);return this.listener.Xn(r,e)}er(){const t={};t.database=Wa(this.serializer),this.Bn(t)}Yn(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>T3(this.serializer,r)))};this.Bn(e)}}/**
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
 */class F3{}class B3 extends F3{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new B(V.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(t,e,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Bt(t,za(e,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new B(V.UNKNOWN,i.toString())}))}$t(t,e,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,u])=>this.connection.$t(t,za(e,r),s,o,u,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(V.UNKNOWN,o.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function $3(n,t,e,r){return new B3(n,t,e,r)}/**
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
 */const q3="ComponentProvider",Ul=new Map;function H3(n,t,e,r,s){return new O4(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,o6(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
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
 */const Fl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},c6=41943040;class ne{static withCacheSize(t){return new ne(t,ne.DEFAULT_COLLECTION_PERCENTILE,ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}ne.DEFAULT_COLLECTION_PERCENTILE=10,ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ne.DEFAULT=new ne(c6,ne.DEFAULT_COLLECTION_PERCENTILE,ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ne.DISABLED=new ne(-1,0,0);/**
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
 */const Bl="LruGarbageCollector",j3=1048576;function $l([n,t],[e,r]){const s=it(n,e);return s===0?it(t,r):s}class G3{constructor(t){this.rr=t,this.buffer=new Ot($l),this.ir=0}sr(){return++this.ir}_r(t){const e=[t,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();$l(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class z3{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(t){$(Bl,`Garbage collection scheduled in ${t}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Lr(e)?$(Bl,"Ignoring IndexedDB error during garbage collection: ",e):await xr(e)}await this.ur(3e5)}))}}class W3{constructor(t,e){this.cr=t,this.params=e}calculateTargetCount(t,e){return this.cr.lr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return x.resolve(Ao.ce);const r=new G3(e);return this.cr.forEachTarget(t,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(t,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.cr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.cr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(Fl)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Fl):this.hr(t,e)))}getCacheSize(t){return this.cr.getCacheSize(t)}hr(t,e){let r,s,i,o,u,c,h;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((g=>(g>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,o=Date.now(),this.nthSequenceNumber(t,s)))).next((g=>(r=g,u=Date.now(),this.removeTargets(t,r,e)))).next((g=>(i=g,c=Date.now(),this.removeOrphanedDocuments(t,r)))).next((g=>(h=Date.now(),gr()<=ot.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(u-o)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${g} documents in `+(h-c)+`ms
Total Duration: ${h-p}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g}))))}}function K3(n,t){return new W3(n,t)}/**
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
 */const l6="firestore.googleapis.com",ql=!0;class Hl{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new B(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=l6,this.ssl=ql}else this.host=t.host,this.ssl=t.ssl??ql;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=c6;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<j3)throw new B(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}E4("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=o6(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Do{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new B(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new u4;switch(r.type){case"firstParty":return new f4(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new B(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=Ul.get(e);r&&($(q3,"Removing Datastore"),Ul.delete(e),r.terminate())})(this),Promise.resolve()}}function Y3(n,t,e,r={}){var h;n=De(n,Do);const s=sr(t),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},u=`${t}:${e}`;s&&r1(`https://${u}`),i.host!==l6&&i.host!==u&&Ie("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:r};if(!Qn(c,o)&&(n._setSettings(c),r.mockUserToken)){let p,g;if(typeof r.mockUserToken=="string")p=r.mockUserToken,g=zt.MOCK_USER;else{p=wh(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new B(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new zt(T)}n._authCredentials=new c4(new m2(p,g))}}/**
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
 */class cr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new cr(this.firestore,t,this._query)}}class Tt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new wn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Tt(this.firestore,t,this._key)}toJSON(){return{type:Tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(Xs(e,Tt._jsonSchema))return new Tt(t,r||null,new G(lt.fromString(e.referencePath)))}}Tt._jsonSchemaVersion="firestore/documentReference/1.0",Tt._jsonSchema={type:Nt("string",Tt._jsonSchemaVersion),referencePath:Nt("string")};class wn extends cr{constructor(t,e,r){super(t,e,bo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Tt(this.firestore,null,new G(t))}withConverter(t){return new wn(this.firestore,t,this._path)}}function S5(n,t,...e){if(n=wt(n),_2("collection","path",t),n instanceof Do){const r=lt.fromString(t,...e);return pl(r),new wn(n,null,r)}{if(!(n instanceof Tt||n instanceof wn))throw new B(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(lt.fromString(t,...e));return pl(r),new wn(n.firestore,null,r)}}function P5(n,t,...e){if(n=wt(n),arguments.length===1&&(t=_1.newId()),_2("doc","path",t),n instanceof Do){const r=lt.fromString(t,...e);return dl(r),new Tt(n,null,new G(r))}{if(!(n instanceof Tt||n instanceof wn))throw new B(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(lt.fromString(t,...e));return dl(r),new Tt(n.firestore,n instanceof wn?n.converter:null,new G(r))}}/**
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
 */class ie{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:ie._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Xs(t,ie._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new ie(t.vectorValues);throw new B(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ie._jsonSchemaVersion="firestore/vectorValue/1.0",ie._jsonSchema={type:Nt("string",ie._jsonSchemaVersion),vectorValues:Nt("object")};/**
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
 */const Q3=/^__.*__$/;class X3{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new ar(t,this.data,this.fieldMask,e,this.fieldTransforms):new Zs(t,this.data,e,this.fieldTransforms)}}function h6(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{dataSource:n})}}class P1{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new P1({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return uo(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(h6(this.dataSource)&&Q3.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class J3{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Oo(t)}createContext(t,e,r,s=!1){return new P1({dataSource:t,methodName:e,targetDoc:r,path:xt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function f6(n){const t=n._freezeSettings(),e=Oo(n._databaseId);return new J3(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Z3(n,t,e,r,s,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,t,e,s);g6("Data must be an object, but it was:",o,r);const u=d6(r,o);let c,h;if(i.merge)c=new Te(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const g of i.mergeFields){const T=ri(t,g,e);if(!o.contains(T))throw new B(V.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);r9(p,T)||p.push(T)}c=new Te(p),h=o.fieldTransforms.filter((g=>c.covers(g.field)))}else c=null,h=o.fieldTransforms;return new X3(new he(u),c,h)}class b1 extends S1{_toFieldTransform(t){return new M4(t.path,new Vs)}isEqual(t){return t instanceof b1}}function t9(n,t,e,r=!1){return Nr(e,n.createContext(r?4:3,t))}function Nr(n,t,e){if(p6(n=wt(n)))return g6("Unsupported field value:",t,n),d6(n,t);if(n instanceof S1)return(function(s,i){if(!h6(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return(function(s,i){const o=[];let u=0;for(const c of s){let h=Nr(c,i.childContextForArray(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}})(n,t)}return(function(s,i,o){if((s=wt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return T1(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const u=gt.fromDate(s);return{timestampValue:oo(i.serializer,u)}}if(s instanceof gt){const u=new gt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:oo(i.serializer,u)}}if(s instanceof xe)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof ge)return{bytesValue:X2(i.serializer,s._byteString)};if(s instanceof Tt){const u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:R1(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof ie)return(function(c,h){const p=c instanceof ie?c.toArray():c;return{mapValue:{fields:{[R2]:{stringValue:C2},[Ds]:{arrayValue:{values:p.map((T=>{if(typeof T!="number")throw h.createError("VectorValues must only contain numeric values.");return Co(h.serializer,T)}))}}}}}})(s,i);if(s6(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Io(s)}`)})(n,t,e)}function d6(n,t){const e={};return y2(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):or(n,((r,s)=>{const i=Nr(s,t.childContextForField(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function p6(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof gt||n instanceof xe||n instanceof ge||n instanceof Tt||n instanceof S1||n instanceof ie||s6(n))}function g6(n,t,e){if(!p6(e)||!Qs(e)){const r=Io(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function ri(n,t,e){if((t=wt(t))instanceof C1)return t._internalPath;if(typeof t=="string")return n9(n,t);throw uo("Field path arguments must be of type string or ",n,!1,void 0,e)}const e9=new RegExp("[~\\*/\\[\\]]");function n9(n,t,e){if(t.search(e9)>=0)throw uo(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new C1(...t.split("."))._internalPath}catch{throw uo(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function uo(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new B(V.INVALID_ARGUMENT,u+n+c)}function r9(n,t){return n.some((e=>e.isEqual(t)))}function m6(n){return typeof n._readUserData=="function"}/**
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
 */class Yt{constructor(t){this.optionDefinitions=t}_getKnownOptions(t,e){const r=he.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in t){const o=t[s];let u;i.nestedOptions&&Qs(o)?u={mapValue:{fields:new Yt(i.nestedOptions).getOptionsProto(e,o)}}:o&&(u=Nr(o,e)??void 0),u&&r.set(xt.fromServerFormat(i.serverName),u)}}return r}getOptionsProto(t,e,r){const s=this._getKnownOptions(e,t);if(r){const i=new Map(b4(r,((o,u)=>[xt.fromServerFormat(u),o!==void 0?Nr(o,t):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
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
 */function s9(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(e){return typeof e=="object"&&e!==null&&"seconds"in e&&(e.seconds===null||typeof e.seconds=="number"||typeof e.seconds=="string")&&"nanos"in e&&(e.nanos===null||typeof e.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(e){return typeof e=="object"&&e!==null&&"latitude"in e&&(e.latitude===null||typeof e.latitude=="number")&&"longitude"in e&&(e.longitude===null||typeof e.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("values"in e)||e.values!==null&&!Array.isArray(e.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("fields"in e)||e.fields!==null&&!Qs(e.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("name"in e)||e.name!==null&&typeof e.name!="string"||!("args"in e)||e.args!==null&&!Array.isArray(e.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("stages"in e)||e.stages!==null&&!Array.isArray(e.stages))})(n.pipelineValue)))}function b5(){return new b1("serverTimestamp")}function i9(n){return new ie(n)}/**
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
 */function M(n){let t;return n instanceof lr?n:(t=Qs(n)?l9(n):n instanceof Array?h9(n):_6(n,void 0),t)}function va(n){if(n instanceof lr)return n;if(n instanceof ie)return Fs(n);if(Array.isArray(n))return Fs(i9(n));throw new Error("Unsupported value: "+typeof n)}function N1(n){return C4(n)?$i(n):M(n)}class lr{constructor(){this._protoValueType="ProtoValue"}add(t){return new D("add",[this,M(t)],"add")}asBoolean(){if(this instanceof Nn)return this;if(this instanceof Ur)return new y6(this);if(this instanceof Mr)return new c9(this);if(this instanceof D)return new E6(this);throw new B("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(t){return new D("subtract",[this,M(t)],"subtract")}multiply(t){return new D("multiply",[this,M(t)],"multiply")}divide(t){return new D("divide",[this,M(t)],"divide")}mod(t){return new D("mod",[this,M(t)],"mod")}equal(t){return new D("equal",[this,M(t)],"equal").asBoolean()}notEqual(t){return new D("not_equal",[this,M(t)],"notEqual").asBoolean()}lessThan(t){return new D("less_than",[this,M(t)],"lessThan").asBoolean()}lessThanOrEqual(t){return new D("less_than_or_equal",[this,M(t)],"lessThanOrEqual").asBoolean()}greaterThan(t){return new D("greater_than",[this,M(t)],"greaterThan").asBoolean()}greaterThanOrEqual(t){return new D("greater_than_or_equal",[this,M(t)],"greaterThanOrEqual").asBoolean()}arrayConcat(t,...e){const r=[t,...e].map((s=>M(s)));return new D("array_concat",[this,...r],"arrayConcat")}arrayContains(t){return new D("array_contains",[this,M(t)],"arrayContains").asBoolean()}arrayContainsAll(t){const e=Array.isArray(t)?new hs(t.map(M),"arrayContainsAll"):t;return new D("array_contains_all",[this,e],"arrayContainsAll").asBoolean()}arrayContainsAny(t){const e=Array.isArray(t)?new hs(t.map(M),"arrayContainsAny"):t;return new D("array_contains_any",[this,e],"arrayContainsAny").asBoolean()}arrayReverse(){return new D("array_reverse",[this])}arrayLength(){return new D("array_length",[this],"arrayLength")}equalAny(t){const e=Array.isArray(t)?new hs(t.map(M),"equalAny"):t;return new D("equal_any",[this,e],"equalAny").asBoolean()}notEqualAny(t){const e=Array.isArray(t)?new hs(t.map(M),"notEqualAny"):t;return new D("not_equal_any",[this,e],"notEqualAny").asBoolean()}exists(){return new D("exists",[this],"exists").asBoolean()}charLength(){return new D("char_length",[this],"charLength")}like(t){return new D("like",[this,M(t)],"like").asBoolean()}regexContains(t){return new D("regex_contains",[this,M(t)],"regexContains").asBoolean()}regexFind(t){return new D("regex_find",[this,M(t)],"regexFind")}regexFindAll(t){return new D("regex_find_all",[this,M(t)],"regexFindAll")}regexMatch(t){return new D("regex_match",[this,M(t)],"regexMatch").asBoolean()}stringContains(t){return new D("string_contains",[this,M(t)],"stringContains").asBoolean()}startsWith(t){return new D("starts_with",[this,M(t)],"startsWith").asBoolean()}endsWith(t){return new D("ends_with",[this,M(t)],"endsWith").asBoolean()}toLower(){return new D("to_lower",[this],"toLower")}toUpper(){return new D("to_upper",[this],"toUpper")}trim(t){const e=[this];return t&&e.push(M(t)),new D("trim",e,"trim")}ltrim(t){const e=[this];return t&&e.push(M(t)),new D("ltrim",e,"ltrim")}rtrim(t){const e=[this];return t&&e.push(M(t)),new D("rtrim",e,"rtrim")}type(){return new D("type",[this])}isType(t){return new D("is_type",[this,Fs(t)],"isType").asBoolean()}stringConcat(t,...e){const r=[t,...e].map(M);return new D("string_concat",[this,...r],"stringConcat")}stringIndexOf(t){return new D("string_index_of",[this,M(t)],"stringIndexOf")}stringRepeat(t){return new D("string_repeat",[this,M(t)],"stringRepeat")}stringReplaceAll(t,e){return new D("string_replace_all",[this,M(t),M(e)],"stringReplaceAll")}stringReplaceOne(t,e){return new D("string_replace_one",[this,M(t),M(e)],"stringReplaceOne")}concat(t,...e){const r=[t,...e].map(M);return new D("concat",[this,...r],"concat")}reverse(){return new D("reverse",[this],"reverse")}arrayFilter(t,e){return new D("array_filter",[this,M(t),e],"arrayFilter")}arrayTransform(t,e){return new D("array_transform",[this,M(t),e],"arrayTransform")}arrayTransformWithIndex(t,e,r){return new D("array_transform",[this,M(t),M(e),r],"arrayTransformWithIndex")}arraySlice(t,e){const r=[this,M(t)];return e!==void 0&&r.push(M(e)),new D("array_slice",r,"arraySlice")}arrayFirst(){return new D("array_first",[this],"arrayFirst")}arrayFirstN(t){return new D("array_first_n",[this,M(t)],"arrayFirstN")}arrayLast(){return new D("array_last",[this],"arrayLast")}arrayLastN(t){return new D("array_last_n",[this,M(t)],"arrayLastN")}arrayMaximum(){return new D("maximum",[this],"arrayMaximum")}arrayMaximumN(t){return new D("maximum_n",[this,M(t)],"arrayMaximumN")}arrayMinimum(){return new D("minimum",[this],"arrayMinimum")}arrayMinimumN(t){return new D("minimum_n",[this,M(t)],"arrayMinimumN")}arrayIndexOf(t){return new D("array_index_of",[this,M(t),M("first")],"arrayIndexOf")}arrayLastIndexOf(t){return new D("array_index_of",[this,M(t),M("last")],"arrayLastIndexOf")}arrayIndexOfAll(t){return new D("array_index_of_all",[this,M(t)],"arrayIndexOfAll")}byteLength(){return new D("byte_length",[this],"byteLength")}ceil(){return new D("ceil",[this])}floor(){return new D("floor",[this])}abs(){return new D("abs",[this])}exp(){return new D("exp",[this])}mapGet(t){return new D("map_get",[this,Fs(t)],"mapGet")}mapSet(t,e,...r){const s=[this,M(t),M(e),...r.map(M)];return new D("map_set",s,"mapSet")}mapKeys(){return new D("map_keys",[this],"mapKeys")}mapValues(){return new D("map_values",[this],"mapValues")}mapEntries(){return new D("map_entries",[this],"mapEntries")}getField(t){return new D("get_field",[this,M(t)],"get_field")}count(){return le._create("count",[this],"count")}sum(){return le._create("sum",[this],"sum")}average(){return le._create("average",[this],"average")}minimum(){return le._create("minimum",[this],"minimum")}maximum(){return le._create("maximum",[this],"maximum")}first(){return le._create("first",[this],"first")}last(){return le._create("last",[this],"last")}arrayAgg(){return le._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return le._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return le._create("count_distinct",[this],"countDistinct")}logicalMaximum(t,...e){const r=[t,...e];return new D("maximum",[this,...r.map(M)],"logicalMaximum")}logicalMinimum(t,...e){const r=[t,...e];return new D("minimum",[this,...r.map(M)],"minimum")}vectorLength(){return new D("vector_length",[this],"vectorLength")}cosineDistance(t){return new D("cosine_distance",[this,va(t)],"cosineDistance")}dotProduct(t){return new D("dot_product",[this,va(t)],"dotProduct")}euclideanDistance(t){return new D("euclidean_distance",[this,va(t)],"euclideanDistance")}unixMicrosToTimestamp(){return new D("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new D("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new D("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new D("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new D("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new D("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(t,e){return new D("timestamp_add",[this,M(t),M(e)],"timestampAdd")}timestampSubtract(t,e){return new D("timestamp_subtract",[this,M(t),M(e)],"timestampSubtract")}timestampDiff(t,e){return new D("timestamp_diff",[this,N1(t),M(e)],"timestampDiff")}timestampExtract(t,e){const r=[this,M(t)];return e&&r.push(M(e)),new D("timestamp_extract",r,"timestampExtract")}documentId(){return new D("document_id",[this],"documentId")}parent(){return new D("parent",[this],"parent")}substring(t,e){const r=M(t);return new D("substring",e===void 0?[this,r]:[this,r,M(e)],"substring")}arrayGet(t){return new D("array_get",[this,M(t)],"arrayGet")}isError(){return new D("is_error",[this],"isError").asBoolean()}ifError(t){const e=new D("if_error",[this,M(t)],"ifError");return t instanceof Nn?e.asBoolean():e}isAbsent(){return new D("is_absent",[this],"isAbsent").asBoolean()}mapRemove(t){return new D("map_remove",[this,M(t)],"mapRemove")}mapMerge(t,...e){const r=M(t),s=e.map(M);return new D("map_merge",[this,r,...s],"mapMerge")}pow(t){return new D("pow",[this,M(t)])}trunc(t){return t===void 0?new D("trunc",[this]):new D("trunc",[this,M(t)],"trunc")}round(t){return t===void 0?new D("round",[this]):new D("round",[this,M(t)],"round")}collectionId(){return new D("collection_id",[this])}length(){return new D("length",[this])}ln(){return new D("ln",[this])}sqrt(){return new D("sqrt",[this])}stringReverse(){return new D("string_reverse",[this])}ifAbsent(t){return new D("if_absent",[this,M(t)],"ifAbsent")}ifNull(t){return new D("if_null",[this,M(t)],"ifNull")}coalesce(t,...e){return new D("coalesce",[this,M(t),...e.map(M)],"coalesce")}join(t){return new D("join",[this,M(t)],"join")}log10(){return new D("log10",[this])}arraySum(){return new D("sum",[this])}split(t){return new D("split",[this,M(t)])}timestampTruncate(t,e){const r=[this,M(t)];return e&&r.push(M(e)),new D("timestamp_trunc",r)}ascending(){return f9(this)}descending(){return d9(this)}as(t){return new a9(this,t,"as")}}class le{constructor(t,e){this.name=t,this.params=e,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(t,e,r){const s=new le(t,e);return s._methodName=r,s}as(t){return new o9(this,t,"as")}_toProto(t){return{functionValue:{name:this.name,args:this.params.map((e=>e._toProto(t)))}}}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t)))}}class o9{constructor(t,e,r){this.aggregate=t,this.alias=e,this._methodName=r}_readUserData(t){this.aggregate._readUserData(t)}}class a9{constructor(t,e,r){this.expr=t,this.alias=e,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(t){this.expr._readUserData(t)}}class hs extends lr{constructor(t,e){super(),this.Rr=t,this._methodName=e,this.expressionType="ListOfExpressions"}_toProto(t){return{arrayValue:{values:this.Rr.map((e=>e._toProto(t)))}}}_readUserData(t){this.Rr.forEach((e=>e._readUserData(t)))}}class Mr extends lr{constructor(t,e){super(),this.fieldPath=t,this._methodName=e,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(t){return new D("geo_distance",[this,M(t)],"geoDistance")}_toProto(t){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(t){}}function $i(n){return u9(n,"field")}function u9(n,t){return new Mr(typeof n=="string"?Se===n?O3()._internalPath:ri("field",n):n._internalPath,t)}class Ur extends lr{constructor(t,e){super(),this.value=t,this._methodName=e,this.expressionType="Constant"}static _fromProto(t){const e=new Ur(t,void 0);return e._protoValue=t,e}_toProto(t){return H(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,s9(this._protoValue)||(this._protoValue=Nr(this.value,t))}}function Fs(n,t){return _6(n,"constant")}function _6(n,t){const e=new Ur(n,t);return typeof n=="boolean"?new y6(e):e}class D extends lr{constructor(t,e,r,s){super(),this.name=t,this.params=e,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Yt({})}_toProto(t){const e={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(t)))}};return this._optionsProto&&(e.functionValue.options=this._optionsProto),e}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(t,this._options))}}class Nn extends lr{get _methodName(){return this._expr._methodName}countIf(){return le._create("count_if",[this],"countIf")}not(){return new D("not",[this],"not").asBoolean()}conditional(t,e){return new D("conditional",[this,t,e],"conditional")}ifError(t){const e=M(t),r=new D("if_error",[this,e],"ifError");return e instanceof Nn?r.asBoolean():r}_toProto(t){return this._expr._toProto(t)}_readUserData(t){this._expr._readUserData(t)}}class E6 extends Nn{constructor(t){super(),this._expr=t,this.expressionType="Function"}}class y6 extends Nn{constructor(t){super(),this._expr=t,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class c9 extends Nn{constructor(t){super(),this._expr=t,this.expressionType="Field"}}function l9(n,t){const e=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];e.push(Fs(r)),e.push(M(s))}return new D("map",e,"map")}function h9(n){return(function(e,r){return new D("array",e.map((s=>M(s))),r)})(n,"array")}function f9(n){return new T6(N1(n),"ascending","ascending")}function d9(n){return new T6(N1(n),"descending","descending")}class T6{constructor(t,e,r){this.expr=t,this.direction=e,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(t){return{mapValue:{fields:{direction:i6(this.direction),expression:this.expr._toProto(t)}}}}_readUserData(t){this.expr._readUserData(t)}}/**
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
 */class pe{constructor(t){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=t}_readUserData(t){this.optionsProto=this._optionsUtil.getOptionsProto(t,this.knownOptions,this.rawOptions)}_toProto(t){return{name:this._name,options:this.optionsProto}}}class w6 extends pe{get _name(){return"add_fields"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.fields=t}_toProto(t){return{...super._toProto(t),args:[Us(t,this.fields)]}}_readUserData(t){super._readUserData(t),On(this.fields,t)}}class I6 extends pe{get _name(){return"aggregate"}get _optionsUtil(){return new Yt({})}constructor(t,e,r){super(r),this.groups=t,this.accumulators=e}_toProto(t){return{...super._toProto(t),args:[Us(t,this.accumulators),Us(t,this.groups)]}}_readUserData(t){super._readUserData(t),On(this.groups,t),On(this.accumulators,t)}}class A6 extends pe{get _name(){return"distinct"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.groups=t}_toProto(t){return{...super._toProto(t),args:[Us(t,this.groups)]}}_readUserData(t){super._readUserData(t),On(this.groups,t)}}class ko extends pe{get _name(){return"collection"}get _optionsUtil(){return new Yt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.Vr=t.startsWith("/")?t:"/"+t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:this.Vr}]}}_readUserData(t){super._readUserData(t)}}class Vo extends pe{get _name(){return"collection_group"}get _optionsUtil(){return new Yt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.collectionId=t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(t){super._readUserData(t)}}class O1 extends pe{get _name(){return"database"}get _optionsUtil(){return new Yt({})}_toProto(t){return{...super._toProto(t)}}_readUserData(t){super._readUserData(t)}}class D1 extends pe{get _name(){return"documents"}get _optionsUtil(){return new Yt({})}constructor(t,e){if(super(e),!t||t.length===0)throw new B(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=t.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new B(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(t){return{...super._toProto(t),args:this.dr.map((e=>({referenceValue:e})))}}_readUserData(t){super._readUserData(t)}}class xo extends pe{get _name(){return"where"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.condition=t}_toProto(t){return{...super._toProto(t),args:[this.condition._toProto(t)]}}_readUserData(t){super._readUserData(t),On(this.condition,t)}}class er extends pe{get _name(){return"limit"}get _optionsUtil(){return new Yt({})}constructor(t,e){H(!isNaN(t)&&t!==1/0&&t!==-1/0,34860),super(e),this.limit=t}_toProto(t){return{...super._toProto(t),args:[T1(t,this.limit)]}}}class jl extends pe{get _name(){return"offset"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.offset=t}_toProto(t){return{...super._toProto(t),args:[T1(t,this.offset)]}}}class p9 extends pe{get _name(){return"select"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.selections=t}_toProto(t){return{...super._toProto(t),args:[Us(t,this.selections)]}}_readUserData(t){super._readUserData(t),On(this.selections,t)}}class He extends pe{get _name(){return"sort"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.orderings=t}_toProto(t){return{...super._toProto(t),args:this.orderings.map((e=>e._toProto(t)))}}_readUserData(t){super._readUserData(t),On(this.orderings,t)}}class k1 extends pe{get _name(){return"replace_with"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.map=t}_toProto(t){return{...super._toProto(t),args:[this.map._toProto(t),i6(k1.pr)]}}_readUserData(t){super._readUserData(t),On(this.map,t)}}k1.pr="full_replace";function On(n,t){return m6(n)?n._readUserData(t):Array.isArray(n)?n.forEach((e=>e._readUserData(t))):n instanceof Map?n.forEach((e=>e._readUserData(t))):Object.values(n).forEach((e=>e._readUserData(t))),n}// Copyright 2024 Google LLC* @license
class te{constructor(t,e,r){this.serializer=t,this.stages=e,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Lo(this)}getPipelineCollectionGroup(){return V1(this)}getPipelineCollectionId(){return g9(this)}getPipelineDocuments(){return Ya(this)}getPipelineFlavor(){return(function(e){let r="exact";return e.stages.forEach(((s,i)=>{s._name!==A6.name&&s._name!==I6.name||(r="keyless"),s._name===p9.name&&r==="exact"&&(r="augmented"),s._name===w6.name&&i<e.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return In(this)}}function In(n){const t=n.stages[0];return t instanceof ko||t instanceof Vo||t instanceof O1||t instanceof D1?t._name:"unknown"}function Lo(n){if(In(n)==="collection")return n.stages[0].Vr}function V1(n){if(In(n)==="collection_group")return n.stages[0].collectionId}function g9(n){switch(In(n)){case"collection":return lt.fromString(Lo(n)).lastSegment();case"collection_group":return V1(n);default:return}}function Ya(n){if(In(n)==="documents")return n.stages[0].dr}class ws{constructor(t,e,r,s){this._db=t,this.userDataReader=e,this._userDataWriter=r,this.stages=s}wr(t,e){const r=this.userDataReader.createContext(3,t);return m6(e)?e._readUserData(r):Array.isArray(e)?e.forEach((s=>s._readUserData(r))):e.forEach((s=>s._readUserData(r))),e}where(t){const e=this.stages.map((r=>r));return this.wr("where",t),e.push(new xo(t,{})),new ws(this._db,this.userDataReader,this._userDataWriter,e)}limit(t){const e=this.stages.map((r=>r));return e.push(new er(t,{})),new ws(this._db,this.userDataReader,this._userDataWriter,e)}sort(t,...e){const r=this.stages.map((s=>s));return"orderings"in t?r.push(new He(this.wr("sort",t.orderings),{})):r.push(new He(this.wr("sort",[t,...e]),{})),new ws(this._db,this.userDataReader,this._userDataWriter,r)}br(t){return{pipeline:{stages:this.stages.map((e=>e._toProto(t)))}}}}// Copyright 2024 Google LLC* @license
class I{constructor(t,e){this.type=t,this.value=e}static vr(){return new I("ERROR",void 0)}static Sr(){return new I("UNSET",void 0)}static Dr(){return new I("NULL",Sr)}static newValue(t){return fe(t)?new I("NULL",Sr):(function(r){return!!r&&"booleanValue"in r})(t)?new I("BOOLEAN",t):Pe(t)?new I("INT",t):jn(t)?new I("DOUBLE",t):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(t)?new I("TIMESTAMP",t):(function(r){return!!r&&"stringValue"in r})(t)?new I("STRING",t):(function(r){return!!r&&"bytesValue"in r})(t)?new I("BYTES",t):t.referenceValue?new I("REFERENCE",t):t.geoPointValue?new I("GEO_POINT",t):br(t)?new I("ARRAY",t):to(t)?new I("VECTOR",t):Gn(t)?new I("MAP",t):new I("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Is(n){if(!n.Cr())return n.value}function v6(n){return n instanceof Nn?n._expr:n}function K(n){if((n=v6(n))instanceof Mr)return new m9(n);if(n instanceof Ur)return new _9(n);if(n instanceof hs)return new E9(n);if(n instanceof D){if(n.name==="add")return new w9(n);if(n.name==="subtract")return new I9(n);if(n.name==="multiply")return new A9(n);if(n.name==="divide")return new v9(n);if(n.name==="mod")return new R9(n);if(n.name==="and")return new C9(n);if(n.name==="equal")return new U9(n);if(n.name==="not_equal")return new F9(n);if(n.name==="less_than")return new B9(n);if(n.name==="less_than_or_equal")return new $9(n);if(n.name==="greater_than")return new q9(n);if(n.name==="greater_than_or_equal")return new H9(n);if(n.name==="array_concat")return new j9(n);if(n.name==="array_reverse")return new G9(n);if(n.name==="array_contains")return new z9(n);if(n.name==="array_contains_all")return new W9(n);if(n.name==="array_contains_any")return new K9(n);if(n.name==="array_length")return new Y9(n);if(n.name==="array_element")return new Q9(n);if(n.name==="equal_any")return new R6(n);if(n.name==="not_equal_any")return new P9(n);if(n.name==="is_nan")return new b9(n);if(n.name==="is_not_nan")return new N9(n);if(n.name==="is_null")return new O9(n);if(n.name==="is_not_null")return new D9(n);if(n.name==="is_error")return new k9(n);if(n.name==="exists")return new V9(n);if(n.name==="not")return new Mo(n);if(n.name==="or")return new S9(n);if(n.name==="xor")return new x1(n);if(n.name==="conditional")return new x9(n);if(n.name==="maximum")return new L9(n);if(n.name==="minimum")return new M9(n);if(n.name==="reverse")return new X9(n);if(n.name==="replace_first")return new J9(n);if(n.name==="replace_all")return new Z9(n);if(n.name==="char_length")return new t8(n);if(n.name==="byte_length")return new e8(n);if(n.name==="like")return new n8(n);if(n.name==="regex_contains")return new r8(n);if(n.name==="regex_match")return new s8(n);if(n.name==="string_contains")return new i8(n);if(n.name==="starts_with")return new o8(n);if(n.name==="ends_with")return new a8(n);if(n.name==="to_lower")return new u8(n);if(n.name==="to_upper")return new c8(n);if(n.name==="trim")return new l8(n);if(n.name==="string_concat")return new h8(n);if(n.name==="map_get")return new f8(n);if(n.name==="cosine_distance")return new d8(n);if(n.name==="dot_product")return new p8(n);if(n.name==="euclidean_distance")return new g8(n);if(n.name==="vector_length")return new m8(n);if(n.name==="unix_micros_to_timestamp")return new w8(n);if(n.name==="timestamp_to_unix_micros")return new v8(n);if(n.name==="unix_millis_to_timestamp")return new I8(n);if(n.name==="timestamp_to_unix_millis")return new R8(n);if(n.name==="unix_seconds_to_timestamp")return new A8(n);if(n.name==="timestamp_to_unix_seconds")return new C8(n);if(n.name==="timestamp_add")return new S8(n);if(n.name==="timestamp_subtract")return new P8(n)}throw new Error(`Unknown Expr : ${n}`)}class m9{constructor(t){this.expr=t}evaluate(t,e){if(this.expr.fieldName===Se)return I.newValue({referenceValue:ao(t.serializer,e.key)});if(this.expr.fieldName==="__update_time__")return I.newValue({timestampValue:Bi(t.serializer,e.version)});if(this.expr.fieldName==="__create_time__")return I.newValue({timestampValue:Bi(t.serializer,e.createTime)});const r=e.data.field(this.expr._fieldPath);return r?Ro(r)?I.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Bi(i.serializer,J.fromTimestamp(Cr(o)))};if(i.serverTimestampBehavior==="previous"){const u=Js(o);if(u)return u}return{nullValue:"NULL_VALUE"}})(t,r)):I.newValue(r):I.Sr()}}class _9{constructor(t){this.expr=t}evaluate(t,e){return I.newValue(this.expr._getValue())}}class E9{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.Rr.map((s=>K(s).evaluate(t,e)));return r.some((s=>s.Cr()))?I.vr():I.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function $t(n){return jn(n)?Number(n.doubleValue):Number(n.integerValue)}function Le(n){return BigInt(n.integerValue)}const y9=BigInt("0x7fffffffffffffff"),T9=-BigInt("0x8000000000000000");class si{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length>=2,24778);const r=K(this.expr.params[0]).evaluate(t,e),s=K(this.expr.params[1]).evaluate(t,e);let i=this.Or(r,s);for(const o of this.expr.params.slice(2)){const u=K(o).evaluate(t,e);i=this.Or(i,u)}return i}Or(t,e){if(t.Cr()||e.Cr())return I.vr();if(t.Fr()||e.Fr())return I.Dr();const r=t.value,s=e.value;if(!jn(r)&&!Pe(r)||!jn(s)&&!Pe(s))return I.vr();if(jn(r)||jn(s)){const i=this.Mr(r,s);return i?I.newValue(i):I.vr()}if(Pe(r)&&Pe(s)){const i=this.Nr(r,s);return i===void 0?I.vr():typeof i=="number"?I.newValue({doubleValue:i}):i<T9||i>y9?I.vr():I.newValue({integerValue:`${i}`})}return I.vr()}}function Je(n,t){return kt(n)!==kt(t)?"TYPE_MISMATCH":ue(n)||ue(t)?"NOT_EQ":fe(n)&&fe(t)?"EQ":fe(n)||fe(t)?"NULL":br(n)&&br(t)?(function(r,s){var o,u,c;if(((o=r.values)==null?void 0:o.length)!==((u=s.values)==null?void 0:u.length))return"NOT_EQ";let i=!1;for(let h=0;h<(((c=r.values)==null?void 0:c.length)??0);h++){const p=r.values[h],g=s.values[h];switch(Je(p,g)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:z(44609,{Lr:p,Br:g})}}return i?"NULL":"EQ"})(n.arrayValue,t.arrayValue):to(n)&&to(t)||Gn(n)&&Gn(t)?(function(r,s){const i=r.fields||{},o=s.fields||{};if(Ji(i)!==Ji(o))return"NOT_EQ";let u=!1;for(const c in i)if(i.hasOwnProperty(c)){if(o[c]===void 0)return"NOT_EQ";switch(Je(i[c],o[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"})(n.mapValue,t.mapValue):(function(r,s){return _e(r,s,{Te:!1,Ee:!0,he:!0})})(n,t)?"EQ":"NOT_EQ"}class w9 extends si{Nr(t,e){return Le(t)+Le(e)}Mr(t,e){return{doubleValue:$t(t)+$t(e)}}}class I9 extends si{constructor(t){super(t),this.expr=t}Nr(t,e){return Le(t)-Le(e)}Mr(t,e){return{doubleValue:$t(t)-$t(e)}}}class A9 extends si{constructor(t){super(t),this.expr=t}Nr(t,e){return Le(t)*Le(e)}Mr(t,e){return{doubleValue:$t(t)*$t(e)}}}class v9 extends si{constructor(t){super(t),this.expr=t}Nr(t,e){const r=Le(e);if(r!==BigInt(0))return Le(t)/r}Mr(t,e){const r=$t(e);return r===0?{doubleValue:Ns(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:$t(t)/r}}}class R9 extends si{constructor(t){super(t),this.expr=t}Nr(t,e){const r=Le(e);if(r!==BigInt(0))return Le(t)%r}Mr(t,e){const r=$t(e);if(r!==0)return{doubleValue:$t(t)%r}}}class C9{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const u=K(o).evaluate(t,e);switch(u.type){case"BOOLEAN":if(!((i=u.value)!=null&&i.booleanValue))return I.newValue(Ft);break;case"NULL":s=!0;break;default:r=!0}}return r?I.vr():s?I.Dr():I.newValue(oe)}}class Mo{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,9634);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return I.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return I.Dr();default:return I.vr()}}}class S9{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const u=K(o).evaluate(t,e);switch(u.type){case"BOOLEAN":if((i=u.value)!=null&&i.booleanValue)return I.newValue(oe);break;case"NULL":s=!0;break;default:r=!0}}return r?I.vr():s?I.Dr():I.newValue(Ft)}}class x1{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const u=K(o).evaluate(t,e);switch(u.type){case"BOOLEAN":r=x1.xor(r,!!((i=u.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return I.vr()}}return s?I.Dr():I.newValue({booleanValue:r})}static xor(t,e){return(t||e)&&!(t&&e)}}class R6{constructor(t){this.expr=t}evaluate(t,e){var o,u;H(this.expr.params.length===2,55094);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();for(const c of((u=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:u.values)??[])switch(fe(s.value)&&fe(c)?"EQ":Je(s.value,c)){case"EQ":return I.newValue(oe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:z(44608,{value:s.value,candidate:c})}return r?I.Dr():I.newValue(Ft)}}class P9{constructor(t){this.expr=t}evaluate(t,e){return new Mo(new D("not",[new D("equal_any",this.expr.params)])).evaluate(t,e)}}class b9{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,23322);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return I.newValue(Ft);case"DOUBLE":return I.newValue({booleanValue:isNaN($t(r.value))});case"NULL":return I.Dr();default:return I.vr()}}}class N9{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,50406),new Mo(new D("not",[new D("is_nan",this.expr.params)])).evaluate(t,e)}}class O9{constructor(t){this.expr=t}evaluate(t,e){switch(H(this.expr.params.length===1,23123),K(this.expr.params[0]).evaluate(t,e).type){case"NULL":return I.newValue(oe);case"UNSET":case"ERROR":return I.vr();default:return I.newValue(Ft)}}}class D9{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,23167),new Mo(new D("not",[new D("is_null",this.expr.params)])).evaluate(t,e)}}class k9{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,5228),K(this.expr.params[0]).evaluate(t,e).type==="ERROR"?I.newValue(oe):I.newValue(Ft)}}class V9{constructor(t){this.expr=t}evaluate(t,e){switch(H(this.expr.params.length===1,6877),K(this.expr.params[0]).evaluate(t,e).type){case"ERROR":return I.vr();case"UNSET":return I.newValue(Ft);default:return I.newValue(oe)}}}class x9{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===3,11706);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?K(this.expr.params[1]).evaluate(t,e):K(this.expr.params[2]).evaluate(t,e);case"NULL":return K(this.expr.params[2]).evaluate(t,e);default:return I.vr()}}}class L9{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((i=>K(i).evaluate(t,e)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ae(i.value,s.value)>0?i:s}return s===void 0?I.Dr():s}}class M9{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((i=>K(i).evaluate(t,e)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ae(i.value,s.value)<0?i:s}return s===void 0?I.Dr():s}}class Fr{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"ERROR":case"UNSET":return I.vr()}const s=K(this.expr.params[1]).evaluate(t,e);switch(s.type){case"ERROR":case"UNSET":return I.vr()}return this.Ur(r,s)}}class U9 extends Fr{constructor(t){super(t),this.expr=t}Ur(t,e){if(t.Fr()&&e.Fr())return I.newValue(oe);if(t.Fr()||e.Fr()||ue(t.value)||ue(e.value)||kt(t.value)!==kt(e.value))return I.newValue(Ft);switch(Je(t.value,e.value)){case"EQ":return I.newValue(oe);case"NOT_EQ":return I.newValue(Ft);case"NULL":return I.Dr();default:z(44615,{left:t,right:e})}}}class F9 extends Fr{constructor(t){super(t),this.expr=t}Ur(t,e){switch(Je(t.value,e.value)){case"EQ":return I.newValue(Ft);case"NOT_EQ":case"TYPE_MISMATCH":return I.newValue(oe);case"NULL":return I.Dr();default:z(44614,{left:t,right:e})}}}class B9 extends Fr{constructor(t){super(t),this.expr=t}Ur(t,e){return kt(t.value)!==kt(e.value)||ue(t.value)||ue(e.value)?I.newValue(Ft):I.newValue({booleanValue:ae(t.value,e.value)<0})}}class $9 extends Fr{constructor(t){super(t),this.expr=t}Ur(t,e){return kt(t.value)!==kt(e.value)||ue(t.value)||ue(e.value)?I.newValue(Ft):Je(t.value,e.value)==="EQ"?I.newValue(oe):I.newValue({booleanValue:ae(t.value,e.value)<0})}}class q9 extends Fr{constructor(t){super(t),this.expr=t}Ur(t,e){return kt(t.value)!==kt(e.value)||ue(t.value)||ue(e.value)?I.newValue(Ft):I.newValue({booleanValue:ae(t.value,e.value)>0})}}class H9 extends Fr{constructor(t){super(t),this.expr=t}Ur(t,e){return kt(t.value)!==kt(e.value)||ue(t.value)||ue(e.value)?I.newValue(Ft):Je(t.value,e.value)==="EQ"?I.newValue(oe):I.newValue({booleanValue:ae(t.value,e.value)>0})}}class j9{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class G9{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,216);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return I.newValue({arrayValue:{values:[...i].reverse()}})}default:return I.vr()}}}class z9{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===2,52884),new R6(new D("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(t,e)}}class W9{constructor(t){this.expr=t}evaluate(t,e){var c,h,p,g;H(this.expr.params.length===2,1392);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=((h=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:h.values)??[],u=((g=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:g.values)??[];for(const T of o){let S=!1;r=!1;for(const N of u){switch(fe(T)&&fe(N)?"EQ":Je(T,N)){case"EQ":S=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:z(44613,{value:N,search:T})}if(S)break}if(!S)return I.newValue(Ft)}return I.newValue(oe)}}class K9{constructor(t){this.expr=t}evaluate(t,e){var c,h,p,g;H(this.expr.params.length===2,2680);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=((h=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:h.values)??[],u=((g=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:g.values)??[];for(const T of u)for(const S of o)switch(fe(T)&&fe(S)?"EQ":Je(T,S)){case"EQ":return I.newValue(oe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:z(44608,{value:T,search:S})}return r?I.Dr():I.newValue(Ft)}}class Y9{constructor(t){this.expr=t}evaluate(t,e){var s,i,o;H(this.expr.params.length===1,38605);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"ARRAY":return I.newValue({integerValue:`${((o=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return I.vr()}}}class Q9{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class X9{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,1508);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const u=Dt.fromBase64String(o).toUint8Array();return u.reverse(),I.newValue({bytesValue:Dt.fromUint8Array(u).toBase64()})}return I.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=r.value)==null?void 0:i.stringValue,u=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),c=Array.from(u,(h=>h.segment)).reverse();return I.newValue({stringValue:c.join("")})}default:return I.vr()}}}class J9{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Z9{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class t8{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,19400);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"STRING":{const s=(function(o){let u=0;for(let c=0;c<o.length;c++){const h=o.codePointAt(c);if(h===void 0)return;if(h<=65535)if(h>=55296&&h<=57343)if(h<=56319){const p=o.codePointAt(c+1);p!==void 0&&p>=56320&&p<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(h<=1114111))return;u+=1,c++}}return u})(r.value.stringValue);return s===void 0?I.vr():I.newValue({integerValue:s})}default:return I.vr()}}}class e8{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,8486);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;return typeof o=="string"?I.newValue({integerValue:Dt.fromBase64String(o).toUint8Array().length}):I.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(c){let h=0;for(let p=0;p<c.length;p++){const g=c.codePointAt(p);if(g===void 0)return;if(g>=55296&&g<=57343){if(!(g<=56319))return;{const T=c.codePointAt(p+1);if(T===void 0||!(T>=56320&&T<=57343))return;h+=4,p++}}else if(g<=127)h+=1;else if(g<=2047)h+=2;else if(g<=65535)h+=3;else{if(!(g<=1114111))return;h+=4,p++}}return h})((i=r.value)==null?void 0:i.stringValue);return o===void 0?I.vr():I.newValue({integerValue:o})}case"NULL":return I.Dr();default:return I.vr()}}}class Br{constructor(t){this.expr=t}evaluate(t,e){var o,u;H(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return I.vr()}return r?I.Dr():this.kr((o=s.value)==null?void 0:o.stringValue,(u=i.value)==null?void 0:u.stringValue)}}class n8 extends Br{kr(t,e){try{const r=(function(o){let u="";for(let c=0;c<o.length;c++){const h=o.charAt(c);switch(h){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+h;break;default:u+=h}}return"^"+u+"$"})(e),s=Ps.compile(r);return I.newValue({booleanValue:s.matches(t)})}catch(r){return Ie(`Invalid LIKE pattern converted to regex: ${e}, returning error. Error: ${r}`),I.vr()}}}class r8 extends Br{kr(t,e){try{const r=Ps.compile(e);return I.newValue({booleanValue:r.matcher(t).find()})}catch{return Ie(`Invalid regex pattern found in regex_contains: ${e}, returning error`),I.vr()}}}class s8 extends Br{kr(t,e){try{return I.newValue({booleanValue:Ps.compile(e).matches(t)})}catch{return Ie(`Invalid regex pattern found in regex_match: ${e}, returning error`),I.vr()}}}class i8 extends Br{kr(t,e){return I.newValue({booleanValue:t.includes(e)})}}class o8 extends Br{kr(t,e){return I.newValue({booleanValue:t.startsWith(e)})}}class a8 extends Br{kr(t,e){return I.newValue({booleanValue:t.endsWith(e)})}}class u8{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,29079);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return I.Dr();default:return I.vr()}}}class c8{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,60487);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return I.Dr();default:return I.vr()}}}class l8{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,28544);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return I.Dr();default:return I.vr()}}}class h8{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((o=>K(o).evaluate(t,e)));let s="",i=!1;for(const o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return I.vr()}return i?I.Dr():I.newValue({stringValue:s})}}class f8{constructor(t){this.expr=t}evaluate(t,e){var o,u,c,h;H(this.expr.params.length===2,4483);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"UNSET":return I.Sr();case"MAP":break;default:return I.vr()}const s=K(this.expr.params[1]).evaluate(t,e);if(s.type!=="STRING")return I.vr();const i=(h=(u=(o=r.value)==null?void 0:o.mapValue)==null?void 0:u.fields)==null?void 0:h[(c=s.value)==null?void 0:c.stringValue];return i===void 0?I.Sr():I.newValue(i)}}class L1{constructor(t){this.expr=t}evaluate(t,e){var h,p;H(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=$a(s.value),u=$a(i.value);if(o===void 0||u===void 0||((h=o.values)==null?void 0:h.length)!==((p=u.values)==null?void 0:p.length))return I.vr();const c=this.qr(o,u);return c===void 0||isNaN(c)?I.vr():I.newValue({doubleValue:c})}}class d8 extends L1{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return;let i=0,o=0,u=0;for(let h=0;h<r.length;h++){if(!bn(r[h])||!bn(s[h]))return;const p=$t(r[h]),g=$t(s[h]);i+=p*g,o+=p*p,u+=g*g}const c=Math.sqrt(o)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}}class p8 extends L1{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!bn(r[o])||!bn(s[o]))return;i+=$t(r[o])*$t(s[o])}return i}}class g8 extends L1{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!bn(r[o])||!bn(s[o]))return;const u=$t(r[o]),c=$t(s[o]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}}class m8{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,39044);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"VECTOR":{const i=$a(r.value);return I.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return I.Dr();default:return I.vr()}}}const Bs=BigInt(-62135596800),$s=BigInt(253402300799),co=BigInt(1e3),An=BigInt(1e6),_8=Bs*co,E8=$s*co+BigInt(999),y8=Bs*An,T8=$s*An+BigInt(999999);function M1(n){return n>=y8&&n<=T8}function C6(n){return n>=Bs&&n<=$s}function qs(n,t){const e=BigInt(n);return!(e<Bs||e>$s)&&!(t<0||t>=1e9)&&(e!==Bs||t===0)&&!(e===$s&&t>999999999)}function S6(n,t){return t<0?{seconds:n-1,nanos:t+1e9}:{seconds:n,nanos:t}}function U1(n){return BigInt(n.seconds)*An+BigInt(Math.trunc(n.nanoseconds/1e3))}class F1{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return I.Dr();default:return I.vr()}}}class w8 extends F1{toTimestamp(t){if(!M1(t))return I.vr();let e=Number(t/An),r=Number(t%An*BigInt(1e3));const s=S6(e,r);return e=s.seconds,r=s.nanos,qs(e,r)?I.newValue({timestampValue:{seconds:e,nanos:r}}):I.vr()}}class I8 extends F1{toTimestamp(t){if(!(function(o){return o>=_8&&o<=E8})(t))return I.vr();let e=Number(t/co),r=Number(t%co*BigInt(1e6));const s=S6(e,r);return e=s.seconds,r=s.nanos,qs(e,r)?I.newValue({timestampValue:{seconds:e,nanos:r}}):I.vr()}}class A8 extends F1{toTimestamp(t){if(!C6(t))return I.vr();const e=Number(t);return I.newValue({timestampValue:{seconds:e,nanos:0}})}}class B1{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"TIMESTAMP":break;case"NULL":return I.Dr();default:return I.vr()}const s=v1(r.value.timestampValue);return qs(s.seconds,s.nanoseconds)?this.$r(s):I.vr()}}class v8 extends B1{$r(t){const e=U1(t);return M1(e)?I.newValue({integerValue:`${e.toString()}`}):I.vr()}}class R8 extends B1{$r(t){const e=U1(t),r=e/BigInt(1e3),s=e%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?I.newValue({integerValue:r.toString()}):I.newValue({integerValue:(r-BigInt(1)).toString()})}}class C8 extends B1{$r(t){const e=BigInt(t.seconds);return C6(e)?I.newValue({integerValue:e.toString()}):I.vr()}}class P6{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);let o;switch(i.type){case"STRING":if(o=(function(rt){switch(rt){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return I.vr();break;case"NULL":r=!0;break;default:return I.vr()}const u=K(this.expr.params[2]).evaluate(t,e);switch(u.type){case"INT":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const c=BigInt(u.value.integerValue);let h;try{switch(o){case"microsecond":h=c;break;case"millisecond":h=c*BigInt(1e3);break;case"second":h=c*BigInt(1e6);break;case"minute":h=c*BigInt(6e7);break;case"hour":h=c*BigInt(36e8);break;case"day":h=c*BigInt(864e8);break;default:return I.vr()}if(o!=="microsecond"&&c!==BigInt(0)&&h/c!==BigInt(this.Kr(o)))return I.vr()}catch(W){return Ie(`Error during timestamp arithmetic: ${W}`),I.vr()}const p=v1(s.value.timestampValue);if(!qs(p.seconds,p.nanoseconds))return I.vr();const g=U1(p),T=this.Wr(g,h);if(!M1(T))return I.vr();const S=Number(T/An),N=T%An,L=Number((N<0?N+An:N)*BigInt(1e3)),U=N<0?S-1:S;return qs(U,L)?I.newValue({timestampValue:{seconds:U,nanos:L}}):I.vr()}Kr(t){switch(t){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class S8 extends P6{Wr(t,e){return t+e}}class P8 extends P6{Wr(t,e){return t-e}}function Hs(n){if((n=v6(n))instanceof Mr)return`fld(${n.fieldName})`;if(n instanceof Ur)return`cst(${(function(e){return e===null?"null":typeof e=="number"?e.toString():typeof e=="string"?`"${e}"`:e instanceof Tt?`ref(${e.path})`:e instanceof ie?`vec(${JSON.stringify(e)})`:JSON.stringify(e)})(n.value)})`;if(n instanceof D)return`fn(${n.name},[${n.params.map(Hs).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(Hs).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function b8(n){if(n instanceof w6)return`${n._name}(${bi(n.fields)})`;if(n instanceof I6){let t=`${n._name}(${bi(n.accumulators)})`;return n.groups.size>0&&(t+=`grouping(${bi(n.groups)})`),t}if(n instanceof A6)return`${n._name}(${bi(n.groups)})`;if(n instanceof ko)return`${n._name}(${n.Vr})`;if(n instanceof Vo)return`${n._name}(${n.collectionId})`;if(n instanceof O1)return`${n._name}()`;if(n instanceof D1)return`${n._name}(${n.dr.sort()})`;if(n instanceof xo)return`${n._name}(${Hs(n.condition)})`;if(n instanceof er)return`${n._name}(${n.limit})`;if(n instanceof He)return`${n._name}(${(function(e){return e.map((r=>`${Hs(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function bi(n){return`${Array.from(n.entries()).sort().map((([t,e])=>`${t}=${Hs(e)}`)).join(",")}`}function Ke(n){return n.stages.map((t=>b8(t))).join("|")}function b6(n,t){return Ke(n)===Ke(t)}function Lt(n){return n instanceof te}function Gl(n){return Lt(n)?Ke(n):ys(n)}function N6(n){return Lt(n)?Ke(n):(function(e){return`${$2(ke(e))}|lt:${e.limitType}`})(n)}function Uo(n,t){return n instanceof te&&t instanceof te?b6(n,t):!(n instanceof te&&!(t instanceof te)||!(n instanceof te)&&t instanceof te)&&n3(n,t)}function O6(n){return qn(n)?Ke(n):$2(n)}function D6(n,t){return n instanceof te&&t instanceof te?b6(n,t):!(n instanceof te&&!(t instanceof te)||!(n instanceof te)&&t instanceof te)&&q2(n,t)}function N8(n,t){const e=(function(s){let i=!1;const o=[];for(const u of s)if(u instanceof He)if(i=!0,u.orderings.some((c=>c.expr instanceof Mr&&c.expr.fieldName===Se)))o.push(u);else{const c=u.orderings.map((h=>h));c.push($i(Se).ascending()),o.push(new He(c,{}))}else u instanceof er&&(i||(o.push(new He([$i(Se).ascending()],{})),i=!0)),o.push(u);return i||o.push(new He([$i(Se).ascending()],{})),o})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");e.forEach((s=>s._readUserData(r)))}return new te(n.userDataReader.serializer,e,t)}/**
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
 */class O8{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&B4(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=_s(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=_s(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=K2();return this.mutations.forEach((s=>{const i=t.get(s.key),o=i.overlayedDocument;let u=this.applyToLocalView(o,i.mutatedFields);u=e.has(s.key)?null:u;const c=D2(o,u);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(J.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),st())}isEqual(t){return this.batchId===t.batchId&&Rr(this.mutations,t.mutations,((e,r)=>Al(e,r)))&&Rr(this.baseMutations,t.baseMutations,((e,r)=>Al(e,r)))}}class $1{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){H(t.mutations.length===r.length,58842,{Qr:t.mutations.length,Gr:r.length});let s=(function(){return a3})();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new $1(t,e,r,s)}}/**
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
 */class D8{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class je{constructor(t,e,r,s,i=J.min(),o=J.min(),u=Dt.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(t){return new je(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new je(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new je(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new je(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class k8{constructor(t){this.zr=t}}function V8(n){const t=v3({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ja(t,t.limit,"L"):t}/**
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
 */class x8{constructor(){this.Hi=new L8}addToCollectionParentIndex(t,e){return this.Hi.add(e),x.resolve()}getCollectionParents(t,e){return x.resolve(this.Hi.getEntries(e))}addFieldIndex(t,e){return x.resolve()}deleteFieldIndex(t,e){return x.resolve()}deleteAllFieldIndexes(t){return x.resolve()}createTargetIndexes(t,e){return x.resolve()}getDocumentsMatchingTarget(t,e){return x.resolve(null)}getIndexType(t,e){return x.resolve(0)}getFieldIndexes(t,e){return x.resolve([])}getNextCollectionGroupToUpdate(t){return x.resolve(null)}getMinOffset(t,e){return x.resolve(Cn.min())}getMinOffsetFromCollectionGroup(t,e){return x.resolve(Cn.min())}updateCollectionGroup(t,e,r){return x.resolve()}updateIndexEntries(t,e){return x.resolve()}}class L8{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new Ot(lt.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Ot(lt.comparator)).toArray()}}/**
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
 */class Dn{constructor(t){this.Ds=t}next(){return this.Ds+=2,this.Ds}static xs(){return new Dn(0)}static Cs(){return new Dn(-1)}}// Copyright 2024 Google LLC* @license
function k6(n,t){var r;let e=t;for(const s of n.stages)e=U8({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,e);return e}function Fo(n,t){return k6(n,[t]).length>0}function M8(n,t){return Lt(n)?Fo(n,t):No(n,t)}function U8(n,t,e){if(t instanceof ko)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,t,e);if(t instanceof xo)return(function(s,i,o){return o.filter((u=>{const c=Is(K(i.condition).evaluate(s,u));return c!==void 0&&_e(c,oe)}))})(n,t,e);if(t instanceof Vo)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId))})(0,t,e);if(t instanceof O1)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()))})(0,0,e);if(t instanceof D1)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()&&i.mr.has(u.key.path.toStringWithLeadingSlash())))})(0,t,e);if(t instanceof er)return(function(s,i,o){return o.slice(0,i.limit)})(0,t,e);if(t instanceof He)return(function(s,i,o){const u=i.orderings.map((c=>({ks:K(c.expr),direction:c.direction})));return[...o].sort(((c,h)=>{for(const{ks:p,direction:g}of u){const T=Is(p.evaluate(s,c)),S=Is(p.evaluate(s,h)),N=ae(T??Sr,S??Sr);if(N!==0)return g==="ascending"?N:-N}return 0}))})(n,t,e);throw new Error(`Unknown stage: ${t._name}`)}function Qa(n){const t=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof He)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(e,r)=>{for(const s of t){const i=Is(K(s.expr).evaluate({serializer:n.serializer},e)),o=Is(K(s.expr).evaluate({serializer:n.serializer},r)),u=ae(i||Sr,o||Sr);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}function Ra(n){for(let t=n.stages.length-1;t>=0;t--){const e=n.stages[t];if(e instanceof er)return{limit:e.limit}}}/**
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
 */class F8{constructor(){this.changes=new ur((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Wt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?x.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class B8{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class $8{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&_s(r.mutation,s,Te.empty(),gt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,st()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=st()){const s=mn();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let o=mr();return i.forEach(((u,c)=>{o=o.insert(u,c.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const r=mn();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,st())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((o,u)=>{e.set(o,u)}))}))}computeViews(t,e,r,s){let i=se();const o=Ts(),u=(function(){return Ts()})();return e.forEach(((c,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof ar)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),_s(p.mutation,h,p.mutation.getFieldMask(),gt.now())):o.set(h.key,Te.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((h,p)=>o.set(h,p))),e.forEach(((h,p)=>u.set(h,new B8(p,o.get(h)??null)))),u)))}recalculateAndSaveOverlays(t,e){const r=Ts();let s=new mt(((o,u)=>o-u)),i=st();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const u of o)u.keys().forEach((c=>{const h=e.get(c);if(h===null)return;let p=r.get(c)||Te.empty();p=u.applyToLocalView(h,p),r.set(c,p);const g=(s.get(u.batchId)||st()).add(c);s=s.insert(u.batchId,g)}))})).next((()=>{const o=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,p=c.value,g=K2();p.forEach((T=>{if(!i.has(T)){const S=D2(e.get(T),r.get(T));S!==null&&g.set(T,S),i=i.add(T)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,g))}return x.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return Lt(e)?this.getDocumentsMatchingPipeline(t,e,r,s):t3(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):j2(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):x.resolve(mn());let u=bs,c=i;return o.next((h=>x.forEach(h,((p,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),i.get(p)?x.resolve():this.remoteDocumentCache.getEntry(t,p).next((T=>{c=c.insert(p,T)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,c,h,st()))).next((p=>({batchId:u,changes:W2(p)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new G(e)).next((r=>{let s=mr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=mr();return this.indexManager.getCollectionParents(t,i).next((u=>x.forEach(u,(c=>{const h=(function(g,T){return new ti(T,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(e,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((p=>{p.forEach(((g,T)=>{o=o.insert(g,T)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(u=>No(e,u)))))}getDocumentsMatchingPipeline(t,e,r,s){if(In(e)==="collection_group"){const i=V1(e);let o=mr();return this.indexManager.getCollectionParents(t,i).next((u=>x.forEach(u,(c=>{const h=(function(g,T){const S=g.stages.map((N=>N instanceof Vo?new ko(T.canonicalString(),{}):N));return new te(g.serializer,S)})(e,c.child(i));return this.getDocumentsMatchingPipeline(t,h,r,s).next((p=>{p.forEach(((g,T)=>{o=o.insert(g,T)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(t,e,r.largestBatchId).next((o=>{switch(i=o,In(e)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s);case"documents":let u=st();for(const c of Ya(e))u=u.add(G.fromPath(c));return this.remoteDocumentCache.getEntries(t,u);case"database":return this.remoteDocumentCache.getAllEntries(t);default:throw new B("invalid-argument",`Invalid pipeline source to execute offline: ${Ke(e)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(u=>Fo(e,u)))))}}retrieveMatchingLocalDocuments(t,e,r){t.forEach(((i,o)=>{const u=o.getKey();e.get(u)===null&&(e=e.insert(u,Wt.newInvalidDocument(u)))}));let s=mr();return e.forEach(((i,o)=>{const u=t.get(i);u!==void 0&&_s(u.mutation,o,Te.empty(),gt.now()),r(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(t,e,r){switch(In(e)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(t,lt.fromString(Lo(e)),r);case"collection_group":throw new B("invalid-argument",`Unexpected collection group pipeline: ${Ke(e)}`);case"documents":return this.documentOverlayCache.getOverlays(t,Ya(e).map((s=>G.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(t,r);default:throw new B("invalid-argument",`Failed to get overlays for pipeline: ${Ke(e)}`)}}}/**
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
 */class q8{constructor(t){this.serializer=t,this.Hs=new Map,this.Js=new Map}getBundleMetadata(t,e){return x.resolve(this.Hs.get(e))}saveBundleMetadata(t,e){return this.Hs.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Ve(s.createTime)}})(e)),x.resolve()}getNamedQuery(t,e){return x.resolve(this.Js.get(e))}saveNamedQuery(t,e){return this.Js.set(e.name,(function(s){return{name:s.name,query:V8(s.bundledQuery),readTime:Ve(s.readTime)}})(e)),x.resolve()}}/**
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
 */class H8{constructor(){this.overlays=new mt(G.comparator),this.Ys=new Map}getOverlay(t,e){return x.resolve(this.overlays.get(e))}getOverlays(t,e){const r=mn();return x.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(t,e){const r=mn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>e&&r.set(s,i)})),x.resolve(r)}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.Hr(t,e,i)})),x.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),x.resolve()}getOverlaysForCollection(t,e,r){const s=mn(),i=e.length+1,o=new G(e.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return x.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new mt(((h,p)=>h-p));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=mn(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const u=mn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,p)=>u.set(h,p))),!(u.size()>=s)););return x.resolve(u)}Hr(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new D8(e,r));let i=this.Ys.get(e);i===void 0&&(i=st(),this.Ys.set(e,i)),this.Ys.set(e,i.add(r.key))}}/**
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
 */class j8{constructor(){this.sessionToken=Dt.EMPTY_BYTE_STRING}getSessionToken(t){return x.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,x.resolve()}}/**
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
 */class q1{constructor(){this.Zs=new Ot(Ut.Xs),this.e_=new Ot(Ut.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(t,e){const r=new Ut(t,e);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.r_(new Ut(t,e))}i_(t,e){t.forEach((r=>this.removeReference(r,e)))}s_(t){const e=new G(new lt([])),r=new Ut(e,t),s=new Ut(e,t+1),i=[];return this.e_.forEachInRange([r,s],(o=>{this.r_(o),i.push(o.key)})),i}__(){this.Zs.forEach((t=>this.r_(t)))}r_(t){this.Zs=this.Zs.delete(t),this.e_=this.e_.delete(t)}o_(t){const e=new G(new lt([])),r=new Ut(e,t),s=new Ut(e,t+1);let i=st();return this.e_.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new Ut(t,0),r=this.Zs.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class Ut{constructor(t,e){this.key=t,this.a_=e}static Xs(t,e){return G.comparator(t.key,e.key)||it(t.a_,e.a_)}static t_(t,e){return it(t.a_,e.a_)||G.comparator(t.key,e.key)}}/**
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
 */class G8{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.gs=1,this.u_=new Ot(Ut.Xs)}checkEmpty(t){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new O8(i,e,r,s);this.mutationQueue.push(o);for(const u of s)this.u_=this.u_.add(new Ut(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return x.resolve(o)}lookupMutationBatch(t,e){return x.resolve(this.c_(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.l_(r),i=s<0?0:s;return x.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?E1:this.gs-1)}getAllMutationBatches(t){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new Ut(e,0),s=new Ut(e,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(o=>{const u=this.c_(o.a_);i.push(u)})),x.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Ot(it);return e.forEach((s=>{const i=new Ut(s,0),o=new Ut(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],(u=>{r=r.add(u.a_)}))})),x.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;G.isDocumentKey(i)||(i=i.child(""));const o=new Ut(new G(i),0);let u=new Ot(it);return this.u_.forEachWhile((c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.a_)),!0)}),o),x.resolve(this.E_(u))}E_(t){const e=[];return t.forEach((r=>{const s=this.c_(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){H(this.h_(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return x.forEach(e.mutations,(s=>{const i=new Ut(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.u_=r}))}bs(t){}containsKey(t,e){const r=new Ut(e,0),s=this.u_.firstAfterOrEqual(r);return x.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,x.resolve()}h_(t,e){return this.l_(t)}l_(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}c_(t){const e=this.l_(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class z8{constructor(t){this.T_=t,this.docs=(function(){return new mt(G.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.T_(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return x.resolve(r?r.document.mutableCopy():Wt.newInvalidDocument(e))}getEntries(t,e){let r=se();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Wt.newInvalidDocument(s))})),x.resolve(r)}getAllEntries(t){let e=se();return this.docs.forEach(((r,s)=>{e=e.insert(r,s.document)})),x.resolve(e)}getDocumentsMatchingQuery(t,e,r,s){let i,o;Lt(e)?(i=lt.fromString(Lo(e)),o=p=>Fo(e,p)):(i=e.path,o=p=>No(e,p));let u=se();const c=new G(i.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:p,value:{document:g}}=h.getNext();if(!i.isPrefixOf(p.path))break;p.path.length>i.length+1||w4(T4(g),r)<=0||(s.has(g.key)||o(g))&&(u=u.insert(g.key,g.mutableCopy()))}return x.resolve(u)}getAllFromCollectionGroup(t,e,r,s){z(9500)}P_(t,e){return x.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new W8(this)}getSize(t){return x.resolve(this.size)}}class W8 extends F8{constructor(t){super(),this.zs=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.zs.addEntry(t,s)):this.zs.removeEntry(r)})),x.waitFor(e)}getFromCache(t,e){return this.zs.getEntry(t,e)}getAllFromCache(t,e){return this.zs.getEntries(t,e)}}/**
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
 */class K8{constructor(t){this.persistence=t,this.R_=new ur((e=>O6(e)),D6),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.I_=0,this.A_=new q1,this.targetCount=0,this.V_=Dn.xs()}forEachTarget(t,e){return this.R_.forEach(((r,s)=>e(s))),x.resolve()}getLastRemoteSnapshotVersion(t){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return x.resolve(this.I_)}allocateTargetId(t){return this.highestTargetId=this.V_.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.I_&&(this.I_=e),x.resolve()}Ms(t){this.R_.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.V_=new Dn(e),this.highestTargetId=e),t.sequenceNumber>this.I_&&(this.I_=t.sequenceNumber)}addTargetData(t,e){return this.Ms(e),this.targetCount+=1,x.resolve()}updateTargetData(t,e){return this.Ms(e),x.resolve()}removeTargetData(t,e){return this.R_.delete(e.target),this.A_.s_(e.targetId),this.targetCount-=1,x.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.R_.forEach(((o,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),x.waitFor(i).next((()=>s))}getTargetCount(t){return x.resolve(this.targetCount)}getTargetData(t,e){const r=this.R_.get(e)||null;return x.resolve(r)}addMatchingKeys(t,e,r){return this.A_.n_(e,r),x.resolve()}removeMatchingKeys(t,e,r){this.A_.i_(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((o=>{i.push(s.markPotentiallyOrphaned(t,o))})),x.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.A_.s_(e),x.resolve()}getMatchingKeysForTargetId(t,e){const r=this.A_.o_(e);return x.resolve(r)}containsKey(t,e){return x.resolve(this.A_.containsKey(e))}}/**
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
 */class V6{constructor(t,e){this.d_={},this.overlays={},this.f_=new Ao(0),this.m_=!1,this.m_=!0,this.p_=new j8,this.referenceDelegate=t(this),this.g_=new K8(this),this.indexManager=new x8,this.remoteDocumentCache=(function(s){return new z8(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new k8(e),this.w_=new q8(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new H8,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.d_[t.toKey()];return r||(r=new G8(e,this.referenceDelegate),this.d_[t.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(t,e,r){$("MemoryPersistence","Starting transaction:",t);const s=new Y8(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(t,e){return x.or(Object.values(this.d_).map((r=>()=>r.containsKey(t,e))))}}class Y8 extends A4{constructor(t){super(),this.currentSequenceNumber=t}}class H1{constructor(t){this.persistence=t,this.D_=new q1,this.x_=null}static C_(t){return new H1(t)}get F_(){if(this.x_)return this.x_;throw z(60996)}addReference(t,e,r){return this.D_.addReference(r,e),this.F_.delete(r.toString()),x.resolve()}removeReference(t,e,r){return this.D_.removeReference(r,e),this.F_.add(r.toString()),x.resolve()}markPotentiallyOrphaned(t,e){return this.F_.add(e.toString()),x.resolve()}removeTarget(t,e){this.D_.s_(e.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}b_(){this.x_=new Set}v_(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.F_,(r=>{const s=G.fromPath(r);return this.O_(t,s).next((i=>{i||e.removeEntry(s,J.min())}))})).next((()=>(this.x_=null,e.apply(t))))}updateLimboDocument(t,e){return this.O_(t,e).next((r=>{r?this.F_.delete(e.toString()):this.F_.add(e.toString())}))}y_(t){return 0}O_(t,e){return x.or([()=>x.resolve(this.D_.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.S_(t,e)])}}class lo{constructor(t,e){this.persistence=t,this.M_=new ur((r=>S4(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=K3(this,e)}static C_(t,e){return new lo(t,e)}b_(){}v_(t){return x.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}lr(t){const e=this.Ls(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}Ls(t){let e=0;return this.Er(t,(r=>{e++})).next((()=>e))}Er(t,e){return x.forEach(this.M_,((r,s)=>this.Us(t,r,s).next((i=>i?x.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(t,(o=>this.Us(t,o,e).next((u=>{u||(r++,i.removeEntry(o,J.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.M_.set(e,t.currentSequenceNumber),x.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),x.resolve()}removeReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),x.resolve()}updateLimboDocument(t,e){return this.M_.set(e,t.currentSequenceNumber),x.resolve()}y_(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Mi(t.data.value)),e}Us(t,e,r){return x.or([()=>this.persistence.S_(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.M_.get(e);return x.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class j1{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.wo=r,this.bo=s}static vo(t,e){let r=st(),s=st();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new j1(t,e.fromCache,r,s)}}/**
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
 */function Q8(n,t){return G.comparator(n.key,t.key)}/**
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
 */class X8{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class J8{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return _d()?8:v4(Kt())>0?6:4})()}initialize(t,e){this.Fo=t,this.indexManager=e,this.So=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.Oo(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Mo(t,e,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new X8;return this.No(t,e,o).next((u=>{if(i.result=u,this.Do)return this.Lo(t,e,o,u.size)}))})).next((()=>i.result))}Lo(t,e,r,s){return Lt(e)?x.resolve():r.documentReadCount<this.xo?(gr()<=ot.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",ys(e),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),x.resolve()):(gr()<=ot.DEBUG&&$("QueryEngine","Query:",ys(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(gr()<=ot.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",ys(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,ke(e))):x.resolve())}Oo(t,e){if(Lt(e))return x.resolve(null);let r=e;if(bl(r))return x.resolve(null);let s=ke(r);return this.indexManager.getIndexType(t,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=ja(r,null,"F"),s=ke(r)),this.indexManager.getDocumentsMatchingTarget(t,s).next((o=>{const u=st(...o);return this.Fo.getDocuments(t,u).next((c=>this.indexManager.getMinOffset(t,s).next((h=>{const p=this.Bo(r,c);return this.Uo(r,p,u,h.readTime)?this.Oo(t,ja(r,null,"F")):this.ko(t,p,r,h)}))))})))))}Mo(t,e,r,s){return(Lt(e)?(function(o){for(const u of o.stages){if(u instanceof er||u instanceof jl)return!1;if(u instanceof xo){if(u.condition instanceof E6&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof Mr&&u.condition._expr.params[0].fieldName===Se)continue;return!1}}return!0})(e):bl(e))||s.isEqual(J.min())?x.resolve(null):this.Fo.getDocuments(t,r).next((i=>{const o=this.Bo(e,i);return this.Uo(e,o,r,s)?x.resolve(null):(gr()<=ot.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Gl(e)),this.ko(t,o,e,y4(s,bs)).next((u=>u)))}))}Bo(t,e){let r,s;return Lt(t)?(r=new Ot(Q8),s=i=>Fo(t,i)):(r=new Ot(I1(t)),s=i=>No(t,i)),e.forEach(((i,o)=>{s(o)&&(r=r.add(o))})),r}Uo(t,e,r,s){if(Lt(t))return(function(u){return u.stages.some((c=>c instanceof er||c instanceof jl))})(t);if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(t,e,r){return gr()<=ot.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Gl(e)),this.Fo.getDocumentsMatchingQuery(t,e,Cn.min(),r)}ko(t,e,r,s){return this.Fo.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const G1="LocalStore",Z8=3e8;class tg{constructor(t,e,r,s){this.persistence=t,this.qo=e,this.serializer=s,this.$o=new mt(it),this.Ko=new ur((i=>O6(i)),D6),this.Wo=new Map,this.Qo=t.getRemoteDocumentCache(),this.g_=t.getTargetCache(),this.w_=t.getBundleCache(),this.Go(r)}Go(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new $8(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.$o)))}}function eg(n,t,e,r){return new tg(n,t,e,r)}async function x6(n,t){const e=Z(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Go(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],u=[];let c=st();for(const h of s){o.push(h.batchId);for(const p of h.mutations)c=c.add(p.key)}for(const h of i){u.push(h.batchId);for(const p of h.mutations)c=c.add(p.key)}return e.localDocuments.getDocuments(r,c).next((h=>({zo:h,removedBatchIds:o,addedBatchIds:u})))}))}))}function ng(n,t){const e=Z(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Qo.newChangeBuffer({trackRemovals:!0});return(function(u,c,h,p){const g=h.batch,T=g.keys();let S=x.resolve();return T.forEach((N=>{S=S.next((()=>p.getEntry(c,N))).next((L=>{const U=h.docVersions.get(N);H(U!==null,48541),L.version.compareTo(U)<0&&(g.applyToRemoteDocument(L,h),L.isValidDocument()&&(L.setReadTime(h.commitVersion),p.addEntry(L)))}))})),S.next((()=>u.mutationQueue.removeMutationBatch(c,g)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let c=st();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function L6(n){const t=Z(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.g_.getLastRemoteSnapshotVersion(e)))}function rg(n,t){const e=Z(n),r=t.snapshotVersion;let s=e.$o;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=e.Qo.newChangeBuffer({trackRemovals:!0});s=e.$o;const u=[];t.targetChanges.forEach(((p,g)=>{const T=s.get(g);if(!T)return;u.push(e.g_.removeMatchingKeys(i,p.removedDocuments,g).next((()=>e.g_.addMatchingKeys(i,p.addedDocuments,g))));let S=T.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?S=S.withResumeToken(Dt.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),s=s.insert(g,S),(function(L,U,W){return L.resumeToken.approximateByteSize()===0||U.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=Z8?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0})(T,S,p)&&u.push(e.g_.updateTargetData(i,S))}));let c=se(),h=st();if(t.documentUpdates.forEach((p=>{t.resolvedLimboDocuments.has(p)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,p))})),u.push(sg(i,o,t.documentUpdates).next((p=>{c=p.jo,h=p.Ho}))),!r.isEqual(J.min())){const p=e.g_.getLastRemoteSnapshotVersion(i).next((g=>e.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));u.push(p)}return x.waitFor(u).next((()=>o.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(e.$o=s,i)))}function sg(n,t,e){let r=st(),s=st();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let o=se();return e.forEach(((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(J.min())?(t.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(c),o=o.insert(u,c)):$(G1,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)})),{jo:o,Ho:s}}))}function ig(n,t){const e=Z(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=E1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function og(n,t){const e=Z(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.g_.getTargetData(r,t).next((i=>i?(s=i,x.resolve(s)):e.g_.allocateTargetId(r).next((o=>(s=new je(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.$o=e.$o.insert(r.targetId,r),e.Ko.set(t,r.targetId)),r}))}async function Xa(n,t,e){const r=Z(n),s=r.$o.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Lr(o))throw o;$(G1,`Failed to update sequence numbers for target ${t}: ${o}`)}r.$o=r.$o.remove(t),r.Ko.delete(s.target)}function zl(n,t,e){const r=Z(n);let s=J.min(),i=st();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,p){const g=Z(c),T=g.Ko.get(p);return T!==void 0?x.resolve(g.$o.get(T)):g.g_.getTargetData(h,p)})(r,o,Lt(t)?t:ke(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(o,u.targetId).next((c=>{i=c}))})).next((()=>r.qo.getDocumentsMatchingQuery(o,t,e?s:J.min(),e?i:st()))).next((u=>(ag(r,u),{documents:u,Jo:i})))))}function ag(n,t){t.forEach(((e,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||J.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}class Wl{constructor(){this.activeTargetIds=l3()}na(t){this.activeTargetIds=this.activeTargetIds.add(t)}ra(t){this.activeTargetIds=this.activeTargetIds.delete(t)}ta(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class ug{constructor(){this.Ua=new Wl,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Ua.na(t),this.ka[t]||"not-current"}updateQueryState(t,e,r){this.ka[t]=e}removeLocalQueryTarget(t){this.Ua.ra(t)}isLocalQueryTarget(t){return this.Ua.activeTargetIds.has(t)}clearQueryState(t){delete this.ka[t]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(t){return this.Ua.activeTargetIds.has(t)}start(){return this.Ua=new Wl,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}function Ca(){return typeof document<"u"?document:null}/**
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
 */class cg{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(t){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Qa("Offline")))}set(t){this.ja(),this.qa=0,t==="Online"&&(this.Ka=!1),this.Qa(t)}Qa(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Ga(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Xe(e),this.Ka=!1):$("OnlineStateTracker",e)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
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
 */const Me="RemoteStore";class lg{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new Dn(1e3),this.eu=new Dn(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((o=>{r.enqueueAndForget((async()=>{hr(this)&&($(Me,"Restarting streams for network reachability change."),await(async function(c){const h=Z(c);h.tu.add(4),await ii(h),h.iu.set("Unknown"),h.tu.delete(4),await Bo(h)})(this))}))})),this.iu=new cg(r,s)}}async function Bo(n){if(hr(n))for(const t of n.nu)await t(!0)}async function ii(n){for(const t of n.nu)await t(!1)}function Ja(n,t){return n.Ya.get(t)||void 0}function M6(n,t){const e=Z(n),r=Ja(e,t.targetId);if(r!==void 0&&e.Ja.has(r))return;const s=(function(u,c){const h=Ja(u,c);h!==void 0&&u.Za.delete(h);const p=(function(T,S){return S%2!=0?T.eu.next():T.Xa.next()})(u,c);return u.Ya.set(c,p),u.Za.set(p,c),p})(e,t.targetId);$(Me,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new je(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ja.set(s,i),Y1(e)?K1(e):$r(e).Fn()&&W1(e,i)}function z1(n,t){const e=Z(n),r=$r(e),s=Ja(e,t);$(Me,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ja.delete(s),e.Ya.delete(t),e.Za.delete(s),r.Fn()&&U6(e,s),e.Ja.size===0&&(r.Fn()?r.Nn():hr(e)&&e.iu.set("Unknown"))}function W1(n,t){if(n.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(J.min())>0){const e=n.Za.get(t.targetId);if(e===void 0)return void $(Me,"SDK target ID not found for remote ID: "+t.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(r)}$r(n).jn(t)}function U6(n,t){n.su.We(t),$r(n).Hn(t)}function K1(n){n.su=new d3({getRemoteKeysForTarget:t=>{const e=n.Za.get(t);return e!==void 0?n.remoteSyncer.getRemoteKeysForTarget(e):st()},dt:t=>n.Ja.get(t)||null,Tt:()=>n.datastore.serializer.databaseId}),$r(n).start(),n.iu.Wa()}function Y1(n){return hr(n)&&!$r(n).Cn()&&n.Ja.size>0}function hr(n){return Z(n).tu.size===0}function F6(n){n.su=void 0}async function hg(n){n.iu.set("Online")}async function fg(n){n.Ja.forEach(((t,e)=>{W1(n,t)}))}async function dg(n,t){F6(n),Y1(n)?(n.iu.za(t),K1(n)):n.iu.set("Unknown")}async function pg(n,t,e){if(n.iu.set("Online"),t instanceof Q2&&t.state===2&&t.cause)try{await(async function(s,i){const o=i.cause;for(const u of i.targetIds){if(s.Ja.has(u)){const c=s.Za.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,o),s.Ya.delete(c),s.Za.delete(u)),s.Ja.delete(u)}s.su.removeTarget(u)}})(n,t)}catch(r){$(Me,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await ho(n,r)}else if(t instanceof Fi?n.su.et(t):t instanceof Y2?n.su.ot(t):n.su.rt(t),!e.isEqual(J.min()))try{const r=await L6(n.localStore);e.compareTo(r)>=0&&await(function(i,o){const u=i.su.Rt(o);u.targetChanges.forEach(((h,p)=>{if(h.resumeToken.approximateByteSize()>0){const g=i.Ja.get(p);g&&i.Ja.set(p,g.withResumeToken(h.resumeToken,o))}})),u.targetMismatches.forEach(((h,p)=>{const g=i.Ja.get(h);if(!g)return;i.Ja.set(h,g.withResumeToken(Dt.EMPTY_BYTE_STRING,g.snapshotVersion)),U6(i,h);const T=new je(g.target,h,p,g.sequenceNumber);W1(i,T)}));const c=(function(p,g){const T=new Map;g.targetChanges.forEach(((N,L)=>{const U=p.Za.get(L);U!==void 0&&T.set(U,N)}));let S=new mt(it);return g.targetMismatches.forEach(((N,L)=>{const U=p.Za.get(N);U!==void 0&&(S=S.insert(U,L))})),new ei(g.snapshotVersion,T,S,g.documentUpdates,g.augmentedDocumentUpdates,g.resolvedLimboDocuments)})(i,u);return i.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){$(Me,"Failed to raise snapshot:",r),await ho(n,r)}}async function ho(n,t,e){if(!Lr(t))throw t;n.tu.add(1),await ii(n),n.iu.set("Offline"),e||(e=()=>L6(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{$(Me,"Retrying IndexedDB access"),await e(),n.tu.delete(1),await Bo(n)}))}function B6(n,t){return t().catch((e=>ho(n,e,t)))}async function $o(n){const t=Z(n),e=kn(t);let r=t.Ha.length>0?t.Ha[t.Ha.length-1].batchId:E1;for(;gg(t);)try{const s=await ig(t.localStore,r);if(s===null){t.Ha.length===0&&e.Nn();break}r=s.batchId,mg(t,s)}catch(s){await ho(t,s)}$6(t)&&q6(t)}function gg(n){return hr(n)&&n.Ha.length<10}function mg(n,t){n.Ha.push(t);const e=kn(n);e.Fn()&&e.Jn&&e.Yn(t.mutations)}function $6(n){return hr(n)&&!kn(n).Cn()&&n.Ha.length>0}function q6(n){kn(n).start()}async function _g(n){kn(n).er()}async function Eg(n){const t=kn(n);for(const e of n.Ha)t.Yn(e.mutations)}async function yg(n,t,e){const r=n.Ha.shift(),s=$1.from(r,t,e);await B6(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await $o(n)}async function Tg(n,t){t&&kn(n).Jn&&await(async function(r,s){if((function(o){return i3(o)&&o!==V.ABORTED})(s.code)){const i=r.Ha.shift();kn(r).Mn(),await B6(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await $o(r)}})(n,t),$6(n)&&q6(n)}async function Kl(n,t){const e=Z(n);e.asyncQueue.verifyOperationInProgress(),$(Me,"RemoteStore received new credentials");const r=hr(e);e.tu.add(3),await ii(e),r&&e.iu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.tu.delete(3),await Bo(e)}async function wg(n,t){const e=Z(n);t?(e.tu.delete(2),await Bo(e)):t||(e.tu.add(2),await ii(e),e.iu.set("Unknown"))}function $r(n){return n._u||(n._u=(function(e,r,s){const i=Z(e);return i.nr(),new M3(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:hg.bind(null,n),zt:fg.bind(null,n),Ht:dg.bind(null,n),zn:pg.bind(null,n)}),n.nu.push((async t=>{t?(n._u.Mn(),Y1(n)?K1(n):n.iu.set("Unknown")):(await n._u.stop(),F6(n))}))),n._u}function kn(n){return n.ou||(n.ou=(function(e,r,s){const i=Z(e);return i.nr(),new U3(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:_g.bind(null,n),Ht:Tg.bind(null,n),Zn:Eg.bind(null,n),Xn:yg.bind(null,n)}),n.nu.push((async t=>{t?(n.ou.Mn(),await $o(n)):(await n.ou.stop(),n.Ha.length>0&&($(Me,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
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
 */class Q1{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ze,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,u=new Q1(t,e,o,s,i);return u.start(r),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function X1(n,t){if(Xe("AsyncQueue",`${t}: ${n}`),Lr(n))return new B(V.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class zn{static emptySet(t){return new zn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||G.comparator(e.key,r.key):(e,r)=>G.comparator(e.key,r.key),this.keyedMap=mr(),this.sortedSet=new mt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof zn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new zn;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
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
 */class Yl{constructor(){this.au=new mt(G.comparator)}track(t){const e=t.doc.key,r=this.au.get(e);r?t.type!==0&&r.type===3?this.au=this.au.insert(e,t):t.type===3&&r.type!==1?this.au=this.au.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.au=this.au.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.au=this.au.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.au=this.au.remove(e):t.type===1&&r.type===2?this.au=this.au.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.au=this.au.insert(e,{type:2,doc:t.doc}):z(63341,{ft:t,uu:r}):this.au=this.au.insert(e,t)}cu(){const t=[];return this.au.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Or{constructor(t,e,r,s,i,o,u,c,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach((u=>{o.push({type:0,doc:u})})),new Or(t,e,zn.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Uo(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Ig{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((t=>t.Tu()))}}class Ag{constructor(){this.queries=Ql(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(e,r){const s=Z(e),i=s.queries;s.queries=Ql(),i.forEach(((o,u)=>{for(const c of u.Eu)c.onError(r)}))})(this,new B(V.ABORTED,"Firestore shutting down"))}}function Ql(){return new ur((n=>N6(n)),Uo)}async function J1(n,t){const e=Z(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.hu()&&t.Tu()&&(r=2):(i=new Ig,r=t.Tu()?0:1);try{switch(r){case 0:i.lu=await e.onListen(s,!0);break;case 1:i.lu=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const u=X1(o,`Initialization of query '${Lt(t.query)?Ke(t.query):ys(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Eu.push(t),t.Ru(e.onlineState),i.lu&&t.Iu(i.lu)&&tu(e)}async function Z1(n,t){const e=Z(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const o=i.Eu.indexOf(t);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=t.Tu()?0:1:!i.hu()&&t.Tu()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function vg(n,t){const e=Z(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const u of o.Eu)u.Iu(s)&&(r=!0);o.lu=s}}r&&tu(e)}function Rg(n,t,e){const r=Z(n),s=r.queries.get(t);if(s)for(const i of s.Eu)i.onError(e);r.queries.delete(t)}function tu(n){n.Pu.forEach((t=>{t.next()}))}var Za;(function(n){n.Default="default",n.Cache="cache"})(Za||(Za={}));class eu{constructor(t,e,r){this.query=t,this.Au=e,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Or(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Vu?this.fu(t)&&(this.Au.next(t),e=!0):this.mu(t,this.onlineState)&&(this.pu(t),e=!0),this.du=t,e}onError(t){this.Au.error(t)}Ru(t){this.onlineState=t;let e=!1;return this.du&&!this.Vu&&this.mu(this.du,t)&&(this.pu(this.du),e=!0),e}mu(t,e){if(!t.fromCache||!this.Tu())return!0;const r=e!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}fu(t){if(t.docChanges.length>0)return!0;const e=this.du&&this.du.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}pu(t){t=Or.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Vu=!0,this.Au.next(t)}Tu(){return this.options.source!==Za.Cache}}/**
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
 */class H6{constructor(t){this.key=t}}class j6{constructor(t){this.key=t}}class Cg{constructor(t,e){this.query=t,this.Ou=e,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=st(),this.mutatedKeys=st(),this.Lu=Lt(t)?Qa(t):I1(t),this.Bu=new zn(this.Lu)}get Uu(){return this.Ou}ku(t,e){const r=e?e.qu:new Yl,s=e?e.Bu:this.Bu;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,u=!1;const[c,h]=this.$u(this.query,s);t.inorderTraversal(((g,T)=>{const S=s.get(g),N=M8(this.query,T)?T:null,L=!!S&&this.mutatedKeys.has(S.key),U=!!N&&(N.hasLocalMutations||this.mutatedKeys.has(N.key)&&N.hasCommittedMutations);let W=!1;S&&N?S.data.isEqual(N.data)?L!==U&&(r.track({type:3,doc:N}),W=!0):this.Ku(S,N)||(r.track({type:2,doc:N}),W=!0,(c&&this.Lu(N,c)>0||h&&this.Lu(N,h)<0)&&(u=!0)):!S&&N?(r.track({type:0,doc:N}),W=!0):S&&!N&&(r.track({type:1,doc:S}),W=!0,(c||h)&&(u=!0)),W&&(N?(o=o.add(N),i=U?i.add(g):i.delete(g)):(o=o.delete(g),i=i.delete(g)))}));const p=this.Wu(this.query);if(p)if(Lt(this.query)){const g=[];o.forEach((N=>g.push(N)));const T=k6(this.query,g);let S=new zn(Qa(this.query));for(const N of T)S=S.add(N);o.forEach((N=>{S.has(N.key)||(i=i.delete(N.key),r.track({type:1,doc:N}))})),o=S}else{const g=this.Qu(this.query);for(;o.size>p;){const T=g==="F"?o.last():o.first();o=o.delete(T.key),i=i.delete(T.key),r.track({type:1,doc:T})}}return{Bu:o,qu:r,Uo:u,mutatedKeys:i}}Wu(t){var e;return Lt(t)?(e=Ra(t))==null?void 0:e.limit:t.limit||void 0}Qu(t){if(Lt(t)){const e=Ra(t);return e&&e.limit<0?"L":"F"}return t.limitType}$u(t,e){var r;if(Lt(t)){const s=(r=Ra(t))==null?void 0:r.limit;return[e.size===s?e.last():null,null]}return[t.limitType==="F"&&e.size===this.Wu(this.query)?e.last():null,t.limitType==="L"&&e.size===this.Wu(this.query)?e.first():null]}Ku(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.Bu;this.Bu=t.Bu,this.mutatedKeys=t.mutatedKeys;const o=t.qu.cu();o.sort(((p,g)=>(function(S,N){const L=U=>{switch(U){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{ft:U})}};return L(S)-L(N)})(p.type,g.type)||this.Lu(p.doc,g.doc))),this.Gu(r),s=s??!1;const u=e&&!s?this.zu():[],c=this.Nu.size===0&&this.current&&!s?1:0,h=c!==this.Mu;return this.Mu=c,o.length!==0||h?{snapshot:new Or(this.query,t.Bu,i,o,t.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:u}:{ju:u}}Ru(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Yl,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(t){return!this.Ou.has(t)&&!!this.Bu.has(t)&&!this.Bu.get(t).hasLocalMutations}Gu(t){t&&(t.addedDocuments.forEach((e=>this.Ou=this.Ou.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ou=this.Ou.delete(e))),this.current=t.current)}zu(){if(!this.current)return[];const t=this.Nu;this.Nu=st(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const e=[];return t.forEach((r=>{this.Nu.has(r)||e.push(new j6(r))})),this.Nu.forEach((r=>{t.has(r)||e.push(new H6(r))})),e}Ju(t){this.Ou=t.Jo,this.Nu=st();const e=this.ku(t.documents);return this.applyChanges(e,!0)}Yu(){return Or.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const nu="SyncEngine";class Sg{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Pg{constructor(t){this.key=t,this.Zu=!1}}class bg{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new ur((u=>N6(u)),Uo),this.tc=new Map,this.nc=new Set,this.rc=new mt(G.comparator),this.sc=new Map,this._c=new q1,this.oc={},this.ac=new Map,this.uc=Dn.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function Ng(n,t,e=!0){const r=Q6(n);let s;const i=r.ec.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await G6(r,t,e,!0),s}async function Og(n,t){const e=Q6(n);await G6(e,t,!0,!1)}async function G6(n,t,e,r){const s=await og(n.localStore,Lt(t)?t:ke(t)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let u;return r&&(u=await Dg(n,t,i,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&M6(n.remoteStore,s),u}async function Dg(n,t,e,r,s){n.lc=(g,T,S)=>(async function(L,U,W,rt){let ct=U.view.ku(W);ct.Uo&&(ct=await zl(L.localStore,U.query,!1).then((({documents:v})=>U.view.ku(v,ct))));const ft=rt&&rt.targetChanges.get(U.targetId),vt=rt&&rt.targetMismatches.get(U.targetId)!=null,St=U.view.applyChanges(ct,L.isPrimaryClient,ft,vt);return Jl(L,U.targetId,St.ju),St.snapshot})(n,g,T,S);const i=await zl(n.localStore,t,!0),o=new Cg(t,i.Jo),u=o.ku(i.documents),c=ni.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=o.applyChanges(u,n.isPrimaryClient,c);Jl(n,e,h.ju);const p=new Sg(t,e,o);return n.ec.set(t,p),n.tc.has(e)?n.tc.get(e).push(t):n.tc.set(e,[t]),h.snapshot}async function kg(n,t,e){const r=Z(n),s=r.ec.get(t),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((o=>!Uo(o,t)))),void r.ec.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Xa(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&z1(r.remoteStore,s.targetId),t1(r,s.targetId)})).catch(xr)):(t1(r,s.targetId),await Xa(r.localStore,s.targetId,!0))}async function Vg(n,t){const e=Z(n),r=e.ec.get(t),s=e.tc.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),z1(e.remoteStore,r.targetId))}async function xg(n,t,e){const r=qg(n);try{const s=await(function(o,u){const c=Z(o),h=gt.now(),p=u.reduce(((S,N)=>S.add(N.key)),st());let g,T;return c.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let N=se(),L=st();return c.Qo.getEntries(S,p).next((U=>{N=U,N.forEach(((W,rt)=>{rt.isValidDocument()||(L=L.add(W))}))})).next((()=>c.localDocuments.getOverlayedDocuments(S,N))).next((U=>{g=U;const W=[];for(const rt of u){const ct=$4(rt,g.get(rt.key).overlayedDocument);ct!=null&&W.push(new ar(rt.key,ct,S2(ct.value.mapValue),We.exists(!0)))}return c.mutationQueue.addMutationBatch(S,h,W,u)})).next((U=>{T=U;const W=U.applyToLocalDocumentSet(g,L);return c.documentOverlayCache.saveOverlays(S,U.batchId,W)}))})).then((()=>({batchId:T.batchId,changes:W2(g)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(o,u,c){let h=o.oc[o.currentUser.toKey()];h||(h=new mt(it)),h=h.insert(u,c),o.oc[o.currentUser.toKey()]=h})(r,s.batchId,e),await oi(r,s.changes),await $o(r.remoteStore)}catch(s){const i=X1(s,"Failed to persist write");e.reject(i)}}async function z6(n,t){const e=Z(n);try{const r=await rg(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const o=e.sc.get(i);o&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?H(o.Zu,14607):s.removedDocuments.size>0&&(H(o.Zu,42227),o.Zu=!1))})),await oi(e,r,t)}catch(r){await xr(r)}}function Xl(n,t,e){const r=Z(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.ec.forEach(((i,o)=>{const u=o.view.Ru(t);u.snapshot&&s.push(u.snapshot)})),(function(o,u){const c=Z(o);c.onlineState=u;let h=!1;c.queries.forEach(((p,g)=>{for(const T of g.Eu)T.Ru(u)&&(h=!0)})),h&&tu(c)})(r.eventManager,t),s.length&&r.Xu.zn(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Lg(n,t,e){const r=Z(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.sc.get(t),i=s&&s.key;if(i){let o=new mt(G.comparator);o=o.insert(i,Wt.newNoDocument(i,J.min()));const u=st().add(i),c=new ei(J.min(),new Map,new mt(it),o,se(),u);await z6(r,c),r.rc=r.rc.remove(i),r.sc.delete(t),ru(r)}else await Xa(r.localStore,t,!1).then((()=>t1(r,t,e))).catch(xr)}async function Mg(n,t){const e=Z(n),r=t.batch.batchId;try{const s=await ng(e.localStore,t);K6(e,r,null),W6(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await oi(e,s)}catch(s){await xr(s)}}async function Ug(n,t,e){const r=Z(n);try{const s=await(function(o,u){const c=Z(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let p;return c.mutationQueue.lookupMutationBatch(h,u).next((g=>(H(g!==null,37113),p=g.keys(),c.mutationQueue.removeMutationBatch(h,g)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,p,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p))).next((()=>c.localDocuments.getDocuments(h,p)))}))})(r.localStore,t);K6(r,t,e),W6(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await oi(r,s)}catch(s){await xr(s)}}function W6(n,t){(n.ac.get(t)||[]).forEach((e=>{e.resolve()})),n.ac.delete(t)}function K6(n,t,e){const r=Z(n);let s=r.oc[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.oc[r.currentUser.toKey()]=s}}function t1(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.tc.get(t))n.ec.delete(r),e&&n.Xu.Ec(r,e);n.tc.delete(t),n.isPrimaryClient&&n._c.s_(t).forEach((r=>{n._c.containsKey(r)||Y6(n,r)}))}function Y6(n,t){n.nc.delete(t.path.canonicalString());const e=n.rc.get(t);e!==null&&(z1(n.remoteStore,e),n.rc=n.rc.remove(t),n.sc.delete(e),ru(n))}function Jl(n,t,e){for(const r of e)r instanceof H6?(n._c.addReference(r.key,t),Fg(n,r)):r instanceof j6?($(nu,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,t),n._c.containsKey(r.key)||Y6(n,r.key)):z(19791,{hc:r})}function Fg(n,t){const e=t.key,r=e.path.canonicalString();n.rc.get(e)||n.nc.has(r)||($(nu,"New document in limbo: "+e),n.nc.add(r),ru(n))}function ru(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const t=n.nc.values().next().value;n.nc.delete(t);const e=new G(lt.fromString(t)),r=n.uc.next();n.sc.set(r,new Pg(e)),n.rc=n.rc.insert(e,r),M6(n.remoteStore,new je(ke(bo(e.path)),r,"TargetPurposeLimboResolution",Ao.ce))}}async function oi(n,t,e){const r=Z(n),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach(((u,c)=>{o.push(r.lc(c,t,e).then((h=>{var p;if((h||e)&&r.isPrimaryClient){const g=h?!h.fromCache:(p=e==null?void 0:e.targetChanges.get(c.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(c.targetId,g?"current":"not-current")}if(h){s.push(h);const g=j1.vo(c.targetId,h);i.push(g)}})))})),await Promise.all(o),r.Xu.zn(s),await(async function(c,h){const p=Z(c);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>x.forEach(h,(T=>x.forEach(T.wo,(S=>p.persistence.referenceDelegate.addReference(g,T.targetId,S))).next((()=>x.forEach(T.bo,(S=>p.persistence.referenceDelegate.removeReference(g,T.targetId,S)))))))))}catch(g){if(!Lr(g))throw g;$(G1,"Failed to update sequence numbers: "+g)}for(const g of h){const T=g.targetId;if(!g.fromCache){const S=p.$o.get(T),N=S.snapshotVersion,L=S.withLastLimboFreeSnapshotVersion(N);p.$o=p.$o.insert(T,L)}}})(r.localStore,i))}async function Bg(n,t){const e=Z(n);if(!e.currentUser.isEqual(t)){$(nu,"User change. New user:",t.toKey());const r=await x6(e.localStore,t);e.currentUser=t,(function(i,o){i.ac.forEach((u=>{u.forEach((c=>{c.reject(new B(V.CANCELLED,o))}))})),i.ac.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await oi(e,r.zo)}}function $g(n,t){const e=Z(n),r=e.sc.get(t);if(r&&r.Zu)return st().add(r.key);{let s=st();const i=e.tc.get(t);if(!i)return s;for(const o of i??[]){const u=e.ec.get(o);s=s.unionWith(u.view.Uu)}return s}}function Q6(n){const t=Z(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=z6.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=$g.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Lg.bind(null,t),t.Xu.zn=vg.bind(null,t.eventManager),t.Xu.Ec=Rg.bind(null,t.eventManager),t}function qg(n){const t=Z(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Mg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Ug.bind(null,t),t}class fo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Oo(t.databaseInfo.databaseId),this.sharedClientState=this.Rc(t),this.persistence=this.Ic(t),await this.persistence.start(),this.localStore=this.Ac(t),this.gcScheduler=this.Vc(t,this.localStore),this.indexBackfillerScheduler=this.dc(t,this.localStore)}Vc(t,e){return null}dc(t,e){return null}Ac(t){return eg(this.persistence,new J8,t.initialUser,this.serializer)}Ic(t){return new V6(H1.C_,this.serializer)}Rc(t){return new ug}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}fo.provider={build:()=>new fo};class Hg extends fo{constructor(t){super(),this.cacheSizeBytes=t}Vc(t,e){H(this.persistence.referenceDelegate instanceof lo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new z3(r,t.asyncQueue,e)}Ic(t){const e=this.cacheSizeBytes!==void 0?ne.withCacheSize(this.cacheSizeBytes):ne.DEFAULT;return new V6((r=>lo.C_(r,e)),this.serializer)}}class e1{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Xl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Bg.bind(null,this.syncEngine),await wg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Ag})()}createDatastore(t){const e=Oo(t.databaseInfo.databaseId),r=L3(t.databaseInfo);return $3(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,o,u){return new lg(r,s,i,o,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>Xl(this.syncEngine,e,0)),(function(){return Ll.C()?new Ll:new D3})())}createSyncEngine(t,e){return(function(s,i,o,u,c,h,p){const g=new bg(s,i,o,u,c,h);return p&&(g.cc=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=Z(s);$(Me,"RemoteStore shutting down."),i.tu.add(5),await ii(i),i.ru.shutdown(),i.iu.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}e1.provider={build:()=>new e1};/**
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
 */class su{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.mc(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.mc(this.observer.error,t):Xe("Uncaught Error in snapshot listener:",t.toString()))}gc(){this.muted=!0}mc(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */const Vn="FirestoreClient";class jg{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=zt.UNAUTHENTICATED,this.clientId=_1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{$(Vn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>($(Vn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ze;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=X1(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Sa(n,t){n.asyncQueue.verifyOperationInProgress(),$(Vn,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await x6(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Zl(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Gg(n);$(Vn,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Kl(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Kl(t.remoteStore,s))),n._onlineComponents=t}async function Gg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Vn,"Using user provided OfflineComponentProvider");try{await Sa(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Ie("Error using user provided cache. Falling back to memory cache: "+e),await Sa(n,new fo)}}else $(Vn,"Using default OfflineComponentProvider"),await Sa(n,new Hg(void 0));return n._offlineComponents}async function X6(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Vn,"Using user provided OnlineComponentProvider"),await Zl(n,n._uninitializedComponentsProvider._online)):($(Vn,"Using default OnlineComponentProvider"),await Zl(n,new e1))),n._onlineComponents}function zg(n){return X6(n).then((t=>t.syncEngine))}async function po(n){const t=await X6(n),e=t.eventManager;return e.onListen=Ng.bind(null,t.syncEngine),e.onUnlisten=kg.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Og.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Vg.bind(null,t.syncEngine),e}function Wg(n,t,e,r){const s=new su(r),i=new eu(t,s,e);return n.asyncQueue.enqueueAndForget((async()=>J1(await po(n),i))),()=>{s.gc(),n.asyncQueue.enqueueAndForget((async()=>Z1(await po(n),i)))}}function Kg(n,t,e={}){const r=new ze;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,u,c,h){const p=new su({next:T=>{p.gc(),o.enqueueAndForget((()=>Z1(i,g)));const S=T.docs.has(u);!S&&T.fromCache?h.reject(new B(V.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&T.fromCache&&c&&c.source==="server"?h.reject(new B(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(T)},error:T=>h.reject(T)}),g=new eu(bo(u.path),p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return J1(i,g)})(await po(n),n.asyncQueue,t,e,r))),r.promise}function Yg(n,t,e={}){const r=new ze;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,u,c,h){const p=new su({next:T=>{p.gc(),o.enqueueAndForget((()=>Z1(i,g))),T.fromCache&&c.source==="server"?h.reject(new B(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(T)},error:T=>h.reject(T)}),g=new eu(u instanceof ws?N8(u):u,p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return J1(i,g)})(await po(n),n.asyncQueue,t,e,r))),r.promise}function Qg(n,t){const e=new ze;return n.asyncQueue.enqueueAndForget((async()=>xg(await zg(n),t,e))),e.promise}/**
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
 */const th="AsyncQueue";class eh{constructor(t=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new a6(this,"async_queue_retry"),this.jc=()=>{const r=Ca();r&&$(th,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=t;const e=Ca();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Jc(),this.Yc(t)}enterRestrictedMode(t){if(!this.$c){this.$c=!0,this.Gc=t||!1;const e=Ca();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.jc)}}enqueue(t){if(this.Jc(),this.$c)return new Promise((()=>{}));const e=new ze;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.qc.push(t),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(t){if(!Lr(t))throw t;$(th,"Operation failed with retryable error: "+t)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(t){const e=this.Hc.then((()=>(this.Qc=!0,t().catch((r=>{throw this.Wc=r,this.Qc=!1,Xe("INTERNAL UNHANDLED ERROR: ",nh(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=e,e}enqueueAfterDelay(t,e,r){this.Jc(),this.zc.indexOf(t)>-1&&(e=0);const s=Q1.createAndSchedule(this,t,e,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&z(47125,{el:nh(this.Wc)})}verifyOperationInProgress(){}async tl(){let t;do t=this.Hc,await t;while(t!==this.Hc)}nl(t){for(const e of this.Kc)if(e.timerId===t)return!0;return!1}rl(t){return this.tl().then((()=>{this.Kc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.Kc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tl()}))}il(t){this.zc.push(t)}Xc(t){const e=this.Kc.indexOf(t);this.Kc.splice(e,1)}}function nh(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Dr extends Do{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new eh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new eh(t),this._firestoreClient=void 0,await t}}}function Xg(n,t){const e=typeof n=="object"?n:_o(),r=typeof n=="string"?n:Zi,s=mo(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=_h("firestore");i&&Y3(s,...i)}return s}function qo(n){if(n._terminated)throw new B(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Jg(n),n._firestoreClient}function Jg(n){var r,s,i,o;const t=n._freezeSettings(),e=H3(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new jg(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}})(n._componentsProvider))}/**
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
 */class Zg{convertValue(t,e="none"){switch(kt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Pn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw z(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return or(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[Ds].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>Et(o.doubleValue)));return new ie(e)}convertGeoPoint(t){return new xe(Et(t.latitude),Et(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Js(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Cr(t));default:return null}}convertTimestamp(t){const e=Sn(t);return new gt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=lt.fromString(t);H(r6(r),9688,{name:t});const s=new Os(r.get(1),r.get(3)),i=new G(r.popFirst(5));return s.isEqual(e)||Xe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */class iu extends Zg{constructor(t){super(),this.firestore=t}convertBytes(t){return new ge(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Tt(this.firestore,null,e)}}const rh="@firebase/firestore",sh="4.16.0";/**
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
 */function ih(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
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
 */class J6{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new tm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(ri("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class tm extends J6{data(){return super.data()}}/**
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
 */function Z6(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new B(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ou{}class em extends ou{}function N5(n,t,...e){let r=[];t instanceof ou&&r.push(t),r=r.concat(e),(function(i){const o=i.filter((c=>c instanceof au)).length,u=i.filter((c=>c instanceof Ho)).length;if(o>1||o>0&&u>0)throw new B(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Ho extends em{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Ho(t,e,r)}_apply(t){const e=this._parse(t);return tf(t._query,e),new cr(t.firestore,t.converter,Ha(t._query,e))}_parse(t){const e=f6(t.firestore);return(function(i,o,u,c,h,p,g){let T;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new B(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ah(g,p);const N=[];for(const L of g)N.push(oh(c,i,L));T={arrayValue:{values:N}}}else T=oh(c,i,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ah(g,p),T=t9(u,o,g,p==="in"||p==="not-in");return bt.create(h,p,T)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function O5(n,t,e){const r=t,s=ri("where",n);return Ho._create(s,r,e)}class au extends ou{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new au(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:Ae.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let o=s;const u=i.getFlattenedFilters();for(const c of u)tf(o,c),o=Ha(o,c)})(t._query,e),new cr(t.firestore,t.converter,Ha(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function oh(n,t,e){if(typeof(e=wt(e))=="string"){if(e==="")throw new B(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!j2(t)&&e.indexOf("/")!==-1)throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(lt.fromString(e));if(!G.isDocumentKey(r))throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return wl(n,new G(r))}if(e instanceof Tt)return wl(n,e._key);throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Io(e)}.`)}function ah(n,t){if(!Array.isArray(n)||n.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function tf(n,t){const e=(function(s,i){for(const o of s)for(const u of o.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new B(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new B(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function nm(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class fs{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Wn extends J6{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new qi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(ri("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Wn._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Wn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Wn._jsonSchema={type:Nt("string",Wn._jsonSchemaVersion),bundleSource:Nt("string","DocumentSnapshot"),bundleName:Nt("string"),bundle:Nt("string")};class qi extends Wn{data(t={}){return super.data(t)}}class Kn{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new fs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new qi(this._firestore,this._userDataWriter,r.key,r,new fs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new B(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((u=>{Lt(s._snapshot.query)?Qa(s._snapshot.query):I1(s.query._query);const c=new qi(s._firestore,s._userDataWriter,u.doc.key,u.doc,new fs(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const c=new qi(s._firestore,s._userDataWriter,u.doc.key,u.doc,new fs(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),p=o.indexOf(u.doc.key)),{type:rm(u.type),doc:c,oldIndex:h,newIndex:p}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Kn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=_1.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function rm(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
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
 */Kn._jsonSchemaVersion="firestore/querySnapshot/1.0",Kn._jsonSchema={type:Nt("string",Kn._jsonSchemaVersion),bundleSource:Nt("string","QuerySnapshot"),bundleName:Nt("string"),bundle:Nt("string")};/**
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
 */function D5(n){n=De(n,Tt);const t=De(n.firestore,Dr),e=qo(t);return Kg(e,n._key).then((r=>ef(t,n,r)))}function k5(n){n=De(n,cr);const t=De(n.firestore,Dr),e=qo(t),r=new iu(t);return Z6(n._query),Yg(e,n._query).then((s=>new Kn(t,r,n,s)))}function V5(n,t,e){n=De(n,Tt);const r=De(n.firestore,Dr),s=nm(n.converter,t,e),i=f6(r);return sm(r,[Z3(i,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,We.none())])}function x5(n,...t){var h,p,g;n=wt(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||ih(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(ih(t[r])){const T=t[r];t[r]=(h=T.next)==null?void 0:h.bind(T),t[r+1]=(p=T.error)==null?void 0:p.bind(T),t[r+2]=(g=T.complete)==null?void 0:g.bind(T)}let i,o,u;if(n instanceof Tt)o=De(n.firestore,Dr),u=bo(n._key.path),i={next:T=>{t[r]&&t[r](ef(o,n,T))},error:t[r+1],complete:t[r+2]};else{const T=De(n,cr);o=De(T.firestore,Dr),u=T._query;const S=new iu(o);i={next:N=>{t[r]&&t[r](new Kn(o,S,T,N))},error:t[r+1],complete:t[r+2]},Z6(n._query)}const c=qo(o);return Wg(c,u,s,i)}function sm(n,t){const e=qo(n);return Qg(e,t)}function ef(n,t,e){const r=e.docs.get(t._key),s=new iu(n);return new Wn(n,s,t._key,r,new fs(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){a4(ir),Xn(new vn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),u=new Dr(new l4(r.getProvider("auth-internal")),new d4(o,r.getProvider("app-check-internal")),D4(o,s),o);return i={useFetchStreams:e,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),Ne(rh,sh,t),Ne(rh,sh,"esm2020")})();/**
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
 */const nf="firebasestorage.googleapis.com",rf="storageBucket",im=120*1e3,om=600*1e3;/**
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
 */class At extends Ue{constructor(t,e,r=0){super(Pa(t),`Firebase Storage: ${e} (${Pa(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,At.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Pa(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var It;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(It||(It={}));function Pa(n){return"storage/"+n}function uu(){const n="An unknown error occurred, please check the error payload for server response.";return new At(It.UNKNOWN,n)}function am(n){return new At(It.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function um(n){return new At(It.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function cm(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new At(It.UNAUTHENTICATED,n)}function lm(){return new At(It.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function hm(n){return new At(It.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function fm(){return new At(It.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function dm(){return new At(It.CANCELED,"User canceled the upload/download.")}function pm(n){return new At(It.INVALID_URL,"Invalid URL '"+n+"'.")}function gm(n){return new At(It.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function mm(){return new At(It.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+rf+"' property when initializing the app?")}function _m(){return new At(It.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Em(){return new At(It.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ym(n){return new At(It.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function n1(n){return new At(It.INVALID_ARGUMENT,n)}function sf(){return new At(It.APP_DELETED,"The Firebase app was deleted.")}function Tm(n){return new At(It.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function As(n,t){return new At(It.INVALID_FORMAT,"String does not match format '"+n+"': "+t)}function os(n){throw new At(It.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class de{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let r;try{r=de.makeFromUrl(t,e)}catch{return new de(t,"")}if(r.path==="")return r;throw gm(t)}static makeFromUrl(t,e){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(ft){ft.path.charAt(ft.path.length-1)==="/"&&(ft.path_=ft.path_.slice(0,-1))}const o="(/(.*))?$",u=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function h(ft){ft.path_=decodeURIComponent(ft.path)}const p="v[A-Za-z0-9_]+",g=e.replace(/[.]/g,"\\."),T="(/([^?#]*).*)?$",S=new RegExp(`^https?://${g}/${p}/b/${s}/o${T}`,"i"),N={bucket:1,path:3},L=e===nf?"(?:storage.googleapis.com|storage.cloud.google.com)":e,U="([^?#]*)",W=new RegExp(`^https?://${L}/${s}/${U}`,"i"),ct=[{regex:u,indices:c,postModify:i},{regex:S,indices:N,postModify:h},{regex:W,indices:{bucket:1,path:2},postModify:h}];for(let ft=0;ft<ct.length;ft++){const vt=ct[ft],St=vt.regex.exec(t);if(St){const v=St[vt.indices.bucket];let E=St[vt.indices.path];E||(E=""),r=new de(v,E),vt.postModify(r);break}}if(r==null)throw pm(t);return r}}class wm{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function Im(n,t,e){let r=1,s=null,i=null,o=!1,u=0;function c(){return u===2}let h=!1;function p(...U){h||(h=!0,t.apply(null,U))}function g(U){s=setTimeout(()=>{s=null,n(S,c())},U)}function T(){i&&clearTimeout(i)}function S(U,...W){if(h){T();return}if(U){T(),p.call(null,U,...W);return}if(c()||o){T(),p.call(null,U,...W);return}r<64&&(r*=2);let ct;u===1?(u=2,ct=0):ct=(r+Math.random())*1e3,g(ct)}let N=!1;function L(U){N||(N=!0,T(),!h&&(s!==null?(U||(u=2),clearTimeout(s),g(0)):U||(u=1)))}return g(0),i=setTimeout(()=>{o=!0,L(!0)},e),L}function Am(n){n(!1)}/**
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
 */function vm(n){return n!==void 0}function Rm(n){return typeof n=="object"&&!Array.isArray(n)}function cu(n){return typeof n=="string"||n instanceof String}function uh(n){return lu()&&n instanceof Blob}function lu(){return typeof Blob<"u"}function ch(n,t,e,r){if(r<t)throw n1(`Invalid value for '${n}'. Expected ${t} or greater.`);if(r>e)throw n1(`Invalid value for '${n}'. Expected ${e} or less.`)}/**
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
 */function hu(n,t,e){let r=t;return e==null&&(r=`https://${t}`),`${e}://${r}/v0${n}`}function of(n){const t=encodeURIComponent;let e="?";for(const r in n)if(n.hasOwnProperty(r)){const s=t(r)+"="+t(n[r]);e=e+s+"&"}return e=e.slice(0,-1),e}var Yn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Yn||(Yn={}));/**
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
 */function Cm(n,t){const e=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=t.indexOf(n)!==-1;return e||s||i}/**
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
 */class Sm{constructor(t,e,r,s,i,o,u,c,h,p,g,T=!0,S=!1){this.url_=t,this.method_=e,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=u,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=p,this.connectionFactory_=g,this.retry=T,this.isUsingEmulator=S,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((N,L)=>{this.resolve_=N,this.reject_=L,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new Ni(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=u=>{const c=u.loaded,h=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const u=i.getErrorCode()===Yn.NO_ERROR,c=i.getStatus();if(!u||Cm(c,this.additionalRetryCodes_)&&this.retry){const p=i.getErrorCode()===Yn.ABORT;r(!1,new Ni(!1,null,p));return}const h=this.successCodes_.indexOf(c)!==-1;r(!0,new Ni(h,i))})},e=(r,s)=>{const i=this.resolve_,o=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(u,u.getResponse());vm(c)?i(c):i()}catch(c){o(c)}else if(u!==null){const c=uu();c.serverResponse=u.getErrorText(),this.errorCallback_?o(this.errorCallback_(u,c)):o(c)}else if(s.canceled){const c=this.appDelete_?sf():dm();o(c)}else{const c=fm();o(c)}};this.canceled_?e(!1,new Ni(!1,null,!0)):this.backoffId_=Im(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&Am(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ni{constructor(t,e,r){this.wasSuccessCode=t,this.connection=e,this.canceled=!!r}}function Pm(n,t){t!==null&&t.length>0&&(n.Authorization="Firebase "+t)}function bm(n,t){n["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Nm(n,t){t&&(n["X-Firebase-GMPID"]=t)}function Om(n,t){t!==null&&(n["X-Firebase-AppCheck"]=t)}function Dm(n,t,e,r,s,i,o=!0,u=!1){const c=of(n.urlParams),h=n.url+c,p=Object.assign({},n.headers);return Nm(p,t),Pm(p,e),bm(p,i),Om(p,r),new Sm(h,n.method,p,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,u)}/**
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
 */function km(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Vm(...n){const t=km();if(t!==void 0){const e=new t;for(let r=0;r<n.length;r++)e.append(n[r]);return e.getBlob()}else{if(lu())return new Blob(n);throw new At(It.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function xm(n,t,e){return n.webkitSlice?n.webkitSlice(t,e):n.mozSlice?n.mozSlice(t,e):n.slice?n.slice(t,e):null}/**
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
 */function Lm(n){if(typeof atob>"u")throw ym("base-64");return atob(n)}/**
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
 */const be={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ba{constructor(t,e){this.data=t,this.contentType=e||null}}function Mm(n,t){switch(n){case be.RAW:return new ba(af(t));case be.BASE64:case be.BASE64URL:return new ba(uf(n,t));case be.DATA_URL:return new ba(Fm(t),Bm(t))}throw uu()}function af(n){const t=[];for(let e=0;e<n.length;e++){let r=n.charCodeAt(e);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(e<n.length-1&&(n.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const i=r,o=n.charCodeAt(++e);r=65536|(i&1023)<<10|o&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function Um(n){let t;try{t=decodeURIComponent(n)}catch{throw As(be.DATA_URL,"Malformed data URL.")}return af(t)}function uf(n,t){switch(n){case be.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw As(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case be.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw As(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=Lm(t)}catch(s){throw s.message.includes("polyfill")?s:As(n,"Invalid character found")}const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}class cf{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw As(be.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=e[1]||null;r!=null&&(this.base64=$m(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function Fm(n){const t=new cf(n);return t.base64?uf(be.BASE64,t.rest):Um(t.rest)}function Bm(n){return new cf(n).contentType}function $m(n,t){return n.length>=t.length?n.substring(n.length-t.length)===t:!1}/**
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
 */class _n{constructor(t,e){let r=0,s="";uh(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if(uh(this.data_)){const r=this.data_,s=xm(r,t,e);return s===null?null:new _n(s)}else{const r=new Uint8Array(this.data_.buffer,t,e-t);return new _n(r,!0)}}static getBlob(...t){if(lu()){const e=t.map(r=>r instanceof _n?r.data_:r);return new _n(Vm.apply(null,e))}else{const e=t.map(o=>cu(o)?Mm(be.RAW,o).data:o.data_);let r=0;e.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return e.forEach(o=>{for(let u=0;u<o.length;u++)s[i++]=o[u]}),new _n(s,!0)}}uploadData(){return this.data_}}/**
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
 */function lf(n){let t;try{t=JSON.parse(n)}catch{return null}return Rm(t)?t:null}/**
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
 */function qm(n){if(n.length===0)return null;const t=n.lastIndexOf("/");return t===-1?"":n.slice(0,t)}function Hm(n,t){const e=t.split("/").filter(r=>r.length>0).join("/");return n.length===0?e:n+"/"+e}function hf(n){const t=n.lastIndexOf("/",n.length-2);return t===-1?n:n.slice(t+1)}/**
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
 */function jm(n,t){return t}class Jt{constructor(t,e,r,s){this.server=t,this.local=e||t,this.writable=!!r,this.xform=s||jm}}let Oi=null;function Gm(n){return!cu(n)||n.length<2?n:hf(n)}function ff(){if(Oi)return Oi;const n=[];n.push(new Jt("bucket")),n.push(new Jt("generation")),n.push(new Jt("metageneration")),n.push(new Jt("name","fullPath",!0));function t(i,o){return Gm(o)}const e=new Jt("name");e.xform=t,n.push(e);function r(i,o){return o!==void 0?Number(o):o}const s=new Jt("size");return s.xform=r,n.push(s),n.push(new Jt("timeCreated")),n.push(new Jt("updated")),n.push(new Jt("md5Hash",null,!0)),n.push(new Jt("cacheControl",null,!0)),n.push(new Jt("contentDisposition",null,!0)),n.push(new Jt("contentEncoding",null,!0)),n.push(new Jt("contentLanguage",null,!0)),n.push(new Jt("contentType",null,!0)),n.push(new Jt("metadata","customMetadata",!0)),Oi=n,Oi}function zm(n,t){function e(){const r=n.bucket,s=n.fullPath,i=new de(r,s);return t._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:e})}function Wm(n,t,e){const r={};r.type="file";const s=e.length;for(let i=0;i<s;i++){const o=e[i];r[o.local]=o.xform(r,t[o.server])}return zm(r,n),r}function df(n,t,e){const r=lf(t);return r===null?null:Wm(n,r,e)}function Km(n,t,e,r){const s=lf(t);if(s===null||!cu(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(h=>{const p=n.bucket,g=n.fullPath,T="/b/"+o(p)+"/o/"+o(g),S=hu(T,e,r),N=of({alt:"media",token:h});return S+N})[0]}function Ym(n,t){const e={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(e[i.server]=n[i.local])}return JSON.stringify(e)}class pf{constructor(t,e,r,s){this.url=t,this.method=e,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function gf(n){if(!n)throw uu()}function Qm(n,t){function e(r,s){const i=df(n,s,t);return gf(i!==null),i}return e}function Xm(n,t){function e(r,s){const i=df(n,s,t);return gf(i!==null),Km(i,s,n.host,n._protocol)}return e}function mf(n){function t(e,r){let s;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?s=lm():s=cm():e.getStatus()===402?s=um(n.bucket):e.getStatus()===403?s=hm(n.path):s=r,s.status=e.getStatus(),s.serverResponse=r.serverResponse,s}return t}function Jm(n){const t=mf(n);function e(r,s){let i=t(r,s);return r.getStatus()===404&&(i=am(n.path)),i.serverResponse=s.serverResponse,i}return e}function Zm(n,t,e){const r=t.fullServerUrl(),s=hu(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,u=new pf(s,i,Xm(n,e),o);return u.errorHandler=Jm(t),u}function t5(n,t){return n&&n.contentType||t&&t.type()||"application/octet-stream"}function e5(n,t,e){const r=Object.assign({},e);return r.fullPath=n.path,r.size=t.size(),r.contentType||(r.contentType=t5(null,t)),r}function n5(n,t,e,r,s){const i=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function u(){let ct="";for(let ft=0;ft<2;ft++)ct=ct+Math.random().toString().slice(2);return ct}const c=u();o["Content-Type"]="multipart/related; boundary="+c;const h=e5(t,r,s),p=Ym(h,e),g="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+c+`\r
Content-Type: `+h.contentType+`\r
\r
`,T=`\r
--`+c+"--",S=_n.getBlob(g,r,T);if(S===null)throw _m();const N={name:h.fullPath},L=hu(i,n.host,n._protocol),U="POST",W=n.maxUploadRetryTime,rt=new pf(L,U,Qm(n,e),W);return rt.urlParams=N,rt.headers=o,rt.body=S.uploadData(),rt.errorHandler=mf(t),rt}class r5{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Yn.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Yn.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Yn.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,r,s,i){if(this.sent_)throw os("cannot .send() more than once");if(sr(t)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(e,t,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw os("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw os("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw os("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw os("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class s5 extends r5{initXhr(){this.xhr_.responseType="text"}}function _f(){return new s5}/**
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
 */class nr{constructor(t,e){this._service=t,e instanceof de?this._location=e:this._location=de.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new nr(t,e)}get root(){const t=new de(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return hf(this._location.path)}get storage(){return this._service}get parent(){const t=qm(this._location.path);if(t===null)return null;const e=new de(this._location.bucket,t);return new nr(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw Tm(t)}}function i5(n,t,e){n._throwIfRoot("uploadBytes");const r=n5(n.storage,n._location,ff(),new _n(t,!0),e);return n.storage.makeRequestWithTokens(r,_f).then(s=>({metadata:s,ref:n}))}function o5(n){n._throwIfRoot("getDownloadURL");const t=Zm(n.storage,n._location,ff());return n.storage.makeRequestWithTokens(t,_f).then(e=>{if(e===null)throw Em();return e})}function a5(n,t){const e=Hm(n._location.path,t),r=new de(n._location.bucket,e);return new nr(n.storage,r)}/**
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
 */function u5(n){return/^[A-Za-z]+:\/\//.test(n)}function c5(n,t){return new nr(n,t)}function Ef(n,t){if(n instanceof fu){const e=n;if(e._bucket==null)throw mm();const r=new nr(e,e._bucket);return t!=null?Ef(r,t):r}else return t!==void 0?a5(n,t):n}function l5(n,t){if(t&&u5(t)){if(n instanceof fu)return c5(n,t);throw n1("To use ref(service, url), the first argument must be a Storage instance.")}else return Ef(n,t)}function lh(n,t){const e=t==null?void 0:t[rf];return e==null?null:de.makeFromBucketSpec(e,n)}function h5(n,t,e,r={}){n.host=`${t}:${e}`;const s=sr(t);s&&r1(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:wh(i,n.app.options.projectId))}class fu{constructor(t,e,r,s,i,o=!1){this.app=t,this._authProvider=e,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=nf,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=im,this._maxUploadRetryTime=om,this._requests=new Set,s!=null?this._bucket=de.makeFromBucketSpec(s,this._host):this._bucket=lh(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=de.makeFromBucketSpec(this._url,t):this._bucket=lh(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){ch("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){ch("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){if(re(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new nr(this,t)}_makeRequest(t,e,r,s,i=!0){if(this._deleted)return new wm(sf());{const o=Dm(t,this._appId,r,s,e,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,e){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,r,s).getPromise()}}const hh="@firebase/storage",fh="0.14.3";/**
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
 */const yf="storage";function L5(n,t,e){return n=wt(n),i5(n,t,e)}function M5(n){return n=wt(n),o5(n)}function U5(n,t){return n=wt(n),l5(n,t)}function f5(n=_o(),t){n=wt(n);const r=mo(n,yf).getImmediate({identifier:t}),s=_h("storage");return s&&d5(r,...s),r}function d5(n,t,e,r={}){h5(n,t,e,r)}function p5(n,{instanceIdentifier:t}){const e=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new fu(e,r,s,t,ir)}function g5(){Xn(new vn(yf,p5,"PUBLIC").setMultipleInstances(!0)),Ne(hh,fh,""),Ne(hh,fh,"esm2020")}g5();const m5={apiKey:"AIzaSyA-uHRDW6gi3lwXvUiDqdv08xZGp1nBgKY",authDomain:"euclid-projects.firebaseapp.com",projectId:"euclid-projects",storageBucket:"euclid-projects.firebasestorage.app",messagingSenderId:"1024604491016",appId:"1:1024604491016:web:b9a9a69cd0c4f9bf4e30bd",measurementId:"G-N5HJ2EXRN1"};let rr=null;try{rr=R0().length>0?_o():vh(m5)}catch(n){console.warn("[Firebase] initializeApp error:",n)}let Tf=null;try{rr&&(Tf=Y7(rr))}catch(n){console.warn("[Firebase] getAuth error:",n)}const F5=Tf;let wf=null;try{rr&&(wf=Xg(rr))}catch(n){console.warn("[Firebase] getFirestore error:",n)}const B5=wf;let If=null;try{rr&&(If=f5(rr))}catch(n){console.warn("[Firebase] getStorage error:",n)}const $5=If;export{fn as G,B5 as a,$5 as b,F5 as c,V5 as d,P5 as e,m5 as f,Y7 as g,T5 as h,vh as i,y5 as j,w5 as k,E5 as l,v5 as m,D5 as n,A5 as o,L5 as p,M5 as q,U5 as r,R5 as s,N5 as t,I5 as u,S5 as v,O5 as w,k5 as x,x5 as y,b5 as z};
