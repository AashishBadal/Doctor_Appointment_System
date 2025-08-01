import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const TipsPage = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");


 const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const prompt = `answer like a doctor. answer in 5 points health tip.Suggest which specialist should i visit. i have following problems. ${input}`;

    const { data } = await axios.post("/api/ai/generate-tips", {
      prompt,
    });
    
    if (data.success) {
      setContent(data.content);
    } else {
      toast.error(data.message || 'Failed to generate tip');
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-row gap-4 text-slate-700">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-1g border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Get a Health Tip</h1>
        </div>
        <p className="mt-6 text-sm. font-medium">Enter your Problem</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-5" />
          )}
          Generate Tip
        </button>
      </form>
      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Tip</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              I
              <Edit className="w-9 h-9" />
              <p>Enter your problem and click Generate Tip to get a health tip</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipsPage;