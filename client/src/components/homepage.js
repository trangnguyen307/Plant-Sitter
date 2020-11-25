import React from 'react';
import axios from 'axios';
import './homepage.css';

class Home extends React.Component {
    
    render () {
        return (
            <div>
              <div className="search-barre-pres">
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
            </div>
        )
    }
}

export default Home;