import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import FormModel from '../models/form';
import Fade from 'react-reveal/Fade';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import 'react-datetime/css/react-datetime.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Services from '../componets/Services';
import axios from 'axios';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './style.scss';

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.pond = React.createRef();
    this.state = {
      imaAvatar: 'https://fsposeidon.blob.core.windows.net/files/user-default-grey.png',
      Form: FormModel,
      Comment: {
        name:'',
        post:'',
        title:'',
      },
      selects: {
        'COMMENTS': [],
        'COMMENT-TYPES': [],
      },
      Inputs: ''
    };
  }

  componentDidMount = () => {
    if (this.props.edit){
      this.setState({
        Comment:this.props.commet,
        isEdit:true
      },()=>this.buildForm())  
    } 
    else{
      this.buildForm();
    }
    
  }

  componentWillReceiveProps = (nextProps) => {
    this.buildForm()
  }



  handleChange = name => event => {
    let { Comment } = this.state;
    Comment[name] = event.target.value;
    this.setState({ Comment }, () => {
      this.buildForm();
    });
  }

  buildForm = () => {
    const { Comment, selects, Form } = this.state;
    var newComment = Comment;
    var newSelects = selects;
    let Inputs = Form.map((e, i) => {
      if (e.type === 'Input') return (
        <div className={e.class} key={e.id}>
          <Fade left opposite> <span id={e.label} style={e.style}><label>{e.label} {e.required === true ? <span>*</span> : ''}</label></span></Fade>
          <Input
            id={e.id}
            required
            type={e.datatype}
            placeholder={e.placeHolder}
            name={e.id}
            value={Comment[e.id]}
            maxlength={e.maxlength}
            minlength={e.minlength}
            onChange={this.handleChange(e.id)}
            max={e.max} />
          <Fade left opposite><label style={e.style} >{e.error}</label></Fade>
        </div>
      );
      else if (e.type === 'textarea') return (
        <div className={e.class} key={e.id}>
          <label >{e.label}</label>
          <Input
            required
            type="textarea"
            name={e.id}
            id={e.id}
            value={Comment[e.id]}
            onChange={this.handleChange(e.id)}
          >
          </Input>
        </div>
      );
    });
    this.setState({
      Inputs
    });
  }
  CreateNewComment = evt => {
    evt.preventDefault();
    let { Comment, id, imaAvatar } = this.state;
    axios.post(`${Services.CREATE_POST.path}`, Comment).then(response => {
      this.props.onError({
        error: {
          message: 'POST Added correct!',
          open: true,
          type: 'success'
        }
      },()=>{

      });
      this.props.getData();
      this.props.toggle()
      
    }).catch(error => {
      console.warn('THE ERROR ==>',error.response.data);
      this.props.onError({
        error: {
          message: error.response.data.message,
          open: true,
          type: 'error'
        }
      });
    });
  }

  editNewComment = evt => {
    evt.preventDefault();
    let { Comment} = this.state;
    axios.put(`${Services.EDIT_POST.path}/${Comment.id}`, Comment).then(response => {
      this.props.onError({
        error: {
          message: 'POST edit correct!',
          open: true,
          type: 'admin'
        }
      },()=>{
      });
      this.setState({
        isEdit:false
      },()=>{
        this.props.getData();
        this.props.toggle()
      })
    }).catch(error => {
      console.warn('THE ERROR ==>'.error);
      this.props.onError({
        error: {
          message: 'POST Error!',
          open: true,
          type: 'error'
        }
      });
    });
  }

  updateImg = (img, str) => {
    let { Comment } = this.state;
    Comment[img] = str
    this.setState({ Comment, imaAvatar: str });
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="row col-6" style={{ width: '100%', marginBottom: '23px' }}>
            <div style={{ marginLeft: '48px' }}>
              <FilePond
                allowFileEncode={true}
                labelIdle="IMAGEN"
                ref={this.pond}
                labelFileWaitingForSize={false}
                styleButtonRemoveItemPosition="right"
                labelButtonRetryItemLoad={false}
                onupdatefiles={(fileItems) => {
                  if (fileItems.length > 0) {
                    if (fileItems[0].file.type === 'image/jpeg' || fileItems[0].file.type === 'image/png' || fileItems[0].file.type === 'image/jpg') {
                      if (fileItems[0].file.size < 1000000) {
                        var reader = new FileReader();
                        reader.readAsDataURL(fileItems[0].file);
                        reader.onload = () => {
                          this.updateImg('img', reader.result);
                        };
                      }
                      else {
                        this.pond.current.removeFiles();
                        this.updateImg('img', 'https://fsposeidon.blob.core.windows.net/files/user-default-grey.png');
                        this.props.onError({
                          error: {
                            message: 'Excede el tamaño maximo permitido!',
                            open: true,
                            type: 'error'
                          }
                        });
                      }
                    }
                    else {
                      this.pond.current.removeFiles();
                      this.updateImg('img', 'https://fsposeidon.blob.core.windows.net/files/user-default-grey.png');
                      this.props.onError({
                        error: {
                          message: 'Tipo de archivo no soportado!',
                          open: true,
                          type: 'error'
                        }
                      });
                    }
                  }
                  else {
                    this.pond.current.removeFiles();
                    this.updateImg('img', 'https://fsposeidon.blob.core.windows.net/files/user-default-grey.png');
                  }
                }}
              >
              </FilePond>
            </div>
            <img alt="" src={this.state.imaAvatar} width="117" height="117" className="circule" />
            <div className="col-md-10">
              <div className="row">
                {this.state.CreateFormData}
              </div>
            </div>
          </div>
          {this.state.Inputs}
        </div>
        <div className="row">
          <div className="col-12">
            <hr></hr>
          </div>
          <div className="col-md-6 col-lg-8 col-sm-12"></div>
          <div className="col-md-3 col-lg-1 col-sm-6">
          {this.state.isEdit ? 
           <Button variant="contained" color="primary" className="button" onClick={this.editNewComment} size="lg">
            Complete Edition
             </Button> : 
                <Button variant="contained" color="primary" className="button" onClick={this.CreateNewComment} size="lg">
                Save and complete
                  </Button>
            }
          </div>
        </div>
      </>
    );
  }
}

export default Tracking;
