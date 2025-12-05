import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import Productitem from "./Productitem";

const FoodItems = () => {
  const [latestproduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const foods = async () => {
      try {
        const foods = await axios.get(`${BACKEND_URL}api/product/getfoods`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("admin")).token
            }`,
          },
        });
        // console.log(foods.data.foods);
        setLatestProduct(foods.data.foods);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    foods();
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-2 ">
        {latestproduct.map((data, index) => (
          <Productitem
            key={index}
            id={data._id}
            name={data.title}
            image={data.image.url}
            price={data.price}
            des={data.description}
          ></Productitem>
        ))}
      </div>
    </>
  );
};

export default FoodItems;
