import React from 'react';
import './Homepage.css';
import {Link} from 'react-router-dom'
import Search from './annonces/Search'
import Carousel from "react-bootstrap/Carousel";
import {BsFillStarFill} from 'react-icons/bs';
import service from './auth/auth-service';


class Home extends React.Component {

    state = {
      listOfArticles: []

    }
    getAllArticles = () =>{
      service.get(`/article`)
      .then(responseFromApi => {
          this.setState({
              listOfArticles: responseFromApi.data
          })
      })
      .catch(err => console.log('Error while fetching projects', err))
    }
    componentDidMount () {
      this.getAllArticles();
    }
    
    render () {
        return (
            <div>
            {/* SECTION RECHERCHE*/}
                <div className="presentation ">
                  <div className="row justify-content-center">
                    <div className="search-barre col-lg-7">
                      <Search homepage={true}/>
                    </div>
                  </div>
                  
                  
                  <div className="phrase-accroche">
                    <h5>Partez l'esprit tranquille avec "Plant-Sitter"</h5>
                    <p>Le premier site de garde de plantes en France</p>
                   </div>
            
                  
                </div>

              {/* SECTION CONSIGNE*/}

              <div className="consignes">
              
                <div className="pres-article">
                  <article>
                    <img src={'../../photo2.png'} alt="image1 consigne"/>
                  </article>
                  <div className="paragraphe">
                    <p>Trouvez un plant-sitter, près de chez vous, disponible pendant vos vacances</p>
                  </div>
                </div>
                  
                <div className="pres-article">
                  <article>
                    <img src='../../photo3.png' alt="image2 consigne"/>
                  </article>
                  <div className="paragraphe">
                    <p>Faites connaissance et échangez via notre service de messagerie </p>
                  </div>
                </div>

                <div className="pres-article">
                  <article>
                    <img src='../../photo4.png' alt="image3 consigne"/>
                  </article>
                  <div className="paragraphe">
                    <p>Ramenez vos plantes chez le plant-sitter ou confiez-lui vos clés si vous avez choisi l'option "Déplacement"</p>
                  </div>
                </div>
              
              </div>

              {/* SECTION CAROUSSEL articles*/}
              
              <Carousel className="carousel">
                <Carousel.Item className="carousel-item">
                  <Link to={`/article/${this.state.listOfArticles[0]?._id}`}>
                    <img
                    className="d-block w-100"
                    src={this.state.listOfArticles[0]?.imageUrl}
                    alt="Loading"
                    />
                  </Link>
                  <Carousel.Caption className="carousel-caption">
                    <h3>{this.state.listOfArticles[0]?.title}</h3>
                    <p>{this.state.listOfArticles[0]?.intro}</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                  <Link to={`/article/${this.state.listOfArticles[1]?._id}`}>
                    <img
                    className="d-block w-100"
                    src={this.state.listOfArticles[1]?.imageUrl}
                    alt="Loading"
                    />
                  </Link>
                  <Carousel.Caption className="carousel-caption">
                    <h3>{this.state.listOfArticles[1]?.title}</h3>
                    <p>{this.state.listOfArticles[1]?.intro}</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                  <Link to={`/article/${this.state.listOfArticles[2]?._id}`}>
                  <img
                  className="d-block w-100"
                  src={this.state.listOfArticles[2]?.imageUrl}
                  alt="Loading"
                  />
                  </Link>
                  <Carousel.Caption className="carousel-caption">
                  <h3>{this.state.listOfArticles[2]?.title}</h3>
                  <p>{this.state.listOfArticles[2]?.intro}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

              {/* SECTION AVIS*/}
              <div className="section-avis">
                <h3>Des utilisateurs convaincus</h3>
                <div className="container-avis">
                <div className="avis">
                  <div className="stars">
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                  </div>
                  <p>C'est exactement ce que j'attendais. Application très simple d'utilisation, je ne peux plus m'en passer ! Je suis rassurée de laisser mes plantes à des gens bienveillants et passionnés ! </p>
                  <p>Cécile</p>
                </div>
                <div className="avis">
                  <div className="stars">
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                  </div>
                  <p>Cette appli m'a été recommandée par une collègue, alors que j'avais tenté à plusieurs reprises de trouver une solution pour la garde de mes plantes. Vous serez en contact avec des gens sympas, toujours prêts à aider. Je recommande vivement.</p> 
                  <p>Juliette</p>     
                </div>
                <div className="avis">
                  <div className="stars">
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                    <BsFillStarFill/>
                  </div>
                  <p>Plant-Sitter est bien plus qu'une simple application. C'est juste incroyable. J'étais une personne très stressée à l'idée de quitter mes plantes pendant mes vacances. Je suis plus détendue maintenant. MERCI Plant-Sitter.</p>
                  <p>Elise</p>
                </div>
                </div>
              </div>
            
            </div>

              
            
        )
    }
}

export default Home;