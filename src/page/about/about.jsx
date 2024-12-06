import React from "react";
import { usePageTitle } from '../../hooks/usePageTitle';

export default function About() {
    usePageTitle('About');

    return (
        <div>
            <h1>About</h1>
            <p>Welcome to my blog! I'm so glad you are here.</p>
            This is the about page.
        </div>
    );
}