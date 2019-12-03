import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './styles.scss';
import { Row, Col, Card, Button } from 'react-bootstrap';

const isExpandableRow = () => {
  return true;
};

const renderSeats = (seat) => {
  let seats = [];
  for (var i = 0; i < seat.totalSeats; i++) {
    let className = (i < seat.bookedSeats) ? 'seat red' : 'seat green';
    seats.push(<div key={i} className={className} disabled={i<seat.bookedSeats}>{i + 1}</div>);
  }
  return seats;
};

export default class ExpandRow extends React.Component {
  expandComponent(row) {
    return (<React.Fragment>
      <Row>
        <Col md={4} sm={4} xs={12}>
          Total Seats: <span style={{ 'color': 'grey', 'fontWeight': 'bold' }}>{row.totalSeats}</span>
        </Col>
        <Col md={4} sm={4} xs={12}>
          Booked Seats: <span style={{ 'color': 'red', 'fontWeight': 'bold' }}>{row.bookedSeats}</span>
        </Col>
        <Col md={4} sm={4} xs={12}>
          Available Seats: <span style={{ 'color': 'green', 'fontWeight': 'bold' }}>{row.freeSeats}</span>
        </Col>
      </Row>
      <Row>
        <Col md={8} sm={12} xs={12}>
          <div className="seats-container">
            {renderSeats(row)}
          </div>
        </Col>
        <Col md={4} sm={12} xs={12}>
          <Card>
            <Card.Header>Seat Legend</Card.Header>
            <Card.Body>
              <Row className="legend-row" >
                <Col md={3} xs={12} sm={6}><div className="seat-legend red">#</div></Col>
                <Col md={9} xs={12} sm={6}>Booked</Col>
              </Row>
              <Row className="legend-row">
              <Col md={3} xs={12} sm={6}><div className="seat-legend green">#</div></Col>
              <Col md={9} xs={12} sm={6}>Available</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row></React.Fragment>
    );
  }

  expandColumnComponent({ isExpandableRow, isExpanded }) {
    return (
      <Button size="sm" variant="primary" type="submit">View Seats</Button>
    );
  }

  render() {
    return (
      <div className="expandableTableContainer">
        <BootstrapTable
          data={this.props.tableData}
          expandableRow={isExpandableRow}
          expandComponent={this.expandComponent}
          //expandColumnOptions={{ expandColumnVisible: true }}
          expandColumnOptions={{
            expandColumnVisible: true,
            expandColumnComponent: this.expandColumnComponent,
            columnWidth: 125
          }}>
          <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='number' dataSort={true}>Number</TableHeaderColumn>
          <TableHeaderColumn dataField='fromPlace' dataSort={true}>From</TableHeaderColumn>
          <TableHeaderColumn dataField='toPlace' dataSort={true}>To</TableHeaderColumn>
          <TableHeaderColumn dataField='jDate' dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='dTime' dataSort={true}>Departure</TableHeaderColumn>
          <TableHeaderColumn dataField='aTime' dataSort={true}>Arrival</TableHeaderColumn>
          <TableHeaderColumn dataField='duration' dataSort={true}>Duration</TableHeaderColumn>
          <TableHeaderColumn dataField='price' dataSort={true}>Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}