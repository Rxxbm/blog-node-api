
<body>

<header>

<h1>Blog API Documentation</h1>

</header>

<div class="container">

<h2>Installation</h2>

<ol>

<li>Clone the repository:</li>

</ol>

<pre><code>git clone https://github.com/rxxbm/blog-node-api.git</code></pre>

<ol start="2">

<li>Navigate to the project directory:</li>

</ol>

<pre><code>cd blog-api</code></pre>

<ol start="3">

<li>Install project dependencies using npm:</li>

</ol>

<pre><code>npm install</code></pre>

<h2>Docker Setup</h2>

<p>To run the project using Docker, make sure you have Docker installed on your machine.</p>

<ol>

<li>Pull the PostgreSQL Docker image:</li>

</ol>

<pre><code>docker pull postgres</code></pre>

<ol start="2">

<li>Run a PostgreSQL container:</li>

</ol>

<pre><code>docker run --name some-postgres -e POSTGRES\_PASSWORD=mysecretpassword -p 5432:5432 -d postgres</code></pre>

<h2>Prisma Setup</h2>

<ol>

<li>Generate Prisma client:</li>

</ol>

<pre><code>npx prisma generate</code></pre>

<ol start="2">

<li>Apply migrations to set up the database schema:</li>

</ol>

<pre><code>npx prisma migrate dev</code></pre>

<h2>User Creation</h2>

<p><strong>Endpoint:</strong> <code>POST /user</code></p>

<p><strong>Description:</strong> Create a user with the specified fields.</p>

<pre><code>

{

"name": "John Doe",

"email": "johndoe@example.com",

"password": "securepassword",

"typeUser": 1

}

</code></pre>

<p><strong><code>typeUser</code> values:</strong> 1 for common user, 2 for admin.</p>

<h2>User Authentication</h2>

<p><strong>Endpoint:</strong> <code>POST /auth</code></p>

<p><strong>Description:</strong> Authenticate a user and generate an authentication token.</p>

<pre><code>

{

"email": "johndoe@example.com",

"password": "securepassword"

}

</code></pre>

<p><strong>Response:</strong></p>

<pre><code>

{

"token": "your-authentication-token"

}

</code></pre>

<h2>Get Users</h2>

<p><strong>Endpoint:</strong> <code>GET /user</code></p>

<p><strong>Description:</strong> List all Users (only for admin user token).</p>

<p><strong>Response:</strong></p>

<pre><code>
[
	{
		"id": 1,
		"email": "rubemcorrea0@gmail.com",
		"name": "Rubem",
		"password": "$2b$10$5YLpjItC5eHoNf5wxjL3VOrHnO/9YDC26FPT0APE0EZlzWYNkXJcC",
		"typeUser": 1,
		"createdAt": "2023-08-17T05:37:40.633Z",
		"updatedAt": "2023-08-17T05:37:40.633Z"
	},
	{
		"id": 2,
		"email": "giovanarodrigues207@gmail.com",
		"name": "Giovana",
		"password": "$2b$10$od8q1PFpAx29AS1BsKY4t.X47m0Q8MScUWVnrjBK4hrorgytcLQLm",
		"typeUser": 2,
		"createdAt": "2023-08-17T06:46:10.534Z",
		"updatedAt": "2023-08-17T06:46:10.534Z"
	}
]

</code></pre>

<h2>Delete User</h2>

<p><strong>Endpoint:</strong> <code>DELETE /user/:id</code></p>

<p><strong>Description:</strong> Delete a user by their ID. Requires an authentication header with the admin token.</p>

<pre><code>
DELETE /user/:id

Headers:
Authorization: Bearer admin-authentication-token
</code></pre>

<h2>Article Creation</h2>

<p><strong>Endpoint:</strong> <code>POST /article</code></p>

<p><strong>Description:</strong> Create a article with the specified fields.</p>

Headers:
Authorization: Bearer: authentication-token

<pre><code>

{
	"title": "title_article_insert1",
  
	"body": "body_article_insert1",
  
	"category": "category_article_insert1"
}

</code></pre>

<h2>Get Articles</h2>

<p><strong>Endpoint:</strong> <code>GET /article</code></p>

<p><strong>Description:</strong> List all Articles.</p>

<p><strong>Response:</strong></p>

<pre><code>
[
	{
		"id": 1,
		"category": "category_article_insert1",
		"title": "title_article_insert1",
		"body": "body_article_insert1",
		"userID": 1,
		"createdAt": "2023-08-17T05:38:40.907Z",
		"updatedAt": "2023-08-17T05:38:40.907Z"
	},
	{
		"id": 2,
		"category": "category_article_insert2",
		"title": "title_article_title2",
		"body": "body_article_body2",
		"userID": 2,
		"createdAt": "2023-08-17T06:44:53.220Z",
		"updatedAt": "2023-08-17T06:44:53.220Z"
	}
]

</code></pre>

<h2>Update Article</h2>
<p><strong>Endpoint:</strong> <code>PATCH /article/:id</code></p>
<p><strong>Description:</strong> Update an article by its ID. Requires an authentication header with the token.</p>
<pre><code>
PATCH /article/:id

Headers:
Authorization: Bearer your-authentication-token

Request Body:
{
  "title": "Updated Title",
  "body": "Updated article content",
  "category": "new-category"
}
</code></pre>

<h2>Delete Article</h2>
<p><strong>Endpoint:</strong> <code>DELETE /article/:id</code></p>
<p><strong>Description:</strong> Delete an article by its ID. Requires an authentication header with the admin token.</p>
<pre><code>
DELETE /article/:id

Headers:
Authorization: Bearer admin-authentication-token
</code></pre>

<h2>Important Notes</h2>

<p>Before using the API endpoints, ensure that the Docker container and database are up and running.</p>

<p>Make sure to provide the necessary request data in the correct format for successful execution of the endpoints.</p>

<p>Feel free to reach out if you have any questions or encounter any issues while setting up or using the Blog API. Happy coding!</p>

</div>

</body>

</html>
