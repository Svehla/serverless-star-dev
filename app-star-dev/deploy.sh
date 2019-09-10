sam package \
  --output-template-file packaged.yaml \
  --s3-bucket app-star-dev

sam deploy \
  --template-file packaged.yaml \
  --stack-name app-star-dev \
  --capabilities CAPABILITY_IAM
