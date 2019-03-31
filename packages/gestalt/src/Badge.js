// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Badge.css';

const SIZE_SCALE: { [size: ?string]: number } = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  children?: React.Node,
  inline?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  status?: 'warning' | 'alarm' | 'good' | 'info',
  shape?: 'pill' | 'rounded-rectangle' | 'rectangle',
|};

export default function Badge({
  align = 'center',
  children,
  inline = true,
  shape = 'pill',
  size,
  status = 'info',
}: Props) {
  const scale = SIZE_SCALE[size];
  const notDefault = scale !== 3;
  const classes = classnames(
    styles.badge,
    styles[shape],
    styles[status],
    styles[align],
    {
      [styles.fontSize1]: notDefault && scale === 1,
      [styles.fontSize2]: notDefault && scale === 2,
      [styles.fontSize4]: notDefault && scale === 4,
      [styles.fontSize5]: notDefault && scale === 5,
    }
  );

  const Tag = inline ? 'span' : 'div';
  return (
    <Tag style={{ fontSize: '12px' }} className={classes}>
      {children}
    </Tag>
  );
}

Badge.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  children: PropTypes.node,
  inline: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  status: PropTypes.oneOf(['warning', 'alarm', 'good', 'info']),
};
