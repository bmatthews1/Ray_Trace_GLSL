# Read Me
A Repository for ray tracers done in glsl for the Vector Graphics course at UNM

## to run:
Open with the latest version of Chrome (+70.0) or Electron (reccomended)
https://github.com/electron/electron/releases/tag/v4.0.5

## UI:
Click and drag mouse to move camera, scroll wheel to zoom in and out.
### Parameters:
- **camera distance** : the distance from the camera and the origin
- **camera plane** : the percentage along the camera distance that the pixel plane will be projected from
- **radius** : the size of the sphere (if there is a sphere to render)
- **random threshhold** : the percentage chance of ignoring a pixel (set max on low powered machines)
- **modes** :
    * **Sphere** : renders a single sphere colored by normalized coordinate (xyz -> rgb)
    * **Environment** : renders a sphere with an environment map and performs reflection on the sphere
    * **Equation** : maps the equation f(x,y)= 1/2(1+sin(x^2^*y^2^)) normalized to the center point

## Implementation:
Shaders implemented with GLSL code and compiled using javascript. Main rendering takes place in a fragment shader. Camera calculations are preformed on the cpu and passed to the shader using Matrix4x4 math to prevent overloading the GPU.

Anti-aliasing is accomplished by taking a frame-average of many different random pixel samples. This allows the ray tracer to run in real-time as well as let the quality imrpove as the camera stays stationary (see **random threshhold**);

## Project Structure:
All primary Code lives in the root directory. Each file is self-contained with the exception of the libraries.

Commonly used GLSL code are placed into headers and footers to prevent code bloat

Libraries:
* **Den.js** A Library that wraps WebGL and provides useful abstractions of WebGL architecture such as compiling shader programs and linking textures and attributes
* **Ben.js** A series of extensions and tools to Den.js and HTML5 that allow for easy creation of sounds, textures, DOM elements (such as controls), cheap GPU noise generation, and colormapping functions.

 