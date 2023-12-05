import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

 const ResponsiveTable = ({ data }) => {
   useEffect(()=>{
console.log('table:', data)
   },[data])
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Profits</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length&&data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.date}</td>
            <td>{item.profits}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;