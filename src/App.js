import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  th {
    text-align: left;
    padding: 10px;
    background: #f5f5f5;
    cursor: pointer;
    :hover {
      background: #ddd;
    }
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
  const [searchValue, updateSearch] = useState("");
  const [nameSort, updateNameSort] = useState(false);
  const [idSort, updateIdSort] = useState(false);
  const [salarySort, updateSalarySort] = useState(false);
  const [ageSort, updateAgeSort] = useState(false);

  //Fetching data from API
  useEffect(() => {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => res.json())
      .then(result => {
        updateEmployees(result.data);
      });
  }, []);

  //Dynamically changing page title
  useEffect(() => {
    document.title = !employees.length
      ? "Loading..."
      : `Total: ${employees.length}`;
    console.log(employees);
  }, [employees]);

  const filteredEmpl = useMemo(() => {
    const filterEmployees = empl =>
      empl.employee_name.toLowerCase().includes(searchValue.toLowerCase());

    //If nothing is typed in search return initial array
    if (!searchValue) {
      return employees;
    } else {
      return employees.filter(filterEmployees);
    }
  }, [employees, searchValue, nameSort, idSort, salarySort, ageSort]);

  //Get value from search input field
  const handleSearch = e => {
    updateSearch(e.target.value);
  };

  //Sort by id
  const idSorting = () => {
    updateIdSort(!idSort);

    const idSortingAsc = (a, b) => (a.id > b.id ? 1 : -1);
    const idSortingDsc = (a, b) => (a.id > b.id ? -1 : 1);

    !idSort ? employees.sort(idSortingDsc) : employees.sort(idSortingAsc);
  };

  //Sort by name
  const nameSorting = () => {
    updateNameSort(!nameSort);

    const nameSortingAsc = (a, b) =>
      a.employee_name > b.employee_name ? 1 : -1;
    const nameSortingDsc = (a, b) =>
      a.employee_name > b.employee_name ? -1 : 1;

    !nameSort ? employees.sort(nameSortingAsc) : employees.sort(nameSortingDsc);
  };

  //Sort by salary
  const salarySorting = () => {
    updateSalarySort(!salarySort);

    const salarySortingAsc = (a, b) =>
      a.employee_salary > b.employee_salary ? 1 : -1;
    const salarySortingDsc = (a, b) =>
      a.employee_salary > b.employee_salary ? -1 : 1;

    !salarySort
      ? employees.sort(salarySortingAsc)
      : employees.sort(salarySortingDsc);
  };

  //Sort by age
  const ageSorting = () => {
    updateAgeSort(!ageSort);
    const ageSortingAsc = (a, b) => (a.employee_age > b.employee_age ? 1 : -1);
    const ageSortingDsc = (a, b) => (a.employee_age > b.employee_age ? -1 : 1);

    !ageSort ? employees.sort(ageSortingAsc) : employees.sort(ageSortingDsc);
  };

  return (
    <Container>
      <TopHeader>
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

      {employees ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th onClick={idSorting}>id</th>
              <th onClick={nameSorting}>Employee name</th>
              <th onClick={salarySorting}>Employee salary</th>
              <th onClick={ageSorting}>Employee age</th>
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
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default App;
