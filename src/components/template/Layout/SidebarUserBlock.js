import React, { Component } from 'react';
import pubsub from 'pubsub-js';
import { Collapse } from 'reactstrap';

class SidebarUserBlock extends Component {

    state = {
        userBlockCollapse: false,
        data_user: this.props.User.SideBarConfig.user
    }

    componentDidMount() {
        this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
            this.setState({
                userBlockCollapse: !this.state.userBlockCollapse
            });
        });
    }

    componentWillUnmount() {
        pubsub.unsubscribe(this.pubsub_token);
    }

    render() {
        // let { data_user } = this.state;
        // let RolHandler = { 1: 'Administrator', 2: 'Sales Person', 3: 'Sales Manager', 4: 'Viewer'};
        return (
            <Collapse id="user-block" isOpen={ this.state.userBlockCollapse }>
                <div>
                    <div className="item user-block">
                       {/* User picture */}
                       <div className="user-block-picture">
                          <div className="user-block-status">
                             <img className="img-thumbnail rounded-circle" src="https://fsposeidon.blob.core.windows.net/files/user-default-grey.png" alt="Avatar" width="60" height="60" />
                             <div className="circle bg-success circle-lg"></div>
                          </div>
                       </div>
                       {/* Name and Job */}
                       <div className="user-block-info">
                          {/* <span className="user-block-name">Hello, {data_user.UserName}</span> */}
                          {/* <span className="user-block-role">{RolHandler[data_user.RoleId]}</span> */}
                       </div>
                    </div>
                </div>
            </Collapse>
        )
    }
}

export default SidebarUserBlock;
