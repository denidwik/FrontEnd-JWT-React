import React, {useState} from 'react'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:8080/login',
                withCredentials: false,
                data: {
                    usernameOrEmail: email,
                    password: password
                }
            }).then(response => {
                localStorage.setItem("token", response.data.accessToken);
                history.push("/dashboard");
            }).catch(error => {
                if (error.response.data.message) {
                    setMsg(error.response.data.message);
                } else if (error.response.status === 401) {
                    setMsg("email or password incorrect");
                }
            });
        } catch
            (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                                <Link to="/register">
                                    <button className="button is-warning is-fullwidth">Create Account</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
