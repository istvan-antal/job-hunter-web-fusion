import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { memo } from 'react';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
  75% {
    transform: translateY(-15px) rotate(270deg);
  }
`;

const GeometricShape = memo(({ 
  shape, 
  size, 
  color, 
  top, 
  left, 
  right, 
  bottom,
  delay = 0 
}: {
  shape: 'circle' | 'rectangle' | 'triangle' | 'pentagon';
  size: number;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}) => {
  const getShapeStyles = () => {
    switch (shape) {
      case 'circle':
        return {
          borderRadius: '50%',
        };
      case 'rectangle':
        return {};
      case 'triangle':
        return {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      case 'pentagon':
        return {
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        };
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: color,
        top,
        left,
        right,
        bottom,
        animation: `${float} ${8 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        ...getShapeStyles(),
      }}
    />
  );
});

const LandingPage = memo(() => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Shapes */}
      <GeometricShape shape="circle" size={60} color="#ff1744" top="10%" left="5%" delay={0} />
      <GeometricShape shape="rectangle" size={80} color="#00e676" top="15%" right="10%" delay={1} />
      <GeometricShape shape="triangle" size={100} color="#ffc107" bottom="20%" left="8%" delay={2} />
      <GeometricShape shape="pentagon" size={70} color="#2196f3" top="60%" right="15%" delay={1.5} />
      <GeometricShape shape="circle" size={40} color="#9c27b0" bottom="15%" right="20%" delay={2.5} />
      <GeometricShape shape="rectangle" size={50} color="#ff5722" top="40%" left="15%" delay={0.5} />
      <GeometricShape shape="circle" size={90} color="#4caf50" bottom="40%" right="5%" delay={3} />
      <GeometricShape shape="triangle" size={60} color="#ff9800" top="25%" left="20%" delay={1.8} />

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          p: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#ff1744',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                A
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                }}
              >
                JOB HUNTER
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Typography sx={{ color: 'white', cursor: 'pointer', fontWeight: 500 }}>
                SEARCH
              </Typography>
              <Typography sx={{ color: 'white', cursor: 'pointer', fontWeight: 500 }}>
                STATS
              </Typography>
              <Typography sx={{ color: 'white', cursor: 'pointer', fontWeight: 500 }}>
                PREFERENCES
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 15 }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
              fontWeight: 900,
              color: 'white',
              mb: 2,
              textShadow: '0 0 20px rgba(255, 23, 68, 0.5)',
              background: 'linear-gradient(45deg, #ff1744, #00e676, #2196f3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 0.9,
            }}
          >
            ACCELERATE
            <br />
            YOUR CAREER
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 400,
              mb: 4,
              letterSpacing: '0.1em',
            }}
          >
            DISCOVER OPPORTUNITIES AND LAND YOUR DREAM JOB WITH
            <br />
            INTELLIGENT JOB MATCHING
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 8 }}>
            <Button
              variant="contained"
              href="/app/search"
              sx={{
                backgroundColor: '#ff1744',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#d50000',
                },
              }}
            >
              SEARCH JOBS
            </Button>
            <Button
              variant="outlined"
              href="/app/stats"
              sx={{
                borderColor: '#ff1744',
                color: '#ff1744',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                '&:hover': {
                  borderColor: '#d50000',
                  backgroundColor: 'rgba(255, 23, 68, 0.1)',
                },
              }}
            >
              VIEW STATS
            </Button>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: '#ccc',
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Job Hunter is an intelligent job search platform that leverages AI to match you with the perfect opportunities.
            Our advanced algorithms analyze job descriptions, requirements, and your preferences to{' '}
            <Box component="span" sx={{ color: '#ff1744', fontWeight: 'bold' }}>
              FIND YOUR IDEAL CAREER MATCH
            </Box>
            . Track applications, analyze market trends, and accelerate your job search with cutting-edge technology.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 3,
            mb: 10,
          }}
        >
          {[
            { number: '10K+', label: 'JOBS ANALYZED' },
            { number: '95%', label: 'MATCH ACCURACY' },
            { number: '500+', label: 'COMPANIES TRACKED' },
            { number: '24/7', label: 'MARKET MONITORING' },
          ].map((stat, index) => (
            <Box
              key={index}
              sx={{
                background: 'linear-gradient(135deg, #00e676, #2196f3)',
                borderRadius: '12px',
                p: 3,
                textAlign: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '2px',
                  borderRadius: '10px',
                  background: '#0a0a0a',
                  zIndex: 1,
                },
                '& > *': {
                  position: 'relative',
                  zIndex: 2,
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: '#00e676',
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  mb: 1,
                }}
              >
                {stat.number}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  whiteSpace: 'pre-line',
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ textAlign: 'center', pb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 900,
              color: 'white',
              mb: 4,
              background: 'linear-gradient(45deg, #ff1744, #00e676)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            READY TO START?
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

export default LandingPage;