type RankType = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

interface ResultHeadingProps {
    rank: RankType;
    subtitle?: string;
    message?: string;
}

const rankMessages = {
    S: { title: 'S-RANK', subtitle: 'Level Cleared!', message: 'Sugoi! You really know your stuff! Your knowledge is over 9000!' },
    A: { title: 'A-RANK', subtitle: 'Excellent!', message: 'Amazing performance! You\'re a true otaku!' },
    B: { title: 'B-RANK', subtitle: 'Great Job!', message: 'Well done! Keep practicing to reach the top!' },
    C: { title: 'C-RANK', subtitle: 'Good Effort!', message: 'Not bad! A little more practice will improve your score.' },
    D: { title: 'D-RANK', subtitle: 'Keep Trying!', message: 'You can do better! Study up and try again.' },
    F: { title: 'F-RANK', subtitle: 'Game Over', message: 'Don\'t give up! Every master was once a beginner.' },
};

export function ResultHeading({ rank, subtitle, message }: ResultHeadingProps) {
    const defaults = rankMessages[rank];

    return (
        <div className="text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/70 tracking-tighter mb-2 italic">
                {defaults.title}
            </h1>
            <p className="text-3xl font-bold text-primary mb-6 tracking-wide uppercase">
                {subtitle || defaults.subtitle}
            </p>
            <p className="text-white/70 text-lg mb-8 max-w-md">
                {message || defaults.message}
            </p>
        </div>
    );
}
