var we=Object.defineProperty;var ve=(e,r)=>{for(var t in r)we(e,t,{get:r[t],enumerable:!0})};var U={};ve(U,{AUTOCOMPLETE_MENU:()=>cr,AUTOCOMPLETE_MENU_ITEM:()=>dr,BLOCK_HANDLE:()=>Ir,DROP_CURSOR:()=>vr,EDITOR_CONTENT:()=>nr,EDITOR_DOCUMENT:()=>or,EDITOR_VIEWPORT:()=>tr,ICON_BOLD:()=>Tr,ICON_CODE:()=>Ar,ICON_CODE_BLOCK:()=>Kr,ICON_CORNER_HANDLE:()=>Fr,ICON_DRAG_HANDLE:()=>Zr,ICON_H1:()=>zr,ICON_H2:()=>Or,ICON_H3:()=>Mr,ICON_H4:()=>Rr,ICON_H5:()=>Sr,ICON_H6:()=>Lr,ICON_IMAGE:()=>Ur,ICON_ITALIC:()=>Cr,ICON_LINK:()=>$r,ICON_LIST_BULLET:()=>jr,ICON_LIST_DEDENT:()=>Hr,ICON_LIST_INDENT:()=>Wr,ICON_LIST_ORDERED:()=>Br,ICON_LIST_TASK:()=>Dr,ICON_LIST_TOGGLE:()=>Vr,ICON_REDO:()=>Pr,ICON_STRIKE:()=>kr,ICON_UNDERLINE:()=>Nr,ICON_UNDO:()=>Gr,IMAGE_RESIZEALE:()=>xr,IMAGE_RESIZEALE_HANDLE:()=>wr,IMAGE_RESIZEALE_IMAGE:()=>yr,IMAGE_UPLOAD_BUTTON:()=>hr,IMAGE_UPLOAD_CARD:()=>gr,IMAGE_UPLOAD_INPUT:()=>mr,INLINE_MENU_LINK:()=>sr,INLINE_MENU_LINK_INPUT:()=>lr,INLINE_MENU_LINK_REMOVE_BUTTON:()=>ar,INLINE_MENU_MAIN:()=>ir,LANGUAGE_SELECT:()=>pr,LANGUAGE_WRAPPER:()=>ur,TOGGLE_BUTTON:()=>br,TOOLBAR:()=>fr,TOOLTIP_CONTENT:()=>Er,TOOLTIP_TRIGGER:()=>_r});function te(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(t=te(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function oe(){for(var e,r,t=0,o="",s=arguments.length;t<s;t++)(e=arguments[t])&&(r=te(e))&&(o&&(o+=" "),o+=r);return o}var H="-";function Ie(e){let r=Ee(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;function s(l){let c=l.split(H);return c[0]===""&&c.length!==1&&c.shift(),se(c,r)||_e(l)}function n(l,c){let u=t[l]||[];return c&&o[l]?[...u,...o[l]]:u}return{getClassGroupId:s,getConflictingClassGroupIds:n}}function se(e,r){if(e.length===0)return r.classGroupId;let t=e[0],o=r.nextPart.get(t),s=o?se(e.slice(1),o):void 0;if(s)return s;if(r.validators.length===0)return;let n=e.join(H);return r.validators.find(({validator:l})=>l(n))?.classGroupId}var ne=/^\[(.+)\]$/;function _e(e){if(ne.test(e)){let r=ne.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function Ee(e){let{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return Te(Object.entries(e.classGroups),t).forEach(([n,l])=>{W(l,o,n,r)}),o}function W(e,r,t,o){e.forEach(s=>{if(typeof s=="string"){let n=s===""?r:ie(r,s);n.classGroupId=t;return}if(typeof s=="function"){if(Ce(s)){W(s(o),r,t,o);return}r.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([n,l])=>{W(l,ie(r,n),t,o)})})}function ie(e,r){let t=e;return r.split(H).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function Ce(e){return e.isThemeGetter}function Te(e,r){return r?e.map(([t,o])=>{let s=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([l,c])=>[r+l,c])):n);return[t,s]}):e}function Ne(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;function s(n,l){t.set(n,l),r++,r>e&&(r=0,o=t,t=new Map)}return{get(n){let l=t.get(n);if(l!==void 0)return l;if((l=o.get(n))!==void 0)return s(n,l),l},set(n,l){t.has(n)?t.set(n,l):s(n,l)}}}var le="!";function ke(e){let r=e.separator,t=r.length===1,o=r[0],s=r.length;return function(l){let c=[],u=0,f=0,b;for(let g=0;g<l.length;g++){let h=l[g];if(u===0){if(h===o&&(t||l.slice(g,g+s)===r)){c.push(l.slice(f,g)),f=g+s;continue}if(h==="/"){b=g;continue}}h==="["?u++:h==="]"&&u--}let m=c.length===0?l:l.substring(f),x=m.startsWith(le),v=x?m.substring(1):m,T=b&&b>f?b-f:void 0;return{modifiers:c,hasImportantModifier:x,baseClassName:v,maybePostfixModifierPosition:T}}}function Ae(e){if(e.length<=1)return e;let r=[],t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r}function ze(e){return{cache:Ne(e.cacheSize),splitModifiers:ke(e),...Ie(e)}}var Oe=/\s+/;function Me(e,r){let{splitModifiers:t,getClassGroupId:o,getConflictingClassGroupIds:s}=r,n=new Set;return e.trim().split(Oe).map(l=>{let{modifiers:c,hasImportantModifier:u,baseClassName:f,maybePostfixModifierPosition:b}=t(l),m=o(b?f.substring(0,b):f),x=!!b;if(!m){if(!b)return{isTailwindClass:!1,originalClassName:l};if(m=o(f),!m)return{isTailwindClass:!1,originalClassName:l};x=!1}let v=Ae(c).join(":");return{isTailwindClass:!0,modifierId:u?v+le:v,classGroupId:m,originalClassName:l,hasPostfixModifier:x}}).reverse().filter(l=>{if(!l.isTailwindClass)return!0;let{modifierId:c,classGroupId:u,hasPostfixModifier:f}=l,b=c+u;return n.has(b)?!1:(n.add(b),s(u,f).forEach(m=>n.add(c+m)),!0)}).reverse().map(l=>l.originalClassName).join(" ")}function Re(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=ae(r))&&(o&&(o+=" "),o+=t);return o}function ae(e){if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=ae(e[o]))&&(t&&(t+=" "),t+=r);return t}function Se(e,...r){let t,o,s,n=l;function l(u){let f=r.reduce((b,m)=>m(b),e());return t=ze(f),o=t.cache.get,s=t.cache.set,n=c,c(u)}function c(u){let f=o(u);if(f)return f;let b=Me(u,t);return s(u,b),b}return function(){return n(Re.apply(null,arguments))}}function d(e){let r=t=>t[e]||[];return r.isThemeGetter=!0,r}var ce=/^\[(?:([a-z-]+):)?(.+)\]$/i,Le=/^\d+\/\d+$/,Ge=new Set(["px","full","screen"]),Pe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ue=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,$e=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,je=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Be=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function w(e){return C(e)||Ge.has(e)||Le.test(e)}function _(e){return N(e,"length",qe)}function C(e){return!!e&&!Number.isNaN(Number(e))}function L(e){return N(e,"number",C)}function z(e){return!!e&&Number.isInteger(Number(e))}function De(e){return e.endsWith("%")&&C(e.slice(0,-1))}function a(e){return ce.test(e)}function E(e){return Pe.test(e)}var Ve=new Set(["length","size","percentage"]);function We(e){return N(e,Ve,de)}function He(e){return N(e,"position",de)}var Ke=new Set(["image","url"]);function Fe(e){return N(e,Ke,Je)}function Ze(e){return N(e,"",Xe)}function O(){return!0}function N(e,r,t){let o=ce.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1}function qe(e){return Ue.test(e)&&!$e.test(e)}function de(){return!1}function Xe(e){return je.test(e)}function Je(e){return Be.test(e)}function Ye(){let e=d("colors"),r=d("spacing"),t=d("blur"),o=d("brightness"),s=d("borderColor"),n=d("borderRadius"),l=d("borderSpacing"),c=d("borderWidth"),u=d("contrast"),f=d("grayscale"),b=d("hueRotate"),m=d("invert"),x=d("gap"),v=d("gradientColorStops"),T=d("gradientColorStopPositions"),g=d("inset"),h=d("margin"),I=d("opacity"),y=d("padding"),F=d("saturate"),$=d("scale"),Z=d("sepia"),q=d("skew"),X=d("space"),J=d("translate"),j=()=>["auto","contain","none"],B=()=>["auto","hidden","clip","visible","scroll"],D=()=>["auto",a,r],p=()=>[a,r],Y=()=>["",w,_],M=()=>["auto",C,a],Q=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],R=()=>["solid","dashed","dotted","double","none"],ee=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],V=()=>["start","end","center","between","around","evenly","stretch"],k=()=>["","0",a],re=()=>["auto","avoid","all","avoid-page","page","left","right","column"],A=()=>[C,L],S=()=>[C,a];return{cacheSize:500,separator:":",theme:{colors:[O],spacing:[w,_],blur:["none","",E,a],brightness:A(),borderColor:[e],borderRadius:["none","","full",E,a],borderSpacing:p(),borderWidth:Y(),contrast:A(),grayscale:k(),hueRotate:S(),invert:k(),gap:p(),gradientColorStops:[e],gradientColorStopPositions:[De,_],inset:D(),margin:D(),opacity:A(),padding:p(),saturate:A(),scale:A(),sepia:k(),skew:S(),space:p(),translate:p()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[E]}],"break-after":[{"break-after":re()}],"break-before":[{"break-before":re()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Q(),a]}],overflow:[{overflow:B()}],"overflow-x":[{"overflow-x":B()}],"overflow-y":[{"overflow-y":B()}],overscroll:[{overscroll:j()}],"overscroll-x":[{"overscroll-x":j()}],"overscroll-y":[{"overscroll-y":j()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",z,a]}],basis:[{basis:D()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:k()}],shrink:[{shrink:k()}],order:[{order:["first","last","none",z,a]}],"grid-cols":[{"grid-cols":[O]}],"col-start-end":[{col:["auto",{span:["full",z,a]},a]}],"col-start":[{"col-start":M()}],"col-end":[{"col-end":M()}],"grid-rows":[{"grid-rows":[O]}],"row-start-end":[{row:["auto",{span:[z,a]},a]}],"row-start":[{"row-start":M()}],"row-end":[{"row-end":M()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[x]}],"gap-x":[{"gap-x":[x]}],"gap-y":[{"gap-y":[x]}],"justify-content":[{justify:["normal",...V()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...V(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...V(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[y]}],px:[{px:[y]}],py:[{py:[y]}],ps:[{ps:[y]}],pe:[{pe:[y]}],pt:[{pt:[y]}],pr:[{pr:[y]}],pb:[{pb:[y]}],pl:[{pl:[y]}],m:[{m:[h]}],mx:[{mx:[h]}],my:[{my:[h]}],ms:[{ms:[h]}],me:[{me:[h]}],mt:[{mt:[h]}],mr:[{mr:[h]}],mb:[{mb:[h]}],ml:[{ml:[h]}],"space-x":[{"space-x":[X]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[X]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[E]},E]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",E,_]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",L]}],"font-family":[{font:[O]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",C,L]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",w,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[I]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[I]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...R(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",w,_]}],"underline-offset":[{"underline-offset":["auto",w,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:p()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[I]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Q(),He]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",We]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Fe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[T]}],"gradient-via-pos":[{via:[T]}],"gradient-to-pos":[{to:[T]}],"gradient-from":[{from:[v]}],"gradient-via":[{via:[v]}],"gradient-to":[{to:[v]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[c]}],"border-w-x":[{"border-x":[c]}],"border-w-y":[{"border-y":[c]}],"border-w-s":[{"border-s":[c]}],"border-w-e":[{"border-e":[c]}],"border-w-t":[{"border-t":[c]}],"border-w-r":[{"border-r":[c]}],"border-w-b":[{"border-b":[c]}],"border-w-l":[{"border-l":[c]}],"border-opacity":[{"border-opacity":[I]}],"border-style":[{border:[...R(),"hidden"]}],"divide-x":[{"divide-x":[c]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[c]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[I]}],"divide-style":[{divide:R()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...R()]}],"outline-offset":[{"outline-offset":[w,a]}],"outline-w":[{outline:[w,_]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:Y()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[I]}],"ring-offset-w":[{"ring-offset":[w,_]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",E,Ze]}],"shadow-color":[{shadow:[O]}],opacity:[{opacity:[I]}],"mix-blend":[{"mix-blend":[...ee(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":ee()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",E,a]}],grayscale:[{grayscale:[f]}],"hue-rotate":[{"hue-rotate":[b]}],invert:[{invert:[m]}],saturate:[{saturate:[F]}],sepia:[{sepia:[Z]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[f]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[b]}],"backdrop-invert":[{"backdrop-invert":[m]}],"backdrop-opacity":[{"backdrop-opacity":[I]}],"backdrop-saturate":[{"backdrop-saturate":[F]}],"backdrop-sepia":[{"backdrop-sepia":[Z]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:S()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:S()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[$]}],"scale-x":[{"scale-x":[$]}],"scale-y":[{"scale-y":[$]}],rotate:[{rotate:[z,a]}],"translate-x":[{"translate-x":[J]}],"translate-y":[{"translate-y":[J]}],"skew-x":[{"skew-x":[q]}],"skew-y":[{"skew-y":[q]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":p()}],"scroll-mx":[{"scroll-mx":p()}],"scroll-my":[{"scroll-my":p()}],"scroll-ms":[{"scroll-ms":p()}],"scroll-me":[{"scroll-me":p()}],"scroll-mt":[{"scroll-mt":p()}],"scroll-mr":[{"scroll-mr":p()}],"scroll-mb":[{"scroll-mb":p()}],"scroll-ml":[{"scroll-ml":p()}],"scroll-p":[{"scroll-p":p()}],"scroll-px":[{"scroll-px":p()}],"scroll-py":[{"scroll-py":p()}],"scroll-ps":[{"scroll-ps":p()}],"scroll-pe":[{"scroll-pe":p()}],"scroll-pt":[{"scroll-pt":p()}],"scroll-pr":[{"scroll-pr":p()}],"scroll-pb":[{"scroll-pb":p()}],"scroll-pl":[{"scroll-pl":p()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[w,_,L]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}var ue=Se(Ye);var K=[["background","white","neutral-900"],["foreground","neutral-900","zinc-50"],["primary","zinc-900","zinc-50"],["primary-foreground","zinc-50","zinc-900"],["secondary","zinc-100","zinc-800"],["secondary-foreground","zinc-900","zinc-50"],["muted","zinc-100","zinc-800"],["muted-foreground","zinc-500","zinc-500"],["accent","gray-200","gray-700"],["accent-foreground","zinc-900","zinc-50"],["destructive","red-500","red-900"],["destructive-foreground","zinc-50","zinc-50"],["border","zinc-200","zinc-800"],["input","zinc-200","zinc-800"],["ring","zinc-900","zinc-300"]],pe=["text","bg","border","ring","ring-offset"],G=new RegExp("^(?<prefix>.*?)(?<group>"+pe.join("|")+")-(?<alias>"+K.map(([e])=>e).sort((e,r)=>r.length-e.length).join("|")+")(?<suffix>.*)$","g");function fe(e){if(G.lastIndex=0,!G.test(e))return e;let r=[];for(let t of e.split(" ")){G.lastIndex=0;let o=G.exec(t);if(o){let{prefix:s,group:n,alias:l,suffix:c}=o.groups||{},[,u,f]=K.find(([b])=>b===l);if(!u||!f||!n||!l)throw new Error(`Unable to parse color from "${t}"`);r.push(`${s}${n}-${u}${c} dark:${s}${n}-${f}${c}`)}else r.push(t)}return r.join(" ")}var be={};for(let[e,r,t]of K)for(let o of pe)for(let s=0;s<=100;s+=5){let n=s===0?"":`/${s}`;be[`${o}-${e}${n}`]=`${o}-${r}${n} dark:${o}-${t}${n}`}function i(...e){return ue(fe(oe(...e)))}var P=i("z-10 box-border rounded-lg border border-border bg-background shadow-lg"),ge=i("will-change-transform","data-[state=open]:animate-in","data-[state=closed]:animate-out","data-[state=open]:fade-in-0","data-[state=closed]:fade-out-0","data-[state=open]:zoom-in-95","data-[state=closed]:zoom-out-95","data-[state=open]:animate-duration-150","data-[state=closed]:animate-duration-200"),me=i(ge,"data-[side=bottom]:slide-in-from-top-2","data-[side=bottom]:slide-out-to-top-2","data-[side=left]:slide-in-from-right-2","data-[side=left]:slide-out-to-right-2","data-[side=right]:slide-in-from-left-2","data-[side=right]:slide-out-to-left-2","data-[side=top]:slide-in-from-bottom-2","data-[side=top]:slide-out-to-bottom-2"),Qe=i("box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"),he=i("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"),xe="bg-primary text-primary-foreground hover:bg-primary/90",er="h-10 px-4 py-2",rr="h-9 px-3",ye=i("flex h-10 rounded-md w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition","border box-border border-border border-solid","ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0","outline-none focus-visible:outline-none","file:border-0 file:bg-transparent file:text-sm file:font-medium","disabled:cursor-not-allowed disabled:opacity-50"),tr=i("box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700"),or=i("relative flex min-h-full w-full flex-col"),nr=i("ProseMirror","relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0",'[&_span[data-mention="user"]]:text-blue-500','[&_span[data-mention="tag"]]:text-violet-500',"[&_pre]:text-white [&_pre]:bg-zinc-800"),ir=i(P,"relative flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"),sr=i(P,"relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"),lr=i(ye),ar=i(he,xe,rr),cr=i("relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1",P),dr=i("relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5",Qe),ur=i("relative left-2 top-3 h-0 select-none overflow-visible"),pr=i("outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white","opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80"),fr=i("z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background","border-border border-solid border-l-0 border-r-0 border-t-0 border-b"),br=i("outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none","disabled:opacity-50 hover:disabled:opacity-50","bg-transparent hover:bg-secondary data-[state=on]:bg-accent"),gr=i("flex flex-col gap-y-4 p-6 text-sm w-sm",P,me),mr=i(ye),hr=i(he,xe,er,"w-full"),xr=i("relative block max-h-[600px] max-w-full"),yr=i("h-full w-full object-contain"),wr=i("absolute bottom-0 right-0 rounded mb-1.5 mr-1.5 p-0.5 transition bg-gray-900/30 active:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5","opacity-0 hover:opacity-100 [prosekit-resizable:hover_&]:opacity-100 [prosekit-resizable[data-resizing]_&]:opacity-100"),vr=i("transition-all bg-blue-500"),Ir=i("flex items-center box-border justify-center my-[0.5em] h-[1.5em] w-[1.2em] hover:bg-secondary rounded text-muted-foreground/50 transition",ge),_r=i("block"),Er=i("z-50 overflow-hidden rounded-md border border-solid bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-sm",me),Cr=i("i-lucide-italic h-5 w-5"),Tr=i("i-lucide-bold h-5 w-5"),Nr=i("i-lucide-underline h-5 w-5"),kr=i("i-lucide-strikethrough h-5 w-5"),Ar=i("i-lucide-code h-5 w-5"),zr=i("i-lucide-heading-1 h-5 w-5"),Or=i("i-lucide-heading-2 h-5 w-5"),Mr=i("i-lucide-heading-3 h-5 w-5"),Rr=i("i-lucide-heading-4 h-5 w-5"),Sr=i("i-lucide-heading-5 h-5 w-5"),Lr=i("i-lucide-heading-6 h-5 w-5"),Gr=i("i-lucide-undo-2 h-5 w-5"),Pr=i("i-lucide-redo-2 h-5 w-5"),Ur=i("i-lucide-image h-5 w-5"),$r=i("i-lucide-link h-5 w-5"),jr=i("i-lucide-list h-5 w-5"),Br=i("i-lucide-list-ordered h-5 w-5"),Dr=i("i-lucide-list-checks h-5 w-5"),Vr=i("i-lucide-list-collapse h-5 w-5"),Wr=i("i-lucide-indent-increase h-5 w-5"),Hr=i("i-lucide-indent-decrease h-5 w-5"),Kr=i("i-lucide-square-code h-5 w-5"),Fr=i("i-lucide-arrow-down-right h-4 w-4"),Zr=i("i-lucide-grip-vertical h-5 w-5");function qr(e,r){let t=Object.keys(r);t.sort((o,s)=>s.length-o.length);for(let o of t)e=Xr(e,o,r[o]);return e}function Xr(e,r,t){if(t.includes("'"))throw new Error("Target cannot contain single quotes: "+t);return e.replaceAll(` :class="Themes.${r}"`,` class='${t}'`).replaceAll(` className={Themes.${r}}`,` className='${t}'`).replaceAll(` class={Themes.${r}}`,` class='${t}'`).replaceAll(` class=\${Themes.${r}}`,` class='${t}'`).replaceAll(`Themes.${r}`,`'${t}'`).replaceAll(r,t)}function Jr(e){return e.replace(/import\s*{\s*Themes\s*}\s*from\s*["']@prosekit\/themes["'];?\n/m,"")}function Yr(e){return Jr(qr(e,U))}export{be as Colors,U as Themes,Yr as replaceThemes};
