import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post('/auth/register', {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('role', res.data.role);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={styles.select}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer'
  }
};
