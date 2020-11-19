import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    state = { listOfAnnonce: [] }

    getAllAnnonces = () =>{
      axios.get(`http://localhost:5000/annonce`)
        .then(responseFromApi => {
          this.setState({
            listOfAnnonce: responseFromApi.data
          })
        })
        .catch(err => console.log('Error while fetching projects', err))
    }
  
    componentDidMount() {
      this.getAllAnnonces();
    }
    
    render () {
        return (
            <div>
                <ul>
                {this.state.listOfAnnonce.map(annonce => (
                    <li key={annonce._id}>
                        {annonce.content}
                    </li>
                ))}
                </ul>
                
            </div>
        )
    }
}

export default Home;