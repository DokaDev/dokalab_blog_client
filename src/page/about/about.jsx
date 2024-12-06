import React from "react";
import './about.css';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function About() {
    usePageTitle('About');

    return (
        <div className="about-container">
            <h1>About Me</h1>
            <p>
                Welcome to my blog! I'm a versatile software engineer with expertise across multiple domains, 
                including Frontend, Backend, DevOps, and Artificial Intelligence. I thrive on tackling challenges 
                and delivering impactful solutions.
            </p>

            <h2>Tech Stack</h2>
            <h3>Languages</h3>
            <p>
                X86_64 Assembly, GCC, G++, C#, Java, JavaScript, HTML5, CSS3, Lua
            </p>
            <h3>Libraries / Frameworks</h3>
            <p>
                React, jQuery, OpenCV, Django, TensorFlow, PyTorch, Selenium, LangChain, Spring, Spring Data JPA, 
                Spring Data Elasticsearch, Discord.js, Bootstrap, Express.js, and more.
            </p>
            <h3>Database</h3>
            <p>
                MySQL, MongoDB, SQLite, Elasticsearch
            </p>
            <h3>Middlewares / DevOps</h3>
            <p>
                Redis, NGINX, Docker, Kubernetes (K8S), Jenkins, Logstash, Kibana, MinIO
            </p>
            <h3>Operating Systems</h3>
            <p>
                MacOS, Fedora, CentOS, Ubuntu, Debian, Kali Linux, Arch Linux
            </p>

            <h2>Contact</h2>
            <p>
                Feel free to reach out to me at: awesome_devnet@outlook.com
            </p>
        </div>
    );
}