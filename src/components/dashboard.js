import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import DataTable from '../components/common/DataTable';

import { fetchAllBuses } from '../actions/buses';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySearchResults: false,
            query: {
                from: '',
                to: '',
                jDate: '',
                rDate: ''
            },
            error: {
                from: null,
                to: null,
                jDate: null,
                rDate: null
            },
            message: {
                success: null,
                failure: null
            }
        };
    }

    handleInputChange = event => {
        this.setState({ query: { ...this.state.query, [event.target.id]: event.target.value } });
    }

    handleSubmit = event => {
        const { query } = this.state;
        if (query.from === '') {
          this.setState({ error: { from: 'From Place required..!!!'} });
        } else if (query.to === '') {
          this.setState({ error: { to: 'To Place required..!!!'} });
        } else if (query.jDate === '') {
          this.setState({ error: { jDate: 'Journey Date required..!!!'} });
        } else {
          this.setState({ error: {
            from: '',
            to: '',
            jDate: '',
            rDate: ''
          }});
          this.props.fetchAllBuses(query);
          this.setState({ displaySearchResults: true });
        }
        event.preventDefault();
    };

    render() {
        const { query, error, message, displaySearchResults } = this.state;
        const { buses } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="messageText">
                                            {message.success && <Form.Text className="text-alert">{message.success}</Form.Text>}
                                            {message.failure && <Form.Text className="text-danger">{message.failure}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="from">
                                            <Form.Control as="select" onChange={e => this.handleInputChange(e)}>
                                                <option value="0">From</option>
                                                <option value="1">Chennai</option>
                                                <option value="2">Bangalore</option>
                                                <option value="3">Mysore</option>
                                                <option value="4">Hyderabad</option>
                                                <option value="5">Kochi</option>
                                            </Form.Control>
                                            {error.from && <Form.Text className="text-danger">{error.from}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="to">
                                            <Form.Control as="select" onChange={e => this.handleInputChange(e)}>
                                                <option value="0">To</option>
                                                <option value="2">Bangalore</option>
                                                <option value="1">Chennai</option>
                                                <option value="3">Mysore</option>
                                                <option value="4">Hyderabad</option>
                                                <option value="5">Kochi</option>
                                            </Form.Control>
                                            {error.to && <Form.Text className="text-danger">{error.to}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="jDate">
                                            <Form.Control
                                                type="date"
                                                placeholder="Your email address"
                                                value={query.jDate}
                                                onChange={e => this.handleInputChange(e)}
                                            />
                                            {error.jDate && <Form.Text className="text-danger">{error.jDate}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="rDate">
                                            <Form.Control
                                                type="date"
                                                placeholder="Your email address"
                                                value={query.rDate}
                                                onChange={e => this.handleInputChange(e)}
                                            />
                                            {error.rDate && <Form.Text className="text-danger">{error.rDate}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="searchBusForm">
                                            <Button variant="primary" type="submit">Search</Button>
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {displaySearchResults && <Row>
                    <Col md={12} sm={12} xs={12}>
                        <Card>
                            <Card.Header><h3>Buses</h3></Card.Header>
                            <Card.Body>
                                <div style={{ 'textAlign': 'right' }}>
                                    No of buses found: <span style={{ 'color': '#007bff', 'fontWeight': 'bold' }}>{buses.length}</span>
                                </div>
                                <DataTable tableData={buses} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        buses: state.buses
    };
};

const mapDispatchToProps = { fetchAllBuses };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);