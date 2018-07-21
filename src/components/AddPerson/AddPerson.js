import React, {PureComponent} from 'react';

import './AddPerson.css';

class AddPerson extends PureComponent {
    state = {
        name: '',
        age: 0
    }
    
    addPersonHandler = (e) => {
        // if (this.state.name === '' || this.state.age === 0) return;
        this.props.personAdded(this.state.name, this.state.age)
        // reset UI State
        this.setState({
            name: '',
            age: 0
        })
    }

    render() {
        return (
            <div className="AddPerson">
                <input 
                    type="text" 
                    placeholder="name"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    onKeyUp={e => {
                        if (e.key === 'Enter') this.addPersonHandler()
                    }}
                />
                <input 
                    type="number" 
                    placeholder="age"
                    value={this.state.age}
                    onChange={e => this.setState({ age: e.target.value }) }
                    onKeyUp={e => {
                        if (e.key === 'Enter') this.addPersonHandler()
                    }}
                />
                <button onClick={this.addPersonHandler}>Add Person</button>
            </div>
        )
    }
}



export default AddPerson;