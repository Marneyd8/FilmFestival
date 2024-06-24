import { z } from 'zod';
import { createCategorySchema } from '../../schemas/categorySchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryCreate } from '../../hooks/useCategories';

type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

const CreateCategoryForm = () => {
  const { mutateAsync: createCategory } = useCategoryCreate();

  const { register, handleSubmit } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    await createCategory(data);
    console.log('Category has been created!', data);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-xl mb-4">Create new category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register('name', { required: 'Name is required' })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Name"
        />
        <button
          type="submit"
          className="mt-4 bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
