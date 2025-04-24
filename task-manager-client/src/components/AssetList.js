import { useEffect, useState } from 'react';
import API from '../api/api';

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await API.get('/assets');
      setAssets(res.data);
    } catch (err) {
      alert('Failed to fetch assets');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    try {
      await API.delete(`/assets/${id}`);
      fetchAssets(); // Refresh list after deletion
    } catch (err) {
      alert('Failed to delete asset');
    }
  };

  const handleEdit = (asset) => {
    const newName = prompt('Enter new asset name:', asset.name);
    const newSecret = prompt('Enter new secret key:', asset.secretKey);

    if (newName && newSecret) {
      API.put(`/assets/${asset._id}`, {
        name: newName,
        secretKey: newSecret
      })
        .then(() => fetchAssets())
        .catch(() => alert('Failed to update asset'));
    }
  };

  return (
    <div>
      <h3>Assets List</h3>
      <table style={tableStyles.table}>
        <thead>
          <tr>
            <th style={tableStyles.th}>#</th>
            <th style={tableStyles.th}>Asset Name</th>
            {role === 'admin' && <th style={tableStyles.th}>Secret Key</th>}
            {role === 'admin' && <th style={tableStyles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset._id}>
              <td style={tableStyles.td}>{index + 1}</td>
              <td style={tableStyles.td}>{asset.name}</td>
              {role === 'admin' && <td style={tableStyles.td}>{asset.secretKey}</td>}
              {role === 'admin' && (
                <td style={tableStyles.td}>
                  <button style={tableStyles.btnEdit} onClick={() => handleEdit(asset)}>Edit</button>
                  <button style={tableStyles.btnDelete} onClick={() => handleDelete(asset._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  th: {
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#f7f7f7'
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px'
  },
  btnEdit: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  btnDelete: {
    padding: '5px 10px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
