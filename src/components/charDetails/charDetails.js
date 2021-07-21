import React, {Component} from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './charDetails.css';
export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

    onCharLoaded = (char) => {
        this.setState({char,
        loading: false,
        error: false
    });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateCharacter() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError);

    }

    render() {
        const {char, loading, error} = this.state;
        if (!char && error) {
            return <ErrorMessage/>
        } else 
        if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }

        
        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        } 
        return (
            <div className="char-details rounded">
                    <View char={char}/>
                </div>
        )
       
    
}

}
const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
}