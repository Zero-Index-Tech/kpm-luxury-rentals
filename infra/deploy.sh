#!/usr/bin/env bash
# Deploy the KPM admin backend stack.
# Usage: bash infra/deploy.sh   (override with REGION=... ENVIRONMENT=... STACK_NAME=...)
set -euo pipefail

STACK_NAME="${STACK_NAME:-kpm-admin}"
REGION="${REGION:-af-south-1}"
ENVIRONMENT="${ENVIRONMENT:-dev}"
TEMPLATE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text --region "$REGION")"
ARTIFACT_BUCKET="kpm-cfn-artifacts-${ACCOUNT_ID}-${REGION}"

echo "==> Using account ${ACCOUNT_ID}, region ${REGION}, stack ${STACK_NAME} (${ENVIRONMENT})"

if ! aws s3api head-bucket --bucket "$ARTIFACT_BUCKET" 2>/dev/null; then
  echo "==> Creating artifact bucket ${ARTIFACT_BUCKET}"
  aws s3api create-bucket \
    --bucket "$ARTIFACT_BUCKET" \
    --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION"
fi

echo "==> Packaging template"
aws cloudformation package \
  --template-file "${TEMPLATE_DIR}/template.yaml" \
  --s3-bucket "$ARTIFACT_BUCKET" \
  --output-template-file "${TEMPLATE_DIR}/packaged.yaml" \
  --region "$REGION"

echo "==> Deploying stack"
aws cloudformation deploy \
  --template-file "${TEMPLATE_DIR}/packaged.yaml" \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides Environment="$ENVIRONMENT"

echo "==> Stack outputs"
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs' \
  --output table
