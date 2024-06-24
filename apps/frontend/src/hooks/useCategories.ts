import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryApi from '../api/categoryApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryApi.getAllCategoriesBasic(),
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => CategoryApi.getCategoryById(id),
  });
};

export const useCategoryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['category'],
    mutationFn: CategoryApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
