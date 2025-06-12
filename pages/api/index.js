
import { useState } from 'react'
import Auth from '../components/Auth'
import GoalInput from '../components/GoalInput'

export default function Home() {
  const [user, setUser] = useState(null)
  const [goalSaved, setGoalSaved] = useState('')

  const handleAuth = (user) => setUser(user)
  const handleGoalSaved = (goal) => setGoalSaved(goal)

  return (
    <div style={{ padding: 40 }}>
      <h1>Supernova Daily 🌟</h1>
      <Auth onAuth={handleAuth} />
      {user && (
        <>
          <GoalInput onGoalSaved={handleGoalSaved} />
          {goalSaved && (
            <p style={{ marginTop: 20 }}>🔥 Goal saved: <strong>{goalSaved}</strong></p>
          )}
        </>
      )}
    </div>
  )
}
