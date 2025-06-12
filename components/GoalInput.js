// components/GoalInput.js
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseClient'

export default function GoalInput({ onGoalSaved }) {
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)

  const saveGoal = async () => {
    if (!goal.trim()) return
    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, 'goals'), {
        userId: auth.currentUser.uid,
        goal,
        createdAt: new Date().toISOString(),
      })
      console.log('✅ Goal saved:', docRef.id)
      onGoalSaved?.(goal)
      setGoal('')
    } catch (err) {
      console.error('❌ Error saving goal:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        placeholder="What’s your focus today?"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={{ padding: 10, width: '80%', marginRight: 10 }}
      />
      <button onClick={saveGoal} disabled={loading}>
        {loading ? 'Saving...' : 'Save Goal'}
      </button>
    </div>
  )
}
