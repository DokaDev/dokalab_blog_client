import { getBlogClient } from "@/lib/apollo/apollo-client";
import { gql } from "@apollo/client";

const FIND_ALL_BOARDS = gql`
  query FindAllBoards {
    findAllBoards {
      id
      slug
      title
      deletedAt
      createdAt
      boardGroup {
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

interface Board {
  id: number;
  slug: string;
  title: string;
  deletedAt: string | null;
  createdAt: string;
  boardGroup: BoardGroup;
}

interface BoardsResponse {
  findAllBoards: Board[];
}

export default async function BoardPage() {
  try {
    const { data } = await getBlogClient().query<BoardsResponse>({
      query: FIND_ALL_BOARDS,
    });

    if (data === undefined || !data.findAllBoards) {
      throw new Error("보드를 찾을 수 없습니다");
    }

    const boards = data.findAllBoards;

    return (
      <main className="blog-container">
        <header className="mb-xl">
          <h1 className="blog-post__title">모든 보드</h1>
          <p className="blog-post__meta">총 {boards.length}개의 보드</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <div key={board.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{board.title}</h2>
                <p className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                  {board.boardGroup.title}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Slug:</span> {board.slug}
                </div>
                <div>
                  <span className="font-medium">생성일:</span>{' '}
                  {new Date(board.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">상태:</span>{' '}
                  <span className={board.deletedAt ? 'text-red-500' : 'text-green-500'}>
                    {board.deletedAt ? '삭제됨' : '활성'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  보드 보기 →
                </button>
              </div>
            </div>
          ))}
        </div>

        {boards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">보드가 없습니다</p>
          </div>
        )}
      </main>
    );
  } catch (error) {
    return (
      <main className="blog-container">
        <div className="p-lg bg-gray-100 rounded">
          <h1>보드를 불러올 수 없습니다</h1>
          <p>에러: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </main>
    );
  }
}