import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClassComponent from "./classComponent";

const Container = styled.div`
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  th {
    text-align: left;
    padding: 10px;
    background: #f5f5f5;
  }
  td {
    border-bottom: 1px solid #f5f5f5;
    padding: 5px;
  }
`;
const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  input {
    width: 400px;
    padding: 10px;
  }
`;

function App() {
  const [employees, updateEmployees] = useState([]);

  if (employees == 0) {
    document.title = "Loading...";
  }

  useEffect(() => {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => res.json())
      .then(result => {
        updateEmployees(result.data);
        document.title = `Total: ${result.data.length} `;
      });
  }, []);

  const [searchValue, updateSearch] = useState("");

  const handleSearch = e => {
    updateSearch(e.target.value);
  };

  const filteredEmpl = employees.filter(empl => {
    return empl.employee_name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <Container>
      <TopHeader>
        <div></div>
        <div>
          Total employees: <strong>{employees.length}</strong> Filtered
          employees: <strong>{filteredEmpl.length}</strong>
        </div>
        <div>
          <input
            type="text"
            onChange={handleSearch}
            value={searchValue}
            placeholder="search"
          />
        </div>
      </TopHeader>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Employee name</th>
            <th>Employee salary</th>
            <th>Employee age</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmpl.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_salary}</td>
              <td>{employee.employee_age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default App;
