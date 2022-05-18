/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import Navbar from "./Navbar";
import axios from "axios";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(r => r);
        getUserList().then(r => r);
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:8080/currentUser', {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            }
            ,withCredentials: false,
        });
        setName(response.data.userName);
    }

    const getUserList = async () => {
        const response = await axios.get('http://localhost:8080/api/listUser', {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            }
            ,withCredentials: false,
        });
        setUsers(response.data.users);
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <h1>Welcome Back: {name}</h1>
                <br />
                <table className="table is-striped is-fullwidth">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Dashboard
