import { Outlet, Link } from "react-router-dom";
import portrait from "./img/portrait.jpg"

const Structure = () => {
  return (
     <>
      <nav style={{backgroundColor: 'lightblue', flexDirection: "column", float: 'left', marginRight: '20px'}}>
      <h1 style={{justifyContent: 'center', display: 'flex',}}>Martin Løvborg</h1>
      <hr style={{margin: '10px'}}></hr>
      <img src={portrait} alt="Portrait" className="portrait" width={200} height={262}/>
      <hr style={{margin: '10px'}}></hr>
      <ul>
          <li>
            <button style={{margin: '10px'}}><Link to="/">Home</Link></button>
          </li>
          <li>
            <button style={{margin: '10px'}}><Link to="/skills">Skills</Link></button>
          </li>
          <li>
            <button style={{margin: '10px'}}><Link to="/Completed">Completed</Link></button>
          </li>
      </ul> 
      <hr style={{margin: '10px'}}></hr>
      <p style={{textAlign: 'center'}}><a href="https://github.com/martinloevborg">Github</a></p>
      <p style={{textAlign: 'center'}}><a href="https://github.com/martinloevborg/martinloevborg.github.io">Source code</a></p>
      <p style={{textAlign: 'center'}}><a href="https://www.linkedin.com/in/martin-l%C3%B8vborg-62528a252/">LinkedIn</a></p>
      </nav>
      <Outlet />
    </> 
  )
};

export default Structure;