import React, { Component } from 'react';
import pubsub from 'pubsub-js';
// import { Link } from 'react-router-dom';
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';
import ToggleState from '../Common/ToggleState';
import TriggerResize from '../Common/TriggerResize';
import ToggleFullscreen from '../Common/ToggleFullscreen';
import HeaderRun from './Header.run';
import smallIMG from './../../../resources/roldan_small.png';
import largeIMG from './../../../resources/roldan_large.png';
import { Redirect } from 'react-router';
import { Checkbox } from '@material-ui/core/';
import { Link, withRouter } from 'react-router-dom';
import Authentication from '../../../../src/services/Authentication.js';
import ClientesList from '../../../../src/services/storageClient.js';
import { InputGroup, Input } from 'reactstrap';
import './style.scss';
import { Dropdown, List } from 'semantic-ui-react';
import { Button } from 'reactstrap'

const auth = new Authentication();
const clientSave = new ClientesList();

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			openselect: false,
			dataDrop: [],
			dataDrop1: [],
			checkAll: true,
		};
	}
	componentDidMount() {
		let data = JSON.parse(auth.getAuthentication('customerSelect'));
		this.setState({ dataDrop: [...data] ? [...data] : [], dataDrop1: [...data] ? [...data] : []}, () => this.getCheck()
		);
		HeaderRun();
	}
	/*=============================================
	  =            Handle Togle User Block         =
	  =============================================*/
	toggleUserblock(e) {
		e.preventDefault();
		pubsub.publish('toggleUserblock');
	}
	/*=============================================
	=            Handle LogOut Function           =
	=============================================*/
	handleLogOut = () => {
		// Auth.signout(() => {
		//   this.setState({redirect: true});
		// });
	};

	removeToken = () => {
		this.props.history.push('/')
		auth.deleteAuthentication('token')
		clientSave.deleteAuthentication('client')
		auth.deleteAuthentication("dataUser")
		auth.deleteAuthentication("customerSelect")
	}

	handleSearch = name => event => this.setState({ [name]: event.target.value }, () => this.setSearch())

	setSearch = () => {
		let haveSearch = false;
		if (this.state.search.length > 0) {
			haveSearch = true;
		}
		let all = [...this.state.dataDrop];
		let newAll = all.map(e => {
			let newE = { ...e };
			console.log("newE",newE);

			let newData2 = newE.data.map(item => {
				const nameData = item.value ? item.value.toUpperCase() : ''.toUpperCase();
				const nameNIT = item.NIT ? item.NIT.toUpperCase() : ''.toUpperCase();
				const idData = item.id ? item.id.toString().toUpperCase() : ''.toUpperCase();
				const textData = this.state.search.toUpperCase();

				if ((nameData.indexOf(textData) > -1) || (idData.indexOf(textData) > -1) || (nameNIT.indexOf(textData) > -1)) {
					item.hidden = false;
				}
				else {
					item.hidden = haveSearch ? true : false;
				}
				return item;
			});
			newE.data = newData2;
			return newE;
		});
		let finalAll = newAll.filter(item => {
			return item.data.length > 0;
		})
		this.setState({ dataDrop: finalAll })
	}

	handeInputData = selected => event => {
		this.setState({ searchValue: event.target.value })
	};

	checkGroup = (index, all, uncheck) => {
		let newData = this.state.dataDrop;
		if (all) {
			if (uncheck) {
				newData[index].check = false;
				newData[index].data.map(e => {
					e.check = false;
					return e;
				})
			}
			else {
				newData[index].check = true;
				newData[index].data.map(e => {
					e.check = true;
					return e
				})
			}
		}
		else {
			newData[index].check = !newData[index].check;
			newData[index].data.map(e => {
				e.check = newData[index].check;
				return e
			})
		}
		this.setState({ dataDrop: newData });
	}

	getCheck = () => {
		let clientes = [];
		let NIT = [];
		this.state.dataDrop.map(e => {
			e.data.map(f => {
				if (f.check) {
					clientes.push(f.id);
					NIT.push(f.NIT);
				}
				return f;
			})
			return e;
		})
		this.setState({
			openselect: false
		})
		this.props.changeProps();
		clientSave.setAuthentication(clientes, NIT);
	}

	change = () => {
		this.setState({ openselect: false })
	}

	checkClient = (index, ind) => {
		let newData = this.state.dataDrop;
		newData[index].data[ind].check = !newData[index].data[ind].check;
		if (!newData[index].data[ind].check) {
			newData[index].check = false;
		}
		this.setState({ dataDrop: newData });
	}

	checkAll = () => {
		if (!this.state.checkAll) {
			let newData = this.state.dataDrop;
			newData.map((e, index) => {
				this.checkGroup(index, true, false);
				return e;
			})
			this.setState({ checkAll: true });
		}
		else {
			let newData = this.state.dataDrop;
			newData.map((e, index) => {
				this.setState({ checkAll: false });
				this.checkGroup(index, true, true);
				return e;
			})
		}
	}

	render() {
		let { redirect, searchValue, dataDrop, checkAll } = this.state;
		if (redirect) return <Redirect to='/login' />;
		let acction
		if (searchValue === "" || searchValue === undefined) {
		} else {
			acction = <Link to={`/search/${encodeURIComponent(searchValue)}`}>
				<button className="d-none" type="submit">Submit</button>
			</Link>
		}

		return (
			<header className="topnavbar-wrapper">
				{ /* START Top Navbar */}
				<nav className="navbar topnavbar">
					{ /* START navbar header */}
					<div className="navbar-header">
						<a className="navbar-brand" href="#/">
							<div className="brand-logo">
								<img className="img-fluid" src={largeIMG} alt="App Logo" />
							</div>
							<div className="brand-logo-collapsed">
								<img className="img-fluid" src={smallIMG} alt="App Logo" />
							</div>
						</a>
					</div>
					{ /* END navbar header */}
					{ /* START Left navbar */}
					<ul className="navbar-nav mr-auto flex-row">
						<li className="nav-item">
							{ /* Button used to collapse the left sidebar. Only visible on tablet and desktops */}
							<TriggerResize>
								<ToggleState state="aside-collapsed">
									<a href=" " className="nav-link d-none d-md-block d-lg-block d-xl-block">
										<em className="fas fa-bars"></em>
									</a>
								</ToggleState>
							</TriggerResize>
							{ /* Button to show/hide the sidebar on mobile. Visible on mobile only. */}
							<ToggleState state="aside-toggled" nopersist={true}>
								<a href=" " className="nav-link sidebar-toggle d-md-none">
									<em className="fas fa-bars"></em>
								</a>
							</ToggleState>
						</li>
						{ /* START User avatar toggle */}
						<li className="nav-item d-none d-md-block">
							<a href=" " title='User' className="nav-link" onClick={this.toggleUserblock}>
								<em className="icon-user"></em>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href=" " data-search-open="">
								<em className="icon-magnifier"></em>
							</a>
						</li>
						<h2 className="nav-link" style={{ color: '#fff', fontWeight: '100' }} href=" " data-search-open="">|</h2>
						<li className="nav-item d-none d-md-block">
							<button className="nav-link" onClick={() => {
								this.setState({
									openselect: !this.state.openselect
								})
							}}>
								<em className="icon-people" style={{ cursor: 'pointer', fontSize: '15px' }} title="" >
									<i style={{ fontSize: '11px', marginLeft: '4px', fontStyle: 'normal' }}>▼</i>
									{/* Clientes */}
									<Dropdown text='' open={this.state.openselect}>
										<Dropdown.Menu >
											<div style={{ background: '#bab9bc24', width: "876px", height: "330px" }}>
												<div >
													<InputGroup style={{ width: '556px' }}>
														<Input style={{ marginLeft: '23px', marginTop: '21px', height: '29px' }} placeholder='Nombre del Cliente' onChange={this.handleSearch('search')} />
														<br></br>
														<em className="fa-2x icon-magnifier" style={{ fontSize: '23px', marginLeft: '10px', color: '#a5a0a0', marginTop: '24px' }} onClick={""}></em>
													</InputGroup>
												</div>
												<div style={{ textAlign: 'right', marginRight: '23px', marginTop: '-33px' }}>
													<Button color="danger" onClick={this.change}>x</Button>{' '}
													<Button color="success" onClick={this.getCheck}>✓</Button>{' '}
												</div>
												<div class="ui divider"></div>
												<div style={{ overflowY: "scroll", height: '230px' }}>
													<List style={{ color: 'black', fontSize: '13px', fontWeight: 'bold' }} as='ol'>
														<List.Item as='li' value=''>
															<Checkbox checked={checkAll} onChange={this.checkAll} value={""} />Marcar todos
   													</List.Item>
													</List>
													<Dropdown.Divider />
													<div >
														<List style={{ color: 'black', fontSize: '13px', fontWeight: 'bold' }} as='ol'>
															{
																dataDrop.map((e, index) => {
																	if (e.hidden) {
																		return (<></>)
																	}
																	else {
																		// let divider = <Dropdown.Divider />;
																		// if (index + 1 === dataDrop.length) {
																		// 	divider = <></>;
																		// }
																		return (
																			<div>
																				<List.Item as='li' value=''>
																					<Checkbox checked={e.check} onChange={() => this.checkGroup(index)} key={index} value={e.id} />{e.value}
																					<List.Item as='ol'>
																						{e.data.map((f, ind) => {
																							if (f.hidden) {
																								return (<></>)
																							}
																							else {
																								return (
																									<List.Item style={{ fontWeight: 'initial', fontSize: '12px' }} as='li' value=''>
																										<Checkbox checked={f.check} onChange={() => this.checkClient(index, ind)} value={f.id} />  {f.NIT} -- {f.value}
																									</List.Item>
																								)
																							}
																						})}
																					</List.Item>
																				</List.Item>
																				{index + 1 !== dataDrop.length ? <Dropdown.Divider /> : <></>}
																			</div>
																		)
																	}
																})
															}
														</List>
													</div>
												</div>
											</div>
										</Dropdown.Menu>
									</Dropdown>
								</em>
							</button>
						</li>
					</ul>
					<div style={{ width: "120px" }}>
					</div>
					<h3 style={{ fontSize: '13px', color: 'white', letterSpacing: '15px' }} title="" >
						PROCESOS INTEGRADOS
	            </h3>
					<ul className="navbar-nav flex-row">
						<li className="nav-item d-none d-md-block">
							<ToggleFullscreen className="nav-link" />
						</li>
					</ul>
					<form className="navbar-form">
						<div className="form-group">
							<input className="form-control" type="text" onChange={this.handeInputData()} placeholder="Busqueda por: DO Id, Estatus, Doc. Transporte, Aduana, Proveedor, ETD, ETA, ATA, País Destino, Placas de Vehículo, etc..." />
							<div className="main-close-especial fa fa-times navbar-form-close" /* onClick={()=> this.navigateToExactPath()} */></div>
						</div>
						{acction}
					</form>
					<p onClick={this.removeToken} className="nav-item d-none d-md-block">
						<Link to=" " title="Log Out" className="nav-link" style={{ color: '#ffffff' }} onClick={this.handleLogOut}>
							<em className="icon-logout"></em>
						</Link>
					</p>
				</nav>
			</header>);
	}
}
export default withRouter(Header);
