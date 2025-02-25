import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({
  markdownContent,
}: {
  markdownContent: string;
}) {
  return (
    <div className="prose prose-lg max-w-none relative">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ node, ...props }) => (
            <p style={{ marginBottom: "1em" }} {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 style={{ marginBottom: "0.5em" }} className="text-2xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ marginBottom: "0.5em" }} className="text-xl font-semibold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{ marginBottom: "0.5em" }} className="text-md font-semibold" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <div style={{ marginBottom: "1em" }}>
              <ul
                style={{ listStyle: "disc", paddingLeft: "20px" }}
                {...props}
              />
            </div>
          ),
          ol: ({ node, ...props }) => (
            <div style={{ marginBottom: "1.5em" }}>
              <ol
                style={{ listStyle: "decimal", paddingLeft: "20px" }}
                {...props}
              />
            </div>
          ),
          li: ({ node, ...props }) => <li {...props} />,
          a: ({ href, children }) => {
            const extractText = (child: any): string => {
              if (typeof child === "string") return child;
              if (typeof child === "object" && child?.props?.children) {
                return extractText(child.props.children);
              }
              return "";
            };

            const refText = extractText(children);
            const refId = parseInt(refText.replace(/\D/g, ""), 10);

            return (
              <a
                className="relative cursor-pointer text-sm text-primary hover:text-primaryDark hover:bg-text-primary"
                href={href}
                target="_blank"
              >
                <sup className="bg-textGray bg-opacity-20 px-1 rounded text-xs">{refId}</sup>
              </a>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
