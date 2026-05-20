# API Usage Guide

## Production API

```txt
https://sotivo.uz
```

---

## Swagger Documentation

```txt
https://sotivo.uz/swagger
```

---

# Local Development

## Base URL

```txt
http://localhost:3000
```

---

## Local Swagger Documentation

```txt
http://localhost:3000/swagger
```

---

# Authentication

## Login

### Request

```http
POST /auth/login
Content-Type: application/json
```

### Body

```json
{
  "username": "john",
  "password": "admin123"
}
```

---

## Available Users

| Role | Username | Password |
|---|---|---|
| admin | john | admin123 |
| normal | sarah | normal123 |
| limited | anna | limited123 |

---

## Successful Response

```json
{
  "accessToken": "JWT_TOKEN"
}
```

---

# Using JWT Token

Add authorization header:

```txt
Authorization: Bearer JWT_TOKEN
```

---

# Locus API

## Endpoint

```http
GET /locus
```

---

# Query Parameters

| Parameter | Example |
|---|---|
| id | `?id=3106326` |
| assemblyId | `?assemblyId=Rrox_v1` |
| regionId | `?regionId=85682522` |
| membershipStatus | `?membershipStatus=member` |
| sideloading | `?sideloading=locusMembers` |
| page | `?page=1` |
| limit | `?limit=10` |
| sortBy | `?sortBy=id` |
| order | `?order=DESC` |

---

# Examples

## Basic Request

```http
GET /locus
```

---

## Filter by ID

```http
GET /locus?id=3106326
```

---

## Filter by Assembly ID

```http
GET /locus?assemblyId=Rrox_v1
```

---

## Filter by Region ID

```http
GET /locus?regionId=85682522
```

---

## Filter by Membership Status

```http
GET /locus?membershipStatus=member
```

---

## Pagination

```http
GET /locus?page=1&limit=10
```

---

## Sorting

```http
GET /locus?sortBy=id&order=DESC
```

Supported sorting fields:

```txt
id
assemblyId
memberCount
```

---

## Multiple Filters

```http
GET /locus?assemblyId=Rrox_v1&membershipStatus=member&page=1&limit=5
```

---

# Sideloading

## Request

```http
GET /locus?sideloading=locusMembers
```

---

## Example Response

```json
[
  {
    "id": 3106352,
    "assemblyId": "Rrox_v1",
    "locusName": "...",
    "memberCount": 1,
    "locusMembers": [
      {
        "id": 1,
        "ursTaxid": "URS0000A888AB_61622",
        "regionId": 85682522,
        "membershipStatus": "member"
      }
    ]
  }
]
```

---

# Role Behavior

## Admin

Can:
- access all data
- use sideloading

---

## Normal

Can:
- access locus data
- cannot use sideloading

Forbidden request:

```http
GET /locus?sideloading=locusMembers
```

Response:

```json
{
  "statusCode": 403,
  "message": "Sideloading allowed only for admin"
}
```

---

## Limited

Automatically restricted to allowed region IDs.

---

# Error Examples

## Validation Error

```json
{
  "statusCode": 400,
  "message": [
    "limit must not be greater than 1000"
  ]
}
```

---

## Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

# Testing

## Run Unit Tests

```bash
npm run test
```

---

## Run E2E Tests

```bash
npm run test:e2e
```