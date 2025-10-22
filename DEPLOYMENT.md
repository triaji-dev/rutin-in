# Deployment Guide - rutin.in

## 🚀 Deploy to Vercel with Supabase

### Prerequisites

- [Vercel account](https://vercel.com)
- [Supabase account](https://supabase.com)
- Git repository

## 📋 Step-by-Step Deployment

### 1. Setup Supabase Database

1. **Create Supabase Project**

   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Choose organization and enter project details
   - Wait for database to be ready

2. **Run Database Schema**

   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create tables and functions

3. **Configure Authentication**

   - Go to Authentication > Settings
   - Enable email authentication
   - Configure email templates if needed
   - Set up redirect URLs for your domain

4. **Get API Keys**
   - Go to Settings > API
   - Copy:
     - Project URL
     - anon public key
     - service_role key

### 2. Deploy to Vercel

1. **Connect Repository**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Environment Variables**

   - In Vercel project settings, go to "Environment Variables"
   - Add the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project.vercel.app`

### 3. Configure Domain (Optional)

1. **Add Custom Domain**

   - In Vercel project settings, go to "Domains"
   - Add your custom domain
   - Configure DNS records as instructed

2. **Update Supabase Settings**
   - In Supabase Dashboard, go to Authentication > Settings
   - Add your custom domain to "Site URL" and "Redirect URLs"

## 🔧 Local Development

### Setup

```bash
# Clone repository
git clone <your-repo-url>
cd rutin-in

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Supabase credentials to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📁 Project Structure

```
rutin-in/
├── api/                    # Vercel API routes
│   ├── auth/
│   │   ├── login.js        # User login
│   │   ├── signup.js       # User registration
│   │   └── logout.js       # User logout
│   └── habits/
│       ├── index.js        # List/create habits
│       ├── [id].js         # Update/delete habit
│       └── [id]/
│           └── completions.js # Toggle completions
├── index.html              # Main application
├── package.json            # Dependencies
├── vercel.json            # Vercel configuration
├── supabase-schema.sql    # Database schema
├── ENVIRONMENT.md         # Environment setup guide
└── DEPLOYMENT.md          # This file
```

## 🔐 Security Features

### Row Level Security (RLS)

- All tables have RLS enabled
- Users can only access their own data
- Policies prevent unauthorized access

### API Security

- JWT token validation on all API routes
- Service role key used only server-side
- Input validation and sanitization

### Authentication Flow

1. User signs up/in through Supabase Auth
2. JWT token stored in localStorage
3. Token sent with all API requests
4. Server validates token before processing

## 🚨 Troubleshooting

### Common Issues

1. **Authentication Errors**

   - Check Supabase project URL and keys
   - Verify RLS policies are correct
   - Ensure email verification is configured

2. **API Errors**

   - Check Vercel function logs
   - Verify environment variables are set
   - Check Supabase service role key

3. **Database Errors**
   - Verify schema was created correctly
   - Check RLS policies
   - Ensure functions are created

### Debug Steps

1. **Check Vercel Logs**

   ```bash
   vercel logs <deployment-url>
   ```

2. **Check Supabase Logs**

   - Go to Supabase Dashboard > Logs
   - Check API and Auth logs

3. **Test API Endpoints**
   ```bash
   curl -X POST https://your-app.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

## 📈 Monitoring

### Vercel Analytics

- Enable Vercel Analytics in project settings
- Monitor performance and usage

### Supabase Monitoring

- Check database performance in Supabase Dashboard
- Monitor API usage and limits

## 🔄 Updates and Maintenance

### Updating the App

1. Make changes to your code
2. Commit and push to Git
3. Vercel automatically redeploys

### Database Migrations

1. Update `supabase-schema.sql`
2. Run new SQL in Supabase Dashboard
3. Test thoroughly before deploying

### Environment Updates

1. Update environment variables in Vercel
2. Redeploy if necessary

## 📞 Support

- **Vercel**: [Vercel Support](https://vercel.com/support)
- **Supabase**: [Supabase Support](https://supabase.com/support)
- **Project Issues**: Create issue in GitHub repository
