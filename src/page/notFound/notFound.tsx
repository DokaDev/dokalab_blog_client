import React from 'react';
import './notFound.css';

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <div className="not-found-icon">404</div>
                <h1>페이지를 찾을 수 없습니다</h1>
                <p>요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.</p>
                <div className="not-found-actions">
                    <a href="/" className="home-button">
                        홈으로 돌아가기
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="back-button">
                        이전 페이지로
                    </a>
                </div>
            </div>
        </div>
    );
} 