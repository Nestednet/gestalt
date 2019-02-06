// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Column from './Column.js';

type Props = {|
  children: Array<React.Node>,
  onMouseEnter?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
|};

type State = {|
  hovered: boolean,
|};

export default class TableElement extends React.Component<Props, State> {
  static propTypes = {
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
    const { children } = this.props;
    const { hovered } = this.state;

    const spanCol = 1; // FIXME:  canviar

    return (
      <Box
        name="tr"
        display="flex"
        direction="row"
        paddingY={2}
        shape="roundedTop"
        justifyContent="between"
        alignItems="center"
        height="100%"
        color={hovered ? 'eggplant' : 'midnight'}
      >
        {children.map((child, index) => (
          <Column span={spanCol} key={index}>
            <Box
              height="100%"
              padding={1}
              alignSelf="center"
              alignContent="between"
            >
              {child}
            </Box>
          </Column>
        ))}
      </Box>
    );
  }
}

/*
            <Box            position = "relative"            display="flex"            direction = "row"            alignContent="center"
            alignItems="center"
            justifyContent="between"
            className = "transactions-table__row"
            >
                {children.map(child =>
                    <Box column={spanCol} padding= {4}>
                        {child}
                    </Box>)
                }
            </Box>


*/
