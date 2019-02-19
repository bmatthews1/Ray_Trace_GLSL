let Ben = (wrapper) => {

  let context = {};

  with (context){
  //-- Console ---------------------------------------------
    context.print = function(text, color){
      if (!color){console.log(text); return;}
      let f = (n) => {return floor(n*255).base(16).zeroPad(2)}
      let hex = "#" + f(color.r) + f(color.g) + f(color.b);
      console.log("%c " + text, "color: " + hex);
    }

  //-- Extensions ------------------------------------------
    String.prototype.removeWhitespace = function(){return this.replace(/\s/g, "")}

  //-- Audio (howler) --------------------------------------
    let howler            = document.createElement(`script`);
    let howlerInitialized = false;
    let preloads          = [];

    context.sounds = [];

    howler.onload = function(){
      print("howler loaded");
      howlerInitialized = true;
      preloads.for(i => loadSound(i));
    }
    howler.src = "ben.js/howler.min.js";
    document.head.appendChild(howler);

    context.loadSound = function(options){
      if (options.isString) options = {src:options};
      if (!howlerInitialized) preloads.push(options);
      else {
        let h = new Howl(options);
        context.sounds.push(h);
        return h;
      }
    }

    let volumeMap;
    context.setVolume = function(volume){
      return document.querySelectorAll('video, audio, embed, object');
    }

  //-- Stats -----------------------------------------------
    let script = document.createElement(`script`);
    let statsLoaded = false;
    script.onload = function(){
      print("stats loaded");
      let stats = new Stats();
      window.stats = stats;
      stats.showPanel(0);
      stats.dom.style.left = null;
      stats.dom.style.right = "0px";
      document.body.appendChild(stats.dom);
      autoLoop(() => {
        stats.begin();
        stats.end();
      })
      statsLoaded = true;
    }
    script.src = "ben.js/stats.min.js";
    document.head.appendChild(script);

  //-- Unity Loader-----------------------------------------
    context.loadUnityApp = ({path="", onload}) => {
      print("loading unity")
      let unityLoader = document.createElement(`script`);
      let unityInitialized = false;

      unityLoader.onload = function(){
        print("untiy loaded");
        unityInitialized = true;
        document.body.innerHTML += `
          <div class="webgl-content"><div id="gameContainer" style="width: 100%; height: 100%; z-index: -100;"></div></div>
        `
        context.gameInstance = UnityLoader.instantiate("gameContainer", path+"Build/WebGL.json");
        onload(document.getElementById("#canvas").getContext("webgl2").canvas);
      }

      unityLoader.src = path + "Build/UnityLoader.js";
      document.head.appendChild(unityLoader);
    }

  //-- Blur ------------------------------------------------
    let blurQuality = undefined;
    context.setBlurQuality = function(quality){
      blurQuality = quality;
    }

    context.defaultBlurQuality = function(){setBlurQuality()}

    Texture.prototype.dirBlur = function(radius, dir){
      return this.run({
        radius : uniform | float,
        dir    : uniform | int,
        main : `
          vec4 img = thisTexel(image);
          float total = 1.;
          int r = int(radius);
          for (int i = 1; i <= r; i++){
            float a = cos(float(i)*tau/radius/2.) + 1.;
            a /= 2.;
            if (dir == 0){
              img += pixelOffset(image,  i, 0)*a;
              img += pixelOffset(image, -i, 0)*a;
            }
            else {
              img += pixelOffset(image, 0,  i)*a;
              img += pixelOffset(image, 0, -i)*a;
            }
            total += a*2.;
          }
          outColor = img/total;
        `
      },{radius, dir});
    }

    Texture.prototype.blur = function(radius, quality=1/log2(pow(radius, .5)).floor().pow(2)){
      if (quality <= 0) return this;
      if (blurQuality !== undefined) quality = blurQuality;
      let q        = clamp01(quality);
      let r        = floor(radius*q);
      let outColor = this;
      v4tex.temp(this.size.times(q).floor(), y=>{
        y.setTo(outColor).dirBlur(r, 0).dirBlur(r, 1);
        outColor.setTo(y);
      });
      return this;
    }

  //-- Colormap --------------------------------------------
    let colormap = "greys";
    context.setColormap = function(s){colormap = s}

    context.colormapNames = [
      "LEVEL_16","Accent","BW LINEAR","BLUE","BLUE_RED","Beach","Blue Pastel Red","Blue Waves","Blue_Red 2","Blues","BrBG","BuGn","BuPu",
      "CMRmap","Dark_2","Eos A","Eos B","GREEN","GREEN_PINK","GRN","GRN_RED_BLU_WHT","GnBu","Greens","Greys","Hardcandy","Haze",
      "Hue Sat Lightness 1","Hue Sat Lightness 2","Hue Sat Value 1","Hue Sat Value 2","Mac Style","Nature","Ocean","OrRd","Oranges","PRGn",
      "PRISM","Paired","Pastel_l","Pastel_2","Pastel_3","Peppermint","PiYG_1","Plasma","PuBu","PuBuGn","PuOr","PuRd","Purple_Red Stripes",
      "Purples","RAINBOW","RED TEMPERATURE","RED_PURPLE","Rainbow","Rainbow black","Rainbow white","Rainbow 18","RdBu","RdGy","RdPu","RdYIBu",
      "RdYIGn","Reds","STD GAMMA_II","STEPS","STERN SPECIAL","Set 1","Set 2","Set 3","Spectral","Volcano","Waves","Wistia","YIGn","YIGnBu",
      "YlOrBr","YlOrRd","afmhot","algae","arbre","autumn","bds_highcontrast","binary","black_blueish","black_green","bone","brg","bwr",
      "cool","coolwarm","copper","cubehelix","doom","dusk","flag","gist_earth","gist_gray","gist_heat","gist_ncar","gist_rainbow","gist_stern",
      "gist_yarg","gnuplot","gnuplot2","gray","hot","hsv","inferno","jet","kamae","kelp","magma","nipy_spectral","ocean","octarine","pink",
      "plasma","prism","purple_mm","rainbow","seismic","spectral","spring","summer","terrain","viridis","winter",
    ].map(i => i.toLowerCase().replace(/ /g,"_").replace("-", "_"));

    context.colormaps = new ImageTexture("./ben.js/colormaps.png");

    Texture.prototype.colormap = function(index = colormap||0){
      if (typeof index === `string` || index instanceof String){
        index = colormapNames.indexOf(index);
      }
      if (index != -1){
        dim = colormaps.size.x;
        this.run({
          index     : uniform | float,
          dim       : uniform | float,
          colormaps : sampler | vec4,
          main : `
            float v = thisTexel(image).x;
            float x = v*dim;
            float y = dim - index - .5;
            outColor = texture(colormaps, vec2(x, y)/dim)
          `
        },{index, colormaps, dim});
      }
      return this;
    }

  //-- Noise -----------------------------------------------
    let t = 1000;
    Texture.prototype.noise = function(args){ //see https://www.shadertoy.com/view/4t3yDn
      let {scale = 20, speed = .01, quality=.5, time} = args && args.isObject ? args : {}; 
      t += speed;
      if (time !== undefined) t = time;
      this.run({
        t     : uniform | float,
        main : `
          // float c = hash(hash3(hash2(pixel)));
          float c = hash(pixel);
          c = abs(mod(c*t, 2.)-1.);
          outColor = vec4(c);
        `
      },{t});

      this.blur(scale, quality);
      this.run({
        radius : uniform | float,
        main : `
          float off = .5 - 1./radius;
          outColor = (thisTexel(image)-off)*radius/2.;
        `
      },{radius:scale});
      return this;
    }

  //-- XBR4x -----------------------------------------------
    // Texture.prototype.xbr4 = function(tex){
    //   this.run({
    //     tex : sampler | vec4,

    //     frag : `
    //       const float coef = 2.0;
    //       const vec4  eq_threshold = vec4(10.0, 10.0, 10.0, 10.0);
    //       const float y_weight = 48.0;
    //       const float u_weight = 7.0;
    //       const float v_weight = 6.0;
    //       const mat3x3 yuv          = mat3x3(0.299, 0.587, 0.114, -0.169, -0.331, 0.499, 0.499, -0.418, -0.0813);
    //       const mat3x3 yuv_weighted = mat3x3(y_weight*yuv[0], u_weight*yuv[1], v_weight*yuv[2]);
    //       const vec4 delta = vec4(0.4, 0.4, 0.4, 0.4);

    //       vec4 df(vec4 A, vec4 B)
    //       {
    //         return abs(A - B);
    //       }

    //       float c_df(vec3 c1, vec3 c2) {
    //         vec3 df = abs(c1 - c2);
    //         return df.r + df.g + df.b;
    //       }

    //       bvec4 less(vec4 a, float b){
    //         return bvec4(a.x < b, a.y < b, a.z < b, a.a < b);
    //       }

    //       bvec4 eq(vec4 A, vec4 B)
    //       {
    //         return less(df(A, B), 10.);
    //       }

    //       bvec4 eq2(vec4 A, vec4 B)
    //       {
    //         return less(df(A, B), 2.);
    //       }


    //       vec4 weighted_distance(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e, vec4 f, vec4 g, vec4 h)
    //       {
    //         return (df(a, b) + df(a, c) + df(d, e) + df(d, f) + 4.0*df(g, h));
    //       }


    //       /*    FRAGMENT SHADER    */
    //       void main()
    //       {
    //         //<------ move from vertex shader in original code

    //         vec2 ps = vec2(1.0 / res.x, 1.0 / res.y);
    //         float dx = ps.x;
    //         float dy = ps.y;


    //         // A1 B1 C1
    //         // A0 A B C C4
    //         // D0 D E F F4
    //         // G0 G H I I4
    //         // G5 H5 I5

    //         // This line fix a bug in ATI cards.
    //         // vec2 texCoord = VAR.texcoord + vec2(0.0000001, 0.0000001);

    //         vec4 t1 = pixel.xxxy + vec4(-dx, 0, dx, -2.0*dy); // A1 B1 C1
    //         vec4 t2 = pixel.xxxy + vec4(-dx, 0, dx, -dy); // A B C
    //         vec4 t3 = pixel.xxxy + vec4(-dx, 0, dx, 0); // D E F
    //         vec4 t4 = pixel.xxxy + vec4(-dx, 0, dx, dy); // G H I
    //         vec4 t5 = pixel.xxxy + vec4(-dx, 0, dx, 2.0*dy); // G5 H5 I5
    //         vec4 t6 = pixel.xyyy + vec4(-2.0*dx, -dy, 0, dy); // A0 D0 G0
    //         vec4 t7 = pixel.xyyy + vec4(2.0*dx, -dy, 0, dy); // C4 F4 I4

    //         //------------->


    //         bvec4 edr, edr_left, edr_up, edr3_left, edr3_up, px; // px = pixel, edr = edge detection rule
    //         bvec4 interp_restriction_lv1, interp_restriction_lv2_left, interp_restriction_lv2_up;
    //         bvec4 interp_restriction_lv3_left, interp_restriction_lv3_up;
    //         bvec4 nc, nc30, nc60, nc45, nc15, nc75; // new_color
    //         vec4 fx, fx_left, fx_up, final_fx, fx3_left, fx3_up; // inequations of straight lines.
    //         vec3 res1, res2, pix1, pix2;
    //         float blend1, blend2;

    //         vec2 fp = fract(pixel*res);

    //         vec3 A1 = texture(tex, t1.xw).rgb;
    //         vec3 B1 = texture(tex, t1.yw).rgb;
    //         vec3 C1 = texture(tex, t1.zw).rgb;
    //         vec3 A  = texture(tex, t2.xw).rgb;
    //         vec3 B  = texture(tex, t2.yw).rgb;
    //         vec3 C  = texture(tex, t2.zw).rgb;
    //         vec3 D  = texture(tex, t3.xw).rgb;
    //         vec3 E  = texture(tex, t3.yw).rgb;
    //         vec3 F  = texture(tex, t3.zw).rgb;
    //         vec3 G  = texture(tex, t4.xw).rgb;
    //         vec3 H  = texture(tex, t4.yw).rgb;
    //         vec3 I  = texture(tex, t4.zw).rgb;
    //         vec3 G5 = texture(tex, t5.xw).rgb;
    //         vec3 H5 = texture(tex, t5.yw).rgb;
    //         vec3 I5 = texture(tex, t5.zw).rgb;
    //         vec3 A0 = texture(tex, t6.xy).rgb;
    //         vec3 D0 = texture(tex, t6.xz).rgb;
    //         vec3 G0 = texture(tex, t6.xw).rgb;
    //         vec3 C4 = texture(tex, t7.xy).rgb;
    //         vec3 F4 = texture(tex, t7.xz).rgb;
    //         vec3 I4 = texture(tex, t7.xw).rgb;


    //         vec4 b = mat3x4(B, D, H, F)*yuv_weighted[0];
    //         vec4 c = mat3x4(C, A, G, I)*yuv_weighted[0];
    //         vec4 e = mat3x4(E, E, E, E)*yuv_weighted[0];
    //         vec4 d = b.yzwx;
    //         vec4 f = b.wxyz;
    //         vec4 g = c.zwxy;
    //         vec4 h = b.zwxy;
    //         vec4 i = c.wxyz;

    //         vec4 i4 = mat3x4(I4, C1, A0, G5)*yuv_weighted[0];
    //         vec4 i5 = mat3x4(I5, C4, A1, G0)*yuv_weighted[0];
    //         vec4 h5 = mat3x4(H5, F4, B1, D0)*yuv_weighted[0];
    //         vec4 f4 = h5.yzwx;

    //         vec4 c1 = i4.yzwx;
    //         vec4 g0 = i5.wxyz;
    //         vec4 b1 = h5.zwxy;
    //         vec4 d0 = h5.wxyz;

    //         vec4 Ao = vec4(1.0, -1.0, -1.0, 1.0);
    //         vec4 Bo = vec4(1.0, 1.0, -1.0, -1.0);
    //         vec4 Co = vec4(1.5, 0.5, -0.5, 0.5);
    //         vec4 Ax = vec4(1.0, -1.0, -1.0, 1.0);
    //         vec4 Bx = vec4(0.5, 2.0, -0.5, -2.0);
    //         vec4 Cx = vec4(1.0, 1.0, -0.5, 0.0);
    //         vec4 Ay = vec4(1.0, -1.0, -1.0, 1.0);
    //         vec4 By = vec4(2.0, 0.5, -2.0, -0.5);
    //         vec4 Cy = vec4(2.0, 0.0, -1.0, 0.5);

    //         vec4 Az = vec4(6.0, -2.0, -6.0, 2.0);
    //         vec4 Bz = vec4(2.0, 6.0, -2.0, -6.0);
    //         vec4 Cz = vec4(5.0, 3.0, -3.0, -1.0);
    //         vec4 Aw = vec4(2.0, -6.0, -2.0, 6.0);
    //         vec4 Bw = vec4(6.0, 2.0, -6.0, -2.0);
    //         vec4 Cw = vec4(5.0, -1.0, -3.0, 3.0);

    //         // These inequations define the line below which interpolation occurs.
    //         fx = (Ao*fp.y + Bo*fp.x);
    //         fx_left = (Ax*fp.y + Bx*fp.x);
    //         fx_up = (Ay*fp.y + By*fp.x);
    //         fx3_left = (Az*fp.y + Bz*fp.x);
    //         fx3_up = (Aw*fp.y + Bw*fp.x);

    //         interp_restriction_lv1 = ((e != f) && (e != h) && (not(eq(f, b)) && not(eq(h, d)) || eq(e, i) && not(eq(f, i4)) && not(eq(h, i5)) || eq(e, g) || eq(e, c)) && (f != f4 && f != i || h != h5 && h != i || h != g || f != c || eq(b, c1) && eq(d, g0)));
    //         interp_restriction_lv2_left = ((e != g) && (d != g));
    //         interp_restriction_lv2_up = ((e != c) && (b != c));
    //         interp_restriction_lv3_left = (eq2(g, g0) && not(eq2(d0, g0)));
    //         interp_restriction_lv3_up = (eq2(c, c1) && not(eq2(b1, c1)));

    //         vec4 fx45 = smoothstep(Co - delta, Co + delta, fx);
    //         vec4 fx30 = smoothstep(Cx - delta, Cx + delta, fx_left);
    //         vec4 fx60 = smoothstep(Cy - delta, Cy + delta, fx_up);
    //         vec4 fx15 = smoothstep(Cz - delta, Cz + delta, fx3_left);
    //         vec4 fx75 = smoothstep(Cw - delta, Cw + delta, fx3_up);


    //         edr = (weighted_distance(e, c, g, i, h5, f4, h, f) < weighted_distance(h, d, i5, f, i4, b, e, i)) && interp_restriction_lv1;
    //         edr_left = ((coef*df(f, g)) <= df(h, c)) && interp_restriction_lv2_left;
    //         edr_up = (df(f, g) >= (coef*df(h, c))) && interp_restriction_lv2_up;
    //         edr3_left = interp_restriction_lv3_left;
    //         edr3_up = interp_restriction_lv3_up;


    //         nc45 = (edr &&             bvec4(fx45));
    //         nc30 = (edr && edr_left && bvec4(fx30));
    //         nc60 = (edr && edr_up   && bvec4(fx60));
    //         nc15 = (edr && edr_left && edr3_left && bvec4(fx15));
    //         nc75 = (edr && edr_up   && edr3_up   && bvec4(fx75));

    //         px = (df(e, f) <= df(e, h));

    //         nc = (nc75 || nc15 || nc30 || nc60 || nc45);

    //         vec4 final45 = nc45*fx45;
    //         vec4 final30 = nc30*fx30;
    //         vec4 final60 = nc60*fx60;
    //         vec4 final15 = nc15*fx15;
    //         vec4 final75 = nc75*fx75;

    //         vec4 maximo = max(max(max(final15, final75), max(final30, final60)), final45);

    //         if (nc.x) { pix1 = px.x ? F : H; blend1 = maximo.x; }
    //         else if (nc.y) { pix1 = px.y ? B : F; blend1 = maximo.y; }
    //         else if (nc.z) { pix1 = px.z ? D : B; blend1 = maximo.z; }
    //         else if (nc.w) { pix1 = px.w ? H : D; blend1 = maximo.w; }

    //         if (nc.w) { pix2 = px.w ? H : D; blend2 = maximo.w; }
    //         else if (nc.z) { pix2 = px.z ? D : B; blend2 = maximo.z; }
    //         else if (nc.y) { pix2 = px.y ? B : F; blend2 = maximo.y; }
    //         else if (nc.x) { pix2 = px.x ? F : H; blend2 = maximo.x; }

    //         res1 = mix(E, pix1, blend1);
    //         res2 = mix(E, pix2, blend2);

    //         vec3 res = mix(res1, res2, step(c_df(E, res1), c_df(E, res2)));

    //         outColor = vec4(res, 1.0);
    //       }
    //     `
    //   },{tex});
    // }

  //-- QuadMap----------------------------------------------
    Texture.prototype.quadMap = function(pointLs, sample, size=sample.size){
      let ps  = pointLs.slice(0, 4);
      let ps2 = pointLs.slice(4, 8);
      return this.run({
        p0 : uniform | vec2,
        p1 : uniform | vec2,
        p2 : uniform | vec2,
        p3 : uniform | vec2,

        p4 : uniform | vec2,
        p5 : uniform | vec2,
        p6 : uniform | vec2,
        p7 : uniform | vec2,

        camera : sampler | vec2,
        size   : uniform | vec2,

        frag : 
        `
        float DistToLine(vec2 pt1, vec2 pt2, vec2 testPt)
        {
          vec2 lineDir = pt2 - pt1;
          vec2 perpDir = vec2(lineDir.y, -lineDir.x);
          vec2 dirToPt1 = pt1 - testPt;
          return abs(dot(normalize(perpDir), dirToPt1));
        }

        float signt (vec2 p1, vec2 p2, vec2 p3){return (p1.x-p3.x)*(p2.y-p3.y)-(p2.x-p3.x)*(p1.y-p3.y);}

        bool PointInTriangle (vec2 pt, vec2 v1, vec2 v2, vec2 v3){
          float d1, d2, d3;
          bool has_neg, has_pos;

          d1 = signt(pt, v1, v2);
          d2 = signt(pt, v2, v3);
          d3 = signt(pt, v3, v1);

          has_neg = (d1 < 0.) || (d2 < 0.) || (d3 < 0.);
          has_pos = (d1 > 0.) || (d2 > 0.) || (d3 > 0.);

          return !(has_neg && has_pos);
        }

        void main(){
          vec2 p  = pixel;

          float du0 = DistToLine(p0, p3, p);
          float du1 = DistToLine(p1, p2, p);
          float dv0 = DistToLine(p0, p1, p);
          float dv1 = DistToLine(p3, p2, p);

          float u = du0/(du0 + du1);
          float v = dv0/(dv0 + dv1);

          outColor = vec4(u, v, 0, 1);
          if (!PointInTriangle(p, p0, p1, p3) && !PointInTriangle(p, p3, p1, p2)) outColor = thisTexel(image);
          // if (!PointInTriangle(p, p0, p1, p3) && !PointInTriangle(p, p3, p1, p2)) outColor = vec4(0.);
          else {
            vec2 f0 = mix(p7, p6, u);
            vec2 f1 = mix(p4, p5, u);
            vec2 lookup = mix(f1, f0, v);
            vec2 vuv = vec2(1.) - lookup/size;
            // vec2 vuv = lookup/size;
            // outColor = texture(camera, vuv);
            vec4 col = texture(camera, vuv);
            float g = col.g > .95 ? 1. : 0.;
            g *= .9;
            outColor = vec4(g, 0, 0, 1);
          }
        }`
      },{p0:ps[1], p1:ps[2], p2:ps[3], p3:ps[0], p4:ps2[1], p5:ps2[2], p6:ps2[3], p7:ps2[0], camera:sample, size})
    }

  //-- Particles  ------------------------------------------
    context.ParticleTexture = class{
      constructor(particleCount, canvasSize){
        this.canvasSize    = canvasSize;
        this.particleCount = particleCount;
        this.billboard     = v4tex([128, 128]).io(`o = vec4(clamp01(1. - length(vtx)))`)
        this.coord         = i2buf(particleCount.flatMapRange(i => i));
        this.radius        = f1tex(particleCount, particleCount.flatMapRange(i => rand()));
        this.pos           = v2tex(particleCount, particleCount.flatMapRange(i => this.canvasSize.randomized))
        this.vel           = v2tex(particleCount, particleCount.flatMapRange(i => cosSin(rand(tau))));
        this.vtx           = v2buf([-1, -1, -1, 1, 1, -1, 1, 1])
        this.size          = [1, 1];
      }

      update(){
        this.pos.run({
          canvasSize : uniform | vec2,
          vel        : sampler | vec2,
          main : `
            outColor = vec4(mod(thisTexel(image).xy + thisTexel(vel).xy, canvasSize), 0, 0);
          ` 
        },this)
      }

      render(outColor, billboard = this.billboard){
        return outColor.run({
          coord     :  vertIn | ivec2 | instanced,
          vtx       :  vertIn | vec2,
          pos       : sampler | vec2,
          radius    : sampler | float,
          size      : uniform | vec2,
          billboard : sampler | vec4,
          v         : varying | vec2,
          blend     : srcOver,

          vert : `void main(){
            vec2  p = getTexel(pos, coord).xy;
            float r = mapBounds(getTexel(radius, coord).x,size.x, size.y);
            v = vtx;
            gl_Position = vec4((p+v*r)/res*2. - 1., 0, 1);
          }`,

          frag : `void main(){
            outColor = texture(billboard, (v+1.)/2.);
            // outColor = vec4(1. - length(v));
          }`
        },{...this,billboard})
      }
    }

  //-- Advection  ------------------------------------------
    Texture.prototype.advect = function(radius=1, intensity=1){
      return this.blur(radius).run({
        intensity : uniform | float,
        main : `
          vec4 i = thisTexel(image);
          outColor = pixelOffset(image, i.x*-intensity, i.y*-intensity);
        `
      },{intensity})
    }

    //performs advection without blur affecting original
    Texture.prototype.advect2 = function(radius=1, intensity=1, pow=1){
      let outColor = this;
      v4tex.temp(this.size, y => {
        y.setTo(outColor).blur(radius)
        outColor.run({
          intensity : uniform | float,
          p         : uniform | float,
          off       : sampler | vec4,
          main : `
            vec4 i   = thisTexel(off);
            float d = length(i.xy);
            vec2 i2 = normalize(i.xy);
            d = pow(d, p);
            outColor = pixelOffset(image, i2.x*d*-intensity, i2.y*d*-intensity);
          `
        },{intensity, off:y, p:pow})
      });
      return outColor;
    }

  //-- Dom Manipulation ------------------------------------
    context.createElement = name => document.createElement(name)

    let props = [
      "accessKey","attributes","childElementCount","children","classList","className","clientHeight",
      "clientLeft","clientTop","clientWidth","currentStyle","firstElementChild","id","innerHTML",
      "lastElementChild","localName","name","namespaceURI","nextElementSibling","onfullscreenchange",
      "onfullscreenerror","openOrClosedShadowRoot","outerHTML","prefix","previousElementSibling",
      "runtimeStyle","scrollHeight","scrollLeft","scrollLeftMax","scrollTop","scrollTopMax",
      "scrollWidth","shadowRoot","slot","tabStop","tagName", "type", "min", "max", "step", "value",
      "oninput", "checked", "onchange"
    ];

    for (let n of props){
      Element.prototype["_"+n] = function(value){
        if (value!==undefined) this[n] = value;
        return this;
      }
    }

    Element.prototype._cssText = function(value){
      if (value!==undefined) this.style.cssText = value;
      return this;
    }

    Element.prototype.appendChildren = function(){
      for (let child of arguments) this.appendChild(child)
      return this;
    }

  //-- Controls --------------------------------------------
    context.params    = {};
    context.paramVals = {}; //now just an alias for params

    context.controls = createElement("div")._className("controls")._cssText(`
      display: none;
      position: absolute;
      top: 0; left: 0;
      padding: 3px 5px;
      color:white;
      font-family: "Lucida Console";
      z-index:2;
      background: rgba(0, 0, 0, .7);
    `);

    window.addEventListener("load", () => {
      document.body.appendChild(controls);
    })

    window.addEventListener("keydown", (evt) => {
      if (!evt.repeat && evt.key == "`"){
        controls.style.display === "none" ? showControls() : hideControls();
      }
    });

    context.hideControls = function(){controls.style.display = "none" ; if(statsLoaded) stats.dom.style.display = "none" }
    context.showControls = function(){controls.style.display = "block"; if(statsLoaded) stats.dom.style.display = "block"}

    context.getCell = (name="div") => createElement(name)._cssText("display: table-cell; margin: 3px 5px; vertical-align:middle; text-align:right;")
    context.getRow = name => createElement("div")._cssText("display: table-row;")._id(name+"_row")

    context.setParams = (obj) => {
      obj.for((newVal, name) => {
        let args = controlArgs[name];
        if (!args) return;
        inputFn({newVal,...args});
      })
    }

    let inputFn = ({newVal,name,onChange,min,max,options}) => {
      let v = newVal;
      if (options){
        document.getElementById(name+ "_select").value = v;
      } else {
        v = clamp(parseFloat(newVal), min, max);
        document.getElementById(name+ "_input").value = v;
        document.getElementById(name+"_slider").value = v;
        if (onChange) onChange(v);
      }
      params   [name] = v;
      paramVals[name] = v;
    };

    let controlArgs = {};

    let addDropdown = (arg) => {
      let {name = arg, alias=name, onChange, options} = arg.isObject ? arg : {};
      let args = {name, alias, onChange, options};

      controlArgs[name] = args;
      params     [name] = options.first;
      paramVals  [name] = options.first;

      controls.appendChild(getRow(name).appendChildren(
        //label
        getCell()._innerHTML(alias),

        //options
        getCell("select")._id(name+"_select").appendChildren(...options.map(o => {
          let e = createElement("option");
          e.value = o;
          e.text  = o;
          return e;
        }))._onchange(function(){
          let v = options[this.selectedIndex];
          params   [name] = v;
          paramVals[name] = v;
          if (onChange) onChange(v);
        }),

        //empty
        getCell()
      ));
    }

    context.addControl = function(arg){
      let {name = arg, alias=name, min=0, max=1, step=.01, val, onChange, onToggle} = arg.isObject ? arg : {};
      let args = {name, alias, min, max, step, val, onChange, onToggle};

      if (arg.options != undefined) return addDropdown(arg);

      for (let n of Object.keys(params)) {
        if (n == name){
          console.warn(`controls already contain parameter "${name}"`);
          return;
        }
      }

      controlArgs[name] = args;
      let value = val;
      if (val === undefined) value = mapBounds(0.5, min, max);
      params   [name] = value;
      paramVals[name] = value;
      controls.appendChild(getRow(name).appendChildren(
        //label
        getCell()._innerHTML(alias),

        //slider
        getCell("input")._id(name+"_slider")._type("range")._min(min)._max(max)._step(step)._value(value)
          ._oninput(function(){inputFn({newVal:this.value,...args})}),

        //input / value
        getCell("input")._id(name+"_input")._value(value)._type("number")._min(min)._max(max)._step(step)
          ._cssText(`font-family: "Lucida Console";`)
          ._onchange(function(){inputFn({newVal:this.value,...args})})
      ));
    }

    context.addControls = function(...args){args.for(i => addControl(i))}

  //-- Kinect Extension ------------------------------------
    let kinects = 0;
    context.Nect = class{
      constructor(type, ip, port){
        this.kinect;
        this.camera;
        this.avgBuf;
        this.average;
        this.type = type;
        switch(type){
          case 0 : {
            this.kinect = new Kinect({name: "Kinect_" + kinects, ip, port});
            break;
          }
          case 4 : {
            this.kinect = new KinectRGB4({name:"kinectRGB4_" + kinects, ip, port});
            break;
          }
          case 16 : {
            this.kinect = new KinectRGB16({name:"kinectRGB16_" + kinects, ip, port});
            break;
          }
          default : {
            this.kinect = new KinectRGB({name:"kinectRGB_" + kinects, ip, port});
            break;
          }
        }
        this.camera = type==0 ? f1tex(this.kinect.size) : v4tex(this.kinect.size);
        this.avgBuf  = v4tex(this.kinect.size);
        this.average = v4tex(this.kinect.size);

        this.kinect.onData(data => {
          this.camera.setData(this.kinect.size, new Float32Array(data));
          if (this.type != 0) this.camera.io(`o = vec4(i.bgr/255., 1.)`);

          this.avgBuf.run({
            camera : sampler | vec4,
            main : `
              vec4 col = thisTexel(camera);
              vec4 i   = thisTexel(image);
              if (length(col.rgb) != 0.){
                i.rgb += col.rgb;
                i.a   += 1.;
              }
              outColor = i;
            `
          },{camera:this.camera});

          this.average.run({
            avgBuf : sampler | vec4,
            main : `
              vec4 col = thisTexel(avgBuf);
              outColor = vec4(col.rgb/col.a, 1.);
            `
          },{avgBuf:this.avgBuf});

        });

        this.size = this.kinect.size;
        kinects++;
      }

      calculateBestFit (cornerLs) {
        let getCoord = (texture,point) => [...texture.getPixel(...point.vTimes(texture.size))].slice(0,3);

        let [a,b,c,d] = this.cornerLs;

        // collect best-fit point samples
        let pointLs = [], s = 0.2;
        for (let i=s;i<=1-s;i+=s) {
          let i0 = a.lerpTo(b,i);
          let i1 = c.lerpTo(d,i);
          for (let j=s;j<=1-s;j+=s) {
            let data = getCoord(this.average,i0.lerpTo(i1,j));
            if (data.z === 0) continue;
            pointLs.push(data);
          }
        }

        // get best-fit plane
        if (pointLs.length < 3) return;
        this.average2 = pointLs.reduce((a,b)=>a.plus(b)).div(pointLs.length);
        let xx=0, xy=0, xz=0, yy=0, yz=0, zz=0;
        for (let p of pointLs) {
          let [x,y,z] = p.minus(this.average2);
          xx += x*x; xy += x*y; xz += x*z;
          yy += y*y; yz += y*z; zz += z*z;
        } let detX = yy*zz-yz*yz, detY = xx*zz-xz*xz, detZ = xx*yy-xy*xy;
        switch (max(detX,detY,detZ)) {
          case detX : this.zAxis = [detX       ,xz*yz-xy*zz,xy*yz-xz*yy].norm; break;
          case detY : this.zAxis = [xz*yz-xy*zz,detY       ,xy*xz-yz*xx].norm; break;
          case detZ : this.zAxis = [xy*yz-xz*yy,xy*xz-yz*xx,detZ       ].norm; break;
        }

        // get origin and xy axes
        this.origin = getCoord(this.plane,a);
        this.xAxis  = getCoord(this.plane,b).minus(this.origin).norm; // reverse?
        this.yAxis  = this.zAxis.cross(this.xAxis).norm;
        if (this.yAxis.dot(getCoord(this.plane,c).minus(this.origin).norm)<0) this.yAxis = this.yAxis.neg();
      };
    }

  //-- Http Server -----------------------------------------
    if (window.process){
      let generateResponse = key => {
        return [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          "Sec-WebSocket-Accept: "+
          require("crypto").createHash("sha1").update(key+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64"),,,
        ].join("\r\n");
      };

      context.socketLs = [];
      context.httpServer = (port) => {
        let server = require("http").createServer().listen(port);
        let td     = new TextDecoder();

        server.on("upgrade",(req,socket)=>{
          for (let i = 0; i < socketLs.length; i++){
            let s = socketLs[i];
            if (socketLs[i].url === socket.url){
              socketLs = socketLs.remove(s);
              i--;
            }
          }
          socketLs.push(socket);
          socket.write(generateResponse(req.headers["sec-websocket-key"]));
          socket.on("data",frame=>{
            let opcode = frame[0] & 0b00001111;
            let mask   = frame[1] >> 7;
            let len    = frame[1] & 0b01111111;
            let start  = 2;
            if (len === 126) {
              len = frame[2]<<8|frame[3];
              start = 4;
            } else if (len === 127) {
              len = frame[2]<<56|frame[3]<<48|frame[4]<<40|frame[5]<<32|
                    frame[6]<<24|frame[7]<<16|frame[8]<< 8|frame[9];
              start = 10;
            }
            let key    = frame.subarray(start,start+4);
            let data   = frame.subarray(start+4);
            for (let i=0;i<data.length;++i) data[i] ^= key[i%4];

            try{
              eval(td.decode(data));
            } catch(err){
              console.log(err);
            }
          });
        });
      };
    }

  //-- Bookkeeping -----------------------------------------
    window.addEventListener("load", () => {
      // print("starting pairing server");
      // startServer(2222);
    })

    if (window.process){
      context.spawn = require('child_process').spawn;
      
      context.closeExternal = () => {
        console.log("closing processes"); 
        context.spawn("close.bat");
        if (Surface.get("spandex")) context.spawn("close_java.bat");
      }
    }
  }

  window.import(context);
}