import React, { Component, Suspense } from 'react';
import './styles/cards.scss';
import {  Row,  Modal, ModalHeader, ModalBody} from 'reactstrap';
// import Modal from '../../../template/Modal/AdvancedSearch'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
// import { Modal, ModalHeader, ModalBody, Col, Row} from 'reactstrap';
import { Popup } from 'semantic-ui-react'
import AddComment from './componets/index';
const CardData = React.lazy(() => import('./card'));

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commet:[],
      modal: false,
      data: [],
      isOpen: false,
      loaderExcel: false,
      cards: '',
      search: '',
      toggleDrawer: this.props.toggleDrawer,
      resetCards: this.props.reset,
      labelStatus: this.props.labelStatus,
      dataSearch: this.props.dataSearch,
      activePage: 1,
      totalPages: 0,
      infoCard: false,
    };
  };

  componentDidMount = () => {
    if (this.props.cardInfon) {
      this.setState({
        data: this.props.data,
        infoCard: true
      }, () => this.buildCards());
    }
    else {
      this.setState({
        data: this.props.data,
        dataSearch: [...this.props.data],
        allMyData: [...this.props.data]
      }, () => this.initPages());
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) this.setState({ data: nextProps.data, dataSearch: nextProps.data, allMyData: nextProps.data }, () => { this.initPages(); });
    if (nextProps.labelStatus)
      this.setState({ labelStatus: nextProps.labelStatus }, () => {
        this.buildCards();
        try {
          let selectedFileDoom = document.getElementById(nextProps.labelStatus);
          selectedFileDoom.classList.add('_cardSelected');
        } catch (e) {
        }
      });
  }

  initPages = () => {
    let pages = Math.ceil(parseInt(this.state.dataSearch.length) / 5);
    if (pages === 0) pages = 1;
    this.setState({
      activePage: 1,
      totalPages: pages,
    }, () => { this.buildPageResults(); });
  }

  buildPageResults = () => {
    let { activePage, totalPages } = this.state;
    let data = this.setResultsByPage(activePage, this.state.dataSearch, totalPages, 10);
    this.setState({
      data,
    }, () => {
      this.buildCards();
    });
  }

  setResultsByPage = (page, all, pages, itemsByPage) => {
    page = page - 1;
    const pag = all.slice((page) * itemsByPage, (page + 1) * itemsByPage);
    return pag;
  }

  modalEditOpen =  id => event =>{
    let commet = id
    this.setState(({
      modal: !this.state.modal,
      commet:commet,
      edit:true
    }));
    
  }

  buildCards = () => {
    let { data } = this.state;
    let tags = data.map((e, index) => {
      return (
        <div key={index} className={this.props.config.length > 12 ? '' : ''} onClick={ this.modalEditOpen(e)}>
          <Suspense fallback={<div>Loading...</div>}><CardData className={this.props.config.length > 12 ? '' : ''} CardIndoHeaders={this.props.CardIndoHeaders} infoCard={this.state.infoCard} key={index} config={this.props.config} data={e} element={e} ></CardData></Suspense>
        </div>
      );
    });
    this.setState({
      cards: tags
    }, () => this.setState({ cards: tags }));
  }

  toggle = evt => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      edit:false,
    }));
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      edit:false,
      commet:{}
    })
  }

  render() {
    return (
      <Row>
        {this.props.cardInfon || this.props.broswer === false ? '' : <div className="col-12">
          <div style={{ position: 'fixed', bottom: '334px', right: '0px' }} className="col-1">
            <Popup
              content="Add Post"
              key={1}
              position=''
              // header={''}
              trigger={<Fab color="secondary" size="big" aria-label="add" onClick={this.toggleModal}>
                <AddIcon />
              </Fab>}
            />
          </div>
        </div>}
        <div className={'col-10'}>
          {this.state.cards}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
          <ModalHeader style={{ background: '#dd7618', fontSize: '16px', color: 'white' }} toggle={this.toggleModal}>{this.state.edit ? 'EDIT POST AS DEPORTE' : 'ADD POST AS DEPORTE'}</ModalHeader>
          <ModalBody>
            <AddComment edit = {this.state.edit}commet = {this.state.commet} onError={this.props.onError} toggle={this.toggleModal} getData={this.props.getData} type="0" />
          </ModalBody>
        </Modal>
      </Row>
    );
  }
}
export default Cards;
