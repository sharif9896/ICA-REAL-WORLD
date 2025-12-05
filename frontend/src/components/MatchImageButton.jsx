import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../../utils/util";

const MatchImageButton = () => {
  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}api/images/match-images`
      );
      toast.success("Images uploaded and linked to students!");
      console.log(res.data.output);
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 mr-[10px] cursor-pointer px-1 py-1  text-white  rounded"
    >
      Upload Images
    </button>
  );
};

export default MatchImageButton;
