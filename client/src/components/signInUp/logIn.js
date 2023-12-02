// Import necessary components and styles
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from '../../assests/crypto-login-image.png';
import './LogIn.css'; // Import custom CSS for styling
import { logIn } from '../../actions/signin-up';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogIn({ setSign }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      setLoading(true);
      const res = await dispatch(logIn(data));

      if (res.auth) {
        navigate(`/dashboard/${res.user.name}-${res.user._id}`);
        setMessage('تم تسجيل الدخول بنجاح');
      } else {
        setMessage('البريد الالكترونى او الرقم السرى غير صحيح.');
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

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
          <h1 className='primary-color'>تسجيل الدخول</h1>
          <Col xs={12} className='w-90'>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>الرقم السري</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <br />

              <Button
                variant="primary"
                className='btn-warning btn-lg secondary-color'
                type="submit"
                disabled={loading}
              >
                {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
              </Button>
            </Form>
          </Col>

          {/* Forgot Password Link */}
          <Row className="mt-3">
            <Col>
              <a href="#forgot-password">هل نسيت كلمة المرور؟</a>
            </Col>
          </Row>

          {/* Message Area */}
          {message && (
            <Row className="mt-3">
              <Col>
                <div className={`text-danger ${loading ? 'loading-message' : ''}`}>
                  {message}
                </div>
              </Col>
            </Row>
          )}

          {/* Sign Up Link */}
          <Row className="mt-3">
            <Col>
              ليس لديك حساب؟؟ <span className='link' onClick={() => setSign('up')}>سجل الآن</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LogIn;
