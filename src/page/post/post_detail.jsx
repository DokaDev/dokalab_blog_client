import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        console.log("Fetching post with id", id);
    }, []);

    return (
        <div>
            <h1>Post Detail</h1>
            <p>Welcome to my blog! I'm so glad you are here.</p>
            This is the post detail page for post {id}.
        </div>
    );
}