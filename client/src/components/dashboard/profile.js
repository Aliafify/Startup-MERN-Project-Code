import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { serializeFormData } from '../generalFunc';
import { Update_User } from '../../actions/signin-up'; // it takes data ,and role parameters
import { urlBase } from '../../utils/API';
import axios from 'axios';
function Profile({ user }) {
  // Destructuring user object
  const { email ,role } = user;

  // State variables
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [emailState, setEmail] = useState(email);
  // const [password1, setPassword1] = useState(password);
  // const [password2, setPassword2] = useState(password);
  const [read, setRead] = useState(true);
  const [data,setData] = useState({...user})
  const dispatch = useDispatch();

  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [passwordVerificationResult, setPasswordVerificationResult] = useState(null);

  useEffect(() => {
    setPasswordVerificationResult(null);
  }, [read]);
  // Event handler for form submission
  const handleProfile =async (e) => {
    e.preventDefault();
    const passwordVerificationData = {
      id: user._id, // Assuming you have a userId in your user object
      password: verifiedPassword,
    };

    try{
      const response = await axios.post(`${urlBase}/api/pass/verify/`, passwordVerificationData);

      // Handle the API response
      const { message, case: verificationCase } = response.data;
      setPasswordVerificationResult({ message, verificationCase });
      if (verificationCase===true) {
        setPasswordVerificationResult({message:'تم حفظ التغييرات'})
    const formData = serializeFormData(e);
    const newUser = {...user,...formData}
    delete newUser.password;
    setData({...user,...formData});

      dispatch(Update_User(newUser,newUser.role)).then(res=>{
        console.log(res.data)
      
      })
    }
    }catch(error){console.error('Error verifying password:', error);}
  }; 

  // Event handler for the "Edit" button

  const handleEdit = () => {
    setRead(!read); // Toggle the read state
  };


  return (
    <>
    <div className="container d-flex align-items-center vh-100">
      
      <Form onSubmit={handleProfile} className="w-100">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBasicName">
              <Form.Label>الاسم</Form.Label>
              <Form.Control
                type="text"
                placeholder="اسم المستخدم"
                value={name}
                name="username"
                readOnly={read}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>رقم الهاتف</Form.Label>
              <Form.Control
                type="tel"
                placeholder="رقم الهاتف"
                value={phone}
                name='phone'
                readOnly={read}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={emailState}
                name='email'
                readOnly={read}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
              <Form.Group controlId="formBasicPasswordVerification">
                <Form.Label>تأكيد كلمة المرور</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={verifiedPassword}
                  name="verifiedPassword"
                  readOnly={read}
                  onChange={(e) => setVerifiedPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
        </Row>

       

        <br />

        <Button variant="primary" className="btn-warning btn-lg secondary-color" type="submit" disabled={read}>
          حفظ التغييرات
        </Button>
        {' '}
        <Button variant="info" className="btn-lg" onClick={handleEdit}>
          {read ? 'تحرير' : 'إلغاء التحرير'}
        </Button>
        <span>{passwordVerificationResult&&passwordVerificationResult.message}</span>
      </Form>

      
    </div>
 
    </>
  );
}

export default Profile;
