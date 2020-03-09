import React, { Component } from 'react';
import { Row, Card, CardBody, Col } from 'reactstrap';
import moment from 'moment';

class CardData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      config: props.config,
    };
  };

  componentDidMount = () => {
    this.buildRows();
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) this.setState({ data: nextProps.data, config: nextProps.config }, () => { this.buildRows(); });
  }

  buildRows = () => {
    let { data } = this.state;
    let rows = this.state.config.map((e, index) => {
      var first;
      if (!e.foot) {
        e.foot = {};
      }
      if (!e.header) {
        e.header = {};
      }
      if (!e.data) {
        e.data = {};
      }
      if (!data.icon) {
        data.icon = {};
      }

      if (e.first) {
        first = (
          <>
            <Col lg={12} md={12}>
              <Row>
                <Col lg={12} md={12}>
                  <h3 style={{ color: '#2d5667' }}>{data.title}</h3>
                </Col>
                <div style={{ height: 50 }}></div>
                <Col lg={4} md={4}>
                  <Col lg={4} sm={12} md={6} mdOffset={3} lgOffset={4}>
                    <center style={{}}>
                      <img style={{ height: "15em" }} alt="" src={data.image} />
                    </center>
                  </Col>
                </Col>
                <Col lg={8} md={8}>
                  <Col lg={12} md={12}><h3 style={{ color: '#dd7618' }}>{data.post}</h3></Col>
                  <div style={{ height: 10 }}></div>
                  <Col lg={8} md={8}>
                    <Row>
                      <Col lg={7} md={7}></Col>
                      <Col lg={12} md={12}>
                      <Col lg={12} md={12}> <span><a>Created by: {data.name}</a> </span></Col>
                      <Col lg={12} md={12}><span><a>Creation date: {moment(data.newDate).format('YYYY-MM-DD')}</a></span> </Col>
                      <Col lg={12} md={12}><span><a>Last edition: {moment(data.lastEdition).format('YYYY-MM-DD')}</a></span> </Col>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
          </>
        );
      }
      return (
        <div className={e.className} key={index}>
          <div className="mb-mail-meta">
            {first}
          </div>
        </div>);
    });
    this.setState({ rows });
  }

  render() {
    return (
      <div className={this.state.config.length > 12 ? 'cardHorizontal' : ''}  >
        <Card style={{ borderRadius: '43px' }} className="_clickCard myCard">
          <CardBody>
            <div className={this.state.config.length > 12 ? 'cardHorizontal' : 'row'}>
              {this.state.rows}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CardData;
