import React, { useEffect, useState } from "react";

function Tryout() {
  const formInfo = {
    username: "Bill123",
    password: "mypassword"
  }

  useEffect(() => {
    fetch("http://localhost:8000/message", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify(formInfo)
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
}

export default Tryout;