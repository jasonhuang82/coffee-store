import React, { Component, PureComponent } from 'react';

import Person from '~/components/Person/Person';
import AddPerson from '~/components/AddPerson/AddPerson';
import { connect } from 'react-redux';

import { addPersonHandler, delPersonHandler } from "~/actions";

class Persons extends PureComponent {
    state = {
        persons: []
    }

    render () {
        return (
            <div>
                <button
                onClick={this.props.triggerSaga}
                >click me</button>
                <AddPerson personAdded={this.props.addPerson} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.delPerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        persons: state.persons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPerson: (name, age) => dispatch({ type: 'ADD_PERSON_ASYNC',name,age}),
        delPerson: (personID) => dispatch(delPersonHandler(personID)),
        triggerSaga: () => dispatch({ type: 'INCREMENT_ASYNC',id:5})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons)
