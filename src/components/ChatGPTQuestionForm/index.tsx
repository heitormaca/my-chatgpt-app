'use client';

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

const ChatGPTQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('fwioujiouuufeiowufiofuiorfuiofreurioeybguivyg87yuiyufyiufy87ytfe87frwte67');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/chatgpt', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      const axiosError = error as AxiosError
      console.log('MEU ERRO: ', error)
      setError(axiosError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="question" className="block mb-2">Pergunta: </label>
        <input name="question" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus: border-blue-500 text-black" />
        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
          {loading ? 'Loading...' : 'Perguntar'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
      {answer && <p className="mt-5 text-md break-words">Resposta: {answer}</p>}
    </div>
  )
}

export default ChatGPTQuestionForm