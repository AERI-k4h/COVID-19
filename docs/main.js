!function(e){function t(t){for(var o,r,a=t[0],l=t[1],c=t[2],p=0,h=[];p<a.length;p++)r=a[p],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(d&&d(t);h.length;)h.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(o=!1)}o&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},i={0:0},s=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var d=l;s.push([30,1]),n()}({17:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);n(16),n(17);var o=n(2),i=n.p+"nodes.json",r=n.p+"links.json",a=n(0),l=n(12),c=n.n(l),d=n(13),p=n(14),h=n.n(p);let u;let f;const m="—————————————",g='<span class="block"></span>';let w,x,y,b=[];const v=16777215,C=7829367,S=new a.TextStyle({fontFamily:"Arial",fontSize:24,fill:v,align:"center"});function k(){b.forEach(e=>{const t=Math.abs(e.source.x-e.target.x),n=Math.abs(e.source.y-e.target.y),o=Math.pow(t,2)+Math.pow(n,2),i=e.txt;if(x<o&&o<y){const o=t/2+Math.min(e.source.x,e.target.x),s=n/2+Math.min(e.source.y,e.target.y);i.position.set(o-i.width/2,s-i.height/2)}else i.position.set(1/0,1/0);s.tokens.includes(e.txt.text)?e.txt.tint=v:e.txt.tint=C})}let M;const O=16777215,T=7829367;function E(){const e=new a.Graphics;M=s.pixi.addChild(e);const t=new a.TextStyle({fontFamily:"Arial",fontSize:5,fill:O,align:"center"});s.nodes.forEach(n=>{n.visibility=!1,n.gpxCircle=new a.Graphics,n.gpxCircle.drawCircle(0,0,1),n.gpxCircle.endFill(),e.addChild(n.gpxCircle);const[i,r]=(e=>{const t=Math.round(e.length/2);for(let n=t,o=t;n<e.length||o>=0;n++,o--){if(" "===e[n])return[e.substring(0,n),e.substring(n+1)];if(" "===e[o])return[e.substring(0,o),e.substring(o+1)]}return[e,""]})(n.name);n.gpxText=new a.Text(`${i}\n${r}`,t),n.gpxText.scale.x=.5,n.gpxText.scale.y=.5,e.addChild(n.gpxText),n.gpxCircle.interactive=!0,n.gpxCircle.hitArea=new a.Circle(0,0,s.distance),n.gpxCircle.mouseover=e=>{!function(e){const t=o.select("body").append("div").attr("id","focus");t.append("h2").html(e.name),t.append("h3").html(`${e.docs} Publications`),s.tokens=e.tokens.slice(0,3).map(e=>e.term),t.append("p").html("&nbsp;"),t.append("h3").html("Tokens by tf-idf"),t.append("p").html(m),e.tokens.slice(0,10).forEach(e=>{const n=g.repeat(e.tfidf/10);t.append("p").html(`${n} &nbsp; ${e.term}`)}),t.append("p").html("&nbsp;"),t.append("h3").html("Co-author Nationalities"),t.append("p").html(m),Object.entries(e.nationalities).sort().forEach(([e,n],o)=>{const i=g.repeat(4*n);t.append("p").html(`${i} &nbsp; ${e}`)}),t.append("p").html("&nbsp;"),t.append("h3").html("Publication Years"),t.append("p").html(m),Object.entries(e.years).forEach(([e,n],o)=>{const i=g.repeat(4*n);t.append("p").html(`${i} &nbsp; ${e}`)})}(n),s.nodes.filter(e=>n.peers.includes(e.id)).forEach(e=>e.visibility=!0),j(),k()},n.gpxCircle.mouseout=e=>{o.select("#focus").remove(),s.tokens=[],s.nodes.forEach(e=>e.visibility=!1),j(),k()}})}new a.Point(1/0,1/0);function j(){M.clear(),s.nodes.forEach(e=>{const{x:t,y:n,gpxCircle:o,gpxText:i,visibility:s}=e,r=new a.Point(t,n);o.position=r,o.position=r,i.position.set(t-i.width/2,n+3),s?(o.tint=O,i.tint=O):(o.tint=T,i.tint=T)})}var P=()=>{const e=document.querySelector("canvas#background");e.width=window.innerWidth,e.height=window.innerHeight,document.querySelector("body").prepend(e);const t=e.getContext("2d",{alpha:!1}),n=t.createRadialGradient(e.width/2,e.height/2,0,e.width/2,e.height/2,e.width/2);n.addColorStop(1,d3.rgb(0,0,0)),n.addColorStop(0,d3.rgb(50,50,50)),t.fillStyle=n,t.fillRect(0,0,e.width,e.height)},H=n(15);function $(){!function(){u.clear();const e=d3.extent(s.nodes,e=>e.x),t=d3.extent(s.nodes,e=>e.y),n=e[1]-e[0],o=t[1]-t[0],i=e[0],r=t[0],a=d3.contourDensity().x(e=>e.x-i).y(e=>e.y-r).weight(e=>e.relevancy).size([n,o]).cellSize(10).bandwidth(40).thresholds(15)(s.nodes);a.forEach(e=>e.coordinates=e.coordinates.map(e=>e.map(e=>e.map(e=>[e[0]+i,e[1]+r]))));const l=2/a.length;let c=1;for(let e=a.length-1;e>=0;e--){const t=2-l*c;u.lineStyle(t,9077249),c+=1,a[e].coordinates.forEach(e=>{e.forEach(e=>{e.forEach(([e,t],n)=>{0==n&&u.moveTo(e,t),u.lineTo(e,t)})}),u.closePath()})}}(),f.clear(),f.alpha=.2,s.links.forEach(({source:e,target:t,value:n})=>{f.lineStyle(n,13421772),f.moveTo(e.x,e.y),f.lineTo(t.x,t.y)}),j(),k()}window.d3=o,window.s={distance:30,links:r,nodes:i,tokens:[]},Promise.all([o.json(i),o.json(r)]).then(([e,t])=>{s.links=t,s.nodes=e,console.log("nodes",s.nodes.length),console.log("links",s.links.length),(()=>{const e=new a.Application({width:window.innerWidth,height:window.innerHeight,antialias:!0,transparent:!0,resolution:2,autoDensity:!0,autoResize:!0,resizeTo:window});document.body.prepend(e.view);const t=new d.a({screenWidth:window.innerWidth,screenHeight:window.innerHeight,interaction:e.renderer.plugins.interaction});e.stage.addChild(t),s.pixi=t,t.drag().pinch().wheel().decelerate().clampZoom({minScale:.3,maxScale:5}).setTransform(window.innerWidth/2,window.innerHeight/2,.3,.3),window.addEventListener("wheel",e=>{e.preventDefault()},{passive:!1})})(),(()=>{const e=h()({every:1});setInterval(()=>{e.tick()},1e3/60);const t=document.getElementById("fps");e.on("data",(function(e){t.innerHTML=Math.floor(parseInt(e))}))})(),function(){const e=new a.Graphics;u=s.pixi.addChild(e)}(),function(){const e=new a.Graphics;f=s.pixi.addChild(e)}(),E(),function(){const e=new a.Graphics;w=s.pixi.addChild(e),x=Math.pow(2*s.distance-2,2),y=Math.pow(2*s.distance+2,2),b=s.links.filter(e=>e.value>.01),b.forEach(e=>{const[t,n]=Object.entries(e.tokens)[0],o=7e-4*n;e.txt=new a.Text(t,S),e.txt.scale.set(o),e.txt.position.set(1/0,1/0),w.addChild(e.txt)})}(),P(),d3.forceSimulation().force("charge",H.a().strength(-15).distanceMin(2*s.distance).distanceMax(50*s.distance).update(()=>{let e=1;return t=>{const n=Math.floor(4*Math.log(t));return n!==e&&(e=n,!0)}})).force("collide",d3.forceCollide().radius(s.distance).strength(.5).iterations(5)).force("center",d3.forceCenter(0,0)).force("link",d3.forceLink().id(e=>e.id).strength(e=>e.value)).nodes(s.nodes).on("tick",$).force("link").links(s.links),(()=>{document.querySelector("#autoComplete").addEventListener("autoComplete",e=>{console.log(e)});new c.a({data:{src:async()=>s.nodes,key:["name"],cache:!1},sort:(e,t)=>e.match<t.match?-1:e.match>t.match?1:0,placeHolder:"Search",selector:"#autoComplete",threshold:0,debounce:0,searchEngine:"loose",highlight:!0,maxResults:10,resultsList:{render:!0,container:e=>{e.setAttribute("id","autoComplete_list")},destination:document.querySelector("#autoComplete"),position:"afterend",element:"ul"},resultItem:{content:(e,t)=>{t.innerHTML=e.match},element:"li"},noResults:()=>{const e=document.createElement("li");e.setAttribute("class","no_result"),e.setAttribute("tabindex","1"),e.innerHTML="No Results",document.querySelector("#autoComplete_list").appendChild(e)},onSelection:e=>{console.log(e);e.selection.key;const t=e.selection.value,{x:n,y:o,name:i}=t;document.querySelector("#autoComplete").value=i;s.pixi.scale.x<1?(s.pixi.snap(n,o,{time:3e3,ease:"easeOutSine",removeOnComplete:!0}),s.pixi.snapZoom({width:100,time:3e3,ease:"easeInSine",removeOnComplete:!0,noMove:!0})):(s.pixi.snap(n,o,{time:6e3,ease:"easeOutSine",removeOnComplete:!0}),s.pixi.snapZoom({width:1e3,time:3e3,ease:"easeOutSine",removeOnComplete:!0,noMove:!0}),setTimeout(()=>{s.pixi.snapZoom({width:100,time:3e3,ease:"easeInSine",removeOnComplete:!0,noMove:!0})},3e3))}})})(),window.onresize=function(){P(),s.pixi.resize()}})}});