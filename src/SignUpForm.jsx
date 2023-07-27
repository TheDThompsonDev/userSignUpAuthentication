import React, { useState } from 'react';
import './signUpFormStyle.css';

import { Client, Account, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('[project id]'); // Your project ID

const account = new Account(client);

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (you can add more validations as needed)
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
    // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe').then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(formData);
    // Register User
    account
      .create(ID.unique(), formData.email, formData.password, formData.fullname)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className='container'>
      <h2>User Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='fullname'>Full Name:</label>
        <input
          type='text'
          id='fullname'
          name='fullname'
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor='confirm_password'>Confirm Password:</label>
        <input
          type='password'
          id='confirm_password'
          name='confirm_password'
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
