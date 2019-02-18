
/*+==  MATH  ========================================================================================================+*/

 "+--  Flags  -------------------------------------------------------------------------------------------------------+"

		with ({

			constDef    : true ,
			unaryPass   : true ,
			binaryPass  : true ,
			ternaryPass : true ,
		}) {

 "+--  Constants  ---------------------------------------------------------------------------------------------------+"

		let constants = {

			pi          : { js : Math.PI                                                            , constDef                                                                                             },
			pi2         : { js : Math.PI/2                                                          , constDef                                                                                             },
			pi3         : { js : Math.PI/3                                                          , constDef                                                                                             },
			pi4         : { js : Math.PI/4                                                          , constDef                                                                                             },
			pi8         : { js : Math.PI/8                                                          , constDef                                                                                             },
			tau         : { js : Math.PI*2                                                          , constDef                                                                                             },
			phi         : { js : (1+Math.sqrt(5))/2                                                 , constDef                                                                                             },
			goldenAngle : { js : Math.PI*(3-Math.sqrt(5))                                           , constDef                                                                                             },
			sqrt2       : { js : Math.SQRT2                                                         , constDef                                                                                             },
			sqrt1_2     : { js : Math.SQRT1_2                                                       , constDef                                                                                             },
			ln2         : { js : Math.LN2                                                           , constDef                                                                                             },
			ln10        : { js : Math.LN10                                                          , constDef                                                                                             },
			log2e       : { js : Math.LOG2E                                                         , constDef                                                                                             },
			log10e      : { js : Math.LOG10E                                                        , constDef                                                                                             },
		};

 "+--  Unary  -------------------------------------------------------------------------------------------------------+"

		let unary = {

			abs         : { js : Math.abs                                                           ,                                                                                          unaryPass   },
			neg         : { js : n => -n                                                            , unaryDef : `-n`                                                                        , unaryPass   },
			sign        : { js : Math.sign                                                          ,                                                                                          unaryPass   },
			sgn0        : { js : n => Math.sign(n||1/n)                                             ,                                                                                                      },
			floor       : { js : Math.floor                                                         ,                                                                                          unaryPass   },
			round       : { js : Math.round                                                         ,                                                                                          unaryPass   },
			ceil        : { js : Math.ceil                                                          ,                                                                                          unaryPass   },
			trunc       : { js : Math.trunc                                                         ,                                                                                          unaryPass   },
			fround      : { js : Math.fround                                                        ,                                                                                          unaryPass   },
			half        : { js : n => n/2                                                                                                                                                                  },

			sqrt        : { js : Math.sqrt                                                          ,                                                                                          unaryPass   },
			cbrt        : { js : Math.cbrt                                                          , unaryDef : type => `pow(n,${type}(1.0/3.0))`                                           , unaryPass   },
			exp         : { js : Math.exp                                                           ,                                                                                          unaryPass   },
			expm1       : { js : Math.expm1                                                         , unaryDef : `exp(n)-1.0`                                                                , unaryPass   },
			ln          : { js : Math.log                                                           , alias    : `log`                                                                       , unaryPass   },
			log         : { js : Math.log                                                           ,                                                                                          unaryPass   },
			log2        : { js : Math.log2                                                          ,                                                                                          unaryPass   },
			log10       : { js : Math.log10                                                         , unaryDef : `log(n)/log(10.0)`                                                          , unaryPass   },
			log1p       : { js : Math.log1p                                                         , unaryDef : `log(1.0+n)`                                                                , unaryPass   },

			sin         : { js : Math.sin                                                           ,                                                                                          unaryPass   },
			asin        : { js : Math.asin                                                          ,                                                                                          unaryPass   },
			sinh        : { js : Math.sinh                                                          ,                                                                                          unaryPass   },
			asinh       : { js : Math.asinh                                                         ,                                                                                          unaryPass   },
			cos         : { js : Math.cos                                                           ,                                                                                          unaryPass   },
			acos        : { js : Math.acos                                                          ,                                                                                          unaryPass   },
			cosh        : { js : Math.cosh                                                          ,                                                                                          unaryPass   },
			acosh       : { js : Math.acosh                                                         ,                                                                                          unaryPass   },
			tan         : { js : Math.tan                                                           ,                                                                                          unaryPass   },
			atan        : { js : Math.atan                                                          ,                                                                                          unaryPass   },
			tanh        : { js : Math.tanh                                                          ,                                                                                          unaryPass   },
			atanh       : { js : Math.atanh                                                         ,                                                                                          unaryPass   },

			invert      : { js : n => 1-n                                                           , unaryDef : `1.0-n`                                                                     , unaryPass   },
			clz32       : { js : Math.clz32                                                         ,                                                                                                      },
			clamp01     : { js : n => Math.clamp(n, 0,1)                                            , unaryDef : `clamp(n, 0.0,1.0)`                                                         , unaryPass   },
			clamp11     : { js : n => Math.clamp(n,-1,1)                                            , unaryDef : `clamp(n,-1.0,1.0)`                                                         , unaryPass   },
			pingPong    : { js : n => (n=Math.mod(n,2),n<1?n:2-n)                                   , unaryFor : `(n=mod(n,2.0))<1.0?n:2.0-n`                                                , unaryPass   },
			cycle       : { js : n => 1-(Math.cos(n*2*Math.PI)*0.5+0.5)                             , unaryDef : `1.0-(cos(n*2.0*pi)*0.5+0.5)`                                               , unaryPass   },

			linI        : { js : n => n                                                             , unaryDef : `n`                                                                         , unaryPass   },
			linIO       : { js : n => n                                                             , unaryDef : `n`                                                                         , unaryPass   },
			linO        : { js : n => n                                                             , unaryDef : `n`                                                                         , unaryPass   },

			quadI       : { js : n => n*n                                                           , unaryDef : `n*n`                                                                       , unaryPass   },
			quadIO      : { js : n => n<0.5?2*n*n:(4-2*n)*n-1                                       , unaryFor : `n<0.5?2.0*n*n:(4.0-2.0*n)*n-1.0`                                           , unaryPass   },
			quadO       : { js : n => n*(2-n)                                                       , unaryDef : `n*(2.0-n)`                                                                 , unaryPass   },

			cubicI      : { js : n => n**3                                                          , unaryDef : type => `pow(n,${type}(3.0))`                                               , unaryPass   },
			cubicIO     : { js : n => n<0.5?n**3*4:(n-1)*(2*n-2)**2+1                               , unaryFor : `n<0.5?pow(n,3.0)*4.0:(n-1.0)*pow(2.0*n-2.0,2.0)+1.0`                       , unaryPass   },
			cubicO      : { js : n => --n**3+1                                                      , unaryDef : type => `pow(--n,${type}(3.0))+1.0`                                         , unaryPass   },

			quartI      : { js : n => n**4                                                          , unaryDef : type => `pow(n,${type}(4.0))`                                               , unaryPass   },
			quartIO     : { js : n => n<0.5?n**4*8:1-8*--n**4                                       , unaryFor : `n<0.5?pow(n,4.0)*8.0:1.0-8.0*pow(--n,4.0)`                                 , unaryPass   },
			quartO      : { js : n => 1- --n**4                                                     , unaryDef : type => `1.0-pow(--n,${type}(4.0))`                                         , unaryPass   },

			quintI      : { js : n => n**5                                                          , unaryDef : type => `pow(n,${type}(5.0))`                                               , unaryPass   },
			quintIO     : { js : n => n<0.5?n**5*16:1+16*--n**5                                     , unaryFor : `n<0.5?pow(n,5.0)*16.0:1.0+16.0*pow(--n,5.0)`                               , unaryPass   },
			quintO      : { js : n => --n**5+1                                                      , unaryDef : type => `pow(--n,${type}(5.0))+1.0`                                         , unaryPass   },

			sinI        : { js : n => -Math.cos(Math.pi2*n)+1                                       , unaryDef : `-cos(pi2*n)+1.0`                                                           , unaryPass   },
			sinIO       : { js : n => -0.5*(Math.cos(Math.pi*n)-1)                                  , unaryDef : `-0.5*(cos(pi*n)+1.0)`                                                      , unaryPass   },
			sinO        : { js : n => Math.sin(n*Math.pi2)                                          , unaryDef : `sin(n*pi2)`                                                                , unaryPass   },

			expI        : { js : n => 2**(10*(n-1))                                                 , unaryDef : type => `pow(${type}(2.0),10.0*(n-1.0))`                                    , unaryPass   },
			expIO       : { js : n => n<0.5?Math.pow(2,20*n-10)/2:(2-Math.pow(2,10-20*n))/2         , unaryFor : `n<0.5?pow(2.0,20.0*n-10.0)/2.0:(2.0-pow(2.0,10.0-20.0*n))/2.0`             , unaryPass   },
			expO        : { js : n => 1-2**(-10*n)                                                  , unaryDef : type => `1.0-pow(${type}(2.0),-10.0*n)`                                     , unaryPass   },

			circI       : { js : n => 1-Math.sqrt(1-n*n)                                            , unaryDef : `1.0-sqrt(1.0-n*n)`                                                         , unaryPass   },
			circIO      : { js : n => n<0.5?-(Math.sqrt(1-4*n*n)-1)/2:(Math.sqrt(1-(n*2-2)**2)+1)/2 , unaryFor : `n<0.5?-(sqrt(1.0-4.0*n*n)-1.0)/2.0:(sqrt(1.0-pow(n*2.0-2.0,2.0))+1.0)/2.0` , unaryPass   },
			circO       : { js : n => Math.sqrt(1- --n*n)                                           , unaryDef : `sqrt(1.0- --n*n)`                                                          , unaryPass   },

			m2ft        : { js : n => n*3.280839895                                                 , unaryDef : `n*3.280839895`                                                             , unaryPass   },
			ft2m        : { js : n => n*0.3048                                                      , unaryDef : `n*0.3048`                                                                  , unaryPass   },
			r2d         : { js : n => n*180/Math.PI                                                 , unaryDef : `n*180.0/pi`                                                                , unaryPass   },
			d2r         : { js : n => n*Math.PI/180                                                 , unaryDef : `n*pi/180.0`                                                                , unaryPass   },

			isPrime : { js : n => {
				switch (n) {
					case 0: return false;
					case 1: return false;
					default: for (let i=2;i<=Math.sqrt(n);++i) if (n%i===0) return false;
				} return true;
			} },
		};

 "+--  Fixed  -------------------------------------------------------------------------------------------------------+"

		let fixed = {

			pow         : { js : Math.pow                                                                                                                                                    , binaryPass  },
			imul        : { js : Math.imul                                                                                                                                                   ,             },

			floorTo     : { js : (a,b) => Math.floor(a/b)*b                                         , binaryDef : `floor(a/b)*b`                                                             , binaryPass  },
			 ceilTo     : { js : (a,b) => Math.ceil (a/b)*b                                         , binaryDef : `ceil (a/b)*b`                                                             , binaryPass  },
			roundTo     : { js : (a,b) => Math.round(a/b)*b                                         , binaryDef : `round(a/b)*b`                                                             , binaryPass  },

			map01       : { js : (a,b,c) => (a-b)/(c-b)                                             , ternaryDef : `(a-b)/(c-b)`                                                             , ternaryPass },
			mapBounds   : { js : (a,b,c) => a*(c-b)+b                                               , ternaryDef : `a*(c-b)+b`                                                               , ternaryPass },

			clamp       : { js : (a,b,c) => Math.min(c,Math.max(b,a))                               ,                                                                                          ternaryPass },
			lerp        : { js : (a,b,c) => a+(b-a)*c                                               , alias      : `mix`                                                                     , ternaryPass },
			lerpTo      : { js : (a,b,c) => a+(b-a)*c                                               , alias      : `mix`                                                                     , ternaryPass },

			sPlus       : { js : (a,b) => a+b                                                       ,                                                                                                      },
			sMinus      : { js : (a,b) => a-b                                                       ,                                                                                                      },
			times       : { js : (a,b) => a*b                                                       , binaryDef : `a*b`                                                                      , binaryPass  },
			div         : { js : (a,b) => a/b                                                       , binaryDef : `a/b`                                                                      , binaryPass  },
			mod         : { js : (a,b) => a-b*Math.floor(a/b)                                       ,                                                                                          binaryPass  },

			between     : { js : (a,b,c) => a>=b&&a<=c                                              , header : `bool between (float a,float b,float c) { return a>=b && a<=c; }`             , ternaryPass },

			cosSin      : { js : (a,r=1) => [Math.cos(a)*r,Math.sin(a)*r] ,
			                header : ` vec2 cosSin (float a        ) { return vec2(cos(a),sin(a))  ; }
			                           vec2 cosSin (float a,float r) { return vec2(cos(a),sin(a))*r; } ` },

			// cerp        : { js : (a,b,i) => a+Math.sign(b-a)*Math.min(Math.abs(b-a),i), // make this generalized for vectors
			// ikTo
		};

 "+--  Piecewise  ---------------------------------------------------------------------------------------------------+"

		let piecewise = {

			plus        : { js : (a,b) => a+b                                                       , binaryDef : `(a)+(b)`                                                                  , binaryPass  },
			minus       : { js : (a,b) => a-b                                                       , binaryDef : `(a)-(b)`                                                                  , binaryPass  },
			vTimes      : { js : (a,b) => a*b                                                       ,                                                                                                      },
			vDiv        : { js : (a,b) => a/b                                                       ,                                                                                                      },
			vMod        : { js : (a,b) => a-b*Math.floor(a/b)                                       ,                                                                                                      },
			vMin        : { js : Math.min                                                           ,                                                                                                      },
			vMax        : { js : Math.max                                                           ,                                                                                                      },

			greaterThan      : { js : (a,b) => a>b                                                  ,                                                                                          binaryPass  },
			   lessThan      : { js : (a,b) => a<b                                                  ,                                                                                          binaryPass  },
			greaterThanEqual : { js : (a,b) => a>=b                                                 ,                                                                                          binaryPass  },
			   lessThanEqual : { js : (a,b) => a<=b                                                 ,                                                                                          binaryPass  },
		};

 "+--  Variadic  ----------------------------------------------------------------------------------------------------+"

		let variadic = {

			min         : { js : Math.min                                                           ,                                                                                                      },
			max         : { js : Math.max                                                           ,                                                                                                      },
			hypot       : { js : Math.hypot                                                         ,                                                                                                      },
			average     : { js : (...ls) => ls.sum()/ls.length                                      ,                                                                                                      },

			sum : { js : (...ls) => {
				let acc = 0;
				for (let i of ls) acc += i;
				return acc;
			} },

			product : { js : (...ls) => {
				let acc = 1;
				for (let i of ls) acc *= i;
				return acc;
			} },
		};

 "+--  Color  -------------------------------------------------------------------------------------------------------+"

		let color = {

			rgb : { js : (...rgba) => {

				let [r,g=1,b,a=1] = rgba;
				switch (rgba.length) {
					case 1: case 2: return [r,r,r,g];
					case 3: case 4: return [r,g,b,a];
				}

				}, header : `

				vec4 rgb (float r,float g,float b,float a) { return vec4(r,g,b,a); }
				vec4 rgb (float r,float g,float b        ) { return vec4(r,g,b,1); }
				vec4 rgb (float r,float g                ) { return vec4(r,r,r,g); }
				vec4 rgb (float r                        ) { return vec4(r,r,r,1); }
			` },

			hsv : { js : (...hsva) => {

				let [h,s=1,v,a=1] = hsva;
				switch (hsva.length) {
					case 1: case 2: return Math.hue(h,s);
					case 3: case 4: h = h.mod(1)*6;
					                let i = h.floor(), f = h-i, p = 1-s, q = 1-s*f, t = 1-s*(1-f);
					                return [...[[1,t,p],[q,1,p],[p,1,t],[p,q,1],[t,p,1],[1,p,q]][i].times(v),a];
				}

				}, header : `

				vec4 hsv (float h,float s,float v,float a) {
					vec3 c = vec3(h,s,v);
					vec4 K = vec4(1,2.0/3.0,1.0/3.0,3);
					return vec4(c.z*mix(K.xxx,clamp(abs(fract(c.rrr+K.xyz)*6.0-K.www)-K.xxx,0.0,1.0),c.y),a);
				}

				vec4 hsv (float h,float s,float v        ) { return hsv(h,s  ,v  ,1.0); }
				vec4 hsv (float h,float a                ) { return hsv(h,1.0,1.0,a  ); }
				vec4 hsv (float h                        ) { return hsv(h,1.0,1.0,1.0); }
			` },

			hsl : { js : (...hsla) => {

				let [h,s=1,l,a=1] = hsla;
				switch (hsla.length) {
					case 1: case 2: return Math.hue(h,s);
					case 3: case 4: s *= l<0.5?l:1-l;
					                return Math.hsv(h,2*s/(l+s),l+s,a);
				}

				}, header : `

				vec4 hsl (float h,float s,float l,float a) {
					s *= l<0.5?l:1.0-l;
					return hsv(h,2.0*s/(l+s),l+s,a);
				}

				vec4 hsl (float h,float s,float l        ) { return hsl(h,s  ,l  ,1.0); }
				vec4 hsl (float h,float a                ) { return hsl(h,1.0,1.0,a  ); }
				vec4 hsl (float h                        ) { return hsl(h,1.0,1.0,1.0); }
			` },

			hue : { js : (hue,a=1) => {

				hue = hue.mod(1)*6;
				let x = 1-abs(hue%2-1);
				return [[1,x,0,a],[x,1,0,a],[0,1,x,a],[0,x,1,a],[x,0,1,a],[1,0,x,a]][hue.floor()];

				}, header : `

				vec4 hue (float h,float a) { return hsv(h,a  ); }
				vec4 hue (float h        ) { return hue(h,1.0); }
			` },

			// rgb2hsv : (...rgba) => {}, // TODO: IMPLEMENT
			// rgb2hsl : (...rgba) => {}, // TODO: IMPLEMENT
		};

 "+--  Generators  --------------------------------------------------------------------------------------------------+"

		let generators = {

			range : { js : function* (a,b,c=1) {
				if (b === undefined) {
					b = a;
					a = 0;
				} c = Math.abs(c);
				if (b-a>0) for (let i=a;i<b;i+=c) yield i;
				else       for (let i=a;i>b;i-=c) yield i;
			} },

			fibonacci : { js : function* (count=Infinity,a=0,b=1) {
				if (count >= 1) yield a;
				if (count >= 2) yield b;
				let generated = 2;
				while (++generated <= count) {
					let c = a+b;
					yield c;
					[a,b] = [b,c];
				}
			} },

			primes : { js : function* (count=Infinity) {
				let generated = 0, i = 1;
				while (++generated <= count) {
					while (!(++i).isPrime);
					yield i;
				}
			} },
		};

 "+--  Random + Misc  -----------------------------------------------------------------------------------------------+"

		let misc = {

			random : { js : Math.random                            },
			rand   : { js : (a=1,b=0) =>   (Math.random()*(a-b)+b) },
			rInt   : { js : (a=1,b=0) => ~~(Math.random()*(a-b)+b) },
			chance : { js : n => Math.random()<n                   },

			atan2  : { js : Math.atan2                  , alias  : `atan`                                           },
			angle  : { header : `
				float angle (vec2 v) { return atan(v.y,v.x); }
				float angle (vec3 v) { return atan(v.y,v.x); }
				float angle (vec4 v) { return atan(v.y,v.x); }
			` },
		};

 "+--  Meta  --------------------------------------------------------------------------------------------------------+"

		let raw  = {    ...constants,...unary,...fixed,...piecewise,...variadic,...color,...generators,...misc};
		    Math = {raw,   constants,   unary,   fixed,   piecewise,   variadic,   color,   generators,   misc};

		for (let name in raw) {
			let {js,array,number} = raw[name];
			if (!array ) raw[name].array  = js;
			if (!number) raw[name].number = js;
			if (js) Math[name] = js;
			raw[name].name = name;
		} }

/*+==  JAVASCRIPT EXTENSIONS  =======================================================================================+*/

 "+--  Electron  ----------------------------------------------------------------------------------------------------+"

		if (window.process) {

			ELECTRON_DISABLE_SECURITY_WARNINGS = true;
			window.fs       = require("fs");
			window.os       = require("os");
			window.net      = require("net");
			window.electron = require("electron");
			window.browser  = electron.remote.getCurrentWindow();
			window.webFrame = electron.webFrame;
		}

 "+--  Object  ------------------------------------------------------------------------------------------------------+"

		// TODO: move as many Array and Set methods into here as possible

		Object.defineProperties(Object.prototype,{

			[Symbol.iterator] : { value : function* () { for (let key in this) yield this[key] }},

			import : { value (...objLs) {
				for (let obj of objLs) for (let name of Object.getOwnPropertyNames(obj)) {
					let desc = Reflect.getOwnPropertyDescriptor(obj,name);
					desc.enumerable = false;
					Reflect.defineProperty(this,name,desc);
				} return this;
			}},
		});

		Object.prototype.import({

			addProperty   (name,property  ) { return Object.defineProperty  (this,name,property  ) },
			addProperties (     properties) { return Object.defineProperties(this,     properties) },

			assignTo   (obj     ) { return Object.assign(obj,this) },
			toArray    (f       ) { return this.keyValues.map(([key,val],i,ary)=>f(val,key,this,ary)) },
			forEach    (f       ) { for (let key in this) f(this[key],key,this); return this },
			for        (f       ) { return this.forEach(f) },
			map        (f       ) { return {...this}.for((element,key,obj)=>obj[key]=f(element,key,obj)) },
			do         (f       ) { f(this); return this },
			pick       (...keyLs) { return this.filter((e,i)=>keyLs.some (j=>i===j)) },
			omit       (...keyLs) { return this.filter((e,i)=>keyLs.every(j=>i!==j)) },

			filter (f) {
				let newObj = {};
				this.forEach((element,key)=>{
					if (f(element,key,this)) newObj[key] = element;
				});
				return newObj;
			},

			get deepClone () { return this.map(e=>e.deepClone||e) },
			get isObject  () { return true },
			get keys      () { return Object.keys(this) },
			get values    () { return this.keys.map(key=>this[key]) },
			get keyValues () { return this.keys.map(key=>[key,this[key]]) },
			get truthy    () { return this.filter(i=>i) },
			get json      () { return JSON.stringify(this,null,"\t") },
		});

 "+--  Array  -------------------------------------------------------------------------------------------------------+"

		// TODO: combinatorics

		Array.import(Math.generators.map(({js},name)=>(...a)=>[...js(...a)]));

		Array.prototype.reverseEq = Array.prototype.reverse;
		Array.prototype.sortEq    = Array.prototype.sort;

		Array.prototype.import({

			reverse (...args) { return [...this].reverseEq(...args) },
			sort    (...args) { return [...this].   sortEq(...args) },
		});

		Array.prototype.import({

			toObject (f) {
				let obj = {};
				this.forEach((...args)=>{
					let [key,value] = f(...args,obj);
					obj[key] = value;
				});
				return obj;
			},

			for           (...a) { this.forEach(...a); return this },
			maxMatch      (f  ) { return this.map((e,i,l)=>[f(e,i,l),e]).sort((a,b)=>b[0]-a[0])[0][1] },
			minMatch      (f  ) { return this.map((e,i,l)=>[f(e,i,l),e]).sort((a,b)=>a[0]-b[0])[0][1] },
			circularShift (n=1) { let c = [...this]; c.unshift(...c.splice(n%c.length,c.length)); return c },
			insert        (e,i) { this.splice(i,0,e); return this },
			remove        (...ls) { return this.filter(e=>ls.every(r=>r!==e)) }, // is this the expected behavior? (ALL instances of anything in ls is removed)
			partition     (n  ) { let r=[]; for(let i in this)if(!(i%n))r.push([this[i]]);else r.last.push(this[i]); return r },

			group (f=i=>i) {
				let groups = [];
				this.forEach((e,...args)=>{
					let i = f(e,...args);
					let g = groups[i];
					if (!g) g = groups[i] = [];
					g.push(i);
				});
				return groups;
			},

			forRange (f) {
				let counter = 0;
				let recurse = (index,acc) => {
					if (index >= this.length) f(acc,++counter,this);
					else for (let i of range(this[index])) recurse(index+1,[...acc,i]);
				}; recurse(0,[]);
				return this;
			},

			mapRange (f) {
				let counter = 0, retVal = [];
				let recurse = (index,acc) => {
					if (index >= this.length) retVal.push(f(acc,++counter,this));
					else for (let i of range(this[index])) recurse(index+1,[...acc,i]);
				}; recurse(0,[]);
				return retVal;
			},

			flatMapRange (f) { return this.mapRange(f).flat() },

			get flattest    () { return this.flat(Infinity) },
			get isArray     () { return true },
			get pretty      () { return `[${this.map(i=>i.pretty||i).join`,`}]` },
			get randomized  () { return this.map(i=>Math.random()*i) },
			get rle         () { return this.reduce((p,c)=>(l=>(l&&c==l[0]?++l[1]:p.push([c,1]),p))(p.last),[]) },
			get pack        () { return this.rle.map(([value,count])=>Array(count).fill(value)) },
			get hist        () { return this.sort().rle },
			get unique      () { return this.hist.map(i=>i.first) },

			get shuffle () {
				let c = [...this];
				for (let i=0;i<c.length;++i) {
					let j = rInt(i);
					[c[i],c[j]] = [c[j],c[i]];
				} return c;
			},

			get dimensions () {
				let sizeLs = [], ary = this;
				while (ary.isArray) {
					sizeLs.push(ary.length);
					ary = ary[0];
				} return sizeLs;
			},
		});

 "+--  Grid  --------------------------------------------------------------------------------------------------------+"

		Array.import({

			grid (...dimensions) {
				let recurse = (dimension=0) => {
					if (dimension>=dimensions.length) return;
					let ary = new Array(dimensions[dimension]);
					for (let i of Array.range(dimensions[dimension])) ary[i] = recurse(dimension+1);
					return ary;
				};
				return recurse();
			},
		});

 "+--  Vector  ------------------------------------------------------------------------------------------------------+"

		// TODO: migrate to Math

		// TODO: complex operators
		// TODO: quaternion operators

		Array.prototype.import({

			...Math.unary    .map(({array})=>function(    ){return this.map(array)}),
			...Math.fixed    .map(({array})=>function(...a){return this.map((e  )=>array(e,...a   ))}),
			...Math.piecewise.map(({array})=>function(   a){return this.map((e,i)=>array(e,   a[i]))}),
			...Math.variadic .map(({array})=>function(    ){return array(...this)}),

			equals        (v  ) { return this.length===v.length&&this.every((e,i)=>e===v[i]) },
			dot           (v  ) { return this.map((e,i)=>e*v[i]).sum() },
			setMag        (m  ) { return this.times(m/this.mag) },
			sqDistTo      (v  ) { return this.minus(v).sqMag },
			distTo        (v  ) { return this.minus(v).mag },
			midpointTo    (v  ) { return this.plus(v.minus(this).div(2)) },
			cerpTo (v,i) {
				let diff = v.minus(this), mag = diff.mag;
				return mag?this.plus(diff.times(Math.min(mag,i)/mag)):this;
			},
			ikTo (v,i) {
				// TODO: stiffness/angle restrictions
				let diff = this.minus(v), mag = diff.mag;
				return mag?v.plus(diff.times(i/mag)):v;
				// return v.cerpTo(this,i);
			},
			lerpTo        (v,i) { return this.map((e,x)=>e+(v[x]-e)*i) },
			flip          (v  ) { return this.map((e,i)=>v[i]?1-e:e) },
			rotate        (f  ) { return [this.x*Math.cos(f)-this.y*Math.sin(f),this.x*Math.sin(f)+this.y*Math.cos(f)]},
			signedMag     (v  ) { return this.x*v.y-this.y*v.x }, // TODO: theres another name for this, find it
			cross (v  ) {
				let [a0,a1,a2] = this, [b0,b1,b2] = v;
				return [a1*b2-a2*b1,a2*b0-a0*b2,a0*b1-a1*b0];
			},

			uv2cvs (c2d) { return this.flipY.vTimes(c2d.size) },
			 v2cvs (c2d) { return this.v2uv.uv2cvs(c2d) },

			// TODO: move to matrix?
			get transpose   () { return this.reduce((prev,row)=>row.map((col,i)=>[...(prev[i]||[]),row[i]]),[]) },

			get flipX       () { return this.flip([true]) },
			get flipY       () { return this.flip([false,true]) },
			get flipZ       () { return this.flip([false,false,true]) },
			get sqMag       () { return this.dot(this) },
			get mag         () { return Math.sqrt(this.sqMag) },
			get norm        () { return this.times(1/this.mag) },
			get aspectRatio () { return this.x/this.y },
			get v2uv        () { return this.sPlus(1).div(2) },
			get uv2v        () { return this.times(2).sMinus(1) },

			get angle () { return Math.atan2(this.y,this.x) },
		});

		[	[ "w" , t=>0 ],[ "h" , t=>1 ],[ "d" , t=>2 ],
			[ "x" , t=>0 ],[ "y" , t=>1 ],[ "z" , t=>2 ],
			[ "r" , t=>0 ],[ "g" , t=>1 ],[ "b" , t=>2 ],[ "a" , t=>3 ],
			[ "first" , t=>0 ],[ "last" , t=>t.length-1 ],
			[ "rand" , t=>~~(Math.random()*t.length) ],
		].map(i=>Array.prototype.addProperty(i[0],{
			get ( ) { return this[i[1](this)]     },
			set (v) { return this[i[1](this)] = v },
		}));

 "+--  Matrix  ------------------------------------------------------------------------------------------------------+"

		let Matrix4 = window.Matrix4 = class extends Array {

			static get identity     () { return new Matrix4([1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]) };
			static     orthographic (l,r,b,t,n,f) { return new Matrix4([2/(r-l),0,0,0],[0,2/(t-b),0,0],[0,0,2/(f-n),0],[-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]) };
			static     perspective  (fovy,near,far,aspect,f=1/Math.tan(fovy/2)) { return new Matrix4([f/aspect,0,0,0],[0,f,0,0],[0,0,(far+near)/(near-far),-1],[0,0,2*far*near/(near-far),0]) };
			static     lookAt       (eye,center,up) {
				up = up.norm;
				let f = center.minus(eye).norm;
				let s = f.cross(up).norm;
				let u = s.cross(f);
				return new Matrix4([...s,0],[...u,0],[...f.neg(),0],[0,0,0,1]).transpose().translate(...eye.neg());
			};

			transpose () {
				return new Matrix4(...this.map((i,x)=>this.map(j=>j[x])));
			};

			times (m) {
				let t = this.transpose();
				return new Matrix4(...m.map(i=>t.map(j=>i.dot(j))));
			};

			translate (x,y=x,z=0) { return this.times([[1,0,0,0],[0,1,0,0],[0,0,1,0],[x,y,z,1]]) };
			scale     (x,y=x,z=1) { return this.times([[x,0,0,0],[0,y,0,0],[0,0,z,0],[0,0,0,1]]) };

			rotate (angle,x=0,y=0,z=1) {
				let c = Math.cos(angle), s = Math.sin(angle), i = 1-c;
				[x,y,z] = [x,y,z].norm;
				return this.times([
					[x*x*i+c  ,y*x*i+z*s,x*z*i-y*s,0],
					[x*y*i-z*s,y*y*i+c  ,y*z*i+x*s,0],
					[x*z*i+y*s,y*z*i-x*s,z*z*i+c  ,0],
					[0        ,0        ,0        ,1],
				]);
			};

			rotateX (angle) {
				let c = Math.cos(angle), s = Math.sin(angle);
				return this.times([[1,0,0,0],[0,c,s,0],[0,-s,c,0],[0,0,0,1]]);
			};

			rotateY (angle) {
				let c = Math.cos(angle), s = Math.sin(angle);
				return this.times([[c,0,-s,0],[0,1,0,0],[s,0,c,0],[0,0,0,1]]);
			};

			rotateZ (angle) {
				let c = Math.cos(angle), s = Math.sin(angle);
				return this.times([[c,-s,0,0],[s,c,0,0],[0,0,1,0],[0,0,0,1]]);
			};
		};

 "+--  String  ------------------------------------------------------------------------------------------------------+"

		String.prototype.import({

			base            (b=10) { return(b===10?parseFloat:parseInt)(this,b) },
			capitalize      () { return this.charAt(0).toUpperCase()+this.slice(1) },
			lineCount       () { return this.split("\n").length }, // make this a getter
			withLineNumbers (offset=1) { return this.split("\n").map((l,i)=>(i+offset)+"\t"+l).join("\n") }, // improve this to be tab-size-independent
			maxLineLength   () { return this.split("\n").map(i=>i.length).max }, // make this a getter

			zeroPad (length) { return this.padStart(length,"0") },

			get deepClone () { return this+"" },
			get isString  () { return true },
		});

 "+--  Set  ---------------------------------------------------------------------------------------------------------+"

		Set.prototype.import({

			filter       (f) { return new Set([...this].filter(f)) },
			union        (s) { return new Set([...this,...s]) },
			intersection (s) { return this.filter(i=>s.has(i)) },
			difference   (s) { return this.filter(i=>!s.has(i)) },
		});

 "+--  Number  ------------------------------------------------------------------------------------------------------+"

		Number.prototype.import({

			...Math.unary    .map(({number})=>function(    ){return number(this+0     )}),
			...Math.fixed    .map(({number})=>function(...a){return number(this+0,...a)}),
			...Math.piecewise.map(({number})=>function(...a){return number(this+0,...a)}),
			...Math.variadic .map(({number})=>function(    ){return number(this+0     )}),

			base (b,zeroPad=0) {
				let s = this.toString(b);
				return ("0".repeat(zeroPad)+s).slice(-Math.max(s.length,zeroPad));
			},

			equals (n) { return this == n },

			get deepClone () { return this+0 },
			get isNumber  () { return true },
		});

 "+--  Function  ----------------------------------------------------------------------------------------------------+"

		Function.prototype.import({

			repeat (n,...args) { for (let i of range(n)) this(...args) },

			duration (...args) {
				let start = performance.now();
				this(...args);
				return performance.now()-start;
			},

			delay (delay,...args) { setTimeout(()=>this(...args),delay) },

			defer (...args) { requestAnimationFrame(()=>this(...args)) },

			partial (...inital) { return (...args)=>this(...initial,...args) },

			memoize (hashFn=(...args)=>args.first) {
				let cache = [];
				return (...args) => {
					let hash = hashFn(...args);
					let cached = cache[hash];
					if (cached === undefined) cached = cache[hash] = this(...args);
					return cached;
				};
			},

			get isFunction () { return true },
		});

 "+--  Time  --------------------------------------------------------------------------------------------------------+"

		window.tick  = 0;
		window.time  = 0;
		window.frame = 0;

		window.autoLoop = f => {
			let g = () => {
				requestAnimationFrame(g);
				f();
			}; requestAnimationFrame(g);
		};

		autoLoop(()=>{
			tick = performance.now();
			time = tick/1000;
			++frame;
		});

 "+--  HTML + Node + Style  -----------------------------------------------------------------------------------------+"

		Node.element  = type => document.createElement(type);
		Node.textNode = text => document.createTextNode(text);
		Node.style    = css  => {
			let style = Node.element("style");
			Node.textNode(css).appendTo(style);
			return style;
		};

		Node.prototype.appendTo = function (node=document.documentElement) { return node.appendChild(this) };

		window.addProperties({
			title : { get:()=>document.title, set:title=>document.title=title },
			backgroundColor : {
				get : ( ) => Style.backgroundColor,
				set : (v) => Style.backgroundColor = v,
			},
		});

		let Style = document.documentElement.style;
		window.noPadding    = ( ) => Style.position = "absolute";
		window.noOverflow   = ( ) => Style.overflow = "hidden";

 "+--  Misc  --------------------------------------------------------------------------------------------------------+"

		HTMLCanvasElement.prototype.import({
			get size (    ) { return [this.width,this.height]        },
			set size (size) { return [this.width,this.height] = size },
		});

/*+==  INPUT + EVENT HANDLING  ======================================================================================+*/

 "+--  Handle Register  ---------------------------------------------------------------------------------------------+"

		// TODO: inject eventHandler into event objects?

		Event        .prototype.clone    = function () { return new this.constructor(this.type,this) };
		GamepadButton.prototype.toObject = function () { return {value:this.value,pressed:this.pressed} };

		let       eventHandlers = new Set();
		let    addEventHandler  = handler => eventHandlers.add   (handler);
		let removeEventHandler  = handler => eventHandlers.delete(handler);

		let handleEvent = (eventName,...args) => eventHandlers.for(handler=>{
			let f = handler[eventName];
			if (f) f(...args);
		});

		addEventHandler(window);

 "+--  Window Events  -----------------------------------------------------------------------------------------------+"

		// TODO: display bounds

		addEventListener("resize",event=>{
			window.size = size;
			handleEvent("onResize",[innerWidth,innerHeight],event.clone());
		});

		addEventListener("focus",event=>{
			window.focussed = true;
			handleEvent("onFocus",event.clone());
		});

		addEventListener("blur",event=>{
			window.focussed = false;
			handleEvent("onBlur",event.clone());
		});

		window.size     = [innerWidth,innerHeight];
		window.focussed = false;

 "+--  Keyboard Events  ---------------------------------------------------------------------------------------------+"

		// TODO: global pollable key objects

		let keyHandler = (suffix,repeat) => event => {
			if (repeat !== undefined && repeat !== event.repeat) return;
			handleEvent("onKey"        +suffix,event.code,event.clone());
			handleEvent("on"+event.code+suffix,event.code,event.clone());
		};

		addEventListener("keydown",keyHandler("Down"  ,false));
		addEventListener("keydown",keyHandler("Repeat",true ));
		addEventListener("keydown",keyHandler("Press"       ));
		addEventListener("keyup"  ,keyHandler("Up"          ));

 "+--  Pointer Events  ----------------------------------------------------------------------------------------------+"

		// TODO: global pollable pointer objects

		let prevPointerState = [];

		let pointerHandler = (suffix,onChange) => event => {

			let prevButtons = prevPointerState[event.pointerId] || 0;
			let buttonState = onChange?prevButtons^event.buttons:event.buttons;
			prevPointerState[event.pointerId] = event.buttons;

			let pointerEvent = suffix => {
				let e = event.clone();
				e.id    = e.pointerId;
				e.pos   = [e.offsetX  ,e.offsetY  ];
				e.delta = [e.movementX,e.movementY];
				e.tilt  = [e.tiltX    ,e.tiltY    ];
				e.uv    = e.pos.vDiv(size).flipY;
				e.vtx   = e.uv.times(2).sMinus(1);
				handleEvent("onPointer"+suffix,e);
				handleEvent("on"+type  +suffix,e);
				buttons.for((button,i)=>{
					if (buttonState&i) handleEvent("on"+button+suffix,e);
				});
			};

			let type,buttons = [];
			switch (event.pointerType) {
				case "touch" : type = "Touch";                                                                    break;
				case "mouse" : type = "Mouse"; buttons = [,"Left","Right",,"Middle",,,,"Back",,,,,,,,"Forward"];  break;
				case "pen"   : type = "Pen"  ; buttons = [,"Nib","Barrel",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"Eraser"]; break;
			}

			pointerEvent(suffix);
			if (suffix === "Move") pointerEvent(event.buttons?"Drag":"Hover");
		};

		addEventListener("wheel"      ,event=>handleEvent("onWheel",event.clone()));
		addEventListener("pointerover",pointerHandler("In"        ));
		addEventListener("pointerdown",pointerHandler("Down",true ));
		addEventListener("pointermove",pointerHandler("Move",false));
		addEventListener("pointerup"  ,pointerHandler("Up"  ,true ));
		addEventListener("pointerout" ,pointerHandler("Out"       ));

		Style.touchAction = "none";

		window.maxTouchPoints = navigator.maxTouchPoints;
		window.showCursor     = ( ) => Style.cursor = "default";
		window.hideCursor     = ( ) => Style.cursor = "none";
		window.toggleCursor   = ( ) => Style.cursor = Style.cursor === "none" ? "default" : "none";
		window.setCursor      = (e) => Style.cursor = e ? "default" : "none";

 "+--  Gamepad Events  ----------------------------------------------------------------------------------------------+"

		// TODO: how to identify unique controller (example: differentiating between 2 xbox controllers)
		// TODO: alternate mappings in catalog (example: sideways joycon)
		// TODO: onJoyconConnect/Disconnect
		// TODO: onLeft/RightJoyconConnect/Disconnect

		let gamepadCatalog = {

			"Wireless Gamepad (Vendor: 057e Product: 2006)" : {
				name    : "LeftJoycon",
				prefix  : "Joycon",
				buttons : ["Left","Down","Up","Right","LeftSL","LeftSR",,,"Minus",,"LeftAxis",,,"Media","L","ZL"],
				axes    : [,,,,,,,,,"Left"],
			},

			"Wireless Gamepad (Vendor: 057e Product: 2007)" : {
				name    : "RightJoycon",
				prefix  : "Joycon",
				buttons : ["A","X","B","Y","RightSL","RightSR",,,,"Plus",,"RightAxis","Home",,"R","ZR"],
				axes    : [,,,,,,,,,"Right"],
			},
		};

		addEventListener("gamepadconnected"  ,event=>handleEvent("onGamepadConnect"   ,event.clone()));
		addEventListener("gamepadisconnected",event=>handleEvent("onGamepadDisconnect",event.clone()));

		let buttonStates = new Map();

		autoLoop(()=>{
			let gamepads = navigator.getGamepads();
			for (let i=0;i<gamepads.length;++i) {
				let gamepad = gamepads[i];
				if (!gamepad) continue;
				let device = gamepadCatalog[gamepad.id];
				gamepad.buttons.for((button,buttonIndex)=>{
					let name = device && device.buttons[buttonIndex];
					let curr = button.toObject();
					let prev = buttonStates.get(button) || curr;
					buttonStates.set(button,curr);
					if (prev.pressed !== curr.pressed) {
						// TODO: pass gamepadIndex?
						let suffix = button.pressed?"Down":"Up";
						handleEvent("onButton"+suffix,buttonIndex,gamepad);
						if (name) {
							handleEvent("onButton"+name+suffix,gamepad); // TODO: test crossmaps (onButtonADown should work on a joycon and xbox controller)
							handleEvent("on"+device.prefix+name+suffix,gamepad);
						}
					} // if (prev.value !== curr.value) handleEvent("onButtonAnalog",buttonIndex,button.value,gamepad); // TODO: TEST
				});
				// TODO: onAxis
			}
		});

 "+--  MIDI Events  -------------------------------------------------------------------------------------------------+"

		navigator.requestMIDIAccess().then(access=>{
			let inputs  = access.inputs .values();
			let outputs = access.outputs.values();
			access.onstatechange = e => {}; // TODO: PROCESS EVENTS
			for (let input of inputs) input.onmidimessage = e => { e.data }; // TODO: PROCESS EVENTS
		});

 "+--  Motion Input  ------------------------------------------------------------------------------------------------+"

		addEventListener("devicemotion",event=>{
			let {x,y,z} = event.accelerationIncludingGravity;
			let {alpha,beta,gamma} = event.rotationRate;
			window.acceleration = [x,y,z];
			window.rotationRate = [alpha,beta,gamma];
		});

		window.acceleration = [0,0,0];
		window.rotationRate = [0,0,0];

/*+==  CANVAS 2D  ===================================================================================================+*/

 "+--  Context  -----------------------------------------------------------------------------------------------------+"

		let Canvas2D = window.Canvas2D = function (size) {

			this.canvas  = document.createElement("canvas");
			this.context = this.canvas.getContext("2d");
			this.path    = undefined; // add these to push pop?
			this.winding = "nonzero"; // add these to push pop?
			if (size) this.size = size;
		};

		let Simple2D = () => window.import(Math,Canvas2D.prototype,new Canvas2D().autoResize().attach());

		Canvas2D.prototype = {

			get isCanvas2D () { return true },

			get width  ( ) { return this.canvas.width      },
			set width  (w) { return this.canvas.width  = w },
			get height ( ) { return this.canvas.height     },
			set height (h) { return this.canvas.height = h },
			get size   ( ) { return this.canvas.size       },
			set size   (s) { if (this._mask) this._mask.size = s;
			                 return this.canvas.size   = s },

			attach () {
				document.documentElement.appendChild(this.canvas);
				noPadding();
				noOverflow();
				return this;
			},

			autoResize () {
				let resize = e => this.size = [innerWidth,innerHeight];
				addEventListener("resize",resize);
				resize();
				return this;
			},
		};

 "+--  State  -------------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			push () { this.context.save();    return this },
			pop  () { this.context.restore(); return this },

			pushPop (f) {
				this.push();
				f(this);
				return this.pop();
			},
		});

 "+--  Transforms  --------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			get transform ( ) { return this.context.currentTransform     },
			set transform (t) { return this.context.currentTransform = t },

			identity     (     ) { this.context.resetTransform(); return this },
			rotate       (angle) { this.context.rotate(angle);    return this },
			scale        (x,y=x) { this.context.scale(x,y);       return this },
			setTransform (t    ) { this.context.setTransform(t);  return this },
			translate    (x,y  ) { this.context.translate(x,y);   return this },
			center       (     ) { return this.identity().translate(...this.size.div(2)) },

			transform (hMove,hScale,hSkew,vMove,vScale,vSkew) {
				this.context.transform(hScale,hSkew,vSkew,vScale,hMove,vMove);
				return this;
			},
		});

 "+--  Color  -------------------------------------------------------------------------------------------------------+"

		let rgbString = (...args) => {
			let [r,g,b,a] = Math.rgb(...args);
			return `rgba(${~~(r*255)},${~~(g*255)},${~~(b*255)},${a})`;
		};

		let hsvString = (...args) => rgbString(...Math.hsv(...args));
		let hslString = (...args) => rgbString(...Math.hsl(...args));

		Canvas2D.prototype.import({

			get strokeColor ( ) { return this.context.strokeStyle     },
			set strokeColor (c) { return this.context.strokeStyle = c },
			get   lineColor ( ) { return this.context.strokeStyle     },
			set   lineColor (c) { return this.context.strokeStyle = c },
			get   fillColor ( ) { return this.context.  fillStyle     },
			set   fillColor (c) { return this.context.  fillStyle = c },
			get   blurColor ( ) { return this.context.shadowColor     },
			set   blurColor (c) { return this.context.shadowColor = c },
			get       alpha ( ) { return this.context.globalAlpha     },
			set       alpha (a) { return this.context.globalAlpha = a },

			setColor (color) { this.strokeColor = this.fillColor = this.blurColor = color; return this },
			setAlpha (alpha) { this.alpha = alpha; return this; },

			hex (color) { return this.setColor("#"+color.base(16).zeroPad(6)) },
			rgb255 (r,g=r,b=g,a=1) { return this.setColor(rgbString(r/255,g/255,b/255,a)) },

			rgb (...args) { return this.setColor(rgbString(...args)) },
			hsl (...args) { return this.setColor(hslString(...args)) },
			hsv (...args) { return this.setColor(hsvString(...args)) },

			rgbStroke (...args) { this.strokeColor = rgbString(...args); return this },
			rgbLine   (...args) { this.  lineColor = rgbString(...args); return this },
			rgbFill   (...args) { this.  fillColor = rgbString(...args); return this },
			rgbBlur   (...args) { this.  blurColor = rgbString(...args); return this },
			hslStroke (...args) { this.strokeColor = hslString(...args); return this },
			hslLine   (...args) { this.  lineColor = hslString(...args); return this },
			hslFill   (...args) { this.  fillColor = hslString(...args); return this },
			hslBlur   (...args) { this.  blurColor = hslString(...args); return this },
			hsvStroke (...args) { this.strokeColor = hsvString(...args); return this },
			hsvLine   (...args) { this.  lineColor = hsvString(...args); return this },
			hsvFill   (...args) { this.  fillColor = hsvString(...args); return this },
			hsvBlur   (...args) { this.  blurColor = hsvString(...args); return this },

			// createLinearGradient()
			// createRadialGradient()
			// createPattern()
		});

 "+--  Text  --------------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			get font ( ) { return this.context.font     },
			set font (f) { return this.context.font = f },

			setFont (name,size,options="") { this.font = options+" "+size+"px "+name; return this },

			textL2R        () { this.context.direction = "ltr"    ; return this },
			textR2L        () { this.context.direction = "rtl"    ; return this },
			textDirInherit () { this.context.direction = "inherit"; return this },

			measureText (text) { return this.context.measureText(text) },

			fillText (text,x=0,y=0,{baseline="top",align="left",maxWidth}={}) {
				this.context.textBaseline = baseline;
				this.context.textAlign    = align;
				this.context.fillText(text,x,y,maxWidth);
				return this;
			},

			strokeText (text,x=0,y=0,{baseline="top",align="left",maxWidth}={}) {
				this.context.textBaseline = baseline;
				this.context.textAlign    = align;
				this.context.strokeText(text,x,y,maxWidth);
				return this;
			},

			fillTextTL (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"top"   ,align:"left"  ,maxWidth}) },
			fillTextTC (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"top"   ,align:"center",maxWidth}) },
			fillTextTR (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"top"   ,align:"right" ,maxWidth}) },
			fillTextML (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"middle",align:"left"  ,maxWidth}) },
			fillTextMC (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"middle",align:"center",maxWidth}) },
			fillTextMR (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"middle",align:"right" ,maxWidth}) },
			fillTextBL (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"bottom",align:"left"  ,maxWidth}) },
			fillTextBC (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"bottom",align:"center",maxWidth}) },
			fillTextBR (text,x,y,maxWidth) { return this.fillText(text,x,y,{baseline:"bottom",align:"right" ,maxWidth}) },

			strokeTextTL (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"top"   ,align:"left"  ,maxWidth}) },
			strokeTextTC (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"top"   ,align:"center",maxWidth}) },
			strokeTextTR (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"top"   ,align:"right" ,maxWidth}) },
			strokeTextML (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"middle",align:"left"  ,maxWidth}) },
			strokeTextMC (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"middle",align:"center",maxWidth}) },
			strokeTextMR (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"middle",align:"right" ,maxWidth}) },
			strokeTextBL (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"bottom",align:"left"  ,maxWidth}) },
			strokeTextBC (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"bottom",align:"center",maxWidth}) },
			strokeTextBR (text,x,y,maxWidth) { return this.strokeText(text,x,y,{baseline:"bottom",align:"right" ,maxWidth}) },
		});

 "+--  Masking + Blending  ------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			get blend ( ) { return this.context.globalCompositeOperation     },
			set blend (o) { return this.context.globalCompositeOperation = o },

			setBlend (blend) { this.blend = blend; return this },

			mask (blend,f) {
				if (!this._mask) this._mask = new Canvas2D(this.size);
				if (f) this.pushPop(()=>{
					f(this._mask.clear());
					this.blend = blend;
					this.identity().drawImage(this._mask);
				}); else this.blend = blend;
				return this;
			},

			srcOver    (f) { return this.mask("source-over"     ,f) },
			srcIn      (f) { return this.mask("source-in"       ,f) },
			srcOut     (f) { return this.mask("source-out"      ,f) },
			srcAtop    (f) { return this.mask("source-atop"     ,f) },
			dstOver    (f) { return this.mask("destination-over",f) },
			dstIn      (f) { return this.mask("destination-in"  ,f) },
			dstOut     (f) { return this.mask("destination-out" ,f) },
			dstAtop    (f) { return this.mask("destination-atop",f) },
			lighter    (f) { return this.mask("lighter"         ,f) },
			add        (f) { return this.mask("lighter"         ,f) },
			copy       (f) { return this.mask("copy"            ,f) },
			xor        (f) { return this.mask("xor"             ,f) },
			multiply   (f) { return this.mask("multiply"        ,f) },
			screen     (f) { return this.mask("screen"          ,f) },
			overlay    (f) { return this.mask("overlay"         ,f) },
			darken     (f) { return this.mask("darken"          ,f) },
			min        (f) { return this.mask("darken"          ,f) },
			lighten    (f) { return this.mask("lighten"         ,f) },
			max        (f) { return this.mask("lighten"         ,f) },
			colorDodge (f) { return this.mask("color-dodge"     ,f) },
			colorBurn  (f) { return this.mask("color-burn"      ,f) },
			hardLight  (f) { return this.mask("hard-light"      ,f) },
			softLight  (f) { return this.mask("soft-light"      ,f) },
			difference (f) { return this.mask("difference"      ,f) },
			exclusion  (f) { return this.mask("exclusion"       ,f) },
			hue        (f) { return this.mask("hue"             ,f) },
			saturation (f) { return this.mask("saturation"      ,f) },
			color      (f) { return this.mask("color"           ,f) },
			luminosity (f) { return this.mask("luminosity"      ,f) },
		});

 "+--  Path  --------------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			beginPath        ()                        { this.path = new Path2D();                            return this },
			moveTo           (x,y)                     { this.path.moveTo          (x,y);                     return this },
			lineTo           (x,y)                     { this.path.lineTo          (x,y);                     return this },
			strokeTo         (x,y)                     { this.path.lineTo          (x,y);                     return this },
			arc              (x,y,r,a,b,ccw)           { this.path.arc             (x,y,r,a,b,ccw);           return this },
			arcTo            (x0,y0,x1,y1,r)           { this.path.arcTo           (x0,y0,x1,y1,r);           return this },
			bezierCurveTo    (cp0x,cp0y,cp1x,cp1y,x,y) { this.path.bezierCurveTo   (cp0x,cp0y,cp1x,cp1y,x,y); return this },
			quadraticCurveTo (cpx,cpy,x,y)             { this.path.quadraticCurveTo(cpx,cpy,x,y);             return this },
			rect             (x,y,w,h)                 { this.path.rect            (x,y,w,h);                 return this },
			ellipse          (x,y,rx,ry,rot,a,b,ccw)   { this.path.ellipse         (x,y,rx,ry,rot,a,b,ccw);   return this },
			closePath        ()                        { this.path.closePath       ();                        return this },

			vertex (x,y) {
				if (this.path.moved) this.path.lineTo(x,y);
				else {
					this.path.moved = true;
					this.path.moveTo(x,y);
				} return this;
			},

			stroke      (path=this.path) { this.context.stroke(path);            return this },
			fill        (path=this.path) { this.context.fill(path,this.winding); return this },
			fillNonZero (path=this.path) { this.context.fill(path,"nonzero"   ); return this },
			fillEvenOdd (path=this.path) { this.context.fill(path,"evenodd"   ); return this },
			clip        (path=this.path) { this.context.clip(path,this.winding); return this },
			clipNonZero (path=this.path) { this.context.clip(path,"nonzero"   ); return this },
			clipEvenOdd (path=this.path) { this.context.clip(path,"evenodd"   ); return this },

			isPointInPath        (x,y,path=this.path) { return this.context.isPointInPath(path,x,y,this.winding) },
			isPointInPathNonZero (x,y,path=this.path) { return this.context.isPointInPath(path,x,y,"nonzero"   ) },
			isPointInPathEvenOdd (x,y,path=this.path) { return this.context.isPointInPath(path,x,y,"evenodd"   ) },
			isPointInStroke      (x,y,path=this.path) { return this.context.isPointInStroke(path,x,y)            },

			// addHitRegion()
			// clearHitRegions()
			// removeHitRegion()
		});

 "+--  Line  --------------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			capButt    () { this.context.lineCap  = "butt"  ; return this },
			capRound   () { this.context.lineCap  = "round" ; return this },
			capSquare  () { this.context.lineCap  = "square"; return this },
			jointBevel () { this.context.lineJoin = "bevel" ; return this },
			jointRound () { this.context.lineJoin = "round" ; return this },
			jointMiter () { this.context.lineJoin = "miter" ; return this },

			round () { this.context.lineCap = this.context.lineJoin = "round"; return this },

			strokeWidth (w) { this.context.lineWidth      = w; return this },
			lineWidth   (w) { this.context.lineWidth      = w; return this },
			dashOffset  (o) { this.context.lineDashOffset = o; return this },
			miter       (m) { this.context.miterLimit     = m; return this },
			dash        (d) { this.context.setLineDash(d);     return this },
		});

 "+--  Blur  --------------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			blur        (b) { this.context.shadowBlur    = b; return this },
			blurXOffset (x) { this.context.shadowOffsetX = x; return this },
			blurYOffset (y) { this.context.shadowOffsetY = y; return this },
		});

 "+--  Image + Bitmap  ----------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			setImageSmoothing (quality) {
				if (level) this.context.imageSmoothingQuality = quality;
				this.context.imageSmoothingEnabled = !!quality;
				return this;
			},

			disableImageSmoothing () { return this.setImageSmoothing(false   ) },
			    lowImageSmoothing () { return this.setImageSmoothing("low"   ) },
			 mediumImageSmoothing () { return this.setImageSmoothing("medium") },
			   highImageSmoothing () { return this.setImageSmoothing("high"  ) },

			drawImage (img,dx=0,dy=0,dw=img.width,dh=img.height,sx=0,sy=0,sw=img.width||img.videoWidth,sh=img.height||img.videoHeight) {
				this.context.drawImage(img.isCanvas2D?img.canvas:img,sx,sy,sw,sh,dx,dy,dw,dh);
				return this;
			},

			// createImageData()
			// getImageData()
			// putImageData()
		});

 "+--  Drawing  -----------------------------------------------------------------------------------------------------+"

		Canvas2D.prototype.import({

			clearRect (x,y,w,h) { this.context.clearRect(x,y,w,h); return this },
			clear () { return this.pushPop(()=>this.identity().context.clearRect(0,0,this.width,this.height)) },

			fillRect (x,y,w,h) { this.context.fillRect(x,y,w,h); return this },
			fillBG () { return this.pushPop(()=>this.identity().context.fillRect(0,0,this.width,this.height)) },

			strokeRect (x,y,w,h) { this.context.strokeRect(x,y,w,h); return this },

			fillCircle (x,y,r) {
				this.beginPath();
				this.arc(x,y,r,0,Math.tau);
				return this.fill();
			},

			strokeCircle (x,y,r) {
				this.beginPath();
				this.arc(x,y,r,0,Math.tau);
				return this.stroke();
			},

			strokeArc (x,y,r,a,b,ccw) {
				this.beginPath();
				this.arc(x,y,r,a,b,ccw);
				return this.stroke();
			},

			createPath (x,y,...rest) {
				this.beginPath();
				this.moveTo(x,y);
				for (let [x,y] of rest.partition(2)) this.lineTo(x,y);
				return this;
			},

			fillPath (x,y,...rest) { this.createPath(x,y,...rest); return this.fill  () },
			line     (x,y,...rest) { this.createPath(x,y,...rest); return this.stroke() },
			lineLoop (x,y,...rest) { this.createPath(x,y,...rest); return this.closePath().stroke() },
			fullPath (x,y,...rest) { this.createPath(x,y,...rest); return this.closePath().fill().stroke() },

			polygon (x,y,radius,sides,rotation=0) {
				this.beginPath();
				for (let i=0;i<Math.tau;i+=Math.tau/sides) this.vertex(...(i+rotation).cosSin(radius).plus([x,y]));
				return this.closePath();
			},

			  fillPolygon (x,y,radius,sides,rotation=0) { return this.polygon(...arguments).fill  () },
			strokePolygon (x,y,radius,sides,rotation=0) { return this.polygon(...arguments).stroke() },
		});

/*+==  CORE  ========================================================================================================+*/

 "+--  Context  -----------------------------------------------------------------------------------------------------+"

		let Den = window.Den = size => {

			let wrapper   = {};
			let canvas    = wrapper.canvas  = document.createElement("canvas");
			let gl        = wrapper.gl      = canvas.getContext("webgl2",{antialias:false});
			let context   = wrapper.context = {};
			let offscreen =                   gl.createFramebuffer(); // pixel transfer?

			if (!size) {
				let resize = e => canvas.size = [innerWidth,innerHeight];
				addEventListener("resize",resize);
				resize();
				noPadding();
				noOverflow();
				backgroundColor = "#000";
				canvas.appendTo();
			} else canvas.size = size;

			for (let i of gl.getSupportedExtensions()) {
				gl.getExtension(i);
				if (false) console.log("Enabled extension",i);
			}

		with (context) {

 "+--  GLSL Types  --------------------------------------------------------------------------------------------------+"

		let types = [
			{
				mediump    : { precision     : "mediump" },
				lowp       : { precision     : "lowp"    },
				highp      : { precision     : "highp"   },
			},{
				smooth     : { interpolation : "smooth" },
				flat       : { interpolation : "flat"   },
			},{
				vertIn     : { vertStore : "in"                                                 },
				vertOut    : { vertStore : "out"                                                },
				varying    : { vertStore : "out"     , fragStore : "in"                         },
				uniform    : { vertStore : "uniform" , fragStore : "uniform"                    },
				sampler    : { vertStore : "uniform" , fragStore : "uniform" , asTexture : true },
				fragOut    : {                         fragStore : "out"                        },
			},{
				minLinear  : { minFilter : gl.LINEAR                 , generateMipmaps : false },
				minNearest : { minFilter : gl.NEAREST                , generateMipmaps : false },
				minNMN     : { minFilter : gl.NEAREST_MIPMAP_NEAREST , generateMipmaps : true  },
				minLMN     : { minFilter : gl. LINEAR_MIPMAP_NEAREST , generateMipmaps : true  },
				minNML     : { minFilter : gl.NEAREST_MIPMAP_LINEAR  , generateMipmaps : true  },
				minLML     : { minFilter : gl. LINEAR_MIPMAP_LINEAR  , generateMipmaps : true  },
			},{
				magLinear  : { magFilter : gl.LINEAR          },
				magNearest : { magFilter : gl.NEAREST         },
			},{
				xRepeat    : { wrapX     : gl.REPEAT          },
				xClamp     : { wrapX     : gl.CLAMP_TO_EDGE   },
				xMirror    : { wrapX     : gl.MIRRORED_REPEAT },
			},{
				yRepeat    : { wrapY     : gl.REPEAT          },
				yClamp     : { wrapY     : gl.CLAMP_TO_EDGE   },
				yMirror    : { wrapY     : gl.MIRRORED_REPEAT },
			},{
				zRepeat    : { wrapZ     : gl.REPEAT          },
				zClamp     : { wrapZ     : gl.CLAMP_TO_EDGE   },
				zMirror    : { wrapZ     : gl.MIRRORED_REPEAT },
			},{
				noInstnce  : { instanced : false },
				instanced  : { instanced : true  },
			},{
				//       | attribute   is[M]atrix | buffer      [E]lementSize | texture  samplerPrefi[X] [R]enderable [B]ilinearItp bytesPer[P]ixel
				//       | glslType | swizzle | M | suffix | arrayType    | E | internalFmt | format          | dataType          | X      // R B P
				rgba8  : [ "vec4"   , ".xyzw" ,   ,        , Uint8Array   , 4 , gl.RGBA     , gl.RGBA         , gl.UNSIGNED_BYTE  ,     ], // x x 4 
				uint8  : [ "uint"   , ".x   " ,   , "1ui"  , Uint8Array   , 1 , gl.R8UI     , gl. RED_INTEGER , gl.UNSIGNED_BYTE  , "u" ], // x   1 
				u8v2   : [ "uvec2"  , ".xy  " ,   , "2ui"  , Uint8Array   , 2 , gl.RG8UI    , gl.  RG_INTEGER , gl.UNSIGNED_BYTE  , "u" ], // x   2 
				u8v3   : [ "uvec3"  , ".xyz " ,   , "3ui"  , Uint8Array   , 3 , gl.RGB8UI   , gl. RGB_INTEGER , gl.UNSIGNED_BYTE  , "u" ], //     3 
				u8v4   : [ "uvec4"  , ".xyzw" ,   , "4ui"  , Uint8Array   , 4 , gl.RGBA8UI  , gl.RGBA_INTEGER , gl.UNSIGNED_BYTE  , "u" ], // x   4 
				uint16 : [ "uint"   , ".x   " ,   , "1ui"  , Uint16Array  , 1 , gl.R16UI    , gl. RED_INTEGER , gl.UNSIGNED_SHORT , "u" ], // x   2 
				u16v2  : [ "uvec2"  , ".xy  " ,   , "2ui"  , Uint16Array  , 2 , gl.RG16UI   , gl.  RG_INTEGER , gl.UNSIGNED_SHORT , "u" ], // x   4 
				u16v3  : [ "uvec3"  , ".xyz " ,   , "3ui"  , Uint16Array  , 3 , gl.RGB16UI  , gl. RGB_INTEGER , gl.UNSIGNED_SHORT , "u" ], //     6 
				u16v4  : [ "uvec4"  , ".xyzw" ,   , "4ui"  , Uint16Array  , 4 , gl.RGBA16UI , gl.RGBA_INTEGER , gl.UNSIGNED_SHORT , "u" ], // x   8 
				uint   : [ "uint"   , ".x   " ,   , "1ui"  , Uint32Array  , 1 , gl.R32UI    , gl. RED_INTEGER , gl.UNSIGNED_INT   , "u" ], // x   4 
				uvec2  : [ "uvec2"  , ".xy  " ,   , "2ui"  , Uint32Array  , 2 , gl.RG32UI   , gl.  RG_INTEGER , gl.UNSIGNED_INT   , "u" ], // x   8 
				uvec3  : [ "uvec3"  , ".xyz " ,   , "3ui"  , Uint32Array  , 3 , gl.RGB32UI  , gl. RGB_INTEGER , gl.UNSIGNED_INT   , "u" ], //     12
				uvec4  : [ "uvec4"  , ".xyzw" ,   , "4ui"  , Uint32Array  , 4 , gl.RGBA32UI , gl.RGBA_INTEGER , gl.UNSIGNED_INT   , "u" ], // x   16
				int8   : [ "int"    , ".x   " ,   , "1i"   , Int8Array    , 1 , gl.R8I      , gl. RED_INTEGER , gl.BYTE           , "i" ], // x   1 
				i8v2   : [ "ivec2"  , ".xy  " ,   , "2i"   , Int8Array    , 2 , gl.RG8I     , gl.  RG_INTEGER , gl.BYTE           , "i" ], // x   2 
				i8v3   : [ "ivec3"  , ".xyz " ,   , "3i"   , Int8Array    , 3 , gl.RGB8I    , gl. RGB_INTEGER , gl.BYTE           , "i" ], //     3 
				i8v4   : [ "ivec4"  , ".xyzw" ,   , "4i"   , Int8Array    , 4 , gl.RGBA8I   , gl.RGBA_INTEGER , gl.BYTE           , "i" ], // x   4 
				int16  : [ "int"    , ".x   " ,   , "1i"   , Int16Array   , 1 , gl.R16I     , gl. RED_INTEGER , gl.SHORT          , "i" ], // x   2 
				i16v2  : [ "ivec2"  , ".xy  " ,   , "2i"   , Int16Array   , 2 , gl.RG16I    , gl.  RG_INTEGER , gl.SHORT          , "i" ], // x   4 
				i16v3  : [ "ivec3"  , ".xyz " ,   , "3i"   , Int16Array   , 3 , gl.RGB16I   , gl. RGB_INTEGER , gl.SHORT          , "i" ], //     6 
				i16v4  : [ "ivec4"  , ".xyzw" ,   , "4i"   , Int16Array   , 4 , gl.RGBA16I  , gl.RGBA_INTEGER , gl.SHORT          , "i" ], // x   8 
				int    : [ "int"    , ".x   " ,   , "1i"   , Int32Array   , 1 , gl.R32I     , gl. RED_INTEGER , gl.INT            , "i" ], // x   4 
				ivec2  : [ "ivec2"  , ".xy  " ,   , "2i"   , Int32Array   , 2 , gl.RG32I    , gl.  RG_INTEGER , gl.INT            , "i" ], // x   8 
				ivec3  : [ "ivec3"  , ".xyz " ,   , "3i"   , Int32Array   , 3 , gl.RGB32I   , gl. RGB_INTEGER , gl.INT            , "i" ], //     12
				ivec4  : [ "ivec4"  , ".xyzw" ,   , "4i"   , Int32Array   , 4 , gl.RGBA32I  , gl.RGBA_INTEGER , gl.INT            , "i" ], // x   16
				hfloat : [ "float"  , ".x   " ,   , "1f"   , Float32Array , 1 , gl.R16F     , gl. RED         , gl.HALF_FLOAT     ,     ], // ? x 2 
				hfv2   : [ "vec2"   , ".xy  " ,   , "2f"   , Float32Array , 2 , gl.RG16F    , gl.  RG         , gl.HALF_FLOAT     ,     ], // ? x 4 
				hfv3   : [ "vec3"   , ".xyz " ,   , "3f"   , Float32Array , 3 , gl.RGB16F   , gl. RGB         , gl.HALF_FLOAT     ,     ], // ? x 6 
				hfv4   : [ "vec4"   , ".xyzw" ,   , "4f"   , Float32Array , 4 , gl.RGBA16F  , gl.RGBA         , gl.HALF_FLOAT     ,     ], // ? x 8 
				float  : [ "float"  , ".x   " ,   , "1f"   , Float32Array , 1 , gl.R32F     , gl. RED         , gl.FLOAT          ,     ], // ? ? 4 
				vec2   : [ "vec2"   , ".xy  " ,   , "2f"   , Float32Array , 2 , gl.RG32F    , gl.  RG         , gl.FLOAT          ,     ], // ? ? 8 
				vec3   : [ "vec3"   , ".xyz " ,   , "3f"   , Float32Array , 3 , gl.RGB32F   , gl. RGB         , gl.FLOAT          ,     ], // ? ? 12
				vec4   : [ "vec4"   , ".xyzw" ,   , "4f"   , Float32Array , 4 , gl.RGBA32F  , gl.RGBA         , gl.FLOAT          ,     ], // ? ? 16
				bool   : [ "bool"   , ".x   " ,   , "1i"   , Uint8Array   , 1 ,             ,                 ,                   , "X" ], //       
				bvec2  : [ "bvec2"  , ".xy  " ,   , "2i"   , Uint8Array   , 2 ,             ,                 ,                   , "X" ], //       
				bvec3  : [ "bvec3"  , ".xyz " ,   , "3i"   , Uint8Array   , 3 ,             ,                 ,                   , "X" ], //       
				bvec4  : [ "bvec4"  , ".xyzw" ,   , "4i"   , Uint8Array   , 4 ,             ,                 ,                   , "X" ], //       
				mat2   : [ "mat2"   ,         , 1 , "2fv"  , Float32Array ,   ,             ,                 ,                   ,     ], //       
				mat3   : [ "mat3"   ,         , 1 , "3fv"  , Float32Array ,   ,             ,                 ,                   ,     ], //       
				mat4   : [ "mat4"   ,         , 1 , "4fv"  , Float32Array ,   ,             ,                 ,                   ,     ], //       

				//              | internalFormat        | format             | dataType                           | attachment                  | clearBits
				sd16   : [ ,,,,,, gl.DEPTH_COMPONENT16  , gl.DEPTH_COMPONENT , gl.UNSIGNED_SHORT                 ,, gl.DEPTH_ATTACHMENT         , gl.DEPTH_BUFFER_BIT                       ],
				d16    : [ ,,,,,, gl.DEPTH_COMPONENT16  , gl.DEPTH_COMPONENT , gl.UNSIGNED_INT                   ,, gl.DEPTH_ATTACHMENT         , gl.DEPTH_BUFFER_BIT                       ],
				d24    : [ ,,,,,, gl.DEPTH_COMPONENT24  , gl.DEPTH_COMPONENT , gl.UNSIGNED_INT                   ,, gl.DEPTH_ATTACHMENT         , gl.DEPTH_BUFFER_BIT                       ],
				d32f   : [ ,,,,,, gl.DEPTH_COMPONENT32F , gl.DEPTH_COMPONENT , gl.FLOAT                          ,, gl.DEPTH_ATTACHMENT         , gl.DEPTH_BUFFER_BIT                       ],
				d24s8  : [ ,,,,,, gl.DEPTH24_STENCIL8   , gl.DEPTH_STENCIL   , gl.UNSIGNED_INT_24_8              ,, gl.DEPTH_STENCIL_ATTACHMENT , gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT ],
				d32fs8 : [ ,,,,,, gl.DEPTH32F_STENCIL8  , gl.DEPTH_STENCIL   , gl.FLOAT_32_UNSIGNED_INT_24_8_REV ,, gl.DEPTH_STENCIL_ATTACHMENT , gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT ],

			}.map(([glslType,swizzle,isMatrix,suffix,arrayType,elementSize,internalFormat,format,dataType,samplerPrefix,attachment=gl.COLOR_ATTACHMENT0,clearBits=gl.COLOR_BUFFER_BIT,bufferTarget=gl.ARRAY_BUFFER])=>
			      ({glslType,swizzle,isMatrix,suffix,arrayType,elementSize,internalFormat,format,dataType,samplerPrefix,attachment                     ,clearBits                    ,bufferTarget                })
			)
		];

		context.Type = (()=>{

			let compound = (...patternLs) => {
				let flag = 0;
				for (let pattern of patternLs) flag |= pattern;
				let fn = value => {
					if (!value.typeOverride) value = {value};
					value.typeOverride |= flag;
					return value;
				};
				fn.toString = () => flag;
				return fn;
			};

			let patternLs = {};
			let fieldLs   = [];

			let offset = 0;
			for (let field of types) {
				let mask = 0, ctr = 1, flagLs = [];
				for (let [qualifier,value] of field.keyValues) {
					let flag = ctr++<<offset;
					let fn = compound(flag);
					patternLs[qualifier] = fn;
					flagLs[fn] = value;
					mask |= flag;
				} fieldLs.push({mask,flagLs,base:1<<offset});
				offset = 32-Math.clz32(mask);
			} context.import(patternLs);

			let memo = new Map();

			let getPattern = (rawPattern,override) => fieldLs.map(field=>field.mask&override
				                                                    ||field.mask&rawPattern
				                                                    ||field.base).reduce((p,c)=>p|c);
			let getType = pattern => {
				if (pattern.isType) return pattern;
				let type = memo.get(pattern);
				if (!type) {

					let fullPattern = getPattern(pattern);
					let base    = fieldLs.map(field=>field.flagLs[field.mask&fullPattern]||{}).reduce((p,c)=>({...c,...p}));
					    base.    pattern =     pattern;
					    base.fullPattern = fullPattern;

					if (base.samplerPrefix) {
						base.interpolation = "flat";
						base.minFilter     = base.generateMipmaps?gl.NEAREST_MIPMAP_NEAREST:gl.NEAREST;
						base.magFilter     = gl.NEAREST;
					}

					if (base.asTexture) {
						base.glslType = (base.samplerPrefix||" ")+"sampler2D";
						base.sampler  = gl.createSampler();
						for (let [name,param] of [
							[ gl.TEXTURE_MIN_FILTER , base.minFilter ],
							[ gl.TEXTURE_MAG_FILTER , base.magFilter ],
							[ gl.TEXTURE_WRAP_S     , base.wrapX     ],
							[ gl.TEXTURE_WRAP_T     , base.wrapY     ],
							[ gl.TEXTURE_WRAP_R     , base.wrapZ     ],
						]) gl.samplerParameteri(base.sampler,name,param);
						gl.samplerParameteri(base.sampler,gl.TEXTURE_MIN_LOD,0);
						gl.samplerParameteri(base.sampler,gl.TEXTURE_MAX_LOD,base.generateMipmaps?1e10:0);
					}

					memo.set(pattern,type=Object.freeze({...base,get isType(){return true}}));

				} return type;
			};

			let decl = (variable,type,store) => store &&
				(variable.location!==undefined?"layout(location="+variable.location+")":"")+
				((type.vertStore==="out"||type.fragStore==="in")?type.interpolation+" ":"")+
				(store||"")+" "+type.precision+" "+type.glslType+" "+variable.name+";";

			return {compound,getPattern,getType,decl};
		})();

		context.import(({
			nxLinear  : minLinear  | magLinear ,
			nxNearest : minNearest | magNearest,
			xyzRepeat : xRepeat | yRepeat | zRepeat,
			xyzClamp  : xClamp  | yClamp  | zClamp ,
			xyzMirror : xMirror | yMirror | zMirror,
		}).map(i=>Type.compound(i)));

 "+--  Enums  -------------------------------------------------------------------------------------------------------+"

		context.import({

			tris      : gl.TRIANGLES,
			triFan    : gl.TRIANGLE_FAN,
			triStrip  : gl.TRIANGLE_STRIP,
			lines     : gl.LINES,
			lineLoop  : gl.LINE_LOOP,
			lineStrip : gl.LINE_STRIP,
			points    : gl.POINTS,

			cw        : gl.CW,
			ccw       : gl.CCW,

			front     : gl.FRONT,
			back      : gl.BACK,
			both      : gl.FRONT_AND_BACK,

			never     : gl.NEVER,
			always    : gl.ALWAYS,
			equal     : gl.EQUAL,
			notEqual  : gl.NOTEQUAL,
			less      : gl.LESS,
			lEqual    : gl.LEQUAL,
			greater   : gl.GREATER,
			gEqual    : gl.GEQUAL,

			keep      : gl.KEEP,
			zero      : gl.ZERO,
			replace   : gl.REPLACE,
			incr      : gl.INCR,
			incrWrap  : gl.INCR_WRAP,
			decr      : gl.DECR,
			decrWrap  : gl.DECR_WRAP,
			invert    : gl.INVERT,

			add       : gl.FUNC_ADD,
			sub       : gl.FUNC_SUBTRACT,
			rSub      : gl.FUNC_REVERSE_SUBTRACT,
			min       : gl.MIN,
			max       : gl.MAX,

			one       : gl.ONE,
			zero      : gl.ZERO,
			srcColor  : gl.SRC_COLOR,
			srcIColor : gl.ONE_MINUS_SRC_COLOR,
			dstColor  : gl.DST_COLOR,
			dstIColor : gl.ONE_MINUS_DST_COLOR,
			srcAlpha  : gl.SRC_ALPHA,
			srcIAlpha : gl.ONE_MINUS_SRC_ALPHA,
			dstAlpha  : gl.DST_ALPHA,
			dstIAlpha : gl.ONE_MINUS_DST_ALPHA,
			alphaSat  : gl.SRC_ALPHA_SATURATE,
		});

		let blendModes = {

			srcOnly  : { src:one, dst:zero },
			srcOver  : { srcRGB:srcAlpha, srcAlpha:one, dstRGB:srcIAlpha, dstAlpha:srcIAlpha },
			multiply : { src:dstColor, dst:zero },
			add, sub, rSub, min, max,
		};

		context.import(blendModes);
		delete context.min;
		delete context.max;

		let setupBlend = blend => {
			if (blend) {
				if (blend.isNumber  ) blend = {mode:blend};
				if (blend.isFunction) blend = {mode:blend};
				let { mode = add, modeRGB = mode, modeAlpha = mode,
				       src = one,  srcRGB =  src,  srcAlpha =  src,
				       dst = one,  dstRGB =  dst,  dstAlpha =  dst, } = blend;
				if (modeRGB === min) modeRGB = gl.MIN; if (modeAlpha === min) modeAlpha = gl.MIN;
				if (modeRGB === max) modeRGB = gl.MAX; if (modeAlpha === max) modeAlpha = gl.MAX;
				gl.enable(gl.BLEND);
				gl.blendEquationSeparate(modeRGB,modeAlpha);
				gl.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
			} else gl.disable(gl.BLEND);
		};

		let setupScissor = scissor => {
			if (scissor) {
				gl.enable(gl.SCISSOR_TEST);
				gl.scissor(...scissor);
			} else gl.disable(gl.SCISSOR_TEST);
		};

		let setupCull = (cull,frontFace) => {
			if (cull) {
				gl.enable(gl.CULL_FACE);
				gl.cullFace(cull);
				gl.frontFace(frontFace);
			} else gl.disable(gl.CULL_FACE);
		};

		let setupDepth = (enabled,test,mask,func,range,polygonOffset) => {
			if (!enabled) return gl.disable(gl.DEPTH_TEST);
			if ( test   )        gl. enable(gl.DEPTH_TEST);
			else                 gl.disable(gl.DEPTH_TEST);
			gl.depthMask(mask);
			gl.depthFunc(func);
			gl.depthRange(...range);
			if (polygonOffset) {
				gl.enable(gl.POLYGON_OFFSET_FILL);
				gl.polygonOffset(...polygonOffset);
			} else gl.disable(gl.POLYGON_OFFSET_FILL);
		};

		let setupStencil = (enabled,test,mask,func,op) => {
			if (!enabled) return gl.disable(gl.STENCIL_TEST);
			if ( test   )        gl. enable(gl.STENCIL_TEST);
			else                 gl.disable(gl.STENCIL_TEST);
			if (mask.isArray) {
				gl.stencilMaskSeparate(front,mask[0]);
				gl.stencilMaskSeparate(back ,mask[1]);
				gl.stencilMaskSeparate(both ,mask[2]);
			} else gl.stencilMask(mask);
			if (func.first.isArray) {
				gl.stencilFuncSeparate(front,...func[0]);
				gl.stencilFuncSeparate(back ,...func[1]);
				gl.stencilFuncSeparate(both ,...func[2]);
			} else gl.stencilFunc(...func);
			if (op.first.isArray) {
				gl.stencilOpSeparate(front,...op[0]);
				gl.stencilOpSeparate(back ,...op[1]);
				gl.stencilOpSeparate(both ,...op[2]);
			} else gl.stencilOp(...op);
		};

		let setupPixelStore = store => {
			gl.pixelStorei(gl.PACK_ALIGNMENT,                     store.packAlignment              || 4);
			gl.pixelStorei(gl.UNPACK_ALIGNMENT,                   store.unpackAlignment            || 4);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,                store.unpackFlipY                || false);
			gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,     store.unpackPremultiplyAlpha     || false);
			gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, store.unpackColorspaceConversion || gl.BROWSER_DEFAULT_WEBGL);
			gl.pixelStorei(gl.PACK_ROW_LENGTH,                    store.packRowLength              || 0);
			gl.pixelStorei(gl.PACK_SKIP_PIXELS,                   store.packSkipPixels             || 0);
			gl.pixelStorei(gl.PACK_SKIP_ROWS,                     store.packSkipRows               || 0);
			gl.pixelStorei(gl.UNPACK_ROW_LENGTH,                  store.unpackRowLength            || 0);
			gl.pixelStorei(gl.UNPACK_IMAGE_HEIGHT,                store.unpackImageHeight          || 0);
			gl.pixelStorei(gl.UNPACK_SKIP_PIXELS,                 store.unpackSkipPixels           || 0);
			gl.pixelStorei(gl.UNPACK_SKIP_ROWS,                   store.unpackSkipRows             || 0);
			gl.pixelStorei(gl.UNPACK_SKIP_IMAGES,                 store.unpackSkipImages           || 0);
		};

 "+--  Buffer  ------------------------------------------------------------------------------------------------------+"

		context.Buffer = class {

			constructor ({type,size,elements,data}={}) {

				this.type   = Type.getType(type);
				this.buffer = gl.createBuffer();
				this.usage  = gl.STATIC_DRAW;

				     if (size    ) this.size     = size;
				else if (elements) this.elements = elements;
				else if (data)     this.setData(data);
			};

			bind (f=()=>0) { gl.bindBuffer(this.type.bufferTarget,this.buffer); f(); return this };

			get elements    (        ) { return this.size/this.type.elementSize };
			set elements    (elements) {        this.size = elements*this.type.elementSize };
			get        size (        ) { return this._size };
			set        size (size    ) {        this.bind(()=>gl.bufferData(this.type.target,this._size=size,this.usage)) };

			fromArray (array) {                            return this.fromTyped(new this.type.arrayType(array)) };
			fromTyped (typed) { this._size = typed.length; return this.bind(()=>gl.bufferData(this.type.bufferTarget,typed,this.usage)) };

			setData (data) { return data.isArray?this.fromArray(data):this.fromTyped(data) };

			dynamicDraw () { this.usage = gl.DYNAMIC_DRAW; return this };

			get isBuffer () { return true };
		};

 "+--  Texture  -----------------------------------------------------------------------------------------------------+"

		context.Texture = class {

			constructor ({target=gl.TEXTURE_2D,type,size=[0,0],data=null,pingpong=true}={}) {

				this.target    = target;
				this.type      = Type.getType(type);
				this.texture   = gl.createTexture();
				this.pingpong  = pingpong?gl.createTexture():this.texture;
				this.textureLs = pingpong?[this.texture,this.pingpong]:[this.texture];
				this.setData(size,data);
			};

			bind (f,texture=this.texture) { gl.bindTexture(this.target,texture); f(); return this };

			get size (    ) { return this.getSize() };
			set size (size) { if (!size.equals(this.size)) this.setData(size,null) };

			setSize (size) {
				this.size = size;
				return this;
			};

			getSize (level=0) {
				let recurse = (size,depth) => depth === level ? size : recurse(size.map(i=>i===1?1:floor(i/2)),depth+1);
				return recurse(this._size,0);
			};

			setData (size,data,store={},level=0) {
				if (size.isTexture) size = size.size;
				if (level === 0) this._size = size;
				if (data && data.isArray) data = new this.type.arrayType(data);
				setupPixelStore(store);
				// TODO: remove textureLs.for
				this.textureLs.for(i=>this.bind(()=>gl.texImage2D(this.target,level,this.type.internalFormat,...size,0,this.type.format,this.type.dataType,data),i));
				return this;
			};

			getPixel (x,y) { return this.getData(x,y,1,1) };
			getData (x=0,y=0,w=this.size.w,h=this.size.h) {
				let pixels = new this.type.arrayType(w*h*this.type.elementSize);
				gl.bindFramebuffer(gl.FRAMEBUFFER,offscreen);
				gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,this.target,this.texture,0);
				gl.readPixels(x,y,w,h,this.type.format,this.type.dataType,pixels);
				gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,this.target,null,0);
				return pixels;
			};

			generateMipmaps () { return this.bind(()=>gl.generateMipmap(this.target)) }; // TODO: optimize (add render counter to texture, record when mips generated, only regenerate if counters dont match)

			// TODO: add depth and stencil clear values
			clear (color=[0,0,0,0]) {
				gl.bindFramebuffer(gl.FRAMEBUFFER,offscreen);
				gl.framebufferTexture2D(gl.FRAMEBUFFER,this.type.attachment,this.target,this.texture,0);
				gl.clearColor(...color);
				gl.clear(this.type.clearBits);
				gl.framebufferTexture2D(gl.FRAMEBUFFER,this.type.attachment,this.target,null,0);
				return this;
			};

			get isTexture () { return true };
		};

 "+--  Canvas + Media Textures  -------------------------------------------------------------------------------------+"

		context.Canvas2DTexture = class extends Texture {

			constructor (size) {
				super({size,type:rgba8,pingpong:false});
				this.gfx = new Canvas2D();
				if (size) this.size = size;
			};

			get size (    ) { return       this.gfx.size        };
			set size (size) { super.size = this.gfx.size = size };

			draw (f) {
				f(this.gfx);
				return this.setData(this.size,this.gfx.canvas,{unpackFlipY:true});
			};
		};

		let MediaTexture = class extends Texture {

			constructor (raw) {
				super({size:[1,1],type:rgba8}).clear([0,0,0,0]);
				this.raw      = raw;
				this.isLoaded = false;
				MediaTexture.mediaLs.push(this);
			};

			_onload () {
				this.isLoaded = true;
				this.onLoad(this);
				if (MediaTexture.mediaLs.every(i=>i.isLoaded)) onmediaload();
			};

			onLoad () { return this };
		};

		context.ImageTexture = class extends MediaTexture {

			constructor (src) {
				let raw = new Image();
				raw.src = src;
				raw.onload = () => {
					this.setData([this.raw.width,this.raw.height],this.raw,{unpackFlipY:true});
					this._onload();
				};
				super(raw);
			};
		};

		context.VideoTexture = class extends MediaTexture {

			constructor (src,options={}) {
				let raw = document.createElement("video");
				raw.addEventListener("ended"     ,e=>this. onEnd ());
				raw.addEventListener("loadeddata",e=>{
					this.size = [raw.videoWidth,raw.videoHeight];
					this._onload()
				});
				raw.src = src;
				super(raw);
				options.assignTo(this);
			};

			get length      () { return this.raw.duration    };
			get duration    () { return this.raw.duration    };
			get paused      () { return this.raw.paused      };
			get time        () { return this.raw.currentTime };   set time        (t) { return this.raw.currentTime = t };
			get currentTime () { return this.raw.currentTime };   set currentTime (t) { return this.raw.currentTime = t };
			get muted       () { return this.raw.muted       };   set muted       (m) { return this.raw.muted       = m };
			get loop        () { return this.raw.loop        };   set loop        (l) { return this.raw.loop        = l };

			update () { return this.setData([this.raw.videoWidth,this.raw.videoHeight],this.raw,{unpackFlipY:true}) };
			play   () { this.raw.play();  return this };
			pause  () { this.raw.pause(); return this };
			reset  () { this.time = 0;    return this.update() };
			toggle () { return this.paused?this.play():this.pause() };

			onEnd () {};
		};

		context.CameraTexture = class extends MediaTexture {

			constructor (options={video:true}) {
				let raw = document.createElement("video");
				navigator.mediaDevices.getUserMedia(options).then(stream=>{
					this.track = stream.getVideoTracks().first;
					raw.srcObject = stream;
					raw.onloadedmetadata = () => {
						raw.play();
						this._onload();
					};
				});
				super(raw);
				this.raw = raw;
			};

			update () { return this.setData([this.raw.videoWidth,this.raw.videoHeight],this.raw,{unpackFlipY:true}) };

			get capabilities () { return this.track.getCapabilities() };
			get settings     () { return this.track.getSettings    () };
			apply (constraints) { this.track.applyConstraints({advanced:[constraints]}) };

			get aspectRatio          () { return this.settings.aspectRatio          }; set aspectRatio          (v) { this.apply({ aspectRatio          : v }) };
			get brightness           () { return this.settings.brightness           }; set brightness           (v) { this.apply({ brightness           : v }) };
			get colorTemperature     () { return this.settings.colorTemperature     }; set colorTemperature     (v) { this.apply({ colorTemperature     : v }) };
			get contrast             () { return this.settings.contrast             }; set contrast             (v) { this.apply({ contrast             : v }) };
			get exposureCompensation () { return this.settings.exposureCompensation }; set exposureCompensation (v) { this.apply({ exposureCompensation : v }) };
			get exposureMode         () { return this.settings.exposureMode         }; set exposureMode         (v) { this.apply({ exposureMode         : v }) };
			get focusMode            () { return this.settings.focusMode            }; set focusMode            (v) { this.apply({ focusMode            : v }) };
			get frameRate            () { return this.settings.frameRate            }; set frameRate            (v) { this.apply({ frameRate            : v }) };
			get height               () { return this.settings.height               }; set height               (v) { this.apply({ height               : v }) };
			get saturation           () { return this.settings.saturation           }; set saturation           (v) { this.apply({ saturation           : v }) };
			get sharpness            () { return this.settings.sharpness            }; set sharpness            (v) { this.apply({ sharpness            : v }) };
			get whiteBalanceMode     () { return this.settings.whiteBalanceMode     }; set whiteBalanceMode     (v) { this.apply({ whiteBalanceMode     : v }) };
			get width                () { return this.settings.width                }; set width                (v) { this.apply({ width                : v }) };
			get zoom                 () { return this.settings.zoom                 }; set zoom                 (v) { this.apply({ zoom                 : v }) };
		};

		MediaTexture.mediaLs = [];
		let onMediaLoadFnLs = [], onmediaload = () => onMediaLoadFnLs.for(f=>f());

 "+--  Typed + Temporary Textures  ----------------------------------------------------------------------------------+"

		let buf = (type,defaults={}) => (data,args={}) => new Buffer ({type,data,...defaults,...args});

		let tex = type => {
			let fn = (size,data) => new Texture({type,size:size.size||size,data});
			fn.temp = (size,f) => Texture.temp(type,size,f);
			return fn;
		};

		context.import({

			v1tex : tex(float),   v2tex : tex( vec2),   v3tex : tex( vec3),   v4tex : tex( vec4),
			f1tex : tex(float),   f2tex : tex( vec2),   f3tex : tex( vec3),   f4tex : tex( vec4),
			i1tex : tex(int  ),   i2tex : tex(ivec2),   i3tex : tex(ivec3),   i4tex : tex(ivec4),
			u1tex : tex(uint ),   u2tex : tex(uvec2),   u3tex : tex(uvec3),   u4tex : tex(uvec4),
			b1tex : tex(bool ),   b2tex : tex(bvec2),   b3tex : tex(bvec3),   b4tex : tex(bvec4),

			v1buf : buf(float),   v2buf : buf( vec2),   v3buf : buf( vec3),   v4buf : buf( vec4),
			f1buf : buf(float),   f2buf : buf( vec2),   f3buf : buf( vec3),   f4buf : buf( vec4),
			i1buf : buf(int  ),   i2buf : buf(ivec2),   i3buf : buf(ivec3),   i4buf : buf(ivec4),
			u1buf : buf(uint ),   u2buf : buf(uvec2),   u3buf : buf(uvec3),   u4buf : buf(uvec4),
			b1buf : buf(bool ),   b2buf : buf(bvec2),   b3buf : buf(bvec3),   b4buf : buf(bvec4),

			 d32tex : tex(d32f),
			  c2tex : size => new Canvas2DTexture(size),
			 imgtex : src => new ImageTexture(src),
			 vidtex : (src,options) => new VideoTexture(src),
			elembuf : buf(Int32Array,{elementSize:1}),
		});

		let tempTex = new Map();

		Texture.temp = (type,size,f) => {

			let {pattern} = Type.getType(type);

			let sizeLs = tempTex.get(pattern);
			if (!sizeLs) tempTex.set(pattern,sizeLs = new Map());
			let hash   = size.pretty;
			let tempLs = sizeLs.get(hash);
			if (!tempLs) sizeLs.set(hash,tempLs = []);

			let obj = undefined;
			for (let temp of tempLs) if (!temp.active) obj = temp;
			if (!obj) tempLs.push(obj = {
				active  : false,
				texture : new Texture({type,size:size.size||size}),
			});

			obj.active = true;
			let retVal = f(obj.texture);
			obj.active = false;
			return retVal;
		};

 "+--  Program  -----------------------------------------------------------------------------------------------------+"

		// TODO: overwrite instanced function to accept divisor

		let progMemo        = new Map();
		let defaultElements = elembuf().dynamicDraw();

		context.Program = ({

			name,                                              // name of shader, if defined, name is printed to console when program is compiled
			vert,                                              // vertex shader source
			frag,                                              // fragment shader source
			mode          : _mode,                             // tris, triFan, triStrip, lines, lineLoop, lineStrip, points
			viewport      : _viewport,                         // [x,y,w,h]
			frontFace     : _frontFace     = ccw,              // ccw, cw
			cull          : _cull,                             // front, back, both
			scissor       : _scissor,                          // [x,y,w,h]
			blend         : _blend,                            // see blending section
			fbo           : _fbo           = offscreen,        // target fbo
			colorMask     : _colorMask     = true,             // enabled bool or list of bools per channel [r,g,b,a]
			depthTest     : _depthTest     = true,             // enabled bool
			depthMask     : _depthMask     = true,             // enabled bool
			depthFunc     : _depthFunc     = less,             // never, always, equal, notEqual, less, lEqual, greater, gEqual
			depthRange    : _depthRange    = [0,1],            // [zNear,zFar]
			polygonOffset : _polygonOffset,                    // [factor,units]
			stencilTest   : _stencilTest   = true,             // enabled bool
			stencilMask   : _stencilMask   = -1,               // bitmask or list of bitmasks for [front,back,both]
			stencilFunc   : _stencilFunc   = [always,0,-1],    // [func,ref,mask] or list of [func,ref,mask] for [front,back,both] VALUES???
			stencilOp     : _stencilOp     = [keep,keep,keep], // [fail,zFail,zPass] or list of [fail,zFail,zPass] for [front,back,both] VALUES???
			elements      : _elements,                         // element array buffer for element rendering
			dsAttach      : _dsAttach,                         // depth stencil texture passed here
			...rawLs                                           // list of shader variable type definitions. see Types sections for list of GLSL types

		}) => ({

			mode=_mode,viewport=_viewport,frontFace=_frontFace,cull=_cull,scissor=_scissor,blend=_blend,fbo=_fbo,colorMask=_colorMask,
			depthTest=_depthTest,depthMask=_depthMask,depthFunc=_depthFunc,depthRange=_depthRange,polygonOffset=_polygonOffset,
			stencilTest=_stencilTest,stencilMask=_stencilMask,stencilFunc=_stencilFunc,stencilOp=_stencilOp,elements=_elements,dsAttach=_dsAttach,
			...argLs                                           // list of shader variable values

		}) => {

			if (masterHalt) return;

			let patternLs = {}, valueLs = {};
			rawLs.for((pattern,name)=>{
				let variable = argLs[name];
				let {value,typeOverride} = variable||{};
				patternLs[name] = Type.getPattern(pattern,typeOverride);
				  valueLs[name] = typeOverride?value:variable;
			});

			let hash = vert+frag+patternLs.toArray((pattern,name)=>name+pattern).reduce((p,c)=>p+"|"+c);
			let memo = progMemo.get(hash);

			if (!memo) {

				let varLs = patternLs.map((pattern,name)=>({
					type     : Type.getType(pattern),
					variable : {name},
				}));

				varLs.values.filter(({type})=>type.fragStore==="out").for(({variable},location)=>variable.location=location);

				let program = gl.createProgram();
				for (let [ src  , type               , store       , title                       ] of [
				         [ vert , gl.  VERTEX_SHADER , "vertStore" , "===== VERTEX SHADER =====" ],
				         [ frag , gl.FRAGMENT_SHADER , "fragStore" , "==== FRAGMENT SHADER ====" ],
				]) {
					let header = [GLSLHeader,...varLs.toArray(({variable,type})=>Type.decl(variable,type,type[store]))].join("\n");
					let shader = gl.createShader(type);
					gl.shaderSource(shader,[header,src].join("\n"));
					gl.compileShader(shader);
					gl.attachShader(program,shader);
					let status = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
					if (!status) {
						console.log("%c\n"+title+"\n\n"+(status?"":gl.getShaderInfoLog(shader)+"\n")+
						            src.withLineNumbers(header.lineCount()+1)+"\n\n",!status&&"color:#f90");
						masterHalt = true;
					}
				} gl.linkProgram(program);

				if (masterHalt) {
					progMemo.set(hash,{});
					return;
				} else {
					if (name) console.log("Compiled",name);
					++compileCount;
				}

				let uniformLs = varLs.filter(({variable,type})=>(variable.uniformLoc=gl.getUniformLocation(program,variable.name))!==null&&!type.asTexture);

				let vao = gl.createVertexArray();
				gl.bindVertexArray(vao);

				let vertLs = varLs.filter(({variable,type})=>{
					let loc = variable.attribLoc = gl.getAttribLocation(program,variable.name);
					if (loc<0) return false;
					gl.enableVertexAttribArray(loc);
					variable.defaultBuffer = new Buffer({type}).dynamicDraw();
					return true;
				});

				let unit = 0, samplerLs = varLs.filter(({variable,type})=>{
					if (!type.asTexture) return false;
					variable.uniformLoc = gl.getUniformLocation(program,variable.name);
					if (variable.uniformLoc === null) return false;
					variable.defaultTexture = new Texture({type});
					variable.unit = unit++;
					return true;
				});

				let drawBuffers = [], fragLs = varLs.filter(({variable,type})=>{
					variable.fragDataLoc = gl.getFragDataLocation(program,variable.name);
					variable.attachment  = type.attachment;
					if (variable.attachment === gl.COLOR_ATTACHMENT0) {
						if (variable.fragDataLoc >= 0) drawBuffers.push(variable.attachment+=variable.fragDataLoc);
						else return false;
					} return variable.attachment;
				});

				memo = {program,vertLs,uniformLs,samplerLs,fragLs,vao,drawBuffers};
				progMemo.set(hash,memo);
			}

			let getData = ls => ls.map((i,name)=>({...i,data:valueLs[name]})).filter(i=>i.data!==undefined);
			let {program,vertLs,uniformLs,samplerLs,fragLs,vao,drawBuffers} = memo, count = Infinity, iCount = 1;

			let samplerData   = getData(samplerLs);
			let textureReads  = new Set(samplerData.map(({data})=>data));
			let textureWrites = getData(fragLs).toArray(i=>i);
			if (blend) for (let {data} of textureWrites) if (textureReads.has(data)) data.sync();

			gl.useProgram(program);
			if (viewport) gl.viewport(...viewport);
			else gl.viewport(0,0,...(valueLs.res = valueLs.iRes = textureWrites.length ? textureWrites.reduce((p,c)=>p.vMin(c.data.size),[Infinity,Infinity]) : canvas.size));
			gl.colorMask(...(colorMask.isArray?colorMask:Array(4).fill(colorMask)));
			setupBlend   (blend);
			setupScissor (scissor);
			setupCull    (cull,frontFace);
			setupDepth   (dsAttach,  depthTest,  depthMask,  depthFunc,depthRange,polygonOffset);
			setupStencil (dsAttach,stencilTest,stencilMask,stencilFunc,stencilOp);
			if (dsAttach) textureWrites.push({variable:{attachment:dsAttach.type.attachment},data:dsAttach});

			for (let {variable,type,data} of samplerData) {
				gl.activeTexture(gl.TEXTURE0+variable.unit);
				gl.bindSampler(variable.unit,type.sampler);
				let binded = data;
				if (binded.isNumber) binded = Array(type.elementSize).fill(binded);
				if (binded.isArray ) binded = variable.defaultTexture.setData([1,1],binded);
				if (type.generateMipmaps) binded.generateMipmaps();
				binded.bind(()=>gl.uniform1i(variable.uniformLoc,variable.unit));
			}

			for (let {variable,type,data} of getData(uniformLs)) {
				if (type.isMatrix) {
					if (data.first.isArray) data = data.flat(Infinity);
					gl["uniformMatrix"+type.suffix](variable.uniformLoc,false,data);
				} else {
					if (data.isNumber) data = Array(type.elementSize).fill(data);
					gl["uniform"+type.suffix](variable.uniformLoc,...data);
				}
			}

			gl.bindVertexArray(vao);
			for (let {variable,type,data} of getData(vertLs)) {
				if (!data.isBuffer) data = variable.defaultBuffer.setData(data);
				data.bind(()=>{
					if (type.samplerPrefix) gl.vertexAttribIPointer(variable.attribLoc,data.type.elementSize,type.dataType,false,0,0);
					else                    gl.vertexAttribPointer (variable.attribLoc,data.type.elementSize,type.dataType,false,0,0);
					gl.vertexAttribDivisor(variable.attribLoc,~~type.instanced); // divisor arg...?
					if (type.instanced) iCount = Math.max(iCount,data.elements);
					else                 count = Math.min( count,data.elements);
				});
			}

			// REMOVE gl.TEXTURE_2D, USE TEXTURE-SPECIFIC FBO BINDING
			gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
			if (fbo) gl.drawBuffers(drawBuffers);
			textureWrites.for(({variable,data})=>gl.framebufferTexture2D(gl.FRAMEBUFFER,variable.attachment,gl.TEXTURE_2D,textureReads.has(data)?data.pingpong:data.texture,0));
			if (elements) {
				if (!elements.isBuffer) elements = defaultElements.setData(elements);
				else elements.bind();
				gl.drawElementsInstanced(mode,elements.size,gl.UNSIGNED_INT,0,iCount);
			} else gl.drawArraysInstanced(mode,0,count,iCount);
			textureWrites.for(({variable,data})=>{
				gl.framebufferTexture2D(gl.FRAMEBUFFER,variable.attachment,gl.TEXTURE_2D,null,0);
				if (textureReads.has(data)) [data.texture,data.pingpong] = [data.pingpong,data.texture];
			});
		};

 "+--  Methods  -----------------------------------------------------------------------------------------------------+"

		let masterHalt   = false;
		let compileCount = 0;

		context.onMediaLoad = f => {
			if (MediaTexture.mediaLs.length) onMediaLoadFnLs.push(f);
			else requestAnimationFrame(f);
		};

		context.renderLoop = f => {
			let halt = false, g = () => {
				if (!masterHalt && !halt) requestAnimationFrame(g);
				compileCount = 0;
				let tex = f();
				if (compileCount) console.log("Compiled",compileCount,"programs");
				if (tex && tex.isTexture) tex.blit();
			}; onMediaLoad(g);
			return {
				pause : () => halt = true,
				play  : () => {
					halt = false;
					requestAnimationFrame(g);
				},
			};
		};

/*+==  GLSL HEADER  =================================================================================================+*/

 "+--  Frag  --------------------------------------------------------------------------------------------------------+"

		let fragHeader = `

			int   randCtr = 0;
			float rand  () { return hash (vec3(pixel,tick+float(++randCtr))); }
			vec2  rand2 () { return hash2(vec3(pixel,tick+float(++randCtr))); }
			vec3  rand3 () { return hash3(vec3(pixel,tick+float(++randCtr))); }
			vec4  rand4 () { return hash4(vec4(pixel,tick,float(++randCtr))); }
		`;

 "+--  Math  --------------------------------------------------------------------------------------------------------+"

		let math = `

			#define minFloat 1.175494351e-38
			#define maxFloat 3.402823466e+38

			// TODO: MOVE TO GLOBAL MATH
			vec3 hsv2rgb (vec3 c) {
				vec4 K = vec4(1,2.0/3.0,1.0/3.0,3);
				return c.z*mix(K.xxx,clamp(abs(fract(c.rrr+K.xyz)*6.0-K.www)-K.xxx,0.0,1.0),c.y);
			}

			// TODO: MOVE TO GLOBAL MATH
			vec3 rgb2hsv (vec3 c) {
				vec4  K = vec4(0,-1.0/3.0,2.0/3.0,-1);
				vec4  p = mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));
				vec4  q = mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));
				float d = q.x-min(q.w,q.y);
				float e = 1.0e-10;
				return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);
			}

			// TODO: MOVE TO GLOBAL MATH
			// hash functions from https://www.shadertoy.com/view/4djSRW

			#define _H1      0.1031
			#define _H3 vec3(0.1031,0.1030,0.0973)
			#define _H4 vec4(0.1031,0.1030,0.0973,0.1099)

			float hash  (float p ) { vec3 p3 = fract(vec3(p     )*_H1); p3 += dot(p3,p3.yzx +19.19); return fract((p3.x   +p3.y   )*p3.z   ); }
			float hash  (vec2  p ) { vec3 p3 = fract(vec3(p.xyx )*_H1); p3 += dot(p3,p3.yzx +19.19); return fract((p3.x   +p3.y   )*p3.z   ); }
			float hash  (vec3  p3) {      p3 = fract(     p3     *_H1); p3 += dot(p3,p3.yzx +19.19); return fract((p3.x   +p3.y   )*p3.z   ); }
			vec2  hash2 (float p ) { vec3 p3 = fract(vec3(p     )*_H3); p3 += dot(p3,p3.yzx +19.19); return fract((p3.xx  +p3.yz  )*p3.zy  ); }
			vec2  hash2 (vec2  p ) { vec3 p3 = fract(vec3(p.xyx )*_H3); p3 += dot(p3,p3.yzx +19.19); return fract((p3.xx  +p3.yz  )*p3.zy  ); }
			vec2  hash2 (vec3  p3) {      p3 = fract(     p3     *_H3); p3 += dot(p3,p3.yzx +19.19); return fract((p3.xx  +p3.yz  )*p3.zy  ); }
			vec3  hash3 (float p ) { vec3 p3 = fract(vec3(p     )*_H3); p3 += dot(p3,p3.yzx +19.19); return fract((p3.xxy +p3.yzz )*p3.zyx ); }
			vec3  hash3 (vec2  p ) { vec3 p3 = fract(vec3(p.xyx )*_H3); p3 += dot(p3,p3.yxz +19.19); return fract((p3.xxy +p3.yzz )*p3.zyx ); }
			vec3  hash3 (vec3  p3) {      p3 = fract(     p3     *_H3); p3 += dot(p3,p3.yxz +19.19); return fract((p3.xxy +p3.yxx )*p3.zyx ); }
			vec4  hash4 (float p ) { vec4 p4 = fract(vec4(p     )*_H4); p4 += dot(p4,p4.wzxy+19.19); return fract((p4.xxyz+p4.yzzw)*p4.zywx); }
			vec4  hash4 (vec2  p ) { vec4 p4 = fract(vec4(p.xyxy)*_H4); p4 += dot(p4,p4.wzxy+19.19); return fract((p4.xxyz+p4.yzzw)*p4.zywx); }
			vec4  hash4 (vec3  p ) { vec4 p4 = fract(vec4(p.xyzx)*_H4); p4 += dot(p4,p4.wzxy+19.19); return fract((p4.xxyz+p4.yzzw)*p4.zywx); }
			vec4  hash4 (vec4  p4) {      p4 = fract(     p4     *_H4); p4 += dot(p4,p4.wzxy+19.19); return fract((p4.xxyz+p4.yzzw)*p4.zywx); }
		`;

 "+--  Sampling  ----------------------------------------------------------------------------------------------------+"

		let sampling = `

			#define thisUV(tex) texture(tex,uv)

			#define getPixel(tex,coord) texture(tex,(coord)/vec2(textureSize(tex,0)))
			#define thisPixel(tex) thisUV(tex)
			#define pixelOffset(tex,x,y) getPixel(tex,pixel+vec2(x,y))
			#define pixelL(tex) pixelOffset(tex,-1, 0)
			#define pixelR(tex) pixelOffset(tex, 1, 0)
			#define pixelD(tex) pixelOffset(tex, 0,-1)
			#define pixelU(tex) pixelOffset(tex, 0, 1)

			#define texel ivec2(pixel)
			#define getTexel(tex,coord) texelFetch(tex,coord,0)
			#define thisTexel(tex) getTexel(tex,texel)
			#define texelOffset(tex,x,y) getTexel(tex,texel+ivec2(x,y))
			#define texelL(tex) texelOffset(tex,-1, 0)
			#define texelR(tex) texelOffset(tex, 1, 0)
			#define texelD(tex) texelOffset(tex, 0,-1)
			#define texelU(tex) texelOffset(tex, 0, 1)
		`;

 "+--  Misc  --------------------------------------------------------------------------------------------------------+"

		let misc = `

			#define forManhattan(i,j,range) for (int i=-range;i<=range;++i) for (int j=-(range-abs(i));j<=range-abs(i);++j)
			#define forChebyshev(i,j,range) for (int i=-range;i<=range;++i) for (int j=-range;j<=range;++j)
		`;

 "+--  Meta  --------------------------------------------------------------------------------------------------------+"

		for (let {name,js,alias,constDef,unaryDef,unaryFor,binaryDef,ternaryDef,header} of Math.raw) {

			let define    = (type,def) => def.isFunction?def(type):def;
			let enumerate = f => ["float ","vec2  ","vec3  ","vec4  "].map(type=>f(type)).join("\n");

			if (alias   ) header = `#define ${name} ${alias}`;
			if (constDef) header = `#define ${name} ${js}`;

			if (unaryFor) header = `
				float ${name}(float n){return ${define("float",unaryFor)};}
				vec2  ${name}(vec2  n){return vec2(${name}(n[0]),${name}(n[1]));}
				vec3  ${name}(vec3  n){return vec3(${name}(n[0]),${name}(n[1]),${name}(n[2]));}
				vec4  ${name}(vec4  n){return vec4(${name}(n[0]),${name}(n[1]),${name}(n[2]),${name}(n[3]));}
			`; 

			if (  unaryDef) header = enumerate(type=>`${type}${name}(${type}n                  ){return ${define(type,  unaryDef)};}`);
			if ( binaryDef) header = enumerate(type=>`${type}${name}(${type}a,${type}b         ){return ${define(type, binaryDef)};}`);
			if (ternaryDef) header = enumerate(type=>`${type}${name}(${type}a,${type}b,${type}c){return ${define(type,ternaryDef)};}`);

			if (header) math += header+"\n";
		}

		let GLSLHeader = [`#version 300 es`,`precision mediump float;`,math,sampling,misc].join("\n");

/*+==  SHADERS  =====================================================================================================+*/

 "+--  Templates + Fragment Passthru  -------------------------------------------------------------------------------+"

		Texture.prototype.import({

			run (definition,args) {
				if (!definition.isFunction) definition = Frag(definition);
				definition({image:this,outColor:this,...args});
				return this;
			},

			main (main) { return this.run({main}) },

			io (str) { return this.run({main:`
				vec4    i = thisUV(image);
				#define o outColor
				${str}
			`}) }
		});

		context.Prog = definition => args => Program({
			res      : uniform |  vec2,
			iRes     : uniform | ivec2,
			tick     : uniform | float,
			time     : uniform | float,
			frame    : uniform | float,
			image    : sampler | vec4,
			outColor : fragOut | vec4,
		...definition})({tick,time,frame,...args});

		context.Frag = ({main,frag=`void main(){${main};}`,...definition}) => args => Prog({
			vertex   : vertIn  | vec2,
			vtx      : varying | vec2,
			uv       : varying | vec2,
			pixel    : varying | vec2,
			mode     : triStrip,
			frag     : fragHeader+frag,
			vert     : `void main () { gl_Position = vec4(vtx=vertex,0,1); pixel = (uv=(vtx+1.0)/2.0)*res; }`,
		...definition})({vertex:fullscreenVertexBuffer,...args});

		let fullscreenVertexBuffer = v2buf([-1,-1,1,-1,-1,1,1,1]);

		// TODO: minimal type becomes redundant once GLSLType seperates out type and element size
		let minimalType = (...args) => {
			let type = {elementSize:Infinity};
			for (let i of args) {
				if (i.isTexture) i = i.type;
				if (i.elementSize < type.elementSize) type = i;
			} return type;
		};

 "+--  Core + General Purpose  --------------------------------------------------------------------------------------+"

		Texture.prototype.import({

			sync (overrides) {
				let {pattern,swizzle} = this.type;
				return this.run({
					image    : sampler | pattern,
					outColor : fragOut | pattern,
					main : `outColor = thisUV(image)${swizzle}`,
				},overrides);
			},

			blit (filter=nxLinear) { return this.sync({
				fbo      : null,
				outColor : undefined,
				image    : filter(this),
			}) },

			flip (x=false,y=false,override={}) {
				x = x?1:-1; y = y?1:-1;
				return this.sync({vtx:[-x,-y,x,-y,-x,y,x,y],...override})
			},

			pixelShift (shift,override={}) { return this.run({
				shift : uniform | vec2,
				main : `outColor = pixelOffset(image,shift.x,shift.y);`,
			},{shift,...override}) },

			setTo (image,override={}) { return this.sync({image,...override}) },

			...blendModes.map(blend => function (image,override={}) { return this.sync({blend,image,...override}) }),
		});

 "+--  Math  --------------------------------------------------------------------------------------------------------+"

		// TODO: CORRECT TYPES DEPENDING ON INPUT/OUTPUT TYPES
		// TODO: CHANNEL-OPTIMIZE THESE
		// TODO: GENERALIZE MEDIAN PASSES

		for (let {name,unaryPass,binaryPass,ternaryPass} of Math.raw) {

			if (unaryPass) Texture.prototype[name] = function (override={}) { return this.run({
				main : `outColor = vec4(${name}(thisUV(image)))`,
			},override) };

			if (binaryPass) Texture.prototype[name] = function (b,override={}) { return this.run({
				b : sampler | vec4,
				main : `outColor = vec4(${name}(thisUV(image),thisUV(b)))`,
			},{b,...override}) };

			if (ternaryPass) Texture.prototype[name] = function (b,c,override={}) { return this.run({
				b : sampler | vec4,
				c : sampler | vec4,
				main : `outColor = vec4(${name}(thisUV(image),thisUV(b),thisUV(c)))`,
			},{b,c,...override}) };
		}

		Texture.prototype.import({

			length (override={}) {
				let {image=this} = override;
				let {pattern,swizzle} = image.type;
				return this.run({
					image    : sampler | pattern,
					outColor : fragOut | float,
					main : `outColor = length(thisUV(image)${swizzle})`,
				});
			},

			median3 (override={}) { return this.run({main:`

				vec4 l,r,n[9];
				#define s(a,b) {l=n[a];r=n[b];n[a]=min(l,r);n[b]=max(l,r);}

				int x = 0;
				forChebyshev(i,j,1) n[x++] = pixelOffset(image,i,j);
				// use http://pages.ripco.net/~jgamble/nw.html to generate sorting network
				s(0,1)s(3,4)s(6,7)s(1,2)s(4,5)
				s(7,8)s(0,1)s(3,4)s(6,7)s(2,5)
				s(0,3)s(1,4)s(5,8)s(3,6)s(4,7)
				s(2,5)s(0,3)s(1,4)s(5,7)s(2,6)
				s(1,3)s(4,6)s(2,4)s(5,6)s(2,3)

				outColor = n[4];
			`},override) },

			median5 (override={}) { return this.run({main:`

				vec4 l,r,n[25];
				#define s(a,b) {l=n[a];r=n[b];n[a]=min(l,r);n[b]=max(l,r);}

				int x = 0;
				forChebyshev(i,j,2) n[x++] = pixelOffset(image,i,j);
				// use http://pages.ripco.net/~jgamble/nw.html to generate sorting network
				s( 1, 2)s( 4, 5)s( 7, 8)s(10,11)s(13,14)s(16,17)s(19,20)s(21,22)s(23,24)s( 0, 2)s( 3, 5)s( 6, 8)s( 9,11)s(12,14)
				s(15,17)s(18,20)s(21,23)s(22,24)s( 0, 1)s( 3, 4)s( 2, 5)s( 6, 7)s( 9,10)s( 8,11)s(12,13)s(15,16)s(14,17)s(18,19)
				s(22,23)s(20,24)s( 0, 3)s( 1, 4)s( 6, 9)s( 7,10)s( 5,11)s(12,15)s(13,16)s(18,22)s(19,23)s(17,24)s( 2, 4)s( 1, 3)
				s( 8,10)s( 7, 9)s( 0, 6)s(14,16)s(13,15)s(18,21)s(20,23)s(11,24)s( 2, 3)s( 8, 9)s( 1, 7)s( 4,10)s(14,15)s(19,21)
				s(20,22)s(16,23)s( 2, 8)s( 1, 6)s( 3, 9)s( 5,10)s(20,21)s(12,19)s(15,22)s(17,23)s( 2, 7)s( 4, 9)s(12,18)s(13,20)
				s(14,21)s(16,22)s(10,23)s( 2, 6)s( 5, 9)s( 4, 7)s(14,20)s(13,18)s(17,22)s(11,23)s( 3, 6)s( 5, 8)s(14,19)s(16,20)
				s(17,21)s( 0,13)s( 9,22)s( 5, 7)s( 4, 6)s(14,18)s(15,19)s(17,20)s( 0,12)s( 8,21)s(10,22)s( 5, 6)s(15,18)s(17,19)
				s( 1,14)s( 7,20)s(11,22)s(16,18)s( 2,15)s( 1,12)s( 6,19)s( 8,20)s(11,21)s(17,18)s( 2,14)s( 3,16)s( 7,19)s(10,20)
				s( 2,13)s( 4,17)s( 5,18)s( 8,19)s(11,20)s( 2,12)s( 5,17)s( 4,16)s( 3,13)s( 9,19)s( 5,16)s( 3,12)s( 4,14)s(10,19)
				s( 5,15)s( 4,12)s(11,19)s( 9,16)s(10,17)s( 5,14)s( 8,15)s(11,18)s(10,16)s( 5,13)s( 7,14)s(11,17)s( 5,12)s( 6,13)
				s( 8,14)s(11,16)s( 6,12)s( 8,13)s(10,14)s(11,15)s( 7,12)s( 9,13)s(11,14)s( 8,12)s(11,13)s( 9,12)s(10,12)s(11,12)

				outColor = n[12];
			`},override) },

			edt (threshold=0,override={}) { // TODO: remove threshold
				v2tex.temp(this.size,offset=>{
					let {image=this,outColor=this} = override;
					offset.srcOnly(image).io(`o=vec4(i.x<=0.0?0.0:maxFloat)`);
					for (let i=this.size.max().log2().ceil();i>=0;--i) for (let j of range(2)) offset.run({

					dist     : uniform | int,
					outColor : fragOut | vec2,

					frag : `

						void check (inout float minLength,int x,int y) {
							ivec2 coord  = texel+ivec2(x,y);
							if (coord.x<0 || coord.y<0 || coord.x>=iRes.x || coord.y>=iRes.y) return;
							vec2  offset = getTexel(image,coord).xy+vec2(x,y);
							float len    = length(offset);
							if (len >= minLength) return;
							minLength = len;
							outColor  = offset;
						}

						void main () {
							outColor = thisTexel(image).xy;
							if (length(outColor) == 0.0) return;
							float minLength = maxFloat;
							check(minLength,-dist,-dist);
							check(minLength, dist,-dist);
							check(minLength,-dist, dist);
							check(minLength, dist, dist);
							check(minLength,-dist,    0);
							check(minLength, dist,    0);
							check(minLength,    0,-dist);
							check(minLength,    0, dist);
						}
					`,
					},{dist:2**i});
					outColor.srcOnly(offset);
				}); return this;
			},
		});

 "+--  Color  -------------------------------------------------------------------------------------------------------+"

		Texture.prototype.import({

			swizzle (swizzle=0,override={}) {

				if (swizzle.isNumber) swizzle = Array(4).fill(swizzle);
				return this.run({
					swizzle : uniform | ivec4, // TODO: change ivec4 to int | vec4
					main : `
						vec4 c = thisUV(image);
						outColor = vec4(c[swizzle.x],c[swizzle.y],c[swizzle.z],c[swizzle.w]);
					`,
				},{swizzle,...override});
			},

			hueShift (shift,override={}) { return this.run({
				shift : uniform | float,
				main : `
					vec4 rgb = thisUV(image);
					vec3 hsv = rgb2hsv(rgb.rgb);
					     hsv.r += shift;
					outColor = vec4(hsv2rgb(hsv),rgb.a);
				`,
			},{shift,...override}) },

			channel2hue (channel=0,multiplier=1,offset=0,override={}) { return this.run({
				channel    : uniform | int,
				multiplier : uniform | float,
				offset     : uniform | float,
				main : `outColor = hue(thisUV(image)[channel]*multiplier+offset);`,
			},{channel,multiplier,offset,...override}) },

			xy2hue (multiplier=1,override={}) { return this.run({
				multiplier : uniform | float,
				main : `
					vec2 angle = thisUV(image).xy;
					outColor = hsv(atan2(angle.y,angle.x)/tau,1.0,length(angle)*multiplier,1.0);
				`,
			},{multiplier,...override}) },
		});

 "+--  Convolution  -------------------------------------------------------------------------------------------------+"

		Texture.prototype.import({

			convolve (kernel,override={}) {
				let {image=this,outColor=this} = override;
				let {pattern,glslType,swizzle} = minimalType(image,outColor);
				return this.run({
					kernel   : sampler | float,
					offset   : uniform | ivec2,
					image    : sampler | pattern,
					outColor : fragOut | pattern,
					main : `
						ivec2 kernelSize = textureSize(kernel,0);
						outColor = ${glslType}(0);
						for (int i=0;i<kernelSize.x;++i)
						for (int j=0;j<kernelSize.y;++j) {
							outColor += ${glslType}(getTexel(kernel,ivec2(i,j)).r)*
							            getTexel(image,texel+offset+ivec2(i,j))${swizzle};
						}
					`,
				},{kernel,offset:kernel.size.div(-2).floor().sPlus(1),...override}); // TODO: rethink offset
			},

			...({

				 sobelX : f1tex([3,3],[1,0,-1,2,0,-2,1,0,-1]),
				 sobelY : f1tex([3,3],[1,2,1,0,0,0,-1,-2,-1]),
				     dX : f1tex([2,1],[-1,1]),
				     dY : f1tex([1,2],[-1,1]),
				// laplace : f1tex([3,3],[-1,-1,-1,-1,8,-1,-1,-1,-1]),
				laplace : f1tex([3,3],[0,-1,0,-1,4,-1,0,-1,0]),
				// laplace : f1tex([5,5],[0,0,1,0,0,0,1,2,1,0,1,2,-16,2,1,0,1,2,1,0,0,0,1,0,0]),

			}).map(kernel=>function(override){return this.convolve(kernel,override)}),

			sobel (override={}) {
				let {image=this,outColor=this} = override;
				if (outColor !== image) outColor.setTo(image);
				f1tex.temp(outColor.size,y=>{
					y.setTo(outColor).sobelY();
					outColor.sobelX().run({
						y : sampler | float,
						main : `outColor = vec4(thisUV(image).r,thisUV(y).r,0,0);`
					},{y,...override});
				});
				return this;
			},
		});

		let boxKernel = {};
		Texture.prototype.box = function (radius) {
			let kernels = boxKernel[radius];
			if (!kernels) {
				let size = radius*2+1;
				let kernel = new Array(size**2).fill(1/(size**2));
				kernels = boxKernel[radius] = [
					f1tex([size,1],kernel),
					f1tex([1,size],kernel),
				];
			} return this.convolve(kernels.x).convolve(kernels.y);
		};

		let gaussianKernel = {};
		Texture.prototype.gaussian = function (radius,sigma=radius*2+1) { // TODO: SIGMA
			let hash    = size+","+sigma;
			let kernels = gaussianKernel[hash];
			if (!kernels) {
				let size   = radius*2+1;
				let mid    = (size-1)/2;
				let spread = 1/(sigma*sigma*2);
				let kernel = [];
				for (let i of range(size)) {
					let x = i-mid;
					kernel.push(exp(-x*x*spread));
				} kernel = kernel.div(kernel.sum());
				kernels = gaussianKernel[hash] = [
					f1tex([size,1],kernel),
					f1tex([1,size],kernel),
				];
			} return this.convolve(kernels.x).convolve(kernels.y);
		};

/*+==  CANVAS 3D  ===================================================================================================+*/

 "+--  Context  -----------------------------------------------------------------------------------------------------+"

		Texture.prototype.draw = function (f) {

			let context = this.c3d;
			if (!context) context = this.c3d = new Canvas3D(this);
			f(context,this);
			return this;
		};

		let Canvas3D = class {

			constructor (texture) {
				this.texture    = texture;
				this.stateStack = [{...defaultState,outColor:texture}];
			};

			get state () { return this.stateStack.last };
			get size  () { return this.texture.size };
		};

 "+--  State  -------------------------------------------------------------------------------------------------------+"

		let defaultState = {};

		Canvas3D.prototype.import({

			push () { this.stateStack.push({...this.state}); return this },
			pop  () { this.stateStack.pop(); return this },

			pushPop (f) {
				this.push();
				f();
				return this.pop();
			},
		});

 "+--  Transforms  --------------------------------------------------------------------------------------------------+"

		defaultState.projection = Matrix4.orthographic(0,1,0,1,0,1);
		defaultState.modelView  = Matrix4.identity;

		Canvas3D.prototype.import({

			ortho       (left,right,bottom,top,near,far                    ) { this.state.projection = Matrix4.orthographic(left,right,bottom,top,near,far); return this },
			perspective (fovy,near,far,aspect=this.texture.size.aspectRatio) { this.state.projection = Matrix4.perspective(fovy,near,far,aspect);            return this },

			identity  (             ) { this.state.modelView = Matrix4.identity;                          return this },
			lookAt    (eye,center,up) { this.state.modelView = Matrix4.lookAt(eye,center,up);             return this },
			transform (m            ) { this.state.modelView = this.state.modelView.times(m);             return this },
			translate (x,y=x,z=0    ) { this.state.modelView = this.state.modelView.translate    (x,y,z); return this },
			scale     (x,y=x,z=1    ) { this.state.modelView = this.state.modelView.scale        (x,y,z); return this },
			rotate    (angle,x,y,z  ) { this.state.modelView = this.state.modelView.rotate (angle,x,y,z); return this },
			rotateX   (angle        ) { this.state.modelView = this.state.modelView.rotateX(angle      ); return this },
			rotateY   (angle        ) { this.state.modelView = this.state.modelView.rotateY(angle      ); return this },
			rotateZ   (angle        ) { this.state.modelView = this.state.modelView.rotateZ(angle      ); return this },
		});

 "+--  Color  -------------------------------------------------------------------------------------------------------+"

		defaultState.currentColor = Math.rgb(1);

		Canvas3D.prototype.import({

			rgb (...args) { this.state.currentColor = rgb(...args); return this },
			hsv (...args) { this.state.currentColor = hsv(...args); return this },
			hsl (...args) { this.state.currentColor = hsl(...args); return this },
		});

 "+--  Masking + Blending  ------------------------------------------------------------------------------------------+"

		defaultState.blend = undefined;

		Canvas3D.prototype.import({

			noBlend () { this.state.blend = undefined; return this },

			...blendModes.map(blend => function () { this.state.blend = blend; return this }),
		});

 "+--  Path  --------------------------------------------------------------------------------------------------------+"

		defaultState.vertex = [];
		defaultState.color  = [];

		Canvas3D.prototype.import({

			beginPath () {
				this.state.vertex = [];
				this.state.color  = [];
				return this;
			},

			vertex (x,y,z=0) {
				this.state.vertex.push(x,y,z);
				this.state.color .push(...this.state.currentColor);
				return this;
			},

			closePath () {
				this.state.vertex.push(...this.state.vertex.slice(0,3));
				this.state.color .push(...this.state.color .slice(0,4));
				return this;
			},

			tris      () { return this.render(tris     ) },
			triFan    () { return this.render(triFan   ) },
			triStrip  () { return this.render(triStrip ) },
			lines     () { return this.render(lines    ) },
			lineLoop  () { return this.render(lineLoop ) },
			lineStrip () { return this.render(lineStrip) },
			points    () { return this.render(points   ) },
		});

 "+--  Drawing  -----------------------------------------------------------------------------------------------------+"

		Canvas3D.prototype.import({

			clear () { this.texture.clear(); return this },
		});

 "+--  Renderer  ----------------------------------------------------------------------------------------------------+"

		defaultState.pointSize = 1;

		Canvas3D.prototype.import({

			pointSize (s) { this.state.pointSize = s; return this }, // per-vertex pointSize?

			render (mode) {

				if (this.state.vertex.length) Prog({

					projection : uniform | mat4,
					modelView  : uniform | mat4,
					vertex     : vertIn  | vec3,
					color      : vertIn  | vec4,
					pointSize  : uniform | float,
					vColor     : varying | vec4,
					outColor   : fragOut | vec4,
					mode,

					vert : `void main () {
						gl_Position  = projection*modelView*vec4(vertex,1);
						gl_PointSize = pointSize;
						vColor       = color;
					}`,

					frag : `void main () {
						outColor = vColor;
					}`,
				})(this.state);

				return this;
			},
		});

		window.import(Math,context) } return wrapper };

/*+==================================================================================================================+*/
