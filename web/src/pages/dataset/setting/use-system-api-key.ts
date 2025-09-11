import { useShowDeleteConfirm } from '@/hooks/common-hooks';
import {
  useCreateSystemToken,
  useFetchSystemTokenList,
  useRemoveSystemToken,
} from '@/hooks/user-setting-hooks';
import { useCallback } from 'react';

export const useSystemApiKey = () => {
  const { removeToken } = useRemoveSystemToken();
  const { createToken, loading: creatingLoading } = useCreateSystemToken();
  const { data: tokenList, loading: listLoading } = useFetchSystemTokenList();

  const showDeleteConfirm = useShowDeleteConfirm();

  const onRemoveToken = (token: string) => {
    showDeleteConfirm({
      onOk: () => removeToken(token),
    });
  };

  const onCreateToken = useCallback(() => {
    createToken({});
  }, [createToken]);

  return {
    removeToken: onRemoveToken,
    createToken: onCreateToken,
    tokenList,
    creatingLoading,
    listLoading,
  };
};
