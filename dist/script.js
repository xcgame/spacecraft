var T3D,SFX,Game;!function(t){t.RAD_SCALE=Math.PI/180;class e{constructor(t,e,s){this.x=0,this.y=0,this.z=0,this.set(t,e,s)}set(t,s,i){return t instanceof e?(this.x=t.x,this.y=t.y,this.z=t.z,this):("number"==typeof t&&(this.x=t),"number"==typeof s&&(this.y=s),"number"==typeof i&&(this.z=i),this)}max(){return Math.max(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}distance(t){return Math.sqrt((this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y)+(this.z-t.z)*(this.z-t.z))}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){let e=this.x,s=this.y,i=this.z,r=t.x,n=t.y,a=t.z;return this.x=s*a-i*n,this.y=i*r-e*a,this.z=e*n-s*r,this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}scale(t){return this.x*=t instanceof e?t.x:t,this.y*=t instanceof e?t.y:t,this.z*=t instanceof e?t.z:t,this}normalize(){var t=this.length();return t>0&&this.scale(1/t),this}clone(){return new e(this.x,this.y,this.z)}invert(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}toArray(){return[this.x,this.y,this.z]}}t.Vec3=e;class s{constructor(t){this.data=t||[0,0,0,0,0,0,0,0,0]}transpose(){const t=this.data,e=t[1],s=t[2],i=t[5];return t[1]=t[3],t[2]=t[6],t[3]=e,t[5]=t[7],t[6]=s,t[7]=i,this}}t.Mat3=s;class i{constructor(t){this.data=t||[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}clone(){return new i(this.data)}multiply(t){const e=this.data,s=e[0],i=e[1],r=e[2],n=e[3],a=e[4],o=e[5],h=e[6],c=e[7],l=e[8],u=e[9],m=e[10],d=e[11],f=e[12],p=e[13],g=e[14],v=e[15],w=t[0],x=t[1],y=t[2],T=t[3],b=t[4],E=t[5],z=t[6],S=t[7],k=t[8],A=t[9],C=t[10],R=t[11],D=t[12],M=t[13],F=t[14],L=t[15];return this.data=[s*w+i*b+r*k+n*D,s*x+i*E+r*A+n*M,s*y+i*z+r*C+n*F,s*T+i*S+r*R+n*L,a*w+o*b+h*k+c*D,a*x+o*E+h*A+c*M,a*y+o*z+h*C+c*F,a*T+o*S+h*R+c*L,l*w+u*b+m*k+d*D,l*x+u*E+m*A+d*M,l*y+u*z+m*C+d*F,l*T+u*S+m*R+d*L,f*w+p*b+g*k+v*D,f*x+p*E+g*A+v*M,f*y+p*z+g*C+v*F,f*T+p*S+g*R+v*L],this}scale(t){return this.multiply([t.x,0,0,0,0,t.y,0,0,0,0,t.z,0,0,0,0,1])}translate(t){return this.multiply([1,0,0,0,0,1,0,0,0,0,1,0,t.x,t.y,t.z,1])}rotateX(t){const e=Math.cos(t),s=Math.sin(t);return this.multiply([1,0,0,0,0,e,s,0,0,-s,e,0,0,0,0,1])}rotateY(t){const e=Math.cos(t),s=Math.sin(t);return this.multiply([e,0,-s,0,0,1,0,0,s,0,e,0,0,0,0,1])}rotateZ(t){const e=Math.cos(t),s=Math.sin(t);return this.multiply([e,s,0,0,-s,e,0,0,0,0,1,0,0,0,0,1])}rotate(t){return this.rotateX(t.x).rotateY(t.y).rotateZ(t.z)}perspective(t,e,s,i){const r=Math.tan(.5*Math.PI-.5*t),n=1/(s-i);return this.multiply([r/e,0,0,0,0,r,0,0,0,0,(s+i)*n,-1,0,0,s*i*n*2,0])}invert(){const t=this.data,e=t[0],i=t[1],r=t[2],n=t[4],a=t[5],o=t[6],h=t[8],c=t[9],l=t[10],u=l*a-o*c,m=-l*n+o*h,d=c*n-a*h,f=e*u+i*m+r*d;if(!f)return null;const p=1/f;return new s([u*p,(-l*i+r*c)*p,(o*i-r*a)*p,m*p,(l*e-r*h)*p,(-o*e+r*n)*p,d*p,(-c*e+i*h)*p,(a*e-i*n)*p])}}t.Mat4=i;class r{constructor(t,e){this.transform=t,this.scale=e||t.scale}getTranslate(){let t=this.transform.translate.clone(),e=this.transform.parent;for(;e;)t.scale(e.scale).add(e.translate),e=e.parent;return t}getScale(){let t=this.scale.clone().scale(.5),e=this.transform.parent;for(;e;)t.scale(e.scale),e=e.parent;return t}}t.Collider=r;t.Sphere=class extends r{intersect(t){let e=null,s=this.getTranslate(),i=t.getTranslate(),r=s.distance(i),n=this.getScale().max()+t.getScale().max();return r<n&&(e=i.sub(s).normalize().scale(n-r)),e}};t.Box=class extends r{intersect(t){let s=this.getTranslate(),i=this.getScale(),r=t.getTranslate(),n=t.getScale().max(),a=new e(Math.max(s.x-i.x,Math.min(r.x,s.x+i.x)),Math.max(s.y-i.y,Math.min(r.y,s.y+i.y)),Math.max(s.z-i.z,Math.min(r.z,s.z+i.z))),o=a.distance(r),h=null;return o<n&&(h=r.sub(a).normalize().scale(n-o)),h}};class n{constructor(t=[]){this.translate=new e(t[0]||0,t[1]||0,t[2]||0),this.rotate=new e(t[3]||0,t[4]||0,t[5]||0),this.scale=new e(t[6]||1,t[7]||1,t[8]||1)}matrix(e){return(e=e||new i).scale(this.scale).rotate(this.rotate.clone().scale(t.RAD_SCALE)).translate(this.translate),this.parent?this.parent.matrix(e):e}}t.Transform=n;t.Camera=class{constructor(t=1,s=45,i=.1,r=100){this.rotate=new e,this.position=new e,this.fov=s,this.aspect=t,this.near=i,this.far=r}transform(t){return t.matrix().rotate(this.rotate.clone().invert()).translate(this.position.clone().invert())}perspective(){return(new i).perspective(this.fov,this.aspect,this.near,this.far)}};class a extends e{constructor(){super(...arguments),this.faces=[]}addFace(t){return this.faces.push(t),this}}class o{constructor(t,e,s){this.verts=[],this.normals=[],t.addFace(this),e.addFace(this),s.addFace(this),this.verts.push(t,e,s),this.normal=e.clone().sub(t).cross(s.clone().sub(t)).normalize()}calcNormals(t){return this.verts.forEach((e,s)=>{let i;e.faces.forEach(e=>{this.normal.dot(e.normal)>t&&(i=i?i.add(e.normal):e.normal.clone())}),this.normals.push(i?i.normalize():this.normal)}),this}pushVerts(t){return this.verts.forEach(e=>{t.push(...e.toArray())}),this}pushNormals(t){return this.normals.forEach(e=>{t.push(...e.toArray())}),this}}t.Mesh=class{constructor(e,s,i=[],r=0,n=360){if(s<2)return;i.length<2&&(i=this.sphere(i.length>0?i[0]+2:Math.ceil(s/2)+1));const a=this.createVerts(s,i,0,n),o=this.createFaces(a,s,i.length/2),h=Math.cos(r*t.RAD_SCALE),c=[],l=[];o.forEach(t=>{t.calcNormals(h).pushVerts(c).pushNormals(l)}),this.verts=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.verts),e.bufferData(e.ARRAY_BUFFER,new Float32Array(c),e.STATIC_DRAW),this.normals=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.normals),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),this.length=c.length/3}sphere(t){const e=[];if(t<3)return;let s=Math.PI/(t-1);for(let i=1;i<t-1;i++){let t=s*i;e.push(Math.sin(t)/2),e.push(Math.cos(t)/2)}return e}createVerts(e,s,i,r){i*=t.RAD_SCALE;let n=[],o=((r*=t.RAD_SCALE)-i)/e;n.push(new a(0,.5,0)),n.push(new a(0,-.5,0));for(let t=0;t<e;t++){let e=o*t+i,r=Math.cos(e),h=Math.sin(e);for(let t=0;t<s.length;t+=2){let e=new a(r,0,h);e.scale(s[t]).y=s[t+1],n.push(e)}}return n}createFaces(t,e,s){const i=[];let r;for(let n=1;n<e;++n){r=n*s+2,i.push(new o(t[0],t[r],t[r-s])),i.push(new o(t[1],t[r-1],t[r+s-1]));for(let e=0;e<s-1;e++){let n=r+e;i.push(new o(t[n+1],t[n-s],t[n])),i.push(new o(t[n-s+1],t[n-s],t[n+1]))}}i.push(new o(t[0],t[2],t[r])),i.push(new o(t[1],t[r+s-1],t[s+1]));for(let e=0;e<s-1;e++){let s=r+e;i.push(new o(t[e+3],t[s],t[e+2])),i.push(new o(t[s+1],t[s],t[e+3]))}return i}};t.Item=class{constructor(t,e,s){this.childs=[],this.active=!0,this.stroke=0,this.mesh=t,this.color=e,this.transform=new n(s)}add(t){return this.childs.push(t),t.transform.parent=this.transform,this}};t.Shader=class{constructor(t,e,s){this.attribs={},this.location={},this.gl=t,this.program=t.createProgram(),this.indices=t.createBuffer();const i=this.program;t.attachShader(i,this.create(t.VERTEX_SHADER,e)),t.attachShader(i,this.create(t.FRAGMENT_SHADER,s)),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||(console.log(t.getProgramInfoLog(i)),t.deleteProgram(i))}create(t,e){const s=this.gl,i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),s.getShaderParameter(i,s.COMPILE_STATUS)||console.log(s.getShaderInfoLog(i)),i}attrib(t,e,s){const i=this.gl;this.location[t]||(this.location[t]=i.getAttribLocation(this.program,t));const r=this.location[t];return i.bindBuffer(i.ARRAY_BUFFER,e),i.enableVertexAttribArray(r),i.vertexAttribPointer(r,s,i.FLOAT,!1,0,0),this}uniform(t,e){const s=this.gl;this.location[t]||(this.location[t]=s.getUniformLocation(this.program,t));const i=this.location[t];if("number"==typeof e)return s.uniform1f(i,e),this;switch(e.length){case 2:s.uniform2fv(i,e);break;case 3:s.uniform3fv(i,e);break;case 4:s.uniform4fv(i,e);break;case 9:s.uniformMatrix3fv(i,!1,e);break;case 16:s.uniformMatrix4fv(i,!1,e)}return this}}}(T3D||(T3D={})),function(t){window.AudioContext=window.AudioContext||window.webkitAudioContext,window.OfflineAudioContext=window.OfflineAudioContext||window.webkitOfflineAudioContext;const e=44100,s={c:0,db:1,d:2,eb:3,e:4,f:5,gb:6,g:7,ab:8,a:9,bb:10,b:11},i=[],r=new AudioContext,n=new OfflineAudioContext(1,2*e,e).createBuffer(1,2*e,e),a=n.getChannelData(0),o={},h={};let c=Math.pow(2,1/12);for(let t=-57;t<50;t++)i.push(Math.round(44e3*Math.pow(c,t))/100);for(let t=0;t<2*e;t++)a[t]=2*Math.random()-1;t.Sound=class{constructor(t,e,s){this.type=t,this.curve=Float32Array.from(e),this.length=s}time(t){return(t<this.length?t:this.length)-.01}async render(t,s,i){let r=new OfflineAudioContext(1,e*i,e),a=r.createGain(),h=Float32Array.from(s);if(a.connect(r.destination),this.curve&&a.gain.setValueCurveAtTime(this.curve,0,this.time(i)),"custom"==this.type){let t=r.createBufferSource(),e=r.createBiquadFilter();e.connect(a),e.detune.setValueCurveAtTime(h,0,i),t.buffer=n,t.loop=!0,t.connect(e),t.start()}else{let t=r.createOscillator();t.type=this.type,t.frequency.setValueCurveAtTime(h,0,i),t.connect(a),t.start(),t.stop(i)}r.addEventListener("complete",e=>{o[t]=e.renderedBuffer}),await r.startRendering()}};function l(t){return t in h||(h[t]=r.createGain(),h[t].connect(r.destination)),h[t]}t.Channel=class{constructor(t,e,r){this.inst=t,this.data=[],this.size=0,this.length=0;let n=e.split("|");if(n.length>1){e="";for(let t=0;t<n.length;t++)e+=t%2?(","+n[t-1]).repeat(parseInt(n[t])-1):(e?",":"")+n[t]}e.split(",").forEach(t=>{let e=t.match(/^(\d+)/),n=t.match(/([a-z]+\d+)/g);if(e){let t=r/parseInt(e[1]),a=[t];if(this.length+=t,n){n.length>this.size&&(this.size=n.length);for(let t=0;t<n.length;t++){let e=n[t].match(/([a-z]+)(\d+)/);e&&a.push(i[12*parseInt(e[2])+s[e[1]]])}}this.data.push(a)}})}play(t){let e=0,s=this.inst,i=t.createGain(),r=[];i.connect(t.destination);for(let e=0;e<this.size;e++)r[e]=t.createOscillator(),r[e].type=s.type,r[e].connect(i);this.data.forEach(t=>{s.curve&&i.gain.setValueCurveAtTime(s.curve,e,s.time(t[0])),r.forEach((s,i)=>{s.frequency.setValueAtTime(t[i+1]||0,e)}),e+=t[0]}),r.forEach(t=>{t.start(),t.stop(e)})}},t.render=async function(t,s){let i=0;s.forEach(t=>{t.length>i&&(i=t.length)});const r=new OfflineAudioContext(1,e*i,e);r.addEventListener("complete",e=>{o[t]=e.renderedBuffer}),s.forEach((t,e)=>{t.play(r)}),await r.startRendering()},t.mixer=l,t.play=async function(t,e=!1,s="master"){if(await r.resume(),t in o){let i=r.createBufferSource();return e&&(i.loop=!0),i.buffer=o[t],i.connect(l(s)),i.start(),i}return null}}(SFX||(SFX={})),function(t){t.Enemy=class extends T3D.Item{init(t){this.active=t,this.stroke=0,this.explode=0,this.transform.rotate.z=0}update(t,e){if(!this.active)return;if(this.stroke+=(this.explode-this.stroke)/25,this.stroke)return;let s=this.transform.translate,i=this.transform.rotate;s.z=e?0:s.z+t/2,i.z=(i.z+5)%360,i.x=(i.x+3)%360}intersect(e){if(this.active&&!this.explode&&!e.explode&&this.collider.intersect(e.collider)){if(e.speedTime)return e.points+=100,this.explode=7,void t.Event.trigger("hit",e);e.explode=7,t.Event.trigger("exp",e)}}}}(Game||(Game={})),function(t){class e{static on(t,s){const i=t.match(/[a-zA-Z]+/g);i&&i.forEach(t=>{t in e.listener||(e.listener[t]=[]),e.listener[t].push(s)})}static trigger(t,s){t in e.listener&&e.listener[t].forEach(e=>{e(s,t)})}}e.listener={},t.Event=e}(Game||(Game={})),function(t){t.Hero=class extends T3D.Item{constructor(){super(...arguments),this.tokens=0}init(e=!0){const s=this.transform;s.translate.set(0,0,0),s.rotate.set(0,0,90),s.scale.set(1,1,1),this.color=t.COLOR.GREY,this.active=!0,this.transform=s,this.collider=new T3D.Sphere(s),this.tokenCollider=new T3D.Sphere(s),this.x=0,this.rad=.4,this.acc=-.02,this.speed=new T3D.Vec3(0,0,.1),this.speedTime=0,this.scale=.8,this.scaleTime=0,this.magnet=new T3D.Vec3(5,5,5),this.magnetTime=0,this.explode=0,this.stroke=0,e&&(this.points=0,this.distance=0)}left(){this.x>=0&&(this.x--,t.Event.trigger("move",this))}right(){this.x<=0&&(this.x++,t.Event.trigger("move",this))}jump(){this.collide&&(this.acc=.03,t.Event.trigger("jump",this))}boost(){this.speedTime=75,t.Event.trigger("move",this)}magnetize(){this.tokens+=5,this.points+=50,this.magnetTime=450,t.Event.trigger("power",this)}dash(){this.scaleTime=40,t.Event.trigger("move",this)}coin(){this.tokens+=1,this.points+=10,t.Event.trigger("coin",this)}cancel(){this.x=Math.round(this.transform.translate.x)}update(){let e=this.transform.translate,s=this.scale,i=this.transform.rotate,r=(this.speedTime?.12:.08)+Math.min(this.distance/3e4,.04);this.speed.z+=((this.active?r:0)-this.speed.z)/20,this.speedTime-=this.speedTime>0?1:0,this.color=this.speedTime?t.COLOR.GREY:t.COLOR.WHITE,this.color=this.magnetTime>100||this.magnetTime%20>10?this.speedTime?t.COLOR.PINK:t.COLOR.PURPLE:this.speedTime?t.COLOR.WHITE:t.COLOR.GREY,this.scale+=((this.scaleTime?.4:.7)-this.scale)/5,this.scaleTime-=this.scaleTime>0?1:0,this.magnetTime-=this.magnetTime>0?1:0,this.tokenCollider.scale=this.magnetTime?this.magnet:this.transform.scale,this.stroke+=(this.explode-this.stroke)/25,this.active=e.y>-10&&this.stroke<6,this.active&&!this.stroke&&(this.acc-=this.acc>-.017?.003:0,i.z=90+25*(e.x-this.x),i.y=(i.y+100*this.speed.z)%360,this.speed.y+=this.acc,e.x+=(this.x-e.x)/7,e.y+=this.speed.y,e.z-=e.z/30,this.transform.scale.set(s,s,s))}preview(){let t=this.transform.rotate;t.y=(t.y+1)%360,t.z=(t.z+.7)%360}}}(Game||(Game={})),function(t){t.Map=class{constructor(t,e=4,s=100){this.config=t.split("|"),this.length=e,this.steps=s}init(){this.row=[1,1,1],this.count=5,this.data=[],this.step=0,this.min=0,this.update()}max(){let t=this.min+this.length,e=this.config.length;return t<e?t:e-1}update(){let e=!1;if(++this.step>this.steps&&(e=!0,this.step=0,this.min+this.length<this.config.length-1&&this.min++),--this.count>0)return e;if(!this.data.length){this.mirror=t.Rand.get()>.5;let e=t.Rand.get(this.max(),this.min,!0);this.data=this.config[e].match(/.{1,4}/g)}return this.row=this.data.shift().split("").map(t=>parseInt(t,36)),this.count=this.row.shift(),this.mirror&&this.row.reverse(),e}}}(Game||(Game={})),function(t){const e="offliner_hi";t.Menu=class{constructor(){this.body=t.$("body"),this.active=!0,this.storage=JSON.parse(window.localStorage.getItem(e))||{},this.selected=0,this.heroes=["Sputnik","Voyager","Pioneer","Cassini"],this.scores=document.getElementsByTagName("H3"),this.score(this.storage),this.hero(),this.bind()}bind(){t.on(t.$("#play"),"click",()=>{t.Event.trigger("start")}),t.on(t.$("#prev"),"click",()=>{this.prev()}),t.on(t.$("#next"),"click",()=>{this.next()})}input(e){if(this.active)switch(e){case 32:t.Event.trigger("start");break;case 37:this.prev();break;case 39:this.next()}}hero(){this.scores.item(1).textContent=this.heroes[this.selected]}prev(){--this.selected<0&&(this.selected=this.heroes.length-1),this.hero()}next(){++this.selected>=this.heroes.length&&(this.selected=0),this.hero()}store(){window.localStorage.setItem(e,JSON.stringify(this.storage))}token(t=0){let e=this.storage.token||0;return e<t&&(e=t,this.storage.token=t,this.store()),e}score(t){let e=this.storage.score||0,s=this.scores.item(0);e<t?(s.textContent="New High Score: "+e,this.storage.score=t,this.store()):e&&(s.textContent="High Score: "+e)}show(){this.active=!0,this.body.className=""}hide(){this.active=!1,this.body.className="play"}}}(Game||(Game={})),function(t){t.Platform=class extends T3D.Item{update(t){let e=this.transform.translate;e.z+=t;let s=e.z>2;s&&(e.z-=11);let i=1;return e.z<-8?i=e.z+9:e.z>1&&(i=2-e.z),this.transform.scale.set(i,i,i),this.token.update(),this.enemy.update(t,s),s}intersect(t,e=!1){if(!t.active||t.stroke)return;let s,i=this.fence;return this.token.intersect(t),i.active&&(s=i.collider.intersect(t.collider))&&(e&&s.x&&t.cancel(),t.transform.translate.add(s),t.speed.y+=s.y),this.block.active?((s=this.block.collider.intersect(t.collider))&&(e&&s.x&&t.cancel(),t.transform.translate.add(s),t.speed.y+=s.y),s):void 0}}}(Game||(Game={})),function(t){t.Scene=class extends T3D.Item{constructor(e,s,i){super(),this.map=i,this.hud=t.$("#hud").getElementsByTagName("DIV"),this.hero=e,this.add(this.hero),this.planets=document.getElementsByTagName("LI"),this.platforms=[];for(let t=0;t<33;t++){let t=s();this.platforms.push(t),this.add(t)}this.init()}init(){this.row=9,this.hero.init(),this.map.init();let t=0;for(let e=-9;e<2;e++)for(let s=-1;s<=1;s++){let i=this.platforms[t++];i.transform.translate.set(s,-1,e),i.enemy.active=i.fence.active=i.token.active=!1,i.block.active=!0}for(this.planet=this.planets.length-1,t=0;t<this.planets.length;t++)this.planets.item(t).className=""}next(){this.planet>0&&(this.planets.item(this.planet--).className="hide")}ended(){return Math.abs(this.hero.speed.z)<.01}score(){return Math.round(this.hero.points+this.hero.distance)}input(t){const e=this.hero;switch(t){case 37:e.left();break;case 39:e.right();break;case 38:e.jump();break;case 40:e.dash();break;case 32:e.boost()}}updateRow(t){this.row-=t,this.row<=-.5&&(this.row+=11),this.index=3*Math.round(this.row)+Math.round(this.hero.transform.translate.x)+1}getIndex(t=0){let e=this.platforms.length,s=this.index+t;return s<0?s+e:s>=e?s-e:s}update(){this.hero.update();let t=!1,e=this.hero,s=e.speed.z;this.platforms.forEach((i,r)=>{if(i.update(s)){let e=this.map.row[r%3],s=e>>2;i.block.active=(1&e)>0,i.transform.translate.y=(2&e)>0?0:-1,i.token.init(1==s||4==s),i.fence.active=2==s,i.enemy.init(3==s),i.token.transform.rotate.y=45,t=!0}i.enemy.intersect(e)}),t&&this.map.update()&&this.next(),this.updateRow(s),e.collide=this.platforms[this.getIndex()].intersect(e),[-3,3,-1,1,-2,2,-4,4].forEach(t=>{let s=this.getIndex(t);this.platforms[s].intersect(e,1==t||-1==t)}),e.distance+=s,this.updateHud()}updateHud(){let t=this.hero;this.hud.item(0).textContent=""+(this.score()||""),this.hud.item(1).textContent=t.tokens?"$"+t.tokens:""}}}(Game||(Game={})),function(t){const e=[1,1,.3,30],s=[1,.3,1,30];t.Token=class extends T3D.Item{constructor(){super(...arguments),this.big=!1}init(e){this.active=e,this.transform.translate.set(0,1,0),this.big=!t.Rand.get(50,0,!0),this.speed=.01}score(){return this.big?5:1}update(){let t=this.transform.rotate,i=this.transform.scale;t.y=(t.y+1.5)%360,this.big?(i.set(.7,.15,.7),this.color=s):(i.set(.5,.1,.5),this.color=e)}intersect(t){if(this.active&&this.collider.intersect(t.tokenCollider)){let e=this.collider.getTranslate();if(e.distance(t.transform.translate)<.5)return this.active=!1,void(this.big?t.magnetize():t.coin());this.speed+=this.speed,this.transform.translate.add(t.transform.translate.clone().sub(e).scale(this.speed))}}}}(Game||(Game={})),function(t){function e(t,e){return(e||document).querySelector(t)}function s(t,e,s,i=!1){t.addEventListener(e,s,i)}t.$=e,t.on=s,t.fullscreen=function(){document.webkitFullscreenElement?document.webkitExitFullscreen&&(document.webkitExitFullscreen(),document.exitPointerLock()):(document.documentElement.webkitRequestFullscreen(),n.requestPointerLock())};class i{static get(t=1,e=0,s=!0){if(t<=e)return t;i.seed=(9301*i.seed+49297)%233280;let r=e+i.seed/233280*(t-e);return s?Math.round(r):r}}i.seed=Math.random(),t.Rand=i,t.COLOR={WHITE:[1,1,1,10],GREY:[.8,.8,.8,10],PINK:[1,.3,1,30],PURPLE:[.8,.2,.8,30],BLUE:[.3,.3,1,30],YELLOW:[1,1,.3,30],RED:[1,.3,.3,0],CYAN:[.3,1,1,30]};let r,n=e("#game"),a=new t.Menu,o=(new Date).getTime(),h=n.getContext("webgl"),c=new T3D.Vec3(5,15,7),l=new T3D.Camera(n.width/n.height),u=new T3D.Shader(h,"precision mediump float;attribute vec3 aPos, aNorm;uniform mat4 uWorld, uProj;uniform mat3 uInverse;uniform float uStroke;varying vec4 vPos;varying vec3 vNorm;void main(void) {vec3 pos = aPos + (aNorm * uStroke);vPos = uWorld * vec4(pos, 1.0);vNorm = uInverse * aNorm;gl_Position = uProj * vPos;}","precision mediump float;uniform mat4 uWorld;uniform vec4 uColor;uniform vec3 uLight;uniform float uLevels;varying vec4 vPos;varying vec3 vNorm;vec3 uAmbient = vec3(.2, .2, .2);vec3 uDiffuse = vec3(.8, .8, .8);vec3 uSpecular = vec3(.8, .8, .8);void main(void) {vec3 lightDir = normalize(uLight - vPos.xyz);vec3 normal = normalize(vNorm);vec3 eyeDir = normalize(-vPos.xyz);vec3 reflectionDir = reflect(-lightDir, normal);float specularWeight = 0.0;if (uColor.w > 0.0) { specularWeight = pow(max(dot(reflectionDir, eyeDir), 0.0), uColor.w); }float diffuseWeight = max(dot(normal, lightDir), 0.0);vec3 weight = uAmbient + uSpecular * specularWeight  + uDiffuse * diffuseWeight;vec3 color = uColor.xyz * weight;if (uLevels > 1.0) { color = floor(color * uLevels) * (1.0 / uLevels); }gl_FragColor = vec4(color, 1);}"),m={hero:[new T3D.Mesh(h,10),new T3D.Mesh(h,10,[.5,.15,.5,.1,.5,-.1,.5,-.15],30),new T3D.Mesh(h,10,[.2,.5,.5,.2,.5,.1,.2,.1,.2,-.1,.5,-.1,.5,-.1,.5,-.2,.5,-.2,.2,-.5],30),new T3D.Mesh(h,10,[.3,.42,.45,.3,.45,.2,.5,.2,.5,.1,.45,.1,.45,-.1,.5,-.1,.5,-.2,.45,-.2,.45,-.3,.3,-.42],30)],block:new T3D.Mesh(h,4,[.55,.5,.65,.4,.65,-.4,.55,-.5]),fence:new T3D.Mesh(h,12,[.4,.5,.5,.4,.5,-.4,.4,-.5],40),token:new T3D.Mesh(h,9,[.45,.3,.45,.5,.5,.5,.5,-.5,.45,-.5,.45,-.3],30),enemy:new T3D.Mesh(h,6)},d=new t.Hero(m.hero[3],t.COLOR.WHITE),f=new t.Scene(d,()=>{let e=new t.Platform,s=new T3D.Item(m.block,t.COLOR.BLUE,[,,,,45]),i=new t.Enemy(m.enemy,t.COLOR.CYAN,[,1,,,,,.7,.7,.7]),r=new t.Token(m.token,t.COLOR.YELLOW,[,1,,90,,,.5,.1,.5]),n=new T3D.Item(m.fence,t.COLOR.RED,[,1.4,,,,,.8,1,.8]);return s.collider=new T3D.Box(s.transform),i.collider=new T3D.Sphere(i.transform),r.collider=new T3D.Sphere(r.transform),n.collider=new T3D.Box(n.transform),e.block=s,e.token=r,e.fence=n,e.enemy=i,e.add(s).add(r).add(n).add(i)},new t.Map("311737173711|4111|5711|3111|211135012111|2111|301531513510|311119973111|5111111d|311110003115|551111dd|305130053051|401510004510",6,150));function p(){n.width=n.clientWidth,n.height=n.clientHeight,l.aspect=n.width/n.height,h.viewport(0,0,n.width,n.height)}function g(t,e=0){t.childs.forEach(t=>{g(t,e)});t.transform.scale;if(!t.active||!t.mesh)return;let s=t.transform.matrix().invert();s&&(h.cullFace(e>0?h.FRONT:h.BACK),h.useProgram(u.program),u.attrib("aPos",t.mesh.verts,3).attrib("aNorm",t.mesh.normals,3).uniform("uWorld",l.transform(t.transform).data).uniform("uProj",l.perspective().data).uniform("uInverse",s.transpose().data).uniform("uColor",e?[0,0,0,1]:t.color).uniform("uLight",c.clone().sub(l.position).toArray()).uniform("uStroke",e+t.stroke).uniform("uLevels",e?0:5),h.drawArrays(h.TRIANGLES,0,t.mesh.length))}function v(){if(requestAnimationFrame(v),h.clear(h.COLOR_BUFFER_BIT),a.active)return d.mesh=m.hero[a.selected],d.preview(),g(d),void g(d,.02);let e=(new Date).getTime();e-o>30&&f.update(),o=e,f.update(),g(f),g(f,.02),f.ended()&&(d.init(!1),t.Event.trigger("end"))}s(window,"load",()=>{Promise.all([new SFX.Sound("custom",[5,1,0],1).render("exp",[220,0],1),new SFX.Sound("custom",[3,1,0],1).render("hit",[1760,0],.3),new SFX.Sound("square",[.5,.1,0],1).render("power",[440,880,440,880,440,880,440,880],.3),new SFX.Sound("triangle",[.5,.1,0],1).render("jump",[220,880],.3),new SFX.Sound("square",[.2,.1,0],.2).render("coin",[1760,1760],.2),new SFX.Sound("custom",[.1,.5,0],.3).render("move",[1760,440],.3),SFX.render("music",[new SFX.Channel(new SFX.Sound("sawtooth",[1,.3],.1),"8a2,8a2,8b2,8c3|8|8g2,8g2,8a2,8b2|8|8e2,8e2,8f2,8g2|4|8g2,8g2,8a2,8b2|4|",1),new SFX.Channel(new SFX.Sound("sawtooth",[.5,.3],1),"2a3,2a3e4,2a3d4,2a3e4|2|2g3,2g3d4,2g3c4,2g3d4|2|2e3,2e3a3,2e3b3,2e3a3,1g3b3,1g3c4|",1)])]).then(()=>{t.Event.trigger("load")}),d.init(),d.tokens=a.token(),f.updateHud(),l.position.set(0,.5,5),l.rotate.x=-.7,h.clearColor(0,0,0,0),h.enable(h.CULL_FACE),h.enable(h.DEPTH_TEST),p(),function(){let e=0,i=0,n=[],o=!1;s(document,"touchstart",t=>{let s=t.touches[0];e=s.clientX,i=s.clientY,o=!0}),s(document,"touchmove",t=>{if(t.preventDefault(),!o)return;let s=t.touches[0];!n[39]&&s.clientX-e>15?(n[39]=!0,f.input(39),o=!1):!n[37]&&s.clientX-e<-15?(n[37]=!0,f.input(37),o=!1):!n[40]&&s.clientY-i>15?(n[40]=!0,f.input(40),o=!1):!n[38]&&s.clientY-i<-15&&(n[38]=!0,f.input(38),o=!1)},{passive:!1}),s(document,"touchend",t=>{a.active||(o&&(n[32]=!0,f.input(32)),n[32]=n[37]=n[38]=n[39]=n[40]=o=!1)}),s(document,"keydown",t=>{a.active?a.input(t.keyCode):f.input(t.keyCode)}),s(window,"resize",p),t.Event.on("move jump boost power coin hit exp",(t,e)=>{SFX.play(e)}),t.Event.on("start",()=>{a.hide(),f.init(),r||(SFX.mixer("music").gain.value=.3,SFX.play("music",!0,"music").then(t=>{r=t}))}),t.Event.on("end",()=>{a.score(f.score()),a.token(d.tokens),a.show(),r&&(r.stop(),r=null)})}(),v()})}(Game||(Game={}));