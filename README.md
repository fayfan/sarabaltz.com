# SaraBaltz.com

Welcome to the repository for my personal portfolio website, SaraBaltz.com!

## About

This website showcases my skills & projects as a full-stack software engineer. It's designed to provide a clear & concise overview of my experience, abilities, & passion for software development.

## Features

* **Responsive Design:** Ensures optimal viewing experience across various devices (desktops, tablets, & mobile phones).
* **Projects Showcase:** Highlights my key projects with descriptions, technologies used, & links to live demos or repositories.
* **About Me:** Provides a brief introduction & background, showcasing my personality & career goals.
* **Resume:** Provides a PDF copy of my most up-to-date resume for viewing &/or download.
* **Contact Information:** Offers easy ways to get in touch with me.

## Technologies Used

| Frontend                                         | Backend                                          |
|--------------------------------------------------|--------------------------------------------------|
| [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) | [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) |

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

This template includes three Dockerfiles optimized for different package managers:

- `Dockerfile` - for npm
- `Dockerfile.pnpm` - for pnpm
- `Dockerfile.bun` - for bun

To build & run using Docker:

```bash
# For npm
docker build -t my-app .

# For pnpm
docker build -f Dockerfile.pnpm -t my-app .

# For bun
docker build -f Dockerfile.bun -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Usage

* Feel free to browse the website to learn more about my skills & projects.
* Click on project links to explore live demos or view source code on GitHub.
* Use the provided contact information to reach out to me.

## Contributing

As this is my personal portfolio, contributions are generally not accepted. However, if you have any suggestions or feedback, please feel free to contact me.

## Future Enhancements

* Add more projects as I complete them.
* Optimize website performance.

## Contact

* Email: [sara@sarabaltz.com](mailto:sara@sarabaltz.com)
* LinkedIn: [linkedin.com/in/sarabaltz](https://www.linkedin.com/in/sarabaltz)
* GitHub: [github.com/fayfan](https://github.com/fayfan)
