# Sentinel DevSecOps Pipeline 🛡️

![Build Status](https://img.shields.io/github/actions/workflow/status/josemanuelsuarez110/sentinel-devsecops-pipeline/security-pipeline.yml?branch=main)
![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![Security Focus](https://img.shields.io/badge/Security-SAST%20%7C%20DAST-blue)

A robust, enterprise-grade DevSecOps pipeline designed for Node.js applications. This project demonstrates how to integrate continuous security testing directly into your deployment workflows, ensuring vulnerabilities are caught *before* they reach production.

## 🚀 Key Features

*   **Static Application Security Testing (SAST)**:
    *   **Secret Scanning**: Deep history scanning for exposed secrets, API keys, and tokens using `Gitleaks`.
    *   **Dependency Auditing**: Proactive scanning of Node.js dependencies for known vulnerabilities (`npm audit`), strictly failing on `High` or `Critical` warnings.
*   **Containerization**:
    *   **Production Image**: Minimal, multi-stage Alpine Linux Docker build running as a non-root user.
    *   **Hardened Staging Image**: Extended OS-level hardening for intermediate environments.
*   **Dynamic Application Security Testing (DAST)**:
    *   **Ephemeral Environments**: Automatically provisions temporary Docker containers during the GitHub Actions run.
    *   **OWASP ZAP Full Scan**: Active penetration testing against the live ephemeral container. The pipeline automatically fails if `High` or `Critical` vulnerabilities are successfully exploited.
    *   **Automated Reporting**: Generates HTML/PDF vulnerability reports directly attached to the GitHub Action artifacts.
*   **Secure Deployment Architecture**:
    *   Ready-to-use `docker-compose.staging.yml` featuring an Nginx reverse proxy and automated self-managed SSL via Certbot.

## 📁 Project Structure

```text
├── .github/workflows/
│   └── security-pipeline.yml  # The core CI/CD DevSecOps workflow
├── .zap/
│   └── rules.tsv              # Custom ignore/threshold rules for OWASP ZAP
├── server.js                  # Sample Node.js Express application
├── Dockerfile                 # Multi-stage production container
├── Dockerfile.staging         # Hardened staging container definition
└── docker-compose.staging.yml # Nginx + Certbot architecture for secure hosting
```

## 🛠️ How It Works

1.  **Code Commit**: A developer pushes code or creates a Pull Request to `main` or `develop`.
2.  **SAST Phase**: Secrets and dependencies are analyzed. Any failure immediately stops the pipeline.
3.  **Build Phase**: A secure, minimal Docker image is built and saved as an artifact.
4.  **DAST Phase**: The Docker image is loaded and run in the background. OWASP ZAP executes a Full Scan against this live, ephemeral target. If ZAP finds critical flaws, the pipeline fails.
5.  **Deployment (if applicable)**: Once all security gates pass, the code is authorized for the Hardened Staging environment or Production.

## 🛡️ Getting Started

### Prerequisites
*   GitHub Repository
*   Node.js >= 20
*   Docker & Docker Compose

### Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the application: `npm start`
4. Run an initial security audit: `npm run security-audit`

## 🔒 Security Best Practices Implemented

*   **Shift-Left Security**: Security tests are integrated from the very first commit.
*   **Least Privilege**: Docker containers explicitly run as non-root users (`USER nodeuser`).
*   **Minimal Attack Surface**: Utilizing Alpine base images and multi-stage builds.
*   **Security Headers**: Basic secure headers (X-Content-Type-Options, X-Frame-Options) implemented at the Express middleware level.
