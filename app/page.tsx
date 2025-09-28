export default function Home() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold">Doka's Laboratory</h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Test: IBM Plex Mono</h2>

        <div className="space-y-2">
          <p className="text-lg">Regular Weight (400): The quick brown fox jumps over the lazy dog</p>
          <p className="text-lg font-medium">Medium Weight (500): ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="text-lg font-semibold">Semibold Weight (600): abcdefghijklmnopqrstuvwxyz</p>
          <p className="text-lg font-bold">Bold Weight (700): 1234567890 !@#$%^&*()</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Code Sample</h3>
          <pre className="text-sm">
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`}
          </pre>
        </div>

        <div className="text-sm text-gray-600">
          <p>Korean Text Test: 안녕하세요! 한글 폰트 테스트입니다.</p>
          <p>Numbers: 0123456789</p>
          <p>Symbols: ~`!@#$%^&*()_+-={'{'}[]:&quot;;&apos;?/&gt;.&lt;,</p>
        </div>
      </div>
    </div>
  )
}