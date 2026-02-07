import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.15) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 glass-panel p-12 md:p-16 rounded-3xl text-center max-w-2xl mx-4"
      >
        <motion.div
          className="font-display text-[120px] md:text-[180px] font-bold leading-none text-gradient-cosmic mb-2 relative"
          animate={{ 
            textShadow: [
              '0 0 40px hsla(199, 89%, 48%, 0.2)',
              '0 0 80px hsla(199, 89%, 48%, 0.4)',
              '0 0 40px hsla(199, 89%, 48%, 0.2)',
            ] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
          {/* Orbiting element */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[110%] h-[40%] border border-primary/30 rounded-[100%] -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
        </motion.div>
        
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Lost in Space
        </h1>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto text-lg">
          The coordinates you entered have led to uncharted territory. Realign your trajectory to return to base.
        </p>
        
        <motion.button
          onClick={() => navigate('/')}
          className="glow-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 relative overflow-hidden group shadow-lg shadow-primary/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Home className="w-5 h-5" />
            Return to Home
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
