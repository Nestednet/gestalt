// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.css';
import Box from './Box.js';
import Text from './Text.js';
import Icon from './Icon.js';
import icons from './icons/index.js';

type Props = {|
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  color?: 'green' | 'transparent' | 'yellow', // TODO: assignar als colors de nested // FIXME: FIXME
  disabled?: boolean,
  inline?: boolean,
  name?: string,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'sm' | 'md' | 'lg',
  text: string,
  type?: 'submit' | 'button',
  isPill?: boolean,
  buttonIcon?: $Keys<typeof icons>,
|};

export default function Button(props: Props) {
  const {
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    color = 'green',
    disabled = false,
    inline = false,
    isPill = false,
    buttonIcon,
    name,
    onClick,
    size = 'md',
    text,
    type = 'button',
  } = props;

  const textColor = {
    blue: 'white',
    gray: 'darkGray',
    red: 'white',
    transparent: 'white',
    white: 'darkGray',
    green: 'white',
    yellow: 'darkYellow',
  };

  const classes = classnames(styles.button, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    [styles.solid]: color !== 'transparent',
    [styles[color]]: !disabled,
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [styles.inline]: inline,
    [styles.block]: !inline,
    [styles.pill]: isPill,
  });

  /* eslint-disable react/button-has-type */
  return (
    <button
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      name={name}
      onClick={event => onClick && onClick({ event })}
      type={type}
    >
      {buttonIcon && (
        <Box
          position="relative"
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Icon
            icon={buttonIcon}
            accessibilityLabel={buttonIcon}
            color={disabled ? 'gray' : textColor[color]}
          />
          <Text
            align="center"
            color={disabled ? 'gray' : textColor[color]}
            overflow="normal"
            size={size}
          >
            {text}
          </Text>
        </Box>
      )}
      {!buttonIcon && (
        <Text
          align="center"
          color={disabled ? 'gray' : textColor[color]}
          overflow="normal"
          size={size}
        >
          {text}
        </Text>
      )}
    </button>
  );
  /* eslint-enable react/button-has-type */
}

Button.propTypes = {
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf([
    'blue',
    'gray',
    'red',
    'transparent',
    'white',
    'green',
    'yellow',
  ]),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  isPill: PropTypes.bool,
  buttonIcon: PropTypes.string,
};
