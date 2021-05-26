import React, { useState } from 'react';
import Icons from './components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Card, CardBody, Container, Button, Col, Row} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
const itemArray= new Array(9).fill("empty");

const App = () =>  {

  const [isCross, setIsCross] = useState(false)
  const [winMessage, setWinMessage] = useState("");
   
  const reloadGame = () => {
    setIsCross(false)
    setWinMessage("")
    itemArray.fill("empty",0,9)
  }
  const checkIsWinner = () =>{


    for(var i=0;i<9;i+=3)
    {
      if(itemArray[i] === itemArray[i+1] && itemArray[i] === itemArray[i+2] && itemArray[i] !== "empty")
      {
        setWinMessage(`${itemArray[i]} wins`)
      }
    }
    for(i=0;i<3;i++)
    {
      if(itemArray[i] === itemArray[i+3] && itemArray[i] === itemArray[i+6] && itemArray[i] !== "empty")
      {
        setWinMessage(`${itemArray[i]} wins`)
      }
    }
    if(itemArray[0] === itemArray[4] && itemArray[0] === itemArray[8] && itemArray[0] !== "empty")
    {
      setWinMessage(`${itemArray[0]} wins`)
    }
    if(itemArray[2] === itemArray[4] && itemArray[2] === itemArray[6] && itemArray[2] !== "empty")
    {
      setWinMessage(`${itemArray[2]} wins`)
    }
  }
  const ChangeItem = itemNumber =>{
    if(winMessage){
      return toast(winMessage, {type : "success"})
    }
    if(itemArray[itemNumber]==="empty"){
      itemArray[itemNumber] = isCross ? "cross" : "circle"
      setIsCross(!isCross);
    }
    else{
      return toast("already filled", {type: "error"})
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center"/>
      <Row>
        <Col md={6} className="offset-md-3">
        {winMessage ? (
          <div className="mb-2 mt-2">
            <h1 className="text-success text-uppercase text-center">
              {winMessage}
            </h1>
            <Button color="success" block onClick={reloadGame}>
            Reload the Game</Button>
          </div>
        ) : (
          <h1 className="text-center text-warning">
            {isCross ? "Cross" : "Circle"} turns
          </h1>
        ) }  
        <div className="grid">
            {itemArray.map( (item, index) => (
              <Card onClick= { () => ChangeItem(index) }>
                <CardBody className="box">
                  <Icons name={item}/>
                </CardBody>
              </Card>
            ) )}
          </div>
        </Col>
      </Row>
      
    </Container>
  );
}

export default App;