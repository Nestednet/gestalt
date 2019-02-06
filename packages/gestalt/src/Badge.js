// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Badge.css';
import Text from './Text.js';

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  children?: React.Node,
  status?: 'warning' | 'alarm' | 'good' | 'info',
  inline?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  shape?: 'pill' | 'rounded-rectangle',
|};

export default function Badge({
  align = 'center',
  status = 'info',
  shape = 'pill',
  children,
  inline = true,
  size = 'md',
}: Props) {
  const classes = classnames(
    styles.badge,
    styles[shape],
    styles[status],
    styles[align]
  );

  const Tag = inline ? 'span' : 'div';
  return (
    <Tag className={classes}>
      <Text size={size}>{children}</Text>
    </Tag>
  );
}

Badge.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  status: PropTypes.oneOf(['warning', 'alarm', 'good', 'info']),
  inline: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
