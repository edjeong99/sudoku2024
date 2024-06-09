import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signUp = async (email, password, displayName) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
      displayName
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/signout`);
    return response.data;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
