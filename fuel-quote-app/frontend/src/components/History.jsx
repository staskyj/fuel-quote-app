import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

export default function History() {
  const [fillData, setFillData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3059/quotes/fill')
        .then(
            response => response.json()
        )
        .then(
            data => {
                setFillData(data);
        })
  }, []);

  return (
    <>
        <Stack gap={3} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
                <div><h1 style={{textAlign: "center"}}>Fuel Quote History</h1></div>
                <div style={{width: "800px"}}>
                    <Table striped bordered hover style={{margin: "auto"}}>
                        <thead>
                            <tr>
                                <th>Delivery Address</th>
                                <th>Delivery Date</th>
                                <th>Gallons Requested</th>
                                <th>Suggested Price/Gallon</th>
                                <th>Total Amount Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fillData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.address}</td>
                                    <td>{row.deliveryDate}</td>
                                    <td style={{textAlign: "right"}}>{row.gallons}</td>
                                    <td style={{textAlign: "right"}}>{row.price}</td>
                                    <td style={{textAlign: "right"}}>{row.due}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
        </Stack>
    </>
  );
}
