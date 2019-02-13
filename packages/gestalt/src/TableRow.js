// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Column from './Column.js';

type Props = {|
  color: PropTypes.string,
  children: Array<React.Node>,
  onMouseEnter?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
|};

type State = {|
  hovered: boolean,
|};

export default class TableRow extends React.Component<Props, State> {
  static propTypes = {
    color: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node),
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  state: State = {
    hovered: false,
  };

  handleMouseEnter = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseEnter } = this.props;
    this.setState(
      { hovered: true },
      onMouseEnter && (() => onMouseEnter({ event }))
    );
  };

  handleMouseLeave = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseLeave } = this.props;
    this.setState(
      { hovered: false },
      onMouseLeave && (() => onMouseLeave({ event }))
    );
  };

  render() {
    const { color, children } = this.props;
    const { hovered } = this.state;

    const spanCol = 12; // FIXME:  canviar

    return (
      <Box
        alignItems="center"
        color={hovered ? 'lightGray' : color}
        display="flex"
        direction="row"
        name="tr"
        shape="square"
      >
        {children.map((child, index) => (
          <Column span={spanCol} key={index}>
            <Box
              display="flex"
              direction="row"
              alignItems="center"
              color={color}
              justifyContent="center"
              padding={3}
            >
              {child}
            </Box>
          </Column>
        ))}
      </Box>
    );
  }
}
