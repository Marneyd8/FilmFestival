import CreateFilmForm from '../components/admin-panel/CreateFilmForm';
import CreateCategoryForm from '../components/admin-panel/CreateCategoryForm';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="bg-black">
      <Link to="/admin/participants" className="text-rose-500 mx-8">
        Go to Participants
      </Link>
      <div className="px-8 py-2 min-h-screen flex flex-col md:flex-row gap-5">
        <div className="md:w-8/12">
          <CreateFilmForm />
        </div>
        <div className="md:w-4/12">
          <CreateCategoryForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
