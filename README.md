# Evala by Nestro

<div align="center">
  <h3>🎯 AI-Powered Cost Estimation Tool</h3>
  <p>Professional project cost estimation with a focus on African markets</p>
</div>

---

## 🌟 Features

- **AI-Powered Estimates**: Leverages Cloudflare Workers AI (Llama 3) for intelligent cost breakdowns
- **African Market Focus**: Specialized in Zambian and African industry pricing
- **Modern UI/UX**: Beautiful glassmorphism design with smooth animations
- **Secure Architecture**: API keys protected on the server-side
- **Real-time Processing**: Fast estimates powered by edge computing
- **Responsive Design**: Works seamlessly on all devices

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Space Grotesk** - Modern typography

### Backend
- **Cloudflare Workers** - Serverless edge functions
- **Workers AI** - Built-in AI models (Llama 3)
- **Wrangler** - Cloudflare CLI tool

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Hillarymukuka/evala.git
cd evala
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install worker dependencies
cd workers
npm install
cd ..
```

3. **Configure environment**
```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env`:
```env
VITE_WORKER_URL=http://localhost:8787
```

4. **Start development servers**

**Option 1: Using batch file (Windows)**
```bash
.\start-server.bat
```

**Option 2: Manual start**
```bash
# Terminal 1 - Start Cloudflare Worker
cd workers
npm run dev

# Terminal 2 - Start React app
npm run dev
```

5. **Open your browser**
- Frontend: `http://localhost:5173`
- Worker: `http://localhost:8787`

## 🌐 Deployment

### Deploy Cloudflare Worker

1. **Authenticate with Cloudflare**
```bash
cd workers
npx wrangler login
```

2. **Deploy the worker**
```bash
npm run deploy
```

3. **Update environment variable**
After deployment, update `.env`:
```env
VITE_WORKER_URL=https://evala-ai-worker.your-subdomain.workers.dev
```

### Deploy Frontend

#### Option 1: Cloudflare Pages (Recommended)

1. Build your app:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npx wrangler pages deploy dist
```

#### Option 2: Vercel

```bash
npm install -g vercel
vercel
```

#### Option 3: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📖 Usage

1. **Start on Homepage**: Click "Get Started" to begin
2. **Answer Questions**: Provide project details through the guided flow
3. **Get Estimate**: Receive a detailed cost breakdown instantly
4. **Export Results**: Copy, print, or email your estimate

## 🏗️ Project Structure

```
evala/
├── src/
│   ├── components/       # React components
│   │   ├── HomePage.jsx
│   │   ├── Estimator.jsx
│   │   ├── QuestionFlow.jsx
│   │   ├── ResultCard.jsx
│   │   └── ...
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── utils/            # Utility functions
│   │   └── api.js
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── workers/              # Cloudflare Worker
│   ├── worker.js         # Worker logic
│   ├── wrangler.toml     # Worker config
│   └── package.json
├── public/               # Static assets
├── .env                  # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_WORKER_URL` | Cloudflare Worker endpoint | `http://localhost:8787` |

### Worker Configuration

Edit `workers/wrangler.toml` to customize:
- Worker name
- AI model
- Compatibility date

## 🛡️ Security

- API keys are stored server-side only
- CORS configured for production security
- Environment variables never committed to Git
- Cloudflare Workers run in isolated secure environment

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Hillary Mukuka**
- Email: hillarymukuka@gmail.com
- GitHub: [@Hillarymukuka](https://github.com/Hillarymukuka)

## 🙏 Acknowledgments

- Powered by Cloudflare Workers AI
- Design inspired by modern glassmorphism trends
- Built with ❤️ for African entrepreneurs

---

<div align="center">
  <p>Made with ❤️ by Nestro</p>
</div>
