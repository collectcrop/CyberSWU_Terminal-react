import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Article = () => {
  const { articleId } = useParams();  // 从 URL 参数获取 articleId
  const [content,setContent] = useState("")
  useEffect(() => {
    // 定义一个异步函数来获取文章内容
    const fetchArticleContent = async () => {
      try {
        // 发送 GET 请求获取文章内容
        const res = await axios.get(`http://127.0.0.1:5000/api/knowledge/article/${articleId}`);
        setContent(res.data.content);  // 将文章内容存储到 state 中
        console.log(res);  // 打印响应内容以调试
      } catch (error) {
        console.error('Error fetching article:', error);  // 处理错误
      }
    };

    // 调用异步函数
    fetchArticleContent();
  }, [articleId]);

  return (
    <div className="flex flex-1 flex-col items-center px-3 lg:px-6 bg-customed-color">
      {/* 渲染标题 */}
      <h1 className="text-3xl flex flex-row space-x-4 items-center w-full max-w-5xl 
      justify-start print:justify-center font-bold mt-8 print:mt-16">Article {articleId}</h1>
      {/* 渲染其他信息 */}
      <div className="flex flex-row items-center w-full max-w-5xl justify-start print:justify-center
       space-x-6 print:space-x-2 opacity-60 flex-wrap py-3">
        <a className="hover:underline font-bold flex flex-row space-x-2 items-center inactive no-underline text-black">
          {/* 用户信息跳转链接 */}
          <img src="/images/people.svg" alt="User Avatar" className="w-5 h-5 rounded-full" />
          <span>composer</span>
        </a>
        <div className="font-bold flex flex-row space-x-2 items-center">
          {/* 发布日期 */}
          <img className="w-5 h-5" src="/images/calendar1.svg"></img>
          <span>2025-02-19 13:33:33</span>
        </div>
        <div className="font-bold flex flex-row space-x-2 items-center print:hidden">
          {/* 更新日期 */}
          <img className="w-5 h-5" src="/images/calendar2.svg"></img>
          <span>2025-02-19 18:19:26</span>
        </div>
      </div>
      {/* 在这里展示文章的内容 */}
      <article className="article !max-w-5xl w-full self-center">
        <ReactMarkdown
          children={content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
    </article>
    </div>
  );
};

export default Article;