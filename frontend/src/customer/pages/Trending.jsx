import { useEffect, useState } from "react"
import { getTrending } from "../../services/api"
import ShadeCard from "../components/ShadeCard"

const Trending = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTrending()
        console.log("TRENDING API:", res)
        setData(res)
      } catch (err) {
        console.error(err)
        setError("Failed to load trending data")
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  // ================= UI =================
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading trending colors...</div>
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>🔥 Trending Colors</h1>

      {data.length === 0 ? (
        <p>No trending data available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px"
          }}
        >
          {data.map((item, index) => (
            <ShadeCard
              key={index}
              shade={{
                id: index,
                name: item.name,
                hex: item.hex,
                family: item.category,
                mood: item.trend,
                rooms: []
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Trending