import { useState } from 'react';
import API from '../api/api';

export default function AssetForm({ onAssetCreated }) {
  const [name, setName] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const createAsset = async () => {
    try {
      await API.post('/assets', { name, secretKey });
      setName('');
      setSecretKey('');
      onAssetCreated(); // Refresh the list
    } catch (err) {
      alert('Error creating asset');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Add New Asset</h3>
      <div style={styles.formGroup}>
        <label style={styles.label}>Asset Name</label>
        <input
          type="text"
          placeholder="Enter asset name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
          autoComplete="off"
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Secret Key</label>
        <input
          type="text"
          placeholder="Enter secret key"
          value={secretKey}
          onChange={e => setSecretKey(e.target.value)}
          style={styles.input}
          autoComplete="off"
        />
      </div>
      <button onClick={createAsset} style={styles.button}>Add Asset</button>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  heading: {
    marginBottom: '15px',
    fontSize: '20px',
    color: '#333'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  }
};
