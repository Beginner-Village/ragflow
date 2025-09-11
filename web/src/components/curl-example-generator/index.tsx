import CopyToClipboard from '@/components/copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CurlExampleGeneratorProps {
  kbId: string;
  tokens: Array<{
    id: string;
    name: string;
    token: string;
    status: string;
  }>;
  className?: string;
}

const CurlExampleGenerator = ({
  kbId,
  tokens,
  className = '',
}: CurlExampleGeneratorProps) => {
  const { t } = useTranslation();
  const [selectedTokenId, setSelectedTokenId] = useState<string>('');

  const activeTokens = tokens.filter((token) => token.status === 'active');

  const generateCurlExample = (token?: string) => {
    if (!token) return '';

    const serverUrl = window.location.origin;
    return `curl -X POST "${serverUrl}/api/retrieval" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d '{
    "kb_id": "${kbId}",
    "question": "你的问题",
    "top_k": 10,
    "similarity_threshold": 0.2,
    "vector_similarity_weight": 0.3,
    "highlight": true
  }'`;
  };

  const selectedToken = activeTokens.find(
    (token) => token.id === selectedTokenId,
  );
  const curlExample = selectedToken
    ? generateCurlExample(selectedToken.token)
    : '';

  const generatePythonExample = (token?: string) => {
    if (!token) return '';

    const serverUrl = window.location.origin;
    return `import requests

url = "${serverUrl}/api/retrieval"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${token}"
}
data = {
    "kb_id": "${kbId}",
    "question": "你的问题",
    "top_k": 10,
    "similarity_threshold": 0.2,
    "vector_similarity_weight": 0.3,
    "highlight": True
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`;
  };

  const pythonExample = selectedToken
    ? generatePythonExample(selectedToken.token)
    : '';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>API 使用示例</span>
          {activeTokens.length > 0 && (
            <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择 API Token" />
              </SelectTrigger>
              <SelectContent>
                {activeTokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTokens.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>请先创建 API Token 以查看使用示例</p>
          </div>
        ) : !selectedTokenId ? (
          <div className="text-center py-8 text-gray-500">
            <p>请选择一个 API Token 查看使用示例</p>
          </div>
        ) : (
          <>
            {/* cURL Example */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">cURL</h4>
                <CopyToClipboard text={curlExample}>
                  <Button variant="outline" size="sm">
                    复制 cURL
                  </Button>
                </CopyToClipboard>
              </div>
              <Textarea
                value={curlExample}
                readOnly
                className="font-mono text-xs resize-none"
                rows={8}
              />
            </div>

            {/* Python Example */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Python</h4>
                <CopyToClipboard text={pythonExample}>
                  <Button variant="outline" size="sm">
                    复制 Python
                  </Button>
                </CopyToClipboard>
              </div>
              <Textarea
                value={pythonExample}
                readOnly
                className="font-mono text-xs resize-none"
                rows={12}
              />
            </div>

            {/* API Endpoints */}
            <div className="space-y-2">
              <h4 className="font-medium">可用的 API 端点</h4>
              <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                <div>
                  <code className="text-xs">POST /api/retrieval</code> -
                  知识库检索
                </div>
                <div>
                  <code className="text-xs">POST /api/completion</code> -
                  对话完成
                </div>
                <div>
                  <code className="text-xs">GET /api/list_chunks</code> -
                  获取文档片段
                </div>
                <div>
                  <code className="text-xs">GET /api/list_kb_docs</code> -
                  获取知识库文档列表
                </div>
              </div>
            </div>

            {/* Parameters Description */}
            <div className="space-y-2">
              <h4 className="font-medium">参数说明</h4>
              <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                <div>
                  <code className="text-xs">kb_id</code> - 知识库ID（必需）
                </div>
                <div>
                  <code className="text-xs">question</code> - 查询问题（必需）
                </div>
                <div>
                  <code className="text-xs">top_k</code> -
                  返回结果数量（可选，默认6）
                </div>
                <div>
                  <code className="text-xs">similarity_threshold</code> -
                  相似度阈值（可选，0-1）
                </div>
                <div>
                  <code className="text-xs">vector_similarity_weight</code> -
                  向量相似度权重（可选，0-1）
                </div>
                <div>
                  <code className="text-xs">highlight</code> -
                  是否高亮匹配文本（可选，布尔值）
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CurlExampleGenerator;
