import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

// Route files
import auth from './routes/authRoutes.js';
import jobs from './routes/jobRoutes.js';
import applications from './routes/applicationRoutes.js';
import companies from './routes/companyRoutes.js';

// Middleware files
import errorHandler from './middleware/error.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // If using cookies/sessions
  }));
  
// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/auth', auth);
app.use('/api/jobs', jobs);
app.use('/api/applications', applications);
app.use('/api/companies', companies);

// Error handler middleware
app.use(errorHandler);

export default app;