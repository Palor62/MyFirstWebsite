import about from "./img/about.jpg"

const Home = () => {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", margin: '20px', backgroundColor: 'lightblue'}}>
      <img src={about} alt="About" className="about" width={700} height={250} style={{margin: '20px'}}/>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
      <h3>Interested in front-end web development</h3>
      <h3>Can work on my own </h3>
      <h3>Can also work in teams</h3>
      <h1>My education</h1>
      <h3>2019-2022: bachelor degree in software engineering</h3>
      <h3>2022-now: master degree in software engineering (expected to finish in summer 2024)</h3>
      </div>
    </div> 
  };
  
  export default Home;