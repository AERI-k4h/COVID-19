!function(e){function t(t){for(var i,a,r=t[0],l=t[1],c=t[2],d=0,h=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(p&&p(t);h.length;)h.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,r=1;r<n.length;r++){var l=n[r];0!==o[l]&&(i=!1)}i&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={0:0},s=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var p=l;s.push([27,1]),n()}({15:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);n(14),n(15);var i=n(0),o=n(37),a=n(41),r=n.p+"nodes.json",l=n.p+"links.json",c=n.p+"triplets.json",p=n.p+"arial.xml",d=n(10),h=n.n(d),u=n(11),m=n.p+"arial.png",f=n(39),w=n(35),x=n(12),b=n.n(x),g=(n(43),n(42),n(40));let y,v,O;i.BitmapFont.from("KeywordFont",{fontFamily:"Arial",fontSize:72,fill:13095362});var j=()=>{const e=new i.Graphics;e.interactiveChildren=!1,e.alpha=.05,s.pixi.addChild(e),s.links.forEach(({source:t,target:n,value:i})=>{e.lineStyle(i,16777215),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y)})},C=n(38);const S="—————————————",k='<span class="block"></span>';const E=16702720,T=13095362;i.BitmapFont.from("NodeFont",{fontFamily:"Arial",fontSize:21,fill:T});var M=()=>{const e=new i.Graphics;s.pixi.addChild(e),s.nodes.forEach(t=>{const n=.1*t.docs;t.circle=new i.Graphics,t.circle.beginFill(T,1),t.circle.drawCircle(0,0,n),t.circle.endFill(),t.circle.tint=T,t.circle.position=new i.Point(t.x,t.y),t.circle.hitArea=new i.Circle(0,0,s.distance),t.circle.interactive=!0,e.addChild(t.circle);const[o,a]=(e=>{const t=Math.round(e.length/2);for(let n=t,i=t;n<e.length||i>=0;n++,i--){if(" "===e[n])return[e.substring(0,n),e.substring(n+1)];if(" "===e[i])return[e.substring(0,i),e.substring(i+1)]}return[e,""]})(t.name);t.text=new i.BitmapText(`${o}\n${a}`,{fontName:"NodeFont"}),t.text.scale.set(.2),t.text.align="center",t.text.position.set(t.x-t.text.width/2,t.y+n+2),e.addChild(t.text),t.circle.mouseover=e=>{!function(e){const t=Object(C.a)("body").append("div").attr("id","focus");t.append("h2").html(e.name),t.append("h3").html(`${e.docs} Publications`),t.append("p").html("&nbsp;"),t.append("h3").html("Tokens by tf-idf"),t.append("p").html(S),Object.entries(e.tokens).slice(0,20).forEach(([e,n])=>{const i=k.repeat(n/10);t.append("p").html(`${i} &nbsp; ${e}`)}),t.append("p").html("&nbsp;"),t.append("h3").html("Co-author Nationalities"),t.append("p").html(S),Object.entries(e.nationalities).sort().forEach(([e,n],i)=>{const o=k.repeat(4*n);t.append("p").html(`${o} &nbsp; ${e}`)}),t.append("p").html("&nbsp;"),t.append("h3").html("Publication Years"),t.append("p").html(S),Object.entries(e.years).forEach(([e,n],i)=>{const o=k.repeat(4*n);t.append("p").html(`${o} &nbsp; ${e}`)})}(t),s.nodes.filter(e=>t.peers.includes(e.id)).forEach(e=>{e.circle.tint=E,e.text.tint=E})},t.circle.mouseout=e=>{Object(C.a)("#focus").remove(),s.tokens=[],s.nodes.forEach(e=>{e.circle.tint=T,e.text.tint=T})}})};i.BitmapFont.from("TripletFont",{fontFamily:"Arial",fontSize:24,fill:6516064});window.s={distance:30,links:j,nodes:M,tokens:[]},Promise.all([Object(o.a)(r),Object(o.a)(l),Object(o.a)(c),Object(a.a)(p)]).then(([e,t,n,o])=>{s.links=t,s.nodes=e,s.triplets=n,console.log("nodes",s.nodes.length),console.log("links",s.links.length),console.log("triplets",s.triplets.length),(e=>{const t=new i.Application({width:window.innerWidth,height:window.innerHeight,antialias:!0,transparent:!0,resolution:2,autoDensity:!0,autoResize:!0,resizeTo:window});document.body.prepend(t.view);const n=i.Texture.from(m);i.BitmapFont.install(e,n),s.pixi=new u.a({screenWidth:window.innerWidth,screenHeight:window.innerHeight,interaction:t.renderer.plugins.interaction}),t.stage.addChild(s.pixi);const o=Object(w.a)(s.nodes,e=>e.x),a=Object(w.a)(s.nodes,e=>e.y),r=o[1]-o[0],l=a[1]-a[0],c=window.innerWidth/r,p=window.innerHeight/l,d=c<p?c:p,h=d;s.pixi.drag().pinch().wheel().decelerate().clampZoom({minScale:h,maxScale:3}).setTransform(window.innerWidth/2,window.innerHeight/2,d,d);const x=Object(f.a)().domain([h,2]).range([1,0]),b=Object(f.a)().domain([h,2]).range([0,1]);s.pixi.on("zoomed",e=>{const t=e.viewport.lastViewport.scaleX;e.viewport.children[2].alpha=x(t),e.viewport.children[3].alpha=x(t),e.viewport.children[5].alpha=b(t)}),window.addEventListener("wheel",e=>{e.preventDefault()},{passive:!1})})(o),(()=>{const e=document.createElement("canvas"),t=e.getContext("2d");e.width=5e3,e.height=5e3;const n=t.createRadialGradient(2500,2500,0,2500,2500,2500);n.addColorStop(1,"#000000"),n.addColorStop(0,"#333333"),t.fillStyle=n,t.fillRect(0,0,e.width,e.height);let o=i.Texture.from(e),a=new i.Sprite(o);a.width=5e3,a.height=5e3,a.position=new i.Point(-2500,-2500),a.interactiveChildren=!1,s.pixi.addChild(a)})(),j(),(()=>{const e=new i.Graphics;s.pixi.addChild(e),e.interactiveChildren=!1;const t=Object(w.a)(s.nodes,e=>e.x),n=Object(w.a)(s.nodes,e=>e.y),o=t[1]-t[0],a=n[1]-n[0],r=t[0],l=n[0],c=Object(g.a)().x(e=>e.x-r).y(e=>e.y-l).weight(e=>e.relevancy).size([o,a]).cellSize(15).bandwidth(100).thresholds(30)(s.nodes);c.forEach(e=>e.coordinates=e.coordinates.map(e=>e.map(e=>e.map(e=>[e[0]+r,e[1]+l]))));const p=3/c.length;let d=1;for(let t=c.length-1;t>=0;t--){const n=3-p*d;e.lineStyle(n,10066329),d+=1,c[t].coordinates.forEach(t=>{t.forEach(t=>{t.forEach(([t,n],i)=>{0==i&&e.moveTo(t,n),e.lineTo(t,n)})}),e.closePath()})}})(),(()=>{const e=new i.Graphics;e.interactiveChildren=!1,y=s.pixi.addChild(e);v=Math.pow(2*s.distance-2,2),O=Math.pow(2*s.distance+2,2),s.links.forEach(e=>{const t=Math.abs(e.source.x-e.target.x),n=Math.abs(e.source.y-e.target.y),o=Math.pow(t,2)+Math.pow(n,2);if(v<o&&o<O){const[o,a]=Object.entries(e.tokens)[0],r=.003*a,l=t/2+Math.min(e.source.x,e.target.x),c=n/2+Math.min(e.source.y,e.target.y);e.txt=new i.BitmapText(o,{fontName:"KeywordFont"}),e.txt.scale.set(r),e.txt.position.set(l-e.txt.width/2,c-e.txt.height/2);let p=!1;s.links.filter(t=>t.txt&&t.index!=e.index).forEach(t=>{const n=e.txt,i=t.txt;i.x>n.x+n.width||i.x+i.width<n.x||i.y>n.y+n.height||i.y+i.height<n.y||(p=!0)}),p||y.addChild(e.txt)}})})(),M(),(()=>{const e=new i.Graphics;e.alpha=0,e.interactiveChildren=!1,s.pixi.addChild(e);s.triplets.forEach(t=>{const n=t.tokens.slice(0,3),o=5*n.length/2,s=t.position[0],a=t.position[1];n.forEach(([t,n],r)=>{const l=new i.BitmapText(t,{fontName:"TripletFont"});l.align="center",l.scale.set(.16),l.position.set(s-l.width/2,a-o+5*r),e.addChild(l)})})})(),(()=>{const e=b()({every:1});setInterval(()=>{e.tick()},1e3/60);const t=document.getElementById("fps");e.on("data",(function(e){t.innerHTML=Math.floor(parseInt(e))}))})(),new h.a({data:{src:async()=>s.nodes.reduce((e,{name:t,x:n,y:i})=>(e.push({name:t,x:n,y:i}),e),[]),key:["name"],cache:!1},sort:(e,t)=>e.match<t.match?-1:e.match>t.match?1:0,placeHolder:"Search",selector:"#autoComplete",threshold:0,debounce:0,searchEngine:"loose",highlight:!0,maxResults:10,resultsList:{render:!0,container:e=>{e.setAttribute("id","autoComplete_list")},destination:document.querySelector("#autoComplete"),position:"afterend",element:"ul"},resultItem:{content:(e,t)=>{t.innerHTML=e.match},element:"li"},noResults:()=>{const e=document.createElement("li");e.setAttribute("class","no_result"),e.setAttribute("tabindex","1"),e.innerHTML="No Results",document.querySelector("#autoComplete_list").appendChild(e)},onSelection:e=>{console.log(e),e.selection.key;const t=e.selection.value,{x:n,y:o,name:a}=t;document.querySelector("#autoComplete").value=a;const r=s.pixi.center.x,l=s.pixi.center.y;s.pixi.scale.x<1?s.pixi.animate({scale:5,position:new i.Point(n,o),time:2e3,ease:"easeInOutSine"}):s.pixi.animate({scale:.3,position:new i.Point((n+r)/2,(o+l)/2),time:2e3,ease:"easeInOutSine",callbackOnComplete:()=>{s.pixi.animate({scale:5,position:new i.Point(n,o),time:2e3,ease:"easeInOutSine"})}})}}),window.onresize=function(){s.pixi.resize()}})}});