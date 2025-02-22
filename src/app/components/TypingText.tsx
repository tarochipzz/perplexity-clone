import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export const TypingText = ({
  text,
  speed = 20,
}: {
  text: string;
  speed?: number;
}) => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    if (!text) return;

    const referenceRegex = /\[\d+\]\([^)]+\)/g;
    const references = text.match(referenceRegex) || [];

    const textWithoutRefs = text.replace(referenceRegex, "").trim();

    const words = textWithoutRefs.split(" ");
    let index = 0;

    setVisibleText(words[0]);

    const interval = setInterval(() => {
      index++;
      if (index < words.length) {
        setVisibleText((prev) => prev + " " + words[index]);
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ whiteSpace: "normal" }}
    >
      <MarkdownRenderer markdownContent={visibleText} />

      {text.match(/\[\d+\]\([^)]+\)/g)?.map((ref, index) => (
        <MarkdownRenderer key={index} markdownContent={ref} />
      ))}
    </motion.div>
  );
};
