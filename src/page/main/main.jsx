import React from "react";
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Main() {
    usePageTitle('Home');

    return (
        <div>
            <h1>Welcome to DokaDev</h1>
            
            <p>
                Hey there! 👋 I'm a passionate software developer who loves turning complex problems into elegant solutions. This blog is my digital garden where I share my journey through the ever-evolving world of technology.
            </p>

            <p>
                Here, you'll find in-depth tutorials, practical coding tips, and my personal insights on software development. I mainly focus on web development, particularly with React and modern JavaScript, but I also explore various other technologies that catch my interest.
            </p>

            <p>
                Whether you're a fellow developer, a beginner just starting out, or simply curious about technology, I hope you'll find something valuable here. Feel free to explore the categories on the left to find topics that interest you!
            </p>

            <p>
                Happy coding! ✨
            </p>
        </div>
    );
}