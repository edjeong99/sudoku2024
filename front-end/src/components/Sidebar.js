import React, { useState } from 'react';
import { auth } from '../util/firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from '../util/modal.js';


const Sidebar = ({ onDifficultyChange, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowModal(false); // Close the modal after successful login
    } catch (error) {
      console.error('Login failed:', error);
    //  await signInWithRedirect(auth, provider);
    }
  };
  const handleEmailSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setShowModal(false); // Close the modal after successful login
    } catch (error) {
      console.error('Email signup failed:', error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setShowModal(false);
    } catch (error) {
      console.error('Email login failed:', error);
    }
  };
  // const handlePopupAction = async () => {
  //   if (isLogin) {
  //     await handleGoogleLogin();
  //   } else {
  //     await handleEmailSignup();
  //   }
  // };
  // const handleSignup = async () => {
  //   try {
  //     const result = await createUserWithEmailAndPassword(auth, email, password);
  //     setUser(result.user);
  //   } catch (error) {
  //     console.error('Signup failed:', error);
  //   }
  // };
  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     setUser(null);
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  // React.useEffect(() => {
  //   const fetchRedirectResult = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
  //       if (result) {
  //         setUser(result.user);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching redirect result:', error);
  //     }
  //   };

  //   fetchRedirectResult();
  // }, []);


  return (
    <div className="sidebar">
      <h2>Menu</h2>
      {user ? ( 
        <div>
          <h3>Welcome, {user.displayName || user.email}</h3>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>) : (
        <div>
         <button onClick={() => {
            setShowModal(true);
            console.log(showModal)}}>
            {isLogin ? 'Login' : 'Sign up'}
          </button>
          {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            {!isLogin && (
              <>
                <h3>Sign up</h3>
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
                <button onClick={handleEmailSignup}>Sign up</button>
              </>
            )}
            {isLogin && (
              <>
                <h3>Login</h3>
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
                <button onClick={handleEmailLogin}>Login</button>
              </>
            )}
                  <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
            </button>
          </Modal>
        )}
        </div>
      )}
          <button onClick={() => onDifficultyChange('easy')}>Easy</button>
          <button onClick={() => onDifficultyChange('medium')}>Medium</button>
          <button onClick={() => onDifficultyChange('hard')}>Hard</button>
         
      
    </div>
  );
};

export default Sidebar;