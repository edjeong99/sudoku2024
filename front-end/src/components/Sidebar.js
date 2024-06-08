import React, { useState } from 'react';
import { auth } from '../util/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const Sidebar = ({ onDifficultyChange, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      {user ? ( 
        <div>
          <h3>Welcome, {user.displayName || user.email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>) : (
        <div>
          <button onClick={handleGoogleLogin}>Login with Google</button>
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
             {isLogin ? (
              <button onClick={handleEmailLogin}>Login with Email</button>
            ) : (
              <button onClick={handleSignup}>Signup with Email</button>
            )}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
            </button>
          </div>
        </div>
        )}
          <button onClick={() => onDifficultyChange('easy')}>Easy</button>
          <button onClick={() => onDifficultyChange('medium')}>Medium</button>
          <button onClick={() => onDifficultyChange('hard')}>Hard</button>
         
      
    </div>
  );
};

export default Sidebar;