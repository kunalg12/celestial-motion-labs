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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.1) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <motion.div
          className="font-display text-[150px] md:text-[200px] font-bold leading-none text-gradient-cosmic mb-4"
          animate={{ 
            textShadow: [
              '0 0 40px hsla(199, 89%, 48%, 0.3)',
              '0 0 80px hsla(199, 89%, 48%, 0.5)',
              '0 0 40px hsla(199, 89%, 48%, 0.3)',
            ] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Lost in Space
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto px-4">
          The page you're looking for has drifted beyond our orbit. Let's navigate back home.
        </p>
        <motion.button
          onClick={() => navigate('/')}
          className="glow-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Home className="w-5 h-5" />
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
