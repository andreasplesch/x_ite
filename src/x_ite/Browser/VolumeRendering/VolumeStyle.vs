#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_TextureMatrix [1];

in float x3d_FogDepth;
in vec4  x3d_TexCoord0;
in vec4  x3d_Vertex;

out float fogDepth;
out vec3 vertex;
out vec4 texCoord;

void
main ()
{
	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	fogDepth = x3d_FogDepth;
	vertex   = position .xyz;
	texCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;

	gl_Position = x3d_ProjectionMatrix * position;
}
