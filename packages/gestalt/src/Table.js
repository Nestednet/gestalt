// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import Column from './Column.js';
import TableElement from './TableElement.js';
import Text from './Text.js';
import Spinner from './Spinner.js';

type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {|
  columns: Array<string>,
  children: Array<TableElement>,
|};

type State = {|
  loaded: boolean,
|};

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
};

export default class Table extends React.Component<Props, State> {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
  };

  state: State = {
    loaded: false,
  };

  render() {
    const { columns, children } = this.props;
    const { loaded } = this.state;

    // const columnSize = columns.length;
    const globalClass = classnames(
      styles.booking_requests_transactions,
      styles.guest
    );
    // const tableHeader = classnames(styles.transactions_table__header);
    const tableRow = classnames(styles.transactions_table__row);
    // const MAX = 12;
    const spanColAux = Math.floor(12 / columns.length).toString();
    const spanCol = (ColumnsHash[spanColAux]: Columns); // TODO: afegir excepcions
    return (
      <Box className={globalClass} col={12}>
        <Box
          name="th"
          display="flex"
          direction="row"
          paddingY={2}
          color="darkGray"
          shape="roundedTop"
        >
          {columns.map((column, index) => (
            <Column span={spanCol} key={column + index}>
              <Box name="thr" height="100%" color="white" paddingY={3}>
                <Text align="center">{column}</Text>
              </Box>
            </Column>
          ))}
        </Box>
        <Box name="tb" paddingY={2} shape="roundedBottom" color="lightGray">
          {loaded ? (
            children.map((child, index) => (
              <Box name="tbr" className={tableRow} key={tableRow + index}>
                {child}
              </Box>
            ))
          ) : (
            <Spinner />
          )}
        </Box>
      </Box>
    );
  }
}

/*
<Box className={globalClass}>
      <Box name="Table" className={styles}>
        <Box name="tr" position="relative" display="flex" direction="row" color="lightGray" shape="roundedTop" className={table__header}>
          {columns.map((column, index) =>
            <Box name="th" column={columnSize} padding={4} key={index}>
              {column}
            </Box>
          )}
        </Box>

        {children.map((child, index) => <Box name="tr" className={table__row} key={table__row + index}>                            {child}
        </Box>
        )}
      </Box>
    </Box> */

/*
<article class="booking_requests-transactions guest" id="transactions--{{$request->id}}">
  <table>
    <tr class="transactions-table--header">
      <th>Starts at</th>
      <th>Concept</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Invoice</th>
    </tr>
    @foreach($request->transactions as $transaction)
    <tr class="transactions-table--row">
      <th class="date">{{ $transaction-> start_at -> format("d-m-Y")}}</th>
      <th class="concept">{{ $transaction-> getConcept()}}</th>
      <th class="amount">{{ $transaction-> amount}}€</th>
      <th class="status --{{ $transaction->status }}"><div><span>{{ $transaction-> status}}</span></div></th>
      <th>TODO</th>
    </tr>
    @endforeach
</table>
</article>

*/
