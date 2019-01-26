
({
	baseUrl: "../src",
	name: "components/geospatial",
	out: "../dist/components/geospatial.js",
	optimize: "none",
	mainConfigFile: "../src/components/geospatial.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "parts/geospatial.start.frag",
		endFile: "parts/geospatial.end.frag"
	},
})
