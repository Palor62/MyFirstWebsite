import skill from "./img/skill.png"

const Skills = () => {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", margin: '20px', backgroundColor: 'lightblue'}}>
      <img src={skill} alt="Skill" className="skill" style={{margin: '20x', maxHeight: '50%', height: 'auto', maxWidth: '50%', width: 'auto'}}/> 
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "row"}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", margin: '40px'}}>
          <h1>Java★★★</h1>
          <h1>Python★★★</h1>
          <h1>Git★★</h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", margin: '40px'}}>
          <h1>HTML★★★</h1>
          <h1>Javascript★★★</h1>
          <h1>CSS★★</h1>
          <h1>Programming★★★</h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", margin: '40px'}}>
          <h1>Danish★★★</h1>
          <h1>English★★★</h1>
          <h1>Scrum★★</h1>
        </div>
      </div>
    </div>
  };
  
  export default Skills;