import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import './Search.css';
import { FaSearch  } from "react-icons/fa"


class Search extends React.Component {
    state = {
        queryAddress: '',
        queryMoving: '',
        queryStartDate:'',
        queryEndDate:'',
        redirect: false
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        console.log('queryAddress:  ', this.state.queryAddress)
        console.log('queryMoving:  ', this.state.queryMoving)
        event.preventDefault();
        this.props.updateQueryAddress && this.props.updateQueryAddress(this.state.queryAddress)
        this.props.updateQueryMoving && this.props.updateQueryMoving(this.state.queryMoving)
        this.props.updateQueryStartDate && this.props.updateQueryStartDate(this.state.queryStartDate)
        this.props.updateQueryEndDate && this.props.updateQueryEndDate(this.state.queryEndDate)
        if(this.props.homepage) 
            this.setState({redirect:true});
    }

    render () {
        if(this.state.redirect) {
            return <Redirect to={{ pathname:"/annonce", query: {
                queryAddress:this.state.queryAddress, 
                queryMoving: this.state.queryMoving ,
                queryStartDate: this.state.queryStartDate,
                queryEndDate: this.state.queryEndDate
            } }} />
        }
        return (
            <div id="search">
                <form onSubmit = {this.handleFormSubmit} className="row justify-content-center">
                    <p className="col-lg-2 col-md-2 col-xs-8 col-8">
                        <label> Adresse</label>
                        <input name = 'queryAddress' type ="text" placeholder="Adresse" value={this.state.queryAddress} onChange={this.handleChange} />
                    </p>
                    <p className="col-lg-2 col-md-2 col-xs-0 no-display">
                        <label>Déplacement</label>
                        <select name="queryMoving" value= {this.state.queryMoving} onChange={this.handleChange}>
                            <option value="">Choisir une réponse</option>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                        </select>
                    </p>
                    <p className="col-lg-3 col-md-3 col-xs-0 no-display">
                        <label>A partir du </label>
                        <input type = 'date' name='queryStartDate' value={this.state.queryStartDate} onChange={this.handleChange} />
                    </p>
                    <p className="col-lg-3 col-md-3 col-xs-0 no-display">
                        <label>Jusqu'au</label>
                        <input type = 'date' name='queryEndDate' value={this.state.queryEndDate} onChange={this.handleChange} />
                    </p>
                   
                        
                    <button className="col-lg-1 col-md-1 col-xs-2 col-2 button-search"><FaSearch /></button>
                   
                    
                </form>
            </div>
        )
    }

    
}

export default Search;