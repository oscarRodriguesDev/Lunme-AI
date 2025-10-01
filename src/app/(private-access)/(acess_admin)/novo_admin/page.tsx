"use client";
import { useState } from "react";
import HeadPage from "@/app/(private-access)/components/headPage";
import { FaUserCheck } from "react-icons/fa";
import { useAccessControl } from "@/app/context/AcessControl";
import { showErrorMessage, showSuccessMessage } from "@/app/util/messages";

export default function CadastroAdmin() {
  /**
   * useState para definição do perfil que está sendo criado
   */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const [loading, setLoading] = useState(false);
  const { role, hasRole } = useAccessControl(); // role é string | null

  /**
   * captura os valores dos campos de texto
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (!name) {
      console.warn('Input sem atributo "name" ignorado.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * apenas limpa os campos para um novo cadastro
   */
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "", // padrão
    });
  };

  /**
   * função envia os dados para o backend
   */
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {

    if (formData.role === "") {
      showErrorMessage("Você precisa selecionar o tipo de usuario corretamente!");
      return
    }
    event.preventDefault();
    setLoading(true);
    const payload = { ...formData };
    try {
      const response = await fetch("/api/internal/register_admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        showSuccessMessage("Usuário cadastrado com sucesso!");
        resetForm();
      } else {
        showErrorMessage(data.message || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      showErrorMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // garante que role sempre seja string
  const currentRole = role ?? "";

  return (
    <>
      <HeadPage title="Novo Administrador" icon={<FaUserCheck size={20} />} />

      {["ADMIN", "PISICOLOGO_ADM"].includes(currentRole) ? (
        <div className="max-w-lg mt-[10%] mx-auto p-6 bg-[#1E1E1E] rounded-lg shadow-lg border border-[#333333]">
          <h2 className="text-xl font-bold mb-4 text-[#E6FAF6]">
            Cadastro de Usuário
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded border border-[#333333] bg-[#2A2A2A] text-[#E6FAF6] focus:outline-none focus:ring-2 focus:ring-[#1DD1C1]"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded border border-[#333333] bg-[#2A2A2A] text-[#E6FAF6] focus:outline-none focus:ring-2 focus:ring-[#1DD1C1]"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded border border-[#333333] bg-[#2A2A2A] text-[#E6FAF6] focus:outline-none focus:ring-2 focus:ring-[#1DD1C1]"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded border border-[#333333] bg-[#2A2A2A] text-[#E6FAF6] focus:outline-none focus:ring-2 focus:ring-[#1DD1C1]"
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded border border-[#333333] bg-[#2A2A2A] text-[#E6FAF6] focus:outline-none focus:ring-2 focus:ring-[#1DD1C1]"
              required
            >
              {currentRole === "ADMIN" ? (
                <>
                  <option value="">selecione o tipo de usuario</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="PISICOLOGO_ADM">
                    Psicólogo Administrador
                  </option>

                  <option value="PSYCHOLOGIST">Psicólogo</option>
                </>
              ) : (
                <>
                  <option value="">selecione o tipo de usuario</option>
                  <option value="PSYCHOLOGIST">Psicólogo</option>
                </>
              )}
            </select>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-[#1DD1C1] hover:bg-[#009E9D] text-white font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DD1C1]/50"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Usuário"}
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-lg mx-auto p-6 bg-[#1E1E1E] rounded-lg shadow-lg border border-[#333333] text-[#E6FAF6] text-center">
          <h3>Acesso apenas para Admins</h3>
        </div>
      )}
    </>
  );
}
