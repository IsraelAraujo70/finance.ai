# AgiFinance

AgiFinance is a modern, full-stack finance tracker built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), [Clerk](https://clerk.com/), [Stripe](https://stripe.com/), and [Tailwind CSS](https://tailwindcss.com/). It helps you manage transactions, visualize spending, and generate AI-powered financial insights.

## Features

- User authentication with Clerk
- Transaction management (add, edit, delete, categorize)
- Interactive dashboards and charts
- AI-powered spending reports
- Subscription and payment integration (Stripe)
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or update `.env` for your own DB)
- Stripe & Clerk accounts (for API keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IsraelAraujo70/finance.ai.git
   cd finance.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in required values:
   ```bash
   cp .env.example .env
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app/` - Next.js app directory (pages, components, API routes)
- `prisma/` - Prisma schema & migrations
- `app/_components/` - Shared React components
- `app/_lib/` - Utilities and helpers

## Deployment

Deploy instantly to [Vercel](https://vercel.com/) (recommended) or your preferred platform.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Contributing

Pull requests and feedback are welcome! For major changes, please open an issue to discuss what you’d like to change.

## License

[MIT](LICENSE)

---

Made with ❤️ using Next.js, Prisma, Clerk, and Stripe.
