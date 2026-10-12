import {
  ArrowUpRight,
  Check,
  MoreHorizontal,
  Plus,
  ArrowRight,
  Play,
  Mountain,
  Sun,
  Circle,
} from "lucide-react";

export function WebScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`web-scene ${compact ? "scene-compact" : ""}`}>
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span>kok.studio / koleksiyon</span>
        <ArrowUpRight size={12} />
      </div>
      <div className="studio-body">
        <div className="studio-nav">
          <b>
            kök<span>®</span>
          </b>
          <span>Yaşamın içinden nesneler.</span>
          <Plus size={18} />
        </div>
        <div className="studio-heading">
          <span className="mono">KOLEKSİYON / 001</span>
          <h3>
            Doğadan gelir.
            <br />
            Sizinle yaşar.
          </h3>
          <p>Az şey. İyi düşünülmüş şeyler.</p>
        </div>
        <div className="studio-products">
          <div className="product product-vase">
            <div className="vase" />
            <span>01 / TOPRAK</span>
          </div>
          <div className="product product-lamp">
            <div className="lamp">
              <i />
              <b />
            </div>
            <span>02 / IŞIK</span>
          </div>
          <div className="product product-chair">
            <div className="sculpture" />
            <span>03 / DENGE</span>
          </div>
        </div>
        <div className="studio-bottom">
          <span>İyi tasarım, kendini hissettirir.</span>
          <span>
            Koleksiyonu keşfet <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function PhoneScene({ alternate = false }: { alternate?: boolean }) {
  return (
    <div className={`phone-scene ${alternate ? "phone-alt" : ""}`}>
      <div className="phone-top">
        <span>9:41</span>
        <i />
        <span>•••</span>
      </div>
      <div className="phone-content">
        <div className="planner-logo">
          rota<span>✳</span>
        </div>
        <div className="planner-greeting">
          {alternate ? "Küçük adımlar," : "Merhaba, Deniz."}
        </div>
        <h3>
          {alternate ? (
            <>
              büyük
              <br />
              bir fark.
            </>
          ) : (
            <>
              Bugün, sana
              <br />
              ait bir gün.
            </>
          )}
        </h3>
        <div className="planner-date">
          <span>PAZARTESİ</span>
          <b>12</b>
          <span>EKİM</span>
        </div>
        <div className="planner-week">
          {["P", "S", "Ç", "P", "C", "C", "P"].map((day, i) => (
            <span className={i === 0 ? "active" : ""} key={i}>
              {day}
              <b>{12 + i}</b>
            </span>
          ))}
        </div>
        <div className="planner-row">
          <b>{alternate ? "Haftanın odağı" : "Önceliklerin"}</b>
          <MoreHorizontal size={18} />
        </div>
        <div className="planner-task">
          <span className="task-check">
            <Check size={14} />
          </span>
          <div>
            <b>Yeni bir başlangıç</b>
            <small>Tasarım · 10:00</small>
          </div>
        </div>
        <div className="planner-task">
          <Circle size={18} />
          <div>
            <b>Fikrine zaman ayır</b>
            <small>Kişisel · 14:30</small>
          </div>
        </div>
        <div className="planner-note">
          <Sun size={22} />
          <span>
            Acele etmeden.
            <br />
            <b>Kendi ritminde.</b>
          </span>
        </div>
        <div className="phone-bottom">
          <span>Bugün</span>
          <span>Planlar</span>
          <span>Sen</span>
        </div>
      </div>
    </div>
  );
}

export function GameScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`game-scene ${compact ? "scene-compact" : ""}`}>
      <svg
        className="landscape"
        viewBox="0 0 900 540"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={compact ? "sky-small" : "sky-large"}
            x2="0"
            y2="1"
          >
            <stop stopColor="#2b5051" />
            <stop offset="1" stopColor="#a8b8a2" />
          </linearGradient>
        </defs>
        <rect
          width="900"
          height="540"
          fill={`url(#${compact ? "sky-small" : "sky-large"})`}
        />
        <circle cx="680" cy="120" r="64" fill="#dbe7c4" opacity=".65" />
        <path
          d="M0 330 180 130 330 305 520 90 720 340 850 230 900 320V540H0Z"
          fill="#536c60"
        />
        <path
          d="m425 230 95-140 108 151-83-52-27 13-30-32Z"
          fill="#d5d9c0"
          opacity=".6"
        />
        <path
          d="M0 440 185 280 350 390 470 270 650 410 790 280 900 380V540H0Z"
          fill="#2b4941"
        />
        <path
          d="M0 520 220 425 410 500 650 350 900 480V540H0Z"
          fill="#132b28"
        />
        <path
          d="m490 540 63-80 58-16 29-36"
          fill="none"
          stroke="#c8d7b0"
          strokeWidth="3"
          opacity=".45"
        />
      </svg>
      <div className="game-top">
        <span>
          <Mountain size={14} /> BURKUT / GAME CONCEPT
        </span>
        <span>KEŞİF MODU</span>
      </div>
      <div className="game-title">
        <span className="mono">BİLİNMEYENE DOĞRU</span>
        <h3>eşik</h3>
        <p>Her yol, bir başlangıç.</p>
        <span className="game-play">
          <Play size={12} fill="currentColor" />
          Yolculuğa başla
        </span>
      </div>
      <div className="game-bottom">
        <span>01 / KUZEY VADİSİ</span>
        <span>
          W A S D <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-head">
        <span className="dash-symbol">b.</span>
        <span>ÇALIŞMA ALANI</span>
        <MoreHorizontal size={20} />
      </div>
      <div className="dashboard-main">
        <div>
          <span className="mono">FİKİRDEN ÜRÜNE</span>
          <h3>
            Her parça,
            <br /> bir bütüne ait.
          </h3>
          <p>
            Tasarım ve geliştirme.
            <br />
            Aynı hedef, ortak bir dil.
          </p>
        </div>
        <div className="dash-flow">
          {["Fikir", "Tasarım", "Geliştirme", "Deneyim"].map((label, i) => (
            <div key={label}>
              <span>0{i + 1}</span>
              <b>{label}</b>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard-foot">
        <span>
          <i /> KONSEPT ÇALIŞMA ALANI
        </span>
        <span>WEB + UYGULAMA + OYUN</span>
      </div>
    </div>
  );
}
