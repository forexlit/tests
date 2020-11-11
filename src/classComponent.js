import React, { Component } from "react";

export default class ClassComponent extends Component {
  componentDidMount() {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => res.json())
      .then(result => {
        this.setState({ employees: result.data });
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      inputText: ""
    };
  }

  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
    this.updateNewState(this.state.inputText);
  };

  updateNewState = fieldInput => {
    const filteredList = this.state.employees.filter(empl => {
      return (
        empl.employee_name.toLowerCase().indexOf(fieldInput.toLowerCase()) != -1
      );
    });
    this.setState({
      employees: filteredList
    });
  };

  render() {
    return (
      <>
        {this.state.inputText}
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.inputText}
        />
        <div>
          {this.state.employees.map(empl => (
            <div>{empl.employee_name}</div>
          ))}
        </div>
      </>
    );
  }
}
