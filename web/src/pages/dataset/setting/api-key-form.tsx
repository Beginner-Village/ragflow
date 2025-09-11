import CopyToClipboard from '@/components/copy-to-clipboard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSetModalState } from '@/hooks/common-hooks';
import { formatDate } from '@/utils/date';
import { DeleteOutlined, KeyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SystemApiKeyModal from './system-api-key-modal';
import { useSystemApiKey } from './use-system-api-key';

export const ApiKeyForm = () => {
  const { t } = useTranslation();
  const { visible: modalVisible, hideModal, showModal } = useSetModalState();

  const { tokenList, listLoading, removeToken } = useSystemApiKey();

  return (
    <div className="space-y-6">
      <Alert>
        <KeyOutlined className="h-4 w-4" />
        <AlertDescription>
          这里显示系统级API密钥，可以访问所有知识库。创建、删除和复制功能已集成到此页面。
        </AlertDescription>
      </Alert>

      {/* Token Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>API KEY</span>
            <Button onClick={showModal}>
              <KeyOutlined className="mr-2 h-4 w-4" />
              创建新密钥
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {listLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : !tokenList || tokenList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <KeyOutlined className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>还没有API Key</p>
              <p className="text-sm">点击上方按钮创建新的API密钥</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>创建于</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenList.map((token) => (
                  <TableRow key={token.token}>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {token.token}
                      </code>
                    </TableCell>
                    <TableCell>{formatDate(token.create_date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CopyToClipboard text={token.token}>
                          <Button variant="ghost" size="sm">
                            复制
                          </Button>
                        </CopyToClipboard>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeToken(token.token)}
                        >
                          <DeleteOutlined className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {modalVisible && <SystemApiKeyModal hideModal={hideModal} />}
    </div>
  );
};
