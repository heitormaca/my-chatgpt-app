import ChatGPTQuestionForm from "@/components/ChatGPTQuestionForm";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">ChatGPT</h1>
      <ChatGPTQuestionForm />
    </main>
  );
}
