
import SearchBar from './SearchBar';

const TutorsHeader = () => {
    return (
        <header className="bg-white border-b border-slate-200 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Find Your{' '}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-orange-700">Perfect</span>{' '}
            Tutor
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
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