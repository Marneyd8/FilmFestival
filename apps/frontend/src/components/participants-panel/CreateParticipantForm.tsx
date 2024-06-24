import { SubmitHandler, useForm } from 'react-hook-form';
import { createParticipantRequestSchema } from '../../schemas/participantSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateParticipant } from '../../hooks/useParticipants';

type CreateParticipantFormData = z.infer<typeof createParticipantRequestSchema>;

const CreateParticipantForm = () => {
  const { mutateAsync: createParticipant } = useCreateParticipant();

  const { register, handleSubmit } = useForm<CreateParticipantFormData>({
    resolver: zodResolver(createParticipantRequestSchema),
  });

  const onSubmit: SubmitHandler<CreateParticipantFormData> = async (data) => {
    await createParticipant(data);
    console.log('Participant has been created!', data);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-xl mb-4">Create new participant</h1>
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

export default CreateParticipantForm;
