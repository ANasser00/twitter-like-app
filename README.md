# Twitter-Like App

A full-stack serverless social media application built with React frontend and AWS serverless backend. The application provides a complete Twitter-like experience with post creation, retrieval, and user engagement through likes. The backend leverages AWS Lambda, API Gateway, and DynamoDB for scalability, while the frontend uses React with modern component architecture.

## Features

- **Full-Stack Application**: Complete frontend and backend integration
- **React Frontend**: Modern component-based UI with reusable components
- **Post Management**: Create and retrieve posts with unique IDs, content, and user attribution
- **User Engagement**: Like/unlike functionality with per-user tracking
- **Real-time Updates**: Dynamic UI updates for likes and new posts
- **Error Handling**: Comprehensive error handling with user-friendly alerts
- **Responsive Design**: Mobile-friendly interface
- **Serverless Backend**: Zero server management with automatic scaling
- **RESTful API**: Clean, intuitive endpoints for all operations
- **Infrastructure as Code**: Fully automated deployment with AWS CDK
- **Type Safety**: TypeScript-based infrastructure definitions
- **Testing Suite**: Comprehensive test coverage for both frontend and backend
- **Cost Optimized**: Pay-per-request pricing model

## Technologies Used

### Frontend
- **React** - Component-based UI library
- **JavaScript/JSX** - Frontend development language
- **CSS** - Styling and responsive design
- **Fetch API** - HTTP client for API communication

### Backend
- **AWS CDK** - Infrastructure as Code framework
- **TypeScript** - Type-safe infrastructure definitions
- **JavaScript** - Lambda function runtime
- **AWS Lambda** - Serverless compute functions
- **Amazon API Gateway** - RESTful API management
- **Amazon DynamoDB** - NoSQL database for post and like data
- **AWS IAM** - Security and access management

### Development & Testing
- **Node.js** - JavaScript runtime environment
- **Jest** - Testing framework
- **npm** - Package management

## Project Structure

```
twitter-like-app/
├── backend/
│   ├── cdk/
│   │   ├── backend-stack.ts     # CDK stack definition
│   │   └── cdk.out/             # CDK output directory
│   ├── lambda/
│   │   ├── node_modules/        # Lambda dependencies
│   │   ├── createPost.js        # Post creation function
│   │   ├── getPosts.js          # Posts retrieval function
│   │   ├── toggleLike.js        # Like/unlike function
│   │   ├── package-lock.json
│   │   └── package.json
│   ├── node_modules/            # Backend dependencies
│   └── test/
│       ├── backend.test.ts      # Backend tests
│       ├── test-createPost.js   # Create post tests
│       ├── test-getPosts.js     # Get posts tests
│       ├── test-toggleLike.js   # Toggle like tests
│       └── package.json
├── frontend/
│   ├── node_modules/            # Frontend dependencies
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── create-post.jsx  # Post creation component
│   │   │   ├── error-alert.jsx  # Error handling component
│   │   │   ├── header.jsx       # App header component
│   │   │   ├── post-item.jsx    # Individual post component
│   │   │   └── posts-list.jsx   # Posts list component
│   │   ├── services/
│   │   │   └── api.js          # API service for backend communication
│   │   ├── App.css              # Application styles
│   │   ├── App.js               # Main React application
│   │   ├── config.js            # Frontend configuration
│   │   ├── index.js             # React entry point
│   │   ├── reportWebVitals.js   # Performance monitoring
│   │   └── setupTests.js        # Test setup
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── .gitignore                   # Root gitignore
├── .npmignore
├── README.md                    # This file
└── tsconfig.json                # TypeScript configuration
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or later)
- **npm** or **yarn** package manager
- **AWS CLI** configured with appropriate credentials
- **AWS CDK** CLI (`npm install -g aws-cdk`)

### AWS CLI Configuration

Configure your AWS credentials using one of these methods:

```bash
# Method 1: AWS CLI configure
aws configure

# Method 2: Environment variables
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key
export AWS_DEFAULT_REGION=your-preferred-region
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twitter-like-app
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend/lambda
   npm install
   cd ../..
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Bootstrap CDK** (first-time setup for your AWS account/region)
   ```bash
   cdk bootstrap
   ```

## Available Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w",
    "test": "jest",
    "test:backend": "cd backend && npm test",
    "test:frontend": "cd frontend && npm test",
    "cdk": "cdk",
    "deploy": "cdk deploy",
    "deploy:backend": "cdk deploy",
    "destroy": "cdk destroy",
    "diff": "cdk diff",
    "synth": "cdk synth",
    "start:frontend": "cd frontend && npm start",
    "build:frontend": "cd frontend && npm run build",
    "lint": "eslint . --ext .ts,.js,.jsx",
    "format": "prettier --write ."
  }
}
```

## Deployment

### Backend Deployment

1. **Build the TypeScript code**
   ```bash
   npm run build
   ```

2. **Review the changes** (optional)
   ```bash
   npm run diff
   ```

3. **Deploy the backend to AWS**
   ```bash
   npm run deploy:backend
   ```

4. **Note the API Gateway URL**
   After deployment, CDK will output the API Gateway URL:
   ```
   Outputs:
   TwitterLikeAppStack.ApiGatewayUrl = https://abc123def.execute-api.us-east-1.amazonaws.com/prod
   TwitterLikeAppStack.DynamoDBTableName = TwitterLikeAppStack-PostsTable12345678-ABCDEFGHIJ
   ```

### Frontend Setup

1. **Configure the API endpoint**
   Update `frontend/src/config.js` with your API Gateway URL:
   ```javascript
   const config = {
     API_BASE_URL: 'https://your-api-id.execute-api.region.amazonaws.com/prod'
   };
   
   export default config;
   ```

2. **Start the development server**
   ```bash
   npm run start:frontend
   ```

3. **Build for production** (optional)
   ```bash
   npm run build:frontend
   ```

### Full Stack Deployment

For production deployment, you can deploy both backend and frontend:

1. Deploy backend first (as shown above)
2. Update frontend configuration with API URL
3. Build and deploy frontend to AWS S3 + CloudFront or your preferred hosting service

## API Endpoints

### Base URL
```
https://your-api-id.execute-api.region.amazonaws.com/prod
```

### Endpoints

#### Create a Post
```http
POST /posts
Content-Type: application/json

{
  "content": "This is my first post!",
  "user": "john_doe"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "body": {
    "id": "post_1639123456789",
    "content": "This is my first post!",
    "user": "john_doe",
    "timestamp": "2023-12-10T10:30:45.123Z",
    "likes": 0
  }
}
```

#### Get All Posts
```http
GET /posts
```

**Response:**
```json
{
  "statusCode": 200,
  "body": {
    "posts": [
      {
        "id": "post_1639123456789",
        "content": "This is my first post!",
        "user": "john_doe",
        "timestamp": "2023-12-10T10:30:45.123Z",
        "likes": 2
      }
    ],
    "count": 1
  }
}
```

#### Toggle Like on Post
```http
POST /posts/like
Content-Type: application/json

{
  "postId": "post_1639123456789",
  "user": "jane_doe"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "body": {
    "postId": "post_1639123456789",
    "user": "jane_doe",
    "action": "liked",
    "totalLikes": 3
  }
}
```

## Frontend React Components

### create-post.jsx
Handles new post creation with the following features:
- Form validation for content and user fields
- API integration for post submission
- Loading states and error handling
- Real-time UI updates after successful post creation
- Character count and input restrictions

### posts-list.jsx
Manages the display of all posts:
- Fetches posts from the backend API
- Renders individual post components
- Handles loading states and empty states
- Implements error handling for API failures
- Manages post refresh functionality

### post-item.jsx
Individual post component responsible for:
- Displaying post content, user, and timestamp
- Like/unlike functionality with visual feedback
- Optimistic UI updates for better user experience
- Error handling for like/unlike operations
- Responsive design for different screen sizes

### header.jsx
Application header component that provides:
- App branding and navigation
- Consistent styling across the application
- Responsive design elements

### error-alert.jsx
Reusable error handling component featuring:
- Consistent error message display
- Dismissible alert functionality
- Styled error states
- Integration with global error handling

## Backend Lambda Functions

### createPost.js
Handles post creation with the following responsibilities:
- Validates incoming request data (content and user fields)
- Generates unique post IDs using timestamp-based approach
- Stores post data in DynamoDB with metadata (timestamp, initial like count)
- Returns the created post object with HTTP 201 status
- Implements error handling for validation and database operations

### getPosts.js
Manages post retrieval and aggregation:
- Scans DynamoDB table to retrieve all posts
- Calculates like counts by querying associated like records
- Sorts posts by timestamp (newest first)
- Returns paginated results with total count
- Handles empty result sets gracefully
- Implements error handling for database access issues

### toggleLike.js
Handles user engagement through like/unlike functionality:
- Validates post existence before processing like action
- Checks if user has already liked the post
- Implements toggle logic (like if not liked, unlike if already liked)
- Updates like count atomically to prevent race conditions
- Returns action taken (liked/unliked) and updated total count
- Manages user-post like relationship tracking

## Security & IAM

The CDK stack implements least-privilege security practices:

### Lambda Execution Roles
Each Lambda function receives minimal required permissions:

```typescript
// Example IAM policy for Lambda functions
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:region:account:table/PostsTable"
    }
  ]
}
```

### API Gateway Security
- CORS configured for web application integration
- Request validation at API Gateway level
- Rate limiting to prevent abuse
- CloudWatch logging for monitoring and debugging

### DynamoDB Security
- Encryption at rest enabled by default
- Access restricted to Lambda functions via IAM roles
- Point-in-time recovery enabled for data protection

## Environment Variables

The Lambda functions automatically receive these environment variables:

- `POSTS_TABLE_NAME` - DynamoDB table name for posts
- `AWS_REGION` - Deployment region
- `LOG_LEVEL` - Logging verbosity level

## Monitoring & Logging

The stack includes comprehensive observability:

- **CloudWatch Logs** - All Lambda function logs
- **CloudWatch Metrics** - Request counts, error rates, duration
- **AWS X-Ray** - Distributed tracing (optional)
- **API Gateway Metrics** - API performance and usage statistics

## Cost Optimization

This serverless architecture offers several cost benefits:

- **Pay-per-request** pricing for Lambda and API Gateway
- **On-demand** DynamoDB billing for variable workloads
- **No idle costs** - resources scale to zero when not in use
- **Automatic scaling** prevents over-provisioning

## Cleanup

To avoid ongoing AWS charges, destroy the stack when no longer needed:

```bash
# Remove all AWS resources
npm run destroy

# Confirm deletion when prompted
✔ Are you sure you want to delete: TwitterLikeAppStack (y/n)? · y
```

**Note:** This will permanently delete all data in DynamoDB. Ensure you have backups if needed.

## Troubleshooting

### Common Issues

1. **CDK Bootstrap Required**
   ```bash
   Error: Need to perform AWS CDK bootstrap
   Solution: Run `cdk bootstrap` in your target region
   ```

2. **AWS Credentials Not Configured**
   ```bash
   Error: Unable to resolve AWS account
   Solution: Configure AWS CLI or set environment variables
   ```

3. **Lambda Function Errors**
   ```bash
   Check CloudWatch Logs: /aws/lambda/TwitterLikeAppStack-CreatePostFunction
   ```

4. **Frontend API Connection Issues**
   ```bash
   Error: Failed to fetch posts
   Solution: Verify API_BASE_URL in frontend/src/config.js matches deployed API Gateway URL
   ```

### Debug Mode
Enable verbose logging:
```bash
CDK_DEBUG=true npm run deploy
```

## Development

### Frontend Development
Start the React development server:
```bash
npm run start:frontend
```

The frontend will be available at `http://localhost:3000` with hot reloading enabled.

### Backend Development
For local testing of Lambda functions, consider using:
- **AWS SAM CLI** for local Lambda testing
- **DynamoDB Local** for offline database development
- **Postman** or **curl** for API testing

### Testing

Run all tests:
```bash
npm test
```

Run backend tests only:
```bash
npm run test:backend
```

Run frontend tests only:
```bash
npm run test:frontend
```

### Code Quality
The project supports:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** for unit testing
- **TypeScript** strict mode for type safety

