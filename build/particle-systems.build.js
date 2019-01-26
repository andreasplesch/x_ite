
({
	baseUrl: "../src",
	name: "components/particle-systems",
	out: "../dist/components/particle-systems.js",
	optimize: "none",
	mainConfigFile: "../src/components/particle-systems.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "parts/particle-systems.start.frag",
		endFile: "parts/particle-systems.end.frag"
	},
})
