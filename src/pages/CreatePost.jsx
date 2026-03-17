import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  body: z.string().min(5, "El contenido debe tener al menos 5 caracteres")
});

function CreatePost() {

  const [form, setForm] = useState({
    title: "",
    body: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json"
      }
    });

    setSuccess(true);
    setForm({ title: "", body: "" });
  };

  return (
    <div className="container">

      <h1>Crear Post</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="text"
            placeholder="Título"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        <div>
          <textarea
            placeholder="Contenido"
            value={form.body}
            onChange={(e) =>
              setForm({ ...form, body: e.target.value })
            }
          />
          {errors.body && <p style={{ color: "red" }}>{errors.body}</p>}
        </div>

        <button type="submit">Enviar</button>

      </form>

      {success && <p style={{ color: "green" }}>Post creado ✅</p>}

    </div>
  );
}

export default CreatePost;