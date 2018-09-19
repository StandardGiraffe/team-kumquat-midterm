# Database Planning

**Table: users**
- id (PK)
- handle
- email
- password
- avatar_url

**Table: Resources**
- id (PK)
- user_id (FK)
- url
- title
- description
- date_created

**Table: Likes**
- id (PK)
- user_id (FK)
- resource_id (FK)

**Table: Ratings**
- id (PK)
- value (INT)
- user_id (FK)
- resource_id (FK)

**Table: Comments**
- id (PK)
- comment_body
- date_created
- user_id (FK)
- resource_id (FK)

**Table: Kumquats?**
- ratings
- likes

**Table: Tags**
- id (PK)
- category
- resource_id (FK)

**Table: Promotions**
- id (PK)
- user_id (FK)
- resource_id (FK)

**Table: Statuses**
- id (PK)
- status (learn_now, learn_soon, learn_someday, learned)
- user_id (FK)
- resource_id (FK)

