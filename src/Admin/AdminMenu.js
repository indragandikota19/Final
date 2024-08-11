import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import"./Login.css";
export default function AdminMenu() {
    const [lists, setLists] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    const result = await axios.get("http://localhost:8080/lists");
    setLists(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/list/${id}`);
    loadLists();
  };

  return (
    <div className="Admenu">
        
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              
            </tr>
          </thead>
          <tbody>
            {lists.map((list, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                
                <td>{list.name}</td>
                <td>{list.price}</td>
                
                <td>
                 
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editmenu/${list.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(list.id)}
                  >
                    Delete
                  </button>
                </td>
                  
              </tr>
            ))}
            
            
          </tbody>
        </table>
        <a href="/dashboard" className="btn btn-success">Back</a>
      </div>
    </div>
  );
}