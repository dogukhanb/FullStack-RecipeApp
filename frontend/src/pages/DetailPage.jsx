import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import { FaRegClock } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    axios
      .get(`http://127.0.0.1:4000/api/recipes/${id}`)
      .then((res) => setData(res.data.recipe))
      .catch((err) =>
        setError(err.response?.data?.message || "Bir hata oluştu")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (confirm("Silmek istediğinizden emin misiniz?")) {
      axios
        .delete(`http://127.0.0.1:4000/api/recipes/${id}`)
        .then(() => {
          toast.warn("Silme işlemi başarılı oldu");
          navigate("/");
        })
        .catch(() => {
          toast.error("İşlem gerçekleşirken bir hata oluştu");
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!data) {
    return (
      <div className="flex-1 bg-gray-200 p-5 h-screen overflow-auto">
        <div className="flex justify-between">
          <Link
            to={-1}
            className="flex items-center gap-4 text-xl hover:bg-gray-300 p-1 rounded-md"
          >
            <IoMdArrowRoundBack />
            Geri
          </Link>
        </div>
        <p>Veri bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-200 p-5 h-screen overflow-auto">
      <div className="flex justify-between">
        <Link
          to={-1}
          className="flex items-center gap-4 text-xl hover:bg-gray-300 p-1 rounded-md"
        >
          <IoMdArrowRoundBack />
          Geri
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-red-600 transition"
        >
          <FaTrashAlt />
          Sil
        </button>
      </div>

      <div className="max-w-5xl m-auto my-10 flex flex-col gap-10">
        <h1 className="text-3xl font-bold">{data.recipeName}</h1>

        <div className="flex gap-4">
          <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold">
            {data.category}
          </span>

          <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold flex items-center gap-3">
            <FaRegClock />
            {data.recipeTime}
          </span>
        </div>

        <img
          className="rounded-lg max-h-[400px]"
          src={data.image}
          alt={data.recipeName}
        />

        <div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">Malzemeler</h1>

          <ul className="font-semibold text-lg">
            {data.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">Tarif</h1>

          <ol className="font-semibold text-lg list-decimal ps-4">
            {data.instructions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">
            Sunum Önerisi
          </h1>
          <p className="font-semibold text-lg">{data.servingSuggestion}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
