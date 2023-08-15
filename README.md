# Express JS Sample Application

## Running Stack with Docker and docker-compose

### Creating a sample AWS S3 Bucket
First generate a sample profile with the following command
```bash
> aws configure --profile localstack

AWS Access Key ID [None]: ACCESSKEYAWSUSER
AWS Secret Access Key [None]: sEcreTKey
Default region name [None]: us-east-1
Default output format [None]: json
```

To create a sample AWS S3 Bucket, run the following command
```bash
> aws --profile localstack --endpoint-url=http://localhost:4566 s3api create-bucket --bucket demo-bucket
```

To check created AWS S3 buckets, use the following command
```bash
> aws --profile localstack --endpoint-url=http://localhost:4566 s3api list-buckets
```

To make the bucket "public"
```bash
> aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket demo-bucket --acl public-read
```

To list all created objects
```bash
> aws --endpoint-url=http://localhost:4566 s3 ls s3://demo-bucket
```

Or instead, access <code>http://localhost:4566/demo-bucket</code>