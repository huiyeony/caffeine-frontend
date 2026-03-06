import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: string;
  name: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menus: MenuItem[] = [
    { icon: "🏠", name: "홈" },
    { icon: "🍵", name: "음료 검색" },
    { icon: "📍", name: "브랜드 검색" },
    { icon: "🌀", name: "커뮤니티" },
    { icon: "🤔", name: "카페인 MBTI" },
    { icon: "🤝", name: "제휴 문의" },
    { icon: "🌸", name: "얼마나카페인 앱 소개" },
    { icon: "👨‍💻", name: "얼마나카페인 개발자" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-300px",
        width: "300px",
        height: "100%",
        backgroundColor: "white",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        transition: "0.3s",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#ffaaaa",
          minHeight: "80px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🧡</span>
          <span style={{ fontWeight: "bold" }}>얼마나 카페인</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
      <nav style={{ padding: "20px" }}>
        {menus.map((menu, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px 0",
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
            }}
          >
            <span>{menu.icon}</span>
            <span style={{ fontSize: "16px", color: "#333" }}>{menu.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
