import React, { useState } from 'react';
import axios from '../../axiosConfig.js';
import './Dashboard.css';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [batchnumber, setBatchNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      username: username.toUpperCase(),
      password,
      batchnumber
    };

    const result = await Swal.fire({
      title: 'Please confirm the details',
      html: `<pre>${JSON.stringify(userData, null, 2)}</pre>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    });

    if (result.isConfirmed) {

      try {
        const response = await axios.post('/api/admin/newUser', userData);

        if (response.data.success) {
          Swal.fire('Success!', response.data.message, 'success');
          setName('');
          setUsername('');
          setPassword('');
          setBatchNumber('');
        } else {
          Swal.fire('Error!', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <h3 className='add_user_heading'>Add New User</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Batch Number:</label>
          <input
            type="number"
            value={batchnumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            min="1"
            max="100"
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </>
  );
};

export default Dashboard;
