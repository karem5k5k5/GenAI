import { useEffect, useState, useCallback } from 'react'
import { Heart, Loader2, Images } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const likedKey = (email) => `genai_liked_${email}`

const loadLikedIds = (email) => {
  if (!email) return new Set()
  try {
    const stored = localStorage.getItem(likedKey(email))
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

const saveLikedIds = (email, set) => {
  if (!email) return
  try {
    localStorage.setItem(likedKey(email), JSON.stringify([...set]))
  } catch {}
}

const Community = () => {
  const { backendUrl, showToast, user } = useAppContext()
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const [likeLoading, setLikeLoading] = useState({})
  const [likedIds, setLikedIds] = useState(() => loadLikedIds(user?.email))

  // Re-load liked set when user changes (login / logout)
  useEffect(() => {
    setLikedIds(loadLikedIds(user?.email))
  }, [user?.email])

  const updateLikedIds = useCallback((newSet) => {
    setLikedIds(newSet)
    saveLikedIds(user?.email, newSet)
  }, [user?.email])

  const fetchCreations = useCallback(async () => {
    try {
      const res = await fetch(`${backendUrl}/creation/published`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setCreations(data.data || [])
      else showToast(data.message || 'Failed to load community', 'error')
    } catch (_) {
      showToast('Network error loading community', 'error')
    } finally {
      setLoading(false)
    }
  }, [backendUrl, showToast])

  useEffect(() => {
    fetchCreations()
  }, [fetchCreations])

  const isLiked = (creation) => likedIds.has(creation._id || creation.id)

  const handleLike = async (creation) => {
    const id = creation._id || creation.id
    if (likeLoading[id]) return
    setLikeLoading(prev => ({ ...prev, [id]: true }))

    const wasLiked = likedIds.has(id)
    const optimistic = new Set(likedIds)
    if (wasLiked) optimistic.delete(id)
    else optimistic.add(id)
    updateLikedIds(optimistic)

    try {
      const res = await fetch(`${backendUrl}/user/toggle-like/${id}`, {
        method: 'PATCH',
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        fetchCreations()
      } else {
        updateLikedIds(new Set(likedIds))  // revert — likedIds is the pre-optimistic closure value
        fetchCreations()
        showToast(data.message || 'Failed to update like', 'error')
      }
    } catch (_) {
      updateLikedIds(new Set(likedIds))
      fetchCreations()
      showToast('Network error', 'error')
    } finally {
      setLikeLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  return (
    <section className="flex-1 flex flex-col gap-4 h-full p-6">
      <h2 className="font-semibold text-gray-700 text-lg">Community Creations</h2>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : creations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Images className="w-10 h-10 mb-3" />
            <p className="text-sm">No published images yet</p>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {creations.map((creation) => {
              const id = creation._id || creation.id
              const liked = isLiked(creation)
              return (
                <div key={id} className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3">
                  <img
                    src={creation.content}
                    alt={creation.prompt}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 bottom-0 right-0 left-3 flex justify-end items-end gap-2 group-hover:justify-between p-3 group-hover:bg-linear-to-b from-transparent to-black/80 text-white rounded-lg transition-all">
                    <p className="text-sm hidden group-hover:block line-clamp-2">{creation.prompt}</p>
                    <div
                      className="flex items-center gap-1 cursor-pointer shrink-0"
                      onClick={() => handleLike(creation)}
                    >
                      <p className="text-sm">{creation.likes.length}</p>
                      <Heart
                        fill={liked ? '#ef4444' : 'none'}
                        className={`min-w-5 h-5 hover:scale-110 transition ${
                          liked ? 'text-red-500' : 'text-white'
                        } ${likeLoading[id] ? 'opacity-50' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Community
