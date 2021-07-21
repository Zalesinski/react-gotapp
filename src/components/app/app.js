import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage/characterPage';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';


export default class App extends Component {
    state = {
        showRandomCharacter: true,
        error: false
    }

    

    toggleCharacter = () => {
        this.setState ((state) => {
            return {
                showRandomCharacter: !state.showRandomCharacter
            }
        });

    }

   

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomCharacter ? <RandomChar/> : null;

        return (
        <> 
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        {char}
                        <button 
                        className="btn btn-secondary"
                        onClick={this.toggleCharacter}
                        >Toggle random character</button>
                    </Col>
                </Row>
                <CharacterPage/>
            </Container>
        </>
        )
    }
};
const got = new GotService();

// got.getAllCharacters()
//     .then(res => { 
//         res.forEach(item => console.log(item.name))
//     });

// got.getCharacter(130)
//     .then(res => console.log(res));

// got.getAllHouses()
//     .then(res => { 
//         res.forEach(item => console.log(item.name))
//     });

// got.getHouse(30)
//     .then(res => console.log(res));

// got.getAllBooks()
//     .then(res => { 
//         res.forEach(item => console.log(item.name))
//     });

// got.getBook(3)
//     .then(res => console.log(res));
