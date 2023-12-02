import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import SidNav from './sideNav';
import "./dashboard.css";
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <Container fluid style={{ minHeight: '100vh' }}>
    <Row style={{ minHeight: '100vh' }}>
      {/* First Column */}
      <div style={{border:'1px solid'}} className={` custom-col ${isMinimized ? 'minimized' : ''}`}>
        <Button variant="secondary" onClick={handleToggleMinimize}>
          {isMinimized ? 'Expand' : 'Minimize'}
        </Button>
        <SidNav minimized={isMinimized}/>
      </div>

      {/* Second Column */}
      <Col  className="bg-light custom-col-scroll" style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      
        <Outlet/>
      </Col>
    </Row>
  </Container>
  );
};

export default Dashboard;
