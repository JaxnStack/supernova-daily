// components/Auth.js
import { useEffect, useState } from 'react'
import { auth, GoogleAuthProvider, signInWithPopup, signOut, db } from '../firebase/firebaseClient'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export default function Auth({ onAuth }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)
      if (user) {
        await saveUserToFirestore(user)
        onAuth?.(user) // notify parent
      }
    })
    return () => unsubscribe()
  }, [])

  const login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (err) {
      console.error('❌ Login error:', err)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error('❌ Logout error:', err)
    }
  }

  const saveUserToFirestore = async (user) => {
    const userRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(userRef)
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date().toISOString(),
      })
      console.log('✅ New user saved to Firestore')
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Sign out</button>
        </>
      ) : (
        <button onClick={login}>Sign in with Google</button>
      )}
    </div>
  )
}
