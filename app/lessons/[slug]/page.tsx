import { getLessonBySlug, getLessons } from "@/lib/fetchData";
import { notFound } from "next/navigation";
import LessonDetail from "@/components/views/LessonDetail";

export async function generateStaticParams() {
	const lessons = await getLessons();
	return lessons.map((lesson: { slug: string }) => ({
		slug: lesson.slug,
	}));
}
export const revalidate = 60; // Revalidate every 60 seconds

export default async function SingleLessonPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;
	const lesson = await getLessonBySlug(resolvedParams.slug);

	if (!lesson) {
		notFound();
	}

	return (
		<div className="min-h-screen">
			<LessonDetail lesson={lesson} />
		</div>
	);
}
