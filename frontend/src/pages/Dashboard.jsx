import { useEffect, useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import CreationItem from './../components/CreationItem'
import { useAppContext } from '../context/AppContext'

const Dashboard = () => {
  const { backendUrl, showToast, hydrateUserId } = useAppContext()
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  const getDashboardData = async () => {
    try {
      const res = await fetch(`${backendUrl}/user/creations`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        setCreations(data.data || [])
        hydrateUserId(data.data)
      } else {
        showToast(data.message || 'Failed to load creations', 'error')
      }
    } catch (_) {
      showToast('Network error loading creations', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <section className="h-full overflow-y-scroll p-6">
      <div className="flex flex-wrap justify-start gap-4">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <h2 className="text-sm">Total Creations</h2>
            <p className="text-xl font-semibold">{creations.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588f2] to-[#0bb0d7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="mt-6 mb-4 font-semibold text-gray-700">Recent Creations</h3>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : creations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Sparkles className="w-10 h-10 mb-3" />
            <p className="text-sm">No creations yet. Start with one of the AI tools!</p>
          </div>
        ) : (
          creations.map((item) => (
            <CreationItem key={item._id || item.id} item={item} />
          ))
        )}
      </div>
    </section>
  )
}

export default Dashboard
