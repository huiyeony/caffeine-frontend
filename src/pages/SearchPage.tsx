import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./SearchPage.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const IS_UNDER_MAINTENANCE = false;

const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    const currentQuery = searchText;
    setSearchText("");
    setMessages((prev) => [...prev, { role: "user", content: currentQuery }]);
    setIsLoading(true);

    try {
      const response = await axios.get<{ answer: string }>(
        `https://${process.env.REACT_APP_API_URL}/ask`,
        { params: { q: currentQuery }, timeout: 0 }
      );
      setMessages((prev) => [...prev, { role: "assistant", content: response.data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "오류가 발생했습니다. 다시 시도해주세요." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (IS_UNDER_MAINTENANCE) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px", color: "#666" }}>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>🔧 서버 점검 중입니다</p>
        <p style={{ fontSize: "15px", marginTop: "12px" }}>빠른 시일 내에 복구될 예정입니다.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <h1>👋🏻 얼마나 카페인</h1>
        <p>하루 400mg 이상의 카페인 섭취는 권장하지 않습니다!</p>
      </header>

      <div className="messages">
        {messages.length === 0 && !isLoading && (
          <div className="empty">
            <p className="empty-title">궁금한 카페인 함량을 물어보세요.</p>
            <div className="usage">
              <div className="usage-item">
                <span className="usage-label">브랜드만</span>
                <span className="usage-desc">스타벅스 메뉴 카페인 알려줘</span>
              </div>
              <div className="usage-item">
                <span className="usage-label">브랜드 + 음료명</span>
                <span className="usage-desc">메가커피 메가리카노 카페인 얼마야?</span>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, idx) =>
          msg.role === "user" ? (
            <div key={idx} className="msg-user">
              <div className="bubble">{msg.content}</div>
            </div>
          ) : (
            <div key={idx} className="msg-ai">
              <span className="label">AI 분석 결과</span>
              <div className="bubble">{msg.content}</div>
            </div>
          )
        )}

        {isLoading && <p className="loading">데이터를 분석하고 있습니다. 잠시만 기다려주세요.</p>}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <div className="input-row">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="음료 이름을 입력하세요..."
          />
          <button onClick={handleSearch}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
