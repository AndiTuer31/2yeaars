// CouchRoom · a cozy illustrated living room at 22:00 (the night of the first kiss)
// Click the lamp to toggle late-evening ↔ morning-after. Hover the couch for the heart.
// Hover Bailey for a tail wag. Click the clock for the hidden ending.

const couchStyles = {
  scene: {
    position: 'absolute', inset: 0, overflow: 'hidden',
    fontFamily: '"EB Garamond", Georgia, serif',
    transition: 'background 1.2s ease',
  },
};

function NightSky({ morning }) {
  return (
    <div style={{
      position: 'absolute', inset: 4, overflow: 'hidden',
      background: morning
        ? 'linear-gradient(180deg, #f6d6b2 0%, #f4b27a 60%, #e69f6a 100%)'
        : 'linear-gradient(180deg, #0e1730 0%, #1c2950 70%, #2a3a6a 100%)',
      transition: 'background 1.2s ease',
    }}>
      {/* moon / sun */}
      <div style={{
        position:'absolute', top: 22, right: 28, width: 44, height: 44,
        borderRadius:'50%',
        background: morning ? '#fff3b8' : '#f4ecd0',
        boxShadow: morning
          ? '0 0 60px 18px rgba(255,235,160,.6)'
          : '0 0 30px 6px rgba(244,236,208,.35)',
        transition: 'all 1.2s ease',
      }}/>
      {/* stars */}
      {!morning && [
        [40,50],[80,30],[130,70],[180,40],[210,90],[60,110],[150,30],[230,55],[110,140],[200,130],[50,80]
      ].map(([x,y], i) => (
        <div key={i} style={{
          position:'absolute', left:x, top:y, width:2, height:2,
          background:'#fff', borderRadius:'50%',
          opacity: .6 + (i % 3) * 0.15,
          boxShadow:'0 0 3px rgba(255,255,255,.8)',
          animation: `couch-twinkle ${2 + (i % 3)}s ease-in-out ${i*0.2}s infinite alternate`,
        }}/>
      ))}
      {/* tiny city silhouette */}
      <svg viewBox="0 0 280 40" preserveAspectRatio="none" style={{
        position:'absolute', left:0, right:0, bottom:0, width:'100%', height:32,
        opacity: morning ? .25 : .45,
      }}>
        <path d="M0 40 L0 28 L20 28 L20 18 L40 18 L40 26 L60 26 L60 12 L80 12 L80 22 L100 22 L100 16 L120 16 L120 24 L140 24 L140 14 L160 14 L160 22 L180 22 L180 18 L200 18 L200 26 L220 26 L220 20 L240 20 L240 28 L260 28 L260 24 L280 24 L280 40 Z" fill={morning ? '#a26b48' : '#0a1020'} />
      </svg>
    </div>
  );
}

function Window({ morning, top = 70, left = 80 }) {
  return (
    <div style={{
      position:'absolute', top, left, width: 290, height: 200,
      background: '#3a2415',
      padding: 0, borderRadius: 2,
      boxShadow: '0 10px 22px rgba(0,0,0,.18), inset 0 0 0 6px #4a2f1c',
    }}>
      <NightSky morning={morning} />
      {/* mullions */}
      <div style={{ position:'absolute', left:'50%', top:4, bottom:4, width: 6, background:'#4a2f1c', marginLeft:-3 }}/>
      <div style={{ position:'absolute', top:'50%', left:4, right:4, height: 6, background:'#4a2f1c', marginTop:-3 }}/>
      {/* sill */}
      <div style={{
        position:'absolute', left:-10, right:-10, bottom:-14,
        height: 14, background:'#5a3b22', borderRadius:2,
        boxShadow:'0 4px 10px rgba(0,0,0,.18)',
      }}/>
    </div>
  );
}

function WallClock({ morning, onClick, revealed }) {
  // 22:00 analog = hour hand at 10 (pointing slightly past 10 o'clock position)
  // hour deg: ((22 % 12) + 0/60) * 30 = 300deg from 12
  const hourDeg = morning ? 270 : 300;     // 22:00 vs 9:00 (next morning)
  const minDeg = 0;
  return (
    <button onClick={onClick} title="22:00" style={{
      position:'absolute', top: 90, left: 600,
      width: 92, height: 92, borderRadius:'50%',
      background:'#fbf3e0',
      border: '6px solid #3a2415',
      boxShadow:'0 10px 22px rgba(0,0,0,.22), inset 0 0 8px rgba(70,40,15,.08)',
      cursor:'pointer', padding:0,
    }}>
      {/* tick marks */}
      {Array.from({length:12}).map((_,i)=>(
        <div key={i} style={{
          position:'absolute', left:'50%', top: 4,
          width: 2, height: 8, background:'#3a2415',
          marginLeft:-1, transformOrigin:'1px 38px',
          transform:`rotate(${i*30}deg)`,
        }}/>
      ))}
      {/* hands */}
      <div style={{
        position:'absolute', left:'50%', top:'50%',
        width: 3, height: 24, background:'#3a2415',
        marginLeft:-1.5, marginTop:-22, transformOrigin:'1.5px 22px',
        transform:`rotate(${hourDeg}deg)`,
        transition:'transform 1.2s ease',
        borderRadius: 2,
      }}/>
      <div style={{
        position:'absolute', left:'50%', top:'50%',
        width: 2, height: 32, background:'#c75e4e',
        marginLeft:-1, marginTop:-30, transformOrigin:'1px 30px',
        transform:`rotate(${minDeg}deg)`,
        transition:'transform 1.2s ease',
        borderRadius: 2,
      }}/>
      <div style={{
        position:'absolute', left:'50%', top:'50%',
        width: 8, height: 8, background:'#3a2415',
        marginLeft:-4, marginTop:-4, borderRadius:'50%',
      }}/>
      {revealed && (
        <div style={{
          position:'absolute', top: -42, left: '50%', transform:'translateX(-50%)',
          fontFamily:'"Caveat", cursive', fontSize: 22, color:'#c75e4e',
          whiteSpace:'nowrap',
        }}>
          this is when it happened ↓
        </div>
      )}
    </button>
  );
}

function Frame({ id, top, left, w = 150, h = 180, tilt = 0, caption }) {
  return (
    <div style={{
      position:'absolute', top, left, width: w, height: h,
      transform:`rotate(${tilt}deg)`,
      background:'#3a2415', padding: 8,
      boxShadow:'0 10px 18px rgba(0,0,0,.22)',
    }}>
      <div style={{ background:'#fbf3e0', padding: 6 }}>
        <image-slot
          id={id}
          shape="rect"
          placeholder=" "
          style={{ width: w-28+'px', height: h-28+'px', display:'block', background:'#e9dec3' }}
        ></image-slot>
      </div>
      {caption && (
        <div style={{
          position:'absolute', bottom: -22, left: 0, right: 0, textAlign:'center',
          fontFamily:'"Caveat", cursive', fontSize: 16, color:'#5a3f22',
        }}>{caption}</div>
      )}
    </div>
  );
}

function Couch({ heart, setHeart }) {
  return (
    <div
      onMouseEnter={() => setHeart(true)}
      onMouseLeave={() => setHeart(false)}
      style={{
        position:'absolute', bottom: 220, left: '50%', transform:'translateX(-50%)',
        width: 640, height: 230, cursor:'default',
      }}
    >
      {/* back rest */}
      <div style={{
        position:'absolute', top: 0, left: 0, right: 0, height: 130,
        background:'linear-gradient(180deg, #b35e52 0%, #9d4d42 100%)',
        borderRadius: '40px 40px 8px 8px',
        boxShadow:'inset 0 -6px 12px rgba(0,0,0,.18), 0 12px 24px rgba(0,0,0,.18)',
      }}/>
      {/* arm rests */}
      <div style={{
        position:'absolute', top: 30, left: -22, width: 70, height: 180,
        background:'linear-gradient(180deg, #b35e52 0%, #8a4338 100%)',
        borderRadius: '40px 22px 8px 24px',
        boxShadow:'0 10px 18px rgba(0,0,0,.18)',
      }}/>
      <div style={{
        position:'absolute', top: 30, right: -22, width: 70, height: 180,
        background:'linear-gradient(180deg, #b35e52 0%, #8a4338 100%)',
        borderRadius: '22px 40px 24px 8px',
        boxShadow:'0 10px 18px rgba(0,0,0,.18)',
      }}/>
      {/* seat cushions */}
      <div style={{
        position:'absolute', bottom: 18, left: 56, width: 250, height: 96,
        background:'linear-gradient(180deg, #c66a5d 0%, #a8554a 100%)',
        borderRadius: 18,
        boxShadow:'inset 0 -8px 12px rgba(0,0,0,.18)',
      }}/>
      <div style={{
        position:'absolute', bottom: 18, right: 56, width: 250, height: 96,
        background:'linear-gradient(180deg, #c66a5d 0%, #a8554a 100%)',
        borderRadius: 18,
        boxShadow:'inset 0 -8px 12px rgba(0,0,0,.18)',
      }}/>
      {/* throw pillows */}
      <div style={{
        position:'absolute', top: 38, left: 90, width: 70, height: 70,
        background:'#f4d8a8', borderRadius: 12, transform:'rotate(-8deg)',
        boxShadow:'0 6px 10px rgba(0,0,0,.18)',
      }}/>
      <div style={{
        position:'absolute', top: 38, right: 90, width: 70, height: 70,
        background:'#8aa169', borderRadius: 12, transform:'rotate(7deg)',
        boxShadow:'0 6px 10px rgba(0,0,0,.18)',
      }}/>
      {/* feet */}
      <div style={{ position:'absolute', bottom:-2, left: 30, width: 18, height: 14, background:'#3a2415', borderRadius:'4px 4px 8px 8px' }}/>
      <div style={{ position:'absolute', bottom:-2, right: 30, width: 18, height: 14, background:'#3a2415', borderRadius:'4px 4px 8px 8px' }}/>
      <div style={{ position:'absolute', bottom:-2, left:'50%', marginLeft:-9, width: 18, height: 14, background:'#3a2415', borderRadius:'4px 4px 8px 8px' }}/>

      {/* hover heart between cushions */}
      <div style={{
        position:'absolute', top: 28, left:'50%', marginLeft: -14,
        fontSize: 28, color:'#c75e4e',
        opacity: heart ? 1 : 0,
        transform: heart ? 'translateY(-12px) scale(1)' : 'translateY(6px) scale(.7)',
        transition:'all .35s cubic-bezier(.2,.7,.3,1)',
        textShadow:'0 4px 10px rgba(199,94,78,.4)',
        pointerEvents:'none',
      }}>♥</div>
    </div>
  );
}

function SideTable({ morning, onLampClick }) {
  return (
    <div style={{ position:'absolute', bottom: 220, right: 90, width: 130 }}>
      {/* lamp halo */}
      <div style={{
        position:'absolute', top: -80, left: -120, width: 360, height: 360,
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,210,140,.35) 0%, rgba(255,210,140,0) 60%)',
        pointerEvents:'none',
        opacity: morning ? 0 : 1,
        transition:'opacity 1.2s ease',
      }}/>
      {/* lamp */}
      <button onClick={onLampClick} title="click the lamp" style={{
        position:'absolute', top: -120, left: 30, width: 70, height: 90,
        background:'transparent', border:'none', cursor:'pointer', padding:0,
      }}>
        {/* shade */}
        <div style={{
          position:'absolute', top: 0, left: 5, width: 60, height: 50,
          background: morning ? '#e9dec3' : '#f4d99c',
          clipPath:'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
          boxShadow: morning ? 'none' : '0 0 16px rgba(255,210,140,.5)',
          transition:'all 1.2s ease',
        }}/>
        {/* neck */}
        <div style={{ position:'absolute', top: 48, left: 33, width: 4, height: 12, background:'#3a2415' }}/>
        {/* base */}
        <div style={{ position:'absolute', top: 58, left: 22, width: 26, height: 10, background:'#3a2415', borderRadius:'4px 4px 0 0' }}/>
      </button>
      {/* table top */}
      <div style={{
        position:'absolute', top: -32, left: 0, width: 130, height: 12,
        background:'#5a3b22', borderRadius: 4,
        boxShadow:'0 6px 12px rgba(0,0,0,.18)',
      }}/>
      <div style={{ position:'absolute', top: -20, left: 8, width: 6, height: 90, background:'#5a3b22' }}/>
      <div style={{ position:'absolute', top: -20, right: 8, width: 6, height: 90, background:'#5a3b22' }}/>
    </div>
  );
}

function Rug() {
  return (
    <div style={{
      position:'absolute', bottom: 130, left: '50%', transform:'translateX(-50%)',
      width: 720, height: 110,
      background:
        'repeating-linear-gradient(90deg, #d9a07a 0 28px, #c98865 28px 56px)',
      borderRadius: '50%',
      boxShadow:'0 10px 24px rgba(70,40,15,.22)',
      opacity:.9,
    }}/>
  );
}

function Bailey() {
  const [wag, setWag] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setWag(true)}
      onMouseLeave={()=>setWag(false)}
      style={{ position:'absolute', bottom: 138, left: '50%', marginLeft: 100, width: 200, cursor:'pointer' }}
    >
      <svg viewBox="0 0 200 90" width={200} height={90}>
        {/* body (curled) */}
        <ellipse cx="105" cy="60" rx="78" ry="26" fill="#d9a35a" />
        <ellipse cx="105" cy="50" rx="60" ry="18" fill="#e6b772" />
        {/* head */}
        <ellipse cx="38" cy="56" rx="26" ry="22" fill="#d9a35a" />
        <ellipse cx="42" cy="60" rx="14" ry="10" fill="#e6b772" />
        {/* snout */}
        <ellipse cx="22" cy="62" rx="10" ry="7" fill="#e6b772" />
        <ellipse cx="16" cy="60" rx="3" ry="2.5" fill="#2a1810" />
        {/* ear */}
        <path d="M 50 38 Q 56 22 64 38 Q 60 50 50 48 Z" fill="#a87838" />
        {/* closed eye */}
        <path d="M 30 52 Q 34 50 38 52" stroke="#2a1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* tail */}
        <path
          d="M 175 56 Q 195 42 188 28"
          stroke="#d9a35a" strokeWidth="14" fill="none" strokeLinecap="round"
          style={{
            transformOrigin: '175px 56px',
            transform: wag ? 'rotate(-18deg)' : 'rotate(0)',
            transition: 'transform .25s cubic-bezier(.2,.7,.3,1)',
            animation: wag ? 'couch-wag .5s ease-in-out infinite alternate' : 'none',
          }}
        />
        {/* Z's */}
        <text x="62" y="22" fontFamily="EB Garamond, serif" fontSize="14" fill="#5a3f22" opacity={wag ? 0 : .8}>z</text>
        <text x="72" y="14" fontFamily="EB Garamond, serif" fontSize="11" fill="#5a3f22" opacity={wag ? 0 : .65}>z</text>
        <text x="80" y="8" fontFamily="EB Garamond, serif" fontSize="9" fill="#5a3f22" opacity={wag ? 0 : .5}>z</text>
      </svg>
      <div style={{
        position:'absolute', top: -8, left: 0,
        fontFamily:'"Caveat", cursive', fontSize: 18, color:'#5a3f22',
        opacity: wag ? 1 : 0, transition:'opacity .25s',
      }}>
        Bailey ♡
      </div>
    </div>
  );
}

function HiddenLetter({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position:'absolute', inset: 0, background:'rgba(20,12,4,.55)',
        display:'flex', alignItems:'center', justifyContent:'center', zIndex: 20,
        cursor:'pointer', animation:'couch-fade .3s ease',
      }}
    >
      <div onClick={(e)=>e.stopPropagation()} style={{
        background:'#fbf3e0', padding:'48px 56px', maxWidth: 520,
        boxShadow:'0 24px 60px rgba(0,0,0,.4)',
        fontFamily:'"EB Garamond", serif', fontSize: 18, lineHeight: 1.6, color:'#3a2f23',
        cursor:'default',
      }}>
        <div style={{ fontFamily:'"Caveat", cursive', fontSize: 32, color:'#c75e4e', marginBottom: 12 }}>22:00 — Ana,</div>
        two years ago tonight, in this room, on this couch, after a walk with Bailey, I kissed you for the first time. I have thought about that minute almost every day since.
        <br/><br/>
        thank you for two years. let's do many more.
        <div style={{ textAlign:'right', fontFamily:'"Caveat", cursive', fontSize: 28, color:'#5a3f22', marginTop: 18 }}>— Rico</div>
        <div style={{ marginTop: 14, textAlign:'center', fontFamily:'"Special Elite", monospace', fontSize: 11, opacity:.5, letterSpacing:'.2em' }}>
          click anywhere to close
        </div>
      </div>
    </div>
  );
}

function CouchRoom() {
  const [morning, setMorning] = React.useState(false);
  const [heart, setHeart] = React.useState(false);
  const [letterOpen, setLetterOpen] = React.useState(false);
  const [clockHinted, setClockHinted] = React.useState(false);

  // After a few seconds, briefly hint the clock
  React.useEffect(() => {
    const t = setTimeout(() => setClockHinted(true), 2200);
    const t2 = setTimeout(() => setClockHinted(false), 5200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      ...couchStyles.scene,
      background: morning
        ? 'linear-gradient(180deg, #f4ddc1 0%, #ecc89e 55%, #8a5e3c 55%, #6b4528 100%)'
        : 'linear-gradient(180deg, #c8a380 0%, #b58866 55%, #5a3b22 55%, #3a2415 100%)',
    }}>
      {/* keyframes */}
      <style>{`
        @keyframes couch-twinkle { from{opacity:.35} to{opacity:1} }
        @keyframes couch-wag { from{transform:rotate(-22deg)} to{transform:rotate(8deg)} }
        @keyframes couch-fade { from{opacity:0} to{opacity:1} }
        @keyframes couch-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      `}</style>

      {/* floor plank lines */}
      <div style={{
        position:'absolute', left:0, right:0, top:'55%', bottom:0,
        background:
          'repeating-linear-gradient(90deg, transparent 0 110px, rgba(0,0,0,.08) 110px 111px)',
        pointerEvents:'none',
      }}/>

      {/* wall fixtures */}
      <Window morning={morning} top={70} left={80} />
      <WallClock morning={morning} revealed={clockHinted} onClick={()=>setLetterOpen(true)} />

      {/* frames on the wall — 3 of them */}
      <Frame id="couch-pic-1" top={70}  left={770} w={140} h={170} tilt={-2} caption="us" />
      <Frame id="couch-pic-2" top={60}  left={960} w={150} h={190} tilt={3}  caption="bailey" />
      <Frame id="couch-pic-3" top={250} left={1110} w={120} h={140} tilt={-4} caption="#4 ;)" />

      {/* sub-title */}
      <div style={{
        position:'absolute', top: 22, left: 0, right: 0, textAlign:'center',
        fontFamily:'"Instrument Serif", serif', fontSize: 28, color:'#fbf3e0',
        letterSpacing:'.02em', textShadow:'0 2px 6px rgba(0,0,0,.3)',
      }}>
        <span style={{ fontStyle:'italic' }}>two years since the couch</span>
        <span style={{ opacity:.7, fontSize: 18, marginLeft: 18 }}>· 25 May 2026</span>
      </div>

      {/* furniture */}
      <Rug />
      <Couch heart={heart} setHeart={setHeart} />
      <SideTable morning={morning} onLampClick={()=>setMorning((v)=>!v)} />
      <Bailey />

      {/* footer hint */}
      <div style={{
        position:'absolute', bottom: 14, left: 0, right: 0, textAlign:'center',
        fontFamily:'"Special Elite", monospace', fontSize: 11, color:'#fbf3e0',
        opacity:.55, letterSpacing:'.2em',
      }}>
        TRY THE LAMP · TRY THE COUCH · TRY THE CLOCK · TRY THE DOG
      </div>

      <HiddenLetter open={letterOpen} onClose={()=>setLetterOpen(false)} />
    </div>
  );
}

window.CouchRoom = CouchRoom;
