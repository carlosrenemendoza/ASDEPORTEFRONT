import './styles.scss';
import imagenLogin from './../../../resources/asdeporte.png';
import { Label, Input } from 'reactstrap';
import Services from './Services';
import axios from 'axios';
import Authentication from '../../../../src/services/Authentication.js';
import React, { Component } from 'react';
import ContentWrapper from '../../template/Layout/ContentWrapper';
import { Row, Card, CardBody, CardText, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Cards from '../../asDeporte/Components/Cards';
import Errors from '../../asDeporte/Components/Errors';



const auth = new Authentication();
const BackgroundHead = {
  // height: '120em',
  minHeight:'100em',
  backgroundImage: 'url(' + imagenLogin + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 'calc(100vw + 48px)',
  margin: -24,
  padding: 24,
};
/*=============================================
=            Login Component                  =
=============================================*/


class AsDeporte extends Component {
  state = {
    config: [
      {first: true,className: 'col-md-3 col-lg-12 col-sm-12' },
    ],
    data: [],
    error: {
      open: false,
      message: '',
      type: 'admin',
      errorValidate: false
  }



  }

  componentDidMount = () => {
    this.getData();
  }

  getData = ()=>{
    axios.get(`${Services.LIST_GET.path}`).then(response => {
      console.log("esto es la respuesta del GET-->>>,",response.data.data);

      this.setState({
        data:response.data.data
      })
      
      
    }).catch( error => {
      console.warn('THE ERROR ==>'.error);
    });
  }

  toggleDrawerMap = data => evt => {
    this.setState({ visible: true, dataDrawer: data });
  };

  recieveProps = (open) => this.setState({ error: { open: open, type: this.state.error.type } })

  onError = error => {
    this.setState({
        error: error.error
    });
};
  render() {
    return (
<>
<Errors open={this.state.error.open} type={this.state.error.type} message={this.state.error.message} setProps={this.recieveProps} ></Errors>
<div className="limiter" style={BackgroundHead}>
        <div className=""></div>

        <ContentWrapper>
          <div style={{ background: '#dd7618', color: 'white' }} className="content-heading">
            <div className="row">
              <em style={{ color: 'white' }} className="fa-2x icon-location-pin mr-2"></em>
              <a style={{ color: 'white', fontSize: '30px', letterSpacing: '38px' }} >ASDEPORTE BLOG</a>
            </div>
          </div>
          <Cards getData={this.getData} onError={this.onError} config={this.state.config} toggleDrawer={this.toggleDrawerMap} data={this.state.data}  ></Cards>
        </ContentWrapper>
      </div>
</>
      

    );
  }

}

export default withRouter(AsDeporte);
