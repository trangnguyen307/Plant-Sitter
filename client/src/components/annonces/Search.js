import React from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// import {Link, Redirect} from 'react-router-dom'


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
            <div>
                <form onSubmit = {this.handleFormSubmit}>
                    <input name = 'queryAddress' type ="text" placeholder="Adresse" value={this.state.queryAddress} onChange={this.handleChange} />
                    <select name="queryMoving" value= {this.state.queryMoving} onChange={this.handleChange}>
                        <option value="">--Déplacement--</option>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                    <label>
                        De:
                        <input type = 'date' name='queryStartDate' value={this.state.queryStartDate} onChange={this.handleChange} />
                    </label>
                    <label>
                        A:
                        <input type = 'date' name='queryEndDate' value={this.state.queryEndDate} onChange={this.handleChange} />
                    </label>
                    <button>Chercher</button>
                </form>
            </div>
        )
    }

    
}

export default Search;