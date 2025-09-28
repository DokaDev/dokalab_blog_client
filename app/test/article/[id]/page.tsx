import { getBlogClient } from "@/lib/apollo/apollo-client";
import { gql } from "@apollo/client";

const GET_POST_BY_ID = gql`
  query Query($findPostByIdId: Int!) {
    findPostById(id: $findPostByIdId) {
      id
      createdAt
      content
      postNumber
      readTime
      title
    }
  }
`;

interface Post {
  id: number;
  createdAt: string;
  content: string;
  postNumber: number;
  readTime: number;
  title: string;
}

interface PostResponse {
  findPostById: Post;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  try {
    const { data } = await getClient().query<PostResponse>({
      query: GET_POST_BY_ID,
      variables: {
        findPostByIdId: parseInt(params.id), // string을 number로 변환
      },
    });

    if (data === undefined || !data.findPostById ) {
      throw new Error("포스트를 찾을 수 없습니다");
    }

    const post = data.findPostById;

    return (
      <main className="blog-container">
        <article className="blog-post">
          <header className="mb-xl">
            <h1 className="blog-post__title">{post.title}</h1>
            <div className="blog-post__meta">
              <span>포스트 번호: {post.postNumber}</span>
              <span>읽는 시간: {post.readTime}분</span>
              <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </header>
          
          <div className="blog-post__content">
            {/* 마크다운 렌더링은 나중에 */}
            <pre>{post.content}</pre>
          </div>
        </article>
      </main>
    );
  } catch (error) {
    return (
      <main className="blog-container">
        <div className="p-lg bg-gray-100 rounded">
          <h1>포스트를 찾을 수 없습니다</h1>
          <p>에러: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </main>
    );
  }
}