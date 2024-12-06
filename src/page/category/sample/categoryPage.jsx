import React from "react";
import { useParams } from "react-router-dom";
import "./categoryPage.css";

export default function CategoryPage() {
    const { id } = useParams();

    // 견본 데이터 확장
    const samplePosts = [
        { 
            id: 1, 
            title: "Spring Boot와 JPA 시작하기", 
            summary: "스프링 부트와 JPA를 활용한 웹 애플리케이션 개발 기초부터 심화까지",
            date: "2024-01-15",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        { 
            id: 2, 
            title: "React 상태관리의 모든 것", 
            summary: "Redux, Recoil, Zustand 등 다양한 상태관리 라이브러리 비교 분석",
            date: "2024-01-20",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        { 
            id: 3, 
            title: "Docker 컨테이너 실전 가이드", 
            summary: "도커를 활용한 컨테이너화 및 배포 전략",
            date: "2024-01-25",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 4,
            title: "Kubernetes 클러스터 운영하기",
            summary: "쿠버네티스 클러스터 설정부터 운영까지 완벽 가이드",
            date: "2024-02-01",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 5,
            title: "GraphQL API 설계 패턴",
            summary: "효율적인 GraphQL API 설계와 모범 사례",
            date: "2024-02-05",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 6,
            title: "MongoDB 성능 최적화",
            summary: "MongoDB 쿼리 최적화와 인덱싱 전략",
            date: "2024-02-10",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 7,
            title: "TypeScript 고급 기능 활용",
            summary: "타입스크립트의 고급 기능과 실전 응용",
            date: "2024-02-15",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 8,
            title: "마이크로서비스 아키텍처",
            summary: "마이크로서비스 설계와 구현 전략",
            date: "2024-02-20",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 9,
            title: "CI/CD 파이프라인 구축",
            summary: "Jenkins를 활용한 CI/CD 파이프라인 자동화",
            date: "2024-02-25",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 10,
            title: "Redis 캐시 전략",
            summary: "Redis를 활용한 효율적인 캐싱 구현",
            date: "2024-03-01",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 11,
            title: "AWS 클라우드 아키텍처",
            summary: "AWS 서비스를 활용한 확장 가능한 아키텍처 설계",
            date: "2024-03-05",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 12,
            title: "Vue.js 3.0 실전 가이드",
            summary: "Vue 3의 Composition API와 새로운 기능들",
            date: "2024-03-10",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 13,
            title: "ElasticSearch 검색 엔진",
            summary: "ElasticSearch를 활용한 검색 기능 구현",
            date: "2024-03-15",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 14,
            title: "NextJS 서버 사이드 렌더링",
            summary: "NextJS를 활용한 SSR 구현과 최적화",
            date: "2024-03-20",
            thumbnail: "https://via.placeholder.com/300x200"
        },
        {
            id: 15,
            title: "머신러닝 모델 배포하기",
            summary: "TensorFlow 모델 서비스 배포와 운영",
            date: "2024-03-25",
            thumbnail: "https://via.placeholder.com/300x200"
        }
    ];

    return (
        <div className="category-page">
            <h1>Category {id}</h1>
            <div className="post-grid">
                {samplePosts.map((post) => (
                    <div key={post.id} className="post-card">
                        <div className="post-thumbnail">
                            <img src={post.thumbnail} alt={post.title} />
                        </div>
                        <div className="post-content">
                            <h2>{post.title}</h2>
                            <p className="post-summary">{post.summary}</p>
                            <span className="post-date">{post.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 