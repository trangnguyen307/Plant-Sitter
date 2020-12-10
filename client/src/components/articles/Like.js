import React from 'react';

class LikeButton extends React.Component {
    state = {
        likes: 0,
        liked: false
    };

    addLike = () => {
        let count;
        if(!this.state.liked) {
            count = this.state.likes +1;
        } else {
            count = this.state.likes -1;
        }
        this.setState({likes: count, liked: !this.state.liked})
    }
    render() {
          return (
              <div>
                <button onClick={this.addLike}>👍</button>
                <span>{this.state.likes}</span>
              </div>
           
          )
      }
}

export default LikeButton;