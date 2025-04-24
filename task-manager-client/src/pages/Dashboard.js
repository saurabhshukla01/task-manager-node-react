import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssetList from '../components/AssetList';
import AssetForm from '../components/AssetForm';

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');
    if (!storedRole) navigate('/');
    setRole(storedRole);
    setName(storedName);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const refreshAssets = () => {
    window.location.reload();
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.navbar}>
        <h2 style={styles.title}>Asset Manager</h2>
        <div>
          <span style={styles.roleText}>{name}</span>
          <span style={styles.roleText}>({role})</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.container}>
        <h3 style={styles.heading}>Dashboard</h3>
        {role === 'admin' && <AssetForm onAssetCreated={refreshAssets} />}
        <AssetList />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh'
  },
  navbar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0
  },
  roleText: {
    marginRight: '15px'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  heading: {
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '8px'
  }
};
