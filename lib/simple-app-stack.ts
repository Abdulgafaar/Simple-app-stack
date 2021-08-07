import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import {  Runtime } from '@aws-cdk/aws-lambda';
import * as path from 'path';




export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your  stack goes here
    const bucket = new Bucket(this, 'mysimpleAppBucket', {

      encryption: BucketEncryption.S3_MANAGED,

    });

    const getPhotos = new lambda.NodejsFunction(this, 'myLambdaApp', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'getPhotos',
      entry: path.join(__dirname,'..', 'api', 'getPhotos', 'index.ts')
    })

    new cdk.CfnOutput(this, 'mySimpleAppBuckExport', {
      exportName: 'mySimpleAppBucketName',
      value: bucket.bucketName,

    });
  }
}
