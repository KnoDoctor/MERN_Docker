import React, { useState, useEffect } from "react";
import { apiRequest } from "./api/api";
import "./App.css";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchData, setFetchData] = useState({});
    const [isConsoleLog, setIsConsoleLog] = useState(true);
    const [dbConnection, setDbConnection] = useState("dev");

    useEffect(() => {
        let fetchObject;

        if (dbConnection === "local") {
            //Set Fetch Object
            fetchObject = {
                proxyUrl: "",
                method: "GET",
                url: "http://localhost:3001/users",
            };
        } else if (dbConnection === "dev") {
            //Set Dev Fetch Object
            fetchObject = {
                proxyUrl: "",
                method: "GET",
                url: "http://142.93.144.130:3001/users",
            };
        }

        apiRequest(fetchObject).then((res) => {
            setFetchData(res);
            setIsLoading(false);
        });
    }, []);

    function toggleDb() {
        //Toggle DB
        if (dbConnection === "local") {
            setDbConnection("dev");
        } else if (dbConnection === "dev") {
            setDbConnection("local");
        }
    }

    function refreshData() {
        //Fetch Fresh Data
        let fetchObject;

        if (dbConnection === "dev") {
            //Set Fetch Object
            fetchObject = {
                proxyUrl: "",
                method: "GET",
                url: "http://localhost:3001/users",
            };
        } else if (dbConnection === "local") {
            //Set Dev Fetch Object
            fetchObject = {
                proxyUrl: "",
                method: "GET",
                url: "http://142.93.144.130:3001/users",
            };
        }

        apiRequest(fetchObject).then((res) => {
            setFetchData(res);
            setIsLoading(false);
        });
    }

    if (isConsoleLog) {
        console.log(dbConnection);
    }
    return (
        <div>
            {isLoading ? (
                "loading"
            ) : (
                <div
                    style={{
                        maxWidth: "992px",
                        margin: "auto",
                        textAlign: "center",
                    }}
                >
                    <h1>Hello World!!!!</h1>
                    <ol className="theList" style={{ textAlign: "left" }}>
                        {fetchData.users.map(function (user, index) {
                            return (
                                <li key={index}>
                                    {user.name} - {user._id}
                                </li>
                            );
                        })}
                    </ol>
                    <button
                        onClick={function () {
                            toggleDb();
                            refreshData();
                        }}
                    >
                        Current DB: {dbConnection}
                    </button>
                </div>
            )}
        </div>
    );
}

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: "",
//             allname: [],
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//     componentDidMount() {
//         this.getAllUsers();
//     }
//     async getAllUsers() {
//         try {
//             const getResponse = await Axios.get(`http://localhost:3001/users`);
//             console.log(getResponse);
//             this.setState({ allname: getResponse.data.users });
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     async handleClick() {
//         console.log(this.state.user);
//         if (this.state.user !== "") {
//             var userObj = {
//                 name: this.state.user,
//             };
//             try {
//                 const response = await Axios.post(
//                     `http://localhost:3001/users`,
//                     userObj
//                 );
//                 console.log(response);
//             } catch (error) {
//                 console.log(error);
//             }
//             this.getAllUsers();
//         }
//     }
//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <img src={logo} className="App-logo" alt="logo" />
//                     <h1 className="App-title">Welcome to React</h1>
//                 </header>
//                 <p className="App-intro">
//                     To get started, edit <code>src/App.js</code> and save to
//                     reload.
//                 </p>
//                 <input
//                     type="text"
//                     value={this.state.user}
//                     onChange={(e) => this.setState({ user: e.target.value })}
//                 />
//                 <button onClick={this.handleClick}> Submit </button>
//                 <div className="theList1">
//                     Available user
//                     <ol className="theList">
//                         {this.state.allname.map(function (user, index) {
//                             return <li key={index}>{user.name}</li>;
//                         })}
//                     </ol>
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;
