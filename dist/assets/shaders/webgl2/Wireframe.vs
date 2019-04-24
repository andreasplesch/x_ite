#version 300 es
precision mediump float;
precision mediump int;
uniform bool  x3d_ColorMaterial;   
uniform bool  x3d_Lighting;        
uniform x3d_MaterialParameters x3d_FrontMaterial;  
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
in float x3d_FogDepth;
in vec4  x3d_Color;
in vec4  x3d_Vertex;
out float fogDepth; 
out vec4  color;    
out vec3  vertex;   
#ifdef X_ITE
in  vec4 x3d_TexCoord0;
out vec3 startPosition;  
out vec3 vertexPosition; 
#endif
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif
void
main ()
{
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
fogDepth = x3d_FogDepth;
vertex   = position .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X_ITE
vec4 start = x3d_ProjectionMatrix * x3d_ModelViewMatrix * x3d_TexCoord0;
startPosition  = start .xyz / start .w;
vertexPosition = gl_Position .xyz / gl_Position .w;
#endif
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
if (x3d_Lighting)
{
float alpha = 1.0 - x3d_FrontMaterial .transparency;
if (x3d_ColorMaterial)
{
color .rgb = x3d_Color .rgb;
color .a   = x3d_Color .a * alpha;
}
else
{
color .rgb = x3d_FrontMaterial .emissiveColor;
color .a   = alpha;
}
}
else
{
if (x3d_ColorMaterial)
color = x3d_Color;
else
color = vec4 (1.0);
}
}