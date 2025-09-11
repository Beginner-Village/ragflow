import kbApiTokenService from '@/services/kb-api-token-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useCallback } from 'react';
import { useParams } from 'umi';
import { useFetchKnowledgeBaseConfiguration } from './use-knowledge-request';

interface KbApiToken {
  id: string;
  kb_id: string;
  token: string;
  name: string;
  description?: string;
  permissions: string[];
  status: 'active' | 'disabled';
  expires_at?: string;
  create_date: string;
  created_by: string;
}

interface CreateTokenRequest {
  name: string;
  description?: string;
  permissions?: string[];
  expires_days?: number;
}

export const useKbApiKey = () => {
  const { id: datasetId } = useParams();
  const queryClient = useQueryClient();
  const { data: kbData = {} } = useFetchKnowledgeBaseConfiguration();

  // 获取token列表
  const {
    data: tokenList = [],
    isLoading: loading,
    refetch: fetchTokenList,
  } = useQuery({
    queryKey: ['kb-api-tokens', datasetId],
    queryFn: async () => {
      if (!datasetId) return [];
      try {
        const response = await kbApiTokenService.getKbTokens(datasetId);
        return Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to fetch KB tokens:', error);
        return [];
      }
    },
    enabled: !!datasetId,
  });

  // 创建token
  const createTokenMutation = useMutation({
    mutationFn: async (tokenData: CreateTokenRequest) => {
      if (!datasetId) throw new Error('Dataset ID is required');
      return await kbApiTokenService.createKbToken(datasetId, tokenData);
    },
    onSuccess: (data) => {
      message.success('API token created successfully');
      queryClient.invalidateQueries({ queryKey: ['kb-api-tokens', datasetId] });
      return data?.data;
    },
    onError: (error: any) => {
      message.error(error?.message || 'Failed to create API token');
    },
  });

  // 更新token状态
  const updateTokenMutation = useMutation({
    mutationFn: async ({
      tokenId,
      status,
    }: {
      tokenId: string;
      status: 'active' | 'disabled';
    }) => {
      if (!datasetId) throw new Error('Dataset ID is required');
      return await kbApiTokenService.updateKbToken(datasetId, tokenId, {
        status,
      });
    },
    onSuccess: (_, { status }) => {
      message.success(
        `Token ${status === 'active' ? 'enabled' : 'disabled'} successfully`,
      );
      queryClient.invalidateQueries({ queryKey: ['kb-api-tokens', datasetId] });
    },
    onError: (error: any) => {
      message.error(error?.message || 'Failed to update token status');
    },
  });

  // 删除token
  const deleteTokenMutation = useMutation({
    mutationFn: async (tokenId: string) => {
      if (!datasetId) throw new Error('Dataset ID is required');
      return await kbApiTokenService.deleteKbToken(datasetId, tokenId);
    },
    onSuccess: () => {
      message.success('API token deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['kb-api-tokens', datasetId] });
    },
    onError: (error: any) => {
      message.error(error?.message || 'Failed to delete API token');
    },
  });

  const createKbToken = useCallback(
    async (tokenData: CreateTokenRequest) => {
      return new Promise((resolve) => {
        createTokenMutation.mutate(tokenData, {
          onSuccess: (data) => resolve(data?.data),
          onError: () => resolve(null),
        });
      });
    },
    [createTokenMutation],
  );

  const updateTokenStatus = useCallback(
    async (tokenId: string, status: 'active' | 'disabled') => {
      return new Promise<boolean>((resolve) => {
        updateTokenMutation.mutate(
          { tokenId, status },
          {
            onSuccess: () => resolve(true),
            onError: () => resolve(false),
          },
        );
      });
    },
    [updateTokenMutation],
  );

  const deleteKbToken = useCallback(
    async (tokenId: string) => {
      return new Promise<boolean>((resolve) => {
        deleteTokenMutation.mutate(tokenId, {
          onSuccess: () => resolve(true),
          onError: () => resolve(false),
        });
      });
    },
    [deleteTokenMutation],
  );

  const generateCurlExample = useCallback(
    (token: string) => {
      const serverUrl = window.location.origin;
      return `curl -X POST "${serverUrl}/api/retrieval" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d '{
    "kb_id": "${datasetId || 'YOUR_KB_ID'}",
    "question": "你的问题",
    "top_k": 10
  }'`;
    },
    [datasetId],
  );

  return {
    tokenList: Array.isArray(tokenList) ? tokenList : [],
    loading,
    creatingLoading: createTokenMutation.isPending,
    kbData,
    fetchTokenList,
    createKbToken,
    updateTokenStatus,
    deleteKbToken,
    generateCurlExample,
  };
};
