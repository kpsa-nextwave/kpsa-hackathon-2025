# User CRUD API 테스트 가이드

## MongoDB 시작
```bash
docker-compose up -d
```

## 서버 시작
```bash
npm start
```

## API 엔드포인트

### 1. 사용자 생성 (Create)
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "age": 25
  }'
```

### 2. 모든 사용자 조회 (Read All)
```bash
curl -X GET http://localhost:3000/user
```

### 3. 특정 사용자 조회 (Read One)
```bash
curl -X GET http://localhost:3000/user/{USER_ID}
```

### 4. 사용자 정보 수정 (Update)
```bash
curl -X PUT http://localhost:3000/user/{USER_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "김철수",
    "age": 30
  }'
```

### 5. 사용자 삭제 (Delete)
```bash
curl -X DELETE http://localhost:3000/user/{USER_ID}
```

### 6. 사용자 포인트 조회
```bash
curl -X GET http://localhost:3000/user/{USER_ID}/point
```

### 7. 사용자 포인트 수정
```bash
curl -X PATCH http://localhost:3000/user/{USER_ID}/point \
  -H "Content-Type: application/json" \
  -d '{
    "point": 100
  }'
```

## 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "홍길동",
    "email": "hong@example.com",
    "age": 25,
    "point": 0,
    "createdAt": "2025-07-26T...",
    "updatedAt": "2025-07-26T..."
  }
}
```

### 에러 응답
```json
{
  "error": "에러 메시지"
}
```
