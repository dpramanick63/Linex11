import Navbar from '../components/Layout/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
          <h1 className="text-3xl font-bold mb-4">Linex11 HQ</h1>
          <p className="text-slate-400">
            Welcome to the Tactical Board.
          </p>
          <div className="mt-8 p-12 border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/50">
             <p className="text-pitch font-mono">Pitch Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;