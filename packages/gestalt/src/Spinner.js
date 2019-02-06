// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.css';

// const SIZE = 40;

type Props = {|
  accessibilityLabel?: string,
  show?: boolean,
|};

export default function Spinner({
  accessibilityLabel = 'spinner',
  show = true,
}: Props) {
  return show ? (
    <div className={styles.spinner} accessibilityLabel={accessibilityLabel}>
      <div className={styles.dot} />
      <div className={styles.circle} />
    </div>
  ) : (
    <div />
  );
}

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
};
