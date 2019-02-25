# Read Me
A Repository for ray tracers done in glsl for the Vector Graphics course at UNM

## to run:
Open with the latest version of Chrome (+70.0) or Electron (reccomended)
https://github.com/electron/electron/releases/tag/v4.0.5

If using Chrome, specific CORS access needs to be granted to access local media files. If on Windows and chrome is already installed, simply launch the program with run.bat to enable CORS flags.

Alternatively:
Launch chrome directly with the flags:
  --allow-file-access-from-files --allow-file-access --allow-cross-origin-auth-prompt

On Windows these can be set in the chrome properties tab (https://superuser.com/questions/1217863/how-can-i-prevent-chrome-from-enforcing-cors-for-one-specific-file-url) or launched as command line arguments from a terminal.

On Linux with chromium browser:
chromium-browser --disable-web-security --user-data-dir="[root directory]"

## UI:

### Controls:
- **camera** : Click and drag mouse to move camera, scroll wheel to zoom in and out.
- **key controls**:
  * ~ : toggles control panel and stats visibility
  * ctrl : advances to the next mode
  * alt+ctrl : returns to previous mode
  * space : takes a capture of the current output texture
  * Digit1 (hold) : displays the captured texture
  * Digit2 (hold) : displays the captured texture and the current output side-by-side
- **window controls**
  * f5 : refreshes the window
  * f11: fullscreens the window

### Parameters:
- **camera distance** : the distance from the camera and the origin
- **camera plane** : the percentage along the camera distance that the pixel plane will be projected from
- **radius** : the size of the sphere (if there is a sphere to render)
- **random threshhold** : the percentage chance of ignoring a pixel (set max on low powered machines)
- **sub samples** : specifies the grid size of the sub-samples used in grid and jittered sampling methods
- **line width** : specifies the line width for line sampling modes
- **modes** :
    * **Sphere** : renders a single sphere colored by normalized coordinate (xyz -> rgb)
    * **Environment** : renders a sphere with an environment map and performs reflection on the sphere
    * **Equation** : maps the equation f(x,y) = 1/2(1+sin(x^2^ * y^2^)) normalized to the center point
    * **torus** : same as environment but using a torus instead
    * **sierpinski** : renders a tiled sierpinsky triangle using a distance function
    * **shapes** : renders some basic shapes using distance estimator primitives
    * **grid** : renders a black and white checkered grid on the xz axis
    * **grid2** : renders a top down view of a grid at different line widths
- **sample types** :
    * **normal** (default) : samples 1 ray per pixel at the center of that pixel
    * **random** : samples a random point (0-1) within the pixel
    * **grid** : samples in a regular grid pattern based on the subSample grid size
    * **jittered** : combination of grid and random, samples randomly within each sub-cell
    * **sunflower** : samples along an archemdian spiral with densities closer to the center of the pixel

## Implementation:
Shaders implemented with GLSL code and compiled using javascript. Main rendering takes place in a fragment shader. Camera calculations are preformed on the cpu and passed to the shader using Matrix4x4 math to prevent overloading the GPU.

Anti-aliasing is accomplished by taking a frame-average of many different random pixel samples. This allows the ray tracer to run in real-time as well as let the quality imrpove as the camera stays stationary (see **random threshhold**);

## Project Structure:
All primary Code lives in the root directory. Each file is self-contained with the exception of the libraries.

Commonly used GLSL code segments are placed into headers and footers to prevent code bloat

Libraries:
* **Den.js** A Library that wraps WebGL and provides useful abstractions of WebGL architecture such as compiling shader programs and linking textures and attributes
* **Ben.js** A series of extensions and tools to Den.js and HTML5 that allow for easy creation of sounds, textures, DOM elements (such as controls), cheap GPU noise generation, and colormapping functions.

 