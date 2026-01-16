import connectDB from "@/db/connectDB";
import { Url } from "@/models/url.models";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  await connectDB();

  const { preferWord } = await params
  
  const urlData = await Url.findOne({ preferWord });

  if (!urlData) {
    // optional: redirect to 404 page
    redirect("/404");
  }

  let finalUrl = urlData.originalUrl;

  if (!finalUrl.startsWith("http")) {
    finalUrl = `https://${finalUrl}`;
  }

  redirect(finalUrl);
}