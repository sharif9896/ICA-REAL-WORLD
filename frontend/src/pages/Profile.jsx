import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function Profile() {
  const { userId } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return (
    <div>
      {user.firstName} {user.lastName} — {user.email}
    </div>
  );
}
export default Profile;
