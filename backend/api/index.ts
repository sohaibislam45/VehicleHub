import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app.js';
import connectDB from '../src/config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await connectDB();
    // Vercel handles the request/response via the Express app
    // We need to emit the request content to the express app locally
    // but the most robust way often used is wrapping app(req, res)
    // However, since `app` is an express instance, it is a request listener.
    return app(req, res);
}
