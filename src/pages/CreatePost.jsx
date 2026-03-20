import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  body: z.string().min(5, "El contenido debe tener al menos 5 caracteres"),
});

function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setSuccess(false);

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json",
        },
      });

      setSuccess(true);
      setForm({ title: "", body: "" });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-orange-600 via-red-600 to-red-800 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
          Crear Post
        </h1>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 mb-2 rounded-lg border 
          bg-white dark:bg-gray-700 dark:text-white"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title}</p>
        )}

        {/* TEXTAREA */}
        <textarea
          placeholder="Contenido"
          value={form.body}
          onChange={(e) =>
            setForm({ ...form, body: e.target.value })
          }
          className="w-full p-3 mb-2 rounded-lg border 
          bg-white dark:bg-gray-700 dark:text-white"
        />
        {errors.body && (
          <p className="text-red-500 text-sm">{errors.body}</p>
        )}

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-blue-500 text-white p-3 rounded-lg 
          hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {/* SUCCESS */}
        {success && (
          <p className="text-green-500 mt-3 text-center">
            Post creado correctamente ✅
          </p>
        )}

      </form>
    </div>
  );
}

export default CreatePost;