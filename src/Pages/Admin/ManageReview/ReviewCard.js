import React from "react";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import Rating from "react-rating";
import Swal from "sweetalert2";
import primaryAxios from "../../../Api/primaryAxios";
import { ReactComponent as Profile } from "../../../Assets/user.svg";

const ReviewCard = ({ allcard, index, refetch }) => {
  const handleAddToSpecial = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to add this in the homepage!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          const { data } = await primaryAxios.post(`/allreviews`, {
            rating: allcard?.rating,
            review: allcard?.review,
            reviewDate: allcard?.reviewDate,
            author: allcard?.author,
          });
          if (data.success) {
            refetch();
          }
          Swal.fire(
            'Success',
            'Review added to homepage',
            'success'
          )
        })();
      }
    })
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {allcard?.author?.photo ? (
                <img
                  src={allcard?.author?.photo}
                  alt="Avatar Tailwind CSS Component"
                />
              ) : (
                <Profile />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{allcard?.author?.name}</div>
            <div className="">
              <Rating
                className="text-[#FAAF00]"
                initialRating={allcard?.rating}
                readonly
                emptySymbol={<ImStarEmpty />}
                fullSymbol={<ImStarFull />}
              />
            </div>
          </div>
        </div>
      </td>
      <td>
        <label
          htmlFor={allcard?._id}
          className="btn modal-button py-[5px] btn-xs btn-primary tooltip tooltip-bottom tooltip-base-300 font-thin"
          data-tip={allcard?.review.slice(0, 40)}
        >
          View Review
        </label>
        <input type="checkbox" id={allcard?._id} className="modal-toggle" />
        <label htmlFor={allcard?._id} className="modal cursor-pointer">
          <label
            className="modal-box relative whitespace-normal p-4"
            htmlFor=""
          >
            <label
              htmlFor={allcard?._id}
              className="btn btn-xs btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <p className="py-4">{allcard?.review}</p>
          </label>
        </label>
      </td>
      <td>
        <button
          onClick={() => handleAddToSpecial(allcard?._id)}
          className="btn btn-xs btn-outline"
        >
          Add To Homepage
        </button>
      </td>
    </tr>
  );
};

export default ReviewCard;
