
# Serverless VPC-Based Event Processing App

This project is a production-ready serverless architecture deployed on AWS, using **API Gateway**, **AWS Lambda**, **SQS**, and **DynamoDB**, all inside a **VPC** for enhanced network control and security. The app is managed via the **Serverless Framework** and deployed using **GitHub Actions**.

---

## 🧱 Architecture Overview

![Architecture Diagram](./path-to-your-architecture-diagram.png)

### Components:

- **Route 53** – For custom domain routing.
- **API Gateway** – Entry point for all HTTP requests.
- **Warmer Lambda** – Periodically invoked to reduce cold start latency.
- **Receiver Lambda** – Receives API requests and sends data to SQS.
- **SQS Queue** – Buffers requests for asynchronous processing.
- **Processor Lambda** – Polls SQS and forwards data to DB API.
- **DB API Lambda** – Validates and writes/reads from DynamoDB.
- **DynamoDB** – NoSQL database for persistent storage.
- **CloudWatch** – Logs and metrics for observability.
- **VPC with Private Subnet** – All Lambdas (except API Gateway) reside in a private subnet for secure backend processing.

---

## 🚀 Deployment

This app uses the **Serverless Framework** with Node.js and is deployed via **GitHub Actions**.

### Prerequisites

- AWS account with proper IAM permissions
- Node.js (v18+)
- Serverless Framework (v3.x)
- GitHub repo with the following secrets configured:

| Secret Name             | Description               |
|-------------------------|---------------------------|
| `AWS_ACCESS_KEY_ID`     | AWS access key            |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key     |
| `AWS_REGION`            | e.g. `us-east-1`          |

---

### 1. Install dependencies

```bash
npm install
```

### 2. Deploy manually (optional)

```bash
serverless deploy
```

### 3. Deploy automatically with GitHub Actions

Push to the `main` branch:

```bash
git add .
git commit -m "Trigger deployment"
git push origin main
```

GitHub Actions will handle deployment via `.github/workflows/deploy.yml`.

---

## 📁 Directory Structure

```
.
├── warmer/
│   ├── handler.js
├── receiver/
│   ├── handler.js 
├── processor/
│   ├── handler.js 
├──db-api/
│  ├── handler.js
├── serverless.yml
├── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

---

## 🛡 Security

- All Lambdas run inside a private subnet for better isolation.
- Uses IAM roles with least privilege for each Lambda.
- Supports WAF, custom domain via Route 53 (optional).

---

## 📊 Monitoring

- **Amazon CloudWatch** is integrated for:
  - Logs
  - Metrics
  - Alarms (to be configured)
- You can also enable **X-Ray tracing** for deep insights.

---

## 📌 Notes

- Make sure to **not delete AWS resources manually**, as it can break the CloudFormation stack.
- If broken, delete the stack using the CloudFormation Console and redeploy.

---

## 🧼 Cleanup

To remove the stack:

```bash
serverless remove
```

---

## 📃 License

MIT License
