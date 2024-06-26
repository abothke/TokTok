import { useNavigate } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";

const UserProfileHeader = ({ profile }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between p-4">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="flex items-center space-x-2"
      >
        <img src="../img/arrow.svg" alt="" className="max-h-10" />
        <span className="text-xl font-bold">{profile.username}</span>
      </div>
      <div className="flex items-center space-x-4">
        <UserProfileModal />
      </div>
    </header>
  );
};

export default UserProfileHeader;
