/** @type {import('tailwindcss').Config} */
module.exports = {
  	"content": [
    		"./src/**/*.{js,ts,jsx,tsx}",
  	],
  	"theme": {
    		"extend": {
      			"colors": {
        				"white": "#fff",
        				"gray": {
          					"50": "#f9fafb",
          					"100": "#898384",
          					"200": "#050b1d",
          					"300": "#0e0304"
        				},
        				"ghostwhite": {
          					"100": "#f5f5ff",
          					"200": "#ebebf5"
        				},
        				"firebrick": {
          					"50": "#fef2f2",
          					"100": "#b81b1b",
          					"200": "#b5181f"
        				},
        				"silver": "#b5b5bf",
        				"steelblue": "#395586",
        				"khaki": "#ffe289",
        				"olive": "#876a12",
        				"paleturquoise": "#bbfeeb",
        				"seagreen": "#01694b",
        				"mistyrose": "#ffdada",
        				"skyblue": "#9ae1ff",
        				"darkslategray": "#0d4a65",
        				"yellowgreen": "#b7fb64",
        				"darkolivegreen": "#426a10"
      			},
      			"fontFamily": {
        				"radio-canada": "Radio Canada",
        				"onest": "Onest"
      			}
    		}
  	},

  	"corePlugins": {
    		"preflight": false
  	}
}