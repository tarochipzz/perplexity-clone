// https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
"use client";

import { useSearchStore } from "@/app/store/searchStore";
import { useParams } from "next/navigation";

export default function SeachThread() {
  const params = useParams();
  const { getSearchThread, threadLoading } = useSearchStore();

  const searchThread = getSearchThread(params.id as string);

  console.log(threadLoading, searchThread);
  return (
    <div>
      <h1>Search Thread</h1>
    </div>
  );
}
