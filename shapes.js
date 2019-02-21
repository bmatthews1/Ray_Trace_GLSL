class Shape{
  constructor(explicit, implicit, position, rotation, scale){
    this.explicit = explicit;
    this.implicit = implicit;
  }
}

//Matrix4x4 operations (can be baked into shader)
//translate
//scale
//rotate

//traken directly from https://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
let distance_estimators = `
  float sdSphere( vec3 p, float s )
  {
    return length(p)-s;
  }
  
  float sdBox( vec3 p, vec3 b)
  {
    vec3 d = abs(p) - b;
    return length(max(d,0.0))
           + min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf 
  }

  float sdRoundBox( vec3 p, vec3 b, float r )
  {
    vec3 d = abs(p) - b;
    return length(max(d,0.0)) - r
           + min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf 
  }

  float sdTorus( vec3 p, vec2 t )
  {
    vec2 q = vec2(length(p.xz)-t.x,p.y);
    return length(q)-t.y;
  }

  float sdCylinder( vec3 p, vec2 h )
  {
    vec2 d = abs(vec2(length(p.xz),p.y)) - h;
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
  }

  float sdCone(vec3 p, float h, float r2)
  {
      vec2 q = vec2( length(p.xz), p.y );
      
      float r1 = 0.;

      vec2 k1 = vec2(r2,h);
      vec2 k2 = vec2(r2-r1,2.0*h);
      vec2 ca = vec2(q.x-min(q.x,(q.y < 0.0)?r1:r2), abs(q.y)-h);
      vec2 cb = q - k1 + k2*clamp( dot(k1-q,k2)/dot2(k2), 0.0, 1.0 );
      float s = (cb.x < 0.0 && ca.y < 0.0) ? -1.0 : 1.0;
      return s*sqrt( min(dot2(ca),dot2(cb)) );
  }

  float sdPlane( vec3 p, vec4 n )
  {
    // n must be normalized
    return dot(p,n.xyz) + n.w;
  }

  float sdHexPrism( vec3 p, vec2 h )
  {
    const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
    p = abs(p);
    p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
    vec2 d = vec2(
       length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
       p.z-h.y );
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
  }

  float sdTriPrism( vec3 p, vec2 h )
  {
    vec3 q = abs(p);
    return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
  }

  //from point a to point b with radius r
  float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
  {
    vec3 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h ) - r;
  }

  //height radius
  float sdVerticalCapsule( vec3 p, float h, float r )
  {
    p.y -= clamp( p.y, 0.0, h );
    return length( p ) - r;
  }

  float sdOctahedron( in vec3 p, in float s)
  {
    p = abs(p);
    float m = p.x+p.y+p.z-s;
    vec3 q;
         if( 3.0*p.x < m ) q = p.xyz;
    else if( 3.0*p.y < m ) q = p.yzx;
    else if( 3.0*p.z < m ) q = p.zxy;
    else return m*0.57735027;
    
    float k = clamp(0.5*(q.z-q.y+s),0.0,s); 
    return length(vec3(q.x,q.y-s+k,q.z-k)); 
  }

  float sdTriangle( vec3 p, vec3 a, vec3 b, vec3 c )
  {
    vec3 ba = b - a; vec3 pa = p - a;
    vec3 cb = c - b; vec3 pb = p - b;
    vec3 ac = a - c; vec3 pc = p - c;
    vec3 nor = cross( ba, ac );

    return sqrt(
    (sign(dot(cross(ba,nor),pa)) +
     sign(dot(cross(cb,nor),pb)) +
     sign(dot(cross(ac,nor),pc))<2.0)
     ?
     min( min(
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),
     dot2(ac*clamp(dot(ac,pc)/dot2(ac),0.0,1.0)-pc) )
     :
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );
  }

  float sdQuad( vec3 p, vec3 a, vec3 b, vec3 c, vec3 d )
  {
    vec3 ba = b - a; vec3 pa = p - a;
    vec3 cb = c - b; vec3 pb = p - b;
    vec3 dc = d - c; vec3 pc = p - c;
    vec3 ad = a - d; vec3 pd = p - d;
    vec3 nor = cross( ba, ad );

    return sqrt(
    (sign(dot(cross(ba,nor),pa)) +
     sign(dot(cross(cb,nor),pb)) +
     sign(dot(cross(dc,nor),pc)) +
     sign(dot(cross(ad,nor),pd))<3.0)
     ?
     min( min( min(
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),
     dot2(dc*clamp(dot(dc,pc)/dot2(dc),0.0,1.0)-pc) ),
     dot2(ad*clamp(dot(ad,pd)/dot2(ad),0.0,1.0)-pd) )
     :
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );
  }
`

let distance_operators = `

  //pulls center out by h
  vec4 opElongate( in vec3 p, in vec3 h )
  {
    //return vec4( p-clamp(p,-h,h), 0.0 ); // faster, but produces zero in the interior elongated box
    
    vec3 q = abs(p)-h;
    return vec4( max(q,0.0), min(max(q.x,max(q.y,q.z)),0.0) );
  }

  vec2 opRevolution(in vec3 p, float o )
  {
    return vec2( length(p.xz) - o, p.y );
  }

  float opRound(float d, float r)
  {
      return d - r;
  }

  float opOnion(float d, float thickness )
  {
      return abs(d)-thickness;
  }

  float opAND( float d1, float d2 ) { return max( d1,d2); } // AND
  float opOR ( float d1, float d2 ) { return min( d1,d2); } // OR
  float opNOT( float d1, float d2 ) { return max(-d1,d2); } // NOT
  float opXOR( float d1, float d2 ) { return opOR(opNOT(d1, d2), opNOT(d2, d1)); } //XOR

`