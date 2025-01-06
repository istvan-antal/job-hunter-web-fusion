export const SourceIcon = ({ source }: { source: string }) => {
    switch (source) {
        case 'linkedin':
            return <img src="/sources/linkedin.svg" alt="Linkedin" width={24} height={24} />;
        case 'upwork':
            return <img src="/sources/upwork.svg" alt="UpWork" width={24} height={24} />;
        case 'total_jobs':
            return <img src="/sources/total_jobs.svg" alt="UpWork" width={24} height={24} />;
        case 'cv_library':
            return <img src="/sources/cv_library.png" alt="UpWork" width={24} height={24} />;
        case 'reed':
            return <img src="/sources/reed.png" alt="UpWork" width={24} height={24} />;
        default:
            return (
                <div className="size-[24px] flex items-center overflow-hidden bg-sky-400 rounded-md border-2 border-blue-700 b">
                    {source}
                </div>
            );
    }
};
