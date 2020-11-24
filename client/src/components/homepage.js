import React from 'react';
import axios from 'axios';
import './homepage.css';

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
              <div className="search-barre-pres">
                <form name="formbarre"> {/* faire un form comme le signup ?? */}
                  <input type="text" name="barre" id="barre" value= "recherche..." />
                  <input type="button" value="start" />
                </form>
              </div>
              <div className="presentation">
              <div className="phrase-accroche">
                <h3>Le premier site de Plant-Sitter Français !</h3>
              </div>
              </div>
              <div className="consignes">
                <article>
                  <p>consigne 1</p>
                </article>
                <article>
                  <p>consigne 2</p>
                </article>
                <article>
                  <p>consigne 3</p>
                </article>
              </div>
              <div>
                <ul>
                {this.state.listOfAnnonce.map(annonce => (
                    <li key={annonce._id}>
                        {annonce.content}
                    </li>
                ))}
                </ul>
              </div>
            </div>
        )
    }
}

export default Home;