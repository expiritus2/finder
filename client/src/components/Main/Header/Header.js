import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {

    renderUserData() {
        const {auth} = this.props;
        switch (auth) {
            case null:
                return;
            case false:
                return (
                    <div>
                        <li><a href="/auth/google">Sign in With Google</a></li>
                    </div>
                );
            default:
                return [
                    <li key='1'>Hello, <Link to={auth ? "/personal-area" : "/"}>{auth.displayName}</Link></li>,
                    <li key='2'><a href="/api/logout">Logout</a></li>
                ]
        }
    }

    render() {
        return (
            <div>
                {this.renderUserData()}
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {auth}
}

export default connect(mapStateToProps)(Header);