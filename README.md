# FastAPI Dockerfile Repository

This repository contains a simple FastAPI application with a Dockerfile for building a Docker image. The application
provides a health check endpoint and is designed to be deployed using Amazon Web Services (AWS) infrastructure.

## Application Structure

The application code is organized as follows:

- `app/main.py`: FastAPI application code with a health check endpoint.
- `Dockerfile`: Instructions for building a Docker image for the FastAPI application.
- `.env`: Environment configuration file containing parameters for deployment.
- `scripts/create-ssm-params.mjs`: Node.js script to create AWS Systems Manager (SSM) parameters.

## Dockerfile

The `Dockerfile` sets up the environment for the FastAPI application. It installs required dependencies, copies the
application code, and configures the startup command.

## Environment Configuration

The `.env` file contains configuration parameters used during deployment. These parameters include:

- `CERTIFICATE_DOMAIN_NAME`: The domain name for the SSL/TLS certificate.
- `HOSTED_ZONE_NAME`: The domain's hosted zone name.
- `HOSTED_ZONE_ID`: The hosted zone ID in AWS Route 53.
- `A_RECORD_NAME`: The name of the A record.

## Scripts

The `scripts/create-ssm-params.mjs` script is used to create AWS SSM parameters for the environment configuration. It
utilizes the AWS SDK for JavaScript to create SSM parameters based on the values provided in the `.env` file.

## Getting Started

To use this repository and deploy the FastAPI application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/fastapi-docker.git
cd fastapi-docker
```

2. Install dependencies:

```bash
npm install
```

3. Set up AWS CLI and configure your credentials:

```bash
aws configure
```

4. Create SSM parameters using the script:

```bash
npm run create-ssm-params
```

5. Build the Docker image:

```bash
docker build -t fastapi-app .
```

6. Run the Docker container:

```bash
docker run -p 80:80 fastapi-app
```

7. Access the FastAPI application at `http://localhost:80`.

## Deploying to AWS

To deploy the FastAPI application to AWS, you can integrate it into an AWS CloudFormation stack or an AWS CDK
application. The provided code pipeline repository, named "Green-Blue Fargate Deployment with AWS CDK," contains the
necessary infrastructure code and configurations to automate the deployment process.

Here's how you can deploy the FastAPI application using the provided CDK-based pipeline:

1. Clone the Code Pipeline repository:

   ```bash
   git clone https://github.com/OrderAndCh4oS/green-blue-fargate-code-pipeline-cdk.git
   cd green-blue-fargate-code-pipeline-cdk
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up your AWS CLI and configure your credentials:

   ```bash
   aws configure
   ```

4. Adjust the configuration in the `bin/green-blue-fargate-code-pipeline-cdk.ts` file to match your specific
   requirements, including repository names, AWS regions, and parameter names.

5. Follow the deployment steps provided in the README of the `green-blue-fargate-code-pipeline-cdk` repository. This
   will guide you through the process of deploying the AWS CDK stack, which will create the necessary AWS resources,
   including Amazon ECR repositories, ECS clusters, CodePipeline, and CodeBuild.

6. Once the CDK deployment is complete, navigate to the AWS Management Console and locate the CodePipeline named "
   Green-Blue Fargate Deployment."

7. Trigger the pipeline by pushing changes to the repository. The pipeline will automatically build the Docker image,
   deploy the FastAPI application to ECS Fargate, and manage blue-green deployments using Amazon CodeDeploy.

Please ensure that you have the required AWS IAM permissions to create and manage resources, including Amazon ECR
repositories, ECS clusters, CodePipeline, and CodeBuild. If you encounter any issues during the deployment process,
refer to the repository's documentation or AWS documentation for troubleshooting guidance.

By following these steps, you can efficiently deploy your FastAPI application to AWS using the provided CDK-based
pipeline for a streamlined and automated deployment workflow.
