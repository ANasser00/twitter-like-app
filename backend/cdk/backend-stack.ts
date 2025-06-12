import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'PostsTable', {
      tableName: 'PostsTable',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
    });

    // Lambda Functions
    const createPostLambda = new lambda.Function(this, 'CreatePostFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'createPost.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const toggleLikeLambda = new lambda.Function(this, 'ToggleLikeFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'toggleLike.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const getPostsLambda = new lambda.Function(this, 'GetPostsFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getPosts.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant permissions
    table.grantReadWriteData(createPostLambda);
    table.grantReadWriteData(toggleLikeLambda);
    table.grantReadWriteData(getPostsLambda);

    // API Gateway
    const api = new apigateway.RestApi(this, 'PostsApi', {
      restApiName: 'Posts API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type'],
      },
    });

    // API Routes
    const posts = api.root.addResource('posts');
    posts.addMethod('POST', new apigateway.LambdaIntegration(createPostLambda));
    posts.addMethod('GET', new apigateway.LambdaIntegration(getPostsLambda));

    const postById = posts.addResource('{postId}');
    const likes = postById.addResource('like');
    likes.addMethod('POST', new apigateway.LambdaIntegration(toggleLikeLambda));

    // Output API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });
  }
}