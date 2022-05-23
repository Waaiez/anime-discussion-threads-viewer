import { toast } from "react-toastify";

export default function showToast({ errorName, errorStatus, errorId }) {
  toast.error(
    <>
      <div className="font-semibold text-black">{errorName}</div>
      <div className="font-semibold text-black">{errorStatus}</div>
      <div className="font-semibold text-black">Try again in a few minutes</div>
    </>,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      toastId: errorId,
    }
  );
}
