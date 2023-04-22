/* eslint-disable prettier/prettier */

// MultiplicationForm.js
// MultiplicationForm.js
import React, { useState, useEffect } from 'react';
import { db, auth, collection, addDoc, onAuthStateChanged } from 'src/firebaseConfigFile';

const DateFormTest = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [user, setUser] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(new Date());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to submit data.');
      return;
    }

    const result = input1 * input2;

    try {
      const multiplicationsRef = collection(db, 'multiplications');
      await addDoc(multiplicationsRef, {
        input1: Number(input1),
        input2: Number(input2),
        result,
        createdAt: new Date(),
        userId: user.uid,
      });

      setInput1('');
      setInput2('');
      alert('Data written to Firestore successfully!');
    } catch (error) {
      console.error('Error writing data to Firestore:', error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="input1">Input 1:</label>
                <input
                    type="number"
                    id="input1"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                />

            <label htmlFor="input2">Input 2:</label>
                <input
                    type="number"
                    id="input2"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                />

            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <p>You must be logged in to access this page.</p>
      )}
    </div>
  );
};

export default DateFormTest;



//*************************************************************************************************************************************** */



// MultiplicationForm.js
/* import React, { useState } from 'react';
import { db } from 'src/firebaseConfigFile';

const MultiplicationForm = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = input1 * input2;

    try {
      await db.collection('multiplications').add({
        input1: Number(input1),
        input2: Number(input2),
        result,
        createdAt: new Date(),
      });

      setInput1('');
      setInput2('');
      alert('Data written to Firestore successfully!');
    } catch (error) {
      console.error('Error writing data to Firestore:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input1">Input 1:</label>
      <input
        type="number"
        id="input1"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />

      <label htmlFor="input2">Input 2:</label>
      <input
        type="number"
        id="input2"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MultiplicationForm;
 */