import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Quote() {
    const [fillData, setFillData] = useState({});
    const [putData, putQuoteData] = useState({});
    const [sp, setSP] = useState(0);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({});

    useEffect(() => {
        fetch('http://localhost:3059/quotes/fill')
            .then(
                response => response.json()
            )
            .then(
                data => {
                    console.log(data)
                    setFillData(data);
                    setCustomerInfo(data);

            })
    }, []);

    const handleSubmit = (event) => {
        // Prevents refresh on valid submit
        event.preventDefault();

        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        fetch('http://localhost:3059/quotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(putData)
          })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.error(error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerInfo({ ...customerInfo, [name]: value });

        if (name === "gallons") {
            const suggestedPrice = 1.5 || 0;
            const gallons = parseFloat(value) || 0;
            // const address = fillData[0]?.address || ""; 
            const address = "123 Main Street" || ""; 
            let bulk_buy = 0;
            let location_factor = 0;
            let isReturningCustomer = false;
            let return_discount = 0;
            
           //start calculation of the final fuel price 
            const company_profit = .1
            if (gallons > 1000){
                bulk_buy = 0.02
            }
            else{
                bulk_buy = 0.03
            }

            if(/TX/.test(address) || /Texas/.test(address)){
                location_factor = 0.02
            }
            else{
                location_factor = 0.04
            }
            
            if ( isReturningCustomer === customerInfo.length > 0){
                return_discount = -0.01
            }
            else{
                return_discount = 0
            }

            let margin = suggestedPrice * (bulk_buy + company_profit + location_factor + return_discount)
            const price = suggestedPrice + margin;
            const due = (gallons *  price).toFixed(2);
            
            putQuoteData({ ...putData, gallons, due, address, price});
        } 
    }

    const handleDateChange = (date) => {
        setDeliveryDate(date);
        setErrors((prev) => ({ ...prev, deliveryDate: null }));
        putQuoteData({ ...putData, deliveryDate: date.toISOString().split('T')[0] });
    }

    return (
        <>
            <h1>Fuel Quote Form</h1>
            {/* The noValidate attribute disables the default browser UI for forms */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='gallons'>
                    <Form.Label>Gallons Requested</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control 
                            type='number' 
                            name='gallons'
                            placeholder='Number of gallons' 
                            onChange={handleChange} 
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
              				Please select the number of gallon you want.
            			</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className='mb-3' controlId='deliveryAddress'>
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control 
                        type='text' 
                        // value={fillData[0]?.address || ""}
                        // onChange={handleChange}  
                        value={putData.address || ''}
                        readOnly
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='deliveryDate'>
                    <Form.Label>Delivery Date</Form.Label>
                        <InputGroup hasValidation>
                            <DatePicker 
                                selected={deliveryDate} 
                                onChange={handleDateChange} 
                                minDate={new Date()} 
                                dateFormat="yyyy-MM-dd" 
                                className={`form-control ${errors.deliveryDate ? "is-invalid" : ""}`}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.deliveryDate}
                            </Form.Control.Feedback>
                        </InputGroup>
                </Form.Group>
                <Form.Group className='mb-3' controlId='suggestedPrice'>
                    <Form.Label>Suggested Price</Form.Label>
                    <Form.Control 
                        type='number' 
                        value={putData.price || ''} 
                        readOnly
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='amountDue'>
                    <Form.Label>Total Amount Due</Form.Label>
                    <Form.Control 
                        type='number' 
                        value={putData.due || ''} 
                        readOnly
                    />
                </Form.Group>
                <Button 
                    type='submit' 
                    variant='outline-dark'
                >
                    Request Quote
                </Button>
            </Form>
        </>
  );
}