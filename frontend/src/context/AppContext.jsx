import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('genai_user')
    return saved ? JSON.parse(saved) : null
  })
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  const backendUrl = 'http://localhost:3000'

  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('genai_user', JSON.stringify(userData))
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch(`${backendUrl}/user/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (_) {}
    setUser(null)
    localStorage.removeItem('genai_user')
  }, [backendUrl])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000)
  }, [])

  // Hydrate user._id from creations if not yet available
  const hydrateUserId = useCallback((creations) => {
    if (!user || user._id) return
    if (creations && creations.length > 0) {
      const id = creations[0].userId?.toString?.() || creations[0].userId
      if (id) {
        const updated = { ...user, _id: id }
        setUser(updated)
        localStorage.setItem('genai_user', JSON.stringify(updated))
      }
    }
  }, [user])

  // Eagerly hydrate user._id once per login session
  const hydrationDone = useRef(false)
  useEffect(() => {
    if (!user) { hydrationDone.current = false; return }
    if (user._id || hydrationDone.current) return
    hydrationDone.current = true
    fetch(`${backendUrl}/user/creations`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data?.length > 0) hydrateUserId(data.data)
      })
      .catch(() => {})
  }, [user, backendUrl, hydrateUserId])

  return (
    <AppContext.Provider value={{ user, login, logout, backendUrl, showToast, toast, hydrateUserId }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
