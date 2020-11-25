import React from 'react'
// import {Link, Redirect} from 'react-router-dom'


class Search extends React.Component {
    state = {
        queryAddress: '',
        queryMoving: '',
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
        this.props.updateQueryAddress(this.state.queryAddress)
        this.props.updateQueryMoving(this.state.queryMoving)
        this.setState({redirect:true})
    }

    render () {
        return (
            <div>
                <form onSubmit = {this.handleFormSubmit}>
                    <input name = 'queryAddress' type ="text" placeholder="Adresse" value={this.state.queryAddress} onChange={this.handleChange} />
                    <select name="queryMoving" value= {this.state.queryMoving} onChange={this.handleChange}>
                        <option value="">--Déplacement--</option>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                    <button>Chercher</button>
                </form>
            </div>
        )
    }

    
}

export default Search;