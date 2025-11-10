import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


const API = import.meta.env.VITE_API_BASE || 'http://localhost:7001/api'


export default function BikePage(){
const { slug } = useParams()
const [bike, setBike] = useState(null)
const [parts, setParts] = useState([])
const [loading, setLoading] = useState(true)


useEffect(()=>{
if(!slug) return
setLoading(true)
fetch(`${API}/spares/bikes/${slug}`)
.then(r=>r.json())
.then(json=>{
if(json.bike) setBike(json.bike)
if(json.parts) setParts(json.parts)
})
.catch(console.error)
.finally(()=>setLoading(false))
}, [slug])


if(loading) return <div className="loader">Loading...</div>
if(!bike) return <div className="empty">Bike not found.</div>


return (
<div>
<div className="page-head">
<h1>{bike.name}</h1>
{bike.excerpt && <p className="muted">{bike.excerpt}</p>}
</div>


<div className="parts-list">
{parts.length === 0 && <div className="empty">No spare parts listed for this bike yet.</div>}
{parts.map(p => (
<article key={p._id} className="card part-card">
<Link to={`/bike/${bike.slug}/part/${p.slug}`} className="part-link">
<div className="part-media">
{p.images && p.images[0] ? <img src={`${API}${p.images[0]}`} alt={p.title} /> : <div className="no-image">No image</div>}
</div>
<div className="card-body">
<h3>{p.title}</h3>
{p.excerpt && <p className="excerpt small">{p.excerpt}</p>}
<div className="price">{p.price ? `LKR ${p.price}` : ''}</div>
</div>
</Link>
</article>
))}
</div>
</div>
)
}