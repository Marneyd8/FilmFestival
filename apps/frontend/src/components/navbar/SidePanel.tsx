import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../ui/LoginButton';
import { LinkInfo } from './types';
import { useLocalStorageUser } from '../../hooks/useAuth';
import PlainButton from '../ui/PlainButton';

type SidePanelProps = {
  close: () => void;
  links: LinkInfo[];
};

const SidePanel: FC<SidePanelProps> = ({ close, links }) => {
  const [user, setUser] = useLocalStorageUser();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={close}>
      <div className="absolute top-0 right-0 bg-white w-2/3 h-full shadow-lg flex flex-col items-center">
        {links.map(({ title, path }) => (
          <div className="border-b-4 text-center p-5 text-2xl w-full">
            <Link key={path} className="cursor-pointer font-bold" to={path}>
              {title}
            </Link>
          </div>
        ))}
        <div className="text-2xl mt-5">
          {user ? (
            <div className="flex flex-col gap-1">
              <PlainButton
                color="rose-900"
                link="/home"
                title="Logout"
                onClick={() => setUser(null)}
              />
              {user.isAdmin && (
                <PlainButton
                  color="rose-900"
                  link="/admin/panel"
                  title="Admin panel"
                />
              )}
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
