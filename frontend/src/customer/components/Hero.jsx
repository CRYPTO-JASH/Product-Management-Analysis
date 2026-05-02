import React from "react";
import { useNavigate } from "react-router-dom";

const FEATURED = [
  '#C65A3A',
  '#8AA89F',
  '#D4B483', // ✅ FIXED (was blending before)
  '#C99A3B',
  '#3D6B4F',
  '#D4A090',
  '#7B9EA8',
  '#2E2E2E'
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div style={{
      padding:'120px 20px 80px',
      textAlign:'center',
      background:'linear-gradient(160deg, #F4ECDD 0%, #EDE3D0 100%)',
      position:'relative' // ✅ needed for login button
    }}>

      {/* 🔐 LOGIN BUTTON */}
      <div style={{
        position:'absolute',
        top:'20px',
        right:'30px'
      }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding:'10px 20px',
            borderRadius:'30px',
            border:'1px solid #ddd',
            background:'#fff',
            cursor:'pointer',
            fontWeight:500
          }}
        >
          Login
        </button>
      </div>

      <h1 style={{
        fontSize:'64px',
        margin:'20px 0',
        lineHeight:'1.1'
      }}>
        Find the shade<br/>that feels like home.
      </h1>

      <p style={{
        color:'#666',
        fontSize:'16px',
        marginBottom:'30px'
      }}>
        Explore curated shades for every mood and space.
      </p>

      <div style={{
        display:'flex',
        justifyContent:'center',
        gap:'12px',
        marginBottom:'40px'
      }}>
        
        <button
          onClick={() => navigate('/customer/shades')}
          style={{
            background:'#C65A3A',
            color:'#fff',
            border:'none',
            padding:'14px 28px',
            borderRadius:'30px',
            cursor:'pointer',
            fontWeight:600
          }}
        >
          Explore Shades
        </button>

        <button
          onClick={() => navigate('/customer/trending')}
          style={{
            background:'#fff',
            border:'1px solid #ddd',
            padding:'14px 28px',
            borderRadius:'30px',
            cursor:'pointer',
            fontWeight:500
          }}
        >
          See What's Trending
        </button>
      </div>

      {/* 🎨 COLOR STRIP */}
      <div style={{
        display:'flex',
        justifyContent:'center',
        gap:'10px'
      }}>
        {FEATURED.map(c => (
          <div key={c} style={{
            width:'48px',
            height:'48px',
            borderRadius:'10px',
            background:c,
            border: c === '#D4B483' ? '1px solid rgba(0,0,0,0.1)' : 'none'
          }} />
        ))}
      </div>

    </div>
  );
}