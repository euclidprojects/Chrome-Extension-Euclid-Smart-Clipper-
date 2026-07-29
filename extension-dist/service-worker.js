import{L as De,_ as ne,C as ie,x as se,S as Y,E as Q,y as E,z as H,B as xe,D as we,F as T,H as Z,I as Fe,J as ee,K as Ee,M as Ve,N as Ge,O as We,P as Ke,Q as ze,g as Be,i as D,R as O,c as oe}from"./assets/auth-8vKn-o0A.js";function ke(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const He=ke,Se=new Q("auth","Firebase",ke());/**
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
 */const x=new De("@firebase/auth");function qe(r,...e){x.logLevel<=we.WARN&&x.warn(`Auth (${Y}): ${r}`,...e)}function M(r,...e){x.logLevel<=we.ERROR&&x.error(`Auth (${Y}): ${r}`,...e)}/**
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
 */function F(r,...e){throw te(r,...e)}function Ne(r,...e){return te(r,...e)}function Ae(r,e,t){const n={...He(),[e]:t};return new Q("auth","Firebase",n).create(e,{appName:r.name})}function C(r){return Ae(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function te(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Se.create(r,...e)}function h(r,e,...t){if(!r)throw te(e,...t)}function I(r){const e="INTERNAL ASSERTION FAILED: "+r;throw M(e),new Error(e)}function V(r,e){r||I(e)}function $e(){return ae()==="http:"||ae()==="https:"}function ae(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
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
 */function je(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($e()||We()||"connection"in navigator)?navigator.onLine:!0}function Je(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
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
 */class Xe{constructor(e,t){this.shortDelay=e,this.longDelay=t,V(t>e,"Short delay should be less than long delay!"),this.isMobile=Ve()||Ge()}get(){return je()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ye(r,e){V(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ce{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;I("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;I("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;I("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Qe={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Ze=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],et=new Xe(3e4,6e4);function re(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function P(r,e,t,n,i={}){return be(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});const c=ee({...o,key:r.config.apiKey}).slice(1),a=await r._getAdditionalHeaders();a["Content-Type"]="application/json",r.languageCode&&(a["X-Firebase-Locale"]=r.languageCode);const u={method:e,headers:a,...s};return Ke()||(u.referrerPolicy="strict-origin-when-cross-origin"),r.emulatorConfig&&Ee(r.emulatorConfig.host)&&(u.credentials="include"),Ce.fetch()(await ve(r,r.config.apiHost,t,c),u)})}async function be(r,e,t){r._canInitEmulator=!1;const n={...Qe,...e};try{const i=new rt(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw U(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[a,u]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw U(r,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw U(r,"email-already-in-use",o);if(a==="USER_DISABLED")throw U(r,"user-disabled",o);const d=n[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Ae(r,d,u);F(r,d)}}catch(i){if(i instanceof Z)throw i;F(r,"network-request-failed",{message:String(i)})}}async function tt(r,e,t,n,i={}){const s=await P(r,e,t,n,i);return"mfaPendingCredential"in s&&F(r,"multi-factor-auth-required",{_serverResponse:s}),s}async function ve(r,e,t,n){const i=`${e}${t}?${n}`,s=r,o=s.config.emulator?Ye(r.config,i):`${r.config.apiScheme}://${i}`;return Ze.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class rt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Ne(this.auth,"network-request-failed")),et.get())})}}function U(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=Ne(r,e,n);return i.customData._tokenResponse=t,i}/**
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
 */async function nt(r,e){return P(r,"POST","/v1/accounts:delete",e)}async function G(r,e){return P(r,"POST","/v1/accounts:lookup",e)}/**
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
 */function b(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function it(r,e=!1){const t=H(r),n=await t.getIdToken(e),i=Pe(n);h(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:b(q(i.auth_time)),issuedAtTime:b(q(i.iat)),expirationTime:b(q(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function q(r){return Number(r)*1e3}function Pe(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return M("JWT malformed, contained fewer than 3 sections"),null;try{const i=Fe(t);return i?JSON.parse(i):(M("Failed to decode base64 JWT payload"),null)}catch(i){return M("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ce(r){const e=Pe(r);return h(e,"internal-error"),h(typeof e.exp<"u","internal-error"),h(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function J(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Z&&st(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function st({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
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
 */class ot{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class X{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=b(this.lastLoginAt),this.creationTime=b(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function W(r){var l;const e=r.auth,t=await r.getIdToken(),n=await J(r,G(e,{idToken:t}));h(n==null?void 0:n.users.length,e,"internal-error");const i=n.users[0];r._notifyReloadListener(i);const s=(l=i.providerUserInfo)!=null&&l.length?Re(i.providerUserInfo):[],o=ct(r.providerData,s),c=r.isAnonymous,a=!(r.email&&i.passwordHash)&&!(o!=null&&o.length),u=c?a:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new X(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(r,d)}async function at(r){const e=H(r);await W(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ct(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Re(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function ut(r,e){const t=await be(r,{},async()=>{const n=ee({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=await ve(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:c,body:n};return r.emulatorConfig&&Ee(r.emulatorConfig.host)&&(a.credentials="include"),Ce.fetch()(o,a)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lt(r,e){return P(r,"POST","/v2/accounts:revokeToken",re(r,e))}/**
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
 */class N{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){h(e.idToken,"internal-error"),h(typeof e.idToken<"u","internal-error"),h(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ce(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){h(e.length!==0,"internal-error");const t=ce(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(h(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await ut(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new N;return n&&(h(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(h(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(h(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new N,this.toJSON())}_performRefresh(){return I("not implemented")}}/**
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
 */function y(r,e){h(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class _{constructor({uid:e,auth:t,stsTokenManager:n,...i}){this.providerId="firebase",this.proactiveRefresh=new ot(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new X(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await J(this,this.stsTokenManager.getToken(this.auth,e));return h(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return it(this,e)}reload(){return at(this)}_assign(e){this!==e&&(h(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new _({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){h(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await W(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(E(this.auth.app))return Promise.reject(C(this.auth));const e=await this.getIdToken();return await J(this,nt(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,a=t._redirectEventId??void 0,u=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:l,emailVerified:f,isAnonymous:m,providerData:p,stsTokenManager:g}=t;h(l&&g,e,"internal-error");const w=N.fromJSON(this.name,g);h(typeof l=="string",e,"internal-error"),y(n,e.name),y(i,e.name),h(typeof f=="boolean",e,"internal-error"),h(typeof m=="boolean",e,"internal-error"),y(s,e.name),y(o,e.name),y(c,e.name),y(a,e.name),y(u,e.name),y(d,e.name);const S=new _({uid:l,auth:e,email:i,emailVerified:f,displayName:n,isAnonymous:m,photoURL:o,phoneNumber:s,tenantId:c,stsTokenManager:w,createdAt:u,lastLoginAt:d});return p&&Array.isArray(p)&&(S.providerData=p.map(R=>({...R}))),a&&(S._redirectEventId=a),S}static async _fromIdTokenResponse(e,t,n=!1){const i=new N;i.updateFromServerResponse(t);const s=new _({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await W(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];h(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Re(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new N;c.updateFromIdToken(n);const a=new _({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new X(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(a,u),a}}/**
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
 */const ue=new Map;function k(r){V(r instanceof Function,"Expected a class definition");let e=ue.get(r);return e?(V(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,ue.set(r,e),e)}/**
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
 */class Oe{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Oe.type="NONE";const le=Oe;/**
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
 */function $(r,e,t){return`firebase:${r}:${e}:${t}`}class A{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=$(this.userKey,i.apiKey,s),this.fullPersistenceKey=$("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await G(this.auth,{idToken:e}).catch(()=>{});return t?_._fromGetAccountInfoResponse(this.auth,t,e):null}return _._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new A(k(le),e,n);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||k(le);const o=$(n,e.config.apiKey,e.name);let c=null;for(const u of t)try{const d=await u._get(o);if(d){let l;if(typeof d=="string"){const f=await G(e,{idToken:d}).catch(()=>{});if(!f)break;l=await _._fromGetAccountInfoResponse(e,f,d)}else l=_._fromJSON(e,d);u!==s&&(c=l),s=u;break}}catch{}const a=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!a.length?new A(s,e,n):(s=a[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new A(s,e,n))}}/**
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
 */function de(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(pt(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(dt(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(gt(e))return"Blackberry";if(_t(e))return"Webos";if(ht(e))return"Safari";if((e.includes("chrome/")||ft(e))&&!e.includes("edge/"))return"Chrome";if(mt(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function dt(r=T()){return/firefox\//i.test(r)}function ht(r=T()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ft(r=T()){return/crios\//i.test(r)}function pt(r=T()){return/iemobile/i.test(r)}function mt(r=T()){return/android/i.test(r)}function gt(r=T()){return/blackberry/i.test(r)}function _t(r=T()){return/webos/i.test(r)}/**
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
 */function Ue(r,e=[]){let t;switch(r){case"Browser":t=de(T());break;case"Worker":t=`${de(T())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Y}/${n}`}/**
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
 */class It{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((o,c)=>{try{const a=e(s);o(a)}catch(a){c(a)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
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
 */async function Tt(r,e={}){return P(r,"GET","/v2/passwordPolicy",re(r,e))}/**
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
 */const yt=6;class wt{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??yt,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Et{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new he(this),this.idTokenSubscription=new he(this),this.beforeStateQueue=new It(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Se,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=k(t)),this._initializationPromise=this.queue(async()=>{var n,i,s;if(!this._deleted&&(this.persistenceManager=await A.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await G(this,{idToken:e}),n=await _._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(E(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=n==null?void 0:n._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===c)&&(a!=null&&a.user)&&(n=a.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return h(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await W(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Je()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(E(this.app))return Promise.reject(C(this));const t=e?H(e):null;return t&&h(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&h(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return E(this.app)?Promise.reject(C(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return E(this.app)?Promise.reject(C(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(k(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Tt(this),t=new wt(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Q("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await lt(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&k(e)||this._popupRedirectResolver;h(t,this,"argument-error"),this.redirectPersistenceManager=await A.create(this,[k(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(h(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const a=e.addObserver(t,n,i);return()=>{o=!0,a()}}else{const a=e.addObserver(t);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return h(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ue(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(E(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&qe(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Le(r){return H(r)}class he{constructor(e){this.auth=e,this.observer=null,this.addObserver=xe(t=>this.observer=t)}get next(){return h(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function kt(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(k);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}/**
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
 */class St{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return I("not implemented")}_getIdTokenResponse(e){return I("not implemented")}_linkToIdToken(e,t){return I("not implemented")}_getReauthenticationResolver(e){return I("not implemented")}}/**
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
 */async function j(r,e){return tt(r,"POST","/v1/accounts:signInWithIdp",re(r,e))}/**
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
 */const Nt="http://localhost";class K extends St{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new K(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):F("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i,...s}=t;if(!n||!i)return null;const o=new K(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return j(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,j(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,j(e,t)}buildRequest(){const e={requestUri:Nt,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ee(t)}return e}}/**
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
 */class z{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await _._fromIdTokenResponse(e,n,i),o=fe(n);return new z({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=fe(n);return new z({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function fe(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
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
 */class B extends Z{constructor(e,t,n,i){super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,B.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new B(e,t,n,i)}}function At(r,e,t,n){return t._getIdTokenResponse(r).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?B._fromErrorAndOperation(r,s,e,n):s})}/**
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
 */async function Ct(r,e,t=!1){if(E(r.app))return Promise.reject(C(r));const n="signIn",i=await At(r,n,e),s=await z._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function bt(r,e){return Ct(Le(r),e)}var pe="@firebase/auth",me="1.13.3";/**
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
 */class vt{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){h(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Pt(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Rt(r){ne(new ie("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;h(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ue(r)},u=new Et(n,i,s,a);return kt(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),ne(new ie("auth-internal",e=>{const t=Le(e.getProvider("auth").getImmediate());return(n=>new vt(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),se(pe,me,Pt(r)),se(pe,me,"esm2020")}Rt("WebExtension");console.info("[Background] Service worker loaded",{extensionId:typeof chrome<"u"&&(chrome!=null&&chrome.runtime)?chrome.runtime.id:"",timestamp:new Date().toISOString()});var _e;typeof chrome<"u"&&((_e=chrome==null?void 0:chrome.runtime)!=null&&_e.id)&&(ze(),console.info("Confirm this origin is registered in Firebase Authorized Domains:",Be()));const ge="offscreen.html";let L=null;async function Ot(){var e;console.info("[Background] Ensuring offscreen document");const r=chrome.runtime.getURL(ge);if(typeof chrome<"u"&&chrome.runtime&&"getContexts"in chrome.runtime){if((await chrome.runtime.getContexts({contextTypes:["OFFSCREEN_DOCUMENT"],documentUrls:[r]})).length>0){console.info("[Background] Offscreen context found");return}}else if(chrome.offscreen&&"hasDocument"in chrome.offscreen&&await chrome.offscreen.hasDocument()){console.info("[Background] Offscreen context found");return}L||(L=chrome.offscreen.createDocument({url:ge,reasons:[((e=chrome.offscreen.Reason)==null?void 0:e.IFRAME_SCRIPTING)||"IFRAME_SCRIPTING"],justification:"Host the Firebase Google authentication iframe."}).finally(()=>{L=null}),console.info("[Background] Offscreen document created")),await L}async function Ut(){await Ot();const r=await new Promise(e=>{chrome.runtime.sendMessage({target:"offscreen",type:"PING_OFFSCREEN"},t=>{chrome.runtime.lastError?e({success:!1}):e(t)})});if(!(r!=null&&r.success))throw new Error("The offscreen authentication document did not initialize.");console.info("[Background] Offscreen ping succeeded");try{console.info("[Background] Sending Google auth request");const e=await new Promise((t,n)=>{chrome.runtime.sendMessage({target:"offscreen",type:"FIREBASE_GOOGLE_SIGN_IN"},i=>{chrome.runtime.lastError?n(new Error(chrome.runtime.lastError.message||"The offscreen authentication document returned no response.")):i?t(i):n(new Error("The offscreen authentication document returned no response."))})});return console.info("[Background] Offscreen response received"),e}catch(e){throw console.error("[Background] Offscreen request failed",{message:e==null?void 0:e.message}),new Error((e==null?void 0:e.message)||"Communication with the authentication document failed.")}}async function Lt(){if(!chrome.offscreen)throw new Error("Offscreen API is not supported in this browser environment.");const r=await Ut();if(!(r!=null&&r.success)){const s=r==null?void 0:r.error,o=typeof s=="object"?s==null?void 0:s.message:typeof s=="string"?s:"Google authentication failed.",c=new Error(o||"Google authentication failed.");throw c.code=typeof s=="object"?s==null?void 0:s.code:"auth/google-auth-failed",c}if(!r.credential||typeof r.credential!="object")throw new Error("Google authentication returned no serialized credential.");const e=K.fromJSON(r.credential);if(!e)throw new Error("The serialized Google OAuth credential is invalid.");if(!oe)throw new Error("Firebase Auth is not initialized in the service worker.");const n=(await bt(oe,e)).user;if(!(n!=null&&n.uid))throw new Error("Firebase authentication returned no user UID.");const i=await n.getIdToken();return{success:!0,user:{uid:n.uid,displayName:n.displayName||null,email:n.email||null,photoURL:n.photoURL||null,emailVerified:!!n.emailVerified},idToken:i}}var Ie,Te,ye;typeof chrome<"u"&&chrome.runtime&&(chrome.runtime.onInstalled.addListener(()=>{chrome.contextMenus&&chrome.contextMenus.removeAll(()=>{chrome.contextMenus.create({id:"euclid-parent",title:"Euclid Smart Clipper",contexts:["all"]}),chrome.contextMenus.create({parentId:"euclid-parent",id:"euclid-screenshot",title:"Capture Screenshot",contexts:["all"]}),chrome.contextMenus.create({parentId:"euclid-parent",id:"euclid-youtube-note",title:"Create YouTube Note",contexts:["all"]}),chrome.contextMenus.create({parentId:"euclid-parent",id:"euclid-bookmark",title:"Save Bookmark",contexts:["all"]}),chrome.contextMenus.create({parentId:"euclid-parent",id:"euclid-simplified-article",title:"Save Simplified Article",contexts:["all"]}),chrome.contextMenus.create({parentId:"euclid-parent",id:"euclid-full-page",title:"Save Full Page",contexts:["all"]}),chrome.contextMenus.create({parentId:"euclid-parent",id:"euclid-save-clip",title:"Save Clip",contexts:["all"]})})}),(Ie=chrome.tabs)!=null&&Ie.onActivated&&chrome.tabs.onActivated.addListener(r=>{r.tabId&&chrome.tabs.sendMessage(r.tabId,{type:"CLEANUP_ACTIVE_OVERLAY"}).catch(()=>{})}),(Te=chrome.tabs)!=null&&Te.onUpdated&&chrome.tabs.onUpdated.addListener((r,e)=>{(e.status==="loading"||e.url)&&chrome.tabs.sendMessage(r,{type:"CLEANUP_ACTIVE_OVERLAY"}).catch(()=>{})}),chrome.contextMenus&&chrome.contextMenus.onClicked.addListener((r,e)=>{if(!(!e||!e.id)&&D(e.url)){if(r.menuItemId==="euclid-open-sidepanel"){chrome.sidePanel&&chrome.sidePanel.open&&chrome.sidePanel.open({tabId:e.id});return}chrome.tabs.sendMessage(e.id,{type:"CONTEXT_MENU_CLICK",action:r.menuItemId,selectionText:r.selectionText,srcUrl:r.srcUrl,pageUrl:r.pageUrl||e.url,pageTitle:e.title}).catch(()=>{})}}),(ye=chrome.commands)!=null&&ye.onCommand&&chrome.commands.onCommand.addListener(r=>{chrome.tabs.query({active:!0,currentWindow:!0},e=>{var t;(t=e[0])!=null&&t.id&&D(e[0].url)&&chrome.tabs.sendMessage(e[0].id,{type:"COMMAND_TRIGGERED",action:`command_${r}`}).catch(()=>{})})}));const v=async r=>{var n;let e=1200,t=850;try{if((n=chrome.system)!=null&&n.display){const i=await chrome.system.display.getInfo(),s=i.find(o=>o.isPrimary)||i[0];s&&s.workArea&&(e=Math.max(760,Math.min(1200,s.workArea.width-40)),t=Math.max(560,Math.min(850,s.workArea.height-40)))}}catch{}return chrome.windows.create({url:r,type:"popup",width:e,height:t,focused:!0})};chrome.runtime.onMessage.addListener((r,e,t)=>{var n,i;if(!r||typeof r!="object"||r.target==="offscreen")return!1;if(console.info("[Background] Message received",{type:r==null?void 0:r.type,target:r==null?void 0:r.target,senderId:e==null?void 0:e.id}),r.type==="PING_BACKGROUND"||r.type==="SERVICE_WORKER_PING"||r.type==="PING_SERVICE_WORKER"||r.type===O.SERVICE_WORKER_PING||r.type===O.PING_BACKGROUND)return t({success:!0,status:"alive",message:"SERVICE_WORKER_PONG",extensionId:chrome.runtime.id,data:{status:"service_worker_active"}}),!1;if(r.type==="GOOGLE_SIGN_IN"||r.type==="START_GOOGLE_SIGN_IN"||r.type===O.START_GOOGLE_SIGN_IN||r.type===O.GOOGLE_SIGN_IN||r.type==="EUCLID_GOOGLE_SIGN_IN"||r.type==="GOOGLE_SIGN_IN_REQUEST")return console.info("[Background] GOOGLE_SIGN_IN received"),console.info("[Google Auth] 2. Service worker received request"),Lt().then(s=>{console.info("[Background] Authentication response received",s),t({success:!0,user:s.user,idToken:s.idToken,result:s})}).catch(s=>{console.error("[Background Google Auth Error]",s),t({success:!1,error:{code:(s==null?void 0:s.code)||"auth/unknown-error",message:(s==null?void 0:s.message)||String(s)}})}),!0;if(r.type==="START_SCREENSHOT_CAPTURE")return Mt(r.payload).then(s=>t(s)).catch(s=>t({success:!1,error:s instanceof Error?s.message:"Screenshot capture failed."})),!0;if(r.type==="START_REGION_SELECTION"||r.type==="start_region_selection")return chrome.tabs.query({active:!0,currentWindow:!0},s=>{const o=s[0];if(!o||!o.id){t({success:!1,error:"No active tab found"});return}if(!D(o.url)){t({success:!1,error:"This page cannot be captured or annotated because Chrome does not allow extensions to access it."});return}chrome.tabs.sendMessage(o.id,{type:"START_REGION_SELECTION"},c=>{chrome.runtime.lastError?chrome.scripting.executeScript({target:{tabId:o.id},files:["contentScript.js"]}).then(()=>{chrome.tabs.sendMessage(o.id,{type:"START_REGION_SELECTION"},a=>{t(a||{success:!0})})}).catch(()=>{t({success:!1,error:"This page cannot be captured or annotated because Chrome does not allow extensions to access it."})}):t(c||{success:!0})})}),!0;if(r.type==="REGION_SELECTION_CONFIRMED"||r.type==="ELEMENT_SELECTED"){const s=r.data,o=(n=e.tab)==null?void 0:n.id;return o&&chrome.tabs.sendMessage(o,{type:"CLEANUP_ACTIVE_OVERLAY"}).catch(()=>{}),chrome.tabs.captureVisibleTab(null,{format:"png"},async c=>{var l,f,m,p;if(chrome.runtime.lastError||!c){console.error("Failed to capture visible tab:",chrome.runtime.lastError);return}const a="job_"+Date.now(),u={id:a,type:r.type==="ELEMENT_SELECTED"?"element":"selected_area",tabId:o||0,sourceUrl:(s==null?void 0:s.sourceUrl)||((l=e.tab)==null?void 0:l.url)||"",sourceTitle:(s==null?void 0:s.sourceTitle)||((f=e.tab)==null?void 0:f.title)||"Captured Area",createdAt:Date.now(),status:"editing",dataUrl:c,selectionRect:s==null?void 0:s.selectionRect};try{(m=chrome.storage)!=null&&m.session&&await chrome.storage.session.set({[a]:u}),await((p=chrome.storage)==null?void 0:p.local.set({[a]:u}))}catch(g){console.warn("Storage save fallback:",g)}const d=chrome.runtime.getURL(`screenshot-editor.html?jobId=${a}`);v(d)}),!0}return r.type==="CAPTURE_VISIBLE_TAB"?(chrome.tabs.captureVisibleTab(null,{format:"png"},async s=>{var u,d,l,f,m,p;if(chrome.runtime.lastError||!s){t({success:!1,error:"Capture failed"});return}const o="job_"+Date.now(),c={id:o,type:"visible_page",sourceUrl:((u=e.tab)==null?void 0:u.url)||((d=r.data)==null?void 0:d.sourceUrl)||"",sourceTitle:((l=e.tab)==null?void 0:l.title)||((f=r.data)==null?void 0:f.sourceTitle)||"Visible Webpage",createdAt:Date.now(),status:"editing",dataUrl:s};(m=chrome.storage)!=null&&m.session&&await chrome.storage.session.set({[o]:c}),await((p=chrome.storage)==null?void 0:p.local.set({[o]:c}));const a=chrome.runtime.getURL(`screenshot-editor.html?jobId=${o}`);v(a),t({success:!0,data:{jobId:o}})}),!0):r.type==="OVERLAY_CANCELLED"?((i=e.tab)!=null&&i.id&&chrome.tabs.sendMessage(e.tab.id,{type:"CLEANUP_ACTIVE_OVERLAY"}).catch(()=>{}),t({success:!0}),!0):!1});async function Mt(r){const{jobId:e,mode:t,tabId:n,sourceUrl:i,sourceTitle:s}=r;if(!n)return{success:!1,error:"The active tab could not be detected."};let o;try{o=await chrome.tabs.get(n)}catch{return{success:!1,error:"The active tab could not be detected."}}const c=o.url||i||"";if(!D(c))return{success:!1,error:"This page cannot be captured or annotated because Chrome does not allow extensions to access it."};const a=async()=>{try{return await new Promise(d=>{chrome.tabs.sendMessage(n,{type:"PING_CONTENT_SCRIPT"},l=>{chrome.runtime.lastError||!(l!=null&&l.success)?d(!1):d(!0)})})||await chrome.scripting.executeScript({target:{tabId:n},files:["contentScript.js"]}),!0}catch{return!1}};return t==="visible_area"?new Promise(u=>{chrome.tabs.captureVisibleTab(o.windowId||null,{format:"png"},async d=>{var m,p,g;if(chrome.runtime.lastError||!d){u({success:!1,error:((m=chrome.runtime.lastError)==null?void 0:m.message)||"Failed to capture visible area."});return}const l={id:e,type:"visible_page",tabId:n,sourceUrl:c,sourceTitle:o.title||s||"Visible Webpage",createdAt:Date.now(),status:"editing",dataUrl:d};try{(p=chrome.storage)!=null&&p.session&&await chrome.storage.session.set({[e]:l}),await((g=chrome.storage)==null?void 0:g.local.set({[e]:l}))}catch(w){console.warn("Storage save warning:",w)}const f=chrome.runtime.getURL(`screenshot-editor.html?jobId=${e}`);v(f),u({success:!0,jobId:e})})}):t==="selected_area"?await a()?new Promise(d=>{chrome.tabs.sendMessage(n,{type:"START_REGION_SELECTION"},l=>{chrome.runtime.lastError||l&&!l.success?d({success:!1,error:(l==null?void 0:l.error)||"This page cannot be captured or annotated because Chrome does not allow extensions to access it."}):d({success:!0,jobId:e})})}):{success:!1,error:"This page cannot be captured or annotated because Chrome does not allow extensions to access it."}:t==="element"?await a()?new Promise(d=>{chrome.tabs.sendMessage(n,{type:"START_ELEMENT_SELECTION"},l=>{chrome.runtime.lastError||l&&!l.success?d({success:!1,error:(l==null?void 0:l.error)||"Element selection could not start."}):d({success:!0,jobId:e})})}):{success:!1,error:"This page cannot be captured or annotated because Chrome does not allow extensions to access it."}:t==="video_frame"?await a()?new Promise(d=>{chrome.tabs.sendMessage(n,{type:"GET_VIDEO_TIMESTAMP"},async l=>{if(chrome.runtime.lastError||!l||!l.success||!l.data){d({success:!1,error:"No supported video was detected."});return}const f=l.data;chrome.tabs.captureVisibleTab(o.windowId||null,{format:"png"},async m=>{var S,R;const p=f.frameDataUrl||m;if(!p){d({success:!1,error:"Failed to capture video frame."});return}const g={id:e,type:"video_frame",tabId:n,sourceUrl:c,sourceTitle:f.videoTitle||o.title||s,createdAt:Date.now(),status:"editing",dataUrl:p,videoTimestamp:f.currentTime,formattedVideoTime:f.formattedTime};try{(S=chrome.storage)!=null&&S.session&&await chrome.storage.session.set({[e]:g}),await((R=chrome.storage)==null?void 0:R.local.set({[e]:g}))}catch(Me){console.warn("Storage save warning:",Me)}const w=chrome.runtime.getURL(`screenshot-editor.html?jobId=${e}`);v(w),d({success:!0,jobId:e})})})}):{success:!1,error:"No supported video was detected."}:t==="full_page"?new Promise(u=>{chrome.tabs.captureVisibleTab(o.windowId||null,{format:"png"},async d=>{var m,p,g;if(chrome.runtime.lastError||!d){u({success:!1,error:((m=chrome.runtime.lastError)==null?void 0:m.message)||"Failed to capture full page."});return}const l={id:e,type:"full_page",tabId:n,sourceUrl:c,sourceTitle:o.title||s||"Full Page Capture",createdAt:Date.now(),status:"editing",dataUrl:d};try{(p=chrome.storage)!=null&&p.session&&await chrome.storage.session.set({[e]:l}),await((g=chrome.storage)==null?void 0:g.local.set({[e]:l}))}catch(w){console.warn("Storage save warning:",w)}const f=chrome.runtime.getURL(`screenshot-editor.html?jobId=${e}`);v(f),u({success:!0,jobId:e})})}):{success:!1,error:"Unknown screenshot mode."}}
