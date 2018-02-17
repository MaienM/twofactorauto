import _ from 'lodash';
import PropTypes from 'prop-types';
import algorithms from '../algorithms';

/**
 * A proptype for an entry.
 */
export const entry = PropTypes.shape({
	name: PropTypes.string.isRequired,
	service: PropTypes.string.isRequired,
	algorithm: PropTypes.oneOf(_.keys(algorithms)).isRequired,
	secrets: PropTypes.shape({
		secret: PropTypes.string.isRequired,
	}).isRequired,
});
