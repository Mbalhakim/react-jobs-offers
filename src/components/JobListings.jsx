import { useState, useEffect, Suspense } from 'react';
import JobListing from './JobListing';
import JobListingSkeleton from '../Skeletons/JobListingSkeleton';

const JobListings = ({ IsHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulate a delay of 0.3 seconds before fetching data
        await new Promise(resolve => setTimeout(resolve, 300));

        const result = await fetch('/api/jobs');
        const data = await result.json();
        IsHome ? setJobs(data.slice(-3)) : setJobs(data);
      } catch(error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {IsHome ? 'Recent Jobs' : ' Browse Jobs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Suspense fallback={<JobListingSkeleton />}>
              {loading ? (
                // Render skeleton component while loading
                <JobListingSkeleton />
              ) : (
                // Render actual job listings when data is available
                jobs.map((job) => <JobListing key={job.id} job={job} />)
              )}
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;
