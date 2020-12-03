import React from 'react';
import MenuProfile from "./MenuProfile";

class MyComments extends React.Component {
    render () {
        console.log('props userinsession',this.props.userInSession)
        return (
            <div className='profile'>
                <MenuProfile userInSession={this.props.userInSession}/>
                <p>Hello, this is your profile</p>
            </div>
        )
    }
}

export default MyComments;