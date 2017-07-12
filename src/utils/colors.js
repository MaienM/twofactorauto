import Color from 'color';
import COLORS from 'flatui-colors';
import _ from 'lodash';

// Based on http://www.poynton.com/notes/colour_and_gamma/ColorFAQ.html#RTFToC9
const yiq = (r, g, b) => ((r * 2162) + (g * 7152) + (b * 722)) / 10000.0;
const yiqDiff = (c1, c2) => Math.sqrt(yiq(
	// React native does not work with **
	/* eslint-disable no-restricted-properties */
	Math.pow(c1.red() - c2.red(), 2),
	Math.pow(c1.green() - c2.green(), 2),
	Math.pow(c1.blue() - c2.blue(), 2),
	/* eslint-enable */
));

// Given a color and a list of possible colors, get the color with the best contrast
const getComplementary = (_c, options = Object.values(COLORS)) => {
	const c = new Color(_c);
	return _(options).sortBy((o) => yiqDiff(c, new Color(o))).last();
};

export { getComplementary };
export default { getComplementary };

