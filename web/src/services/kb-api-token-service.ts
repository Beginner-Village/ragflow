import request from '@/utils/request';

// 知识库API Token管理服务
export const createKbToken = (
  kbId: string,
  data: {
    name: string;
    description?: string;
    permissions?: string[];
    expires_days?: number;
  },
) => {
  return request(`/v1/kb/${kbId}/tokens`, {
    method: 'POST',
    data,
  });
};

export const getKbTokens = (kbId: string) => {
  return request(`/v1/kb/${kbId}/tokens`, {
    method: 'GET',
  });
};

export const updateKbToken = (
  kbId: string,
  tokenId: string,
  data: {
    status: 'active' | 'disabled';
  },
) => {
  return request(`/v1/kb/${kbId}/tokens/${tokenId}`, {
    method: 'PUT',
    data,
  });
};

export const deleteKbToken = (kbId: string, tokenId: string) => {
  return request(`/v1/kb/${kbId}/tokens/${tokenId}`, {
    method: 'DELETE',
  });
};

const kbApiTokenService = {
  createKbToken,
  getKbTokens,
  updateKbToken,
  deleteKbToken,
};

export default kbApiTokenService;
