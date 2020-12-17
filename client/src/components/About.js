import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {
  return (
       <div className="about">
           <div className="container about-section">
               <div className="row justify-content-center">
                   <div className="col-lg-7">
                        <h1>Qui somme nous?</h1>
                        <p>Plant-sitter est une application concrète, simple d'utilisation, qui vous permet de partir en vacances l'esprit léger : vos plantes seront bien soignées.</p>
                        <p>Créée en 2020 par Trang Nguyen et Claire Lacanal, cette application a permis la rencontre de membres passionnés.</p>
                        <p> Vous avez besoin d'une solution alternative aux amis et à la famille pour faire garder vos plantes ? Pas de panique ! Plant-sitter, présent dans toute la France, est là pour faire le lien entre vous et les bénévoles. Pour cela, rien de plus simple ! Rendez-vous sur la page d'accueil de l'application et créez-vous un compte. Vous aurez, ensuite, accès aux profils des plant-sitter et pourrez filter votre recherche en fonction de votre localisation géographique et de vos dates de congés. Vous trouverez des personnes près de chez vous, disponibles et à l'écoute, proposant, pour certains, leurs services à domicile. Qu'est-ce que vous attendez ? N'hésitez plus !</p>
                        <div className="last-section">
                            <Link to="/signup">Inscrivez-vous ici</Link>
                        </div>
                        
                   </div>
               </div>
               
           </div>
       </div>
      )
}

export default About;