interface QuestionCardProps {
    question: string;
}

export function QuestionCard({ question }: QuestionCardProps) {
    return (
        <section className="w-full bg-glass backdrop-blur-xl border-2 border-white/80 shadow-2xl rounded-2xl p-8 md:p-12 relative overflow-hidden">

            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Text Content */}
                <div className={`flex-1 flex flex-col gap-4`}>
                    <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-md"
                    >
                        {question}
                    </h2>
                </div>
            </div>
        </section>
    );
}
