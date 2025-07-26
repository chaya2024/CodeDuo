# Company Site Builder

A reusable Company Site Builder that enables authenticated users to dynamically create and manage fully functional, brandable company websites. Built as an open-source project, it's modular, scalable, and ready for real-world deployment or SaaS adaptation.

## Features

### Frontend
- Clean, responsive template (Home, About, Contact pages)
- Content rendered dynamically via API
- Modern React with TypeScript
- Tailwind CSS for styling
- Mobile-first responsive design

### Backend
- Supabase backend with PostgreSQL database
- REST API for content management
- Real-time data synchronization

### Authentication
- Email/password authentication
- Google OAuth integration
- Protected admin routes
- Role-based access control

### Admin Panel
- CRUD interface for company information
- Form validation with Yup
- Real-time preview capabilities
- User-friendly dashboard

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, API)
- **Routing**: React Router v6
- **Forms**: React Hook Form with Yup validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd company-site-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`
   - Add your Supabase credentials

4. **Set up the database**
   - Run the SQL migrations in your Supabase dashboard
   - Enable Google OAuth in Authentication settings (optional)

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Database Schema

The application uses a single `companies` table with the following structure:

```sql
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  about TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Usage

1. **Access the application** at `http://localhost:5173`
2. **Sign up/Login** using email/password or Google OAuth
3. **Create your company** by filling out the admin form
4. **Preview your website** using the preview button
5. **Share your website** with the public URL

## API Endpoints

The application uses Supabase's auto-generated REST API:

- `GET /companies` - Fetch company data
- `POST /companies` - Create new company
- `PATCH /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Other Platforms
The application can be deployed to any static hosting platform that supports SPA routing.

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@companysitebuilder.com or create an issue in the GitHub repository.

## Roadmap

- [ ] Multiple website templates
- [ ] Custom domain support
- [ ] SEO optimization tools
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Advanced customization options