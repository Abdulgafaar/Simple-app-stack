import {
    APIGatewayProxyEventV2,
    Context,
    APIGatewayProxyResultV2
} from 'aws-lambda';
import { S3 } from '@aws-sdk';
import { promises } from 'dns';

const s3 = new S3();

const bucketName = process.env.WEBSITE_BUCKET_NAME;

async function generateUrl(object: S3.object): Promise<{
    filename: string, url: string }> {
    const url = await s3.getSignedUrlPromise('getObject', {
        Buckect: bucketName,
        key: object.key!,
        Expires: (24 * 60 * 60)
    })
    return {
        filename: object.key!,
        url: 
    }
    
}
async function getPhotos(event: APIGatewayProxyEventV2, Context: Context): Promise<APIGatewayProxyResultV2>{
    
    console.log('I got the bucket name and it is' + bucketName);

    try {
        const { contents: results } = await s3.listobjects({ Bucket: bucketName }).promises();
        const website = await Promise.all(results!.map(result => generateUrl(result)))
        return {
        statusCode: 200,
        body: JSON.stringify(website)
    }
    } catch (error){
        return {
            statusCode: 500,
            body: 'Something went wrong from the server'
     }
        
    }
    
};

export { getPhotos };