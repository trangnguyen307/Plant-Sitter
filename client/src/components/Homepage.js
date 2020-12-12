import React from 'react';
import './Homepage.css';
import Search from './annonces/Search'
import Carousel from "react-bootstrap/Carousel";
import {BsFillStarFill} from 'react-icons/bs';


class Home extends React.Component {
    
    render () {
        return (
            <div>
            {/* SECTION RECHERCHE*/}
              <div className="presentation">
                  <div className="search-barre">
                    <Search homepage={true}/>
                  </div>
                  <div className="presentation-img">
                    <div className="phrase-accroche">
                      <h5>Partez l'esprit tranquille avec "Plant-Sitter"</h5>
                      <p>Le premier site de garde de plantes en France</p>
                    </div>
                    <div className="image">
                      <img src='../../photo1.png' alt="image couverture"/>
                    </div>
                  </div>
              </div>

              {/* SECTION CONSIGNE*/}

              <div className="consignes">
              
                <div className="pres-article">
                  <article>
                    <img src='../../photo2.png' alt="image1 consigne"/>
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
                    <p>Si vous êtes mutuellement d'accords, cliquer sur la case "réserver" du plant-sitter</p>
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
              
              <Carousel>
                <Carousel.Item className="carousel-item">
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                    />
                  <Carousel.Caption className="carousel-caption">
                    <h3>Comment entretenir ses plantes d'intérieur ?</h3>
                    <p>Un article pour vous apprendre à prendre soin de vos plantes !</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Third slide"
                    />
                  <Carousel.Caption className="carousel-caption">
                    <h3>Un article utile pour repérer les maladies de vos plantes</h3>
                    <p>Ne passer pas à côté des maladies de vos plantes</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                  <img
                  className="d-block w-100"
                  src="holder.js/800x400?text=Third slide&bg=20232a"
                  alt="Third slide"
                  />
                  <Carousel.Caption className="carousel-caption">
                  <h3>15 façons d'intégrer les plantes dans sa déco</h3>
                  <p>En manque d'inspiration ? Retrouvez nos idées originales</p>
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