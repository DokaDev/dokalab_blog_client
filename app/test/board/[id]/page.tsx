import { getBlogClient } from "@/lib/apollo/apollo-client";
import { gql } from "@apollo/client";

const FIND_BOARD_BY_ID = gql`
  query FindBoardById($findBoardByIdId: Int!) {
    findBoardById(id: $findBoardByIdId) {
      id
      createdAt
      slug
      deletedAt
      title
      boardGroup {
        id
        title
      }
      posts {
        id
        title
      }
    }
  }
`;

interface BoardGroup {
  id: number;
  title: string;
}

interface Post {
  id: number;
  title: string;
}

interface Board {
  id: number;
  createdAt: string;
  slug: string;
  deletedAt: string | null;
  title: string;
  boardGroup: BoardGroup;
  posts: Post[];
}

interface BoardResponse {
  findBoardById: Board;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BoardDetailPage({ params }: PageProps) {
  try {
    const { data } = await getBlogClient().query<BoardResponse>({
      query: FIND_BOARD_BY_ID,
      variables: {
        findBoardByIdId: parseInt(params.id),
      },
    });

    if (data === undefined || !data.findBoardById) {
      throw new Error("보드를 찾을 수 없습니다");
    }

    const board = data.findBoardById;

    return (
      <main className="blog-container">
        <article className="blog-post">
          <header className="mb-xl">
            <h1 className="blog-post__title">{board.title}</h1>
            <div className="blog-post__meta">
              <span>보드 ID: {board.id}</span>
              <span>슬러그: {board.slug}</span>
              <span>생성일: {new Date(board.createdAt).toLocaleDateString()}</span>
            </div>
          </header>

          <div className="blog-post__content">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-semibold text-blue-800 mb-2">보드 그룹</h3>
                <p className="text-blue-700">{board.boardGroup.title}</p>
                <p className="text-sm text-blue-600">그룹 ID: {board.boardGroup.id}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">보드 정보</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">상태:</span>{' '}
                    <span className={board.deletedAt ? 'text-red-500' : 'text-green-500'}>
                      {board.deletedAt ? '삭제됨' : '활성'}
                    </span>
                  </div>
                  {board.deletedAt && (
                    <div>
                      <span className="font-medium">삭제일:</span>{' '}
                      {new Date(board.deletedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded">
                <h3 className="font-semibold text-green-800 mb-2">포스트 목록</h3>
                {board.posts.length > 0 ? (
                  <div className="space-y-2">
                    {board.posts.map((post) => (
                      <div key={post.id} className="p-2 bg-white rounded border">
                        <a
                          href={`/test/post/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {post.title}
                        </a>
                        <span className="text-sm text-gray-500 ml-2">#{post.id}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-600">포스트가 없습니다</p>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
    );
  } catch (error) {
    return (
      <main className="blog-container">
        <div className="p-lg bg-gray-100 rounded">
          <h1>보드를 찾을 수 없습니다</h1>
          <p>에러: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </main>
    );
  }
}