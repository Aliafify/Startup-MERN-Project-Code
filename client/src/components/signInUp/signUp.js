// Import necessary components and styles
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from '../../assests/crypto-login-image.png';
import './LogIn.css'; // Import custom CSS for styling
import { serializeFormData } from '../generalFunc';
import { Register_Admin } from '../../actions/signin-up';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

function SignUp({ setSign,savedAffilate }) {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState(null)
  const [AFF_CODE,setAFF_CODE] = useState(null);

  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    try {
      e.preventDefault();
      if (password1 !== password2) {
        return setMessage('password does not match')
      }

      const userData = { name, email, password: password1, countryCode, phone,affilationCode:AFF_CODE };
      dispatch(Register_Admin(userData)).then(res => {
        if (res.status === 200) {
          setMessage(res.data)
        }
        else {
          setMessage(res.data)
        }
      })
      // console.log(userData)
      console.log(userData)
    } catch (e) {
      console.log(e.message);
      setMessage('Error: Server Error, try again later!')
    }
    // Handle signup logic here (e.g., send signup request)
  };

  // Sample list of country codes (you can replace it with your own)
  const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    // Add more country codes as needed
  ];


  // Affilation Part 
  useEffect(()=>{
  console.log(savedAffilate)

    const affilationCode = localStorage.getItem('AFFILATION_CODE');
    console.log(affilationCode)
    if(affilationCode && affilationCode!== null||''){
      setAFF_CODE(affilationCode);
    }
    else{
      setAFF_CODE(savedAffilate)
    }
  },[])
  return (
    <Container>
      <Row>
        {/* Image Column */}
        <Col md={8} xs={12}>
          <img
            src={Image}
            alt="Crypto Login"
            className="img-fluid img-fluid-md" // Apply the new class
          />
        </Col>

        {/* Form Column */}
        <Col md={4} xs={12} className="login-form-cont">
          <h1 className='primary-color'>مستخدم جديد</h1>
          <Col xs={12} className='w-90'>
            <Form onSubmit={handleSignUp}>

              <Form.Group controlId="formBasicName">
                <Form.Label>الاسم</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="اسم المستخدم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {/* <Form.Row> */}
              <Form.Group as={Col} controlId="formCountryCode">
                <Form.Label>رمز البلد</Form.Label>
                <Form.Control
                  as="select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="" disabled>Select Country Code</option>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicPhone">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              {/* </Form.Row> */}

              <Form.Group controlId="formBasicEmail">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword1">
                <Form.Label>الرقم السري 1</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password 1"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword2">
                <Form.Label>الرقم السري 2</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password 2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </Form.Group>

              <br />

              <Button variant="primary" className='btn-warning btn-lg secondary-color' type="submit">
                تسجيل
              </Button>
            </Form>
            {/* Message Area */}
    {message && (
      <div className="mt-3 text-danger">
        {message}
      </div>
    )}
          </Col>

          {/* Sign Up Link */}
          <Row className="mt-3">
            <Col>
              لديك حساب بالفعل؟؟ <span className='link' onClick={() => setSign('in')}>تسجيل الدخول</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
