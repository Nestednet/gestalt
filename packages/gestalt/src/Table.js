// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import Column from './Column.js';
import TableRow from './TableRow.js';
import Text from './Text.js';
import Spinner from './Spinner.js';

// type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {|
  color?: string,
  colorHeader?: string,
  columns: Array<string>,
  children: Array<TableRow>,
|};

type State = {|
  loaded: boolean,
|};

/*
const ColumnsHash = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  '11': 11,
  '12': 12,
}; */

export default class Table extends React.Component<Props, State> {
  static propTypes = {
    color: PropTypes.string,
    colorHeader: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
  };

  state: State = {
    loaded: true,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      color = 'white',
      colorHeader = 'lightGray',
      columns,
      children,
    } = this.props;
    const { loaded } = this.state;

    const globalClass = classnames(
      styles.booking_requests_transactions,
      styles.guest
    );
    // const tableHeader = classnames(styles.transactions_table__header);
    const tableRow = classnames(styles.transactions_table__row);
    // const MAX = 12;
    /* const spanColAux = Math.floor(12 / columns.length).toString();
    const spanCol = (ColumnsHash[spanColAux]: Columns); // TODO: afegir excepcions */

    return (
      <Box className={globalClass} col={12} color={color} shape="roundedTop">
        <Box
          alignItems="center"
          color={colorHeader}
          display="flex"
          direction="row"
          name="th"
          shape="roundedTop"
        >
          {columns.map((column, index) => (
            <Column span={12} key={column + index}>
              <Box name="thr" height="100%" color={colorHeader} padding={3}>
                <Text align="center" size="sm">
                  {column}
                </Text>
              </Box>
            </Column>
          ))}
        </Box>
        <Box name="tb" paddingY={2} shape="roundedBottom" color={color}>
          {loaded ? (
            children.map((child, index) => (
              <Box name="tbr" className={tableRow} key={tableRow + index}>
                {child}
              </Box>
            ))
          ) : (
            <Spinner show={!this.state.loaded} accessibilityLabel="spinner" />
          )}
        </Box>
      </Box>
    );
  }
}
