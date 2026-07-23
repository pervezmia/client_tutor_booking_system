import SearchBar from './SearchBar';

const TutorsHeader = () => {
    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Find Your{' '}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-500 to-brand-700">Perfect</span>{' '}
            Tutor
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Connect with expert tutors across every subject. Book a session and start learning today.
        </p>
        <div className="max-w-2xl mx-auto pt-4">
            <SearchBar></SearchBar>
        </div>
    </div>
</header>
    );
};

export default TutorsHeader;