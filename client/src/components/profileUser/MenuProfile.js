import React from 'react';
import {Link} from 'react-router-dom';
import './ProfileUser.css'

class MenuProfile extends React.Component {
    render() {
        return (
            <div id="menu">
                {/*<p>Hello</p>*/}
                {this.props.userInSession && <Link to={`/profile/myProfile/${this.props.userInSession._id}`}>Je consulte mon profile</Link>}
                {this.props.userInSession && <Link to={`/profile/myProfile/${this.props.userInSession._id}/messages`}>Je consulte mes messages</Link>}
                {this.props.userInSession && <Link to={`/profile/myProfile/${this.props.userInSession._id}/comments`}>Je consulte mes comments</Link>} 
            </div>
        )
    }
}

export default MenuProfile;